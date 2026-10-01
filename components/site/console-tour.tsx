"use client";

import { type KeyboardEvent, useEffect, useRef, useState } from "react";

import { useLive } from "./use-live";

// "You see what it stores": Waldo's console, kept to the point. A sidebar of five names and one
// plain list per screen (sample records). It tours itself until you touch it, but only while it is
// the picture to watch (use-live.ts) and never while the pointer or focus is inside it.

const SCREENS = [
  {
    id: "today",
    label: "Today",
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
    line: "Nothing happens until you decide.",
    rows: [
      ["Draft reply about Friday lunch", "Needs your yes"],
      ["Move 9am to 10:30", "Needs your yes"],
    ],
  },
  {
    id: "patrol",
    label: "Patrol",
    line: "Everything Waldo did, on record.",
    rows: [
      ["Inbox review", "Completed 1:15 PM"],
      ["The Brief", "Sent 9:00 AM"],
    ],
  },
  {
    id: "memory",
    label: "Memory",
    line: "What Waldo holds about you.",
    rows: [
      ["Spots", "Single things it noticed"],
      ["Constellation", "Patterns across weeks"],
      ["Profile", "What it knows about your work"],
    ],
  },
  {
    id: "connections",
    label: "Connections",
    line: "Only what you connect.",
    rows: [
      ["Google", "Calendar, Gmail"],
      ["Telegram", "Not connected"],
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
      <div className="console-lights" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="console-split">
        <div className="console-nav" role="tablist" aria-label="Console" aria-orientation="vertical" onKeyDown={onKeys}>
          {SCREENS.map((item, index) => (
            <button
              key={item.id}
              id={`console-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={at === index}
              aria-controls="console-panel"
              tabIndex={at === index ? 0 : -1}
              className="console-tab"
              onClick={() => go(index)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="console-page" key={screen.id} id="console-panel" role="tabpanel" aria-labelledby={`console-tab-${screen.id}`}>
          <h4>{screen.label}.</h4>
          <p>{screen.line}</p>
          <ul className="console-list">
            {screen.rows.map(([name, note]) => (
              <li key={name}>
                <b>{name}</b>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
