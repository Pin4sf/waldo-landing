"use client";

import { type CSSProperties, type ReactNode, useEffect, useMemo, useRef } from "react";

import { AppHeader, Icon, type IconName, Logo, ReplyButtons, SeePhone, WaldoBar, useScript, useTyping } from "./kit";
import { CHAT, PLAN, type Pin, type Turn } from "./see-fixture";

// Cards 2 and 3 are conversations with Waldo, played as they would happen: the question typed and
// sent, the chat named, the trends that matter pinned to the top, several checks at once (collapsing
// to one line when done), a short answer, a graphic when one helps, and what to do about it. Then the
// conversation goes on, and not every answer needs a graphic. Card 3 starts on tomorrow's calendar.

type Event = { key: string; ms: number };

const NONE: Event[] = [];

/** The script of a conversation: one event per thing that happens, with how long it holds */
function scriptOf(turns: readonly Turn[], prequel: Event[] = []): Event[] {
  const events: Event[] = [...prequel];
  turns.forEach((turn, i) => {
    if (turn.from === "you") {
      events.push({ key: `type:${i}`, ms: 500 + turn.text.length * 34 }, { key: `send:${i}`, ms: 550 });
      if (i === 0) events.push({ key: "title", ms: 800 }, { key: "pins", ms: 900 });
      return;
    }
    events.push({ key: `dots:${i}`, ms: 900 });
    if (turn.work) events.push({ key: `work:${i}`, ms: 700 * turn.work.length + 500 });
    events.push({ key: `lead:${i}`, ms: turn.graphic ? 900 : 700 });
    if (turn.graphic) events.push({ key: `graphic:${i}`, ms: 1500 });
    if (turn.help) events.push({ key: `help:${i}`, ms: 1400 });
    events.push({ key: `actions:${i}`, ms: 1100 });
  });
  return events;
}

function PinRow({ pins, on }: { pins: readonly Pin[]; on: boolean }) {
  return (
    <div className="see-pins" data-on={on ? "" : undefined} aria-label="Pinned by Waldo">
      <span className="see-pin-glyph" aria-hidden="true"><Icon name="pin" /></span>
      {pins.map((pin, k) => (
        <span key={pin.text} className="see-pin" data-icon={pin.icon} style={{ "--k": k } as CSSProperties}>
          {pin.logo ? <Logo name={pin.logo} size={16} /> : pin.icon ? <Icon name={pin.icon} /> : null}
          {pin.text}
          {pin.down ? <i className="see-pin-down" aria-label="below your usual"><Icon name="arrow" /></i> : null}
        </span>
      ))}
    </div>
  );
}

const hours = (m: number) => `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, "0")}m`;

/**
  Card 2's chart, drawn the way Linear draws its Insights: a card with its title top left, thin stacked
  bars with small gaps between the parts, flat colours, dotted gridlines, the scale on the right in
  small grey, and dots for the legend. Seven nights; the last one is last night.
*/
function SleepChart() {
  const top = 480;
  const scale = [480, 360, 240, 120, 0];
  const last = CHAT.nights.length - 1;
  return (
    <figure className="see-chart">
      <figcaption className="see-chart-title">Sleep, last 7 nights</figcaption>
      <div className="see-chart-plot">
        <div className="see-chart-grid" aria-hidden="true">
          {scale.map((m) => <span key={m} style={{ bottom: `${(m / top) * 100}%` }}><i />{m ? `${m / 60}h` : "0"}</span>)}
        </div>
        <ul className="see-bars" role="img" aria-label={`Sleep over the last seven nights. Last night ${hours(312)}, with ${CHAT.nights[last].deep} minutes of deep sleep; the six nights before were around 7 hours with over an hour of deep sleep.`}>
          {CHAT.nights.map((n, k) => (
            <li key={k} data-last={k === last ? "" : undefined} style={{ "--k": k } as CSSProperties}>
              {k === last ? <b className="see-bar-value">{hours(n.deep + n.rem + n.light)}</b> : null}
              <span className="see-bar-stack" style={{ height: `${((n.deep + n.rem + n.light) / top) * 100}%` }}>
                <i data-part="deep" style={{ flexGrow: n.deep }} />
                <i data-part="rem" style={{ flexGrow: n.rem }} />
                <i data-part="light" style={{ flexGrow: n.light }} />
              </span>
              <small>{n.day}</small>
            </li>
          ))}
        </ul>
      </div>
      <div className="see-legend" aria-hidden="true">
        <span><i data-part="deep" />Deep</span>
        <span><i data-part="rem" />REM</span>
        <span><i data-part="light" />Light</span>
      </div>
    </figure>
  );
}

