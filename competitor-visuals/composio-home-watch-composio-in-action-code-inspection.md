# Composio Homepage - Watch Composio In Action Code Inspection

Source inspected: https://composio.dev
Section inspected: hero sub-visual shown as `Watch Composio In Action`
Inspection date: 2026-06-03

This is a code-oriented scrape of the dark interactive demo section shown in the screenshot. The section is not a standalone homepage section in the React source. It is a large-screen-only visual embedded inside the homepage hero, and it is driven by a hydrated scenario timeline.

---

## Source Location

Downloaded artifacts:

- HTML payload: `/tmp/composio-home.html`
- Extracted section HTML: `/tmp/composio-home-action-section.html`
- Hydrated page chunk: `/tmp/composio-page.js`

Relevant client chunk:

```text
/_next/static/chunks/app/page-4bf73159d692a577.js
```

The screenshot state is a hydrated runtime state. The raw server HTML starts on the first scenario and first skin:

- Scenario: Slack digest
- Skin: Claude Cowork
- Model: Sonnet 4.6

The screenshot maps to the second scenario and second skin:

- Scenario: export Figma assets to Google Drive
- Skin: ChatGPT Codex
- Model: GPT-4.1

---

## Large-Screen Visibility Contract

The inspected visual only renders as visible at Tailwind `lg` and above.

```html
<div
  class="relative mt-6 hidden h-[620px] w-full max-w-page overflow-hidden border-white/[0.08] border-t lg:block">
  ...
</div>

<div class="hidden w-full max-w-page border-white/[0.08] border-b px-[6.4%] pb-16 lg:block">
  ...
</div>
```

Breakpoint behavior:

| Width | Section display | Behavior |
|---:|---|---|
| `1920px` | `block` | Stage is centered at fixed `1240px` max width. |
| `1440px` | `block` | Stage is centered at fixed `1240px` max width. |
| `1024px` | `block` | Stage compresses to `1024px`; panels scale by percentage. |
| `1023px` | `none` | DOM exists, but all measured rects collapse to `0`. |
| `390px` | `none` | This exact visual is hidden. Mobile uses the separate hero tunnel/art layer. |

So the layout does not reflow into a mobile version. It is deliberately desktop-only and switches off below `lg`.

---

## Measured Geometry

Live measurements after hydration:

| Viewport | Stage x | Stage size | Side panel width | Central card width | Central card height |
|---:|---:|---:|---:|---:|---:|
| `1920 x 1080` | `340` | `1240 x 620` | `340` | `440` | `516` |
| `1440 x 1000` | `100` | `1240 x 620` | `340` | `440` | `516` |
| `1024 x 900` | `0` | `1024 x 620` | `281` | `363` | `516` |

The stage is capped by `max-w-page`. In Composio's token system this resolves to a `1240px` container. At the `lg` minimum, the entire composition scales horizontally because widths are percentage-based, but the vertical heights remain fixed.

Core absolute positioning:

| Element | Width | Left | Top | Height |
|---|---:|---:|---:|---:|
| CTA tile | `27.4%` | `13.7%` | `70%` | auto, measured `100px` |
| Left search panel | `27.4%` | `13.7%` | `7%` | `360px` |
| Central chat card | `35.5%` | `50%` | `7%` | content-driven, measured `516-517px` |
| Right connections panel | `27.4%` | `86.3%` | `7%` | `174px` |
| Right execute panel | `27.4%` | `86.3%` | `38%` | `174px` |
| Right agent config | `27.4%` | `86.3%` | `70%` | auto, measured `144px` |
| Bottom sandbox | max page width | centered | below stage | rail height `110px` inside |

The `left` coordinates are chosen so side panels sit flush with the stage edges:

```js
const panelWidth = "27.4%";
const positions = {
  search: { x: 13.7, y: 7 },
  connections: { x: 86.3, y: 7 },
  execute: { x: 86.3, y: 38 },
};
const chatPosition = { x: 50, y: 7 };
```

Every major absolute child uses `transform: translateX(-50%)`, so `left` is a center coordinate rather than a left edge.

---

## Section DOM Contract

Reduced DOM skeleton:

