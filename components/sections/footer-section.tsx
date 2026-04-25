// Footer — "Your health isn't going to fix itself."
// z-0: gradient sky, z-1: dock illustration SVG, z-2: copy + CTA

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

      {/* z-1: dock illustration — scales with viewport, anchored to bottom */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/footer-bg.svg"
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full h-auto pointer-events-none select-none"
        style={{ zIndex: 1 }}
      />

      {/* z-2: copy + CTA */}
      <div
        className="absolute left-1/2 flex flex-col gap-[60px] items-center"
        style={{ top: "13.67%", transform: "translateX(-50%)", width: "422px", zIndex: 2 }}
      >
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
