# Waldo Agency Homepage Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the current Waldo homepage into a memorable, interactive product story that proves Waldo reads human context, completes work, and coordinates with tools and other agents.

**Architecture:** Keep the existing Next.js section architecture, design-system tokens, and current PR branch as the base. Add a shared Waldo capability data model, rebuild the hero as a dynamic proof scene, and reshape existing sections so every visual demonstrates `signal -> Waldo read -> completed action` or `human context -> agent/tool handoff`.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, GSAP/ScrollTrigger, Lenis, existing Waldo SVG/PNG assets, Figma-derived health/product cards, native CSS scroll-snap.

---

## Current Branch And Workspace

- Worktree: `/Users/shivansh.fulper/.config/superpowers/worktrees/waldo-landing/upstream-production-ready`
- Base branch at handoff creation: `codex/upstream-production-ready`
- New planning branch: `codex/waldo-agency-homepage-plan`
- Upstream PR reference: `https://github.com/suyashpingale/waldo-landing/pull/5`

## Source Evidence

Fresh browser audit artifacts:

- `/Users/shivansh.fulper/Github/personal/waldo-landing/output/reference-audit-refresh-2026-06-10/fresh-audit.json`
- `/Users/shivansh.fulper/Github/personal/waldo-landing/output/reference-audit-refresh-2026-06-10/dia-desktop-top.png`
- `/Users/shivansh.fulper/Github/personal/waldo-landing/output/reference-audit-refresh-2026-06-10/composio-for-you-desktop-top.png`
- `/Users/shivansh.fulper/Github/personal/waldo-landing/output/reference-audit-refresh-2026-06-10/composio-use-cases-desktop-top.png`
- `/Users/shivansh.fulper/Github/personal/waldo-landing/output/reference-audit-refresh-2026-06-10/happycapy-desktop-top.png`
- `/Users/shivansh.fulper/Github/personal/waldo-landing/output/reference-audit-refresh-2026-06-10/wispr-flow-desktop-top.png`

Primary local docs:

- `CODEX_CONTEXT.md`
- `DESIGN-SYSTEM.md`
- `DESIGN-SYSTEM-deltas.md`
- `competitor-visuals/*`

Figma references:

- `https://www.figma.com/design/Dl0WP9uIvx6QbSzZi7cZQY/Waldo?node-id=1220-20166&t=PpTLfjMspjE3Od9q-4`
- `https://www.figma.com/design/Dl0WP9uIvx6QbSzZi7cZQY/Waldo?node-id=1205-17936&t=PpTLfjMspjE3Od9q-4`

## Product Story Update

Waldo is not only changing the day. Waldo has agency.

The homepage must show four layers of agency:

1. **Reads the human:** sleep, HRV, recovery, stress, circadian position, movement, interruptions, meeting load, inbox pressure.
2. **Changes the day:** moves meetings, blocks recovery windows, protects focus, batches communication.
3. **Gets tasks done:** creates tasks, drafts emails, prepares briefs, pulls context, writes docs, updates work systems, logs receipts.
4. **Coordinates agents:** passes human context to other agents, asks specialist agents to do jobs, receives outputs, routes the final result back to the right app with a human approval gate where needed.

Primary homepage claim:

```text
The first app that knows what kind of day you’re having
and gets the work moving.
```

Support copy:

```text
Waldo reads the signals your body already gives off, understands the work around you, and gets the right tools and agents moving.
Calendar, inbox, tasks, apps, accounts, and agents.
Already on it.
```

## Reference Mapping

