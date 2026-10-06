"use client";

import { type CSSProperties } from "react";

import { AppHeader, SeePhone, WaldoBar, useScript } from "./kit";
import { PATTERN_CLUSTERS, PATTERN_DUST, PATTERN_ICONS } from "./pattern-art";
import { FIELD, MAP_H, MAP_W, PLACE, type Place, curve, r1 } from "./pattern-places";
import { PATTERNS, type PatternNode } from "./see-fixture";

// Card 6: Spots and Constellations, played as a short film of memory compounding, on a map with no frame.
// The map is Suyash's constellation map, drawn straight onto the screen (no box round it): spots fly in
// week by week as dots with a label; once seven have turned up together, lines are drawn in and they are
// joined into one pattern (the Tuesday Crash); then more patterns bloom outward round it as clusters of
// dots. A camera moves over the map with a little spring in it, and the map has no edge: it goes on in every
// direction (dust and fainter patterns beyond the ones named) and fades out where the screen stops, then
// keeps drifting when the film is over. A card under it says what the film is showing, and for a
// constellation how many spots make it. Nothing here is for tapping.
// The map's own artwork is Suyash's (Frame 1686558348.svg): the icons and dot clusters are in pattern-art.ts.

/** How long each step holds, in ms; the last step (the whole map) stays */
const HOLDS = [600, 1300, 1300, 1300, 1300, 3000, 2600, 2900];

/** The map's size in its own coordinates (the SVG's) and where the camera's centre sits on the screen, in the phone's units */
const VIEW_W = 470;
const CENTRE_Y = 150;

/** Where the camera looks (the map's coordinates) and how close, at each step: in on the first spots, following the new ones, a push in as the pattern forms, out to show the others, over to the big one, home */
const CAMERA: [number, number, number][] = [
  [560, 215, 1.25],
  [610, 150, 1.22],
  [640, 235, 1.15],
  [470, 215, 1.1],
  [440, 295, 1.04],
  [457, 318, 1.02],
  [470, 300, 0.78],
  [660, 425, 1.25],
  [457, 310, 0.86],
];

const byId = (id: string) => PATTERNS.nodes.find((n) => n.id === id) as PatternNode;
const SPOTS = PATTERNS.nodes.filter((n) => n.kind === "spot");
const OTHERS = PATTERNS.nodes.filter((n) => n.kind === "constellation" && n.id !== PATTERNS.home);
const at_ = (n: number) => `calc(${n} * var(--pu))`;

/** Which way a spot arrives from: out beyond where it ends up, away from the middle, in the phone's units */
function fly(id: string) {
  const a = PLACE[PATTERNS.home];
  const b = PLACE[id];
  const d = Math.hypot(b.x - a.x, b.y - a.y) || 1;
  return { x: r1(((b.x - a.x) / d) * 70), y: r1(((b.y - a.y) / d) * 70) };
}

function Icon({ name }: { name: string }) {
  const art = PATTERN_ICONS[name];
  return <svg className="see-pat-icon" viewBox={art.vb.join(" ")} aria-hidden="true" dangerouslySetInnerHTML={{ __html: art.svg }} />;
}

/** A label, hung from where it is anchored: by default on the map, or (for a cluster) from the cluster's own centre */
function Label({ node, anchor, from }: { node: PatternNode; anchor: Place["label"]; from?: { x: number; y: number } }) {
  const shift = anchor.a === "c" ? "-50%" : anchor.a === "r" ? "-100%" : "0";
  return (
    <span className="see-pat-pill" style={{ left: at_(anchor.x - (from?.x ?? 0)), top: at_(anchor.y - (from?.y ?? 0)), "--shift": shift } as CSSProperties}>
      <Icon name={node.kind === "constellation" ? "spin" : node.id} />
      {node.label}
    </span>
  );
}

