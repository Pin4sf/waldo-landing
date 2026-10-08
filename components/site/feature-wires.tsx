import type { CSSProperties, ReactNode } from "react";

import "./feature-wires.css";

// Wireframes for the How it works side panels, one per feature (after the figures in Linear's sheets).
// Each is a sketch of where the feature shows up, not a screenshot: hairline windows on a faint box, the
// windows' edges carried on as construction lines, and the window cropped by the box on one side or two.
// Words come from the feature's own copy (app/how-it-works/page.tsx), so the picture and the panel agree.
//
// Every scene is drawn in the same 480 x 300 space and scales with the panel. Styles: feature-wires.css.

const VW = 480;
const VH = 300;

type Rect = { x: number; y: number; w: number; h: number };
type Tone = "ink" | "mid" | "soft" | "on";

/** The box, and the construction lines: every window edge carried across the whole picture */
function Frame({ label, wins, xs = [], ys = [], children }: { label: string; wins: Rect[]; xs?: number[]; ys?: number[]; children: ReactNode }) {
  const vertical = new Set(xs);
  const horizontal = new Set(ys);
  for (const win of wins) {
    vertical.add(win.x).add(win.x + win.w);
    horizontal.add(win.y).add(win.y + win.h);
  }
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} role="img" aria-label={label}>
      {[...vertical]
        .filter((x) => x > 0 && x < VW)
        .map((x) => (
          <line key={`x${x}`} className="wf-guide" x1={x} x2={x} y1={0} y2={VH} />
        ))}
      {[...horizontal]
        .filter((y) => y > 0 && y < VH)
        .map((y) => (
          <line key={`y${y}`} className="wf-guide" x1={0} x2={VW} y1={y} y2={y} />
        ))}
      {children}
    </svg>
  );
}

function Win({ x, y, w, h, r = 16 }: Rect & { r?: number }) {
  return <rect className="wf-win" x={x} y={y} width={w} height={h} rx={r} />;
}

function T({
  x,
  y,
  children,
  tone = "mid",
  size = 11,
  bold = false,
  anchor,
}: {
  x: number;
  y: number;
  children: ReactNode;
  tone?: Tone;
  size?: number;
  bold?: boolean;
  anchor?: "start" | "middle" | "end";
}) {
  const classes = ["wf-t", tone === "mid" ? "" : `wf-t--${tone}`, bold ? "wf-t--b" : ""].filter(Boolean).join(" ");
  return (
    <text x={x} y={y} className={classes} style={{ fontSize: size }} textAnchor={anchor}>
      {children}
    </text>
  );
}

/** A grey bar standing in for text that doesn't matter here */
function Skel({ x, y, w, h = 6 }: { x: number; y: number; w: number; h?: number }) {
  return <rect className="wf-skel" x={x} y={y} width={w} height={h} rx={h / 2} />;
}

function Rule({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return <line className="wf-rule" x1={x1} x2={x2} y1={y} y2={y} />;
}

type BoxKind = "line" | "fill" | "ghost" | "ink" | "focus";
function Box({ x, y, w, h, r = 10, kind = "line" }: Rect & { r?: number; kind?: BoxKind }) {
  const className = kind === "line" ? "wf-box" : kind === "focus" ? "wf-box wf-box--focus" : `wf-box wf-box--${kind}`;
  return <rect className={className} x={x} y={y} width={w} height={h} rx={r} />;
}

/** A rounded label: a chip, a tab or a button */
function Pill({ x, y, w, h = 24, label, kind = "line", size = 10 }: { x: number; y: number; w: number; h?: number; label: string; kind?: BoxKind; size?: number }) {
  const tone: Tone = kind === "ink" ? "on" : kind === "ghost" ? "soft" : kind === "focus" ? "ink" : "mid";
  return (
    <g>
      <Box x={x} y={y} w={w} h={h} r={h / 2} kind={kind} />
      <T x={x + w / 2} y={y + h / 2 + size * 0.36} size={size} tone={tone} anchor="middle" bold={kind === "ink" || kind === "focus"}>
        {label}
      </T>
    </g>
  );
}

function Toggle({ x, y, on = false }: { x: number; y: number; on?: boolean }) {
  return (
    <g className="wf-toggle" data-on={on ? "" : undefined}>
      <rect className="wf-toggle-track" x={x} y={y} width={26} height={16} rx={8} />
      <circle className="wf-toggle-knob" cx={on ? x + 18 : x + 8} cy={y + 8} r={6} />
    </g>
  );
}

/** A blinking text cursor */
function Caret({ x, y, h = 13 }: { x: number; y: number; h?: number }) {
  return <line className="wf-stroke-ink wf-caret" x1={x} x2={x} y1={y} y2={y + h} />;
}

// Waldo's paw (app/icon.svg)
const PAW = [
  "M12.0455 8.19435C8.5546 8.63273 6.68628 1.37044 10.4049 0.0167778C14.1721 -0.400611 15.7586 7.09811 12.0455 8.19435Z",
  "M8.3092 10.5135C6.58923 13.9893 -0.949651 11.5404 0.0997341 7.32816C2.00498 3.60923 9.58249 6.4543 8.3092 10.5135Z",
  "M16.2786 9.83065C13.9189 7.43667 17.1194 2.50187 20.161 4.61989C22.6742 7.23047 19.1635 12.07 16.2786 9.83065Z",
  "M17.6058 13.2603C18.102 11.0572 22.6427 11.375 22.6197 13.8989C22.0525 16.2652 17.4372 15.7294 17.6058 13.2603Z",
  "M14.9478 15.3381C16.0796 14.5281 18.5029 18.2428 17.5123 19.5964C16.2774 20.4397 13.8966 16.5483 14.9478 15.3381Z",
  "M12.4438 16.4828C13.658 16.5976 13.532 19.6799 12.1468 19.9149C10.8424 19.7685 11.0872 16.6145 12.4438 16.4828Z",
  "M8.14378 17.1963C7.28218 17.5051 6.42602 17.6249 5.54174 17.3248C4.67747 17.041 4.12053 16.212 4.48021 15.3153C4.77929 14.5697 5.47458 14.0913 6.18381 13.7831C9.6415 12.3095 11.8426 15.68 8.14378 17.1963Z",
];

function PawMark({ cx, cy, size = 13 }: { cx: number; cy: number; size?: number }) {
  const scale = size / 23;
  return (
    <g className="wf-paw" transform={`translate(${cx - 11.5 * scale} ${cy - 10 * scale}) scale(${scale})`}>
      {PAW.map((d) => (
        <path key={d} d={d} />
      ))}
    </g>
  );
}

/** Waldo, as the sender of a message */
function Paw({ cx, cy, r = 11 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      <circle className="wf-avatar" cx={cx} cy={cy} r={r} />
      <PawMark cx={cx} cy={cy} size={r * 1.1} />
    </g>
  );
}

/** A message. Waldo's are filled, with the paw beside them; yours are outlined. Returns nothing else, so
    callers place the next one: a bubble is 28 tall for one line, and 15 more for each line after. */
function Bubble({ x, y, w, lines, from = "waldo", size = 11 }: { x: number; y: number; w: number; lines: string[]; from?: "waldo" | "you"; size?: number }) {
  const h = 28 + (lines.length - 1) * 15;
  return (
    <g>
      <Box x={x} y={y} w={w} h={h} r={13} kind={from === "waldo" ? "fill" : "line"} />
      {from === "waldo" ? <Paw cx={x - 17} cy={y + h - 11} r={10} /> : null}
      {lines.map((line, index) => (
        <T key={line} x={x + 12} y={y + 18 + index * 15} size={size} tone={from === "waldo" ? "ink" : "mid"}>
          {line}
        </T>
      ))}
    </g>
  );
}

const ICONS = {
  mic: (
    <>
      <rect x="5" y="1.5" width="4" height="7.5" rx="2" />
      <path d="M2.8 7a4.2 4.2 0 0 0 8.4 0M7 11.2v1.8" />
    </>
  ),
  up: <path d="M4.5 6.2 6.9 1.8c.9 0 1.6.7 1.6 1.6v2.2h2.9a1 1 0 0 1 1 1.2l-.9 4.8a1 1 0 0 1-1 .8H4.5V6.2zM1.6 6.2h2.9v6.2H1.6z" />,
  down: <path d="M9.5 7.8 7.1 12.2c-.9 0-1.6-.7-1.6-1.6V8.4H2.6a1 1 0 0 1-1-1.2l.9-4.8a1 1 0 0 1 1-.8h6v6.2zM12.4 7.8H9.5V1.6h2.9z" />,
  lock: (
    <>
      <rect x="2.8" y="6.2" width="8.4" height="6.3" rx="1.6" />
      <path d="M4.8 6.2V4.6a2.2 2.2 0 0 1 4.4 0v1.6" />
    </>
  ),
  check: <path d="M2.8 7.3 5.7 10.2 11.2 4.4" />,
  moon: <path d="M11.6 8.7A5 5 0 0 1 5.3 2.4a5 5 0 1 0 6.3 6.3z" />,
  search: <path d="M6.2 10.4a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4zM9.3 9.3 12.4 12.4" />,
  download: <path d="M7 1.8v7.4M4 6.4 7 9.4l3-3M2.4 12.2h9.2" />,
  trash: <path d="M2.4 3.9h9.2M5.4 3.9V2.3h3.2v1.6M3.5 3.9l.7 8.3h5.6l.7-8.3" />,
  pencil: <path d="M9.4 2.3 11.7 4.6 5 11.3 2.3 11.7 2.7 9z" />,
  close: <path d="M3.6 3.6 10.4 10.4M10.4 3.6 3.6 10.4" />,
  send: <path d="M2 7h9.4M7.6 3.2 11.4 7l-3.8 3.8" />,
  arrowUp: <path d="M7 11.6V2.6M3.4 6.2 7 2.6l3.6 3.6" />,
  eye: (
    <>
      <path d="M1.4 7S3.4 3.1 7 3.1 12.6 7 12.6 7 10.6 10.9 7 10.9 1.4 7 1.4 7z" />
      <circle cx="7" cy="7" r="1.7" />
    </>
  ),
  person: <path d="M7 7.2a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2zM2.4 12.6a4.6 4.6 0 0 1 9.2 0" />,
  clock: <path d="M7 12.6A5.6 5.6 0 1 0 7 1.4a5.6 5.6 0 0 0 0 11.2zM7 4v3.2l2.1 1.4" />,
  heart: <path d="M7 12.1S1.6 8.9 1.6 5.3A2.8 2.8 0 0 1 7 4.1a2.8 2.8 0 0 1 5.4 1.2c0 3.6-5.4 6.8-5.4 6.8z" />,
  pulse: <path d="M1.2 7.2h2.6l1.6-3.6 3 7.2 1.6-3.6h2.8" />,
  speaker: <path d="M1.8 5.4h2.6L7.4 2.8v8.4L4.4 8.6H1.8zM9.6 4.8a3.1 3.1 0 0 1 0 4.4M11.2 3.2a5.4 5.4 0 0 1 0 7.6" />,
  calendar: (
    <>
      <rect x="1.8" y="2.8" width="10.4" height="9.4" rx="1.8" />
      <path d="M1.8 5.9h10.4M4.8 1.4v2.6M9.2 1.4v2.6" />
    </>
  ),
  plus: <path d="M7 2.8v8.4M2.8 7h8.4" />,
  repeat: <path d="M2.4 6.4V5.6a2 2 0 0 1 2-2h7M9.4 1.8l1.9 1.8-1.9 1.8M11.6 7.6v.8a2 2 0 0 1-2 2h-7M4.6 12.2 2.7 10.4l1.9-1.8" />,
  grid: (
    <>
      <rect x="1.8" y="1.8" width="4.2" height="4.2" rx="1.2" />
      <rect x="8" y="1.8" width="4.2" height="4.2" rx="1.2" />
      <rect x="1.8" y="8" width="4.2" height="4.2" rx="1.2" />
      <rect x="8" y="8" width="4.2" height="4.2" rx="1.2" />
    </>
  ),
} satisfies Record<string, ReactNode>;

function Icon({ name, x, y, size = 14, tone = "soft" }: { name: keyof typeof ICONS; x: number; y: number; size?: number; tone?: "soft" | "ink" | "on" }) {
  const className = tone === "soft" ? "wf-icon" : `wf-icon wf-icon--${tone}`;
  return (
    <g className={className} transform={`translate(${x} ${y}) scale(${size / 14})`}>
      {ICONS[name]}
    </g>
  );
}

/** A pointer arrow, for the thing being clicked */
function Cursor({ x, y }: { x: number; y: number }) {
  return (
    <path
      className="wf-box"
      transform={`translate(${x} ${y})`}
      d="M0 0v13.2l3.3-3.1 2.3 4.7 2.1-1-2.3-4.6 4.5-.3z"
      style={{ stroke: "var(--wf-ink)", strokeLinejoin: "round" }}
    />
  );
}

/** A smooth line through points (Catmull-Rom, as cubic curves) */
function smooth(points: [number, number][]) {
  const round = (value: number) => Math.round(value * 10) / 10;
  let d = `M${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${round(c1[0])} ${round(c1[1])} ${round(c2[0])} ${round(c2[1])} ${p2[0]} ${p2[1]}`;
  }
  return d;
}

