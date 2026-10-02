"use client";

import Image from "next/image";
import { createContext, useContext, useEffect, useLayoutEffect, useRef } from "react";

import { HERO_STATES, chipTool, heldWork, leadFor, openWork, segments } from "../hero-states";

// The Overview card of card 1: the hero's own card, the one that writes itself. It plays through the
// 27 states of the hero's Wednesday (hero-states.ts), and when the state changes the card changes the
// way Linear's triage card does (screen recording, 2026-10-01): the card itself changes. The old one
// swells a little and fades, the new one grows into its place and fades in, and nothing inside the
// card animates on its own; the words are simply the new state's. What each state says is set with its subjects as small inline pills, each with the
// mark of the connector it lives in (a subject with no connector is just words).
//
// It steps only while its card is the one in the middle and the section is playing, and keeps its
// place between visits, so each visit shows the next few states. Every copy of the card that the
// strip's loop needs shows the same state, so a copy being swapped for the real one never changes it.

/** What the section tells a slide: is it the one in the middle, is it playing, and the shared state. */
export const SlideState = createContext<{
  active: boolean;
  /** The card has just been brought to the middle (not swapped in for a copy of itself): its screen plays */
  arrive: boolean;
  /** The section is on screen and moving (not held by the pointer): what a screen that plays by itself waits for */
  inView: boolean;
  running: boolean;
  hero: number;
  setHero: (next: number | ((n: number) => number)) => void;
}>({ active: false, arrive: false, inView: false, running: false, hero: HERO_STATES.length, setHero: () => {} });

/** How long a state stays before the next one lands, in ms. */
const STEP_MS = 2600;
/** The change itself, after the card in Linear's triage animation (screen recording, 2026-10-01,
    read frame by frame): the card in front comes toward you and goes: it moves down about 6px,
    swells to about 103% and fades to nothing in a third of a second. The next card is already there
    behind it, a little higher (about 10px) and a little smaller (about 96.5%), and as the old one
    leaves it comes forward into place, fading up. The cards behind dim and settle with it. Nothing
    inside a card moves on its own; the words are simply those of the state that is showing. */
const OUT_MS = 340;
const IN_MS = 520;
const IN_DELAY = 140;
const OUT_DY = 6;
const SWELL = 1.03;
const IN_DY = -10;
const GROW = 0.965;
/** Scaled about a point a little under the top of the card, so the part you see grows evenly. */
const ORIGIN = "50% 22%";

function Rich({ text }: { text: string }) {
  return (
    <>
      {segments(text).map((part, i) => {
        const tool = part.chip ? chipTool(part.text) : undefined;
        return tool ? (
          <span key={i} className="see-h-chip">
            <Image src={`/assets/connectors/${tool}.svg`} alt="" width={14} height={14} unoptimized />
            {part.text}
          </span>
        ) : (
          part.text
        );
      })}
    </>
  );
}

function changeCard(root: HTMLElement | null, was: number) {
  if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const card = root.querySelector<HTMLElement>(".see-h-card");
  if (!card) return;
  card.style.transformOrigin = ORIGIN;

  // A copy of the card that was in front is what swells and fades; the real card already holds the new state
  const ghost = card.cloneNode(true) as HTMLElement;
  ghost.classList.add("see-h-ghost");
  // The copy shows the state that is leaving (the real card already holds the one that has landed)
  ghost.querySelectorAll<HTMLElement>(".see-h-sheet").forEach((sheet, i) => {
    if (i + 1 === was) sheet.setAttribute("data-on", "");
    else sheet.removeAttribute("data-on");
  });
  Object.assign(ghost.style, {
    left: `${card.offsetLeft}px`,
    top: `${card.offsetTop}px`,
    width: `${card.offsetWidth}px`,
    height: `${card.offsetHeight}px`,
    transformOrigin: ORIGIN,
  });
  root.insertBefore(ghost, card);
  const out = ghost.animate(
    [
      { transform: "none", opacity: 1 },
      { transform: `translateY(${OUT_DY}px) scale(${SWELL})`, opacity: 0 },
    ],
    { duration: OUT_MS, easing: "cubic-bezier(0.3, 0, 0.6, 1)", fill: "forwards" },
  );
  out.onfinish = out.oncancel = () => ghost.remove();

  card.animate(
    [
      { transform: `translateY(${IN_DY}px) scale(${GROW})`, opacity: 0 },
      { transform: "none", opacity: 1 },
    ],
    { duration: IN_MS, delay: IN_DELAY, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" },
  );

  // The cards behind dim and settle with it
  root.querySelectorAll<HTMLElement>(".see-h-behind i").forEach((sliver) => {
    // They end at their own strength (fainter the further back), from a little fainter still
    const rest = parseFloat(getComputedStyle(sliver).opacity) || 1;
    sliver.animate(
      [
        { transform: "scaleX(0.97)", opacity: rest * 0.6 },
        { transform: "none", opacity: rest },
      ],
      { duration: IN_MS + IN_DELAY, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" },
    );
  });
}

export function OverviewPlayer() {
  const { active, running, hero, setHero } = useContext(SlideState);
  const root = useRef<HTMLDivElement>(null);
  const shown = useRef(hero);

  // Step to the next state while this is the card in view and the section is playing
  useEffect(() => {
    if (!active || !running) return;
    const id = window.setInterval(() => setHero((n) => (n % HERO_STATES.length) + 1), STEP_MS);
    return () => window.clearInterval(id);
  }, [active, running, setHero]);

  // The change starts before the new state is first painted (a layout effect), so the new card is never
  // seen at full strength for a frame; and only in the copy that is being looked at
  useLayoutEffect(() => {
    if (shown.current !== hero && active) changeCard(root.current, shown.current);
    shown.current = hero;
  }, [hero, active]);

  const open = openWork(hero).map((item) => item.id);
  const held = heldWork(hero).map((item) => item.id);

  return (
    <div className="see-h" ref={root}>
      <div className="see-h-behind" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="see-h-card" data-open={open.join(" ") || undefined} data-held={held.join(" ") || undefined}>
        <Image src="/assets/home/mascots/waldo-card.svg" alt="" width={63} height={49} unoptimized />
        {/* Every state sits in the same cell, so the card is as tall as the longest of them and never
            jumps; the one that is showing is the only one that is not hidden. */}
        <div className="see-h-sheets">
          {HERO_STATES.map((state, i) => (
            <div key={i} className="see-h-sheet" data-on={i + 1 === hero ? "" : undefined} aria-hidden={i + 1 === hero ? undefined : true}>
              {state.body.map((paragraph, k) => (
                <p key={k}>
                  <Rich text={paragraph} />
                </p>
              ))}
              <p className="see-h-lead">{leadFor(state.asks.length)}</p>
              <ul className="see-h-asks">
                {state.asks.map((ask) => (
                  <li key={ask.text}>
                    <Rich text={ask.text} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
