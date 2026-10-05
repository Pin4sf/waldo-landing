"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "waldo-cookie-notice-dismissed";

export function CookieBanner() {
  const [dismissed, setDismissed] = useState(true);
  const [leaving, setLeaving] = useState(false);

  // Read localStorage post-mount only, so SSR and the first client render match (avoids hydration mismatch).
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDismissed(window.localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      setDismissed(false);
    }
  }, []);

  function dismiss() {
    // Let the exit animation play (175ms, see site.css) before removing the notice.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) setDismissed(true);
    else {
      setLeaving(true);
      window.setTimeout(() => setDismissed(true), 175);
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // localStorage unavailable (private mode) — banner just won't persist.
    }
  }

  if (dismissed) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie notice" data-ending={leaving ? "" : undefined}>
      <p>No tracking cookies here. We only remember that you closed this.</p>
      <button type="button" onClick={dismiss} className="cookie-banner-dismiss focusable-ring">
        Got it
      </button>
    </div>
  );
}
