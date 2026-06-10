/**
 * Google Maps URL builders (HANDOVER §5.1).
 * Primary: Maps Embed API v1 `directions` mode (free, needs key).
 * Fallback (no key at build time): classic maps.google.com embed.
 * Plus an external "open in Google Maps" deep link per day.
 */
import type { DayRoute, DayRouteId } from '@/content/routes';
import { DAY_ROUTES } from '@/content/routes';

export type DayMapLinks = {
  embedUrl: string;
  externalUrl: string;
  usesFallback: boolean;
};

const enc = encodeURIComponent;

export function buildEmbedUrl(route: DayRoute, key: string | undefined): string {
  const stops = route.stops.map((s) => s.query);
  if (key) {
    const params = new URLSearchParams({
      key,
      origin: stops[0],
      destination: stops[stops.length - 1],
      mode: route.mode,
      language: 'ru',
    });
    const waypoints = stops.slice(1, -1);
    if (waypoints.length > 0) params.set('waypoints', waypoints.join('|'));
    return `https://www.google.com/maps/embed/v1/directions?${params.toString()}`;
  }
  // Keyless fallback (§5.1)
  const [origin, ...rest] = stops;
  const daddr = rest.map(enc).join('+to:');
  return `https://maps.google.com/maps?saddr=${enc(origin)}&daddr=${daddr}&output=embed&hl=ru`;
}

export function buildExternalUrl(route: DayRoute): string {
  return `https://www.google.com/maps/dir/${route.stops.map((s) => enc(s.query)).join('/')}`;
}

/** Precomputed on the server so GOOGLE_MAPS_EMBED_KEY never needs NEXT_PUBLIC_. */
export function buildAllMapLinks(): Record<DayRouteId, DayMapLinks> {
  const key = process.env.GOOGLE_MAPS_EMBED_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY;
  const entries = DAY_ROUTES.map((route) => [
    route.id,
    {
      embedUrl: buildEmbedUrl(route, key),
      externalUrl: buildExternalUrl(route),
      usesFallback: !key,
    },
  ]);
  return Object.fromEntries(entries) as Record<DayRouteId, DayMapLinks>;
}
