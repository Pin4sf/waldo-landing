"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";

type HandledCardTone = "blue" | "green" | "purple" | "yellow" | "red";

type DeckPosition = {
  x: string;
  y: string;
  rotate: string;
  z: number;
};

type HandledCard = {
  title: string;
  body: string;
  tone: HandledCardTone;
  graphic: "day" | "write" | "clinical" | "shift" | "progress";
  fan: DeckPosition;
  dock: DeckPosition;
};

const handledCards: HandledCard[] = [
  {
    title: "Plans your day. In detail.",
    body: "Overnight, Waldo reads how you actually slept and builds the day around it. The hard meeting slides off your worst hour. The workout lands when your body can take it. Not a tip on your lock screen - a day that's already arranged by the time you're up.",
    tone: "blue",
    graphic: "day",
    fan: { x: "clamp(-420px, -31vw, -178px)", y: "clamp(20px, 4vw, 56px)", rotate: "-8deg", z: 1 },
    dock: { x: "clamp(-220px, -15vw, -96px)", y: "clamp(132px, 17vw, 198px)", rotate: "-4deg", z: 1 },
  },
  {
    title: "Writes what you’d rather not.",
    body: "The reschedule note. The follow-up you've put off. The reply that's been sitting there since Tuesday. Waldo writes it in your voice and either sends it or waits for your nod. Either way, you're not the one drafting the same polite message for the 10th time.",
    tone: "green",
    graphic: "write",
    fan: { x: "clamp(-238px, -18vw, -82px)", y: "clamp(54px, 7vw, 92px)", rotate: "4deg", z: 2 },
    dock: { x: "clamp(-112px, -7.5vw, -46px)", y: "clamp(140px, 17.8vw, 206px)", rotate: "-2deg", z: 2 },
  },
  {
    title: "Reads you like a clinician.",
    body: "You don't have an hour every night to sit with your own numbers. Waldo does. It goes through your health the way a careful clinician would, and pulls out the thing buried three weeks back that you were never going to catch on your own.",
    tone: "purple",
    graphic: "clinical",
    fan: { x: "clamp(-48px, -3.5vw, -10px)", y: "clamp(-28px, -3vw, -8px)", rotate: "-2deg", z: 3 },
    dock: { x: "0px", y: "clamp(145px, 18vw, 212px)", rotate: "0deg", z: 3 },
  },
  {
    title: "Catches what’s shifting.",
    body: "One rough day is just a rough day. Waldo watches the wider window - the weeks where things quietly drift - and flags what's moving before you feel it as a problem. The trend caught early, while it's still easy to change.",
    tone: "yellow",
    graphic: "shift",
    fan: { x: "clamp(138px, 12vw, 205px)", y: "clamp(52px, 6vw, 84px)", rotate: "-7deg", z: 4 },
    dock: { x: "clamp(104px, 7.5vw, 112px)", y: "clamp(140px, 17.8vw, 206px)", rotate: "2deg", z: 4 },
  },
  {
    title: "Shows how far you’ve come.",
    body: "Day, month, year. Your body and your work, side by side. Waldo keeps the honest record of what you actually did, so progress stops being a thing you second-guess and becomes something you can see.",
    tone: "red",
    graphic: "progress",
    fan: { x: "clamp(260px, 25vw, 392px)", y: "clamp(20px, 4vw, 58px)", rotate: "1deg", z: 5 },
    dock: { x: "clamp(204px, 15vw, 220px)", y: "clamp(132px, 17vw, 198px)", rotate: "3deg", z: 5 },
  },
];

const MOBILE_SHUFFLE_SETTLE_MS = 220;

