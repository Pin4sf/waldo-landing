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
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    onNavEnter?.();
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveItem(null);
    onNavLeave?.();
  };

  const toggleItem = (label: string) => {
    setActiveItem((prev) => (prev === label ? null : label));
  };

  return (
    <div className="relative flex flex-col items-center pt-5 px-4 z-20">

      {/* ── Pill ──────────────────────────────────────────────── */}
      <div
        className="flex items-center p-[5px] rounded-[50px] bg-[#fafaf8] border border-[rgba(26,26,26,0.08)]"
        style={{ boxShadow: "0 1px 10px rgba(0,0,0,0.05)" }}
      >
        {/* Logo area */}
        <div className="relative flex items-center justify-center w-[142px] h-[44px] shrink-0">
          <Image
            src="/logodots.svg"
            alt=""
            width={23}
            height={20}
            style={{ position: "absolute", left: "12px", height: "20px", width: "auto" }}
            priority
          />
          <Image
            src="/logo.svg"
            alt="Waldo"
            width={80}
            height={19}
            style={{ height: "19px", width: "auto", marginLeft: "16px" }}
            priority
          />
        </div>

        {/* Desktop — nav links */}
        <div
          className="hidden lg:flex items-center gap-[6px] px-[40px]"
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
          className="lg:hidden flex items-center justify-center w-7 h-7 text-[#9CA3AF] hover:text-[#1A1A1A] transition-colors mx-3"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="16" height="4" viewBox="0 0 16 4" fill="currentColor">
              <circle cx="2"  cy="2" r="1.5"/>
              <circle cx="8"  cy="2" r="1.5"/>
              <circle cx="14" cy="2" r="1.5"/>
            </svg>
          )}
        </button>

        {/* CTA */}
        <a
          href="#signup"
          className="hidden lg:flex items-center justify-center bg-[#1a1a1a] text-[#fafaf8] px-[24px] py-[18px] rounded-[30px] whitespace-nowrap shrink-0 hover:bg-[#333] transition-colors"
          style={{ fontFamily: "var(--font-headline)", fontSize: "14px", lineHeight: 1.3 }}
        >
          Get early access
        </a>
      </div>

      {/* ── Mobile dropdown ───────────────────────────────────── */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-[-1]"
            onClick={closeMenu}
            aria-hidden="true"
          />
          <div
            className="absolute top-full mt-2 w-[calc(100vw-32px)] max-w-[360px] rounded-2xl bg-[#fafaf8] shadow-[0_4px_20px_rgba(0,0,0,0.10)] border border-black/[0.06] overflow-hidden"
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
                {i < links.length - 1 && (
                  <div className="mx-5 h-px bg-black/[0.05]" />
                )}
              </div>
            ))}
            <div className="p-4">
              <a
                href="#signup"
                onClick={closeMenu}
                className="flex items-center justify-center bg-[#1a1a1a] text-[#fafaf8] px-6 py-4 rounded-[24px] w-full"
                style={{ fontFamily: "var(--font-headline)", fontSize: "14px" }}
              >
                Get early access
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
