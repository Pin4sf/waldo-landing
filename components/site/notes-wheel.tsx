"use client";

import "./notes-wheel.css";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type CSSProperties, type MouseEvent, useEffect, useRef, useState } from "react";

// The homepage's notes: every published post rides one big wheel. Scrolling turns it, one note
// at a time, and the caption under the wheel names the note at the top. After the last turn the
// wheel is back on the newest note, the others fade and that one stays. Clicking a card opens the
// note, and its picture grows into the article's picture (a view transition).
// Reference: the Screen Recording of 2026-10-12 (an arc of cards turned by scroll).

export type WheelNote = {
  slug: string;
  title: string;
  /** Where the headline breaks, as the post's frontmatter sets it */
  titleLines: string[];
  category: string;
  image: string;
  imageAlt: string;
  readingTime: number;
};

// How much of a turn each card gets, as a share of the scroll the section is pinned for.
// The extra 0.9 is the settle at the end, where the other cards fade.
const SETTLE_SHARE = 0.9;
// Time constant of the smoothing between scroll and wheel, in ms. Larger is softer.
const SMOOTHING_MS = 140;
// All the notes share 160° of the wheel, so the arc runs edge to edge with every note on it.
// As notes are added they close up, down to 18° apart (the reference's spacing).
const ARC = (160 * Math.PI) / 180;
const MIN_STEP = (18 * Math.PI) / 180;
// The wheel wraps half a turn of notes away from the top; cards fade out just before that,
// so a card leaving one side and coming back on the other is never seen jumping.
const FADE_SPAN = 0.6;