| Source | Take | Waldo translation |
|---|---|---|
| Dia Browser hero | Floating proof cards, central claim, dynamic hero evidence, soft dome/shadow depth | Central Waldo proof scene with rotating health signals, app cards, account cards, task receipts, and agent handoff cards |
| Dia “reads between tabs” | Indexed proof steps with product evidence beside them | “Waldo reads between body, apps, and agents” section |
| Composio For You “Never leave the chat” | Working checklist with completed tasks | “Waldo is already working” action checklist |
| Composio “One connection, every app” | App-logo orbit/constellation | Waldo tool + agent constellation with Apple Health at source and app/agent outputs around Waldo |
| Composio “Built for how you work” | Native scroll-snap persona rail | Waldo persona rail showing signals, apps, jobs, and completed outcomes |
| Composio “Multiple accounts per app” | Work/personal account support | Safely separated work + personal Google Workspace lanes |
| Composio Use Cases | Specific outcome cards | Homepage preview plus future `/use-cases` catalog |
| Wispr Flow | Raw input transforms into polished output | Raw signal/context transforms into Waldo read and completed action |
| Happycapy | Agents need an interface layer | Agents know tools; Waldo knows the human and routes context to them |
| Figma health collage | Dense health and interruption evidence | Health data becomes the universal human context layer, not a side panel |

## Copy Guardrails

Visible marketing copy must not use these terms:

- `smart`
- `smarter`
- `wellness`
- `dashboard`
- `AI-powered`
- `optimize`
- `health tracker`
- `Meet Waldo`
- `Waldo AI`

CTA text must remain exactly:

```text
Let Waldo in →
```

Every number needs a plain-language Waldo read beside it. Example:

```text
Recovery 63
rough morning; product review moved to 10:30
```

## Target Homepage Architecture

1. **Dynamic Hero: “The Day Is Already Moving”**
   - Source: Dia hero + Figma floating health proof.
   - Purpose: establish the whole product in the first viewport.
   - Key visual: central Waldo/phone, orange dome, floating proof cards, animated shadow/context field.
   - Dynamic states: `Recovery`, `Form`, `Weight`, `Delegation`.
   - New agency proof: show not only meeting moves, but also task completion and agent handoff.

2. **Signals Were Already There**
   - Source: Figma health collage.
   - Existing section to adapt: `HealthDataSection`.
   - Purpose: show wearables and work systems contain the raw context.
   - Message: raw health data is universal human context.

3. **Waldo Is Already Working**
   - Source: Composio “Never leave the chat”.
   - Existing section to adapt or replace: `MorningBriefSection`.
   - Purpose: show Waldo progressing through work without user prompts.
   - Visual: checklist that completes line by line.

4. **Raw Signal → Waldo Read → Work Done**
   - Source: Wispr Flow transformation ribbon.
   - New or adapted section: `SignalActionSection`.
   - Purpose: teach the product loop.
   - Visual: three-column rows with animated lines and action receipts.

5. **Every App, Account, And Agent**
   - Source: Composio “One connection, every app” plus “Multiple accounts per app”.
   - Existing section to adapt: `AgentFeaturesSection` and `SecuritySection`.
   - Purpose: show Waldo talks to apps and other agents while keeping work/personal boundaries clear.
   - Visual: orbital integration field plus separated work/personal lanes.

6. **Built For How You Work**
   - Source: Composio persona rail.
   - Existing section to adapt: `UseCasesSection`.
   - Purpose: show Waldo’s capabilities through roles and workflows.
   - Visual: scroll-snap cards with signal, app, job, and result.

7. **Agents Know Tools. Waldo Knows The Human.**
   - Source: Happycapy CLI-to-GUI/interface-layer narrative.
   - Existing section to adapt: `AgentFeaturesSection` or a new `AgentHandoffSection`.
   - Purpose: explain the agentic-era positioning.
   - Visual: prompts/tools on left, Waldo context layer in center, completed agent outputs on right.

8. **Capability Atlas**
   - Source: Composio Use Cases specificity.
   - Existing section to adapt: `ActionFanSection` or new section.
   - Purpose: show feature breadth without a giant homepage grid.
   - Visual: compact bento or card fan of capabilities grouped into `Read`, `Decide`, `Do`, `Delegate`, `Remember`.

9. **The Long Game**
   - Source: current `SmarterSection` and Figma pattern language.
   - Existing section to adapt: `SmarterSection`.
   - Purpose: show patterns over weeks and months.
   - Visual: constellation graph with behavior/action loops.

10. **Where’s Waldo**
   - Source: current live action ticker.
   - Existing section to adapt: `WhereIsWaldoSection`.
   - Purpose: show liveness through receipts.
   - Add receipts for tasks and agent coordination, not only day changes.

