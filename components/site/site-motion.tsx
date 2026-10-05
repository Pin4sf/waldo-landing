"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Drives the page-level motion in site.css:
// - marks the page as scrolled, so the menu bar gains its soft background
// - marks headline blocks, grids and lists as "in view" the first time they scroll into view
export function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    function onScroll() {
      if (window.scrollY > 0) root.dataset.scrolled = "";
      else delete root.dataset.scrolled;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      delete root.dataset.scrolled;
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal="view"], [data-appear]'),
    ).filter((element) => !("inview" in element.dataset));

    if (!("IntersectionObserver" in window)) {
      targets.forEach((element) => (element.dataset.inview = ""));
      root.dataset.motionReady = "";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.inview = "";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    targets.forEach((element) => observer.observe(element));
    root.dataset.motionReady = "";
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
