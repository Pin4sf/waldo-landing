// Footer — "Your health isn't going to fix itself."
//
// Layout: footer is 100svh, fixed bottom illustration, text block above.
//
// Desktop parallax (≥1024px):
//   As the user scrolls into the footer, foreground layers (dock pillars, dalmatian)
//   "rise into" the scene from below at faster rates than the background. The baked-in
//   versions of these elements stay in Suyash's composed SVG; the overlays animate
//   from offscreen-below up to their natural positions. At progress=1 the overlays
//   sit perfectly on top of the baked-in versions — no double-vision.
//
// Mobile/tablet: pure static (no overlays, no scroll listener) — Suyash's responsive
// SVGs handle those viewports.

"use client";

import { useEffect, useRef, useState } from "react";

// Foreground positions in Figma's 1440×811 desktop frame.
// Used as percentage coords so they track the SVG's natural aspect ratio at any width.
const SCENE_W = 1440;
const SCENE_H = 811;

const DOG     = { x: 569.19, y: 482.40, w: 128.54, h: 275.73, src: "/assets/parallax/dog.svg" };
const PILLAR_L = { x: 375.15, y: 405.80, w:  52.68, h: 295.59, src: "/assets/parallax/pillar-left.svg" };
const PILLAR_R = { x: 1089.61, y: 405.80, w:  52.68, h: 295.59, src: "/assets/parallax/pillar-right.svg" };

// Parallax distances (px), at progress=0 elements sit this far below natural position.
// Larger = more rise. Tuned for 100svh footer on a typical 16:9 viewport.
const RISE_DOG     = 110;
const RISE_PILLAR  = 50;
const SCENE_DRIFT  = 18; // background drifts slightly down at progress=0

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function pct(v: number, total: number) {
  return `${(v / total) * 100}%`;
}

export function FooterSection() {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(1); // initialise at 1 so SSR / no-JS renders settled

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 1024) return; // parallax desktop-only

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh   = window.innerHeight;
      // 0 when footer top is at viewport bottom (just entering view from below)
      // 1 when footer top has risen to viewport top (fully scrolled into footer)
      const p = Math.max(0, Math.min(1, (vh - rect.top) / vh));
      setProgress(p);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Translate offsets — at progress=0 elements are below natural; at progress=1 they're settled
  const dogShift     = (1 - progress) * RISE_DOG;
  const pillarShift  = (1 - progress) * RISE_PILLAR;
  const sceneShift   = (1 - progress) * SCENE_DRIFT;

  return (
    <footer
      ref={ref}
      className="relative w-full overflow-hidden bg-[#f4f3f0]"
      style={{ height: "100svh" }}
    >
      {/* z-0: gradient sky */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background:
            "radial-gradient(ellipse 120% 80% at 50% 100%, rgba(255,140,0,0.7) 0%, rgba(255,185,5,0.6) 18%, rgba(255,242,0,0) 70%)",
        }}
      />

      {/* z-1: scene illustration + parallax overlays — anchored to bottom */}
      <div
        className="absolute bottom-0 left-0 w-full pointer-events-none select-none"
        style={{
          zIndex: 1,
          transform: `translate3d(0, ${sceneShift}px, 0)`,
          willChange: "transform",
        }}
      >
        {/* Wrapper preserves the desktop SVG's aspect ratio so parallax overlays
            position correctly relative to the scene. */}
        <div className="relative w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <picture>
            <source media="(max-width: 639px) and (orientation: portrait)" srcSet="/assets/footer-bg-mobile.svg" />
            <source media="(orientation: landscape) and (max-height: 600px)" srcSet="/assets/footer-bg-mobile-landscape.svg" />
            <source media="(min-width: 640px) and (max-width: 1024px) and (orientation: portrait)" srcSet="/assets/footer-bg-tablet.svg" />
            <img src="/assets/footer-bg.svg" alt="" aria-hidden="true" className="w-full block" />
          </picture>

          {/* Parallax overlays — desktop only. Each lifts toward natural position as user scrolls in. */}
          <div
            className="hidden lg:block absolute"
            style={{
              left:   pct(PILLAR_L.x, SCENE_W),
              top:    pct(PILLAR_L.y, SCENE_H),
              width:  pct(PILLAR_L.w, SCENE_W),
              transform: `translate3d(0, ${pillarShift}px, 0)`,
              willChange: "transform",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PILLAR_L.src} alt="" aria-hidden="true" className="w-full block" />
          </div>

          <div
            className="hidden lg:block absolute"
            style={{
              left:   pct(PILLAR_R.x, SCENE_W),
              top:    pct(PILLAR_R.y, SCENE_H),
              width:  pct(PILLAR_R.w, SCENE_W),
              transform: `translate3d(0, ${pillarShift}px, 0)`,
              willChange: "transform",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PILLAR_R.src} alt="" aria-hidden="true" className="w-full block" />
          </div>

          <div
            className="hidden lg:block absolute"
            style={{
              left:   pct(DOG.x, SCENE_W),
              top:    pct(DOG.y, SCENE_H),
              width:  pct(DOG.w, SCENE_W),
              transform: `translate3d(0, ${dogShift}px, 0)`,
              willChange: "transform",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={DOG.src} alt="" aria-hidden="true" className="w-full block" />
          </div>
        </div>
      </div>

      {/* z-2: text + CTA */}
      <div
        className="relative flex flex-col items-center gap-6 lg:gap-10 px-4 pt-[92px] lg:pt-[48px]"
        style={{ zIndex: 2 }}
      >
        <p
          className="font-medium italic text-[#6b6b68] text-[12px] lg:text-[14px] whitespace-nowrap"
          style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'opsz' 14", lineHeight: 1.3 }}
        >
          you&apos;re not the first. you&apos;re also not too late. yet.
        </p>

        <div
          className="flex flex-col gap-5 lg:gap-8 items-center text-[#1a1a1a] text-center"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          <p className="text-[32px] sm:text-[40px] lg:text-[48px] max-w-[422px]" style={{ lineHeight: 1.1 }}>
            Your health isn&apos;t going to fix itself.
          </p>
          <div className="text-[18px] lg:text-[25px]" style={{ lineHeight: 1.2 }}>
            <p style={{ marginBottom: 0 }}>Waldo already knows what&apos;s wrong.</p>
            <p>You just have to let it in.</p>
          </div>
        </div>

        <a
          href="/waitlist"
          className="flex items-center gap-[4px] justify-center bg-[#1a1a1a] border border-[rgba(26,26,26,0.08)] border-solid text-[#fafaf8] text-[16px] lg:text-[18px] px-[32px] py-[18px] lg:px-[36px] lg:py-[22px] hover:bg-[#333] transition-colors whitespace-nowrap"
          style={{ fontFamily: "var(--font-headline)", lineHeight: 1.3, borderRadius: "40px" }}
        >
          Get Started
          <ArrowRightIcon />
        </a>

        <div
          className="flex gap-5 lg:gap-[30px] font-normal text-[#6b6b68] text-[10px] whitespace-nowrap"
          style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'opsz' 14", lineHeight: 1.3 }}
        >
          <span>[Privacy Policy]</span>
          <span>[Contact]</span>
          <span>© 2026 Waldo</span>
        </div>
      </div>
    </footer>
  );
}