```html
<div class="relative mt-6 hidden h-[620px] w-full max-w-page overflow-hidden border-white/[0.08] border-t lg:block">
  <div class="absolute z-20 flex flex-col border border-white/[0.08] bg-background/50 p-4 font-mono text-xs">
    <h2>Watch Composio In Action</h2>
    <a data-utm-placement="hero-add-to-agent">ADD TO MY AGENT</a>
  </div>

  <svg class="pointer-events-none absolute inset-0 z-[1] h-full w-full" viewBox="0 0 1240 620">
    <!-- hydrated connector paths -->
  </svg>

  <motion.div class="absolute z-10 flex flex-col overflow-hidden border shadow-2xl">
    <!-- chat skin -->
  </motion.div>

  <SearchToolsPanel />
  <ManageConnectionsPanel />
  <ExecuteToolPanel />
  <AgentConfigPanel />
</div>

<div class="hidden w-full max-w-page border-white/[0.08] border-b px-[6.4%] pb-16 lg:block">
  <SandboxPanel />
</div>
```

Layering:

| Layer | z-index | Purpose |
|---|---:|---|
| SVG connector rail | `z-[1]` | Animated white lines between chat and side modules. |
| Side panels | `z-[5]` | Supporting system modules. |
| Central chat card | `z-10` | Main focal object. |
| CTA tile | `z-20` | Foreground callout on lower-left. |

---

## Visual Style Tokens

The section is under a `.dark` hero root with `bg-background`. The visual language is terminal-like, technical, and dim until active.

Main colors:

| Use | Value |
|---|---|
| Claude card background | `#1a1a1a` |
| ChatGPT card background | `#212121` |
| Custom agent card background | `#060d18` |
| Claude accent | `#c4956a` |
| ChatGPT accent | `#10a37f` |
| Custom accent | `#51A2FF` |
| Inactive panel border | `rgba(255,255,255,0.08)` |
| Active panel border | `rgba(255,255,255,0.25)` |
| Active panel shadow | `0 0 40px rgba(0,0,0,0.5)` |
| Connector line | `#ffffff`, 2px |
| Connector glow | `#ffffff`, 8px, opacity `0.15` |

Font usage:

- Panels use `font-mono text-xs`.
- Chat card body uses small sans text for messages.
- Panel labels are uppercase, `text-[10px]`, `tracking-wider`.
- Chat header label is `text-[13px]`.
- Chat message body is `14-15px`.

---

## Scenario Data Model

The component holds three scenario objects. Each scenario contains:

```ts
type Scenario = {
  chatItems: Array<
    | { type: "user"; content: string }
    | { type: "tool"; name: string }
    | { type: "assistant"; content: string }
  >;
  searchResult: {
    highlightSlug: string;
    highlightName: string;
    query: string;
    tools: Array<{
      name: string;
      description: string;
      appSlug: string;
      highlighted?: boolean;
    }>;
    plan: string[];
    pitfalls: string[];
  };
  sandboxInstances: Array<{
    task: string;
    code: string;
    result: string;
  }>;
  executeResult: {
    tool: string;
    params: Array<{ key: string; value: string }>;
    status: string;
  };
  timeline: Array<{
    items: number[];
    activeTools: string[];
    thinking: boolean;
    delay: number;
  }>;
};
```

Scenario list:

| Scenario index | User prompt | Highlight app | Execute tool |
|---:|---|---|---|
| `0` | Summarize Slack from last 48 hours and send digest | `slack` | `SLACK_SEND_MESSAGE` |
| `1` | Download all 250 SVGs from Figma and upload to Google Drive | `figma` | `GOOGLEDRIVE_SHARE_FOLDER` |
| `2` | Triage open Sentry errors and create Linear issues for P0s | `sentry` | `LINEAR_CREATE_ISSUE` |

The screenshot shows scenario index `1`, with the Figma/Google Drive search result:

```js
{
  highlightSlug: "figma",
  query: "export figma assets and upload to drive",
  tools: [
    { name: "FIGMA_GET_FILE_NODES", appSlug: "figma", highlighted: true },
    { name: "FIGMA_EXPORT_ASSETS", appSlug: "figma", highlighted: true },
    { name: "GOOGLEDRIVE_UPLOAD_FILE", appSlug: "googledrive", highlighted: true }
  ],
  plan: [
    "List all component nodes",
    "Batch export as SVG",
    "Upload to Drive folder"
  ],
  pitfalls: [
    "Figma API rate limit: 30 req/min",
    "Max 10MB per file upload"
  ]
}
```

