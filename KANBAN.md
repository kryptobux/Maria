# KANBAN — maria-schroeder-sicily

> Aufgabensteuerung (HANDOVER §1). Stand: **2026-06-10** (Bootstrap-Session: Phase-1-Build).
> Spalten: 📥 Backlog · 🔨 In Arbeit · ⛔ Blockiert (braucht Jury/Umgebung) · ✅ Fertig

---

## 📥 Backlog — Phase 2 (Research & Outreach, HANDOVER §9)

| # | Task | Output |
|---|---|---|
| R1 | Hotel-Blockanfragen Monaci (6–7 Zi., 13.–17.09) & Maniace (17.–19.09) + je 1 Alternative (Villa Neri / Caportigia) | `outreach/hotels-*.md` |
| R2 | NCC-RFQs: Jonicatour, Transfer Service Catania, NormanLine (Sprinter VIP 16 Pl., 7 Tage, Fahrer-Übernachtung Siracusa) | `outreach/ncc-rfq.md` + Vergleichstabelle |
| R3 | Weingut-Slots: Passopisciaro (Mo 14.09), Benanti (Mi 16.09, priv. Vertikale), Tenuta San Michele/Murgo (Di 15.09), COS (Do 17.09) + Dublöre | `outreach/wineries-*.md`, `research/winery-grid.md` |
| R4 | Don Camillo Fr 18.09 (12 P., Set-Menü + Weinbegleitung); Alternativen Regina Lucia / Cortile Spirito Santo | `outreach/dinner-ortigia.md` |
| R5 | Funivia dell'Etna: Listino 2026 verifizieren, Gruppenbuchung 12 P., Verleih, Schlechtwetter-Regel; Plan B Etna Nord | `research/etna-logistics.md` |
| R6 | Pressekit-/Bildanfragen: Monaci, Maniace, Funivia, Benanti, Murgo, COS, Tornatore | `outreach/photo-presskits.md` |
| R7 | Legal-Memo Veranstalterin (Einzelunternehmen): § 651r-Absicherung, Reise-AGB/Stornostaffel, § 25 UStG Marge + KU-Grenzen, Gewerbe/Versicherung — Fragenkatalog für Anwalt & StB | `research/legal-memo.md` |
| R8 | Zahlungsweg: Invoice-Vorlage RU/DE, SEPA-Konto, optional Stripe-SEPA, Nicht-SEPA-Gäste | `research/payments.md` |
| R9 | Domain-Shortlist + Verfügbarkeit; Hosting-Empfehlung Vercel vs. VPS (→ D2) | `research/domain-hosting.md` |
| R10 | Weinversand 6er-Karton Sizilien→DE/EU (Paccofacile/MBE Catania/Direktversand); e-AD-Pflicht Schaumwein | `research/wine-shipping.md` |

### Backlog — Build-Rest (nach Blocker-Auflösung)

- [ ] Foto-Slots final belegen: Kandidaten sichten (`/tmp/photo-candidates/`), Picks nach `assets/photos-src/` + `*.credit.json`, `npm run photos:build`, `npm run og:build` (Hero-Variante), `research/photo-log.md` mit Ablehnungsgründen — **DoD: 12/12 echt** (Ausnahme `maria`)
- [ ] `routes.ts`: alle Maps-Queries manuell gegen Google Maps verifizieren (Pflicht §5.2); mehrdeutige Pins präzisieren bzw. verifizierte `lat,lng` eintragen
- [ ] Copy-Abgleich gegen `design-reference/ot-kratera-v-bokal_landing.html`, sobald eingecheckt (§0.5 — Deltas §4.2 bleiben führend)
- [ ] Screenshots Desktop/Mobile + Lighthouse-Lauf (≥ 95) auf Maschine mit Browser
- [ ] Inhalte für `/impressum`, `/datenschutz`, `/agb` (nach D4 + R7)

---

## 🔨 In Arbeit

*(leer — Phase-1-Build abgeschlossen, nächster Zug siehe HANDOFF.md)*

---

## ⛔ Blockiert (Eskalation an Jury, HANDOVER §6.2 Pkt. 4 u. a.)

