"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

// The homepage loop (see docs/website/hero-loop.md).
//
// The connectors drift left to right along a U-shaped path, and the lowest part of it is right above
// Waldo. Only the connectors passing through that low zone speak. Each one hands over one short
// line, which travels from its own icon to a point just above his head; he answers with one line,
// which travels back to the same icon; and the card underneath adds a line for each thing he has
// read. One story, five connectors, and the card is the sum of exactly those five.
//
// The story's connectors sit next to each other in the row, so they pass through the zone one
// after another and each speaks as it does. When the last reply is home the loop rests for a
// moment and waits for the first of them to come round again.

// The row, left to right. The five in the middle are the story, in reverse: the row drifts right,
// so the one on the right (Garmin) reaches the low zone first and HubSpot last.
const TOOLS = [
  "apple-health",
  "asana",
  "atlassian",
  "calendly",
  "dropbox",
  "figma",
  "hubspot",
  "slack",
  "gmail",
  "google-calendar",
  "garmin",
  "github",
  "google-drive",
  "granola",
  "notion",
  "openai",
  "spotify",
  "strava",
] as const;

type ToolId = (typeof TOOLS)[number];

// Two copies of the row, so every tool is within half a row of the middle at any moment.
const WAVE = [...TOOLS, ...TOOLS].map((tool, i) => ({
  tool,
  key: `${i}-${tool}`,
}));

/** A tool named inside a sentence: its mark, then the words. */
function Chip({ tool, children }: { tool: ToolId; children: ReactNode }) {
  return (
    <span className="site-loop-chip">
      <Image
        src={`/assets/connectors/${tool}.svg`}
        alt=""
        width={16}
        height={16}
        unoptimized
      />
      <span>{children}</span>
    </span>
  );
}

/*
  The story. Five pairs from Suyash's copy bank (waldo-hero-connector-shortlist), told in order:
  a short night, a crowded day, and the one thing that matters this week. `says` is the connector's
  line (4 to 10 words), `reply` is Waldo's (under 10), and `line` is what the card adds when that
  connector's line reaches him. Read together, the five lines are the card: 39 words, the same
  numbers and facts as the five signals, nothing added. He offers and suggests. He never sends or
  moves anything by himself.
*/
const STORY: { tool: ToolId; says: string; reply: string; line: ReactNode }[] =
  [
    {
      tool: "garmin",
      says: "5h 12m of sleep last night.",
      reply: "Not a day to pack tighter.",
      line: (
        <>
          <Chip tool="garmin">5h 12m of sleep</Chip>. I&rsquo;d go lighter
          today.
        </>
      ),
    },
    {
      tool: "google-calendar",
      says: "Two meetings overlap at three.",
      reply: "I’ll suggest a cleaner slot.",
      line: (
        <>
          <Chip tool="google-calendar">Two meetings overlap at three</Chip>;
          I&rsquo;ll suggest a cleaner slot.
        </>
      ),
    },
    {
      tool: "gmail",
      says: "52 new emails. 3 need a reply.",
      reply: "Those three first.",
      line: (
        <>
          Three of <Chip tool="gmail">52 new emails</Chip> need a reply.
        </>
      ),
    },
    {
      tool: "slack",
      says: "Three threads are waiting on your answer.",
      reply: "I’ll pull out what needs you.",
      line: (
        <>
          Three <Chip tool="slack">Slack</Chip> threads wait on you.
        </>
      ),
    },
    {
      tool: "hubspot",
      says: "The deal closes Friday. One question remains.",
      reply: "Let’s answer that before adding another nudge.",
      line: (
        <>
          <Chip tool="hubspot">HubSpot&rsquo;s deal</Chip> closes Friday; one
          question remains.
        </>
      ),
    },
  ];

/*
  The path the icons ride, drawn by Suyash: a U, high at both edges and lowest in the middle, right
  above Waldo. The result is 0 at the top of the band and 1 at the bottom.
*/
function pathY(t: number) {
  const d = Math.abs(2 * t - 1);
  return Math.min(1, Math.max(0, 1 - d * d));
}

