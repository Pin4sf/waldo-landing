"use client";

import { type RefObject, useEffect, useState } from "react";

// Only one picture moves at a time. Every animated picture in a card asks this hook whether it
// should be playing; of the ones that can be seen, the one nearest the middle of the window is told
// yes and the rest are told no, so they rest on their last frame until it is their turn. A picture
// has to show at least a third of itself to count, and the one that is playing keeps its place
// unless another is clearly nearer the middle (so they do not swap back and forth while you scroll).
// Nothing plays while the tab is behind another, or when the reader asks for less motion.

type Peer = { el: HTMLElement; set: (live: boolean) => void; live: boolean };

/** How much of a picture has to show before it can play. */
const SHOWN = 0.3;
/** How much nearer the middle another picture has to be (px) before it takes over. */
const LEAD = 80;

const peers = new Set<Peer>();
const ratios = new Map<Element, number>();
let eye: IntersectionObserver | null = null;
let current: Peer | null = null;
let queued = 0;

const distance = (peer: Peer) => {
  const box = peer.el.getBoundingClientRect();
  return Math.hypot(
    box.left + box.width / 2 - window.innerWidth / 2,
    box.top + box.height / 2 - window.innerHeight / 2,
  );
};

const soon = () => {
  if (!queued) queued = requestAnimationFrame(decide);
};

/** In a centred, looping carousel only the card in the middle may move (carousel.tsx marks it data-centre) */
const inMiddle = (el: HTMLElement) => {
  const card = el.closest(".site-carousel-card");
  const row = card?.parentElement;
  return !row?.hasAttribute("data-loop") || card?.hasAttribute("data-centre");
};

/** Ask again which picture should be moving (a carousel calls this when a different card comes to the middle) */
export function refreshLive() {
  soon();
}

function decide() {
  queued = 0;
  const ready = [...peers].filter(
    (peer) =>
      (ratios.get(peer.el) ?? 0) >= SHOWN &&
      document.visibilityState === "visible" &&
      inMiddle(peer.el),
  );
  const nearest = ready.reduce<Peer | null>(
    (best, peer) => (!best || distance(peer) < distance(best) ? peer : best),
    null,
  );
  current =
    current && ready.includes(current) && nearest
      ? distance(nearest) + LEAD < distance(current)
        ? nearest
        : current
      : nearest;
  peers.forEach((peer) => {
    const on = peer === current;
    if (peer.live !== on) {
      peer.live = on;
      peer.set(on);
    }
  });
}

function join(peer: Peer) {
  if (!peers.size) {
    eye = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) ratios.set(entry.target, entry.intersectionRatio);
        soon();
      },
      { threshold: [0, 0.15, SHOWN, 0.5, 0.75, 1] },
    );
    // Scrolling the page or a row of cards changes which one is nearest the middle
    window.addEventListener("scroll", soon, { capture: true, passive: true });
    window.addEventListener("resize", soon);
    document.addEventListener("visibilitychange", soon);
  }
  peers.add(peer);
  eye?.observe(peer.el);
}

function leave(peer: Peer) {
  peers.delete(peer);
  eye?.unobserve(peer.el);
  ratios.delete(peer.el);
  if (current === peer) current = null;
  if (!peers.size) {
    eye?.disconnect();
    eye = null;
    cancelAnimationFrame(queued);
    queued = 0;
    window.removeEventListener("scroll", soon, { capture: true });
    window.removeEventListener("resize", soon);
    document.removeEventListener("visibilitychange", soon);
  } else {
    soon();
  }
}

/** True while this picture is the one that should be moving. */
export function useLive(root: RefObject<HTMLElement | null>) {
  const [live, setLive] = useState(false);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const peer: Peer = { el, set: setLive, live: false };
    join(peer);
    return () => leave(peer);
  }, [root]);
  return live;
}
