# Waldo — Knowledge Repository
### Single Source of Truth for Landing Page Build
### Last updated: May 2026

---

## How to use this document

This is the canonical reference for anyone (human or AI agent) building heywaldo.in. It contains the product story, technical architecture, visual patterns, copy blocks, and hard constraints — all in one place. If something isn't in this document, it doesn't go on the website.

Seven parts. Read them in order the first time. Reference them by number after.

---
---

# PART 1 — THE STORY

## The one sentence

Waldo reads your body through your smartwatch and handles your day before you notice something's off.

## The problem

Your Apple Watch has been collecting health data for years — sleep stages, heart rate variability, stress signals, blood oxygen, circadian alignment. Every morning it knows things about you that your calendar doesn't: that you slept five and a half hours, that your nervous system is depleted, that your body isn't ready for the four meetings stacked before noon.

No app has ever done anything with this information. Apple Health shows you a chart. WHOOP gives you a score. Oura sends a notification. Fitbit suggests a walk. Sleep Cycle rates your night. Every one of them is a rearview mirror — they tell you what already happened and leave you to figure out what to do about it.

Meanwhile, your calendar doesn't know any of this. Your 9am is still on. Your afternoon is still packed. Your task list doesn't care that your HRV dropped 12% below baseline overnight. There is a complete disconnect between what your body is telling you and what your day is demanding of you.

You are the most volatile variable in your own day. Every AI agent in existence treats you as a constant.

## What the product does

Waldo is a personal AI agent that monitors your health wearable 24/7, understands what the data actually means for your day, then acts on it — autonomously. It reschedules meetings, blocks focus time, reprioritises tasks, catches burnout before it hits, reviews logged meals, creates meal plans, records meetings, analyses cognitive stress, watches sleep patterns, and tells you how to sleep better based on your actual schedule.

Every morning, Waldo sends you The Brief — a plain-language message explaining what last night means for today and what it already changed. Throughout the day, it monitors your real-time state and intervenes when needed. Over weeks and months, it maps long-term patterns you're too close to see.

The user never opens a dashboard. Waldo is not a health tracker. It's the first product that treats your health data as input to an agent, not output to a screen.

## Why this approach

Because the data already exists. There are 150 million Apple Watch users generating thousands of biometric data points per day. The hardware problem is solved. The missing layer is intelligence — something that reads this data continuously and converts it into action across the tools you already use.

Waldo's unfair advantage is the one MCP (Model Context Protocol) connector that no competing AI agent has: the user's body. By Phase 3, Waldo functions as a full LLM with connectors across 200+ tools in 27 categories. Calendar, email, Slack, Notion, Linear, Figma, Strava — all of them become surfaces Waldo can read from and write to. But the body-data connector is the one no competitor can replicate, because it requires a completely different architecture: one that treats biological signals as first-class context for every decision the agent makes.

---
---

# PART 2 — THE PRODUCT

## Core architecture

Waldo's intelligence is organised in three tiers. The user sees Tier 1 metrics on the dashboard. Each Tier 1 metric expands into Tier 2 component cards. Each Tier 2 card expands in-place to reveal Tier 3 raw signals, always accompanied by Waldo's plain-language interpretation. Raw numbers are never shown without context.

### Tier 1 — The three lenses

**Recovery** (0–100, higher = better)
What it answers: "What did last night give you?"
Backward-looking. Fixed at morning wake. Does not update during the day. Composed of Sleep (50 points), HRV (25 points), and Resting State (25 points). This tells the user what resources they woke up with.

**Form** (0–100, higher = better)
What it answers: "What can you handle right now?"
Present-tense. Updates live throughout the day. The user's real-time capacity. Composed of Circadian alignment, Motion (activity), and Stress. Form drops when stress climbs, rises when circadian alignment improves, and reflects the moment-to-moment truth of what the user can take on.

**Weight** (0–100, higher = MORE demand — inverted colour direction)
What it answers: "What is today asking of you?"
Total demand — physical, cognitive, emotional. Updates live. A high Weight score is red (heavy day), not green. Composed of The Stack (meeting load), Signal Pressure (email/message volume), Task Pileup (outstanding tasks), and Load (physical strain from Day Strain engine, 0–21 TRIMP-derived scale).

**The Slope** (fourth Tier 1, displayed on Health Stats screen only)
What it answers: "Are things getting better or worse?"
A 4-week trajectory shown as a dumbbell plot — today vs 4 weeks ago — across 6 dimensions: Recovery, Form, Weight, The Stack, Signal Pressure, Task Pileup. When 5 of 6 dimensions decline, Waldo escalates.

### Agent actions — what Waldo actually does

