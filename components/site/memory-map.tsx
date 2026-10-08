"use client";

import { type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { PATTERN_ICONS } from "./see/pattern-art";
import { CONTRIBUTES, MAP_PATTERNS, PATTERN_BY_ID, SPOT_BY_ID } from "./see/memory-data";
import {
  CLUMP,
  CLUMP_RADIUS,
  MEMBERS,
  DOTS,
  DOT_BY_ID,
  DUST,
  LAST_WEEK,
  type Line,
  RADIUS,
  SPHERE,
  type Side,
  type World,
  hubSide,
  linesOf,
  neighbourhood,
  placeHubs,
  project,
  world,
} from "./see/constellation-layout";

import "./memory-map.css";

// "Longer he learns, smarter he gets.": the Spots and Constellations map, after Suyash's design
// (docs/website/constellation-clusters.md), with Obsidian's graph as the reference for clumps and sizes.
//
//   - Six constellations at fixed places on a map. One is open in the middle; the others are clumps of dots round it.
//   - Three sizes of dot: the constellation, a key spot (responsible for it), a minor spot (contributes less).
//   - The open one's spots sit on a faint sphere that revolves like a planet (after composio.dev's globe): they sweep
//     across the front and go round the back, where they are smaller and fainter and their names hide. Lines join
//     the key spots to the middle. Spots in other clumps that feed it are dark; the rest are faint.
//   - Choose a clump (click, tap, or Enter on its name) and it all happens as one movement: it and the open one trade
//     places, springing straight to each other's place with a touch of overshoot, their dots trailing after them; the
//     open one closes on the way out, its spots spiralling in; the one sphere slides with the chosen one, dipping in
//     size, and springs open round it as its spots ripple out (they start before it has quite arrived); the other
//     clumps are drawn in like gravity (nearest first, curling round the middle, squeezing tight) and spring back out
//     with a small bounce; and the whole map pulls back a touch and settles forward again.
//   - Point at a dot and it, its constellation and what it is joined to stay strong; the rest fade.
//   - Click a named spot, or the open constellation, for a short note. Drag the empty space to spin the globe.
//     Drag a constellation and its spots trail after it on loose springs, bump and settle, as in Obsidian; drag a
//     named spot and it tugs its constellation after it. Let go and everything finds its place again.
//   - Lines are straight and barely there; they only show clearly for what you point at.
//   - It grows once when it comes into view: spots turn up week by week, clump, then the Tuesday Crash opens.
//   - With less motion it shows the end at once and nothing turns by itself.
//
// Everything on it is sample data (see/memory-data.ts); nothing here connects to anything.

/** How far the globe's top leans towards the viewer, in radians */
const TILT = 0.24;
/** One revolution every 40 seconds */
const SPIN = (Math.PI * 2) / 40000;
const WEEK_MS = 380;
const FIRST = "crash";

type Body = { x: number; y: number; vx: number; vy: number };

function Icon({ name }: { name: string }) {
  const art = PATTERN_ICONS[name];
  if (!art) return null;
  return <svg className="mm-icon" viewBox={art.vb.join(" ")} aria-hidden="true" dangerouslySetInnerHTML={{ __html: art.svg }} />;
}

/** A line between two dots: straight, as Obsidian draws them */
const straight = (a: Body, b: Body) => `M${a.x.toFixed(1)},${a.y.toFixed(1)} L${b.x.toFixed(1)},${b.y.toFixed(1)}`;

/** Each dot is a touch looser or stiffer than the next, so a clump never moves in perfect lockstep */
const LOOSE: Record<string, number> = Object.fromEntries(
  DOTS.map((d) => [d.id, 0.9 + ([...d.id].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 3) % 1000) / 1000 * 0.2]),
);

/** Ease out with a small overshoot: past 1 and back, like a light spring */
const back = (x: number) => {
  const c = 1.2;
  return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2);
};

const sideOf = (dx: number, dy: number, ring: number): Side =>
  Math.abs(dx) > ring * 0.35 ? (dx < 0 ? "l" : "r") : dy < 0 ? "t" : "b";

