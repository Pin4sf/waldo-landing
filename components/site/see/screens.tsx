"use client";

import Image from "next/image";
import { type CSSProperties, type ReactNode, useContext, useEffect, useRef, useState } from "react";

import { OverviewPlayer, SlideState } from "./overview-player";
import {
  CATCH_UP,
  CHAT,
  HANDOFF,
  HEALTH,
  ITEM_DETAIL,
  RUN_DETAIL,
  type ItemId,
} from "./see-fixture";

// The five app screens of "What you see of it". Real text and layout, set inside the hero's phone
// mockup (the bezel picture over a plain screen). Everything here is presentation: choosing, opening
// and editing only change what is showing in the phone; nothing is sent, approved, moved or recorded.

/** Each part of a screen arrives in turn when its card comes into view (see.css, "Arrival"): n is its place in the order */
const at = (n: number) => ({ "--i": n }) as CSSProperties;

/** The phone: a screen under the bezel picture. Sizes are in the mockup's units (--u = width / 517).
    The status bar (and, on card 1, the Overview header) are the shared Figma mockup's own drawings
    (public/assets/home/phone/phone-status.svg, phone-header-overview.svg, cut from the mockup), laid
    over the screen at the mockup's own size; the other screens draw their own header. */
export function SeePhone({ children, header }: { children: ReactNode; header?: "overview" }) {
  return (
    <div className="see-phone-wrap">
      <div className="see-phone">
        <div className="see-screen">{children}</div>
        {header === "overview" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="see-mock" src="/assets/home/phone/phone-header-overview.svg" alt="" aria-hidden="true" />
        ) : null}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="see-mock" src="/assets/home/phone/phone-status.svg" alt="" aria-hidden="true" />
        <div className="see-bezel" aria-hidden="true" />
      </div>
    </div>
  );
}

