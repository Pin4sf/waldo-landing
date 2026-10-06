// The constellation map's geometry, shared by the two places it is drawn: the "Spots and constellations" phone card
// (patterns.tsx) and the interactive map on the homepage (components/site/memory-map.tsx). Taken from Suyash's
// constellation map (Frame 1686558348.svg); positions are in the SVG's own coordinates.
import { PATTERN_CLUSTERS } from "./pattern-art";
import { PATTERNS } from "./see-fixture";

/** The map's size in its own coordinates (the SVG's) */
export const MAP_W = 975;
export const MAP_H = 590;

/** Where everything sits on the map, in the SVG's coordinates. A label hangs from its anchor (l: left edge, r: right edge, c: middle) */
export type Place = { x: number; y: number; label: { x: number; y: number; a: "l" | "r" | "c" } };
export const PLACE: Record<string, Place> = {
  crash: { x: 456.7, y: 292.8, label: { x: 454.5, y: 312, a: "c" } },
  stress: { x: 442.9, y: 43, label: { x: 441.5, y: 0, a: "c" } },
  sleep: { x: 599, y: 121.7, label: { x: 620, y: 101, a: "l" } },
  caffeine: { x: 294.7, y: 176.5, label: { x: 279, y: 175, a: "r" } },
  form: { x: 204.4, y: 311.9, label: { x: 204, y: 323, a: "c" } },
  hrv: { x: 664.6, y: 300.1, label: { x: 684, y: 283, a: "l" } },
  weight: { x: 289.4, y: 443.1, label: { x: 288, y: 456, a: "c" } },
  load: { x: 529.5, y: 548, label: { x: 530, y: 561, a: "c" } },
  cognitive: { x: 268.8, y: 71, label: { x: 218, y: 52, a: "r" } },
  pattern: { x: 780.1, y: 193.2, label: { x: 817, y: 176, a: "l" } },
  training: { x: 719.9, y: 461.3, label: { x: 785, y: 431, a: "l" } },
  flow: { x: 121.6, y: 448.1, label: { x: 119, y: 502, a: "c" } },
  meals: { x: 49.6, y: 254.6, label: { x: 49, y: 280, a: "c" } },
};

export const r1 = (n: number) => Math.round(n * 10) / 10;

/** A line from the middle to a spot, bowing the same way round as the map's own */
export function curve(id: string, back = false) {
  const a = PLACE[back ? id : PATTERNS.home];
  const b = PLACE[back ? PATTERNS.home : id];
  const s = PLACE[id];
  const c = PLACE[PATTERNS.home];
  const mx = (c.x + s.x) / 2;
  const my = (c.y + s.y) / 2;
  const k = 0.16;
  const q = `${r1(mx - (s.y - c.y) * k)} ${r1(my + (s.x - c.x) * k)}`;
  return `M ${a.x} ${a.y} Q ${q} ${b.x} ${b.y}`;
}

/** The map goes on past the edges: dust, and fainter patterns, laid out the same every time (rounded, so the server and the browser agree) */
export function field() {
  let seed = 90210;
  const rnd = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const dust = Array.from({ length: 150 }, () => ({ x: r1(-1000 + rnd() * 3000), y: r1(-650 + rnd() * 1900), r: r1(1.1 + rnd() * 2.6), d: Math.round(rnd() * 3000) }));
  const names = Object.keys(PATTERN_CLUSTERS);
  const spots: [number, number, number][] = [
    [-430, 130, 1], [-330, 560, 0.9], [-120, -300, 1.1], [560, -330, 0.9], [1130, -140, 1], [1320, 380, 1.1],
    [1180, 790, 0.9], [880, 930, 1], [240, 900, 1.1], [-80, 820, 0.9], [-660, 360, 1], [1560, 100, 0.9],
  ];
  const clusters = spots.map(([x, y, s], i) => ({ x, y, s, name: names[i % names.length] }));
  return { dust, clusters };
}
export const FIELD = field();
