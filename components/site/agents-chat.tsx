"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useLive } from "./use-live";

// The picture for "Works with every agent." (see docs/website/pages/home.md): a text thread with
// Waldo, set and moved the way iMessage does it. You tell him a problem the way you would tell a
// person, no commands and no tags. He reacts to it with a tapback, then answers in one dry line that
// hands each piece to the agent that should have it (Claude, Codex, Cursor: their names in bold,
// nothing else) and keeps what he does himself (the calendar, the inbox, the chasing, your sleep).
//
// What moves is what iMessage moves. The message is typed into the field, and as it is sent the
// bubble leaves the field and rises into the thread on a spring while the older ones lift out of its
// way. The grey bubble with three dots pops in at the corner with its two trailing circles, the dots
// rising one after another; the reply grows out of it. A tapback lands on the corner of the bubble
// with a bounce, its mark does its own small move (the thumb tips, the heart beats, the laugh shakes),
// and the bubble gives a little. Older messages blur away at the top.
//
// It plays by itself, only while it is on screen. Everything is invented (Priya, Maya, PR #184 are the
// homepage story), and nothing in it is a claim about what the product sends or merges.

type Agent = "Claude" | "Codex" | "Cursor";
type Part = string | { agent: Agent };
type Reaction = "up" | "haha" | "heart";

export const SCENES: { you: string; react: Reaction; waldo: Part[] }[] = [
  {
    you: "release is stuck and the notes aren’t written",
    react: "up",
    waldo: [{ agent: "Codex" }, " takes the blocker, ", { agent: "Claude" }, " the notes. I’ll chase Priya."],
  },
  {
    you: "pr 184 is green but nobody’s read it. also i’m double booked at 3",
    react: "haha",
    waldo: [{ agent: "Cursor" }, " reads the PR. The 3pm is mine: the review moves to Thursday."],
  },
  {
    you: "maya wants the quote today. the maths feels off. i slept 5 hours",
    react: "heart",
    waldo: [{ agent: "Claude" }, " drafts, ", { agent: "Codex" }, " checks the maths. I’ll keep your afternoon light."],
  },
  {
    you: "empty state needs a fix and my run is tomorrow",
    react: "up",
    waldo: [{ agent: "Cursor" }, " builds the fix. I’ll swap the tempo for an easy 5k."],
  },
];

type Message = {
  id: number;
  side: "you" | "waldo";
  parts: Part[];
  react?: Reaction;
  /** Arrived while it was playing, so it moves in; the first exchange is simply there */
  fresh?: boolean;
};

const TYPE_MS = 34;
/** The gap between messages, in the frame's units (site.css .site-chat-flow) */
const GAP = 9;

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** The tapback on a bubble: a grey round with two trailing circles toward the bubble, and its mark */
function Tapback({ kind }: { kind: Reaction }) {
  return (
    <span className="site-chat-tapback" data-kind={kind} aria-hidden="true">
      <span className="site-chat-tapback-mark">
        {kind === "haha" ? (
          <b>
            HA
            <br />
            HA
          </b>
        ) : (
          <svg viewBox="0 0 24 24">
            {kind === "up" ? (
              <path d="M1 21h4V9H1v12Zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2Z" />
            ) : (
              <path d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z" />
            )}
          </svg>
        )}
      </span>
    </span>
  );
}

/** The words of a bubble; an agent's name is set in bold, as plain text: no pill, no logo */
function Parts({ parts }: { parts: Part[] }) {
  return (
    <>
      {parts.map((part, i) =>
        typeof part === "string" ? part : (
          <b key={i} className="site-chat-agent">
            {part.agent}
          </b>
        ),
      )}
    </>
  );
}

