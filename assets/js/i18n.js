/* =========================================================
   Maria Schroeder · Weinsommelière — i18n (DE / EN)
   ========================================================= */
(function () {
  "use strict";

  var I18N = {
    de: {
      "nav.about": "Über mich", "nav.services": "Leistungen", "nav.cellar": "Weinwelten",
      "nav.process": "Ablauf", "nav.testimonials": "Stimmen", "nav.cta": "Termin anfragen",

      "hero.eyebrow": "Weinsommelière · Berlin & deutschlandweit",
      "hero.title": "Wein, der <em>Geschichten</em><br />erzählt.",
      "hero.lead": "Ich begleite Sie durch die Welt großer Weine — von der privaten Verkostung über die Kuratierung Ihres Kellers bis zur perfekten Begleitung Ihres Menüs.",
      "hero.btnBook": "Verkostung buchen", "hero.btnServices": "Leistungen entdecken",
      "hero.stat1": "Jahre Erfahrung", "hero.stat2": "verkostete Weine / Jahr", "hero.stat3": "Weinregionen bereist",

      "about.badgeTop": "Ausgezeichnet", "about.badgeTitle": "Sommelière des Jahres",
      "about.eyebrow": "Über mich", "about.title": "Eine Nase für das Besondere.",
      "about.p1": "Mein Name ist Maria Schroeder. Seit über fünfzehn Jahren widme ich mich der Kunst, Menschen und Wein zusammenzubringen. Ausgebildet an der Deutschen Wein- und Sommelierschule, geprägt von Jahren in der Spitzengastronomie und unzähligen Reisen durch die großen Anbaugebiete Europas.",
      "about.p2": "Für mich ist Wein kein Statussymbol, sondern Handwerk, Herkunft und Emotion. Ich übersetze das, was im Glas passiert — verständlich, unverkrampft und immer mit Leidenschaft.",
      "about.li1": "Geprüfte Sommelière (IHK) & WSET Level 3",
      "about.li2": "Spezialisierung auf Burgund, Mosel & Naturweine",
      "about.li3": "Beraterin für Privatkeller und Restaurants",
      "about.link": "Lernen wir uns kennen →",

      "services.eyebrow": "Leistungen", "services.title": "Maßgeschneiderte Weinerlebnisse.",
      "services.sub": "Ob intimer Abend zu zweit oder Firmenevent — jedes Erlebnis wird individuell für Sie komponiert.",
      "services.c1t": "Private Verkostungen",
      "services.c1p": "Geführte Tastings bei Ihnen zu Hause. Sechs bis acht Weine, thematisch kuratiert, mit Geschichten zu Winzer und Terroir.",
      "services.c1price": "ab 180 € p. P.",
      "services.c2t": "Menübegleitung",
      "services.c2p": "Das perfekte Pairing für Ihr Dinner. Ich stimme jeden Gang auf den passenden Wein ab — diskret serviert oder lebhaft erzählt.",
      "services.c2price": "auf Anfrage",
      "services.c3t": "Keller-Kuratierung",
      "services.c3p": "Aufbau und Pflege Ihres persönlichen Weinkellers — von der Trinkreife bis zur Investitionsstrategie.",
      "services.c3price": "ab 90 € / Std.",
      "services.c4t": "Events & Firmen",
      "services.c4p": "Weinseminare, Teamevents und Blindverkostungen, die in Erinnerung bleiben — für Gruppen von 8 bis 80 Personen.",
      "services.c4price": "individuelles Angebot",

      "cellar.eyebrow": "Weinwelten", "cellar.title": "Regionen, die mein Herz höher schlagen lassen.",
      "region.burgundyName": "Burgund", "region.burgundyText": "Pinot Noir & Chardonnay in ihrer reinsten Form — Eleganz, Finesse, Terroir.",
      "region.moselName": "Mosel", "region.moselText": "Riesling von Schieferböden: vibrierend, mineralisch, unsterblich.",
      "region.piedmontName": "Piemont", "region.piedmontText": "Nebbiolo aus Barolo & Barbaresco — kraftvoll, vielschichtig, langlebig.",
      "region.riojaName": "Rioja", "region.riojaText": "Tempranillo mit Reife und Wärme, zwischen Tradition und Moderne.",
      "region.champagneName": "Champagne", "region.champagneText": "Vom Winzersekt bis zum großen Jahrgang — Spannung auf der Zunge.",
      "region.naturalName": "Naturwein", "region.naturalText": "Ungeschönt, lebendig, ehrlich — die spannendste Bewegung im Glas.",
      "country.france": "Frankreich", "country.germany": "Deutschland", "country.italy": "Italien",
      "country.spain": "Spanien", "country.worldwide": "weltweit",

      "process.eyebrow": "Ablauf", "process.title": "In vier Schritten zum Erlebnis.",
      "process.s1t": "Kennenlernen", "process.s1p": "Wir sprechen über Anlass, Geschmack und Budget — ganz unverbindlich.",
      "process.s2t": "Kuratierung", "process.s2p": "Ich stelle eine Auswahl zusammen, die genau zu Ihnen passt.",
      "process.s3t": "Das Erlebnis", "process.s3p": "Verkostung, Dinner oder Event — geführt, persönlich, entspannt.",
      "process.s4t": "Nachklang", "process.s4p": "Sie erhalten Ihre persönliche Weinliste mit allen Empfehlungen.",

      "testimonials.eyebrow": "Stimmen", "testimonials.title": "Was Gäste erzählen.",
      "testimonials.q1": "„Maria hat unseren Hochzeitstag in ein Fest der Sinne verwandelt. Jeder Wein eine kleine Reise.“",
      "testimonials.q2": "„Endlich jemand, der Wein erklärt, ohne zu belehren. Unser Team spricht heute noch davon.“",
      "testimonials.q2c": "— Dr. T. Wegener, Geschäftsführer",
      "testimonials.q3": "„Sie hat meinen Keller komplett neu gedacht — mit Gespür, Wissen und Geduld.“",
      "testimonials.q3c": "— H. Brandt, Sammler",

      "gallery.eyebrow": "Augenblicke", "gallery.title": "Momente, die im Glas beginnen.",
      "gallery.cap1": "Anstoßen", "gallery.cap2": "Die Auswahl", "gallery.cap3": "Im Weinberg",
      "gallery.cap4": "Der gedeckte Tisch", "gallery.cap5": "Reife & Tiefe",

      "contact.eyebrow": "Kontakt", "contact.title": "Lassen Sie uns das Glas erheben.",
      "contact.p": "Erzählen Sie mir von Ihrem Anlass — ich melde mich innerhalb von 24 Stunden mit einem unverbindlichen Vorschlag.",
      "contact.location": "Berlin · deutschlandweit buchbar",

      "form.name": "Name", "form.namePh": "Ihr Name", "form.email": "E-Mail",
      "form.occasion": "Anlass", "form.choose": "Bitte wählen…",
      "form.optEvent": "Event / Firma", "form.optOther": "Sonstiges",
      "form.message": "Ihre Nachricht", "form.messagePh": "Worum geht es?", "form.submit": "Anfrage senden",
      "form.err": "Bitte füllen Sie Name, eine gültige E-Mail und den Anlass aus.",
      "form.sending": "Wird gesendet…",
      "form.success": "Vielen Dank! Ihre Anfrage ist eingegangen — ich melde mich in Kürze.",

      "footer.gallery": "Galerie", "footer.contact": "Kontakt", "footer.imprint": "Impressum",
      "footer.privacy": "Datenschutz", "footer.role": "Weinsommelière", "footer.made": "Mit Leidenschaft gemacht.",
      "footer.back": "← Zurück zur Startseite"
    },

    en: {
      "nav.about": "About", "nav.services": "Services", "nav.cellar": "Wine Worlds",
      "nav.process": "Process", "nav.testimonials": "Voices", "nav.cta": "Request a date",

      "hero.eyebrow": "Wine Sommelier · Berlin & across Germany",
      "hero.title": "Wine that tells <em>stories</em>.",
      "hero.lead": "I guide you through the world of great wines — from private tastings and curating your cellar to the perfect pairing for your menu.",
      "hero.btnBook": "Book a tasting", "hero.btnServices": "Explore services",
      "hero.stat1": "years of experience", "hero.stat2": "wines tasted / year", "hero.stat3": "wine regions travelled",

      "about.badgeTop": "Awarded", "about.badgeTitle": "Sommelier of the Year",
      "about.eyebrow": "About me", "about.title": "A nose for the extraordinary.",
      "about.p1": "My name is Maria Schroeder. For over fifteen years I have devoted myself to the art of bringing people and wine together. Trained at the German Wine and Sommelier School, shaped by years in fine dining and countless journeys through Europe's great wine regions.",
      "about.p2": "To me, wine is not a status symbol but craft, origin and emotion. I translate what happens in the glass — clearly, without pretension and always with passion.",
      "about.li1": "Certified Sommelier (IHK) & WSET Level 3",
      "about.li2": "Specialised in Burgundy, Mosel & natural wines",
      "about.li3": "Consultant for private cellars and restaurants",
      "about.link": "Let's get to know each other →",

      "services.eyebrow": "Services", "services.title": "Tailored wine experiences.",
      "services.sub": "Whether an intimate evening for two or a corporate event — every experience is composed individually for you.",
      "services.c1t": "Private Tastings",
      "services.c1p": "Guided tastings in your home. Six to eight wines, thematically curated, with stories about the winemaker and terroir.",
      "services.c1price": "from €180 p.p.",
      "services.c2t": "Menu Pairing",
      "services.c2p": "The perfect pairing for your dinner. I match each course with the right wine — served discreetly or told vividly.",
      "services.c2price": "on request",
      "services.c3t": "Cellar Curation",
      "services.c3p": "Building and caring for your personal wine cellar — from drinking maturity to investment strategy.",
      "services.c3price": "from €90 / hr",
      "services.c4t": "Events & Companies",
      "services.c4p": "Wine seminars, team events and blind tastings to remember — for groups of 8 to 80 people.",
      "services.c4price": "custom quote",

      "cellar.eyebrow": "Wine Worlds", "cellar.title": "Regions that make my heart beat faster.",
      "region.burgundyName": "Burgundy", "region.burgundyText": "Pinot Noir & Chardonnay at their purest — elegance, finesse, terroir.",
      "region.moselName": "Mosel", "region.moselText": "Riesling from slate soils: vibrant, mineral, immortal.",
      "region.piedmontName": "Piedmont", "region.piedmontText": "Nebbiolo from Barolo & Barbaresco — powerful, layered, long-lived.",
      "region.riojaName": "Rioja", "region.riojaText": "Tempranillo with maturity and warmth, between tradition and modernity.",
      "region.champagneName": "Champagne", "region.champagneText": "From grower fizz to grand vintage — tension on the tongue.",
      "region.naturalName": "Natural Wine", "region.naturalText": "Unfined, alive, honest — the most exciting movement in the glass.",
      "country.france": "France", "country.germany": "Germany", "country.italy": "Italy",
      "country.spain": "Spain", "country.worldwide": "worldwide",

      "process.eyebrow": "Process", "process.title": "Four steps to your experience.",
      "process.s1t": "Getting to know", "process.s1p": "We talk about the occasion, taste and budget — no obligation.",
      "process.s2t": "Curation", "process.s2p": "I put together a selection that fits you precisely.",
      "process.s3t": "The Experience", "process.s3p": "Tasting, dinner or event — guided, personal, relaxed.",
      "process.s4t": "Afterglow", "process.s4p": "You receive your personal wine list with all recommendations.",

      "testimonials.eyebrow": "Voices", "testimonials.title": "What guests say.",
      "testimonials.q1": "“Maria turned our wedding day into a feast for the senses. Every wine a little journey.”",
      "testimonials.q2": "“Finally someone who explains wine without lecturing. Our team still talks about it.”",
      "testimonials.q2c": "— Dr. T. Wegener, Managing Director",
      "testimonials.q3": "“She completely rethought my cellar — with intuition, knowledge and patience.”",
      "testimonials.q3c": "— H. Brandt, Collector",

      "gallery.eyebrow": "Moments", "gallery.title": "Moments that begin in the glass.",
      "gallery.cap1": "The toast", "gallery.cap2": "The selection", "gallery.cap3": "In the vineyard",
      "gallery.cap4": "The set table", "gallery.cap5": "Maturity & depth",

      "contact.eyebrow": "Contact", "contact.title": "Let's raise a glass.",
      "contact.p": "Tell me about your occasion — I'll get back to you within 24 hours with a no-obligation proposal.",
      "contact.location": "Berlin · bookable across Germany",

      "form.name": "Name", "form.namePh": "Your name", "form.email": "Email",
      "form.occasion": "Occasion", "form.choose": "Please choose…",
      "form.optEvent": "Event / Company", "form.optOther": "Other",
      "form.message": "Your message", "form.messagePh": "What's it about?", "form.submit": "Send request",
      "form.err": "Please fill in your name, a valid email and the occasion.",
      "form.sending": "Sending…",
      "form.success": "Thank you! Your request has been received — I'll be in touch shortly.",

      "footer.gallery": "Gallery", "footer.contact": "Contact", "footer.imprint": "Imprint",
      "footer.privacy": "Privacy", "footer.role": "Wine Sommelier", "footer.made": "Made with passion.",
      "footer.back": "← Back to home"
    }
  };

  /* ---- Legal pages (shared dictionary) ---- */
  I18N.de["imp.title"] = "Impressum";
  I18N.en["imp.title"] = "Imprint";
  I18N.de["ds.title"] = "Datenschutzerklärung";
  I18N.en["ds.title"] = "Privacy Policy";

  function apply(lang) {
    var dict = I18N[lang] || I18N.de;

    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (dict[k] != null) el.textContent = dict[k];
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-html");
      if (dict[k] != null) el.innerHTML = dict[k];
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-ph");
      if (dict[k] != null) el.setAttribute("placeholder", dict[k]);
    });

    // long-form blocks (e.g. legal pages): show only the active language
    document.querySelectorAll("[data-lang-block]").forEach(function (el) {
      el.hidden = el.getAttribute("data-lang-block") !== lang;
    });

    var og = document.querySelector('meta[property="og:locale"]');
    if (og) og.setAttribute("content", lang === "en" ? "en_US" : "de_DE");

    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.classList.toggle("is-active", b.getAttribute("data-lang") === lang);
    });

    try { localStorage.setItem("lang", lang); } catch (e) {}
    window.__lang = lang;
  }

  // public helper for other scripts (e.g. form messages)
  window.i18n = {
    t: function (key) {
      var d = I18N[window.__lang || "de"] || I18N.de;
      return d[key] != null ? d[key] : key;
    },
    get: function () { return window.__lang || "de"; },
    set: apply
  };

  // initial language: saved choice → browser language → German
  var saved;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  var browser = (navigator.language || "de").slice(0, 2).toLowerCase();
  apply(saved || (browser === "en" ? "en" : "de"));

  document.addEventListener("click", function (e) {
    var btn = e.target.closest && e.target.closest(".lang-switch button");
    if (btn) apply(btn.getAttribute("data-lang"));
  });
})();