---

## Chat Skin Data Model

The visual rotates through three skins. Scenario index and skin index are tied through the same counter:

```js
const skin = skins[scenarioIndex % skins.length];
const scenario = scenarios[scenarioIndex % scenarios.length];
```

Skin table:

| Index | Header | Logo | Background | Input | Accent | Radius | Thinking indicator | Config |
|---:|---|---|---|---|---|---:|---|---|
| `0` | Claude Cowork | `/images/clients/claude.svg` | `#1a1a1a` | `#2a2a2a` | `#c4956a` | `28px` | logo | Anthropic / `claude-sonnet-4-6` |
| `1` | ChatGPT Codex | `/images/clients/chatgpt.png` inverted | `#212121` | `#2f2f2f` | `#10a37f` | `16px` | three dots | OpenAI / `gpt-4.1` |
| `2` | Your AI Agent | generated circle | `#060d18` | `#132038` | `#51A2FF` | `28px` | three dots | Custom / `llama-3.3-70b` |

Central card motion:

```js
animate={{
  opacity: isVisible ? 1 : 0.5,
  scale: isVisible ? 1 : 0.98,
  x: "-50%",
  y: 0,
}}
initial={
  scenarioIndex !== 0 || isVisible
    ? { opacity: 0, x: "-50%", y: 40 }
    : { opacity: 0.5, scale: 0.98, x: "-50%", y: 0 }
}
exit={{ opacity: 0, y: -40, transition: { duration: 0.35, ease: "easeIn" } }}
transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
```

Notes:

- The card enters from `y: 40`.
- It exits upward at `y: -40`.
- Inactive/not-yet-visible state is dimmed to `opacity: 0.5` and `scale: 0.98`.
- Active state uses skin-specific border color.

---

## Timeline And Motion Logic

Visibility is controlled by an `IntersectionObserver` on the desktop visual:

```js
const observer = new IntersectionObserver(
  ([entry]) => setIsVisible(Boolean(entry?.isIntersecting)),
  { rootMargin: "0px 0px -20% 0px" }
);
```

The timeline state machine uses:

- `scenarioIndex`
- `stepIndex`, initialized to `-1`
- `chatItems`
- `isThinking`
- `activeTools`
- `completedTools`

Reduced logic:

```js
useEffect(() => {
  const scenario = scenarios[scenarioIndex % scenarios.length];
  const timeline = scenario.timeline;

  if (stepIndex === -1) {
    setActiveTools(new Set());
    setCompletedTools(new Set());
    setThinking(false);
    setChatItems(timeline[0].items.map(i => scenario.chatItems[i]));

    if (!isVisible) return;

    const startDelay = scenarioIndex === 0 ? 100 : 650;
    const timer = setTimeout(() => setStepIndex(0), startDelay);
    return () => clearTimeout(timer);
  }

  if (!isVisible) return;

  if (stepIndex >= timeline.length) {
    setScenarioIndex(i => i + 1);
    setStepIndex(-1);
    return;
  }

  const step = timeline[stepIndex];
  setChatItems(step.items.map(i => scenario.chatItems[i]));
  setThinking(step.thinking);

  if (step.activeTools.length > 0) {
    const activeTimer = setTimeout(
      () => setActiveTools(new Set(step.activeTools)),
      600
    );

    const completeTimer = setTimeout(() => {
      setCompletedTools(prev => new Set([...prev, ...step.activeTools]));
      setStepIndex(i => i + 1);
    }, step.delay);

    return () => {
      clearTimeout(activeTimer);
      clearTimeout(completeTimer);
    };
  }

  setActiveTools(new Set());
  const timer = setTimeout(() => setStepIndex(i => i + 1), step.delay);
  return () => clearTimeout(timer);
}, [stepIndex, scenarioIndex, isVisible]);
```

Timeline used by every scenario:

