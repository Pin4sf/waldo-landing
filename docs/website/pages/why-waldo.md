# Why Waldo — Founder's Note

Status: **Built. The live copy is at the top (the copy review's fixes, 2026-09-28). Still needs Suyash's own story in the marked gaps.**
Last updated: 2026-09-28
URL: `/why-waldo`
Live source: `app/why-waldo/page.tsx`
Built from: the live Why Waldo page (its thesis is kept almost whole, rewritten in first person), the Home and How it works docs

---

## Live copy (2026-09-28)

This is the copy on the built page right now, top to bottom. **Edit the words here**, then carry them into `app/why-waldo/page.tsx`.

How to read it (the three text levels are in [../type.md](../type.md)):
- `Label:` is the small grey word above a title.
- `###` lines are **titles**, and `/` marks where the line breaks.
- `Body:` is the regular text. There are no subtitles any more (2026-09-28): what used to be the subtitle and the line after it are now one paragraph.
- In lists, `(…)` is a small label, and *italics* or **bold** mark emphasis (dark, medium weight).
- `Picture:` lines describe the picture (and name its file, once there is one). They're notes, not copy.

The letter's chapter headings are `####`. `>` lines starting "For Suyash to write" are the dashed boxes on the page.

Label: Why Waldo

### Why I’m building / Waldo.
Body: One personal agent, for a world full of agents.

Byline: **Suyash Pingale**, Founder, September 2026 (with his photo)

> **For Suyash to write:** **The moment.** Suyash's opening, 3–5 sentences: the day it clicked that Waldo had to exist. The day, the tools open, how it felt. End on the feeling, not the idea.

#### Two worlds

Here's what I kept seeing.

AI is splitting into two worlds. On one side, personal AI keeps getting better at knowing your life: your messages, your calendar, your preferences. On the other, specialist agents keep getting better at doing work: writing code, researching, browsing, sending, analysing.

Everyone's building one side or the other. I don't think people will want both separately. Nobody wants one AI that knows their life, and a different set of systems to manage every agent they use at work.

They'll want one agent that understands them, and coordinates everything else around what they're actually trying to do.

> They'll want one agent that understands them, and coordinates the rest.

#### Done isn’t done

Today's agents can already finish impressive tasks. But finishing a task isn't the same as getting what you wanted.

An agent can finish the code while the release is still blocked. A research agent can hand you a report while the decision is still open. An email can be drafted while the promise behind it is still unkept.

So you're still the one who explains the goal, follows each run, checks what actually changed, chases what failed, and remembers what's unfinished.

> We were promised assistants. We got a job managing them.

#### The part nobody was building

Being personal isn't only about knowing who you are. It's about knowing the state you're in.

Your meetings affect your focus. Your sleep affects your capacity. Some days you have room to take on more. Other days, protecting your attention is the whole job. The same request deserves a different answer on those two days.

Your watch already knows which day it is. It's been collecting that for years, and nothing has ever done anything with it. Health apps give you a score and leave you to work out what it means.

So Waldo uses those signals (sleep, recovery, stress, activity) as context for how it plans, what it moves, and when it leaves you alone. Not as another score to manage. Not to make medical decisions for you. Because the right plan depends on the person who has to live through it.

> Health becomes context for your day, not another score to manage.

#### What Waldo is

As AI gets more capable, people shouldn't have to become managers of AI.

Waldo is one agent that stays with you across work and life.

You tell it what you want to get done. It understands the context, brings in the right agents and tools, comes back only when a decision is genuinely yours, and stays with the outcome until something real has changed. When an agent says “done,” Waldo checks.

Models will keep getting better. Agents will keep multiplying. Tools and interfaces will change. The part that should stay constant is the one that works for you: your context, your outcomes, and your relationship with Waldo.

#### Why we started with Kennel

We started where the problem is already loud: founders, engineers and investors who already work across several AI agents at once. For them, “I'm the one coordinating all of this” isn't a future problem. It's Tuesday.

[Kennel](/kennel) is Waldo's first surface, a Mac app that runs your coding agents toward an outcome and shows you the proof. It's open source, and it's in open beta now. It's where we find out whether one personal agent can carry an outcome across many agents without making you the coordinator.

From there, Waldo comes to your iPhone, where it gets to know the person behind the work.

#### What I believe (and what we won’t do)

A few things I hold us to:

- **One person, one Waldo.** You shouldn't have to recreate yourself inside every new AI product.
- **Outcomes, not activity.** More agent runs isn't the goal. Something real changing in your world is.
- **Done should mean something changed.** A finished run is evidence, not proof.
- **Quiet by default.** Waldo speaks when it's worth it, and leaves you alone when it isn't.
- **More capable AI should mean you carry less.** Less re-briefing. Less supervision. Less remembering everything yourself.

And a few things we won't do:

- We won't sell your data, or use it for ads.
- We won't read the words in your messages. The pattern is enough.
- We won't pretend to be your doctor.
- We won't build streaks, badges or anything designed to keep you staring at an app.

#### Where we are

> **For Suyash to write:** **Where we are.** Two or three honest sentences from Suyash: who's building Waldo, where things stand, what's working, what's hard.

Kennel is in open beta today. Waldo for iPhone is next. We're letting people in a few at a time.

If this sounds like your problem, I'd love for you to try it. And whether or not you do, write to me. I read every reply.

> **For Suyash to write:** **Reply address** and **signature** go here.

Suyash

**P.S.** You might be wondering about the Dalmatian. The spots do real work: one spot is an observation, enough of them make a pattern. There's a whole note about it: [We put a Dalmatian on it](/blogs/why-a-dalmatian).

Body: **One person. One Waldo.**

Buttons: "Let Waldo in →", "See how it works"

> **Everything below this point is the earlier draft and the reasoning behind it, kept as a record.** Where it disagrees with the live copy above, the live copy wins.

---

## The page's job

Home shows the idea. How it works explains it. **This page is where the founder says why it has to exist,** in his own voice.

It should read like a **letter**, not a landing page. Someone should finish it thinking "I trust the person building this," and want to reply.

## What makes it feel like a founder's note

| Element | Why |
|---|---|
| **One narrow column** (~640px), generous line height, no cards or grids | Reads like a letter, not a pitch deck |
| **First person.** "I" for beliefs, "we" for what the team does | A person, not a company |
| **Byline at the top:** small photo, name, role, date, read time | You know who's talking before you start |
| **A real opening moment** (Suyash's own) | Founder notes live or die on the first paragraph |
| **Two or three pull quotes** in Corben | Lets skimmers catch the argument |
| **Handwritten signature** at the end | The personal close |
| **A P.S.** | Everyone reads the P.S. |
| **"Reply to me"** instead of a hard sell | The ask is a conversation, then the waitlist |

## Layout

```
Menu (shared)
→ Label · Headline · Subtitle
→ Byline (photo · name · role · date · read time)
→ The letter (7 short parts, light Corben subheads, 2–3 pull quotes)
→ Signature · P.S.
→ Quiet close: "Let Waldo in →" + two small links
→ Footer (shared)
```

**Design notes:**
- Body in SF Pro Rounded at a larger reading size (about 19–20px), on the warm off-white `#FAFAF8`
- Subheads in Corben, small, so they guide without breaking the letter
- Pull quotes: Corben, larger, with a thin orange rule on the left (the one orange touch on screen)
- No section numbers ("01, 02…"), no card grids, no feature lists. The current page's "The Waldo ecosystem" cards become one paragraph.
- A "Share this note" link at the end (copy link)
- The mascot doesn't appear. This page is the founder's.

---

## THE LETTER (draft)

> Lines in **[brackets]** are for Suyash to replace with his own story. Everything else is a draft he should rewrite freely. It has to sound like him, not like me.

---

**Label:** Why Waldo

**Headline**
```
Why I'm building
Waldo.
```

**Subtitle:** One personal agent, for a world full of agents.

**Byline:** [photo] **Suyash Pingale**, founder · {September 2026} · 6 min read

---

### The moment

**[Suyash: open with a real moment, 3–5 sentences. The day you realised this had to exist. Prompts:**
- **What were you doing when it clicked? Be specific: the day, the tools open, how you felt.**
- **Was there a morning your watch knew you were wrecked, and your calendar didn't care?**
- **Or a night spent babysitting agents that said "done" when nothing was done?**
- **End the paragraph on the feeling, not the idea.]**

---

### Two worlds

Here's what I kept seeing.

AI is splitting into two worlds. On one side, personal AI keeps getting better at knowing your life: your messages, your calendar, your preferences. On the other, specialist agents keep getting better at doing work: writing code, researching, browsing, sending, analysing.

Everyone's building one side or the other. I don't think people will want both separately. Nobody wants one AI that knows their life, and a different set of systems to manage every agent they use at work.

They'll want one agent that understands them, and coordinates everything else around what they're actually trying to do.

> **Pull quote:** They'll want one agent that understands them, and coordinates the rest.

---

### Done isn't done

Today's agents can already finish impressive tasks. But finishing a task isn't the same as getting what you wanted.

An agent can finish the code while the release is still blocked. A research agent can hand you a report while the decision is still open. An email can be drafted while the promise behind it is still unkept.

So you're still the one who explains the bigger goal, coordinates the agents, follows each run, reviews the results, decides what happens next, checks what actually changed, chases what failed, and remembers what's unfinished.

We were promised assistants. We got a job managing them.

> **Pull quote:** Agents execute tasks. The person still carries the outcome.

**[Suyash, optional: one line about your own version of this. The number of agent windows you had open last week, say.]**

---

### The part nobody was building

Being personal isn't only about knowing who you are. It's about knowing the state you're in.

Your meetings affect your focus. Your sleep affects your capacity. Some days you have room to take on more. Other days, protecting your attention is the whole job. The same request deserves a different answer on those two days.

Your watch already knows which day it is. It's been collecting that for years, and nothing has ever done anything with it. Health apps give you a score and leave you to work out what it means.

So Waldo uses those signals (sleep, recovery, stress, activity) as context for how it plans, what it moves, and when it leaves you alone. Not as another score to manage. Not to make medical decisions for you. Because the right plan depends on the person who has to live through it.

> **Pull quote:** Health becomes context for your day, not another score to manage.

---

### What Waldo is

Waldo is one agent that stays with you across work and life.

You tell it what you want to get done. It understands the context, brings in the right agents and tools, comes back only when a decision is genuinely yours, and stays with the outcome until something real has changed. When an agent says "done," Waldo checks.

Models will keep getting better. Agents will keep multiplying. Tools and interfaces will change. The part that should stay constant is the one that works for you: your context, your outcomes, and your relationship with Waldo.

---

### Why we started with Kennel

We started where the problem is already loud: founders, engineers and investors who already work across several AI agents at once. For them, "I'm the one coordinating all of this" isn't a future problem. It's Tuesday.

Kennel is Waldo's first surface, a Mac app that runs your coding agents toward an outcome and shows you the proof. It's open source, and it's in open beta now. It's where we find out whether one personal agent can carry an outcome across many agents without making you the coordinator.

From there, Waldo comes to your iPhone, where it gets to know the person behind the work.

---

### What I believe (and what we won't do)

A few things I hold us to:

- **One person, one Waldo.** You shouldn't have to recreate yourself inside every new AI product.
- **Outcomes, not activity.** More agent runs isn't the goal. Something real changing in your world is.
- **Done should mean something changed.** A finished run is evidence, not proof.
- **Quiet by default.** Waldo speaks when it's worth it, and leaves you alone when it isn't.
- **More capable AI should mean you carry less.** Less re-briefing. Less supervision. Less remembering everything yourself.

And a few things we won't do:

- We won't sell your data, or use it for ads.
- We won't read the words in your messages. The pattern is enough.
- We won't pretend to be your doctor.
- We won't build streaks, badges or anything designed to keep you staring at an app.

**[Suyash: check each "won't" is something you'll hold to for good. They're promises.]**

---

### Where we are

**[Suyash: two or three honest sentences. Who's building Waldo (names, if they're OK being named, e.g. Shivansh), where you are, what's working, what's hard. Honesty here builds more trust than polish.]**

Kennel is in open beta today. Waldo for iPhone is next. We're letting people in a few at a time.

---

### Close

If this sounds like your problem, I'd love for you to try it. And whether or not you do, write to me. I read every reply. **[{Suyash's email}]**

