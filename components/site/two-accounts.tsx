"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";

import { useLive } from "./use-live";

// The pictures for Connectors' "Work Gmail. Personal Gmail. Waldo knows which." (docs/website/site-wide-pass.md):
// one Gmail account each, and its day from 6am to midnight. Work hours are shaded. The ink slots are when Waldo works
// that inbox: twice a day inside work hours for work, and only outside them for personal. A marker runs through
// the day; as it passes a slot the slot lights and the line under the bar says what happened. Addresses are
// the page's own (you@work.com, you@gmail.com). Only the one nearest the middle of the window plays (use-live.ts).

const START = 6;
const END = 24;
/** One day, start to end, in ms */
const DAY_MS = 9000;

type Slot = { at: number; len: number; line: string };

const ACCOUNTS = {
  work: {
    address: "you@work.com",
    rule: "Two blocks a day",
    slots: [
      { at: 9.5, len: 0.75, line: "Morning block. Handled, and two are waiting for you." },
      { at: 16, len: 0.75, line: "Afternoon block. Handled." },
    ],
    idle: "Batched until the next block.",
  },
  personal: {
    address: "you@gmail.com",
    rule: "Never in work hours",
    slots: [
      { at: 7, len: 0.75, line: "Before work. Handled." },
      { at: 19, len: 0.75, line: "After work. Handled." },
    ],
    idle: "Work hours. Not touched.",
  },
} satisfies Record<string, { address: string; rule: string; slots: Slot[]; idle: string }>;

const pos = (hour: number) => `${((hour - START) / (END - START)) * 100}%`;

export function AccountDay({ kind }: { kind: "work" | "personal" }) {
  const account = ACCOUNTS[kind];
  const root = useRef<HTMLDivElement>(null);
  const marker = useRef<HTMLSpanElement>(null);
  const live = useLive(root);
  // Which slot the marker is in (-1: none); at rest, the first one
  const [on, setOn] = useState(0);

  useEffect(() => {
    if (!live) return;
    let frame = 0;
    const began = performance.now();
    let last = -2;
    const tick = (now: number) => {
      const hour = START + (((now - began) % DAY_MS) / DAY_MS) * (END - START);
      marker.current?.style.setProperty("left", pos(hour));
      const inside = account.slots.findIndex((slot) => hour >= slot.at && hour <= slot.at + slot.len + 1.2);
      if (inside !== last) {
        last = inside;
        setOn(inside);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [live, account]);

  const resting = account.slots[0].at + account.slots[0].len / 2;

  return (
    <div className="acct" ref={root}>
      <div className="acct-row">
        <Image src="/assets/connectors/gmail.svg" alt="" width={30} height={30} unoptimized />
        <p className="acct-who">
          <b>Gmail</b>
          <span>Connected as {account.address}</span>
        </p>
        <span className="acct-chip">
          <i />
          {kind === "work" ? "Work" : "Personal"}
        </span>
      </div>
      <div className="acct-day">
        <p className="acct-day-head">
          <b>When Waldo works it</b>
          <span>{account.rule}</span>
        </p>
        <div className="acct-bar">
          <span className="acct-work" />
          {account.slots.map((slot, index) => (
            <span
              key={slot.at}
              className="acct-slot"
              data-on={on === index ? "" : undefined}
              style={{ left: pos(slot.at), width: `${(slot.len / (END - START)) * 100}%` } as CSSProperties}
            />
          ))}
          <span className="acct-now" ref={marker} style={{ left: pos(resting) }} />
        </div>
        <p className="acct-hours">
          <span>6am</span>
          <span>12pm</span>
          <span>6pm</span>
          <span>12am</span>
        </p>
      </div>
      <p className="acct-log" key={on} data-fresh={live ? "" : undefined}>
        {on >= 0 ? <b>{account.slots[on].line}</b> : account.idle}
      </p>
    </div>
  );
}