export function PatternsScreen() {
  // The film: one step after another when the card arrives; at rest the whole map
  const { step } = useScript(HOLDS);
  const idx = Math.min(step, PATTERNS.steps.length - 1);
  const now = PATTERNS.steps[idx];
  const [cx, cy, z] = CAMERA[idx];
  const camera = `translate(calc(${VIEW_W / 2} * var(--u) - ${cx} * var(--pu) * ${z}), calc(${CENTRE_Y} * var(--u) - ${cy} * var(--pu) * ${z})) scale(${z})`;
  const home = PLACE[PATTERNS.home];
  const w = PATTERNS.words;
  const subject = now.detail ? byId(now.detail.id) : null;
  const dots = now.detail?.id === "training" ? now.detail.count : 0;

  return (
    <SeePhone clock={PATTERNS.clock}>
      <AppHeader title={PATTERNS.title} />
      <div className="see-pat">
        <div className="see-pat-view" role="img" aria-label="A map with no edge. Spots, one small thing at a time, join over weeks into a constellation, the Tuesday Crash, and then more constellations form round it as memory compounds.">
          <div className="see-pat-sway" aria-hidden="true">
            <div className="see-pat-world" style={{ transform: camera }}>
              <svg className="see-pat-lines" viewBox={`0 0 ${MAP_W} ${MAP_H}`} preserveAspectRatio="none">
                {PATTERNS.links.map(([, spot], i) => (
                  <path key={spot} d={curve(spot)} pathLength={1} data-on={now.centre ? "" : undefined} style={{ "--d": `${i * 110}ms` } as CSSProperties} />
                ))}
                {PATTERNS.links.map(([, spot], i) => (
                  <path key={`f${spot}`} className="see-pat-flow" d={curve(spot, true)} pathLength={1} data-on={now.centre ? "" : undefined} style={{ "--d": `${1400 + i * 330}ms` } as CSSProperties} />
                ))}
              </svg>
              {FIELD.dust.map((d, i) => (
                <i key={i} className="see-pat-dust" data-on={now.others ? "" : undefined} style={{ left: at_(d.x), top: at_(d.y), width: `calc(${d.r * 2} * var(--u))`, height: `calc(${d.r * 2} * var(--u))`, "--d": `${d.d}ms` } as CSSProperties} />
              ))}
              {PATTERN_DUST.map((d, i) => (
                <i
                  key={`n${i}`}
                  className="see-pat-dust"
                  data-on={now.others ? "" : undefined}
                  style={{ left: `calc(${at_(home.x)} + ${d.dx} * var(--u))`, top: `calc(${at_(home.y)} + ${d.dy} * var(--u))`, width: `calc(${d.r * 2} * var(--u))`, height: `calc(${d.r * 2} * var(--u))`, "--d": `${i * 70}ms` } as CSSProperties}
                />
              ))}
              {FIELD.clusters.map((c, k) => (
                <div key={k} className="see-pat-cluster see-pat-ghost" data-on={now.others ? "" : undefined} style={{ left: at_(c.x), top: at_(c.y), "--k": k, "--s": c.s } as CSSProperties}>
                  {PATTERN_CLUSTERS[c.name].map((d, i) => (
                    <i key={i} className={d.core ? "see-pat-core" : "see-pat-bit"} data-lit={d.lit ? "" : undefined} style={{ left: `calc(${d.dx} * var(--u))`, top: `calc(${d.dy} * var(--u))`, width: `calc(${d.r * 2} * var(--u))`, height: `calc(${d.r * 2} * var(--u))`, "--bx": `calc(${d.dx} * var(--u))`, "--by": `calc(${d.dy} * var(--u))`, "--d": `${200 + k * 90 + i * 30}ms` } as CSSProperties} />
                  ))}
                </div>
              ))}
              {SPOTS.map((n, i) => {
                const f = fly(n.id);
                return (
                  <div key={n.id} className="see-pat-spot" data-on={now.spots.includes(n.id) ? "" : undefined} style={{ left: at_(PLACE[n.id].x), top: at_(PLACE[n.id].y), "--fx": `calc(${f.x} * var(--u))`, "--fy": `calc(${f.y} * var(--u))`, "--b": `${i * 430}ms` } as CSSProperties}>
                    <i className="see-pat-dot" />
                    <i className="see-pat-ring" />
                    <Label node={n} anchor={PLACE[n.id].label} from={PLACE[n.id]} />
                  </div>
                );
              })}
              <div className="see-pat-spot see-pat-centre" data-on={now.centre ? "" : undefined} style={{ left: at_(home.x), top: at_(home.y), "--fx": "0px", "--fy": "0px" } as CSSProperties}>
                <i className="see-pat-dot see-pat-dot--big" />
                <i className="see-pat-ring" />
                <i className="see-pat-ring see-pat-ring--late" />
                <Label node={byId(PATTERNS.home)} anchor={home.label} from={home} />
              </div>
              {OTHERS.map((n, k) => (
                <div
                  key={n.id}
                  className="see-pat-cluster"
                  data-on={now.others ? "" : undefined}
                  data-hot={idx === 7 && n.id === "training" ? "" : undefined}
                  style={{ left: at_(PLACE[n.id].x), top: at_(PLACE[n.id].y), "--k": k } as CSSProperties}
                >
                  {PATTERN_CLUSTERS[n.id].map((d, i) => (
                    <i
                      key={i}
                      className={d.core ? "see-pat-core" : "see-pat-bit"}
                      data-lit={d.lit ? "" : undefined}
                      style={{ left: `calc(${d.dx} * var(--u))`, top: `calc(${d.dy} * var(--u))`, width: `calc(${d.r * 2} * var(--u))`, height: `calc(${d.r * 2} * var(--u))`, "--bx": `calc(${d.dx} * var(--u))`, "--by": `calc(${d.dy} * var(--u))`, "--d": `${160 + k * 120 + i * 34}ms` } as CSSProperties}
                    />
                  ))}
                  <Label node={n} anchor={PLACE[n.id].label} from={PLACE[n.id]} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="see-pat-detail" data-tall={now.detail ? "" : undefined}>
          <div className="see-pat-top">
            <span className="see-pat-kind">{now.caption.kind}</span>
            <span key={now.week} className="see-pat-week">
              {w.week} {now.week}
            </span>
          </div>
          <div key={idx} className="see-pat-words">
            <b>{now.caption.title}</b>
            <p>{now.caption.text}</p>
          </div>
          {now.detail && subject ? (
            <div key={`d${now.detail.id}`} className="see-pat-count">
              <span className="see-pat-num">{now.detail.count}</span>
              <span className="see-pat-of">
                {w.spots} {w.inThis}
              </span>
              <span className="see-pat-for">
                {w.over} {now.detail.weeks} {w.weeks}
              </span>
              {now.detail.id === PATTERNS.home ? (
                <div className="see-pat-chips" aria-label={`The ${now.detail.count} spots in ${subject.label}, the first three shown`}>
                  <ul>
                    {PATTERNS.links.slice(0, 3).map(([, spot], i) => (
                      <li key={spot} style={{ "--i": i } as CSSProperties}>
                        <Icon name={spot} />
                        {byId(spot).short ?? byId(spot).label}
                      </li>
                    ))}
                  </ul>
                  <span className="see-pat-more">+{now.detail.count - 3}</span>
                </div>
              ) : (
                <div className="see-pat-meter" aria-hidden="true">
                  {Array.from({ length: dots }, (_, i) => (
                    <i key={i} data-lit={i % 5 === 2 ? "" : undefined} style={{ "--i": i } as CSSProperties} />
                  ))}
                </div>
              )}
            </div>
          ) : now.spots.length ? (
            <div className="see-pat-saved" aria-hidden="true">
              {now.spots.map((id, i) => (
                <span key={id} style={{ "--i": i } as CSSProperties}>
                  <Icon name={id} />
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <WaldoBar compact />
    </SeePhone>
  );
}
