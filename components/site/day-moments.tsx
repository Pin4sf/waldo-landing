"use client";

import { type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode, type RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";

import { useLive } from "./use-live";

import "./day-scrubber.css";

// How it works' "Done before you're up", after "A day with your dot" on chatgpt.com/features/dots: a few days
// with Waldo on a timeline. Above it, the thread at that moment, as you'd have it: his messages and voice notes,
// the calendar event he moved, the chart he read, the photo you sent him, your reaction. Under it, the name of
// the moment and one line. Waldo (the mascot) walks along the timeline with the flag; on brand, he never gets a
// speech bubble and is never in a sad or flagging mood. The flag is ink.
// Drag the flag, tap the timeline, use its arrows or the keyboard. It plays through on its own until touched
// (use-live.ts decides when). On phones the flag stays in the middle and the timeline slides under it.
// 2026-10-10 v2: wider spread of situations (a run, a delayed flight, a recital, bedtime) and real message
// kinds; Prep and The Close left out to make room. Copy: docs/website/pages/how-it-works.md. Styles:
// day-scrubber.css. Everything in the thread is invented (Priya, Sam and Maya are made up).

type From = "waldo" | "you";
type Card =
  | { kind: "event"; app: string; appName: string; title: string; was?: string; now: string }
  | { kind: "bars"; app: string; appName: string; title: string; values: number[]; read: string }
  | { kind: "lines"; app: string; appName: string; title: string; read: string }
  | { kind: "sleep"; title: string; from: string; to: string; hours: string; read: string }
  | { kind: "post"; app: string; appName: string; channel: string; text: string };
type Msg =
  | { from: From; text: ReactNode; react?: string }
  | { from: From; voice: { secs: number; bars: number[] }; react?: string }
  | { from: From; photo: { src: string; alt: string; at?: string }; react?: string }
  | { from: "waldo"; card: Card; react?: string };

type Moment = {
  /** On the flag */
  time: string;
  name: string;
  /** One line under the name */
  line: string;
  /** Which Waldo walks the line (public/assets/home/mascots): only the content ones */
  mood: "good-dark-mode" | "watching-dark-mode" | "good-week-dark-mode" | "good-sleep-dark-mode";
  thread: Msg[];
};

const wave = (...h: number[]) => h;

const MOMENTS: Moment[] = [
  {
    time: "6:58 AM",
    name: "The Brief",
    line: "Before your alarm, Waldo reads last night and tells you what it means for today, and what it already changed.",
    mood: "good-sleep-dark-mode",
    thread: [
      { from: "waldo", voice: { secs: 24, bars: wave(5, 9, 13, 8, 15, 11, 6, 14, 10, 7, 12, 16, 9, 6, 11, 14, 8, 12, 7, 10, 5, 9, 6, 4) } },
      { from: "waldo", text: "Short night, about 5h 40m. Your 9am design review is now at 10:30. The afternoon looks fine.", react: "🙏" },
      { from: "waldo", card: { kind: "event", app: "google-calendar", appName: "Google Calendar", title: "Design review", was: "9:00 AM", now: "10:30 AM" } },
    ],
  },
  {
    time: "7:40 AM",
    name: "Before the run",
    line: "Waldo checks what last night left you before you push, and moves the hard session to a day that can take it.",
    mood: "watching-dark-mode",
    thread: [
      { from: "you", text: "Still on for intervals?" },
      {
        from: "waldo",
        card: { kind: "bars", app: "apple-health", appName: "Apple Health", title: "HRV, last 7 mornings", values: [62, 66, 60, 68, 64, 65, 55], read: "Today is 12% under your usual" },
      },
      { from: "waldo", text: <>Not today. An easy 5k instead, and the intervals are on Thursday in <b>Strava</b>, when you&rsquo;re fresher.</>, react: "👍" },
    ],
  },
  {
    time: "10:30 AM",
    name: "The Window",
    line: "Waldo finds the hours you’ll be sharpest and keeps them clear for the work that needs you.",
    mood: "watching-dark-mode",
    thread: [
      { from: "waldo", text: <>10:30 to 12:30 is your sharpest stretch. It&rsquo;s blocked, and <b>Slack</b> is on Focus until then.</> },
      { from: "waldo", card: { kind: "event", app: "google-calendar", appName: "Google Calendar", title: "Focus, held by Waldo", now: "10:30 AM – 12:30 PM" } },
    ],
  },
  {
    time: "1:20 PM",
    name: "The Fetch",
    line: "When the day gets to you, say so however you like. Waldo clears what can wait.",
    mood: "good-dark-mode",
    thread: [
      { from: "you", voice: { secs: 7, bars: wave(4, 8, 12, 7, 14, 10, 5, 12, 9, 6, 11, 7, 4, 8, 5) } },
      { from: "waldo", text: <>Heard you. Stress has been climbing since noon, so your 3pm is on Thursday now. Sam has a note in <b>Slack</b>.</>, react: "❤️" },
    ],
  },
  {
    time: "2:40 PM",
    name: "The Heads-Up",
    line: "Waldo sees a bad afternoon forming from the ones before it, and steps in before it lands.",
    mood: "watching-dark-mode",
    thread: [
      { from: "waldo", card: { kind: "lines", app: "apple-health", appName: "Apple Health", title: "Form, the last three Tuesdays", read: "Each one dropped hard around 5" } },
      { from: "waldo", text: "Today is shaping up the same way. Your 4pm moved to tomorrow morning, before it lands." },
    ],
  },
  {
    time: "4:45 PM",
    name: "Outside work",
    line: "Your calendar has a life in it too. Waldo looks after that as carefully as your focus.",
    mood: "good-week-dark-mode",
    thread: [
      { from: "waldo", text: "Maya’s recital is at 6. The weekly sync runs over most weeks, so today it ends at 5:15.", react: "🙌" },
      { from: "waldo", card: { kind: "event", app: "google-calendar", appName: "Google Calendar", title: "Weekly sync", was: "4:30 – 5:45 PM", now: "4:30 – 5:15 PM" } },
    ],
  },
  {
    time: "10:40 PM",
    name: "Wind-down",
    line: "Waldo works back from tomorrow to tell you when tonight should end.",
    mood: "good-sleep-dark-mode",
    thread: [
      { from: "waldo", text: "Early flight tomorrow. Lights out by 11 still gets you six and a half hours. Alarm’s set for 5:30.", react: "😴" },
      { from: "waldo", card: { kind: "sleep", title: "Tonight", from: "11:00 PM", to: "5:30 AM", hours: "6h 30m", read: "40 minutes under your usual. Fine for one night." } },
    ],
  },
  {
    time: "Wed 9:15 AM",
    name: "On the road",
    line: "Send Waldo whatever you’re looking at. It rearranges the day around it.",
    mood: "watching-dark-mode",
    thread: [
      { from: "you", photo: { src: "/assets/home/hats/departures-board.jpg", alt: "A departures board", at: "50% 70%" } },
      { from: "you", text: "Delayed two hours." },
      { from: "waldo", text: <>Saw it. The 1pm with Priya is a video call now, and she has a note from you in <b>Gmail</b>.</>, react: "👍" },
    ],
  },
  {
    time: "Fri 4:10 PM",
    name: "The Adjustment",
    line: "Once a week, Waldo looks at the whole week and lightens the next one where it can.",
    mood: "good-week-dark-mode",
    thread: [
      { from: "waldo", text: "22 hours of meetings this week, your most since March. Friday afternoon is cleared, and the retro moved to Monday." },
      { from: "waldo", card: { kind: "post", app: "slack", appName: "Slack", channel: "#design-team", text: "Moving retro to Monday 10:00 so we start the week with it. Same link." } },
    ],
  },
];

const LAST = MOMENTS.length - 1;
/** Small ticks between two moments */
const MINOR = 7;
/** Width of the flag (px). The timeline starts and ends half a flag in, so the flag never leaves the row */
const FLAG = 140;
/** Phones: px between two moments on the sliding timeline */
const STEP = 64;
/** How long a moment stays once its thread has finished playing, before the next one, when it plays on its own (ms) */
const HOLD = 3600;

const clock = (s: number) => `0:${String(s).padStart(2, "0")}`;

/** The flag: a rounded box with a stem down to the timeline (Dots' shape, any width) */
function flagPath(w: number) {
  const m = w / 2;
  return `M${w} 24c0 6.627-5.373 12-12 12H${m + 10}c-4.418 0-8 3.582-8 8v24a2 2 0 1 1-4 0V44c0-4.418-3.582-8-8-8H12C5.373 36 0 30.627 0 24V12C0 5.373 5.373 0 12 0h${w - 24}c6.627 0 12 5.373 12 12z`;
}

const PLAY = (
  <svg viewBox="0 0 10 12" aria-hidden>
    <path d="M1 .8v10.4L9.4 6 1 .8Z" />
  </svg>
);

function AppTag({ app, name }: { app: string; name: string }) {
  return (
    <span className="day-app">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/assets/connectors/${app}.svg`} alt="" width={14} height={14} draggable={false} />
      {name}
    </span>
  );
}

/** What Waldo shows from a tool: the event he moved, the chart he read, the night he planned, the post he sent */
function CardBody({ card }: { card: Card }) {
  switch (card.kind) {
    case "event":
      return (
        <>
          <AppTag app={card.app} name={card.appName} />
          <span className="day-event">
            <b>{card.title}</b>
            <span className="day-event-time">
              {card.was ? (
                <>
                  <s>{card.was}</s>
                  <svg viewBox="0 0 16 16" aria-hidden>
                    <path d="M3 8h10m-4-4 4 4-4 4" />
                  </svg>
                </>
              ) : null}
              <span>{card.now}</span>
            </span>
          </span>
        </>
      );
    case "bars": {
      // Scaled between the week's low and high, so a 12% dip reads as one
      const top = Math.max(...card.values);
      const low = Math.min(...card.values);
      return (
        <>
          <AppTag app={card.app} name={card.appName} />
          <b className="day-card-title">{card.title}</b>
          <span className="day-bars" aria-hidden>
            {card.values.map((v, i) => (
              <i key={i} style={{ height: `${30 + ((v - low) / (top - low)) * 70}%` }} data-on={i === card.values.length - 1 ? "" : undefined} />
            ))}
          </span>
          <span className="day-card-read">{card.read}</span>
        </>
      );
    }
    case "lines":
      return (
        <>
          <AppTag app={card.app} name={card.appName} />
          <b className="day-card-title">{card.title}</b>
          <svg className="day-lines" viewBox="0 0 220 78" aria-hidden>
            <path d="M0 18 C40 16 70 20 100 24 S150 30 168 50 S200 58 220 58" />
            <path d="M0 22 C40 20 70 18 100 22 S150 34 170 52 S204 56 220 54" />
            <path d="M0 14 C40 18 70 22 100 26 S152 28 166 46 S198 60 220 60" />
            <path className="day-lines-now" d="M0 16 C40 18 70 19 100 23 S124 27 132 29" />
            <circle className="day-lines-now" cx="132" cy="29" r="3" />
            <text x="0" y="76">9am</text>
            <text x="132" y="76" textAnchor="middle">Now</text>
            <text x="220" y="76" textAnchor="end">7pm</text>
          </svg>
          <span className="day-card-read">{card.read}</span>
        </>
      );
    case "sleep":
      return (
        <>
          <b className="day-card-title">{card.title}</b>
          <span className="day-sleep">
            <span>{card.from}</span>
            <span className="day-sleep-bar" aria-hidden>
              <i />
              <em />
            </span>
            <span>{card.to}</span>
          </span>
          <span className="day-card-read">
            <b>{card.hours}</b> · {card.read}
          </span>
        </>
      );
    case "post":
      return (
        <>
          <AppTag app={card.app} name={`${card.appName} · ${card.channel}`} />
          <span className="day-post">{card.text}</span>
          <span className="day-card-read">Sent for you by Waldo</span>
        </>
      );
  }
}

function Voice({ secs, bars }: { secs: number; bars: number[] }) {
  return (
    <span className="day-voice">
      <span className="day-voice-play">{PLAY}</span>
      <span className="day-voice-bars" aria-hidden>
        {bars.map((h, n) => (
          <i key={n} style={{ height: `${h * 6}%` }} />
        ))}
      </span>
      <small>{clock(secs)}</small>
    </span>
  );
}

/** The tail on the last bubble of a run, drawn over the bubble's corner (its hairline goes round the tail) */
const TAIL = (
  <svg className="day-tail" viewBox="0 0 20 20" aria-hidden>
    <path className="day-tail-fill" d="M5.5 0V3C5.5 12 4.5 16.5.5 19.5 5 19.8 9 19.5 14 19.5V0Z" />
    <path className="day-tail-line" d="M5.5 0V3C5.5 12 4.5 16.5.5 19.5 5 19.8 9 19.5 14 19.5" />
  </svg>
);

function Message({ msg, tail, reacted, receipt }: { msg: Msg; tail: boolean; reacted: boolean; receipt?: string }) {
  const kind = "card" in msg ? "card" : "voice" in msg ? "voice" : "photo" in msg ? "photo" : "text";
  return (
    <div className="day-row" data-from={msg.from} data-tail={tail ? "" : undefined} data-react={msg.react ? "" : undefined}>
      <div className="day-msg" data-kind={kind}>
        {"card" in msg ? (
          <CardBody card={msg.card} />
        ) : "voice" in msg ? (
          <Voice {...msg.voice} />
        ) : "photo" in msg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="day-photo" src={msg.photo.src} alt={msg.photo.alt} style={{ objectPosition: msg.photo.at }} draggable={false} />
        ) : (
          <p>{msg.text}</p>
        )}
        {tail && kind !== "photo" ? TAIL : null}
        {msg.react && reacted ? (
          <span className="day-react" aria-label={`Reacted ${msg.react}`}>
            {msg.react}
          </span>
        ) : null}
      </div>
      {receipt ? <span className="day-receipt">{receipt}</span> : null}
    </div>
  );
}

/** Waldo typing: three dots in a small bubble, trailing two circles, the way iMessage shows it */
function Typing() {
  return (
    <div className="day-row day-row--typing" data-from="waldo" aria-hidden>
      <div className="day-typing">
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

/** Where the thread is: how many messages are in, whether Waldo is typing the next, how many reactions are in */
type Beat = { shown: number; typing: boolean; reacted: number };

const textLength = (msg: Msg) => ("text" in msg ? (typeof msg.text === "string" ? msg.text.length : 100) : 0);

/** The thread played out as iMessage would: Waldo types before each message, yours arrive after a beat, your
 *  reaction lands a moment after his message. Returns each beat with when it happens (ms), and when it's done. */
function script(thread: Msg[]) {
  const out: { at: number; beat: Beat }[] = [];
  let beat: Beat = { shown: 0, typing: false, reacted: 0 };
  let t = 0;
  const push = (next: Partial<Beat>) => {
    beat = { ...beat, ...next };
    out.push({ at: t, beat });
  };
  push({});
  t += 320;
  thread.forEach((msg, i) => {
    if (msg.from === "waldo") {
      push({ typing: true });
      t += "card" in msg ? 1100 : "voice" in msg ? 900 : Math.min(1500, 650 + textLength(msg) * 7);
    }
    push({ shown: i + 1, typing: false });
    t += msg.from === "you" ? 700 : 520;
    if (msg.react) {
      t += 280;
      push({ reacted: i + 1 });
      t += 480;
    }
  });
  return { beats: out, done: t };
}

const FINAL = (thread: Msg[]): Beat => ({ shown: thread.length, typing: false, reacted: thread.length });

/** When something comes in, the older messages don't jump up: the thread is put back and eased up, as iMessage does */
function useLift(flow: RefObject<HTMLElement | null>, deps: unknown[]) {
  const height = useRef(0);
  useLayoutEffect(() => {
    const el = flow.current;
    if (!el) return;
    const now = el.offsetHeight;
    const delta = now - height.current;
    height.current = now;
    if (delta <= 0 || !el.isConnected) return;
    el.style.transition = "none";
    el.style.transform = `translateY(${delta}px)`;
    void el.offsetHeight;
    el.style.transition = "";
    el.style.transform = "";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

const DAYS: Record<string, string> = { Wed: "Wednesday", Fri: "Friday" };

/** "Tuesday 6:58 AM", over the thread, the way iMessage stamps a conversation */
function Stamp({ time }: { time: string }) {
  const [first, ...rest] = time.split(" ");
  const day = DAYS[first];
  return (
    <p className="day-stamp">
      <b>{day ?? "Tuesday"}</b> {day ? rest.join(" ") : time}
    </p>
  );
}

function Thread({ moment, beat, ghost = false }: { moment: Moment; beat: Beat; ghost?: boolean }) {
  const flow = useRef<HTMLDivElement>(null);
  useLift(flow, [beat.shown, beat.typing, beat.reacted]);
  const shown = moment.thread.slice(0, beat.shown);
  const lastYou = shown.findLastIndex((m) => m.from === "you");
  const readAt = moment.time.replace(/^(Wed|Fri) /, "");
  return (
    <div className={ghost ? "day-thread day-thread--ghost" : "day-thread"} ref={ghost ? undefined : flow} aria-hidden={ghost || undefined}>
      <Stamp time={moment.time} />
      {shown.map((msg, n) => {
        const next = shown[n + 1] ?? (beat.typing ? { from: "waldo" } : undefined);
        return (
          <Message
            key={n}
            msg={msg}
            tail={next?.from !== msg.from}
            reacted={beat.reacted > n}
            receipt={n === lastYou && n === shown.length - 1 && !beat.typing ? `Read ${readAt}` : undefined}
          />
        );
      })}
      {beat.typing ? <Typing /> : null}
    </div>
  );
}

export function DayScrubber() {
  const root = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const live = useLive(root);
  const [index, setIndex] = useState(0);
  const [touched, setTouched] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [seen, setSeen] = useState(false);
  const [beat, setBeat] = useState<Beat>({ shown: 0, typing: false, reacted: 0 });
  const [done, setDone] = useState(false);

  // Where things are, in moments (0 … LAST). `target` is where the flag is headed; the flag eases to it and Waldo
  // eases after the flag, a beat behind. No springs, no overshoot. Drawn straight to CSS variables.
  const motion = useRef({ target: 0, flag: 0, dog: 0, frame: 0, still: false, held: false });
  const drag = useRef<{ id: number; x: number; start: number; moved: boolean } | null>(null);
  const indexRef = useRef(0);

  function paint() {
    const el = root.current;
    if (!el) return;
    const m = motion.current;
    el.style.setProperty("--flag", (m.flag / LAST).toFixed(4));
    el.style.setProperty("--flag-at", m.flag.toFixed(4));
    el.style.setProperty("--dog", (m.dog / LAST).toFixed(4));
  }

  function step() {
    const m = motion.current;
    m.frame = 0;
    if (m.still) {
      m.flag = m.dog = m.target;
    } else {
      m.flag = m.held ? m.target : m.flag + (m.target - m.flag) * 0.16;
      m.dog += (m.flag - m.dog) * 0.1;
    }
    const resting = Math.abs(m.target - m.flag) < 0.0008 && Math.abs(m.flag - m.dog) < 0.0008;
    if (resting) m.flag = m.dog = m.target;
    paint();
    if (!resting) m.frame = requestAnimationFrame(step);
  }

  function moveTo(pos: number) {
    const m = motion.current;
    m.target = Math.max(0, Math.min(LAST, pos));
    const next = Math.round(m.target);
    if (next !== indexRef.current) {
      indexRef.current = next;
      setIndex(next);
    }
    if (!m.frame) m.frame = requestAnimationFrame(step);
  }

  const go = (i: number) => moveTo(Math.max(0, Math.min(LAST, i)));

  useEffect(() => {
    const m = motion.current;
    m.still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    paint();
    return () => cancelAnimationFrame(m.frame);
  }, []);

  // The thread starts the first time the section is well in view
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const eye = new IntersectionObserver(([entry]) => entry.isIntersecting && setSeen(true), { threshold: 0.35 });
    eye.observe(el);
    return () => eye.disconnect();
  }, []);

  // Each time a moment comes up its thread plays out. While the flag is being dragged, or for anyone who asks for
  // less motion, the thread is shown whole
  useEffect(() => {
    const thread = MOMENTS[index].thread;
    const whole = dragging || motion.current.still;
    if (whole || !seen) {
      setBeat(whole ? FINAL(thread) : { shown: 0, typing: false, reacted: 0 });
      setDone(whole);
      return;
    }
    const { beats, done: end } = script(thread);
    setDone(false);
    const timers = beats.map(({ at, beat: b }) => window.setTimeout(() => setBeat(b), at));
    timers.push(window.setTimeout(() => setDone(true), end));
    return () => timers.forEach(window.clearTimeout);
  }, [index, dragging, seen]);

  // Plays through on its own while it's the picture on screen, until it's touched: the next moment comes once
  // this one's thread has played and had time to be read
  useEffect(() => {
    if (!live || touched || dragging || !done) return;
    const timer = window.setTimeout(() => {
      if (document.visibilityState !== "visible") return;
      go(indexRef.current === LAST ? 0 : indexRef.current + 1);
    }, HOLD);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live, touched, dragging, done, index]);

  const phone = () => window.matchMedia("(max-width: 767px)").matches;

  /** Where on the timeline a point on screen is, in moments (wide screens) */
  function posAt(clientX: number) {
    const box = rail.current?.getBoundingClientRect();
    if (!box) return 0;
    return ((clientX - box.left - FLAG / 2) / (box.width - FLAG)) * LAST;
  }

  function onDown(e: PointerEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest("button")) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    setTouched(true);
    drag.current = { id: e.pointerId, x: e.clientX, start: motion.current.target, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    if (!phone()) moveTo(posAt(e.clientX));
  }

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    if (Math.abs(e.clientX - d.x) > 3) {
      d.moved = true;
      motion.current.held = true;
    }
    if (phone()) moveTo(d.start - (e.clientX - d.x) / STEP);
    else moveTo(posAt(e.clientX));
  }

  function onUp(e: PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    motion.current.held = false;
    setDragging(false);
    // On phones a tap (no drag) on either side of the flag steps that way
    if (phone() && !d.moved) {
      const box = e.currentTarget.getBoundingClientRect();
      go(indexRef.current + (e.clientX < box.left + box.width / 2 ? -1 : 1));
      return;
    }
    go(Math.round(motion.current.target));
  }

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    const keys: Record<string, number> = {
      ArrowLeft: indexRef.current - 1,
      ArrowDown: indexRef.current - 1,
      ArrowRight: indexRef.current + 1,
      ArrowUp: indexRef.current + 1,
      Home: 0,
      End: LAST,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    setTouched(true);
    go(keys[e.key]);
  }

  const moment = MOMENTS[index];

  return (
    <div
      className="day"
      ref={root}
      role="group"
      aria-label="A few days with Waldo"
      data-dragging={dragging ? "" : undefined}
      style={{ "--flag-w": `${FLAG}px`, "--step": `${STEP}px`, "--last": LAST } as CSSProperties}
    >
      {/* The thread at that moment. Every moment is also laid out whole and unseen, so the space keeps the height
          of the longest and nothing below moves while a thread plays */}
      <div className="day-threads">
        {MOMENTS.map((m) => (
          <Thread key={m.name} moment={m} beat={FINAL(m.thread)} ghost />
        ))}
        <Thread key={index} moment={moment} beat={beat} />
      </div>

      {/* Waldo, walking the day with the flag */}
      <div className="day-walk" aria-hidden>
        <div className="day-dog">
          {MOMENTS.map((m, i) =>
            MOMENTS.findIndex((o) => o.mood === m.mood) === i ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={m.mood} src={`/assets/home/mascots/${m.mood}.svg`} alt="" draggable={false} data-on={m.mood === moment.mood ? "" : undefined} />
            ) : null,
          )}
        </div>
      </div>

      {/* The timeline */}
      <div className="day-rail" ref={rail} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
        <div className="day-ruler-window" aria-hidden>
          <div className="day-ruler">
            {MOMENTS.map((m, i) => (
              <span key={m.name}>
                <span className="day-tick-major" data-on={i === index ? "" : undefined} style={{ "--at": i } as CSSProperties} />
                {i < LAST &&
                  Array.from({ length: MINOR }, (_, k) => (
                    <span key={k} className="day-tick-minor" style={{ "--at": i + (k + 1) / (MINOR + 1) } as CSSProperties} />
                  ))}
              </span>
            ))}
          </div>
        </div>

        <div
          className="day-flag"
          role="slider"
          tabIndex={0}
          aria-label="Moment"
          aria-valuemin={0}
          aria-valuemax={LAST}
          aria-valuenow={index}
          aria-valuetext={`${moment.time}, ${moment.name}`}
          aria-controls="day-moment"
          onKeyDown={onKey}
        >
          <svg className="day-flag-shape" viewBox={`0 0 ${FLAG} 72`} width={FLAG} height={72} aria-hidden>
            <path d={flagPath(FLAG)} fill="currentColor" />
          </svg>
          <div className="day-flag-row">
            <button
              type="button"
              className="day-flag-step"
              aria-label="Previous moment"
              aria-disabled={index === 0}
              tabIndex={-1}
              onClick={() => {
                setTouched(true);
                go(index - 1);
              }}
            >
              <svg viewBox="0 0 16 16" aria-hidden>
                <path d="m10 3-5 5 5 5" />
              </svg>
            </button>
            <span className="day-time" aria-hidden>
              <span key={moment.time}>{moment.time}</span>
            </span>
            <button
              type="button"
              className="day-flag-step"
              aria-label="Next moment"
              aria-disabled={index === LAST}
              tabIndex={-1}
              onClick={() => {
                setTouched(true);
                go(index + 1);
              }}
            >
              <svg viewBox="0 0 16 16" aria-hidden>
                <path d="m6 3 5 5-5 5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* The name of the moment, and one line about it */}
      <div className="day-caption" id="day-moment" aria-live="polite">
        {MOMENTS.map((m, i) => (
          <div key={m.name} className="day-caption-item" data-on={i === index ? "" : undefined} aria-hidden={i !== index}>
            <h3 className="day-caption-name">{m.name}</h3>
            <p className="day-caption-line">{m.line}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
