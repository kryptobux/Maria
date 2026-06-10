#!/usr/bin/env node
/**
 * Static export build (deploy path b: nginx on a VPS — decision D2 open).
 *
 * `output: 'export'` cannot include the POST route handler in app/api, so
 * the API directory is parked outside the router for the duration of the
 * build (restored afterwards, also on failure). The booking form then posts
 * directly to the n8n webhook — set N8N_WEBHOOK_URL (+ N8N_TOKEN) at build
 * time so they are inlined (§2/§7.2). Output lands in out/.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const API = path.join(ROOT, 'app/api');
const PARKED = path.join(ROOT, '.api.parked');

const hasApi = fs.existsSync(API);
if (hasApi) fs.renameSync(API, PARKED);

let code = 1;
try {
  const res = spawnSync('npx', ['next', 'build'], {
    cwd: ROOT,
    stdio: 'inherit',
    env: { ...process.env, STATIC_EXPORT: '1' },
  });
  code = res.status ?? 1;
} finally {
  if (hasApi) fs.renameSync(PARKED, API);
}

if (code === 0) {
  console.log('\n✓ static export in out/ — deployable to any static host/nginx');
} else {
  console.error('\n✗ static export failed');
}
process.exit(code);
