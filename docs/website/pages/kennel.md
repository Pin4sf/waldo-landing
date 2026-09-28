# Kennel for Mac — Final Copy

Status: **Built. The live copy is at the top (v1.1: new hero and first section from the copy review, 2026-09-28).**
URL: `/kennel`
Live source: `app/kennel/page.tsx`
Checked against: the Kennel repo README and `docs/STATUS.md` (checkpoint 2026-09-13)

---

## Live copy (2026-09-28)

This is the copy on the built page right now, top to bottom. **Edit the words here**, then carry them into `app/kennel/page.tsx`.

How to read it (the three text levels are in [../type.md](../type.md)):
- `Label:` is the small grey word above a title.
- `###` lines are **titles**, and `/` marks where the line breaks.
- `Body:` is the regular text. There are no subtitles any more (2026-09-28): what used to be the subtitle and the line after it are now one paragraph.
- In lists, `(…)` is a small label, and *italics* or **bold** mark emphasis (dark, medium weight).
- `Picture:` lines describe the picture (and name its file, once there is one). They're notes, not copy.

Label: Kennel for Mac
### Your agents finish. / Kennel gets it done.
Body: Tell Kennel what should be true when you're done. It splits the work across Codex, Claude Code, Cursor and the rest, checks every result, and shows you the proof. It's free, open source and in open beta, and it runs on your Mac.
Buttons: "Try the beta on GitHub", "Get the Mac app first →"

_Picture: Kennel app window showing a project's work queue (`/build/kennel-hero-asset-3.svg`)_

---

### “Finished” isn’t / “done.”
Body: An output is what the session produced. An outcome is what you wanted. Most agent tools stop at the output. Kennel is built around the outcome.

- **Outcome first.** — What the project should look like in the end. Not the steps, the end state. That's the outcome, and it's the only thing Kennel measures against.
  - _Picture: Outcome card (`/build/kennel/outcome-first.svg`)_
- **Contracts come from the outcome.** — Kennel breaks the outcome into contracts for agents. Right slice, right hands, each one small enough for a single session to finish and prove.
  - _Picture: Outcome splitting into contracts (`/build/kennel/contracts-from-outcome.svg`)_
- **Waldo holds it together.** — Waldo shapes the outcome up front, keeps every contract in step, and catches anything that drifts from the plan before it reaches you.
  - _Picture: Waldo keeping contracts in step (`/build/kennel/waldo-holds.svg`)_
---

### Turns your intent / into an outcome.
Body: Waldo takes a loose sentence and turns it into a contract you can check.

_Picture: Kennel turning a loose intent into a checkable contract (`/build/kennel/intent-to-outcome.svg`)_

---

### One outcome. / Many hands.
Body: Contracts flow to your agents in the right order. Each one hands off to the next and reports against the same outcome.

_Picture: Contracts moving between agents, a status list, and a contract card (`/build/kennel/many-hands-2.svg`)_

---

### Read the card, / not the log.
Body: Every session summarises itself: what it did, what it's doing, what comes next. The full transcript is one click away.

_Picture: Kennel's work board with a session brief card (`/build/kennel/read-card-2.svg`)_

---

### Approve without / switching.
Body: Island puts questions, approvals and Home (every project, what moved, what needs you) in the menu bar. Answer, and the run continues.

_Picture: Kennel Island in the macOS menu bar (`/build/kennel/island-2.svg`)_

---

### Three things stop / being your job.
Body: Ferrying context. Picking the model. Checking the work. Kennel takes the coordinating, the checking and the routing. You keep the decisions.

- **Stop babysitting your agents.** — You approve the outcome, Kennel handles the rest. Each agent gets the context it needs and a contract for what's expected. No re-explaining, no tab hopping.
  - _Picture: Agents with context and contracts_
- **Done means you’ve seen the proof.** — Every contract comes with its own checks. Kennel gathers the evidence, and you make the call.
  - _Picture: Evidence attached to a contract_
