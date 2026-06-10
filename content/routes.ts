/**
 * Day-by-day route data for the Google Maps section (HANDOVER §5.2).
 *
 * VERIFICATION STATUS: every `query` below still needs the mandatory manual
 * check against Google Maps (correct pin? unambiguous?). The build
 * environment has no access to google.com (network allowlist), so this is
 * tracked as an open QA task in KANBAN.md. Do NOT invent coordinates: if a
 * query resolves badly, replace it with verified `lat,lng` copied from a
 * Maps URL and document the source here.
 */
export type Stop = { label: string; query: string };

export type DayRouteId = 'overview' | 'd1' | 'd2' | 'd3' | 'd4' | 'd5' | 'd6' | 'd7';

export type DayRoute = {
  id: DayRouteId;
  tab: string;
  title: string;
  altitude: string;
  mode: 'driving' | 'walking';
  stops: Stop[];
  driveNote: string;
};

const MONACI: Stop = {
  label: 'Monaci delle Terre Nere, Дзафферана-Этнеа',
  query: 'Monaci delle Terre Nere, Zafferana Etnea',
};

const AIRPORT: Stop = {
  label: 'Аэропорт Катании (CTA)',
  query: 'Catania Fontanarossa Airport',
};

const MANIACE: Stop = {
  label: 'Maniace Boutique Hotel, Ортиджа',
  query: 'Maniace Boutique Hotel, Ortigia, Siracusa',
};

export const DAY_ROUTES: DayRoute[] = [
  {
    id: 'overview',
    tab: 'Обзор',
    title: 'Вся неделя: от Этны до Ортиджи',
    altitude: '2 900 м → 0 м',
    mode: 'driving',
    stops: [
      AIRPORT,
      { label: 'Дзафферана-Этнеа (склон Этны)', query: 'Zafferana Etnea' },
      { label: 'Кастильоне-ди-Сичилия (северные контрады)', query: 'Castiglione di Sicilia' },
      { label: 'Виттория (юг, COS)', query: 'Vittoria' },
      { label: 'Ортиджа, Сиракузы', query: 'Ortigia Siracusa' },
    ],
    driveNote: 'Весь маршрут недели',
  },
  {
    id: 'd1',
    tab: 'Д1',
    title: 'Прибытие: аэропорт → склон Этны',
    altitude: '≈ 600 м',
    mode: 'driving',
    stops: [AIRPORT, MONACI],
    driveNote: '≈ 45 мин',
  },
  {
    id: 'd2',
    tab: 'Д2',
    title: 'Северный склон: контрады',
    altitude: '600–1 000 м',
    mode: 'driving',
    stops: [
      MONACI,
      { label: 'Passopisciaro, Кастильоне-ди-Сичилия', query: 'Passopisciaro, Castiglione di Sicilia' },
      { label: 'Cave Ox, Соликкьята', query: 'Cave Ox, Solicchiata' },
      { label: 'Tornatore, Кастильоне-ди-Сичилия', query: 'Tornatore Winery, Castiglione di Sicilia' },
      MONACI,
    ],
    driveNote: 'суммарно ≈ 2 ч 20 в пути',
  },
  {
    id: 'd3',
    tab: 'Д3',
    title: 'Вершина Этны и этна-брют',
    altitude: 'до 2 900 м',
    mode: 'driving',
    stops: [
      MONACI,
      { label: 'Rifugio Sapienza (канатная дорога)', query: 'Rifugio Sapienza, Nicolosi' },
      { label: 'Tenuta San Michele (Murgo), Санта-Венерина', query: 'Tenuta San Michele, Santa Venerina' },
      MONACI,
    ],
    driveNote: '40 мин + 50 мин + 15 мин; наверху — канатная дорога и 4×4',
  },
  {
    id: 'd4',
    tab: 'Д4',
    title: 'Катания и Benanti',
    altitude: '0–500 м',
    mode: 'driving',
    stops: [
      MONACI,
      { label: 'Рыбный рынок Катании', query: 'Pescheria di Catania' },
      { label: 'Benanti, Виагранде', query: 'Benanti Winery, Viagrande' },
      MONACI,
    ],
    driveNote: '40 + 30 + 25 мин',
  },
  {
    id: 'd5',
    tab: 'Д5',
    title: 'Юг: COS и переезд в Ортиджу',
    altitude: '230 м → 0 м',
    mode: 'driving',
    stops: [
      MONACI,
      { label: 'COS, Виттория', query: 'COS Winery, Vittoria' },
      MANIACE,
    ],
    driveNote: '≈ 2 ч + 1 ч 15',
  },
  {
    id: 'd6',
    tab: 'Д6',
    title: 'Ортиджа пешком',
    altitude: '0 м',
    mode: 'walking',
    stops: [
      { label: 'Рынок Ортиджи', query: 'Mercato di Ortigia, Siracusa' },
      { label: 'Caseificio Borderi', query: 'Caseificio Borderi, Siracusa' },
      { label: 'Фонтан Дианы', query: 'Fontana di Diana, Ortigia' },
      { label: 'Ресторан Don Camillo', query: 'Ristorante Don Camillo, Siracusa' },
    ],
    driveNote: 'весь день пешком; Ното — опционально, 40 мин на автобусе',
  },
  {
    id: 'd7',
    tab: 'Д7',
    title: 'Ортиджа → аэропорт',
    altitude: '0 м',
    mode: 'driving',
    stops: [MANIACE, AIRPORT],
    driveNote: '≈ 55 мин',
  },
];

export const ROUTE_BY_ID = Object.fromEntries(DAY_ROUTES.map((r) => [r.id, r])) as Record<
  DayRouteId,
  DayRoute
>;
