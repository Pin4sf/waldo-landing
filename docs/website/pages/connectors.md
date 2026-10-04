# Connectors — Copy Structure

Status: **Built. The live copy is at the top (the copy review's ★ picks, 2026-09-28).**

Layout (2026-10-04): made like the homepage (centred, endless carousels, the Stage box, white cards, one close). Words unchanged. See [../site-wide-pass.md](../site-wide-pass.md).

Last updated: 2026-09-28
URL: `/connectors`
Built from: `components/connectors/connector-data.ts` (45 tools), `Waldo/Docs/WALDO_CONNECTOR_ECOSYSTEM.md` (213 enumerated, April 2026), the adapter statuses in `Waldo/Docs/WALDO_DESIGNER_BRIEF.md`, AGENTS.md connector tiers

---

## Live copy (2026-09-28)

This is the copy on the built page right now, top to bottom. **Edit the words here**, then carry them into `app/connectors/page.tsx` (the tool list is in `components/site/connector-directory.tsx`, the request form in `components/site/connector-request-form.tsx`).

How to read it (the three text levels are in [../type.md](../type.md)):
- `Label:` is the small grey word above a title.
- `###` lines are **titles**, and `/` marks where the line breaks.
- `Body:` is the regular text. There are no subtitles any more (2026-09-28): what used to be the subtitle and the line after it are now one paragraph.
- In lists, `(…)` is a small label, and *italics* or **bold** mark emphasis (dark, medium weight).
- `Picture:` lines describe the picture (and name its file, once there is one). They're notes, not copy.

### Connect it once. / Waldo takes it from there.
Body: Your watch, your calendar, your inbox, your tasks, and the agents you already use. Here's everything Waldo works with, and what it does with each. 13 tools work today and 13 are coming next, growing to 200+ across 27 categories. Start with one. Add the rest when you're ready.

---

**The tool directory** (search, category and status filters, then every tool with its logo, status and what Waldo reads). The tool list and logos live in `components/site/connector-directory.tsx`. The status of each tool is in **TOOL LIST** further down this doc.

---

### Reads what it needs. / Nothing more.
Body: Every tool gives Waldo one piece of your day. Here's exactly which piece, and what Waldo does with it.

| Type of tool | Waldo reads | Waldo does |
|---|---|---|
| Body | Sleep, heart rate, HRV, stress, movement | Works out Recovery, Form and Weight. Spots when you're running low. |
| Calendar | Meetings, gaps, back-to-backs, late nights | Moves, blocks and protects time, within your limits |
| Mail & messages | Volume, timing, urgency. Never the words. | Batches your inbox, goes quiet when it's too much, flags what needs you |
| Tasks & projects | Due dates, overdue items, what's piling up | Reorders by deadline and energy, breaks big tasks down |
| Notes & files | Documents you point it to | Pulls context together, so you don't re-explain |
| Engineering | Reviews waiting on you, ticket load | Batches reviews into your focus time, updates tickets |
| Design | Comments waiting on you | Sorts feedback before crit |
| Sales & support | Pipeline and queue pressure | Spaces your calls, flags what's urgent |
| Money | Business numbers. Read only. | Drafts your investor update |
| Music | The mood of what you play, not a list of songs | Adds one more clue to how you're doing |
| Agents | Their work and results | Gives them your context, checks their work (via Kennel) |
| Automatic | Weather, air quality, your location | Factors heat, light and travel into your day. No setup. |

---

### Work Gmail. Personal Gmail. / Waldo knows which.
Body: Connect more than one account for the same tool, and Waldo keeps them straight. Work stays work. Personal stays personal. Two inboxes. One Waldo.

- **Work** — *Connected as you@work.com* Handled during work hours, batched into two blocks a day.
  - _Picture: Gmail card: Connected as you@work.com_
- **Personal** — *Connected as you@gmail.com* Never touched during work hours.
  - _Picture: Gmail card: Connected as you@gmail.com_

---

### Pick your job. / The tools follow.
Body: Pick your profession and Waldo starts with the tools and routines people like you rely on, then adjusts to you. Starts where you already are.

_Picture: Professions, each with the tools that light up for it (`/build/professions-illustration.svg`)_

| Profession | Tools that light up | Example routine |
|---|---|---|
| Founders | Slack, Linear, Gmail, Stripe, HubSpot | “Friday investor update, drafted from your numbers, Linear and your calendar.” |
| Engineers | GitHub, Linear, Jira, Vercel, Slack | “Reviews waiting on you, batched into your morning focus block.” |
| Investors | Gmail, Calendar, Zoom, Calendly | “Notes pulled together before every founder call.” |
| Designers | Figma, Notion, Slack | “Figma comments sorted before crit.” |
| Consultants | Outlook, Zoom, Asana, Calendly | “Client calls spaced so none gets the tired you.” |
| Athletes | Strava, Garmin, WHOOP, Oura | “Training load and work load, balanced on one calendar.” |

---

### Your agents, / on the same team.
Body: Codex, Claude Code, Cursor and the rest do the work. Waldo gives them your context and checks what they deliver. Working today, in Kennel's open beta. Soon, your agents will be able to ask Waldo how you're doing before they act for you.
Buttons: "See how Kennel runs them"

---

### Connect anything. / Disconnect anytime.
Body: Your keys. Your call.
Buttons: "Full detail"

- **You approve every tool.** Nothing connects on its own.
- **Read only, unless you say so.** Each tool shows whether Waldo can change anything there.
- **Words stay private.** From email and messages, Waldo reads volume and timing, never what's written.
- **One tap to disconnect.** What Waldo learned from that tool goes with it.

---

### Don’t see yours? / Tell us.
Body: The most-asked get built first.

Form: fields "Which tool?", "What should Waldo do with it? (optional)", "Your email"; button "Send request"

---

### Your tools don’t talk / to each other. Waldo does.
Buttons: "Let Waldo in →"

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
