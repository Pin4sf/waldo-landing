"use client";

import { type RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";

import { useLive } from "./use-live";

// The three pictures for "Same Waldo. Different hats." (see docs/website/pages/home.md): the same
// kind of thread as "Works with every agent" (agents-chat.tsx), but in the place each person would
// actually have it. The founder texts him on WhatsApp while travelling, the engineer asks him from the
// terminal, the investor talks to him from a watch. You say it the way you would tell a person, and he
// answers in one dry line.
//
// What you send is not only words: a photo of the departures board, a voice note, a clip of a hotel
// room, a screenshot of a red build, a slide from the deck. Each channel shares media the way it
// really does (a thumbnail in the bubble, a waveform you can see recorded, a file chip in the prompt).
//
// Each one plays by itself, only while it is on screen, and holds its first exchange (finished) for
// anyone who asks for less motion. Everything in them is invented (Priya, PR #212, pitch five are the
// homepage story), and nothing is a claim about what the product sends, books or merges.

type Agent = "Claude" | "Codex" | "Cursor";
type Part = string | { agent: Agent };
type Art = "board" | "room" | "slide";
type Media =
  | { kind: "image"; art: Art }
  | { kind: "video"; art: Art; secs: number }
  | { kind: "voice"; secs: number; bars: number[] };

const TYPE_MS = 34;

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
const clock = (s: number) => `0:${String(s).padStart(2, "0")}`;

/** When something is added the older messages do not jump up: the thread is put back and eased up */
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

/** The words of a reply; an agent's name is set in bold, as plain text: no pill, no logo */
function Parts({ parts }: { parts: Part[] }) {
  return (
    <>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          part
        ) : (
          <b key={i} className="hats-agent">
            {part.agent}
          </b>
        ),
      )}
    </>
  );
}

const PLAY = (
  <svg viewBox="0 0 10 12" aria-hidden="true">
    <path d="M1 .8v10.4L9.4 6 1 .8Z" />
  </svg>
);

/** Real photos for the departures board and the hotel room (Unsplash, free to use; credits in docs/website/pages/home.md);
 *  the slide is still drawn until a real one is dropped in. */
const PHOTOS: Partial<Record<Art, { src: string; at: string; ratio: string }>> = {
  board: { src: "/assets/home/hats/departures-board.jpg", at: "50% 70%", ratio: "1 / 1" },
  room: { src: "/assets/home/hats/hotel-room.jpg", at: "50% 60%", ratio: "3 / 2" },
};

function Pic({ art }: { art: Art }) {
  const photo = PHOTOS[art];
  if (photo)
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={photo.src} alt="" className="hats-pic hats-pic--photo" style={{ objectPosition: photo.at, aspectRatio: photo.ratio }} />
    );
  return (
    <svg viewBox="0 0 200 130" className="hats-pic" aria-hidden="true">
      <rect width="200" height="130" fill="#fafaf8" />
      <rect x="16" y="16" width="96" height="9" rx="2" fill="#1a1a1a" />
      <rect x="16" y="32" width="64" height="5" rx="2" fill="#c4c4c0" />
      <rect x="22" y="78" width="22" height="34" rx="2" fill="#d6d6d2" />
      <rect x="54" y="66" width="22" height="46" rx="2" fill="#d6d6d2" />
      <rect x="86" y="54" width="22" height="58" rx="2" fill="#d6d6d2" />
      <rect x="118" y="40" width="22" height="72" rx="2" fill="#f97316" />
      <rect x="150" y="60" width="22" height="52" rx="2" fill="#d6d6d2" />
    </svg>
  );
}

/** A shared photo, or a clip: the same picture with a play button and its length */
function Still({ art, secs }: { art: Art; secs?: number }) {
  return (
    <span className="hats-still">
      <Pic art={art} />
      {secs !== undefined ? (
        <>
          <span className="hats-still-play">{PLAY}</span>
          <small>{clock(secs)}</small>
        </>
      ) : null}
    </span>
  );
}

/** A recorded voice note: play, the shape of what was said, how long it ran */
function Voice({ secs, bars }: { secs: number; bars: number[] }) {
  return (
    <span className="hats-voice">
      {PLAY}
      <span className="hats-voice-bars">
        {bars.map((h, n) => (
          <i key={n} style={{ height: `${h * 5}%` }} />
        ))}
      </span>
      <small>{clock(secs)}</small>
    </span>
  );
}

const bars = (...heights: number[]) => heights;