11. **Trust, Control, And Boundaries**
   - Source: Composio safety/account sections.
   - Existing section to adapt: `SecuritySection`.
   - Purpose: make agency feel safe.
   - Visual: autonomy levels, approval gates, scoped accounts, agent permission lanes.

12. **Close**
   - Source: current footer/mascot.
   - Existing section to adapt: `SceneCloseSection`, `FooterSection`.
   - Purpose: one final CTA and brand moment.

## Hero Design Spec

The hero cannot remain static. It needs a dynamic header and a dynamic proof scene.

### Hero Copy Structure

Accessible H1 should stay stable for SEO and screen readers:

```text
The first app that knows what kind of day you’re having
and gets the work moving.
```

Above the H1, add a dynamic status pill:

```text
Waldo is reading recovery
Waldo is protecting focus
Waldo is drafting the handoff
Waldo is coordinating agents
```

Below the H1, rotate the action receipt:

```text
Moved the 9am review to 10:30.
Drafted the note and left it waiting.
Asked the research agent for the missing brief.
Blocked 1-2pm before the afternoon tipped over.
```

### Hero States

| State | Inputs | Waldo read | Outputs |
|---|---|---|---|
| Recovery | Sleep 5h42m, HRV down, Recovery 63 | rough morning | Calendar move, Gmail draft, Slack status |
| Form | Circadian peak, motion load, Form 76 | sharp window | Focus block, Linear task, prep brief |
| Weight | 6 meetings, 104 emails, task pileup | day is heavy | Triage inbox, move low-priority calls, create tasks |
| Delegation | Work context, missing brief, agent availability | job needs another agent | Research agent queried, draft returned, approval waiting |

### Hero Motion

- Use existing `AUTO_HERO_MS` or set a 6000ms hero dwell.
- Use a segmented progress bar like the design-system deltas.
- Cards float with CSS transforms and small GSAP pointer parallax.
- Active cards brighten; inactive cards soften to 70-80% opacity.
- A soft shadow/context field sits behind Waldo and shifts with active state.
- Add a faint “signal path” from input cards into Waldo, then from Waldo to output cards.
- Respect `prefers-reduced-motion`: static first state, no autoplay, no parallax.

### Hero Shader / Shadow Direction

Use a restrained shader-like effect only in the hero:

- Keep `public/assets/hero-bg.svg` as the main dome.
- Add one absolute `.waldo-context-field` layer above the dome and below cards.
- Use radial gradients, grain, and a masked conic/ring highlight rather than WebGL first.
- Pointer movement can update CSS variables `--hero-x`, `--hero-y`, and `--hero-tilt`.
- Only add canvas/WebGL if CSS cannot achieve the effect after the first implementation.

## Shared Capability Model

Create a shared data file so hero, transformation rows, use-case cards, and receipts use the same vocabulary.

**Files:**

- Create: `components/sections/waldo-capability-data.ts`

Core types:

```ts
export type WaldoCapabilityState = "recovery" | "form" | "weight" | "delegation";

export type WaldoArtifact = {
  label: string;
  value: string;
  read: string;
  source: "health" | "calendar" | "inbox" | "task" | "account" | "agent";
  icon?: string;
};

export type WaldoActionReceipt = {
  time: string;
  action: string;
  detail: string;
  requiresApproval?: boolean;
};

export type WaldoHeroState = {
  key: WaldoCapabilityState;
  status: string;
  headlineReceipt: string;
  inputs: WaldoArtifact[];
  reads: WaldoArtifact[];
  outputs: WaldoActionReceipt[];
};
```

Initial state data:

```ts
export const waldoHeroStates: WaldoHeroState[] = [
  {
    key: "recovery",
    status: "Waldo is reading recovery",
    headlineReceipt: "Moved the 9am review to 10:30.",
    inputs: [
      { label: "Sleep", value: "5h 42m", read: "short night", source: "health" },
      { label: "HRV", value: "38ms", read: "below baseline", source: "health" },
      { label: "Calendar", value: "9am review", read: "can move", source: "calendar", icon: "/assets/composio-connectors/googlecalendar.svg" },
    ],
    reads: [
      { label: "Recovery", value: "63", read: "rough morning", source: "health" },
    ],
    outputs: [
      { time: "6:14am", action: "Moved review", detail: "9am product strategy review moved to 10:30" },
      { time: "6:15am", action: "Drafted note", detail: "Gmail draft waiting for approval", requiresApproval: true },
      { time: "6:16am", action: "Set status", detail: "Slack focus status queued" },
    ],
  },
  {
    key: "form",
    status: "Waldo is protecting focus",
    headlineReceipt: "Held your sharpest window clear.",
    inputs: [
      { label: "Form", value: "76", read: "steady enough", source: "health" },
      { label: "Circadian", value: "10:30-12", read: "best window", source: "health" },
      { label: "Linear", value: "deck task", read: "needs sharp work", source: "task", icon: "/assets/composio-connectors/linear.svg" },
    ],
    reads: [
      { label: "Focus", value: "10:30", read: "protect this", source: "calendar" },
    ],
    outputs: [
      { time: "8:03am", action: "Blocked focus", detail: "10:30-12 held for deck review" },
      { time: "8:04am", action: "Pulled context", detail: "Linear ticket and prior notes attached" },
    ],
  },
  {
    key: "weight",
    status: "Waldo is lowering the load",
    headlineReceipt: "Two things need you, not one hundred and eight.",
    inputs: [
      { label: "Inbox", value: "104", read: "2 need you", source: "inbox", icon: "/assets/composio-connectors/gmail.svg" },
      { label: "Meetings", value: "6", read: "stacked", source: "calendar", icon: "/assets/composio-connectors/googlecalendar.svg" },
      { label: "Slack", value: "late threads", read: "batch the rest", source: "inbox", icon: "/assets/composio-connectors/slack.svg" },
    ],
    reads: [
      { label: "Signal pressure", value: "high", read: "day is heavy", source: "health" },
    ],
    outputs: [
      { time: "8:11am", action: "Archived noise", detail: "Newsletters batched for later" },
      { time: "8:12am", action: "Created tasks", detail: "Two real follow-ups sent to Todoist" },
    ],
  },
  {
    key: "delegation",
    status: "Waldo is coordinating agents",
    headlineReceipt: "Asked the research agent for the missing brief.",
    inputs: [
      { label: "Brief", value: "missing", read: "needs research", source: "agent" },
      { label: "Drive", value: "Q4 docs", read: "source material", source: "account", icon: "/assets/composio-connectors/googledrive.svg" },
      { label: "Calendar", value: "3pm review", read: "deadline", source: "calendar", icon: "/assets/composio-connectors/googlecalendar.svg" },
    ],
    reads: [
      { label: "Agent handoff", value: "ready", read: "scope bounded", source: "agent" },
    ],
    outputs: [
      { time: "9:32am", action: "Brief requested", detail: "Research agent asked for three missing points" },
      { time: "9:36am", action: "Draft returned", detail: "Summary waiting in Drive", requiresApproval: true },
    ],
  },
];
```

## Task 1: Copy And Source Cleanup

**Files:**

- Modify: `components/sections/downstream-build-sections.tsx`
- Modify: `components/sections/faq-section.tsx`
- Modify: `components/sections/validation-section.tsx`
- Check: `DESIGN-SYSTEM.md`

- [ ] **Step 1: Find banned visible copy**

Run:

```bash
rg -n "smart|smarter|wellness|dashboard|AI-powered|optimize|health tracker|Meet Waldo|Waldo AI" components app
```

Expected current hits include `downstream-build-sections.tsx`, `faq-section.tsx`, and `validation-section.tsx`.

- [ ] **Step 2: Replace negative-positioning copy without banned terms**

Use these replacements:

```text
Not a dashboard. Not a chart.
```

becomes:

```text
Not another chart. Not four apps before coffee.
```

```text
Not a health tracker. Not a chatbot.
```

becomes:

```text
Not another readout. Not a loose chat window.
```

```text
Health / wellness
```

becomes:

```text
Health guidance
```

```text
health and wellness was the largest personal-guidance category
```

becomes:

```text
health guidance was the largest personal-guidance category
```

- [ ] **Step 3: Verify the banned copy scan is clean for visible components**