function Icon({ name }: { name: "back" | "more" | "panel" | "mic" | "plus" | "copy" | "up" | "down" | "close" | "expand" | "shrink" | "arrow" | "pin" | "moon" | "sun" | "bed" | "chat" | "check" }) {
  const paths: Record<string, ReactNode> = {
    back: <path d="M9 2.5 4.5 7 9 11.5" />,
    more: <><circle cx="3" cy="7" r="1" /><circle cx="7" cy="7" r="1" /><circle cx="11" cy="7" r="1" /></>,
    panel: <><rect x="2" y="2.5" width="10" height="3.6" rx="1.2" /><rect x="2" y="7.9" width="10" height="3.6" rx="1.2" /></>,
    mic: <><rect x="5" y="1.5" width="4" height="7" rx="2" /><path d="M2.8 6.8a4.2 4.2 0 0 0 8.4 0M7 11v1.6" /></>,
    plus: <path d="M7 2.5v9M2.5 7h9" />,
    copy: <><rect x="4.5" y="4.5" width="7" height="7" rx="1.6" /><path d="M2.5 9V4a1.6 1.6 0 0 1 1.6-1.6H9" /></>,
    up: <path d="M4 8.6 6.4 4.2 7.2 2.6c.4-.6 1.2-.2 1 .5l-.5 2.4h2.6c.8 0 1.2.8.9 1.5l-1.1 3.2c-.2.5-.6.8-1.2.8H4Z" />,
    down: <path d="M4 5.4 6.4 9.8 7.2 11.4c.4.6 1.2.2 1-.5l-.5-2.4h2.6c.8 0 1.2-.8.9-1.5L10.1 3.8c-.2-.5-.6-.8-1.2-.8H4Z" />,
    expand: <path d="M2.5 5V3.4A.9.9 0 0 1 3.4 2.5H5M9 2.5h1.6a.9.9 0 0 1 .9.9V5M11.5 9v1.6a.9.9 0 0 1-.9.9H9M5 11.5H3.4a.9.9 0 0 1-.9-.9V9" />,
    shrink: <path d="M5.2 2.4v1.9a.9.9 0 0 1-.9.9H2.4M8.8 2.4v1.9a.9.9 0 0 0 .9.9h1.9M5.2 11.6V9.7a.9.9 0 0 0-.9-.9H2.4M8.8 11.6V9.7a.9.9 0 0 1 .9-.9h1.9" />,
    arrow: <path d="M7 11.5V2.8M3.4 6.4 7 2.8l3.6 3.6" />,
    close: <path d="M3.2 3.2l7.6 7.6M10.8 3.2l-7.6 7.6" />,
    pin: <path d="M5 2.4h4l-.6 3 1.6 1.6H4l1.6-1.6zM7 7v4.6" />,
    moon: <path d="M10.6 8.6A4.6 4.6 0 0 1 5.4 3.4a4.6 4.6 0 1 0 5.2 5.2Z" />,
    sun: <><circle cx="7" cy="7" r="2.3" /><path d="M7 1.4v1.3M7 11.3v1.3M1.4 7h1.3M11.3 7h1.3M3 3l.9.9M10.1 10.1l.9.9M11 3l-.9.9M3.9 10.1 3 11" /></>,
    bed: <path d="M1.8 11V4.2M1.8 8.2h10.4V11M12.2 8.2V6.4a1.6 1.6 0 0 0-1.6-1.6H6.6v3.4M4.2 7a1 1 0 1 0 0-.1Z" />,
    chat: <path d="M2.2 7a4.8 4.8 0 1 1 1.9 3.8L2 11.6l.9-2A4.8 4.8 0 0 1 2.2 7Z" />,
    check: <path d="M3 7.3 5.8 10 11 4.4" />,
  };
  return (
    <svg className="see-icon" viewBox="0 0 14 14" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

/** The bar under a thread's title: the round button, the title, the "more" button */
function Header({ title, left = "panel" }: { title: string; left?: "panel" | "back" }) {
  return (
    <div className="see-head">
      <span className="see-round"><Icon name={left} /></span>
      <b>{title}</b>
      <span className="see-round"><Icon name="more" /></span>
    </div>
  );
}

/** What opens over the lower part of the phone when an item is chosen */
function Sheet({ detail, onClose }: { detail: { title: string; lines: string[]; status: string } | null; onClose: () => void }) {
  if (!detail) return null;
  return (
    <div className="see-sheet" role="dialog" aria-label={detail.title}>
      <div className="see-sheet-top">
        <b>{detail.title}</b>
        <button type="button" className="see-round" aria-label="Close" onClick={onClose}>
          <Icon name="close" />
        </button>
      </div>
      {detail.lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
      <span className="see-pill">{detail.status}</span>
    </div>
  );
}

/** Card 1: the hero's Overview card, writing itself through the day (overview-player.tsx) */
export function OverviewScreen() {
  return (
    <SeePhone header="overview">
      <OverviewPlayer />
    </SeePhone>
  );
}

function Bubble({ from, children, n }: { from: "person" | "waldo"; children: ReactNode; n?: number }) {
  return (
    <p
      className={`${from === "person" ? "see-bubble see-bubble--person" : "see-bubble"}${n === undefined ? "" : " see-turn"}`}
      style={n === undefined ? undefined : at(n)}
    >
      {children}
    </p>
  );
}

function Actions({ n }: { n?: number }) {
  return (
    <div className={n === undefined ? "see-actions" : "see-actions see-turn"} style={n === undefined ? undefined : at(n)} aria-hidden="true">
      <span><Icon name="chat" /></span>
      <span><Icon name="copy" /></span>
      <span><Icon name="up" /></span>
      <span><Icon name="down" /></span>
    </div>
  );
}

/** The follow-up thread, set beside the phone on a wide card and under it on a narrow one */
function FollowUp({ turns, label, open }: { turns: readonly { from: string; text: string }[]; label: string; open?: boolean }) {
  return (
    <div className="see-thread" role="group" aria-label={label} data-open={open ? "" : undefined}>
      {turns.map((turn, k) => (
        <Bubble key={turn.text} from={turn.from as "person" | "waldo"} n={k}>
          {turn.text}
        </Bubble>
      ))}
      <Actions n={turns.length} />
    </div>
  );
}

/** The thread screen: it comes in over the chat, inside the phone, when the replies button is pressed.
    A header like the chat's own (the round-square button, the title), the conversation, and the
    chat's own composer at the foot. The conversation is texted: the lines arrive one at a time (see
    ChatScreen), the person's typed in the composer first, Waldo's after a moment of three dots. */
function ThreadPage({
  open,
  onBack,
  shown,
  dots,
  draft,
  typing,
}: {
  open: boolean;
  onBack: () => void;
  /** How many of the thread's lines are in (the buttons under the last come after them) */
  shown: number;
  /** Waldo is typing: three dots, where his next line will be */
  dots: boolean;
  /** What the person has typed in the composer so far */
  draft: string;
  /** The line the person is typing (its place in the thread), or -1: it grows in its own bubble as it is typed */
  typing: number;
}) {
  const body = useRef<HTMLDivElement>(null);
  const typed = draft.length > 0;
  // The conversation keeps the newest line in view, as a phone does
  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight, behavior: "smooth" });
  }, [shown, dots, typed]);
  const turns = CHAT.thread;
  // The line being typed is the next one in: it is shown, growing, in the place it will sit, and is
  // the very same element once it is sent (same key), so it does not pop in twice
  const lines: { key: string; text: string; from: string; lead: boolean; typing: boolean }[] = turns.slice(0, shown).map((t) => ({
    key: t.text,
    text: t.text,
    from: t.from,
    lead: "lead" in t,
    typing: false,
  }));
  if (typing >= 0 && typing === shown && draft) lines.push({ key: turns[typing].text, text: draft, from: "person", lead: false, typing: true });
  return (
    <div className="see-tw" data-open={open ? "true" : "false"} role="group" aria-label={CHAT.threadLabel} aria-hidden={open ? undefined : true} inert={!open}>
      <div className="see-tw-scrim" aria-hidden="true" />
      <div className="see-tp">
        <div className="see-tp-head">
          <button type="button" className="see-tp-btn" aria-label={CHAT.backLabel} onClick={onBack}>
            <Icon name="back" />
          </button>
          <div>
            <b>Thread</b>
          </div>
          <span className="see-tp-btn" aria-hidden="true">
            <Icon name="more" />
          </span>
        </div>
        <div className="see-tp-body" ref={body}>
          {lines.map((line) => (
            <p
              key={line.key}
              className={`see-ct-in ${line.from === "person" ? "see-ct-person" : line.lead ? "see-ct-waldo see-ct-lead" : "see-ct-waldo"}`}
            >
              {line.text}
              {line.typing ? <i className="see-tp-caret" /> : null}
              {line.lead ? (
                <span className="see-ct-expand" aria-hidden="true">
                  <Icon name="expand" />
                </span>
              ) : null}
            </p>
          ))}
          {dots ? (
            <p className="see-ct-in see-ct-waldo see-ct-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </p>
          ) : null}
          {shown > turns.length ? (
            <div className="see-ct-row see-ct-in" aria-hidden="true">
              <span><Icon name="copy" /></span>
              <span><Icon name="shrink" /></span>
              <span><Icon name="up" /></span>
              <span><Icon name="down" /></span>
            </div>
          ) : null}
        </div>
        <div className="see-tp-composer" aria-hidden="true">
          <span className="see-tp-btn"><Icon name="plus" /></span>
          <span className="see-tp-field" data-typing={draft ? "" : undefined}>
            {draft ? (
              <>
                {draft}
                <i className="see-tp-caret" />
              </>
            ) : (
              "woo, type away…"
            )}
          </span>
          <Icon name="mic" />
          <span className="see-tp-send" data-on={draft ? "" : undefined}><Icon name="arrow" /></span>
        </div>
      </div>
    </div>
  );
}

