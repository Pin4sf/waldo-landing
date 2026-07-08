import { AccountsGraphSection } from "@/components/home/accounts-graph-section";
import { DataAloneSection } from "@/components/home/data-alone-section";
import { DeathOfChatboxSection } from "@/components/home/death-of-chatbox-section";
import { HandledCardsSection } from "@/components/home/handled-cards-section";
import { LongGameSection } from "@/components/home/long-game-section";
import { NewHomeNav } from "@/components/home/new-home-nav";
import { ProfessionSection } from "@/components/home/profession-section";
import { TooMuchDataSection } from "@/components/home/too-much-data-section";
import { WhereWaldoSection } from "@/components/home/where-waldo-section";
import { MorningBriefSection } from "@/components/sections/morning-brief-section";
import { SceneCloseSection } from "@/components/sections/downstream-build-sections";
import { FaqSection } from "@/components/sections/faq-section";
import { ScrollAnimations } from "@/components/scroll-animations";
import { SmoothScroll } from "@/components/smooth-scroll";

function HomeChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="new-home min-h-screen bg-[var(--surface-t2)] text-[var(--ink)]">
      <SmoothScroll />
      <ScrollAnimations />
      <NewHomeNav />
      {children}
    </div>
  );
}

function HeroSection() {
  return (
    <section className="new-home-hero" aria-labelledby="new-home-hero-title">
      <div className="new-home-copy-stack" data-animate="blur-fade">
        <h1 id="new-home-hero-title" className="type-display">
          Look out for the
          <br />
          ones who use <em>Waldo.</em>
        </h1>
        <p className="new-home-hero-copy type-body tone-secondary">
          <strong>They’re simply ahead of the curve.</strong> They aren’t working less. They just have their personal AI agent - <strong>Waldo</strong> checking boxes for them.
        </p>
        <p className="new-home-hero-copy type-body tone-secondary">
          While you’re deciding if you’re too tired to take the call, they’ve already rescheduled it and messaged the room - before they were even awake.
        </p>
      </div>
    </section>
  );
}

export function NewHomePage() {
  return (
    <HomeChrome>
      <main>
        <HeroSection />
        <DeathOfChatboxSection />
        <TooMuchDataSection />
        <HandledCardsSection />
        <MorningBriefSection />
        <AccountsGraphSection />
        <LongGameSection />
        <ProfessionSection />
        <DataAloneSection />
        <WhereWaldoSection />
        <FaqSection />
        <SceneCloseSection />
      </main>
    </HomeChrome>
  );
}
