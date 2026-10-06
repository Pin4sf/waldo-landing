"use client";

import Image from "next/image";
import { type PointerEvent, useCallback, useEffect, useRef, useState } from "react";

// Waldo, texting you while you're on the page (his picture is the same Waldo as in the app's own notifications) (docs/website/pages/waitlist.md, "Waldo's notifications").
// After locky.so: phone-style notifications drop in at the top, the newest in front and the older ones
// tucked behind it, each line typed in. Hover the pile and it fans out. Every line is true: it only uses
// what the page itself can see (your clock, the email box, you leaving the tab). He never claims to have
// read anything of yours. A handful of lines, then quiet: Waldo doesn't nag.
//
// The page says what happened with `waldoSignal("focus" | "joined")`; leaving the tab and coming back is
// noticed here. Shown only while the email form is on screen (`watch`); tapping one takes you to the box.

export type WaldoSignal = "focus" | "joined";

const EVENT = "waldo-signal";

/** Tell Waldo's notifications what just happened on the page */
export function waldoSignal(kind: WaldoSignal) {
  window.dispatchEvent(new CustomEvent<WaldoSignal>(EVENT, { detail: kind }));
}

type Line = { text: string; /** left out once this has happened */ unless?: WaldoSignal | "back" };
type Ping = { id: number; text: string; at: number; leaving?: boolean };

/** How many show at once: one in front, two tucked behind */
const SHOWN = 3;
/** Before the first line, then between lines, in ms */
const FIRST_MS = 1600;
const GAPS_MS = [6500, 7500, 9000, 11000, 12000];
/** One letter of a line, in ms */
const TYPE_MS = 26;
/** A tab has to be away this long for coming back to count, in ms */
const AWAY_MS = 4000;

function clockTime(date: Date) {
  const h = date.getHours();
  const m = String(date.getMinutes()).padStart(2, "0");
  return `${h % 12 || 12}:${m}${h < 12 ? "am" : "pm"}`;
}

/** The first line: the visitor's own time of day, read from their clock */
function greeting(date: Date) {
  const h = date.getHours();
  if (h >= 5 && h < 11) return "morning. good time to get in line.";
  if (h >= 11 && h < 17) return "afternoon. this takes ten seconds.";
  if (h >= 17 && h < 21) return "evening. one small thing before bed.";
  return `it's ${clockTime(date)}. join first, then sleep.`;
}

function script(variant: "default" | "kennel", now: Date): Line[] {
  if (variant === "kennel") {
    return [
      { text: "that was kennel. i'm the rest of it." },
      { text: "your email gets you the mac app first.", unless: "focus" },
      { text: "no password. no card. one email." },
      { text: "no rush. waiting is most of my job." },
    ];
  }
  return [
    { text: greeting(now) },
    { text: "the box wants one email. the real one.", unless: "focus" },
    { text: "that's all i need. no password. no card." },
    { text: "no rush. waiting is most of my job." },
    { text: "your watch has been waiting too." },
  ];
}

const REPLIES: Record<WaldoSignal | "back", (now: Date) => string[]> = {
  focus: () => ["that one. i'll write when it matters."],
  back: () => ["you left. i noticed. it's my thing."],
  joined: (now) => {
    const h = now.getHours();
    const late = h >= 21 || h < 5;
    return ["got you. you're on the list.", late ? "now sleep. i'll write when it's time." : "go on. i'll write when it's your turn."];
  },
};

function ago(at: number, now: number) {
  const m = Math.floor((now - at) / 60000);
  return m < 1 ? "now" : `${m}m ago`;
}

function useCalm() {
  const [calm, setCalm] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Read after mount, so the server's render and the first one here match
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCalm(query.matches);
    const on = () => setCalm(query.matches);
    query.addEventListener("change", on);
    return () => query.removeEventListener("change", on);
  }, []);
  return calm;
}

