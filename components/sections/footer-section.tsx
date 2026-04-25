// Footer — "Your health isn't going to fix itself."
// Three layers: z-0 gradient sky, z-1 illustration SVG, z-2 copy + CTA

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FooterIllustration() {
  return (
    <svg
      viewBox="0 0 1440 1047"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "auto" }}
      aria-hidden="true"
    >
      {/* hills */}
      <image href="/figma-assets/layers/hills.png" x="-14.59" y="555.35" width="1462.38" height="162.38" />
      {/* clouds */}
      <image href="/figma-assets/layers/cloud-left-large.png" x="61.14" y="250.32" width="284" height="129" />
      <image href="/figma-assets/layers/cloud-right.png" x="1335.46" y="215" width="346.95" height="204.31" />
      <image href="/figma-assets/layers/cloud-left-small.png" x="301.14" y="345.32" width="167" height="87" />
      {/* water */}
      <image href="/figma-assets/layers/water-ripple-left.png" x="24.96" y="861.01" width="606.21" height="103.63" />
      <image href="/figma-assets/layers/water-ripple-right.png" x="1180.33" y="746.08" width="638.27" height="112.86" />
      <image href="/figma-assets/layers/water-detail-2.png" x="436.87" y="768.43" width="415.20" height="74.69" />
      <image href="/figma-assets/layers/water-detail-3.png" x="745.39" y="760.65" width="198.58" height="95.35" />
      <image href="/figma-assets/layers/water-detail-1.png" x="801.73" y="766.49" width="365.84" height="56.43" />
      <image href="/figma-assets/layers/water-detail-4.png" x="1323.15" y="974.70" width="159.66" height="56.43" />
      {/* dock */}
      <image href="/figma-assets/layers/dock.png" x="104" y="873" width="1231" height="194" />
      {/* posts */}
      <image href="/figma-assets/layers/post-left.png" x="275.35" y="523.24" width="67.93" height="381.13" />
      <image href="/figma-assets/layers/post-right.png" x="1196.58" y="523.24" width="67.93" height="381.13" />
      {/* waldo */}
      <image href="/figma-assets/layers/waldo.png" x="525.54" y="622.01" width="165.75" height="355.53" />
      {/* flowers */}
      <image href="/figma-assets/layers/flower-stem.png" x="1362.72" y="538.14" width="16.37" height="83.68" />
      <image href="/figma-assets/layers/flower-heads.png" x="1351.89" y="499.22" width="52.54" height="46.70" />
      <image href="/figma-assets/layers/flower-overlay.png" x="1355.27" y="534.59" width="46" height="41" />
    </svg>
  );
}

export function FooterSection() {
  return (
    <footer
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: "1440 / 1119", minHeight: "600px" }}
    >
      {/* z-0: gradient sky background */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 0,
          background:
            "radial-gradient(ellipse 100% 100% at 50% 100%, rgba(255,140,0,0.9) 0%, rgba(255,185,5,0.85) 15%, rgba(255,242,0,0) 79%), #f4f3f0",
        }}
      />

      {/* z-1: illustration */}
      <div className="absolute inset-0 pointer-events-none select-none" style={{ zIndex: 1 }}>
        <FooterIllustration />
      </div>

      {/* z-2: copy + CTA */}
      <div
        className="absolute left-1/2 flex flex-col gap-[60px] items-center"
        style={{ top: "13.67%", transform: "translateX(-50%)", width: "422px", zIndex: 2 }}
      >
        {/* Copy + CTA */}
        <div className="flex flex-col gap-[50px] items-center w-full">
          <p
            className="font-medium italic text-[#6b6b68] text-[14px] whitespace-nowrap"
            style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'opsz' 14", lineHeight: 1.3 }}
          >
            you&apos;re not the first. you&apos;re also not too late. yet.
          </p>

          <div
            className="flex flex-col gap-[40px] items-start text-[#1a1a1a] text-center w-full"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            <p className="text-[48px] w-[422px]" style={{ lineHeight: 1.1 }}>
              Your health isn&apos;t going to fix itself.
            </p>
            <div className="text-[25px] w-full" style={{ lineHeight: 1.2 }}>
              <p style={{ marginBottom: 0 }}>Waldo already knows what&apos;s wrong.</p>
              <p>You just have to let it in.</p>
            </div>
          </div>

          <a
            href="/waitlist"
            className="flex items-center gap-[4px] justify-center bg-[#1a1a1a] border border-[rgba(26,26,26,0.08)] border-solid text-[#fafaf8] text-[18px] px-[36px] py-[22px] hover:bg-[#333] transition-colors whitespace-nowrap"
            style={{ fontFamily: "var(--font-headline)", lineHeight: 1.3, borderRadius: "40px" }}
          >
            Get Started
            <ArrowRightIcon />
          </a>
        </div>

        {/* Legal links */}
        <div
          className="flex gap-[30px] items-start font-normal text-[#6b6b68] text-[10px] whitespace-nowrap"
          style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'opsz' 14", lineHeight: 1.3 }}
        >
          <span>[Privacy Policy]</span>
          <span>[Contact]</span>
          <span>© 2026 Waldo</span>
        </div>
      </div>
    </footer>
  );
}
