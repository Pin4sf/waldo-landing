"use client";

import { type CSSProperties, type ReactNode, useRef } from "react";

import { ToolMark, WaldoFace, useBeforeAfter } from "./connector-mark";
import { useLive } from "./use-live";

// The pictures for Connectors' "Reads what it needs. Nothing more." (docs/website/pages/connectors.md): one card per
// kind of tool, each showing that tool the way you know it, before and after Waldo has been in it. Each has the
// same three parts: the app's own bar on top, the app in the middle, and Waldo's one line at the foot once he's
// done. Only the card in the middle of the carousel plays (use-live.ts): it shows the before, then what changed,
// and holds the after. At rest, and with less motion, every card shows its after, so a still card still makes sense.
// Everything in them (names, times, numbers) is illustrative. Mail shows senders and times, never what's written.

function Scene({ name, after, children }: { name: string; after: boolean; children: ReactNode }) {
  return (
    <div className={`uc uc--${name}`} data-after={after ? "" : undefined}>
      {children}
    </div>
  );
}

function AppBar({ tool, title, meta }: { tool?: string; title: string; meta: ReactNode }) {
  return (
    <p className="uc-bar">
      {tool ? <ToolMark name={tool} size={22} /> : <CheckTile />}
      <b>{title}</b>
      <span>{meta}</span>
    </p>
  );
}

function Note({ children }: { children: ReactNode }) {
  return (
    <p className="uc-note">
      <WaldoFace size={24} />
      <span>{children}</span>
    </p>
  );
}

function CheckTile() {
  return (
    <span className="uc-checktile" aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 6.3l2.3 2.2L9.5 3.5" />
      </svg>
    </span>
  );
}

function useScene() {
  const root = useRef<HTMLDivElement>(null);
  const live = useLive(root);
  const after = useBeforeAfter(live);
  return { root, after };
}

const at = (i: number) => ({ "--i": i }) as CSSProperties;

// ── Body: last night, and Waldo's read on it ──

const STAGES: { kind: "awake" | "rem" | "core" | "deep"; len: number }[] = [
  { kind: "awake", len: 2 }, { kind: "core", len: 6 }, { kind: "deep", len: 5 }, { kind: "core", len: 5 },
  { kind: "rem", len: 4 }, { kind: "awake", len: 2 }, { kind: "core", len: 7 }, { kind: "deep", len: 3 },
  { kind: "rem", len: 5 }, { kind: "core", len: 6 }, { kind: "awake", len: 2 }, { kind: "rem", len: 4 }, { kind: "core", len: 5 },
];

export function UseBody() {
  const { root, after } = useScene();
  return (
    <div ref={root} className="uc-frame">
      <Scene name="body" after={after}>
        <AppBar tool="Apple Health" title="Sleep" meta="Last night" />
        <div className="uc-panel">
          <p className="uc-big">
            5h 12m <small>asleep</small>
          </p>
          <div className="uc-stages">
            {STAGES.map((stage, i) => (
              <i key={i} data-kind={stage.kind} style={{ flexGrow: stage.len, ...at(i) }} />
            ))}
          </div>
          <p className="uc-axis">
            <span>11:58pm</span>
            <span>Woke twice</span>
            <span>5:40am</span>
          </p>
        </div>
        <ul className="uc-rows uc-metrics">
          <li style={at(0)}>
            <span>Heart rate variability</span>
            <b>12% below your usual</b>
          </li>
          <li style={at(1)}>
            <span>Resting heart rate</span>
            <b>Higher than usual</b>
          </li>
        </ul>
        <Note>Running low today, so the morning is lighter. Hard work starts at 10:30.</Note>
      </Scene>
    </div>
  );
}

// ── Calendar: the design review moves out of a short-night morning ──

const HOUR_FROM = 9;
const HOURS = 4;
const top = (h: number) => `${((h - HOUR_FROM) / HOURS) * 100}%`;
const tall = (d: number) => `${(d / HOURS) * 100}%`;

export function UseCalendar() {
  const { root, after } = useScene();
  return (
    <div ref={root} className="uc-frame">
      <Scene name="cal" after={after}>
        <AppBar tool="Google Calendar" title="Tuesday" meta="Google Calendar" />
        <div className="uc-day">
          {[9, 10, 11, 12, 13].map((h) => (
            <span key={h} className="uc-hour" style={{ top: top(h) }}>
              {h > 12 ? `${h - 12} PM` : h === 12 ? "12 PM" : `${h} AM`}
            </span>
          ))}
          <span className="uc-event" style={{ top: top(9), height: tall(0.5) }}>
            Standup
          </span>
          <span className="uc-event" style={{ top: top(10.75), height: tall(0.5) }}>
            Hiring sync
          </span>
          <span className="uc-event uc-event--lunch" style={{ top: top(12.5), height: tall(0.5) }}>
            Lunch, kept free
          </span>
          <span className="uc-ghost" style={{ top: top(9.5), height: tall(1) }}>
            Was here
          </span>
          <span className="uc-event uc-event--moved" style={{ top: top(after ? 11.5 : 9.5), height: tall(1) }}>
            <b>Design review</b>
            <small>{after ? "11:30 to 12:30 · moved by Waldo" : "9:30 to 10:30"}</small>
          </span>
        </div>
        <Note>Short night, so the design review is at 11:30, when you&apos;re back to yourself.</Note>
      </Scene>
    </div>
  );
}

