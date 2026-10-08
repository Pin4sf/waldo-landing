// Where everything sits on the constellation map in "Longer he learns, smarter he gets." (components/site/memory-map.tsx),
// after Suyash's design (docs/website/constellation-clusters.md). Two ways a constellation can be laid out:
//
//   closed  a tight clump: the constellation's own dot in the middle, its spots packed round it the way Obsidian's graph
//           packs a cluster (bigger dots take more room), worked out once and the same every time
//   open    the constellation's dot in the middle of the stage and its spots on the surface of a faint sphere round it,
//           which revolves like a planet; each spot is projected with perspective, so the ones going round the back
//           are smaller and fainter, and their names hide until they come round again
//
// The constellations stand in fixed places. Opening one contracts the open one in the middle, swaps the two (both
// faded out, so nothing is seen travelling) and opens the chosen one where the other was.
//
// Three sizes of dot and no others: the constellation, a key spot, a minor spot.
import { CONTRIBUTES, INNER, MAP_PATTERNS, MINOR_COUNT, SPOTS_OF, SPOT_BY_ID, WITH_OF } from "./memory-data";

export type Tier = "hub" | "key" | "minor";
export type Dot = {
  id: string;
  pattern: string;
  tier: Tier;
  /** A named spot (key or minor) or one of the unnamed small ones */
  named: boolean;
  /** The week it first appears */
  week: number;
};
export type Side = "l" | "r" | "t" | "b";

/** Radius of each size, closed and open, in px at full size */
export const RADIUS: Record<Tier, { closed: number; open: number }> = {
  hub: { closed: 10, open: 15 },
  key: { closed: 4.5, open: 6.5 },
  minor: { closed: 2.6, open: 3.2 },
};

/** A small seeded random, so the server and the browser draw the same thing */
function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
const hash = (t: string) => [...t].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

/** Every dot on the map, in drawing order */
export const DOTS: Dot[] = MAP_PATTERNS.flatMap((p) => {
  const rnd = seeded(hash(p.id));
  const named: Dot[] = SPOTS_OF[p.id].map((s) => ({ id: s.id, pattern: p.id, tier: s.tier, named: true, week: s.week }));
  const minors: Dot[] = Array.from({ length: MINOR_COUNT[p.id] ?? 0 }, (_, i) => ({
    id: `${p.id}~${i}`,
    pattern: p.id,
    tier: "minor" as const,
    named: false,
    week: 1 + Math.floor(rnd() * Math.max(1, p.since)),
  }));
  return [{ id: p.id, pattern: p.id, tier: "hub" as const, named: true, week: p.since }, ...named, ...minors];
});
export const DOT_BY_ID: Record<string, Dot> = Object.fromEntries(DOTS.map((d) => [d.id, d]));
export const MEMBERS: Record<string, Dot[]> = {};
for (const d of DOTS) if (d.tier !== "hub") (MEMBERS[d.pattern] ??= []).push(d);
export const LAST_WEEK = Math.max(...DOTS.map((d) => d.week));

/** Closed: each spot's offset from its constellation's dot. Golden-angle spiral, key spots nearest, then pushed apart until none touch */
export const CLUMP: Record<string, { dx: number; dy: number }> = {};
export const CLUMP_RADIUS: Record<string, number> = {};
for (const p of MAP_PATTERNS) {
  const rnd = seeded(hash(p.id) ^ 0x9e3779b9);
  const members = [...MEMBERS[p.id]].sort((a, b) => (a.tier === b.tier ? 0 : a.tier === "key" ? -1 : 1));
  const hubR = RADIUS.hub.closed;
  const pts = members.map((m, i) => {
    const a = i * 2.39996 + rnd() * 0.5;
    const d = hubR + 7 + 6.2 * Math.sqrt(i + 1) + rnd() * 4;
    return { id: m.id, x: Math.cos(a) * d, y: Math.sin(a) * d, r: RADIUS[m.tier].closed };
  });
  // relax: no two dots closer than their radii and a gap, and none inside the big one
  for (let it = 0; it < 60; it++) {
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      const dh = Math.hypot(a.x, a.y) || 1;
      const minH = hubR + a.r + 4;
      if (dh < minH) {
        a.x *= minH / dh;
        a.y *= minH / dh;
      }
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.hypot(dx, dy) || 0.01;
        const min = a.r + b.r + 3.5;
        if (d < min) {
          const push = (min - d) / 2 / d;
          a.x -= dx * push;
          a.y -= dy * push;
          b.x += dx * push;
          b.y += dy * push;
        }
      }
    }
    // a gentle pull in keeps the clump round and tight
    for (const a of pts) {
      a.x *= 0.985;
      a.y *= 0.985;
    }
  }
  let far = hubR;
  for (const a of pts) {
    CLUMP[a.id] = { dx: a.x, dy: a.y };
    far = Math.max(far, Math.hypot(a.x, a.y) + a.r);
  }
  CLUMP_RADIUS[p.id] = far;
}

