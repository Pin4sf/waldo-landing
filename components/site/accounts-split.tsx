"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";

import { ToolMark } from "./connector-mark";
import { useLive } from "./use-live";

// Connectors, "Work Gmail. Personal Gmail. Waldo knows which." (docs/website/pages/connectors.md): both accounts
// on one day, 6am to midnight, so the split is plain at a glance. Work hours are shaded across both rows. The ink
// slots are when Waldo works each inbox: twice inside work hours for work, only outside them for personal. A marker
// runs through the day; as it passes a slot the slot lights and the line under the card says which account and what
// happened. Replaces the two separate cards (two-accounts.tsx). Plays only while it's the picture nearest the middle
// of the window (use-live.ts); at rest it holds on the morning work block.

const START = 6;
const END = 24;
const WORK = { from: 9, to: 18 };
const DAY_MS = 12000;

type Slot = { at: number; len: number; line: string };
type Account = { kind: string; address: string; slots: Slot[] };

const ACCOUNTS: Account[] = [
  {
    kind: "Work",
    address: "you@work.com",
    slots: [
      { at: 9.5, len: 1, line: "Morning block. Handled, and two are waiting for you." },
      { at: 16, len: 1, line: "Afternoon block. Handled." },
    ],
  },
  {
    kind: "Personal",
    address: "you@gmail.com",
    slots: [
      { at: 7, len: 1, line: "Before work. Handled." },
      { at: 19, len: 1, line: "After work. Handled." },
    ],
  },
];

const pos = (hour: number) => ((hour - START) / (END - START)) * 100;
const clock = (hour: number) => {
  const h = Math.floor(hour) % 24;
  const m = Math.floor((hour % 1) * 60);
  const shown = h % 12 === 0 ? 12 : h % 12;
  return `${shown}:${String(m).padStart(2, "0")}${h < 12 ? "am" : "pm"}`;
};
const REST = 9.9;

/** What's happening at this hour: the slot it's in, if any */
function at(hour: number) {
  for (const account of ACCOUNTS) {
    const slot = account.slots.find((s) => hour >= s.at && hour <= s.at + s.len + 0.6);
    if (slot) return { account: account.kind, slot };
  }
  return null;
}

export function AccountsSplit() {
  const root = useRef<HTMLDivElement>(null);
  const marker = useRef<HTMLSpanElement>(null);
  const live = useLive(root);
  const [hour, setHour] = useState(REST);

  useEffect(() => {
    if (!live) return;
    let frame = 0;
    let last = "";
    const began = performance.now() - ((REST - START) / (END - START)) * DAY_MS;
    const tick = (now: number) => {
      const h = START + (((now - began) % DAY_MS) / DAY_MS) * (END - START);
      marker.current?.style.setProperty("left", `${pos(h)}%`);
      // Only re-render when the line under the card would change (every ten minutes of the day is plenty)
      const key = `${Math.floor(h * 6)}`;
      if (key !== last) {
        last = key;
        setHour(h);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [live]);

  const now = at(hour);
  const inWork = hour >= WORK.from && hour < WORK.to;

  return (
    <div className="ax" ref={root}>
      <p className="ax-head">
        <ToolMark name="Gmail" size={22} />
        <b>Gmail</b>
        <span>2 accounts connected</span>
      </p>

      <div className="ax-day">
        <div className="ax-scale" aria-hidden="true">
          <span className="ax-band" style={{ left: `${pos(WORK.from)}%`, width: `${pos(WORK.to) - pos(WORK.from)}%` }}>
            Work hours
          </span>
        </div>

        {ACCOUNTS.map((account) => (
          <div key={account.kind} className="ax-row" data-on={now?.account === account.kind ? "" : undefined}>
            <p className="ax-who">
              <b>{account.kind}</b>
              <span>{account.address}</span>
            </p>
            <div className="ax-track">
              <span className="ax-work" style={{ left: `${pos(WORK.from)}%`, width: `${pos(WORK.to) - pos(WORK.from)}%` }} />
              {account.slots.map((slot) => (
                <span
                  key={slot.at}
                  className="ax-slot"
                  data-on={now?.slot === slot ? "" : undefined}
                  style={{ left: `${pos(slot.at)}%`, width: `${(slot.len / (END - START)) * 100}%` } as CSSProperties}
                />
              ))}
            </div>
          </div>
        ))}

        <div className="ax-scale ax-scale--hours" aria-hidden="true">
          {[6, 9, 12, 15, 18, 21, 24].map((h) => (
            <span key={h} style={{ left: `${pos(h)}%` }}>
              {h === 24 ? "12am" : h === 12 ? "12pm" : h > 12 ? `${h - 12}pm` : `${h}am`}
            </span>
          ))}
        </div>

        {/* The marker runs through both rows at once */}
        <div className="ax-over" aria-hidden="true">
          <span className="ax-now" ref={marker} style={{ left: `${pos(REST)}%` }} />
        </div>
      </div>

      <p className="ax-log" key={now ? `${now.account}-${now.slot.at}` : inWork ? "work" : "off"} aria-live="off">
        <span className="ax-time">{clock(hour)}</span>
        {/* One piece, so it wraps as a sentence beside the time */}
        <span>
          {now ? (
            <>
              <b>{now.account}.</b> {now.slot.line}
            </>
          ) : inWork ? (
            <>
              <b>Work hours.</b> Personal stays untouched.
            </>
          ) : (
            <>
              <b>Outside work hours.</b> Work waits for its next block.
            </>
          )}
        </span>
      </p>
    </div>
  );
}
