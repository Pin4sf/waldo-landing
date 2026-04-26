// "Months of health data sitting unused."
// White card section with Apple Health screenshots at the bottom.

import { BalancedParagraph } from "@/components/balanced-paragraph";

export function HealthDataSection() {
  return (
    <section
      className="bg-[#fafaf8] border-2 border-[rgba(26,26,26,0.08)] border-solid flex flex-col gap-[48px] items-center overflow-clip pt-[40px] lg:pt-[70px] w-full"
      style={{ borderRadius: "30px" }}
    >
      {/* Header copy */}
      <div className="flex flex-col gap-[24px] lg:gap-[40px] items-center text-center px-4 lg:px-0">
        <p
          className="font-normal italic text-[#6b6b68] text-[14px] min-w-full w-min"
          style={{
            fontFamily: "var(--font-body)",
            fontVariationSettings: "'opsz' 14",
            lineHeight: 1.3,
          }}
        >
          You already have everything Waldo needs.
        </p>
        <h2
          data-animate="headline"
          className="text-[#1a1a1a] text-[32px] lg:text-[48px]"
          style={{ fontFamily: "var(--font-headline)", lineHeight: 1.1, maxWidth: "458px" }}
        >
          Months of health data sitting unused.
        </h2>
        <div data-animate="fade-up">
        <BalancedParagraph
          pretextify
          className="font-normal text-[#6b6b68] text-[14px]"
          style={{
            fontFamily: "var(--font-body)",
            fontVariationSettings: "'opsz' 14",
            lineHeight: 1.3,
            maxWidth: "538px",
            width: "100%",
          }}
        >
          {`Your watch has been collecting sleep, HRV, recovery, and stress data every single day. While you slept. While you worked. While you ignored it. That data has been sitting in an app you open twice a year. Waldo reads every day of it.`}
        </BalancedParagraph>
        </div>
      </div>

      {/* Device mockups — desktop only */}
      <div
        className="relative shrink-0 overflow-clip hidden lg:block"
        style={{ height: "180px", width: "742px" }}
      >
        {/* AFib iPad — furthest back (DOM first = lowest z-order) */}
        <div
          data-parallax-y="-35"
          className="absolute overflow-hidden pointer-events-none"
          style={{ height: "204.705px", left: "498.66px", top: "111.69px", width: "242.954px" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="absolute max-w-none"
            src="/figma-assets/health-iphone-right.png"
            style={{ height: "100.07%", left: "-21.57%", top: "-0.03%", width: "143.15%" }}
          />
        </div>

        {/* iPad — center, in front of AFib */}
        <div
          data-parallax-y="-20"
          className="absolute pointer-events-none"
          style={{ height: "316.675px", left: "127.46px", top: 0, width: "521.415px" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src="/figma-assets/health-ipad.png"
          />
        </div>

        {/* iPhone left — Last Night's Sleep */}
        <div
          data-parallax-y="-28"
          className="absolute pointer-events-none"
          style={{ height: "225.132px", left: "42.64px", top: "74.74px", width: "136.012px" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src="/figma-assets/health-iphone-left.png"
          />
        </div>

        {/* Apple Watch — bottom left */}
        <div
          data-parallax-y="-16"
          className="absolute overflow-hidden pointer-events-none"
          style={{ height: "63.826px", left: "-0.19px", top: "148px", width: "59.627px" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="absolute max-w-none"
            src="/figma-assets/health-watch.png"
            style={{ height: "203.6%", left: "-42.25%", top: "-51.45%", width: "178.87%" }}
          />
        </div>
      </div>
    </section>
  );
}