Run:

```bash
rg -n "smart|smarter|wellness|dashboard|AI-powered|optimize|health tracker|Meet Waldo|Waldo AI" components app
```

Expected: no hits in `components` or `app`.

- [ ] **Step 4: Build**

Run:

```bash
npm run build
```

Expected: build passes.

## Task 2: Shared Capability Data

**Files:**

- Create: `components/sections/waldo-capability-data.ts`
- Modify: `components/sections/where-is-waldo-section.tsx`

- [ ] **Step 1: Create `waldo-capability-data.ts` with the exact types and `waldoHeroStates` data from the Shared Capability Model section**

Use the complete code block in this plan as the base.

- [ ] **Step 2: Export receipt helpers**

Add:

```ts
export const waldoLiveReceipts: WaldoActionReceipt[] = waldoHeroStates.flatMap((state) => state.outputs);
```

- [ ] **Step 3: Import `waldoLiveReceipts` into `WhereIsWaldoSection`**

Replace hardcoded duplicate receipt data with shared data only when the existing markup can consume `time`, `action`, and `detail` without redesign.

- [ ] **Step 4: Build**

Run:

```bash
npm run build
```

Expected: build passes.

## Task 3: Dynamic Dia-Style Hero Proof Scene

**Files:**

- Modify: `components/sections/hero-section.tsx`
- Create: `components/sections/hero-proof-scene.tsx`
- Modify: `app/globals.css`
- Reuse: `components/sections/waldo-capability-data.ts`
- Reuse: `lib/motion.ts`

- [ ] **Step 1: Create `HeroProofScene`**

Props:

```ts
type HeroProofSceneProps = {
  states: WaldoHeroState[];
};
```

State:

```ts
const [active, setActive] = useState(0);
const [progress, setProgress] = useState(0);
const [paused, setPaused] = useState(false);
```

Use `requestAnimationFrame` for autoplay, pause on hover/focus, and disable autoplay for `prefers-reduced-motion`.

- [ ] **Step 2: Render card groups**

Render three groups:

```text
inputs left/top
Waldo read near center
outputs right/bottom
```

Each card must show `value` and `read`; never show raw numbers alone.

- [ ] **Step 3: Add hero dynamic status**

In `HeroSection`, keep a stable H1 and add:

```tsx
<p className="type-caption hero-status-pill">{activeState.status}</p>
```

The status pill should be visual-only dynamic content. The H1 remains stable.

- [ ] **Step 4: Add segmented progress**

Below the dynamic receipt, render four small segments. Active segment fills over 6000ms. Clicking a segment changes state.

- [ ] **Step 5: Add CSS context field**

Add to `app/globals.css`:

```css
.waldo-context-field {
  background:
    radial-gradient(circle at var(--hero-x, 50%) var(--hero-y, 46%), rgba(251, 148, 63, 0.16), transparent 34%),
    radial-gradient(circle at 50% 50%, rgba(35, 136, 255, 0.08), transparent 42%);
  filter: blur(2px);
  opacity: 0.9;
}

@media (prefers-reduced-motion: reduce) {
  .waldo-context-field {
    opacity: 0.55;
  }
}
```

- [ ] **Step 6: Add pointer parallax**

Use CSS variables on the hero section:

```ts
section.style.setProperty("--hero-x", `${x}%`);
section.style.setProperty("--hero-y", `${y}%`);
```

Keep transforms below `translate3d(10px, 8px, 0)` so the hero feels alive, not jumpy.

- [ ] **Step 7: Verify breakpoints**

Run dev server and inspect:

```bash
npm run dev
```

Check widths:

```text
375
768
1024
1280
1440
```

Expected: desktop has multiple floating cards; mobile keeps one input card, one read card, one output receipt stacked around the phone.

## Task 4: Composio-Style “Waldo Is Already Working” Section

**Files:**

