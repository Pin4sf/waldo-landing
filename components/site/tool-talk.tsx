"use client";

import { useEffect, useState } from "react";

import { ToolMark, WaldoFace } from "./connector-mark";

// The picture in Connectors' close, "Your tools don't talk to each other. Waldo does.": six tools that never speak
// to each other, each with a line to Waldo in the middle. Something leaves a tool on the left, goes through Waldo,
// and arrives at a tool on the right, one after another. Drawn as one SVG that scales with its box. With less motion
// the lines are still and nothing travels.

const W = 560;
const H = 132;
const MID = { x: W / 2, y: H / 2 };
const LEFT = [
  { tool: "Apple Watch", y: 22 },
  { tool: "Gmail", y: 66 },
  { tool: "Google Tasks", y: 110 },
];
const RIGHT = [
  { tool: "Google Calendar", y: 22 },
  { tool: "Slack", y: 66 },
  { tool: "Notion", y: 110 },
];
const EDGE = 40;

const inbound = (y: number) => `M${EDGE + 20},${y} C${MID.x - 110},${y} ${MID.x - 90},${MID.y} ${MID.x - 30},${MID.y}`;
/** From a tool on the left, through the middle, to a tool on the right, as one path */
const trip = (from: number, to: number) => `${inbound(from)} L${MID.x + 30},${MID.y} ${outbound(to).slice(outbound(to).indexOf("C"))}`;
const outbound = (y: number) => `M${MID.x + 30},${MID.y} C${MID.x + 90},${MID.y} ${MID.x + 110},${y} ${W - EDGE - 20},${y}`;

export function ToolTalk() {
  const [moving, setMoving] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMoving(!query.matches);
    const timer = window.setTimeout(update, 0);
    query.addEventListener("change", update);
    return () => {
      window.clearTimeout(timer);
      query.removeEventListener("change", update);
    };
  }, []);

  return (
    <div className="tt" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`}>
        {LEFT.map((item) => (
          <path key={item.tool} d={inbound(item.y)} className="tt-line" />
        ))}
        {RIGHT.map((item) => (
          <path key={item.tool} d={outbound(item.y)} className="tt-line" />
        ))}
        {/* Each trip: in from a tool on the left, through Waldo (the dot passes under his tile), out to one on the right */}
        {moving
          ? LEFT.map((item, i) => (
              <circle key={item.tool} r="3" className="tt-dot">
                <animateMotion dur="3.6s" begin={`-${i * 1.2}s`} repeatCount="indefinite" path={trip(item.y, RIGHT[(i + 1) % RIGHT.length].y)} />
              </circle>
            ))
          : null}
      </svg>
      {LEFT.map((item) => (
        <span key={item.tool} className="tt-tile" style={{ left: `${(EDGE / W) * 100}%`, top: `${(item.y / H) * 100}%` }}>
          <ToolMark name={item.tool} size={20} />
        </span>
      ))}
      {RIGHT.map((item) => (
        <span key={item.tool} className="tt-tile" style={{ left: `${((W - EDGE) / W) * 100}%`, top: `${(item.y / H) * 100}%` }}>
          <ToolMark name={item.tool} size={20} />
        </span>
      ))}
      <span className="tt-waldo" style={{ left: "50%", top: "50%" }}>
        <WaldoFace size={30} />
      </span>
    </div>
  );
}
