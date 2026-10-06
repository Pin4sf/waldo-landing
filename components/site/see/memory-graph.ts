// Which nodes and links the web shows, for "Longer he learns, smarter he gets." (components/site/memory-map.tsx).
// The rule is the one andrewtrousdale.com uses: the web starts as the main node with the first ring round it, and
// choosing a node narrows it to the way back to the main node, the node itself, what it is made of and what turns up
// with it, which are drawn greyer and dotted. Choosing the main node, or the node you are on, goes back.
import { MAP_PATTERNS, MAP_SPOTS, NEAR_OF, PATTERN_BY_ID, SPOTS_OF, SPOT_BY_ID, WITH_OF } from "./memory-data";

export const ROOT = "waldo";

export type Shape = "root" | "hexagon" | "circle" | "square" | "triangle";
export type GNode = {
  id: string;
  shape: Shape;
  title: string;
  /** The small grey line under the name: shown for the main node, the one you are on, and what you hover */
  summary: string;
  /** The number inside a hexagon */
  number?: number;
  /** Greyer: it turns up with what you are looking at, but is not part of it */
  connected?: boolean;
};
export type GLink = { id: string; source: string; target: string; kind: "angled" | "solid" | "dashed" | "dotted"; distance: number };

/** What kind of thing a spot is, which is its shape: what he reads from your body, from your work, from your habits */
export const SPOT_KIND: Record<string, { name: string; shape: Shape }> = {
  sleep: { name: "Body", shape: "circle" },
  hrv: { name: "Body", shape: "circle" },
  load: { name: "Body", shape: "circle" },
  weight: { name: "Body", shape: "circle" },
  stress: { name: "Focus", shape: "square" },
  form: { name: "Focus", shape: "square" },
  caffeine: { name: "Habit", shape: "triangle" },
};

/** The spots in the first ring: two or three for each constellation */
const FIRST_RING = new Set([
  "stress", "sleep", "form",
  "cog-run", "cog-3pm",
  "sp-bed", "sp-screen",
  "ml-breakfast", "ml-coffee",
  "fl-best", "fl-calls",
  "tr-hard", "tr-easy",
]);
/** Greyer spots on the edge of the first ring: they turn up with something in it */
const EDGE = new Set(["cog-inbox", "tr-evening", "ml-dinner"]);

const COUNT = MAP_SPOTS.length;

export const rootNode: GNode = { id: ROOT, shape: "root", title: "Waldo", summary: "4 months in" };
export const patternNode = (id: string, connected = false): GNode => ({
  id,
  shape: "hexagon",
  title: PATTERN_BY_ID[id].label,
  summary: `${SPOTS_OF[id].length} spots · week ${PATTERN_BY_ID[id].since}`,
  number: MAP_PATTERNS.findIndex((p) => p.id === id) + 1,
  connected,
});
export const spotNode = (id: string, connected = false): GNode => {
  const s = SPOT_BY_ID[id];
  const kind = SPOT_KIND[s.signal];
  return { id, shape: kind.shape, title: s.label, summary: `${kind.name} · week ${s.week}`, connected };
};
export const nodeById = (id: string): GNode => (id === ROOT ? rootNode : id in PATTERN_BY_ID ? patternNode(id) : spotNode(id));

const SPOKE = 168;
const LEG = 92;
const FAR = 150;

const linkOfSpot = (parent: string, id: string): GLink => ({
  id: `${parent}>${id}`,
  source: parent,
  target: id,
  kind: SPOT_KIND[SPOT_BY_ID[id].signal].shape === "triangle" ? "dashed" : "solid",
  distance: LEG,
});
const linkOfRoot = (id: string): GLink => ({ id: `${ROOT}>${id}`, source: ROOT, target: id, kind: "angled", distance: SPOKE });
const dotted = (a: string, b: string): GLink => ({ id: `${a}~${b}`, source: a, target: b, kind: "dotted", distance: FAR });

export function visible(current: string | null): { nodes: GNode[]; links: GLink[] } {
  const nodes = new Map<string, GNode>([[ROOT, rootNode]]);
  const links: GLink[] = [];
  const add = (n: GNode) => nodes.has(n.id) || nodes.set(n.id, n);

  if (!current || current === ROOT) {
    for (const p of MAP_PATTERNS) {
      add(patternNode(p.id));
      links.push(linkOfRoot(p.id));
    }
    for (const s of MAP_SPOTS) {
      if (!FIRST_RING.has(s.id)) continue;
      add(spotNode(s.id));
      links.push(linkOfSpot(s.pattern, s.id));
    }
    for (const id of EDGE) add(spotNode(id, true));
  } else if (current in PATTERN_BY_ID) {
    add(patternNode(current));
    links.push(linkOfRoot(current));
    for (const s of SPOTS_OF[current]) {
      add(spotNode(s.id));
      links.push(linkOfSpot(current, s.id));
    }
    for (const id of NEAR_OF[current] ?? []) {
      add(patternNode(id, true));
      links.push(dotted(current, id));
    }
  } else {
    const parent = SPOT_BY_ID[current].pattern;
    add(patternNode(parent));
    links.push(linkOfRoot(parent));
    add(spotNode(current));
    links.push(linkOfSpot(parent, current));
    for (const id of WITH_OF[current] ?? []) {
      add(spotNode(id, true));
      links.push(dotted(current, id));
    }
  }

  if (!current || current === ROOT) {
    // an edge spot hangs on the first thing it turns up with
    for (const id of EDGE) {
      if (links.some((l) => l.kind === "dotted" && (l.source === id || l.target === id))) continue;
      const pair = (WITH_OF[id] ?? []).find((o) => nodes.has(o));
      if (pair) links.push(dotted(id, pair));
    }
  }
  return { nodes: [...nodes.values()], links };
}

export const TOTAL_SPOTS = COUNT;