type Scene = (props: { label: string }) => ReactNode;

/* ── Health ──────────────────────────────────────────────────────────────────────────────────────── */

const SleepDebt: Scene = ({ label }) => {
  const win = { x: 64, y: 32, w: 352, h: 300 };
  const usual = 118;
  const base = 192;
  const tops = [126, 110, 121, 131, 114, 124, 136, 127, 145, 120, 141, 150, 157, 163];
  return (
    <Frame label={label} wins={[win]}>
      <Win {...win} />
      <T x={86} y={60} tone="ink" size={12} bold>
        Sleep debt
      </T>
      <T x={394} y={60} tone="soft" size={10} anchor="end">
        Last 14 nights
      </T>
      <Rule x1={64} x2={416} y={74} />
      {tops.map((top, index) => {
        const x = 92 + index * 21.4;
        return (
          <g key={index}>
            <rect className="wf-dot-ink" x={x} y={top} width={11} height={base - top} rx={3} opacity={0.08 + index * 0.034} />
            {top > usual ? <rect className="wf-box wf-box--ghost" x={x} y={usual} width={11} height={top - usual} rx={3} /> : null}
          </g>
        );
      })}
      <line className="wf-dash" x1={86} x2={394} y1={usual} y2={usual} />
      <T x={394} y={usual - 7} tone="soft" size={9.5} anchor="end">
        Your usual
      </T>
      <T x={92} y={208} tone="soft" size={9.5}>
        Two weeks ago
      </T>
      <T x={389} y={208} tone="soft" size={9.5} anchor="end">
        Last night
      </T>
      <Box x={108} y={226} w={286} h={44} r={13} kind="fill" />
      <Paw cx={89} cy={259} r={10} />
      <T x={120} y={244} tone="ink">
        Tonight’s the night to pay it back.
      </T>
      <T x={120} y={259} size={10}>
        Earlier wind-down, and a lighter morning.
      </T>
    </Frame>
  );
};

