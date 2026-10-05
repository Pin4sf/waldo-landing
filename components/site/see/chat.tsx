"use client";

import { type CSSProperties, type ReactNode, useEffect, useMemo, useRef } from "react";

import { AppHeader, Icon, type IconName, Logo, ReplyButtons, SeePhone, StateTag, WaldoBar, useScript, useTyping } from "./kit";
import { CHAT, PLAN, type Pin, type Turn } from "./see-fixture";

// Cards 2 and 3 are conversations with Waldo, played as they would happen: the question typed and
// sent, the chat named, what matters pinned to the top, several checks at once, a short answer, and
// the evidence behind it. Then the conversation goes on, and not every answer needs a graphic.
// Card 2 asks why a draft changed; at the end it settles back on the answer and its evidence.
// Card 3 starts on tomorrow's calendar: Waldo proposes a lighter run and prepares the rest, and only
// when you say "Do it" does any of it happen.

type Event = { key: string; ms: number };

/** How long each letter of a question takes to type, in ms */
const TYPE_MS = 26;

const NONE: Event[] = [];

/** The script of a conversation: one event per thing that happens, with how long it holds */
function scriptOf(turns: readonly Turn[], prequel: Event[] = [], settle = false): Event[] {
  const events: Event[] = [...prequel];
  turns.forEach((turn, i) => {
    if (turn.from === "you") {
      events.push({ key: `type:${i}`, ms: 400 + turn.text.length * TYPE_MS }, { key: `send:${i}`, ms: 450 });
      if (i === 0) events.push({ key: "title", ms: 500 }, { key: "pins", ms: 600 });
      return;
    }
    events.push({ key: `dots:${i}`, ms: 900 });
    if (turn.work) events.push({ key: `work:${i}`, ms: 700 * turn.work.length + 500 });
    // the answer gets time to be read: about 45ms a letter, never under a second and a half
    events.push({ key: `lead:${i}`, ms: Math.max(1500, turn.lead.length * 45) });
    if (turn.graphic) events.push({ key: `graphic:${i}`, ms: 2600 });
    if (turn.more) events.push({ key: `more:${i}`, ms: Math.max(1500, turn.more.length * 40) });
    if (turn.help) events.push({ key: `help:${i}`, ms: 2600 });
    events.push({ key: `actions:${i}`, ms: 1100 });
  });
  if (settle) events.push({ key: "settle", ms: 1200 });
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

/**
  Card 2's graphic: the answer's evidence, as a Linear card. What changed in the draft, then where
  each fact comes from, one row per source with the fact on the right.
*/
function EvidenceCard() {
  return (
    <figure className="see-chart see-evidence">
      <figcaption className="see-chart-title">What changed</figcaption>
      <p className="see-diff">
        <s>{CHAT.change.was}</s>
        <Icon name="arrow" />
        <b>{CHAT.change.now}</b>
      </p>
      <ul>
        {CHAT.evidence.map((e, k) => (
          <li key={e.name} className="see-enter" style={{ "--k": k + 1 } as CSSProperties}>
            <Logo name={e.tool} size={16} />
            <span>{e.name}</span>
            <b>{e.value}</b>
          </li>
        ))}
      </ul>
    </figure>
  );
}

/**
  Card 3's graphic: tomorrow's run as it is planned and as Waldo would have it, side by side. The
  plan stays as it is until you say otherwise.
*/
function SwapCard() {
  const { scheduled, proposed, note } = PLAN.swap;
  return (
    <figure className="see-chart see-swap">
      <figcaption className="see-chart-title">Tomorrow’s run</figcaption>
      <div className="see-swap-cols">
        <div data-col="scheduled">
          <small>Scheduled</small>
          <b>{scheduled.name}</b>
          <span>{scheduled.when} · {scheduled.detail}</span>
        </div>
        <span className="see-swap-arrow" aria-hidden="true"><Icon name="arrow" /></span>
        <div data-col="proposed">
          <small>Proposed</small>
          <b>{proposed.name}</b>
          <span>{proposed.when} · {proposed.detail}</span>
        </div>
      </div>
      <p className="see-chart-note">{note}</p>
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
  const progress = turns.map((_, i) => ["send", "dots", "work", "lead", "graphic", "more", "help", "actions"].filter((k) => has(`${k}:${i}`)).length).join(",");
  const settled = has("settle");
  // The conversation keeps the newest line in view, as a phone does; once settled, it goes back to
  // the first answer and its evidence, which is what the card is about
  useEffect(() => {
    const el = body.current;
    if (el) el.scrollTo({ top: settled ? 0 : el.scrollHeight, behavior: "smooth" });
  }, [progress, settled]);
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
              {turn.graphic && has(`graphic:${i}`) ? <div className="see-enter">{turn.graphic === "evidence" ? <EvidenceCard /> : <SwapCard />}</div> : null}
              {turn.more && has(`more:${i}`) ? <p className="see-msg-text see-enter">{turn.more}</p> : null}
              {turn.help && has(`help:${i}`) ? (
                <div className="see-help see-enter">
                  <small>{turn.helpState === "Done" ? "Done" : "Ready when you say"}<StateTag state={turn.helpState ?? "Prepared"} /></small>
                  <ul>
                    {turn.help.map((h, k) => (
                      <li key={h.text} className="see-enter" style={{ "--k": k } as CSSProperties} data-done={turn.helpState === "Done" ? "" : undefined}>
                        {h.tool ? <Logo name={h.tool} size={16} /> : <span className="see-help-icon"><Icon name={HELP_ICON[h.icon]} /></span>}
                        <span>{h.text}</span>
                        {turn.helpState === "Done" ? <i aria-label="done"><Icon name="check" /></i> : null}
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

function usePlayer(turns: readonly Turn[], prequel: Event[] = NONE, settle = false) {
  const events = useMemo(() => scriptOf(turns, prequel, settle), [turns, prequel, settle]);
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
  const typed = useTyping(turn && turn.from === "you" ? turn.text : "", typingTurn >= 0, TYPE_MS);
  return { has, now, typed };
}

/** Card 2 */
export function ChatScreen() {
  const { has, now, typed } = usePlayer(CHAT.turns, NONE, true);
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
    hour and half-hour lines, and each event with its time and where it is. The 8km tempo is on it,
    as the training plan has it; Design review at 11 is only a proposal, drawn dashed. */
function Calendar() {
  const start = 6;
  const end = 15;
  const y = (h: number) => `${((h - start) / (end - start)) * 100}%`;
  const clock = (h: number) => {
    const hh = Math.floor(h);
    const mm = Math.round((h - hh) * 60);
    return `${hh > 12 ? hh - 12 : hh}:${String(mm).padStart(2, "0")}`;
  };
  const meetings = PLAN.events.filter((e) => e.tone !== "green" && e.tone !== "proposed");
  const hours = Array.from({ length: end - start + 1 }, (_, k) => start + k);
  return (
    <div className="see-cal" aria-label="Tomorrow’s calendar">
      <ol className="see-cal-week" aria-hidden="true">
        {PLAN.week.map((w, k) => <li key={k} data-on={k === 3 ? "" : undefined}><small>{w.d}</small><b>{w.n}</b></li>)}
      </ol>
      <div className="see-cal-day">
        <b>{PLAN.day}</b>
        <small>{meetings.length} meetings · first at {clock(meetings[0].from)}</small>
      </div>
      <p className="see-cal-allday"><span>all-day</span><b>{PLAN.allDay}</b></p>
      <div className="see-cal-grid">
        {hours.map((h) => (
          <span key={h} className="see-cal-hour" style={{ top: y(h) }}>{h > 12 ? h - 12 : h} {h >= 12 ? "PM" : "AM"}</span>
        ))}
        {hours.slice(0, -1).map((h) => <i key={h} className="see-cal-half" style={{ top: y(h + 0.5) }} />)}
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
