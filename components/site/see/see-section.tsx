"use client";

import { type CSSProperties, type KeyboardEvent, type ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { PhoneDots } from "../phone-dots";
import { useLive } from "../use-live";
import { OutboxScreen, OverviewScreen } from "./brief";
import { ChatScreen, PlanScreen } from "./chat";
import { SlideState } from "./kit";
import { OvernightScreen } from "./lock";
import { SEE_CARDS, SEE_SECTION } from "./see-fixture";

import "./see.css";

// "What you see of it": five large cards in a horizontal strip, the neighbours showing at the edges,
// one set of controls under it (see docs/website/what-you-see-plan.md). The strip is native sideways
// scroll with snapping (so touch, trackpad and keys behave natively), with mouse drag added; the
// buttons, dots and keys all go through goTo(). It plays by itself (8 seconds a card, like the dots
// under the hero's phone), holds on hover and on focus inside the section, and with less motion it
// never moves by itself. It never ends, like the last section on apple.com/in: the five cards are laid
// out three times over, the middle set is the real one, and when the strip comes to rest in either
// outer set it is moved, unseen, to the same card in the middle set. Presentation only: nothing in a
// screen sends, approves or records anything.

/** How long each card stays before the strip moves on: long enough for its screen to play through */
const HOLD_MS: Record<string, number> = { overview: 17500, chat: 19000, health: 22000, handoff: 9000, "catch-up": 8000 };
const DRAG = 4;
/** How long the strip has to be still before it is moved back to the middle set, in ms */
const REST_MS = 160;
/** A copy of a card is swapped for the real one only after its screen has finished playing, in ms */
const ARRIVE_MS = 23000;

const SCREENS: Record<string, ReactNode> = {
  overview: <OverviewScreen />,
  chat: <ChatScreen />,
  health: <PlanScreen />,
  handoff: <OutboxScreen />,
  "catch-up": <OvernightScreen />,
};

export function SeeSection() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const count: number = SEE_CARDS.length;
  const total = count * 3;
  // Where the strip is, as a place among all the slides (the middle set is count to 2 * count - 1)
  const [pos, setPos] = useState(count);
  const [held, setHeld] = useState(false);
  const [calm, setCalm] = useState(false);
  const [lap, setLap] = useState(0);
  // Which part of the day card 1's brief is showing (shared by every copy of it)
  const [hero, setHero] = useState(1);
  const live = useLive(root);
  const index = pos % count;
  // The place in the middle, for the handlers below that outlive a render
  const current = useRef(count);
  useEffect(() => {
    current.current = pos;
  }, [pos]);
  // The hold under the current dot starts again whenever the card changes, not when the strip is re-set
  // The slide whose screen plays its arrival: the one the strip was moved to when the card last changed.
  // Swapping a copy for the real slide (below) is not a new arrival, so it does not play again.
  const [visit, setVisit] = useState(count);
  useEffect(() => {
    setLap((n) => n + 1);
    setVisit(current.current);
  }, [index]);

  useEffect(() => {
    setCalm(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const goTo = useCallback(
    (to: number, instant = false) => {
      const el = track.current;
      const card = el?.children[Math.max(0, Math.min(total - 1, to))] as HTMLElement | undefined;
      if (!el || !card) return;
      const left = card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2;
      el.scrollTo({ left, behavior: instant || calm ? "auto" : "smooth" });
    },
    [total, calm],
  );

  // To a card by its number: whichever copy of it is nearest, so it never travels the long way round
  const select = useCallback(
    (card: number) => {
      let d = (card - (current.current % count) + count) % count;
      if (d > count / 2) d -= count;
      goTo(current.current + d);
    },
    [count, goTo],
  );

  // Which slide is in the middle follows the scroll, however it got there; once the strip has been
  // still for a moment, a place in an outer set is swapped for the same card in the middle set
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    let rest = 0;
    const read = () => {
      frame = 0;
      const middle = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let gap = Infinity;
      Array.from(el.children).forEach((child, i) => {
        const card = child as HTMLElement;
        const d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - middle);
        if (d < gap) {
          gap = d;
          best = i;
        }
      });
      setPos(best);
      current.current = best;
    };
    const settle = () => {
      if (el.hasAttribute("data-dragging")) return;
      const at = current.current;
      if (at < count) goTo(at + count, true);
      else if (at >= count * 2) goTo(at - count, true);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
      window.clearTimeout(rest);
      // At the very ends of the three sets there is nowhere further to go, so it is moved at once
      const edge = current.current <= 0 || current.current >= total - 1;
      const outer = current.current < count || current.current >= count * 2;
      rest = window.setTimeout(settle, outer && !edge ? ARRIVE_MS : REST_MS);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      window.clearTimeout(rest);
    };
  }, [count, total, goTo]);

  // The first card is centred (in the middle set) before the first paint, and again if the window changes
  useLayoutEffect(() => {
    goTo(current.current, true);
    const onResize = () => goTo(current.current, true);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mouse drag: after 4px it is a drag, a pull of more than 80px turns one card, and it never counts as a click
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let active = false;
    let moved = false;
    let startX = 0;
    let startLeft = 0;
    const down = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      if ((event.target as HTMLElement).closest("button, input, textarea, a")) return;
      active = true;
      moved = false;
      startX = event.clientX;
      startLeft = el.scrollLeft;
    };
    const move = (event: PointerEvent) => {
      if (!active) return;
      const d = event.clientX - startX;
      if (Math.abs(d) > DRAG) {
        moved = true;
        el.setAttribute("data-dragging", "");
      }
      if (moved) el.scrollLeft = startLeft - d;
    };
    const up = (event: PointerEvent) => {
      if (!active) return;
      active = false;
      el.removeAttribute("data-dragging");
      if (moved) {
        const pull = startX - event.clientX;
        const target = Math.abs(pull) > 80 ? current.current + Math.sign(pull) : current.current;
        goTo(target);
        // The click that follows a drag is swallowed; if none follows (released elsewhere), do not keep swallowing
        window.setTimeout(() => {
          moved = false;
        }, 0);
      }
    };
    const noNativeDrag = (event: DragEvent) => event.preventDefault();
    const click = (event: MouseEvent) => {
      if (!moved) return;
      event.stopPropagation();
      event.preventDefault();
      moved = false;
    };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    el.addEventListener("click", click, true);
    el.addEventListener("dragstart", noNativeDrag);
    return () => {
      el.removeEventListener("dragstart", noNativeDrag);
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      el.removeEventListener("click", click, true);
    };
  }, [goTo]);

  // It plays by itself, like the dots under the hero's phone: only while on screen and not held by the
  // pointer or by focus, and never with less motion. The fill that crosses the current dot is the hold;
  // when it has crossed, the next card comes, and after the fifth the first, without end. A click, a key
  // or a drag moves to that card and the hold starts again from there.
  const running = live && !held && !calm;

  const keys = (event: KeyboardEvent) => {
    if (event.target !== track.current) return;
    if (event.key === "ArrowRight") goTo(pos + 1);
    else if (event.key === "ArrowLeft") goTo(pos - 1);
    else if (event.key === "Home") select(0);
    else if (event.key === "End") select(count - 1);
    else return;
    event.preventDefault();
  };

  return (
    <div
      className="see"
      ref={root}
      data-live={live && !calm ? "" : undefined}
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      <p className="see-sr">{SEE_SECTION.demoNote}</p>
      <div
        className="see-track"
        ref={track}
        role="region"
        aria-roledescription="carousel"
        aria-label="What you see of it"
        tabIndex={0}
        onKeyDown={keys}
      >
        {Array.from({ length: total }, (_, p) => {
          const card = SEE_CARDS[p % count];
          const copy = p < count || p >= count * 2;
          return (
            <SlideState.Provider key={p} value={{ active: p === pos, arrive: p === pos && p === visit, inView: live && !calm, running, hero, setHero }}>
            <section
              className="see-card-slide"
              data-card={card.id}
              data-active={p === pos ? "" : undefined}
              data-arrive={p === pos && p === visit ? "" : undefined}
              role="group"
              aria-roledescription="slide"
              aria-label={`${(p % count) + 1} of ${count}: ${card.name}`}
              // Only the card in the middle can be used or read out; the peeking neighbours (and the
              // extra copies the loop needs) are pictures until they come to the middle
              inert={p !== pos}
              data-copy={copy ? "" : undefined}
            >
              <div className="see-inner">
                <div className="see-copy" style={{ "--copy-ch": card.copyCh } as CSSProperties}>
                  <h3>{card.headline}</h3>
                  <p>{card.line}</p>
                </div>
                <div className="see-stage">{SCREENS[card.id]}</div>
              </div>
            </section>
            </SlideState.Provider>
          );
        })}
      </div>

      <div className="see-controls">
        {/* Previous and next for keyboards and assistive tech; the dots are the visible control */}
        <button type="button" className="see-sr" aria-label="Previous card" onClick={() => goTo(pos - 1)} />
        <PhoneDots
          count={count}
          active={index}
          running={running}
          done={false}
          duration={HOLD_MS[SEE_CARDS[index].id] ?? 9000}
          stamp={lap}
          label="Choose a card"
          names={SEE_CARDS.map((card) => card.name)}
          onSelect={select}
          onDone={() => goTo(current.current + 1)}
        />
        <button type="button" className="see-sr" aria-label="Next card" onClick={() => goTo(pos + 1)} />
      </div>
    </div>
  );
}
