# andrewtrousdale.com: how his page works, and what we took

Status: **Reference, written 2026-10-05.** Suyash asked for his page to be read from the start, code to code, and for the interactions to be copied: the main node, everything else round it, and everything moves when you drag the main node.

His live site was down (a 503, "the server is paused") on 2026-10-05, so this was read from the Internet Archive's copy of 2025-12-21: the page (`index.html`), `assets/js/app.min.js` (89 KB, readable once formatted) and `assets/css/app.css`. Nothing was copied word for word: his code and artwork are his. We took the way it works and wrote our own.

## What his page is

One full-window page on a pale grey (`rgb(245,246,242)`), with a web of nodes in the middle and, when you choose one, a panel on the right. The web is drawn by one script:

- **The main node** is his name, a small orange shape that turns once every 10 seconds. Everything else is joined to it.
- **The nodes** are plain `div`s, absolutely placed, 36px, with a shape drawn inside by type: a hexagon with a number for a "path" (24px), a square for research (20px), a triangle for an initiative (26px), a circle for an artifact (20px). Outlines only, 1px, in `#111`. A chosen node is filled orange with a ×. A node that only turns up with the one you chose is grey (`#888`).
- **The names** sit under each node in 13px, with the page's colour behind them so a line never runs through a word. Under the name, in 11px grey capitals, is a second line that fades in on hover, and stays for the main node and the chosen one. Names that you have visited are struck through.
- **The lines** are 1px `#111` paths in an SVG. Plain straight lines for most; a "dog-leg" for the numbered hexagons (out a third of the way and 30px up or down, a level run, then in: `createAngledPath`); dashed (5, 5) to initiatives; dotted grey (2px, 2 on 10 off) to things that only turn up together.
- **Type** is one grotesque (Brunswick Grotesque), 13px for names, 11px capitals for the grey lines.

## How it moves

It is d3-force, with three forces and these numbers:

| Force | What it does | His numbers |
|---|---|---|
| link | every link is a spring pulling its ends to a rest distance, shared by how many links each end has | distance 70 (30 on a phone), strength 0.1 |
| charge | every node pushes every other away, harder when close | strength -400, only between 10 and 300 apart |
| centre | after the others, every node is shifted so the middle of all of them sits on one point | the middle of the map area (a little to the left when the panel is open) |

Each tick: alpha moves towards its target, the forces add to each node's velocity, every node moves by its velocity and the velocity is cut to 0.6 of itself. Alpha runs down to 0.001 and the web stops.

**Dragging** is d3-drag on each node: on pointer down the node's `fx`/`fy` are set to where it is and the simulation is warmed up (alpha target 0.3); while dragging `fx`/`fy` follow the pointer; on release they are cleared and the target goes back to 0. Because the node is held and the links pull on their neighbours, dragging the main node drags everyone, and because of the centre force the web stretches rather than carries away.

**Choosing a node** (`filterNodes`) narrows the web to: the way back to the main node, the node, its children, and its "connected" nodes (greyer). The simulation is given the new nodes and starts again; the new ones fade in 100 ms apart. Choosing the main node, or the one you are on, goes back. The panel (title, one line, a description, tabs including "Connections", a list you can follow) is filled from the same data.

He also has a date slider that adds nodes by year, a play button, a wheel handler that moves the slider, a gallery for pictures, and a keyboard shortcut (`e`) that shows everything. We took none of those.

## What we took, and what we changed

| His | Ours |
|---|---|
| The main node is a person's name | The main node is Waldo: the orange Waldo mark, turning slowly, "4 months in" under it |
| Paths (hexagons, numbered) | The six constellations, numbered 1 to 6, joined to Waldo by his dog-leg line |
| Research, initiatives, artifacts (square, triangle, circle) | Spots, by what they are about: body (circle), focus (square), habit (triangle, dashed line) |
| Connected nodes: grey, dotted | Spots that turn up with the one you chose, and the constellations near the one you chose |
| d3-force: link 0.1 / charge -400 / centre | The same three forces, with the same rules, written in `see/force-sim.ts` (no library). Our distances and charge are tuned to the window: -300 and 62 to 150px on a desktop, -200 on a phone |
| Full window, no box | The same: the stage is the full width of the window, with a soft fade only at the top and bottom |
| New nodes fade in one by one | The same, 70 ms apart; lines a little after |
| Panel with tabs on the right | A plain white panel on the right: what it is, what he does about it, connections. On a phone it opens under the web |
| He starts new nodes at the middle | Ours start beside what they hang on, fanned out away from Waldo, so the web opens like a tree and settles without tangling |
| Nodes can leave the window | Ours stay inside the stage (a margin of 36px), so none is lost |

## Where it is in the code

- `components/site/memory-map.tsx`: the component (shapes, drag, choosing, the panel, arriving).
- `components/site/see/force-sim.ts`: the three forces and the clock.
- `components/site/see/memory-graph.ts`: which nodes and links are shown for each choice, and how a spot gets its shape.
- `components/site/see/memory-data.ts`: the names, words and links (all invented).
- `components/site/memory-map.css`: the look.
