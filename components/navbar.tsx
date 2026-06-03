"use client";

import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import { WaldoLogoFull } from "./waldo-logo-full";

const links = [
  { label: "Brief", href: "#brief" },
  { label: "Actions", href: "#actions" },
  { label: "Now", href: "#where" },
  { label: "Pattern", href: "#constellation" },
];

function MobileNavItem({
  label,
  href,
  onClick,
}: {
  label: string;
  href: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="type-label flex h-12 w-full items-center rounded-xl px-4 text-[var(--ink)] transition-[background-color] duration-150 hover:bg-[var(--surface-t1)]"
    >
      {label}
    </Link>
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
  const [logoWag,    setLogoWag]    = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogoHover = useCallback(() => {
    setLogoWag(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setLogoWag(true)));
  }, []);

  const handleDesktopEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    onNavEnter?.();
  };
  const handleDesktopLeave = () => {
    timerRef.current = setTimeout(() => onNavLeave?.(), 80);
  };

  const openMenu = () => {
    setMenuOpen(true);
    onNavEnter?.();
  };

  const closeMenu = () => {
    setMenuOpen(false);
    onNavLeave?.();
  };

  return (
    <div className="relative z-20 flex flex-col items-center px-0 pt-5">
      <div
        className="flex w-full max-w-[720px] items-center rounded-full border border-[var(--border-default)] bg-[var(--surface-t2)] p-1.5"
        style={{  }}
      >
        <Link
          href="/"
          className="focusable-ring relative flex h-11 w-[136px] shrink-0 cursor-pointer items-center justify-center rounded-full"
          onMouseEnter={handleLogoHover}
          onAnimationEnd={() => setLogoWag(false)}
          aria-label="Waldo home"
        >
          <WaldoLogoFull wagging={logoWag} width={118} />
        </Link>

        <div
          className="hidden flex-1 items-center justify-center gap-1 px-6 md:flex"
          onMouseEnter={handleDesktopEnter}
          onMouseLeave={handleDesktopLeave}
        >
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="focusable-ring type-label rounded-full px-4 py-2 text-[var(--ink)] transition-[background-color] duration-150 hover:bg-[var(--surface-t1)]"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <button
          onClick={menuOpen ? closeMenu : openMenu}
          className="focusable-ring mx-2 flex h-10 w-10 items-center justify-center rounded-xl text-[var(--text-secondary)] transition-[background-color,color] duration-150 hover:bg-[var(--surface-t1)] hover:text-[var(--ink)] md:hidden"
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

        <Link
          href="/waitlist"
          className="focusable-ring type-label flex h-12 items-center justify-center rounded-full bg-[var(--ink)] px-5 text-[var(--surface-t2)] transition-[transform,background-color] duration-300 ease-[var(--ease-premium)] hover:-translate-y-px hover:bg-[var(--dark-t1)] active:scale-[0.98] sm:px-6"
        >
          Let Waldo in →
        </Link>
      </div>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-[-1]"
            onClick={closeMenu}
            aria-hidden="true"
          />
          <div
            className="surface-card absolute top-full mt-2 w-[calc(100vw-32px)] max-w-[360px] overflow-hidden p-2 md:hidden"
            style={{ animation: "content-enter 180ms var(--ease-premium) both" }}
          >
            {links.map((l) => (
              <div key={l.label}>
                <MobileNavItem
                  label={l.label}
                  href={l.href}
                  onClick={closeMenu}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
