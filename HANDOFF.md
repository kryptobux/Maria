# HANDOFF — maria-schroeder-sicily

> Lagebild zuerst lesen, dann KANBAN.md (Blocker!) und ARCHITECTURE.md.

## Stand nach Go-Live-Session 2026-06-10 (NEUESTE — hier weiterlesen)

**Die Seite ist LIVE: https://mariaschroeder.com (Strato, SSL aktiv, HTTPS-Redirect in `public/.htaccess` scharf).**

Was diese Session erledigt hat:
1. **Repo-Umzug abgeschlossen:** `maria-export` aus Angebot_TS mit voller Historie als `main` in kryptobux/Maria importiert. Alte statische Website archiviert unter Branch `archive/statische-website`. (Default-Branch-Umstellung auf `main` wurde dem Betreiber gezeigt — verifizieren; danach können die alten `claude/*`-Branches gelöscht werden.)
2. **Auto-Deploy eingerichtet:** `.github/workflows/deploy.yml` — jeder Push auf `main` baut den Static Export (inkl. QA-Gates check:brand/check:typography) und lädt per lftp/SFTP nach Strato. **Push = live.** Details/Secrets-Tabelle in DEPLOY.md.
   - Strato-Deploy-User: `stu152772241`, Typ SFTP, **Jail `/mariaschroeder`** (Schutz der anderen Domains auf dem Webspace vor `--delete`). Host `511850234.ssh.w1.strato.hosting:22`.
   - GitHub-Secrets gesetzt: `STRATO_SSH_USER`, `STRATO_SSH_PASSWORD`. Lauf #5 grün, Domain-Zuordnung (`Intern` → `/mariaschroeder`) + SSL vom Betreiber im Strato-Panel erledigt.
3. **HTTPS-Redirect aktiviert** (`public/.htaccess`, dieser Commit).

## NÄCHSTER TASK: Bilder (Blocker B1 auflösen)

Die Umgebung ist jetzt dafür konfiguriert (vom Betreiber bestätigt):
- **Netzwerk-Freigabe** für api.unsplash.com / images.unsplash.com / commons.wikimedia.org / upload.wikimedia.org (bzw. Full).
- **`UNSPLASH_ACCESS_KEY`** liegt als Umgebungsvariable an (Unsplash-App „mariaschroeder-landing", Demo-Tier 50 req/h).

Ablauf (Pipeline ist fertig, nur ausführen):
1. `npm install`, dann `npm run photos:source` — lädt 4–6 Kandidaten pro Slot nach `/tmp/photo-candidates/{slot}/` (Quellen: press-kits → Wikimedia Commons → Unsplash; Lizenzfilter eingebaut). Slots + Art-Direction: `content/photos.manifest.json` („dark, warm, calm — no tourist crowds…").
2. Kandidaten **ansehen** (Read auf die Bilddateien), je Slot besten Treffer nach `assets/photos-src/{slot}.jpg` + `{slot}.credit.json` (Daten aus meta.json der Kandidaten) kopieren.
3. `npm run photos:build && npm run og:build`, `npm run qa`, `research/photo-log.md` führen, committen, pushen → deployt automatisch.
- **Slot `maria` NICHT aus Stock befüllen** (D3: nur eigenes Porträt vom Betreiber; Platzhalter bleibt bis dahin).

## Offen / Backlog (nach den Bildern)

- `GOOGLE_MAPS_EMBED_KEY`, `N8N_WEBHOOK_URL`, `N8N_TOKEN` fehlen als GitHub-Secrets → Karten-Tabs leer, Formular im mailto-Fallback. Werte vom Betreiber erfragen, nur als Secrets eintragen (Repo ist PUBLIC — nichts ins Repo committen; ggf. Visibility auf Private stellen, Betreiber wurde darauf hingewiesen).
- Sichtbare Text-Platzhalter: Maria-Bio `[ОБРАЗОВАНИЕ/СЕРТИФИКАЦИЯ]` (D3) + Footer-Rechtsform (D4).
- Default-Branch-Umstellung auf `main` verifizieren; alte `claude/*`-Branches aufräumen.
- Lighthouse auf der Live-Domain nachmessen (B5; gzip via .htaccess sollte jetzt greifen).

---

## Stand nach Bootstrap-Session 2026-06-10 (Phase-1-Build, historisch)

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

## Offene Entscheidungen (D1–D6, §10) — Stand nach 2026-06-10

- **D1 Domain: ✅ entschieden — mariaschroeder.com** (liegt im Strato-Panel; SSL noch aktivieren). Offen aus D1: E-Mail (Vorschlag `kontakt@mariaschroeder.com`, Postfach in Strato anlegen), WhatsApp-Nr., Telegram → `content/site.config.ts`
- **D2 Hosting: ✅ entschieden — Strato-Webspace** → Deploy = Static Export, komplette Anleitung in **`DEPLOY.md`** (Unterordner + Domain-Zuordnung, SSL, ENV beim Build, rsync/SFTP, Checkliste). `trailingSlash` + `.htaccess` (gzip, Caching, 404) sind dafür bereits eingebaut
- D3 Porträt: Datei als `assets/photos-src/maria.jpg` (+ `maria.credit.json` „© privat") → `npm run photos:build`
- D4 Rechtsform/Anschrift: `FOOTER.legalLine` in `copy.ru.ts` + Impressum-Seite
- D5 Preise final + spotsLeft, D6 EB-Deadline: `content/site.config.ts`

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

**Heimat-Repo: `kryptobux/Maria`.** Das Projekt wurde am 2026-06-10 in einer auf `Angebot_TS` festgelegten Session gebootstrapped (Unterordner `maria-schroeder-sicily/`) und anschließend per `git subtree split` mit voller Historie exportiert (Branch `maria-export` in Angebot_TS → Import nach kryptobux/Maria, Anleitung im Migrations-Commit/Chat). Das Bestandsprojekt in Angebot_TS wurde nicht angefasst; der Unterordner dort wird nach bestätigtem Import entfernt.