/** Open: each spot's place on the surface of a globe round its constellation, which revolves like a planet (round its
 *  upright axis), so spots sweep across the front and go round the back. Key spots are spread from high to low
 *  latitudes, a golden angle apart round the globe, so they never bunch; minor ones are scattered over the surface */
export const SPHERE: Record<string, { x: number; y: number; z: number }> = {};
const onGlobe = (y: number, theta: number) => {
  const r = Math.sqrt(1 - y * y);
  return { x: r * Math.cos(theta), y, z: r * Math.sin(theta) };
};
for (const p of MAP_PATTERNS) {
  const rnd = seeded(hash(p.id) ^ 0x51ed27);
  const keys = MEMBERS[p.id].filter((m) => m.tier === "key");
  const minors = MEMBERS[p.id].filter((m) => m.tier !== "key");
  const start = rnd() * Math.PI * 2;
  keys.forEach((m, i) => {
    const y = 0.78 * (1 - (2 * (i + 0.5)) / keys.length) + (rnd() - 0.5) * 0.08;
    SPHERE[m.id] = onGlobe(y, start + i * 2.39996);
  });
  minors.forEach((m) => {
    SPHERE[m.id] = onGlobe((rnd() * 2 - 1) * 0.9, rnd() * Math.PI * 2);
  });
}

/** Turn a point on the sphere by `angle` round the upright axis, tip it towards the viewer by `tilt`, and project it */
export function project(p: { x: number; y: number; z: number }, angle: number, tilt: number) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const x = p.x * c + p.z * s;
  const z1 = -p.x * s + p.z * c;
  const ct = Math.cos(tilt);
  const st = Math.sin(tilt);
  const y = p.y * ct - z1 * st;
  const z = p.y * st + z1 * ct;
  const persp = 3.2 / (3.2 + z);
  // front: 1 nearest the viewer, 0 at the back
  return { x: x * persp, y: y * persp, scale: persp, front: (1 - z) / 2 };
}

/** The map: where each constellation sits in the world (from the design, the Tuesday Crash in the middle), how big the
 *  open globe is, and how small the clumps are drawn. The world is fixed; opening a constellation moves the camera */
export type World = { at: Record<string, { x: number; y: number }>; centre: { x: number; y: number }; ring: number; clump: number; narrow: boolean; w: number; h: number };
export function world(w: number, h: number): World {
  if (w < 640) {
    const at = (x: number, y: number) => ({ x: w * x, y: h * y });
    return {
      at: { crash: at(0.5, 0.47), cognitive: at(0.2, 0.08), pattern: at(0.8, 0.08), flow: at(0.14, 0.9), training: at(0.86, 0.9), meals: at(0.5, 0.93) },
      centre: at(0.5, 0.47),
      ring: Math.min(w * 0.3, h * 0.22),
      clump: 0.62,
      narrow: true,
      w,
      h,
    };
  }
  // laid out in a box no wider than 1560px, in the middle of the window
  const box = Math.min(w, 1560);
  const at = (x: number, y: number) => ({ x: (w - box) / 2 + box * x, y: h * y });
  return {
    at: { crash: at(0.5, 0.5), cognitive: at(0.27, 0.15), meals: at(0.1, 0.42), flow: at(0.13, 0.8), pattern: at(0.84, 0.24), training: at(0.8, 0.8) },
    centre: { x: w / 2, y: h / 2 },
    ring: Math.min(box * 0.17, h * 0.36),
    clump: w < 1000 ? 0.8 : 1,
    narrow: false,
    w,
    h,
  };
}

/** Faint dust behind the map. Seeded: the same every time */
export const DUST: { x: number; y: number; r: number; a: number }[] = (() => {
  const rnd = seeded(20261008);
  return Array.from({ length: 90 }, () => ({ x: -0.5 + rnd() * 2, y: -0.5 + rnd() * 2, r: 0.8 + rnd() * 1.4, a: 0.1 + rnd() * 0.16 }));
})();

/**
 * Where each constellation's dot goes. Each stands in a place on the map (from the design; "crash" is the middle); the
 * closed clumps keep clear of the open sphere, stay inside the stage, and are moved apart if they end up on top of each other.
 */
