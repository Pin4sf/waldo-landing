# Connectors — Copy Structure

Status: **Rebuilt 2026-10-09 (second pass): one idea per section, each shown as the tools themselves. The live copy is at the top.**

Layout (2026-10-09): one morning under the opening, the use cases as a carousel of tools before and after Waldo, and the jobs as a day band after claude.com's "Put Claude to work". See [../sessions/2026-10-09.md](../sessions/2026-10-09.md). Before that (2026-10-04): made like the homepage, see [../site-wide-pass.md](../site-wide-pass.md).

Last updated: 2026-10-09
URL: `/connectors`
Built from: `components/connectors/connector-data.ts` (45 tools), `Waldo/Docs/WALDO_CONNECTOR_ECOSYSTEM.md` (213 enumerated, April 2026), the adapter statuses in `Waldo/Docs/WALDO_DESIGNER_BRIEF.md`, AGENTS.md connector tiers

---

## Live copy (2026-10-09, second pass)

This is the copy on the built page right now, top to bottom. **Edit the words here**, then carry them into `app/connectors/page.tsx`. The words inside each picture live in its component (named under each section); the jobs and their days live in `components/site/put-to-work-data.ts`; tool statuses in `components/site/connector-tools.ts`.

Everything inside the pictures (names, times, numbers) is illustrative, like the homepage's: **check it against the product before launch.** Mail is only ever shown as metadata (who, when, how many), never what's written.

### Connect it once. / Waldo takes it from there.
Body: Your watch, your calendar, your inbox, your tasks, and the agents you already use. Connect them once, and Waldo reads what each one knows about your day, then acts on it.

_Picture (`connector-morning.tsx`): one morning, "Tuesday, 7:02am · Done before you were up", as a map. **What Waldo read**: Apple Watch, slept 5h 12m, woke twice · Google Calendar, 4 meetings before noon · Google Tasks, 6 tasks due today. **What Waldo did**: moved the 9:30 design review to 11:30 (from the watch and the calendar) · moved 3 tasks to Thursday (from the watch and the tasks) · kept 12 to 1 free for lunch (from the calendar). A line runs from each reading to each action it led to; pointing at one lights its partners, and it walks through the three actions by itself. On phones, each action says "From" with its tools' marks instead of the lines. Under it, Waldo: "Short night, so the morning is lighter. Nothing important moved."_

---

### Reads what it needs. / Nothing more.
Body: Every tool gives Waldo one piece of your day. Here's exactly which piece, and what Waldo does with it.

_Picture (`connector-uses.tsx`): the use cases, back as their own section, as a centred carousel. One card per kind of tool, each showing the tool itself before and after Waldo, with Waldo's one line at the foot. Under each card, the words below and a plain line on which tools work today and which come later (worked out from the statuses)._