const QuietFlags: Scene = ({ label }) => {
  const win = { x: 40, y: 44, w: 400, h: 290 };
  const rows = [
    { name: "Blood oxygen", at: 314 },
    { name: "Breathing rate", at: 300 },
    { name: "Wrist temperature", at: 374, drift: true },
  ];
  return (
    <Frame label={label} wins={[win]}>
      <Win {...win} />
      <T x={62} y={72} tone="ink" size={12} bold>
        Resting state
      </T>
      <T x={418} y={72} tone="soft" size={10} anchor="end">
        Against your usual
      </T>
      <Rule x1={40} x2={440} y={86} />
      <T x={313} y={106} tone="soft" size={9.5} anchor="middle">
        Your usual
      </T>
      {rows.map((row, index) => {
        const y = 132 + index * 40;
        return (
          <g key={row.name}>
            <T x={62} y={y + 4} tone="ink">
              {row.name}
            </T>
            <line className="wf-rule" x1={210} x2={418} y1={y} y2={y} />
            <rect className="wf-fill" x={278} y={y - 6} width={70} height={12} rx={6} />
            {row.drift ? (
              <>
                <circle className="wf-dot-open wf-pulse" cx={row.at} cy={y} r={4.5} />
                <circle className="wf-dot-open" cx={row.at} cy={y} r={4.5} />
                <T x={row.at} y={y + 19} tone="soft" size={9.5} anchor="middle">
                  A little above
                </T>
              </>
            ) : (
              <circle className="wf-dot-ink" cx={row.at} cy={y} r={4} />
            )}
          </g>
        );
      })}
      <Box x={80} y={238} w={338} h={44} r={13} kind="fill" />
      <Paw cx={61} cy={271} r={10} />
      <T x={92} y={256} tone="ink">
        Wrist temperature is a little above your usual.
      </T>
      <T x={92} y={271} size={10}>
        A gentle heads-up, not a diagnosis.
      </T>
    </Frame>
  );
};

const Training: Scene = ({ label }) => {
  const win = { x: 92, y: -10, w: 296, h: 320 };
  const hours = ["7:00", "8:00", "9:00", "10:00", "11:00", "12:00"];
  return (
    <Frame label={label} wins={[win]} ys={[30, 270]}>
      <Win {...win} />
      {hours.map((hour, index) => {
        const y = 44 + index * 44;
        return (
          <g key={hour}>
            <T x={106} y={y + 3.5} tone="soft" size={9.5}>
              {hour}
            </T>
            <Rule x1={146} x2={388} y={y} />
          </g>
        );
      })}
      <Box x={152} y={48} w={220} h={38} r={9} kind="fill" />
      <T x={164} y={64} tone="ink" bold>
        Morning run
      </T>
      <T x={164} y={78} tone="soft" size={9.5}>
        Hard session
      </T>
      <Box x={152} y={114} w={220} h={62} r={9} kind="focus" />
      <T x={164} y={133} tone="ink" bold>
        Investor memo
      </T>
      <T x={164} y={148} size={10}>
        Your sharp 90 minutes, after the run
      </T>
      <Box x={152} y={224} w={220} h={36} r={9} kind="ghost" />
      <T x={164} y={246} tone="soft" size={10}>
        Investor memo
      </T>
      <T x={360} y={246} tone="soft" size={9.5} anchor="end">
        was here
      </T>
      <path className="wf-stroke-soft" d="M352 222 C 360 206, 360 194, 352 180" />
      <path className="wf-stroke-soft" d="M347.5 184 L352 179 L357 183" />
      <Box x={316} y={56} w={156} h={46} r={13} />
      <Icon name="heart" x={328} y={64} tone="ink" />
      <T x={348} y={75} tone="ink" size={10.5} bold>
        Heart rate up
      </T>
      <T x={348} y={90} size={10}>
        A workout, not stress
      </T>
    </Frame>
  );
};

const Weather: Scene = ({ label }) => {
  const win = { x: 40, y: 36, w: 400, h: 300 };
  const tiles = [
    { name: "UV", value: "Moderate" },
    { name: "Air", value: "Good" },
    { name: "Heat", value: "Mild" },
  ];
  return (
    <Frame label={label} wins={[win]}>
      <Win {...win} />
      <T x={62} y={64} tone="ink" size={12} bold>
        Outside
      </T>
      <T x={418} y={64} tone="soft" size={10} anchor="end">
        Near you
      </T>
      <Rule x1={40} x2={440} y={78} />
      <Rule x1={70} x2={410} y={168} />
      <path className="wf-dash" d="M90 168 Q240 32 390 168" />
      <path className="wf-stroke-ink" d="M90 168 Q153 110.9 216 101.7" />
      <circle className="wf-dot-open wf-pulse" cx={216} cy={101.7} r={7} />
      <circle className="wf-dot-open" cx={216} cy={101.7} r={7} />
      <T x={216} y={127} tone="soft" size={9.5} anchor="middle">
        Daylight so far
      </T>
      <T x={90} y={184} tone="soft" size={9.5} anchor="middle">
        Sunrise
      </T>
      <T x={390} y={184} tone="soft" size={9.5} anchor="middle">
        Sunset
      </T>
      {tiles.map((tile, index) => {
        const x = 62 + index * 122;
        return (
          <g key={tile.name}>
            <Box x={x} y={198} w={112} h={42} r={10} kind="fill" />
            <T x={x + 12} y={214} tone="soft" size={9.5}>
              {tile.name}
            </T>
            <T x={x + 12} y={230} tone="ink" bold>
              {tile.value}
            </T>
          </g>
        );
      })}
      <Box x={80} y={254} w={226} h={28} r={13} kind="fill" />
      <Paw cx={61} cy={271} r={10} />
      <T x={92} y={272} tone="ink">
        Good time for a walk outside.
      </T>
    </Frame>
  );
};

// One string per row of dots (a week across), 0 a good day to 3 a rough one
const HISTORY = ["0010012230010", "0100123321001", "1001233210100", "0010232310010", "1001123220001", "0100012310100", "0010101210010"];

const History: Scene = ({ label }) => {
  const win = { x: 56, y: 28, w: 368, h: 300 };
  const picked = { col: 7, row: 3 };
  const px = 90 + picked.col * 23;
  const py = 98 + picked.row * 23;
  return (
    <Frame label={label} wins={[win]}>
      <Win {...win} />
      <T x={78} y={56} tone="ink" size={12} bold>
        History
      </T>
      <rect className="wf-fill" x={296} y={41} width={108} height={22} rx={11} />
      <rect className="wf-box" x={368} y={43} width={34} height={18} rx={9} />
      {["7", "30", "90"].map((days, index) => (
        <T key={days} x={314 + index * 36} y={55.5} size={9.5} tone={index === 2 ? "ink" : "soft"} bold={index === 2} anchor="middle">
          {days}
        </T>
      ))}
      <T x={288} y={55.5} tone="soft" size={9.5} anchor="end">
        Days
      </T>
      <Rule x1={56} x2={424} y={74} />
      {HISTORY.map((row, r) =>
        [...row].map((tone, c) => <circle key={`${r}-${c}`} className={`wf-day-${tone}`} cx={90 + c * 23} cy={98 + r * 23} r={6} />),
      )}
      <circle className="wf-dot-open" cx={px} cy={py} r={10} style={{ fill: "none" }} />
      <Box x={262} y={178} w={178} h={48} r={13} />
      <T x={276} y={198} tone="ink" bold>
        Tue 6 Oct
      </T>
      <T x={276} y={213} size={10}>
        Short night. 3 things moved.
      </T>
      {[0, 1, 2, 3].map((tone) => (
        <circle key={tone} className={`wf-day-${tone}`} cx={90 + tone * 13} cy={268} r={4} />
      ))}
      <T x={142} y={271.5} tone="soft" size={9.5}>
        From a good day to a rough one
      </T>
    </Frame>
  );
};

const BringPast: Scene = ({ label }) => {
  const win = { x: 64, y: 24, w: 352, h: 300 };
  const rows = [
    { name: "Sleep", state: "done" },
    { name: "Heart rate and HRV", state: "done" },
    { name: "Workouts", state: "going" },
    { name: "Steps", state: "next" },
  ];
  return (
    <Frame label={label} wins={[win]}>
      <Win {...win} />
      <T x={86} y={52} tone="ink" size={12} bold>
        Import your history
      </T>
      <Rule x1={64} x2={416} y={66} />
      <Box x={118} y={82} w={48} h={48} r={13} />
      <Icon name="heart" x={130} y={94} size={24} tone="ink" />
      <Box x={314} y={82} w={48} h={48} r={13} />
      <PawMark cx={338} cy={106} size={24} />
      <line className="wf-dash wf-flow" x1={176} x2={302} y1={106} y2={106} />
      <path className="wf-stroke-soft" d="M297 102 L302 106 L297 110" />
      <T x={142} y={146} tone="soft" size={9.5} anchor="middle">
        Apple Health
      </T>
      <T x={338} y={146} tone="soft" size={9.5} anchor="middle">
        Waldo
      </T>
      {rows.map((row, index) => {
        const y = 182 + index * 30;
        return (
          <g key={row.name}>
            {index > 0 ? <Rule x1={86} x2={394} y={y - 15} /> : null}
            <T x={86} y={y} tone={row.state === "next" ? "soft" : "ink"}>
              {row.name}
            </T>
            {row.state === "done" ? (
              <>
                <T x={376} y={y} tone="soft" size={10} anchor="end">
                  Imported
                </T>
                <Icon name="check" x={380} y={y - 10.5} tone="ink" />
              </>
            ) : row.state === "going" ? (
              <>
                <rect className="wf-skel" x={290} y={y - 5} width={104} height={4} rx={2} />
                <rect className="wf-dot-ink" x={290} y={y - 5} width={64} height={4} rx={2} />
              </>
            ) : (
              <T x={394} y={y} tone="soft" size={10} anchor="end">
                Next
              </T>
            )}
          </g>
        );
      })}
    </Frame>
  );
};

