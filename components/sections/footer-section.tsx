// Footer — "Your health isn't going to fix itself."
//
// Layout: footer is 100svh, flex-col.
//   - Text block:  flex-1, justify-center — takes all space above the illustration.
//   - Illustration: shrink-0, w-full, natural aspect ratio — always at bottom.
// This guarantees the text never overlaps the dock/pillars regardless of viewport.

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
      className="relative w-full overflow-hidden bg-[#f4f3f0]"
      style={{ height: "100svh" }}
    >
      {/* z-0: gradient sky */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background:
            "radial-gradient(ellipse 120% 80% at 50% 100%, rgba(255,140,0,0.7) 0%, rgba(255,185,5,0.6) 18%, rgba(255,242,0,0) 70%)",
        }}
      />

      {/* z-1: illustration — absolute bottom-0, width 100%, height auto.
          If taller than viewport, the top (sky) is clipped — dock always visible. */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none select-none" style={{ zIndex: 1 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <picture>
          <source media="(max-width: 639px) and (orientation: portrait)" srcSet="/assets/footer-bg-mobile.svg" />
          <source media="(orientation: landscape) and (max-height: 600px)" srcSet="/assets/footer-bg-mobile-landscape.svg" />
          <source media="(min-width: 640px) and (max-width: 1024px) and (orientation: portrait)" srcSet="/assets/footer-bg-tablet.svg" />
          <img src="/assets/footer-bg.svg" alt="" aria-hidden="true" className="w-full block" />
        </picture>
      </div>

      {/* z-2: text — sits above illustration.
          pt from Figma: 48px desktop (y=48 in 1440-frame), 92px tablet/mobile (y=92). */}
      <div
        className="relative flex flex-col items-center gap-6 lg:gap-10 px-4 pt-[92px] lg:pt-[48px]"
        style={{ zIndex: 2 }}
      >
        <p
          className="font-medium italic text-[#6b6b68] text-[12px] lg:text-[14px] whitespace-nowrap"
          style={{ fontFamily: "var(--font-body)", fontVariationSettings: "'opsz' 14", lineHeight: 1.3 }}
        >
          you&apos;re not the first. you&apos;re also not too late. yet.
        </p>

        <div
          className="flex flex-col gap-5 lg:gap-8 items-center text-[#1a1a1a] text-center"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          <p className="text-[32px] sm:text-[40px] lg:text-[48px] max-w-[422px]" style={{ lineHeight: 1.1 }}>
            Your health isn&apos;t going to fix itself.
          </p>
          <div className="text-[18px] lg:text-[25px]" style={{ lineHeight: 1.2 }}>
            <p style={{ marginBottom: 0 }}>Waldo already knows what&apos;s wrong.</p>
            <p>You just have to let it in.</p>
          </div>
        </div>

        <a
          href="/waitlist"
          className="flex items-center gap-[4px] justify-center bg-[#1a1a1a] border border-[rgba(26,26,26,0.08)] border-solid text-[#fafaf8] text-[16px] lg:text-[18px] px-[32px] py-[18px] lg:px-[36px] lg:py-[22px] hover:bg-[#333] transition-colors whitespace-nowrap"
          style={{ fontFamily: "var(--font-headline)", lineHeight: 1.3, borderRadius: "40px" }}
        >
          Get Started
          <ArrowRightIcon />
        </a>

        <div
          className="flex gap-5 lg:gap-[30px] font-normal text-[#6b6b68] text-[10px] whitespace-nowrap"
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
