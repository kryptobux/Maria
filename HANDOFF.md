# HANDOFF — maria-schroeder-sicily

> Session 2026-06-10 (Bootstrap: Phase-1-Build durch Claude, remote ohne offenes Egress/Browser).
> Lagebild zuerst lesen, dann KANBAN.md (Blocker!) und ARCHITECTURE.md.

## Stand

**Phase 1 (Build) ist code-komplett und doppelt grün gebaut** (`next build` + `output:'export'`); QA-Gates laufen automatisiert:
- `npm run check:brand` → **0 Treffer** Alt-Brand/Alt-Badge/Registernummer/Alt-Adresse (§4.2-Gate)
- `npm run check:typography` → RU-Typografie maschinell erzwungen (U+202F in Zahlen, U+00A0 vor «—», « »)
- ESLint 0 Warnungen · Landing 112 kB First-Load-JS · alle Seiten statisch prerendert

**Nicht erfüllbar in dieser Umgebung** (Container-Allowlist ohne Bildquellen/Google): echte Fotos (DoD 12/12) und Maps-Query-Verifikation — Blocker B1/B2 in KANBAN.md mit Auflösungsweg. **Screenshots + Lighthouse gelangen doch** (Chrome-headless via Puppeteer): Bilder in `docs/screenshots/`, Scores A11y 97 / BP 100 / SEO 100 / Perf 74 — Perf-Wert ist Artefakt des unkomprimierten Testservers, auf echtem Hosting nachmessen (B5-Notiz in KANBAN).

## Wichtigste Annahmen (brauchen Jurys Review)

Die Design-Referenz-HTML fehlte (B4) → **gesamte RU-Copy rekonstruiert**. Verbindliche §4.2-Texte sind wörtlich drin; frei verfasst und damit review-pflichtig sind:

1. **Tarif-Inklusivleistungen** (`content/copy.ru.ts` → `TARIFFS`): Riserva-Liste plausibel aus Programm abgeleitet; **Gran Cru enthält erfundene Differenzierung**: Suiten-Kategorie, private Benanti-Vertikale (aus R3 belegt), 1:1-Weinsession, **„6 Flaschen mit Heimlieferung (EU)"** (an R10 angelehnt — streichen, falls nicht gewollt!)
2. **FAQ-Antworten** (12): Faktenaussagen wie Temperaturen, „Drittel Soloreisende", Prokat von Jacken/Schuhen oben, „Plan B Nordhang", Zahlungsablauf („Rest näher zum Termin") — bewusst vage gehalten, aber prüfen
3. **Tages-Texte + Höhenangaben** (Программа/Höhenlinie): aus §5.2-Routen + §6.1-Briefings komponiert; „5 виноделен" zählt Passopisciaro/Tornatore/Murgo/Benanti/COS
4. **Hotelbeschreibungen** („25 гектаров", „XIX век", Lage Maniace) — aus allgemein Bekanntem, gegen Pressekits verifizieren (R6)
5. **Maria-Bio**: Platzhalter `[ОБРАЗОВАНИЕ/СЕРТИФИКАЦИЯ]` steht sichtbar im Text bis D3 geliefert; Zitat frei verfasst
6. **Footer** trägt sichtbaren Platzhalter „[юридическая форма и адрес уточняются]" bis D4

## Offene Entscheidungen (D1–D6, §10) — Eintragsorte

- `content/site.config.ts`: email/whatsapp/telegram/domain (D1), spotsLeft + Preise final (D5), deadline (D6)
- D2 Deployment: beide Pfade fertig; Vercel = `npm run build`, VPS = `npm run build:static` → `out/`
- D3 Porträt: Datei als `assets/photos-src/maria.jpg` (+ `maria.credit.json` „© privat") → `npm run photos:build`
- D4 Rechtsform/Anschrift: `FOOTER.legalLine` in `copy.ru.ts` + Impressum-Seite

## Phase 2 — erledigt in derselben Session (alle 10 R-Tasks)

- **Outreach (R1–R4, R6):** 10 versandfertige IT/EN-Entwürfe in `outreach/` — vor Versand nur D1-Kontakte in die Signaturen + bei Murgo den Anlass des Bestandskontakts eintragen
- **Research (R5, R7–R10):** 6 Memos in `research/` mit Quellen und ⚠️-Markierungen. Kernerkenntnisse:
  - *Etna:* Tour-3000-Paket konservativ **85 € p. P.** budgetieren; Gruppenslot über commerciale@funiviaetna.com; Plan B Nord 69 € steht zeitlich kompatibel zum Murgo-Termin
  - *Legal:* Kleinveranstalter-Lösung = **§ 651r Abs. 2 BGB** (Versicherung statt Fonds; Anbieter: tourVERS/R+V/Zurich/HanseMerkur); Vorkasse erst nach Sicherungsschein (§ 651t); **StB-Kernfrage:** zählt für § 19-Grenzen Gesamtpreis oder Marge (§ 25)? → Fragenkataloge fertig
  - *Hosting (D2-Empfehlung):* **Static Export auf vorhandenem VPS** — Vercel-Hobby untersagt kommerzielle Nutzung; *Domain:* mariaschroeder.wine + .com (Bulk-Check-Anleitung im Memo)
  - *Weinversand:* Stillwein unkritisch, **Murgo Brut = Schaumweinsteuer/EMCS-Falle** → „6 Flaschen"-Gran-Cru-Leistung als Weingut-Direktversand gestalten oder Brut ausnehmen
- Faktenchecks der Landing-Copy: Monaci (25 ha, 19. Jh.) ✅ · Maniace Boutique Hotel (UNA Esperienze, Ex-Kloster) ✅

## Nächste Schritte (Reihenfolge empfohlen)

1. **Jury, 30 min:** design-reference einchecken (B4) · D1–D6 entscheiden (Hosting-Empfehlung liegt vor) · Annahmen-Liste oben absegnen — danach Outreach-Signaturen füllen und **versenden**
2. **Maschine mit offenem Netz:** `npm run photos:source` → Kandidaten in `/tmp/photo-candidates/` **ansehen**, Picks nach `assets/photos-src/` + Credit-Sidecars, `npm run photos:build && npm run og:build` → 12/12-DoD; `research/photo-log.md` führen
3. Maps-Queries im Browser verifizieren (B2, Kommentar-Checkliste in `routes.ts`)
4. Lighthouse + Screenshots (B5), Abweichungen fixen
5. Termine: StB Vetter + Anwalt (Fragenkataloge in `research/legal-memo.md`) · Versicherer-Angebote für Sicherungsschein einholen

## Betrieb

Alle Befehle in `README.md`. Schnelltest lokal: `npm install && npm run dev`.
Voll-QA vor jedem Push: `npm run qa`.

## Einordnung im Repo

Projekt lebt unter `maria-schroeder-sicily/` im Repo `Angebot_TS` (Session war auf dieses Repo/diesen Branch festgelegt). Es ist vollständig self-contained → Umzug in eigenes Repo = Ordner kopieren. Das Bestandsprojekt im Root wurde **nicht angefasst**.
