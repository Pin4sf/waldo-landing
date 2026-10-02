"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { HERO_ROW, HERO_STATES, slotOf } from "./hero-states";

// The homepage loop (see docs/website/hero-loop.md).
//
// The connectors drift left to right along a U-shaped path, and the lowest part of it is right above
// Waldo. Only the connectors passing through that low zone speak. Each one hands over one line (a
// notification, written like the real thing), which travels from its own icon to a point just above
// his head; he answers with one short line, which travels back to the same icon. (The phone with
// the Overview card that used to sit under him was removed on 2026-10-01; see hero-loop.md.)
//
// The script is one fictional Wednesday, 27 signals long (hero-states.ts). The row of icons is laid
// out to match it: signals sit three places apart, so two icons pass silent between one signal and
// the next, and Calendar and Gmail, which speak twice, have two places each. A signal only starts
// once the last reply has cleared. After the last one, a silent icon passes and the loop carries on
// into the first signal again.

/** Every connector that has an icon in the row (public/assets/connectors). */
export type ToolId =
  | "apple-health"
  | "claude"
  | "asana"
  | "linear"
  | "jira"
  | "shopify"
  | "calendly"
  | "stripe"
  | "figma"
  | "whoop"
  | "github"
  | "oura"
  | "google-drive"
  | "microsoft-outlook"
  | "granola"
  | "whatsapp"
  | "notion"
  | "hubspot"
  | "openai"
  | "slack"
  | "gmail"
  | "google-calendar"
  | "garmin"
  | "spotify"
  | "strava";

const PLACES = HERO_ROW.length;

// The row is drawn right to left in the order it passes the low zone (the row drifts right, so the
// icon furthest right arrives first). Two copies of it, so every place is within half a row of the
// middle at any moment; a place's `slot` is its position in that order.
const SEATS = [...HERO_ROW]
  .reverse()
  .map((tool, i) => ({ tool, slot: PLACES - 1 - i }));
const WAVE = [...SEATS, ...SEATS].map((seat, i) => ({
  ...seat,
  key: `${i}-${seat.tool}`,
}));

/*
  The stream: the short preview of the notification each connector hands over, and his short reply.
  The full notification stays in the script (and on the pill as `data-full`); the pill is a
  single line. He offers and suggests; he never sends or moves anything by himself.
*/
const STORY = HERO_STATES.map((state) => ({
  tool: state.tool,
  says: state.pill,
  reply: state.say,
  full: state.incoming,
}));

/*
  The path the icons ride, drawn by Suyash: a U, high at both edges and lowest in the middle, right
  above Waldo. The result is 0 at the top of the band and 1 at the bottom.
*/
function pathY(t: number) {
  const d = Math.abs(2 * t - 1);
  return Math.min(1, Math.max(0, 1 - d * d));
}

/**
  Pixels per second the row drifts to the right, at the 1440px layout, where icons are 74px apart: one
  reaches the low zone every 1.95s. On narrower screens the icons sit closer, so the drift is scaled
  with the spacing and an icon still arrives every 1.95s. A signal takes about 5.8s, three icons.
*/
const DRIFT = 38;
const REF_PITCH = 74;
const FLIGHT_MS = 3000;
const REPLY_DELAY = 300;
const SIGNAL_GAP = 900;
const HOLD_MS = 800;
/** The dot, and the height of the shortest pill it stretches into. */
const BUD = 34;
/** The pill's hairline edge, both sides (site.css .site-loop-card). */
const CARD_EDGE = 1.2;
/** A pill keeps this far from the side of the screen (site.css .site-loop-card max-width). */
const CARD_MARGIN = 12;
/** How much of the gap under the hero buttons is taken out, by lifting the band. */
const GAP_PULL = 0.2;
/** The line of hero text that was removed when it went from three lines to two. */
const HERO_LINE = 24;
/** The gap under the buttons never closes below this. */
const GAP_MIN = 56;
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

