import { PageChrome } from "./page-chrome";
import { HomepageCarouselPreloader } from "./homepage-carousel-preloader";
import { HeroSection } from "./sections/hero-section";
// Duplicated on the redesigned homepage. Kept here so the feature page can restore the problem beat if needed.
// import { HealthDataSection } from "./sections/health-data-section";
import { AlreadyDoneSection } from "./sections/already-done-section";
import { SecuritySection } from "./sections/security-section";
import { WhereIsWaldoSection } from "./sections/where-is-waldo-section";
import { ActionFanSection, SceneCloseSection } from "./sections/downstream-build-sections";

export function PageLayout() {
  return (
    <PageChrome>
      <HomepageCarouselPreloader />
      <div
        className="mx-auto flex max-w-[1200px] flex-col items-center px-4 pb-0 sm:px-6 lg:px-10"
        style={{ gap: "clamp(3rem, 5vw, 5rem)" }}
      >
        <HeroSection />
        {/* Duplicated on the redesigned homepage. */}
        {/* <HealthDataSection /> */}
        <AlreadyDoneSection />
        <ActionFanSection />
        <SecuritySection />
        <WhereIsWaldoSection />
        <SceneCloseSection />
      </div>
    </PageChrome>
  );
}
