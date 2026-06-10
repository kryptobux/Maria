import { BOOKING, TARIFFS } from '@/content/copy.ru';
import TariffCta from './TariffCta';

export default function Tariffs() {
  return (
    <section id="tariffs" className="section-pad bg-garnet-d">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">{TARIFFS.eyebrow}</p>
            <h2 className="h-display mt-5 text-[clamp(1.9rem,4vw,2.9rem)] text-cream">
              {TARIFFS.title}
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-cream/70">{TARIFFS.note}</p>
          </div>
          <span className="inline-flex rounded-full bg-ember px-4 py-2 text-[12px] font-bold uppercase tracking-[0.14em] text-cream">
            {TARIFFS.earlyBirdRibbon}
          </span>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {TARIFFS.items.map((tariff, i) => (
            <article
              key={tariff.id}
              className={`relative flex flex-col rounded-lg border bg-basalt-2 p-8 md:p-10 ${
                tariff.highlight ? 'border-gold/60' : 'border-gold/15'
              }`}
            >
              {tariff.highlight ? (
                <span className="absolute -top-3 left-8 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-basalt">
                  самый полный
                </span>
              ) : null}

              <h3 className="font-display text-[15px] uppercase tracking-[0.3em] text-gold">
                {tariff.nameRu} · {tariff.name}
              </h3>

              <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="h-display text-[clamp(2.4rem,4vw,3.2rem)] text-cream">
                  {tariff.price}
                </span>
                <span className="text-[13px] text-muted">
                  Early Bird: <span className="font-semibold text-gold">{tariff.priceEarlyBird}</span>
                </span>
              </div>
              <p className="mt-1 text-[13px] text-muted">{tariff.single}</p>

              {'featuresLead' in tariff && tariff.featuresLead ? (
                <p className="mt-6 text-[14px] font-semibold text-cream/90">{tariff.featuresLead}</p>
              ) : null}

              <ul className="mt-4 flex-1 space-y-3">
                {tariff.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-[15px] leading-relaxed text-cream/80">
                    <span aria-hidden className="translate-y-[7px] text-[8px] text-gold">
                      ◆
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <TariffCta
                tariffOption={BOOKING.fields.tariffOptions[i]}
                label={tariff.cta}
                variant={tariff.highlight ? 'primary' : 'ghost'}
              />
            </article>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-[13px] leading-relaxed text-cream/55">
          {TARIFFS.footnote}
        </p>
      </div>
    </section>
  );
}
