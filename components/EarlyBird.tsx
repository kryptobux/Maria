'use client';

import { useEffect, useState } from 'react';
import { EARLY_BIRD } from '@/content/copy.ru';
import { SITE } from '@/content/site.config';

type Remaining = { days: number; hours: number; minutes: number; seconds: number } | null;

function remainingUntil(deadlineMs: number): Remaining {
  const diff = deadlineMs - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
  };
}

/**
 * Early-bird box (§7.1). The deadline string carries an explicit +02:00
 * offset (Europe/Berlin in summer), so Date parsing is timezone-safe for
 * every visitor. The ticking numbers mount client-side only — SSR renders
 * em-dashes — to avoid a hydration mismatch.
 */
export default function EarlyBird() {
  const deadlineMs = new Date(SITE.deadline).getTime();
  const [mounted, setMounted] = useState(false);
  const [left, setLeft] = useState<Remaining>(() => remainingUntil(deadlineMs));

  useEffect(() => {
    setMounted(true);
    setLeft(remainingUntil(deadlineMs));
    const id = setInterval(() => setLeft(remainingUntil(deadlineMs)), 1000);
    return () => clearInterval(id);
  }, [deadlineMs]);

  const expired = mounted && left === null;

  const cells: Array<{ value: string; label: string }> = [
    { value: mounted && left ? String(left.days) : '—', label: EARLY_BIRD.countdownLabels.days },
    {
      value: mounted && left ? String(left.hours).padStart(2, '0') : '—',
      label: EARLY_BIRD.countdownLabels.hours,
    },
    {
      value: mounted && left ? String(left.minutes).padStart(2, '0') : '—',
      label: EARLY_BIRD.countdownLabels.minutes,
    },
    {
      value: mounted && left ? String(left.seconds).padStart(2, '0') : '—',
      label: EARLY_BIRD.countdownLabels.seconds,
    },
  ];

  return (
    <section
      id="early-bird"
      className="section-pad"
      style={{
        background:
          'radial-gradient(110% 130% at 85% 0%, rgba(212,80,43,0.55), transparent 55%), linear-gradient(160deg, #7e2d35 0%, #43191f 70%)',
      }}
    >
      <div className="container-x text-center">
        <p className="eyebrow justify-center !text-cream/80">{EARLY_BIRD.eyebrow}</p>

        {expired ? (
          <>
            <h2 className="h-display mx-auto mt-6 max-w-2xl text-[clamp(1.8rem,4vw,2.7rem)] text-cream">
              {EARLY_BIRD.closed}
            </h2>
            <a href="#booking" className="btn btn-light mt-10">
              {EARLY_BIRD.closedCta}
            </a>
          </>
        ) : (
          <>
            <h2 className="h-display mt-6 text-[clamp(1.9rem,4.5vw,3.1rem)] text-cream">
              {EARLY_BIRD.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-cream/80">{EARLY_BIRD.text}</p>

            <div
              className="mx-auto mt-10 flex max-w-xl justify-center gap-3 sm:gap-4"
              role="timer"
              aria-live="off"
            >
              {cells.map((cell) => (
                <div
                  key={cell.label}
                  className="w-[78px] rounded-md border border-cream/15 bg-basalt/35 py-4 backdrop-blur-sm sm:w-[92px]"
                >
                  <div className="font-display text-[clamp(1.6rem,3vw,2.2rem)] leading-none text-cream tabular-nums">
                    {cell.value}
                  </div>
                  <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-cream/60">
                    {cell.label}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-cream/20 bg-basalt/30 px-4 py-2 text-[13px] font-semibold text-cream">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />
              {EARLY_BIRD.spotsLabel}: {SITE.spotsLeft} из 12
            </p>

            <div>
              <a href="#booking" className="btn btn-light mt-10">
                Забронировать со скидкой
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
