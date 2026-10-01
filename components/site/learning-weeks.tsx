"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { useLive } from "./use-live";

// The picture for "Knows what kind of day it is." (see docs/website/learning-visual.md): the same bad
// Tuesday over three weeks, shown inside Apple Calendar's own day view rather than a UI of ours: the
// month and the week strip along the top, the day's timeline under it, an event as Calendar draws
// one. Waldo has no screen of his own here. What he does shows up as the calendar changing.
//
//   Week 1  Tuesday: Form is low, and he asks. He is told yes, and the Weekly Sync is on Thursday.
//   Week 2  he has moved it by the time you look, and says so, with an Undo.
//   Week 3  Tuesday is already clear: he moved it first, and says nothing but a tick.
//
// The week strip is the clock: each week the dates turn over (Wk 41, 42, 43), and the day the strip
// has selected slides from Tuesday to Thursday when the meeting does. It plays only while on screen
// and with less motion it rests on Week 3. Everything is invented (the homepage's Priya and Leon).

type Week = {
  /** The week number, and the Sunday that starts the week */
  wk: number;
  sun: number;
  /** Is the meeting still on Tuesday when the week starts? */
  onTuesday: boolean;
  form: number;
  line: string;
  buttons: string[];
  /** How long the week plays, in ms */
  ms: number;
};

const WEEKS: Week[] = [
  { wk: 41, sun: 4, onTuesday: true, form: 41, line: "Form is low. Move Team Sync to Thursday?", buttons: ["Yes", "No"], ms: 5600 },
  { wk: 42, sun: 11, onTuesday: true, form: 38, line: "Moved Team Sync to Thursday, like last week.", buttons: ["Undo"], ms: 4600 },
  { wk: 43, sun: 18, onTuesday: false, form: 40, line: "Team Sync is on Thursday.", buttons: [], ms: 5000 },
];

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

/** The rest of the day, so the calendar looks like a calendar: hour (24h) it starts, hours it lasts, colour */
type Block = { at: number; len: number; title: string; time: string; tone: "green" | "purple" | "orange" | "blue" };
const TUESDAY_BLOCKS: Block[] = [
  { at: 10, len: 1.5, title: "Design crit", time: "10:00 – 11:30 AM", tone: "purple" },
  { at: 12, len: 0.5, title: "Standup", time: "12:00 PM", tone: "green" },
  { at: 12.5, len: 1, title: "Lunch with Anika", time: "12:30 – 1:30 PM", tone: "orange" },
  { at: 14, len: 1, title: "1:1 with Leon", time: "2:00 – 3:00 PM", tone: "purple" },
];
const THURSDAY_BLOCKS: Block[] = [
  { at: 10, len: 1, title: "Call with Maya", time: "10:00 – 11:00 AM", tone: "purple" },
  { at: 12, len: 0.5, title: "Standup", time: "12:00 PM", tone: "green" },
  { at: 13, len: 1, title: "Board prep", time: "1:00 – 2:00 PM", tone: "purple" },
  { at: 15, len: 1, title: "Investor update", time: "3:00 – 4:00 PM", tone: "orange" },
];
const FIRST_HOUR = 10;

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b) => (
        <div
          key={b.title}
          className="site-cal-event"
          data-tone={b.tone}
          style={{ top: `calc(${b.at - FIRST_HOUR} * var(--hour))`, height: `calc(${b.len} * var(--hour) - 3 * var(--u))` }}
        >
          <b>{b.title}</b>
          {b.len >= 1 ? <span>{b.time}</span> : null}
        </div>
      ))}
    </>
  );
}
/** An hour label and its line, from `first` (1 to 12, in 24h) for `count` hours */
function Hours({ first, count }: { first: number; count: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const h = first + i;
        const label = `${h > 12 ? h - 12 : h} ${h >= 12 ? "PM" : "AM"}`;
        return (
          <div key={h} className="site-cal-hour">
            <span>{label}</span>
          </div>
        );
      })}
    </>
  );
}

