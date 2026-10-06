"use client";

import { useEffect, useRef, useState } from "react";

import { OverviewScreen } from "./see/brief";
import { SlideState } from "./see/kit";
import { SEE_SECTION } from "./see/see-fixture";
import { useLive } from "./use-live";
import { WAITLIST_EMAIL_ID, WaitlistPanel } from "./waitlist-panel";
import { WaldoPings } from "./waldo-pings";

import "./see/see.css";
import "./waitlist.css";

// The waitlist page's first screen (docs/website/pages/waitlist.md, "Layout"): Waldo's notifications at the
// top, the title, one line, the form as one pill, then the app rising out of a box (the homepage's Stage, with
// no title in it). Flat and minimal: no gradients, no shadows, nothing else. Whatever else the page has to say
// sits below the phone (app/waitlist/page.tsx).

type Variant = "default" | "kennel";

/** Which part of the day the phone's brief opens on (BRIEFS in see-fixture.ts): the visitor's own */
function briefFor(hour: number) {
  if (hour >= 5 && hour < 11) return 1;
  if (hour >= 11 && hour < 14) return 2;
  if (hour >= 14 && hour < 16) return 3;
  if (hour >= 16 && hour < 19) return 4;
  return 5;
}

function Phone() {
  const root = useRef<HTMLDivElement>(null);
  const live = useLive(root);
  const [hero, setHero] = useState(1);
  // The visitor's clock is read after mount, so the server's render and the first one here match
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHero(briefFor(new Date().getHours()));
  }, []);
  return (
    <div className="site-container wl-stage-row">
      <div className="site-stage wl-stage">
        <div className="site-stage-picture" data-appear="rise">
          <div className="wl-phone" ref={root}>
            <p className="see-sr">{SEE_SECTION.demoNote}</p>
            <SlideState.Provider value={{ active: live, arrive: false, inView: live, running: live, hero, setHero }}>
              <OverviewScreen />
            </SlideState.Provider>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WaitlistHero({ variant }: { variant: Variant }) {
  return (
    <section className="wl">
      <WaldoPings variant={variant} watch="waitlist-form" focus={WAITLIST_EMAIL_ID} />
      <div className="site-container wl-inner" id="waitlist-form">
        <WaitlistPanel variant={variant} />
      </div>
      <Phone />
    </section>
  );
}
