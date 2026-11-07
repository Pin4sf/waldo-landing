"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { CONNECTOR_MARKS } from "@/components/site/connector-rows";

// The tools Waldo could connect to beyond the ones with full-colour marks above (2026-10-12): one-colour brand marks
// from Simple Icons (v16.30.0, CC0), in each brand's own colour (near-white ones set in ink), in
// public/assets/connectors. With the 45 above, 211 in all, for "200+ tools across 27 categories".
const MORE_MARKS: string[] = [
  // Wearables & health
  "samsung", "eightsleep", "huawei", "xiaomi", "peloton", "nike", "adidas", "underarmour", "headspace", "abbott",
  // Calendar & meetings
  "googlemeet", "webex", "caldotcom", "loom",
  // Mail & messaging
  "protonmail", "hey", "signal", "messenger", "imessage", "wechat", "line", "viber", "mattermost", "rocketdotchat", "element", "zulip", "threema",
  // Tasks & projects
  "todoist", "ticktick", "things", "googletasks", "basecamp", "shortcut", "plane", "coda",
  // Notes & knowledge
  "obsidian", "evernote", "roamresearch", "logseq", "simplenote", "googlekeep", "confluence", "gitbook", "instapaper", "anytype",
  // Docs & files
  "googledocs", "googlesheets", "googleslides", "box", "typeform", "googleforms", "surveymonkey",
  // Design
  "sketch", "framer", "miro", "mural", "excalidraw", "webflow", "penpot",
  // Engineering
  "gitlab", "bitbucket", "sentry", "datadog", "pagerduty", "opsgenie", "newrelic", "grafana", "netlify", "cloudflare", "render", "railway", "digitalocean", "googlecloud", "firebase", "docker", "postman", "circleci", "githubactions", "cursor", "windsurf", "replit", "codesandbox", "stackblitz", "warp", "raycast", "jetbrains",
  // AI agents
  "anthropic", "googlegemini", "perplexity", "mistralai", "huggingface", "ollama", "githubcopilot", "v0",
  // Sales & support
  "zoho", "helpscout", "livechat",
  // Commerce & finance
  "paypal", "square", "wise", "revolut", "monzo", "brex", "xero", "gusto", "expensify", "coinbase", "razorpay", "lemonsqueezy", "paddle", "gumroad", "woocommerce", "bigcommerce", "etsy",
  // Social & content
  "x", "instagram", "facebook", "threads", "bluesky", "mastodon", "reddit", "tiktok", "pinterest", "snapchat", "medium", "substack", "ghost", "wordpress", "mailchimp", "buffer", "hootsuite", "producthunt",
  // Music & media
  "applemusic", "soundcloud", "youtubemusic", "tidal", "deezer", "audible", "pocketcasts", "overcast", "netflix", "twitch", "vimeo",
  // Travel & life
  "uber", "lyft", "airbnb", "bookingdotcom", "tripadvisor", "expedia", "googlemaps", "waze", "ubereats", "doordash", "deliveroo", "instacart", "swiggy", "zomato", "1password", "bitwarden", "homeassistant", "philipshue", "googlehome", "ifttt", "zapier", "make", "n8n",
];

/** Every mark the heap is dealt from: each one lands at least once */
const MARKS = [...CONNECTOR_MARKS, ...MORE_MARKS];

// The picture for "Already fluent in your tools." (How it works): every connector Waldo has a mark for,
// dropped in from above. The tiles fall, tumble over one another and settle into a heap across the full width
// of the page at the foot of the section, and then they stay: nothing loops, drifts or falls again. There is no
// box round it any more (2026-10-12); the heap lies on the page.
//
// The tiles are real elements (the same marks as the homepage's rows), moved by a small physics world
// (matter-js, loaded only when the stage scrolls into view). Resizing or reduced motion skips the fall and
// shows the settled heap straight away. The layer fills the whole stage (see "Stage pile" in site-pages.css)
// and is read off the stage's own size and bottom padding, so nothing here is sized by hand.