export function WaldoLoop() {
  const stage = useRef<HTMLDivElement>(null);
  const dog = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = stage.current;
    const waldo = dog.current;
    if (!host || !waldo) return;
    const plinth = host.querySelector<HTMLElement>(".site-loop-stage");
    if (!plinth) return;

    // The hero is one screen. How much screen is left depends on what sits above it (the menu, the
    // announcement), so measure it rather than guess. The phone hangs below the fold by however far
    // its bottom is below the bottom of this box, and the hero has to reach down to hold it.
    const screen = host.closest<HTMLElement>(".site-section--screen");
    const sheet = host.closest<HTMLElement>(".site-hero");
    const fit = () => {
      if (screen) {
        const top = screen.getBoundingClientRect().top + window.scrollY;
        screen.style.setProperty(
          "--screen-space",
          `${Math.max(360, window.innerHeight - top - 10)}px`,
        );
      }
      const hang =
        plinth.getBoundingClientRect().bottom -
        host.getBoundingClientRect().bottom;
      sheet?.style.setProperty(
        "--loop-hang",
        `${Math.max(0, Math.round(hang))}px`,
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
      // of the page loading rather than waiting for the row to come all the way round. The first
      // signal's place is the first to pass, so it is the furthest right of its copy: the highest seat.
      if (!placed) {
        placed = true;
        offset =
          width / 2 - 1.2 * pitch - size / 2 + pitch - (PLACES - 1) * pitch;
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
    tape.observe(plinth);

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

    /**
      The copy of a place on the row that is nearest the middle, and how far from the middle it is.
      A place, not a tool: Calendar and Gmail have two places each, and each signal has its own.
    */
    function zoneMark(slotIndex: number) {
      if (!wave) return null;
      const middle = wave.clientWidth / 2;
      let best: { mark: HTMLElement; dx: number } | null = null;
      marks.forEach((mark, i) => {
        if (mark.dataset.slot !== String(slotIndex)) return;
        const dx = centres[i] - middle;
        if (!best || Math.abs(dx) < Math.abs(best.dx)) best = { mark, dx };
      });
      return best as { mark: HTMLElement; dx: number } | null;
    }

    /**
      The spot just under an icon, where its cards start and where his replies end, so they come out
      of the space below the connector and never pass over it. A pill that has grown to several lines
      is centred lower, so its top edge still clears the icon by the same distance.
    */
    function anchorOf(el: HTMLElement): (height: number) => Point {
      return (height) => {
        const c = centreOf(el);
        return { x: c.x, y: c.y + el.offsetHeight / 2 + 10 + height / 2 };
      };
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
      with him, so it stays the same distance above whatever size he is. A pill of several lines is
      centred higher, so its bottom edge clears his head as a one-line pill's does.
    */
    const portal = (height: number = BUD): Point => {
      const box = host!.getBoundingClientRect();
      const him = waldo!.getBoundingClientRect();
      return {
        x: him.left - box.left + him.width / 2,
        y: him.top - box.top - him.height * 0.55 - (height - BUD) / 2,
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

    /**
      A pill in two parts: what it is (a tool's mark, or a spinner that turns into a tick), then the
      words, on one line. The words sit in a body whose width is fixed once the pill has been
      measured (as wide as the words, up to the most the screen allows), so nothing reflows while it
      opens and closes; a line that is still too long ends in an ellipsis, in the text only.
    */
    function makeCard(opts: {
      tool?: ToolId;
      text: string;
      full?: string;
      out: boolean;
    }) {
      const node = document.createElement("div");
      node.className =
        "site-loop-card" + (opts.out ? " site-loop-card--out" : "");
      if (opts.full) node.dataset.full = opts.full;
      const body = document.createElement("div");
      body.className = "site-loop-body";
      const slot = document.createElement("span");
      slot.className = "site-loop-slot";
      slot.innerHTML = opts.out
        ? SPIN_SVG + TICK_SVG
        : `<img src="/assets/connectors/${opts.tool}.svg" alt="" />`;
      body.appendChild(slot);
      const text = document.createElement("span");
      text.className = "site-loop-text";
      const words = opts.text.split(" ").map((word, i) => {
        if (i) text.appendChild(document.createTextNode(" "));
        const el = document.createElement("span");
        el.className = "site-loop-word";
        el.textContent = word;
        text.appendChild(el);
        return el;
      });
      body.appendChild(text);
      node.appendChild(body);
      return { node, body, slot, words };
    }

    /**
      The motion, after the recording Suyash shared: a dot pops out of its source, stretches into a
      pill while the words roll up inside it, travels, then squeezes back to a dot and disappears
      into wherever it is going. The ends follow the live position of the source and the target,
      so a card stays attached to its own icon even while the row drifts.
    */
    // The next signal waits for the air to be clear, so only a signal and then its reply are ever in
    // it, one after the other, and the area above his head never turns into a pile-up.
    let inFlight = 0;
    let repliesWaiting = 0;

    function fly(
      card: ReturnType<typeof makeCard>,
      from: (height: number) => Point,
      to: (height: number) => Point,
      onLand: () => void,
    ) {
      const { node, body, slot, words } = card;
      host!.appendChild(node);
      inFlight += 1;
      // Measure the pill at its full size (as wide as its words want, up to its maximum) and fix the
      // body to that width.
      node.style.width = "max-content";
      node.style.height = "auto";
      // Rounded up, so the text is never a fraction of a pixel short and ends in an ellipsis for nothing
      const full = Math.ceil(node.getBoundingClientRect().width);
      const tall = Math.ceil(node.getBoundingClientRect().height);
      body.style.flex = "none";
      body.style.width = `${full - CARD_EDGE}px`;
      const spin = slot.querySelector<SVGElement>(".spin");
      const tick = slot.querySelector<SVGPathElement>(".tick path");
      const OPEN = 0.17;
      const CLOSE = 0.17;
      const t0 = performance.now();
      let landed = false;

      const step = (now: number) => {
        const u = clamp01((now - t0) / FLIGHT_MS);
        const a = from(tall);
        const b = to(tall);
        const p = smoother(clamp01((u - 0.1) / 0.8));
        let x = a.x + (b.x - a.x) * p;
        const y = a.y + (b.y - a.y) * p;

        const o = clamp01(u / OPEN);
        const c = clamp01((u - (1 - CLOSE)) / CLOSE);
        const pop = outBack(clamp01(o / 0.3));
        const stretch = outBack(clamp01((o - 0.3) / 0.7));
        const squeeze = inOut(clamp01(c / 0.65));
        const fade = inCubic(clamp01((c - 0.65) / 0.35));

        const open = Math.max(0, stretch) * (1 - squeeze);
        const width = BUD + (full - BUD) * open;
        const height = BUD + (tall - BUD) * open;
        const scale = Math.max(0, pop) * (1 - 0.8 * fade);

        // A wide pill that opens near a side is pushed in, so none of it leaves the screen (and one
        // as wide as the screen allows sits in the middle of it).
        const reach = (width * scale) / 2;
        const inset = host!.getBoundingClientRect().left;
        const left = CARD_MARGIN - inset;
        const right =
          document.documentElement.clientWidth - CARD_MARGIN - inset;
        x =
          right - left > reach * 2
            ? Math.min(right - reach, Math.max(left + reach, x))
            : (left + right) / 2;

        node.style.width = `${width.toFixed(1)}px`;
        node.style.height = `${height.toFixed(1)}px`;
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
    // Signals go one at a time, each from its own place on the row as that passes through the low
    // zone. The next one waits for its place to arrive, which is two along from the last one's.
    let next = 0;
    let armed = true;
    let armAt = 0;
    let cooldown = 0;
    let repliesHome = 0;

    function send(index: number, mark: HTMLElement) {
      const item = STORY[index];
      if (index === 0) repliesHome = 0;
      const anchor = anchorOf(mark);

      const signal = makeCard({
        tool: item.tool,
        text: item.says,
        full: item.full,
        out: false,
      });
      fly(signal, anchor, portal, () => {
        swallow();
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
          fly(reply, portal, anchor, () => {
            repliesHome += 1;
            if (repliesHome === STORY.length) {
              next = 0;
              armAt = performance.now() + HOLD_MS;
              armed = true;
            }
          });
        };
        wait(REPLY_DELAY, launch);
      });
    }

    const drift = (now: number) => {
      if (!alive) return;
      // A frame after a long pause (the tab was in the background) moves the row on by a frame, not by
      // the time it was away, or the next icon would have drifted past its window.
      if (last)
        offset +=
          (Math.min(now - last, 100) / 1000) * DRIFT * (pitch / REF_PITCH);
      last = now;
      place(now);

      // A new signal goes when the air is clear (the previous signal's reply has been and gone, so an
      // incoming pill never meets one), and its connector is at the middle or only a little past it.
      const room = inFlight === 0 && repliesWaiting === 0;
      if (armed && room && now >= armAt && now >= cooldown) {
        const zone = zoneMark(slotOf(next));
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
          <span
            key={seat.key}
            className="site-loop-mark"
            data-tool={seat.tool}
            data-slot={seat.slot}
          >
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
      </div>
    </div>
  );
}
