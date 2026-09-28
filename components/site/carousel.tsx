"use client";

import { Children, type CSSProperties, type ReactNode, useEffect, useRef } from "react";

// Three-card rows become a sideways carousel, rebuilt to behave like the one on tutundzhian.com
// (measured 2026-09-28; the numbers below are theirs, the code is ours):
// - native sideways scroll with soft snapping, so trackpads and phones feel native
// - with a mouse, drag to scroll. A drag counts after 4px. On release it settles onto the
//   nearest card if that card is within 65px (or you're at the end). A drag never counts as a click
// - each card rises 20px and fades in as it comes into view, 80ms after the one before
// - hover: the picture frame grows to 101% (97% when pressed) on a spring, the picture zooms to
//   104%, and a soft light follows the cursor, easing 9% of the way there each frame
// Sizes, spacing and the CSS side of the motion live in site.css under "Carousel".

const DRAG_THRESHOLD = 4;
const SETTLE_DISTANCE = 65;
const LIGHT_EASE = 0.09;
const CARD_DELAY = 80;

type Light = { x: number; y: number; o: number; tx: number; ty: number; to: number };

export function Carousel({ children, label = "Cards" }: { children: ReactNode; label?: string }) {
  const track = useRef<HTMLDivElement>(null);

  // Mouse drag
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let active = false;
    let moved = false;
    let startX = 0;
    let startLeft = 0;

    function down(event: PointerEvent) {
      if (event.pointerType !== "mouse" || event.button !== 0 || !el) return;
      active = true;
      moved = false;
      startX = event.clientX;
      startLeft = el.scrollLeft;
      el.setAttribute("data-dragging", "");
    }
    function move(event: PointerEvent) {
      if (!active || !el) return;
      const distance = event.clientX - startX;
      if (Math.abs(distance) > DRAG_THRESHOLD) moved = true;
      el.scrollLeft = startLeft - distance;
    }
    function release(settle: boolean) {
      if (!active || !el) return;
      active = false;
      if (settle && moved) {
        const padding = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
        const stops = Array.from(el.children, (card) => Math.max(0, (card as HTMLElement).offsetLeft - padding));
        let nearest = stops[0] ?? 0;
        let gap = Infinity;
        for (const stop of stops) {
          const distance = Math.abs(el.scrollLeft - stop);
          if (distance < gap) {
            gap = distance;
            nearest = stop;
          }
        }
        const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 5;
        if (atEnd || gap <= SETTLE_DISTANCE) el.scrollTo({ left: nearest, behavior: "smooth" });
      }
      el.removeAttribute("data-dragging");
    }
    const up = () => release(true);
    const cancel = () => release(false);
    function click(event: MouseEvent) {
      if (!moved) return;
      event.stopPropagation();
      event.preventDefault();
      moved = false;
    }
    const noNativeDrag = (event: DragEvent) => event.preventDefault();

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointerleave", cancel);
    el.addEventListener("pointercancel", cancel);
    el.addEventListener("click", click, true);
    el.addEventListener("dragstart", noNativeDrag);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointerleave", cancel);
      el.removeEventListener("pointercancel", cancel);
      el.removeEventListener("click", click, true);
      el.removeEventListener("dragstart", noNativeDrag);
    };
  }, []);

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

  return (
    // A scrollable region: focusable so it can be scrolled with the keyboard too
    <div ref={track} className="site-carousel" role="region" aria-label={label} tabIndex={0}>
      {Children.map(children, (child, index) => (
        <div className="site-carousel-card" style={{ "--card-delay": `${index * CARD_DELAY}ms` } as CSSProperties}>
          {child}
        </div>
      ))}
    </div>
  );
}