| Blocker | Detail | Auflösung |
|---|---|---|
| **B1 Foto-Sourcing** | Build-Container: Netzwerk-Allowlist blockt `commons.wikimedia.org`, `api.unsplash.com`, `images.unsplash.com` (HTTP 403 `host_not_allowed`; nachgewiesen 2026-06-10). 0/12 Slots mit echten Fotos — Platzhalter-System aktiv | `npm run photos:source` lokal/mit offenem Egress ausführen, dann Backlog-Task „Foto-Slots final belegen" |
| **B2 Maps-Verifikation** | `google.com` ebenfalls geblockt → Pflicht-Verifikation der Routen-Queries (§5.2) nicht möglich | manuell im Browser prüfen (Checkliste in `content/routes.ts`-Kommentar) |
| **B3 Entscheidungen D1–D6** | Domain/Kontakte (D1), Deployment (D2), Maria-Porträt + Bio (D3), Rechtsform/Anschrift (D4), Preise final + spotsLeft (D5), EB-Deadline final (D6) | Werte in `content/site.config.ts` + `content/copy.ru.ts` (markierte TODOs) eintragen |
| **B4 design-reference fehlt** | Prototyp-HTML war nicht im Repo/Upload → Copy rekonstruiert | Datei einchecken, Copy-Review (siehe `design-reference/README.md`) |
| **B5 Screenshots/Lighthouse** | Kein Browser im Build-Container | auf lokaler Maschine (Teil der DoD §8) |

---

## ✅ Fertig — Phase 1 (HANDOVER §8), 2026-06-10

- [x] Repo-Scaffold: Next 15.5 / TS / Tailwind v4, Tokens §3, Fonts (Prata/Manrope/Cormorant, cyrillic+latin via next/font), `.env.example`
- [x] `copy.ru.ts`: komplette RU-Copy **mit allen Deltas §4.2** (Badges, Tarif-Fußnote, FAQ-Antworten wörtlich, Footer-Zeile, Title/Meta/OG ohne Firmenname) — *rekonstruiert, da Referenz fehlt (B4)*
- [x] Alle Sektionen als Komponenten (Header → Hero → Fakten → Maria → Почему Этна → Маршрут → Программа (7) → Отели → Тарифы → Фильм/Отзывы-Platzhalter → FAQ (12) → Early Bird → Form → Footer), Dramaturgie Basalt → Paper → Granat → Basalt, Höhenlinien-Signature
- [x] Routen-Sektion §5: Tages-Tabs (Обзор·Д1–Д7, a11y-Tablist + Pfeiltasten), Embed-API-Directions mit Key, **Keyless-Fallback automatisch**, externe Maps-Links, iframes lazy + `title` + referrerPolicy, Höhenlinie & Tabs mit gemeinsamer State-Quelle
- [x] `routes.ts` befüllt (alle Stopps §5.2 wörtlich) — *Verifikation = B2*
- [x] Foto-Pipeline komplett implementiert: Manifest (§6.1, 13 Slots), `source-photos.mjs` (Presskit→Commons→Unsplash, Lizenzfilter CC0/PD/CC BY/CC BY-SA, NC/ND verworfen), `build-images.mjs` (sharp: attention-crop, AVIF/WebP/JPEG 480–2400, LQIP, credits.md + `/credits`-Route) — *Ausführung = B1*
- [x] Countdown (TZ-fest via +02:00-Offset, Hydration-sicher, Closed-State §7.1), Lead-Form → n8n (Payload §7.2 exakt, Honeypot + ts<3s-Falle, Status-UI, mailto-Fallback), WA/TG-Buttons (config-gesteuert, bei TODO ausgeblendet)
- [x] SEO: Meta/OG/Twitter §4.2, `og.jpg` generiert (typografische Fallback-Komposition, RU), JSON-LD `TouristTrip` (provider = Person Maria Schröder, 2 Offers EUR), sitemap, robots, favicon
- [x] Platzhalter-Routen `/impressum` `/datenschutz` `/agb` («готовится / Inhalt folgt», noindex)
- [x] QA-Gates: `check:brand` **0 Treffer** ✅ · `check:typography` (U+202F/U+00A0/« ») ✅ · ESLint 0 Warnungen · `next build` ✅ · `build:static` (`output:'export'`) ✅ — beide Deploy-Pfade baubar
- [x] Doku: README, ARCHITECTURE.md, KANBAN.md, HANDOFF.md, design-reference/README.md