**[Signature image]**

**Suyash**

---

**P.S.** You might be wondering about the Dalmatian. The spots do real work: one spot is an observation, enough of them make a pattern. There's a whole note about it → *We put a Dalmatian on it* (`/blogs/why-a-dalmatian`)

---

### Quiet close (below the letter)

**Button:** Let Waldo in →
**Small links:** See how it works → `/how-it-works` · Try Kennel for Mac → `/kennel`
**Aside:** *one person. one waldo.*

---

## Search and sharing

- **Title:** Why I'm building Waldo — a note from the founder
- **Description:** One personal agent for a world full of agents. Why Waldo exists, what it believes, and why it starts with Kennel.
- **Share image:** Suyash's photo plus the headline, or the signature on warm off-white

---

## From the current page: kept, changed, cut

| Current page | In the founder's note |
|---|---|
| "One personal agent for a world full of agents." | Kept, as the subtitle |
| 01 "Why Waldo" (two worlds) | Kept, in first person ("Two worlds") |
| 02 "The problem" + the coordination list | Kept, tightened ("Done isn't done"). The list becomes one sentence. |
| "Agents execute tasks. The person still carries the outcome." | Kept, as a pull quote |
| 03 "How Waldo works" + the outcome-state list | Shortened to one paragraph ("What Waldo is"). The detail lives on How it works. |
| 04 "Agents work on tasks. Waldo carries outcomes." | Folded into "What Waldo is" |
| 05 "One Waldo across work and life" + four state cards | Kept as prose in "The part nobody was building" |
| 06 "Health-aware by design" | Kept, shorter, with the "not medical" line |
| 07 "The Waldo ecosystem" (three cards) | One paragraph in "Why we started with Kennel" |
| 08 Product philosophy (six principles) | Five short lines in "What I believe" |
| 09 "Where we are starting" | Kept ("Why we started with Kennel") |
| "More intelligence should create more human agency." | Reworded: "More capable AI should mean you carry less." |
| "One person. One Waldo." closing | The aside |
| Section numbers, card grids, eyebrow labels | Cut. A letter doesn't need them. |
| **NEW** | The opening moment, "What we won't do," "Where we are," signature, P.S., reply-to-me |

**Industry quote cards** (Garry Tan, Andrew Chen and others, from the old Home): *not* on this page. They'd turn a letter back into a pitch. If one really supports a point, weave it into the text as a single linked line, with the source checked.

---

## Open questions for Suyash

1. **Your story:** can you write the opening moment and "Where we are"? Or talk it through, and I'll turn it into a draft for you to edit.
2. **Photo and signature:** do you have a portrait photo and a scanned signature?
3. **Reply address:** which email should readers write to? Will you read it?
4. **Team names:** OK to name Shivansh and others?
5. **"Won't do" list:** are you comfortable promising all four, permanently?
6. **Headline:** "Why I'm building Waldo." or keep "One personal agent for a world full of agents." as the headline?
