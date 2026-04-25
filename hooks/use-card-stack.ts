"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PAUSE_MS, DRAG_THRESH } from "@/lib/motion";

export function useCardStack(count: number, autoMs: number) {
  const [offset,    setOffset]    = useState(0);
  const [paused,    setPaused]    = useState(false);
  const [dragDelta, setDragDelta] = useState(0);
  const dragStart  = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const resumeRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setOffset(o => o + 1), autoMs);
    return () => clearInterval(id);
  }, [paused, autoMs]);

  const pauseFor = useCallback((ms: number) => {
    setPaused(true);
    if (resumeRef.current) clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(() => setPaused(false), ms);
  }, []);

  useEffect(() => () => { if (resumeRef.current) clearTimeout(resumeRef.current); }, []);

  const advance = useCallback(() => {
    setOffset(o => o + 1);
    pauseFor(PAUSE_MS);
  }, [pauseFor]);

  const retreat = useCallback(() => {
    setOffset(o => o - 1);
    pauseFor(PAUSE_MS);
  }, [pauseFor]);

  const slotOf = (i: number) => ((i - offset) % count + count) % count;

  // Front card index — for mobile single-card view
  const frontIndex = ((offset + count - 1) % count + count) % count;

  // Vertical drag (desktop stack dismiss)
  const onPointerDown = (e: React.PointerEvent) => {
    dragStart.current = e.clientY;
    setDragDelta(0);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStart.current === null) return;
    setDragDelta(Math.max(0, e.clientY - dragStart.current));
  };
  const onPointerUp = useCallback(() => {
    const triggered = dragDelta > DRAG_THRESH;
    dragStart.current = null;
    setDragDelta(0);
    if (triggered) advance();
  }, [dragDelta, advance]);

  const onClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (dragDelta > 4) return;
    advance();
  }, [dragDelta, advance]);

  const onMouseEnter = useCallback(() => pauseFor(PAUSE_MS), [pauseFor]);
  const onMouseLeave = useCallback(() => {
    if (resumeRef.current) clearTimeout(resumeRef.current);
    setPaused(false);
  }, []);

  // Horizontal touch swipe (mobile carousel)
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    touchStartX.current = null;
    if (Math.abs(diff) > 44) {
      if (diff > 0) advance(); else retreat();
    }
  }, [advance, retreat]);

  return { offset, dragDelta, slotOf, frontIndex, advance, retreat, onPointerDown, onPointerMove, onPointerUp, onClick, onMouseEnter, onMouseLeave, onTouchStart, onTouchEnd } as const;
}