export function MemoryMap({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const worldEl = useRef<HTMLDivElement>(null);
  const nodeEls = useRef(new Map<string, HTMLElement>());
  const lineEls = useRef(new Map<string, SVGPathElement>());
  const bodies = useRef(new Map<string, Body>());

  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [open, setOpen] = useState<string | null>(null);
  // the one actually drawn open on the sphere: it trails `open` while the old one fades out and the new one fades in
  const [shown, setShown] = useState<string[]>([]);
  const [week, setWeek] = useState(0);
  const [grown, setGrown] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);

  const wd = useMemo(() => (dims.w ? world(dims.w, dims.h) : null), [dims]);
  const lines = useMemo<Line[]>(() => shown.flatMap((id) => linesOf(id)), [shown]);
  const lit = useMemo(() => new Set(open ? CONTRIBUTES[open] : []), [open]);
  const near = useMemo(() => (hover ? neighbourhood(hover, open) : null), [hover, open]);

  // everything the animation loop reads, kept current without restarting it
  const live = useRef({
    open: null as string | null,
    /** How open each constellation is: 0 a clump, 1 spread over the sphere. Two can be part open at once while changing over */
    openness: {} as Record<string, number>,
    /** Which constellations are part open, as React last heard (so names and lines are drawn for them) */
    shownKey: "",
    /** Which place each constellation stands in ("crash" is the middle). The chosen one and the one in the middle swap */
    slotOf: Object.fromEntries(MAP_PATTERNS.map((p) => [p.id, p.id])) as Record<string, string>,
    /** The two trading places, and how far the incoming one had to go when it set off */
    swap: null as null | { ids: [string, string]; dist: number },
    /** When the other clumps were last drawn in (each change-over draws them in once, like a breath) */
    gatherAt: -1e9,
    /** When each constellation's dot last pulsed (it pulses as it closes and as it arrives) */
    pulseAt: {} as Record<string, number>,
    /** The one sphere: it never disappears, it slides from one constellation to the next and changes size on the way */
    sphere: { x: 0, y: 0, vx: 0, vy: 0, r: 0, vr: 0, placed: false },
    /** Where each name hangs off its dot, as a direction eased towards its target, so names glide instead of jumping */
    pillDir: {} as Record<string, { x: number; vx: number; y: number; vy: number }>,
    /** The whole map's scale: it pulls back a touch while changing over, and settles forward again */
    zoom: { s: 1, v: 0 },
    wd: null as World | null,
    lines: [] as Line[],
    paused: false,
    still: false,
    angle: 0.4,
    spinV: 0,
    hold: null as null | { id: string; x: number; y: number },
    spinning: false,
  });
  useLayoutEffect(() => {
    const l = live.current;
    l.open = open;
    l.wd = wd;
    l.lines = lines;
    l.paused = !!hover || !!note;
  });

  // The stage's size decides where everything sits
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const measure = () =>
      setDims((d) => (Math.abs(d.w - el.clientWidth) < 1 && Math.abs(d.h - el.clientHeight) < 1 ? d : { w: el.clientWidth, h: el.clientHeight }));
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();
    return () => ro.disconnect();
  }, []);

  // The loop. Everything that moves is a spring (worked out in small fixed steps, so it moves the same on every screen),
  // and every size, name and line is set here on the same clock, so nothing runs a beat behind.
  useEffect(() => {
    const l = live.current;
    l.still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let last = performance.now();
    let running = true;
    let ink = "#1a1a1a";
    let inkAge = 0;
    const ease = (x: number) => x * x * (3 - 2 * x);
    const clamp = (x: number) => Math.min(1, Math.max(0, x));

    /** One spring, in fixed steps of 1/240s: `omega` how quick, `zeta` how damped (under 1 overshoots a touch) */
    const settle = (b: { x: number; vx: number }, target: number, omega: number, zeta: number, sec: number) => {
      const n = Math.max(1, Math.ceil(sec * 240));
      const h = sec / n;
      for (let i = 0; i < n; i++) {
        b.vx += (omega * omega * (target - b.x) - 2 * zeta * omega * b.vx) * h;
        b.x += b.vx * h;
      }
    };
    const spring = (id: string, hx: number, hy: number, omega: number, zeta: number, sec: number) => {
      let b = bodies.current.get(id);
      if (!b) {
        b = { x: hx, y: hy, vx: 0, vy: 0 };
        bodies.current.set(id, b);
      }
      if (l.still && !l.hold) {
        Object.assign(b, { x: hx, y: hy, vx: 0, vy: 0 });
        return b;
      }
      const ax = { x: b.x, vx: b.vx };
      const ay = { x: b.y, vx: b.vy };
      settle(ax, hx, omega, zeta, sec);
      settle(ay, hy, omega, zeta, sec);
      Object.assign(b, { x: ax.x, vx: ax.vx, y: ay.x, vy: ay.vx });
      return b;
    };

    const SIDE: Record<Side, [number, number]> = { l: [-1, 0], r: [1, 0], t: [0, -1], b: [0, 1] };
    /** Ease a name towards hanging off its dot in direction (ax, ay), each from -1 to 1 */
    const aim = (id: string, el: HTMLElement, ax: number, ay: number, sec: number) => {
      let d = l.pillDir[id];
      if (!d) d = l.pillDir[id] = { x: ax, vx: 0, y: ay, vy: 0 };
      if (l.still) Object.assign(d, { x: ax, y: ay, vx: 0, vy: 0 });
      else {
        const px = { x: d.x, vx: d.vx };
        const py = { x: d.y, vx: d.vy };
        settle(px, ax, 11, 1, sec);
        settle(py, ay, 11, 1, sec);
        Object.assign(d, { x: px.x, vx: px.vx, y: py.x, vy: py.vx });
      }
      el.style.setProperty("--ax", d.x.toFixed(3));
      el.style.setProperty("--ay", d.y.toFixed(3));
    };

    const step = (now: number) => {
      const w = l.wd;
      const dt = Math.min(50, now - last);
      const sec = dt / 1000;
      last = now;
      if (w) {
        const t = now / 1000;
        const op = l.openness;
        for (const p of MAP_PATTERNS) op[p.id] ??= 0;

        // Choosing a constellation: it and the one in the middle trade places at once (each springs straight to the
        // other's place); the open one closes on the way out; the chosen one starts opening before it has quite
        // arrived, so the two overlap and nothing waits for anything
        const centre = Object.keys(l.slotOf).find((id) => l.slotOf[id] === "crash")!;
        if (l.open && centre !== l.open) {
          const from = l.slotOf[l.open];
          l.slotOf = { ...l.slotOf, [l.open]: "crash", [centre]: from };
          const b = bodies.current.get(l.open);
          const to = w.at.crash;
          l.swap = { ids: [centre, l.open], dist: b ? Math.hypot(b.x - to.x, b.y - to.y) : 0 };
          l.gatherAt = now;
        }
        const middle = Object.keys(l.slotOf).find((id) => l.slotOf[id] === "crash")!;
        let arriving = 1;
        if (l.swap) {
          const b = bodies.current.get(l.swap.ids[1]);
          const d = b ? Math.hypot(b.x - w.at.crash.x, b.y - w.at.crash.y) : 0;
          arriving = l.swap.dist > 1 ? clamp(1 - d / l.swap.dist) : 1;
          if (d < 1.5 && arriving > 0.98) {
            l.pulseAt[l.swap.ids[1]] = now;
            l.swap = null;
          }
        }
        let anyOpen = "";
        for (const p of MAP_PATTERNS) {
          const want = p.id === l.open && (arriving > 0.6 || l.still) ? 1 : 0;
          const was = op[p.id];
          if (l.still) op[p.id] = want;
          else if (want > was) op[p.id] = Math.min(1, was + dt / 1000);
          else if (want < was) op[p.id] = Math.max(0, was - dt / 520);
          if (was > 0 && op[p.id] === 0) l.pulseAt[p.id] = now;
          if (op[p.id] > 0) anyOpen += (anyOpen ? "," : "") + p.id;
        }
        if (anyOpen !== l.shownKey) {
          l.shownKey = anyOpen;
          setShown(anyOpen ? anyOpen.split(",") : []);
        }
        const opening = (id: string) => (l.open === id ? 1 : 0);
        const eOpen = l.open ? ease(op[l.open]) : 0;

        if (l.shownKey && !l.spinning) {
          if (!l.paused && !l.still) l.angle += dt * SPIN;
          l.angle += l.spinV;
          l.spinV *= 0.94;
        }
        // The other clumps are drawn in by the change-over, like gravity: the nearest first, curling a little round the
        // middle as they come, their dots squeezing together; then they let go and spring back out with a small bounce
        const gatherOf = (id: string) => {
          const h = w.at[l.slotOf[id]];
          const dist = Math.hypot(h.x - w.at.crash.x, h.y - w.at.crash.y);
          const tt = now - l.gatherAt - dist * 0.18;
          if (tt < 0 || l.still) return 0;
          if (tt < 300) return 1 - Math.pow(1 - tt / 300, 3);
          if (tt < 520) return 1;
          return Math.max(0, 1 - ease(Math.min(1, (tt - 520) / 560)));
        };
        const gather: Record<string, number> = {};
        for (const p of MAP_PATTERNS) gather[p.id] = gatherOf(p.id);
        const pulse = (id: string) => {
          const since = now - (l.pulseAt[id] ?? -1e9);
          return since < 380 ? 1 + 0.35 * Math.sin((Math.PI * since) / 380) : 1;
        };

        // the constellations first, then their spots, which hang on them
        const homes = placeHubs(l.slotOf, w, w.ring * 1.12 * eOpen);
        const mid = homes[middle];
        const held = l.hold ? DOT_BY_ID[l.hold.id] : null;
        for (const p of MAP_PATTERNS) {
          let h = l.hold?.id === p.id ? l.hold : homes[p.id];
          const swapping = !!l.swap?.ids.includes(p.id);
          const g = swapping || p.id === middle ? 0 : gather[p.id];
          if (g > 0 && l.hold?.id !== p.id) {
            // drawn in towards the middle and turned a little round it
            const dx = h.x - mid.x;
            const dy = h.y - mid.y;
            const k = 1 - 0.17 * g;
            const a = 0.09 * g;
            h = { x: mid.x + (dx * Math.cos(a) - dy * Math.sin(a)) * k, y: mid.y + (dx * Math.sin(a) + dy * Math.cos(a)) * k };
          }
          // a spot being dragged tugs its constellation a little after it
          if (held && held.tier !== "hub" && held.pattern === p.id) {
            const sb = bodies.current.get(held.id);
            if (sb) h = { x: h.x + (l.hold!.x - sb.x) * 0.15 + (sb.x - h.x) * 0.12, y: h.y + (l.hold!.y - sb.y) * 0.15 + (sb.y - h.y) * 0.12 };
          }
          // the two trading places move with momentum and a touch of overshoot; the rest glide
          const b =
            l.hold?.id === p.id
              ? spring(p.id, h.x, h.y, 22, 0.9, sec)
              : swapping
                ? spring(p.id, h.x, h.y, 7.2, 0.68, sec)
                : // looser while drawn in and letting go, so they come back with a small bounce
                  spring(p.id, h.x, h.y, 6.5, now - l.gatherAt < 2200 ? 0.55 : 0.92, sec);
          const el = nodeEls.current.get(p.id);
          if (el) {
            const o = ease(op[p.id]);
            const r = RADIUS.hub.closed * w.clump + (RADIUS.hub.open - RADIUS.hub.closed * w.clump) * Math.max(o, opening(p.id) * arriving);
            el.style.transform = `translate3d(${b.x.toFixed(1)}px,${b.y.toFixed(1)}px,0)`;
            el.style.zIndex = p.id === middle || swapping ? "50" : "";
            el.style.setProperty("--r", `${r.toFixed(2)}px`);
            el.style.setProperty("--pulse", pulse(p.id).toFixed(3));
            const side = p.id === middle ? "b" : hubSide(b, w, MAP_PATTERNS.filter((o) => o.id !== p.id && o.id !== middle).map((o) => homes[o.id]));
            if (el.dataset.side !== side) el.dataset.side = side;
            aim(p.id, el, SIDE[side][0], SIDE[side][1], sec);
          }
        }

        const frontOf = new Map<string, number>();
        for (const d of DOTS) {
          if (d.tier === "hub") continue;
          const hub = bodies.current.get(d.pattern)!;
          const el = nodeEls.current.get(d.id);
          const c = CLUMP[d.id];
          const phase = (d.id.length * 1.7 + c.dx) * 0.37;
          // where it sits in its clump, with a barely-there drift so the clumps are not quite still
          // while drawn in, a clump's dots squeeze together, and spread again as it lets go
          const tight = 1 - 0.28 * (gather[d.pattern] ?? 0);
          const cx = hub.x + c.dx * w.clump * tight + (l.still ? 0 : Math.sin(t * 0.35 + phase) * 0.35);
          const cy = hub.y + c.dy * w.clump * tight + (l.still ? 0 : Math.cos(t * 0.3 + phase) * 0.35);
          const hold = l.hold?.id === d.id;
          const inner = Math.min(1, Math.hypot(c.dx, c.dy) / (CLUMP_RADIUS[d.pattern] || 1));
          const o = op[d.pattern];
          let scale = 1;
          let front = 1;
          let reach = 0;
          let b: Body;
          if (o > 0 && !hold) {
            // part open: between its place in the clump and its place on the sphere. Opening, each spot runs a little
            // behind the one before and springs just past its place; closing, they spiral in faster as they go
            const out = opening(d.pattern) === 1;
            const lag = 0.28 * (out ? inner : 1 - inner);
            const own = clamp((o - lag) / 0.72);
            reach = out ? back(own) : 1 - (1 - own) * (1 - own);
            const twist = (1 - ease(o)) * 1.9 * (out ? 1 : -1);
            const pr = project(SPHERE[d.id], l.angle + twist, TILT);
            const sx = hub.x + pr.x * w.ring;
            const sy = hub.y + pr.y * w.ring;
            const m = Math.min(1, reach);
            scale = 1 + (pr.scale - 1) * m;
            front = 1 + (pr.front - 1) * m;
            b = bodies.current.get(d.id) ?? { x: cx, y: cy, vx: 0, vy: 0 };
            Object.assign(b, { x: cx + (sx - cx) * reach, y: cy + (sy - cy) * reach, vx: 0, vy: 0 });
            bodies.current.set(d.id, b);
            if (el && d.named && d.tier === "key") {
              // on a phone names hang above or below their dot, so none runs off the side
              const side = w.narrow ? (pr.y < 0 ? "t" : "b") : sideOf(pr.x * w.ring, pr.y * w.ring, w.ring);
              if (el.dataset.side !== side) el.dataset.side = side;
              // the name hangs away from the middle, following the spot round smoothly
              const len = Math.hypot(pr.x, pr.y) || 1;
              const ax = w.narrow ? 0 : Math.max(-1, Math.min(1, (pr.x / len) * 1.5));
              const ay = w.narrow ? (pr.y < 0 ? -1 : 1) : Math.max(-1, Math.min(1, (pr.y / len) * 1.5));
              aim(d.id, el, ax, ay, sec);
              const hidden = front < 0.45 || reach < 0.7;
              if ((el.dataset.back === "") !== hidden) {
                if (hidden) el.dataset.back = "";
                else delete el.dataset.back;
              }
            }
          } else {
            b = spring(d.id, hold ? l.hold!.x : cx, hold ? l.hold!.y : cy, hold ? 22 : 11 * LOOSE[d.id], hold ? 0.9 : 0.8, sec);
          }
          frontOf.set(d.id, front);
          if (el) {
            const tier = RADIUS[d.tier];
            const m = Math.min(1, reach);
            el.style.setProperty("--r", `${(tier.closed * w.clump + (tier.open - tier.closed * w.clump) * m).toFixed(2)}px`);
            // names pop in as their spot arrives, and are gone before it leaves
            el.style.setProperty("--pv", clamp((reach - 0.7) / 0.3).toFixed(3));
            el.style.transform = `translate3d(${b.x.toFixed(1)}px,${b.y.toFixed(1)}px,0)`;
            el.style.setProperty("--p", scale.toFixed(3));
            el.style.setProperty("--f", front.toFixed(3));
            el.style.zIndex = o > 0 ? String(10 + Math.round(front * 80)) : "";
          }
        }

        // dots in a clump push each other apart when they bunch while trailing, as Obsidian's do
        for (const p of MAP_PATTERNS) {
          if (op[p.id] > 0) continue;
          const ms = MEMBERS[p.id];
          for (let i = 0; i < ms.length; i++) {
            const a = bodies.current.get(ms[i].id);
            if (!a) continue;
            const ra = RADIUS[ms[i].tier].closed * w.clump;
            for (let j = i + 1; j < ms.length; j++) {
              const b = bodies.current.get(ms[j].id);
              if (!b) continue;
              const dx = b.x - a.x;
              const dy = b.y - a.y;
              const min = ra + RADIUS[ms[j].tier].closed * w.clump + 2.5;
              const d2 = dx * dx + dy * dy;
              if (d2 >= min * min || d2 === 0) continue;
              const d = Math.sqrt(d2);
              const push = ((min - d) / d) * 0.25;
              a.x -= dx * push;
              a.y -= dy * push;
              b.x += dx * push;
              b.y += dy * push;
            }
          }
        }

        // lines run from the constellation's dot to its spots, so they draw out and back in with them
        for (const line of l.lines) {
          const a = bodies.current.get(line.a);
          const b = bodies.current.get(line.b);
          const el = lineEls.current.get(line.id);
          if (!a || !b || !el) continue;
          el.setAttribute("d", straight(a, b));
          // a line to a spot round the back of the sphere is fainter
          const f = Math.min(frontOf.get(line.a) ?? 1, frontOf.get(line.b) ?? 1);
          el.style.setProperty("--f", f.toFixed(3));
          el.style.setProperty("--lv", clamp(op[DOT_BY_ID[line.a].pattern] * 1.6 - 0.3).toFixed(3));
        }

        // the one globe: it stays in the middle and never moves. While changing over it closes in to nothing with everything
        // else, then springs open again round the new one
        const sp = l.sphere;
        if (l.open) {
          if (!sp.placed) Object.assign(sp, { vx: 0, vy: 0, placed: true });
          sp.x = w.at.crash.x;
          sp.y = w.at.crash.y;
          // closes all the way to nothing, then opens with the new one
          const rWant = w.ring * eOpen;
          if (l.still) sp.r = rWant;
          else {
            const ar = { x: sp.r, vx: sp.vr };
            settle(ar, rWant, 8, 0.55, sec);
            sp.r = Math.max(0, ar.x);
            sp.vr = ar.vx;
          }
        }

        // the whole map pulls back a touch while changing over, and settles forward as the new one opens
        const zoomWant = l.open && (l.swap || op[l.open] < 0.5) && l.shownKey !== "" ? 0.97 : 1;
        if (l.still) l.zoom.s = 1;
        else {
          const z = { x: l.zoom.s, vx: l.zoom.v };
          settle(z, zoomWant, 6, 0.75, sec);
          l.zoom.s = z.x;
          l.zoom.v = z.vx;
        }
        worldEl.current?.style.setProperty("transform", `scale(${l.zoom.s.toFixed(4)})`);

        // the canvas: faint dust, and the wireframe globe
        const cv = canvas.current;
        const ctx = cv?.getContext("2d");
        if (cv && ctx) {
          const dpr = Math.min(2, window.devicePixelRatio || 1);
          if (cv.width !== Math.round(w.w * dpr) || cv.height !== Math.round(w.h * dpr)) {
            cv.width = Math.round(w.w * dpr);
            cv.height = Math.round(w.h * dpr);
          }
          if (inkAge-- <= 0) {
            ink = getComputedStyle(cv).color || ink;
            inkAge = 120;
          }
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          ctx.clearRect(0, 0, w.w, w.h);
          ctx.fillStyle = ink;
          for (const d of DUST) {
            ctx.globalAlpha = d.a;
            ctx.beginPath();
            ctx.arc(d.x * w.w, d.y * w.h, d.r, 0, Math.PI * 2);
            ctx.fill();
          }
          if (sp.placed && sp.r > 0.5) {
            // a wireframe globe, barely there: latitudes and longitudes at about 5% ink, turning with the spots.
            // The half facing you is drawn at 5%, the half round the back fainter still
            const fade = Math.min(1, sp.r / (w.ring * 0.4));
            ctx.strokeStyle = ink;
            ctx.lineWidth = 0.75;
            const trace = (pt: (u: number) => { x: number; y: number; z: number }) => {
              for (const front of [false, true]) {
                ctx.globalAlpha = (front ? 0.05 : 0.02) * fade;
                ctx.beginPath();
                let pen = false;
                for (let i = 0; i <= 72; i++) {
                  const pr = project(pt((i / 72) * Math.PI * 2), l.angle, TILT);
                  const isFront = pr.front >= 0.5;
                  const x = sp.x + pr.x * sp.r;
                  const y = sp.y + pr.y * sp.r;
                  if (isFront === front) {
                    if (pen) ctx.lineTo(x, y);
                    else ctx.moveTo(x, y);
                    pen = true;
                  } else pen = false;
                }
                ctx.stroke();
              }
            };
            for (const lat of [-60, -30, 0, 30, 60]) {
              const y = Math.sin((lat * Math.PI) / 180);
              const r = Math.cos((lat * Math.PI) / 180);
              trace((u) => ({ x: r * Math.cos(u), y, z: r * Math.sin(u) }));
            }
            for (let k = 0; k < 6; k++) {
              const lon = (k / 6) * Math.PI;
              trace((u) => ({ x: Math.cos(u) * Math.cos(lon), y: Math.sin(u), z: Math.cos(u) * Math.sin(lon) }));
            }
            // the outline, so the globe reads as round
            ctx.globalAlpha = 0.05 * fade;
            ctx.beginPath();
            ctx.arc(sp.x, sp.y, sp.r * (3.2 / Math.sqrt(3.2 * 3.2 - 1)), 0, Math.PI * 2);
            ctx.stroke();
          }
          ctx.globalAlpha = 1;
        }
      }
      if (running) frame = requestAnimationFrame(step);
    };

    // the loop only runs while the map is on screen
    const watch = new IntersectionObserver((entries) => {
      const on = entries.some((e) => e.isIntersecting);
      if (on && !running) {
        running = true;
        last = performance.now();
        frame = requestAnimationFrame(step);
      } else if (!on && running) {
        running = false;
        cancelAnimationFrame(frame);
      }
    });
    if (stage.current) watch.observe(stage.current);
    frame = requestAnimationFrame(step);
    return () => {
      running = false;
      cancelAnimationFrame(frame);
      watch.disconnect();
    };
  }, []);

  // It grows once, the first time it comes into view: spots week by week, then the Tuesday Crash opens
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const finish = () => {
      setWeek(LAST_WEEK);
      setOpen(FIRST);
      setGrown(true);
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      finish();
      return;
    }
    let timer = 0;
    const watch = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        watch.disconnect();
        let w = 0;
        const next = () => {
          w += 1;
          setWeek(w);
          timer = window.setTimeout(w < LAST_WEEK ? next : finish, w < LAST_WEEK ? WEEK_MS : 700);
        };
        next();
      },
      { threshold: 0.35 },
    );
    watch.observe(el);
    return () => {
      watch.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const choose = (id: string) => {
    const d = DOT_BY_ID[id];
    if (!grown) return;
    if (d.tier === "hub" && id !== open) {
      setOpen(id);
      setNote(null);
      setHover(null);
      return;
    }
    if (d.pattern === open && shown.includes(d.pattern) && d.named) setNote((n) => (n === id ? null : id));
  };

  // Pointer: a press that does not move is a choice. Moved, on a constellation's dot it drags the clump; on the
  // empty stage it spins the globe
  const press = useRef<{ id: string | null; x: number; y: number; moved: boolean; last: number } | null>(null);
  const down = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const el = (e.target as HTMLElement).closest<HTMLElement>("[data-pick]");
    press.current = { id: el?.dataset.pick ?? null, x: e.clientX, y: e.clientY, moved: false, last: e.clientX };
    stage.current?.setPointerCapture(e.pointerId);
  };
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const p = press.current;
    const l = live.current;
    if (!p) {
      // pointing, not pressing: light up whatever is under the pointer
      if (e.pointerType === "mouse" && grown) setHover((e.target as HTMLElement).closest<HTMLElement>("[data-pick]")?.dataset.pick ?? null);
      return;
    }
    if (!p.moved && Math.hypot(e.clientX - p.x, e.clientY - p.y) > 5) p.moved = true;
    if (!p.moved) return;
    const r = stage.current!.getBoundingClientRect();
    if (p.id && grown) {
      // a constellation drags its clump; a named spot drags itself, and tugs its constellation after it
      l.hold = { id: p.id, x: e.clientX - r.left, y: e.clientY - r.top };
    } else if (!p.id && l.shownKey) {
      const dx = (e.clientX - p.last) * 0.006;
      l.spinning = true;
      l.angle += dx;
      l.spinV = dx;
    }
    p.last = e.clientX;
  };
  const up = () => {
    const p = press.current;
    const l = live.current;
    press.current = null;
    l.hold = null;
    l.spinning = false;
    if (!p || p.moved) return;
    if (p.id) choose(p.id);
    else setNote(null);
  };
  const key = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") setNote(null);
  };

  const ref = (id: string) => (el: HTMLElement | null) => void (el ? nodeEls.current.set(id, el) : nodeEls.current.delete(id));

  return (
    <div className="mm" ref={root} data-hover={near ? "" : undefined} data-grown={grown ? "" : undefined} onKeyDown={key}>
      {children}

      <div
        className="mm-stage"
        ref={stage}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onPointerLeave={() => setHover(null)}
        data-open={open ? "" : undefined}
      >
        <div className="mm-world" ref={worldEl}>
        <canvas className="mm-globe" ref={canvas} aria-hidden="true" />
        <svg className="mm-lines" aria-hidden="true">
          {lines.map((l) => (
            <path
              key={l.id}
              ref={(el) => void (el ? lineEls.current.set(l.id, el) : lineEls.current.delete(l.id))}
              className={`mm-line mm-line--${l.kind}`}
              data-hl={near && near.has(l.a) && near.has(l.b) ? "" : undefined}
            />
          ))}
        </svg>

        <div className="mm-dots" role="group" aria-label="A map of the patterns Waldo has found. Choose a constellation to open it.">
          {DOTS.map((d) => {
            const isOpen = shown.includes(d.pattern);
            const on = week >= d.week;
            const common = {
              "data-tier": d.tier,
              "data-state": isOpen ? "open" : lit.has(d.id) ? "lit" : "faint",
              "data-on": on ? "" : undefined,
              "data-hl": near?.has(d.id) ? "" : undefined,
            };
            if (d.tier === "hub") {
              const p = PATTERN_BY_ID[d.id];
              const hit = d.id === open ? 34 : (CLUMP_RADIUS[d.id] * (wd?.clump ?? 1) + 8) * 2;
              return (
                <div key={d.id} ref={ref(d.id)} className="mm-n mm-n--hub" {...common} style={{ "--hit": `${hit}px` } as CSSProperties}>
                  <span className="mm-dot" />
                  <button
                    type="button"
                    className="mm-hit"
                    data-pick={d.id}
                    aria-label={d.id === open ? `${p.label}: what he does about it` : `Open ${p.label}`}
                    aria-pressed={d.id === open}
                    disabled={!on}
                    onClick={(e) => e.detail === 0 && choose(d.id)}
                  />
                  <span className="mm-pill mm-pill--hub" data-pick={d.id} aria-hidden="true">
                    <Icon name="spin" />
                    {p.label}
                  </span>
                  {note === d.id ? (
                    <span className="mm-note" role="status">
                      <b>What he does</b>
                      {p.acts}
                    </span>
                  ) : null}
                </div>
              );
            }
            const spot = d.named ? SPOT_BY_ID[d.id] : null;
            const named = !!(isOpen && spot && d.tier === "key");
            return (
              <div key={d.id} ref={ref(d.id)} className="mm-n" {...common} data-named={named ? "" : undefined}>
                <span className="mm-dot" />
                {named && spot ? (
                  <button type="button" className="mm-pill" data-pick={d.id} aria-expanded={note === d.id} onClick={(e) => e.detail === 0 && choose(d.id)}>
                    <Icon name={spot.signal} />
                    {spot.label}
                  </button>
                ) : null}
                {named && spot && note === d.id ? (
                  <span className="mm-note" role="status">
                    <b>Week {spot.week}</b>
                    {spot.text}
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
        </div>

        <p className="mm-week" aria-hidden="true" data-on={week > 0 && !grown ? "" : undefined}>
          Week {Math.max(1, week)}
        </p>
      </div>

      <p className="mm-hint">Choose a constellation to open it. Drag to spin it.</p>
    </div>
  );
}
