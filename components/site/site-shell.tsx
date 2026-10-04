import "./site.css";
import "./site-pages.css";

import type { ReactNode } from "react";

import { CookieBanner } from "@/components/cookie-banner";

import { SiteFooter } from "./site-footer";
import { SiteMotion } from "./site-motion";
import { SiteNav } from "./site-nav";

// Every page is wrapped in this: the same menu, footer and page background everywhere.
// Pages that render their own <main> (the blog articles) pass `ownMain`.
// Every page is light. The Kennel page passes theme="dark" and is always dark (Kennel's own colours).
// The homepage passes `home` (marks the page as data-home). Every light page is #FAFAF8, as the homepage is.
export function SiteShell({
  children,
  announcement,
  ownMain = false,
  theme = "light",
  home = false,
}: {
  children: ReactNode;
  announcement?: ReactNode;
  ownMain?: boolean;
  theme?: "light" | "dark";
  home?: boolean;
}) {
  return (
    <div
      className="site"
      data-theme={theme === "dark" ? "dark" : undefined}
      data-home={home ? "" : undefined}
    >
      {ownMain ? null : (
        <a className="site-skip" href="#main-content">
          Skip to content
        </a>
      )}
      {/* Announcements sit above the menu bar and scroll away, the menu then sticks */}
      {announcement ? (
        <div className="site-announcement">{announcement}</div>
      ) : null}
      <SiteNav />
      {ownMain ? children : <main id="main-content">{children}</main>}
      <SiteFooter />
      <CookieBanner />
      <SiteMotion />
    </div>
  );
}