| Step | Chat item indexes | Active tools | Thinking | Delay |
|---:|---|---|---|---:|
| `0` | `[0]` | `[]` | false | `950ms` |
| `1` | `[0]` | `[]` | true | `650ms` |
| `2` | `[0,1]` | `["search","connections"]` | false | `2800ms` |
| `3` | `[0,1,2]` | `["sandbox"]` | false | `3200ms` |
| `4` | `[0,1,2,3]` | `[]` | false | `1200ms` |
| `5` | `[0,1,2,3,4]` | `["execute"]` | false | `1600ms` |
| `6` | `[0,1,2,3,4,5]` | `[]` | false | `2400ms` |

Full cycle duration after the initial start delay is about `12.8s` per scenario. Scenario changes add a `650ms` restart delay for non-first scenarios.

---

## Connector Line Logic

The SVG viewBox is fixed:

```html
<svg viewBox="0 0 1240 620" preserveAspectRatio="none">
```

Connector paths:

```js
const connectorPaths = {
  search: "M 400 180 L 340 180",
  connections: "M 840 140 L 900 140",
  execute: "M 840 310 L 900 310",
  sandbox: "M 620 500 L 620 620"
};
```

Each active connector renders two Framer Motion paths:

```js
<motion.path
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  exit={{ opacity: 0, transition: { duration: 0.3 } }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  stroke="#ffffff"
  strokeWidth={8}
  strokeOpacity={0.15}
/>

<motion.path
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  exit={{ opacity: 0, transition: { duration: 0.3 } }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  stroke="#ffffff"
  strokeWidth={2}
/>
```

The glow path is underneath the crisp path. This produces the bright connector seen in the screenshot.

---

## Chat Message Rendering

Chat content is rendered in a scrollable column:

```html
<div class="scrollbar-none flex h-[380px] flex-col gap-4 overflow-y-auto px-5 pt-5 pb-3">
  ...
</div>
```

It auto-scrolls to the bottom whenever the chat item count changes:

```js
useEffect(() => {
  ref.current?.scrollTo({
    top: ref.current.scrollHeight,
    behavior: "smooth",
  });
}, [items.length]);
```

Message types:

| Type | Layout |
|---|---|
| `user` | Right-aligned bubble, max width `85%`, skin-specific background. |
| `tool` | Inline uppercase tool row with optional shimmer on newest item. |
| `assistant` | Plain text block, `text-[15px]`, skin-specific foreground. |
| `thinking` | Claude logo or three pulsing dots depending on skin. |

Newest chat item animation:

```js
animate={{ opacity: newest ? 1 : 0.35, y: 0, scale: 1 }}
initial={{ opacity: 0, y: 8, scale: 0.97 }}
exit={{ opacity: 0, scale: 0.95 }}
transition={{ duration: 0.25 }}
```

Tool shimmer:

```css
animate-[shimmer-text_2s_ease-in-out_infinite]
bg-[length:200%_100%]
bg-clip-text
text-transparent
```

For the custom agent skin, shimmer uses the blue accent. Otherwise it uses a white alpha gradient.

---

## Search Tools Panel

The search panel component has three internal phases:

- `idle`
- `scanning`
- `highlighted`
- `found`

The state resets when `highlightSlug` changes.

```js
if (active && !hasRun.current) {
  setPhase("scanning");
  const highlightedTimer = setTimeout(() => setPhase("highlighted"), 950);
  const foundTimer = setTimeout(() => setPhase("found"), 1750);
}
```

Idle state:

- Search input placeholder: `search tools...`
- Default dim tools: Gmail, Slack, GitHub
- Default plan: authenticate user, execute tool call
- Default warnings: check rate limits, verify permissions

Active/found state:

- Query text uses scenario data.
- The number of found tools equals `searchResult.tools.length`.
- Matched rows are rendered from `searchResult.tools`.
- Plan and warnings are swapped to scenario-specific arrays.

For screenshot state, the rows are:

| Tool | Description | App logo |
|---|---|---|
| `FIGMA_GET_FILE_NODES` | Get nodes from a Figma file | `https://logos.composio.dev/api/figma` |
| `FIGMA_EXPORT_ASSETS` | Export assets as SVG/PNG from Figma | `https://logos.composio.dev/api/figma` |
| `GOOGLEDRIVE_UPLOAD_FILE` | Upload a file to Google Drive | `https://logos.composio.dev/api/googledrive` |

---

## Manage Connections Panel

Component contract:

```ts
type ConnectedApp = {
  name: string;
  slug: string;
};
```