export function LearningWeeks() {
  const root = useRef<HTMLDivElement>(null);
  // Rests on the last week until it is on screen, and with less motion stays there
  const [week, setWeek] = useState(WEEKS.length - 1);
  // Plays only while it is the picture to watch (use-live.ts)
  const live = useLive(root);

  // Coming into view starts it from the first week
  const started = useRef(false);
  useEffect(() => {
    if (!live) {
      started.current = false;
      return;
    }
    if (started.current) return;
    started.current = true;
    const id = window.setTimeout(() => setWeek(0), 0);
    return () => window.clearTimeout(id);
  }, [live]);

  // Each week plays for its time, then the next one comes round
  useEffect(() => {
    if (!live) return;
    const id = window.setTimeout(() => setWeek((w) => (w + 1) % WEEKS.length), WEEKS[week].ms);
    return () => window.clearTimeout(id);
  }, [live, week]);

  const w = WEEKS[week];

  return (
    <div className="site-cal" ref={root} data-week={week + 1}>
      <div className="site-cal-top">
        <span className="site-cal-month">
          <svg viewBox="0 0 10 16" aria-hidden="true">
            <path d="M8 1.5 2 8l6 6.5" />
          </svg>
          October
        </span>
        <div className="site-cal-weeks" role="group" aria-label="Week" data-on={week}>
          <i className="site-cal-thumb" />
          {WEEKS.map((_, i) => (
            <button
              key={i}
              type="button"
              className="site-cal-week"
              aria-current={i === week ? "true" : undefined}
              onClick={() => setWeek(i)}
            >
              Week {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Everything under the title plays again when the week changes */}
      <div className="site-cal-stage" key={week}>
        <div className="site-cal-strip">
          <span className="site-cal-select" />
          {DAYS.map((d, i) => (
            <span key={i} className="site-cal-daycell" data-day={i}>
              <small>{d}</small>
              <b>{w.sun + i}</b>
            </span>
          ))}
        </div>

        <div className="site-cal-window">
          <div className="site-cal-days">
            {/* Tuesday: Form is low, and the meeting is at four, unless he has already moved it */}
            <div className="site-cal-day">
              <p className="site-cal-allday">
                <i />
                Form is low <b>{w.form}</b>
              </p>
              <div className="site-cal-grid">
                <Hours first={FIRST_HOUR} count={7} />
                <Blocks blocks={TUESDAY_BLOCKS} />
                {w.onTuesday ? (
                  <div className="site-cal-event site-cal-event--sync" data-tone="blue" style={{ top: "calc(6 * var(--hour))", height: "calc(var(--hour) - 3 * var(--u))" }}>
                    <b>Weekly Sync</b>
                    <span>4:00 – 5:00 PM</span>
                  </div>
                ) : null}
              </div>
            </div>
            {/* Thursday: where it ends up */}
            <div className="site-cal-day">
              <p className="site-cal-allday site-cal-allday--quiet">No all-day events</p>
              <div className="site-cal-grid">
                <Hours first={FIRST_HOUR} count={7} />
                <Blocks blocks={THURSDAY_BLOCKS} />
                <div className="site-cal-event site-cal-event--sync site-cal-event--moved" data-tone="blue" style={{ top: "calc(1 * var(--hour))", height: "calc(var(--hour) - 3 * var(--u))" }}>
                  <b>
                    Weekly Sync <em>Moved by Waldo</em>
                  </b>
                  <span>11:00 AM – 12:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="site-cal-waldo">
          <Image className="site-cal-face" src="/assets/home/mascots/waldo-card.svg" alt="" width={30} height={23} unoptimized />
          <div className="site-cal-says">
            <p>{w.line}</p>
            <div className="site-cal-actions">
              {w.buttons.map((label) => (
                <span key={label} className="site-cal-button" data-pressed={label === "Yes" ? "" : undefined}>
                  {label}
                </span>
              ))}
              {w.buttons.length === 0 ? (
                <svg className="site-cal-ticked" viewBox="0 0 18 18" aria-hidden="true">
                  <path d="M4.4 9.5l3.1 3.1 6.1-6.8" pathLength={1} />
                </svg>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