export function placeHubs(slotOf: Record<string, string>, wd: World, room: number): Record<string, { x: number; y: number }> {
  const out: Record<string, { x: number; y: number }> = {};
  for (const id of Object.keys(slotOf)) out[id] = { ...wd.at[slotOf[id]] };
  const open = Object.keys(slotOf).find((id) => slotOf[id] === "crash") ?? null;
  const closed = Object.keys(out).filter((id) => id !== open);
  const r = (id: string) => CLUMP_RADIUS[id] * wd.clump;
  const c = open ? out[open] : null;
  const keep = (id: string) => {
    const p = out[id];
    if (c && room > 0) {
      const dx = p.x - c.x;
      const dy = p.y - c.y;
      const d = Math.hypot(dx, dy) || 1;
      const min = room + r(id) + 26;
      if (d < min) {
        p.x = c.x + (dx / d) * min;
        p.y = c.y + (dy / d) * min;
      }
    }
    // inside the stage, with room for the name
    // enough room at the sides for a name centred under its clump
    const padX = r(id) + (wd.narrow ? 46 : 78);
    const padTop = r(id) + (wd.narrow ? 14 : 30);
    const padBottom = r(id) + (wd.narrow ? 40 : 46);
    p.x = Math.max(padX, Math.min(wd.w - padX, p.x));
    p.y = Math.max(padTop, Math.min(wd.h - padBottom, p.y));
  };
  for (let it = 0; it < 4; it++) {
    for (const id of closed) keep(id);
    for (let i = 0; i < closed.length; i++)
      for (let j = i + 1; j < closed.length; j++) {
        const a = out[closed[i]];
        const b = out[closed[j]];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.hypot(dx, dy) || 1;
        const min = r(closed[i]) + r(closed[j]) + (wd.narrow ? 48 : 130);
        if (d < min) {
          const push = (min - d) / 2 / d;
          a.x -= dx * push;
          a.y -= dy * push;
          b.x += dx * push;
          b.y += dy * push;
        }
      }
  }
  for (const id of closed) keep(id);
  return out;
}

/** Which side of its clump a closed constellation's name hangs: away from the middle, unless that would leave the stage
 *  or run into a clump beside it, in which case under it (or over it, near the foot of the stage) */
export function hubSide(p: { x: number; y: number }, wd: World, others: { x: number; y: number }[]): Side {
  const under: Side = p.y > wd.h - 110 ? "t" : "b";
  if (wd.narrow) return p.y < wd.h / 2 ? "b" : "t";
  const dx = p.x - wd.centre.x;
  const dy = p.y - wd.centre.y;
  const clear = (dir: -1 | 1) => !others.some((o) => (o.x - p.x) * dir > 0 && Math.abs(o.x - p.x) < 230 && Math.abs(o.y - p.y) < 60);
  if (Math.abs(dx) > Math.abs(dy) * 1.2) {
    if (dx < 0 && p.x > 220 && clear(-1)) return "l";
    if (dx > 0 && p.x < wd.w - 220 && clear(1)) return "r";
  }
  return dy < 0 && p.y > 90 ? "t" : under;
}

/** Lines drawn while a constellation is open: to each key spot, between key spots that turn up together, and out to what it feeds on elsewhere */
export type Line = { id: string; a: string; b: string; kind: "spoke" | "inner" | "out" };
export function linesOf(open: string): Line[] {
  const spokes: Line[] = MEMBERS[open].filter((m) => m.tier === "key").map((m) => ({ id: `${open}>${m.id}`, a: open, b: m.id, kind: "spoke" }));
  const inner: Line[] = (INNER[open] ?? []).map(([a, b]) => ({ id: `${a}-${b}`, a, b, kind: "inner" }));
  const out: Line[] = [];
  const feeds = new Set(CONTRIBUTES[open]);
  for (const m of MEMBERS[open]) {
    if (!m.named) continue;
    for (const o of WITH_OF[m.id] ?? []) if (feeds.has(o)) out.push({ id: `${m.id}~${o}`, a: m.id, b: o, kind: "out" });
  }
  return [...spokes, ...inner, ...out];
}

/** Everything that lights up when you point at a dot: itself, its constellation, what it is joined to */
export function neighbourhood(id: string, open: string | null): Set<string> {
  const d = DOT_BY_ID[id];
  const set = new Set<string>([id, d.pattern]);
  if (d.tier === "hub") {
    for (const m of MEMBERS[d.pattern]) set.add(m.id);
    if (d.pattern === open) for (const o of CONTRIBUTES[open]) set.add(o);
  } else if (d.named) {
    for (const o of WITH_OF[id] ?? []) set.add(o);
    for (const [a, b] of INNER[d.pattern] ?? []) {
      if (a === id) set.add(b);
      if (b === id) set.add(a);
    }
    if (SPOT_BY_ID[id] && open && d.pattern !== open) set.add(open);
  }
  return set;
}
