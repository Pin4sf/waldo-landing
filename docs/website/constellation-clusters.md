# The constellation, rebuilt from Suyash's design

Status: **Built, 2026-10-08** (branch `constellation-clusters`). Logic agreed with Suyash first. Built from Suyash's design (dark map, Tuesday Crash open in the middle, the other five constellations as clusters of spots round the edge), with Obsidian's graph view as the reference for how clusters form and how dots are sized.

Where it lives: "Longer he learns, smarter he gets." on the homepage (`<MemoryMap>` in `app/page.tsx`). Today's version copies andrewtrousdale.com (`andrew-trousdale-notes.md`): Waldo as a root node, hexagons, a family tree. This replaces it.

## What the design shows

One dark stage. Two states of a constellation live on it at once:

- **One constellation is open** (Tuesday Crash in the design). Its hub is a big white dot in the middle with its name in a pill under it. Its spots spread out across a faint lighter disc behind it, each a white dot with a pill: a coloured signal icon and a short line in Waldo's words ("Stress shot up", "Sleep Compromised", "HRV Dipped", "Weight Intensified", "Form Crash", "Excess Caffeine"). Thin grey **curved** lines join the hub to each spot, and some spots to each other (Stress shot up to Excess Caffeine, Stress shot up to Sleep Compromised). A few lines run off the edge of the stage.
- **The other five are closed** (Cognitive Stress, Meals, Sleep Pattern, Work Flow, Training Style). Each is a tight clump of grey dots, one big dot in the middle and smaller ones round it, with the constellation's name in a larger pill beside it. A few dots in a clump are **white**. Training Style has the most dots, so the biggest clump.
- **Small unlabelled dots** sit near the open constellation: its minor spots (see the rules below).

Pills (in the dark drawing): dark fill a step lighter than the stage, a hairline border, fully round. Constellation pills are larger and carry the Waldo spark icon. Spot pills are smaller and carry the signal's own coloured icon.

## Suyash's rules (2026-10-08, confirms and corrects the reading above)

