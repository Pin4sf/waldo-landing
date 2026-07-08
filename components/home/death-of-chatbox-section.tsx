"use client";

import Image from "next/image";
import type { PointerEvent } from "react";
import { useCallback, useEffect, useRef } from "react";

function SendGlyph() {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true" focusable="false">
      <path
        d="M22.75 6.2 6.1 12.84c-.78.31-.76 1.42.03 1.7l6.14 2.2 2.19 6.13c.28.79 1.39.81 1.7.03L22.8 6.25c.23-.57-.48-1.04-1-.66Z"
        fill="currentColor"
      />
      <path
        d="m12.72 16.3 4.86-4.86"
        fill="none"
        stroke="#FAFAF8"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.1"
      />
    </svg>
  );
}

function canUseFinePointer() {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function ChatboxCopy() {
  return (
    <div className="new-chatbox-copy" data-animate="blur-fade">
      <div className="new-chatbox-dead-copy">
        <p>
          <strong>They never type a prompt in a chat box,</strong>{" "}
          <span>that tech is now old and dead.</span>
        </p>
        <p>Developers have moved to CLI Agents for this, but those involve hours of setup and very complex interfaces. Tedious.</p>
      </div>

      <div className="new-chatbox-missing-copy">
        <h2>What you’re missing out on.</h2>
        <p>
          They&apos;re not sharper than you. They just aren&apos;t the one deciding what matters before the coffee&apos;s poured. Waldo handles it for them.
        </p>
        <p>
          <strong>Waldo is the first everyday AI agent</strong>{" "}
          <span>that plans your days, spots what you&apos;d miss out on, and cares about your health. And your work.</span>
        </p>
      </div>
    </div>
  );
}

export function DeathOfChatboxSection() {
  const glowRef = useRef<HTMLSpanElement | null>(null);
  const waldoRef = useRef<HTMLSpanElement | null>(null);
  const eulogyRef = useRef<HTMLParagraphElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  const applyPointer = useCallback(() => {
    frameRef.current = null;

    const { x, y } = pointerRef.current;
    const xDistance = x.toFixed(3);
    const yDistance = y.toFixed(3);

    if (glowRef.current) {
      glowRef.current.style.transform = `translate3d(${Number(xDistance) * -7}px, ${Number(yDistance) * -5}px, 0)`;
    }

    if (waldoRef.current) {
      waldoRef.current.style.transform = `translate3d(${Number(xDistance) * 7}px, ${
        Number(yDistance) * 5
      }px, 0) rotate(${Number(xDistance) * 1.1}deg)`;
    }

    if (eulogyRef.current) {
      eulogyRef.current.style.transform = `translate3d(${Number(xDistance) * 4}px, ${
        Number(yDistance) * 3 - 1
      }px, 0) scale(1.012)`;
    }
  }, []);

  const updatePointer = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (!canUseFinePointer()) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
    };

    if (frameRef.current === null) {
      frameRef.current = requestAnimationFrame(applyPointer);
    }
  }, [applyPointer]);

  const resetPointer = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    pointerRef.current = { x: 0, y: 0 };

    for (const layer of [glowRef.current, waldoRef.current, eulogyRef.current]) {
      if (layer) {
        layer.style.transform = "";
      }
    }
  }, []);

  useEffect(() => resetPointer, [resetPointer]);

  return (
    <section className="new-chatbox-section" aria-labelledby="death-of-chatbox-title">
      <div
        className="new-chatbox-card"
        data-animate="blur-fade"
        onPointerLeave={resetPointer}
        onPointerMove={updatePointer}
      >
        <div className="new-chatbox-inner-frame" aria-hidden="true" />
        <div className="new-chatbox-gradient" aria-hidden="true">
          <span ref={glowRef} className="new-chatbox-glow" />
          <span className="new-chatbox-mesh new-chatbox-mesh-a" />
          <span className="new-chatbox-mesh new-chatbox-mesh-b" />
          <span className="new-chatbox-mesh new-chatbox-mesh-c" />
          <span className="new-chatbox-sheen" />
        </div>

        <div className="new-chatbox-content">
          <h2 id="death-of-chatbox-title" className="new-chatbox-title">
            Welcome back, User
          </h2>
          <p className="new-chatbox-subtitle">
            Lets dive right into whatever you can think of - because i can’t
          </p>

          <div className="new-chatbox-input" aria-label="Retired chat prompt">
            <span className="new-chatbox-prompt-text">
              You will have to tell me about how can I help you...
            </span>
            <span className="new-chatbox-retire-line" aria-hidden="true" />
            <span className="new-chatbox-send">
              <SendGlyph />
            </span>
          </div>

          <span ref={waldoRef} className="new-chatbox-waldo-wrap" aria-hidden="true">
            <Image
              src="/assets/home/mascots/Vector.svg"
              alt=""
              width={184}
              height={143}
              className="new-chatbox-waldo"
              draggable={false}
            />
          </span>
          <p ref={eulogyRef} className="new-chatbox-eulogy">
            RIP purple gradient friend
          </p>
        </div>
      </div>
      <ChatboxCopy />
    </section>
  );
}
