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

### You can’t keep up / with everything. Waldo can.
_2026-10-04: new title (was "Every tool, handled."), centred, and an endless carousel. This is the section that names the problems, so each card says the problem first and then, in a sentence, how Waldo solves it. Picture notes are in brackets._

- **Your health data is huge. Almost none of it gets used.** Months of sleep, heart rate and recovery sit in your watch, WHOOP or Oura, in breakdowns most of us never learn to apply. Pasting a few readings into a chat never compounds. Waldo reads all of it, every day, and turns it into a plan.
  - _Picture: the Apple Watch recovery screen (`/assets/home/problem/watch-recovery.svg`)_
- **Every tool needs teaching. None knows the day you’re having.** You spend hours telling each tool and AI who you are, and it still falls short. They're built for a normal day. On no food, little sleep and back-to-back meetings, nothing connects the dots. Waldo does, and fixes the cause, not the symptom.
  - _Picture: four rows of connector tiles drifting (`ConnectorRows`)_
- **Chat AI writes walls of text you can’t review.** Its memory is gone when you change chats, you can't add all your context by hand, and each one locks you into its own ecosystem. It waits to be asked, with no consumer app on top. Waldo remembers across everything, speaks up when it matters, and works with every agent. [This is where Kennel starts →](/kennel)
  - _Picture: an agent's finished work waiting for review (`/assets/home/problem/agent-diffs.svg`)_
- **Text agents run where you can’t see.** Your data is processed online, with no way to see how, and nothing you control. Waldo shows what he can access and what he does, and lets you take access back.
  - _Picture: a text thread with Waldo (`AgentsChat`)_
- **Everyone’s day has its own rhythm.** Busy people either spend real time working out what to do when, or let things happen. Waldo learns your rhythm, tells a rough day from an easy one and plans around it. He looks after your day the way a considerate person would.
  - _Picture: the same Tuesday over three weeks (`LearningWeeks`)_
---

---

### Same Waldo. / Different hats.
Body: The same Waldo, in the place each of them already works.
_Layout (2026-10-04): centred headline and an endless carousel with the card in the middle moving, the same as "You can't keep up with everything. Waldo can."_

- **Founders** — Three calls back to back, then the co-founder sync. Waldo puts ten minutes of air before it, so the snappy reply never happens.
  - _Picture: a founder travelling, texting Waldo in WhatsApp (iOS look, edge to edge, no phone frame). Sends a photo of the departures board, a voice note and a clip of a hotel room (`components/site/hats-scenes.tsx`, FounderWhatsApp). Photos are from Unsplash (free licence, no credit needed): the departures board by Zulfugar Karimov, the hotel room by Wes Hicks (`/assets/home/hats/`)_
- **Engineers** — Waldo finds the hour you're sharpest and gives it to the hard problem. Standup moves somewhere else.
  - _Picture: an engineer asking Waldo from a light-mode terminal. Attaches a screenshot of a red build and a screen recording (EngineerCli)_
- **Investors** — Pitches spaced to what you can actually give. The founder at pitch five gets your pitch-one attention.
  - _Picture: an investor on the Apple Watch photo from "Your watch knows" (`/assets/home/hats/apple-watch.png`), screen animated in code. Records a voice note, then sends a slide (InvestorWatch)_
- **Designers** — The crit is at 3 and the empty states aren't done. Waldo gives you the clearest hours before it and moves the review back.
  - _Picture: a designer in Figma (`DesignerFigma`): a frame on the grey canvas with a comment pin, and the comment thread open beside it. The designer types an @Waldo comment and drops in a screenshot; he answers under it. Two exchanges (the review moves, the icon set gets the morning)._
- **Sales** — Your most important call lands in your best hour. The follow-up is drafted before you hang up.
  - _Picture: a salesperson in a Slack DM with Waldo (`SalesSlack`). Sends a voice clip, then a screenshot of the pipeline. He replies with one line and an app card showing what he did: a Gmail draft (Draft · not sent, Review) and a calendar move (Moved, Undo), then a thumbs-up arrives. Names (Noor, Ria, Dana, Acme) are made up._

