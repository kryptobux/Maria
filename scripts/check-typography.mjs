#!/usr/bin/env node
/**
 * Russian typography QA (HANDOVER §3 Qualitäts-Floor):
 *   R1  digit groups joined by a plain space   → must be U+202F («2 900»)
 *   R2  plain space before «—»                 → must be U+00A0
 *   R3  plain space before €/м/°C/%            → must be U+202F («3 290 €»)
 *   R4  straight double quotes around cyrillic → must be « »
 *
 * Scope: content/*.ts (the copy layer). `--fix` rewrites R1/R2/R3 in place.
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const CONTENT = path.join(ROOT, 'content');
const FIX = process.argv.includes('--fix');

const NBSP = '\u00A0';
const NNBSP = '\u202F';

// Plain ASCII space in the patterns below is intentional: it is the defect.
const R1 = /\d \d{3}(?!\d)/;
const R2 = / —/;
const R3a = /\d (€|°C|%)/;
const R3b = /\d м(?![а-яёa-z0-9_])/iu;
const R4 = /"[А-Яа-яЁё]/;

const files = (await fs.readdir(CONTENT)).filter((f) => f.endsWith('.ts'));
let violations = 0;

for (const file of files) {
  const full = path.join(CONTENT, file);
  let text = await fs.readFile(full, 'utf8');

  if (FIX) {
    let prev;
    do {
      prev = text;
      text = text.replace(/(\d) (\d{3})(?!\d)/g, `$1${NNBSP}$2`);
    } while (text !== prev);
    text = text.replace(/ —/g, `${NBSP}—`);
    text = text.replace(/(\d) (€|°C|%)/g, `$1${NNBSP}$2`);
    text = text.replace(/(\d) (м(?![а-яёa-z0-9_]))/giu, `$1${NNBSP}$2`);
    await fs.writeFile(full, text);
  }

  text.split('\n').forEach((line, i) => {
    const report = (rule, msg) => {
      console.log(`${file}:${i + 1}  [${rule}] ${msg}  →  ${line.trim().slice(0, 90)}`);
      violations++;
    };
    if (R1.test(line)) report('R1', 'plain space inside number (use U+202F)');
    if (R2.test(line)) report('R2', 'plain space before «—» (use U+00A0)');
    if (R3a.test(line) || R3b.test(line)) report('R3', 'plain space before unit (use U+202F)');
    if (R4.test(line)) report('R4', 'straight quotes around cyrillic (use « »)');
  });
}

if (violations > 0) {
  console.log(
    `\n${violations} typography violation(s).${FIX ? '' : ' Try: node scripts/check-typography.mjs --fix'}`,
  );
  process.exit(1);
}
console.log('✓ typography: numbers use U+202F, «—» preceded by U+00A0, « » quotes');
