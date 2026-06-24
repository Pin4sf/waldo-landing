import Image from "next/image";

import { SectionIntro, withHighlights } from "@/components/landing-primitives";
import tuesdayCrashConstellation from "@/public/waldo-web-assets/constellation/tuesday-crash-constellation.webp";

export function LongGameSection() {
  return (
    <section id="constellation" className="section-shell dark-panel overflow-hidden rounded-[24px] p-5 sm:p-6 lg:p-8">
      <div data-animate="blur-fade">
        <SectionIntro
          className="[&_.type-body]:max-w-[46ch] [&_.type-body]:text-left sm:[&_.type-body]:text-center"
          title={
            <>
              The longer it runs,
              <br />
              the more Waldo sees.
            </>
          }
          aside="patterns you cannot see from the inside."
        >
          <p>
            {withHighlights("Tuesdays and Thursdays looked ordinary until the pattern had enough shape. *Your worst sleep follows the heaviest meeting days.* You were too close to see it. Waldo was not.")}
          </p>
        </SectionIntro>
      </div>

      <div className="mt-8" data-animate="fade-up">
        <div className="waldo-long-game-card relative mx-auto w-full max-w-[920px] overflow-hidden rounded-[18px] p-4 sm:p-5 lg:p-6">
          <div className="relative z-10 flex items-center justify-between gap-4">
            <div>
              <p className="type-label text-[var(--panel-ink)]">The Constellation</p>
              <p className="type-aside mt-1 text-[var(--text-tertiary)]">The Tuesday Crash.</p>
            </div>
            <span className="waldo-long-game-badge type-caption rounded-full px-3 py-1">
              4-week map
            </span>
          </div>

          <div className="waldo-constellation-asset-stage relative z-10 mt-5">
            <Image
              src={tuesdayCrashConstellation}
              alt="The Constellation visualization showing Tuesday Crash connected to stress, sleep, caffeine, HRV, form, weight, and load patterns."
              fill
              sizes="(min-width: 1024px) 820px, 92vw"
              className="waldo-constellation-asset select-none object-contain"
              draggable={false}
              fetchPriority="high"
              loading="eager"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
