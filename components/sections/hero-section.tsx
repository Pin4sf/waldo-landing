import Image from "next/image";
import { WaldoCTA } from "@/components/landing-primitives";

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

      {/* Waldo — straddles the top edge of the white inner circle, as in the Figma reference. */}
      <div
        className="pointer-events-none absolute left-1/2 z-20 w-[84px] -translate-x-1/2 -translate-y-1/2 sm:w-[108px] lg:w-[124px]"
        style={{ top: "clamp(180px, 21.5vw, 430px)" }}
      >
        <Image
          src="/illustrations/default.svg"
          alt="Waldo"
          width={169}
          height={131}
          priority
          className="hero-mascot-shadow h-auto w-full"
        />
      </div>

      {/* Hero copy — sits inside the white circle, below Waldo. */}
      <div
        className="relative z-20 mx-auto flex max-w-[820px] flex-col items-center px-6 text-center"
        data-animate="blur-fade"
        style={{
          paddingTop: "clamp(280px, 30.5vw, 560px)",
          paddingBottom: "clamp(160px, 15vw, 240px)",
        }}
      >
        <h1 className="type-display text-[var(--ink)]" data-animate="fade-up">
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

        {/* Connector wave — left→right floating marquee of source connectors.
            Awaiting the connector list from the owner before building. */}
      </div>
    </section>
  );
}
