// "Months of health data sitting unused."
// White card section with Apple Health screenshots at the bottom.

export function HealthDataSection() {
  return (
    <section
      className="bg-[#fafaf8] border-2 border-[rgba(26,26,26,0.08)] border-solid flex flex-col gap-[100px] items-center overflow-clip pt-[70px] w-full"
      style={{ borderRadius: "30px" }}
    >
      {/* Header copy */}
      <div className="flex flex-col gap-[40px] items-center text-center">
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
          className="text-[#1a1a1a] text-[48px]"
          style={{
            fontFamily: "var(--font-headline)",
            lineHeight: 1.1,
            width: "458px",
          }}
        >
          Months of health data sitting unused.
        </h2>
        <p
          className="font-normal text-[#6b6b68] text-[14px]"
          style={{
            fontFamily: "var(--font-body)",
            fontVariationSettings: "'opsz' 14",
            lineHeight: 1.3,
            width: "538px",
          }}
        >
          Your watch has been collecting sleep, HRV, recovery, and stress data every single day.
          While you slept. While you worked. While you ignored it. That data has been sitting in an
          app you open twice a year. Waldo reads every day of it.
        </p>
      </div>

      {/* Health screenshots — overflowing at bottom for visual crop effect */}
      <div
        className="relative shrink-0 overflow-clip"
        style={{ height: "242.168px", width: "737.812px" }}
      >
        {/* AFIB history — right */}
        <div
          className="absolute overflow-hidden pointer-events-none"
          style={{ height: "204.705px", left: "498.66px", top: "111.69px", width: "242.954px" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="absolute max-w-none"
            src="/figma-assets/health-afib.png"
            style={{ height: "100.07%", left: "-21.57%", top: "-0.03%", width: "143.15%" }}
          />
        </div>

        {/* Main health screenshot — center */}
        <div
          className="absolute pointer-events-none"
          style={{ height: "316.675px", left: "127.46px", top: 0, width: "521.415px" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover size-full"
            src="/figma-assets/health-main.png"
          />
        </div>

        {/* Optimize sleep — left */}
        <div
          className="absolute pointer-events-none"
          style={{ height: "225.132px", left: "42.64px", top: "74.74px", width: "136.012px" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover size-full"
            src="/figma-assets/optimize-sleep.png"
          />
        </div>

        {/* Sleep overnight — far left */}
        <div
          className="absolute overflow-hidden pointer-events-none"
          style={{ height: "63.826px", left: "-0.19px", top: "191.48px", width: "59.627px" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="absolute max-w-none"
            src="/figma-assets/health-sleep-overnight.png"
            style={{ height: "203.6%", left: "-42.25%", top: "-51.45%", width: "178.87%" }}
          />
        </div>
      </div>
    </section>
  );
}
