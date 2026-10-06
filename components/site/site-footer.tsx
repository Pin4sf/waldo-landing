import Link from "next/link";

import { WaldoMark } from "./site-nav";

const KENNEL_REPO = "https://github.com/waldoco/Waldo-Kennel";

// The one footer for every page. Only destinations that exist are listed.
const GROUPS = [
  {
    title: "Products",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Kennel for Mac", href: "/kennel" },
      { label: "Connectors", href: "/connectors" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Why Waldo", href: "/why-waldo" },
      { label: "Blog", href: "/blogs" },
      { label: "Support", href: "/support" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { label: "GitHub", href: KENNEL_REPO },
      { label: "RSS", href: "/blogs/rss.xml" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      {/* Every link in one box, right after the page's close */}
      <div className="site-container">
        <div className="site-footer-box">
          <div className="site-footer-grid">
            <div className="site-footer-brand">
              <Link href="/" className="site-nav-logo" aria-label="Waldo home">
                <WaldoMark />
                <span>Waldo</span>
              </Link>
            </div>
            {GROUPS.map((group) => (
              <div key={group.title}>
                <h2>{group.title}</h2>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith("http") ? (
                        <a href={link.href} target="_blank" rel="noreferrer">
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href}>{link.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="site-footer-base">
            <span>© {new Date().getFullYear()} Waldo</span>
            <Link href="/waitlist">Let Waldo in →</Link>
          </div>
        </div>
      </div>
      {/* The footer scene from the older build: Waldo resting on a dock at sunset. It is the last thing on the
          page, flush with the bottom edge, with nothing below it. A time-of-day version is still planned
          (see AGENTS.md, Block 8). */}
      <picture className="site-footer-scene">
        <source media="(max-width: 639px) and (orientation: portrait)" srcSet="/assets/footer-bg-mobile.svg" />
        <source media="(orientation: landscape) and (max-height: 600px)" srcSet="/assets/footer-bg-mobile-landscape.svg" />
        <source media="(min-width: 640px) and (max-width: 1024px) and (orientation: portrait)" srcSet="/assets/footer-bg-tablet.svg" />
        <img src="/build/footer-scene.svg" alt="" loading="lazy" />
      </picture>
    </footer>
  );
}
