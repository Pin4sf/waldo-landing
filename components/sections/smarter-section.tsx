// "The longer it runs, the smarter Waldo gets."
// White card section with health screenshots — mirrors HealthDataSection layout.

import { BalancedParagraph } from "@/components/balanced-paragraph";

export function SmarterSection() {
  return (
    <section
      className="bg-[#fafaf8] border-2 border-[rgba(26,26,26,0.08)] border-solid flex flex-col gap-[60px] lg:gap-[100px] items-center overflow-clip pt-[50px] lg:pt-[70px] pb-[30px] lg:pb-0 w-full"
      style={{ borderRadius: "30px" }}
    >
      <div className="flex flex-col gap-[24px] lg:gap-[40px] items-center text-center px-4 lg:px-0">
        <h2
          data-animate="headline"
          className="text-[#1a1a1a] text-[32px] lg:text-[48px]"
          style={{ fontFamily: "var(--font-headline)", lineHeight: 1.1 }}
        >
          The longer it runs,{" "}
          <br />
          the smarter Waldo gets.
        </h2>
        <div data-animate="fade-up">
        <BalancedParagraph
          pretextify
          className="font-normal text-[#6b6b68] text-[14px]"
          style={{
            fontFamily: "var(--font-body)",
            fontVariationSettings: "'opsz' 14",
            lineHeight: 1.3,
            maxWidth: "502px",
            width: "100%",
          }}
        >
          {`Six weeks of Tuesdays and Thursdays that looked ordinary - until they didn't. The fact that your worst sleep always follows your heaviest meeting days. The fact that your focus peaks in November and dips in March - every year, without fail. You were too close to see it. Waldo wasn't.`}
        </BalancedParagraph>
        </div>
      </div>

      {/* Device mockups — desktop only */}
      <div
        className="relative shrink-0 overflow-clip hidden lg:block"
        style={{ height: "320px", width: "742px" }}
      >
        {/* iPad — center back layer */}
        <div className="absolute pointer-events-none" style={{ height: "316.675px", left: "127.46px", top: 0, width: "521.415px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src="/figma-assets/health-ipad.png" />
        </div>
        {/* iPhone left */}
        <div className="absolute pointer-events-none" style={{ height: "225.132px", left: "42.64px", top: "74.74px", width: "136.012px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src="/figma-assets/health-iphone-left.png" />
        </div>
        {/* iPhone right */}
        <div className="absolute overflow-hidden pointer-events-none" style={{ height: "204.705px", left: "498.66px", top: "111.69px", width: "242.954px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="absolute max-w-none" src="/figma-assets/health-iphone-right.png" style={{ height: "100.07%", left: "-21.57%", top: "-0.03%", width: "143.15%" }} />
        </div>
        {/* Apple Watch */}
        <div className="absolute overflow-hidden pointer-events-none" style={{ height: "63.826px", left: "-0.19px", top: "202.42px", width: "59.627px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" className="absolute max-w-none" src="/figma-assets/health-watch.png" style={{ height: "203.6%", left: "-42.25%", top: "-51.45%", width: "178.87%" }} />
        </div>
      </div>
    </section>
  );
}
