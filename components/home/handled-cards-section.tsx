"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";

type HandledCardTone = "blue" | "green" | "purple" | "yellow" | "red";

type DeckPosition = {
  offsetX: number;
  offsetY: number;
  rotation: number;
};

type DeckTransitionDirection = "desktop-to-mobile" | "mobile-to-desktop";

type HandledCard = {
  title: string;
  body: string;
  tone: HandledCardTone;
  fan: DeckPosition;
  dock: DeckPosition;
};

const handledCards: HandledCard[] = [
  {
    title: "Plans your\nday. In detail.",
    body: "Reads your night, then rebuilds\nthe day around it. Hard meeting\nmoves. Done before you're up.",
    tone: "blue",
    fan: { offsetX: -306, offsetY: -10, rotation: -8 },
    dock: { offsetX: 49, offsetY: 48, rotation: -4 },
  },
  {
    title: "Writes what\nyou’d rather not.",
    body: "The follow-up you've dodged since Tuesday, written in your voice. Sent, or waiting for your nod.",
    tone: "green",
    fan: { offsetX: -151, offsetY: 20, rotation: 4 },
    dock: { offsetX: 31, offsetY: 49, rotation: -2 },
  },
  {
    title: "Reads you\nlike a clinician.",
    body: "Goes through your numbers the way a careful clinician would - and finds what you'd never catch alone.",
    tone: "purple",
    fan: { offsetX: 0, offsetY: -41, rotation: -2 },
    dock: { offsetX: 0, offsetY: 51, rotation: 0 },
  },
  {
    title: "Catches\nwhat’s shifting.",
    body: "Watches the weeks where things\nquietly drift, then flags it\nwhile it's still easy to fix.",
    tone: "yellow",
    fan: { offsetX: 147, offsetY: 16, rotation: 1 },
    dock: { offsetX: -10, offsetY: 53, rotation: 2 },
  },
  {
    title: "Shows how\nfar you’ve come.",
    body: "Keeps the honest record ; days,\nmonths, years, so progress\nstops being a guess.",
    tone: "red",
    fan: { offsetX: 310, offsetY: -19, rotation: 5 },
    dock: { offsetX: -33, offsetY: 57, rotation: 3 },
  },
];

const MOBILE_SHUFFLE_SETTLE_MS = 220;
const RESIZE_SETTLE_MS = 160;
const DECK_BREAKPOINT_EXIT_MS = 320;
const DECK_BREAKPOINT_ENTER_MS = 760;
const DESKTOP_CARD_WIDTH = 228;
const DESKTOP_CARD_HEIGHT = 288;
const DESKTOP_SELECTED_WIDTH = 312;
const DESKTOP_SELECTED_HEIGHT = 384;
const DESKTOP_DOCK_CENTER_Y = 184;
const DESKTOP_DOCK_SPACING = 70;

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

function getOffsetMultiplier(viewportWidth: number) {
  const progress = (Math.max(400, Math.min(1080, viewportWidth)) - 400) / 680;

  return 0.4 + 0.6 * progress;
}

function getClusterScale(viewportWidth: number) {
  const progress = (Math.max(400, Math.min(1080, viewportWidth)) - 400) / 680;

  return 0.8 + 0.2 * progress;
}

function getDesktopCardPosition(
  card: HandledCard,
  index: number,
  selectedIndex: number | null,
  viewportWidth: number,
) {
  if (selectedIndex === index) {
    return {
      x: 0,
      y: -40,
      rotation: 0,
      scale: 1,
      z: index + 1,
    };
  }

  if (selectedIndex === null) {
    const offsetMultiplier = getOffsetMultiplier(viewportWidth);

    return {
      x: card.fan.offsetX * offsetMultiplier,
      y: card.fan.offsetY,
      rotation: card.fan.rotation,
      scale: 1,
      z: index + 1,
    };
  }

  const dockWidth = (handledCards.length - 1) * DESKTOP_DOCK_SPACING;

  return {
    x: index * DESKTOP_DOCK_SPACING - dockWidth / 2 + card.dock.offsetX,
    y: DESKTOP_DOCK_CENTER_Y + card.dock.offsetY,
    rotation: card.dock.rotation,
    scale: 0.7,
    z: index + 1,
  };
}