export function AgentsChat() {
  const root = useRef<HTMLDivElement>(null);
  const flow = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLDivElement>(null);
  // The thread starts as the first exchange ends (and stays that way with less motion); what plays
  // from there is the second scene onwards, coming round to the first again.
  const [messages, setMessages] = useState<Message[]>([
    { id: -2, side: "you", parts: [SCENES[0].you], react: SCENES[0].react },
    { id: -1, side: "waldo", parts: SCENES[0].waldo },
  ]);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState<string | null>(null);
  const live = useLive(root);
  const scene = useRef(1);
  const nextId = useRef(1);

  // Plays only while it is the picture to watch (use-live.ts)

  useEffect(() => {
    if (!live) return;
    let alive = true;
    const push = (m: Omit<Message, "id" | "fresh">) =>
      setMessages((all) => [...all, { ...m, id: nextId.current++, fresh: true }].slice(-4));

    (async () => {
      while (alive) {
        const { you, react, waldo } = SCENES[scene.current % SCENES.length];
        // It is typed into the field
        for (let n = 1; n <= you.length && alive; n++) {
          setDraft(you.slice(0, n));
          await sleep(TYPE_MS);
        }
        await sleep(560);
        if (!alive) return;
        // Sent: the bubble leaves the field and rises into the thread
        setDraft(null);
        push({ side: "you", parts: [you] });
        await sleep(1000);
        if (!alive) return;
        // He reacts to it before he says anything
        setMessages((all) => all.map((m, i) => (i === all.length - 1 ? { ...m, react } : m)));
        await sleep(1100);
        if (!alive) return;
        setTyping(true);
        await sleep(1500);
        if (!alive) return;
        setTyping(false);
        push({ side: "waldo", parts: waldo });
        scene.current += 1;
        await sleep(3200);
      }
    })();

    return () => {
      alive = false;
      setDraft(null);
      setTyping(false);
    };
  }, [live]);

  // A message you send starts at the field: the bubble is put there and let go, on a spring.
  const launch = (el: HTMLDivElement | null) => {
    const bar = field.current;
    if (!el || !bar || el.dataset.launched) return;
    el.dataset.launched = "";
    const unit = el.offsetHeight ? (root.current?.offsetWidth ?? 480) / 480 : 1;
    const lift = el.offsetHeight + GAP * unit;
    const to = el.getBoundingClientRect();
    const from = bar.getBoundingClientRect();
    // The thread is put back where it was and eased up (below), so the bubble starts that far lower too
    const dy = from.top + from.height / 2 - (to.top + to.height / 2) - lift;
    el.style.setProperty("--fly-y", `${dy}px`);
  };

  // When something is added the older messages do not jump up: the thread is put back where it was
  // and eased to its new place.
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
  }, [messages, typing]);

  return (
    <div className="site-chat" ref={root}>
      <div className="site-chat-thread">
        <div className="site-chat-flow" ref={flow}>
          {messages.map((m, i) => {
            const age = messages.length - 1 - i + (typing ? 1 : 0);
            return (
              <div
                key={m.id}
                className="site-chat-msg"
                data-side={m.side}
                data-age={Math.min(age, 4)}
                data-fresh={m.fresh ? "" : undefined}
                ref={m.fresh && m.side === "you" ? launch : undefined}
              >
                <p className="site-chat-bubble" data-reacted={m.react ? "" : undefined}>
                  <Parts parts={m.parts} />
                  {m.react ? <Tapback kind={m.react} /> : null}
                </p>
              </div>
            );
          })}
          {typing ? (
            <div className="site-chat-msg" data-side="waldo" data-age="0" data-fresh="">
              <p className="site-chat-bubble site-chat-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="site-chat-bar">
        <span className="site-chat-plus" aria-hidden="true">
          <svg viewBox="0 0 16 16">
            <path d="M8 2.5v11M2.5 8h11" />
          </svg>
        </span>
        <div className="site-chat-field" ref={field}>
          <p className="site-chat-draft">
            {draft !== null ? (
              <>
                {draft}
                <span className="site-chat-caret" />
              </>
            ) : (
              <span className="site-chat-placeholder">iMessage</span>
            )}
          </p>
          <span className="site-chat-mic" data-on={draft === null ? "" : undefined} aria-hidden="true">
            <svg viewBox="0 0 16 16">
              <rect x="5.6" y="1.6" width="4.8" height="8" rx="2.4" />
              <path d="M3.2 7.6a4.8 4.8 0 0 0 9.6 0M8 12.4v2" />
            </svg>
          </span>
          <span className="site-chat-send" data-on={draft !== null ? "" : undefined} aria-hidden="true">
            <svg viewBox="0 0 16 16">
              <path d="M8 13V3.2M3.6 7.4 8 3l4.4 4.4" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
