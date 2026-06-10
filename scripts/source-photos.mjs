#!/usr/bin/env node
/**
 * Photo sourcing (HANDOVER §6.2).
 *
 * Order of sources:
 *   1. /assets/press-kits/{slot}/  — preferred when present (rights cleared)
 *   2. Wikimedia Commons API      — licenses: CC0 / Public domain / CC BY / CC BY-SA
 *   3. Unsplash API               — only if UNSPLASH_ACCESS_KEY is set
 *
 * Downloads 4–6 candidates per slot to /tmp/photo-candidates/{slot}/ along
 * with meta.json (author, license, source URL) for the manual/agent
 * selection step. Selected images are then copied to assets/photos-src/
 * (with a {slot}.credit.json sidecar) and processed by build-images.mjs.
 *
 * NOTE: in the remote build container the image hosts are not on the
 * network allowlist (403 host_not_allowed) — run this locally or in an
 * environment with open egress. The script degrades gracefully and prints
 * a per-slot summary either way.
 *
 * Usage: node scripts/source-photos.mjs [--slot=day3] [--limit=6] [--strict]
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_BASE = '/tmp/photo-candidates';
const UA = 'maria-schroeder-sicily-build/1.0 (photo sourcing for a private travel landing page)';

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? true];
  }),
);

const manifest = JSON.parse(
  await fs.readFile(path.join(ROOT, 'content/photos.manifest.json'), 'utf8'),
);

const PER_SLOT = Number(args.limit ?? 6);

function licenseAccepted(shortName = '') {
  const l = shortName.toLowerCase();
  if (l.includes('-nc') || l.includes('-nd')) return false;
  return (
    l.startsWith('cc0') ||
    l.includes('public domain') ||
    l === 'pd' ||
    l.startsWith('cc by') ||
    l.startsWith('cc-by')
  );
}

function stripHtml(s = '') {
  return s.replace(/<[^>]*>/g, '').trim();
}

async function searchCommons(query, limit) {
  const url = new URL('https://commons.wikimedia.org/w/api.php');
  url.search = new URLSearchParams({
    action: 'query',
    format: 'json',
    origin: '*',
    generator: 'search',
    gsrnamespace: '6',
    gsrlimit: String(limit * 4),
    gsrsearch: query,
    prop: 'imageinfo',
    iiprop: 'url|extmetadata|size|mime',
    iiurlwidth: '2400',
  }).toString();

  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`Commons HTTP ${res.status}`);
  const data = await res.json();
  const pages = Object.values(data?.query?.pages ?? {});
  return pages
    .map((p) => {
      const info = p.imageinfo?.[0];
      if (!info) return null;
      const meta = info.extmetadata ?? {};
      return {
        provider: 'commons',
        title: p.title?.replace(/^File:/, '') ?? 'untitled',
        author: stripHtml(meta.Artist?.value ?? 'unknown'),
        license: meta.LicenseShortName?.value ?? '',
        sourceUrl: info.descriptionurl,
        downloadUrl: info.thumburl ?? info.url,
        width: info.width ?? 0,
        height: info.height ?? 0,
        mime: info.mime ?? '',
      };
    })
    .filter(Boolean)
    .filter((c) => /image\/(jpeg|png)/.test(c.mime))
    .filter((c) => licenseAccepted(c.license));
}

async function searchUnsplash(query, limit, key) {
  const url = new URL('https://api.unsplash.com/search/photos');
  url.search = new URLSearchParams({
    query,
    per_page: String(limit),
    orientation: 'landscape',
    content_filter: 'high',
  }).toString();
  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${key}`, 'User-Agent': UA },
  });
  if (!res.ok) throw new Error(`Unsplash HTTP ${res.status}`);
  const data = await res.json();
  return (data.results ?? []).map((p) => ({
    provider: 'unsplash',
    title: p.description ?? p.alt_description ?? p.id,
    author: p.user?.name ?? 'unknown',
    license: 'Unsplash License',
    sourceUrl: p.links?.html,
    downloadUrl: p.urls?.full ?? p.urls?.regular,
    width: p.width ?? 0,
    height: p.height ?? 0,
    mime: 'image/jpeg',
  }));
}

async function download(url, dest) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`download HTTP ${res.status}`);
  await fs.writeFile(dest, Buffer.from(await res.arrayBuffer()));
}

const summary = [];
const slots = manifest.slots.filter((s) => (args.slot ? s.id === args.slot : true));

for (const slot of slots) {
  if (slot.queries.length === 0) {
    summary.push({ slot: slot.id, status: 'manual (supplied by Jury)', candidates: 0 });
    continue;
  }

  // 1. press kits beat everything
  const pressDir = path.join(ROOT, 'assets/press-kits', slot.id);
  try {
    const press = (await fs.readdir(pressDir)).filter((f) => /\.(jpe?g|png|webp|tiff?)$/i.test(f));
    if (press.length > 0) {
      summary.push({ slot: slot.id, status: `press kit (${press.length} files) — use those`, candidates: press.length });
      continue;
    }
  } catch {
    /* no press kit dir — continue with APIs */
  }

  const outDir = path.join(OUT_BASE, slot.id);
  await fs.mkdir(outDir, { recursive: true });

  let candidates = [];
  for (const query of slot.queries) {
    try {
      const found = await searchCommons(query, PER_SLOT);
      candidates.push(...found);
    } catch (err) {
      console.error(`  [${slot.id}] Commons "${query}": ${err.message}`);
    }
  }

  if (candidates.length < 4 && process.env.UNSPLASH_ACCESS_KEY) {
    for (const query of slot.queries) {
      try {
        candidates.push(
          ...(await searchUnsplash(query, PER_SLOT, process.env.UNSPLASH_ACCESS_KEY)),
        );
      } catch (err) {
        console.error(`  [${slot.id}] Unsplash "${query}": ${err.message}`);
      }
    }
  }

  // prefer large originals, dedupe by URL
  const seen = new Set();
  candidates = candidates
    .filter((c) => (seen.has(c.downloadUrl) ? false : (seen.add(c.downloadUrl), true)))
    .filter((c) => c.width >= slot.minWidth * 0.8)
    .sort((a, b) => b.width * b.height - a.width * a.height)
    .slice(0, PER_SLOT);

  let downloaded = 0;
  for (const [i, c] of candidates.entries()) {
    const safe = c.title.replace(/[^\w.-]+/g, '_').slice(0, 60);
    const ext = c.mime.includes('png') ? 'png' : 'jpg';
    try {
      await download(c.downloadUrl, path.join(outDir, `${i + 1}-${safe}.${ext}`));
      downloaded++;
    } catch (err) {
      console.error(`  [${slot.id}] download failed: ${err.message}`);
    }
  }
  await fs.writeFile(path.join(outDir, 'meta.json'), JSON.stringify(candidates, null, 2));
  summary.push({ slot: slot.id, status: downloaded > 0 ? 'candidates ready' : 'NO RESULTS', candidates: downloaded });
}

console.log('\n=== sourcing summary ===');
for (const row of summary) {
  console.log(`  ${row.slot.padEnd(10)} ${String(row.candidates).padStart(2)}  ${row.status}`);
}
console.log(`\nCandidates in ${OUT_BASE}/<slot>/ — review images, then copy the pick to`);
console.log('assets/photos-src/<slot>.<ext> (+ <slot>.credit.json) and run: npm run photos:build');

const missing = summary.filter((r) => r.candidates === 0 && !r.status.startsWith('manual'));
if (missing.length > 0 && args.strict) process.exit(1);
