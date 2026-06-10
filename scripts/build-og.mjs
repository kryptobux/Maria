#!/usr/bin/env node
/**
 * OG image (1200×630 → public/og.jpg), HANDOVER §7.3.
 *
 * Preferred: derive from the hero photo once it exists
 * (public/images/hero/hero-2400.jpg). Until photo sourcing has run, a
 * token-true typographic composition (basalt → ember, contour lines,
 * wordmark) is generated so social shares already look intentional.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'public/og.jpg');
const HERO = path.join(ROOT, 'public/images/hero/hero-2400.jpg');

const W = 1200;
const H = 630;

const contours = Array.from({ length: 7 })
  .map(
    (_, i) =>
      `<path d="M -40 ${380 + i * 34} C 240 ${300 + i * 28}, 420 ${470 + i * 22}, 740 ${360 + i * 30} S 1100 ${420 + i * 24}, 1260 ${330 + i * 32}" fill="none" stroke="rgba(200,163,95,${0.16 - i * 0.015})" stroke-width="1.4"/>`,
  )
  .join('\n');

const heroExists = await fs
  .access(HERO)
  .then(() => true)
  .catch(() => false);

const overlaySvg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#221A16"/>
      <stop offset="0.65" stop-color="#161110"/>
      <stop offset="1" stop-color="#161110"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.78" cy="0.12" r="0.8">
      <stop offset="0" stop-color="rgba(212,80,43,0.55)"/>
      <stop offset="0.55" stop-color="rgba(126,45,53,0.25)"/>
      <stop offset="1" stop-color="rgba(22,17,16,0)"/>
    </radialGradient>
  </defs>
  ${heroExists ? '' : `<rect width="${W}" height="${H}" fill="url(#bg)"/>`}
  <rect width="${W}" height="${H}" fill="${heroExists ? 'rgba(22,17,16,0.62)' : 'url(#glow)'}"/>
  ${contours}
  <path d="M 470 318 L 600 128 L 738 318" fill="none" stroke="rgba(212,80,43,0.6)" stroke-width="2"/>
  <circle cx="600" cy="128" r="5" fill="#D4502B"/>
  <g font-family="DejaVu Serif, Georgia, serif" text-anchor="middle">
    <text x="600" y="240" font-size="21" letter-spacing="11" fill="#C8A35F">МАРИЯ ШРЁДЕР</text>
    <text x="600" y="392" font-size="64" fill="#F0E6D6">От кратера — в бокал</text>
    <text x="600" y="452" font-size="25" fill="rgba(240,230,214,0.82)">Винное путешествие по Сицилии</text>
  </g>
  <g font-family="DejaVu Sans, Arial, sans-serif" text-anchor="middle">
    <text x="600" y="540" font-size="17" letter-spacing="4" fill="#C8A35F">13–19 СЕНТЯБРЯ 2026 · МАКСИМУМ 12 ГОСТЕЙ</text>
  </g>
  <rect x="0" y="${H - 6}" width="${W}" height="6" fill="#D4502B"/>
</svg>`;

let base;
if (heroExists) {
  base = sharp(HERO).resize(W, H, { fit: 'cover', position: sharp.strategy.attention });
} else {
  base = sharp({ create: { width: W, height: H, channels: 3, background: '#161110' } });
}

await base
  .composite([{ input: Buffer.from(overlaySvg) }])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(OUT);

console.log(`✓ public/og.jpg (${heroExists ? 'from hero photo' : 'typographic fallback'})`);
