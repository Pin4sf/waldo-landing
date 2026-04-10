"use client";

import Image from "next/image";
import { NavLink } from "./nav-link";

const links: { label: string; tooltip: string; align?: "center" | "right" }[] = [
  { label: "Features", tooltip: "not yet. but waldo already knows you clicked this." },
  { label: "Pricing",  tooltip: "free to find out. when we\u2019re ready." },
  { label: "Blog",     tooltip: "waldo\u2019s been busy. so have we." },
  { label: "Sign in",  tooltip: "you\u2019re early. that\u2019s actually a good sign.", align: "right" },
];

export function Navbar({
  onNavEnter,
  onNavLeave,
}: {
  onNavEnter?: () => void;
  onNavLeave?: () => void;
}) {
  return (
    <nav className="flex justify-center pt-5 px-4 relative z-20">
      <div className="flex items-center gap-8 rounded-full bg-white px-6 py-3 shadow-[0_1px_10px_rgba(0,0,0,0.08)] border border-black/[0.06]">
        <Image src="/logo.svg" alt="Waldo" width={88} height={24} priority />
        {/* Hover on the links group triggers page dim */}
        <div
          className="flex items-center gap-8"
          onMouseEnter={onNavEnter}
          onMouseLeave={onNavLeave}
        >
          {links.map((l) => (
            <NavLink key={l.label} label={l.label} tooltip={l.tooltip} align={l.align} />
          ))}
        </div>
      </div>
    </nav>
  );
}
