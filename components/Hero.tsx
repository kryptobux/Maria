import { HERO } from '@/content/copy.ru';
import SmartImage from './SmartImage';

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[94svh] items-center overflow-hidden">
      {/* Background: hero slot (photo once sourced; art-directed gradient until then) */}
      <div className="absolute inset-0">
        <SmartImage slotId="hero" sizes="100vw" cover priority showCaption={false} />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(22,17,16,0.82) 0%, rgba(22,17,16,0.45) 45%, rgba(22,17,16,0.92) 100%)',
          }}
        />
      </div>

      <div className="container-x relative pb-24 pt-40">
        <p className="eyebrow">{HERO.eyebrow}</p>

        <h1 className="h-display mt-6 max-w-4xl text-[clamp(2.6rem,7.5vw,5.4rem)] text-cream">
          {HERO.title}
        </h1>

        <p className="mt-7 max-w-2xl text-[17px] leading-relaxed text-cream/85">{HERO.sub}</p>

        <ul className="mt-9 flex flex-wrap gap-3">
          {HERO.badges.map((badge) => (
            <li key={badge} className="chip">
              {badge}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#tariffs" className="btn btn-primary">
            {HERO.ctaPrimary}
          </a>
          <a href="#program" className="btn btn-ghost">
            {HERO.ctaSecondary}
          </a>
        </div>

        <p className="mt-8 text-[13px] font-semibold uppercase tracking-[0.2em] text-gold">
          {HERO.dateLine}
        </p>
      </div>

      <div
        aria-hidden
        className="scroll-hint absolute bottom-7 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.3em] text-muted"
      >
        {HERO.scrollHint} ↓
      </div>
    </section>
  );
}
