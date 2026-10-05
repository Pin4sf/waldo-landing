"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";

import { useLive } from "./use-live";

import "./trust-window.css";

// "Your context. Your call.": one app window that tells one small story about one meeting, in five beats, and
// answers the four questions on the way (what he can see, what he can do, what he keeps, where it goes):
//
//   1 He sees       a calendar he can read and can't change, and the connection behind it
//   2 He asks       two meetings land together; he prepares a move and waits
//   3 You decide    you approve, the meeting moves, and one tap would undo it
//   4 He keeps      he saves a note about you, you correct it, he saves it over
//   5 Where it goes the three services the whole trail passed through
//
// The calendar on the left is the one thing that stays; the card on the right is the beat. It plays by itself
// while it is on screen, one beat after another, and goes round; the five steps along the top are buttons too,
// so you can go straight to one. With less motion nothing moves by itself (it starts on the first beat).
//
// Every line is one the product code backs (docs/website/trust-carousel-review.md): the three Google permissions
// are read-only; a change is a proposal that waits for approval; a saved note is written by Waldo, replaced by
// saving the same note again, and is background, not an instruction; the data sits with Supabase, Anthropic
// writes his replies and Telegram carries his messages. What the code can't back (retention, deletion,
// encryption, "never trained on") is not in it. It is a drawing: nothing here connects to anything. The people
// and meetings are made up.

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
const TYPE_MS = 34;
const CORRECTION = "Mornings are only for focus on Tuesdays and Thursdays.";

const BEATS = [
  {
    rail: "He sees",
    title: "He can see your calendar. He can’t change it.",
    text: "Connect Google and he reads Calendar, Gmail and Tasks. Read only. Editing is a separate permission.",
  },
  {
    rail: "He asks",
    title: "He spots a clash, and asks first.",
    text: "The Northstar call and the Design review land at the same time. He prepares a move and waits. Nothing changes yet.",
  },
  {
    rail: "You decide",
    title: "You say yes. It moves.",
    text: "Approve it, reject it, or undo it in one tap.",
  },
  {
    rail: "He keeps",
    title: "He keeps a note. You can correct it.",
    text: "What he learns is written down in plain words. It’s background, not an instruction from you. Tell him if he has it wrong.",
  },
  {
    rail: "Where it goes",
    title: "That’s the whole trail.",
    text: "Supabase keeps it, Anthropic writes his replies, Telegram carries his messages. Read the rest on the Privacy page.",
  },
] as const;

const HOURS = [9, 10, 11, 12, 13, 14, 15, 16];

