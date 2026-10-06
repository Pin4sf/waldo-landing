"use client";

import { type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { ForceSim, type SimNode } from "./see/force-sim";
import { type GLink, type GNode, type Shape, ROOT, SPOT_KIND, nodeById, visible } from "./see/memory-graph";
import { NEAR_OF, PATTERN_BY_ID, SPOTS_OF, SPOT_BY_ID, WITH_OF } from "./see/memory-data";

import "./memory-map.css";

// "Longer he learns, smarter he gets.": the Spots and Constellations map, made the way andrewtrousdale.com is made
// (his page and script read on 2026-10-05; the force simulation behind it is see/force-sim.ts, which follows his).
//
//   - Waldo is the main node, and the constellations stand round him, each with a few of its spots. Nothing is
//     laid out by hand: every link is a spring and every node pushes the others away, so the web settles by itself.
//   - Drag any node, the main one included, and the rest follow it on their springs; let go and it settles again.
//   - Choose a node (a click or a tap that does not drag): the web narrows to the way back to Waldo, that node, what
//     it is made of, and what turns up with it (greyer, dotted). A panel opens on the right with what it is, what
//     he does about it, and what it connects to; each of those can be followed. Choose Waldo, the node you are
//     on, the cross, or press Escape to go back.
//   - It is not in a box: the stage runs the full width of the window with no edge drawn, and the nodes can go
//     anywhere in it.
//   - With less motion the web is settled at once, with no arriving and no gliding (dragging still works).
//
// Everything on it is sample data (see/memory-data.ts); nothing here connects to anything.

const SIZE: Record<Shape, number> = { root: 24, hexagon: 26, circle: 20, square: 20, triangle: 26 };

/** The shapes, drawn as outlines with the page's colour inside so a line passing behind never shows through */
function Glyph({ shape, number, current, size }: { shape: Shape; number?: number; current?: boolean; size?: number }) {
  const s = size ?? SIZE[shape];
  const common = { className: shape === "root" ? "mm-shape mm-shape--root" : "mm-shape", width: s, height: s, "aria-hidden": true, "data-current": current ? "" : undefined } as const;
  if (shape === "root")
    return (
      <svg {...common} viewBox="0 0 23 20">
        <g className="mm-mark" fill="currentColor">
          <path d="M12.0455 8.19435C8.5546 8.63273 6.68628 1.37044 10.4049 0.0167778C14.1721 -0.400611 15.7586 7.09811 12.0455 8.19435Z" />
          <path d="M8.3092 10.5135C6.58923 13.9893 -0.949651 11.5404 0.0997341 7.32816C2.00498 3.60923 9.58249 6.4543 8.3092 10.5135Z" />
          <path d="M16.2786 9.83065C13.9189 7.43667 17.1194 2.50187 20.161 4.61989C22.6742 7.23047 19.1635 12.07 16.2786 9.83065Z" />
          <path d="M17.6058 13.2603C18.102 11.0572 22.6427 11.375 22.6197 13.8989C22.0525 16.2652 17.4372 15.7294 17.6058 13.2603Z" />
          <path d="M14.9478 15.3381C16.0796 14.5281 18.5029 18.2428 17.5123 19.5964C16.2774 20.4397 13.8966 16.5483 14.9478 15.3381Z" />
        </g>
      </svg>
    );
  return (
    <svg {...common} viewBox="0 0 26 26">
      {shape === "hexagon" ? <path d="M13 2 L22.5 7.5 V18.5 L13 24 L3.5 18.5 V7.5 Z" /> : null}
      {shape === "circle" ? <circle cx="13" cy="13" r="8.5" /> : null}
      {shape === "square" ? <rect x="4.5" y="4.5" width="17" height="17" /> : null}
      {shape === "triangle" ? <path d="M13 3.5 L23.5 22 H2.5 Z" /> : null}
      {shape === "hexagon" && number && !current ? (
        <text x="13" y="16.4" textAnchor="middle">
          {number}
        </text>
      ) : null}
      {current ? <path className="mm-x" d="M9.6 9.6l6.8 6.8M16.4 9.6l-6.8 6.8" /> : null}
    </svg>
  );
}

const TYPE: Record<string, string> = { hexagon: "Constellation", circle: "Spot · body", square: "Spot · focus", triangle: "Spot · habit", root: "Waldo" };
const typeOf = (n: GNode) => TYPE[n.shape];

/** The panel: what the chosen node is, what he does about it, and what it connects to */
function Panel({ current, onPick, onClose }: { current: string | null; onPick: (id: string) => void; onClose: () => void }) {
  if (!current) return null;
  const node = nodeById(current);
  const pattern = PATTERN_BY_ID[current];
  const spot = SPOT_BY_ID[current];
  const links: GNode[] = pattern
    ? [...SPOTS_OF[current].map((s) => nodeById(s.id)), ...(NEAR_OF[current] ?? []).map((id) => nodeById(id))]
    : [nodeById(spot.pattern), ...(WITH_OF[current] ?? []).map((id) => nodeById(id))];
  return (
    <div key={current} className="mm-page">
      <div className="mm-page-top">
        <p className="mm-type">
          <Glyph shape={node.shape} number={node.number} size={15} />
          {typeOf(node)}
        </p>
        <button type="button" className="mm-close" onClick={onClose} aria-label="Back to the whole map">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <h3 className="mm-page-title">{node.title}</h3>
      <p className="mm-sub">{pattern ? `Joined up in week ${pattern.since} · ${SPOTS_OF[current].length} spots` : `First seen in week ${spot.week} · ${SPOT_KIND[spot.signal].name}`}</p>
      <p className="mm-text">{pattern ? pattern.text : spot.text}</p>
      {pattern ? (
        <div className="mm-tab">
          <p className="mm-tab-title">What he does</p>
          <p className="mm-text mm-text--ink">{pattern.acts}</p>
        </div>
      ) : null}
      <div className="mm-tab">
        <p className="mm-tab-title">Connections</p>
        <ul className="mm-list">
          {links.map((n) => (
            <li key={n.id}>
              <button type="button" onClick={() => onPick(n.id)}>
                <Glyph shape={n.shape} number={n.number} size={16} />
                <span>
                  <b>{n.title}</b>
                  <i>{typeOf(n)}</i>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const pathOf = (a: SimNode, b: SimNode, kind: GLink["kind"]) => {
  if (kind === "angled") {
    // his own dog-leg: out a third of the way, a level run, then in
    const lean = a.y > b.y ? -30 : 30;
    const x1 = a.x + (b.x - a.x) / 3;
    const y1 = a.y + (b.y - a.y) / 3 + lean;
    const x2 = a.x + (2 * (b.x - a.x)) / 3;
    return `M${a.x.toFixed(1)},${a.y.toFixed(1)} L${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y1.toFixed(1)} L${b.x.toFixed(1)},${b.y.toFixed(1)}`;
  }
  return `M${a.x.toFixed(1)},${a.y.toFixed(1)} L${b.x.toFixed(1)},${b.y.toFixed(1)}`;
};

export function MemoryMap({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLElement>(null);
  const paintRef = useRef<() => void>(() => {});
  const [sim] = useState(() => new ForceSim(() => paintRef.current()));
  const bodies = useRef(new Map<string, SimNode>());
  const nodeEls = useRef(new Map<string, HTMLElement>());
  const pathEls = useRef(new Map<string, SVGPathElement>());
  const drag = useRef<{ id: string; node: SimNode; x: number; y: number; ox: number; oy: number; moved: boolean } | null>(null);
  const live = useRef<{ links: GLink[] }>({ links: [] });
  const motion = useRef(true);

  const [current, setCurrent] = useState<string | null>(null);
  const [size, setSize] = useState<"wide" | "mid" | "small">("wide");
  const graph = useMemo(() => visible(current), [current]);

  const paint = () => {
    const s = sim;
    for (const n of s.nodes) nodeEls.current.get(n.id)?.style.setProperty("transform", `translate(${n.x.toFixed(1)}px,${n.y.toFixed(1)}px)`);
    // Keep visible labels inside the stage and apart without moving the draggable nodes.
    const occupied: { left: number; right: number; top: number; bottom: number }[] = [];
    const width = stage.current?.clientWidth ?? 0;
    for (const n of s.nodes) {
      const label = nodeEls.current.get(n.id)?.querySelector<HTMLElement>(".mm-label");
      if (!label || getComputedStyle(label).display === "none") continue;
      const lw = label.offsetWidth;
      const lh = label.offsetHeight;
      const left = Math.max(8, Math.min(width - lw - 8, n.x - lw / 2));
      let top = n.y + 18;
      for (let pass = 0; pass < 12; pass++) {
        const hit = occupied.find(o => left < o.right + 4 && left + lw > o.left - 4 && top < o.bottom + 4 && top + lh > o.top - 4);
        if (!hit) break;
        top = hit.bottom + 5;
      }
      label.style.left = `${left - n.x}px`;
      top = Math.min(top, (stage.current?.clientHeight ?? top + lh) - lh - 12);
      label.style.top = `${top - n.y}px`;
      label.style.transform = "none";
      occupied.push({ left, right: left + lw, top, bottom: top + lh });
    }
    for (const l of live.current.links) {
      const a = bodies.current.get(l.source);
      const b = bodies.current.get(l.target);
      if (a && b) pathEls.current.get(l.id)?.setAttribute("d", pathOf(a, b, l.kind));
    }
  };

  useLayoutEffect(() => {
    paintRef.current = paint;
  });

  // The simulation lives as long as the map does
  useEffect(() => () => sim.stop(), [sim]);

  // How big the stage is decides how far apart things stand
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      setSize(w >= 1100 ? "wide" : w >= 640 ? "mid" : "small");
      fit();
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, size]);

  /** The web is centred in the part of the stage the panel leaves free */
  function fit() {
    const el = stage.current;
    const s = sim;
    if (!el) return;
    const w = el.clientWidth;
    const h = el.clientHeight;
    const free = current && size !== "small" && panel.current ? panel.current.offsetLeft - 28 : w;
    s.setCentre(free / 2, (h - 30) / 2 + 4);
    s.setBounds(w, h - 30, Math.min(90, w / 4));
    if (root.current?.dataset.ready && motion.current) s.restart(Math.max(s.alpha, 0.3));
  }

  // Whenever the web changes (a different node is chosen), the simulation is given the new nodes and links
  useLayoutEffect(() => {
    const s = sim;
    const el = stage.current;
    if (!el) return;
    motion.current = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    live.current.links = graph.links;
    const w = el.clientWidth;
    const h = el.clientHeight;
    const params = {
      wide: { strength: 0.1, charge: -300, chargeMax: 340, chargeMin: 12 },
      mid: { strength: 0.1, charge: -260, chargeMax: 280, chargeMin: 12 },
      small: { strength: 0.1, charge: -200, chargeMax: 230, chargeMin: 10 },
    }[size];
    const scale = size === "wide" ? 0.9 : size === "mid" ? 0.7 : 0.42;
    s.setParams(params);
    const free = current && size !== "small" && panel.current ? panel.current.offsetLeft - 28 : w;
    s.setCentre(free / 2, (h - 30) / 2 + 4);
    s.setBounds(w, h - 30, Math.min(90, w / 4));

    // nodes already on the map keep where they are; new ones start beside what they hang on, fanned out away from
    // the main node, so the web opens like a tree and settles from there
    const parentOf = new Map<string, GLink>();
    for (const l of graph.links) if (!parentOf.has(l.target)) parentOf.set(l.target, l);
    const kids = new Map<string, string[]>();
    for (const [child, l] of parentOf) kids.set(l.source, [...(kids.get(l.source) ?? []), child]);
    const nodes: SimNode[] = graph.nodes.map((n) => {
      let body = bodies.current.get(n.id);
      if (!body) {
        const link = parentOf.get(n.id);
        const from = link ? bodies.current.get(link.source) : undefined;
        let x = free / 2;
        let y = h / 2;
        if (link && from) {
          const siblings = kids.get(link.source) ?? [n.id];
          const k = siblings.indexOf(n.id);
          const count = siblings.length;
          const up = parentOf.get(link.source);
          const grand = up ? bodies.current.get(up.source) : undefined;
          let angle: number;
          if (!grand) angle = -Math.PI / 2 + (2 * Math.PI * k) / count;
          else {
            const base = Math.atan2(from.y - grand.y, from.x - grand.x);
            const spread = Math.min((260 * Math.PI) / 180, (42 * Math.PI * count) / 180);
            angle = base + (count === 1 ? 0 : (k / (count - 1) - 0.5) * spread);
          }
          const r = link.distance * scale * 0.9;
          x = from.x + Math.cos(angle) * r;
          y = from.y + Math.sin(angle) * r;
        }
        body = { id: n.id, x, y, vx: 0, vy: 0, fx: null, fy: null };
        bodies.current.set(n.id, body);
      }
      return body;
    });
    s.setGraph(
      nodes,
      graph.links.map((l) => ({ source: l.source, target: l.target, distance: l.distance * scale })),
    );
    if (motion.current) {
      // the sim starts when the map first scrolls into view (below); afterwards a change warms it up again
      if (root.current?.dataset.ready) s.restart(1);
    } else {
      s.alpha = 1;
      s.settle();
    }
    paint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graph, size]);

  // The panel opening or closing moves the middle of the free space
  useEffect(() => {
    const t = window.setTimeout(fit, 30);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  // It arrives once, when it first comes into view
  useEffect(() => {
    const el = root.current;
    if (!el || !("IntersectionObserver" in window)) {
      if (el) el.dataset.ready = "";
      return;
    }
    const watch = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        watch.disconnect();
        el.dataset.ready = "";
        if (motion.current) sim.restart(1);
      },
      { threshold: 0.15 },
    );
    watch.observe(el);
    return () => watch.disconnect();
  }, [sim]);

  const choose = (id: string) => {
    const next = id === ROOT || id === current ? null : id;
    setCurrent(next);
    // on a phone the panel opens under the web: bring it into view if it would be off the bottom of the screen
    if (next && size === "small") {
      requestAnimationFrame(() => {
        const top = root.current?.querySelector(".mm-sheet")?.getBoundingClientRect().top ?? 0;
        if (top > window.innerHeight - 160) window.scrollBy({ top: top - window.innerHeight + 300, behavior: "smooth" });
      });
    }
  };
  const back = () => setCurrent(null);

  // Dragging a node: it is held under the pointer, the sim runs warm, and the rest follow on their springs
  const down = (e: PointerEvent<HTMLDivElement>) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>(".mm-node");
    const s = sim;
    const stageEl = stage.current;
    if (!el || !stageEl || e.button !== 0) return;
    const body = bodies.current.get(el.dataset.id ?? "");
    if (!body) return;
    const r = stageEl.getBoundingClientRect();
    el.setPointerCapture(e.pointerId);
    drag.current = { id: body.id, node: body, x: e.clientX, y: e.clientY, ox: e.clientX - r.left - body.x, oy: e.clientY - r.top - body.y, moved: false };
    body.fx = body.x;
    body.fy = body.y;
    s.alphaTarget(0.3).restart();
  };
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const stageEl = stage.current;
    if (!d || !stageEl) return;
    if (!d.moved && Math.hypot(e.clientX - d.x, e.clientY - d.y) > 4) d.moved = true;
    const r = stageEl.getBoundingClientRect();
    d.node.fx = e.clientX - r.left - d.ox;
    d.node.fy = e.clientY - r.top - d.oy;
    if (!motion.current) paint();
  };
  const up = () => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    d.node.fx = null;
    d.node.fy = null;
    sim.alphaTarget(0);
    if (!d.moved) choose(d.id);
  };
  const key = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape" && current) back();
  };

  return (
    <div className="mm" ref={root} data-focus={current ? "" : undefined} onKeyDown={key}>
      {children}

      <div className="mm-stage" ref={stage} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
        <svg className="mm-links" aria-hidden="true">
          {graph.links.map((l, i) => (
            <path key={l.id} ref={(el) => void (el ? pathEls.current.set(l.id, el) : pathEls.current.delete(l.id))} className={`mm-link mm-link--${l.kind}`} style={{ "--ed": `${i * 40}ms` } as CSSProperties} />
          ))}
        </svg>
        <div className="mm-nodes" role="group" aria-label="A map of what Waldo has noticed. Drag a node and the rest follow. Choose one to read about it.">
          {graph.nodes.map((n, i) => (
            <div
              key={n.id}
              ref={(el) => void (el ? nodeEls.current.set(n.id, el) : nodeEls.current.delete(n.id))}
              className="mm-node"
              data-id={n.id}
              data-shape={n.shape}
              data-current={n.id === current ? "" : undefined}
              data-connected={n.connected ? "" : undefined}
              style={{ "--ed": `${i * 70}ms` } as CSSProperties}
            >
              <button
                type="button"
                className="mm-hit"
                aria-label={`${n.title}, ${typeOf(n).toLowerCase()}`}
                aria-pressed={n.id === current}
                onClick={(e) => e.detail === 0 && choose(n.id)}
              >
                <Glyph shape={n.shape} number={n.number} current={n.id === current} />
              </button>
              <span className="mm-label">
                <b>{n.title}</b>
                <i>{n.summary}</i>
              </span>
            </div>
          ))}
        </div>

        <aside className="mm-panel" ref={panel} data-open={current ? "" : undefined} aria-live="polite" aria-label="About the one you chose">
          <Panel current={current} onPick={choose} onClose={back} />
        </aside>
      </div>

      <div className="mm-sheet" data-open={current ? "" : undefined}>
        <div className="mm-sheet-in">
          <Panel current={current} onPick={choose} onClose={back} />
        </div>
      </div>
    </div>
  );
}