- **Your watch** (Apple Health, last night's sleep, then Waldo's read). **It knows how you slept. Waldo acts on it.** Waldo reads sleep, heart rate, HRV, stress and movement, works out Recovery, Form and Weight, and spots when you're running low.
- **Your calendar** (a Tuesday: the design review moves from 9:30 to 11:30). **Your day bends around how you are.** Waldo reads meetings, gaps, back-to-backs and late nights, then moves, blocks and protects time, within your limits.
- **Your inbox and messages** (38 new: two come through, 36 fold into a batch for 11:30). **Your inbox waits for a better moment.** Waldo batches your inbox, goes quiet when it's too much, and flags what needs you. Email access depends on the permissions you grant.
- **Your tasks** (today's list reorders: the proposal first, three to Thursday). **Your list, in an order you can actually do.** Waldo reads due dates and what's piling up, then reorders by deadline and energy and breaks big tasks down.
- **Your notes and files** (two documents become three lines before a 2pm call). **The context, before you ask for it.** Waldo reads the documents you point it to and pulls them together before you need them, so you don't re-explain.
- **Your work tools** (reviews, comments and issues scattered across the day gather into one hour at 4pm). **What waits on you, in one sitting.** Waldo reads reviews, comments and pipeline pressure, then batches them into your focus time instead of scattering them across the day.
- **Weather and travel** (tomorrow peaks at 34° at 1pm, so the 12:30 run moves to 7am). **Heat, light and travel, with nothing to set up.** Waldo reads the weather, air quality and roughly where you are, and factors them into your day. Nothing to connect.

---

### Pick your job. / The tools follow.
Body: Pick your profession and Waldo starts with the tools and routines people like you rely on, then adjusts to you. Starts where you already are.

_Picture (`put-to-work.tsx`, data in `put-to-work-data.ts`), built after "Put Claude to work" on claude.com/product/overview, in Waldo's light look:_
- _One row of nine job names (the chosen one in ink), and the chosen job's line under it: **Founders** (Run the company, not your calendar.) · **Engineers** (Hard problems in your sharpest hours.) · **Designers** (More time making, less time sorting.) · **Product** (Fewer status checks, more decisions.) · **Sales** (Your best hours go to your biggest calls.) · **Investors** (Pitch five gets pitch one's attention.) · **Consultants** (No client gets the tired you.) · **Athletes** (Training and work, on one calendar.) · **Students** (Study when your head is clear.)_
- _Then a band that holds still while you scroll through that job's three moments. Left, a time rail with the three times; the dot follows the scroll, and a time takes you there. Middle, a "For founders" menu, then the time and job, the moment's title, and one paragraph with the tools underlined. Right, a tinted card (the day's next moments peek out behind it): first what Waldo was asked once, typed in (or what he noticed, from which tool), then his steps with each tool, then the result in the app it landed in (a Telegram message, a calendar, a Slack summary, a Gmail draft, a Figma comment count, a Notion page). Under the card: "Replay", which half you're seeing (1. What you asked / What Waldo noticed, 2. What Waldo did), and the job's tools as a dock, with a dot under the ones this moment used. On phones and tablets the moments stack, each card playing in turn._
- _Every job's three moments (time, title, paragraph, the ask, the steps, the result) are in `put-to-work-data.ts`. The old table's routines are kept word for word as titles: "Friday investor update, drafted for you" (founders, close to it), "Reviews waiting on you, batched into one block", "Figma comments sorted before crit", "Notes pulled together before every founder call", "Client calls spaced so none gets the tired you", "Training load and work load, balanced on one calendar"._

---

### Work Gmail. Personal Gmail. / Waldo knows which.
Body: Connect more than one account for the same tool, and Waldo keeps them straight. Work stays work. Personal stays personal. Two inboxes. One Waldo.

_Picture (`accounts-split.tsx`), replacing the two separate cards: one Gmail card, "2 accounts connected", with both accounts on one day from 6am to midnight. Work hours are shaded across both rows; the slots are when Waldo works each inbox (9:30 and 4pm for work; 7am and 7pm for personal). A marker runs through the day and the line under the card says what's happening: "Work. Morning block. Handled, and two are waiting for you." · "Work. Afternoon block. Handled." · "Personal. Before work. Handled." · "Personal. After work. Handled." · "Work hours. Personal stays untouched." · "Outside work hours. Work waits for its next block."_

Under the card:
- **Work.** Handled during work hours, batched into two blocks a day.
- **Personal.** Never touched during work hours.

---

### Your agents, / on the same team.
Body: Codex, Claude Code, Cursor and the rest do the work. Waldo gives them your context and checks what they deliver. Working today, in Kennel's open beta. Soon, your agents will be able to ask Waldo how you're doing before they act for you.
Buttons: "See how Kennel runs them"

_Picture (`agent-handoff.tsx`): **Waldo hands over** (Demo at 4pm today · Short night. Keep it simple · The export bug comes first), the agent at work on "Fix the export bug" (Codex, Claude Code, Cursor, OpenCode and Pi take turns), and **Waldo checks** (Tests pass · Does what you asked · One file outside the brief, flagged)._

---

### Connect anything. / Disconnect anytime.
Body: Your keys. Your call.
Buttons: "Full detail"

The four promises as a numbered list, beside one window, Waldo's "Connections" (`key-window.tsx`). Each promise lights the part of the window it's about; they take turns, or you point at one:
1. **You approve every tool.** Nothing connects on its own. _(Oura, not connected: "Connect Oura? Waldo would see your sleep and readiness. Nothing else." Not now · Allow.)_
2. **Read only, unless you say so.** Each tool shows whether Waldo can change anything there. _(Google Calendar: See events on; Move events turns on, and "Read only" becomes "Read and change".)_
3. **Review access first.** Email access depends on the permissions you grant. App data details are under review. _(Gmail, "As you granted": Access, the permissions you chose · Changes, batches and flags.)_
4. **One tap to disconnect.** What Waldo learned from that tool goes with it. _(Google Tasks: Disconnect, then "Disconnected" and "What Waldo learned from it goes too.")_

---

### Don’t see yours? / Tell us.
Body: 13 tools work today and 13 are coming next, growing to 200+ across 27 categories. The most-asked get built first. *(The counts are worked out from the statuses.)*

_Above the form, folded away (`connector-status-list.tsx`): "See every tool, and where it is" opens three plain lines: Working today, Coming next, Planned, each with every tool's name._

Form: fields "Which tool?", "What should Waldo do with it? (optional)", "Your email"; button "Send request"

---

### Your tools don’t talk / to each other. Waldo does.
Buttons: "Let Waldo in →"

_Picture under the button (`tool-talk.tsx`): six tools (Apple Watch, Gmail, Google Tasks on the left; Google Calendar, Slack, Notion on the right), each with a line to Waldo in the middle. Dots leave a tool on the left, pass through Waldo and arrive at a tool on the right._

**Removed on 2026-10-09:** the search box and the grid of tool cards; the "Reads what it needs" table (now the use-case carousel, same title and line); the professions table (now the jobs band); the status lanes (now the folded list above the form).

> **Everything below this point is the earlier draft and the reasoning behind it, kept as a record.** Where it disagrees with the live copy above, the live copy wins.

---

## The page's job

Answer three questions for someone deciding whether to let Waldo in:

1. **Does Waldo work with my tools?** The full, searchable list, with honest status.
2. **What does it do with each one?** What it reads, and what it can change.
3. **Is it safe to connect?** Only what you approve, and you can disconnect any time.

It's also where every **connector launch** lands ("Waldo now speaks Figma"), per AGENTS.md.

## How it splits with How it works

How it works Part 3 becomes a **short teaser**: one logo strip plus "See every tool →". The depth lives here. Every account, profession routines and the request form **move from How it works to this page**, so nothing is repeated. (Applied in `how-it-works.md`.)

## Page rules

- Same site rules (tapered Corben headlines, an italic aside per section, "Let Waldo in →", British spelling).
- **Every tool shows its real status.** Never imply a tool works if it doesn't yet.
- **Every tool shows what Waldo reads and whether it can change anything.**
- Messages and email: **metadata only, never content**. Say it on every relevant card.
- No clinical or medical-record connectors on the site, even though the ecosystem doc lists them (Epic, FHIR, and so on).

## Sections

```
0 Hero (with search) → 1 The directory → 2 What Waldo does with them → 3 Every account
→ 4 Built for your work → 5 Agents are tools too → 6 You hold the keys
→ 7 Missing a tool? → 8 Latest launches (later) → 9 Close
```

---

## 0. Hero

**Headline**
```
Connect it once.
Waldo takes it
from there.
```

**Body line:** Your watch, your calendar, your inbox, your tasks, and the agents you already use. Here's everything Waldo works with, and what it does with each.

**The hero's main action is a search box:** "Search tools…" Typing filters the directory below as you type.

**Counts under the search** (auto-calculated from the data, never typed by hand):
> **7 working today · 12 coming next · growing to 200+ across 27 categories**
*(The counts shown here are examples. The real ones come from the status field. See the data fixes below.)*

**Aside:** *start with one. add the rest when you're ready.*

---

## 1. The directory

**Visual:** A grid of tool cards with three filters above it:
- **Group:** All · Body · Calendar · Mail & messages · Tasks & projects · Notes & files · Engineering · Design · Sales & support · Money · Music · Agents
- **Profession:** Founders · Engineers · Investors · Designers · Consultants · Athletes *(from `profiles` in the data)*
- **Status:** Working today · Coming next · Planned

**Each card shows:**

```
[logo]  Google Calendar                    ● Working today
        Reads: meetings, gaps, back-to-backs
        Can change: moves and blocks events (with your say-so)
        Multiple accounts: yes
```

Tapping a card opens a side panel with the same details plus one example, like "Moved your 9am to 10:30 after a short night."

**Status labels** (plain words, no jargon):

| Label | Meaning | Dot colour |
|---|---|---|
| Working today | Connect it now | Green |
| Coming next | Being built | Amber |
| Planned | On the list | Grey |

**No dead ends:** Planned cards have no "Connect" button, just a quiet "Want this sooner? Tell us →", which goes to section 7.

**Aside:** *if it's green, it works. we checked.*

---

## 2. What Waldo does with them

**Headline**
```
Reads what it needs.
Nothing
more.
```

**Body line:** Every tool gives Waldo one piece of your day. Here's exactly which piece, and what Waldo does with it.

**Visual:** A clean table, one row per group:

| Group | Waldo reads | Waldo does |
|---|---|---|
| **Body** | Sleep, heart rate, HRV, stress, movement | Works out Recovery, Form and Weight. Spots when you're running low. |
| **Calendar** | Meetings, gaps, back-to-backs, late nights | Moves, blocks and protects time, within your limits |
| **Mail & messages** | Volume, timing, urgency. **Never the words.** | Batches your inbox, goes quiet when it's too much, flags what needs you |
| **Tasks & projects** | Due dates, overdue items, what's piling up | Reorders by deadline and energy, breaks big tasks down |
| **Notes & files** | Documents you point it to | Pulls context together, so you don't re-explain |
| **Engineering** | Reviews waiting on you, ticket load | Batches reviews into your focus time, updates tickets |
| **Design** | Comments waiting on you | Sorts feedback before crit |
| **Sales & support** | Pipeline and queue pressure | Spaces your calls, flags what's urgent |
| **Money** | Business numbers (revenue, subscriptions). Read only. | Drafts your investor update |
| **Music** | The mood of what you play, not a list of songs | Adds one more clue to how you're doing |
| **Agents** | Their work and results | Gives them your context, checks their work (via Kennel) |
| **Automatic** | Weather, air quality, your location | Factors heat, light and travel into your day. No setup. |

**Aside:** *one piece each. never the whole picture of your inbox.*

**Check before launch:** Each "does" line must match what's actually built for that group. Planned groups get "Planned" beside the row.

---

## 3. Every account

*(moved from How it works)*

**Headline**
```
Work Gmail.
Personal Gmail.
Waldo knows which.
```

**Body line:** Connect more than one account for the same tool, and Waldo keeps them straight. Work stays work. Personal stays personal.

**Visual:** A Gmail card with two accounts, "Connected as you@work.com" and "Connected as you@gmail.com," each with its own rule. For example: "Personal: never touched during work hours."

**Aside:** *two inboxes. one Waldo.*

**Check:** Showing which email is connected works today. Multiple accounts per tool needs confirming.

---

## 4. Built for your work

*(moved from How it works)*

**Headline**
```
Your job
has a way
of working.
```

**Body line:** Pick your profession and Waldo starts with the tools and routines people like you rely on, then adjusts to you.

**Visual:** A profession switch. Picking one filters the directory and shows one routine:

| Profession | Tools that light up | Example routine |
|---|---|---|
| Founders | Slack, Linear, Gmail, Stripe, HubSpot | "Friday investor update, drafted from your numbers, Linear and your calendar." |
| Engineers | GitHub, Linear, Jira, Vercel, Slack | "Reviews waiting on you, batched into your morning focus block." |
| Investors | Gmail, Calendar, LinkedIn, Zoom, Calendly | "Notes pulled together before every founder call." |
| Designers | Figma, Notion, Slack | "Figma comments sorted before crit." |
| Consultants | Outlook, Zoom, Asana, Calendly | "Client calls spaced so none gets the tired you." |
| Athletes | Strava, Garmin, WHOOP, Oura | "Training load and work load, balanced on one calendar." |

**Aside:** *starts where you already are.*

**Check:** Every routine must be real at launch. Swap any that aren't.

---

## 5. Agents are tools too

**Headline**
```
Your agents,
on the same
team.
```

**Body line:** Codex, Claude Code, Cursor and the rest do the work. Waldo gives them your context and checks what they deliver.

**Visual:** Agent logos (Codex · Claude Code · Cursor · OpenCode · Pi) around a Kennel card.

**Status:** Working today, in Kennel's open beta.

**Link:** See how Kennel runs them → `/kennel`

**Coming later (small line, no link):** *Soon, your agents will be able to ask Waldo how you're doing before they act for you.*

**Aside:** *one boss. many hands.*

---

## 6. You hold the keys

**Headline**
```
Connect anything.
Disconnect
anytime.
```

**Visual:** Four plain lines, each with a small icon:
- **You approve every tool.** Nothing connects on its own.
- **Read only, unless you say so.** Each card shows whether Waldo can change anything there.
- **Words stay private.** From email and messages, Waldo reads volume and timing, never what's written.
- **One tap to disconnect.** What Waldo learned from that tool goes with it. *(confirm this is true)*

**Link:** Full detail → `/privacy`

**Aside:** *your keys. your call.*

---

## 7. Missing a tool?

**Headline**
```
Don't see yours?
Tell us.
```

**Form (three fields, one button):**
- Which tool?
- What should Waldo do with it? *(optional)*
- Your email

**Button:** Send request

**After sending:** "Got it. We'll tell you when Waldo speaks {tool}."

**Aside:** *the most-asked get built first.*

**Build note:** The site already sends waitlist signups to Loops. Send tool requests there too, tagged `connector_request` with the tool name. No new service needed.

---

## 8. Latest launches · LATER

**Headline**
```
Waldo now
speaks…
```

**Visual:** The three most recent connector launches, each a card linking to its blog post. For example: "**Waldo now speaks Figma.** Comments sorted before crit."

**Rule:** This section stays hidden until the first launch post exists. No empty sections.

---

## 9. Close

**Headline**
```
Your tools are
already talking.
Let Waldo listen.
```

**CTA:** Let Waldo in →
**Aside:** *it goes where your day already is.*
**Then:** the shared footer.

---

# TOOL LIST — status and fixes

The current `connector-data.ts` list, with a proposed status for each tool (from the April 2026 product docs). **Suyash to confirm.** The status needs adding to the data as a new field.

| Tool | Group | Proposed status | Note |
|---|---|---|---|
| Apple Health / Apple Watch | Body | Working today | Rename the "Apple" entry to "Apple Watch" |
| Health Connect | Body | Working today | |
| Google Calendar | Calendar | Working today | |
| Gmail | Mail & messages | Working today | Metadata only |
| Telegram | Mail & messages | Working today | Also where Waldo talks to you |
| Oura · WHOOP · Garmin | Body | Coming next | |
| Fitbit | Body | Coming next | ⚠️ The ecosystem doc says Fitbit's own API ends in Sep 2026. Connect through Health Connect instead. Confirm. |
| Outlook | Mail · Calendar | Coming next | |
| Slack | Mail & messages | Coming next | |
| WhatsApp | Mail & messages | Coming next | Waiting on Meta approval |
| Notion · Linear | Notes · Engineering | Coming next | |
| Spotify | Music | Coming next | ⚠️ Spotify limited developer access in Feb 2026, so approval may be needed |
| Figma · GitHub · Jira · Atlassian · Vercel · Supabase | Engineering / Design | Planned | |
| Asana · Trello · ClickUp · Airtable | Tasks & projects | Planned | |
| Google Drive · Dropbox | Notes & files | Planned | |
| Salesforce · HubSpot · Zendesk · Intercom | Sales & support | Planned | |
| Stripe · QuickBooks · Shopify | Money | Planned | Read only |
| Zoom · Calendly | Calendar | Planned | |
| Strava | Body | Planned | |
| Discord | Mail & messages | Planned | |
| OpenAI · Granola | Agents | Planned | |
| LinkedIn · YouTube | Social | Planned | ⚠️ There's no clear use for these yet. Cut, unless there's a real one. |
| **Google Fit** | Body | **Remove** | The ecosystem doc says Google Fit is shut down, and Health Connect replaces it |

**Add to the list** (mentioned elsewhere on the site but missing from the data):
- Codex · Claude Code · Cursor · OpenCode · Pi (Agents, working today via Kennel)
- Google Tasks (Tasks, working today)
- Todoist · Microsoft To Do (Tasks, coming next)
- Apple Calendar (Calendar, planned)
- Galaxy Watch (Body, coming next)
- Weather · Location (Automatic, working today, no setup)

**Data fields to add:** `status` (today / next / planned), `reads` (one line), `canChange` (yes / no), `multiAccount` (yes / no)

---

## Open questions for Suyash

1. **Statuses:** confirm the tool list above. Which tools really work today?
2. **Fitbit and Google Fit:** remove Google Fit, and route Fitbit through Health Connect?
3. **LinkedIn and YouTube:** is there a real use, or should they come off?
4. **Disconnecting:** when you disconnect a tool, does Waldo forget what it learned from it? (Section 6 promises this.)
5. **Multiple accounts:** which tools support it at launch?
6. **Tool requests:** OK to send them to Loops, tagged `connector_request`?
7. **Per-tool pages later?** For example, `/connectors/figma` for launches and search. Not now, but worth planning.