function cardStyle(
  card: HandledCard,
  index: number,
  selectedIndex: number | null,
  stackSlot: number,
  dragX: number,
  viewportWidth: number,
): CSSProperties {
  const frontDragX = stackSlot === 0 ? dragX : 0;
  const desktopPosition = getDesktopCardPosition(card, index, selectedIndex, viewportWidth);
  const isSelected = selectedIndex === index;
  const targetWidth = isSelected ? DESKTOP_SELECTED_WIDTH : DESKTOP_CARD_WIDTH;
  const targetHeight = isSelected ? DESKTOP_SELECTED_HEIGHT : DESKTOP_CARD_HEIGHT;

  return {
    "--handled-card-x": `${desktopPosition.x}px`,
    "--handled-card-y": `${desktopPosition.y}px`,
    "--handled-card-left": `${desktopPosition.x - targetWidth / 2}px`,
    "--handled-card-top": `${desktopPosition.y - targetHeight / 2}px`,
    "--handled-card-rotate": `${desktopPosition.rotation}deg`,
    "--handled-card-scale": desktopPosition.scale,
    "--handled-card-z": desktopPosition.z,
    "--stack-drag-x": `${frontDragX}px`,
    "--stack-drag-rotate": `${frontDragX * 0.045}deg`,
  } as CSSProperties;
}

