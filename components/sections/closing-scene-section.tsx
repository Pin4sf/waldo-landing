// Closing scene — "Your health isn't going to fix itself."
// Dalmatian on dock at sunset, the emotional hand-off into the waitlist CTA.
// Background: full-bleed illustrated scene. Foreground: headline + subhead + Get Started.

import Image from "next/image";
import Link from "next/link";
import closingScene from "@/components/assets/closing-scene.svg";

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ClosingSceneSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ borderRadius: "30px", aspectRatio: "1440 / 812" }}
    >
      {/* Background scene — fills the section, anchors the emotional moment */}
      <Image
        src={closingScene}
        alt=""
        fill
        priority={false}
        unoptimized
        className="object-cover object-bottom pointer-events-none select-none"
      />

      {/* Foreground content — sits in the upper third so it doesn't crowd the dog */}
      <div className="absolute inset-x-0 top-[18%] flex flex-col items-center gap-[60px] px-4">
        <div className="flex flex-col gap-[40px] items-center text-center" style={{ width: "422px", maxWidth: "100%" }}>
          <p
            className="font-medium italic text-[#6b6b68] text-[14px]"
            style={{
              fontFamily: "var(--font-body)",
              fontStyle: "italic",
              fontVariationSettings: "'opsz' 14",
              lineHeight: 1.3,
            }}
          >
            you&apos;re not the first. you&apos;re also not too late. yet.
          </p>

          <h2
            className="text-[#1a1a1a] text-[48px]"
            style={{ fontFamily: "var(--font-headline)", lineHeight: 1.1 }}
          >
            Your health isn&apos;t going to fix itself.
          </h2>

          <p
            className="text-[#1a1a1a] text-[25px]"
            style={{ fontFamily: "var(--font-headline)", lineHeight: 1.2 }}
          >
            Waldo already knows what&apos;s wrong.
            <br />
            You just have to let it in.
          </p>
        </div>

        <Link
          href="/waitlist"
          className="bg-[#1a1a1a] border border-[rgba(26,26,26,0.08)] border-solid flex gap-[4px] items-center justify-center text-[#fafaf8]"
          style={{
            paddingLeft: "36px",
            paddingRight: "36px",
            paddingTop: "22px",
            paddingBottom: "22px",
            borderRadius: "40px",
          }}
        >
          <span
            className="text-[18px] text-center whitespace-nowrap"
            style={{ fontFamily: "var(--font-headline)", lineHeight: 1.3 }}
          >
            Get Started
          </span>
          <ArrowRightIcon />
        </Link>
      </div>
    </section>
  );
}
