# Home — Copy Structure

Status: **Built. The live copy is at the top (v3: the copy review's ★ picks, 2026-09-28).** v2 below is the earlier draft.
Last updated: 2026-09-28
Built from: Suyash's section outline (2026-09-25) + [/why-waldo](https://www.heywaldo.in/why-waldo)
Replaces: v1 (2026-09-24), which followed the older health-first story in AGENTS.md

---

## Live copy (2026-09-28)

This is the copy on the built page right now, top to bottom. **Edit the words here**, then carry them into `app/page.tsx`.

How to read it (the three text levels are in [../type.md](../type.md)):
- `Label:` is the small grey word above a title.
- `###` lines are **titles**, and `/` marks where the line breaks.
- `Body:` is the regular text. There are no subtitles any more (2026-09-28): what used to be the subtitle and the line after it are now one paragraph.
- In lists, `(…)` is a small label, and *italics* or **bold** mark emphasis (dark, medium weight).
- `Picture:` lines describe the picture (and name its file, once there is one). They're notes, not copy.

Announcement (yellow bar under the menu, centred): **Kennel for Mac is in open beta.** Run all your coding agents toward one finished result. [See Kennel →](/kennel)

### Life happens. / Waldo handles it.
Body: He's a personal agent; manages you, across work & life. Reads what's coming, does what's needed, & only interrupts when it matters.
Buttons: "Let Waldo in →", "See how it works"

---

### Co-ordinating your data with AI / shouldn’t be your job.
Body: More apps, more agents, more data about you. All of it still waits on you to read it, brief it, check it and decide.

- *Your watch knows. Nothing acts.* It knows you slept five hours and your stress is up. Your calendar still has four meetings before noon.
  - _Picture: Health data piling up across apps, and nothing acting on it (`/assets/home/too-much-data.svg`)_
- *Every new tool wants your life story.* A better tool shows up, and you spend an hour teaching it who you are. Then the next one shows up.
  - _Picture (2026-10-01): four rows of connector tiles drifting, row 1 left to right, row 2 right to left, row 3 left to right, row 4 right to left, with the edges faded (`components/site/connector-rows.tsx`). It holds every connector that has a mark in `public/assets/connectors` (all 45); a new tool joins by adding its mark and a name to a row. CSS only, and still with reduced motion._
  - _Picture: You, spread across accounts, apps and agents (`/waldo-web-assets/agent-features/apps-accounts-agents.webp`)_
- *Every agent reports to you.* Agents finish tasks, but you hold the why. Every re-brief, every review and every “what did you mean?” runs through you. [This is where Kennel starts →](/kennel)
  - _Picture: An agent's finished work, waiting on you to review it (`/build/work-unit-agent-illustration.svg`)_
---

### Agents do tasks. / Waldo carries outcomes.
Body: An agent can finish the code while the release is still blocked. Waldo stays on it until the release ships, and only pulls you in when it's your call.
Buttons: "Let Waldo in →"

- **Never makes you explain twice.** — Remembers the people, the context and how you like it done. Say it once. It sticks.
  - _Picture: Your accounts, health and work, held as one context (`/build/understands-illustration.svg`)_
- **Works with every agent.** — Claude, Codex, or whatever ships next. Waldo runs them and hands you back one result.
  - _Picture: Waldo at the centre, the agents it works with around it (`/build/coordinates-illustration.svg`)_
- **Knows what kind of day it is.** — The same request gets a different plan on a rough day. Waldo can tell which day you're having.
  - _Picture: The same weekly sync, handled differently as your Form changes week to week (`/build/returns-illustration.svg`)_
---

### Same Waldo. / Different hats.
Body: Starting with founders, engineers and investors, the people already running several agents at once.

- **Founders** — Three calls back to back, then the co-founder sync. Waldo puts ten minutes of air before it, so the snappy reply never happens.
  - _Picture: a founder travelling, texting Waldo in WhatsApp (iOS look, edge to edge, no phone frame). Sends a photo of the departures board, a voice note and a clip of a hotel room (`components/site/hats-scenes.tsx`, FounderWhatsApp). Photos are from Unsplash (free licence, no credit needed): the departures board by Zulfugar Karimov, the hotel room by Wes Hicks (`/assets/home/hats/`)_
- **Engineers** — Waldo finds the hour you're sharpest and gives it to the hard problem. Standup moves somewhere else.
  - _Picture: an engineer asking Waldo from a light-mode terminal. Attaches a screenshot of a red build and a screen recording (EngineerCli)_
- **Investors** — Pitches spaced to what you can actually give. The founder at pitch five gets your pitch-one attention.
  - _Picture: an investor on the Apple Watch photo from "Your watch knows" (`/assets/home/hats/apple-watch.png`), screen animated in code. Records a voice note, then sends a slide (InvestorWatch)_

---

### Waldo does as much as you let it. / Then shows its work.
_2026-10-01: the whole section sits in one white box (30px radius, 60% corner smoothing, 10px padding). Title and text are centred, like the hero. Then the console, then one "Your controls +" row whose names open a side panel (`FeatureList`). The three autonomy cards became one item, "Autonomy". Not claimed: editing or deleting what is stored, which is still marked "confirm" in the console._

Body: Start with Waldo only telling you what it would do. Hand over more when you’re ready. Everything it remembers, and everything it does, sits in your console in plain sight. On a leash you hold.

- _Picture: a small Mac window with a sidebar (Today, Waiting, Patrol, Memory, Connections) and one plain list per screen. Tours itself until you touch it. Sample rows, drawn in code (`components/site/console-tour.tsx`). Check the rows against the real console before launch._

**Your controls** (side panels)
- **Autonomy** — Three stages. Pick one, and move it anytime. **Tell me.** Waldo says what it would do, and waits. Nothing changes until you say so. **Ask me.** Waldo drafts the move, you approve it. Skip one and nothing is sent. **Just do it.** Waldo acts, logs what it did, and you can undo anything in one tap.
- **Only what you connect** — Waldo reaches the tools you allow, and nothing else. Every connection is listed in the console, with what Waldo can reach through it.
- **Metadata, not messages** — Volume, timing and urgency. Never what your messages say. Waldo uses how many, how often and how urgent to plan your day. The words in your messages stay private.
- **Health is context** — It shapes your day. It never makes medical decisions. Sleep and stress help Waldo decide what to move and what to protect. They feed a plan for your day, not a diagnosis, and Waldo gives no medical advice.
- **Never sold, never trained on** — Your data stays yours. Waldo does not sell your data, train on it or share it with third parties. It is encrypted at rest and in transit.

_Unused since this change: the "Tell me" Mac notification picture (`mac-notifications.tsx`) and the Ask me / Just do it pictures (`agent-approval.svg`, `agent-patrol.svg`)._

---

### Where’s Waldo? / Wherever you are.
Body: It starts on your Mac, comes to your iPhone next, and answers in the chats you already use.

- (Open beta) **Kennel for Mac** — Lives in the notch. Shows what Waldo is working on, and what needs you. [See Kennel →](/kennel)
  - _Picture: Kennel in the Mac menu bar, around the notch (`/build/menubar-illustration.svg`)_
- (Coming soon) **Waldo for iPhone** — Where Waldo gets to know the person behind the work.
  - _Picture: Waldo's overview on iPhone (`/build/phone-mockup.png`)_
- (Coming soon) **Messaging & browser** — Talk to the same Waldo in WhatsApp, Slack or your browser.
  - _Picture: Asking Waldo in a chat thread (`/assets/home/agent-ask-thread.svg`)_
---

### You’re going to / ask these.

- **How is Waldo different from ChatGPT or Claude?**
  They answer when you ask. Waldo works toward an outcome, uses tools like them to get there, and comes back when it's done, or when it genuinely needs you.
- **How is it different from WHOOP or Oura?**
  They show you your data. Waldo does something with it. WHOOP tells you your recovery is low. Waldo already moved your morning.
- **Do I have to set everything up?**
  No. Connect what you already use. Waldo brings your context into every tool it works with, so you don't explain yourself twice.
- **What if Waldo gets it wrong?**
  Undo it in one tap. Waldo learns from every correction, and the first week is mostly it learning you.
- **Do I need a smartwatch?**
  It helps, since that's how Waldo knows how you're doing. Apple Watch, Oura, WHOOP, Garmin and Fitbit all work. Without one, Waldo leans on your calendar, work and patterns.
- **What can I use today?**
  Kennel for Mac is in open beta now. iPhone and messaging come next, and people on the list get in first.

[More questions →](/support)

---

### Your agents aren’t going / to fix your life.
Body: One Waldo across work and life, carrying what matters so you don't have to.
Buttons: "Let Waldo in →"

> **Everything below this point is the earlier draft and the reasoning behind it, kept as a record.** Where it disagrees with the live copy above, the live copy wins.

---

## The page's job

Answer two questions:

1. **What does Waldo solve?** Too much gets made for you and about you to keep up with, and you're the one stuck holding it all together: your health, your tools, your agents, the "why" behind every task.
2. **Who is it for?** You, as a whole person, not as a job title. Founders, engineers and investors first.

## Home vs Why Waldo vs How it works

The three pages tell the same story at three depths. To keep them from repeating each other:

| Page | Does what | Style |
|---|---|---|
| Home | **Shows** the idea | One line per idea, one visual per section |
| Why Waldo | **Argues** the idea | Full prose, the belief and reasoning |
| How it works | **Explains** the mechanics | The features, actions and control |

If a Home section needs a paragraph to make its point, that paragraph belongs on Why Waldo.

## Page rules

- Every headline is Corben, with hand-set line breaks that taper.
- Every section ends on an italic aside.
- One CTA wording, used three times: "Let Waldo in →" (hero, section 4, close).
- No feature appears twice on the page.
- **AI is the world Waldo lives in, never an adjective for Waldo.** "AI makes more than you can read" is fine. "AI-powered Waldo" is not.
- No health outcome promises and no medical claims. Health is context for decisions, not treatment.
- No number unless it has a source (see AGENTS.md Part 3).

## Sections

```
1 Kennel banner → 2 Hero → 3 The problem → 4 An agent, not a product
→ 5 Who it's for → 6 Trust → 7 Where Waldo lives → 8 Questions → 9 Close
```

---

## 1. Kennel banner

**Copy:** **Kennel for Mac is in open beta.** Waldo's first surface, for running many agents and getting one outcome.
**Button:** See Kennel → links to `/kennel`
**Note:** It can be closed, and it comes down once the launch isn't news.

---

## 2. Hero — you can't keep up, Waldo can

**Headline**
```
You can't keep up
with everything.
Waldo can.
```

**Body line**
More now gets made for you, and about you, than anyone could read. Waldo keeps up with all of it (your work, your tools, your agents, your body) and hands you only what matters. Then it acts.

**Aside:** *only the good bits.*

**CTA:** Let Waldo in →

**Visual: "the funnel."** A noisy stream on the left: emails, Slack pings, agent outputs, calendar invites, watch readings, docs. It flows into Waldo in the middle. On the right, only three calm cards come out, for example:
- "Moved your 9am. You slept five hours."
- "The release is blocked on one review. It's yours."
- "Skipped 41 threads. None needed you."

The picture makes the claim before the copy does: lots in, little out, all of it useful.

**Alternative headline:** "Life happens. / Waldo handles it." (from the live site)

**What changed from your notes:** "100x better impact" is cut. It's a number nobody can check, and the funnel visual makes the same point without it.

---

## 3. The problem — what you're carrying alone

**Headline**
```
You're carrying
more than
you know.
```

**Body line:** Three things quietly slow down every day you have.

**Visual:** Three cards side by side. Each has a short title, one line of copy and a small picture.

### Card A — Your health
**Title:** Your most important asset has no one managing it.
**Line:** Your watch knows how you slept, how stressed you are, how recovered you are. Nothing does anything with that, least of all when work gets heavy.
**Picture:** Watch log lines ticking in, ending with "8:01am — Nothing acted on any of this." Caption: *847 data points last week. Not one acted on.*

### Card B — The setup tax
**Title:** Every new tool wants your whole life explained.
**Line:** A better tool shows up and you add it. Then you spend longer teaching it who you are than the problem ever took. Then the next tool shows up.
**Picture:** Stacked onboarding forms, all asking the same "Tell us about yourself…"

### Card C — You're the middleman
**Title:** Everything waits on you.
**Line:** Agents finish tasks, but you're the one holding the why. Every re-brief, every review and every "what did you mean?" goes through you, so the work moves at your speed, not the outcome's.
**Picture:** Agent outputs piling up behind a badge reading "Needs your review · 12".
**Link:** This is where Kennel starts → `/kennel`

**Aside:** *you just stopped noticing.*

**CTA:** None. This section is only the problem.

**What changed from your notes:**
- Your two work points ("the why gets lost" and "the meat proxy") are merged into Card C, since they're the same pain. That card points to Kennel, as you suggested.
- "Puts it to the best models so your health stays the best" is reworded. We can't promise health results, and the line reads as medical. Card A states the problem, and section 4 shows what Waldo does with it.
- "Meat proxy" is an internal term. On the page it becomes "the middleman."

---

## 4. An agent, not a product

**Headline**
```
Agents do tasks.
Waldo carries
outcomes.
```

**Visual:** Waldo in the centre, with specialist tools around it (Claude, Codex, Cursor, Linear, Calendar, Slack, a watch), all joined to one outcome card:
> **Release shipped.** Codex wrote it, Linear's updated, the team knows. One thing still needs you: sign-off on the changelog.

**Built (2026-10-01), replacing the picture above for "Works with every agent.":** a text thread with Waldo, set and moved the way iMessage does it (`components/site/agents-chat.tsx`, `Item`'s `scene` prop). You tell him a problem in plain words, with no tags ("pr 184 is green but nobody's read it. also i'm double booked at 3"). He reacts with a tapback, then answers in one dry line that hands each piece to the agent that should have it (Claude, Codex, Cursor: names in bold, no logo or pill) and keeps what he handles himself, in the first person (the calendar, the chasing, your sleep and training): "Cursor reads the PR. The 3pm is mine: the review moves to Thursday." Four problems, looping; plays only on screen.

Motion, after iMessage: the message is typed into the field (the mic becomes the blue send arrow with a small spring); on send, the bubble leaves the field and rises into the thread on a spring while older bubbles lift out of the way; the grey three-dot bubble pops in at its corner with two trailing circles, the dots rising one after another; his reply grows out of that corner; a tapback lands on the top corner of your bubble with a bounce, its mark moves (the thumb tips, the heart beats, the laugh shakes) and the bubble gives a little. Older messages blur away at the top. With reduced motion it stands as the first exchange. Colours are iMessage's own. The story is the homepage's (Priya, Maya, PR #184); nothing is sent or merged by itself.

**Three short beats** under the visual, one line each:

| Beat | Line |
|---|---|
| The best tool for every job | Specialist tools are miles ahead at what they do. Waldo uses them, and brings your context so you never fill in a thing. |
| Outcomes, not tasks | You tell an agent what to do. You tell Waldo what you want done, and it tells you when it's real. |
| It knows you | Your work, your life, how you're doing today. The same request gets a different answer on a rough day. |

**Aside:** *say it once.*

**CTA:** Let Waldo in →

**Check before launch:** "Never fill in a thing" has to be true on day one. If some setup is needed, change it to "never explain yourself twice."

---

## 5. Who it's for — you, not your job title

**Headline**
```
No two engineers
live the same
life.
```

**Body line:** Or two founders. Or two investors. Or two anyone. Waldo works for the person, not the profession.

**Visual: "same title, different day."** Two cards, both labelled *Engineer*:
- **Engineer A:** Three agents running. Toddler up at 5am. Marathon in April.
  Waldo: *Moved deep work to 2pm, after your nap window. The agents kept going.*
- **Engineer B:** On call this week. Night owl. Learning Japanese.
  Waldo: *Held your morning clear. Pushed Japanese to Sunday. On-call handoff is ready.*

Same job, different lives, different help.

**Starting with:** founders, engineers and investors, the people already working across many agents at once (from Why Waldo).

**Teams band** (a smaller strip under the cards):
> **Better as a team.** When your team runs on Waldo, work gets passed around with the context attached, and nobody has to explain it twice.

**Aside:** *built for you, not your job title.*

**CTA:** None.

**Open question:** Is a team version real or planned? Your pricing names it "Pack." If it's not coming soon, cut the band. If it stays, add one line: *"Your teammates never see your health data."* It has to be true.

---

## 6. Trust — you stay in charge

This is my call, as you asked.

**Headline**
```
It does as much
as you let it.
```

**Visual:** A three-position switch:
- **Tell me:** Waldo says what it would do.
- **Ask me:** Waldo suggests, you approve.
- **Just do it:** Waldo acts, and you can undo anything in one tap.

**Four quiet lines** below it:
- Only what you connect. Only what you allow.
- Reads message metadata (volume, timing, urgency), never what your messages say.
- Health is context for planning your day. Never medical decisions.
- Never sells your data. Never trains on it.

**Aside:** *on a leash you hold.*

**CTA:** None.

**Why this section:** An agent that acts across your work and health raises one question above all: "what stops it doing something I didn't want?" This answers it before the FAQ has to. No certifications are claimed until they're earned.

---

## 7. Where Waldo lives — the surfaces

**Headline**
```
One Waldo.
Wherever
you are.
```

**Visual:** Three cards, using the Why Waldo framing:

| Label | Surface | Status | Line | Link |
|---|---|---|---|---|
| Work | Kennel for Mac | Open beta | Lives in the notch. Shows what Waldo is carrying, and what needs you. | `/kennel` |
| Personal | Waldo for iPhone | Coming soon | Your day, your health, your decisions, in one calm place. | none |
| Everywhere else | Messaging & browser | Coming soon | Talk to the same Waldo in WhatsApp, Slack or your browser. | none |

"Coming soon" cards have no link, so there are no dead ends.

**Aside:** *same dog, different rooms.*

**Note:** The live Home calls the third card "Plugins." Why Waldo calls it "Messaging and browser." This uses the Why Waldo name. Pick one and use it everywhere.

---

## 8. Questions

**Headline**
```
You're going to
ask these.
```

Six questions, none of them repeating the trust section. Everything else goes to `/support`.

**How is Waldo different from ChatGPT or Claude?**
They answer when you ask. Waldo works toward an outcome, uses tools like them to get there, and comes back when it's done, or when it genuinely needs you.

**How is it different from WHOOP or Oura?**
They show you your data. Waldo does something with it. WHOOP tells you your recovery is low. Waldo already moved your morning.

**Do I have to set everything up?**
No. Connect what you already use. Waldo carries your context into every tool it works with, so you don't explain yourself twice.

**What if Waldo gets it wrong?**
Undo it in one tap. Waldo learns from every correction, and the first week is mostly it learning you.

**Do I need a smartwatch?**
It helps, since that's how Waldo knows how you're doing. Apple Watch, Oura, WHOOP, Garmin and Fitbit all work. Without one, Waldo leans on your calendar, work and patterns.

**What can I use today?**
Kennel for Mac is in open beta now. iPhone and messaging come next, and people on the list get in first.

**Below the list:** More questions → `/support` (only once that page exists)

**Aside:** *no fine print. we checked.*

**Check before launch:** The watch and "today" answers must match what actually ships.

---

## 9. Close

Not in your outline, but every page ends with one (see [sitemap.md](../sitemap.md)).

**Headline**
```
You're not the first.
You're also not
too late. Yet.
```

**CTA:** Let Waldo in →
**Aside:** *your watch has been waiting for this.*
**Visual:** The mascot resting in the footer scene, then the shared footer.

---

## Kept off Home

| What | Where it goes |
|---|---|
| The three scores (Recovery, Form, Weight) | How it works |
| The 10 named actions (Brief, Fetch, Adjustment…) | How it works |
| The long game / Constellation | How it works |
| Understands / Coordinates / Returns / Verifies loop | How it works |
| Full connector wall | Connectors |
| Industry quote cards | Why Waldo, once sources are checked |
| "Plans like Sherlock, thinks like Einstein…" | Cut |
| "Reads you like a clinician" | Cut (reads as a medical claim) |
| "Early Access" / "Learn More" / "Try now" buttons | Replaced by "Let Waldo in →" |

## Open questions for Suyash

1. **Hero:** go with "You can't keep up / with everything. / Waldo can." or keep "Life happens. Waldo handles it."?
2. **Teams:** is Pack real enough to mention? If yes, can we promise teammates never see your health data?
3. **Third surface name:** "Plugins" or "Messaging & browser"?
4. **Setup:** is "no setup, ever" true at launch, or should it say "never explain yourself twice"?
