'use client';

import { useEffect, useRef, useState } from 'react';
import { BOOKING } from '@/content/copy.ru';
import { PRESET_TARIFF_EVENT } from './TariffCta';

export type LeadEndpoint =
  | { mode: 'api'; url: string }
  | { mode: 'direct'; url: string; token: string }
  | { mode: 'mailto'; email: string }
  | { mode: 'none' };

type Props = {
  endpoint: LeadEndpoint;
  whatsappHref: string | null;
  telegramHref: string | null;
};

type Status = 'idle' | 'sending' | 'success' | 'error';

const inputCls =
  'w-full rounded-[3px] border border-gold/20 bg-basalt px-4 py-3 text-[15px] text-cream placeholder:text-muted/60 focus:border-gold/60 focus:outline-none';
const labelCls = 'mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-muted';

/**
 * Lead form (§7.2): prototype fields + honeypot + render timestamp.
 * Submits to /api/lead (server mode) or directly to the n8n webhook
 * (static export). Payload shape is fixed by the handover.
 */
export default function BookingForm({ endpoint, whatsappHref, telegramHref }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [tariff, setTariff] = useState('');
  const renderTs = useRef<number>(Date.now());

  useEffect(() => {
    renderTs.current = Date.now();
    const onPreset = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (typeof detail === 'string') setTariff(detail);
    };
    window.addEventListener(PRESET_TARIFF_EVENT, onPreset);
    return () => window.removeEventListener(PRESET_TARIFF_EVENT, onPreset);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      source: 'landing-sicily-2026',
      name: String(data.get('name') ?? ''),
      country: String(data.get('country') ?? ''),
      guests: String(data.get('guests') ?? ''),
      messenger: String(data.get('messenger') ?? ''),
      contact: String(data.get('contact') ?? ''),
      tariff: String(data.get('tariff') ?? ''),
      note: String(data.get('note') ?? ''),
      ts: renderTs.current,
      website: String(data.get('website') ?? ''), // honeypot — must stay empty
    };

    if (endpoint.mode === 'mailto') {
      const body = [
        `Имя: ${payload.name}`,
        `Страна: ${payload.country}`,
        `Гостей: ${payload.guests}`,
        `Мессенджер: ${payload.messenger}`,
        `Контакт: ${payload.contact}`,
        `Тариф: ${payload.tariff}`,
        `Комментарий: ${payload.note}`,
      ].join('\n');
      window.location.href = `mailto:${endpoint.email}?subject=${encodeURIComponent(
        'Заявка: Сицилия 13–19.09.2026',
      )}&body=${encodeURIComponent(body)}`;
      return;
    }

    if (endpoint.mode === 'none') {
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      const body =
        endpoint.mode === 'direct' ? { ...payload, token: endpoint.token } : payload;
      const res = await fetch(endpoint.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  const hasMessengers = Boolean(whatsappHref || telegramHref);

  return (
    <section id="booking" className="section-pad bg-basalt-2">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div>
          <p className="eyebrow">{BOOKING.eyebrow}</p>
          <h2 className="h-display mt-5 text-[clamp(1.9rem,4vw,2.9rem)] text-cream">
            {BOOKING.title}
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted">{BOOKING.sub}</p>

          {hasMessengers ? (
            <div className="mt-9">
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-muted">
                {BOOKING.directTitle}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {whatsappHref ? (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost !px-5 !py-2.5"
                  >
                    WhatsApp
                  </a>
                ) : null}
                {telegramHref ? (
                  <a
                    href={telegramHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost !px-5 !py-2.5"
                  >
                    Telegram
                  </a>
                ) : null}
              </div>
            </div>
          ) : null}

          <p className="mt-9 max-w-md text-[12px] leading-relaxed text-muted/80">
            {BOOKING.privacy}
          </p>
        </div>

        <div className="rounded-lg border border-gold/15 bg-basalt p-7 md:p-10">
          {status === 'success' ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 text-[22px] text-gold">
                ✓
              </span>
              <p className="mt-6 max-w-sm font-display text-[20px] leading-snug text-cream">
                {BOOKING.success}
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate={false}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="lead-name" className={labelCls}>
                    {BOOKING.fields.name} *
                  </label>
                  <input id="lead-name" name="name" required className={inputCls} />
                </div>
                <div>
                  <label htmlFor="lead-country" className={labelCls}>
                    {BOOKING.fields.country}
                  </label>
                  <input id="lead-country" name="country" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="lead-guests" className={labelCls}>
                    {BOOKING.fields.guests}
                  </label>
                  <select id="lead-guests" name="guests" className={inputCls} defaultValue="">
                    <option value="" disabled hidden />
                    {BOOKING.fields.guestsOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="lead-messenger" className={labelCls}>
                    {BOOKING.fields.messenger}
                  </label>
                  <select id="lead-messenger" name="messenger" className={inputCls} defaultValue="">
                    <option value="" disabled hidden />
                    {BOOKING.fields.messengerOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="lead-contact" className={labelCls}>
                    {BOOKING.fields.contact} *
                  </label>
                  <input id="lead-contact" name="contact" required className={inputCls} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="lead-tariff" className={labelCls}>
                    {BOOKING.fields.tariff}
                  </label>
                  <select
                    id="lead-tariff"
                    name="tariff"
                    className={inputCls}
                    value={tariff}
                    onChange={(e) => setTariff(e.target.value)}
                  >
                    <option value="" disabled hidden />
                    {BOOKING.fields.tariffOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="lead-note" className={labelCls}>
                    {BOOKING.fields.note}
                  </label>
                  <textarea id="lead-note" name="note" rows={3} className={inputCls} />
                </div>
              </div>

              {/* Honeypot — visually hidden, real users never fill it */}
              <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
                <label htmlFor="lead-website">Website</label>
                <input id="lead-website" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn btn-primary mt-7 w-full disabled:opacity-60"
              >
                {status === 'sending' ? BOOKING.sending : BOOKING.submit}
              </button>

              {status === 'error' ? (
                <p role="alert" className="mt-4 text-center text-[13px] leading-relaxed text-ember-2">
                  {BOOKING.error}
                </p>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
