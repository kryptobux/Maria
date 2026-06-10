import type { NextConfig } from 'next';

/**
 * Two deploy paths are kept buildable (HANDOVER §2, decision D2 open):
 *  a) `next build`              → Vercel / node server (uses /api/lead proxy)
 *  b) STATIC_EXPORT=1 build     → `output: 'export'` for nginx on a VPS
 *     (run via `npm run build:static`, which also disables app/api)
 */
const isStaticExport = process.env.STATIC_EXPORT === '1';

const nextConfig: NextConfig = {
  ...(isStaticExport ? { output: 'export' as const } : {}),
  // Images are pre-optimized by scripts/build-images.mjs and served via
  // <picture> (AVIF/WebP/JPEG srcsets) — no runtime optimizer needed,
  // which keeps the static export path fully functional.
  images: { unoptimized: true },
  // Strato/Apache serves directories, not extensionless files: /impressum/
  // → impressum/index.html. Kept identical in both build modes so URLs
  // never diverge between server and static deploys.
  trailingSlash: true,
  poweredByHeader: false,
};

export default nextConfig;