Input is derived from the current scenario tools:

```js
connectedApps={scenario.searchResult.tools.map(tool => ({
  name: capitalize(tool.appSlug),
  slug: tool.appSlug,
}))}
```

The component deduplicates by `slug`, so the Figma scenario becomes two rows:

- Figma
- Googledrive

OAuth label map:

```js
const authLabels = {
  slack: "OAuth 2.0",
  figma: "OAuth 2.0",
  googledrive: "OAuth 2.0",
  sentry: "API Key",
  linear: "OAuth 2.0",
  github: "OAuth 2.0",
  gmail: "OAuth 2.0",
};
```

When active or completed:

- Row background becomes `bg-white/[0.03]`.
- Border becomes `border-white/[0.08]`.
- Icon opacity increases from `0.20` to `0.80`.
- Status changes from dash to `Connected`.
- Dot becomes green and pulses.

---

## Execute Tool Panel

Inactive fallback is always a dim Notion example:

- Tool: `NOTION_CREATE_PAGE`
- Params: `db = Tasks`, `title = Q4 roadmap`
- Status: `200 OK - page created`

Active/completed state uses scenario data:

```ts
type ExecuteResult = {
  tool: string;
  params: Array<{ key: string; value: string }>;
  status: string;
};
```

Session label:

```js
SESSION: active || completed ? "sx-7k2m" : "-"
```

Screenshot scenario execute result:

```js
{
  tool: "GOOGLEDRIVE_SHARE_FOLDER",
  params: [
    { key: "folder", value: "assets/icons" },
    { key: "files", value: "250 SVGs" }
  ],
  status: "200 OK - folder shared"
}
```

Implementation detail:

```js
const logoSlug = executeResult.tool.split("_")[0].toLowerCase();
const logoUrl = `https://logos.composio.dev/api/${logoSlug}`;
```

This means `GOOGLEDRIVE_SHARE_FOLDER` resolves to `googledrive`.

---

## Agent Config Panel

This panel is always visible, but its values change with the active skin.

```html
<div class="absolute z-[5] flex flex-col border border-white/[0.08] bg-background/50 p-4 font-mono text-xs opacity-70">
  <span>AGENT_CONFIG</span>
  <div>AGENT ...</div>
  <div>PROVIDER ...</div>
  <div>MODEL ...</div>
</div>
```

Screenshot values:

| Label | Value |
|---|---|
| `AGENT` | `ChatGPT Codex` |
| `PROVIDER` | `OpenAI` |
| `MODEL` | `gpt-4.1` |

The source also includes a `framework` value in skin data, but the panel does not render it.

---

## Sandbox Panel

The bottom sandbox is a separate sibling rail, not inside the `620px` stage.

```html
<div class="hidden w-full max-w-page border-white/[0.08] border-b px-[6.4%] pb-16 lg:block">
  <div class="overflow-hidden border p-4 font-mono text-xs transition-colors duration-500">
    <div>composio_sandbox</div>
    <div class="flex h-[110px] gap-3 overflow-hidden">
      ...
    </div>
  </div>