/* ── 1 · Founder, on WhatsApp ───────────────────────────────────────────────────────────────────── */

const FOUNDER: { time: string; media: Media; waldo: string }[] = [
  {
    time: "8:12",
    media: { kind: "image", art: "board" },
    waldo: "Seven o’clock now. The 9am with Priya moves to 11, and a car’s booked for 9:40pm.",
  },
  {
    time: "8:31",
    media: { kind: "voice", secs: 6, bars: bars(4, 9, 14, 8, 17, 11, 6, 15, 10, 5, 13, 8, 16, 7, 12, 6, 9, 4, 11, 5) },
    waldo: "Held the quieter one, ten minutes on foot from the venue. It has a desk. Say the word and it’s yours.",
  },
  {
    time: "8:47",
    media: { kind: "video", art: "room", secs: 12 },
    waldo: "Not the one I held. That room has the desk and the window on the courtyard.",
  },
];

type WaMessage = { id: number; side: "you" | "waldo"; text?: string; media?: Media; time: string; read?: boolean; fresh?: boolean };

const WA_TICK = (
  <svg viewBox="0 0 16 11" aria-hidden="true">
    <path d="M1 5.8 4.2 9 10.4 1.8M5.6 7.6 6.6 8.6 12.8 1.4" />
  </svg>
);