These are the named actions Waldo takes autonomously. They appear in the product console as a scrollable feed.

| Action | What it does |
|---|---|
| **The Brief** | Every morning — a plain-language message explaining what last night means for today and what Waldo already changed. The core product moment. |
| **The Fetch** | Real-time stress intervention. When stress confidence crosses a threshold, Waldo pulls upcoming low-priority meetings and blocks recovery time. Fires mid-day. |
| **The Adjustment** | End-of-week or end-of-day load management. Waldo reviews cumulative Weight and protects future time blocks, moves meetings, communicates changes to team. |
| **The Patrol** | Background monitoring log. Runs continuously including overnight. Records what Waldo noticed and what it chose not to act on. The "Waldo was watching" proof. |
| **The Spot** | A single observation Waldo makes about a pattern. "Your worst sleep follows your heaviest meeting days." Spots accumulate into Constellations. |
| **The Constellation** | Long-term pattern map. Multiple Spots connecting into a named behavioural pattern. "The Tuesday Crash" — a recurring pattern Waldo identified across 6+ weeks. Gets its own screen. |
| **The Window** | Waldo identifies your optimal focus hours based on circadian data and protects them in your calendar. |
| **The Heads-Up** | A proactive alert before a predicted crash — Waldo sees the pattern forming and warns you before it lands. |
| **The Close** | End-of-day summary. What Waldo did today, what it's watching, what tomorrow looks like based on tonight's trajectory. |
| **The Handoff** | When Waldo transfers context to another tool — sends a Slack message, updates a Linear ticket, creates a calendar event — this is the logged action. |

### Connector tiers

| Tier | When | What |
|---|---|---|
| Tier 0 (always on) | Day 1 | Open-Meteo (weather), IP Geolocation |
| Tier 1 (onboarding) | Setup | Apple Health, EventKit (calendars), Push Notifications, Location |
| Tier 2 (onboarding branch) | If user selects device | WHOOP, Oura, Garmin, Fitbit |
| Tier 3 (post-onboarding) | Week 1+ | Slack, Notion, Todoist, Linear, GitHub, HubSpot, Spotify, Strava, Gmail, Figma |

Connector launches are named marketing events ("Waldo now speaks Figma"). Rollout in profession-specific waves: founders/engineers → sales → design → product → students → healthcare → enterprise.

## What Waldo is not

- **Not a health tracker.** It does not show charts of your sleep. It does not give you a score and leave you to figure out what to do with it.
- **Not a productivity tool.** Task management is an input to Waldo, not a product category it occupies.
- **Not a wellness brand.** No green smoothies. No meditation prompts. No "how are you feeling today?"
- **Not a chatbot.** You do not have to talk to Waldo for Waldo to work. Waldo talks to you when something is worth saying.
- **Not gamified.** No streaks. No badges. No "You've completed 7 days in a row!"
- **Not anxious.** It does not alert you constantly. It does not create urgency where none exists.
- **Not an AI brand.** It does not describe itself as AI-powered, intelligent, or smart. It is Waldo. That is enough.
- **Not a scheduler.** Saying "Waldo reschedules your day" is like using a nuclear reactor to boil water. Scheduling is one of dozens of actions.

---
---

# PART 3 — THE NUMBERS

Every quantifiable claim on the website must appear in this table. If a number is not here, it does not go on the site.

| Number | What it means | Source |
|---|---|---|
| 150M+ | Estimated active Apple Watch users worldwide | Apple earnings reports, analyst estimates |
| 847 | Average data points a smartwatch logs per week per user | Internal calculation from HealthKit sampling rates |
| 200+ | Tools/services Waldo can connect to via MCP by Phase 3 | Internal connector catalog (213 enumerated) |
| 27 | Categories of MCP connectors in Waldo's architecture | Internal connector taxonomy |
| 24/7 | Waldo monitors continuously, not on a schedule | Product architecture — Patrol runs overnight |
| 0–100 | Scale for Recovery, Form, and Weight scores | Scoring engine specification |
| 0–21 | Scale for Load (Day Strain / TRIMP-derived) | Strain engine specification — NOT 0–100 |
| 3 | Tier 1 metrics the user sees: Recovery, Form, Weight | Product architecture — locked |
| 6 | Dimensions tracked by The Slope | Recovery, Form, Weight, Stack, Signal Pressure, Task Pileup |
| 4 weeks | Lookback window for The Slope trajectory | Product architecture |
| 30 days | Historical data needed for Slope calculations | Technical requirement |

---
---

# PART 4 — DOMAIN-SPECIFIC DETAIL: BIOMETRIC SIGNALS AND AGENT ACTIONS