// ── Mail and messages: most of it waits, two things come through ──

const MAIL = [
  { from: "Priya Shah", time: "7:41", needs: true, w: [62, 80] },
  { from: "GitHub", time: "7:30", needs: false, w: [48, 70] },
  { from: "Acme Legal", time: "7:12", needs: true, w: [70, 54] },
  { from: "Figma", time: "6:58", needs: false, w: [40, 76] },
  { from: "The Weekly", time: "6:40", needs: false, w: [56, 66] },
  { from: "Stripe", time: "6:15", needs: false, w: [44, 72] },
];

export function UseInbox() {
  const { root, after } = useScene();
  return (
    <div ref={root} className="uc-frame">
      <Scene name="mail" after={after}>
        <AppBar tool="Gmail" title="Inbox" meta={after ? "2 need you" : "38 new"} />
        <ul className="uc-mail">
          {MAIL.map((mail) => (
            <li key={mail.from} data-needs={mail.needs ? "" : undefined}>
              <i className="uc-avatar">{mail.from[0]}</i>
              <span className="uc-mail-text">
                <b>{mail.from}</b>
                <span className="uc-lines" aria-hidden="true">
                  <i style={{ width: `${mail.w[0]}%` }} />
                  <i style={{ width: `${mail.w[1]}%` }} />
                </span>
              </span>
              <span className="uc-mail-end">{after && mail.needs ? <em>Needs you</em> : mail.time}</span>
            </li>
          ))}
          <li className="uc-bundle">
            <i className="uc-avatar uc-avatar--stack">36</i>
            <span className="uc-mail-text">
              <b>36 more, batched for 11:30</b>
              <small>After your focus block</small>
            </span>
          </li>
        </ul>
        <Note>Two need you now. The other 36 wait for 11:30.</Note>
      </Scene>
    </div>
  );
}

// ── Tasks: reordered for the day you're having ──

const TASKS = [
  { id: "acme", label: "Reply to Acme Legal", due: "Today" },
  { id: "expenses", label: "Submit expenses", due: "Today" },
  { id: "proposal", label: "Write the proposal", due: "Friday" },
  { id: "flights", label: "Book flights", due: "Today" },
  { id: "q4", label: "Review the Q4 plan", due: "Today" },
  { id: "deck", label: "Update the deck", due: "Today" },
];
const AFTER_SLOT: Record<string, number> = { proposal: 0, acme: 1, deck: 2, expenses: 4, flights: 5, q4: 6 };
const LATER = new Set(["expenses", "flights", "q4"]);

export function UseTasks() {
  const { root, after } = useScene();
  return (
    <div ref={root} className="uc-frame">
      <Scene name="tasks" after={after}>
        <AppBar title="Today" meta={after ? "3 today, 3 on Thursday" : "6 due today"} />
        <div className="uc-tasks">
          {TASKS.map((task, i) => {
            const slot = after ? AFTER_SLOT[task.id] : i;
            const later = after && LATER.has(task.id);
            return (
              <span
                key={task.id}
                className="uc-task"
                data-later={later ? "" : undefined}
                data-top={after && task.id === "proposal" ? "" : undefined}
                style={{ "--slot": slot } as CSSProperties}
              >
                <i className="uc-box" />
                <b>{task.label}</b>
                <small>{after && task.id === "proposal" ? "9am, your sharpest" : later ? "Thursday" : task.due}</small>
              </span>
            );
          })}
          <span className="uc-divider" style={{ "--slot": 3 } as CSSProperties}>
            Thursday
          </span>
        </div>
        <Note>Three today, the hard one first while you&apos;re fresh. The rest are on Thursday.</Note>
      </Scene>
    </div>
  );
}

// ── Notes and files: the pages you pointed it to, turned into three lines before the call ──

