'use client';

import { useCallback, useRef, useState } from 'react';
import type { DayRoute, DayRouteId } from '@/content/routes';
import type { DayMapLinks } from '@/lib/maps';
import { ROUTE_SECTION } from '@/content/copy.ru';

type Props = {
  routes: DayRoute[];
  links: Record<DayRouteId, DayMapLinks>;
};

/**
 * Route section (HANDOVER §5.3): day tabs + Maps Embed directions per day
 * (iframe lazy — created on first activation, kept mounted afterwards),
 * numbered stop list with driveNote, external Maps deep link, and the
 * signature vertical altitude rail (ember → garnet → sea) whose stages
 * share one state source with the tabs.
 */
export default function RouteMap({ routes, links }: Props) {
  const [activeId, setActiveId] = useState<DayRouteId>('overview');
  const [mounted, setMounted] = useState<Set<DayRouteId>>(new Set(['overview']));
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const activate = useCallback((id: DayRouteId) => {
    setActiveId(id);
    setMounted((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  }, []);

  const onTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const delta = e.key === 'ArrowRight' ? 1 : -1;
    const next = routes[(index + delta + routes.length) % routes.length];
    activate(next.id);
    tabRefs.current.get(next.id)?.focus();
  };

  const active = routes.find((r) => r.id === activeId) ?? routes[0];

  return (
    <section id="route" className="section-pad bg-basalt">
      <div className="container-x">
        <p className="eyebrow">{ROUTE_SECTION.eyebrow}</p>
        <h2 className="h-display mt-5 max-w-3xl text-[clamp(1.9rem,4vw,2.9rem)] text-cream">
          {ROUTE_SECTION.title}
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">{ROUTE_SECTION.sub}</p>

        {/* Day tabs — sticky inside the section on desktop, scrollable on mobile */}
        <div className="no-scrollbar sticky top-[104px] z-30 -mx-5 mt-10 overflow-x-auto px-5 py-2 lg:top-[80px]">
          <div
            role="tablist"
            aria-label="Дни маршрута"
            className="flex w-max gap-2 rounded-full border border-gold/15 bg-basalt-2/90 p-1.5 backdrop-blur"
          >
            {routes.map((route, i) => {
              const selected = route.id === activeId;
              return (
                <button
                  key={route.id}
                  ref={(el) => {
                    if (el) tabRefs.current.set(route.id, el);
                  }}
                  role="tab"
                  id={`route-tab-${route.id}`}
                  aria-selected={selected}
                  aria-controls={`route-panel-${route.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => activate(route.id)}
                  onKeyDown={(e) => onTabKeyDown(e, i)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors ${
                    selected ? 'bg-ember text-cream' : 'text-muted hover:text-cream'
                  }`}
                >
                  {route.tab}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_300px] lg:gap-16">
          {/* Map panels + stop list */}
          <div>
            {routes.map((route) => {
              const isActive = route.id === activeId;
              const isMounted = mounted.has(route.id);
              return (
                <div
                  key={route.id}
                  role="tabpanel"
                  id={`route-panel-${route.id}`}
                  aria-labelledby={`route-tab-${route.id}`}
                  hidden={!isActive}
                >
                  <div className="overflow-hidden rounded-md border border-gold/15 bg-basalt-2">
                    <div className="aspect-[16/10] w-full">
                      {isMounted ? (
                        <iframe
                          title={`${ROUTE_SECTION.mapTitlePrefix}${route.tab} — ${route.title}`}
                          src={links[route.id].embedUrl}
                          className="h-full w-full"
                          loading="lazy"
                          allowFullScreen
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Stop list of the active day */}
            <div className="mt-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display text-[20px] text-cream">{active.title}</h3>
                <span className="chip !text-[12px] text-muted">
                  {active.mode === 'walking' ? 'пешком' : 'дорога'} · {active.driveNote}
                </span>
              </div>

              <ol className="mt-5 space-y-3">
                {active.stops.map((stop, i) => (
                  <li key={`${stop.query}-${i}`} className="flex items-baseline gap-4">
                    <span className="flex h-6 w-6 flex-none translate-y-0.5 items-center justify-center rounded-full border border-gold/40 text-[11px] font-bold text-gold">
                      {i + 1}
                    </span>
                    <span className="text-[15px] leading-relaxed text-cream/85">{stop.label}</span>
                  </li>
                ))}
              </ol>

              <a
                href={links[active.id].externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block text-[13px] font-bold uppercase tracking-[0.14em] text-gold underline-offset-4 hover:underline"
              >
                {ROUTE_SECTION.openInMaps}
              </a>
            </div>
          </div>

          {/* Altitude rail — narrative layer, same state source as the tabs */}
          <aside aria-label={ROUTE_SECTION.stagesTitle}>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted">
              {ROUTE_SECTION.stagesTitle}
            </p>
            <div className="relative mt-6 pl-7">
              <span
                aria-hidden
                className="absolute bottom-1 left-[7px] top-1 w-[2px] rounded-full"
                style={{
                  background:
                    'linear-gradient(180deg, var(--color-ember) 0%, var(--color-garnet) 55%, var(--color-sea) 100%)',
                }}
              />
              <ul className="space-y-6">
                {ROUTE_SECTION.stages.map((stage) => {
                  const selected = stage.routeId === activeId;
                  return (
                    <li key={stage.routeId} className="relative">
                      <span
                        aria-hidden
                        className={`absolute left-[-20px] top-1 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 transition-all ${
                          selected
                            ? 'scale-110 border-ember-2 bg-ember'
                            : 'border-muted/60 bg-basalt'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => activate(stage.routeId as DayRouteId)}
                        className="group block text-left"
                      >
                        <span
                          className={`block text-[14px] font-semibold transition-colors ${
                            selected ? 'text-cream' : 'text-muted group-hover:text-cream'
                          }`}
                        >
                          {stage.label}
                        </span>
                        <span className="mt-0.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-gold/80">
                          {stage.altitude}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
