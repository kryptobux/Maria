# DEPLOY — mariaschroeder.com auf Strato (Static Export)

> Entschieden 2026-06-10 (D1/D2): Domain **mariaschroeder.com**, Hosting **Strato-Webspace**
> (Master `511850234.swh.strato-hosting.eu`, Webspace-Pfad `/mnt/rid/02/34/511850234/htdocs`).
> Strato-Shared-Hosting hat **kein Node** → es wird der **Static Export** deployt (`out/`).
> ⚠️ Auf demselben Webspace liegen weitere Domains (u. a. putzcompany.de, die stayquotes-Landings).
> **Niemals in die `htdocs`-Wurzel synchronisieren — immer in den eigenen Unterordner!**

## Automatisch: GitHub Actions (Standardweg seit 2026-06-10)

Jeder Push auf `main` baut den Static Export und lädt ihn nach `htdocs/mariaschroeder/`
(`.github/workflows/deploy.yml`; manuell auslösbar über *Actions → Deploy zu Strato → Run workflow*).
Einmalig im Repo unter *Settings → Secrets and variables → Actions* hinterlegen:

| Secret | Wert |
|--------|------|
| `STRATO_SSH_USER` | Master-/SSH-Benutzer (Strato-Panel → „SFTP & SSH") |
| `STRATO_SSH_PASSWORD` | zugehöriges Passwort (Strato-SSH kann nur Passwort-Auth) |
| `STRATO_SSH_HOST` | optional, Default `511850234.swh.strato-hosting.eu` |
| `GOOGLE_MAPS_EMBED_KEY` `N8N_WEBHOOK_URL` `N8N_TOKEN` | optional — ohne sie greifen die Fallbacks (keine Karten, Formular → mailto) |

Die Schritte 0 (Panel) bleiben einmalig nötig; Schritte 1–2 unten sind der manuelle Fallback.

## 0. Einmalig: Strato-Panel vorbereiten

1. **Unterordner anlegen:** per SFTP in `htdocs` den Ordner `mariaschroeder/` erstellen.
2. **Domain zuordnen:** Strato-Panel → *Domains → Domainverwaltung → mariaschroeder.com → Verzeichnis zuordnen* → `/mariaschroeder` (inkl. `www.`-Subdomain auf dasselbe Ziel).
3. **SSL aktivieren:** *Domains → SSL („Verschlüsseln“-Button bei mariaschroeder.com)* → Strato-Inklusiv-Zertifikat aktivieren; danach in der hochgeladenen `.htaccess` den auskommentierten HTTPS-Redirect-Block einschalten und erneut hochladen.
4. **E-Mail (D1):** Postfach anlegen, z. B. `kontakt@mariaschroeder.com` → Wert in `content/site.config.ts` (`SITE.email`) eintragen.

## 1. Build (lokal oder CI)

```bash
cd maria-schroeder-sicily
npm install

# Produktions-ENV für den Static Export (wird beim Build INLINED):
export NEXT_PUBLIC_SITE_URL="https://mariaschroeder.com"
export GOOGLE_MAPS_EMBED_KEY="…"   # Embed API Key, im Google-Panel auf Referrer mariaschroeder.com einschränken
export N8N_WEBHOOK_URL="…"          # Lead-Ziel; ohne diesen Wert fällt das Formular auf mailto/Fehlerhinweis zurück
export N8N_TOKEN="…"               # wird im Static Export Teil des Client-Bundles → als Routing-Token behandeln

npm run qa            # Gates + beide Builds; mindestens aber:
npm run build:static  # erzeugt out/
```

## 2. Upload

**Variante A — rsync über SSH** (Paket hat SSH, s. Panel „SFTP & SSH“):

```bash
rsync -av --delete out/ <master-user>@511850234.swh.strato-hosting.eu:/htdocs/mariaschroeder/
```

**Variante B — SFTP** (FileZilla o. ä.): Inhalt von `out/` (inkl. `.htaccess`!) nach `htdocs/mariaschroeder/` spiegeln; gelöschte Dateien manuell entfernen.

`--delete` ist hier sicher, weil es nur den Unterordner betrifft — Pfad vor dem ersten Lauf doppelt prüfen.

## 3. Nach jedem Deploy prüfen

- [ ] `https://mariaschroeder.com` lädt mit gültigem Zertifikat (nach Schritt 0.3)
- [ ] `/impressum/`, `/datenschutz/`, `/agb/`, `/credits/` antworten (trailingSlash-Routen)
- [ ] Karten-Tabs laden (Embed-Key-Variante; Browser-Konsole auf Referrer-Fehler prüfen)
- [ ] Formular-Testlead kommt in n8n an (Honeypot leer lassen, > 3 s nach Seitenladen absenden)
- [ ] `curl -sI -H 'Accept-Encoding: gzip' https://mariaschroeder.com | grep -i content-encoding` → `gzip` (sonst greift `mod_deflate` nicht → Strato-PHP/Apache-Doku prüfen)
- [ ] Lighthouse erneut messen (Erwartung: Perf ≥ 90 mit Kompression; in-Container-Messung war 74 ohne gzip)

## Hinweise

- **OG/Canonical** zeigen über `SITE.domain` bzw. `NEXT_PUBLIC_SITE_URL` auf mariaschroeder.com; `sitemap.xml`/`robots.txt` liegen im Export.
- Formular-Architektur: auf Strato gibt es kein `/api/lead` — der Static Export postet **direkt** an den n8n-Webhook (Payload-Spez. §7.2, Token im Body). n8n-Flow sollte Honeypot (`website`) und `ts` zusätzlich serverseitig prüfen.
- Sobald echte Fotos verarbeitet sind (`npm run photos:build && npm run og:build`), einfach neu bauen + hochladen.
