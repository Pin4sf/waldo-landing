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
      {/* The footer scene from the older build: Waldo resting on a dock at sunset. A time-of-day
          version is still planned (see AGENTS.md, Block 8). */}
      <picture className="site-footer-scene" aria-hidden="true">
        <source media="(max-width: 639px) and (orientation: portrait)" srcSet="/assets/footer-bg-mobile.svg" />
        <source media="(orientation: landscape) and (max-height: 600px)" srcSet="/assets/footer-bg-mobile-landscape.svg" />
        <source media="(min-width: 640px) and (max-width: 1024px) and (orientation: portrait)" srcSet="/assets/footer-bg-tablet.svg" />
        {/* eslint-disable-next-line @next/next/no-img-element -- art-directed <picture>, which next/image doesn't support */}
        <img src="/build/footer-scene.svg" alt="" loading="lazy" />
      </picture>
      <div className="site-container">
        <div className="site-footer-grid">
          <div className="site-footer-brand">
            <Link href="/" className="site-nav-logo" aria-label="Waldo home">
              <WaldoMark />
              <span>Waldo</span>
            </Link>
            <p>One personal agent across work and life.</p>
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
    </footer>
  );
}