</div>
```

Sandbox state:

- Starts dim/inactive.
- Becomes active at timeline step `3`.
- Reveals scenario `sandboxInstances` one at a time.
- Adds one instance every `1800ms` while active.
- Completed instances render their result string in the header.

Reduced logic:

```js
if (active && !hasRun.current) {
  hasRun.current = true;
  setVisibleCount(1);

  let count = 1;
  const timer = setInterval(() => {
    setVisibleCount(++count);
    if (count >= instances.length) clearInterval(timer);
  }, 1800);
}
```

The "LED" grid beside each instance is its own 80ms animation loop:

```js
useEffect(() => {
  if (!active) return;
  const timer = setInterval(() => setTick(t => t + 1), 80);
  return () => clearInterval(timer);
}, [active]);
```

Grid geometry:

```js
gridTemplateColumns: `repeat(${cols}, 5px)`;
gridTemplateRows: `repeat(2, 5px)`;
```

For sandbox instances, `cols` is `10`, so each instance has a 20-dot activity matrix.

Active dot colors:

- `bg-blue-400`
- `bg-blue-500/70`
- `bg-blue-600/40`
- inactive: `bg-white/[0.04]`

---

## Active Panel Styling

All side panels use the same wrapper helper.

```js
function Panel({ id, active, className, children }) {
  const pos = positions[id];

  return (
    <motion.div
      animate={{ opacity: active ? 1 : 0.7 }}
      className={cn(
        "absolute z-[5] flex flex-col overflow-hidden border p-4 font-mono text-xs transition-colors duration-500",
        active
          ? "border-white/25 bg-background shadow-[0_0_40px_rgba(0,0,0,0.5)]"
          : "border-white/[0.08] bg-background/50",
        className
      )}
      style={{
        width: "27.4%",
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        transform: "translateX(-50%)",
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
```

This is why the screenshot has a subtle spotlight effect: active panels brighten to full opacity, stronger border, and a black glow shadow. Inactive panels remain at `opacity: 0.7`.

---

## Header And Hero Context

The inspected visual sits below the main hero copy and CTAs.

Hero root:

```html
<section class="dark relative flex min-h-dvh flex-col items-center overflow-hidden bg-background pt-[60px] md:pt-0">
```

Header behavior:

```js
useEffect(() => {
  const updateHeader = () => {
    const header = document.querySelector("header");
    if (!header) return;

    const mobileOpen = header.hasAttribute("data-mobile-open");
    if (window.scrollY < 100 && !mobileOpen) {
      header.style.backgroundColor = "transparent";
      header.style.borderColor = "transparent";
    } else {
      header.style.backgroundColor = "";
      header.style.borderColor = "";
    }
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
  return () => window.removeEventListener("scroll", updateHeader);
}, []);
```

Mobile art replacement:

```html
<!-- mobile only -->
<div class="absolute inset-0 z-0 overflow-hidden mix-blend-lighten md:hidden">
  <WarpTunnelCanvas />
</div>

<!-- md and up hero background -->
<div class="absolute inset-y-0 -right-[50vw] -left-[50vw] ... hidden ... md:flex">
  <WarpTunnelCanvas />
</div>
```

The desktop action demo is therefore the second proof layer inside the same hero: first the tunnel/canvas background, then the concrete agent UI simulator.

---

## Asset Sources

App icons are remote, not bundled:

```js
const logoBase = "https://logos.composio.dev/api";
const logoUrl = `${logoBase}/${slug}`;
```

Client skin logos:

| Skin | Asset |
|---|---|
| Claude | `/images/clients/claude.svg` |
| ChatGPT | `/images/clients/chatgpt.png` |
| Custom agent | Inline generated circle/chevron mark |

The ChatGPT logo receives `invert` via Tailwind:

```html
<img class="h-4 w-4 invert" src="/images/clients/chatgpt.png" />
```

---

## Rebuild Recipe

To reproduce this section:

1. Create a `relative hidden lg:block h-[620px] max-w-page overflow-hidden` stage.
2. Use percentage-based absolute positioning, with side panels at `27.4%` width and central card at `35.5%`.
3. Render the central chat card from a `skins[index]` object so background, border, radius, input color, accent, logo, and model all swap together.
4. Render scenario content from a `scenarios[index]` object with `chatItems`, `searchResult`, `sandboxInstances`, `executeResult`, and `timeline`.
5. Use an `IntersectionObserver` to start the timeline only when the stage is visible.
6. Drive the demo with a `stepIndex` state machine. Each step sets visible chat items, thinking state, active tools, completed tools, and delay.
7. Draw connector lines in a fixed `1240 x 620` SVG using Framer Motion `pathLength`.
8. Brighten panels through shared active styling: opacity `1`, `border-white/25`, and black glow shadow.
9. Keep the mobile/tablet behavior explicit: hide this whole visual below `1024px` and use a separate hero visual instead.

---

## Notes For Waldo

Useful patterns to borrow:

- The center card is a live agent artifact, not a generic screenshot. It proves tool use by showing staged search, sandbox, connection, and execution.
- Side panels are dim until relevant. This keeps visual density high without making every module compete at once.
- The timeline makes the demo legible: user asks, system thinks, search/connections light up, sandbox runs, execute confirms, assistant finishes.
- The connector lines are very simple but effective: a 2px white path plus 8px translucent glow path.
- The desktop-only choice is intentional. Below `lg`, the section does not try to preserve every detail.

