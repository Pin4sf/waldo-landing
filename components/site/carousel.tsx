"use client";

import { Children, type CSSProperties, type KeyboardEvent, type ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { refreshLive } from "./use-live";

// Three-card rows become a sideways carousel, rebuilt to behave like the one on tutundzhian.com
// (measured 2026-09-28; the numbers below are theirs, the code is ours):
// - native sideways scroll with soft snapping, so trackpads and phones feel native. No mouse drag
//   (removed 2026-10-03): the row moves by scrolling, or by the two round arrows under it (after
//   apple.com/in), which step one card at a time
// - each card rises 20px and fades in as it comes into view, 80ms after the one before
// - hover: the picture frame grows to 101% (97% when pressed) on a spring, the picture zooms to
//   104%, and a soft light follows the cursor, easing 9% of the way there each frame
// Sizes, spacing and the CSS side of the motion live in site.css under "Carousel".
//
// `loop` (2026-10-04) makes it a centred carousel with no end, like the five-card section: the cards sit
// in the middle with their neighbours showing on both sides, the arrows go round, and the cards are laid
// out three times over. The middle set is the real one (the other two are inert pictures); when the row
// comes to rest in an outer set it is moved, unseen, to the same card in the middle set.

const LIGHT_EASE = 0.09;
const CARD_DELAY = 80;

type Light = { x: number; y: number; o: number; tx: number; ty: number; to: number };

/** The scroll position that puts a card in the middle of the row */
const centreOf = (el: HTMLElement, card: HTMLElement) => card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2;

export function Carousel({ children, label = "Cards", loop = false }: { children: ReactNode; label?: string; loop?: boolean }) {
  const track = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const count = items.length;
  const sets = loop ? [0, 1, 2] : [0];
  const [edge, setEdge] = useState({ start: true, end: false, fits: true });
  const loopGo = useRef<(direction: 1 | -1) => void>(() => {});

  // The card nearest the middle of the row (loop mode)
  function nearest(el: HTMLElement) {
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
    return best;
  }

  // Which arrows work: not "back" at the first card, not "forward" at the last. No arrows at all if every card fits
  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const fits = el.scrollWidth <= el.clientWidth + 2;
    setEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft >= el.scrollWidth - el.clientWidth - 2, fits });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  // One card at a time: to the first card that starts past the current edge, or the last one that starts before it
  function step(direction: 1 | -1) {
    const el = track.current;
    if (!el) return;
    if (loop) {
      loopGo.current(direction);
      return;
    }
    const padding = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
    const stops = Array.from(el.children, (card) => Math.max(0, (card as HTMLElement).offsetLeft - padding));
    const target =
      direction === 1 ? stops.find((stop) => stop > el.scrollLeft + 2) : [...stops].reverse().find((stop) => stop < el.scrollLeft - 2);
    el.scrollTo({ left: target ?? (direction === 1 ? el.scrollWidth : 0), behavior: "smooth" });
  }

  // Loop: start on the first real card, and once the row has been still for a moment, move it from an outer
  // set to the same card in the middle set. Also keep the card in the middle when the window changes.
  // The arrows move the row with a spring of our own (not the browser's smooth scroll), so that pressing
  // them quickly keeps one smooth motion: each press moves the target one card on and the row, still
  // moving, curves towards it. While it moves the row is kept inside the middle set (shifted by one set
  // of cards, unseen, when it crosses the edge), so there is no limit to how far a run of presses goes.
  useLayoutEffect(() => {
    const el = track.current;
    if (!loop || !el) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const first = () => el.children[count] as HTMLElement;
    const pitch = () => (el.children[count + 1] as HTMLElement).offsetLeft - first().offsetLeft;
    const base = () => centreOf(el, first());

    // Only the card in the middle moves (its pictures play; the others hold still): it is marked data-centre
    let marked: Element | null = null;
    const markCard = (card: Element | null) => {
      if (card === marked) return;
      marked?.removeAttribute("data-centre");
      card?.setAttribute("data-centre", "");
      marked = card;
      refreshLive();
    };

    let moving = false;
    let n = 0; // the target, in cards from the first real card (any whole number)
    let x = 0;
    let v = 0;
    let raf = 0;
    let last = 0;
    let frameMark = 0;
    const mark = () => {
      frameMark = 0;
      if (moving) markCard(el.children[count + (((n % count) + count) % count)] ?? null);
      else markCard(el.children[nearest(el)] ?? null);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      if (moving) {
        moving = false;
        el.style.scrollSnapType = "";
      }
    };
    const tick = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      const target = base() + n * pitch();
      const w = 14; // a critically damped spring: no overshoot, settles in about half a second
      v += (-w * w * (x - target) - 2 * w * v) * dt;
      x += v * dt;
      // keep inside the middle set: one set of cards later or earlier looks exactly the same
      const set = pitch() * count;
      const lo = base() - set / 2;
      while (x >= lo + set) {
        x -= set;
        n -= count;
      }
      while (x < lo) {
        x += set;
        n += count;
      }
      el.scrollLeft = x;
      const end = base() + n * pitch();
      if (Math.abs(x - end) < 0.4 && Math.abs(v) < 4) {
        el.scrollLeft = end;
        // come to rest on a card of the middle set (the real, focusable one), not on a copy of it
        let k = Math.round((end - base()) / pitch());
        while (k < 0) {
          el.scrollLeft += set;
          k += count;
        }
        while (k >= count) {
          el.scrollLeft -= set;
          k -= count;
        }
        stop();
        mark();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    loopGo.current = (direction) => {
      if (calm) {
        el.scrollLeft = base() + (Math.round((el.scrollLeft - base()) / pitch()) + direction) * pitch();
        return;
      }
      if (!moving) {
        moving = true;
        x = el.scrollLeft;
        v = 0;
        n = Math.round((x - base()) / pitch());
        el.style.scrollSnapType = "none"; // the browser's snapping would pull against the spring
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
      n += direction;
      mark();
    };

    el.scrollLeft = base();
    mark();
    let keep = count;
    let rest = 0;
    const onScroll = () => {
      if (moving) return;
      if (!frameMark) frameMark = requestAnimationFrame(mark);
      window.clearTimeout(rest);
      rest = window.setTimeout(() => {
        const at = nearest(el);
        keep = at < count ? at + count : at >= count * 2 ? at - count : at;
        if (keep !== at) el.scrollTo({ left: centreOf(el, el.children[keep] as HTMLElement), behavior: "instant" });
        mark();
      }, 140);
    };
    const onResize = () => {
      stop();
      el.scrollTo({ left: centreOf(el, el.children[keep] as HTMLElement), behavior: "instant" });
      mark();
    };
    // a finger, wheel or pointer on the row takes over from the spring
    const takeOver = () => stop();
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("wheel", takeOver, { passive: true });
    el.addEventListener("touchstart", takeOver, { passive: true });
    el.addEventListener("pointerdown", takeOver, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      stop();
      window.clearTimeout(rest);
      cancelAnimationFrame(frameMark);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("wheel", takeOver);
      el.removeEventListener("touchstart", takeOver);
      el.removeEventListener("pointerdown", takeOver);
      window.removeEventListener("resize", onResize);
      marked?.removeAttribute("data-centre");
    };
  }, [loop, count]);

  // Cards rise in as they come into view (sideways too, so the third one arrives as you scroll)
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cards.forEach((card) => card.setAttribute("data-shown", ""));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" },
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  // The light that follows the cursor across a picture
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lights = new Map<HTMLElement, Light>();
    let frame = 0;

    function tick() {
      frame = 0;
      let busy = false;
      for (const [frameEl, light] of lights) {
        light.x += (light.tx - light.x) * LIGHT_EASE;
        light.y += (light.ty - light.y) * LIGHT_EASE;
        light.o += (light.to - light.o) * LIGHT_EASE;
        frameEl.style.setProperty("--light-x", `${light.x}%`);
        frameEl.style.setProperty("--light-y", `${light.y}%`);
        frameEl.style.setProperty("--light-o", String(light.o));
        const settled = Math.abs(light.tx - light.x) < 0.05 && Math.abs(light.ty - light.y) < 0.05 && Math.abs(light.to - light.o) < 0.002;
        if (settled && light.to === 0) lights.delete(frameEl);
        else if (!settled) busy = true;
      }
      if (busy) frame = requestAnimationFrame(tick);
    }
    const run = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    function move(event: MouseEvent) {
      const frameEl = (event.target as Element).closest<HTMLElement>(".site-visual");
      if (!frameEl || !el?.contains(frameEl)) return;
      const box = frameEl.getBoundingClientRect();
      const light = lights.get(frameEl) ?? { x: 50, y: 50, o: 0, tx: 50, ty: 50, to: 0 };
      light.tx = ((event.clientX - box.left) / box.width) * 100;
      light.ty = ((event.clientY - box.top) / box.height) * 100;
      light.to = 1;
      lights.set(frameEl, light);
      run();
    }
    function leave(event: MouseEvent) {
      const frameEl = (event.target as Element).closest<HTMLElement>(".site-visual");
      if (!frameEl) return;
      const next = event.relatedTarget as Node | null;
      if (next && frameEl.contains(next)) return;
      const light = lights.get(frameEl);
      if (light) {
        light.to = 0;
        run();
      }
    }

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseout", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseout", leave);
      cancelAnimationFrame(frame);
    };
  }, []);

  const keys = (event: KeyboardEvent) => {
    if (!loop || event.target !== track.current) return;
    if (event.key === "ArrowRight") step(1);
    else if (event.key === "ArrowLeft") step(-1);
    else return;
    event.preventDefault();
  };

  return (
    <>
      {/* A scrollable region: focusable so it can be scrolled with the keyboard too */}
      <div ref={track} className="site-carousel" data-loop={loop ? "" : undefined} role="region" aria-roledescription={loop ? "carousel" : undefined} aria-label={label} tabIndex={0} onKeyDown={keys}>
        {sets.flatMap((set) =>
          items.map((child, index) => {
            const copy = loop && set !== 1;
            return (
              <div
                key={`${set}-${index}`}
                className="site-carousel-card"
                style={{ "--card-delay": `${index * CARD_DELAY}ms` } as CSSProperties}
                // the extra copies the loop needs are pictures only: not focusable, not read out
                inert={copy}
                aria-hidden={copy ? true : undefined}
                role={loop ? "group" : undefined}
                aria-roledescription={loop ? "slide" : undefined}
                aria-label={loop && !copy ? `${index + 1} of ${count}` : undefined}
              >
                {child}
              </div>
            );
          }),
        )}
      </div>
      {edge.fits && !loop ? null : (
        <div className="site-carousel-arrows" data-center={loop ? "" : undefined}>
          <button type="button" aria-label="Previous" disabled={!loop && edge.start} onClick={() => step(-1)}>
            <svg width="9" height="14" viewBox="0 0 9 14" fill="none" aria-hidden="true">
              <path d="M7.5 1.5L2 7l5.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" aria-label="Next" disabled={!loop && edge.end} onClick={() => step(1)}>
            <svg width="9" height="14" viewBox="0 0 9 14" fill="none" aria-hidden="true">
              <path d="M1.5 1.5L7 7l-5.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
