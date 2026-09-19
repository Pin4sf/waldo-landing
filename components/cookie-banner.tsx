"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "waldo-cookie-notice-dismissed";

export function CookieBanner() {
  const [dismissed, setDismissed] = useState(true);

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
    setDismissed(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // localStorage unavailable (private mode) — banner just won't persist.
    }
  }

  if (dismissed) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie notice">
      <p>We use a couple of essential cookies to remember your visit. No ad trackers.</p>
      <button type="button" onClick={dismiss} className="cookie-banner-dismiss focusable-ring">
        Got it
      </button>
    </div>
  );
}
