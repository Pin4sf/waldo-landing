"use client";

import { type CSSProperties, useState } from "react";

import { WaldoMark } from "./site-nav";
import "./how-map.css";

// The opening picture of How it works, after "See what Claude can do" on claude.com/product/overview: Waldo in the
// middle, the page's five parts around him (each a link down to its section), and every feature hanging off its
// part, by the name it has further down the page. Features that aren't out yet carry "Soon". Point at a part and
// its lines and features come forward while the rest step back. It draws itself out from the middle on load. On
// narrow screens, where a map won't fit, the parts become a list with their features under each.
//
// Places are set by hand on a 1200 x 800 canvas that scales with the page; the lines are an SVG on the same canvas.

const W = 1200;
const H = 800;
const MID = { x: 600, y: 395 };

type Leaf = { label: string; x: number; y: number; soon?: boolean };
type Branch = { title: string; href: string; x: number; y: number; leaves: Leaf[] };

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

const pct = (x: number, y: number) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` });

export function HowMap() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <nav className="hm" aria-label="Everything Waldo does" data-active={active === null ? undefined : ""}>
      {/* Wide screens: the map */}
      <div className="hm-map" onMouseLeave={() => setActive(null)}>
        <svg className="hm-lines" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
          {BRANCHES.map((branch, b) => (
            <g key={branch.title} data-on={active === b ? "" : undefined}>
              <line x1={MID.x} y1={MID.y} x2={branch.x} y2={branch.y} pathLength={1} className="hm-trunk" style={{ "--d": `${200 + b * 90}ms` } as CSSProperties} />
              {branch.leaves.map((leaf, l) => (
                <line
                  key={leaf.label}
                  x1={branch.x}
                  y1={branch.y}
                  x2={leaf.x}
                  y2={leaf.y}
                  pathLength={1}
                  style={{ "--d": `${700 + b * 90 + l * 40}ms` } as CSSProperties}
                />
              ))}
            </g>
          ))}
        </svg>

        <span className="hm-centre" style={pct(MID.x, MID.y)}>
          <span className="hm-mark">
            <WaldoMark size={34} />
          </span>
          Waldo
        </span>

        {BRANCHES.map((branch, b) => (
          <div key={branch.title} className="hm-group" data-on={active === b ? "" : undefined}>
            <a
              href={branch.href}
              className="hm-branch"
              style={{ ...pct(branch.x, branch.y), "--d": `${450 + b * 90}ms` } as CSSProperties}
              onMouseEnter={() => setActive(b)}
              onFocus={() => setActive(b)}
              onBlur={() => setActive(null)}
            >
              {branch.title}
            </a>
            {branch.leaves.map((leaf, l) => (
              <a
                key={leaf.label}
                href={branch.href}
                className="hm-leaf"
                tabIndex={-1}
                style={{ ...pct(leaf.x, leaf.y), "--d": `${900 + b * 90 + l * 40}ms` } as CSSProperties}
                onMouseEnter={() => setActive(b)}
              >
                {leaf.label}
                {leaf.soon ? <i>Soon</i> : null}
              </a>
            ))}
          </div>
        ))}
      </div>

      {/* Narrow screens: the same, as a list */}
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