/**
  Card 3's chart: tomorrow as Linear draws a timeline. Hour ticks along the top with dotted lines down,
  a label for each row on the left: the run as a bar, the meals as diamonds, the meetings in grey.
*/
function DayTimeline() {
  const from = 6;
  const to = 18;
  const x = (h: number) => `${((h - from) / (to - from)) * 100}%`;
  const w = (a: number, b: number) => `${((b - a) / (to - from)) * 100}%`;
  const ticks = [6, 8, 10, 12, 14, 16, 18];
  const label = (h: number) => (h === 12 ? "12p" : h > 12 ? `${h - 12}p` : `${h}a`);
  return (
    <figure className="see-chart">
      <figcaption className="see-chart-title">Thursday</figcaption>
      <div className="see-tl" role="img" aria-label="Thursday: the run at 7am for 40 minutes, breakfast at 8 and lunch at 12:30, meetings from 9am to 5pm; no meeting moves">
        <div className="see-tl-ticks" aria-hidden="true">
          {ticks.map((h) => <span key={h} style={{ left: x(h) }}>{label(h)}</span>)}
        </div>
        {[
          { id: "run", name: "Run" },
          { id: "meals", name: "Meals" },
          { id: "meet", name: "Meetings" },
        ].map((row) => (
          <div key={row.id} className="see-tl-row" data-row={row.id}>
            <span className="see-tl-name">{row.name}</span>
            <span className="see-tl-track">
              {ticks.map((h) => <i key={h} className="see-tl-line" style={{ left: x(h) }} />)}
              {row.id === "run" ? <b className="see-tl-bar" style={{ left: x(PLAN.workout.from), width: w(PLAN.workout.from, PLAN.workout.to) }} /> : null}
              {row.id === "meals" ? [8, 12.5].map((h) => <span key={h} className="see-tl-mark" style={{ left: x(h) }}><Icon name="diamond" /></span>) : null}
              {row.id === "meet" ? PLAN.events.map((e) => <b key={e.name} className="see-tl-bar see-tl-bar--grey" style={{ left: x(e.from), width: w(e.from, e.to) }} />) : null}
            </span>
          </div>
        ))}
      </div>
      <p className="see-chart-note">No meeting moves.</p>
    </figure>
  );
}

const HELP_ICON: Record<string, IconName> = { coffee: "coffee", moon: "moon", calendar: "calendar", chat: "chat", watch: "watch" };

/** One message in a one-to-one chat, as Waldo's iOS app sets it: yours in a dark bubble on the right,
    Waldo's on the left with no picture (his words in a soft bubble, charts and lists below them) */
function Message({ from, children, pop }: { from: "you" | "waldo"; time?: string; children: ReactNode; pop?: boolean }) {
  return <div className={`see-msg ${pop ? (from === "you" ? "see-enter-pop" : "see-enter") : ""}`} data-from={from}>{children}</div>;
}

