"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

const spots = [
  "M12.0455 8.19435C8.5546 8.63273 6.68628 1.37044 10.4049 0.0167778C14.1721 -0.400611 15.7586 7.09811 12.0455 8.19435Z",
  "M8.3092 10.5135C6.58923 13.9893 -0.949651 11.5404 0.0997341 7.32816C2.00498 3.60923 9.58249 6.4543 8.3092 10.5135Z",
  "M16.2786 9.83065C13.9189 7.43667 17.1194 2.50187 20.161 4.61989C22.6742 7.23047 19.1635 12.07 16.2786 9.83065Z",
  "M17.6058 13.2603C18.102 11.0572 22.6427 11.375 22.6197 13.8989C22.0525 16.2652 17.4372 15.7294 17.6058 13.2603Z",
  "M14.9478 15.3381C16.0796 14.5281 18.5029 18.2428 17.5123 19.5964C16.2774 20.4397 13.8966 16.5483 14.9478 15.3381Z",
  "M12.4438 16.4828C13.658 16.5976 13.532 19.6799 12.1468 19.9149C10.8424 19.7685 11.0872 16.6145 12.4438 16.4828Z",
  "M8.14378 17.1963C7.28218 17.5051 6.42602 17.6249 5.54174 17.3248C4.67747 17.041 4.12053 16.212 4.48021 15.3153C4.77929 14.5697 5.47458 14.0913 6.18381 13.7831C9.6415 12.3095 11.8426 15.68 8.14378 17.1963Z",
];

type NavItem = {
  label: string;
  tooltip: string;
  href?: string;
};

const navItems: NavItem[] = [
  { label: "Features", tooltip: "Explore the full tour of Waldo." },
  { label: "Pricing", tooltip: "free to find out. when we're ready." },
  { label: "Blog", tooltip: "waldo's been busy. so have we." },
  { label: "Sign In", tooltip: "you're early. that's actually a good sign." },
];

function WaldoMark({ active, onBloom }: { active: boolean; onBloom: () => void }) {
  return (
    <Link
      href="/"
      aria-label="Waldo home"
      className="new-home-nav-logo"
      onFocus={onBloom}
      onMouseEnter={onBloom}
    >
      <svg
        width="36"
        height="32"
        viewBox="0 0 23 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={`new-home-mark${active ? " waldo-spots-active" : ""}`}
      >
        {spots.map((d, index) => (
          <path
            key={d}
            d={d}
            fill="#FB943F"
            className="waldo-spot"
            style={
              {
                transformBox: "fill-box",
                transformOrigin: "center",
                "--spot-delay": `${index * 55}ms`,
              } as CSSProperties
            }
          />
        ))}
      </svg>
    </Link>
  );
}

function MenuItem({
  item,
  onNavigate,
}: {
  item: NavItem;
  onNavigate: () => void;
}) {
  const content = (
    <>
      <span>{item.label}</span>
      <span className="new-home-menu-comment" role="tooltip">
        {item.tooltip}
      </span>
    </>
  );

  if (item.href) {
    return (
      <Link className="new-home-menu-item" href={item.href} onClick={onNavigate}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className="new-home-menu-item new-home-menu-item--muted"
      type="button"
      aria-disabled="true"
      onClick={(event) => event.preventDefault()}
    >
      {content}
    </button>
  );
}

export function NewHomeNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoBlooming, setLogoBlooming] = useState(false);
  const menuId = useId();
  const navRef = useRef<HTMLElement | null>(null);

  const bloomLogo = useCallback(() => {
    setLogoBlooming(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setLogoBlooming(true)));
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) closeMenu();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [closeMenu, menuOpen]);

  const toggleMenu = () => {
    bloomLogo();
    setMenuOpen((open) => !open);
  };

  return (
    <header ref={navRef} className="new-home-nav">
      <WaldoMark
        active={logoBlooming || menuOpen}
        onBloom={bloomLogo}
      />

      <div className="new-home-nav-actions">
        <div
          id={menuId}
          className="new-home-menu-popover"
          data-state={menuOpen ? "open" : "closed"}
          aria-hidden={!menuOpen}
        >
          <nav aria-label="Main navigation" className="new-home-menu-options">
            {navItems.map((item) => (
              <MenuItem key={item.label} item={item} onNavigate={closeMenu} />
            ))}
          </nav>
          <Link className="new-home-menu-cta" href="/waitlist" onClick={closeMenu}>
            Let Waldo in →
          </Link>
        </div>

        <button
          type="button"
          className="new-home-menu-button"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={toggleMenu}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>
    </header>
  );
}
