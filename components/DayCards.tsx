import { PROGRAM } from '@/content/copy.ru';
import { ROUTE_BY_ID } from '@/content/routes';
import SmartImage from './SmartImage';

export default function DayCards() {
  return (
    <section id="program" className="section-pad bg-paper text-ink">
      <div className="container-x">
        <p className="eyebrow eyebrow--garnet">{PROGRAM.eyebrow}</p>
        <h2 className="h-display mt-5 max-w-3xl text-[clamp(1.9rem,4vw,2.9rem)] text-ink">
          {PROGRAM.title}
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-ink/70">{PROGRAM.sub}</p>

        <div className="mt-14 space-y-14">
          {PROGRAM.days.map((day, i) => {
            const route = ROUTE_BY_ID[day.id];
            const imageFirst = i % 2 === 1;
            return (
              <article
                key={day.id}
                className="grid items-center gap-7 border-b border-ink/10 pb-14 last:border-b-0 last:pb-0 md:grid-cols-2 md:gap-12"
              >
                <div className={imageFirst ? 'md:order-2' : ''}>
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-[34px] leading-none text-garnet">
                      {route.tab}
                    </span>
                    <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-ink/50">
                      {day.dow} · {day.date}
                    </span>
                  </div>
                  <h3 className="h-display mt-4 text-[clamp(1.3rem,2.4vw,1.7rem)] text-ink">
                    {day.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-ink/75">{day.text}</p>

                  <div className="mt-5 flex flex-wrap gap-2.5">
                    <span className="inline-flex items-center gap-2 rounded-full border border-garnet/25 bg-paper-2 px-3.5 py-1.5 text-[12px] font-semibold text-garnet">
                      {route.mode === 'walking' ? 'пешком' : 'в пути'} · {route.driveNote}
                    </span>
                    <span className="inline-flex items-center rounded-full border border-ink/15 px-3.5 py-1.5 text-[12px] font-semibold text-ink/60">
                      {route.altitude}
                    </span>
                  </div>
                </div>

                <SmartImage
                  slotId={day.photoSlot}
                  sizes="(min-width: 768px) 50vw, 92vw"
                  className={`rounded-md ${imageFirst ? 'md:order-1' : ''}`}
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