## Tier 2 cards — what the user sees when they drill down

### Under Recovery

| Card | What it shows | Max points | Backend source |
|---|---|---|---|
| Sleep | Sleep duration, sleep stages (deep/REM/light), sleep efficiency, sleep debt (14-day weighted rolling) | 50 | Sleep Score from crs-engine |
| HRV | Heart rate variability (RMSSD), 7-day baseline comparison, trend | 25 | CASS from crs-engine |
| Resting State | Resting heart rate, respiratory rate, wrist temperature, blood oxygen (SpO2) | 25 | RHRTS + RRS + WTS + SO2S |

### Under Form

| Card | What it shows | Backend source |
|---|---|---|
| Circadian | Wake alignment vs baseline, daylight exposure, bedtime consistency | Circadian Score + DAS + CDP |
| Motion | Steps, exercise minutes, stand hours, active energy, VO2 Max | Activity Score + EES |
| Stress | Real-time stress confidence, HR-derived stress signal, Fetch history | Stress Confidence from stress-detector |

### Under Weight

| Card | What it shows | Scale | Phase |
|---|---|---|---|
| Load | Physical strain — TRIMP-derived from exercise and movement | 0–21 | Phase 1 |
| The Stack | Meeting count, meeting hours, calendar density | 0–100 (TBD) | Phase 1 |
| Signal Pressure | Email volume, message volume, notification density | 0–100 (TBD) | Phase 1 |
| Task Pileup | Outstanding tasks, overdue items, task velocity | 0–100 (TBD) | Phase 1 |
| Mind State | Mood tracking, emotional load (self-reported + inferred) | 0–100 (TBD) | Phase 2 |

## Donut ring display

Each Tier 1 metric is displayed as a single segmented donut ring. Saturated filled segments show component scores. Near-white unfilled portions recede. The segments are additive — they sum to the Tier 1 total. Universal X/Y model where component scores sum to composite.

## Zone colour system

