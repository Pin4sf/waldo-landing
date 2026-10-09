"use client";

import { useEffect, useRef, useState } from "react";

import { ToolMark } from "./connector-mark";
import { useLive } from "./use-live";

// Connectors, "Your agents, on the same team." (docs/website/pages/connectors.md): what Waldo hands an agent, the
// agent at work, and what Waldo checks before it reaches you. The agent takes turns (Codex, Claude Code, Cursor,
// OpenCode, Pi: the five Kennel runs today). Each turn: the agent works, says it's ready, then Waldo's three checks
// come in one by one. Plays only while it's the picture nearest the middle of the window (use-live.ts); with less
// motion it holds a finished turn. The task, the files and the flag are illustrative.

const AGENTS = ["Codex", "Claude Code", "Cursor", "OpenCode", "Pi"];

const CONTEXT = [
  { tool: "Google Calendar", text: "Demo at 4pm today" },
  { tool: "Apple Watch", text: "Short night. Keep it simple" },
  { tool: "Google Tasks", text: "The export bug comes first" },
];

const CHECKS = [
  { text: "Tests pass", flag: false },
  { text: "Does what you asked", flag: false },
  { text: "One file outside the brief, flagged", flag: true },
];

/** working, ready, then one check at a time */
const STEPS_MS = [1900, 900, 650, 650, 1800];

export function AgentHandoff() {
  const root = useRef<HTMLDivElement>(null);
  const live = useLive(root);
  const [agent, setAgent] = useState(0);
  // 0 working · 1 ready · 2–4 checks shown (1, 2, 3). At rest: a finished turn
  const [phase, setPhase] = useState(4);

  useEffect(() => {
    if (!live) return;
    let cancelled = false;
    let timer = 0;
    // Starts from the finished turn on screen: it holds, then the next agent begins
    let step = 4;
    const run = () => {
      timer = window.setTimeout(() => {
        if (cancelled) return;
        step += 1;
        if (step > 4) {
          step = 0;
          setAgent((a) => (a + 1) % AGENTS.length);
        }
        setPhase(step);
        run();
      }, STEPS_MS[step]);
    };
    run();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [live]);

  const name = AGENTS[agent];
  const ready = phase >= 1;
  const shown = Math.max(0, phase - 1);

  return (
    <div className="ah" ref={root}>
      <div className="ah-col">
        <p className="ah-head">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/home/mascots/waldo-card.svg" alt="" width={24} height={19} />
          <b>Waldo hands over</b>
        </p>
        <ul className="ah-list">
          {CONTEXT.map((item) => (
            <li key={item.text}>
              <ToolMark name={item.tool} size={16} />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <span className="ah-link" aria-hidden="true" data-on={!ready ? "" : undefined} />

      <div className="ah-col ah-agent">
        <p className="ah-head" key={name}>
          <ToolMark name={name} size={22} />
          <b>{name}</b>
          <span className="ah-state" data-ready={ready ? "" : undefined}>
            {ready ? "Ready" : "Working"}
          </span>
        </p>
        <p className="ah-task">Fix the export bug</p>
        <div className="ah-bar" data-ready={ready ? "" : undefined}>
          <i key={`${name}-${ready}`} />
        </div>
        <p className="ah-files">{ready ? "14 files changed" : "Reading the code"}</p>
      </div>

      <span className="ah-link" aria-hidden="true" data-on={ready && shown < 3 ? "" : undefined} />

      <div className="ah-col">
        <p className="ah-head">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/home/mascots/waldo-card.svg" alt="" width={24} height={19} />
          <b>Waldo checks</b>
        </p>
        <ul className="ah-list ah-checks">
          {CHECKS.map((check, index) => (
            <li key={check.text} data-on={index < shown ? "" : undefined} data-flag={check.flag ? "" : undefined}>
              <span className="ah-tick" aria-hidden="true">
                {check.flag ? "!" : (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 5.2l2 2L8 3" />
                  </svg>
                )}
              </span>
              <span>{check.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
