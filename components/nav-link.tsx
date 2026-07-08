"use client";

import Link from "next/link";
import { useState } from "react";

export function NavLink({
  label,
  tooltip,
  href,
  align = "center",
}: {
  label: string;
  tooltip: string;
  href?: string;
  align?: "center" | "right";
}) {
  const [show, setShow] = useState(false);

  const tooltipPosition =
    align === "right"
      ? "absolute right-0 top-full mt-2"
      : "absolute left-1/2 top-full mt-2 -translate-x-1/2";

  const className =
    "relative select-none px-[20px] py-[8px] rounded-[90px] text-[12px] font-medium text-[#1a1a1a] hover:bg-[rgba(26,26,26,0.04)] transition-colors";
  const style = { fontFamily: "var(--font-body)", fontVariationSettings: "'opsz' 14", fontStyle: "normal" };
  const tooltipNode = show ? (
    <span
      className={`${tooltipPosition} z-50 whitespace-nowrap rounded-lg bg-[#1A1A1A] px-3 py-1.5 text-[12px] italic text-[#FAFAF8]`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      {tooltip}
    </span>
  ) : null;

  if (href) {
    return (
      <Link
        href={href}
        className={className}
        style={style}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {label}
        {tooltipNode}
      </Link>
    );
  }

  return (
    <span
      className={`${className} cursor-default`}
      style={style}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {label}
      {tooltipNode}
    </span>
  );
}
