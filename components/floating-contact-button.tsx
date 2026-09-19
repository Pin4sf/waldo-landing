"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function FloatingContactButton() {
  const pathname = usePathname();
  if (pathname === "/waitlist") return null;

  return (
    <Link href="/waitlist" className="floating-contact-button focusable-ring" aria-label="Get early access">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path
          d="M2 4.5h14v9H6.5L2 17V4.5Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
