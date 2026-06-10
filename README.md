# maria-schroeder-sicily

Landing page for **«От кратера — в бокал»** — a premium 7-day wine journey
through Sicily (13–19 Sep 2026, max 12 guests) under the personal brand of
sommelière **Maria Schröder**. Page language: Russian. Built per
`HANDOVER` spec (see `HANDOFF.md` for current state and open points).

## Stack

Next.js 15 (App Router, TypeScript) · Tailwind CSS v4 · `next/font/google`
(Prata / Manrope / Cormorant Garamond, cyrillic+latin, self-hosted) ·
`sharp` image pipeline · no UI kits.

## Quickstart

```bash
npm install
cp .env.example .env.local   # fill what you have; everything degrades gracefully
npm run dev                  # http://localhost:3000
```

## Scripts

| Script | Purpose |
|---|---|
| `npm run build` | Server build (Vercel / node) — uses `/api/lead` proxy |
| `npm run build:static` | `output:'export'` build → `out/` (nginx/VPS); parks `app/api` during build |
| `npm run photos:source` | Fetch photo candidates (press-kits → Wikimedia Commons → Unsplash) to `/tmp/photo-candidates/` — needs open egress, see KANBAN blocker |
| `npm run photos:build` | Process picks from `assets/photos-src/` → AVIF/WebP/JPEG srcsets + LQIP + `/credits` data |
| `npm run og:build` | Generate `public/og.jpg` (uses hero photo when available) |
| `npm run check:typography` | RU typography gate (U+202F in numbers, U+00A0 before «—», « ») — `--fix` available |
| `npm run check:brand` | Rebrand gate (§4.2): old operator brand must not appear |
| `npm run qa` | typography + brand + lint + both builds |

## Where things live

```
content/    copy.ru.ts (all RU copy) · site.config.ts · routes.ts (§5.2)
            photos.manifest.json (§6.1) · photos.generated.json (pipeline output)
components/ one component per landing section + SmartImage/placeholder system
app/        / (landing) · /credits · /impressum · /datenschutz · /agb · api/lead
scripts/    sourcing, image build, og, QA gates, static-export build
research/   Phase-2 research output (Markdown)
outreach/   Phase-2 e-mail drafts (IT/EN)
```

Project boards: `KANBAN.md` (tasks/blockers) · `ARCHITECTURE.md` (decisions) ·
`HANDOFF.md` (session state, assumptions, next steps).