/* ── Day to day ──────────────────────────────────────────────────────────────────────────────────── */

const BestHours: Scene = ({ label }) => {
  const win = { x: 32, y: 32, w: 416, h: 300 };
  const hour = (h: number) => 64 + (h - 8) * 35.2;
  const curve: [number, number][] = [
    [hour(8), 160],
    [hour(9), 146],
    [hour(10), 126],
    [hour(11), 112],
    [hour(12), 114],
    [hour(13), 134],
    [hour(14), 150],
    [hour(15), 144],
    [hour(16), 150],
    [hour(17), 158],
    [hour(18), 164],
  ];
  return (
    <Frame label={label} wins={[win]}>
      <Win {...win} />
      <T x={54} y={60} tone="ink" size={12} bold>
        Today
      </T>
      <T x={426} y={60} tone="soft" size={10} anchor="end">
        How sharp you are, hour by hour
      </T>
      <Rule x1={32} x2={448} y={74} />
      <rect className="wf-fill" x={hour(10.5)} y={84} width={hour(12.5) - hour(10.5)} height={86} />
      <T x={(hour(10.5) + hour(12.5)) / 2} y={98} tone="ink" size={9.5} bold anchor="middle">
        10:30–12:30
      </T>
      <Rule x1={64} x2={416} y={170} />
      <path className="wf-stroke-ink" d={smooth(curve)} />
      {[
        [8, "8am"],
        [10, "10"],
        [12, "12"],
        [14, "2pm"],
        [16, "4"],
        [18, "6pm"],
      ].map(([h, text]) => (
        <T key={text} x={hour(h as number)} y={186} tone="soft" size={9.5} anchor="middle">
          {text}
        </T>
      ))}
      <line className="wf-dash" x1={hour(11)} x2={hour(11)} y1={116} y2={208} />
      <circle className="wf-dot-ink" cx={hour(11)} cy={112.5} r={3.5} />
      <Box x={64} y={208} w={352} h={110} r={14} />
      <Icon name="calendar" x={80} y={222} />
      <T x={101} y={233} tone="ink" bold>
        Design review
      </T>
      <T x={400} y={233} tone="soft" size={10} anchor="end">
        Invite · 11:00
      </T>
      <T x={80} y={254} size={10.5}>
        This lands in your sharpest window.
      </T>
      <Pill x={80} y={266} w={98} label="Suggest 3pm" kind="ink" />
      <Pill x={184} y={266} w={84} label="Keep 11:00" />
    </Frame>
  );
};

const RightTask: Scene = ({ label }) => {
  const win = { x: 56, y: 28, w: 368, h: 300 };
  return (
    <Frame label={label} wins={[win]}>
      <Win {...win} />
      <T x={78} y={56} tone="ink" size={12} bold>
        Today
      </T>
      <T x={402} y={56} tone="soft" size={10} anchor="end">
        Ordered for how you are
      </T>
      <Rule x1={56} x2={424} y={70} />
      <Box x={66} y={80} w={348} h={44} r={11} kind="fill" />
      <circle className="wf-avatar" cx={88} cy={102} r={6} />
      <T x={102} y={98} tone="ink" bold>
        Investor memo
      </T>
      <T x={102} y={113} size={10}>
        Moved to 10:30, your sharpest hour
      </T>
      <Icon name="arrowUp" x={386} y={95} tone="ink" />
      <circle className="wf-avatar" cx={88} cy={150} r={6} />
      <T x={102} y={146} tone="ink">
        Board deck
      </T>
      <T x={102} y={161} size={10}>
        Due today, so it stays put
      </T>
      <Icon name="lock" x={386} y={143} />
      <Rule x1={78} x2={402} y={176} />
      <circle className="wf-avatar" cx={88} cy={196} r={6} />
      <T x={102} y={192} tone="ink">
        Quarterly plan
      </T>
      <T x={102} y={207} size={10}>
        Low day, so it’s in small chunks
      </T>
      <path className="wf-rule" d="M88 204 V266" />
      {["Start with the part you know", "First pass", "Numbers"].map((chunk, index) => {
        const y = 228 + index * 22;
        return (
          <g key={chunk}>
            <path className="wf-rule" d={`M88 ${y} H100`} />
            <circle className="wf-avatar" cx={108} cy={y} r={4.5} />
            <T x={120} y={y + 3.5} size={10.5} tone={index === 0 ? "ink" : "mid"}>
              {chunk}
            </T>
          </g>
        );
      })}
    </Frame>
  );
};

// Where messages arrive across the day (x positions), for Fewer pings
const PINGS = [146, 158, 171, 180, 197, 205, 219, 236, 244, 252, 268, 279, 291, 300, 318, 327, 341, 352, 369, 377, 392, 406];

const FewerPings: Scene = ({ label }) => {
  const win = { x: 40, y: 32, w: 400, h: 300 };
  const hour = (h: number) => 140 + (h - 9) * 30.9;
  return (
    <Frame label={label} wins={[win]}>
      <Win {...win} />
      <T x={62} y={60} tone="ink" size={12} bold>
        Messages
      </T>
      <Pill x={358} y={47} w={60} h={20} label="Example" kind="ghost" size={9.5} />
      <Rule x1={40} x2={440} y={74} />
      <T x={62} y={106} tone="soft" size={10}>
        Arriving
      </T>
      {PINGS.map((x) => (
        <line key={x} className="wf-stroke-soft" x1={x} x2={x} y1={96} y2={109} />
      ))}
      <T x={62} y={151} tone="soft" size={10}>
        You read
      </T>
      <Rule x1={140} x2={418} y={147} />
      {[11, 16].map((h) => (
        <g key={h}>
          <line className="wf-dash" x1={hour(h)} x2={hour(h)} y1={114} y2={136} />
          <Pill x={hour(h) - 26} y={136} w={52} h={22} label="Email" kind="ink" size={9.5} />
        </g>
      ))}
      {[
        [9, "9am"],
        [11, "11"],
        [13, "1pm"],
        [16, "4"],
        [18, "6pm"],
      ].map(([h, text]) => (
        <T key={text} x={hour(h as number)} y={178} tone="soft" size={9.5} anchor="middle">
          {text}
        </T>
      ))}
      <Rule x1={40} x2={440} y={194} />
      <Box x={62} y={208} w={356} h={56} r={13} kind="fill" />
      <Icon name="moon" x={78} y={220} tone="ink" />
      <T x={100} y={231} tone="ink" bold>
        Slack set to Focus
      </T>
      <T x={100} y={247} size={10}>
        Until 12:30, while you work
      </T>
      <Toggle x={378} y={228} on />
    </Frame>
  );
};