function renderHandledGraphic(graphic: HandledCard["graphic"]) {
  if (graphic === "day") {
    return (
      <svg viewBox="0 0 240 148" aria-hidden="true">
        <path d="M38 101c21-36 36-54 56-54 26 0 31 26 57 26 20 0 32-15 51-39" />
        <path d="M45 42h44M45 64h26M158 108h41" />
        <rect x="26" y="22" width="70" height="86" rx="18" />
        <rect x="146" y="26" width="68" height="88" rx="18" />
        <circle cx="108" cy="73" r="9" />
        <circle cx="134" cy="73" r="9" />
      </svg>
    );
  }

  if (graphic === "write") {
    return (
      <svg viewBox="0 0 240 148" aria-hidden="true">
        <path d="M38 40h116M38 64h82M38 88h102" />
        <path d="M151 103l39-39c7-7 18-7 25 0s7 18 0 25l-39 39-32 7 7-32Z" />
        <path d="M181 73l25 25" />
        <rect x="24" y="20" width="132" height="104" rx="20" />
      </svg>
    );
  }

  if (graphic === "clinical") {
    return (
      <svg viewBox="0 0 240 148" aria-hidden="true">
        <path d="M28 92h38l18-42 32 75 22-52 17 19h57" />
        <circle cx="184" cy="48" r="26" />
        <path d="M184 34v28M170 48h28" />
        <path d="M42 36c18-15 43-18 65-9M36 119c21 12 49 13 73 2" />
      </svg>
    );
  }

  if (graphic === "shift") {
    return (
      <svg viewBox="0 0 240 148" aria-hidden="true">
        <path d="M33 104c28-24 46-29 70-21 34 12 48-6 75-43" />
        <circle cx="34" cy="104" r="9" />
        <circle cx="91" cy="82" r="9" />
        <circle cx="142" cy="85" r="9" />
        <circle cx="180" cy="39" r="9" />
        <path d="M188 38h26v26" />
        <path d="M33 124h174" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 240 148" aria-hidden="true">
      <circle cx="70" cy="76" r="42" />
      <path d="M70 34a42 42 0 0 1 42 42" />
      <circle cx="166" cy="76" r="34" />
      <path d="M166 42a34 34 0 0 1 31 48" />
      <path d="M44 124h155M44 124V35" />
      <path d="M64 111V91M95 111V70M126 111V84M157 111V54M188 111V42" />
    </svg>
  );
}

function getCardState(selectedIndex: number | null, index: number) {
  if (selectedIndex === null) {
    return "fan";
  }

  return selectedIndex === index ? "selected" : "dock";
}

function isMobileStack() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(max-width: 734px)").matches;
}

function moveFirstCardToBack(deckOrder: number[]) {
  if (deckOrder.length < 2) {
    return deckOrder;
  }

  return [...deckOrder.slice(1), deckOrder[0]];
}

function moveCardToFront(deckOrder: number[], index: number) {
  return [index, ...deckOrder.filter((cardIndex) => cardIndex !== index)];
}

function getStackSlot(index: number, deckOrder: number[]) {
  const stackSlot = deckOrder.indexOf(index);

  return stackSlot === -1 ? deckOrder.length : stackSlot;
}

function getSwipeThreshold(cardWidth: number) {
  return Math.max(118, Math.min(154, cardWidth * 0.42));
}

function getSwipeExitDistance(cardWidth: number, direction: number) {
  return direction * Math.max(260, Math.round(cardWidth * 1.08));
}

function cardStyle(card: HandledCard, stackSlot: number, dragX: number): CSSProperties {
  const frontDragX = stackSlot === 0 ? dragX : 0;

  return {
    "--fan-x": card.fan.x,
    "--fan-y": card.fan.y,
    "--fan-rotate": card.fan.rotate,
    "--fan-z": card.fan.z,
    "--dock-x": card.dock.x,
    "--dock-y": card.dock.y,
    "--dock-rotate": card.dock.rotate,
    "--dock-z": card.dock.z,
    "--stack-drag-x": `${frontDragX}px`,
    "--stack-drag-rotate": `${frontDragX * 0.045}deg`,
  } as CSSProperties;
}

