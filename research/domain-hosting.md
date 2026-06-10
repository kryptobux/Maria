# Domain-Shortlist & Hosting-Empfehlung — Personal Brand „Maria Schröder" (Sommelière / Weinreisen)

**Stand:** 2026-06-10 · **Task R9 aus HANDOVER §9**

> **ENTSCHEIDUNG 2026-06-10 (Jury):** Domain = **mariaschroeder.com**, Hosting = **Strato-Webspace** (bestehender Vertrag, Domain bereits aktiviert, SSL noch einzuschalten). Damit gilt der Static-Export-Pfad; Umsetzung siehe `DEPLOY.md`. Die Analyse unten bleibt als Begründungs-/Vergleichsdokument stehen.

> Kontext: Landing-Page (Next.js 15) für die Personal Brand von Sommelière Maria Schröder, primär **russischsprachige Zielgruppe** (in DE/EU lebend), Produkt: Premium-Weinreisen (Start: Sizilien 09/2026). Zwei Build-Pfade existieren im Repo: Vercel-Server-Build **und** Static Export (`out/`) für eigenen VPS hinter nginx.

---

## 1. Vorüberlegung: Das „ö"-Problem (Transliteration für RU-Publikum)

- Russisch wird „Schröder" als **„Шрёдер"** transkribiert — im Alltag aber meist **„Шредер"** geschrieben (das Trema auf ё wird oft weggelassen). Beim Rück-Tippen in lateinischer Schrift entstehen viele Varianten: `schroder`, `shreder`, `shroeder`, `schroeder`.
- **Umlaut-Domains (IDN)** wie `mariaschröder.de` werden technisch zu Punycode (`xn--…`) — schlecht vorlesbar, fehleranfällig, auf RU-Tastaturen ohne „ö" nicht tippbar und für E-Mail-Adressen praktisch unbrauchbar (Zustell-/Eingabeprobleme) ⚠️.
- **Empfehlung:** ausschließlich die ASCII-Schreibweise **`schroeder`** verwenden (deutsch korrekt als Umlaut-Ersatzschreibweise, eindeutig tippbar, eindeutig vorlesbar: „es-ce-aitch-er-o-e…" bzw. auf Russisch buchstabierbar). Optional die häufigste Tippfehler-Variante (`schroder`) defensiv mitregistrieren, wenn billig.
- Alternative Strategie: Domain ganz **ohne Nachnamen** (z. B. `vino-maria.com`) — umgeht das Problem komplett, schwächt aber die Personal Brand.

## 2. Domain-Shortlist (10 Kandidaten + 2 Sonderfälle)

> ⚠️ **Verfügbarkeit wurde NICHT geprüft** (aus dieser Umgebung nicht zuverlässig möglich — Suchmaschinen-Treffer ersetzen keinen Registry-Check). Prüf-Anleitung siehe 2.1. Preisniveaus = Größenordnungen aus Registrar-/Vergleichsseiten, Erstjahres-Aktionspreise weichen stark von Verlängerungspreisen ab ⚠️.

| # | Kandidat | Pro | Contra | Preisniveau/Jahr (ca.) | E-Mail-Eignung |
|---|---|---|---|---|---|
| 1 | **mariaschroeder.wine** | Brand + Kategorie in einem; „wine" versteht das RU-Publikum sofort; als Marke auf Etiketten/Insta stark | .wine-Verlängerung deutlich teurer als .com; lange Adresse (18 Zeichen + TLD) | Erstjahr oft 5–15 €, Verlängerung ⚠️ ~30–75 € (Gandi ~72 USD; Spanne 5–144 USD je Registrar) | gut, aber lang; exotische TLD ⚠️ minimal höheres Spam-Risiko bei Empfängern |
| 2 | **maria-schroeder.wine** | Bindestrich erhöht Lesbarkeit (DE-üblich) | RU-Publikum vergisst Bindestriche beim Tippen; zwei Varianten nötig (#1 + #2) | wie #1 | wie #1, Bindestrich diktiert sich schlecht |
| 3 | **schroeder.wine** | kurz, edel, merkfähig („Schröder-Wein") | weniger „Maria"/persönlich; generischer Nachname → evtl. vergeben/begehrt ⚠️ | wie #1 | gut (kurz) |
| 4 | **maria.wine** | maximal kurz & charmant | Ein-Wort-Domains sind häufig vergeben oder **Premium-Preis** ⚠️ | Standard bis Premium (vierstellig möglich) ⚠️ | sehr gut, falls verfügbar |
| 5 | **mariaschroeder.com** | .com = weltweit höchstes Vertrauen, auch bei RU-Publikum Standard; beste E-Mail-Reputation | generisch, Name evtl. schon vergeben (verbreiteter Name) ⚠️ | ~10–15 € ⚠️ | **ideal** (Empfehlung als Mail-Domain) |
| 6 | **maria-schroeder.com** | Fallback falls #5 weg; gut lesbar | Bindestrich-Problem wie #2; Verwechslung mit #5 | ~10–15 € ⚠️ | gut |
| 7 | **mariaschroeder.eu** | günstig; EU-Bezug passt zu „lebt in DE, reist in EU" | für RU-Publikum wenig vertraut; .eu erfordert EU-Ansässigkeit (für Maria ok); geringere Merkkraft | ~5–10 € ⚠️ | ok |
| 8 | **mariaschroeder.de** | in DE lebende RU-sprachige Zielgruppe kennt .de gut; billig; seriös | begrenzt international; Brand soll über DE hinaus wachsen | ~5–10 € ⚠️ | gut |
| 9 | **mariaschroeder.travel** | klare Reise-Kategorie; Branchen-TLD wirkt professionell | **teuerste Option** (Ø ~97 USD, Verlängerung teils ab ~114 USD ⚠️); Registrierung nur für Reisebranche mit Verifizierung (UIN über Branchenverband oder Self-Vetting je nach Registrar) + Pflicht, binnen 1 Jahr Reise-Content zu zeigen; für E-Mail ungewohnt | ~20 € Aktion, regulär ~95–115 € ⚠️ | mäßig (ungewohnte TLD irritiert Empfänger) |
| 10 | **vino-maria.com** | „vino" = international + nah am russischen „вино"; kein Umlaut-/Nachnamen-Problem; leicht diktierbar | schwächere Personal Brand (Nachname fehlt); verwechselbar mit anderen „Vino-Maria"-Projekten ⚠️ | ~10–15 € ⚠️ | gut |
| 11 | **etna-journey.com** (Sonderfall) | starke Projekt-/Kampagnendomain für die Sizilienreise (Ätna!); bildstark | keine Personenmarke; „journey" für Teile des RU-Publikums nicht intuitiv; pro Reiseziel neue Domain nötig → Streuverlust | ~10–15 € ⚠️ | mäßig (Projekt-, nicht Absenderdomain) |
| 12 | **mariaschroeder.ru** (Sonderfall, **nicht empfohlen**) | spricht Zielgruppe direkt an | Registrierung/Verwaltung aus DE derzeit kompliziert (Zahlungswege, lokale Anforderungen) ⚠️; Reputations-/Compliance-Risiko für eine DE-Firma; Zielgruppe lebt ohnehin in EU | ~3–10 € ⚠️ | nicht empfohlen |

**Bewertung / Empfehlung (Vorschlag, Entscheidung bei Maria/Jury):**
1. **Primär: `mariaschroeder.wine`** als Marken- und Web-Domain (Kategorie + Name, RU-tauglich, frei verfügbar wahrscheinlicher als .com) — Verlängerungspreis vor Kauf prüfen!
2. **Parallel: `mariaschroeder.com`** sichern (falls frei) und als **E-Mail-Domain** nutzen (`maria@mariaschroeder.com`); .wine leitet auf die Landing, .com trägt Mail + Weiterleitung.
3. Budget-Variante, falls .com vergeben: `.de` + `.wine` im Bündel; `.travel` wegen Preis/Verifizierungsaufwand nur, wenn die Marke später stark auf „Reisen" positioniert wird.
4. Defensiv (optional, je ~10 €): `maria-schroeder.com`/`.wine` und Tippfehler `mariaschroder.com` ⚠️ nur wenn günstig.

### 2.1 Verfügbarkeit in 5 Minuten selbst prüfen (Anleitung für Jury)

1. Registrar-Suche mit **Bulk-Check** öffnen — z. B. INWX („Domain-Check"), Namecheap („Bulk Domain Search") oder Porkbun; alle zeigen Verfügbarkeit live aus der Registry.
2. Alle 10–12 Kandidaten in einem Rutsch einfügen (eine Domain pro Zeile), Suche starten.
3. Bei jedem freien Kandidaten **auf den Verlängerungspreis („Renewal") klicken**, nicht nur auf den Aktions-Erstjahrespreis — bei .wine/.travel unterscheiden die sich um Faktor 5–10 ⚠️.
4. Gegencheck für „belegt, aber inaktiv": `whois mariaschroeder.com` im Terminal bzw. who.is im Browser (zeigt Ablaufdatum/Inhaberstatus).
5. Wunschkandidaten sofort in den Warenkorb — freie gute Domains nicht „über Nacht liegen lassen" (Domain-Sniping-Risiko ⚠️). WHOIS-Privacy aktivieren, Auto-Renew an.

## 3. Hosting der Next-15-Landing: Vercel vs. vorhandener Hostinger-VPS

### 3.1 Faktenvergleich

| Kriterium | **Vercel Hobby (Free)** | **Vercel Pro** | **Hostinger-VPS (vorhanden) + nginx** |
|---|---|---|---|
| Preis | 0 € | **20 USD/Nutzer/Monat** (inkl. 20 USD Nutzungs-Credit) | bereits bezahlt; Listenpreise KVM-Pläne ca. **5,49–19,99 €/Monat** ⚠️ (Sunk Cost, keine Zusatzkosten für die Landing) |
| Kommerzielle Nutzung | **nicht erlaubt** (nur „personal, non-commercial use") → für eine kommerzielle Reise-Landing formal ungeeignet | erlaubt | erlaubt |
| Limits | 100 GB Transfer, 1 Mio. Edge-Requests, 1 Mio. Function-Invocations/Monat; bei Überschreitung Sperre bis Monatsende | 1 TB Transfer, 10 Mio. Edge-Requests inkl.; danach z. B. 0,15 USD/GB | VPS-Bandbreite laut Plan (für eine Landing mit ≤ 12 Gästen/Reise irrelevant) |
| Build-Pfad | Server-Build (SSR/ISR, Previews, Formulare via Functions) | wie Hobby + Team-Features | **Static Export** (`output: 'export'` → `out/` als reine Statik); kein Node-Prozess nötig; Einschränkungen: kein SSR, kein `next/image`-Optimizer ohne Custom Loader (z. B. next-image-export-optimizer) |
| TLS | automatisch | automatisch | **Let's Encrypt via certbot**, Auto-Renew per systemd-Timer — einmal einrichten, dann wartungsarm |
| Wartung | keine | keine | OS-/nginx-Updates, Monitoring selbst (bei statischer Seite minimal; unattended-upgrades aktivieren) |
| DSGVO/Datenstandort | US-Anbieter; unter **EU-US Data Privacy Framework zertifiziert**, SCCs im DPA; Functions in EU-Region (z. B. Frankfurt) konfigurierbar, aber **keine dauerhafte Datenspeicherung in der EU garantiert** (Caching ephemeral) | wie Hobby | Hostinger = **EU-Unternehmen (Litauen)** ⚠️, Serverstandort wählbar (EU-Rechenzentren) ⚠️ → kein US-Drittlandtransfer fürs reine Hosting; einfacherer Datenschutztext |

### 3.2 Empfehlung (5 Sätze)

1. **Empfehlung: Static Export auf dem vorhandenen Hostinger-VPS hinter nginx**, denn die Landing ist inhaltlich statisch (Programm, Tarife, Kontakt) und braucht weder SSR noch Edge-Functions.
2. Das kostet **0 € zusätzlich**, während die formal korrekte Vercel-Lösung für eine kommerzielle Seite der Pro-Plan ab 20 USD/Monat wäre — der kostenlose Hobby-Plan schließt kommerzielle Nutzung aus.
3. **DSGVO-seitig** ist der EU-VPS die einfachere Geschichte: kein US-Anbieter in der Verarbeitungskette (Vercel ist zwar unter dem EU-US Data Privacy Framework zertifiziert, bleibt aber ein US-Transfer-Thema mit Zusatzaufwand in der Datenschutzerklärung und Rest-Risiko bei einem Kippen des Frameworks ⚠️).
4. Der Wartungsaufwand ist bei einer rein statischen Seite minimal: nginx-Vhost + certbot-Auto-Renew einmal aufsetzen, Deploy = `next build` (mit `output: 'export'`) und `rsync` von `out/` — als 10-Zeilen-Skript automatisierbar; einzig `next/image` braucht den Export-Workaround (Custom Loader bzw. next-image-export-optimizer).
5. **Wechsel-Option bleibt offen:** Wenn später Buchungsformulare mit Server-Logik, Previews oder A/B-Tests gewünscht sind, lässt sich derselbe Code jederzeit auf Vercel Pro deployen — daher beide Build-Pfade im Repo behalten.

---

## Quellen

**Domains/TLD-Preise & Vergabe:**
- [.wine Preisvergleich über Registrare — tld-list.com](https://tld-list.com/tld/wine)
- [.wine bei Namecheap (Aktionspreis ~5,98 USD)](https://www.namecheap.com/domains/registration/gtld/wine/)
- [.wine bei Gandi (~72 USD/Jahr)](https://www.gandi.net/en-US/domain/tld/wine)
- [.travel Preisvergleich — tld-list.com](https://tld-list.com/tld/travel)
- [.travel Preisvergleich — domainoffer.net](https://domainoffer.net/tld/travel)
- [.travel Vergaberichtlinien (Eligibility/UIN/Self-Vetting) — OpenSRS](https://support.opensrs.com/support/solutions/articles/201000063589--travel-domain-policies)
- [.travel Branchenbindung — active-domain.com](https://www.active-domain.com/dot-travel/)

**Hosting:**
- [Vercel Pricing (Hobby/Pro)](https://vercel.com/pricing)
- [Vercel Hobby-Plan: Limits & „non-commercial use"](https://vercel.com/docs/plans/hobby)
- [Vercel Pro-Plan](https://vercel.com/docs/plans/pro-plan)
- [Vercel: Zertifizierung EU-US Data Privacy Framework](https://vercel.com/changelog/vercel-is-now-certified-under-the-eu-us-data-privacy-framework-dpf)
- [Vercel Data Processing Addendum](https://vercel.com/legal/dpa)
- [GDPR & Vercel Functions / EU-Regionen (ephemeres Caching)](https://www.contentinsights.dev/2025/02/content-insights-tip-74-gdpr-and-vercel.html)
- [Hostinger VPS-Hosting (KVM-Pläne, Preise)](https://www.hostinger.com/vps-hosting)
- [Hostinger Ubuntu-VPS](https://www.hostinger.com/vps/ubuntu-hosting)
- [Next.js: Static Exports Guide](https://nextjs.org/docs/pages/guides/static-exports)
- [Next.js: Self-Hosting Guide](https://nextjs.org/docs/app/guides/self-hosting)
- [next-image-export-optimizer (Bilder bei Static Export)](https://github.com/Niels-IO/next-image-export-optimizer)
