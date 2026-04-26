"use client";

// Single null-rendering component that owns all GSAP scroll animations.
// Sections stay as Server Components — they just get data-animate / data-parallax-y
// attributes on their elements. This component queries and animates them on mount.
//
// data-animate="headline"    → line-by-line or word-by-word reveal on scroll
// data-animate="fade-up"     → single fade + lift on scroll
// data-parallax-y="-60"      → parallax by that px amount as section scrolls

import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(useGSAP);

export function ScrollAnimations() {
  useGSAP(() => {
    // ── 1. Headline reveals ─────────────────────────────────────────
    // Multi-line headlines (contain <br>) → each line clips up.
    // Single-line headlines → each word clips up with 55ms stagger.
    gsap.utils.toArray<HTMLElement>("[data-animate='headline']").forEach((el) => {
      const raw = el.innerHTML;
      const lines = raw.split(/<br\s*\/?>/i).map(s => s.trim()).filter(Boolean);

      if (lines.length > 1) {
        el.innerHTML = lines
          .map(line =>
            // padding-bottom gives descenders (g/p/q/y) room; negative margin offsets layout shift
            `<span style="display:block;overflow:hidden;line-height:inherit;padding-bottom:0.15em;margin-bottom:-0.15em">` +
            `<span class="gsap-ln" style="display:block">${line}</span>` +
            `</span>`
          )
          .join("");

        gsap.from(el.querySelectorAll<HTMLElement>(".gsap-ln"), {
          y: "105%",
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      } else {
        el.innerHTML = el.innerText
          .trim()
          .split(/\s+/)
          .map(w =>
            // padding-bottom/top give descenders and ascenders room to avoid clipping
            `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:0.15em;margin-bottom:-0.15em">` +
            `<span class="gsap-w" style="display:inline-block">${w}</span>` +
            `</span>`
          )
          .join(" ");

        gsap.from(el.querySelectorAll<HTMLElement>(".gsap-w"), {
          y: "110%",
          duration: 0.6,
          stagger: 0.055,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      }
    });

    // ── 2. Fade-up ──────────────────────────────────────────────────
    gsap.utils.toArray<HTMLElement>("[data-animate='fade-up']").forEach((el) => {
      gsap.from(el, {
        y: 28,
        opacity: 0,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    });

    // ── 3. Parallax layers ──────────────────────────────────────────
    // data-parallax-y="-60" → element travels -60px over section scroll range.
    // Uses scrub for smooth tie to scroll position.
    gsap.utils.toArray<HTMLElement>("[data-parallax-y]").forEach((el) => {
      const yVal = Number(el.dataset.parallaxY ?? -40);
      const section = el.closest<HTMLElement>("section") ?? el;

      gsap.to(el, {
        y: yVal,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4,
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  });

  return null;
}
