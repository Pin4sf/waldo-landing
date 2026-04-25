// Page footer — minimal links sitting under the closing scene.
// Privacy / Contact / © 2026 Waldo.

import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full flex justify-center pb-[30px] pt-[10px]">
      <div
        className="flex gap-[30px] items-start text-[#6b6b68] text-[10px]"
        style={{
          fontFamily: "var(--font-body)",
          fontVariationSettings: "'opsz' 14",
          lineHeight: 1.3,
        }}
      >
        <Link href="/privacy" className="whitespace-nowrap hover:text-[#1a1a1a] transition-colors">
          [Privacy Policy]
        </Link>
        <Link href="/contact" className="whitespace-nowrap hover:text-[#1a1a1a] transition-colors">
          [Contact]
        </Link>
        <span className="whitespace-nowrap">© 2026 Waldo</span>
      </div>
    </footer>
  );
}
