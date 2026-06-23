"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";

import type { WaldoActionReceipt, WaldoArtifact, WaldoHeroState } from "@/components/sections/waldo-capability-data";
import { useElementInView } from "@/hooks/use-element-in-view";

const HERO_DWELL_MS = 6000;

type HeroProofSceneRenderProps = {
  active: number;
  activeState: WaldoHeroState;
  progress: number;
  selectState: (index: number) => void;
  states: WaldoHeroState[];
};

type HeroProofSceneProps = {
  children: (props: HeroProofSceneRenderProps) => ReactNode;
  states: WaldoHeroState[];
};

type HeroCardStyle = CSSProperties & {
  "--card-delay"?: string;
  "--card-rotate"?: string;
};

const sourceLabels: Record<WaldoArtifact["source"], string> = {
  account: "AC",
  agent: "AG",
  calendar: "CA",
  health: "HE",
  inbox: "IN",
  task: "TA",
};

const inputRotations = ["-2.4deg", "1.2deg", "-1.1deg"];
const outputRotations = ["1.8deg", "-1.4deg", "1deg"];

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

function SourceMark({ artifact }: { artifact: WaldoArtifact }) {
  if (artifact.icon) {
    return (
      <span className="waldo-proof-mark" aria-hidden="true">
        <Image src={artifact.icon} alt="" width={22} height={22} className="h-5 w-5 object-contain" />
      </span>
    );
  }

  return (
    <span className="waldo-proof-mark" aria-hidden="true">
      {sourceLabels[artifact.source]}
    </span>
  );
}

function ArtifactCard({ artifact, index, kind }: { artifact: WaldoArtifact; index: number; kind: "input" | "read" }) {
  const style: HeroCardStyle = {
    "--card-delay": `${index * 80}ms`,
    "--card-rotate": kind === "read" ? "0deg" : inputRotations[index % inputRotations.length],
  };

  return (
    <article className={`waldo-proof-card waldo-proof-${kind}-card hero-floating-card`} data-card-index={index} style={style}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="type-caption text-[var(--text-tertiary)]">{artifact.label}</p>
          <p className="waldo-proof-value type-data text-[var(--ink)]">{artifact.value}</p>
        </div>
        <SourceMark artifact={artifact} />
      </div>
      <p className="type-aside tone-tertiary mt-3">{artifact.read}</p>
    </article>
  );
}

function ReceiptCard({ receipt, index }: { receipt: WaldoActionReceipt; index: number }) {
  const style: HeroCardStyle = {
    "--card-delay": `${160 + index * 90}ms`,
    "--card-rotate": outputRotations[index % outputRotations.length],
  };

  return (
    <article className="waldo-proof-card waldo-proof-output-card hero-floating-card" data-card-index={index} style={style}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="type-caption text-[var(--text-tertiary)]">{receipt.time}</p>
          <p className="type-label mt-1 text-[var(--ink)]">{receipt.action}</p>
        </div>
        {receipt.requiresApproval ? <span className="waldo-approval-chip type-caption">approval</span> : null}
      </div>
      <p className="type-aside tone-tertiary mt-3">{receipt.detail}</p>
    </article>
  );
}