- **Gets the best out of what you have.** — Every piece goes to the agent and model you approve. Your subscriptions, your keys.
  - _Picture: Agent and model picker_
---

### Your code / stays home.
Body: Kennel runs on your Mac and keeps its records there. Your agents work through your own accounts, the way they always have. A kennel, not a cloud.

- **Local first.** — Everything Kennel tracks lives on your machine.
- **Only the access you approve.** — Each agent gets exactly the files and permissions its contract needs. Nothing more.
- **Nothing hidden.** — If something isn't set up, Kennel tells you. It never quietly swaps in a different agent.

---

### Kennel is / Waldo at work.
Body: Waldo is one personal agent across work and life. Kennel is where it starts: your agents, your outcomes, on your Mac. The same Waldo is coming to your iPhone, where it knows how you're actually doing. Same dog, first room.
Buttons: "See the whole of Waldo"

- (You are here) **Kennel for Mac** — Waldo at work.
- (Coming soon) **Waldo for iPhone** — Waldo in your personal life.
- (Coming soon) **Messaging & browser** — Waldo everywhere else.

---

### Built in / the open.
Body: Kennel is open source under Apache-2.0. Read the code, file an issue, or build with us. Good dogs share.

- [Star on GitHub →](https://github.com/waldoco/Waldo-Kennel)
- [Good first issues →](https://github.com/waldoco/Waldo-Kennel/issues)
- [Discussions →](https://github.com/waldoco/Waldo-Kennel/discussions)
- [How to contribute →](https://github.com/waldoco/Waldo-Kennel/blob/main/CONTRIBUTING.md)

---

### Before you / clone it.
Body: No fine print. Just a readme.

- **Is Kennel free?**
  Yes. It's open source. You bring your own agent subscriptions and API keys.
- **Which agents does it work with?**
  Codex, Claude Code, Cursor, OpenCode and Pi. What each one can do depends on how you've set it up.
- **Does my code leave my Mac?**
  Kennel keeps its records on your Mac. Your agents work through your own accounts, just as they do without Kennel.
- **What does “open beta” mean?**
  It works, and people are using it, but it's still being finished. Today you build it from source. A packaged Mac app is coming. Join the list to hear first.

---

### More agents. / Less for you to carry.
Body: Tell Kennel what should become true. Your agents do the rest, with evidence, not vibes.
Buttons: "Try the beta on GitHub", "Get the Mac app first →"

> **Everything below this point is the earlier draft and the reasoning behind it, kept as a record.** Where it disagrees with the live copy above, the live copy wins.

---

## The page's job

Get developers who run coding agents to try Kennel, and show them it's the first piece of Waldo.

**Who it's for:** founders, engineers and investors already juggling several coding agents.

## Decisions locked

| Question | Decision | Why |
|---|---|---|
| Download button? | **"Try the beta on GitHub"** until a packaged app ships. Then switch to "Download for Mac." | There's no app file to download yet |
| Who picks the model? | **"Every piece goes to the agent and model you approve."** | STATUS.md: "approved provider/model bindings" |
| Island status? | **In the beta.** "Coming soon" removed. | STATUS.md: Island "starts with the desktop" |
| Mention Linux? | **No.** Kennel is presented as Mac only. | Keeps the story simple. Linux is a source-build detail |
| Waitlist? | **The main Waldo waitlist, tagged with where the signup came from:** `/waitlist?utm_source=kennel&utm_medium=site` | One list. The site already tracks signup sources |
| Spelling | **British, site-wide** | Matches AGENTS.md and the other page docs |
| GitHub link | `https://github.com/waldoco/Waldo-Kennel` everywhere | The repo moved from `Pin4sf` |

## Page rules

- Keep the dark look (`#111` background, the dark menu variant) and all the current visuals.
- No "Learn More" links anywhere.
- Use the app's own names: Outcome, Contract, Island, Home.
- The shared site footer goes at the bottom.

## Sections

```
0 Hero → 1 Not done → 2 Intent to outcome → 3 Many hands → 4 Read the card
→ 5 Island → 6 Three things → 7 Stays on your Mac → 8 Part of Waldo
→ 9 Open source → 10 Questions → 11 Close → Footer
```

---

## 0. Hero

**Headline:** Kennel for Mac

**Body line:** Kennel understands your build, and takes your agent outputs to the intended outcome.

**Meta line (small, under the body):** Open source · Free · Runs on your Mac · Open beta

**Logo row:** Works with **Codex · Claude Code · Cursor · OpenCode · Pi**

**Buttons:**
- Primary: **Try the beta on GitHub** → GitHub repo
- Secondary: **Get the Mac app first →** → `/waitlist?utm_source=kennel&utm_medium=site`

**Visual:** The current app window screenshot (`/build/kennel-hero-asset-3.svg`).

---

## 1. Agent finished is not "done."

**Header:** Agent finished is not "done."
**Body:** An output is what the session produced. An outcome is what you wanted. Every agent tool measures the outputs. Kennel is built around the outcome.

**Cards:**

| Title | Body |
|---|---|
| **Outcome first.** | What the project should look like in the end. Not the steps, the end state. That's the outcome, and it's the only thing Kennel measures against. |
| **Contracts come from the outcome.** | Kennel breaks the outcome into contracts for agents. Right slice, right hands, each one small enough for a single session to finish and prove. |
| **Waldo holds it together.** | Waldo shapes the outcome up front, keeps every contract in step, and catches anything that drifts from the plan before it reaches you. |

**Link:** none

---

## 2. Turns your intent into an outcome.

**Header:** Turns your intent into an outcome.
**Body:** Waldo takes a loose sentence and turns it into a contract you can check.
**Visual:** Current (`/build/kennel/intent-to-outcome.svg`).
**Link:** none

---

## 3. One outcome. Many hands.

**Header:** One outcome. Many hands.
**Body:** Contracts flow to your agents in the right order. Each one hands off to the next and reports against the same outcome.
**Visual:** Current (`/build/kennel/many-hands-2.svg`).
**Link:** none

---

## 4. Read the card, not the log.

**Header:** Read the card, not the log.
**Body:** Every session summarises itself: what it did, what it's doing, what comes next. The full transcript is one click away.
**Visual:** Current (`/build/kennel/read-card-2.svg`).
**Link:** none

---

## 5. Approve without switching.

**Header:** Approve without switching.
**Body:** Island puts questions, approvals and Home (every project, what moved, what needs you) in the menu bar. Answer, and the run continues.
**Visual:** Current (`/build/kennel/island-2.svg`), full width.
**Label:** none ("Coming Soon" removed)

---

## 6. Three things stop being your job.

**Header:** Three things stop being your job.
**Body:** Ferrying context. Picking the model. Checking the work. Kennel takes the coordinating, the checking and the routing. You keep the decisions.

**Cards:**

| Title | Body |
|---|---|
| **Stop babysitting your agents.** | You approve the outcome, Kennel handles the rest. Each agent gets the context it needs and a contract for what's expected. No re-explaining, no tab hopping. |
| **Done means you've seen the proof.** | Every contract carries its own checks. Kennel gathers the evidence, and you make the call. |
| **Gets the best out of what you have.** | Every piece goes to the agent and model you approve. Your subscriptions, your keys. |

**Link:** none

---

## 7. Stays on your Mac · NEW

**Header:** Your code stays home.
**Body:** Kennel runs on your Mac and keeps its records there. Your agents work through your own accounts, the way they always have.

**Cards** (same dark card style as section 6):

| Title | Body |
|---|---|
| **Local first.** | Everything Kennel tracks lives on your machine. |
| **Only the access you approve.** | Each agent gets exactly the files and permissions its contract needs. Nothing more. |
| **Nothing hidden.** | If something isn't set up, Kennel tells you. It never quietly swaps in a different agent. |

**Aside:** *a kennel, not a cloud.*

---

## 8. Part of Waldo · NEW

**Header:** Kennel is Waldo at work.
**Body:** Waldo is one personal agent across work and life. Kennel is where it starts: your agents, your outcomes, on your Mac. The same Waldo is coming to your iPhone, where it knows how you're actually doing.

**Visual:** Three small tiles, with Kennel lit and the others dimmed:

| Label | Tile | Tag |
|---|---|---|
| Work | Kennel for Mac | You are here |
| Personal | Waldo for iPhone | Coming soon |
| Everywhere else | Messaging & browser | Coming soon |

**Link:** See the whole of Waldo → `/how-it-works`

**Aside:** *same dog, first room.*

---

## 9. Open source · NEW

**Header:** Built in the open.
**Body:** Kennel is open source under Apache-2.0. Read the code, file an issue, or build with us.

**Links:**
- Star on GitHub → `https://github.com/waldoco/Waldo-Kennel`
- Good first issues → `https://github.com/waldoco/Waldo-Kennel/issues`
- Discussions → `https://github.com/waldoco/Waldo-Kennel/discussions`
- How to contribute → `https://github.com/waldoco/Waldo-Kennel/blob/main/CONTRIBUTING.md`

**Aside:** *good dogs share.*

---

## 10. Questions · NEW

**Header:** Before you clone it.

**Is Kennel free?**
Yes. It's open source. You bring your own agent subscriptions and API keys.

**Which agents does it work with?**
Codex, Claude Code, Cursor, OpenCode and Pi. What each one can do depends on how you've set it up.

**Does my code leave my Mac?**
Kennel keeps its records on your Mac. Your agents work through your own accounts, just as they do without Kennel.

**What does "open beta" mean?**
It works, and people are using it, but it's still being finished. Today you build it from source. A packaged Mac app is coming. Join the list to hear first.

**Aside:** *no fine print. just a readme.*

---

## 11. Close

**Headline**
```
More agents.
Less for you
to carry.
```

**Body line:** Tell Kennel what should become true. Your agents do the rest, with evidence, not vibes.

**Buttons:**
- Primary: **Try the beta on GitHub** → GitHub repo
- Secondary: **Get the Mac app first →** → `/waitlist?utm_source=kennel&utm_medium=site`

**Then:** the shared site footer.

---

## Search and sharing (metadata)

- **Title:** Kennel for Mac | Stop managing agent sessions. Manage outcomes. *(unchanged)*
- **Description:** Kennel is Waldo's open-source Mac app for supervising coding agents. Tell it what should become true, approve the plan, and let Codex, Claude Code, Cursor, OpenCode or Pi earn it, with evidence, not vibes. *(the semicolon becomes a comma, "or" replaces "and")*

---

## When things change

| When this happens | Change this |
|---|---|
| A packaged Mac app ships | Primary button → "Download for Mac". Drop "Open beta" from the meta line and the FAQ. |
| Kennel starts using health context | Section 8 can add: "Kennel won't hand you the hard review on a rough night." |
| Parallel runs ship | Section 3 can say "side by side." |

---

## What changed from the live page

1. "Download for Mac" and "Opensource on GitHub" → "Try the beta on GitHub"
2. GitHub links now point to `waldoco/Waldo-Kennel`
3. "Done means proven" card reworded to match what the beta does
4. "Waldo reads what the project already knows" removed (a roadmap feature)
5. "and subagents" removed. Model routing reworded to "the agent and model you approve"
6. Island's "Coming Soon" removed
7. All "Learn More" links removed
8. Close: "More intelligence" → "More agents," and a new body line instead of repeating the hero
9. Added: meta line, agent logo row, waitlist button, and sections 7–10
10. Added the shared footer, and switched to British spelling