type Tile = { mark: string; scale: number };
type Layout = { width: number; height: number; size: number; count: number; tiles: Tile[] };

const MAX_TILES = 260;
const STEP_MS = 1000 / 60;
// The fall: tiles are let go one after another across this long, so it reads as a pour, not a block
const POUR_MS = 1500;
// Clear room kept between the button and the top of the heap, in px
const HEAP_GAP = 40;

// A shuffled run of every mark, repeated, so the same logo is never next to itself for long and the heap gets
// one of each before any repeat
function dealTiles(): Tile[] {
  const tiles: Tile[] = [];
  while (tiles.length < MAX_TILES) {
    const round = [...MARKS];
    for (let i = round.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [round[i], round[j]] = [round[j], round[i]];
    }
    for (const mark of round) tiles.push({ mark, scale: 0.78 + Math.random() * 0.34 });
  }
  return tiles.slice(0, MAX_TILES);
}

export function ConnectorPile() {
  const layerRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<Tile[] | null>(null);
  const playedRef = useRef(false);
  const [layout, setLayout] = useState<Layout | null>(null);

  // Read the box: its size, and how much room its foot leaves for the heap
  useEffect(() => {
    const layer = layerRef.current;
    const stage = layer?.parentElement;
    if (!layer || !stage) return;

    let timer = 0;
    const measure = () => {
      const { width, height } = stage.getBoundingClientRect();
      const room = Math.max(0, parseFloat(getComputedStyle(stage).paddingBottom) - HEAP_GAP);
      // A tumbled heap fills about 60% of the room it lies in; a tile averages 0.85 of `size` squared. Tiles are sized
      // so every mark fits in the room once; on a phone, where that would make them too small, the heap is a sample
      const area = width * room * 0.6;
      const size = Math.min(56, Math.max(26, Math.sqrt(area / (MARKS.length * 0.85))));
      const count = Math.round(Math.min(MAX_TILES, Math.max(24, area / (size * size * 0.85))));
      tilesRef.current ??= dealTiles();
      const tiles = tilesRef.current;
      setLayout((prev) =>
        prev && Math.abs(prev.width - width) < 2 && Math.abs(prev.height - height) < 2 ? prev : { width, height, size, count, tiles },
      );
    };
    const soon = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(measure, 120);
    };

    measure();
    const observer = new ResizeObserver(soon);
    observer.observe(stage);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // The physics: build the world for this size, let it play once when the box comes into view
  useEffect(() => {
    const layer = layerRef.current;
    const stage = layer?.parentElement;
    if (!layout || !layer || !stage) return;

    let cancelled = false;
    let frame = 0;
    let observer: IntersectionObserver | undefined;
    const els = Array.from(layer.children) as HTMLElement[];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    void import("matter-js").then((mod) => {
      if (cancelled) return;
      const Matter: typeof import("matter-js") = (mod as { default?: typeof import("matter-js") }).default ?? mod;
      const { Engine, Bodies, Body, Composite } = Matter;
      const { width, height, size, count, tiles } = layout;

      const engine = Engine.create({ gravity: { x: 0, y: 1.1, scale: 0.001 }, positionIterations: 8, velocityIterations: 6 });
      const wall = 400;
      // Floor just inside the stage's foot (no box to clip the heap now, so every tile shows whole), a wall each side;
      // no ceiling, the tiles come from above
      Composite.add(engine.world, [
        Bodies.rectangle(width / 2, height + wall / 2 - 2, width + wall * 2, wall, { isStatic: true }),
        Bodies.rectangle(-wall / 2, height / 2 - height, wall, height * 3, { isStatic: true }),
        Bodies.rectangle(width + wall / 2, height / 2 - height, wall, height * 3, { isStatic: true }),
      ]);

      type Drop = { body: Matter.Body; el: HTMLElement; at: number; half: number; added: boolean; still: number };
      const drops: Drop[] = [];
      for (let i = 0; i < Math.min(count, els.length); i++) {
        const s = size * tiles[i].scale;
        const body = Bodies.rectangle(s + Math.random() * (width - s * 2), -s * 1.5 - Math.random() * 70, s, s, {
          chamfer: { radius: s * 0.24, quality: 3 },
          restitution: 0.22,
          friction: 0.55,
          frictionStatic: 0.8,
          frictionAir: 0.012,
          angle: Math.random() * Math.PI * 2,
        });
        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.18);
        Body.setVelocity(body, { x: (Math.random() - 0.5) * 3, y: 2 + Math.random() * 5 });
        drops.push({ body, el: els[i], at: (i / count) * POUR_MS * (0.85 + Math.random() * 0.3), added: false, half: s / 2, still: 0 });
      }

      const paint = () => {
        for (const d of drops) {
          if (!d.added) continue;
          const { x, y } = d.body.position;
          d.el.style.transform = `translate3d(${(x - d.half).toFixed(2)}px, ${(y - d.half).toFixed(2)}px, 0) rotate(${d.body.angle.toFixed(4)}rad)`;
        }
      };

      let clock = 0;
      // Each tile is frozen where it lies as soon as it has been nearly still for a moment. A dense heap never goes
      // fully quiet (the tiles keep trading tiny nudges), so waiting for all of them to stop left the heap shimmering
      // for ten seconds after it had landed. Frozen tiles are still solid: the ones falling on them land on them.
      const FREEZE_FRAMES = 18;
      // One 1/60s step. Returns true once every tile is down and frozen.
      const step = (): boolean => {
        clock += STEP_MS;
        for (const d of drops) {
          if (!d.added && clock >= d.at) {
            d.added = true;
            d.el.style.visibility = "visible";
            Composite.add(engine.world, d.body);
          }
        }
        Engine.update(engine, STEP_MS);
        let live = 0;
        for (const d of drops) {
          if (d.body.isStatic) continue;
          live++;
          if (!d.added) continue;
          const nearlyStill = d.body.speed < 0.45 && d.body.angularSpeed < 0.015;
          d.still = nearlyStill ? d.still + 1 : 0;
          if (d.still > FREEZE_FRAMES && clock > d.at + 400) {
            Body.setStatic(d.body, true);
            live--;
          }
        }
        if (live === 0) return true;
        // Settled regardless after a few seconds: freeze whatever is left, wherever it is
        if (clock > POUR_MS + 4500) {
          for (const d of drops) if (!d.body.isStatic) Body.setStatic(d.body, true);
          return true;
        }
        return false;
      };

      const settle = () => {
        let guard = 0;
        while (!step() && guard++ < 1500);
        paint();
      };

      const play = () => {
        playedRef.current = true;
        let last = performance.now();
        let acc = 0;
        const tick = (now: number) => {
          acc += Math.min(now - last, 50);
          last = now;
          let finished = false;
          while (acc >= STEP_MS && !finished) {
            finished = step();
            acc -= STEP_MS;
          }
          paint();
          // Finished: the tiles stay exactly where they landed; the loop ends and nothing moves again
          if (!finished) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      };

      if (reduceMotion || playedRef.current || typeof IntersectionObserver === "undefined") {
        settle();
        return;
      }
      // Starts when most of the box is on screen, so the drop is seen from the top
      const ratio = Math.min(0.5, (window.innerHeight * 0.6) / Math.max(1, height));
      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          observer?.disconnect();
          play();
        },
        { threshold: ratio },
      );
      observer.observe(stage);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [layout]);

  return (
    <div ref={layerRef} className="site-pile" aria-hidden="true" data-visual="Every tool Waldo works with, dropped in a heap at the foot of the box">
      {layout
        ? layout.tiles.slice(0, layout.count).map((tile, i) => {
            const s = layout.size * tile.scale;
            return (
              <span key={`${i}-${tile.mark}`} className="site-pile-tile" style={{ "--s": `${s}px` } as CSSProperties}>
                <Image src={`/assets/connectors/${tile.mark}.svg`} alt="" width={40} height={40} unoptimized draggable={false} />
              </span>
            );
          })
        : null}
    </div>
  );
}