const FixedFirst: Scene = ({ label }) => {
  const win = { x: 48, y: 24, w: 384, h: 300 };
  return (
    <Frame label={label} wins={[win]}>
      <Win {...win} />
      <Icon name="moon" x={70} y={41} />
      <T x={90} y={52} tone="ink" size={12} bold>
        The Patrol
      </T>
      <T x={410} y={52} tone="soft" size={10} anchor="end">
        Last night
      </T>
      <Rule x1={48} x2={432} y={66} />
      <path className="wf-rule" d="M80 88 V300" />
      <circle className="wf-dot-ink" cx={80} cy={94} r={4} />
      <T x={96} y={98} tone="soft" size={9.5}>
        2:14am
      </T>
      <T x={96} y={114} tone="ink">
        Two meetings overlapped at 3pm.
      </T>
      <T x={96} y={129} size={10.5}>
        Moved the internal one to 3:30.
      </T>
      <Pill x={350} y={86} w={60} h={20} label="Fixed" kind="ink" size={9.5} />
      <circle className="wf-dot-open" cx={80} cy={156} r={4} />
      <T x={96} y={160} tone="soft" size={9.5}>
        3:40am
      </T>
      <T x={96} y={176} tone="ink">
        Your flight moved to 7am.
      </T>
      <T x={96} y={191} size={10.5}>
        It clashes with board prep. Asked you.
      </T>
      <Pill x={96} y={200} w={124} h={22} label="Move prep to tonight" size={9.5} />
      <Pill x={226} y={200} w={96} h={22} label="Push to Friday" size={9.5} />
      <Pill x={350} y={148} w={60} h={20} label="Asked" size={9.5} />
      <circle className="wf-dot-soft" cx={80} cy={246} r={4} />
      <T x={96} y={250} tone="soft" size={9.5}>
        5:05am
      </T>
      <T x={96} y={266} tone="ink">
        Three late nights in a row.
      </T>
      <T x={96} y={281} size={10.5}>
        Watching, not acting yet.
      </T>
      <Pill x={350} y={238} w={60} h={20} label="Watching" kind="ghost" size={9.5} />
    </Frame>
  );
};

// Faint Spots that haven't joined anything (yet)
const LOOSE_SPOTS: [number, number, number][] = [
  [64, 92, 3],
  [88, 196, 2.5],
  [150, 222, 3.5],
  [176, 160, 2.5],
  [248, 62, 3],
  [236, 224, 2.5],
  [380, 70, 3.5],
  [420, 128, 2.5],
  [452, 92, 3],
  [404, 172, 2.5],
  [110, 72, 2.5],
  [70, 150, 3],
];

const Patterns: Scene = ({ label }) => {
  const win = { x: 24, y: 28, w: 480, h: 248 };
  const nodes = {
    email: [118, 122],
    monday: [194, 96],
    sleep: [262, 150],
    form: [342, 116],
    crash: [304, 206],
  } as const;
  const links: [keyof typeof nodes, keyof typeof nodes][] = [
    ["email", "monday"],
    ["email", "sleep"],
    ["monday", "sleep"],
    ["sleep", "form"],
    ["sleep", "crash"],
    ["form", "crash"],
  ];
  return (
    <Frame label={label} wins={[win]}>
      <Win {...win} />
      <T x={46} y={56} tone="ink" size={12} bold>
        Patterns
      </T>
      {LOOSE_SPOTS.map(([x, y, r]) => (
        <circle key={`${x}-${y}`} className="wf-skel" cx={x} cy={y + 8} r={r} />
      ))}
      {links.map(([a, b]) => (
        <line key={`${a}-${b}`} className="wf-stroke-ink" x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} style={{ strokeWidth: 1 }} />
      ))}
      {(["email", "monday", "sleep", "form"] as const).map((name) => (
        <circle key={name} className="wf-dot-ink" cx={nodes[name][0]} cy={nodes[name][1]} r={4.5} />
      ))}
      <circle className="wf-dot-open wf-pulse" cx={nodes.crash[0]} cy={nodes.crash[1]} r={7} />
      <circle className="wf-dot-ink" cx={nodes.crash[0]} cy={nodes.crash[1]} r={7} />
      <T x={118} y={143} tone="soft" size={9.5} anchor="middle">
        Emails after 10pm
      </T>
      <T x={194} y={85} tone="soft" size={9.5} anchor="middle">
        Heavy Monday
      </T>
      <T x={250} y={168} tone="soft" size={9.5} anchor="end">
        Short night
      </T>
      <T x={342} y={104} tone="soft" size={9.5} anchor="middle">
        Low Form Tuesday
      </T>
      <Box x={322} y={186} w={150} h={44} r={13} />
      <T x={336} y={205} tone="ink" bold>
        The Tuesday Crash
      </T>
      <T x={336} y={220} size={10}>
        Six weeks running
      </T>
      <Rule x1={24} x2={504} y={244} />
      <T x={46} y={264} tone="soft" size={10}>
        Spot: emails after 10pm, and your sleep is 8% worse.
      </T>
    </Frame>
  );
};

const Slope: Scene = ({ label }) => {
  const win = { x: 40, y: 32, w: 400, h: 300 };
  const at = (value: number) => 196 + value * 2.16;
  const rows = [
    { name: "Recovery", then: 52, now: 63, better: true },
    { name: "Form", then: 60, now: 76, better: true },
    { name: "Weight", then: 90, now: 79, better: true },
    { name: "The Stack", then: 70, now: 78, better: false },
    { name: "Signal Pressure", then: 66, now: 55, better: true },
    { name: "Task Pileup", then: 50, now: 62, better: false },
  ];
  return (
    <Frame label={label} wins={[win]}>
      <Win {...win} />
      <T x={62} y={60} tone="ink" size={12} bold>
        Today against four weeks ago
      </T>
      <circle className="wf-dot-open" cx={330} cy={56.5} r={3.5} />
      <T x={338} y={60} tone="soft" size={9.5}>
        Then
      </T>
      <circle className="wf-dot-ink" cx={378} cy={56.5} r={3.5} />
      <T x={386} y={60} tone="soft" size={9.5}>
        Today
      </T>
      <Rule x1={40} x2={440} y={74} />
      {rows.map((row, index) => {
        const y = 98 + index * 27;
        return (
          <g key={row.name}>
            <T x={62} y={y + 4} tone={row.better ? "ink" : "mid"}>
              {row.name}
            </T>
            <Rule x1={196} x2={412} y={y} />
            <line className={row.better ? "wf-stroke-ink" : "wf-dash"} x1={at(row.then)} x2={at(row.now)} y1={y} y2={y} />
            <circle className="wf-dot-open" cx={at(row.then)} cy={y} r={4} />
            <circle className="wf-dot-ink" cx={at(row.now)} cy={y} r={4} />
          </g>
        );
      })}
      <Box x={80} y={256} w={246} h={28} r={13} kind="fill" />
      <Paw cx={61} cy={273} r={10} />
      <T x={92} y={274} tone="ink">
        Four of six are better than a month ago.
      </T>
    </Frame>
  );
};

/* ── Talk to Waldo ───────────────────────────────────────────────────────────────────────────────── */

const Threads: Scene = ({ label }) => {
  const win = { x: 40, y: 28, w: 400, h: 300 };
  return (
    <Frame label={label} wins={[win]}>
      <Win {...win} />
      <Pill x={58} y={44} w={82} label="This week" kind="ink" />
      <Pill x={146} y={44} w={72} label="Training" />
      <circle className="wf-dot-ink" cx={209} cy={56} r={2.5} />
      <Pill x={224} y={44} w={80} label="Lisbon trip" />
      <Box x={310} y={44} w={24} h={24} r={12} />
      <Icon name="plus" x={315} y={49} />
      <Rule x1={40} x2={440} y={82} />
      <Bubble x={84} y={98} w={284} lines={["22 hours of meetings next week. Want", "Friday afternoon kept clear?"]} />
      <Bubble x={318} y={152} w={100} lines={["Yes, do that."]} from="you" />
      <Bubble x={84} y={192} w={196} lines={["Done. Retro moved to Monday."]} />
      <Box x={58} y={242} w={364} h={36} r={18} />
      <Caret x={76} y={253.5} />
      <T x={82} y={264} tone="soft" size={10.5}>
        Message this thread
      </T>
      <Icon name="send" x={396} y={253} />
    </Frame>
  );
};