| Zone | Meaning | Colour |
|---|---|---|
| Peak | 80–100 | Green (#22C55E) |
| Steady | 60–79 | Amber/Orange (#F97316) |
| Flagging | 40–59 | Orange-red — needs attention |
| Depleted | 0–39 | Red (#F43F5E) — Waldo intervenes |

For Weight, the colour direction is inverted: high Weight = red (heavy day), low Weight = green (light day).

---
---

# PART 5 — VISUAL PATTERN LIBRARY

## Reference 1: Dia Browser (diabrowser.com)

**Pattern: Floating-card hero with state rotation**
Structure: Hero section with 5-7 small UI elements (widgets, app icons, media cards) floating at slight rotations around a central headline. Background gradient shifts subtly. Elements respond to cursor with parallax drift. States auto-rotate every 5 seconds.
When to use: Hero section — when you need to prove product capability through visual artifacts rather than copy. Works for products where the "output" is multiple small UI moments rather than one big screen.
Mapping to Waldo: Hero section. Three rotating states mapped to Recovery (green wash), Form (orange wash), Weight (pink wash). Each state shows: one large action card (The Brief / The Fetch / The Adjustment), one donut ring, 2-3 signal chips (familiar metrics like Sleep, HRV, Stress), and 2-3 connector icons (Apple Health, Google Calendar, Slack). Mascot anchors the composition. 1-2° rotations on cards. Parallax depth on cursor movement.

**Pattern: Cursor-proximity hover reveal**
Structure: Floating elements scale up slightly and gain elevation when cursor approaches. Creates liveness without requiring click interaction.
Mapping to Waldo: All floating hero elements. Signal chips show one-line Waldo interpretation on hover ("38ms — 12% below your 7-day baseline"). Connector icons show past-tense action on hover ("2 events moved", "Focus status set").

## Reference 2: Craft.do

**Pattern: Colour-blocked feature sections**
Structure: Each feature lives inside a distinct coloured container (green, yellow, etc.) with product UI cards floating inside. Creates scroll rhythm (white → colour → white → colour). Each section has copy on the left, product UI on the right.
When to use: Feature showcase — when you have 3-4 distinct product modes that each deserve their own visual identity.
Mapping to Waldo: Section 4 — "How your day looks with Waldo." Three colour-blocked sections using zone palette: Recovery on green wash, Form on orange wash, Weight on pink wash. Each contains one product UI card (Brief/Fetch/Adjustment) with one sentence of copy. The zone colours connect the marketing page to the actual product colour system.

**Pattern: Capability grid with icon row**
Structure: A bold headline ("isn't just for one thing, it's for your things") above a row of category icons (Docs, Tasks, Calendar, Whiteboards, Daily Notes). No explanation — the icons speak.
When to use: When showing breadth of capability without getting into detail.
Mapping to Waldo: Not directly — Waldo is vertical (one deep capability) not horizontal (many shallow ones). Instead, use this confidence mechanic for showing agent actions: a row of 3-5 Waldo output cards (Brief, Fetch, Adjustment, Spot, Constellation) with no explanation, just the artifacts themselves.

## Reference 3: Stripe (stripe.com)

**Pattern: Live metrics ticker**
Structure: A section showing real-time-feeling numbers that count up, lines that refresh. Creates a sense of "this is happening right now." Not a dashboard — a proof of presence.
When to use: When you want to show the product is actively working, not just described.
Mapping to Waldo: Section 5 — "Where's Waldo?" The animated ticker of agent actions. Rotating items: "→ Rescheduled your 9am to 10:30" / "→ Logged your 2am HRV dip" / "→ Protecting your Friday afternoon." Each line fades in and out.

**Pattern: Time-of-day adaptive background**
Structure: Background gradient shifts based on user's local time. Decorative in Stripe's case, but communicates temporal awareness.
Mapping to Waldo: Footer section. Background gradient maps to actual time of day and seasons. Waldo's mascot illustration sits on this gradient. Shivansh implementing. This turns the footer into a proof of concept — the page knows what time it is, just like the product does.

## Reference 4: Headspace (headspace.com)

**Pattern: FAQ accordion**
Structure: Clean bordered accordion. Question on left, + toggle on right. Minimal styling. Collapses all by default.
Mapping to Waldo: Section 6 — FAQ. Questions written in Waldo's voice as real objections, not generic FAQ copy. "Does Waldo actually move my meetings?" / "What if I don't wear my watch one day?"

**Pattern: Character-anchored footer**
Structure: Brand character illustration positioned above a minimal quicklink footer grid. Character anchors the bottom of the page as a farewell moment.
Mapping to Waldo: Footer section. Dalmatian mascot in resting pose above quicklink grid. Bookends the page with the mascot (hero top, footer bottom). "Waldo was here the whole time."

## Reference 5: Linear (linear.app)

**Pattern: Progressive disclosure scroll**
Structure: Each section earns the next. Copy is short. Visuals carry. Product UI is always visible but never overwhelming. No section repeats a feature shown in a previous section.
Mapping to Waldo: The governing structure of the entire page. One entry per feature, ever. No duplication. The scroll is a story: problem → proof → mechanism → conviction → CTA. Each section earns the right to exist by building on the previous one.

## Reference 6: Codex.ai product showcase

**Pattern: Dark-container product UI cards**
Structure: Dark (#1A1A1A or similar) containers holding actual product screenshots and real UI interactions. Minimal copy — one headline, one sentence of description, then the product speaks for itself. Chat bubbles show real prompts. Terminal windows show real commands.
When to use: When the product output is more convincing than any description of it.
Mapping to Waldo: Section 4 feature showcase. Each Waldo agent action shown inside a contained card — The Brief as a real notification, The Fetch as a real Slack message, The Adjustment as a real calendar diff. The product is the visual.

---
---

# PART 6 — CONTENT BLOCKS

## Landing page scroll structure

The page is a single continuous narrative. Eight sections. Each one earns the next. No section repeats content from another. The scroll reads as: claim → problem → turn → proof → depth → liveness → objections → close.

---

### Block 1 — HERO
**Visual pattern:** Dia floating-card hero with state rotation
**Background:** Warm white (#FAFAF8) with subtle radial colour washes that shift per state

**Pre-headline:** (none — headline lands cold)

**Headline (Corben 400, centred, triangular taper):**
```
The first app that knows
how you feel and does
something about it.
```

**Sub-copy (SF Pro Rounded, three-line stack):**

Line 1 (16px, SF Pro Rounded regular, text-secondary):
"Waldo monitors your health wearable 24/7 and understands what your body is actually telling you."

Line 2 (16px, SF Pro Rounded medium, text-primary):
"Then it does something about it."

Line 3 (14px, SF Pro Rounded italic, text-tertiary):
"Your schedule. Your meals. Your sleep. Your stress. All of it."

**CTA button:** "Let Waldo in →"

**Floating elements per state:**

Recovery state (green wash):
- Action card: The Brief — "Morning. Rough night — about 5h 40m of sleep and your HRV is sitting 12% below baseline. Nudged your 9am to 10:30 and 10am to noon. The afternoon looks fine." / *already on it.*
- Donut ring: Recovery 63/100 / *What did last night give you?*
- Signal chips: Sleep 5h 42m, HRV 38ms ↓, Resting HR 62 bpm
- Connector icons: Apple Health "Read at 6:12am", Google Calendar "2 events moved", Slack "Focus status set"

Form state (orange wash):
- Action card: The Fetch — "Stress climbing since 1pm. Investor call at 3 stays — that one matters. Pulled the 4:30 and blocked the rest of your afternoon." / *you didn't ask. you didn't need to.*
- Donut ring: Form 76/100 / *What can you handle right now?*
- Signal chips: Circadian Aligned, Stress Climbing ↑, Motion 4,200 steps
- Connector icons: Apple Health "Stress flagged", Google Calendar "1 event pulled", Gmail "14 threads scanned"

Weight state (pink wash):
- Action card: The Adjustment — "22 hours of meetings this week — your second-heaviest in 8 weeks. Friday afternoon cleared. Retro moved to Monday." / *already moved.*
- Donut ring: Weight 84/100 / *What is today asking of you?*
- Signal chips: The Stack 6 meetings, Signal Pressure High, Load 14/21
- Connector icons: Google Calendar "3 events moved", Linear "3 tasks reprioritised", Gmail "14 threads scanned"

**State indicator:** Three dots at bottom of hero stage. Active dot elongates and takes the state's colour.

---

### Block 2 — THE PROBLEM
**Visual pattern:** Dark-container data ticker + app graveyard (interactive)
**Background:** Contained card on warm white (#FAFAF8), dark container (#1A1A1A) inside

**Pre-headline (SF Pro Rounded italic, text-tertiary, centred):**
*"You already have everything Waldo needs."*

**Headline (Corben 400, centred):**
```
Months of health data.
Zero health decisions.
```

**Component 1 — Data ticker (inside dark container):**
System label: "LIVE — YOUR WATCH IS LOGGING" with green pulse dot.
Sequential log lines fading in one by one:
```
6:12am  REM cycle ended. Light sleep began.
6:14am  Resting HR: 62 bpm
6:15am  HRV: 38ms — 12% below your baseline
6:41am  First movement detected
7:02am  Blood oxygen: 96%
7:15am  Stand reminder sent. Ignored.
7:34am  Steps: 340. Circadian: misaligned.
7:58am  Stress: elevated. Cause: unknown.
8:00am  Calendar: 4 meetings. Body: not ready.
8:01am  No app acted on any of this.
```
Bottom line (italic): *"Your watch logged 847 data points last week. Nothing acted on a single one."*

**Component 2 — App graveyard:**
Label: "You've tried the apps."
Five app icons in a row. Each flips on hover to reveal a single dismissive verdict:
- Apple Health → "Shows you a chart."
- WHOOP → "Gives you a score."
- Oura → "Sends a notification."
- Fitbit → "Suggests a walk."
- Sleep Cycle → "Rates your night."

**Transition line (italic, centred):**
*"Every app you own is a rearview mirror."*

**Notes:** No mention of Waldo in this section. No CTA. This section is about the problem only. The solution is Section 3's job. The incomplete metaphor ("rearview mirror" with no mention of "windshield") pulls the user into the next section.

---

### Block 3 — THE TURN
**Visual pattern:** Side-by-side contrast — passive notifications vs Waldo's action
**Background:** Warm white, transitioning from the problem to the solution

**Headline (Corben 400, centred):**
```
Not a dashboard.
Not a notification.
Already handled.
```

**Visual concept:** Left side shows a stack of passive health app notifications (all informational, no action): "Your HRV dipped overnight", "You slept 5h 42m", "High stress detected", "Recovery: Low." Right side shows a single Waldo Brief card with the action taken and the italic aside. The visual contrast IS the argument — five passive notifications vs one proactive action.

**Supporting line (SF Pro Rounded, centred):**
"Waldo reads everything your wearable collects, understands what your body is actually saying, and handles the rest — from rescheduling your calendar to planning your meals to coaching your sleep."

**Transition to Section 4:**
*"This is what your day looks like with Waldo."*

---

### Block 4 — THE PRODUCT SHOWCASE
**Visual pattern:** Craft colour-blocked sections + Codex dark-container UI cards
**Background:** Three contained colour-blocked sections using zone palette

This section shows three real Waldo moments across a day — morning, midday, end-of-week. Each moment lives inside a tinted container with real product UI.

**Section entry headline (Corben 400, centred):**
```
Three things Waldo
is always reading.
```

**Block 4a — Recovery (green wash container):**
Subhead: "What last night gave you."
Product UI: The Brief card — full morning message with mascot avatar.
One line of copy: "Every morning. One message. What happened, what changed, and what you don't need to worry about."
Aside: *mornings, sorted.*

**Block 4b — Form (orange wash container):**
Subhead: "What you can handle right now."
Product UI: The Fetch card — real-time stress intervention notification.
One line of copy: "Waldo reads your stress in real time. When it climbs, it acts — pulling meetings, blocking time, protecting your afternoon."
Aside: *you didn't ask. you didn't need to.*

**Block 4c — Weight (pink wash container):**
Subhead: "What today is asking of you."
Product UI: The Adjustment card — end-of-week load management.
One line of copy: "22 hours of meetings. Waldo noticed. Friday afternoon: cleared. Retro: moved. Team: notified."
Aside: *already moved.*

---

### Block 5 — THE LONG GAME
**Visual pattern:** Dark container with The Constellation visual
**Background:** Warm near-black (#1A1A1A)

**Headline (Corben 400, centred, white text):**
```
The longer it runs,
the smarter Waldo gets.
```

**Body copy (SF Pro Rounded, centred, text-secondary):**
"Six weeks of Tuesdays and Thursdays that looked ordinary — until they didn't. The fact that your worst sleep always follows your heaviest meeting days. The fact that your focus peaks in November and dips in March — every year, without fail. You were too close to see it. Waldo wasn't."

**Visual:** The Constellation pattern map — nodes connected by lines, Dalmatian-spot style. Shows a named pattern: "The Tuesday Crash" with a one-line Waldo interpretation.

**Aside:** *patterns you can't see from the inside.*

---

### Block 6 — WHERE'S WALDO?
**Visual pattern:** Stripe live metrics ticker
**Background:** Warm white

**Headline (Corben 400, centred):**
```
Where's Waldo?
Right now, handling —
```

**Animated ticker:** Rotating items completing the sentence, each fading in and out:
- → Rescheduled your 9am to 10:30
- → Logged your 2am HRV dip
- → Protecting your Friday afternoon
- → Matching your best hours to deep work
- → Scanning 14 email threads for urgency
- → Blocking 2-4pm for recovery
- → Moving the retro to Monday

**Notes:** The dash at the end of the headline is intentional. The ticker completes the sentence continuously. "Where's Waldo?" is the free cultural reference. The answer is always an action, never a location.

---

### Block 7 — FAQ
**Visual pattern:** Headspace accordion
**Background:** Warm white, contained card

**Headline (Corben 400, centred):**
```
You're going to
ask these.
```

**Questions (written as real objections, not generic FAQ):**

Q: "Does Waldo actually move my meetings?"
A: "If you set it to. During onboarding you choose your autonomy level — Waldo can just tell you what it would do, suggest changes for your approval, or move things on its own. You can change this anytime."

Q: "What if I don't wear my watch one day?"
A: "Waldo works with whatever data it has. No watch today means it leans more on your calendar, tasks, and historical patterns. It's less precise, not broken."

Q: "Can Waldo see my messages?"
A: "Only the tools you connect. Waldo never reads message content — it reads metadata: volume, timing, urgency signals. Your private messages stay private."

Q: "How is this different from WHOOP or Oura?"
A: "They show you data. Waldo acts on it. WHOOP tells you your recovery is 42%. Waldo tells you your recovery is 42% and already pushed your morning meetings."

Q: "What if Waldo gets it wrong?"
A: "You undo it. One tap. Waldo learns from corrections — it gets more accurate the longer you use it. The first week is calibration. By week three, it knows your patterns better than you do."

Q: "Is my health data safe?"
A: "Your biometric data stays on-device and in your private Waldo instance. Waldo doesn't sell data, doesn't train on your data, doesn't share it with third parties. Full encryption at rest and in transit."

Q: "Do I need an Apple Watch?"
A: "Apple Watch is the best-supported device right now. Oura, WHOOP, Garmin, and Fitbit are supported through their APIs. An iPhone alone gives Waldo basic data (steps, screen time) but the full experience requires a wearable."

---

### Block 8 — FOOTER CTA + MASCOT
**Visual pattern:** Headspace character-anchored footer + Stripe time-of-day gradient
**Background:** Time-of-day adaptive gradient (Shivansh implementation)

**Headline (Corben 400, centred):**
```
You're not the first.
You're also not
too late. Yet.
```

**CTA button:** "Let Waldo in →"

**Below-button aside (SF Pro Rounded italic, text-tertiary):**
*"Your watch has been waiting for this."*

**Visual:** Dalmatian mascot illustration in resting pose, positioned above the quicklink footer grid. Time-of-day gradient behind everything — colours shift based on when the user visits.

**Footer grid:** Minimal quicklinks. No dead links. Only destinations that exist.
- Product (links to relevant sections on the page via anchor scroll)
- Company (About, if it exists)
- Legal (Privacy, Terms)
- Social (X/Twitter, if active)

---
---

# PART 7 — CONSTRAINTS

## Claims Waldo NEVER makes

1. Waldo never claims to diagnose, treat, or prevent any medical condition.
2. Waldo never claims to replace medical advice or professional healthcare.
3. Waldo never guarantees health outcomes, weight loss, fitness improvements, or sleep improvements.
4. Waldo never claims 100% accuracy in biometric readings or predictions.
5. Waldo never claims to read message content — only metadata (volume, timing, urgency).
6. Waldo never describes itself as "AI-powered," "intelligent," or "smart."
7. Waldo never promises specific data privacy certifications it hasn't earned (e.g., don't claim HIPAA compliance unless certified).

## Words and phrases BANNED from all copy

- Wellness, mindfulness, holistic
- Optimise, optimize, optimisation
- Hustle, grind, peak performance
- AI-powered, AI-driven, intelligent, smart
- Health tracker, health app, wellness app
- Unlock your potential, empower, journey
- Waldo AI (always just "Waldo")
- "Meet Waldo" (the user doesn't "meet" Waldo — Waldo was already there)
- Hey Waldo (the "hey" is URL only, never copy)
- Dashboard (Waldo is not a dashboard)
- Gamification language: streaks, badges, achievements, levels, rewards
- Exclamation marks in any product copy or notification
- "Oops!", "Uh oh!", "Something went wrong!"
- Generic SaaS: "Get started", "Learn more" (use "Let Waldo in →" for CTA)
- Coaching language: "You've got this!", "Keep going!", "Great job!"

## Scientific and factual corrections

1. Sleep Debt uses a 14-day weighted rolling average, NOT a 7-day average.
2. Load (Day Strain) uses a 0–21 TRIMP-derived scale, NOT 0–100.
3. Form IS the CRS (Cognitive Readiness Score) — same formula, renamed. Never reference CRS in user-facing content.
4. Activity Score is displayed as "Motion" to users. Never "Activity."
5. CASS is displayed as "HRV" to users. Never "CASS."
6. The backend counts tiers in the opposite direction from the product (backend Tier 1 = raw signals, product Tier 1 = composites). Use product numbering in all marketing.
7. Wrist temperature lives in Resting State card, NOT in Sleep card.
8. WHAS (Walking HR) is internal only — not mapped to any user-facing card.

## Brand standards — non-negotiable for the landing page

1. **Typography:** Corben 400 (regular only, never bold) for all headlines. SF Pro Rounded for all body copy, labels, and UI elements. No other typefaces.
2. **Background white:** Always #FAFAF8 (warm off-white). Never #FFFFFF (pure white is cold).
3. **Near-black:** Always #1A1A1A. Never pure #000000.
4. **Orange accent:** Waldo Orange #F97316. Used once per viewport-worth of scroll. Never twice in the same visible area.
5. **Headline text shape:** All Corben headlines must form a deliberate triangular or oval shape — each line shorter than the one above, tapering to a point. Never let the browser decide line breaks.
6. **Mascot rules:** Always doing something, never static. Never given a speech bubble. Never sad, frustrated, or confused. Always in resting/lying portrait pose for landing page contexts.
7. **Copy register:** Warm, dry, capable, restrained, slightly braggadocious. Human endings are temperature-based (a feeling or moment), never song references or cultural references.
8. **Wit-aside rule:** Every copy block includes an italic closing aside — the emotional beat. Set in SF Pro Rounded italic, 13-14px, text-tertiary colour. Quiet enough to screenshot, not loud enough to be a tagline.
9. **Raw data rule:** No number is ever shown without Waldo's plain-language interpretation alongside it.
10. **No dead links.** If a nav item or footer link doesn't have a destination, it doesn't appear on the page.
11. **No feature duplication.** Each feature/action appears once on the page, ever. No repeating The Brief in two different sections.
12. **The product name is "Waldo."** Never "Waldo AI," never "The Waldo App," never "WALDO."

## Naming conventions — canonical reference

| Internal / old name | User-facing name | Notes |
|---|---|---|
| Nap Score | Form | Killed permanently |
| CRS | Form | Same formula, renamed |
| Day Strain | Load | 0–21 scale, lives under Weight |
| Sleep Score | Sleep | Tier 2 under Recovery |
| Activity / Activity Score | Motion | Tier 2 under Form |
| CASS | HRV | Tier 2 under Recovery |
| The Sniff | The Fetch | Renamed |

| Agent action | Name format |
|---|---|
| Morning briefing | The Brief |
| Stress intervention | The Fetch |
| Load management | The Adjustment |
| Background monitoring | The Patrol |
| Single observation | The Spot |
| Long-term pattern | The Constellation |
| Focus time protection | The Window |
| Proactive warning | The Heads-Up |
| End-of-day summary | The Close |
| Cross-tool action | The Handoff |

| Pricing tier | Name |
|---|---|
| Free | Pup |
| Pro | Pro |
| Team / family | Pack |

---
---

# LANDING PAGE STRUCTURE LOGIC

## Narrative arc

The page tells one story in eight beats:

```
CLAIM → PROBLEM → TURN → PROOF → DEPTH → LIVENESS → OBJECTIONS → CLOSE
```

| Beat | Section | What it does | Emotional state |
|---|---|---|---|
| Claim | Hero | Makes the promise. "Knows how you feel and does something about it." | Curiosity |
| Problem | Data ticker + graveyard | Makes the user feel the waste. Months of data, zero action. | Recognition, frustration |
| Turn | Contrast panel | Shows the before/after. Passive notifications vs Waldo's action. | "Wait, really?" |
| Proof | Product showcase | Shows three real Waldo moments across a day. Morning, midday, end-of-week. | Conviction |
| Depth | Constellation | Shows the long game. Patterns over weeks and months. | "This gets smarter?" |
| Liveness | Where's Waldo? ticker | Shows Waldo working right now. Creates presence. | "It's already running" |
| Objections | FAQ | Answers the real questions. Removes friction. | Trust |
| Close | Footer CTA + mascot | Final conversion moment. Time-of-day gradient. The dog. | Warmth, action |

## Design principles for the page

1. **Copy sets up. Visuals prove.** Every section has minimal copy and one dominant visual that carries the argument.
2. **One entry per feature.** The Brief appears once. The Fetch appears once. The Constellation appears once. No repetition.
3. **The technology is invisible.** No mention of AI, ML, algorithms, agents, or any technology. The word "app" appears once in the hero headline. After that, the page talks about what Waldo does and what you experience.
4. **Show the output, not the input.** The user cares about what Waldo did (moved a meeting), not how it decided (HRV + circadian + sleep architecture weighted regression). Inputs appear as small signal chips — evidence, not headlines.
5. **Every section earns the next.** The user should never think "why am I seeing this?" Each section builds on the one before it.
6. **The mascot bookends the page.** Present in the hero (anchoring the floating cards), absent in the middle sections (the product speaks for itself), returns in the footer (farewell moment, "Waldo was here the whole time").
7. **Dark mode for data, light mode for Waldo.** The data ticker (Section 2) and The Constellation (Section 5) use dark containers — they represent the machine layer. Everything else is warm white — the human layer.
8. **No dead space.** Every pixel either proves the product or creates the emotional conditions for conversion.

## Interactivity budget

| Element | Type | Priority |
|---|---|---|
| Hero state rotation | Auto-rotate + dot navigation | Must have |
| Hero parallax | Cursor-driven card drift | Should have |
| Hero card hover | Scale + elevation on proximity | Should have |
| Signal chip hover | One-line Waldo interpretation tooltip | Nice to have |
| Connector icon hover | Past-tense action label | Nice to have |
| Data ticker | Sequential line reveal on scroll-into-view | Must have |
| App graveyard | Card flip on hover showing verdict | Must have |
| Colour-block scroll | Tinted containers entering viewport | Must have |
| Where's Waldo? ticker | Continuous rotating text | Must have |
| FAQ accordion | Standard expand/collapse | Must have |
| Footer gradient | Time-of-day adaptive background | Should have (Shivansh) |
| Connector icon click | Mini-card showing Waldo's action inside that tool | Nice to have |

## CTA strategy

One CTA copy across the entire page: "Let Waldo in →"

Appears in:
1. Hero section (primary)
2. End of Section 3 / Turn (secondary)
3. Footer (final)

Never appears in: Section 2 (problem — no solution yet), Section 5 (depth — wrong moment), Section 6 (liveness — disrupts the ticker rhythm), Section 7 (FAQ — user is reading, not converting).

## Nav

Fixed top nav. Warm white with backdrop blur. Logo lockup on left (paw + "Waldo"). Single CTA button on right ("Get early access"). No nav links that don't have destinations. If Features, Pricing, and Blog don't exist yet, they don't appear in the nav.

---

*This document is the single source of truth for building heywaldo.in. If a design decision, copy choice, or technical implementation isn't covered here, check the Waldo Brand Standards V2 and Waldo Master Context documents. If those don't cover it either, ask Suyash.*