export function HeroProofScene({ children, states }: HeroProofSceneProps) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const progressRef = useRef(0);
  const sceneRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const sceneInView = useElementInView(sceneRef);
  const activeState = states[active] ?? states[0];

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  const selectState = useCallback((index: number) => {
    setActive(((index % states.length) + states.length) % states.length);
    setProgress(0);
  }, [states.length]);

  useEffect(() => {
    if (reducedMotion || paused || !sceneInView || states.length < 2) {
      return;
    }

    let frame = 0;
    const startedAt = window.performance.now() - progressRef.current * HERO_DWELL_MS;

    const tick = (now: number) => {
      const nextProgress = Math.min((now - startedAt) / HERO_DWELL_MS, 1);
      setProgress(nextProgress);
      progressRef.current = nextProgress;

      if (nextProgress >= 1) {
        setActive((current) => (current + 1) % states.length);
        setProgress(0);
        progressRef.current = 0;
        return;
      }

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [active, paused, reducedMotion, sceneInView, states.length]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || !sceneInView) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    const driftX = (x - 0.5) * 18;
    const driftY = (y - 0.5) * 14;

    event.currentTarget.style.setProperty("--hero-x", `${Math.round(x * 100)}%`);
    event.currentTarget.style.setProperty("--hero-y", `${Math.round(y * 100)}%`);
    event.currentTarget.style.setProperty("--hero-drift-near-x", `${Math.max(-10, Math.min(10, driftX))}px`);
    event.currentTarget.style.setProperty("--hero-drift-near-y", `${Math.max(-8, Math.min(8, driftY))}px`);
    event.currentTarget.style.setProperty("--hero-drift-far-x", `${Math.max(-7, Math.min(7, driftX * -0.55))}px`);
    event.currentTarget.style.setProperty("--hero-drift-far-y", `${Math.max(-6, Math.min(6, driftY * -0.55))}px`);
  };

  const resetPointerField = () => {
    const scene = sceneRef.current;
    if (!scene) return;

    scene.style.setProperty("--hero-x", "50%");
    scene.style.setProperty("--hero-y", "46%");
    scene.style.setProperty("--hero-drift-near-x", "0px");
    scene.style.setProperty("--hero-drift-near-y", "0px");
    scene.style.setProperty("--hero-drift-far-x", "0px");
    scene.style.setProperty("--hero-drift-far-y", "0px");
  };

  if (!activeState) {
    return null;
  }

  const transitionCueClass = !reducedMotion && !paused && progress > 0.76 ? " waldo-hero-transition-cue" : "";

  return (
    <div
      ref={sceneRef}
      className={`waldo-hero-stage waldo-hero-state-${activeState.key}${transitionCueClass}`}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onMouseLeave={() => {
        resetPointerField();
      }}
      onPointerMove={handlePointerMove}
    >
      <div className="waldo-hero-shader" aria-hidden="true">
        <span className="waldo-hero-shader-ring" />
        <span className="waldo-hero-shader-sheen" />
        <span className="waldo-hero-shader-grain" />
      </div>
      <div className="waldo-hero-gradient-field" aria-hidden="true">
        <div className="waldo-hero-gradient-flow">
          <div className="waldo-hero-gradient-boost">
            <span className="waldo-hero-gradient-mesh waldo-hero-gradient-mesh-a" />
            <span className="waldo-hero-gradient-mesh waldo-hero-gradient-mesh-b" />
            <span className="waldo-hero-gradient-mesh waldo-hero-gradient-mesh-c" />
            <span className="waldo-hero-gradient-mesh waldo-hero-gradient-mesh-d" />
          </div>
        </div>
        <span className="waldo-hero-gradient-grain" />
      </div>
      <svg className="waldo-signal-path" viewBox="0 0 1200 760" aria-hidden="true">
        <path d="M210 220 C 350 230, 450 290, 545 360" />
        <path d="M265 520 C 380 470, 455 430, 548 382" />
        <path d="M650 360 C 760 300, 860 232, 995 205" />
        <path d="M655 405 C 775 470, 865 520, 1015 560" />
      </svg>

      <div className="waldo-proof-scene" aria-label="Waldo reads signals and completes work">
        <div className="waldo-proof-group waldo-proof-inputs">
          {activeState.inputs.slice(0, 2).map((artifact, index) => (
            <ArtifactCard key={`${activeState.key}-${artifact.label}`} artifact={artifact} index={index} kind="input" />
          ))}
        </div>

        <div className="waldo-phone-core" aria-hidden="true">
          <div className="waldo-phone-frame">
            <div className="waldo-phone-topbar">
              <span />
              <span />
            </div>
            <Image src="/illustrations/default.svg" alt="" width={169} height={131} priority className="waldo-phone-mascot" />
            <p className="type-caption mt-3 text-[var(--text-tertiary)]">Waldo read</p>
            <p className="type-data waldo-phone-value">{activeState.reads[0]?.value}</p>
            <p className="type-aside tone-tertiary">{activeState.reads[0]?.read}</p>
          </div>
        </div>

        <div className="waldo-proof-group waldo-proof-reads">
          {activeState.reads.map((artifact, index) => (
            <ArtifactCard key={`${activeState.key}-${artifact.label}`} artifact={artifact} index={index} kind="read" />
          ))}
        </div>

        <div className="waldo-proof-group waldo-proof-outputs">
          {activeState.outputs.slice(0, 1).map((receipt, index) => (
            <ReceiptCard key={`${activeState.key}-${receipt.time}-${receipt.action}`} receipt={receipt} index={index} />
          ))}
        </div>
      </div>

      {children({ active, activeState, progress: reducedMotion ? 0 : progress, selectState, states })}
    </div>
  );
}
