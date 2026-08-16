"use client";

import { useEffect, useRef, useState } from "react";

type ArticleHeading = {
  id: string;
  label: string;
};

type ArticleContentsProps = {
  headings: ArticleHeading[];
};

export function ArticleContents({ headings }: ArticleContentsProps) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");
  const routePathRef = useRef<SVGPathElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);
  const progressMarkerRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (headings.length === 0) return;

    let frame = 0;

    const syncActiveHeading = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const readingLine = Math.min(220, window.innerHeight * 0.28);
        let nextActiveId = headings[0].id;
        const headingPositions = headings.flatMap((heading) => {
          const section = document.getElementById(heading.id);
          return section ? [section.getBoundingClientRect().top + window.scrollY] : [];
        });

        for (const heading of headings) {
          const section = document.getElementById(heading.id);
          if (section && section.getBoundingClientRect().top <= readingLine) {
            nextActiveId = heading.id;
          }
        }

        setActiveId((current) => (current === nextActiveId ? current : nextActiveId));

        const firstHeading = headingPositions[0];
        const lastHeading = headingPositions.at(-1);
        const routePath = routePathRef.current;
        const progressPath = progressPathRef.current;
        const progressMarker = progressMarkerRef.current;

        if (
          firstHeading !== undefined &&
          lastHeading !== undefined &&
          routePath &&
          progressPath &&
          progressMarker
        ) {
          const range = Math.max(1, lastHeading - firstHeading);
          const progress = Math.min(
            1,
            Math.max(0, (window.scrollY + readingLine - firstHeading) / range),
          );
          const routeLength = routePath.getTotalLength();
          const markerPoint = routePath.getPointAtLength(routeLength * progress);

          progressPath.style.strokeDashoffset = String(1 - progress);
          progressMarker.setAttribute("cx", String(markerPoint.x));
          progressMarker.setAttribute("cy", String(markerPoint.y));
          progressMarker.dataset.visible = progress > 0 ? "true" : "false";
        }
      });
    };

    syncActiveHeading();
    window.addEventListener("scroll", syncActiveHeading, { passive: true });
    window.addEventListener("resize", syncActiveHeading);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", syncActiveHeading);
      window.removeEventListener("resize", syncActiveHeading);
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="blog-contents" aria-label="Article contents">
      <p>On this page</p>
      <div className="blog-contents-list-wrap">
        <svg
          className="blog-contents-route"
          viewBox="0 0 24 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            ref={routePathRef}
            className="blog-contents-route-base"
            d="M2 0 V39 C2 44 18 44 18 49 V100"
            pathLength="1"
          />
          <path
            ref={progressPathRef}
            className="blog-contents-route-progress"
            d="M2 0 V39 C2 44 18 44 18 49 V100"
            pathLength="1"
          />
          <circle
            ref={progressMarkerRef}
            className="blog-contents-route-marker"
            cx="2"
            cy="0"
            r="2.35"
          />
        </svg>
        <ol>
          {headings.map((heading, index) => {
            const active = heading.id === activeId;

            return (
              <li
                key={heading.id}
                data-route-offset={index >= 3 ? "true" : undefined}
              >
                <a
                  className="blog-contents-link"
                  href={`#${heading.id}`}
                  aria-current={active ? "location" : undefined}
                  onClick={() => setActiveId(heading.id)}
                >
                  {heading.label}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </aside>
  );
}
