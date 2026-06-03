"use client";

import { useRef, useState } from "react";
import { Navbar } from "./navbar";
import { ScrollAnimations } from "./scroll-animations";
import { HeroSection } from "./sections/hero-section";
import { HealthDataSection } from "./sections/health-data-section";
import { MorningBriefSection } from "./sections/morning-brief-section";
import { AlreadyDoneSection } from "./sections/already-done-section";
import { AgentFeaturesSection } from "./sections/agent-features-section";
import { UseCasesSection } from "./sections/use-cases-section";
import { ValidationSection } from "./sections/validation-section";
import { SecuritySection } from "./sections/security-section";
import { WhereIsWaldoSection } from "./sections/where-is-waldo-section";
import { SmarterSection } from "./sections/smarter-section";
import { ActionFanSection, SceneCloseSection } from "./sections/downstream-build-sections";
import { FaqSection } from "./sections/faq-section";
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
    <div className="min-h-screen bg-[var(--surface-t3)] text-[var(--ink)]">
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
        <div
          className="mx-auto flex max-w-[1200px] flex-col items-center gap-12 px-4 pb-20 sm:px-6 lg:gap-16 lg:px-10"
        >
          <HeroSection />
          <HealthDataSection />
          <MorningBriefSection />
          <AlreadyDoneSection />
          <AgentFeaturesSection />
          <ActionFanSection />
          <UseCasesSection />
          <ValidationSection />
          <SecuritySection />
          <SmarterSection />
          <WhereIsWaldoSection />
          <FaqSection />
          <SceneCloseSection />
        </div>

        <FooterSection />
      </div>
    </div>
  );
}