export function HandledCardsSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [deckOrder, setDeckOrder] = useState<number[]>(() => handledCards.map((_, index) => index));
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const shuffleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragRef = useRef({
    active: false,
    pointerId: null as number | null,
    startX: 0,
    startY: 0,
    moved: false,
  });

  useEffect(() => {
    return () => {
      if (shuffleTimerRef.current) {
        clearTimeout(shuffleTimerRef.current);
      }
    };
  }, []);

  const handleStageClick = () => {
    setSelectedIndex(null);
  };

  const handleCardClick = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    event.stopPropagation();

    if (isMobileStack()) {
      if (isShuffling) {
        return;
      }

      if (dragRef.current.moved) {
        dragRef.current.moved = false;
        return;
      }

      setDeckOrder((currentOrder) => moveCardToFront(currentOrder, index));
      setSelectedIndex(null);
      return;
    }

    setSelectedIndex(index);
  };

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>, stackSlot: number) => {
    if (!isMobileStack() || stackSlot !== 0 || isShuffling) {
      return;
    }

    event.stopPropagation();
    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
    };
    setDragX(0);
    setIsDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!dragRef.current.active || dragRef.current.pointerId !== event.pointerId || !isMobileStack()) {
      return;
    }

    const nextX = event.clientX - dragRef.current.startX;
    const nextY = event.clientY - dragRef.current.startY;

    if (Math.abs(nextX) > 8 || Math.abs(nextY) > 8) {
      dragRef.current.moved = true;
    }

    if (Math.abs(nextX) > Math.abs(nextY) * 1.12) {
      event.preventDefault();
      setDragX(Math.max(-176, Math.min(176, nextX)));
    }
  };

  const handlePointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    if (!dragRef.current.active || dragRef.current.pointerId !== event.pointerId || !isMobileStack()) {
      return;
    }

    event.stopPropagation();
    const finalX = event.clientX - dragRef.current.startX;
    const finalY = event.clientY - dragRef.current.startY;
    const cardWidth = event.currentTarget.getBoundingClientRect().width;
    const swipeThreshold = getSwipeThreshold(cardWidth);
    const didShuffle = Math.abs(finalX) > swipeThreshold && Math.abs(finalX) > Math.abs(finalY) * 1.35;

    if (didShuffle) {
      const direction = finalX < 0 ? -1 : 1;

      setIsDragging(false);
      setIsShuffling(true);
      setDragX(getSwipeExitDistance(cardWidth, direction));
      setSelectedIndex(null);

      if (shuffleTimerRef.current) {
        clearTimeout(shuffleTimerRef.current);
      }

      shuffleTimerRef.current = setTimeout(() => {
        setDeckOrder((currentOrder) => moveFirstCardToBack(currentOrder));
        setDragX(0);
        setIsShuffling(false);
        dragRef.current.moved = false;
        shuffleTimerRef.current = null;
      }, MOBILE_SHUFFLE_SETTLE_MS);
    } else {
      setDragX(0);
      setIsDragging(false);
    }

    dragRef.current.active = false;
    dragRef.current.pointerId = null;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  const handlePointerCancel = (event: PointerEvent<HTMLButtonElement>) => {
    if (!dragRef.current.active || dragRef.current.pointerId !== event.pointerId) {
      return;
    }

    event.stopPropagation();
    setDragX(0);
    setIsDragging(false);
    dragRef.current.active = false;
    dragRef.current.pointerId = null;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      setSelectedIndex(null);
      return;
    }

    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }

    event.preventDefault();
    const currentIndex = selectedIndex ?? 0;
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (currentIndex + direction + handledCards.length) % handledCards.length;
    setSelectedIndex(nextIndex);
  };

  return (
    <section className="new-handled-section" aria-labelledby="handled-title">
      <h2 id="handled-title" className="sr-only">
        What Waldo handles
      </h2>
      <div
        className="new-handled-deck-stage"
        data-animate="blur-fade"
        data-deck-state={selectedIndex === null ? "fan" : "selected"}
        data-drag-active={isDragging || isShuffling ? "true" : "false"}
        onClick={handleStageClick}
        onKeyDown={handleKeyDown}
      >
        {handledCards.map((card, index) => {
          const cardState = getCardState(selectedIndex, index);
          const stackSlot = getStackSlot(index, deckOrder);

          return (
            <button
              key={card.title}
              type="button"
              className="new-handled-card-button"
              data-card-state={cardState}
              data-dragging={stackSlot === 0 && isDragging ? "true" : "false"}
              data-shuffling={stackSlot === 0 && isShuffling ? "true" : "false"}
              data-stack-slot={stackSlot}
              data-tone={card.tone}
              aria-pressed={selectedIndex === index}
              aria-label={cardState === "selected" ? `${card.title} selected` : `Show ${card.title}`}
              onClick={(event) => handleCardClick(event, index)}
              onPointerDown={(event) => handlePointerDown(event, stackSlot)}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
              style={cardStyle(card, stackSlot, dragX)}
            >
              <article className="new-handled-card-shell">
                <div className="new-handled-card-graphic">{renderHandledGraphic(card.graphic)}</div>
                <div className="new-handled-card-copy">
                  <h3 className="new-handled-card-title">{card.title}</h3>
                  <p className="new-handled-card-body">{card.body}</p>
                </div>
              </article>
            </button>
          );
        })}
      </div>
      <div className="new-handled-cta-panel" data-animate="blur-fade">
        <h2>This is what “handled” looks like.</h2>
        <p>Waldo plans like Napoleon, thinks like Einstein and moves like a cheetah; all in the body of a friendly dalmatian.</p>
        <Link className="new-handled-feature-link" href="/features">
          Learn More →
        </Link>
      </div>
    </section>
  );
}
