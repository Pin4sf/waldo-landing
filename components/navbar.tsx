"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { NavLink } from "./nav-link";

const links = [
  { label: "Features", tooltip: "not yet. but waldo already knows you clicked this." },
  { label: "Pricing",  tooltip: "free to find out. when we\u2019re ready." },
  { label: "Blog",     tooltip: "waldo\u2019s been busy. so have we." },
  { label: "Sign in",  tooltip: "you\u2019re early. that\u2019s actually a good sign." },
];

// Mobile accordion item — tap to toggle message, only one open at a time
function MobileNavItem({
  label,
  tooltip,
  open,
  onTap,
}: {
  label: string;
  tooltip: string;
  open: boolean;
  onTap: () => void;
}) {
  return (
    <button
      onClick={onTap}
      className="w-full text-left px-5 py-3 flex flex-col gap-1 transition-colors hover:bg-black/[0.02]"
    >
      <span
        className="text-[13px] text-[#9CA3AF]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {label}
      </span>
      {open && (
        <span
          className="text-[12px] italic text-[#1A1A1A]/50 leading-relaxed"
          style={{
            fontFamily: "var(--font-body)",
            animation: "float-up 0.18s ease-out both",
          }}
        >
          {tooltip}
        </span>
      )}
    </button>
  );
}

export function Navbar({
  onNavEnter,
  onNavLeave,
}: {
  onNavEnter?: () => void;
  onNavLeave?: () => void;
}) {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [activeItem,  setActiveItem]  = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Desktop hover — debounced to prevent flicker between links
  const handleDesktopEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    onNavEnter?.();
  };
  const handleDesktopLeave = () => {
    timerRef.current = setTimeout(() => onNavLeave?.(), 80);
  };

  const openMenu = () => {
    setMenuOpen(true);
    setActiveItem(null);
    onNavEnter?.();           // dim the page behind
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveItem(null);
    onNavLeave?.();           // un-dim
  };

  const toggleItem = (label: string) => {
    setActiveItem((prev) => (prev === label ? null : label));
  };

  return (
    // Relative wrapper so the dropdown can position absolutely below the pill
    <div className="relative flex flex-col items-center pt-5 px-4 z-20">

      {/* ── Pill ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-6 rounded-full bg-white px-6 py-3 shadow-[0_1px_10px_rgba(0,0,0,0.08)] border border-black/[0.06]">
        <Image
          src="/logo.svg"
          alt="Waldo"
          width={142}
          height={44}
          style={{ height: "28px", width: "auto" }}
          priority
        />

        {/* Desktop — full link row, hover to dim */}
        <div
          className="hidden lg:flex items-center gap-8"
          onMouseEnter={handleDesktopEnter}
          onMouseLeave={handleDesktopLeave}
        >
          {links.map((l) => (
            <NavLink
              key={l.label}
              label={l.label}
              tooltip={l.tooltip}
              align={l.label === "Sign in" ? "right" : "center"}
            />
          ))}
        </div>

        {/* Mobile — dots button */}
        <button
          onClick={menuOpen ? closeMenu : openMenu}
          className="lg:hidden flex items-center justify-center w-7 h-7 text-[#9CA3AF] hover:text-[#1A1A1A] transition-colors"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          style={{ fontFamily: "var(--font-body)" }}
        >
          {menuOpen ? (
            // × close
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ) : (
            // ··· dots
            <svg width="16" height="4" viewBox="0 0 16 4" fill="currentColor">
              <circle cx="2"  cy="2" r="1.5"/>
              <circle cx="8"  cy="2" r="1.5"/>
              <circle cx="14" cy="2" r="1.5"/>
            </svg>
          )}
        </button>
      </div>

      {/* ── Mobile dropdown ───────────────────────────────────── */}
      {menuOpen && (
        <>
          {/* Invisible backdrop — tap outside to close */}
          <div
            className="fixed inset-0 z-[-1]"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Dropdown card */}
          <div
            className="absolute top-full mt-2 w-[calc(100vw-32px)] max-w-[360px] rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.10)] border border-black/[0.06] overflow-hidden"
            style={{ animation: "content-enter 200ms ease-out both" }}
          >
            {links.map((l, i) => (
              <div key={l.label}>
                <MobileNavItem
                  label={l.label}
                  tooltip={l.tooltip}
                  open={activeItem === l.label}
                  onTap={() => toggleItem(l.label)}
                />
                {/* Divider between items, not after last */}
                {i < links.length - 1 && (
                  <div className="mx-5 h-px bg-black/[0.05]" />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