- Modify: `components/sections/morning-brief-section.tsx`
- Reuse: `components/sections/waldo-capability-data.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Change the section narrative**

Heading:

```text
Waldo is already working.
```

Body:

```text
The signal is only the start. Waldo reads the morning, checks the work around it, and leaves receipts for what changed.
```

- [ ] **Step 2: Replace static scenario timing with checklist progression**

Checklist rows:

```text
Read overnight recovery
Checked calendar density
Pulled inbox pressure
Moved the review
Drafted the note
Logged the receipt
```

- [ ] **Step 3: Animate checklist**

Use CSS animation or existing GSAP. Complete one row every 700ms after the section enters viewport. Respect reduced motion by rendering all rows complete.

- [ ] **Step 4: Keep the phone/product stage**

Do not remove the existing phone/Figma cards. Reframe them as evidence feeding the checklist.

## Task 5: Wispr-Style Signal Transformation Section

**Files:**

- Create: `components/sections/signal-action-section.tsx`
- Modify: `components/page-layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Create section after `MorningBriefSection`**

Add to `PageLayout`:

```tsx
<SignalActionSection />
```

Place it after `MorningBriefSection` and before `AlreadyDoneSection`.

- [ ] **Step 2: Implement three-column rows**

Rows:

```ts
const rows = [
  ["Sleep 5h 42m + HRV down", "Recovery is low", "Moved product review to 10:30"],
  ["Stress rising + 3 meetings", "Afternoon at risk", "Blocked 1-2pm"],
  ["104 emails + late Slack", "Signal pressure high", "Surfaced 2 threads"],
  ["Missing brief + 3pm review", "Needs a specialist pass", "Research agent returned a draft"],
];
```

- [ ] **Step 3: Add animated path**

Use SVG paths between columns. On scroll, reveal stroke with `stroke-dashoffset`. Reduced motion renders static lines.

- [ ] **Step 4: Add action receipt styling**

Receipt card includes app/agent chip and approval marker when needed:

```text
approval waiting
```

Only use approval marker for outbound emails, invites, or agent-returned drafts.

## Task 6: App, Account, And Agent Constellation

**Files:**

