"use client";

import { type RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";

import { useLive } from "./use-live";

// The five pictures for "Same Waldo. Different hats." (see docs/website/pages/home.md): the same
// kind of thread as "Works with every agent" (agents-chat.tsx), but in the place each person would
// actually have it. The founder texts him on WhatsApp while travelling, the engineer asks him from the
// terminal, the investor talks to him from a watch, the designer leaves him a comment in Figma and the
// salesperson sends him a voice clip in Slack. You say it the way you would tell a person, and he
// answers in one dry line.
//
// What you send is not only words: a photo of the departures board, a voice note, a clip of a hotel
// room, a screenshot of a red build, a slide from the deck. Each channel shares media the way it
// really does (a thumbnail in the bubble, a waveform you can see recorded, a file chip in the prompt).
//
// Each one plays by itself, only while it is on screen, and holds its first exchange (finished) for
// anyone who asks for less motion. Everything in them is invented (Priya, PR #212, pitch five are the
// homepage story, Noor and Dana are made up), and nothing is a claim about what the product sends, books
// or merges.

type Agent = "Claude" | "Codex" | "Cursor";
type Part = string | { agent: Agent };
type Art = "board" | "room" | "slide" | "frame" | "pipeline";
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
  if (art === "frame")
    return (
      <svg viewBox="0 0 200 130" className="hats-pic" aria-hidden="true">
        <rect width="200" height="130" fill="#e5e5e5" />
        <rect x="62" y="10" width="76" height="110" rx="4" fill="#fff" />
        <rect x="72" y="20" width="36" height="5" rx="2" fill="#1a1a1a" />
        <circle cx="100" cy="56" r="17" fill="#f2f2f0" stroke="#c4c4c0" strokeDasharray="3 3" />
        <rect x="76" y="82" width="48" height="3.5" rx="1.75" fill="#d6d6d2" />
        <rect x="84" y="90" width="32" height="3.5" rx="1.75" fill="#d6d6d2" />
        <rect x="74" y="102" width="52" height="10" rx="5" fill="#1a1a1a" />
      </svg>
    );
  if (art === "pipeline")
    return (
      <svg viewBox="0 0 200 130" className="hats-pic" aria-hidden="true">
        <rect width="200" height="130" fill="#fafaf8" />
        <rect x="16" y="14" width="70" height="8" rx="2" fill="#1a1a1a" />
        {[
          [34, 168, "#d6d6d2"],
          [54, 132, "#d6d6d2"],
          [74, 104, "#f97316"],
          [94, 70, "#d6d6d2"],
        ].map(([y, w, fill]) => (
          <g key={y as number}>
            <rect x="16" y={y as number} width="26" height="5" rx="2" fill="#c4c4c0" />
            <rect x="50" y={(y as number) - 3} width={(w as number) - 34} height="11" rx="3" fill={fill as string} />
          </g>
        ))}
      </svg>
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

/* ── 4 · Designer, in Figma ─────────────────────────────────────────────────────────────────────── */

const DESIGNER: { you: string; art?: Art; file?: string; time: string; waldo: string }[] = [
  {
    you: "@Waldo the review is at 3 and the empty states aren’t done",
    art: "frame",
    file: "empty-states.png",
    time: "9:12 AM",
    waldo: "Review moves to 4:30. One to three is yours for the empty states, your clearest stretch today.",
  },
  {
    you: "@Waldo the client wants the icon set before lunch",
    time: "9:41 AM",
    waldo: "Icons get nine to eleven. The 10am crit moves to Thursday, when you’ll have more to give.",
  },
];

type Comment = { id: number; who: "you" | "waldo"; text: string; time: string; art?: Art; fresh?: boolean };

/** "@Waldo" is set as a mention, while it is being typed too */
function Mention({ text }: { text: string }) {
  const n = text.startsWith("@") ? Math.min(text.length, 6) : 0;
  if (!n || text.slice(0, n) !== "@Waldo".slice(0, n)) return <>{text}</>;
  return (
    <>
      <b className="hats-fig-at">{text.slice(0, n)}</b>
      {text.slice(n)}
    </>
  );
}

function WaldoFace() {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/assets/home/mascots/waldo-card.svg" alt="" />;
}

/** The designer leaving Waldo a comment on a frame in Figma, with a screenshot, and him answering under it */
export function DesignerFigma() {
  const root = useRef<HTMLDivElement>(null);
  const flow = useRef<HTMLDivElement>(null);
  const live = useLive(root);
  const [comments, setComments] = useState<Comment[]>([
    { id: -2, who: "you", text: DESIGNER[0].you, time: DESIGNER[0].time, art: DESIGNER[0].art },
    { id: -1, who: "waldo", text: DESIGNER[0].waldo, time: DESIGNER[0].time },
  ]);
  const [draft, setDraft] = useState<string | null>(null);
  const [attach, setAttach] = useState<{ art: Art; file: string } | null>(null);
  const [typing, setTyping] = useState(false);
  const scene = useRef(1);
  const nextId = useRef(1);

  useEffect(() => {
    if (!live) return;
    let alive = true;
    const push = (c: Omit<Comment, "id" | "fresh">) =>
      setComments((all) => [...all, { ...c, id: nextId.current++, fresh: true }].slice(-3));
    (async () => {
      while (alive) {
        const { you, art, file, time, waldo } = DESIGNER[scene.current % DESIGNER.length];
        for (let n = 1; n <= you.length && alive; n++) {
          setDraft(you.slice(0, n));
          await sleep(TYPE_MS);
        }
        if (!alive) return;
        // The screenshot is dropped into the comment
        if (art && file) {
          await sleep(350);
          setAttach({ art, file });
          await sleep(900);
        } else {
          await sleep(500);
        }
        if (!alive) return;
        setDraft(null);
        setAttach(null);
        push({ who: "you", text: you, time, art });
        await sleep(800);
        if (!alive) return;
        setTyping(true);
        await sleep(1700);
        if (!alive) return;
        setTyping(false);
        push({ who: "waldo", text: waldo, time });
        scene.current += 1;
        await sleep(3400);
      }
    })();
    return () => {
      alive = false;
      setDraft(null);
      setAttach(null);
      setTyping(false);
    };
  }, [live]);

  useLift(flow, [comments, typing]);

  return (
    <div className="hats hats-fig" ref={root}>
      <div className="hats-fig-bar">
        <b>Onboarding</b>
        <small>/ Empty states</small>
        <span className="hats-fig-badge">Draft</span>
        <span className="hats-fig-people" aria-hidden="true">
          <i style={{ background: "#f5a623" }}>N</i>
          <i className="hats-fig-waldo">
            <WaldoFace />
          </i>
        </span>
        <span className="hats-fig-share">Share</span>
      </div>

      <div className="hats-fig-canvas">
        <div className="hats-fig-board" aria-hidden="true">
          <span className="hats-fig-label">03 · Empty state</span>
          <div className="hats-fig-frame">
            <i className="hats-fig-w" data-kind="title" />
            <i className="hats-fig-w" data-kind="art" />
            <i className="hats-fig-w" data-kind="line" />
            <i className="hats-fig-w" data-kind="line" data-short="" />
            <i className="hats-fig-w" data-kind="button" />
          </div>
        </div>
        <span className="hats-fig-pin" aria-hidden="true">
          <i>N</i>
        </span>

        <div className="hats-fig-pop">
          <div className="hats-fig-pophead">
            <b>Empty state</b>
            <span aria-hidden="true">
              <svg viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="6.2" />
                <path d="m5.2 8.2 2 2 3.6-4" />
              </svg>
              <svg viewBox="0 0 16 16" className="hats-fig-more">
                <circle cx="3" cy="8" r="1.1" />
                <circle cx="8" cy="8" r="1.1" />
                <circle cx="13" cy="8" r="1.1" />
              </svg>
            </span>
          </div>

          <div className="hats-thread">
            <div className="hats-flow" ref={flow}>
              {comments.map((c, i) => (
                <div
                  key={c.id}
                  className="hats-fig-comment"
                  data-age={Math.min(comments.length - 1 - i + (typing ? 1 : 0), 3)}
                  data-fresh={c.fresh ? "" : undefined}
                >
                  <span className="hats-fig-avatar" data-who={c.who}>
                    {c.who === "waldo" ? <WaldoFace /> : "N"}
                  </span>
                  <div>
                    <p className="hats-fig-head">
                      <b>{c.who === "waldo" ? "Waldo" : "Noor"}</b>
                      <time>{c.time}</time>
                    </p>
                    <p className="hats-fig-text">
                      <Mention text={c.text} />
                    </p>
                    {c.art ? (
                      <span className="hats-fig-img">
                        <Pic art={c.art} />
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}
              {typing ? (
                <div className="hats-fig-comment" data-age="0" data-fresh="">
                  <span className="hats-fig-avatar" data-who="waldo">
                    <WaldoFace />
                  </span>
                  <p className="hats-fig-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className="hats-fig-composer" data-typing={draft !== null ? "" : undefined}>
            {attach ? (
              <span className="hats-fig-chip">
                <span>
                  <Pic art={attach.art} />
                </span>
                {attach.file}
              </span>
            ) : null}
            <p>
              {draft !== null ? (
                <>
                  <Mention text={draft} />
                  <span className="hats-fig-caret" />
                </>
              ) : (
                <span className="hats-fig-placeholder">Reply</span>
              )}
            </p>
            <span className="hats-fig-send" data-on={draft !== null ? "" : undefined} aria-hidden="true">
              <svg viewBox="0 0 14 16">
                <path d="M7 14V2.5M2.5 7 7 2.5 11.5 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 5 · Sales, in Slack ────────────────────────────────────────────────────────────────────────── */

/** What Waldo did, as a Slack app would attach it under his reply: where it happened, what it is, a button */
type SlackCard = { logo: "gmail" | "google-calendar"; label: string; title: string; line: string; was?: string; action: string };

const SALES: { text?: string; media: Media; file?: string; time: string; waldo: string; card: SlackCard }[] = [
  {
    media: { kind: "voice", secs: 7, bars: bars(4, 9, 14, 8, 17, 11, 6, 15, 10, 5, 13, 8, 16, 7, 12, 6, 9, 4, 11, 5) },
    time: "9:14 AM",
    waldo: "Held Thursday, ten to twelve, your sharpest hours, for the proposal. The note to Dana is ready when you are.",
    card: { logo: "gmail", label: "Draft · not sent", title: "To Dana Reyes", line: "Great talking today. The proposal lands Friday.", action: "Review" },
  },
  {
    text: "where do we stand this week",
    media: { kind: "image", art: "pipeline" },
    file: "pipeline.png",
    time: "11:02 AM",
    waldo: "Three deals close this week. The Acme call moves to 2pm, your best hour. The rest can wait.",
    card: { logo: "google-calendar", label: "Moved", title: "Acme renewal call", line: "Today, 2:00 PM", was: "11:00 AM", action: "Undo" },
  },
];

type SlackMessage = { id: number; who: "you" | "waldo"; text?: string; media?: Media; card?: SlackCard; time: string; fresh?: boolean; react?: boolean };

function SlackCardView({ card }: { card: SlackCard }) {
  return (
    <div className="hats-slk-card">
      <div className="hats-slk-card-text">
        <p className="hats-slk-card-label">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/assets/connectors/${card.logo}.svg`} alt="" />
          {card.label}
        </p>
        <b>{card.title}</b>
        <p className="hats-slk-card-line">
          {card.line}
          {card.was ? <s>{card.was}</s> : null}
        </p>
      </div>
      <span className="hats-slk-card-btn">{card.action}</span>
    </div>
  );
}

/** The salesperson sending Waldo a voice clip, and a screenshot, in a Slack DM */
export function SalesSlack() {
  const root = useRef<HTMLDivElement>(null);
  const flow = useRef<HTMLDivElement>(null);
  const live = useLive(root);
  const [messages, setMessages] = useState<SlackMessage[]>([
    { id: -2, who: "you", media: SALES[0].media, time: SALES[0].time },
    { id: -1, who: "waldo", text: SALES[0].waldo, card: SALES[0].card, time: SALES[0].time, react: true },
  ]);
  const [draft, setDraft] = useState<string | null>(null);
  const [attach, setAttach] = useState<{ art: Art; file: string } | null>(null);
  const [rec, setRec] = useState<number | null>(null);
  const [typing, setTyping] = useState(false);
  const scene = useRef(1);
  const nextId = useRef(1);

  useEffect(() => {
    if (!live) return;
    let alive = true;
    const push = (m: Omit<SlackMessage, "id" | "fresh">) =>
      setMessages((all) => [...all, { ...m, id: nextId.current++, fresh: true }].slice(-3));
    (async () => {
      while (alive) {
        const { text, media, file, time, waldo, card } = SALES[scene.current % SALES.length];
        if (text) {
          for (let n = 1; n <= text.length && alive; n++) {
            setDraft(text.slice(0, n));
            await sleep(TYPE_MS);
          }
          await sleep(300);
        }
        if (media.kind === "voice") {
          for (let s = 0; s <= media.secs && alive; s++) {
            setRec(s);
            await sleep(460);
          }
          setRec(null);
        } else if (media.kind === "image" && file) {
          setAttach({ art: media.art, file });
          await sleep(1200);
        }
        if (!alive) return;
        setDraft(null);
        setAttach(null);
        push({ who: "you", text, media, time });
        await sleep(900);
        if (!alive) return;
        setTyping(true);
        await sleep(1700);
        if (!alive) return;
        setTyping(false);
        push({ who: "waldo", text: waldo, card, time });
        scene.current += 1;
        // Ria gives it a thumbs up
        await sleep(1500);
        if (!alive) return;
        setMessages((all) => all.map((m, i) => (i === all.length - 1 ? { ...m, react: true } : m)));
        await sleep(2400);
      }
    })();
    return () => {
      alive = false;
      setDraft(null);
      setAttach(null);
      setRec(null);
      setTyping(false);
    };
  }, [live]);

  useLift(flow, [messages, typing]);

  return (
    <div className="hats hats-slk" ref={root}>
      <div className="hats-slk-head">
        <div className="hats-slk-who">
          <span className="hats-slk-av" data-who="waldo">
            <WaldoFace />
            <i className="hats-slk-presence" />
          </span>
          <b>Waldo</b>
          <small>APP</small>
          <span className="hats-slk-huddle" aria-hidden="true">
            <svg viewBox="0 0 16 16">
              <path d="M2.4 9.6V8a5.6 5.6 0 0 1 11.2 0v1.6" />
              <rect x="1.8" y="9" width="3" height="4.6" rx="1.2" />
              <rect x="11.2" y="9" width="3" height="4.6" rx="1.2" />
            </svg>
            Huddle
          </span>
        </div>
        <div className="hats-slk-tabs" aria-hidden="true">
          <span data-on="">Messages</span>
          <span>Files</span>
          <span className="hats-slk-add">+</span>
        </div>
      </div>

      <div className="hats-thread">
        <div className="hats-flow" ref={flow}>
          <p className="hats-slk-day" aria-hidden="true">
            <span>Today</span>
          </p>
          {messages.map((m, i) => (
            <div
              key={m.id}
              className="hats-slk-msg"
              data-age={Math.min(messages.length - 1 - i + (typing ? 1 : 0), 3)}
              data-fresh={m.fresh ? "" : undefined}
            >
              <span className="hats-slk-av" data-who={m.who}>
                {m.who === "waldo" ? <WaldoFace /> : "R"}
              </span>
              <div>
                <p className="hats-slk-meta">
                  <b>{m.who === "waldo" ? "Waldo" : "Ria"}</b>
                  {m.who === "waldo" ? <small>APP</small> : null}
                  <time>{m.time}</time>
                </p>
                {m.text ? <p className="hats-slk-body">{m.text}</p> : null}
                {m.media?.kind === "voice" ? (
                  <span className="hats-slk-clip">
                    <span className="hats-slk-play">{PLAY}</span>
                    <span className="hats-slk-bars">
                      {Array.from({ length: 30 }, (_, n) => (
                        <i key={n} style={{ height: `${Math.max(18, (m.media as { bars: number[] }).bars[(n * 7) % (m.media as { bars: number[] }).bars.length] * 5)}%` }} />
                      ))}
                    </span>
                    <small>{clock(m.media.secs)}</small>
                  </span>
                ) : null}
                {m.media?.kind === "image" ? (
                  <span className="hats-slk-file">
                    <Pic art={m.media.art} />
                  </span>
                ) : null}
                {m.card ? <SlackCardView card={m.card} /> : null}
                {m.react ? (
                  <span className="hats-slk-react">
                    <em>👍</em>1
                  </span>
                ) : null}
              </div>
            </div>
          ))}
          {typing ? (
            <div className="hats-slk-msg" data-age="0" data-fresh="">
              <span className="hats-slk-av" data-who="waldo">
                <WaldoFace />
              </span>
              <p className="hats-slk-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="hats-slk-bar" data-rec={rec !== null ? "" : undefined}>
        <div className="hats-slk-tools" aria-hidden="true">
          <b>B</b>
          <i>I</i>
          <s>S</s>
          <span>&lt;/&gt;</span>
          <span>≡</span>
        </div>
        <div className="hats-slk-field">
          {rec !== null ? (
            <p className="hats-slk-rec">
              <i />
              <time>{clock(rec)}</time>
              <span>Recording audio clip</span>
            </p>
          ) : (
            <>
              {attach ? (
                <span className="hats-slk-chip">
                  <span>
                    <Pic art={attach.art} />
                  </span>
                  {attach.file}
                </span>
              ) : null}
              <p>
                {draft !== null ? (
                  <>
                    {draft}
                    <span className="hats-slk-caret" />
                  </>
                ) : (
                  <span className="hats-slk-placeholder">Message Waldo</span>
                )}
              </p>
            </>
          )}
        </div>
        <div className="hats-slk-foot" aria-hidden="true">
          <svg viewBox="0 0 16 16" className="hats-slk-plus">
            <path d="M8 2.5v11M2.5 8h11" />
          </svg>
          <span>Aa</span>
          <span>@</span>
          <svg viewBox="0 0 16 16" className="hats-slk-mic" data-on={rec !== null ? "" : undefined}>
            <rect x="5.6" y="1.6" width="4.8" height="8" rx="2.4" />
            <path d="M3.2 7.6a4.8 4.8 0 0 0 9.6 0M8 12.4v2" />
          </svg>
          <span className="hats-slk-send" data-on={attach || (rec !== null && rec > 0) || draft !== null ? "" : undefined}>
            <svg viewBox="0 0 16 16">
              <path d="M2 2.2 14 8 2 13.8l1.6-5.2L9 8 3.6 7.4 2 2.2Z" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
