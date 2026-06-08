"use client";

// Lenis smooth scroll, wired into GSAP so ScrollTrigger stays in sync.
//
// Design notes:
// • Vertical-only (orientation: "vertical"). Horizontal trackpad gestures and
//   the useRailScroll() carousels keep their native behaviour — Lenis never
//   touches them. Any nested scroll area that still needs to opt out can carry
//   the `data-lenis-prevent` attribute, which Lenis honours automatically.
// • Driven off gsap.ticker (single rAF loop) instead of its own, so GSAP
//   timelines and Lenis never drift apart.
// • Fully gated on prefers-reduced-motion: if the user asked for less motion we
//   never instantiate Lenis and the browser's native scroll is left untouched.

import { useEffect } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";

export function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReduced.matches) return;

    let lenis: import("lenis").default | null = null;
    let tick: ((time: number) => void) | null = null;
    let cancelled = false;

    // Lenis is loaded lazily so reduced-motion sessions never download it.
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      lenis = new Lenis({
        duration: 1.05,
        // gentle ease-out — fast to settle, no rubber-banding
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
        touchMultiplier: 1.6,
      });

      lenis.on("scroll", ScrollTrigger.update);

      tick = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    });

    return () => {
      cancelled = true;
      if (tick) gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis?.destroy();
    };
  }, []);

  return null;
}