/** One conversation, played from its script */
function Conversation({ turns, title, untitled, pins, time, has, now, typed }: {
  turns: readonly Turn[];
  title: string;
  untitled: string;
  pins: readonly Pin[];
  time: string;
  has: (key: string) => boolean;
  now: (key: string) => boolean;
  typed: string;
}) {
  const body = useRef<HTMLDivElement>(null);
  const progress = turns.map((_, i) => ["send", "dots", "work", "lead", "graphic", "help", "actions"].filter((k) => has(`${k}:${i}`)).length).join(",");
  // The conversation keeps the newest line in view, as a phone does
  useEffect(() => {
    const el = body.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [progress]);
  const named = has("title");
  return (
    <>
      <AppHeader left="panel" title={named ? title : untitled} titleKey={named ? "named" : "new"} />
      <PinRow pins={pins} on={has("pins")} />
      <div className="see-chat" ref={body}>
        {turns.map((turn, i) => {
          if (turn.from === "you") {
            return has(`send:${i}`) || now(`send:${i}`) ? (
              <Message key={i} from="you" time={time} pop>
                <p className="see-msg-text">{turn.text}</p>
              </Message>
            ) : null;
          }
          const thinking = now(`dots:${i}`);
          if (!has(`dots:${i}`) && !thinking) return null;
          return (
            <Message key={i} from="waldo" time={time} pop>
              {thinking ? <span className="see-typing" aria-label="Waldo is looking"><i /><i /><i /></span> : null}
              {turn.work && (now(`work:${i}`) || has(`work:${i}`)) ? (
                <div className="see-work" data-done={has(`work:${i}`) ? "" : undefined}>
                  {has(`work:${i}`) ? (
                    <p className="see-work-sum see-enter"><Icon name="check" />Checked {turn.work.length} things</p>
                  ) : (
                    turn.work.map((line, k) => (
                      <p key={line} className="see-work-line see-enter" style={{ "--k": k } as CSSProperties}>
                        <span className="see-spin" aria-hidden="true" />
                        <span className="see-shimmer">{line}…</span>
                      </p>
                    ))
                  )}
                </div>
              ) : null}
              {has(`lead:${i}`) ? <p className="see-msg-text see-enter">{turn.lead}</p> : null}
              {turn.graphic && has(`graphic:${i}`) ? <div className="see-enter">{turn.graphic === "sleep" ? <SleepChart /> : <DayTimeline />}</div> : null}
              {turn.help && has(`help:${i}`) ? (
                <div className="see-help see-enter">
                  <small>{turn.helpLabel}</small>
                  <ul>
                    {turn.help.map((h, k) => (
                      <li key={h.text} className="see-enter" style={{ "--k": k } as CSSProperties} data-done={turn.helpLabel === "Handled" ? "" : undefined}>
                        {h.tool ? <Logo name={h.tool} size={16} /> : <span className="see-help-icon"><Icon name={HELP_ICON[h.icon]} /></span>}
                        <span>{h.text}</span>
                        {turn.helpLabel === "Handled" ? <i aria-label="handled"><Icon name="check" /></i> : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {has(`actions:${i}`) ? <div className="see-enter"><ReplyButtons /></div> : null}
            </Message>
          );
        })}
      </div>
      <div className="see-foot-fade" aria-hidden="true" />
      <WaldoBar typed={typed} placeholder="Ask Waldo anything" />
    </>
  );
}

function usePlayer(turns: readonly Turn[], prequel: Event[] = NONE) {
  const events = useMemo(() => scriptOf(turns, prequel), [turns, prequel]);
  const holds = useMemo(() => events.map((e) => e.ms), [events]);
  const { step } = useScript(holds);
  const keys = events.map((e) => e.key);
  const has = (key: string) => {
    const k = keys.indexOf(key);
    return k >= 0 && k < step;
  };
  const now = (key: string) => keys[step] === key;
  const current = keys[step] ?? "";
  const typingTurn = current.startsWith("type:") ? Number(current.slice(5)) : -1;
  const turn = typingTurn >= 0 ? turns[typingTurn] : undefined;
  const typed = useTyping(turn && turn.from === "you" ? turn.text : "", typingTurn >= 0);
  return { has, now, typed };
}

/** Card 2 */
export function ChatScreen() {
  const { has, now, typed } = usePlayer(CHAT.turns);
  return (
    <SeePhone clock={CHAT.clock}>
      <div className="see-chat-screen">
        <Conversation turns={CHAT.turns} title={CHAT.title} untitled={CHAT.untitled} pins={CHAT.pins} time={CHAT.time} has={has} now={now} typed={typed} />
      </div>
    </SeePhone>
  );
}

const PLAN_PREQUEL: Event[] = [
  { key: "calendar", ms: 1600 },
  { key: "press", ms: 450 },
  { key: "sheet", ms: 700 },
];

/** Tomorrow's calendar: the prequel to card 3. A real day view: the week strip, an all-day item,
    hour and half-hour lines, and each meeting with its time and where it is. */
function Calendar() {
  const start = 8;
  const end = 17.5;
  const y = (h: number) => `${((h - start) / (end - start)) * 100}%`;
  const clock = (h: number) => {
    const hh = Math.floor(h);
    const mm = Math.round((h - hh) * 60);
    return `${hh > 12 ? hh - 12 : hh}:${String(mm).padStart(2, "0")}`;
  };
  return (
    <div className="see-cal" aria-label="Tomorrow’s calendar">
      <ol className="see-cal-week" aria-hidden="true">
        {PLAN.week.map((w, k) => <li key={k} data-on={k === 3 ? "" : undefined}><small>{w.d}</small><b>{w.n}</b></li>)}
      </ol>
      <div className="see-cal-day">
        <b>{PLAN.day}</b>
        <small>7 meetings · first at 9:00</small>
      </div>
      <p className="see-cal-allday"><span>all-day</span><b>{PLAN.allDay}</b></p>
      <div className="see-cal-grid">
        {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((h) => (
          <span key={h} className="see-cal-hour" style={{ top: y(h) }}>{h > 12 ? h - 12 : h} {h >= 12 ? "PM" : "AM"}</span>
        ))}
        {[8.5, 9.5, 10.5, 11.5, 12.5, 13.5, 14.5, 15.5, 16.5].map((h) => <i key={h} className="see-cal-half" style={{ top: y(h) }} />)}
        {PLAN.events.map((e) => (
          <span key={e.name} className="see-cal-event" data-tone={e.tone} data-short={e.to - e.from < 1 ? "" : undefined} style={{ top: `calc(${y(e.from)} + 1px)`, height: `calc(${y(e.to)} - ${y(e.from)} - 2px)` }}>
            <b>{e.name}</b>
            <small>{clock(e.from)}–{clock(e.to)}{e.meta ? ` · ${e.meta}` : ""}</small>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Card 3: Thursday's calendar, the Waldo button, and the chat that rises over it */
export function PlanScreen() {
  const { has, now, typed } = usePlayer(PLAN.turns, PLAN_PREQUEL);
  const open = has("sheet") || now("sheet");
  return (
    <SeePhone clock={PLAN.clock}>
      <div className="see-cal-head" data-under={open ? "" : undefined}><AppHeader title="October" left="back" right="plus" /></div>
      <Calendar />
      <div className="see-foot-fade" aria-hidden="true" />
      <WaldoBar pressed={now("press")} />
      <div className="see-chat-sheet" data-open={open ? "" : undefined} aria-hidden={open ? undefined : true}>
        <Conversation turns={PLAN.turns} title={PLAN.title} untitled={PLAN.untitled} pins={PLAN.pins} time={PLAN.time} has={has} now={now} typed={typed} />
      </div>
    </SeePhone>
  );
}