- **Light mode.** The design is drawn dark; the site builds it light: warm white stage (#FAFAF8), dots and lines in near-black (#1A1A1A). What is white in the picture is black on the site.
- **Big pills are constellations, small pills are spots.**
- **Three dot sizes, no more:**
  1. **Constellation** — the biggest dot. The hub of a clump, or the middle of the open one.
  2. **Key spot** — a spot that is responsible for the constellation. Medium dot, gets a pill with its icon when open.
  3. **Minor spot** — also a contributor, but less relevant or with less data. Small dot, no pill. It is there to say "this counts too".
- **Opening.** Clicking a constellation (Tuesday Crash) opens its clump into the big circle: its key spots fan out with pills and lines, its minor spots sit round them as small dots.
- **Contributors from other constellations** are shown at full strength (black, high opacity) inside their own clumps; everything that does not contribute stays faint grey. For Tuesday Crash these are spots in **Training Style, Sleep Pattern and Cognitive Stress**. Meals and Work Flow do not contribute, so they stay fully faint.
- **Tuesday Crash's key spots:** Stress shot up, Sleep Compromised, HRV Dipped, Weight Intensified, Form Crash, Excess Caffeine.

## What each thing means

| In the design | What it is | Data |
|---|---|---|
| Biggest dot + big pill | A constellation | `MAP_PATTERNS` |
| Medium dot + small pill (open) | A key spot of the open constellation | `SPOTS_OF[open]`, `tier: "key"` |
| Small unlabelled dots near the open one | Its minor spots | `SPOTS_OF[open]`, `tier: "minor"` |
| Curved line, hub to key spot | "This spot makes up this pattern" | pattern → spot |
| Curved line, key spot to key spot | "These two turn up together" | new pairs inside the pattern |
| Line off the edge | A key spot reaching a contributor in another constellation | `WITH` across patterns |
| Clump | A closed constellation: biggest dot in the middle, its key spots (medium) and minor spots (small) round it | `SPOTS_OF[id]` |
| **Dark dot in a clump** | A spot of that constellation that contributes to the open one | new: `CONTRIBUTES[open]` |
| Faint dot in a clump | Does not contribute to the open one | — |
| Faint circle | Where the open constellation lives; moves with it | — |

So the dark dots in other clumps show, at a glance, which other patterns feed the open one. That is the "smarter he gets" story: patterns are not separate.

## Sizing (three tiers, Obsidian's packing)

Size is not continuous: it is one of three tiers, so the picture stays calm and readable.

```
constellation hub   closed 18px across, open 28px across
key spot            closed 10px,         open 14px
minor spot          6px
```

What Obsidian gives us is the **packing**: bigger dots push harder and keep more room, so a clump with more spots grows bigger on its own (Training Style is the biggest because it has the most spots). Whether a spot is key or minor is set in the data, from how much it contributes; no formula on screen.

## How it moves (from Obsidian, on our own simulation)

`see/force-sim.ts` already has link, charge and centre. It gets:

| Force | Rule |
|---|---|
| link, inside a clump | Short (radius-based, about 14 to 34px) and strong (0.6): spots pack round their hub |
| link, open hub to its spots | Long (160 to 260px on desktop) and soft: the spots fan out across the disc |
| link, across constellations | Very weak (0.02): only bends things a little towards each other |
| charge | Grows with radius: a big dot clears more room |
| collide (new) | Dots never overlap: radius + 2px clear. Pills are boxes and also never overlap |
| anchor (new) | Each hub is pulled to a home spot: the open one to the middle, closed ones to places round the edge (from the design: top left, left, bottom left, right, bottom right) |
| drift (new) | A very small random nudge every few seconds, so it breathes and never goes dead still |

Lines are drawn as soft curves, not straight: each bends to one side by about a fifth of its length, all the same way, so the open constellation looks like a turning pinwheel (as in the design).

## How it plays: "the longer he learns"

Once, when the section comes into view (about 7 seconds), with a small Week counter in a corner:

1. **Weeks 1 to 5:** faint dots appear across the stage, one by one, at the week they were first seen.
2. **Weeks 5 to 14:** dots drift towards each other and clump. When a pattern reaches its `since` week, its hub swells in the middle of its clump and its name pill fades in.
3. **End:** the Tuesday Crash opens: the disc fades up, its hub moves to the middle, its spots fan out with their pills, and the curves draw themselves in. The contributing dots in Training Style, Sleep Pattern and Cognitive Stress turn black.

Reduced motion: shows the end state, nothing moves.

## What you can do

- **Click a closed constellation** (its pill or its clump): it becomes the open one. The open one contracts, the two swap places while faded out, and the chosen one opens in the middle (see "As built"). The contributing dots change to the new one's.
- **Hover a spot or a pill:** it and its lines stay bright, everything else dims to about 30% (Obsidian's hover).
- **Click an open spot:** its pill grows into a short note: what he saw, and what he does about it (from `text` and the pattern's `acts`). Replaces today's side panel, which would cover the map.
- **Drag** any dot: neighbours follow on their springs.
- **Phone:** the open constellation fills the width; closed ones become a row of pills under it you can tap.

## Changes to the code

- `memory-data.ts`: add `tier` ("key" or "minor") to every spot; add minor spots so each clump looks like the design; add `CONTRIBUTES` (which spots in other constellations feed each one; for Tuesday Crash: Training Style, Sleep Pattern, Cognitive Stress); add the spot-to-spot pairs inside each pattern; the key spots' pill text ("Stress shot up", "HRV Dipped") becomes the `short` line.
- `memory-graph.ts`: rewritten. No root, no rings. Returns every hub and spot with its tier (constellation, key, minor), its state (open, closed, contributing, faint) and its links.
- `force-sim.ts`: gains per-link strength, collide, anchor and drift.
- `memory-map.tsx` and `memory-map.css`: light stage (warm white, black dots), the disc, curved lines, pills with icons, open and close by click, hover dimming, the growth on first view. The side panel goes.
- Icons: the six signal icons in the design (stress wave, bed, heart, bottle, head, fork and knife) and the Waldo spark, as small inline SVGs.

## Questions still open

None blocking. Assumed: the small unlabelled dots near the open constellation are its minor spots (tier 3), not decoration; Load moves to a minor spot of Tuesday Crash, since it is not among the six key spots.

## As built (2026-10-08)

- **The globe** (Suyash's addition, after composio.dev/for-you): the open constellation sits inside a wireframe globe: five latitudes and six longitudes plus its outline, hairlines at about 5% ink, the half round the back at 2% (a dotted globe and a solid sphere were tried and dropped). It revolves like a planet, once every 40 seconds, round its upright axis, leaning slightly towards the viewer. Its spots sit on the surface, spread from high to low latitudes, so they sweep across the front and go round the back, where they are smaller and fainter and their names hide (and cannot be clicked) until they come round again. It pauses while you point at something or a note is open; dragging the empty stage spins it by hand, with a little momentum.
- **Changing over** (Suyash, 2026-10-08, drawn on a screenshot; after trying a sliding map, a cross-fade, a flat swap and a pop swap, then asked for it smoother and more alive): one movement, about one and a half seconds, with nothing waiting for anything:
  - The chosen one and the one in the middle trade places in straight lines, on springs with a touch of overshoot (so they speed up, pass their mark slightly and settle); their dots trail after them.
  - The open one closes on its way out, its spots spiralling in and names going first; its dot pulses as it closes.
  - **One globe**: it never disappears and never moves from the middle. It closes in all the way to nothing with everything else, then springs open round the new one.
  - The chosen one starts opening when it is about 60% of the way to the middle, so the two overlap: its spots ripple out a little past the sphere and back, names pop in as each arrives, lines draw out with them (and draw back in as the old one closes).
  - The other clumps are drawn in like gravity (refined on request): the nearest react first, each is pulled 17% of the way to the middle and curls about 5° round it, its dots squeeze together; they hold for a moment, then let go and spring back out past their places with a small bounce before settling (about 1.3 seconds).
  - The whole map pulls back 3% and settles forward again, like a camera breathing.
  - Every spring is worked out in small fixed steps, and every size, name and line is set on the same clock, so it moves the same on every screen and nothing runs a beat behind.
- Clumps keep clear of the open sphere, stay inside the stage with room for their names, and are moved apart if two land on top of each other. A name hangs to the side of its clump only if nothing is beside it, otherwise under it.
- **Movement, after Obsidian** (Suyash's screen recording), calmed down on request: every dot is on a well-damped spring to its place, each a touch looser or stiffer than the next, so a clump trails a little behind what it hangs on and settles without wobbling. At rest the clumps drift by a third of a pixel, barely visible; dots no longer bounce as they appear. Dots in a clump push each other apart when they bunch. Dragging a constellation pulls its whole clump after it; dragging a named spot tugs its constellation after it.
- **Lines, after Obsidian**: straight hairlines at about 9% ink (5% for lines out to other clumps), fainter still to spots round the back of the globe. They only show clearly (about 32%) for what you point at.
- **Pills** are see-through and frosted (about 62% white with a blur), so lines and dots show faintly behind them.
- Sizes: constellation 10px closed / 15px open, key spot 4.5 / 6.5, minor 2.6 / 3.2 (radius). Clumps shrink to 80% under 1000px wide and 62% on a phone.
- Spots of a closed constellation have no names; only the open one's key spots are named.
- **Names glide, never jump** (Suyash, 2026-10-08): where a name hangs off its dot is a direction eased on every frame, not a fixed side. A spot's name follows it round the globe, always pointing away from the middle; a constellation's name eases from one side of its clump to another when it has to move.
