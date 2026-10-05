"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { captureUtmParams } from "@/lib/utm";

import { ArrowLabel } from "./blocks";

// The one menu for every page. Only pages that exist get a link (see docs/website/sitemap.md).
const PRODUCTS = [
  { label: "Kennel for Mac", note: "Open beta", href: "/kennel", icon: "/build/kennel-icon.svg" },
  { label: "Waldo for iPhone", note: "Coming soon", icon: "/build/ios-icon.svg" },
  { label: "Connectors", note: "Everything Waldo works with", href: "/connectors", icon: "/build/plugins-icon.svg" },
] as const;

const LINKS = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Why Waldo", href: "/why-waldo" },
  { label: "Blog", href: "/blogs" },
] as const;

export function WaldoMark({ size = 18 }: { size?: number }) {
  const spots = [
    "M12.0455 8.19435C8.5546 8.63273 6.68628 1.37044 10.4049 0.0167778C14.1721 -0.400611 15.7586 7.09811 12.0455 8.19435Z",
    "M8.3092 10.5135C6.58923 13.9893 -0.949651 11.5404 0.0997341 7.32816C2.00498 3.60923 9.58249 6.4543 8.3092 10.5135Z",
    "M16.2786 9.83065C13.9189 7.43667 17.1194 2.50187 20.161 4.61989C22.6742 7.23047 19.1635 12.07 16.2786 9.83065Z",
    "M17.6058 13.2603C18.102 11.0572 22.6427 11.375 22.6197 13.8989C22.0525 16.2652 17.4372 15.7294 17.6058 13.2603Z",
    "M14.9478 15.3381C16.0796 14.5281 18.5029 18.2428 17.5123 19.5964C16.2774 20.4397 13.8966 16.5483 14.9478 15.3381Z",
    "M12.4438 16.4828C13.658 16.5976 13.532 19.6799 12.1468 19.9149C10.8424 19.7685 11.0872 16.6145 12.4438 16.4828Z",
    "M8.14378 17.1963C7.28218 17.5051 6.42602 17.6249 5.54174 17.3248C4.67747 17.041 4.12053 16.212 4.48021 15.3153C4.77929 14.5697 5.47458 14.0913 6.18381 13.7831C9.6415 12.3095 11.8426 15.68 8.14378 17.1963Z",
  ];
  return (
    <svg width={size} height={(size * 20) / 23} viewBox="0 0 23 20" fill="currentColor" aria-hidden="true">
      {spots.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

type MenuState = "closed" | "open" | "closing";

// A menu that plays its exit animation before it disappears (180ms, Linear's popup timing).
function useMenu() {
  const [state, setState] = useState<MenuState>("closed");
  const timer = useRef<number | undefined>(undefined);

  const open = useCallback(() => {
    window.clearTimeout(timer.current);
    setState("open");
  }, []);

  const close = useCallback(() => {
    window.clearTimeout(timer.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState("closed");
      return;
    }
    setState((current) => (current === "closed" ? current : "closing"));
    timer.current = window.setTimeout(() => setState("closed"), 180);
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return { state, isOpen: state === "open", open, close };
}

function Chevron() {
  return (
    <svg className="site-nav-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M2.5 4l2.5 2.5L7.5 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SiteNav() {
  const pathname = usePathname();
  const products = useMenu();
  const mobile = useMenu();
  const groupRef = useRef<HTMLDivElement>(null);
  const lastPointer = useRef("");
  const { close: closeProducts } = products;
  const { close: closeMobile } = mobile;

  useEffect(() => {
    captureUtmParams();
  }, []);

  // Close both menus after navigating.
  useEffect(() => {
    closeProducts();
    closeMobile();
  }, [pathname, closeProducts, closeMobile]);

  // Escape or a click elsewhere closes whichever menu is open.
  useEffect(() => {
    if (!products.isOpen && !mobile.isOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeProducts();
        closeMobile();
      }
    }
    function onPointer(event: PointerEvent) {
      if (!(event.target instanceof Node)) return;
      if (groupRef.current?.contains(event.target)) return;
      if ((event.target as Element).closest?.(".site-nav-mobile")) return;
      closeProducts();
      closeMobile();
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [products.isOpen, mobile.isOpen, closeProducts, closeMobile]);

  const current = (href: string) => (pathname === href || pathname.startsWith(`${href}/`) ? "page" : undefined);

  return (
    <header className="site-nav">
      <div className="site-container site-nav-inner">
        <Link href="/" className="site-nav-logo" aria-label="Waldo home">
          <WaldoMark />
          <span>Waldo</span>
        </Link>

        <nav className="site-nav-links" aria-label="Main">
          <div
            ref={groupRef}
            className="site-nav-group"
            data-open={products.isOpen ? "" : undefined}
            onPointerEnter={(event) => event.pointerType === "mouse" && products.open()}
            onPointerLeave={(event) => event.pointerType === "mouse" && products.close()}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) products.close();
            }}
          >
            <button
              type="button"
              className="site-nav-link"
              aria-expanded={products.isOpen}
              aria-controls="site-products-menu"
              onPointerDown={(event) => {
                lastPointer.current = event.pointerType;
              }}
              onClick={() => {
                const pointer = lastPointer.current;
                lastPointer.current = "";
                // A mouse already opened it on hover, so the click keeps it open.
                if (pointer === "mouse" && products.isOpen) return;
                if (products.isOpen) products.close();
                else products.open();
              }}
            >
              Products
              <Chevron />
            </button>
            {products.state !== "closed" ? (
              <div
                id="site-products-menu"
                className="site-nav-menu"
                data-ending={products.state === "closing" ? "" : undefined}
              >
                {PRODUCTS.map((item) =>
                  "href" in item ? (
                    <Link key={item.label} href={item.href}>
                      <Image src={item.icon} alt="" width={36} height={28} unoptimized />
                      <span>
                        {item.label}
                        <small>{item.note}</small>
                      </span>
                    </Link>
                  ) : (
                    <span key={item.label} className="site-nav-menu-soon">
                      <Image src={item.icon} alt="" width={36} height={28} unoptimized />
                      <span>
                        {item.label}
                        <small>{item.note}</small>
                      </span>
                    </span>
                  ),
                )}
              </div>
            ) : null}
          </div>
          {LINKS.map((item) => (
            <Link key={item.href} href={item.href} className="site-nav-link" aria-current={current(item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-nav-end">
          <Link href="/waitlist" className="site-button site-button--primary site-button--small site-nav-cta">
            <ArrowLabel label="Let Waldo in →" />
          </Link>
        </div>

        <div className="site-nav-mobile">
          <button
            type="button"
            className="site-nav-link site-nav-toggle"
            aria-expanded={mobile.isOpen}
            aria-controls="site-mobile-menu"
            onClick={() => (mobile.isOpen ? mobile.close() : mobile.open())}
          >
            {mobile.isOpen ? "Close" : "Menu"}
          </button>
          {mobile.state !== "closed" ? (
            <div
              id="site-mobile-menu"
              className="site-nav-mobile-panel"
              data-ending={mobile.state === "closing" ? "" : undefined}
            >
              {PRODUCTS.map((item) =>
                "href" in item ? (
                  <Link key={item.label} href={item.href}>
                    {item.label}
                  </Link>
                ) : (
                  <span key={item.label}>
                    {item.label} ({item.note.toLowerCase()})
                  </span>
                ),
              )}
              {LINKS.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
              <Link href="/waitlist">Let Waldo in →</Link>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