function PingCard({ ping, depth, now, calm, onOpen, onDismiss }: { ping: Ping; depth: number; now: number; calm: boolean; onOpen: () => void; onDismiss: () => void }) {
  const [typed, setTyped] = useState(calm ? ping.text.length : 0);
  // Swipe up to clear, as on the lock screen: the banner follows the pointer, and goes if it's pulled far enough
  const drag = useRef<{ y: number; moved: boolean } | null>(null);
  const swiped = useRef(false);
  const down = (event: PointerEvent<HTMLButtonElement>) => {
    if (depth > 0) return;
    drag.current = { y: event.clientY, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const move = (event: PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    if (!d) return;
    const dy = Math.min(0, event.clientY - d.y);
    if (dy < -4) d.moved = true;
    event.currentTarget.style.translate = `0 ${dy}px`;
  };
  const up = (event: PointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    drag.current = null;
    event.currentTarget.style.translate = "";
    if (!d) return;
    swiped.current = d.moved;
    if (event.clientY - d.y < -36) onDismiss();
  };
  useEffect(() => {
    if (calm || typed >= ping.text.length) return;
    const id = window.setTimeout(() => setTyped((n) => n + 1), TYPE_MS);
    return () => window.clearTimeout(id);
  }, [calm, typed, ping.text.length]);

  return (
    <div className="ping" data-depth={Math.min(depth, SHOWN)} data-leaving={ping.leaving ? "" : undefined} aria-hidden={depth > 0 ? true : undefined}>
      <button
        type="button"
        className="ping-open"
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onClick={() => {
          if (swiped.current) swiped.current = false;
          else onOpen();
        }}
        tabIndex={depth > 0 ? -1 : 0} aria-label={`Waldo: ${ping.text}`}>
        <span className="ping-icon" aria-hidden="true">
          <Image src="/assets/home/mascots/waldo-card.svg" alt="" width={28} height={22} unoptimized />
        </span>
        <span className="ping-text">
          <span className="ping-head">
            <b>Waldo</b>
            <span>{ago(ping.at, now)}</span>
          </span>
          {/* The whole line is laid out from the start, so the card doesn't grow as it types */}
          <span className="ping-body" aria-hidden="true" data-done={typed >= ping.text.length ? "" : undefined}>
            {ping.text.slice(0, typed)}
            <span className="ping-rest">{ping.text.slice(typed)}</span>
          </span>
        </span>
      </button>
      <button type="button" className="ping-close" onClick={onDismiss} tabIndex={depth > 0 ? -1 : 0} aria-label="Dismiss">
        <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
          <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

export function WaldoPings({ variant = "default", watch, focus }: { variant?: "default" | "kennel"; /** id of what has to be on screen */ watch: string; /** id of the email box */ focus: string }) {
  const calm = useCalm();
  const [pings, setPings] = useState<Ping[]>([]);
  const [now, setNow] = useState(() => Date.now());
  const [visible, setVisible] = useState(true);
  const [awake, setAwake] = useState(true);
  const [tick, setTick] = useState(0);
  const next = useRef(0);
  const lines = useRef<Line[] | null>(null);
  const step = useRef(0);
  const seen = useRef(new Set<WaldoSignal | "back">());
  const done = useRef(false);

  const push = useCallback((text: string) => {
    const id = ++next.current;
    setPings((all) => {
      const kept = [{ id, text, at: Date.now() }, ...all.filter((p) => !p.leaving)];
      // One past the pile slides away behind it, then goes
      return kept.map((p, i) => (i >= SHOWN ? { ...p, leaving: true } : p)).slice(0, SHOWN + 1);
    });
  }, []);

  // Clear out the ones that have finished leaving
  useEffect(() => {
    if (!pings.some((p) => p.leaving)) return;
    const id = window.setTimeout(() => setPings((all) => all.filter((p) => !p.leaving)), 600);
    return () => window.clearTimeout(id);
  }, [pings]);

  // "now" becomes "1m ago"
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 15000);
    return () => window.clearInterval(id);
  }, []);

  // Only while the form is on screen
  useEffect(() => {
    const el = document.getElementById(watch);
    if (!el || !("IntersectionObserver" in window)) return;
    const eye = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "-60px 0px -10% 0px" });
    eye.observe(el);
    return () => eye.disconnect();
  }, [watch]);

  // Leaving the tab pauses him; coming back after a while gets a line
  useEffect(() => {
    let left = 0;
    const onChange = () => {
      if (document.hidden) {
        left = Date.now();
        setAwake(false);
        return;
      }
      setAwake(true);
      if (left && Date.now() - left > AWAY_MS && !seen.current.has("back") && !done.current) {
        seen.current.add("back");
        window.setTimeout(() => REPLIES.back(new Date()).forEach((text) => push(text)), 700);
      }
    };
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, [push]);

  // What the page tells him
  useEffect(() => {
    const onSignal = (event: Event) => {
      const kind = (event as CustomEvent<WaldoSignal>).detail;
      if (seen.current.has(kind) || done.current) return;
      seen.current.add(kind);
      const replies = REPLIES[kind](new Date());
      if (kind === "joined") done.current = true;
      replies.forEach((text, i) => window.setTimeout(() => push(text), 350 + i * 2600));
    };
    window.addEventListener(EVENT, onSignal);
    return () => window.removeEventListener(EVENT, onSignal);
  }, [push]);

  // The lines he'd say anyway, one at a time, while you're here and the form is in view
  useEffect(() => {
    if (!lines.current) lines.current = script(variant, new Date());
    if (!visible || !awake || done.current) return;
    const all = lines.current;
    while (step.current < all.length && all[step.current].unless && seen.current.has(all[step.current].unless!)) step.current += 1;
    if (step.current >= all.length) return;
    const wait = step.current === 0 ? FIRST_MS : GAPS_MS[Math.min(step.current - 1, GAPS_MS.length - 1)];
    const id = window.setTimeout(() => {
      if (done.current) return;
      const line = all[step.current];
      step.current += 1;
      if (line.unless && seen.current.has(line.unless)) {
        setTick((n) => n + 1);
        return;
      }
      push(line.text);
    }, wait);
    return () => window.clearTimeout(id);
  }, [visible, awake, pings.length, tick, variant, push]);

  const open = useCallback(() => {
    const box = document.getElementById(focus) as HTMLInputElement | null;
    if (!box) return;
    box.scrollIntoView({ block: "center", behavior: calm ? "auto" : "smooth" });
    box.focus({ preventScroll: true });
  }, [focus, calm]);

  const dismiss = useCallback((id: number) => {
    setPings((all) => all.map((p) => (p.id === id ? { ...p, leaving: true } : p)));
  }, []);

  const live = pings.filter((p) => !p.leaving);

  return (
    <>
      <div className="pings" data-shown={visible && pings.length ? "" : undefined} data-calm={calm ? "" : undefined} role="region" aria-label="Messages from Waldo">
        {pings.map((ping) => {
          const depth = ping.leaving ? SHOWN : live.indexOf(ping);
          return <PingCard key={ping.id} ping={ping} depth={depth} now={now} calm={calm} onOpen={open} onDismiss={() => dismiss(ping.id)} />;
        })}
      </div>
      {/* The page dims a little while you hover the pile, so the messages are what you're looking at (waitlist.css) */}
      <div className="pings-veil" aria-hidden="true" />
    </>
  );
}