export function HandledCardsSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [deckOrder, setDeckOrder] = useState<number[]>(() => handledCards.map((_, index) => index));
  const [viewportWidth, setViewportWidth] = useState(1080);
  const [isMobileDeck, setIsMobileDeck] = useState(false);
  const [renderedMobileDeck, setRenderedMobileDeck] = useState(false);
  const [deckTransitionPhase, setDeckTransitionPhase] = useState<"entered" | "leaving">("entered");
  const [deckTransitionDirection, setDeckTransitionDirection] = useState<DeckTransitionDirection | null>(null);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const shuffleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resizeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deckTransitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const deckTransitionEnterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollStabilizeFrameRef = useRef<number | null>(null);
  const viewportWatchFrameRef = useRef<number | null>(null);
  const resizePreserveReleaseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPreservingResizeFocusRef = useRef(false);
  const lastStageCenterRef = useRef<number | null>(null);
  const viewportSnapshotRef = useRef({ width: 0, isMobile: false });
  const renderedMobileDeckRef = useRef(false);
  const dragRef = useRef({
    active: false,
    pointerId: null as number | null,
    startX: 0,
    startY: 0,
    moved: false,
  });

  const getStageViewportCenter = useCallback((options: { visibleOnly?: boolean } = {}) => {
    if (typeof window === "undefined" || !stageRef.current) {
      return null;
    }

    const rect = stageRef.current.getBoundingClientRect();

    if (options.visibleOnly && (rect.bottom <= 0 || rect.top >= window.innerHeight)) {
      return null;
    }

    return rect.top + rect.height / 2;
  }, []);

  const rememberStageViewportCenter = useCallback(() => {
    if (isPreservingResizeFocusRef.current) {
      return;
    }

    const stageCenter = getStageViewportCenter({ visibleOnly: true });

    if (stageCenter !== null) {
      lastStageCenterRef.current = stageCenter;
    }
  }, [getStageViewportCenter]);

  const stabilizeStageViewportCenter = useCallback((targetCenter = lastStageCenterRef.current) => {
    if (typeof window === "undefined" || targetCenter === null) {
      return;
    }

    if (scrollStabilizeFrameRef.current) {
      cancelAnimationFrame(scrollStabilizeFrameRef.current);
    }

    scrollStabilizeFrameRef.current = requestAnimationFrame(() => {
      const currentCenter = getStageViewportCenter();

      if (currentCenter !== null) {
        const deltaY = currentCenter - targetCenter;

        if (Math.abs(deltaY) > 1) {
          window.scrollBy({ top: deltaY, left: 0 });
        }

        lastStageCenterRef.current = targetCenter;
      }

      scrollStabilizeFrameRef.current = null;
    });
  }, [getStageViewportCenter]);

  useLayoutEffect(() => {
    const breakpointQuery = window.matchMedia("(max-width: 734px)");
    let layoutResizeObserver: ResizeObserver | null = null;

    const readViewportSnapshot = () => ({
      width: window.innerWidth,
      isMobile: breakpointQuery.matches,
    });

    const updateViewportState = (options: { forceGeometry?: boolean } = {}) => {
      const nextViewport = readViewportSnapshot();
      const isCrossingRenderedMode = nextViewport.isMobile !== renderedMobileDeckRef.current;

      viewportSnapshotRef.current = nextViewport;
      setIsMobileDeck(nextViewport.isMobile);

      if (options.forceGeometry || !isCrossingRenderedMode) {
        setViewportWidth(nextViewport.width);
      }
    };

    const handleResize = () => {
      const targetCenter = lastStageCenterRef.current ?? getStageViewportCenter({ visibleOnly: true });

      isPreservingResizeFocusRef.current = true;

      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }

      if (resizePreserveReleaseTimerRef.current) {
        clearTimeout(resizePreserveReleaseTimerRef.current);
      }

      stabilizeStageViewportCenter(targetCenter);
      updateViewportState();

      resizeTimerRef.current = setTimeout(() => {
        updateViewportState();
        stabilizeStageViewportCenter(targetCenter);
        resizePreserveReleaseTimerRef.current = setTimeout(() => {
          isPreservingResizeFocusRef.current = false;
          rememberStageViewportCenter();
          resizePreserveReleaseTimerRef.current = null;
        }, DECK_BREAKPOINT_EXIT_MS + DECK_BREAKPOINT_ENTER_MS);
        resizeTimerRef.current = null;
      }, RESIZE_SETTLE_MS);
    };

    const watchViewport = () => {
      const nextViewport = readViewportSnapshot();
      const previousViewport = viewportSnapshotRef.current;

      if (nextViewport.width !== previousViewport.width || nextViewport.isMobile !== previousViewport.isMobile) {
        handleResize();
      }

      viewportWatchFrameRef.current = requestAnimationFrame(watchViewport);
    };

    const initialViewport = readViewportSnapshot();

    viewportSnapshotRef.current = initialViewport;
    renderedMobileDeckRef.current = initialViewport.isMobile;
    setViewportWidth(initialViewport.width);
    setIsMobileDeck(initialViewport.isMobile);
    setRenderedMobileDeck(initialViewport.isMobile);
    rememberStageViewportCenter();
    viewportWatchFrameRef.current = requestAnimationFrame(watchViewport);
    window.addEventListener("scroll", rememberStageViewportCenter, { passive: true });
    window.addEventListener("resize", handleResize);
    window.visualViewport?.addEventListener("resize", handleResize);
    breakpointQuery.addEventListener("change", handleResize);
    if (typeof ResizeObserver !== "undefined") {
      layoutResizeObserver = new ResizeObserver(handleResize);
      layoutResizeObserver.observe(document.documentElement);
      if (stageRef.current) {
        layoutResizeObserver.observe(stageRef.current);
      }
    }

    return () => {
      window.removeEventListener("scroll", rememberStageViewportCenter);
      window.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("resize", handleResize);
      breakpointQuery.removeEventListener("change", handleResize);
      layoutResizeObserver?.disconnect();
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }
      if (shuffleTimerRef.current) {
        clearTimeout(shuffleTimerRef.current);
      }
      if (deckTransitionTimerRef.current) {
        clearTimeout(deckTransitionTimerRef.current);
      }
      if (deckTransitionEnterTimerRef.current) {
        clearTimeout(deckTransitionEnterTimerRef.current);
      }
      if (resizePreserveReleaseTimerRef.current) {
        clearTimeout(resizePreserveReleaseTimerRef.current);
      }
      if (scrollStabilizeFrameRef.current) {
        cancelAnimationFrame(scrollStabilizeFrameRef.current);
      }
      if (viewportWatchFrameRef.current) {
        cancelAnimationFrame(viewportWatchFrameRef.current);
      }
    };
  }, [getStageViewportCenter, rememberStageViewportCenter, stabilizeStageViewportCenter]);

  useLayoutEffect(() => {
    if (isMobileDeck === renderedMobileDeck) {
      return;
    }

    if (deckTransitionTimerRef.current) {
      clearTimeout(deckTransitionTimerRef.current);
    }

    if (deckTransitionEnterTimerRef.current) {
      clearTimeout(deckTransitionEnterTimerRef.current);
    }

    const targetCenter = lastStageCenterRef.current ?? getStageViewportCenter();
    const nextDirection: DeckTransitionDirection = isMobileDeck ? "desktop-to-mobile" : "mobile-to-desktop";

    setDeckTransitionDirection(nextDirection);
    setDeckTransitionPhase("leaving");
    setSelectedIndex(null);

    deckTransitionTimerRef.current = setTimeout(() => {
      renderedMobileDeckRef.current = isMobileDeck;
      setRenderedMobileDeck(isMobileDeck);
      setViewportWidth(window.innerWidth);
      setSelectedIndex(null);
      setDragX(0);
      setIsDragging(false);
      setIsShuffling(false);
      dragRef.current.active = false;
      dragRef.current.pointerId = null;
      setDeckTransitionPhase("entered");
      stabilizeStageViewportCenter(targetCenter);
      deckTransitionEnterTimerRef.current = setTimeout(() => {
        setDeckTransitionDirection(null);
        deckTransitionEnterTimerRef.current = null;
      }, DECK_BREAKPOINT_ENTER_MS);
      deckTransitionTimerRef.current = null;
    }, DECK_BREAKPOINT_EXIT_MS);
  }, [getStageViewportCenter, isMobileDeck, renderedMobileDeck, stabilizeStageViewportCenter]);

  useEffect(() => {
    if (selectedIndex === null || isMobileStack()) {
      return;
    }

    const handleDocumentPointerDown = (event: globalThis.PointerEvent) => {
      const target = event.target;

      if (target instanceof Element && target.closest(".new-handled-card-button")) {
        return;
      }

      setSelectedIndex(null);
    };

    document.addEventListener("pointerdown", handleDocumentPointerDown);

    return () => {
      document.removeEventListener("pointerdown", handleDocumentPointerDown);
    };
  }, [selectedIndex]);

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

    setSelectedIndex((currentIndex) => (currentIndex === index ? null : index));
  };

  const handleCardMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    if (!isMobileStack()) {
      event.preventDefault();
    }
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
    <section className="new-handled-section" aria-labelledby="handled-title" data-no-bloom="true">
      <h2 id="handled-title" className="sr-only">
        What Waldo handles
      </h2>
      <div className="new-handled-content" data-animate="blur-fade">
        <div
          ref={stageRef}
          className="new-handled-deck-stage"
          data-deck-state={selectedIndex === null ? "fan" : "selected"}
          data-deck-mode={renderedMobileDeck ? "mobile" : "desktop"}
          data-deck-phase={deckTransitionPhase}
          data-deck-direction={deckTransitionDirection ?? "none"}
          data-drag-active={isDragging || isShuffling ? "true" : "false"}
          onClick={handleStageClick}
          onKeyDown={handleKeyDown}
          style={{ "--handled-cluster-scale": getClusterScale(viewportWidth) } as CSSProperties}
        >
          <div key={renderedMobileDeck ? "mobile-deck" : "desktop-deck"} className="new-handled-deck-cluster">
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
                  aria-label={cardState === "selected" ? `${card.title.replace(/\n/g, " ")} selected` : `Show ${card.title.replace(/\n/g, " ")}`}
                  onClick={(event) => handleCardClick(event, index)}
                  onMouseDown={handleCardMouseDown}
                  onPointerDown={(event) => handlePointerDown(event, stackSlot)}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerCancel}
                  style={cardStyle(card, index, selectedIndex, stackSlot, dragX, viewportWidth)}
                >
                  <article className="new-handled-card-shell">
                    <div className="new-handled-card-copy">
                      <h3 className="new-handled-card-title">{card.title}</h3>
                      <p className="new-handled-card-body">{card.body}</p>
                    </div>
                  </article>
                </button>
              );
            })}
          </div>
        </div>
        <div className="new-handled-cta-panel">
          <h2>This is what “handled” looks like.</h2>
          <p>
            Waldo plans like Napoleon, thinks like Einstein and moves like a
            <br className="new-reference-break" />{" "}
            cheetah; all in the body of a <span className="new-reference-accent">friendly dalmatian.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