/** The founder, travelling, sending Waldo a photo, a voice note and a clip in WhatsApp */
export function FounderWhatsApp() {
  const root = useRef<HTMLDivElement>(null);
  const flow = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLDivElement>(null);
  const live = useLive(root);
  const [messages, setMessages] = useState<WaMessage[]>([
    { id: -2, side: "you", media: FOUNDER[0].media, time: FOUNDER[0].time, read: true },
    { id: -1, side: "waldo", text: FOUNDER[0].waldo, time: FOUNDER[0].time },
  ]);
  const [typing, setTyping] = useState(false);
  // What is in the field while it is being sent: a clip or photo picked, or a voice note being recorded
  const [attach, setAttach] = useState<Media | null>(null);
  const [rec, setRec] = useState<number | null>(null);
  const scene = useRef(1);
  const nextId = useRef(1);

  useEffect(() => {
    if (!live) return;
    let alive = true;
    const push = (m: Omit<WaMessage, "id" | "fresh">) =>
      setMessages((all) => [...all, { ...m, id: nextId.current++, fresh: true }].slice(-4));
    (async () => {
      while (alive) {
        const { media, waldo, time } = FOUNDER[scene.current % FOUNDER.length];
        if (media.kind === "voice") {
          for (let s = 0; s <= media.secs && alive; s++) {
            setRec(s);
            await sleep(560);
          }
          setRec(null);
        } else {
          setAttach(media);
          await sleep(1500);
          setAttach(null);
        }
        if (!alive) return;
        push({ side: "you", media, time });
        await sleep(900);
        if (!alive) return;
        // He has seen it: the ticks go blue, and he starts to write
        setMessages((all) => all.map((m, i) => (i === all.length - 1 ? { ...m, read: true } : m)));
        await sleep(800);
        if (!alive) return;
        setTyping(true);
        await sleep(1700);
        if (!alive) return;
        setTyping(false);
        push({ side: "waldo", text: waldo, time });
        scene.current += 1;
        await sleep(3400);
      }
    })();
    return () => {
      alive = false;
      setAttach(null);
      setRec(null);
      setTyping(false);
    };
  }, [live]);

  useLift(flow, [messages, typing]);

  // What you send leaves the field and rises into the thread, from where it was made
  const launch = (el: HTMLDivElement | null) => {
    const bar = field.current;
    if (!el || !bar || el.dataset.launched) return;
    el.dataset.launched = "";
    const unit = el.offsetHeight ? (root.current?.offsetWidth ?? 480) / 480 : 1;
    const lift = el.offsetHeight + 8 * unit;
    const to = el.getBoundingClientRect();
    const from = bar.getBoundingClientRect();
    el.style.setProperty("--fly-y", `${from.top + from.height / 2 - (to.top + to.height / 2) - lift}px`);
  };

  return (
    <div className="hats hats-wa" ref={root}>
      <div className="hats-wa-head">
        <span className="hats-wa-avatar">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/home/mascots/waldo-card.svg" alt="" />
        </span>
        <span className="hats-wa-who">
          <b>Waldo</b>
          {typing ? <small>typing…</small> : null}
        </span>
        <span className="hats-wa-more" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </div>

      <div className="hats-thread">
        <div className="hats-flow" ref={flow}>
          <span className="hats-wa-day">Today</span>
          {messages.map((m, i) => (
            <div
              key={m.id}
              className="hats-msg"
              data-side={m.side}
              data-age={Math.min(messages.length - 1 - i, 3)}
              data-fresh={m.fresh ? "" : undefined}
              ref={m.fresh && m.side === "you" ? launch : undefined}
            >
              <p
                className="hats-wa-bubble"
                data-media={m.media && m.media.kind !== "voice" ? "" : undefined}
                data-voice={m.media?.kind === "voice" ? "" : undefined}
              >
                {m.media?.kind === "voice" ? (
                  <>
                    <span className="hats-wa-voice">
                      <span className="hats-wa-play">{PLAY}</span>
                      <span className="hats-wa-wave">
                        <u />
                        {Array.from({ length: 30 }, (_, n) => (
                          <i key={n} style={{ height: `${Math.max(18, (m.media as { bars: number[] }).bars[(n * 7) % (m.media as { bars: number[] }).bars.length] * 5)}%` }} />
                        ))}
                      </span>
                      <span className="hats-wa-vav">
                        <svg className="hats-wa-who-icon" viewBox="0 0 24 24">
                          <circle cx="12" cy="9" r="4.2" />
                          <path d="M3.5 24c.6-5 4-8 8.5-8s7.9 3 8.5 8Z" />
                        </svg>
                        <svg className="hats-wa-vmic" viewBox="0 0 16 16">
                          <rect x="5.6" y="1.6" width="4.8" height="8" rx="2.4" />
                          <path d="M3.2 7.6a4.8 4.8 0 0 0 9.6 0M8 12.4v2" />
                        </svg>
                      </span>
                    </span>
                    <small className="hats-wa-vdur">{clock(m.media.secs)}</small>
                  </>
                ) : null}
                {m.media && m.media.kind !== "voice" ? (
                  <Still art={m.media.art} secs={m.media.kind === "video" ? m.media.secs : undefined} />
                ) : null}
                {m.text}
                <span className="hats-wa-meta">
                  {m.time}
                  {m.side === "you" ? (
                    <span className="hats-wa-ticks" data-read={m.read ? "" : undefined}>
                      {WA_TICK}
                    </span>
                  ) : null}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="hats-wa-bar">
        <span className="hats-wa-plus" aria-hidden="true">
          <svg viewBox="0 0 16 16">
            <path d="M8 2.5v11M2.5 8h11" />
          </svg>
        </span>
        <div className="hats-wa-field" ref={field}>
          {rec !== null ? (
            <p className="hats-wa-rec">
              <i />
              <time>{clock(rec)}</time>
              <span>‹ Slide to cancel</span>
            </p>
          ) : attach && attach.kind !== "voice" ? (
            <p className="hats-wa-picked">
              <span>
                <Pic art={attach.art} />
              </span>
              {attach.kind === "video" ? "Video" : "Photo"}
            </p>
          ) : (
            <p>
              <span className="hats-wa-placeholder">Message</span>
            </p>
          )}
          <svg className="hats-wa-smile" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9.5" />
            <path d="M8.5 14c1 1.6 2.2 2.3 3.5 2.3s2.5-.7 3.5-2.3M9 9.6v.8M15 9.6v.8" />
          </svg>
        </div>
        <span className="hats-wa-send" data-on={attach ? "" : undefined} data-rec={rec !== null ? "" : undefined} aria-hidden="true">
          <svg viewBox="0 0 16 16" className="hats-wa-mic">
            <rect x="5.6" y="1.6" width="4.8" height="8" rx="2.4" />
            <path d="M3.2 7.6a4.8 4.8 0 0 0 9.6 0M8 12.4v2" />
          </svg>
          <svg viewBox="0 0 16 16" className="hats-wa-go">
            <path d="M2 2.2 14 8 2 13.8l1.6-5.2L9 8 3.6 7.4 2 2.2Z" />
          </svg>
        </span>
      </div>
    </div>
  );
}

/* ── 2 · Engineer, in the terminal ──────────────────────────────────────────────────────────────── */

type File = { kind: "image" | "video"; name: string };

const ENGINEER: { you: string; file: File; waldo: Part[] }[] = [
  {
    you: "pr 212 is red and standup ate my deep work",
    file: { kind: "image", name: "ci-red.png" },
    waldo: [{ agent: "Codex" }, " takes the failing check. Standup moves to 11:30, so 9 to 11 is yours."],
  },
  {
    you: "migration fails in staging. i slept 5 hours",
    file: { kind: "video", name: "repro.mov · 0:08" },
    waldo: [{ agent: "Codex" }, " reruns it with the fix. The review moves to tomorrow, when you’ll be sharper."],
  },
];

type CliLine = { id: number; kind: "you" | "waldo" | "work"; parts: Part[]; file?: File; fresh?: boolean };

/** A file attached to a command: a small chip with what it is and what it is called */
function Chip({ file }: { file: File }) {
  return (
    <span className="hats-cli-chip">
      {file.kind === "video" ? (
        PLAY
      ) : (
        <svg viewBox="0 0 12 12" aria-hidden="true">
          <rect x="1" y="1.6" width="10" height="8.8" rx="1.6" />
          <path d="m1.6 9 3-3 2 2 1.4-1.4L10.4 9" />
        </svg>
      )}
      {file.name}
    </span>
  );
}

/** The engineer asking Waldo from the terminal, with a screenshot and a screen recording */
export function EngineerCli() {
  const root = useRef<HTMLDivElement>(null);
  const flow = useRef<HTMLDivElement>(null);
  const live = useLive(root);
  const [lines, setLines] = useState<CliLine[]>([
    { id: -2, kind: "you", parts: [ENGINEER[0].you], file: ENGINEER[0].file },
    { id: -1, kind: "waldo", parts: ENGINEER[0].waldo },
  ]);
  const [draft, setDraft] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const scene = useRef(1);
  const nextId = useRef(1);

  useEffect(() => {
    if (!live) return;
    let alive = true;
    const push = (l: Omit<CliLine, "id" | "fresh">) =>
      setLines((all) => [...all, { ...l, id: nextId.current++, fresh: true }].slice(-4));
    (async () => {
      while (alive) {
        const { you, file: attached, waldo } = ENGINEER[scene.current % ENGINEER.length];
        for (let n = 1; n <= you.length && alive; n++) {
          setDraft(you.slice(0, n));
          await sleep(TYPE_MS);
        }
        await sleep(300);
        if (!alive) return;
        // The file is dropped onto the prompt
        setFile(attached);
        await sleep(900);
        if (!alive) return;
        setDraft(null);
        setFile(null);
        push({ kind: "you", parts: [you], file: attached });
        await sleep(300);
        if (!alive) return;
        push({ kind: "work", parts: [] });
        await sleep(1700);
        if (!alive) return;
        // The line that was working becomes his answer
        setLines((all) => all.filter((l) => l.kind !== "work"));
        push({ kind: "waldo", parts: waldo });
        scene.current += 1;
        await sleep(3400);
      }
    })();
    return () => {
      alive = false;
      setDraft(null);
      setFile(null);
      setLines((all) => all.filter((l) => l.kind !== "work"));
    };
  }, [live]);

  useLift(flow, [lines]);

  return (
    <div className="hats hats-cli" ref={root}>
      <div className="hats-cli-head">
        <i />
        <i />
        <i />
        <span>waldo · ~/api</span>
      </div>

      <div className="hats-thread">
        <div className="hats-flow" ref={flow}>
          {lines.map((l, i) => (
            <p
              key={l.id}
              className="hats-cli-line"
              data-kind={l.kind}
              data-age={Math.min(lines.length - 1 - i, 3)}
              data-fresh={l.fresh ? "" : undefined}
            >
              {l.kind === "you" ? <span className="hats-cli-prompt">❯</span> : <span className="hats-cli-dot">●</span>}
              {l.kind === "work" ? (
                <>
                  <i className="hats-cli-spin" />
                  Working
                </>
              ) : (
                <span>
                  {l.kind === "you" ? <span className="hats-cli-cmd">waldo </span> : null}
                  <Parts parts={l.parts} />
                  {l.file ? <Chip file={l.file} /> : null}
                </span>
              )}
            </p>
          ))}
        </div>
      </div>

      <div className="hats-cli-bar">
        <span className="hats-cli-prompt">❯</span>
        <p>
          {draft !== null ? (
            <>
              <span className="hats-cli-cmd">waldo</span> {draft}
              {file ? <Chip file={file} /> : null}
            </>
          ) : null}
          <span className="hats-cli-caret" />
        </p>
      </div>
    </div>
  );
}

/* ── 3 · Investor, on an Apple Watch ────────────────────────────────────────────────────────────── */

const INVESTOR: { media: Media; waldo: string }[] = [
  {
    media: { kind: "voice", secs: 5, bars: bars(4, 9, 14, 8, 17, 11, 6, 15, 10, 5, 13, 8, 4) },
    waldo: "Pitch five moves to Thursday. Pitch four keeps the full hour.",
  },
  {
    media: { kind: "image", art: "slide" },
    waldo: "Slide six has last quarter’s number. Flagged before pitch five.",
  },
];

type WatchMessage = { id: number; side: "you" | "waldo"; media?: Media; text?: string; fresh?: boolean; status?: "Delivered" | "Read" };
/** The three screens a voice note goes through in watchOS Messages: the thread, the "+" menu, recording */
type WatchView = "thread" | "menu" | "rec";
type Press = "plus" | "audio" | "send" | null;

/** How tall each bar of the live waveform runs, as a share of its full height */
const LEVELS = [0.3, 0.45, 0.35, 0.7, 0.5, 0.85, 0.4, 0.6, 1, 0.55, 0.75, 0.35, 0.9, 0.5, 0.65, 0.4, 0.8, 0.45, 0.6, 0.3];

const BACK = (
  <svg viewBox="0 0 9 15" aria-hidden="true">
    <path d="M7.5 1.5 2 7.5l5.5 6" />
  </svg>
);

/** The investor sending Waldo a voice note, and a slide, from an Apple Watch, in watchOS's own Messages */
export function InvestorWatch() {
  const root = useRef<HTMLDivElement>(null);
  const flow = useRef<HTMLDivElement>(null);
  const live = useLive(root);
  const [messages, setMessages] = useState<WatchMessage[]>([
    { id: -2, side: "you", media: INVESTOR[0].media, status: "Read" },
    { id: -1, side: "waldo", text: INVESTOR[0].waldo },
  ]);
  const [view, setView] = useState<WatchView>("thread");
  const [press, setPress] = useState<Press>(null);
  const [typing, setTyping] = useState(false);
  const scene = useRef(1);
  const nextId = useRef(1);

  useEffect(() => {
    if (!live) return;
    let alive = true;
    const push = (m: Omit<WatchMessage, "id" | "fresh">) =>
      setMessages((all) =>
        [...all.map((x) => (m.side === "you" ? { ...x, status: undefined } : x)), { ...m, id: nextId.current++, fresh: true }].slice(-3),
      );
    // The receipt under the last thing you sent: Delivered, then Read
    const mark = (status: "Delivered" | "Read") =>
      setMessages((all) => {
        const at = all.map((x) => x.side).lastIndexOf("you");
        return all.map((x, i) => (i === at ? { ...x, status } : x));
      });
    (async () => {
      while (alive) {
        const { media, waldo } = INVESTOR[scene.current % INVESTOR.length];
        if (media.kind === "voice") {
          // "+", then Audio, then it records, then the arrow sends it
          setPress("plus");
          await sleep(450);
          setPress(null);
          setView("menu");
          await sleep(1100);
          if (!alive) return;
          setPress("audio");
          await sleep(450);
          setPress(null);
          setView("rec");
          await sleep(media.secs * 620);
          if (!alive) return;
          setPress("send");
          await sleep(380);
          setPress(null);
          setView("thread");
          await sleep(300);
        } else {
          await sleep(1200);
        }
        if (!alive) return;
        push({ side: "you", media });
        await sleep(700);
        if (!alive) return;
        mark("Delivered");
        await sleep(600);
        if (!alive) return;
        mark("Read");
        setTyping(true);
        await sleep(1500);
        if (!alive) return;
        setTyping(false);
        push({ side: "waldo", text: waldo });
        scene.current += 1;
        await sleep(3400);
      }
    })();
    return () => {
      alive = false;
      setView("thread");
      setPress(null);
      setTyping(false);
    };
  }, [live]);

  useLift(flow, [messages, typing]);

  return (
    <div className="hats hats-watch" ref={root}>
      <div className="hats-watch-rig">
        <div className="hats-watch-screen" data-view={view}>
          <div className="hats-watch-layer hats-watch-thread">
            <div className="hats-watch-top">
              <span className="hats-watch-btn">{BACK}</span>
              <span className="hats-watch-title">
                <time>9:41</time>
                <b>Waldo</b>
              </span>
              <span className="hats-watch-contact">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/home/mascots/waldo-card.svg" alt="" />
              </span>
            </div>

            <div className="hats-thread">
              <div className="hats-flow" ref={flow}>
                <p className="hats-watch-note">
                  iMessage
                  <span>
                    <svg viewBox="0 0 10 12" aria-hidden="true">
                      <rect x="1" y="5" width="8" height="6.5" rx="1.4" />
                      <path d="M2.8 5V3.6a2.2 2.2 0 0 1 4.4 0V5" fill="none" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                    Encrypted
                  </span>
                </p>
                <p className="hats-watch-day">Today, 9:41</p>
                {messages.map((m, i) => (
                  <div
                    key={m.id}
                    className="hats-msg"
                    data-side={m.side}
                    data-age={Math.min(messages.length - 1 - i + (typing ? 1 : 0), 3)}
                    data-fresh={m.fresh ? "" : undefined}
                  >
                    {m.media?.kind === "voice" ? (
                      <p className="hats-watch-bubble hats-watch-voice" data-side="you">
                        <Voice secs={m.media.secs} bars={m.media.bars} />
                      </p>
                    ) : m.media ? (
                      <p className="hats-watch-bubble hats-watch-pic">
                        <Still art={m.media.art} secs={m.media.kind === "video" ? m.media.secs : undefined} />
                      </p>
                    ) : (
                      <p className="hats-watch-bubble">{m.text}</p>
                    )}
                    {m.status ? <small className="hats-watch-status">{m.status}</small> : null}
                  </div>
                ))}
                {typing ? (
                  <div className="hats-msg" data-side="waldo" data-age="0" data-fresh="">
                    <p className="hats-watch-bubble hats-watch-dots" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </p>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="hats-watch-compose" aria-hidden="true">
              <span className="hats-watch-btn" data-press={press === "plus" ? "" : undefined}>
                <svg viewBox="0 0 16 16">
                  <path d="M8 2.5v11M2.5 8h11" />
                </svg>
              </span>
              <span className="hats-watch-field">iMessage</span>
            </div>
          </div>

          <div className="hats-watch-layer hats-watch-menu" aria-hidden="true">
            <div className="hats-watch-top">
              <span className="hats-watch-btn">
                <svg viewBox="0 0 14 14">
                  <path d="m2 2 10 10M12 2 2 12" />
                </svg>
              </span>
              <time>9:41</time>
            </div>
            <ul>
              <li data-press={press === "audio" ? "" : undefined}>
                <span className="hats-watch-ico" data-kind="audio">
                  <svg viewBox="0 0 22 16">
                    <path d="M2 6.5v3M6 4v8M10 1.5v13M14 4v8M18 6.5v3" />
                  </svg>
                </span>
                Audio
              </li>
              <li>
                <span className="hats-watch-ico" data-kind="stickers" />
                Stickers
              </li>
              <li>
                <span className="hats-watch-ico" data-kind="location">
                  <i />
                </span>
                Location
              </li>
              <li>
                <span className="hats-watch-ico" data-kind="images" />
                #images
              </li>
            </ul>
          </div>

          <div className="hats-watch-layer hats-watch-rec" aria-hidden="true">
            <div className="hats-watch-top">
              <span className="hats-watch-btn">
                <svg viewBox="0 0 14 14">
                  <path d="m2 2 10 10M12 2 2 12" />
                </svg>
              </span>
              <span className="hats-watch-clock">
                <svg viewBox="0 0 12 16">
                  <rect x="3.5" y="1" width="5" height="9" rx="2.5" />
                  <path d="M1.5 7.5a4.5 4.5 0 0 0 9 0M6 12v2.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                9:41
              </span>
              <span className="hats-watch-btn" data-press={press === "send" ? "" : undefined}>
                <svg viewBox="0 0 14 16">
                  <path d="M7 14.5V2M2 7l5-5 5 5" />
                </svg>
              </span>
            </div>
            <div className="hats-watch-glow" />
            <div className="hats-watch-wave">
              <i />
              <i />
              <i />
              {LEVELS.map((h, n) => (
                <b key={n} style={{ "--h": h, animationDelay: `${(n * 0.17) % 0.9}s` } as React.CSSProperties} />
              ))}
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
        {/* The watch itself: the picture from "Your watch knows", its screen cut out, so what plays sits under it */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hats-watch-photo" src="/assets/home/hats/apple-watch.png" alt="" />
      </div>
    </div>
  );
}
