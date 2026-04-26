"use client";

import { useRef, useState } from "react";
import { Navbar } from "./navbar";
import { ScrollAnimations } from "./scroll-animations";
import { HeroSection } from "./sections/hero-section";
import { HealthDataSection } from "./sections/health-data-section";
import { MorningBriefSection } from "./sections/morning-brief-section";
import { AlreadyDoneSection } from "./sections/already-done-section";
import { FiveThingsSection } from "./sections/five-things-section";
import { WhereIsWaldoSection } from "./sections/where-is-waldo-section";
import { SmarterSection } from "./sections/smarter-section";
import { FooterSection } from "./sections/footer-section";

export function PageLayout() {
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
    <div className="min-h-screen bg-[#f4f3f0]">
      <ScrollAnimations />
      {/* Nav sits outside the dimmed wrapper so it stays sharp */}
      <div className="sticky top-0 z-20 flex justify-center" style={{ paddingTop: "20px", paddingBottom: "0" }}>
        <div className="w-full max-w-[1440px] px-4">
          <Navbar onNavEnter={handleNavEnter} onNavLeave={handleNavLeave} />
        </div>
      </div>

      {/* Page content */}
      <div
        style={{
          opacity:       dimmed ? 0.4 : 1,
          transition:    "opacity 200ms ease-out",
          pointerEvents: dimmed ? "none" : undefined,
        }}
      >
        {/* Marketing sections — centered column with 30px gaps, 200px side padding on desktop */}
        <div
          className="flex flex-col gap-[30px] items-center px-4 lg:px-[200px] py-[20px] mx-auto"
          style={{ maxWidth: "1440px" }}
        >
          <HeroSection />
          <HealthDataSection />
          <MorningBriefSection />
          <AlreadyDoneSection />
          <FiveThingsSection />
          <WhereIsWaldoSection />
          <SmarterSection />
        </div>

        {/* Footer — full-bleed, outside the padded column */}
        <FooterSection />
      </div>
    </div>
  );
}