const FollowUp: Scene = ({ label }) => {
  const brief = { x: 28, y: 28, w: 272, h: 136 };
  const thread = { x: 196, y: 120, w: 310, h: 210 };
  return (
    <Frame label={label} wins={[brief, thread]}>
      <Win {...brief} />
      <Paw cx={52} cy={53} r={10} />
      <T x={70} y={57} tone="ink" bold>
        The Brief
      </T>
      <T x={280} y={57} tone="soft" size={9.5} anchor="end">
        7:02
      </T>
      <T x={46} y={84} tone="ink">
        Rough night, about 5h 40m. Nudged
      </T>
      <T x={46} y={99} tone="ink">
        your 9am to 10:30.
      </T>
      <Pill x={46} y={114} w={96} label="Tell me more" kind="focus" />
      <Cursor x={128} y={128} />
      <Win {...thread} />
      <T x={214} y={144} tone="soft" size={10}>
        Thread: The Brief, 7:02
      </T>
      <Rule x1={196} x2={480} y={158} />
      <path className="wf-rule" d="M216 170 V200" />
      <T x={226} y={182} tone="soft" size={10}>
        Rough night, about 5h 40m.
      </T>
      <T x={226} y={196} tone="soft" size={10}>
        Nudged your 9am to 10:30.
      </T>
      <Bubble x={348} y={210} w={120} lines={["Why move the 9am?"]} from="you" />
      <Bubble x={236} y={250} w={232} lines={["HRV is 12% below your usual.", "The 9am needs you sharp."]} />
    </Frame>
  );
};

const QuickReplies: Scene = ({ label }) => {
  const win = { x: 56, y: 28, w: 368, h: 300 };
  return (
    <Frame label={label} wins={[win]}>
      <Win {...win} />
      <Paw cx={80} cy={50} r={10} />
      <T x={98} y={54} tone="ink" bold>
        Waldo
      </T>
      <T x={402} y={54} tone="soft" size={9.5} anchor="end">
        1:42pm
      </T>
      <Rule x1={56} x2={424} y={72} />
      <Bubble x={98} y={100} w={292} lines={["Stress climbing since 1pm. Investor call at 3", "stays. Pull the 4:30?"]} />
      <T x={98} y={168} tone="soft" size={9.5}>
        Suggested replies
      </T>
      <Pill x={98} y={176} w={92} h={26} label="Tell me more" kind="focus" />
      <Pill x={196} y={176} w={114} h={26} label="What should I do?" />
      <Pill x={316} y={176} w={74} h={26} label="Not today" />
      <Cursor x={176} y={192} />
      <Box x={78} y={242} w={324} h={36} r={18} />
      <Caret x={96} y={253.5} />
      <T x={102} y={264} tone="soft" size={10.5}>
        Or type your own
      </T>
      <Icon name="send" x={376} y={253} />
    </Frame>
  );
};

const ChartsInReplies: Scene = ({ label }) => {
  const win = { x: 56, y: 24, w: 368, h: 300 };
  const levels = { Awake: 140, REM: 158, Light: 176, Deep: 194 };
  return (
    <Frame label={label} wins={[win]}>
      <Win {...win} />
      <Bubble x={290} y={40} w={114} lines={["How did I sleep?"]} from="you" />
      <Box x={98} y={82} w={306} h={180} r={14} kind="fill" />
      <Paw cx={81} cy={251} r={10} />
      <T x={112} y={102} tone="ink">
        5h 42m. Short on deep sleep.
      </T>
      <Box x={110} y={114} w={282} h={106} r={10} />
      {Object.entries(levels).map(([name, y]) => (
        <g key={name}>
          <T x={122} y={y + 3} tone="soft" size={9}>
            {name}
          </T>
          <line className="wf-rule" x1={160} x2={380} y1={y} y2={y} style={{ strokeDasharray: "2 3" }} />
        </g>
      ))}
      <path
        className="wf-stroke-ink"
        d="M160 176 H172 V194 H198 V176 H214 V158 H226 V176 H240 V194 H254 V176 H276 V158 H296 V176 H312 V158 H330 V176 H344 V140 H350 V176 H366 V158 H380 V140"
      />
      <T x={160} y={212} tone="soft" size={9}>
        Bed
      </T>
      <T x={380} y={212} tone="soft" size={9} anchor="end">
        Woke
      </T>
      <T x={112} y={242} size={10.5}>
        An earlier night tonight would help.
      </T>
    </Frame>
  );
};

const FullHistory: Scene = ({ label }) => {
  const win = { x: 56, y: 24, w: 368, h: 300 };
  return (
    <Frame label={label} wins={[win]}>
      <Win {...win} />
      <Box x={76} y={40} w={310} h={28} r={14} kind="fill" />
      <Icon name="search" x={88} y={47} />
      <T x={108} y={58} tone="soft" size={10.5}>
        Search everything Waldo said
      </T>
      <line className="wf-rule" x1={409} x2={409} y1={84} y2={300} />
      <rect className="wf-dot-soft" x={406.5} y={196} width={5} height={50} rx={2.5} />
      <Box x={98} y={82} w={212} h={34} r={13} kind="fill" />
      <Paw cx={81} cy={105} r={10} />
      <Skel x={110} y={92} w={168} />
      <Skel x={110} y={103} w={112} />
      <Box x={316} y={124} w={80} h={26} r={13} />
      <Skel x={328} y={134} w={56} />
      <Rule x1={76} x2={190} y={170} />
      <Rule x1={290} x2={396} y={170} />
      <Pill x={196} y={160} w={88} h={20} label="Last Tuesday" size={9.5} />
      <Box x={98} y={190} w={296} h={62} r={13} kind="focus" />
      <Paw cx={81} cy={241} r={10} />
      <T x={112} y={208} tone="soft" size={9.5}>
        The Heads-Up · 2:40pm
      </T>
      <T x={112} y={225} tone="ink">
        Moved your 4pm before it lands.
      </T>
      <T x={112} y={241} size={10}>
        This Tuesday looked like the last three.
      </T>
      <Box x={98} y={264} w={180} h={34} r={13} kind="fill" />
      <Skel x={110} y={275} w={140} />
    </Frame>
  );
};

const Thumbs: Scene = ({ label }) => {
  const win = { x: 56, y: 28, w: 368, h: 300 };
  return (
    <Frame label={label} wins={[win]}>
      <Win {...win} />
      <Bubble x={98} y={46} w={240} lines={["10:30–12:30 is your sharpest stretch.", "Blocked it."]} />
      <circle className="wf-dot-ink" cx={110} cy={106} r={11} />
      <Icon name="up" x={104} y={100} size={12} tone="on" />
      <Icon name="down" x={130} y={100} size={12} />
      <Bubble x={98} y={138} w={240} lines={["Three meetings back to back at 2.", "Want a reminder before each?"]} />
      <Icon name="up" x={104} y={192} size={12} />
      <circle className="wf-dot-ink" cx={142} cy={198} r={11} />
      <Icon name="down" x={136} y={192} size={12} tone="on" />
      <Box x={98} y={226} w={232} h={32} r={16} />
      <Icon name="check" x={110} y={235} tone="ink" />
      <T x={130} y={246} size={10.5}>
        Noted. Fewer of those from now on.
      </T>
    </Frame>
  );
};

/* ── Your rules ──────────────────────────────────────────────────────────────────────────────────── */

const Levels: Scene = ({ label }) => {
  const win = { x: 32, y: 32, w: 416, h: 300 };
  const rows = [
    { name: "Calendar", level: 2 },
    { name: "Tasks", level: 1 },
    { name: "Messages to others", level: 1 },
    { name: "Focus time", level: 2 },
  ];
  const levels = ["Tell me", "Ask me", "Just do it"];
  return (
    <Frame label={label} wins={[win]}>
      <Win {...win} />
      <T x={54} y={60} tone="ink" size={12} bold>
        How far Waldo goes
      </T>
      <Rule x1={32} x2={448} y={74} />
      {rows.map((row, index) => {
        const y = 104 + index * 44;
        return (
          <g key={row.name}>
            {index > 0 ? <Rule x1={54} x2={426} y={y - 22} /> : null}
            <T x={54} y={y + 4} tone="ink">
              {row.name}
            </T>
            <rect className="wf-fill" x={218} y={y - 13} width={210} height={26} rx={13} />
            <rect className="wf-box" x={220 + row.level * 70} y={y - 11} width={66} height={22} rx={11} />
            {levels.map((level, l) => (
              <T key={level} x={253 + l * 70} y={y + 3.5} size={10} tone={l === row.level ? "ink" : "soft"} bold={l === row.level} anchor="middle">
                {level}
              </T>
            ))}
          </g>
        );
      })}
      <T x={54} y={282} tone="soft" size={10}>
        Change any of them whenever you like.
      </T>
    </Frame>
  );
};

