#!/usr/bin/env node
/**
 * Rebrand QA gate (HANDOVER §4.2): the old operator brand, the old
 * insurance badge and the old company registry/address must not appear
 * anywhere in the shippable tree. Patterns are assembled from fragments so
 * this script never trips itself. /design-reference is exempt per handover.
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');

// assembled at runtime on purpose — do not inline the literals.
// The registry abbreviation matches only as a standalone uppercase word
// (German words like "befahrbar" contain it as a lowercase substring).
const TERMS = [
  { label: ['Travel', 'Suites'].join(''), re: new RegExp(['travel', 'suites'].join(''), 'i') },
  { label: ['D', 'RS', 'F'].join(''), re: new RegExp(`\\b${['D', 'RS', 'F'].join('')}\\b`, 'i') },
  { label: ['HR', 'B'].join(''), re: new RegExp(`\\b${['HR', 'B'].join('')}\\b`) },
  { label: ['Im ', 'Degen'].join(''), re: new RegExp(['im ', 'degen'].join(''), 'i') },
];

const SKIP_DIRS = new Set(['node_modules', '.next', 'out', 'design-reference', '.git']);
const TEXT_EXT = /\.(ts|tsx|js|jsx|mjs|cjs|json|md|css|html|svg|txt|yml|yaml|env|example)$/i;

let hits = 0;

async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) await walk(path.join(dir, entry.name));
      continue;
    }
    const full = path.join(dir, entry.name);
    if (!TEXT_EXT.test(entry.name) && !entry.name.startsWith('.env')) continue;
    if (full === new URL(import.meta.url).pathname) continue;
    const text = await fs.readFile(full, 'utf8').catch(() => '');
    const lines = text.split('\n');
    lines.forEach((line, i) => {
      for (const term of TERMS) {
        if (term.re.test(line)) {
          console.log(`${path.relative(ROOT, full)}:${i + 1}  contains "${term.label}"`);
          hits++;
        }
      }
    });
  }
}

await walk(ROOT);

if (hits > 0) {
  console.log(`\n✗ ${hits} forbidden brand reference(s) found — must be 0 (§4.2).`);
  process.exit(1);
}
console.log('✓ brand check: 0 references to the old operator/insurance/registry/address');