export function NotesWheel({ notes }: { notes: WheelNote[] }) {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const count = notes.length;

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage || count === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let radius = 0;
    const step = Math.max(MIN_STEP, ARC / count);
    let top = 0;
    let travel = 0;
    let current = { turn: 0, settle: 0 };
    let shownActive = -1;
    let frame = 0;
    let last = 0;
    let visible = false;

    function measure() {
      width = stage!.clientWidth;
      height = stage!.clientHeight;
      const cardHeight = (cardRefs.current[0]?.offsetHeight ?? 160);
      // Measured off the reference: the wheel's radius is about 0.42 of the width, and the top
      // card sits a little above the middle of the screen.
      radius = Math.max(width * 0.42, 300);
      top = Math.max(cardHeight / 2 + 72, height * 0.44);
      travel = Math.max(1, root!.offsetHeight - height);
    }

    function target() {
      const scrolled = Math.min(travel, Math.max(0, -root!.getBoundingClientRect().top));
      const perCard = travel / (count + SETTLE_SHARE);
      return {
        turn: Math.min(count, scrolled / perCard),
        settle: Math.min(1, Math.max(0, (scrolled - count * perCard) / (SETTLE_SHARE * perCard))),
      };
    }

    function paint() {
      const { turn, settle } = current;
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        // Distance from the top of the wheel, wrapped so every note appears once.
        let distance = index - turn;
        distance -= Math.round(distance / count) * count;
        const angle = distance * step;
        const x = Math.sin(angle) * radius;
        const y = top + (1 - Math.cos(angle)) * radius;
        const away = Math.abs(distance);
        const edge = count / 2;
        let opacity = Math.min(1, Math.max(0, (edge - away) / FADE_SPAN));
        const centred = Math.max(0, 1 - away);
        opacity *= 1 - settle * (1 - centred);
        const scale = 1 + settle * centred * 0.16;
        card.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${angle}rad) scale(${scale})`;
        card.style.opacity = opacity.toFixed(3);
        card.style.visibility = opacity < 0.01 ? "hidden" : "";
        card.style.zIndex = String(100 - Math.round(away * 10));
      });

      const next = ((Math.round(turn) % count) + count) % count;
      if (next !== shownActive) {
        shownActive = next;
        setActive(next);
      }
    }

    function tick(now: number) {
      frame = 0;
      const goal = target();
      const elapsed = last ? Math.min(64, now - last) : 16;
      last = now;
      const blend = reduced.matches ? 1 : 1 - Math.exp(-elapsed / SMOOTHING_MS);
      current = {
        turn: current.turn + (goal.turn - current.turn) * blend,
        settle: current.settle + (goal.settle - current.settle) * blend,
      };
      if (Math.abs(goal.turn - current.turn) < 0.0005) current.turn = goal.turn;
      if (Math.abs(goal.settle - current.settle) < 0.0005) current.settle = goal.settle;
      paint();
      const moving = current.turn !== goal.turn || current.settle !== goal.settle;
      if (moving || visible) frame = requestAnimationFrame(tick);
      else last = 0;
    }

    function wake() {
      if (!frame) frame = requestAnimationFrame(tick);
    }

    function onResize() {
      measure();
      paint();
      wake();
    }

    measure();
    current = target();
    paint();
    root.dataset.ready = "";

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        last = 0;
        wake();
      }
    });
    observer.observe(root);
    window.addEventListener("resize", onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [count]);

  // Tabbing to a card turns the wheel to it. A mouse press also focuses the card, but turning
  // then would slide the card out from under the pointer, so only keyboard focus counts.
  function focusCard(index: number) {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;
    const travel = root.offsetHeight - stage.clientHeight;
    const perCard = travel / (count + SETTLE_SHARE);
    const rootTop = root.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: rootTop + index * perCard, behavior: "instant" });
  }

  // The card's picture becomes the article's picture. Without view transitions it's a normal link.
  function openNote(event: MouseEvent<HTMLAnchorElement>, slug: string, card: HTMLElement | null) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!("startViewTransition" in document)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (!card) return;

    event.preventDefault();
    const href = `/blogs/${slug}`;
    card.style.viewTransitionName = "note-art";
    document.documentElement.setAttribute("data-note-transition", "");

    const transition = document.startViewTransition(
      () =>
        new Promise<void>((resolve) => {
          const done = () => {
            observer.disconnect();
            clearTimeout(timeout);
            // The new page is captured at its top, where it opens. Not in a frame callback: frames
            // are paused while a view transition waits for its update.
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: "instant" });
              resolve();
            }, 0);
          };
          const observer = new MutationObserver(() => {
            if (document.querySelector(`[data-note-art="${slug}"]`)) done();
          });
          const timeout = setTimeout(done, 2500);
          observer.observe(document.body, { childList: true, subtree: true });
          router.push(href);
        }),
    );
    transition.finished.finally(() => {
      card.style.viewTransitionName = "";
      document.documentElement.removeAttribute("data-note-transition");
    });
  }

  if (count === 0) return null;

  return (
    <div
      ref={rootRef}
      className="nw"
      style={{ "--nw-count": count } as CSSProperties}
    >
      <div ref={stageRef} className="nw-stage">
        <div className="nw-ring">
          {notes.map((note, index) => (
            <Link
              key={note.slug}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              href={`/blogs/${note.slug}`}
              className="nw-card"
              aria-label={note.title}
              onFocus={(event) => {
                if (event.currentTarget.matches(":focus-visible")) focusCard(index);
              }}
              onClick={(event) => openNote(event, note.slug, event.currentTarget)}
            >
              <Image
                src={note.image}
                alt={note.imageAlt}
                fill
                sizes="(max-width: 767px) 120px, 180px"
                // Cards turn in from out of sight, where lazy pictures never start loading.
                loading="eager"
                fetchPriority="low"
                draggable={false}
              />
            </Link>
          ))}
        </div>

        <div className="nw-captions">
          {notes.map((note, index) => (
            <div
              key={note.slug}
              className="nw-caption"
              data-active={index === active ? "" : undefined}
              aria-hidden={index === active ? undefined : true}
            >
              <Link
                href={`/blogs/${note.slug}`}
                className="nw-title"
                tabIndex={-1}
                onClick={(event) => openNote(event, note.slug, cardRefs.current[index])}
              >
                {note.titleLines.map((line) => (
                  <span key={line}>{line} </span>
                ))}
              </Link>
              <p className="nw-meta">
                {note.category}, {note.readingTime} min read
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
