import { MARIA } from '@/content/copy.ru';
import SmartImage from './SmartImage';

export default function Maria() {
  return (
    <section id="maria" className="section-pad bg-basalt">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[380px_1fr] lg:gap-20">
        <SmartImage
          slotId="maria"
          sizes="(min-width: 1024px) 380px, 80vw"
          className="mx-auto w-full max-w-[380px] rounded-md border border-gold/15"
        />

        <div>
          <p className="eyebrow">{MARIA.eyebrow}</p>
          <h2 className="h-display mt-5 text-[clamp(2rem,4vw,3rem)] text-cream">{MARIA.title}</h2>

          {MARIA.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="mt-5 max-w-xl leading-relaxed text-cream/80">
              {p}
            </p>
          ))}

          <figure className="mt-10 border-l border-gold/40 pl-6">
            <blockquote className="font-accent text-[clamp(1.35rem,2.4vw,1.7rem)] italic leading-snug text-cream">
              «{MARIA.quote}»
            </blockquote>
            <figcaption className="mt-4 text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
              — {MARIA.quoteCaption}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
