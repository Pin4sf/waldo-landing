"use client";

import { Icon, SeePhone, StateTag, useScript } from "./kit";
import { OVERNIGHT } from "./see-fixture";

// Card 5: Thursday, 6:30am, the lock screen you wake up to. One notification only: the correction that
// waits for your yes. Nothing about what Waldo did overnight or is watching, on purpose, and the line under
// it says so: he doesn't trouble you about what he can do himself. The note arrives, then the line.

export function OvernightScreen() {
  const { step } = useScript([600, 900, 1100]);
  return (
    <SeePhone className="see-phone--lock">
      <div className="see-lock">
        <div className="see-lock-top" data-on={step >= 1 ? "" : undefined}>
          <span className="see-lock-icon" aria-hidden="true"><Icon name="lock" /></span>
          <small>{OVERNIGHT.date}</small>
          <b>{OVERNIGHT.time}</b>
        </div>
        <ul className="see-notes" aria-label="Notifications">
          <li className="see-note" data-on={step >= 2 ? "" : undefined}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="see-note-app" src="/assets/home/mascots/waldo-card.svg" alt="" />
            <span className="see-note-text">
              <span className="see-note-head">
                <b>{OVERNIGHT.note.title}</b>
                <StateTag state={OVERNIGHT.note.state} />
              </span>
              <span>{OVERNIGHT.note.text}</span>
            </span>
          </li>
        </ul>
        <p className="see-lock-quiet" data-on={step >= 3 ? "" : undefined}>
          <b>{OVERNIGHT.quiet.line}</b>
          <span>{OVERNIGHT.quiet.reason}</span>
        </p>
      </div>
      <div className="see-lock-foot">
        <span className="see-lock-round" aria-hidden="true"><Icon name="flash" /></span>
        <span className="see-lock-round" aria-hidden="true"><Icon name="camera" /></span>
      </div>
    </SeePhone>
  );
}
