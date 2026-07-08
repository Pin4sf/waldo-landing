"use client";

import { useRef, useState, type ReactNode } from "react";

import { Navbar } from "./navbar";
import { ScrollAnimations } from "./scroll-animations";
import { SmoothScroll } from "./smooth-scroll";

export function PageChrome({ children }: { children: ReactNode }) {
  const [dimmed, setDimmed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleNavEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDimmed(true);
  };

  const handleNavLeave = () => {
    timerRef.current = setTimeout(() => setDimmed(false), 80);
  };

  return (
    <div className="min-h-screen bg-[var(--surface-t3)] text-[var(--ink)]">
      <SmoothScroll />
      <ScrollAnimations />
      <div
        className="fixed inset-x-0 top-0 z-50 flex justify-center"
        style={{ paddingTop: "20px", paddingBottom: "16px" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backdropFilter:     "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            maskImage:          "linear-gradient(to bottom, black 55%, transparent 100%)",
            WebkitMaskImage:    "linear-gradient(to bottom, black 55%, transparent 100%)",
          }}
        />
        <div className="w-full max-w-[1200px] px-4 sm:px-6 lg:px-10">
          <Navbar onNavEnter={handleNavEnter} onNavLeave={handleNavLeave} />
        </div>
      </div>

      <div
        style={{
          opacity:       dimmed ? 0.4 : 1,
          transition:    "opacity 200ms ease-out",
          pointerEvents: dimmed ? "none" : undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
}
