"use client";

import { useState } from "react";

export function NavLink({
  label,
  tooltip,
}: {
  label: string;
  tooltip: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <span
      className="relative cursor-default select-none text-[13px] text-[#9CA3AF]"
      style={{ fontFamily: "var(--font-body)", fontStyle: "normal" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {label}
      {show && (
        <span
          className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-[#1A1A1A] px-3 py-1.5 text-[12px] italic text-[#FAFAF8]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {tooltip}
        </span>
      )}
    </span>
  );
}
