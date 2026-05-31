# Maria Florentin · Weinsommelière

Eine moderne, elegante One-Page-Website für eine Weinsommelière. Reine
statische Seite — **kein Build-Schritt nötig**, einfach im Browser öffnen.

## Vorschau

```bash
# Variante 1: Datei direkt öffnen
open index.html        # macOS
xdg-open index.html    # Linux

# Variante 2: lokaler Server (empfohlen)
python3 -m http.server 8000
# danach http://localhost:8000 im Browser
```

## Features

- **Luxuriöses Dark-Theme** in Weinrot mit Gold-Akzenten
- **Responsive** – Desktop, Tablet, Mobile inkl. Burger-Menü
- **Scroll-Animationen** via `IntersectionObserver` (reveal on scroll)
- **Sticky-Navigation** mit Scroll-Fortschrittsbalken
- **Kontaktformular** mit clientseitiger Validierung
- Eleganter Schriftmix: *Cormorant Garamond* + *Inter* (Google Fonts)
- Zugänglichkeit: semantisches HTML, ARIA-Labels, `prefers-reduced-motion`
- Keine Abhängigkeiten, kein Framework, kein Build

## Struktur

```
.
├── index.html            # Inhalt & Struktur
├── assets/
│   ├── css/style.css     # Design-System & Layout
│   └── js/main.js        # Navigation, Animationen, Formular
└── README.md
```

## Abschnitte

Hero · Über mich · Leistungen · Weinwelten · Ablauf · Stimmen · Kontakt

## Anpassen

- **Farben/Typografie:** CSS-Variablen im `:root`-Block in `assets/css/style.css`
- **Texte/Inhalte:** direkt in `index.html`
- **Bilder:** Aktuell werden kuratierte Fotos von [Unsplash](https://unsplash.com)
  per URL eingebunden (Hero, Porträt, Weinwelten, Galerie). Lädt ein Bild nicht,
  greift automatisch ein eleganter Verlauf-/Emoji-Fallback. Zum Austausch gegen
  **eigene Fotos**: Bilder unter `assets/img/` ablegen und die URLs in
  `index.html` (z. B. `--img:url('assets/img/burgund.jpg')`) bzw. den
  Hero-Hintergrund in `assets/css/style.css` ersetzen.
- **Formular:** Aktuell wird der Versand nur simuliert. Für echten Versand den
  `fetch`-Aufruf in `assets/js/main.js` an einen Endpoint (z. B. Formspree,
  Netlify Forms oder eigenes Backend) anbinden.
