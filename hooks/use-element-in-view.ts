"use client";

import { useEffect, useState, type RefObject } from "react";

export function useElementInView<T extends Element>(
  ref: RefObject<T | null>,
  rootMargin = "240px",
) {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? true),
      { rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return inView;
}
