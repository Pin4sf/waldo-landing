// Editorial-quality typography for long marketing copy.
//
// Two layers of polish:
//   1. CSS `text-wrap: balance` — free, server-rendered, works in Chrome/Safari/Firefox 2024+.
//      Browser computes balanced line breaks. Good enough for ~95% of cases.
//   2. Pretext upgrade — client-side, runs after fonts load. Uses Knuth-Plass paragraph
//      layout (the LaTeX algorithm) for true global line-break optimization. Only kicks
//      in when `pretextify` is true AND the paragraph is wider than `pretextThreshold` chars.
//
// Defaults are tuned to add zero perceptible cost to short copy and meaningful polish to
// the long literary passages (Spot/Constellation/Adjustment voice, "Six weeks of Tuesdays...").

"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";
import { prepareWithSegments, walkLineRanges, materializeLineRange } from "@chenglou/pretext";

type Props = {
  children: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Apply pretext line-breaking on top of CSS balance. Default: false. */
  pretextify?: boolean;
  /** Min length before pretext kicks in (avoids cost on short copy). Default: 80. */
  pretextThreshold?: number;
};

export function BalancedParagraph({
  children,
  as: Tag = "p",
  className,
  style,
  pretextify = false,
  pretextThreshold = 80,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [lines, setLines] = useState<string[] | null>(null);

  useEffect(() => {
    if (!pretextify || children.length < pretextThreshold) return;
    const node = ref.current;
    if (!node) return;

    let cancelled = false;

    // Wait for fonts so width measurements are accurate
    const ready = (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts?.ready ?? Promise.resolve();
    ready.then(() => {
      if (cancelled) return;

      const cs = window.getComputedStyle(node);
      const font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      const maxWidth = node.clientWidth;
      if (maxWidth <= 0) return;

      try {
        const prepared = prepareWithSegments(children, font);
        const computed: string[] = [];
        walkLineRanges(prepared, maxWidth, (range) => {
          computed.push(materializeLineRange(prepared, range).text);
        });
        if (computed.length > 1) setLines(computed);
      } catch {
        // Pretext failed — silently keep CSS-balanced fallback. Never block render.
      }
    });

    return () => {
      cancelled = true;
    };
  }, [children, pretextify, pretextThreshold]);

  // Default style applies CSS balance (cheap, always on)
  const merged: CSSProperties = {
    textWrap: "balance",
    ...style,
  };

  // Once pretext has computed lines, render explicit breaks for true Knuth-Plass output
  let content: ReactNode = children;
  if (lines) {
    content = lines.map((line, i) => (
      <span key={i} style={{ display: "block" }}>
        {line}
      </span>
    ));
  }

  return (
    <Tag ref={ref} className={className} style={merged}>
      {content}
    </Tag>
  );
}