function Logo({ name }: { name: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="tw-logo" src={`/assets/connectors/${name}.svg`} alt="" aria-hidden="true" />;
}

function Mask({ name }: { name: string }) {
  return <span className="tw-mask" style={{ "--icon": `url(/assets/home/icons/${name}.svg)` } as CSSProperties} aria-hidden="true" />;
}

type Request = "wait" | "press" | "done";

/** A meeting block: where it starts and how long it runs, in hours, and (for two side by side) which half */
function Block({
  at,
  len,
  half,
  name,
  time,
  tone,
  state,
}: {
  at: number;
  len: number;
  half?: "l" | "r";
  name: string;
  time: string;
  tone?: "ink" | "soft";
  state?: "ghost" | "gone" | "held";
}) {
  return (
    <div className="tw-block" data-tone={tone ?? "soft"} data-half={half} data-state={state} data-short={len < 1 ? "" : undefined} style={{ "--at": at - 9, "--len": len } as CSSProperties}>
      <b>{name}</b>
      <small>{time}</small>
    </div>
  );
}

export function TrustWindow() {
  const root = useRef<HTMLDivElement>(null);
  const live = useLive(root);
  const [beat, setBeat] = useState(0);
  const [request, setRequest] = useState<Request>("wait");
  const [note, setNote] = useState<"old" | "new">("old");
  const [draft, setDraft] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [typing, setTyping] = useState(false);
  const [replied, setReplied] = useState(false);

  // The window arrives once, when it first comes into view
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    el.setAttribute("data-armed", "");
    const watch = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        el.setAttribute("data-seen", "");
        watch.disconnect();
      },
      { threshold: 0.3 },
    );
    watch.observe(el);
    return () => watch.disconnect();
  }, []);

  // The story: each beat plays its own small scene, then the next one starts; after the last it goes round
  useEffect(() => {
    if (!live) return;
    let alive = true;
    (async () => {
      if (beat === 0) {
        setRequest("wait");
        setNote("old");
        setSent(false);
        setReplied(false);
        await sleep(5200);
      } else if (beat === 1) {
        setRequest("wait");
        await sleep(4600);
      } else if (beat === 2) {
        setRequest("wait");
        await sleep(1700);
        if (!alive) return;
        setRequest("press");
        await sleep(450);
        if (!alive) return;
        setRequest("done");
        await sleep(3600);
      } else if (beat === 3) {
        setRequest("done");
        setNote("old");
        setSent(false);
        setReplied(false);
        await sleep(2000);
        for (let n = 1; n <= CORRECTION.length && alive; n++) {
          setDraft(CORRECTION.slice(0, n));
          await sleep(TYPE_MS);
        }
        await sleep(450);
        if (!alive) return;
        setDraft(null);
        setSent(true);
        await sleep(700);
        if (!alive) return;
        setTyping(true);
        await sleep(1200);
        if (!alive) return;
        setTyping(false);
        setReplied(true);
        setNote("new");
        await sleep(3200);
      } else {
        setRequest("done");
        setNote("new");
        await sleep(5600);
      }
      if (alive) setBeat((b) => (b + 1) % BEATS.length);
    })();
    return () => {
      alive = false;
      setDraft(null);
      setTyping(false);
    };
  }, [live, beat]);

  // What the calendar shows follows the story
  const done = beat >= 3 || (beat === 2 && request === "done");
  const asking = beat === 1 || (beat === 2 && request !== "done");
  const copy = BEATS[beat];

  return (
    <div className="tw" ref={root} data-live={live ? "" : undefined} data-beat={beat}>
      <div className="tw-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>
          <b>Waldo</b>
          <small>Your context</small>
        </span>
      </div>

      <div className="tw-steps tw-in" role="group" aria-label="The story, in five steps" style={{ "--i": 0 } as CSSProperties}>
        {BEATS.map((b, i) => (
          <button
            key={b.rail}
            type="button"
            className="tw-step"
            data-state={i === beat ? "now" : i < beat ? "past" : undefined}
            aria-current={i === beat ? "step" : undefined}
            onClick={() => setBeat(i)}
          >
            <i aria-hidden="true">{i < beat ? <Mask name="check" /> : i + 1}</i>
            <span>{b.rail}</span>
          </button>
        ))}
      </div>

      <div className="tw-words" aria-live="polite">
        <h3 key={`t${beat}`} className="tw-title">
          {copy.title}
        </h3>
        <p key={`p${beat}`} className="tw-text">
          {copy.text}
        </p>
      </div>

      <div className="tw-stage">
        {/* The one thing that stays: your calendar, today and Thursday */}
        <div
          className="tw-cal tw-in"
          style={{ "--i": 1 } as CSSProperties}
          role="img"
          aria-label="Your calendar, Tuesday 13 and Thursday 15. Tuesday has a standup, a one-to-one, and the Northstar call and the Design review at the same time."
        >
          <div className="tw-cal-head">
            <span className="tw-cal-title">
              <Mask name="calendar" />
              Calendar
            </span>
            <span className="tw-chip">
              <Mask name="lock" />
              Read only
            </span>
          </div>
          <div className="tw-cal-body">
            <ol className="tw-gutter" aria-hidden="true">
              {HOURS.map((h) => (
                <li key={h}>{h}:00</li>
              ))}
            </ol>
            <div className="tw-day" aria-hidden="true">
              <span className="tw-day-name">
                Tue <b>13</b>
              </span>
              <div className="tw-day-col">
                <Block at={9.5} len={0.5} name="Standup" time="9:30" />
                <Block at={11} len={0.5} name="1:1 with Priya" time="11:00" />
                <Block at={15} len={1} half="l" name="Northstar call" time="15:00" tone="ink" />
                <Block at={15} len={1} half="r" name="Design review" time="15:00" state={done ? "gone" : asking ? "held" : undefined} />
                <span className="tw-scan" />
              </div>
            </div>
            <div className="tw-day" aria-hidden="true">
              <span className="tw-day-name">
                Thu <b>15</b>
              </span>
              <div className="tw-day-col">
                <span className="tw-focus" data-on={beat >= 3 && note === "new" ? "" : undefined}>
                  Focus
                </span>
                <Block at={14} len={1} name="Design review" time="14:00" state={done ? undefined : asking ? "ghost" : "gone"} />
                <span className="tw-scan" />
              </div>
            </div>
          </div>
        </div>

        {/* The beat: a card on the right */}
        <div className="tw-beatcard">
          {beat === 0 ? (
            <div key="sees" className="tw-card tw-pop">
              <div className="tw-card-top">
                <span className="tw-card-kind">What he sees</span>
                <span className="tw-chip" data-dot="green">
                  <i aria-hidden="true" />
                  Connected
                </span>
              </div>
              <div className="tw-who">
                <span className="tw-logos" aria-hidden="true">
                  <Logo name="google-calendar" />
                  <Logo name="gmail" />
                </span>
                <span className="tw-who-text">
                  <b>Google</b>
                  <small>m•••••@gmail.com</small>
                </span>
              </div>
              <ul className="tw-scopes">
                {["Calendar", "Gmail", "Tasks"].map((name, i) => (
                  <li key={name} style={{ "--i": i } as CSSProperties}>
                    <b>{name}</b>
                    <span>read only</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {beat === 1 || beat === 2 ? (
            <div key="asks" className="tw-card tw-pop" data-state={request === "done" ? "done" : undefined}>
              <div className="tw-card-top">
                <span className="tw-card-kind">What he does</span>
                <span className="tw-chip" data-dot={request === "done" ? "green" : "orange"}>
                  <i aria-hidden="true" />
                  {request === "done" ? "Done" : "Waiting for you"}
                </span>
              </div>
              <p className="tw-req-title">{request === "done" ? "Design review is now Thursday, 14:00." : "Move Design review to Thursday, 14:00."}</p>
              <small className="tw-req-sub">{request === "done" ? "Calendar · one event moved" : "Calendar · one event · nothing moves until you say yes"}</small>
              <div className="tw-req-actions">
                {request === "done" ? (
                  <span className="tw-btn" data-quiet="">
                    <Mask name="retry" />
                    Undo
                  </span>
                ) : (
                  <>
                    <span className="tw-btn" data-primary="" data-press={request === "press" ? "" : undefined}>
                      Approve
                    </span>
                    <span className="tw-btn" data-quiet="">
                      Reject
                    </span>
                  </>
                )}
              </div>
            </div>
          ) : null}

          {beat === 3 ? (
            <div key="keeps" className="tw-card tw-pop">
              <div className="tw-card-top">
                <span className="tw-card-kind">What he keeps</span>
                <span className="tw-chip">Written by Waldo</span>
              </div>
              <p key={note} className="tw-note-text" data-fresh={note === "new" ? "" : undefined}>
                {note === "new" ? "Keeps Tuesday and Thursday mornings for focus." : "Keeps mornings for focus work."}
              </p>
              <small className="tw-req-sub">{note === "new" ? "Updated just now" : "Updated Tue 13 Oct"} · background, not an instruction</small>
              <div className="tw-field" data-typing={draft !== null ? "" : undefined}>
                <span>{draft !== null ? draft : sent ? "" : "Tell Waldo what to change"}</span>
                <i className="tw-send" data-on={draft !== null ? "" : undefined} aria-hidden="true">
                  <svg viewBox="0 0 14 16">
                    <path d="M7 14V2.5M2.5 7 7 2.5 11.5 7" />
                  </svg>
                </i>
              </div>
              <div className="tw-talk">
                {sent ? <p className="tw-bubble tw-bubble--you">{CORRECTION}</p> : null}
                {typing ? (
                  <p className="tw-bubble tw-bubble--waldo tw-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </p>
                ) : null}
                {replied ? <p className="tw-bubble tw-bubble--waldo">Got it. I&rsquo;ll save that over the old note.</p> : null}
              </div>
            </div>
          ) : null}

          {beat === 4 ? (
            <div key="goes" className="tw-card tw-pop">
              <div className="tw-card-top">
                <span className="tw-card-kind">Where it goes</span>
                <span className="tw-chip">Policy in draft</span>
              </div>
              <ul className="tw-services">
                {[
                  { key: "supabase", logo: "supabase", name: "Supabase", text: "Stores your account, readings, calendar and message timing, notes and chats." },
                  { key: "anthropic", logo: "claude", name: "Anthropic", text: "Writes his replies from the context each message needs." },
                  { key: "telegram", logo: "telegram", name: "Telegram", text: "Carries his messages, if you chat there." },
                ].map((s, i) => (
                  <li key={s.key} style={{ "--i": i } as CSSProperties}>
                    <Logo name={s.logo} />
                    <span>
                      <b>{s.name}</b>
                      {s.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
