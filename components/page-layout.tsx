"use client";

import { useRef, useState } from "react";
import { Navbar } from "./navbar";
import { WaitlistPage } from "./waitlist-page";

export function PageLayout() {
  const [dimmed, setDimmed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleNavEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDimmed(true);
  };

  // Small debounce so moving between nav items doesn't flicker
  const handleNavLeave = () => {
    timerRef.current = setTimeout(() => setDimmed(false), 80);
  };

  return (
    <div className="min-h-screen" style={{ background: "#EDEAE3" }}>
      <Navbar onNavEnter={handleNavEnter} onNavLeave={handleNavLeave} />
      <div
        style={{
          opacity:       dimmed ? 0.4 : 1,
          transition:    "opacity 200ms ease-out",
          pointerEvents: dimmed ? "none" : undefined,
        }}
      >
        <WaitlistPage />
      </div>
    </div>
  );
}
