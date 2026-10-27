"use client";

import { type CSSProperties, type PointerEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { WaldoMark } from "./site-nav";
import "./how-map.css";

// The opening picture of How it works, after "See what Claude can do" on claude.com/product/overview: Waldo, the
// page's five parts (each a link down to its section), and every feature on its part, by the name it has further
// down the page. Features that aren't out yet carry "Soon".
//
// 2026-10-12, rebuilt the way claude.com builds theirs (measured on the live page):
// - Three compositions on three fixed-size canvases, each scaled to the width it is in: wide (1200 x 800, a star
//   with Waldo in the middle), middle (700 x 640, the same star, tighter, labels wrapped) and tall (340 x 1080,
//   for phones: the five parts one under the other, zigzagging down a thread that starts at Waldo, their features
//   fanned out either side). Before, anything under 860px became a list.
// - Positions are not fixed by hand on the small canvases: each label is measured, then pushed off the others
//   until none touch. Lines are drawn from the edge of one label to the edge of the next, so they stop short of
//   the words and follow them as they move.
// - It is alive. Drag any label (on a mouse): the line to it follows and everything joined to it leans after it,
//   then settles back. Left alone, each label drifts a pixel or two. Pointing at a part brings its features
//   forward and dims the rest; pointing at a feature with a line of explanation opens a small card.
// - It draws itself out when it scrolls into view: the lines trace, the labels rise.
// With less motion: no drag, no drift, no drawing. Without scripting, or for a screen reader, the same things are
// a list (.hm-list).

type LayoutKey = "wide" | "mid" | "tall";
const CANVAS: Record<LayoutKey, { w: number; h: number }> = {
  wide: { w: 1200, h: 800 },
  mid: { w: 700, h: 640 },
  tall: { w: 340, h: 1080 },
};

type Leaf = { label: string; x: number; y: number; soon?: boolean };
type Branch = { title: string; href: string; x: number; y: number; leaves: Leaf[] };

// Places on the wide canvas, set by hand. The middle canvas starts from these, scaled, and is then relaxed.
const BRANCHES: Branch[] = [
  {
    title: "Health",
    href: "#health",
    x: 320,
    y: 205,
    leaves: [
      { label: "Recovery", x: 135, y: 115 },
      { label: "Form", x: 300, y: 72 },
      { label: "Weight", x: 465, y: 98 },
      { label: "Sleep debt", x: 105, y: 215 },
      { label: "Quiet flags", x: 125, y: 305 },
      { label: "Training", x: 290, y: 315 },
      { label: "Your history", x: 470, y: 250 },
      { label: "Bring your past", x: 165, y: 30 },
    ],
  },
  {
    title: "Day to day",
    href: "#day",
    x: 885,
    y: 195,
    leaves: [
      { label: "The Brief", x: 715, y: 98 },
      { label: "The Window", x: 875, y: 62 },
      { label: "Your best hours", x: 1060, y: 100 },
      { label: "Fewer pings", x: 1110, y: 190 },
      { label: "Patterns", x: 1085, y: 272 },
      { label: "The Slope", x: 730, y: 262 },
      { label: "Fixed first, mentioned after", x: 1010, y: 25 },
      { label: "Tomorrow, today", x: 905, y: 318, soon: true },
    ],
  },
  {
    title: "Connectors",
    href: "#connectors",
    x: 990,
    y: 480,
    leaves: [
      { label: "Your watch", x: 1110, y: 395 },
      { label: "Calendar", x: 1125, y: 470 },
      { label: "Inbox and messages", x: 1090, y: 545 },
      { label: "Tasks", x: 1120, y: 615 },
      { label: "Your agents", x: 980, y: 600 },
      { label: "200+ tools", x: 950, y: 395 },
      { label: "Agents ask Waldo", x: 845, y: 560, soon: true },
    ],
  },
  {
    title: "Talk to Waldo",
    href: "#talk",
    x: 650,
    y: 690,
    leaves: [
      { label: "Threads", x: 840, y: 655 },
      { label: "Follow up on anything", x: 880, y: 735 },
      { label: "Quick replies", x: 690, y: 772 },
      { label: "Charts in replies", x: 510, y: 768 },
      { label: "Full history", x: 470, y: 690 },
      { label: "Voice", x: 520, y: 612, soon: true },
    ],
  },
  {
    title: "Your rules",
    href: "#rules",
    x: 240,
    y: 525,
    leaves: [
      { label: "Yours, always", x: 99, y: 474 },
      { label: "Three levels, per area", x: 165, y: 418 },
      { label: "The activity log", x: 99, y: 576 },
      { label: "Your own routines", x: 150, y: 650, soon: true },
      { label: "Say it once", x: 240, y: 700 },
      { label: "Your schedule", x: 340, y: 660 },
      { label: "Always comes back to you", x: 322, y: 752 },
    ],
  },
];

const WIDE_CENTRE = { x: 600, y: 395 };

type Seed = { centre: { x: number; y: number }; parts: { x: number; y: number }[]; leaves: { x: number; y: number }[][] };

/** Where everything starts on a canvas, before the labels are measured and pushed apart */
function seedFor(layout: LayoutKey): Seed {
  const { w, h } = CANVAS[layout];
  if (layout !== "tall") {
    const sx = w / CANVAS.wide.w;
    const sy = h / CANVAS.wide.h;
    return {
      centre: { x: WIDE_CENTRE.x * sx, y: WIDE_CENTRE.y * sy },
      parts: BRANCHES.map((b) => ({ x: b.x * sx, y: b.y * sy })),
      leaves: BRANCHES.map((b) => b.leaves.map((l) => ({ x: l.x * sx, y: l.y * sy }))),
    };
  }
  // Tall: Waldo at the top, then each part in a band of its own, the parts zigzagging either side of the middle,
  // their features alternating left and right of them, each a half row below the one across
  const ROW = 40;
  const centre = { x: w / 2, y: 34 };
  const parts: Seed["parts"] = [];
  const leaves: Seed["leaves"] = [];
  let y = 104;
  BRANCHES.forEach((b, i) => {
    const rows = Math.ceil(b.leaves.length / 2);
    const px = w / 2 + (i % 2 === 0 ? -22 : 22);
    parts.push({ x: px, y: y + (rows * ROW) / 2 });
    leaves.push(
      b.leaves.map((_, k) => {
        const side = k % 2 === 0 ? -1 : 1;
        const row = Math.floor(k / 2);
        return { x: px + side * (104 + (row % 2) * 14), y: y + row * ROW + ROW / 2 + (side > 0 ? 16 : 0) };
      }),
    );
    y += rows * ROW + 50;
  });
  return { centre, parts, leaves };
}

type Edge = { a: string; b: string; g: number; trunk: boolean; d: number };

/** What is joined to what: on the star, Waldo to each part; on the tall one, a thread from Waldo down through the parts */
function edgesFor(layout: LayoutKey): Edge[] {
  const edges: Edge[] = [];
  let prev = "c";
  BRANCHES.forEach((_, b) => {
    edges.push({ a: layout === "tall" ? prev : "c", b: `p${b}`, g: b, trunk: true, d: layout === "tall" ? 200 + b * 150 : 200 + b * 90 });
    prev = `p${b}`;
  });
  BRANCHES.forEach((branch, b) =>
    branch.leaves.forEach((_, l) => edges.push({ a: `p${b}`, b: `l${b}-${l}`, g: b, trunk: false, d: (layout === "tall" ? 500 + b * 150 : 700 + b * 90) + l * 40 })),
  );
  return edges;
}

type Sim = {
  ids: string[];
  els: HTMLElement[];
  x: Float64Array;
  y: Float64Array;
  vx: Float64Array;
  vy: Float64Array;
  rx: Float64Array;
  ry: Float64Array;
  hw: Float64Array;
  hh: Float64Array;
  phase: Float64Array;
  amp: Float64Array;
  nbr: number[][];
  lines: { a: number; b: number; el: SVGLineElement }[];
  drag: { i: number; sx: number; sy: number; dx: number; dy: number; moved: boolean; id: number } | null;
};

/** Push the labels off each other (and keep them on the canvas) until none touch; parts and Waldo stay put */
function relax(sim: Sim, fixed: boolean[], seedX: Float64Array, seedY: Float64Array, w: number, h: number) {
  const n = sim.ids.length;
  const PAD = 7;
  for (let it = 0; it < 360; it++) {
    // A line must not run through the words of another label: such a label is pushed off to the side of it
    for (const { a, b } of sim.lines) {
      const ax = sim.rx[a];
      const ay = sim.ry[a];
      const dx = sim.rx[b] - ax;
      const dy = sim.ry[b] - ay;
      const len = Math.hypot(dx, dy) || 1;
      for (let k = 0; k < n; k++) {
        if (k === a || k === b || fixed[k]) continue;
        for (let t = 0.06; t < 0.95; t += 0.06) {
          const px = ax + dx * t;
          const py = ay + dy * t;
          if (Math.abs(px - sim.rx[k]) < sim.hw[k] + 5 && Math.abs(py - sim.ry[k]) < sim.hh[k] + 5) {
            const side = dx * (sim.ry[k] - ay) - dy * (sim.rx[k] - ax) >= 0 ? 1 : -1;
            sim.rx[k] += (side * -dy * 1.6) / len;
            sim.ry[k] += (side * dx * 1.6) / len;
            break;
          }
        }
      }
    }
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (fixed[i] && fixed[j]) continue;
        const dx = sim.rx[j] - sim.rx[i];
        const dy = sim.ry[j] - sim.ry[i];
        const ox = sim.hw[i] + sim.hw[j] + PAD - Math.abs(dx);
        const oy = sim.hh[i] + sim.hh[j] + PAD - Math.abs(dy);
        if (ox <= 0 || oy <= 0) continue;
        // Out along whichever way is the shorter
        const alongX = ox < oy;
        const push = (alongX ? ox : oy) / (fixed[i] || fixed[j] ? 1 : 2) + 0.01;
        const sx = alongX ? (dx >= 0 ? 1 : -1) : 0;
        const sy = alongX ? 0 : dy >= 0 ? 1 : -1;
        if (!fixed[i]) {
          sim.rx[i] -= sx * push;
          sim.ry[i] -= sy * push;
        }
        if (!fixed[j]) {
          sim.rx[j] += sx * push;
          sim.ry[j] += sy * push;
        }
      }
    }
    for (let i = 0; i < n; i++) {
      if (fixed[i]) continue;
      // A little pull back to where it started, so they don't drift far
      sim.rx[i] += (seedX[i] - sim.rx[i]) * 0.012;
      sim.ry[i] += (seedY[i] - sim.ry[i]) * 0.012;
      sim.rx[i] = Math.min(w - sim.hw[i] - 2, Math.max(sim.hw[i] + 2, sim.rx[i]));
      sim.ry[i] = Math.min(h - sim.hh[i] - 2, Math.max(sim.hh[i] + 2, sim.ry[i]));
    }
  }
}