const sleep = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));
const TYPE_MS = 34;

/** The bands of Suyash's drawing (398 x 813) that arrive one after another, as y ranges. The picture is
    one drawing, so each band is the same picture clipped to its rows and moved on its own; under them a
    patch of the screen's flat colour (#f4f3f0, which the drawing is below y 170) hides the finished
    chat until its parts have arrived. The picture's own x range for the screen is 24 to 373. */
const BANDS = [
  { id: "ask", y: [162, 212] },
  { id: "checked", y: [223, 245] },
  { id: "answer", y: [247, 312] },
  { id: "why", y: [314, 386] },
  { id: "chart", y: [390, 512] },
  { id: "actions", y: [514, 562] },
] as const;
const bandStyle = ([y1, y2]: readonly [number, number]): CSSProperties => ({
  clipPath: `inset(${(y1 / 813) * 100}% 6.28% ${((813 - y2) / 813) * 100}% 6.03%)`,
});

/** Card 2: Suyash's drawing of the chat, played as a real conversation would arrive. His question comes
    in, Waldo's three dots, "Checked last night..." appears, then his answer, the explanation, the chart
    and the buttons with the 7 on the replies button; then a pointer goes to that button, presses it,
    and the thread opens in the same screen, pushed in from the right, and goes on as texting does: the
    person types a line and sends it, three dots, Waldo's answer, a pause, the person types again, three
    dots, his answer, and the buttons under it. The replies button is real too: it opens and closes the
    thread (and plays it again). Phases: 0 closed, 1 the pointer is moving, 2 it presses, 3 the thread
    is open. A card at rest (a neighbour, or with less motion) shows the finished chat, with the thread open. */
