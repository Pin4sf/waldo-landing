# How it works — Copy Structure

Status: **Built. The live copy is at the top (v5: v4 plus the copy review's ★ picks, 2026-09-28).** The v4 notes and the v3 full reference are below.
Last updated: 2026-09-28
URL: `/how-it-works` (the old `/features` redirects here)
Replaces: v3 (2026-09-28), which is kept below as the full reference

**Built from:**
- Suyash's outline (2026-09-27): Hero → Health → Day to day → Connectors
- Scaffold v1 (2026-09-25): ticker, memory, control and log, named actions
- Product repo `Waldo/`: `Docs/WALDO_DESIGNER_BRIEF.md`, `agent/capabilities.md`, `docs-site/mvp-scope.md`, app screens (`waldo-app/src/screens/`)
- AGENTS.md Parts 2–4

---

## Live copy (2026-09-28)

This is the copy on the built page right now, top to bottom. **Edit the words here**, then carry them into `app/how-it-works/page.tsx`.

How to read it (the three text levels are in [../type.md](../type.md)):
- `Label:` is the small grey word above a title.
- `###` lines are **titles**, and `/` marks where the line breaks.
- `Body:` is the regular text. There are no subtitles any more (2026-09-28): what used to be the subtitle and the line after it are now one paragraph.
- In lists, `(…)` is a small label, and *italics* or **bold** mark emphasis (dark, medium weight).
- `Picture:` lines describe the picture (and name its file, once there is one). They're notes, not copy.

### Everything it handles. / Nothing you have to.
Body: Everything Waldo does, from reading last night's sleep to moving tomorrow's meeting.
Buttons: "Let Waldo in →"

- **Health** — Knows how you're doing.
- **Day to day** — Runs your day around it.
- **Connectors** — Works with everything you use.
- **Talk to Waldo** — Ask anything, anywhere.
- **Your rules** — You decide how far it goes.

---

Label: Health
### Your health, / without the homework.
Body: Health apps hand you charts and a score, then leave the reading to you. Waldo does the reading. It even knows a racing heart on a morning run from a racing heart in a board call. You have better things to memorise.

- **Recovery** — *What did last night give you?* Set each morning, from Sleep, HRV and Resting State. 63: “Short night, HRV 12% below your usual. Take the morning easy.”
  - _Picture: Last night on iPhone: sleep, HRV and resting state (`/figma-assets/waldo-cards/morning-overview.webp`)_
- **Form** — *What can you handle right now?* Live all day, from Circadian, Motion and Stress. 76: “Steady. Stress rising since 1pm.”
  - _Picture: Stress climbing on iPhone (`/figma-assets/waldo-cards/edge-phone-stress.webp`)_
- **Weight** — *What is today asking of you?* Live all day. Higher means heavier: meetings, messages, tasks and Load. 84: “Six meetings and a full inbox. A heavy one.”
  - _Picture: A full calendar, with Waldo's changes marked (`/figma-assets/waldo-cards/edge-waldo-action-calendar.webp`)_
Also (each name has a "+" and opens a side panel; the panels are listed under "Side panels" below):
- Sleep debt +
- Quiet flags +
- Training +
- Weather and daylight +
- Your history +
- Bring your past +

Small print: Waldo uses health signals as context for planning your day. It isn't a medical device, and it doesn't diagnose anything.

---

Label: Day to day
### Done before / you’re up.
Body: Waldo reads your night, then rebuilds the day around it. The hard meeting moves, your best hours stay protected, and the inbox waits its turn. Most of it, you'll never see happen.

| When | What Waldo does | What it looks like |
|---|---|---|
| Morning | The Brief | “Rough night, about 5h 40m. Nudged your 9am to 10:30. The afternoon looks fine.” |
| Morning | The Window | “10:30–12:30 is your sharpest stretch. Blocked it.” |
| Before a big meeting | Prep | “Board call in 35 minutes. You're running lower than usual. Here are last time's open items.” |
| Afternoon | The Heads-Up | “This Tuesday is shaping up like the last three. Moved your 4pm before it lands.” |
| Evening | The Close | “Today: 3 things moved, 1 protected. Tomorrow looks lighter.” |
| End of week | The Adjustment | “22 hours of meetings this week. Friday afternoon cleared. Retro moved to Monday.” |

Also (each name has a "+" and opens a side panel; the panels are listed under "Side panels" below):
- Your best hours +
- The right task, at the right time +
- Fewer pings +
- Fixed first, mentioned after +
- Patterns +
- The Slope +

---

Label: Connectors
### Already fluent / in your tools.
Body: Your watch, your calendar, your inbox, your tasks, and the agents you already pay for. Growing to 200+ tools across 27 categories.
Buttons: "See every tool →"

---

Label: Talk to Waldo
### You don’t have to talk to it. / But you can.
Body: Waldo speaks first, but ask it anything, any time: “How did I sleep?” “When should I do the hard thing today?” Talk to it on Telegram and the web today. WhatsApp and iPhone notifications are coming next.

Also (each name has a "+" and opens a side panel; the panels are listed under "Side panels" below):
- Threads +
- Follow up on anything +
- Quick replies +
- Charts in replies +
- Full history +
- Thumbs up, thumbs down +

---

Label: Your rules
### Nothing happens / that you can’t undo.
Body: You choose how far Waldo goes, area by area, and you can change it whenever you like. Every move is logged. One tap takes it back.
Buttons: "How we handle your data"

Also (each name has a "+" and opens a side panel; the panels are listed under "Side panels" below):
- Three levels, per area +
- Always comes back to you +
- The activity log +
- Say it once +
- Your schedule +
- Yours, always +

---

### New tricks, / coming soon.

Coming later (each name has a "+" and opens a side panel; the panels are listed under "Side panels" below):
- Voice +
- Your own routines +
- Tomorrow, today +
- Other agents ask Waldo +

---

### Now you know. / Let it work.
Body: You'll notice the difference, not the work.
Buttons: "Let Waldo in →"

#### Side panels

Each name in an "Also" row opens a panel from the right. The panel shows the section as its label, the name as its title, then a first line in dark medium text, the body, the status and, for some, a picture.

##### Health

- **Sleep debt** (Working today)
  - First line (dark, medium): Counted over two weeks, not one night. “Tonight’s the night to pay it back.”
  - Body: Waldo keeps a running count of the sleep you’ve missed, weighted over the last 14 days, so one good night doesn’t hide a short week.
  - Body: When the debt builds, it plans around it: an earlier wind-down, a lighter morning, the hard task moved to when you’re fresher.
  - _Picture: `/figma-assets/waldo-cards/morning-phone-sleep-debt.webp`_

- **Quiet flags** (Working today)
  - First line (dark, medium): Blood oxygen, breathing and wrist temperature, flagged gently when they drift.
  - Body: These sit in the background. Waldo compares each one with your own usual, and only mentions it when it drifts.
  - Body: A gentle flag, never an alarm, and never a diagnosis. If something worries you, talk to a doctor.
  - _Picture: `/figma-assets/waldo-cards/morning-phone-resting-state.webp`_

- **Training** (Working today)
  - First line (dark, medium): Workouts and work share one calendar, so they get planned together.
  - Body: Waldo sees your training next to your meetings. After a hard session it knows you may have a sharp 90 minutes, and it offers them to the hard task.
  - Body: It can tell a racing heart on a run from a racing heart in a meeting, so a good workout never gets mistaken for a bad day.

- **Weather and daylight** (Working today)
  - First line (dark, medium): Heat, air quality and daylight where you are, factored into your day.
  - Body: Heat, UV and air quality where you are, plus how much daylight you’ve had. Waldo factors them into your plan, and tells you when a walk outside would help.
  - Body: There’s nothing to set up. It works from your rough location.
  - _Picture: `/figma-assets/waldo-cards/edge-circadian-context.webp`_

- **Your history** (Working today)
  - First line (dark, medium): Every past day as a coloured dot. Tap one to see it in full.
  - Body: Look back 7, 30 or 90 days. Each day is a dot, coloured by how it went. Tap one to see how you slept, what the day asked of you, and what Waldo did about it.

- **Bring your past** (Working today)
  - First line (dark, medium): Import your Apple Health history, so Waldo knows you from day one.
  - Body: Your watch has been collecting for years. Import that history, and Waldo starts with your real usual instead of a blank page.
  - Body: It knows you from day one, not week three.

##### Day to day

- **Your best hours** (Coming next)
  - First line (dark, medium): Learns when you’re sharpest, and keeps invites out of that window.
  - Body: Waldo learns when you do your best work and when you need slack, then shapes your calendar around it.
  - Body: When an invite lands in your sharpest window, it suggests another time. “This invite lands in your sharpest window. Suggest 3pm instead?”

- **The right task, at the right time** (Working today)
  - First line (dark, medium): Hard things land when you’re fresh. Deadlines never slip.
  - Body: Your list is ordered by what’s due and by how much you’ve got in you. The hardest thing goes to your sharpest hour.
  - Body: On a low day, big tasks get broken into small chunks. Anything due today stays put, even on a rough one.

- **Fewer pings** (Coming next)
  - First line (dark, medium): Watches how much is coming at you, never what it says. Email in two blocks, Slack on Focus.
  - Body: Waldo reads volume, timing and urgency, never the words. When messages spike and your stress climbs with them, it offers to go quiet for a while.
  - Body: It can batch email into two blocks a day, and set Slack to Focus while you work.

- **Fixed first, mentioned after** (Working today)
  - First line (dark, medium): The Patrol runs overnight too. It fixes what it can within your limits, and asks about the rest.
  - Body: The Patrol runs around the clock. When something looks off, like two meetings overlapping, Waldo fixes it if your limits allow, and tells you after. With an undo.
  - Body: If it can’t fix something, it comes to you with options. If something is only worth watching, it watches.
  - _Picture: `/waldo-web-assets/agent-features/overnight-patrol.webp`_

- **Patterns** (Coming next)
  - First line (dark, medium): Single spots join into named patterns, like “The Tuesday Crash,” and what Waldo does about it.
  - Body: One observation is a Spot: “Emails after 10pm, and your sleep is 8% worse.” Enough Spots join into a named pattern, along with what Waldo now does about it.
  - Body: Six weeks of Tuesdays that looked ordinary, until they didn’t. You were too close to see it. Waldo wasn’t.
  - _Picture: `/waldo-web-assets/constellation/tuesday-crash-constellation.webp`_

- **The Slope** (Coming next)
  - First line (dark, medium): Today against four weeks ago, across six dimensions.
  - Body: Recovery, Form, Weight, your meeting load, message pressure and task pileup, each set against where it was a month ago. “Four of six are better than a month ago.”
  - Body: When most of them slide at once, Waldo tells you it’s time to ease off.

##### Talk to Waldo

- **Threads** (Working today)
  - First line (dark, medium): Separate conversations for separate things, one tap to switch.
  - Body: One thread for the week ahead, one for training, one for that trip. Each keeps its own context, and one tap moves between them.

- **Follow up on anything** (Coming next)
  - First line (dark, medium): “Tell me more” on any Brief opens a thread about that exact message.
  - Body: Every Brief and every Fetch has a “Tell me more.” Tap it, and a thread opens about that message, with the context already there.
  - _Picture: `/waldo-web-assets/agent-features/context-thread.webp`_

- **Quick replies** (Working today)
  - First line (dark, medium): Suggested answers, so you tap instead of type.
  - Body: Under Waldo’s messages sit a few likely answers, like “Tell me more” or “What should I do?”. Tap one, or type your own.

- **Charts in replies** (Working today)
  - First line (dark, medium): A small visual inside the answer when a number needs showing.
  - Body: Ask how you slept, and the answer comes with a small chart inside it. A picture where it helps, never a dashboard to go and read.

- **Full history** (Working today)
  - First line (dark, medium): Every conversation, kept and scrollable.
  - Body: Everything you and Waldo have said is kept, so you can scroll back to what it told you last Tuesday, and why.

- **Thumbs up, thumbs down** (Working today)
  - First line (dark, medium): Every rating teaches Waldo what’s actually useful to you.
  - Body: Rate any message. Waldo learns what’s worth telling you, and what to leave out next time.

##### Your rules

- **Three levels, per area** (Working today)
  - First line (dark, medium): “Just do it” for your calendar. “Ask me” for anything that goes to other people.
  - Body: Tell me, Ask me or Just do it, set separately for each part of your life. Waldo only acts as far as you’ve allowed in that area.
  - Body: Change any of them whenever you like.

- **Always comes back to you** (Working today)
  - First line (dark, medium): A short list of things Waldo never does on its own.
  - Body: Whatever level you’ve set, some things always come to you first.

- **The activity log** (Working today)
  - First line (dark, medium): Everything Waldo did, and chose not to do, with one-tap undo.
  - Body: Every move is written down with the reason for it, including the things Waldo noticed and decided to leave alone.
  - Body: Anything it changed can be undone with one tap.

- **Say it once** (Working today)
  - First line (dark, medium): People, preferences and corrections stick. See and change every one.
  - Body: “Priya is your lead investor. Keep it short, send numbers first.” “No meetings before 10.” Tell Waldo once, and it remembers.
  - Body: Everything it knows about you is listed in one place, where you can change or remove any of it.

- **Your schedule** (Working today)
  - First line (dark, medium): Wake time, quiet hours, and which of The Brief, The Fetch and The Close run.
  - Body: Set your wake time and when the evening check-in arrives. Turn The Brief, The Fetch or The Close on or off, one by one.
  - Body: Quiet hours, when Waldo stays silent, are coming next.

- **Yours, always** (Working today)
  - First line (dark, medium): Export everything any time. Delete your account, and it’s gone.
  - Body: Download everything Waldo holds about you, whenever you want. Delete your account, and your data goes with it.
  - Body: It’s encrypted when stored and when it moves. The full detail is on the Privacy page.

##### What’s coming

- **Voice** (Planned)
  - First line (dark, medium): Ask out loud. Hear it back.
  - Body: Hold the mic and ask. Waldo can read your Brief out loud too.

- **Your own routines** (Planned)
  - First line (dark, medium): Write a routine once, and Waldo runs it on schedule.
  - Body: “Every Sunday evening, tell me how next week looks.” Write it once, and Waldo runs it on schedule.

- **Tomorrow, today** (Planned)
  - First line (dark, medium): Waldo forecasts how tomorrow looks tonight.
  - Body: The night before, Waldo tells you how tomorrow is likely to feel, while there’s still time to change it.

- **Other agents ask Waldo** (Planned)
  - First line (dark, medium): The tools you use check how you’re doing before they act for you.
  - Body: Your other agents will be able to ask Waldo how you’re doing, and plan around it, before they act on your behalf.

> **Everything below this point is the earlier draft and the reasoning behind it, kept as a record.** Where it disagrees with the live copy above, the live copy wins.

---

## v4 — condensed (what's built now)

Suyash: "the how it works page is too big." v3 was built as 22 sections, about 18,000px tall at 1280px wide. v4 is **8 sections, about 8,000px** (6,900px in the Linear layout).

**The rule now:** one section per part. Each has a headline, **one** main block (rings, a table, or nothing), then the smaller features as a compact **"Also" list**: a name and one line each, three across, no pictures. It uses the new `Extras` block in `components/site/blocks.tsx`.

```
0 Hero           headline + the five part tiles
1 Health         headline (the heartbeat point is now in the lead) · Recovery / Form / Weight rings · Also (6) · not-medical note
2 Day to day     headline · the day table (6 rows) · Also (6): best hours, right task, fewer pings, the Patrol, patterns, the Slope
3 Connectors     headline + "See every tool →" only
4 Talk to Waldo  headline + where it reaches you (one line) · Also (6)
5 Your rules     headline + link to Privacy · Also (6): levels, never alone, log, memory, schedule, export/delete
6 What's coming  Also (4)
7 Close
```

**Taken off the page** (still in the feature index below, and can come back):
- the "Right now, handling —" ticker in the hero (a candidate for Home's visual pass)
- the stress / rest / workouts table, and the two-up heartbeat example (the heartbeat point lives in the Health lead now)
- the Breaker, Wind-down and Weekend outlook rows of the day table
- the separate calendar, tasks, inbox, Patrol and patterns sections, each now one line in "Also"
- recovery days, learns your peaks, sleep nudges, meeting notes, sync status, nothing to set up
- the channel table (now one line: Telegram and web today, WhatsApp and iPhone next), and the memory examples

The "sticky bar" idea below isn't needed at this length.

---

# v3 — full reference

## The page's job

Show everything Waldo does, big and small, in an order people can skim. Home made the promises. This page is the proof, one feature at a time.

## How the page is laid out

Five parts. The hero tiles become a **sticky bar** at the top of the page (Health · Day to day · Connectors · Talk to Waldo · Your rules), so a long page is still easy to move around.

Each part has:
1. **Big sections** for the headline features, each with a headline, one line, a visual and an aside
2. **A "small things" grid** at the end: compact cards with one line each, for the smaller features

```
0 Hero
1 Health        → 1a Thesis · 1b Three answers · 1c Beyond the three · 1d Good stress, bad stress · small things
2 Day to day    → 2a Days and nights · 2b Calendar · 2c Tasks · 2d Inbox and messages · 2e The Patrol · 2f Patterns · small things
3 Connectors    → 3a Teaser, links to /connectors
4 Talk to Waldo → 4a Chat and threads · 4b Where it reaches you · small things
5 Your rules    → 5a How far it goes · 5b What Waldo knows · 5c Your data · small things
6 What's coming
7 Close
```

## Status labels

Every feature carries one of these. **The page only shows Live and Next as working features.** Later features appear only in section 6, "What's coming."

| Label | Meaning |
|---|---|
| **Live** | Works today |
| **Next** | Designed, shipping soon |
| **Later** | Planned, no date |
| **Spec?** | Mentioned, but no product detail exists yet |

> ⚠️ The statuses come from the product docs, which are dated April 2026. **Suyash to confirm each one** before anything is built. See the Feature index at the bottom.

## Page rules

- Everything on Home applies here too (tapered Corben headlines, an italic aside per section, "Let Waldo in →" only, and AI is never an adjective for Waldo).
- **Every number comes with its meaning.**
- **Health is context, not medicine.** No diagnosis, no promised results.
- **Use site names, not internal ones:** Morning Wag → The Brief · Nap Score / CRS → Form · Fetch Alert → The Fetch · Evening Review → The Close · Activity → Motion · "Waldo Intelligence" bar → "Sources connected" (because "intelligence" is a banned word).

---

## 0. Hero — the overview

**Headline**
```
Your body, your day,
your tools.
One Waldo.
```

**Body line:** Everything Waldo does, from reading last night's sleep to moving tomorrow's meeting.

**Aside:** *all of it, handled.*

**CTA:** Let Waldo in →

**Visual:** Five tiles that jump to each part, then stick to the top as the page scrolls:
- **Health:** Knows how you're doing.
- **Day to day:** Runs your day around it.
- **Connectors:** Works with everything you use.
- **Talk to Waldo:** Ask anything, anywhere.
- **Your rules:** You decide how far it goes.

Under the tiles, the live ticker:
> Right now, handling —
> → Rescheduled your 9am to 10:30
> → Logged your 2am HRV dip
> → Protecting your Friday afternoon
> → Skipping 41 threads that didn't need you

---

# PART 1 — HEALTH

## 1a. The thesis

**Headline**
```
Your health,
without the
homework.
```

**Body line:** Health apps hand you a dozen charts and a score, and expect you to read them every morning, remember last week's, and work out what to do. Nobody does. So Waldo does the reading, and you get three plain answers.

**Visual:** A cluttered pile of typical health screens fading out on the left. Three calm rings on the right.

**Aside:** *you have better things to memorise.*

---

## 1b. The three answers — Recovery, Form, Weight · Live

**Headline**
```
Three questions.
Answered before
you ask.
```

**Visual:** Three donut rings. Tap one to open its parts, and tap a part to see the detail behind it. Every number carries its meaning.

| Ring | The question | Scale | Made from | Tap a part to see | Example |
|---|---|---|---|---|---|
| **Recovery** | What did last night give you? | 0–100, set each morning | Sleep (50), HRV (25), Resting State (25) | Sleep stages, sleep debt, HRV against your 7-day usual, resting heart rate, breathing rate, blood oxygen, wrist temperature | 63: "Short night, HRV 12% below your usual. Take the morning easy." |
| **Form** | What can you handle right now? | 0–100, live all day | Circadian, Motion, Stress | Wake time against your usual, daylight, steps, exercise minutes, VO2 Max, stress level | 76: "Steady. Stress rising since 1pm." |
| **Weight** | What is today asking of you? | 0–100, live. Higher means heavier | The Stack, Signal Pressure, Task Pileup, Load (0–21) | Meeting hours, back-to-backs, message volume, overdue tasks, physical strain | 84: "Six meetings and a full inbox. A heavy one." |

**Colour note:** Recovery and Form go green when high. Weight goes red when high.

**Aside:** *numbers, with a meaning attached.*

**Accuracy checks:** Load is 0–21. Sleep debt is a 14-day average. Wrist temperature sits under Resting State. Use "Motion," never "Activity," and "HRV," never "CASS."

---

## 1c. Beyond the three · Live / Spec?

**Headline**
```
Stress, sleep, food,
training, goals.
All of it counts.
```

**Visual:** Five cards, each showing what Waldo **notices**, then what it **does**:

| Area | Status | Notices | Does |
|---|---|---|---|
| **Stress** (The Fetch) | Live | "Stress climbing since 1pm." | "Investor call at 3 stays. Pulled the 4:30." |
| **Rest** | Live | "Three short nights. About 4 hours behind over two weeks." | "Tonight matters more than tomorrow's gym. Wind-down moved to 10:30." |
| **Workouts** | Live | "HRV jumped after your run." | "You've got a sharp 90 minutes. Hard task now?" |
| **Nutrition** | Spec? | "Heavy lunch before your hardest meeting, twice this week." | "Moved lunch to after it on Thursday." |
| **Goals** | Spec? | "Marathon in April. Busiest work month is March." | "Kept March training weeks clear of late meetings." |

**Line under the cards:** Your goals and your work share one calendar, so Waldo plans them together.

**Aside:** *work and training, finally on speaking terms.*

**Note:** Nutrition and goals stay off the page until they have a spec.

---

## 1d. Good stress, bad stress · Live

**Headline**
```
Same heartbeat.
Different
story.
```

**Body line:** A racing heart after a run is a good sign. A racing heart in a board call isn't. Waldo reads your heart rate alongside how you're moving, the time and what's on your calendar, so a hard run never gets mistaken for a hard meeting.

**Visual:**

| | Left | Right |
|---|---|---|
| Heart rate | 7:10am · rising fast | 3:40pm · rising fast |
| Movement | Running, 9 km/h | Sitting still |
| Calendar | "Morning run" | "Board call" |
| **Waldo's read** | **Workout. Good work.** | **Stress. Clearing your 4:30.** |

**Line under it:** And it learns your version of both over time.

**Aside:** *it knows the difference. so you don't have to.*

---

## Health — small things

A grid of compact cards, one line each:

| Card | Line | Status |
|---|---|---|
| Sleep debt | "About 2.4 hours owed across two weeks. Tonight's the night to pay it back." | Live |
| Quiet flags | Blood oxygen, breathing rate and wrist temperature get a gentle flag when they drift from your usual. | Live |
| Weather and air | Heat, UV and air quality where you are, factored into your day. | Live |
| Daylight | How much daylight you've had, and when a walk outside would help. | Live |
| Your history | Every past day as a coloured dot. Tap one to see that day in full. 7, 30 or 90 days. | Live |
| Bring your past | Import your Apple Health history, so Waldo knows you from day one, not week three. | Live |
| Waldo's mood | The dalmatian reflects your day: tail wagging on a good one, curled up on a rough one. | Next |
| Always fresh | "Updated 4 min ago," so you know it's current. | Live |

**Small print (end of Part 1):** Waldo uses health signals as context for planning your day. It isn't a medical device, and it doesn't diagnose anything.

---

# PART 2 — DAY TO DAY

## 2a. Days and nights · Live / Next

**Headline**
```
Days planned.
Nights
protected.
```

**Body line:** From the first alarm to lights out, Waldo runs your day around how you're actually doing.

**Visual:** One day as a timeline. Each stop is a small card, shown inside the tool it happened in.

| When | Action | What it looks like | Status |
|---|---|---|---|
| Morning | **The Brief** | "Rough night, about 5h 40m. Nudged your 9am to 10:30. The afternoon looks fine." | Live |
| Morning | **The Window** | "10:30–12:30 is your sharpest stretch. Blocked it." | Next |
| Before a big meeting | **Prep** | "Board call in 35 minutes. You're running lower than usual. Here are last time's open items." | Next |
| After 3 back-to-backs | **Breaker** | "Three in a row. Skip the optional one at 4." | Live |
| Afternoon | **The Heads-Up** | "This Tuesday is shaping up like the last three. Moved your 4pm before it lands." | Live |
| Evening | **The Close** | "Today: 3 things moved, 1 protected. Tomorrow looks lighter." | Live |
| Night | Wind-down | "Early flight tomorrow. Phone quiet from 10." | Next |
| Friday | Weekend outlook | "Recovery should bounce back by Sunday if Saturday stays slow." | Live |
| End of week | **The Adjustment** | "22 hours of meetings this week. Friday afternoon cleared. Retro moved to Monday." | Next |

**Aside:** *most of it, you'll never see happen.*

> ⚠️ **Important:** In the product docs, *moving* meetings is marked Phase 2 ("suggests" today). Home promises "Moved your 9am." **Confirm that Waldo actually moves meetings at launch.** If it doesn't, Home and this page switch to "suggests" wording until it does.

---

## 2b. Calendar · Next

**Headline**
```
Your week,
shaped around
your best hours.
```

**Body line:** Waldo learns when you're sharpest and when you need slack, then shapes your calendar around it.

**Visual:** A week view with soft coloured zones behind the events (focus, recovery, meetings, flexible). One event carries a small paw chip: **"Waldo blocked this. Tap to change."**

**Three short beats:**
- **Protects your focus:** "This invite lands in your sharpest window. Suggest 3pm instead?"
- **Suggests a better week:** "Deep work Mon, Wed and Fri mornings. Meetings Tue and Thu afternoons." Accept, tweak or ignore.
- **Guards your evenings:** "Late meeting three nights running. Holding Thursday evening clear."

**Aside:** *your calendar finally has a say. just not the last one.*

---

## 2c. Tasks · Live / Next

**Headline**
```
The right task,
at the right
time.
```

**Body line:** Waldo orders your list by what's due and by how much you've got in you, so the hard things land when you can handle them.

**Visual:** A task list that reorders itself, with a small reason beside each move:

| What Waldo does | Example | Status |
|---|---|---|
| Hardest first when you're sharpest | "Investor memo moved to 10:30, your peak." | Live |
| Deadlines never slip | "Due today, so it stays, even on a rough day." | Live |
| Breaks it down | "Big task, low tank. 25-minute chunks. Start with the part you know." | Live |
| Push or wait? | "Due tomorrow. Tomorrow you'll be fresher. Start then?" | Live |
| Overdue clean-up | "14 overdue. Pick the 3 that matter. Park the rest?" | Live |
| Remembers the routine | "It's Monday. Legs day at 5:15. You're good to go." | Live |
| Finds hidden tasks | "You promised Priya numbers on Tuesday's call. Added it." | Next |

**Aside:** *less list. more done.*

---

## 2d. Inbox and messages · Live / Next

**Headline**
```
Fewer pings.
Better
timing.
```

**Body line:** Waldo watches how much is coming at you, never what it says, and steps in when it's too much.

**Visual:** Three cards:
- **Go dark:** "Messages up 3x and your stress with it. Going quiet for 45 minutes?" (Live)
- **Batch it:** "Email in two blocks today, 11 and 4, not all day." (Next)
- **Status set:** "Slack set to Focus until 12:30." (Next)

**Line under the cards:** Waldo reads volume, timing and urgency, never the words.

**Aside:** *the inbox can wait. it usually can.*

---

## 2e. The Patrol · Live

**Headline**
```
Fixed first.
Mentioned
after.
```

**Body line:** The Patrol runs around the clock, overnight included. When something looks off, Waldo fixes it if it can and tells you after. If it can't, it comes to you with options.

**Visual:** Three example log entries:

| Outcome | Example |
|---|---|
| **Fixed, then told you** | "Two meetings overlapped at 3pm. Moved the internal one to 3:30. · Undo" |
| **Couldn't fix, so asked you** | "Your flight moved to 7am. That clashes with board prep. Move prep to tonight, or push it to Friday?" |
| **Noticed, left alone** | "Three late nights in a row. Not acting yet, just watching." |

**Line under it:** Waldo only fixes things within the limits you've set. Everything else comes to you first.

**Aside:** *receipts for everything.*

---

## 2f. Patterns — Spots, Constellations, The Slope · Live / Next

**Headline**
```
The longer it runs,
the better it
knows you.
```

**Body line:** Six weeks of Tuesdays that looked ordinary, until they didn't. Your worst sleep always follows your heaviest meeting days. You were too close to see it. Waldo wasn't.

**Visual:** A dark container.
- **Spots** (Live): single observations light up, like "Emails after 10pm, and your sleep is 8% worse."
- **Constellation** (Next): Spots join into a named pattern, **"The Tuesday Crash,"** with what Waldo now does about it.
- **The Slope** (Next): today against 4 weeks ago, across 6 dimensions. *"Four of six are better than a month ago."*
- **Crash warning** (Next): "The last 30 days are trending the wrong way. Time to ease off."

**Aside:** *patterns you can't see from the inside.*

**Note:** Keep "burnout" off the page. It sounds like a diagnosis, so use "crash" or "trending the wrong way."

---

## Day to day — small things

| Card | Line | Status |
|---|---|---|
| Recovery days | "Light calendar and low tank. Today's marked as a recovery day." | Next |
| Learns your peaks | "You finish 72% of your hard tasks when Form is above 70." | Live |
| Sleep nudges | A screen-off reminder, timed to your actual bedtime. | Next |
| Meeting notes | Decisions and action items after a call, with action items turned into tasks. | Next |
| Meeting cost | "This weekly sync takes a noticeable hit on your HRV every week." | Next |

> ⚠️ **Meeting notes:** The product docs describe a "silent" mode that records without others knowing. **Do not put that on the site.** Recording without consent is illegal in many places. Only the visible mode, where Waldo joins as a named participant, should ever be shown.

---

# PART 3 — CONNECTORS

*(Shortened 2026-09-28. The full detail, including every account, profession routines and the request form, now lives on `/connectors`. See [connectors.md](connectors.md).)*

## 3a. Already fluent in your tools · teaser

**Headline**
```
Already fluent
in your tools.
```

**Body line:** Your watch, your calendar, your inbox, your tasks, and the agents you already pay for.

**Visual:** One scrolling strip of tool logos, working-today tools first. Under it, the auto-calculated counts: *"7 working today · 12 coming next · growing to 200+."*

**Link:** See every tool, and what Waldo does with each → `/connectors`

**Aside:** *it goes where your day already is.*

**Small things kept here** (they're about the app, not the directory):
- **Sync status:** each tool shows when it last synced. "Sync now" is one tap. (Live)
- **Nothing to set up:** weather and location work on their own. (Live)

---

# PART 4 — TALK TO WALDO

## 4a. Chat and threads · Live / Next

**Headline**
```
You don't have to
talk to it.
But you can.
```

**Body line:** Waldo speaks first, but ask it anything, any time: "How did I sleep?" "When should I do the hard thing today?"

**Visual:** A chat screen showing:
- The Brief sitting at the top, where Waldo spoke first
- A reply with a **small chart inside the message** (a mini Form ring)
- **"Waldo is checking your data…"** while it works
- **Quick replies** under a message ("Tell me more" · "What should I do?")
- **Thread pills** at the top to jump between conversations
- 👍 / 👎 under each Waldo message

**Features in this section:**

| Feature | Line | Status |
|---|---|---|
| Full history | Every conversation, kept and scrollable. | Live |
| Threads | Separate conversations for separate things, and one tap to switch. | Live |
| Quick replies | Suggested answers, so you tap instead of type. | Live |
| Follow up on anything | "Tell me more" on any Brief or Fetch opens a thread about that exact message. | Next |
| Charts in replies | Small visuals inside the answer when a number needs showing. | Live |
| Thumbs up, thumbs down | Every rating teaches Waldo what's actually useful to you. | Live |

**Aside:** *it talks when it's worth it. so can you.*

---

## 4b. Where it reaches you · Live / Next

**Headline**
```
It comes
to you.
```

**Body line:** Pick where Waldo talks to you. Same Waldo, same memory, wherever you are.

**Visual:** One Brief shown in several apps side by side:

| Channel | Status |
|---|---|
| Telegram | Live |
| Waldo on the web | Live |
| WhatsApp | Next |
| Waldo for iPhone (notifications) | Next |
| Slack · Discord | Later |
| Weekly email | Later |

**Aside:** *same dog, any door.*

---

## Talk to Waldo — small things

| Card | Line | Status |
|---|---|---|
| Voice notes | Hold the mic, ask out loud. | Later |
| Hear your Brief | Waldo can read your morning out loud. | Later |
| Your own routines | "Every Sunday evening, tell me how next week looks." Write it once, and Waldo runs it on schedule. | Later |

*(All three are Later, so they appear in section 6 until they ship.)*

---

# PART 5 — YOUR RULES

## 5a. How far it goes · Live / Next

**Headline**
```
Nothing happens
you can't see
or undo.
```

**Body line:** Home showed you the switch. Here's everything behind it.

**Visual:**
1. **Three levels per area** (Tell me / Ask me / Just do it). For example: "Just do it" for your calendar, "Ask me" for anything that goes to other people.
2. **Always comes back to you:** *(the list needs writing — see open questions)*
3. **The activity log:** everything Waldo did, and chose not to do, with one-tap undo.

**Aside:** *on a leash you hold.*

---

## 5b. What Waldo knows · Live

**Headline**
```
Say it once.
It sticks.
```

**Body line:** The people, the preferences, the corrections. Waldo keeps them, and you can see and change every one.

**Visual:** A "What Waldo knows" card, with each item as an editable tag:
- "Priya is your lead investor. Keep it short, send numbers first."
- "No meetings before 10. Fridays stay light."
- "You moved the 1:1 back twice. It stays at 4 now."

**Aside:** *you're not a stranger anywhere.*

---

## 5c. Your data · Live

**Headline**
```
Yours. Always.
```

**Body line:** Export everything, any time. Delete your account, and it's gone.

**Visual:** Three plain lines:
- Export your data.
- Delete your account and everything with it.
- Encrypted, stored and in transit.

**Link:** The full detail → `/privacy`

**Aside:** *no fine print. we checked.*

---

## Your rules — small things

| Card | Line | Status |
|---|---|---|
| Your schedule | Set your wake time and when the evening check-in arrives. | Live |
| Choose what runs | Turn The Brief, The Fetch or The Close on or off, one by one. | Live |
| Quiet hours | Waldo stays silent when you tell it to. | Next |

---

## 6. What's coming

**Headline**
```
And we're
just getting
started.
```

**Visual:** One quiet row of "coming" cards. No dates, no links.

| Card | Line |
|---|---|
| Voice | Ask out loud. Hear it back. |
| Your own routines | Write a routine once, and Waldo runs it on schedule. |
| Tomorrow, today | Waldo forecasts how tomorrow looks tonight. |
| Other agents ask Waldo | The tools you use check how you're doing before they act for you. |
| Pack | Waldo for teams and families. |

**Aside:** *the dog's still learning tricks.*

**Notes:**
- **"Tomorrow, today":** the product docs quote "78% correlation on test data." Don't use that number.
- **Pack:** the product docs describe "see readiness across your whole team." That clashes with any promise that teammates never see your health data. **Decide how Pack handles health data before it appears anywhere.**

---

## 7. Close

**Headline**
```
Now you know
how it works.
Let it.
```

**CTA:** Let Waldo in →
**Aside:** *you'll barely notice it working.*
**Visual:** The shared footer scene with the mascot.

---

# FEATURE INDEX

Every feature found, where it sits on the page, and its status (from the April 2026 product docs). **Suyash to tick or correct each status.**

| # | Feature | Page section | Status | Source |
|---|---|---|---|---|
| 1 | Recovery / Form / Weight rings | 1b | Live | AGENTS.md, app |
| 2 | Tap-to-open detail views (sleep stages, HRV trend, etc.) | 1b | Next | Designer brief (screens 5–7) |
| 3 | Stress detection → The Fetch | 1c | Live | MVP scope |
| 4 | Sleep debt (14-day) and sleep alarm | 1c, small things | Live | Capabilities #5 |
| 5 | Post-workout sharp window | 1c | Live | Capabilities #9 |
| 6 | Nutrition, meal plans | 1c | Spec? | AGENTS.md |
| 7 | Goals (training, etc.) | 1c | Spec? | Suyash's outline |
| 8 | Good vs bad heart rate rise | 1d | Live | Stress detector |
| 9 | Quiet flags (SpO2, breathing, wrist temp) | Health small | Live | Designer brief |
| 10 | Weather and air quality | Health small | Live | Adapter #7 |
| 11 | Daylight exposure | Health small | Live | Designer brief |
| 12 | History day strip (7/30/90) | Health small | Live | Web console |
| 13 | Apple Health history import | Health small | Live | Web console |
| 14 | Waldo moods (mascot states) | Health small | Next | Designer brief |
| 15 | Data freshness | Health small | Live | Designer brief |
| 16 | The Brief | 2a | Live | MVP scope |
| 17 | The Window (focus protection) | 2a | Next | Capabilities #4 |
| 18 | Pre-meeting prep | 2a | Next | Capabilities #2 |
| 19 | Back-to-back breaker | 2a | Live | Capabilities #3 |
| 20 | The Heads-Up (pattern alert) | 2a | Live | Capabilities #7 |
| 21 | The Close (evening review) | 2a | Live | Capabilities #10 |
| 22 | Wind-down | 2a | Next | Capabilities #24 |
| 23 | Weekend outlook | 2a | Live | Capabilities #11 |
| 24 | The Adjustment | 2a | Next | AGENTS.md |
| 25 | **Actually moving meetings** | 2a (and Home) | **Next — confirm** | Capabilities #20 |
| 26 | Calendar zones and "Waldo blocked this" chip | 2b | Next | Designer brief |
| 27 | Focus conflict warning | 2b | Next | Designer brief |
| 28 | Suggested week shape | 2b | Next | Designer brief |
| 29 | Task ordering by deadline and energy | 2c | Live | Capabilities #12–13 |
| 30 | Break it down | 2c | Live | Capabilities #14 |
| 31 | Push or wait? | 2c | Live | Capabilities #17 |
| 32 | Overdue clean-up | 2c | Live | Capabilities #15 |
| 33 | Recurring tasks | 2c | Live | Capabilities #16 |
| 34 | Finds hidden tasks | 2c | Next | Capabilities #19 |
| 35 | Go dark (message overload) | 2d | Live | Capabilities #6 |
| 36 | Message batching | 2d | Next | Capabilities #23 |
| 37 | Auto Slack status | 2d | Next | Capabilities #21 |
| 38 | The Patrol and its log | 2e | Live | AGENTS.md, designer brief |
| 39 | Spots | 2f | Live | App insights screen |
| 40 | Constellations | 2f | Next | Designer brief (screen 12) |
| 41 | The Slope | 2f | Next | AGENTS.md |
| 42 | Crash warning (30-day trend) | 2f | Next | Capabilities #8 |
| 43 | Recovery days | Day small | Next | Capabilities #22 |
| 44 | Learns your peaks | Day small | Live | Capabilities #18 |
| 45 | Sleep nudges | Day small | Next | Capabilities #24 |
| 46 | Meeting notes and action items (visible mode only) | Day small | Next | Designer brief |
| 47 | Meeting cost on HRV | Day small | Next | Designer brief |
| 48 | Tool grid by group | 3a teaser + /connectors | Mixed | Adapter spec |
| 49 | "Connected as" / multiple accounts | /connectors §3 | Live / confirm | Web console |
| 50 | Profession routines | /connectors §4 | Next | connector-data.ts |
| 51 | Request a tool | /connectors §7 | Spec? | Suyash's outline |
| 52 | Sync status / sync now | 3a | Live | Designer brief |
| 53 | Sources connected bar | /connectors hero counts | Live | Designer brief |
| 54 | Chat with history | 4a | Live | App, web console |
| 55 | Threads (thread pills) | 4a | Live | Web console |
| 56 | Quick replies | 4a | Live | Web console |
| 57 | Follow-up threads on any message | 4a | Next | Designer brief |
| 58 | Charts inside replies | 4a | Live | Designer brief |
| 59 | Thumbs up / down learning | 4a | Live | Master reference |
| 60 | Channels (Telegram, web, WhatsApp, iPhone, Slack, Discord, email) | 4b | Mixed | Delivery spec |
| 61 | Voice notes / spoken replies | 6 | Later | Designer brief |
| 62 | Your own routines | 6 | Later | Designer brief |
| 63 | Autonomy levels per area | 5a | Confirm | AGENTS.md FAQ |
| 64 | Activity log with undo | 5a | Live (log) / confirm (undo) | Web console |
| 65 | Memory tags (view and edit) | 5b | Live (view) / confirm (edit) | Web console |
| 66 | Data export / delete account | 5c | Live / confirm | MVP scope |
| 67 | Schedule settings (wake, evening) | Rules small | Live | App profile |
| 68 | Toggle each action | Rules small | Live | App profile |
| 69 | Quiet hours | Rules small | Next | — |
| 70 | Tomorrow forecast | 6 | Later | Designer brief |
| 71 | Other agents ask Waldo (body API) | 6 | Later | Designer brief |
| 72 | Pack (team / family) | 6 | Later | Designer brief |

**Kept off the site on purpose:**
- Silent meeting recording (consent laws)
- "Leave earlier, your reaction time is slower" commute alerts (a safety claim)
- "78% correlation" forecast number (unverified)
- The internal model name and cost per message shown in the activity log (machinery, not mechanism)
- Admin mode

---

## Open questions for Suyash

1. **Statuses:** tick or correct every row in the Feature index. The docs are from April 2026.
2. **Moving meetings (#25):** does Waldo actually move them at launch, or only suggest? This changes Home too.
3. **"Always comes back to you":** what does Waldo never do without asking?
4. **Nutrition and goals:** what ships?
5. **Pack:** how is health data handled across a team or family?
6. **Request a tool:** form or email?
7. **Page length:** it's long by design, with a sticky part bar. Are you OK with that, or should Parts 4 and 5 be shorter?
