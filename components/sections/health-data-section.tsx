// "Months of health data sitting unused."
// White card section with Apple Health screenshots at the bottom.

import { BalancedParagraph } from "@/components/balanced-paragraph";

export function HealthDataSection() {
  return (
    <section
      className="w-full bg-[#fafaf8] p-[8px] sm:p-[10px] lg:p-[12px]"
      style={{ borderRadius: "34px" }}
    >
      <div
        className="flex min-h-[620px] flex-col items-center overflow-hidden border border-[rgba(26,26,26,0.08)] bg-[#fafaf8] pt-[72px] sm:min-h-[690px] lg:min-h-[780px] lg:pt-[92px]"
        style={{ borderRadius: "28px" }}
      >
        {/* Header copy */}
        <div className="flex flex-col gap-[24px] lg:gap-[34px] items-center text-center px-5 lg:px-0">
          <p
            className="font-normal italic text-[#6b6b68] text-[14px] lg:text-[16px] min-w-full w-min"
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
            className="text-[#1a1a1a] text-[34px] lg:text-[60px]"
            style={{ fontFamily: "var(--font-headline)", lineHeight: 1.08, maxWidth: "760px" }}
          >
            Months of health data.
            <br />
            Zero health decisions.
          </h2>
          <div data-animate="fade-up" style={{ paddingBottom: "24px" }}>
          <BalancedParagraph
            pretextify
            className="font-normal text-[#6b6b68] text-[15px] lg:text-[18px]"
            style={{
              fontFamily: "var(--font-body)",
              fontVariationSettings: "'opsz' 14",
              lineHeight: 1.3,
              maxWidth: "650px",
              width: "100%",
            }}
          >
            {`Your watch has been collecting sleep, HRV, recovery, and stress data every single day. While you slept. While you worked. While you ignored it. That data has been sitting in an app you open twice a year. Waldo reads every day of it.`}
          </BalancedParagraph>
          </div>
        </div>

        {/* Device mockups — desktop only */}
        <div
          className="relative mt-auto hidden shrink-0 overflow-clip lg:block"
          style={{ height: "250px", width: "880px" }}
        >
          {/* AFib iPad — furthest back (DOM first = lowest z-order) */}
          <div
            data-parallax-y="-35"
            className="absolute overflow-hidden pointer-events-none"
            style={{ height: "242.875px", left: "591.62px", top: "132.52px", width: "288.267px" }}
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
            style={{ height: "375.561px", left: "151.19px", top: 0, width: "618.43px" }}
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
            style={{ height: "267.005px", left: "50.58px", top: "88.64px", width: "161.315px" }}
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
            style={{ height: "75.708px", left: "-0.23px", top: "175.54px", width: "70.727px" }}
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
      </div>
    </section>
  );
}