export function ChatScreen() {
  const { arrive, inView } = useContext(SlideState);
  const [phase, setPhase] = useState(3);
  // How far the chat has arrived: -1 at rest (the whole picture), then 0 to 6 as its parts come in
  const [intro, setIntro] = useState(-1);
  const [waiting, setWaiting] = useState(false);
  // How many of the thread's lines are in; Waldo's three dots; what is typed in the composer
  const total = CHAT.thread.length + 1;
  const [shown, setShown] = useState(total);
  const [dots, setDots] = useState(false);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(-1);
  const started = useRef(false);
  const run = useRef(0);
  const calm = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // A new arrival starts with the chat empty and the thread closed (and the card at rest is whole and
  // open): decided while rendering, so nothing is ever seen for a frame in the wrong state
  const [was, setWas] = useState(arrive);
  if (arrive !== was) {
    setWas(arrive);
    const play = arrive && !calm();
    setPhase(play ? 0 : 3);
    setIntro(play ? 0 : -1);
  }
  useEffect(() => {
    started.current = false;
  }, [arrive]);

  const reset = (done = true) => {
    run.current += 1;
    setDots(false);
    setDraft("");
    setTyping(-1);
    setWaiting(false);
    if (done) setShown(total);
  };

  // The texting in the thread: from the first line, each time it is opened
  const playThread = () => {
    const mine = ++run.current;
    const alive = () => run.current === mine;
    (async () => {
      setShown(1);
      setDots(false);
      setDraft("");
      setTyping(-1);
      await sleep(900);
      for (const [person, waldo] of [[1, 2], [3, 4]]) {
        const text = CHAT.thread[person].text;
        setTyping(person);
        for (let n = 1; n <= text.length && alive(); n++) {
          setDraft(text.slice(0, n));
          await sleep(TYPE_MS);
        }
        if (!alive()) return;
        await sleep(450);
        setDraft("");
        setShown(person + 1);
        setTyping(-1);
        await sleep(950);
        if (!alive()) return;
        setDots(true);
        await sleep(1500);
        if (!alive()) return;
        setDots(false);
        setShown(waldo + 1);
        await sleep(1300);
        if (!alive()) return;
      }
      setShown(total);
    })();
  };

  // The whole sequence, from the card coming into view
  useEffect(() => {
    if (!arrive || !inView || started.current || calm()) return;
    started.current = true;
    const mine = ++run.current;
    const alive = () => run.current === mine;
    (async () => {
      await sleep(350);
      if (!alive()) return;
      setIntro(1); // his question
      await sleep(900);
      if (!alive()) return;
      setWaiting(true); // Waldo's three dots
      await sleep(1000);
      if (!alive()) return;
      setWaiting(false);
      setIntro(2); // "Checked last night against your 7-night baseline..."
      for (const step of [3, 4, 5, 6]) {
        await sleep(step === 3 ? 700 : step === 4 ? 800 : 750);
        if (!alive()) return;
        setIntro(step); // his answer, the explanation, the chart, the buttons
      }
      await sleep(800);
      if (!alive()) return;
      setPhase(1); // the pointer goes to the replies button
      await sleep(1100);
      if (!alive()) return;
      setPhase(2);
      await sleep(300);
      if (!alive()) return;
      setPhase(3);
      playThread();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrive, inView]);

  // Leaving the card (or it being swapped for a copy) ends whatever was playing
  useEffect(() => {
    if (!arrive) reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrive]);

  const toggle = () => {
    if (phase === 3) {
      reset();
      setPhase(0);
    } else {
      setPhase(3);
      if (calm()) reset();
      else playThread();
    }
  };

  const playing = intro >= 0;
  return (
    <div className="see-phone-wrap">
      <div className="see-form" data-intro={playing ? "" : undefined}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="see-form-img" src={CHAT.asset} alt={CHAT.alt} width={398} height={813} />
        {playing ? (
          <>
            <div className="see-patch" aria-hidden="true" />
            {BANDS.map((band, n) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={band.id}
                className="see-sl"
                data-band={band.id}
                data-in={intro >= n + 1 ? "" : undefined}
                src={CHAT.asset}
                alt=""
                aria-hidden="true"
                style={bandStyle(band.y)}
              />
            ))}
            <div className="see-wait" data-on={waiting ? "" : undefined} aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
          </>
        ) : null}
        <button
          type="button"
          className="see-threads"
          data-press={phase === 2 ? "" : undefined}
          aria-label={phase === 3 ? CHAT.closeLabel : CHAT.openLabel}
          aria-expanded={phase === 3}
          onClick={toggle}
        />
        <svg className="see-cursor" data-phase={phase} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 3.2 19 11l-6.2 1.9 3.9 6.6-3 1.7-3.9-6.7L5.6 18.5Z" />
        </svg>
        <ThreadPage open={phase === 3} onBack={toggle} shown={shown} dots={dots} draft={draft} typing={typing} />
      </div>
    </div>
  );
}

/** One score as a ring: the arc fills clockwise from the top to the value, in the colour of its zone */
function Gauge({ id, name, value, zone, tone, n }: { id: string; name: string; value: number; zone: string; tone: string; n: number }) {
  const grad = `see-g-${id}`;
  return (
    <li className="see-gauge-cell see-in" style={at(n)}>
      <div className="see-gauge" data-tone={tone} role="img" aria-label={`${name} ${value} out of 100, ${zone}`}>
        <svg viewBox="0 0 120 120" aria-hidden="true">
          <defs>
            <linearGradient id={grad} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" className="see-g-from" />
              <stop offset="1" className="see-g-to" />
            </linearGradient>
          </defs>
          <circle className="see-g-well" cx="60" cy="60" r="38" />
          <circle className="see-g-track" cx="60" cy="60" r="47" pathLength="100" />
          <circle className="see-g-arc" cx="60" cy="60" r="47" pathLength="100" strokeDasharray={`${value} 100`} stroke={`url(#${grad})`} />
        </svg>
        <b>{value}</b>
      </div>
      <span className="see-gauge-name">{name}</span>
      <small>{zone}</small>
    </li>
  );
}

/** Card 3: the app's own Health screen. Three scores side by side, then the suggestion with its reasons */
export function HealthScreen() {
  return (
    <SeePhone>
      <Header title="Health" left="back" />
      <ul className="see-gauges">
        {HEALTH.gauges.map((g, k) => (
          <Gauge key={g.id} n={k} {...g} />
        ))}
      </ul>
      <div className="see-card see-plan see-in" style={at(3)}>
        <p className="see-plan-label">{HEALTH.label}</p>
        <div className="see-plan-main">
          <div>
            <b className="see-plan-dist">{HEALTH.distance}</b>
            <span className="see-plan-effort"><i aria-hidden="true" />{HEALTH.effort} · {HEALTH.option}</span>
          </div>
          <span className="see-plan-bars" role="img" aria-label="Effort: easy, 1 of 5">
            {[0, 1, 2, 3, 4].map((n) => (
              <i key={n} data-on={n === 0 ? "" : undefined} style={{ height: `${28 + n * 11}%` }} />
            ))}
          </span>
        </div>
        <p className="see-body">{HEALTH.summary}</p>
        <p className="see-plan-why">{HEALTH.reasonsLabel}</p>
        <ul className="see-why">
          {HEALTH.evidence.map((e, k) => (
            <li key={e.name} className="see-in" style={at(5 + k)}>
              <Image src={`/assets/connectors/${e.source.toLowerCase()}.svg`} alt={e.source} width={22} height={22} unoptimized />
              <b>{e.value}</b>
              <span>{e.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </SeePhone>
  );
}

/** Card 4 */
export function HandoffScreen() {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<string>(HANDOFF.draft);
  return (
    <SeePhone>
      <Header title={HANDOFF.title} />
      <p className="see-lead see-lead--small see-in" style={at(0)}>{HANDOFF.waldo}</p>
      <div className="see-card see-draft see-in" style={at(4)}>
        <dl>
          <div className="see-in" style={at(6)}><dt>To</dt><dd>{HANDOFF.to}</dd></div>
          <div className="see-in" style={at(7)}><dt>Subject</dt><dd>{HANDOFF.subject}</dd></div>
          <div className="see-in" style={at(8)}><dt>Status</dt><dd><span className="see-pill">{HANDOFF.status}</span></dd></div>
        </dl>
        {editing ? (
          <textarea
            className="see-draft-text"
            aria-label="Draft reply to Soundroom"
            value={draft}
            rows={4}
            onChange={(event) => setDraft(event.target.value)}
          />
        ) : (
          <p className="see-draft-text see-in" style={at(9)}>{draft}</p>
        )}
        <button type="button" className="see-edit" onClick={() => setEditing((v) => !v)}>
          {editing ? "Done editing" : "Edit draft"}
        </button>
      </div>
      <p className="see-ask see-in" style={at(12)}>{HANDOFF.question}</p>
      {editing ? <FollowUp turns={HANDOFF.edited} label="Written exchange about the draft" /> : null}
      <div className="see-composer see-in" style={at(14)} aria-hidden="true">
        <span className="see-round"><Icon name="plus" /></span>
        <span className="see-ph">{HANDOFF.placeholder}</span>
        <Icon name="mic" />
      </div>
    </SeePhone>
  );
}

/** Card 5 */
export function CatchUpScreen() {
  const [open, setOpen] = useState<ItemId | "run" | null>(null);
  const [text, setText] = useState("");
  const detail = open === "run" ? RUN_DETAIL : open ? ITEM_DETAIL[open] : null;
  return (
    <SeePhone>
      <div className="see-recap">
        <p className="see-tag see-in" style={at(0)}>{CATCH_UP.label}</p>
        <h4 className="see-serif see-serif--big see-in" style={at(1)}>{CATCH_UP.headline}</h4>
        <p className="see-serif see-serif--text see-in" style={at(3)}>{CATCH_UP.recap}</p>
        <p className="see-small see-in" style={at(6)}>{CATCH_UP.prompt}</p>
        <ul className="see-choices see-in" style={at(7)}>
          {CATCH_UP.choices.map((choice, k) => (
            <li key={choice.text} className="see-in" style={at(8 + k)}>
              <button
                type="button"
                aria-pressed={open === choice.id}
                data-on={open === choice.id ? "" : undefined}
                onClick={() => setOpen(open === choice.id ? null : choice.id)}
              >
                <i aria-hidden="true" />
                {choice.text}
              </button>
            </li>
          ))}
          <li className="see-input see-in" style={at(12)}>
            <input
              type="text"
              value={text}
              placeholder={CATCH_UP.placeholder}
              aria-label="Something else"
              onChange={(event) => setText(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && event.preventDefault()}
            />
            <Icon name="mic" />
            <span className="see-go" aria-hidden="true"><Icon name="arrow" /></span>
          </li>
        </ul>
        <p className="see-note see-in" style={at(13)}>{CATCH_UP.status}</p>
        <div className="see-card see-calendar see-in" style={at(14)}>
          <b>{CATCH_UP.calendar}</b>
          {CATCH_UP.calendarRows.map((row) => (
            <p key={row.what}><em>{row.time}</em> {row.what}</p>
          ))}
        </div>
      </div>
      <Sheet detail={detail} onClose={() => setOpen(null)} />
    </SeePhone>
  );
}
