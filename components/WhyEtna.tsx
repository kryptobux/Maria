import { WHY_ETNA } from '@/content/copy.ru';
import SmartImage from './SmartImage';

export default function WhyEtna() {
  return (
    <section id="etna" className="section-pad bg-basalt-2">
      <div className="container-x">
        <p className="eyebrow">{WHY_ETNA.eyebrow}</p>
        <h2 className="h-display mt-5 max-w-3xl text-[clamp(1.9rem,4vw,2.9rem)] text-cream">
          {WHY_ETNA.title}
        </h2>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_340px] lg:gap-14">
          <div className="grid gap-5 sm:grid-cols-2">
            {WHY_ETNA.cards.map((card) => (
              <article
                key={card.title}
                className="rounded-md border border-gold/10 bg-basalt p-7 transition-colors hover:border-gold/30"
              >
                <h3 className="font-display text-[19px] leading-snug text-cream">{card.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{card.text}</p>
              </article>
            ))}
          </div>

          <SmartImage
            slotId="vineyard"
            sizes="(min-width: 1024px) 340px, 90vw"
            className="hidden h-full rounded-md border border-gold/15 lg:block"
            cover
          />
        </div>
      </div>
    </section>
  );
}
