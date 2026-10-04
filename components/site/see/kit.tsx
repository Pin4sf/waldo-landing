"use client";

import { type CSSProperties, type ReactNode, createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";

import "./phone.css";

// The pieces every screen in "What you see of it" is built from, so the five read as one app
// (docs/website/what-you-see-plan.md, section 19): the phone with a live clock, the header, chips,
// the Waldo button at the foot of every screen, the sheet that rises from the bottom,
// the reply buttons, and the player that plays a screen's script when its card arrives.
// SF Pro only, Notion's quiet palette, no drop shadows, 0.5px lines (plan section 20).

/** What the section tells a slide: is it the one in the middle, is it playing, and the shared brief */
export const SlideState = createContext<{
  active: boolean;
  /** The card has just been brought to the middle (not swapped in for a copy of itself): its screen plays */
  arrive: boolean;
  /** The section is on screen and not held: what a screen that plays by itself waits for */
  inView: boolean;
  running: boolean;
  /** Which part of the day card 1's brief shows (1-based), shared by every copy of the card */
  hero: number;
  setHero: (next: number | ((n: number) => number)) => void;
}>({ active: false, arrive: false, inView: false, running: false, hero: 1, setHero: () => {} });

/** Each part of a screen that rises in when its card arrives (phone.css): n is its place in the order */
export const at = (n: number) => ({ "--i": n }) as CSSProperties;

const calm = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export type IconName =
  | "back" | "more" | "panel" | "mic" | "plus" | "copy" | "up" | "down" | "close" | "arrow" | "pin" | "moon" | "sun"
  | "bed" | "chat" | "check" | "heart" | "calendar" | "coffee" | "watch" | "speak" | "retry" | "thread" | "chevron"
  | "lock" | "flash" | "camera" | "priority" | "pending" | "diamond" | "person" | "run";

/**
  An icon from Suyash's icon set (waldo-icons/, SF Symbols), copied to public/assets/home/icons with each
  glyph re-framed to fill its box. Drawn as a mask so it takes the colour of the text around it.
*/
export function Icon({ name }: { name: IconName }) {
  return <span className="see-icon" data-icon={name} style={{ "--icon": `url(/assets/home/icons/${name}.svg)` } as CSSProperties} aria-hidden="true" />;
}

export function Logo({ name, size = 16 }: { name: string; size?: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="see-logo" src={`/assets/connectors/${name}.svg`} alt="" aria-hidden="true" style={{ "--s": size } as CSSProperties} />;
}

/**
  Text with chips, set the way Suyash's Overview mockup sets them: a white pill with a hairline and a
  coloured mark, sitting in the sentence. [label|tool] uses the connector's logo, [label|icon:name] an
  icon from the set (coloured per icon), [|icon:name] is a round icon-only chip, and [label|go:name] is
  a filled green circle with the icon, followed by plain words.
*/
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[^\]]*\])/).filter(Boolean).map((part, i) => {
        if (!(part.startsWith("[") && part.endsWith("]"))) return part;
        const [label, kind = ""] = part.slice(1, -1).split("|");
        if (kind.startsWith("go:")) {
          return (
            <span key={i} className="see-mention-go">
              <span className="see-go-dot" data-icon={kind.slice(3)}><Icon name={kind.slice(3) as IconName} /></span>
              {label}
            </span>
          );
        }
        const mark = kind.startsWith("icon:") ? <span className="see-mention-icon" data-icon={kind.slice(5)}><Icon name={kind.slice(5) as IconName} /></span> : kind ? <Logo name={kind} size={15} /> : null;
        return (
          <span key={i} className="see-mention" data-only={label ? undefined : ""}>
            {mark}
            {label}
          </span>
        );
      })}
    </>
  );
}

/**
  The phone: the screen under the bezel picture, with the status bar drawn over it (the mockup's icons,
  with the clock set as text so each screen can show its own time). Sizes are in the mockup's units
  (--u = width / 517). The card crops the phone at its bottom edge; the phone measures where that cut
  falls (--cut, in units from the top of the screen), so the Waldo button and the sheets sit at the foot
  of what is visible, as if it were the bottom of the screen.
*/
export function SeePhone({ children, clock, dark, className = "" }: { children: ReactNode; clock?: string; dark?: boolean; className?: string }) {
  const phone = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = phone.current;
    const slide = el?.closest<HTMLElement>(".see-card-slide, .site-visual--panel");
    if (!el || !slide) return;
    const measure = () => {
      const p = el.getBoundingClientRect();
      const s = slide.getBoundingClientRect();
      const u = p.width / 517;
      if (!u) return;
      // 19 units of bezel sit above the screen; never claim more than the screen itself
      const cut = Math.min((s.bottom - p.top) / u - 19, 940);
      el.style.setProperty("--cut", String(Math.round(cut)));
    };
    measure();
    const watch = new ResizeObserver(measure);
    watch.observe(el);
    watch.observe(slide);
    return () => watch.disconnect();
  }, []);
  return (
    <div className="see-phone-wrap">
      <div className={`see-phone ${className}`} ref={phone} data-dark={dark ? "" : undefined}>
        <div className="see-screen">{children}</div>
        <div className="see-status" aria-hidden="true">
          {clock ? <span className="see-clock">{clock}</span> : null}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/home/phone/phone-status-icons.svg" alt="" />
        </div>
        <div className="see-bezel" aria-hidden="true" />
      </div>
    </div>
  );
}

