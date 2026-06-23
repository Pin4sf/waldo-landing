import { PageChrome } from "./page-chrome";
import { HeroSection } from "./sections/hero-section";
import { HealthDataSection } from "./sections/health-data-section";
import { MorningBriefSection } from "./sections/morning-brief-section";
import { AlreadyDoneSection } from "./sections/already-done-section";
import { AgentFeaturesSection } from "./sections/agent-features-section";
import { UseCasesSection } from "./sections/use-cases-section";
import { ValidationSection } from "./sections/validation-section";
import { SecuritySection } from "./sections/security-section";
import { WhereIsWaldoSection } from "./sections/where-is-waldo-section";
import { LongGameSection } from "./sections/long-game-section";
import { ActionFanSection, SceneCloseSection } from "./sections/downstream-build-sections";
import { FaqSection } from "./sections/faq-section";

export function PageLayout() {
  return (
    <PageChrome>
      <div
        className="mx-auto flex max-w-[1200px] flex-col items-center px-4 pb-0 sm:px-6 lg:px-10"
        style={{ gap: "clamp(3rem, 5vw, 5rem)" }}
      >
        <HeroSection />
        <HealthDataSection />
        <MorningBriefSection />
        <AlreadyDoneSection />
        <AgentFeaturesSection />
        <UseCasesSection />
        <ActionFanSection />
        <ValidationSection />
        <SecuritySection />
        <LongGameSection />
        <WhereIsWaldoSection />
        <FaqSection />
        <SceneCloseSection />
      </div>
    </PageChrome>
  );
}
