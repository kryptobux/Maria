/**
 * Central site configuration (see HANDOVER §4.3).
 * TODO values are open decisions D1/D5/D6 — the UI degrades gracefully
 * (contact buttons hidden, canonical URL falls back to env).
 */
export const SITE = {
  dates: '13–19 сентября 2026',
  deadline: '2026-07-05T23:59:59+02:00', // Early Bird, TZ Europe/Berlin (D6)
  deadlineHuman: '5 июля 2026',
  spotsLeft: 9, // D5: confirm starting value
  email: 'TODO@…', // D1 offen — Vorschlag: Postfach kontakt@mariaschroeder.com im Strato-Panel anlegen
  whatsapp: 'TODO', // D1: international number, digits only (e.g. 4915512345678)
  telegram: 'TODO', // D1: username without @
  domain: 'mariaschroeder.com', // ENTSCHIEDEN 2026-06-10 (Strato; SSL im Panel aktivieren — siehe DEPLOY.md)
} as const;

export const PRICES = {
  riserva: 3290,
  granCru: 5190,
  earlyBird: 200, // discount per guest, both tariffs (D5)
  singleRiserva: 480,
  singleGranCru: 750,
  currency: 'EUR',
} as const;

/** True when the value is still a TODO placeholder from the handover. */
export const isTodo = (v: string) => v.startsWith('TODO');

/** Canonical origin: explicit env → configured domain → neutral fallback. */
export function siteOrigin(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (env) return env.replace(/\/$/, '');
  if (!isTodo(SITE.domain)) return `https://${SITE.domain}`;
  return 'https://maria-schroeder-sicily.invalid'; // replaced once D1 is decided
}

const WA_PRESET =
  'Здравствуйте, Мария! Интересует винное путешествие по Сицилии 13–19 сентября 2026.';

export function whatsappHref(): string | null {
  if (isTodo(SITE.whatsapp)) return null;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(WA_PRESET)}`;
}

export function telegramHref(): string | null {
  if (isTodo(SITE.telegram)) return null;
  return `https://t.me/${SITE.telegram}`;
}

export function mailtoHref(): string | null {
  if (isTodo(SITE.email)) return null;
  return `mailto:${SITE.email}?subject=${encodeURIComponent('Сицилия 13–19.09.2026')}`;
}
