"use client";

import { Icon, SeePhone, useScript } from "./kit";
import { OVERNIGHT } from "./see-fixture";

// Card 5: not "what did I miss". Thursday, 6:30am, the lock screen you wake up to. Waldo held the
// night's noise and leaves only what matters: the morning in one line, Soundroom's answer to
// yesterday's correction, and the rest, held and sorted. The notes arrive one by one.

export function OvernightScreen() {
  const { step } = useScript([600, 900, 900, 900]);
  return (
    <SeePhone className="see-phone--lock">
      <div className="see-lock">
        <div className="see-lock-top" data-on={step >= 1 ? "" : undefined}>
          <span className="see-lock-icon" aria-hidden="true"><Icon name="lock" /></span>
          <small>{OVERNIGHT.date}</small>
          <b>{OVERNIGHT.time}</b>
        </div>
        <ul className="see-notes" aria-label="Notifications">
          {OVERNIGHT.notes.map((note, k) => [
            <li key={note.id} className="see-note" data-on={step >= k + 2 ? "" : undefined}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="see-note-app" src="/assets/home/mascots/waldo-card.svg" alt="" />
              <span className="see-note-text">
                <span className="see-note-head">
                  <b>{note.title}</b>
                  <small>{note.when}</small>
                </span>
                <span>{note.text}</span>
              </span>
            </li>,
            // the held notes sit stacked under their summary
            note.id === "held" ? (
              <li key="stack" className="see-note-stack" data-on={step >= k + 2 ? "" : undefined} aria-hidden="true"><i /><i /></li>
            ) : null,
          ])}
        </ul>
      </div>
      <div className="see-lock-foot">
        <span className="see-lock-round" aria-hidden="true"><Icon name="flash" /></span>
        <span className="see-lock-round" aria-hidden="true"><Icon name="camera" /></span>
      </div>
    </SeePhone>
  );
}