---

### Your context. / Your call.
_2026-10-04 (local review): now one single visual instead of the four-card carousel, told as a story: one rounded box with the centred heading, a "Read the Privacy page" button and one app window rising out of the foot that plays five beats about one meeting (he sees, he asks, you decide, he keeps, where it goes). See `docs/website/trust-carousel-review.md`. The carousel notes below describe what it replaced._
_2026-10-03 (local review, not published): replaces the "Waldo does as much as you let it" Tell / Ask / Just do it carousel. A carousel of four panels about privacy and control. Every panel is the same mini-panel (label, state, two to four rows, one control) and every word is limited to what the product code does. The evidence for each panel, and the questions it can't answer yet, are in [../trust-carousel-review.md](../trust-carousel-review.md). Nothing connects to a service; the controls only reveal detail._

Body: What he can access. What he can do. What he keeps.

- **What can he see?** — Each connection shows what Waldo can read, and where to take that access back.
  - _Picture: one Google connection: can read Calendar, Gmail, Tasks (`calendar.readonly`, `gmail.readonly`, `tasks.readonly`); can change nothing, editing is a separate permission; "How to take access back" opens the route in the Google Account._
- **What can he do?** — Waldo prepares a change and waits. Nothing moves until you approve it.
  - _Picture: a permission request: move Design review to Thursday, 11:00 (Google Calendar, one event), waits for your yes, expires after 4 hours; the Northstar reply is held, prepared, not sent. "Review the change" shows now and proposed._
- **What does he remember?** — A saved note shows when it last changed. To correct it, tell Waldo.
  - _Picture: one saved note ("Keeps mornings for focus work."), a preference, written by Waldo, used as background and not as an instruction; "How to correct it" shows the chat route._
- **Where does my data go?** — The services that handle your data, and what each one does, in plain words.
  - _Picture: Supabase (stores), Anthropic (writes replies), Telegram (carries his messages, if you chat there); policy in draft; links to the Privacy page._

Small line under the carousel: Illustrative controls · sample data. Take it off once the controls are real and the policy facts are confirmed.

_The old section's pieces are unused now: the console tour (`console-tour.tsx`), the "Tell me" Mac notification (`mac-notifications.tsx`), and the Ask me / Just do it pictures (`agent-approval.svg`, `agent-patrol.svg`). The old copy is kept below as a record._

#### The earlier section (kept as a record)

### Waldo does as much as you let it. / Then shows its work. (earlier version)
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
1 Kennel banner → 2 Hero → 3 Every tool, handled (five cards) → 3b What you see of it (five phone screens; swapped to come after "Every tool, handled" on 2026-10-04) → 4 Who it's for
→ 5 Trust → 6 Questions → 7 Close (2026-10-04: "An agent, not a product" and "Where Waldo lives" are removed)
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

**Same Waldo. Different hats., now five cards (2026-10-04):** the "And everyone else" colour-grid card was dropped (the grid animation did not work). In its place two more scenes in the same style as the first three: Designers (Figma comment thread) and Sales (Slack DM). The other jobs from the profession list (product, chief of staff, consulting, writing, students) have no card yet; the Sales and Designers lines reuse the spirit of their profession copy.

**Close (2026-10-04, local review):** replaces "Your agents aren't going to fix your life." with the live build's hero section, copied as it is from `components/home-build/home-build-page.tsx` (`components/site/live-close.tsx`): heading **Life happens. Waldo handles it.**, body "Waldo is the one assistant that plans like Sherlock, thinks like Einstein and moves like the Flash — all in the body of a friendly dalmatian.", buttons **Early Access** (to /waitlist) and **Learn More** (to /blogs), and the live `HandledCardsSection` (`components/home/handled-cards-section.tsx`): five coloured cards, a fan on desktop, click one to open it and dock the rest, a swipeable deck on a phone. It sits on the live page's #F4F3F0 and is zoomed to 90% like the live page, with the same four `.hero-cards-only` style rules. Taken verbatim on Suyash's instruction. Note for review: the brand notes list "Learn More" and cultural references as banned, and "clinician" reads as a medical claim.
