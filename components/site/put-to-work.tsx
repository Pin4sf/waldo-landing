"use client";

import { type CSSProperties, Fragment, useCallback, useEffect, useRef, useState } from "react";

import { ToolMark, WaldoFace } from "./connector-mark";
import { JOBS, type Job, type Moment, type Result, bodyParts, toolsOf, toolsOfMoment } from "./put-to-work-data";
import { useLive } from "./use-live";

// Connectors, "Pick your job. The tools follow." (docs/website/pages/connectors.md), built after the "Put Claude to
// work" band on claude.com/product/overview, in Waldo's light, flat look. Pick a job from the row (or the "For …"
// menu). Its day has three moments; on a wide screen the band holds still while you scroll and the moments come
// in turn, with a time rail on the left that follows the scroll and takes you to a moment when you click it. Each
// moment: when, what, one paragraph with the tools underlined, and a card where you see it happen. First what
// Waldo was asked once (or what he noticed himself), then the steps he took with each tool, then the result in the
// app it landed in. Under the card, the job's tools as a dock; the ones this moment used have a dot. On a narrow
// screen the moments simply stack, each card playing when it's the one nearest the middle (use-live.ts).
// With less motion every card shows its result straight away.

const TINTS = ["#ece2d6", "#dfe5eb", "#dfe6da"];
const TYPE_MS = 20;

/** The ask (or what he noticed), then the steps, then the result. Plays from the start each time `run` changes. */
function useSequence(moment: Moment, live: boolean, run: number) {
  const [state, setState] = useState({ phase: 2, typed: Infinity, steps: Infinity });
  useEffect(() => {
    if (!live) return;
    const timers: number[] = [];
    const later = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    const ask = moment.trigger.kind === "ask" ? moment.trigger.text : "";
    later(0, () => setState({ phase: 0, typed: 0, steps: 0 }));
    let t = 350;
    if (ask) {
      for (let i = 1; i <= ask.length; i += 2) {
        const n = i;
        later(t + n * TYPE_MS, () => setState((s) => ({ ...s, typed: n })));
      }
      t += ask.length * TYPE_MS + 450;
    } else {
      t += 1300;
    }
    later(t, () => setState((s) => ({ ...s, typed: Infinity, phase: 1 })));
    for (let i = 1; i <= moment.steps.length + 1; i += 1) {
      const n = i;
      later(t + i * 520, () => setState((s) => ({ ...s, steps: n })));
    }
    t += (moment.steps.length + 1) * 520 + 900;
    later(t, () => setState({ phase: 2, typed: Infinity, steps: Infinity }));
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      setState({ phase: 2, typed: Infinity, steps: Infinity });
    };
  }, [moment, live, run]);
  return state;
}

export function PutToWork() {
  const [at, setAt] = useState(0);
  const job = JOBS[at];

  return (
    <div className="pw">
      <div className="pw-head">
        <div className="pw-jobs" aria-label="Pick your job">
          {JOBS.map((item, index) => (
            <button key={item.id} type="button" className="pw-job" aria-pressed={index === at} onClick={() => setAt(index)}>
              {item.name}
            </button>
          ))}
        </div>
        <p className="pw-tagline" key={job.id}>
          {job.tagline}
        </p>
      </div>
      <Pinned job={job} pick={setAt} />
      <Plain job={job} pick={setAt} />
    </div>
  );
}