/** The point where a line from (ax, ay) to (bx, by) leaves a's box, a little way out from it */
function leave(ax: number, ay: number, bx: number, by: number, hw: number, hh: number, gap: number) {
  const dx = bx - ax;
  const dy = by - ay;
  const t = Math.min(dx ? (hw + gap) / Math.abs(dx) : Infinity, dy ? (hh + gap) / Math.abs(dy) : Infinity, 0.5);
  return [ax + dx * t, ay + dy * t] as const;
}

const SOFT = 170; // how far a label can be pulled, at the most
const soften = (d: number) => SOFT * Math.tanh(d / SOFT);

/** What was a drag is not a click on the link under the pointer: the click that follows the release is stopped */
function stopNextClick() {
  const stop = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
  };
  window.addEventListener("click", stop, { capture: true, once: true });
  window.setTimeout(() => window.removeEventListener("click", stop, true), 80);
}

/** One frame of the little world: see HowMap */
function step(s: Sim, now: number, float: boolean) {
  for (let i = 0; i < s.ids.length; i++) {
    if (s.drag?.i === i) {
      s.x[i] = s.rx[i] + soften(s.drag.dx);
      s.y[i] = s.ry[i] + soften(s.drag.dy);
      s.vx[i] = s.vy[i] = 0;
      continue;
    }
    let lx = 0;
    let ly = 0;
    for (const j of s.nbr[i]) {
      lx += s.x[j] - s.rx[j];
      ly += s.y[j] - s.ry[j];
    }
    const a = float ? s.amp[i] : 0;
    const tx = s.rx[i] + lx * 0.16 + Math.sin(now * 0.00031 + s.phase[i]) * a;
    const ty = s.ry[i] + ly * 0.16 + Math.cos(now * 0.00027 + s.phase[i] * 1.3) * a;
    s.vx[i] = (s.vx[i] + (tx - s.x[i]) * 0.1) * 0.7;
    s.vy[i] = (s.vy[i] + (ty - s.y[i]) * 0.1) * 0.7;
    s.x[i] += s.vx[i];
    s.y[i] += s.vy[i];
  }
}