/** Pixels per second the row drifts to the right. One icon reaches the low zone every 1.5s or so. */
const DRIFT = 38;
const FLIGHT_MS = 3000;
const REPLY_DELAY = 300;
const SIGNAL_GAP = 900;
const HOLD_MS = 800;
/** The dot, and the height of the pill it stretches into. */
const BUD = 34;
/** How much of the gap under the hero buttons is taken out, by lifting the band. */
const GAP_PULL = 0.2;
/** The line of hero text that was removed when it went from three lines to two. */
const HERO_LINE = 24;
/** The gap under the buttons never closes below this. */
const GAP_MIN = 56;
/** How much of the front card shows above the fold. The rest hangs below, inside the white sheet. */
const PEEK = 84;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const outCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const inCubic = (t: number) => t * t * t;
const inOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
/** Slow at both ends, quick through the middle: the speed follows a bell, so it can be read. */
const smoother = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
/** A spring with a little overshoot, for the dot popping and the pill stretching. */
const outBack = (t: number) => {
  const c = 1.8;
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
};

type Point = { x: number; y: number };

const SPIN_SVG =
  '<svg class="spin" viewBox="0 0 18 18" aria-hidden="true"><circle cx="9" cy="9" r="6.3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="11 30"/></svg>';
const TICK_SVG =
  '<svg class="tick" viewBox="0 0 18 18" aria-hidden="true"><path d="M4.4 9.5l3.1 3.1 6.1-6.8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></svg>';

type Card = { key: number; shown: number };