- Modify: `components/sections/agent-features-section.tsx`
- Create: `components/sections/account-agent-constellation.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Keep existing connector assets**

Use existing app logos in `/assets/composio-connectors/` where available.

- [ ] **Step 2: Build constellation layout**

Center node:

```text
Waldo
human context
```

Input side:

```text
Apple Health
Calendar
Gmail
Slack
Linear
Drive
Todoist
```

Agent side:

```text
Research agent
Scheduling agent
Writing agent
Ops agent
```

Output side:

```text
brief returned
meeting moved
draft waiting
task created
```

- [ ] **Step 3: Animate paths**

Animate source-to-Waldo and Waldo-to-agent/output paths only when section is visible. Use delays under 1200ms.

- [ ] **Step 4: Mobile fallback**

Render as stacked lanes:

```text
Signals
Waldo read
Agents/tools
Receipts
```

No absolute floating constellation on mobile.

## Task 7: Multi-Account Safety Upgrade

**Files:**

- Modify: `components/sections/security-section.tsx`
- Reuse or move existing `MultiAccountVisual` logic from `agent-features-section.tsx` if needed.

- [ ] **Step 1: Add visible work/personal lanes**

Cards:

```text
suyash@work.com    WORK
suyash@gmail.com   PERSONAL
team@company.com   TEAM
```

- [ ] **Step 2: Add separated outputs**

Work lane output:

```text
Product review moved
Linear task created
```

Personal lane output:

```text
Dinner block protected
Personal email left untouched
```

- [ ] **Step 3: Copy**

Heading:

```text
Work and personal stay separate.
```

Body:

```text
Waldo can understand the whole day without blending the accounts that make it up.
```

## Task 8: Persona Rail

**Files:**

- Modify: `components/sections/use-cases-section.tsx`
- Reuse: `components/rail-controls.tsx`

- [ ] **Step 1: Rename section framing**

Heading:

```text
Built for how you work.
```

- [ ] **Step 2: Replace health-signal cards with role cards**

Cards:

```text
Founder
Product lead
Operator
GTM
Creator
Student
```

Each card includes:

```text
Signals read
Apps touched
Job done
Receipt
```

- [ ] **Step 3: Preserve native scroll-snap**

Keep the existing rail controls and `snap-x snap-mandatory` implementation.

## Task 9: Capability Atlas

**Files:**

- Modify: `components/sections/downstream-build-sections.tsx`
- Consider creating: `components/sections/capability-atlas-section.tsx`

- [ ] **Step 1: Group capabilities**

Groups:

```text
Read: sleep, HRV, recovery, stress, calendar, inbox, task load
Decide: recovery, form, weight, signal pressure, focus window, pattern confidence
Do: move meetings, block time, draft email, create task, prepare brief, update status
Delegate: call research agent, ask scheduling agent, request writing pass, route returned draft
Remember: Spots, Constellations, undo learning, account boundaries
```

- [ ] **Step 2: Preserve card-fan tactility**

Current `ActionFanSection` can become the atlas if the cards are rewritten and the fan interaction remains.

## Task 10: Agent Interface-Layer Section

**Files:**

- Modify: `components/sections/agent-features-section.tsx`
- Or create: `components/sections/agent-interface-layer-section.tsx`

- [ ] **Step 1: Add core line**

```text
Agents can act.
Waldo tells them what kind of day the human is having.
```

- [ ] **Step 2: Visualize three layers**

Left:

```text
Tools and agents
```

Center:

```text
Waldo human context
```

Right:

```text
Work completed
```

- [ ] **Step 3: Use action receipts**

Receipts:

```text
Research agent returned the missing brief.
Scheduling agent found the safer slot.
Writing agent drafted the follow-up.
Waldo left the send button to you.
```

## Task 11: Long Game And Receipts

**Files:**

- Modify: `components/sections/smarter-section.tsx`
- Modify: `components/sections/where-is-waldo-section.tsx`

- [ ] **Step 1: Expand long-game nodes**

Constellation nodes:

```text
Late messages
Short sleep
Meeting stack
Lower recovery
Task carryover
Agent handoff
Wednesday protected
```

- [ ] **Step 2: Update live receipts**

Receipts must include:

```text
health read
calendar move
task created
draft waiting
agent handoff
undo learned
```

## Task 12: Verification

**Files:**

- Verify entire app.

- [ ] **Step 1: Lint**

Run:

```bash
npm run lint
```

Expected: no lint errors.

- [ ] **Step 2: Build**

Run:

```bash
npm run build
```

Expected: build passes.

- [ ] **Step 3: Browser QA**

Start:

```bash
npm run dev
```

Check:

```text
375 x 844
768 x 1024
1024 x 900
1280 x 900
1440 x 1000
```

Expected:

- No horizontal scroll on mobile.
- Hero cards do not overlap headline or CTA.
- Dynamic hero state rotates on desktop.
- Reduced-motion mode renders stable content.
- Multi-account lanes remain separated.
- No section relies on hover only.
- CTA text is always `Let Waldo in →`.

- [ ] **Step 4: Copy scan**

Run:

```bash
rg -n "smart|smarter|wellness|dashboard|AI-powered|optimize|health tracker|Meet Waldo|Waldo AI" components app
```

Expected: no visible component hits.

## Implementation Notes For The Next Agent

- Do not add Framer Motion unless the implementation genuinely needs it. The project already has GSAP and Lenis.
- Do not add WebGL first. Start with CSS radial gradients, SVG paths, and GSAP transforms. The reference audit showed Dia and Happycapy achieve strong memorability without heavy shader stacks.
- Use Composio’s structure, not its blue grid palette.
- Use Wispr’s transformation storytelling, not its heavy full-page motion stack.
- Use Happycapy’s interface-layer argument, not its dark animal/editorial aesthetic.
- Keep health data central. It is the universal human context layer, not a side feature.
- Waldo’s agency includes completing work and coordinating other agents. The homepage must show task receipts and agent handoffs, not only calendar moves.

## Execution Choice

Recommended next-session execution:

1. Use `superpowers:subagent-driven-development`.
2. Assign Task 1 and Task 2 to a first agent to establish clean copy and shared data.
3. Assign Task 3 to the strongest frontend/motion agent.
4. Assign Tasks 4-6 after hero data and motion patterns settle.
5. Assign Tasks 7-11 section by section.
6. Keep Task 12 as final verification before pushing.
