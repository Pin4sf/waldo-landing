"use client";

import { type KeyboardEvent, useEffect, useRef, useState } from "react";

import { useLive } from "./use-live";

// Homepage concept preview. These screens are illustrative sample content, not a live console.
// Memory is kept visually separate because it is a concept screen, not a shipped feature.

const SCREENS = [
  {
    id: "today",
    label: "Today",
    eyebrow: "YOUR DAY",
    line: "What needs you, and what’s next.",
    rows: [
      ["Waiting on you", "Draft reply about Friday lunch"],
      ["Next", "Afternoon check-in, 4:00 PM"],
      ["Latest", "Inbox review, completed 1:15 PM"],
    ],
  },
  {
    id: "waiting",
    label: "Waiting",
    eyebrow: "YOUR DECISIONS",
    line: "Nothing happens until you decide.",
    rows: [
      ["Draft reply about Friday lunch", "Needs your yes"],
      ["Move 9am to 10:30", "Needs your yes"],
    ],
  },
  {
    id: "patrol",
    label: "Patrol",
    eyebrow: "ON RECORD",
    line: "Everything Waldo did, on record.",
    rows: [
      ["Inbox review", "Completed 1:15 PM"],
      ["The Brief", "Sent 9:00 AM"],
    ],
  },
  {
    id: "connections",
    label: "Connections",
    eyebrow: "CONNECTED TOOLS",
    line: "Only what you connect.",
    rows: [
      ["Google", "Calendar, Gmail"],
      ["Telegram", "Not connected"],
    ],
  },
  {
    id: "memory",
    label: "Memory",
    eyebrow: "CONCEPT PREVIEW",
    line: "What Waldo holds about you.",
    rows: [
      ["Spots", "Single things it noticed"],
      ["Constellation", "Patterns across weeks"],
      ["Profile", "What it knows about your work"],
    ],
  },
] as const;

const TOUR_MS = 4500;

export function ConsoleTour() {
  const root = useRef<HTMLDivElement>(null);
  const live = useLive(root);
  const [at, setAt] = useState(0);
  const [touched, setTouched] = useState(false);
  const [inside, setInside] = useState(false);

  useEffect(() => {
    if (!live || touched || inside) return;
    const timer = window.setTimeout(() => setAt((now) => (now + 1) % SCREENS.length), TOUR_MS);
    return () => window.clearTimeout(timer);
  }, [live, touched, inside, at]);

  const go = (index: number) => {
    setTouched(true);
    setAt(index);
  };

  const onKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = ["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : ["ArrowUp", "ArrowLeft"].includes(event.key) ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (at + step + SCREENS.length) % SCREENS.length;
    go(next);
    root.current?.querySelector<HTMLElement>(`#console-tab-${SCREENS[next].id}`)?.focus();
  };

  const screen = SCREENS[at];
  return (
    <div
      className="console"
      ref={root}
      onPointerEnter={() => setInside(true)}
      onPointerLeave={() => setInside(false)}
      onFocus={() => setInside(true)}
      onBlur={() => setInside(false)}
    >
      <div className="console-topbar">
        <div className="console-lights" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <span className="console-window-title">Waldo <span>/</span> Console</span>
        <span className="console-window-state"><i /> Sample view</span>
      </div>
      <div className="console-split">
        <div className="console-nav" role="tablist" aria-label="Console" aria-orientation="vertical" onKeyDown={onKeys}>
          <span className="console-nav-label">WALDO CONSOLE</span>
          {SCREENS.map((item, index) => (
            <div className={item.id === "memory" ? "console-nav-group console-nav-group--concept" : "console-nav-group"} key={item.id}>
              {item.id === "memory" && <span className="console-nav-label">CONCEPT SCREENS</span>}
              <button
                id={`console-tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={at === index}
                aria-controls="console-panel"
                tabIndex={at === index ? 0 : -1}
                className="console-tab"
                onClick={() => go(index)}
              >
                <span className={`console-tab-mark console-tab-mark--${item.id}`} aria-hidden="true" />
                <span>{item.label}</span>
                {item.id === "memory" && <span className="console-concept-chip">Concept</span>}
              </button>
            </div>
          ))}
          <div className="console-sidebar-foot"><span className="console-avatar">W</span><span><b>Waldo</b><small>On a leash you hold.</small></span></div>
        </div>
        <div className="console-page" key={screen.id} id="console-panel" role="tabpanel" aria-labelledby={`console-tab-${screen.id}`}>
          <div className="console-page-head">
            <div>
              <span className="console-eyebrow">{screen.eyebrow}</span>
              <h4>{screen.label}<span>.</span></h4>
              <p>{screen.line}</p>
            </div>
            {screen.id === "memory" ? <span className="console-preview-badge">Illustrative concept</span> : <span className="console-date">Thursday, May 14</span>}
          </div>
          <ul className="console-list">
            {screen.rows.map(([name, note], index) => (
              <li key={name}>
                <span className={`console-row-icon console-row-icon--${screen.id}`} aria-hidden="true">{screen.id === "memory" ? ["•", "↗", "○"][index] : ["↗", "·", "✓"][index % 3]}</span>
                <span className="console-row-copy"><b>{name}</b><span>{note}</span></span>
                <span className="console-row-arrow" aria-hidden="true">↗</span>
              </li>
            ))}
          </ul>
          {screen.id === "memory" && <p className="console-memory-note">A direction for how Waldo could make patterns visible over time.</p>}
        </div>
      </div>
    </div>
  );
}