export function WaldoLoop() {
  const stage = useRef<HTMLDivElement>(null);
  const dog = useRef<HTMLDivElement>(null);
  const slab = useRef<HTMLDivElement>(null);
  // The briefs stack: the newest in front, the ones before it behind and above. Three at most.
  // The first is already written; every later one starts empty and fills as Waldo reads.
  const [deck, setDeck] = useState<Card[]>([{ key: 0, shown: 99 }]);

  useEffect(() => {
    const host = stage.current;
    const waldo = dog.current;
    const deckEl = slab.current;
    if (!host || !waldo || !deckEl) return;

    // The hero is one screen. How much screen is left depends on what sits above it (the menu, the
    // announcement), so measure it rather than guess. The card hangs below the fold by whatever it
    // is tall, minus the peek, and the white sheet has to reach down to hold it.
    const screen = host.closest<HTMLElement>(".site-section--screen");
    const sheet = host.closest<HTMLElement>(".site-hero-frame");
    const fit = () => {
      if (screen) {
        const top = screen.getBoundingClientRect().top + window.scrollY;
        screen.style.setProperty(
          "--screen-space",
          `${Math.max(360, window.innerHeight - top - 10)}px`,
        );
      }
      sheet?.style.setProperty(
        "--loop-hang",
        `${Math.max(0, deckEl.offsetHeight - PEEK)}px`,
      );
    };

    // The icons: each one sits on the path at wherever it has drifted to, like beads on a wire.
    const wave = host.querySelector<HTMLElement>(".site-loop-wave");
    const marks = wave
      ? [...wave.querySelectorAll<HTMLElement>(".site-loop-mark")]
      : [];
    let offset = 0;
    let placed = false;
    let pitch = 74;
    const centres: number[] = marks.map(() => 0);

    const place = (now: number) => {
      if (!wave || !marks.length) return;
      const width = wave.clientWidth;
      const size = marks[0].offsetWidth || 56;
      pitch = size + Math.min(18, Math.max(12, window.innerWidth * 0.013));
      const total = marks.length * pitch;
      const travel = Math.max(24, wave.clientHeight - size - 20);
      // Start with the story a moment before the low zone, so it begins within a couple of seconds
      // of the page loading rather than waiting for the row to come all the way round.
      if (!placed) {
        placed = true;
        offset =
          width / 2 -
          1.2 * pitch -
          size / 2 +
          pitch -
          TOOLS.indexOf("garmin") * pitch;
      }
      marks.forEach((mark, i) => {
        const x = ((((i * pitch + offset) % total) + total) % total) - pitch;
        centres[i] = x + size / 2;
        const bob = Math.sin(now / 1100 + i * 1.7) * 2.5;
        const y = 10 + pathY((x + size / 2) / width) * travel + bob;
        mark.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      });
      wave.setAttribute("data-ready", "");
    };

    // The band takes the room above Waldo, so the U can be as deep as the screen allows without its
    // low point running into him. On a wide screen it also rises behind the hero text, at the
    // sides, the way the path was drawn.
    const fitWave = () => {
      if (window.innerWidth > 640) {
        const dogTop =
          waldo.getBoundingClientRect().top - host.getBoundingClientRect().top;
        const size = marks[0]?.offsetWidth || 56;
        const overlap =
          window.innerWidth >= 1200 ? 0.42 : window.innerWidth >= 900 ? 0.2 : 0;
        const want = Math.min(310, 0.215 * window.innerWidth);
        const room = dogTop - 190 - 10 - size / 2 - 6;
        const amp = Math.max(60, Math.min(want, room / (1 - overlap)));
        host.style.setProperty(
          "--loop-wave",
          `${Math.round(amp + size + 20)}px`,
        );
        let lift = amp * overlap;
        // The gap between the hero buttons and the low point of the U is cut by a fifth, by lifting
        // the whole band (so it only ever moves further from Waldo). It is measured against the
        // layout before the hero text went from three lines to two, so the fifth is taken from the
        // gap as it was, and it never closes below GAP_MIN.
        const buttons = screen?.querySelector<HTMLElement>(".site-actions");
        if (buttons) {
          const gap =
            host.getBoundingClientRect().top -
            buttons.getBoundingClientRect().bottom -
            lift +
            10 +
            amp;
          const pull = gap * GAP_PULL + HERO_LINE * (1 - GAP_PULL);
          lift += Math.max(0, Math.min(pull, gap - GAP_MIN));
        }
        host.style.setProperty("--loop-lift", `${Math.round(lift)}px`);
      } else {
        host.style.removeProperty("--loop-wave");
        host.style.removeProperty("--loop-lift");
      }
      place(performance.now());
    };

    const refit = () => {
      fit();
      fitWave();
    };
    refit();
    addEventListener("resize", refit);
    const tape = new ResizeObserver(refit);
    tape.observe(host);
    tape.observe(deckEl);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let alive = true;
    const timers = new Set<number>();
    const wait = (ms: number, run: () => void) => {
      const id = window.setTimeout(run, ms);
      timers.add(id);
      return id;
    };

    let frame = 0;
    let last = 0;
    const eyes: IntersectionObserver[] = [];

    const stop = () => {
      alive = false;
      tape.disconnect();
      eyes.forEach((eye) => eye.disconnect());
      cancelAnimationFrame(frame);
      removeEventListener("resize", refit);
      timers.forEach((id) => window.clearTimeout(id));
      host.querySelectorAll(".site-loop-card").forEach((node) => node.remove());
    };

    // Less motion: the row and the brief are already there (the brief is only hidden inside the
    // motion media query), and nothing flies.
    if (reduced) return stop;

    /** The copy of a tool that is nearest the middle, and how far from the middle it is. */
    function zoneMark(tool: ToolId) {
      if (!wave) return null;
      const middle = wave.clientWidth / 2;
      let best: { mark: HTMLElement; dx: number } | null = null;
      marks.forEach((mark, i) => {
        if (mark.dataset.tool !== tool) return;
        const dx = centres[i] - middle;
        if (!best || Math.abs(dx) < Math.abs(best.dx)) best = { mark, dx };
      });
      return best as { mark: HTMLElement; dx: number } | null;
    }

    /**
      The spot just under an icon, where its cards start and where his replies end, so they come out
      of the space below the connector and never pass over it.
    */
    function anchorOf(el: HTMLElement): Point {
      const c = centreOf(el);
      return { x: c.x, y: c.y + el.offsetHeight / 2 + 27 };
    }

    function centreOf(el: HTMLElement): Point {
      const box = host!.getBoundingClientRect();
      const from = el.getBoundingClientRect();
      return {
        x: from.left - box.left + from.width / 2,
        y: from.top - box.top + from.height / 2,
      };
    }

    /*
      Where everything goes in and comes out: just above his head, not under the drawing. Scaled
      with him, so it stays the same distance above whatever size he is.
    */
    const portal = (): Point => {
      const box = host!.getBoundingClientRect();
      const him = waldo!.getBoundingClientRect();
      return {
        x: him.left - box.left + him.width / 2,
        y: him.top - box.top - him.height * 0.55,
      };
    };

    function swallow() {
      waldo!.animate(
        [
          { transform: "translateX(-50%) scale(1, 1)" },
          { transform: "translateX(-50%) scale(1.05, 0.95)", offset: 0.35 },
          { transform: "translateX(-50%) scale(1, 1)" },
        ],
        { duration: 720, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      );
    }

    /** A pill in two parts: what it is (a tool's mark, or a spinner that turns into a tick), then the words. */
    function makeCard(opts: { tool?: ToolId; text: string; out: boolean }) {
      const node = document.createElement("div");
      node.className =
        "site-loop-card" + (opts.out ? " site-loop-card--out" : "");
      const slot = document.createElement("span");
      slot.className = "site-loop-slot";
      slot.innerHTML = opts.out
        ? SPIN_SVG + TICK_SVG
        : `<img src="/assets/connectors/${opts.tool}.svg" alt="" />`;
      node.appendChild(slot);
      const words = opts.text.split(" ").map((word) => {
        const el = document.createElement("span");
        el.className = "site-loop-word";
        el.textContent = word;
        node.appendChild(el);
        return el;
      });
      return { node, slot, words };
    }

    /**
      The motion, after the recording Suyash shared: a dot pops out of its source, stretches into a
      pill while the words roll up inside it, travels, then squeezes back to a dot and disappears
      into wherever it is going. The ends follow the live position of the source and the target,
      so a card stays attached to its own icon even while the row drifts.
    */
    // At most two pills are in the air at once, and what he says back waits its turn, so the area
    // above his head never turns into a pile-up.
    let inFlight = 0;
    let repliesWaiting = 0;

    function fly(
      card: ReturnType<typeof makeCard>,
      from: () => Point,
      to: () => Point,
      onLand: () => void,
    ) {
      const { node, slot, words } = card;
      host!.appendChild(node);
      inFlight += 1;
      node.style.width = "auto";
      const full = node.offsetWidth;
      const spin = slot.querySelector<SVGElement>(".spin");
      const tick = slot.querySelector<SVGPathElement>(".tick path");
      const OPEN = 0.17;
      const CLOSE = 0.17;
      const t0 = performance.now();
      let landed = false;

      const step = (now: number) => {
        const u = clamp01((now - t0) / FLIGHT_MS);
        const a = from();
        const b = to();
        const p = smoother(clamp01((u - 0.1) / 0.8));
        const x = a.x + (b.x - a.x) * p;
        const y = a.y + (b.y - a.y) * p;

        const o = clamp01(u / OPEN);
        const c = clamp01((u - (1 - CLOSE)) / CLOSE);
        const pop = outBack(clamp01(o / 0.3));
        const stretch = outBack(clamp01((o - 0.3) / 0.7));
        const squeeze = inOut(clamp01(c / 0.65));
        const fade = inCubic(clamp01((c - 0.65) / 0.35));

        const width = BUD + (full - BUD) * Math.max(0, stretch) * (1 - squeeze);
        const scale = Math.max(0, pop) * (1 - 0.8 * fade);

        node.style.width = `${width.toFixed(1)}px`;
        node.style.opacity = `${(1 - clamp01((c - 0.92) / 0.08)).toFixed(3)}`;
        node.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -50%) scale(${scale.toFixed(3)})`;

        const held = 1 - clamp01((c - 0.05) / 0.3);
        slot.style.opacity = `${(clamp01((o - 0.5) / 0.3) * held).toFixed(3)}`;
        words.forEach((word, i) => {
          const start = 0.4 + i * (0.5 / words.length);
          const t = outCubic(clamp01((o - start) / 0.28));
          word.style.opacity = `${(t * held).toFixed(3)}`;
          word.style.transform = `translateY(${((1 - t) * 20).toFixed(1)}px) rotate(${((1 - t) * 7).toFixed(1)}deg)`;
        });
        if (spin && tick) {
          spin.style.opacity = `${(1 - clamp01((u - 0.6) / 0.06)).toFixed(3)}`;
          tick.style.strokeDashoffset = `${(1 - clamp01((u - 0.64) / 0.14)).toFixed(3)}`;
        }

        if (u >= 1 - CLOSE && !landed) {
          landed = true;
          onLand();
        }
        if (u < 1) requestAnimationFrame(step);
        else {
          node.remove();
          inFlight -= 1;
        }
      };
      // Draw the first frame now, so a new pill never shows for a moment at the wrong place.
      step(t0);
    }

    // ── The story ────────────────────────────────────────────────────────────────────────────────
    // Signals go one at a time, each from the connector that is passing through the low zone right
    // now. The next one waits for the next connector to arrive, which is why they are next to each
    // other in the row.
    let next = 0;
    let armed = true;
    let armAt = 0;
    let cooldown = 0;
    let repliesHome = 0;

    function send(index: number, mark: HTMLElement) {
      const item = STORY[index];

      // The first signal of a round brings a new, empty card to the front.
      if (index === 0) {
        repliesHome = 0;
        setDeck((stack) => [
          ...stack.slice(-2),
          { key: stack[stack.length - 1].key + 1, shown: 0 },
        ]);
      }

      const signal = makeCard({ tool: item.tool, text: item.says, out: false });
      fly(
        signal,
        () => anchorOf(mark),
        portal,
        () => {
          swallow();
          // What he has read is what the card says: this connector's line arrives.
          setDeck((stack) =>
            stack.map((card, i) =>
              i === stack.length - 1
                ? { ...card, shown: Math.max(card.shown, index + 1) }
                : card,
            ),
          );
          // Then he answers, to the same icon it came from.
          repliesWaiting += 1;
          const launch = () => {
            if (!alive) return;
            if (inFlight >= 2) {
              wait(250, launch);
              return;
            }
            repliesWaiting -= 1;
            const reply = makeCard({ text: item.reply, out: true });
            fly(
              reply,
              portal,
              () => anchorOf(mark),
              () => {
                repliesHome += 1;
                if (repliesHome === STORY.length) {
                  next = 0;
                  armAt = performance.now() + HOLD_MS;
                  armed = true;
                }
              },
            );
          };
          wait(REPLY_DELAY, launch);
        },
      );
    }

    const drift = (now: number) => {
      if (!alive) return;
      if (last) offset += ((now - last) / 1000) * DRIFT;
      last = now;
      place(now);

      // A new signal goes when there is room in the air (replies first), and its connector is at
      // the middle or only a little past it.
      const room = inFlight === 0 || (inFlight === 1 && repliesWaiting === 0);
      if (armed && room && now >= armAt && now >= cooldown) {
        const zone = zoneMark(STORY[next].tool);
        if (zone && zone.dx >= -pitch * 0.5 && zone.dx <= pitch * 2.2) {
          send(next, zone.mark);
          next += 1;
          cooldown = now + SIGNAL_GAP;
          if (next >= STORY.length) armed = false;
        }
      }
      frame = requestAnimationFrame(drift);
    };

    // Runs only while it can be seen
    const eyeWave = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !frame)
            frame = requestAnimationFrame(drift);
          else if (!entry.isIntersecting) {
            cancelAnimationFrame(frame);
            frame = 0;
            last = 0;
          }
        }
      },
      { threshold: 0 },
    );
    eyes.push(eyeWave);
    if (wave) eyeWave.observe(wave);

    return stop;
  }, []);

  return (
    <div className="site-loop" ref={stage}>
      <div className="site-loop-wave" aria-hidden="true">
        {WAVE.map((seat) => (
          <span key={seat.key} className="site-loop-mark" data-tool={seat.tool}>
            <Image
              src={`/assets/connectors/${seat.tool}.svg`}
              alt=""
              width={30}
              height={30}
              unoptimized
              loading="eager"
            />
          </span>
        ))}
      </div>

      <div className="site-loop-stage">
        <div className="site-loop-dog" ref={dog}>
          <Image
            src="/assets/home/mascots/waldo-loop.svg"
            alt="Waldo"
            width={78}
            height={63}
            unoptimized
            priority
          />
        </div>

        <div className="site-loop-deck" ref={slab} aria-live="polite">
          {deck.map((card, place) => {
            const depth = deck.length - 1 - place;
            return (
              <div
                key={card.key}
                className="site-loop-brief"
                data-depth={depth}
              >
                <span
                  className="site-loop-reading"
                  data-on={card.shown === 0 && depth === 0 ? "" : undefined}
                  aria-hidden="true"
                >
                  <i />
                  <i />
                  <i />
                </span>
                {STORY.map((item, i) => (
                  <p
                    key={item.tool}
                    data-unit=""
                    data-on={i < card.shown ? "" : undefined}
                  >
                    {item.line}
                  </p>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
