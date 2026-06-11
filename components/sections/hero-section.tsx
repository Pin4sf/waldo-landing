import Image from "next/image";
import { WaldoCTA } from "@/components/landing-primitives";
import { HeroProofScene } from "@/components/sections/hero-proof-scene";
import { waldoHeroStates } from "@/components/sections/waldo-capability-data";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[var(--surface-t3)]"
      style={{
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        width: "100vw",
      }}
    >
      {/* Dome — provided asset, shown at its native 1440/989 proportions (never cropped). */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0" style={{ aspectRatio: "1440 / 989" }}>
        <Image
          src="/assets/hero-bg.svg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-dome-image select-none object-cover object-top"
        />
      </div>

      <HeroProofScene states={waldoHeroStates}>
        {() => (
          <div className="waldo-hero-copy relative z-20 mx-auto flex max-w-[840px] flex-col items-center px-6 text-center">
            <h1 className="type-display text-[var(--ink)]">
              <span className="hero-title-mobile">
                The first app that
                <br />
                knows how you feel
                <br />
                and does something
                <br />
                about it.
              </span>
              <span className="hero-title-desktop">
                The first app that knows
                <br />
                how you feel and does
                <br />
                something about it.
              </span>
            </h1>

            <p className="type-body tone-secondary mt-6 max-w-[58ch] sm:mt-8">
              Waldo scans complex data from your health wearable, and
              <br className="hidden sm:inline" /> figures your day before you smell your morning coffee.
            </p>

            <WaldoCTA className="mt-14 sm:mt-16" />
          </div>
        )}
      </HeroProofScene>
    </section>
  );
}