/** The bar under a screen's status bar: a plain icon, the title, a plain icon */
export function AppHeader({ title, left = "back", right = "more", titleKey }: { title: ReactNode; left?: IconName; right?: IconName; titleKey?: string }) {
  return (
    <div className="see-head">
      <span className="see-ghost"><Icon name={left} /></span>
      <b key={titleKey} className={titleKey ? "see-retitle" : undefined}>{title}</b>
      <span className="see-ghost"><Icon name={right} /></span>
    </div>
  );
}

/**
  The Waldo button, on every screen: a plain white bar with Waldo's dog, "Ask Waldo" and a mic. Now and
  then a slow grey shimmer passes over the words. In a chat it is the composer, and shows what is
  being typed; elsewhere it is the way in, and presses in when used.
*/
export function WaldoBar({ typed, placeholder = "Ask Waldo", pressed, onPress, label = "Talk to Waldo", compact }: { typed?: string; placeholder?: string; pressed?: boolean; onPress?: () => void; label?: string; compact?: boolean }) {
  // compact: just Waldo's dog in a round button, for screens that give the room to something else
  const content = compact ? (
    <span className="see-bar-dog" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/home/mascots/waldo-card.svg" alt="" />
    </span>
  ) : (
    <>
      <span className="see-bar-dog" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/home/mascots/waldo-card.svg" alt="" />
      </span>
      <span className="see-bar-text" data-typed={typed ? "" : undefined}>
        {typed ? <>{typed}<i className="see-caret" /></> : <span className="see-shimmer">{placeholder}</span>}
      </span>
      <span className="see-bar-end" data-send={typed ? "" : undefined} aria-hidden="true">
        <Icon name={typed ? "arrow" : "mic"} />
      </span>
    </>
  );
  return (
    <div className="see-bar-wrap" data-compact={compact ? "" : undefined}>
      {onPress ? (
        <button type="button" className="see-bar" data-pressed={pressed ? "" : undefined} aria-label={label} onClick={onPress}>{content}</button>
      ) : (
        <div className="see-bar" data-pressed={pressed ? "" : undefined} aria-hidden="true">{content}</div>
      )}
    </div>
  );
}

/** The sheet that rises from the foot of the screen with the details of something */
export function Toast({ open, title, onClose, children, label }: { open: boolean; title: ReactNode; onClose: () => void; children: ReactNode; label: string }) {
  return (
    <div className="see-toast-wrap" data-open={open ? "" : undefined} aria-hidden={open ? undefined : true} inert={!open}>
      <button type="button" className="see-toast-scrim" tabIndex={-1} aria-label="Close" onClick={onClose} />
      <div className="see-toast" role="dialog" aria-label={label} onKeyDown={(event) => event.key === "Escape" && onClose()}>
        <i className="see-grabber" aria-hidden="true" />
        <div className="see-toast-top">
          <b>{title}</b>
          <button type="button" className="see-close" aria-label="Close" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/** A linked document in a sheet: its app's mark, its name, what it is */
export function DocRow({ name, tool, meta }: { name: string; tool: string; meta: string }) {
  return (
    <span className="see-doc">
      <Logo name={tool} size={20} />
      <span>
        <b>{name}</b>
        <small>{meta}</small>
      </span>
      <Icon name="chevron" />
    </span>
  );
}

/**
  How far along a piece of work is, in the same words on every screen: Checked, Prepared, Needs you,
  Watching, and Done (green, kept for work that was approved and finished)
*/
export function StateTag({ state }: { state: string }) {
  return <span className="see-state" data-state={state.toLowerCase().replace(/\s+/g, "-")}>{state}</span>;
}

/** The buttons under an answer of Waldo's */
export function ReplyButtons() {
  const names: IconName[] = ["copy", "thread", "up", "down", "speak", "retry"];
  return (
    <div className="see-replies" aria-hidden="true">
      {names.map((name) => (
        <span key={name}><Icon name={name} /></span>
      ))}
    </div>
  );
}

/**
  A screen's script: a list of steps, each with how long it holds. When the card arrives (and is on
  screen) it plays from the first step; at rest, or with less motion, it shows the last.
*/
export function useScript(holds: number[]) {
  const { arrive, inView } = useContext(SlideState);
  const total = holds.length;
  const [step, setStep] = useState(total);
  const [was, setWas] = useState(arrive);
  if (arrive !== was) {
    setWas(arrive);
    setStep(arrive && !calm() ? 0 : total);
  }
  useEffect(() => {
    if (!arrive || !inView || step >= total) return;
    const id = window.setTimeout(() => setStep((n) => n + 1), holds[step]);
    return () => window.clearTimeout(id);
  }, [arrive, inView, step, total, holds]);
  return { step, playing: step < total, done: step >= total, total };
}

/** The text of a line being typed, a letter at a time, while `on` */
export function useTyping(text: string, on: boolean, ms = 34) {
  const [n, setN] = useState(0);
  const [was, setWas] = useState(on);
  if (on !== was) {
    setWas(on);
    setN(0);
  }
  useEffect(() => {
    if (!on || n >= text.length) return;
    const id = window.setTimeout(() => setN((k) => k + 1), ms);
    return () => window.clearTimeout(id);
  }, [on, n, text, ms]);
  return on ? text.slice(0, n) : "";
}
