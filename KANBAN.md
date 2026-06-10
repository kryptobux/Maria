# KANBAN — maria-schroeder-sicily

> Aufgabensteuerung (HANDOVER §1). Stand: **2026-06-10** (Bootstrap-Session: Phase-1-Build).
> Spalten: 📥 Backlog · 🔨 In Arbeit · ⛔ Blockiert (braucht Jury/Umgebung) · ✅ Fertig

---

## 📥 Backlog — Follow-ups aus Phase 2

- [ ] **Outreach versenden** (R1–R4, R6): erst D1-Kontaktdaten in Signaturen + bei Murgo Anlass des Bestandskontakts eintragen, dann einzeln raus; Antworten in `research/winery-grid.md` + Vergleichstabellen pflegen
- [ ] **Funivia-Gruppenslot** anfragen (commerciale@funiviaetna.com): 13–14 Pax „Tour 3000" 15.09. ~09:00; 52/54-€-Frage, Anzahlung, Storno, Schlechtwetter schriftlich (→ `research/etna-logistics.md`)
- [ ] **Versicherer-Angebote Insolvenzabsicherung** einholen: tourVERS / R+V / Zurich / HanseMerkur — Kostenhebel = Sicherheitsleistung (→ `research/legal-memo.md` §1)
- [ ] **Termin StB Vetter**: Fragenkatalog aus `research/legal-memo.md` (Kernfrage: § 19-Grenzen vs. § 25-Marge) · **Termin Anwalt**: AGB + Stornostaffel + Formblatt Anlage 11
- [ ] **Domain-Bulk-Check** (5-Min-Anleitung in `research/domain-hosting.md`) → D1 entscheiden; Empfehlung dort: mariaschroeder.wine + .com
- [ ] Gran-Cru-Leistung „6 Flaschen nach Hause" final entscheiden (Schaumwein-Problematik → `research/wine-shipping.md`; Empfehlung: Weingut-Direktversand, Brut nur Reisegepäck)

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
| **B5 Screenshots/Lighthouse** | ~~Kein Browser~~ → **teilgelöst 2026-06-10**: Chrome-headless-shell via Puppeteer-CDN installierbar; Screenshots Desktop/Mobile in `docs/screenshots/` ✓; Lighthouse (mobil, Static Export): **A11y 97 · Best Practices 100 · SEO 100 · Perf 74** | Perf 74 = Artefakt des unkomprimierten Testservers (python http.server, −432 KiB gzip-Potenzial laut LH) → **auf echtem Hosting nachmessen** (Erwartung ≥ 90). Bekannter Kontrast-Trade-off: Cream-auf-Ember-CTAs ≈ 3,4:1 (verbatim §3-Palette) — falls AA-Pflicht gewünscht: Button-Töne mit Jury anpassen |

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

## ✅ Fertig — Phase 2 (HANDOVER §9), 2026-06-10

- [x] **R1** Blockanfragen Monaci + Maniace (IT/EN, inkl. Alternativen Villa Neri/Caportigia) → `outreach/hotels-monaci.md`, `outreach/hotels-maniace.md`
- [x] **R2** NCC-RFQ an Jonicatour/Transfer Service Catania/NormanLine + Vergleichstabelle → `outreach/ncc-rfq.md`
- [x] **R3** 5 Weingut-Anfragen (Passopisciaro, Tornatore, Murgo [Bestandskontakt], Benanti inkl. privater Pietra-Marina-Vertikale, COS) + Slot-Raster mit Dublören → `outreach/wineries-*.md`, `research/winery-grid.md`
- [x] **R4** Don-Camillo-Dinner Fr 18.09 (Set-Menü + Pairing/Korkgeld-Optionen; Alternativen benannt) → `outreach/dinner-ortigia.md`
- [x] **R5** Etna-Logistik: Listino 2026 (52/54 € offen → konservativ 85 € p. P. budgetiert), Gruppenverfahren, Verleih, Schlechtwetter, Plan B Etna Nord 69 € → `research/etna-logistics.md`
- [x] **R6** Pressekit-Anfrage (IT/EN) + Tracking-Tabelle für 7 Empfänger → `outreach/photo-presskits.md`
- [x] **R7** Legal-Memo: § 651r **Abs. 2** Kleinveranstalter-Lösung, Anbieter (tourVERS/R+V/Zurich/HanseMerkur), Formblatt Anlage 11, Stornostaffeln, § 25 UStG + § 19 n. F. (25 000/100 000 € seit 2025), Fragenkataloge Anwalt/StB → `research/legal-memo.md`
- [x] **R8** Zahlungsweg: Invoice RU/DE, SEPA-Plan (Sicherungsschein VOR Zahlung, § 651t), Stripe-Option, Nicht-SEPA-Text → `research/payments.md`
- [x] **R9** Domain-Shortlist (12 Kandidaten, ö-Transliterationsstrategie; Empfehlung mariaschroeder.wine + .com) + Hosting-Empfehlung **Static Export auf vorhandenem VPS** (Vercel Hobby = kommerziell untersagt) → `research/domain-hosting.md`
- [x] **R10** Weinversand: Paccofacile/MBE-Catania-Wege, Schaumweinsteuer-Falle Murgo Brut (136 €/hl, EMCS/Versandhandel) → Empfehlung Weingut-Direktversand B2C → `research/wine-shipping.md`
