"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { useLive } from "./use-live";

// The picture for Kennel's "Gets the best out of what you have." (docs/website/site-wide-pass.md): one contract,
// and the agents you already pay for, each through your own subscription or key. The choice settles on one,
// you approve it, and it goes. Then it starts again on the next contract. The agents are the five the page
// names; the contracts are made up. Only the card in the middle of the row plays (use-live.ts).

const AGENTS = [
  { name: "Codex", via: "Your subscription", logo: "/assets/connectors/openai.svg" },
  { name: "Claude Code", via: "Your subscription", logo: "/assets/connectors/claude.svg" },
  { name: "Cursor", via: "Your subscription", mark: "Cu" },
  { name: "OpenCode", via: "Your API key", mark: "OC" },
  { name: "Pi", via: "Your API key", mark: "Pi" },
];

const CONTRACTS = [
  { n: 3, title: "Rate-limit the upload endpoint", pick: 1 },
  { n: 4, title: "Write the migration and its test", pick: 0 },
  { n: 5, title: "Fix the flaky sign-in check", pick: 3 },
];

/** One contract: the choice moves down the list to the pick, then you approve. Times in ms. */
const HOP = 520;
const PRESS = 700;
const DONE = 1600;

export function AgentPicker() {
  const root = useRef<HTMLDivElement>(null);
  const live = useLive(root);
  const [contract, setContract] = useState(0);
  const [on, setOn] = useState(CONTRACTS[0].pick);
  const [button, setButton] = useState<"idle" | "press" | "done">("done");

  useEffect(() => {
    if (!live) return;
    const timers: number[] = [];
    let at = 0;
    const later = (ms: number, run: () => void) => {
      at += ms;
      timers.push(window.setTimeout(run, at));
    };
    const play = (index: number) => {
      const next = CONTRACTS[index];
      later(400, () => {
        setContract(index);
        setButton("idle");
        setOn(0);
      });
      for (let hop = 1; hop <= next.pick; hop++) later(HOP, () => setOn(hop));
      later(PRESS + HOP, () => setButton("press"));
      later(180, () => setButton("done"));
      later(DONE, () => play((index + 1) % CONTRACTS.length));
    };
    play((contract + 1) % CONTRACTS.length);
    return () => timers.forEach(clearTimeout);
    // Start from wherever it rested; the contract is read once when it comes alive
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live]);

  const current = CONTRACTS[contract];

  return (
    <div className="pick" ref={root}>
      <p className="pick-contract">
        <small>Contract {current.n} of 5</small>
        <b>{current.title}</b>
      </p>
      <ul className="pick-list">
        {AGENTS.map((agent, index) => (
          <li key={agent.name} data-on={on === index ? "" : undefined}>
            {agent.logo ? (
              <span className="pick-mark pick-mark--logo">
                <Image src={agent.logo} alt="" width={22} height={22} unoptimized />
              </span>
            ) : (
              <span className="pick-mark">{agent.mark}</span>
            )}
            <span className="pick-name">
              {agent.name}
              <small>{agent.via}</small>
            </span>
            <span className="pick-tick" />
          </li>
        ))}
      </ul>
      <div className="pick-foot">
        <span>Goes to the agent you approve</span>
        <span className="pick-btn" data-state={button}>
          {button === "done" ? "Approved" : "Approve"}
        </span>
      </div>
    </div>
  );
}