/** The "For founders" menu that changes the job from inside the band */
function JobMenu({ job, pick }: { job: Job; pick: (index: number) => void }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: Event) => {
      if (event instanceof KeyboardEvent ? event.key === "Escape" : !root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);
  return (
    <div className="pw-menu" ref={root}>
      <button type="button" className="pw-chip" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((o) => !o)}>
        For {job.name.toLowerCase()}
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open ? (
        <ul className="pw-menu-list">
          {JOBS.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                aria-current={item.id === job.id ? "true" : undefined}
                onClick={() => {
                  pick(index);
                  setOpen(false);
                }}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function Copy({ job, moment, onTool }: { job: Job; moment: Moment; onTool?: (tool: string | null) => void }) {
  return (
    <>
      <p className="pw-kicker">
        {moment.time} · {job.name}
      </p>
      <h3 className="pw-title">{moment.title}</h3>
      <p className="pw-body">
        {bodyParts(moment.body).map((part, i) =>
          typeof part === "string" ? (
            <Fragment key={i}>{part}</Fragment>
          ) : (
            <span key={i} className="pw-tool" onMouseEnter={() => onTool?.(part.tool)} onMouseLeave={() => onTool?.(null)}>
              {part.tool}
            </span>
          ),
        )}
      </p>
    </>
  );
}

// ── Wide screens: the band holds still while the three moments come in turn ──

function Pinned({ job, pick }: { job: Job; pick: (index: number) => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [hover, setHover] = useState<string | null>(null);
  const [run, setRun] = useState(0);
  const live = useLive(stage);
  const active = Math.min(2, Math.floor(progress * 3 + 0.0001));
  const moment = job.moments[active];
  const seq = useSequence(moment, live, run);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const el = wrap.current;
      const st = stage.current;
      if (!el || !st) return;
      const total = el.offsetHeight - st.offsetHeight;
      const top = parseFloat(getComputedStyle(st).top) || 0;
      const scrolled = Math.min(Math.max(top - el.getBoundingClientRect().top, 0), total);
      setProgress(total > 0 ? scrolled / total : 0);
    };
    const soon = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", soon, { passive: true });
    window.addEventListener("resize", soon);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", soon);
      window.removeEventListener("resize", soon);
    };
  }, []);

  const goTo = useCallback((index: number) => {
    const el = wrap.current;
    const st = stage.current;
    if (!el || !st) return;
    const total = el.offsetHeight - st.offsetHeight;
    const top = parseFloat(getComputedStyle(st).top) || 0;
    const start = el.getBoundingClientRect().top + window.scrollY - top;
    window.scrollTo({ top: start + ((index + 0.5) / 3) * total, behavior: "smooth" });
  }, []);

  const used = toolsOfMoment(moment);

  return (
    <div className="pw-pin" ref={wrap}>
      <div className="pw-stage" ref={stage}>
        <div className="pw-grid">
          <div className="pw-rail" aria-label="Moments in the day">
            <span className="pw-ticks" aria-hidden="true" />
            {job.moments.map((item, index) => (
              <button
                key={item.time}
                type="button"
                className="pw-mark"
                style={{ top: `${index * 50}%` } as CSSProperties}
                aria-current={index === active ? "true" : undefined}
                aria-label={`${item.time}, ${item.title}`}
                onClick={() => goTo(index)}
              >
                {item.time}
              </button>
            ))}
            {/* Sits on a moment's time while that moment is in the middle of its stretch of scroll, and slides between them */}
            <span className="pw-dot" style={{ top: `${Math.min(Math.max(progress * 3 - 0.5, 0), 2) * 50}%` }} aria-hidden="true" />
          </div>

          <div className="pw-text">
            <JobMenu job={job} pick={pick} />
            <div className="pw-copy" key={`${job.id}-${active}`}>
              <Copy job={job} moment={moment} onTool={setHover} />
            </div>
          </div>

          <div className="pw-demo">
            <div className="pw-stack" aria-hidden="true">
              {job.moments.map((item, index) => {
                const place = index - active;
                return (
                  <div
                    key={index}
                    className="pw-card"
                    data-place={place < 0 ? "gone" : place}
                    style={{ "--tint": TINTS[index] } as CSSProperties}
                  >
                    {place === 0 ? <Scene moment={item} seq={seq} key={`${job.id}-${index}-${run}`} /> : null}
                  </div>
                );
              })}
            </div>
            <div className="pw-controls">
              <button type="button" className="pw-replay" onClick={() => setRun((r) => r + 1)}>
                Replay
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M13 8a5 5 0 1 1-1.6-3.7M13 2.5v3h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <p className="pw-phases" aria-hidden="true">
                <span data-on={seq.phase < 2 ? "" : undefined}>1. {moment.trigger.kind === "ask" ? "What you asked" : "What Waldo noticed"}</span>
                <span data-on={seq.phase === 2 ? "" : undefined}>2. What Waldo did</span>
              </p>
            </div>
            <div className="pw-dock" aria-label={`Tools for ${job.name.toLowerCase()}`}>
              {toolsOf(job).map((tool) => (
                <span key={tool} className="pw-dock-tile" title={tool} data-used={used.includes(tool) ? "" : undefined} data-hover={hover === tool ? "" : undefined}>
                  <ToolMark name={tool} size={22} />
                  <i />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Narrow screens: the moments stack, each card playing in turn ──

function Plain({ job, pick }: { job: Job; pick: (index: number) => void }) {
  return (
    <div className="pw-plain">
      <JobMenu job={job} pick={pick} />
      {job.moments.map((moment, index) => (
        <PlainMoment key={`${job.id}-${index}`} job={job} moment={moment} tint={TINTS[index]} />
      ))}
    </div>
  );
}

function PlainMoment({ job, moment, tint }: { job: Job; moment: Moment; tint: string }) {
  const card = useRef<HTMLDivElement>(null);
  const live = useLive(card);
  const [run, setRun] = useState(0);
  const seq = useSequence(moment, live, run);
  return (
    <div className="pw-plain-moment">
      <Copy job={job} moment={moment} />
      <div className="pw-card pw-card--plain" ref={card} style={{ "--tint": tint } as CSSProperties} aria-hidden="true">
        <Scene moment={moment} seq={seq} />
      </div>
      <button type="button" className="pw-replay" onClick={() => setRun((r) => r + 1)}>
        Replay
      </button>
    </div>
  );
}

// ── Inside a card: the ask, the steps, the result ──

function Scene({ moment, seq }: { moment: Moment; seq: { phase: number; typed: number; steps: number } }) {
  const trigger = moment.trigger;
  return (
    <div className="pw-scene" data-phase={seq.phase}>
      <div className="pw-convo">
        <div className="pw-prompt">
          {trigger.kind === "ask" ? (
            <>
              <p className="pw-ask">
                {trigger.text.slice(0, seq.typed)}
                {seq.phase === 0 ? <i className="pw-caret" /> : null}
              </p>
              <p className="pw-prompt-foot">
                <span className="pw-plus">+</span>
                <span className="pw-to">
                  <WaldoFace size={16} /> Waldo
                </span>
                <span className="pw-send" data-on={seq.typed >= trigger.text.length ? "" : undefined}>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </p>
            </>
          ) : (
            <>
              <p className="pw-noticed">
                <ToolMark name={trigger.tool} size={18} />
                <b>Waldo noticed</b>
                <span>{trigger.tool}</span>
              </p>
              <p className="pw-ask">{trigger.text}</p>
            </>
          )}
        </div>
        <div className="pw-steps" data-on={seq.phase >= 1 ? "" : undefined}>
          <p className="pw-thinking" data-on={seq.steps >= 1 ? "" : undefined}>
            <WaldoFace size={16} />
            {moment.thinking}
          </p>
          {moment.steps.map((step, i) => (
            <p key={i} className="pw-step" data-on={seq.steps >= i + 2 ? "" : undefined}>
              <ToolMark name={step.tool} size={16} />
              {step.text}
            </p>
          ))}
        </div>
      </div>
      <div className="pw-result" data-on={seq.phase === 2 ? "" : undefined}>
        <ResultWindow result={moment.result} />
      </div>
    </div>
  );
}

function ResultWindow({ result }: { result: Result }) {
  return (
    <div className="pw-win" data-app={result.app}>
      <p className="pw-win-bar">
        <span className="pw-lights">
          <i />
          <i />
          <i />
        </span>
        <ToolMark name={result.tool} size={16} />
        <b>{result.tool}</b>
        {"meta" in result && result.meta ? <span>{result.meta}</span> : null}
      </p>
      <div className="pw-win-body">
        {result.app === "chat" ? (
          <>
            <p className="pw-chat-head">
              <WaldoFace size={22} />
              <b>{result.title}</b>
              <span>now</span>
            </p>
            {result.messages.map((message) => (
              <p key={message} className="pw-bubble">
                {message}
              </p>
            ))}
          </>
        ) : result.app === "calendar" ? (
          <>
            <p className="pw-win-title">{result.title}</p>
            <ul className="pw-cal">
              {result.rows.map((row) => (
                <li key={row.time + row.label} data-mark={row.mark}>
                  <span className="pw-cal-time">{row.time}</span>
                  <span className="pw-cal-event">
                    <b>{row.label}</b>
                    {row.mark === "new" ? <small>Added by Waldo</small> : row.mark === "moved" ? <small>Moved · {row.note}</small> : row.mark === "kept" ? <small>Kept</small> : null}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : result.app === "list" ? (
          <>
            <p className="pw-win-title">{result.title}</p>
            <ul className="pw-list">
              {result.rows.map((row) => (
                <li key={row.label} data-strong={row.strong ? "" : undefined} data-dim={row.dim ? "" : undefined}>
                  <span>{row.label}</span>
                  {row.value ? <em>{row.value}</em> : null}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p className="pw-win-title">{result.title}</p>
            <ul className="pw-doc">
              {result.blocks.map((block) => (
                <li key={block.text}>
                  {block.tool ? <ToolMark name={block.tool} size={14} /> : <i className="pw-bullet" />}
                  <span>{block.text}</span>
                </li>
              ))}
            </ul>
            {result.foot ? <p className="pw-doc-foot">{result.foot}</p> : null}
          </>
        )}
      </div>
    </div>
  );
}
