import Link from "next/link";

import { HandledCardsSection } from "@/components/home/handled-cards-section";

// The close: the live build's hero layout (components/home-build/home-build-page.tsx), with its heading, line,
// two buttons and the HandledCardsSection (five coloured cards, the fan, click one to open it, swipe them as a
// deck on a phone) and the same few style rules the live page puts on them. Layout and cards are the live
// build's; the words are new (2026-10-05, docs/website/pages/home.md "Close"): the live build's repeated the
// hero's title and used Sherlock, Einstein and the Flash. The live
// page is zoomed to 90%, and the band here does the same so it looks the same. The live page sits on #F4F3F0;
// here the band has no colour of its own (2026-10-05), so it is the page's default #FAFAF8, like the sections
// around it.

export function LiveClose() {
  return (
    <div className="live-close" style={{ zoom: 0.9 }}>
      <section className="hero-stack flex flex-col items-center justify-center gap-5 px-6 pb-16 pt-24">
        <h2
          className="type-h1 w-fit text-center text-[#1A1A1A]"
          style={{ lineHeight: "1.3", letterSpacing: "-0.02em" }}
        >
          Hand it over.
          <br />
          Waldo has it.
        </h2>

        <p
          className="type-body mx-auto w-fit text-center text-[#6B6B68]"
          style={{ fontSize: "17.1px", lineHeight: "1.4" }}
        >
          One Waldo across your work and your life. He reads what&apos;s coming,
          <br />
          does what&apos;s needed, and only speaks up when it matters.
        </p>

        <div className="flex items-center gap-3 pt-2">
          <Link
            href="/waitlist"
            className="rounded-full bg-[#1A1A1A] px-6 py-3 text-[13.5px] font-medium text-[#FAFAF8] transition-opacity hover:opacity-90"
          >
            Let Waldo in →
          </Link>
          <Link
            href="/how-it-works"
            className="rounded-full border border-black/10 px-6 py-3 text-[13.5px] font-medium text-[#1A1A1A] transition-colors hover:bg-black/5"
          >
            See how it works
          </Link>
        </div>

        <div className="hero-cards-only -mt-1 w-full">
          <HandledCardsSection />
        </div>
      </section>

      <style>{`
        .live-close .type-h1 {
          font-size: clamp(1.8rem, 1.485rem + 0.81vw, 2.25rem);
        }
        .live-close .hero-cards-only .new-handled-cta-panel {
          display: none;
        }
        .live-close .hero-cards-only .new-handled-section {
          gap: 0;
          padding: 0;
        }
        .live-close .hero-cards-only .new-handled-deck-stage {
          margin-top: -19px;
        }
        .live-close .hero-cards-only .new-handled-card-button[data-card-state="dock"] {
          transform: translate3d(var(--handled-card-left), calc(var(--handled-card-top) - 28px), 0) rotate(var(--handled-card-rotate)) scale(calc(var(--handled-card-scale) * 0.9));
        }
      `}</style>
    </div>
  );
}