/** The pointer has moved to (cx, cy) while a label is held */
function dragTo(d: NonNullable<Sim["drag"]>, cx: number, cy: number, scale: number) {
  d.dx = (cx - d.sx) / scale;
  d.dy = (cy - d.sy) / scale;
  if (!d.moved && Math.hypot(d.dx, d.dy) > 4) d.moved = true;
  return d.moved;
}

export function HowMap({ notes = {} }: { notes?: Record<string, string> }) {
  const [layout, setLayout] = useState<LayoutKey>("wide");
  // Which composition has had its labels measured and placed (the map stays hidden until it is the one on screen)
  const [placed, setPlaced] = useState<LayoutKey | null>(null);
  const [shown, setShown] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [card, setCard] = useState<{ b: number; l: number; x: number; y: number; below: boolean } | null>(null);
  const [dragging, setDragging] = useState(false);

  const frame = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const sim = useRef<Sim | null>(null);
  const scale = useRef(1);
  const raf = useRef(0);
  const inView = useRef(false);
  const reduced = useRef(false);

  // Which composition fits this width (the same breakpoints as how-map.css)
  useLayoutEffect(() => {
    const narrow = window.matchMedia("(max-width: 639px)");
    const middle = window.matchMedia("(max-width: 999px)");
    const pick = () => setLayout(narrow.matches ? "tall" : middle.matches ? "mid" : "wide");
    pick();
    narrow.addEventListener("change", pick);
    middle.addEventListener("change", pick);
    return () => {
      narrow.removeEventListener("change", pick);
      middle.removeEventListener("change", pick);
    };
  }, []);

  const paint = useCallback(() => {
    const s = sim.current;
    if (!s) return;
    for (let i = 0; i < s.ids.length; i++) {
      s.els[i].style.transform = `translate3d(${(s.x[i] - s.hw[i]).toFixed(2)}px, ${(s.y[i] - s.hh[i]).toFixed(2)}px, 0)`;
    }
    for (const line of s.lines) {
      const { a, b, el } = line;
      const p = leave(s.x[a], s.y[a], s.x[b], s.y[b], s.hw[a], s.hh[a], 7);
      const q = leave(s.x[b], s.y[b], s.x[a], s.y[a], s.hw[b], s.hh[b], 7);
      el.setAttribute("x1", p[0].toFixed(2));
      el.setAttribute("y1", p[1].toFixed(2));
      el.setAttribute("x2", q[0].toFixed(2));
      el.setAttribute("y2", q[1].toFixed(2));
    }
  }, []);

  // One frame: every label eases toward where it belongs (where it rests, plus a lean toward whatever it is joined
  // to that has been pulled away, plus a slow drift), the one being dragged goes where the pointer is
  const frameFn = useRef<(now: number) => void>(() => {});
  useEffect(() => {
    frameFn.current = (now: number) => {
      raf.current = 0;
      const s = sim.current;
      if (!s || !inView.current || document.visibilityState !== "visible") return;
      step(s, now, !reduced.current);
      paint();
      raf.current = requestAnimationFrame((t) => frameFn.current(t));
    };
  }, [paint]);

  const kick = useCallback(() => {
    if (!raf.current) raf.current = requestAnimationFrame((t) => frameFn.current(t));
  }, []);

  // Measure the labels on this composition, push them apart, and set them going
  useEffect(() => {
    const root = stage.current;
    if (!root) return;
    let cancelled = false;
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const build = () => {
      if (cancelled) return;
      const { w, h } = CANVAS[layout];
      const seed = seedFor(layout);
      const els = Array.from(root.querySelectorAll<HTMLElement>("[data-id]"));
      const ids = els.map((el) => el.dataset.id as string);
      const n = ids.length;
      const index = new Map(ids.map((id, i) => [id, i]));
      const s: Sim = {
        ids,
        els,
        x: new Float64Array(n),
        y: new Float64Array(n),
        vx: new Float64Array(n),
        vy: new Float64Array(n),
        rx: new Float64Array(n),
        ry: new Float64Array(n),
        hw: new Float64Array(n),
        hh: new Float64Array(n),
        phase: new Float64Array(n),
        amp: new Float64Array(n),
        nbr: Array.from({ length: n }, () => [] as number[]),
        lines: [],
        drag: null,
      };
      const fixed: boolean[] = [];
      const seedX = new Float64Array(n);
      const seedY = new Float64Array(n);
      ids.forEach((id, i) => {
        const el = els[i];
        s.hw[i] = el.offsetWidth / 2;
        s.hh[i] = el.offsetHeight / 2;
        s.phase[i] = (i * 2.399) % (Math.PI * 2);
        let at = seed.centre;
        if (id[0] === "p") at = seed.parts[+id.slice(1)];
        else if (id[0] === "l") {
          const [b, l] = id.slice(1).split("-").map(Number);
          at = seed.leaves[b][l];
        }
        seedX[i] = s.rx[i] = at.x;
        seedY[i] = s.ry[i] = at.y;
        fixed[i] = id[0] !== "l";
        s.amp[i] = id === "c" ? 0 : id[0] === "p" ? 1.4 : 2.2;
      });
      root.querySelectorAll<SVGLineElement>("line[data-a]").forEach((el) => {
        const a = index.get(el.dataset.a as string);
        const b = index.get(el.dataset.b as string);
        if (a === undefined || b === undefined) return;
        s.lines.push({ a, b, el });
        s.nbr[a].push(b);
        s.nbr[b].push(a);
      });
      relax(s, fixed, seedX, seedY, w, h);
      s.x.set(s.rx);
      s.y.set(s.ry);
      sim.current = s;
      paint();
      setPlaced(layout);
      kick();
    };

    // Wait for the type to load: the labels' sizes depend on it
    const fonts = document.fonts?.ready ?? Promise.resolve();
    void fonts.then(build);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf.current);
      raf.current = 0;
    };
  }, [layout, paint, kick]);

  // Fit the canvas to the width it is in; run only while it is on screen; draw it out the first time it is
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const { w } = CANVAS[layout];
    const fit = () => {
      scale.current = el.getBoundingClientRect().width / w;
      el.style.setProperty("--s", String(scale.current));
    };
    fit();
    const size = new ResizeObserver(fit);
    size.observe(el);
    const eye = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        if (entry.isIntersecting) kick();
        if (entry.intersectionRatio >= 0.18 || (entry.isIntersecting && window.innerHeight < entry.boundingClientRect.height)) setShown(true);
      },
      { threshold: [0, 0.18, 0.4] },
    );
    eye.observe(el);
    const resume = () => document.visibilityState === "visible" && kick();
    document.addEventListener("visibilitychange", resume);
    return () => {
      size.disconnect();
      eye.disconnect();
      document.removeEventListener("visibilitychange", resume);
    };
  }, [layout, kick]);

  const canDrag = () => layout !== "tall" && !reduced.current;

  function onDown(e: PointerEvent<HTMLDivElement>) {
    const s = sim.current;
    if (!s || !canDrag() || e.pointerType !== "mouse" || e.button !== 0) return;
    const node = (e.target as HTMLElement).closest<HTMLElement>("[data-id]");
    if (!node) return;
    const i = s.ids.indexOf(node.dataset.id as string);
    if (i < 0) return;
    s.drag = { i, sx: e.clientX, sy: e.clientY, dx: 0, dy: 0, moved: false, id: e.pointerId };
    try {
      node.setPointerCapture(e.pointerId);
    } catch {
      // the pointer is gone already: the drag carries on without it
    }
    setCard(null);
    kick();
  }

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const d = sim.current?.drag;
    if (!d || d.id !== e.pointerId) return;
    if (dragTo(d, e.clientX, e.clientY, scale.current) && !dragging) setDragging(true);
  }

  function onUp(e: PointerEvent<HTMLDivElement>) {
    const s = sim.current;
    if (!s?.drag || s.drag.id !== e.pointerId) return;
    if (s.drag.moved) stopNextClick();
    s.drag = null;
    setDragging(false);
    kick();
  }

  function enter(b: number, l?: number) {
    if (sim.current?.drag) return;
    setActive(b);
    if (l === undefined) return setCard(null);
    const label = BRANCHES[b].leaves[l].label;
    const s = sim.current;
    if (!s || !notes[label] || layout === "tall") return setCard(null);
    const i = s.ids.indexOf(`l${b}-${l}`);
    const { w, h } = CANVAS[layout];
    const below = s.y[i] < h * 0.58;
    const half = 120;
    setCard({
      b,
      l,
      x: Math.min(w - half - 8, Math.max(half + 8, s.x[i])),
      y: below ? s.y[i] + s.hh[i] + 14 : s.y[i] - s.hh[i] - 14,
      below,
    });
  }

  const { w, h } = CANVAS[layout];
  const edges = edgesFor(layout);
  const cardLabel = card ? BRANCHES[card.b].leaves[card.l].label : "";

  return (
    <nav
      className="hm"
      aria-label="Everything Waldo does"
      data-layout={layout}
      data-ready={placed === layout ? "" : undefined}
      data-in={shown ? "" : undefined}
      data-focus={active === null ? undefined : ""}
      data-drag={dragging ? "" : undefined}
    >
      <div className="hm-frame" ref={frame} aria-hidden="true">
        <div
          className="hm-stage"
          ref={stage}
          style={{ width: w, height: h }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onMouseLeave={() => {
            setActive(null);
            setCard(null);
          }}
        >
          <svg className="hm-lines" width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
            {edges.map((edge) => (
              <line
                key={`${edge.a}-${edge.b}`}
                data-a={edge.a}
                data-b={edge.b}
                data-g={edge.g}
                data-on={active === edge.g ? "" : undefined}
                data-trunk={edge.trunk ? "" : undefined}
                pathLength={1}
                style={{ "--d": `${edge.d}ms` } as CSSProperties}
              />
            ))}
          </svg>

          <span className="hm-node hm-centre" data-id="c">
            <span className="hm-txt" style={{ "--d": "0ms" } as CSSProperties}>
              <span className="hm-mark">
                <WaldoMark size={34} />
              </span>
              Waldo
            </span>
          </span>

          {BRANCHES.map((branch, b) => (
            <div key={branch.title} className="hm-group" data-on={active === b ? "" : undefined}>
              <a
                href={branch.href}
                className="hm-node hm-branch"
                data-id={`p${b}`}
                tabIndex={-1}
                draggable={false}
                onPointerEnter={() => enter(b)}
              >
                <span className="hm-txt" style={{ "--d": `${450 + (layout === "tall" ? b * 150 : b * 90)}ms` } as CSSProperties}>
                  {branch.title}
                </span>
              </a>
              {branch.leaves.map((leaf, l) => (
                <a
                  key={leaf.label}
                  href={branch.href}
                  className="hm-node hm-leaf"
                  data-id={`l${b}-${l}`}
                  data-note={notes[leaf.label] ? "" : undefined}
                  tabIndex={-1}
                  draggable={false}
                  onPointerEnter={() => enter(b, l)}
                >
                  <span className="hm-txt" style={{ "--d": `${(layout === "tall" ? 650 + b * 150 : 900 + b * 90) + l * 40}ms` } as CSSProperties}>
                    {leaf.label}
                    {leaf.soon ? <i>Soon</i> : null}
                  </span>
                </a>
              ))}
            </div>
          ))}

          <div className="hm-card" data-show={card ? "" : undefined} data-below={card?.below ? "" : undefined} style={card ? { left: card.x, top: card.y } : undefined}>
            <b>{cardLabel}</b>
            <span>{cardLabel ? notes[cardLabel] : ""}</span>
          </div>
        </div>
      </div>

      {/* For a screen reader, and for anyone without scripting: the same, as a list */}
      <ul className="hm-list">
        {BRANCHES.map((branch) => (
          <li key={branch.title}>
            <a href={branch.href}>
              {branch.title}
              <span aria-hidden="true">→</span>
            </a>
            <p>
              {branch.leaves.map((leaf) => (
                <span key={leaf.label}>
                  {leaf.label}
                  {leaf.soon ? <i>Soon</i> : null}
                </span>
              ))}
            </p>
          </li>
        ))}
      </ul>
    </nav>
  );
}