const AlwaysAsks: Scene = ({ label }) => {
  const win = { x: 40, y: 36, w: 400, h: 300 };
  return (
    <Frame label={label} wins={[win]}>
      <Win {...win} />
      <Icon name="lock" x={62} y={47} tone="ink" />
      <T x={82} y={58} tone="ink" size={12} bold>
        Always comes to you
      </T>
      <T x={418} y={58} tone="soft" size={10} anchor="end">
        At every level
      </T>
      <Rule x1={40} x2={440} y={72} />
      {[170, 128, 150].map((w, index) => {
        const y = 98 + index * 30;
        return (
          <g key={w}>
            {index > 0 ? <Rule x1={62} x2={418} y={y - 15} /> : null}
            <Icon name="lock" x={62} y={y - 10} />
            <Skel x={86} y={y - 6} w={w} />
            <T x={418} y={y} tone="soft" size={10} anchor="end">
              Asks first
            </T>
          </g>
        );
      })}
      <Box x={150} y={176} w={312} h={106} r={14} />
      <Paw cx={174} cy={202} r={10} />
      <T x={192} y={206} tone="ink">
        Before I do this, can I check with you?
      </T>
      <Skel x={192} y={218} w={196} />
      <Skel x={192} y={230} w={132} />
      <Pill x={192} y={248} w={80} label="Go ahead" kind="ink" />
      <Pill x={278} y={248} w={70} label="Not now" />
    </Frame>
  );
};

const ActivityLog: Scene = ({ label }) => {
  const win = { x: 36, y: 28, w: 408, h: 300 };
  const rows = [
    { time: "7:02am", what: "Moved 9am to 10:30", why: "Short night" },
    { time: "1:20pm", what: "Blocked 2–4pm", why: "Stress climbing" },
    { time: "9:45pm", what: "Three late nights", why: "Only worth watching", left: true },
  ];
  return (
    <Frame label={label} wins={[win]}>
      <Win {...win} />
      <T x={58} y={56} tone="ink" size={12} bold>
        Activity
      </T>
      <Pill x={262} y={41} w={36} h={22} label="All" kind="focus" size={9.5} />
      <Pill x={302} y={41} w={60} h={22} label="Changed" size={9.5} />
      <Pill x={366} y={41} w={64} h={22} label="Left alone" size={9.5} />
      <Rule x1={36} x2={444} y={74} />
      <T x={58} y={94} tone="soft" size={9.5}>
        When
      </T>
      <T x={122} y={94} tone="soft" size={9.5}>
        What happened
      </T>
      <T x={290} y={94} tone="soft" size={9.5}>
        Why
      </T>
      <Rule x1={58} x2={422} y={104} />
      {rows.map((row, index) => {
        const y = 128 + index * 44;
        return (
          <g key={row.time}>
            <T x={58} y={y} size={10}>
              {row.time}
            </T>
            <T x={122} y={y} tone="ink">
              {row.what}
            </T>
            {row.left ? (
              <T x={122} y={y + 15} tone="soft" size={10}>
                Noticed, left alone
              </T>
            ) : (
              <T x={122} y={y + 15} tone="soft" size={10}>
                Done
              </T>
            )}
            <T x={290} y={y} size={10.5}>
              {row.why}
            </T>
            {row.left ? <Icon name="eye" x={402} y={y - 10.5} /> : <Icon name="check" x={402} y={y - 10.5} tone="ink" />}
            <Rule x1={58} x2={422} y={y + 26} />
          </g>
        );
      })}
      <Skel x={58} y={256} w={34} />
      <Skel x={122} y={256} w={120} />
      <Skel x={290} y={256} w={80} />
    </Frame>
  );
};

const SayItOnce: Scene = ({ label }) => {
  const win = { x: 48, y: 28, w: 384, h: 300 };
  const rows = [
    { icon: "person", name: "Priya", note: "Lead investor. Keep it short, numbers first." },
    { icon: "clock", name: "No meetings before 10", note: "Preference" },
    { icon: "pulse", name: "A racing heart on a run", note: "Correction: a workout, not stress" },
  ] as const;
  return (
    <Frame label={label} wins={[win]}>
      <Win {...win} />
      <T x={70} y={56} tone="ink" size={12} bold>
        What Waldo knows
      </T>
      <T x={410} y={56} tone="soft" size={10} anchor="end">
        Change or remove any of it
      </T>
      <Rule x1={48} x2={432} y={70} />
      {rows.map((row, index) => {
        const y = 100 + index * 54;
        return (
          <g key={row.name}>
            {index > 0 ? <Rule x1={70} x2={410} y={y - 26} /> : null}
            <Icon name={row.icon} x={70} y={y - 9} tone={index === 0 ? "ink" : "soft"} />
            <T x={94} y={y} tone="ink" bold>
              {row.name}
            </T>
            <T x={94} y={y + 16} size={10}>
              {row.note}
            </T>
            <Icon name="pencil" x={372} y={y - 4} tone={index === 0 ? "ink" : "soft"} size={13} />
            <Icon name="close" x={394} y={y - 4} size={13} />
          </g>
        );
      })}
      <Rule x1={70} x2={410} y={236} />
      <circle className="wf-skel" cx={77} cy={258} r={7} />
      <Skel x={94} y={252} w={140} />
      <Skel x={94} y={266} w={96} />
    </Frame>
  );
};

const Schedule: Scene = ({ label }) => {
  const win = { x: 56, y: 28, w: 368, h: 300 };
  const rows: { name: string; time?: string; on?: boolean; soon?: boolean }[] = [
    { name: "Wake time", time: "7:00" },
    { name: "Evening check-in", time: "6:45" },
    { name: "The Brief", on: true },
    { name: "The Fetch", on: false },
    { name: "The Close", on: true },
    { name: "Quiet hours", soon: true },
  ];
  return (
    <Frame label={label} wins={[win]}>
      <Win {...win} />
      <T x={78} y={56} tone="ink" size={12} bold>
        Your schedule
      </T>
      <Rule x1={56} x2={424} y={70} />
      {rows.map((row, index) => {
        const y = 96 + index * 36;
        return (
          <g key={row.name}>
            {index > 0 ? <Rule x1={78} x2={402} y={y - 18} /> : null}
            <T x={78} y={y + 4} tone={row.soon ? "soft" : "ink"}>
              {row.name}
            </T>
            {row.time ? (
              <>
                <Box x={346} y={y - 11} w={56} h={22} r={8} kind="fill" />
                <T x={374} y={y + 3.5} tone="ink" size={10.5} anchor="middle">
                  {row.time}
                </T>
              </>
            ) : row.soon ? (
              <Pill x={324} y={y - 10} w={78} h={20} label="Coming next" kind="ghost" size={9.5} />
            ) : (
              <Toggle x={376} y={y - 8} on={row.on} />
            )}
          </g>
        );
      })}
    </Frame>
  );
};

const YoursAlways: Scene = ({ label }) => {
  const win = { x: 56, y: 36, w: 368, h: 300 };
  const rows = [
    { icon: "download", name: "Export everything", note: "Under review", action: "Export" },
    { icon: "trash", name: "Delete your account", note: "Under review", action: "Delete" },
    { icon: "lock", name: "Security and retention", note: "Details not published yet" },
  ] as const;
  return (
    <Frame label={label} wins={[win]}>
      <Win {...win} />
      <T x={78} y={64} tone="ink" size={12} bold>
        Your data
      </T>
      <Pill x={342} y={51} w={60} h={20} label="Example" kind="ghost" size={9.5} />
      <Rule x1={56} x2={424} y={78} />
      {rows.map((row, index) => {
        const y = 108 + index * 56;
        return (
          <g key={row.name}>
            {index > 0 ? <Rule x1={78} x2={402} y={y - 28} /> : null}
            <Icon name={row.icon} x={78} y={y - 9} tone="ink" />
            <T x={102} y={y} tone="ink">
              {row.name}
            </T>
            <T x={102} y={y + 15} tone="soft" size={10}>
              {row.note}
            </T>
            {"action" in row ? <Pill x={336} y={y - 10} w={66} h={24} label={row.action} kind="ghost" /> : null}
          </g>
        );
      })}
    </Frame>
  );
};

