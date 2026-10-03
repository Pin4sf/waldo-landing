"use client";

import { type CSSProperties, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";

import { AppHeader, DocRow, Icon, Logo, Rich, SeePhone, SlideState, Toast, WaldoBar, at, useScript } from "./kit";
import { BRIEFS, type Decision, OUTBOX, OUTBOX_BRIEF, type Outgoing } from "./see-fixture";

// Cards 1 and 4 are one screen: the daily brief on top of its stack, and the "To send" box under it.
// Card 1 shows it at the top, the brief changing with the part of the day. Card 4 shows the same
// screen scrolled up to the box, at 4:15pm, and plays one message going out.

/** How long each part of the day stays before the brief moves on, on card 1 */
const PART_MS = 3400;

type Choice = "yes" | "no";

/** One yes / no decision, with a link to its details */
function DecisionRow({ decision, choice, onChoose, onDetails }: { decision: Decision; choice?: Choice; onChoose: (c: Choice | undefined) => void; onDetails: () => void }) {
  return (
    <li className="see-decide" data-choice={choice}>
      <span className="see-decide-text">
        <b>{decision.text}</b>
        {choice ? (
          <small>
            {choice === "yes" ? "Waldo’s on it." : "Skipped."}{" "}
            <button type="button" className="see-quiet-link" onClick={() => onChoose(undefined)}>Undo</button>
          </small>
        ) : (
          <button type="button" className="see-quiet-link" onClick={onDetails}>Details</button>
        )}
      </span>
      {choice ? (
        <i className="see-decide-mark" aria-hidden="true"><Icon name={choice === "yes" ? "check" : "close"} /></i>
      ) : (
        <span className="see-yesno">
          <button type="button" className="see-pick" onClick={() => onChoose("no")}>No</button>
          <button type="button" className="see-pick see-pick--yes" onClick={() => onChoose("yes")}>Yes</button>
        </span>
      )}
    </li>
  );
}

/** The "To send" box: what is drafted and waiting, most urgent first */
function Outbox({ sent, onOpen, n = 0 }: { sent: string[]; onOpen: (id: string) => void; n?: number }) {
  return (
    <section className="see-outbox see-in" style={at(n)} aria-label={OUTBOX.label}>
      <div className="see-outbox-top">
        <b>{OUTBOX.label}</b>
        <span>{OUTBOX.items.length - sent.length}</span>
      </div>
      <ul>
        {OUTBOX.items.map((item) => {
          const done = sent.includes(item.id);
          return (
            <li key={item.id} data-sent={done ? "" : undefined} data-urgent={item.priority === "high" ? "" : undefined}>
              <button type="button" onClick={() => onOpen(item.id)} aria-label={`${item.to}: ${item.about}`}>
                <span className="see-prio" data-p={item.priority} aria-label={`${item.priority} priority`}><Icon name="priority" /></span>
                <Logo name={item.tool} size={18} />
                <span>
                  <b>{item.to}</b>
                  <small>{item.about}</small>
                </span>
                <em>{done ? <><Icon name="check" />{OUTBOX.sent}</> : item.due}</em>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function OutgoingSheet({ item, pressing, onSend }: { item: Outgoing; pressing: boolean; onSend: () => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(item.draft);
  return (
    <>
      <dl className="see-mail-meta">
        <div><dt>To</dt><dd>{item.to}</dd></div>
      </dl>
      {editing ? (
        <textarea className="see-draft" aria-label={`Draft to ${item.to}`} value={draft} rows={4} onChange={(event) => setDraft(event.target.value)} />
      ) : (
        <p className="see-draft">{draft}</p>
      )}
      {item.docs.length ? <div className="see-docs">{item.docs.map((doc) => <DocRow key={doc.name} {...doc} />)}</div> : null}
      <div className="see-sheet-actions">
        <button type="button" className="see-btn see-btn--primary" data-press={pressing ? "" : undefined} onClick={onSend}>
          <Logo name={item.tool} size={18} />
          {item.send}
        </button>
        <button type="button" className="see-btn" onClick={() => setEditing((v) => !v)}>{editing ? "Keep edits" : "Edit"}</button>
      </div>
    </>
  );
}

/** The brief's screen. mode "brief" is card 1, mode "outbox" is card 4. */
function BriefScreen({ mode }: { mode: "brief" | "outbox" }) {
  const { active, running, hero, setHero } = useContext(SlideState);
  const outbox = mode === "outbox";
  const shown = outbox ? OUTBOX_BRIEF : (hero - 1) % BRIEFS.length;
  const brief = BRIEFS[shown];

  // Card 1: the brief moves through the day while its card is in view and the section is playing
  useEffect(() => {
    if (outbox || !active || !running) return;
    const id = window.setInterval(() => setHero((n) => (n % BRIEFS.length) + 1), PART_MS);
    return () => window.clearInterval(id);
  }, [outbox, active, running, setHero]);

  // Card 4's script: start at the top, scroll up to the box, open the first message, press send, sent
  const { step, playing } = useScript(outbox ? [900, 1500, 2400, 450] : []);
  const scrolled = outbox && step >= 1;

  // What the reader has done; a new arrival starts again from the script
  const [choices, setChoices] = useState<Record<string, Choice>>({});
  const [sheet, setSheet] = useState<{ kind: "decision"; d: Decision } | { kind: "steps" } | { kind: "send"; id: string } | null | undefined>(undefined);
  const [sentByYou, setSentByYou] = useState<string[]>([]);
  const [was, setWas] = useState(active);
  if (active !== was) {
    setWas(active);
    setSheet(undefined);
    setSentByYou([]);
  }
  const scriptSheet = outbox && playing && step >= 2 ? ({ kind: "send", id: OUTBOX.items[0].id } as const) : null;
  const open = sheet === undefined ? scriptSheet : sheet;
  const sent = [...new Set([...(outbox && step >= 4 ? [OUTBOX.items[0].id] : []), ...sentByYou])];

  // Card 4 scrolls the screen up so the brief's foot shows above the box
  const column = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [lift, setLift] = useState(0);
  useLayoutEffect(() => {
    if (!outbox || !column.current || !card.current) return;
    const measure = () => {
      const u = (column.current?.closest(".see-phone")?.getBoundingClientRect().width ?? 517) / 517;
      const bottom = (card.current?.offsetTop ?? 0) + (card.current?.offsetHeight ?? 0);
      // leave the last decision of the brief showing under the header
      setLift(Math.max(0, bottom - 150 * u));
    };
    measure();
    const watch = new ResizeObserver(measure);
    watch.observe(column.current);
    return () => watch.disconnect();
  }, [outbox]);

  const item = open?.kind === "send" ? OUTBOX.items.find((i) => i.id === open.id) : undefined;

  return (
    <SeePhone clock={brief.clock}>
      <AppHeader title="Overview" />
      <div className="see-feed-window" data-mode={mode}>
        <div ref={column} className="see-feed" style={{ transform: scrolled ? `translateY(${-lift}px)` : undefined }}>
          {/* The stack: the brief in front, the steps behind it */}
          <div className="see-stack see-in" style={at(0)}>
            <button type="button" className="see-stack-behind" aria-label={`How I got here: ${brief.steps.length} steps`} onClick={() => setSheet({ kind: "steps" })}>
              <i /><i /><i />
            </button>
            <div ref={card} className="see-brief">
              <div className="see-brief-sheets" aria-live="polite">
                {BRIEFS.map((b, k) => (
                  <div key={b.time} className="see-brief-sheet" data-on={k === shown ? "" : undefined} aria-hidden={k === shown ? undefined : true} inert={k !== shown}>
                    <div className="see-brief-head">
                      <b>{b.part}</b>
                      <small>{b.time}</small>
                    </div>
                    {b.body.map((line) => <p key={line} className="see-brief-line"><Rich text={line} /></p>)}
                    <p className="see-needs">{b.decisions.length === 1 ? "One thing still needs you." : "Two things still need you."}</p>
                    <ul className="see-decisions">
                      {b.decisions.map((d) => (
                        <DecisionRow
                          key={d.text}
                          decision={d}
                          choice={choices[d.text]}
                          onChoose={(c) => setChoices((all) => {
                            const next = { ...all };
                            if (c) next[d.text] = c;
                            else delete next[d.text];
                            return next;
                          })}
                          onDetails={() => setSheet({ kind: "decision", d })}
                        />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* As in the Overview mockup: the cards behind are how Waldo got here, one tap away */}
          <button type="button" className="see-behind-note see-in" style={at(1)} onClick={() => setSheet({ kind: "steps" })}>
            Tap the cards behind to see how I got here. You probably won’t need to.
          </button>

          <Outbox sent={sent} n={2} onOpen={(id) => setSheet({ kind: "send", id })} />
        </div>
      </div>

      <div className="see-foot-fade" aria-hidden="true" />
      <WaldoBar />

      <Toast open={open?.kind === "decision"} label="Details" title={open?.kind === "decision" ? open.d.details.title : ""} onClose={() => setSheet(null)}>
        {open?.kind === "decision" ? (
          <>
            {open.d.details.lines.map((line) => <p key={line} className="see-toast-line">{line}</p>)}
            <div className="see-docs">{open.d.details.docs.map((doc) => <DocRow key={doc.name} {...doc} />)}</div>
            <div className="see-sheet-actions">
              <button type="button" className="see-btn" onClick={() => { setChoices((all) => ({ ...all, [open.d.text]: "no" })); setSheet(null); }}>No</button>
              <button type="button" className="see-btn see-btn--primary" onClick={() => { setChoices((all) => ({ ...all, [open.d.text]: "yes" })); setSheet(null); }}>Yes</button>
            </div>
          </>
        ) : null}
      </Toast>

      <Toast open={open?.kind === "steps"} label="How I got here" title="How I got here" onClose={() => setSheet(null)}>
        <ol className="see-steps">
          {brief.steps.map((s, k) => (
            <li key={s.time + s.text} style={{ "--k": k } as CSSProperties}>
              <time>{s.time}</time>
              <Logo name={s.tool} size={18} />
              <span>{s.text}</span>
            </li>
          ))}
        </ol>
      </Toast>

      <Toast open={!!item} label={item ? `Message to ${item.to}` : "Message"} title={item?.about ?? ""} onClose={() => setSheet(null)}>
        {item ? (
          <OutgoingSheet
            key={item.id}
            item={item}
            pressing={outbox && step === 3 && sheet === undefined}
            onSend={() => { setSentByYou((all) => [...all, item.id]); setSheet(null); }}
          />
        ) : null}
      </Toast>
    </SeePhone>
  );
}

/** Card 1 */
export function OverviewScreen() {
  return <BriefScreen mode="brief" />;
}

/** Card 4 */
export function OutboxScreen() {
  return <BriefScreen mode="outbox" />;
}
