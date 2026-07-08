"use client";

import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import { NavLink } from "./nav-link";
import { WaldoLogoFull } from "./waldo-logo-full";

type HeaderLink = {
  label: string;
  tooltip: string;
  href?: string;
};

const links: HeaderLink[] = [
  { label: "Features", href: "/features", tooltip: "Explore the full tour of Waldo." },
  { label: "Pricing", tooltip: "free to find out. when we're ready." },
  { label: "Blog", tooltip: "waldo's been busy. so have we." },
  { label: "Sign in", tooltip: "you're early. that's actually a good sign." },
];

function MobileNavItem({
  label,
  tooltip,
  href,
  open,
  onTap,
}: {
  label: string;
  tooltip: string;
  href?: string;
  open: boolean;
  onTap: () => void;
}) {
  if (href) {
    return (
      <Link
        href={href}
        onClick={onTap}
        className="flex w-full flex-col gap-1 rounded-xl px-4 py-3 text-left transition-colors hover:bg-black/[0.02]"
      >
        <span className="type-caption text-[var(--text-tertiary)]">{label}</span>
        {open ? (
          <span className="type-caption italic text-[var(--text-secondary)]" style={{ animation: "float-up 180ms var(--ease-premium) both" }}>
            {tooltip}
          </span>
        ) : null}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onTap}
      className="flex w-full flex-col gap-1 rounded-xl px-4 py-3 text-left transition-colors hover:bg-black/[0.02]"
    >
      <span className="type-caption text-[var(--text-tertiary)]">{label}</span>
      {open ? (
        <span className="type-caption italic text-[var(--text-secondary)]" style={{ animation: "float-up 180ms var(--ease-premium) both" }}>
          {tooltip}
        </span>
      ) : null}
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
    setActiveItem(null);
    onNavEnter?.();
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveItem(null);
    onNavLeave?.();
  };

  const toggleItem = (label: string) => {
    setActiveItem((current) => (current === label ? null : label));
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
          className="hidden flex-1 items-center justify-center gap-1 px-6 lg:flex"
          onMouseEnter={handleDesktopEnter}
          onMouseLeave={handleDesktopLeave}
        >
          {links.map((l) => (
            <NavLink
              key={l.label}
              label={l.label}
              tooltip={l.tooltip}
              href={l.href}
              align={l.label === "Sign in" ? "right" : "center"}
            />
          ))}
        </div>

        <button
          onClick={menuOpen ? closeMenu : openMenu}
          className="focusable-ring ml-auto mr-2 flex h-10 w-10 items-center justify-center rounded-xl text-[var(--text-secondary)] transition-[background-color,color] duration-150 hover:bg-[var(--surface-t1)] hover:text-[var(--ink)] lg:hidden"
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
          className="focusable-ring type-label hidden h-12 items-center justify-center rounded-full bg-[var(--ink)] px-5 text-[var(--surface-t2)] transition-[transform,background-color] duration-300 ease-[var(--ease-premium)] hover:-translate-y-px hover:bg-[var(--dark-t1)] active:scale-[0.98] sm:px-6 lg:flex"
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
            className="surface-card absolute top-full mt-2 w-[calc(100vw-32px)] max-w-[360px] overflow-hidden p-2 lg:hidden"
            style={{ animation: "content-enter 180ms var(--ease-premium) both" }}
          >
            {links.map((l, index) => (
              <div key={l.label}>
                <MobileNavItem
                  label={l.label}
                  tooltip={l.tooltip}
                  href={l.href}
                  open={activeItem === l.label}
                  onTap={() => {
                    if (l.href) closeMenu();
                    else toggleItem(l.label);
                  }}
                />
                {index < links.length - 1 ? <div className="mx-4 h-px bg-black/[0.05]" /> : null}
              </div>
            ))}
            <div className="p-3">
              <Link
                href="/waitlist"
                onClick={closeMenu}
                className="focusable-ring type-label flex h-12 w-full items-center justify-center rounded-[18px] bg-[var(--ink)] px-5 text-[var(--surface-t2)] transition-[transform,background-color] duration-300 ease-[var(--ease-premium)] hover:bg-[var(--dark-t1)] active:scale-[0.98]"
              >
                Let Waldo in →
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
