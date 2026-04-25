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

  const handleNavLeave = () => {
    timerRef.current = setTimeout(() => setDimmed(false), 80);
  };

  return (
    <div className="min-h-screen bg-[#f4f3f0]">
      <div className="sticky top-0 z-20 flex justify-center" style={{ paddingTop: "20px" }}>
        <div className="w-full max-w-[1440px] px-4">
          <Navbar onNavEnter={handleNavEnter} onNavLeave={handleNavLeave} />
        </div>
      </div>
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
