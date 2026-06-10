import { FILM } from '@/content/copy.ru';
import SmartImage from './SmartImage';

export default function Film() {
  return (
    <section id="film" className="section-pad bg-basalt">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <p className="eyebrow">{FILM.eyebrow}</p>
          <h2 className="h-display mt-5 text-[clamp(1.9rem,4vw,2.9rem)] text-cream">{FILM.title}</h2>
          <p className="mt-5 max-w-xl leading-relaxed text-muted">{FILM.text}</p>
          <a href="#booking" className="btn btn-ghost mt-9">
            {FILM.cta}
          </a>
        </div>

        <div className="relative">
          <SmartImage
            slotId="film"
            sizes="(min-width: 1024px) 55vw, 92vw"
            className="rounded-md border border-gold/15"
            showCaption={false}
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span
              aria-hidden
              className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/60 bg-basalt/50 pl-1 text-[18px] text-gold backdrop-blur-sm"
            >
              ▶
            </span>
          </div>
          <p className="absolute bottom-4 left-5 text-[11px] font-bold uppercase tracking-[0.18em] text-cream/70">
            {FILM.stillCaption}
          </p>
        </div>
      </div>
    </section>
  );
}
