import { HOTELS } from '@/content/copy.ru';
import SmartImage from './SmartImage';

export default function Hotels() {
  return (
    <section id="hotels" className="bg-paper pb-20 text-ink md:pb-28">
      <div className="container-x">
        <p className="eyebrow eyebrow--garnet">{HOTELS.eyebrow}</p>
        <h2 className="h-display mt-5 text-[clamp(1.9rem,4vw,2.9rem)] text-ink">{HOTELS.title}</h2>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {HOTELS.items.map((hotel) => (
            <article
              key={hotel.name}
              className="overflow-hidden rounded-lg border border-ink/10 bg-paper-2"
            >
              <SmartImage slotId={hotel.photoSlot} sizes="(min-width: 1024px) 50vw, 92vw" />
              <div className="p-7 md:p-9">
                <h3 className="font-display text-[24px] text-ink">{hotel.name}</h3>
                <p className="mt-2 text-[12px] font-bold uppercase tracking-[0.16em] text-garnet">
                  {hotel.meta}
                </p>
                <p className="mt-4 leading-relaxed text-ink/75">{hotel.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
