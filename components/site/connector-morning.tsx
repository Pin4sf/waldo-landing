"use client";

import { type CSSProperties, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { ToolMark, WaldoFace, useSeen } from "./connector-mark";
import { useLive } from "./use-live";

// The picture under the Connectors opening: one morning, as a map. On the left, what Waldo read from three
// connected tools; on the right, what he did; between them, a line from each thing he read to each thing it led
// to. That is a connector's whole point, in one look: no tool on its own would have moved the design review, but
// the watch and the calendar together did. Point at an action (or a reading) and its lines and partners light up.
// While it's the picture nearest the middle of the window it walks through the three actions by itself
// (use-live.ts). On a phone the lines give way to a "From" line under each action. Every tool in it works today;
// the times and numbers are illustrative.

type Read = { id: string; tool: string; text: string };
type Did = { text: string; where: string; from: string[] };

const READ: Read[] = [
  { id: "watch", tool: "Apple Watch", text: "Slept 5h 12m, woke twice" },
  { id: "cal", tool: "Google Calendar", text: "4 meetings before noon" },
  { id: "tasks", tool: "Google Tasks", text: "6 tasks due today" },
];

const DID: Did[] = [
  { text: "Moved the 9:30 design review to 11:30", where: "Google Calendar", from: ["watch", "cal"] },
  { text: "Moved 3 tasks to Thursday", where: "Google Tasks", from: ["watch", "tasks"] },
  { text: "Kept 12 to 1 free for lunch", where: "Google Calendar", from: ["cal"] },
];

const LINKS = DID.flatMap((did, d) => did.from.map((id) => ({ id, d })));

/** Which readings and actions are lit: an action lights its sources, a reading lights what it led to */
type Focus = { kind: "did"; index: number } | { kind: "read"; id: string } | null;

const lit = (focus: Focus, link: { id: string; d: number }) =>
  !focus || (focus.kind === "did" ? focus.index === link.d : focus.id === link.id);

export function ConnectorMorning() {
  const root = useRef<HTMLDivElement>(null);
  const map = useRef<HTMLDivElement>(null);
  const seen = useSeen(root, "0px");
  const live = useLive(root);
  const [paths, setPaths] = useState<string[]>([]);
  const [hover, setHover] = useState<Focus>(null);
  const [auto, setAuto] = useState(-1);
  const focus: Focus = hover ?? (auto >= 0 ? { kind: "did", index: auto } : null);

  // Draw a curve from the right edge of each reading to the left edge of each action it led to
  const measure = useCallback(() => {
    const box = map.current;
    if (!box) return;
    const origin = box.getBoundingClientRect();
    const reads = box.querySelectorAll<HTMLElement>("[data-read]");
    const dids = box.querySelectorAll<HTMLElement>("[data-did]");
    setPaths(
      LINKS.map(({ id, d }) => {
        const a = [...reads].find((el) => el.dataset.read === id)?.getBoundingClientRect();
        const b = dids[d]?.getBoundingClientRect();
        if (!a || !b) return "";
        const x1 = a.right - origin.left;
        const y1 = a.top + a.height / 2 - origin.top;
        const x2 = b.left - origin.left;
        const y2 = b.top + b.height / 2 - origin.top;
        const mid = (x1 + x2) / 2;
        return `M${x1},${y1} C${mid},${y1} ${mid},${y2} ${x2},${y2}`;
      }),
    );
  }, []);

  useLayoutEffect(() => {
    measure();
    const box = map.current;
    if (!box) return;
    const watch = new ResizeObserver(measure);
    watch.observe(box);
    return () => watch.disconnect();
  }, [measure]);

  // Walk through the actions one at a time while nobody is pointing at it
  useEffect(() => {
    if (!live || hover) return;
    let step = -1;
    const timer = window.setInterval(() => {
      step = step >= DID.length - 1 ? -1 : step + 1;
      setAuto(step);
    }, 2600);
    return () => {
      window.clearInterval(timer);
      setAuto(-1);
    };
  }, [live, hover]);

  const readLit = (id: string) => !focus || LINKS.some((link) => link.id === id && lit(focus, link));
  const didLit = (index: number) => !focus || LINKS.some((link) => link.d === index && lit(focus, link));

  return (
    <div className="mo" ref={root} data-seen={seen ? "" : undefined} data-focus={focus ? "" : undefined}>
      <p className="mo-head">
        <span>Tuesday, 7:02am</span>
        <span>Done before you were up</span>
      </p>
      <div className="mo-map" ref={map} onMouseLeave={() => setHover(null)}>
        <div className="mo-col">
          <p className="mo-label">What Waldo read</p>
          <ul>
            {READ.map((row, i) => (
              <li
                key={row.id}
                data-read={row.id}
                data-lit={readLit(row.id) ? "" : undefined}
                style={{ "--d": `${i * 140}ms` } as CSSProperties}
                onMouseEnter={() => setHover({ kind: "read", id: row.id })}
              >
                <span className="mo-icon">
                  <ToolMark name={row.tool} size={20} />
                </span>
                <span>
                  <small>{row.tool}</small>
                  {row.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <svg className="mo-links" aria-hidden="true">
          {LINKS.map((link, i) =>
            paths[i] ? (
              <path
                key={`${link.id}-${link.d}`}
                d={paths[i]}
                pathLength={1}
                data-lit={focus && lit(focus, link) ? "" : undefined}
                style={{ "--d": `${520 + i * 90}ms` } as CSSProperties}
              />
            ) : null,
          )}
        </svg>

        <div className="mo-col">
          <p className="mo-label">What Waldo did</p>
          <ul>
            {DID.map((row, i) => (
              <li
                key={row.text}
                data-did=""
                data-lit={didLit(i) ? "" : undefined}
                style={{ "--d": `${1100 + i * 140}ms` } as CSSProperties}
                onMouseEnter={() => setHover({ kind: "did", index: i })}
              >
                <span className="mo-icon mo-icon--done" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 6.3l2.3 2.2L9.5 3.5" />
                  </svg>
                </span>
                <span>
                  <small>In {row.where}</small>
                  {row.text}
                  <em className="mo-from">
                    From{" "}
                    {row.from.map((id) => {
                      const tool = READ.find((read) => read.id === id)!.tool;
                      return <ToolMark key={id} name={tool} size={14} />;
                    })}
                  </em>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mo-says" style={{ "--d": "1700ms" } as CSSProperties}>
        <WaldoFace size={26} />
        <span>Short night, so the morning is lighter. Nothing important moved.</span>
      </p>
    </div>
  );
}