export function UseNotes() {
  const { root, after } = useScene();
  return (
    <div ref={root} className="uc-frame">
      <Scene name="notes" after={after}>
        <AppBar tool="Google Calendar" title="Client call with Acme" meta="2:00pm" />
        <div className="uc-docs">
          <span className="uc-doc">
            <ToolMark name="Notion" size={20} />
            <b>Acme brief</b>
            <span className="uc-lines" aria-hidden="true">
              <i style={{ width: "90%" }} />
              <i style={{ width: "72%" }} />
              <i style={{ width: "84%" }} />
              <i style={{ width: "40%" }} />
            </span>
          </span>
          <span className="uc-doc">
            <ToolMark name="Google Drive" size={20} />
            <b>Q4 proposal</b>
            <span className="uc-lines" aria-hidden="true">
              <i style={{ width: "80%" }} />
              <i style={{ width: "92%" }} />
              <i style={{ width: "64%" }} />
              <i style={{ width: "76%" }} />
            </span>
          </span>
        </div>
        <div className="uc-brief">
          <p className="uc-brief-head">
            <WaldoFace size={22} />
            <b>Before your 2pm</b>
            <span>1:50pm</span>
          </p>
          <ul>
            <li style={at(0)}>They want the launch moved to the 30th.</li>
            <li style={at(1)}>The budget was approved last week.</li>
            <li style={at(2)}>Ask who&apos;s on the pilot team.</li>
          </ul>
        </div>
      </Scene>
    </div>
  );
}

// ── Work tools: interruptions scattered through the day, gathered into one sitting ──

const PINGS: { tool: string; at: number; row: number }[] = [
  { tool: "GitHub", at: 6, row: 0 }, { tool: "Figma", at: 14, row: 1 }, { tool: "Linear", at: 21, row: 2 },
  { tool: "GitHub", at: 30, row: 0 }, { tool: "Figma", at: 39, row: 1 }, { tool: "GitHub", at: 47, row: 0 },
  { tool: "Linear", at: 55, row: 2 }, { tool: "Figma", at: 63, row: 1 }, { tool: "GitHub", at: 71, row: 0 },
];
/** Where the sitting is on the 9am-to-6pm bar: 4pm to 5pm */
const SITTING = { from: (7 / 9) * 100, to: (8 / 9) * 100 };

export function UseWork() {
  const { root, after } = useScene();
  return (
    <div ref={root} className="uc-frame">
      <Scene name="work" after={after}>
        <AppBar title="Waiting on you" meta={after ? "One sitting, at 4pm" : "Through the day"} />
        <ul className="uc-rows uc-sources">
          <li>
            <ToolMark name="GitHub" size={20} />
            <span>GitHub</span>
            <b>4 reviews</b>
          </li>
          <li>
            <ToolMark name="Figma" size={20} />
            <span>Figma</span>
            <b>23 comments</b>
          </li>
          <li>
            <ToolMark name="Linear" size={20} />
            <span>Linear</span>
            <b>3 issues</b>
          </li>
        </ul>
        <div className="uc-strip">
          <span className="uc-sitting" style={{ left: `${SITTING.from}%`, width: `${SITTING.to - SITTING.from}%` }}>
            4pm
          </span>
          {PINGS.map((ping, i) => (
            <span
              key={i}
              className="uc-ping"
              style={
                {
                  left: `${after ? SITTING.from + (0.2 + (i % 3) * 0.3) * (SITTING.to - SITTING.from) : ping.at}%`,
                  top: after ? `${14 + Math.floor(i / 3) * 21}%` : `${10 + ping.row * 22}%`,
                } as CSSProperties
              }
            >
              <ToolMark name={ping.tool} size={14} />
            </span>
          ))}
          <p className="uc-strip-axis">
            <span>9am</span>
            <span>12pm</span>
            <span>3pm</span>
            <span>6pm</span>
          </p>
        </div>
        <Note>All of it in one hour at 4, after your best work instead of through it.</Note>
      </Scene>
    </div>
  );
}

// ── Weather: tomorrow's heat, and the run that moves out of it ──

const TEMPS = [21, 23, 26, 28, 30, 32, 34, 34, 33, 31, 29, 27];
/** 7am to 6pm, one bar an hour */
const RUN = { before: 5.5, after: 0 };

export function UseWeather() {
  const { root, after } = useScene();
  return (
    <div ref={root} className="uc-frame">
      <Scene name="weather" after={after}>
        <AppBar title="Tomorrow" meta="Weather, no setup" />
        <div className="uc-panel uc-weather">
          <p className="uc-big">
            34° <small>by 1pm, UV high</small>
          </p>
          <div className="uc-temps">
            {TEMPS.map((t, i) => (
              <i key={i} data-hot={t >= 32 ? "" : undefined} style={{ height: `${((t - 16) / 20) * 100}%` }} />
            ))}
            <span className="uc-run" style={{ left: `${((after ? RUN.after : RUN.before) / 12) * 100}%` }}>
              {after ? "Run, 7am" : "Run, 12:30"}
            </span>
          </div>
          <p className="uc-axis">
            <span>7am</span>
            <span>12pm</span>
            <span>6pm</span>
          </p>
        </div>
        <Note>34° by lunch, so your run moved to 7am, before the heat.</Note>
      </Scene>
    </div>
  );
}