/* ── What's coming ───────────────────────────────────────────────────────────────────────────────── */

const WAVE = [6, 12, 9, 18, 14, 22, 16, 10, 20, 13, 17, 8, 12, 6];

const Voice: Scene = ({ label }) => {
  const win = { x: 112, y: 24, w: 256, h: 300 };
  return (
    <Frame label={label} wins={[win]}>
      <Win {...win} />
      <Box x={204} y={44} w={146} h={28} r={13} />
      <T x={216} y={62} size={11}>
        How did I sleep
      </T>
      <Caret x={300} y={51.5} />
      <Box x={130} y={86} w={220} h={56} r={13} kind="fill" />
      <Icon name="speaker" x={144} y={98} tone="ink" />
      <T x={166} y={109} tone="ink" size={10.5}>
        Reading your Brief out loud
      </T>
      <rect className="wf-skel" x={144} y={124} width={192} height={3} rx={1.5} />
      <rect className="wf-dot-ink" x={144} y={124} width={74} height={3} rx={1.5} />
      <g className="wf-wave">
        {WAVE.map((h, index) => (
          <rect key={index} className="wf-dot-ink" x={178 + index * 9} y={174 - h / 2} width={4} height={h} rx={2} opacity={0.35} />
        ))}
      </g>
      <circle className="wf-dot-open wf-pulse" cx={240} cy={230} r={26} style={{ "--wf-pulse-to": 1.45 } as CSSProperties} />
      <circle className="wf-dot-ink" cx={240} cy={230} r={26} />
      <Icon name="mic" x={229} y={219} size={22} tone="on" />
      <T x={240} y={286} tone="soft" size={10} anchor="middle">
        Hold to ask
      </T>
    </Frame>
  );
};

const Routines: Scene = ({ label }) => {
  const win = { x: 40, y: 36, w: 400, h: 300 };
  return (
    <Frame label={label} wins={[win]}>
      <Win {...win} />
      <Icon name="repeat" x={62} y={53} />
      <T x={82} y={64} tone="ink" size={12} bold>
        New routine
      </T>
      <Toggle x={392} y={53} on />
      <Rule x1={40} x2={440} y={80} />
      <T x={62} y={104} tone="soft" size={9.5}>
        When
      </T>
      <Pill x={62} y={112} w={98} h={26} label="Every Sunday" kind="focus" />
      <Pill x={166} y={112} w={72} h={26} label="Evening" />
      <T x={62} y={168} tone="soft" size={9.5}>
        Ask Waldo
      </T>
      <Box x={62} y={176} w={356} h={54} r={12} kind="focus" />
      <T x={76} y={197} tone="ink">
        Tell me how next week looks.
      </T>
      <Caret x={215} y={187} />
      <Skel x={76} y={210} w={120} />
      <T x={62} y={268} tone="soft" size={10}>
        Runs again Sunday evening
      </T>
      <Pill x={346} y={252} w={72} h={26} label="Save" kind="ink" />
    </Frame>
  );
};

const TomorrowToday: Scene = ({ label }) => {
  const win = { x: 40, y: 32, w: 400, h: 300 };
  const load = [14, 21, 24, 18, 27, 46, 59, 64, 51, 32, 19];
  return (
    <Frame label={label} wins={[win]}>
      <Win {...win} />
      <Icon name="moon" x={62} y={49} />
      <T x={82} y={60} tone="ink" size={12} bold>
        Tomorrow
      </T>
      <T x={418} y={60} tone="soft" size={10} anchor="end">
        Sent tonight
      </T>
      <Rule x1={40} x2={440} y={76} />
      {load.map((h, index) => {
        const x = 72 + index * 32;
        const heavy = h > 40;
        return heavy ? (
          <rect key={index} className="wf-dot-ink" x={x} y={170 - h} width={18} height={h} rx={4} opacity={0.75} />
        ) : (
          <rect key={index} className="wf-skel" x={x} y={170 - h} width={18} height={h} rx={4} />
        );
      })}
      <path className="wf-rule" d="M232 100 V96 H346 V100" />
      <T x={289} y={90} tone="ink" size={9.5} bold anchor="middle">
        Heavy afternoon
      </T>
      <Rule x1={62} x2={418} y={170} />
      <T x={81} y={186} tone="soft" size={9.5} anchor="middle">
        8am
      </T>
      <T x={241} y={186} tone="soft" size={9.5} anchor="middle">
        1pm
      </T>
      <T x={401} y={186} tone="soft" size={9.5} anchor="middle">
        6pm
      </T>
      <Bubble x={80} y={204} w={262} lines={["Heavy afternoon tomorrow. Move the", "3:30 tonight, while there’s time?"]} />
      <Pill x={80} y={256} w={70} label="Move it" kind="ink" />
      <Pill x={156} y={256} w={70} label="Leave it" />
    </Frame>
  );
};

const OtherAgents: Scene = ({ label }) => {
  const agent = { x: -12, y: 24, w: 220, h: 136 };
  const waldo = { x: 236, y: 150, w: 268, h: 180 };
  return (
    <Frame label={label} wins={[agent, waldo]}>
      <Win {...agent} />
      <Icon name="grid" x={12} y={39} />
      <T x={32} y={50} tone="ink" bold>
        Scheduling agent
      </T>
      <Rule x1={-12} x2={208} y={64} />
      <T x={12} y={86} size={10.5}>
        Booking an intro call
      </T>
      <Skel x={12} y={98} w={140} />
      <Pill x={12} y={112} w={104} h={24} label="Tomorrow, 8am?" kind="ghost" />
      <Win {...waldo} />
      <Paw cx={260} cy={174} r={10} />
      <T x={278} y={178} tone="ink" bold>
        Waldo
      </T>
      <Rule x1={236} x2={480} y={194} />
      <T x={256} y={218} tone="ink">
        Short night likely.
      </T>
      <T x={256} y={234} tone="ink">
        After 10:30 works better.
      </T>
      <T x={256} y={258} tone="soft" size={10}>
        Answered before anything was booked
      </T>
      <path className="wf-dash wf-flow" d="M118 124 C 182 124, 176 214, 236 214" />
      <circle className="wf-dot-ink" cx={236} cy={214} r={2.5} />
      <Pill x={112} y={156} w={132} h={24} label="Is 8am a good time?" kind="focus" />
    </Frame>
  );
};

const WIRES = {
  "sleep-debt": SleepDebt,
  "quiet-flags": QuietFlags,
  training: Training,
  weather: Weather,
  history: History,
  "bring-past": BringPast,
  "best-hours": BestHours,
  "right-task": RightTask,
  "fewer-pings": FewerPings,
  "fixed-first": FixedFirst,
  patterns: Patterns,
  slope: Slope,
  threads: Threads,
  "follow-up": FollowUp,
  "quick-replies": QuickReplies,
  "charts-in-replies": ChartsInReplies,
  "full-history": FullHistory,
  thumbs: Thumbs,
  levels: Levels,
  "always-asks": AlwaysAsks,
  "activity-log": ActivityLog,
  "say-it-once": SayItOnce,
  schedule: Schedule,
  "yours-always": YoursAlways,
  voice: Voice,
  routines: Routines,
  "tomorrow-today": TomorrowToday,
  "other-agents": OtherAgents,
} satisfies Record<string, Scene>;

export type WireName = keyof typeof WIRES;

/** The wireframe for one feature, in its box. `label` describes it for screen readers. */
export function Wire({ name, label }: { name: WireName; label: string }) {
  const Scene = WIRES[name];
  return (
    <div className="wf">
      <Scene label={label} />
    </div>
  );
}
