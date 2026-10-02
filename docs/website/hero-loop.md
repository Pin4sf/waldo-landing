# The homepage loop

Status: **Brainstorm — nothing built.** Reference: [cofounder.co](https://cofounder.co), looked at on 2026-09-29.

A moving picture on the homepage that plays by itself and says what the whole product is, without the reader having to hover, click or scroll a particular way. It sits near the top, under the hero copy.

---

## What the reference actually does

Cofounder's homepage has one section that carries the whole product. It is worth being precise about why it works, because the parts are separable from its look.

1. **Two panes, one story.** On the left, a map of the whole system: a centre node, spokes out to every department, drawn as thin dashed lines. On the right, a conversation with the product, typing itself out.
2. **It plays on its own.** No scroll-scrubbing, no hover. It starts when it comes into view and repeats.
3. **The map is calm; the feed is busy.** The map barely moves — a small counter ticks near a node, a dot travels down a spoke. All the motion and all the new text is on the right. That contrast is what stops it feeling like a screensaver.
4. **Status chips do the talking.** Small tags next to each line — "Running", "Queued", "Agent requires approval". They say "this is happening now" without a single word of marketing copy.
5. **Everything shown is a real product surface.** Real task rows, real message bubbles. Nothing abstract, no floating gradients.
6. **It ends where the product ends.** The last thing to appear is a finished piece of work, not a chart.

Points 2 to 6 are the ones worth taking. Point 1 (the layout) is theirs, and copying it would make our page look like a copy.

---

## What ours has to say

The arc, in four beats:

**a signal arrives → Waldo understands it → Waldo acts across your tools → you get one message.**

Every concept below has to land all four, and has to end on the fourth. If a reader watches once and comes away thinking "it shows me my health", the loop failed. The point is that the work was already done.

---

## Concept A — The night shift

A single horizontal line across the section, running from about 1am to 9am. A quiet time marker moves left to right.

- Early on, small cards drop in below the line as the body reports in: time asleep, a heart-rate-variability dip, stress settling. Each card is one of the existing product cards, with Waldo's plain sentence under it.
- Around 6am the mascot wakes up in the middle of the line and the direction reverses: instead of things arriving, things leave. Tool marks light in order — calendar, messages, tasks — each with one short past-tense line ("two meetings moved", "mornings kept quiet", "the heavy task pushed to Thursday").
- The loop ends on The Brief: one message card, whole, holding for about three seconds before it starts over.

**Why it is good:** it is the actual product moment, and time as the axis proves "while you slept" without claiming it in copy. Uses cards we already have in `public/assets/home/health-infographic/`.

**Why it is hard:** it is long — roughly 18 to 22 seconds — so most people will see part of it. Needs a version that reads correctly from any entry point.

---

## Concept B — The conveyor

One continuous band, crossing the full width, never stopping and never restarting.

- **Left half, moving right:** the things coming at you. Body signals, calendar blocks, unread threads, tasks, an agent's finished work waiting on review. Small cards, tilted slightly, at a steady pace.
- **Centre, fixed:** Waldo. The mascot, sitting still while everything flows through.
- **Right half, still moving right:** the things leaving. Fewer cards, calmer, each one an action taken: a moved meeting, a quiet-hours block, a drafted reply, an agent sent off with context.

The band never resets, so there is no start and no end — you can look at any second and understand it. The left half is crowded and fast; the right half is sparse and slow. That difference is the argument.

**Why it is good:** it is the only one that is genuinely a loop. Readable in two seconds. Technically small — two rows translating at different speeds, which is cheap and holds up on a phone. It is also the exact picture of the current hero line, "Life happens. Waldo handles it."

**Why it is hard:** less detail. It shows the shape of the product, not a specific thing Waldo did. Probably wants one or two of the cards to be legible enough to read as you pass.

---

## Concept C — One thread

The loop is a single message thread, the way you would actually see it on your phone. It types itself out.

- A line from you, mid-morning: something ordinary and human. "I'm not going to make the 4pm."
- Waldo's reply, arriving in pieces: what it already knows (the signal), what it decided, what it did. Tool rows appear underneath with status tags — "Calendar · moved", "Slack · told them", "Draft · waiting on you".
- One row stays "waiting on you" at the end. That row is the whole privacy and control story, shown rather than argued.

**Why it is good:** closest to what using Waldo feels like, and the "waiting on you" row does a lot of work at once. Very cheap to build.

**Why it is hard:** it is a chat box, and the docs have spent a while arguing Waldo is not a chatbot. Risks reading as one.

---

## Concept D — The three lenses

The one already written into AGENTS.md Block 1: a card deck that rotates through Recovery, Form and Weight, each state bringing its own action card, ring and connected tools.

Kept here for completeness. It is a slideshow rather than a loop, and it is health-first, which is behind where the story is now. Not recommended.

---

## The recommendation

**Concept B as the homepage loop, with Concept A as the section further down.**

B goes right under the hero. It is always moving, never demands attention, and states the whole product in one picture: everything comes at you, one thing sits in the middle, less comes out the other side and it is all handled. It survives being seen for two seconds, which is what a homepage actually gets.

A then earns its length further down the page, where the reader has already decided to keep going — it is the proof behind B's claim.

C is the better idea if we would rather show one specific, concrete thing than the shape of the whole. Worth building as a small test before committing.

---

## Second pass on Converge (2026-09-29)

Prototype: `public/prototypes/hero-loop-2.html`. What changed from the first rough version:

- **Real tools, not words.** Twelve connector logos sit on a ring: Apple Health, Calendar, Gmail, Slack, Linear, GitHub, Figma, Stripe, Spotify, Notion, WhatsApp and agents. All of them are files the repo already has.
- **The site's own type.** Mottle for the title and the counter, SF Pro Rounded for everything else, at the same sizes the pages use.
- **Dotted spokes.** A faint ring and a dashed line from each tool to the middle, so a card travels a path rather than drifting. Each line stops short of the tile and short of the disc, so nothing is crossed.
- **The loop closes on the tools.** This is the important one. Finished work leaves the middle and flies back to the tool it belongs to; that tool lifts, warms, and says what happened — "nine and ten, pushed", "no reason given", "waiting on your read". The first version dumped the results in a bar at the bottom, which read as a list for the reader. This reads as work going back where it came from.
- **The middle reacts.** The ring pulses on the frame a card arrives, not on a timer, so it reads as cause and effect.
- **A quiet counter** under the mascot: signals read today, ticking up as cards land.

## Third pass — the fan (2026-09-29)

Same prototype file. Suyash marked up the ring and asked for the tools in a semi-circle above Waldo, with Waldo taking everything in and saying the important things out loud. A second reference (an agent sitting under a fan of round tool icons, joined by thin straight lines) set the shape.

- **The tools sit on a fan above him**, evenly spaced, and the fan is deliberately wider than the stage so the tools at each end run off the edges. The row reads as part of something larger.
- **Round tiles, thin straight lines.** No dotted spokes and no permanent labels — the logos carry it. A tool only speaks when Waldo has just done something there, and then the line appears under it for three seconds.
- **Order across the fan is deliberate.** Body, calendar and inbox sit near the top middle where they are read first; the quieter ones (Spotify, Stripe) run off the edges.
- **The split between quiet and loud.** Most finished work travels back up the line to the tool it came from and is never mentioned; the counter under Waldo says how many were handled that way. The few things that are genuinely yours come out below him as a message — his face, one line of what happened, one line of what it means. Two on screen at a time.

This is the version that says the whole product: everything in, almost nothing back out at you, and the one thing that matters spoken plainly.

## Fourth pass — the message (2026-09-29)

Suyash sent a mock of the message itself and a Linear card for reference, and called the small notifications chopped. Four instructions: no grey panel, SF Pro Rounded everywhere, no circle around the mascot, and the message has to read as one piece of writing.

- **The panel is gone.** The picture sits on the page's own paper, with the fan's edges faded out rather than cut off.
- **One message, not a stack of chips.** The Brief is a single card: two sentences of what he saw and did, with the tools named inside the sentence as small pills, then "Two things still need you" and the short list of what is genuinely yours, with the documents underlined. It writes itself a line at a time and changes to a second version every thirteen seconds.
- **He sits on the top edge of his own message.** Not framed, not in a circle. The lines from the tools converge on him and run behind the card, so the fan, the mascot and the message are one picture rather than three bands.
- **One card per line.** A line can carry one card at a time and its neighbours stay clear while it does, which is what stopped cards landing on top of each other. Cards now die at about two thirds of the way down, so nothing ever crosses him.
- **Depth instead of flatness.** Two-part shadows (a tight contact edge and a wide ambient one), three weights of them, tools at the ends of the fan smaller and lighter because they are further away, a small wobble in the arc so it is not machine-even, and each line brightening while its card is travelling.

Still open: the mascot is the only resting pose we have; twelve tools is tight below about 700px, so the phone version narrows the fan and may need fewer; and the message copy is a placeholder until the real Brief wording is settled.

## Built (2026-09-30)

It is now real code on the homepage, under the hero: `components/site/waldo-loop.tsx`, with its styles in `components/site/site.css` under "The loop". The rough HTML prototypes it grew from are kept on Suyash's machine only (`public/prototypes/`, not committed, so they are not served on the live site).

What changed from the prototype, on Suyash's direction and his Figma frame:

- **No lines.** The eighteen tools float in a wave across the top, each drifting on its own timing, the row running off both edges.
- **Drops, not travel.** What a tool is carrying falls out of it as a small card — "Calendar +6 meets", "Gmail +52 mails" — and drops into Waldo. The card and a blob share the same path; the blob and the pool under Waldo sit in one blurred layer, so they fuse on contact the way a droplet joins a bigger one, and Waldo gives a small squash as it lands. Some of it comes back out the same way, rising to the tool it belongs to, which lights up when it arrives.
- **Four rounds, four briefs.** Each round has its own tools, its own traffic and its own brief, so the picture is a day rather than one moment:
  1. **The morning.** Health, Calendar, Gmail, Slack. Short on sleep, so the afternoon is kept light and the design review moves.
  2. **Deep work.** Spotify, Granola, Notion, Slack. He knows what you write to, so he holds the hours and turns Slack off for them.
  3. **Training.** Garmin, Health, Strava, Calendar. Recovered, so the hard session goes in early and nothing lands after seven.
  4. **Code and inbox.** GitHub, Jira, agents, Gmail. Reviews batched, agents read, the one that is yours left on top.
- **The brief is on the page from the start** and is replaced at the end of each round, so nothing is ever blank.
- **It only runs while it is on screen**, and with reduced motion nothing falls — the brief is simply there.

### One screen (2026-09-30)

Sized to Suyash's frame, with two references: poke.com for the tools and Linear's "Automate the overhead" for the cards.

- **The hero is exactly one screen.** The section measures what sits above it (the menu, the announcement) and takes the rest, so the headline, the tools and Waldo all land above the fold on any screen. On short screens the band, Waldo and the hero's own spacing all come down together so nothing is squeezed out.
- **The brief deck is cut in half by the fold.** It is pinned to the bottom of the screen and moved down by half its own height, so you always see the top half of what he wrote and scrolling gives you the rest. Because it is measured against itself, it stays half-and-half whatever the brief says.
- **The tools drift left to right for ever** (poke.com), as one long row laid out twice and scrolled by half, so the join never shows. Each tool still bobs on its own timing. A tool can be off the edge when it hands something over, so the card it drops starts from the copy nearest the middle.
- **The briefs stack** (Linear): the new one lands in front and pushes the one before it back and up, half-faded, before its lines write themselves.

### The sheet, and the voice (2026-09-30)

Sized and coloured against Suyash's 1420px frame.

- **A white sheet.** The hero sits in a white container, 10px in from the page on every side, with room at its foot for the half of the card that hangs below the fold.
- **No shadows anywhere.** Surfaces are told apart by a hairline: `#FAFAF8` with a 0.6px `#1A1A1A` stroke at 8%. That goes for the tool marks, the falling cards, the chips and the brief. The soft grey circle behind Waldo is gone.
- **Centred, at the live site's sizes.** Measured on heywaldo.in at 390, 1024 and 1420px: the title is Mottle 28.8px to 36px (1.3 leading, -0.02em), the text is 17.1px with 1.4 leading and +0.02em in #6B6B68, 18px under the title. The live page draws its type styles at 0.9 of their stated size, which is why the stated 18px/28px body reads as 17.1px. Checked on this build: 32.05px at 1024, 35.26px at 1420, 28.8px at 390, all identical to live. On phones the hero flows instead of pinning to one screen, because the live sizes leave no room for the text, the tools and a card together.
- **The announcement sits above the menu** (and scrolls away, the menu then sticks). Copy: "Kennel for Mac is now open source." in medium weight at full ink, then "It understands your build, and takes your agent outputs to the intended outcome. Get now →" in regular weight at 60%. On a phone the first sentence takes the top line.
- **Readable motion.** A card takes 4.2 seconds to reach him, on a curve that is slow at both ends and quick through the middle, and it fades out before it would sit on top of the drawing.
- **Real iconography.** Things named inside a brief carry the mark of the tool they live in (a Slack channel, a Notion doc, a GitHub review) or an Apple symbol from `waldo-icons` for what they actually are — a bed for sleep, a runner for a run, a calendar for a meeting. Never a tool's logo standing in for an idea. (Those Apple symbols were later dropped: the card now names only tools, each with its own mark.)
- **His voice.** Every brief is short sentences, past tense, no persuasion, and ends on a quiet italic line that is the feeling rather than the news — "you slept badly. the day didn't have to."

## Rules any version has to follow

- **Autoplay, but only when visible.** Start on entering view, stop on leaving. Nothing animating in a tab nobody is looking at.
- **Reduced motion gets the ending, not a blank.** If the reader's system asks for less motion, show the final frame — the message, the actions done — as a still picture. They get the punchline without the ride.
- **No numbers without words.** Every figure carries Waldo's sentence next to it. House rule, and it is what stops this looking like every other health app.
- **Past tense only on the action side.** "Moved", "told them", "kept quiet". Never "will" and never "can".
- **Real surfaces.** Use the cards and marks already in `public/assets/home/`, not invented shapes.
- **Orange once.** One accent in the whole loop, per the brand rule.
- **Phone first.** It has to work at 375px without turning into a smear. Fewer cards, slower, same story.
- **No text baked into images.** Anything readable is real text, so it can be translated, selected and read aloud.

## Open

- Which concrete moment does the loop use? It should be one real day, not a montage.
- Does the mascot appear in the loop, given it already bookends the page in the hero and footer?
- Does this replace the first carousel ("What you're carrying"), or sit above it?


### The pill (2026-09-30)

Rebuilt after a screen recording Suyash shared: a dot pops out of its source, stretches into a pill while the words roll up inside it (each word a beat after the last, rising from below with a slight tilt), a spinner turns into a tick, then the pill squeezes back to a dot and is gone.

- **Each card leaves its own connector.** The card is tied to one specific mark and follows it for the whole flight, so it stays attached even while the row drifts. The mark lifts as the dot pops out of it. The icon row is spaced like the frame (about 74px between marks), so a tool is never far from the middle.
- **Two kinds of pill.** What a tool hands over is a light pill with the tool's own mark and what it says ("Calendar +6 meets"). What Waldo sends back is a dark pill with a spinner that turns into a tick as it reaches the tool, then the tool lifts.
- **It slides out from behind Waldo and sinks in behind him**, never a dot over the drawing. He squashes a little each time something lands.
- **The card updates from what Waldo reads.** A new brief arrives empty, three dots pulsing, and each line arrives as the thing it came from lands in him. By the last tool, it is complete.
- **Only a peek.** The front card shows 150px above the fold and the rest hangs below, inside the white sheet, which measures the card and reaches down to hold it. The cards behind show as slivers above its top edge.
- **Timing.** A flight is 4.6 seconds: the dot opens over the first sixth, travels on a slow-quick-slow curve, and closes over the last sixth. Signals leave 1.3 seconds apart.
- **Waldo is the new drawing** (`public/assets/home/mascots/waldo-loop.svg`, from Suyash's `Vector.svg`): plain vector, no images or scripts inside. It carries a white keyline, so a pill sinking in behind him is cut off cleanly by his outline.

### The path, the portal and the nav (2026-09-30)

- **The icons ride the curve Suyash drew.** High on the left, running flat, sweeping down across the middle to the lowest point about two thirds of the way over, then climbing away to the right. Each icon sits on the path at wherever it has drifted to, like beads on a wire, so it rises and falls as it moves. The band is as deep as the room above Waldo allows, up to 330px.
- **Every card goes in and comes out at one point above his head** (about half his height above it, scaled with him), where Suyash marked it. Not under the drawing. Nothing overlaps him any more.
- **The nav is centred.** Logo on the left, the links on the true middle of the page, the button on the right, in three columns where the outer two are equal, so the links stay centred whatever their widths. Checked at 1420px and 1024px; on phones it is the logo and the menu button as before.

### One story from the copy bank (2026-09-30)

This replaces the four rounds above. Pairs come from Suyash's copy bank (waldo-hero-connector-shortlist); the rules were: 4 to 6 pairs that tell one story, connector lines 4 to 10 words, Waldo's replies under 10, the card 25 to 40 words and the sum of exactly those signals, Waldo he/him, who offers and drafts and never silently sends or moves anything, terse and warm, no exclamation marks.

The story is a short night, a crowded day, and the one thing that matters this week:

| Connector | Says | Waldo replies |
|---|---|---|
| Garmin | 5h 12m of sleep last night. | Not a day to pack tighter. |
| Google Calendar | Two meetings overlap at three. | I'll suggest a cleaner slot. |
| Gmail | 52 new emails. 3 need a reply. | Those three first. |
| Slack | Three threads are waiting on your answer. | I'll pull out what needs you. |
| HubSpot (the wildcard) | The deal closes Friday. One question remains. | Let's answer that before adding another nudge. |

The card is those five lines and nothing else, 39 words: "5h 12m of sleep. I'd go lighter today. Two meetings overlap at three; I'll suggest a cleaner slot. Three of 52 new emails need a reply. Three Slack threads wait on you. HubSpot's deal closes Friday; one question remains." Every number and fact is in a signal; there is no aside, no list, and nothing he does by himself. (Garmin is the one entry in the bank that is not site-verified; it is there because it is already in the visual.)

How it runs:

- **The path is a U**, high at both edges and lowest in the middle, right above Waldo, as drawn. The row drifts left to right along it.
- **Only the connectors passing through the low zone speak.** The five story connectors sit next to each other in the row, in reverse, so they reach the zone one after another (Garmin first, HubSpot last) and each speaks as it does. The row is never reordered; the story waits for its connector.
- **Nothing grows.** A connector does not enlarge or highlight when something leaves it. The dot simply pops out of the icon.
- **One point above his head** is where every card ends and begins. A signal travels from its own icon to it; his reply travels from it back to the same icon.
- **The card is the sum of what he has read.** Each connector's line lands, and the card adds that connector's line. The front card shows a peek of 124px, the rest hangs below the fold.
- **It starts within two seconds** of the page loading, then rests and waits for Garmin to come round again (about 32 seconds for the whole row).

More stories can be added the same way: five new pairs, their five tools placed next to each other in the row, and the card written as their sum.

### Calmer, closer, two lines (2026-09-30)

- **Calmer.** At most two pills are in the air at once (it used to reach five, which is what looked trippy). A new signal only goes when there is room, and his replies are let out first, waiting their turn rather than piling in. The drift is a little slower, the icons bob less, and a flight is three seconds. One full story now takes about 16 seconds, with the pills mostly one or two at a time.
- **The gap under the buttons is 20% smaller.** It is the distance from the hero buttons to the low point of the U. Measured on a 1420 by 1000 screen it went from 151px to 122px. It is done by lifting the whole band, so the U keeps its shape and only moves further from Waldo, and it never closes below 56px on small screens.
- **The hero text is two lines** on a desktop: the paragraph is wide enough for the whole sentence, and balanced so neither line is left short. Checked at 1000, 1024, 1420 and 1440px wide. On a phone it wraps to as many lines as it needs.

### Cards start and end under the connector (2026-09-30)

Every card now starts, and every reply ends, at a spot just under its connector (27px below the bottom of the icon, where Suyash circled it), not on the icon. The dot opens up in the space below the icon, so a card never covers the connector it came from, and a reply sinks in below it. The flight to and from the point above Waldo's head is unchanged. The first frame of every pill is now drawn the moment it is made, so one never flashes at the wrong place for a moment.

### The phone and the Overview card (2026-09-30)

The card under Waldo is now the Overview screen inside Suyash's phone mockup (`phone.svg` from Figma), and it fills in as notifications land.

- **The phone** is three layers in `public/assets/home/phone/`: `phone-back.svg` (the screen), then the card written in HTML, then `phone-front.svg` (header, status bar, bezel), so the card can change while the bezel stays put. The bezel is the mockup's own picture, cut to the part that shows. The phone is cut off at the bottom like the mockup, flush with the bottom of the hero (there is no white sheet any more, see below). It is about a third of the screen wide (`--loop-card`). Every measure inside it is in the mockup's own units, so the card scales with the phone.
- **Waldo has not moved.** He has 28px more air above the phone (`--loop-air`), and the phone's peek is 28px less (`--loop-peek` and `PEEK`, now 56), so he sits exactly where he did. Only the top of the phone shows above the fold on a 1440 by 900 screen; the card is under it.
- **The card** has Waldo top-left as the mockup draws him (`public/assets/home/mascots/waldo-card.svg`, cut from the mockup: no white keyline, the card's own colour inside him), then the lines in ink, as in the mockup.
- **The card's states** are the 27 entries in `components/site/hero-states.ts`, from `waldo-hero-copy-final.txt` (proposed copy, not verified claims). State N is the judgment lines of entries 1 to N together, so the card only ever adds. It never resets: when the loop comes round again the card carries on from where it is. Once it is longer than the screen, the oldest lines slide up under a fade so the newest is always in view.
- **Chips** are inline pills as in the mockup: the connector's mark, then a phrase from the judgment itself (no extra words). Each entry names its phrase (`chip`), and it is always a piece of the judgment.
- **A notification finds its state by its own words** (`stateFor`): the text is compared without case, curly quotes or the full stop. A notification with no match does not move the card.
- **Not matching yet.** The stream is unchanged (13 notifications, same timing). Of those, only "Two meetings overlap at three." is also in the copy file (state 2). The other 12 stream lines are not, so they do not move the card, and 26 of the 27 states have no notification in the stream. All twelve are for a connector that has a state, but with different words (Garmin "5h 12m of sleep last night." against "Five hours of sleep last night."; HubSpot "The deal closes Friday. One question remains." against "The deal closes this Friday."). To connect them, either change the stream's words to the copy file's, or change the file's `incoming` to the stream's; nothing has been invented to bridge them.
- **Reduced motion:** nothing arrives, so the card shows the first five lines as they stand.

### No container, a lighter page (2026-09-30)

- **The white container around the hero is gone.** The hero now sits on the page itself. The box is still there for layout (`.site-hero`, formerly `.site-hero-frame`: the same 10px in from the edges, and room at the foot for the phone), but it has no fill and no rounded corners, so nothing on the screen moved. The phone still ends flat at the bottom of that box, and the next section starts below it.
- **The homepage's page is #FAFAF8** (the rest of the site stays #F4F3F0). `SiteShell` takes `home`, which sets `data-home` on the page and turns the page colour (`--surface-t3`) into #FAFAF8 for the homepage only. The page behind it (the part you see when a trackpad bounces) matches.
- **The connectors and the lines that come out of them are #FFFFFF** (`--surface-t1`), with the same hairline as before. Waldo's replies are still dark.
- **Frames below the hero.** The picture frames in the carousels were #FAFAF8 to stand out from the old page colour, and would disappear on a #FAFAF8 page, so on the homepage they get the 0.6px hairline (ink at 8%). Drop that rule if the frames should melt into the page.

### The white shelf under Waldo (2026-09-30)

The phone now stands in a white (#FFFFFF) container, as in Suyash's reference: as wide as the page, rounded top corners (`--loop-shelf-radius`, 100px on a wide screen, 40px on a phone), running down to the bottom of the phone, which is cut off flush with it. It is drawn by `.site-loop-stage::before`, so it moves with the phone.

- **Spacing.** Waldo to the top of the shelf is `--loop-lead` = `--loop-gap` + `--loop-air` (about 52px on a 1440 by 900 screen), and the top of the shelf to the phone is 56% more than that (`--loop-shelf`, about 82px on 1440 by 900): it started the same as the first gap, then Suyash asked for 30% more, then 20% more on top of that. Reference: about 56px each.
- **Waldo has not moved.** The phone comes down by exactly what the shelf adds (`--loop-peek` is worked out from the two gaps, and the script measures how far the phone hangs instead of using a fixed number), so the tools, the flights and Waldo are where they were. On a 1440 by 900 screen the top 74px of the shelf shows above the fold and the phone starts just above it.
- **The bottom fade in the reference is not built**, as asked.

### The dots under the phone (2026-09-30)

A carousel control sits in a strip of the page under the white container (`--loop-strip`, 54px), after the one on apple.com/in, measured from Suyash's screen recording (`components/site/phone-dots.tsx`) and then made 15% smaller: about 6px dots 17px apart, the current one stretched into a 22px pill with a dark fill running across it, and the fill's timer is what moves the card on. There is one dot per card state (27). Only seven show at a time and the row slides along as the card advances; the dots at the ends shrink (75% and 50%) on the side that has more beyond it.

- **What it does.** The current dot is the newest line on the card. The fill crosses in 7 seconds (`STEP_MS`), then the next line is written and the pill moves on. A notification that has words in the card still jumps it ahead (never back). Clicking a dot shows the card as it reads at that step (the lines up to it), and the timer carries on from there. At the last step the pill stays full and the card stops; it never starts over.
- **Why it runs by itself.** Only one notification in the stream has a matching state, so on their own they cannot move the card; the timer does, until the stream's words and the copy file's are the same.
- **It only runs while it can be seen.** The timer waits until the phone is on screen and the tab is in front. The first line is written 1.2 seconds after the phone comes into view.
- **Reduced motion:** no timer and no fill. The dots still work as buttons, and until one is used the card shows its first five lines as they stand.
- **The dots are outside the white container.** The container ends at the phone's flat edge, as before, and the dots sit below it on the page (#FAFAF8), like the bar under the pictures on apple.com. The strip is part of the stage, so the hero still reaches down to hold it.

### One Wednesday: 27 signals, one card per signal (2026-09-30)

This replaces the stream, the card's states and what the dots do in the sections above. The copy is `waldo-phone-copy-v2` (Suyash, 2026-09-30): one fictional Wednesday, the same Northstar renewal, v1.8 release and people running through all 27 signals. Everything in it is invented; the prep Waldo reports (checked, compared, drafted, held) is scripted for the demo and is not a claim about the product. Nothing in it is ever sent, moved, approved, charged, merged or scheduled.

**The script** is `components/site/hero-states.ts`, one entry per signal, in v2's order: Garmin, Calendar, WhatsApp, Gmail, Slack, HubSpot, Outlook, GitHub, Jira, Figma, Oura, Asana, Calendly, OpenAI, Claude, Granola, WHOOP, Notion, Drive, Apple Health, Stripe, Strava, Calendar, Gmail, Shopify, Spotify, Linear. Each has the notification pill (`incoming`), Waldo's reply pill (`waldo`), the card (`body`, two paragraphs, with `[brackets]` marking subject chips) and the two bullets that still need the reader (`asks`). The text is checked against the v2 file word for word (straight quotes became curly ones, nothing else changed).

**The row matches the stream.** The stream used to be 13 signals in a row laid out for them. It is now 27, and the row (`HERO_ROW`) is laid out for those: signals sit two places apart (`slotOf`), so every other icon that passes is silent until its own turn, which comes round on the same lap. 27 is odd, so stepping two at a time visits every place once and the last signal is followed by the first: the loop never waits for an icon. Calendar and Gmail speak twice, so each has two places in the row (13 to 15 places apart, so they read as two icons, not one stuttering). A signal is sent by its own place (`data-slot`), not by "the nearest Calendar". Drift, flight, reply delay, the two-pills-in-the-air rule and the path are unchanged. Measured on a model of the scheduler: signals go out in order every 3.9s at 1440px (3.6 at 820, 3.3 at 390), so the loop takes about 100 seconds and starts again about 8 seconds after the last reply is home.

**The notification pills are sentences.** They can be long (up to about 120 characters), so they wrap at 14px, as many lines as they need, up to 372px or the width of the screen less 12px each side. The pill is measured at full size, its text is fixed to that width, and then the pill opens and closes around it, so the lines never reflow in flight. Height opens with width (a dot is 34px; a three-line pill is about 70px). On a phone the pill is pushed in so it never leaves the screen, and it is centred higher above Waldo (and lower under its icon) by half of its extra height, so a tall one still clears both.

**The card is replaced whole, not added to.** Each signal, as it lands in Waldo, sets the card to its own state. State N is what signal N wrote: two paragraphs, "One thing still needs you." or "Two things still need you.", and the bullets. Chips are small white pills with a hairline and no logo, because what a sentence is about is a thing (a meeting, a quote), not an app. Every state is in the page at once in one grid cell, so the card is as tall as the longest state and never changes height between them; only the showing one is visible. A change plays in order: the old state fades, then the paragraphs, the question and the bullets rise in 80ms apart.

**The phone is as tall as the longest state needs** (about 78px more than before at 1440px, 92 at 820, 214 at 390). It is the mockup's own art: the top 520 units draw as they always did and the last 25 stretch, which is plain bezel and plain screen, using `border-image` on both layers, so there is still one file each and it is still the same phone. The part above the fold is unchanged (the peek is worked out from the phone's height), so the extra is all below it. The card runs on past the bottom of the screen as it did, and its words stop 20 units short of it.

**Unfinished work is never dropped.** The card only shows two decisions, but `openWork(n)` folds every signal so far into one ledger (the 3pm clash, Rohan's reply, the quote through v2, v3 and v4, Maya's one evolving unsent update, SSO, the walkthrough, the empty state, PR #184, the easy run, the Soundroom address, plus Cedar's retry and the kits, which are watched and not decisions). An item only changes its wording; none is removed. `heldWork(n)` is the open decisions the two bullets are not showing. Both are written onto the card as `data-open` and `data-held`, so the state is there to read even when the bullets have moved on. Tests: `tests/hero-states.test.mjs`.

**The dots follow the stream.** There is still one dot per state, seven showing at a time. The current dot is the state that is showing; it moves as each signal lands, and going round again moves it back to the first, because a replay is a replay of one snapshot. The fill crosses in about the time between two signals (`STEP_MS`, 3.9s) and no longer moves the card: if the next signal is late it waits full, and it starts again when the next one lands. Clicking a dot shows that state and the stream leaves the card alone for 9 seconds (`PEEK_MS`), so the step can be read, and then carries on from wherever it has got to.

**Reduced motion:** nothing flies and nothing advances. The card stands at its fifth state ("Same decision. Two places asking.") until a dot is used, then shows that one. The dots still work as buttons.

**Differences from the file to know about.** v2 says "never squeeze the font": the card text is 14px or the mockup's size, whichever is larger, and chips are never below 12px. The old live region on the card (`aria-live`) is gone: with every state in the page, and a new one every four seconds, it would have read the whole card aloud each time.

### Short pills (2026-09-30)

The flying pills now carry the short copy from `waldo-pill-copy-short` (`pill` and `say` in `hero-states.ts`). The full v2 notification and reply stay in the script (`incoming`, `waldo`), and the incoming pill carries its full text as `data-full`; the cumulative Overview states are untouched. A pill is one line at 14px, as wide as its words up to the screen less 12px each side (372px at most). The text is the only part that shrinks: it is clipped with an ellipsis only where it really overflows, never the icon, the padding or the rounded ends. At 390px, 820px and 1440px none of the 27 pills or 27 replies overflows (the widest is 337px); at 320px seven incoming pills end in an ellipsis.

**Incoming and reply pills no longer cross (sequencing change, 2026-10-01).** Signal k+1 used to be released while signal k's reply was still in the air, and the two paths met above Waldo. Now a signal only starts once the air is clear: the previous reply has been and gone. Only one signal and then its own reply are ever on screen, one after the other. Flight time (3s), the reply delay, the pill animation, the font size and the path are unchanged. Consequences, all measured on a model of the scheduler:

- **One signal takes about 5.8s** instead of 3.9s, so the day takes about 155 seconds instead of 100, then the loop starts again about 12 seconds after the last reply.
- **The row is laid out for it.** Signals sit three places apart (`HERO_STRIDE`), so two icons pass silent between one signal and the next. Stepping three at a time only visits every place if the row is not a multiple of three long, and 27 signals are, so the row has 28 places: one is a silent OpenAI icon (`FILLER`, half a row from OpenAI's own place) that passes between the last signal and the first. Calendar's two places are 7 apart and Gmail's are 4 apart, which is as far as three-at-a-time allows; they are the two repeated tools in the story.
- **The drift follows the icon spacing.** On narrower screens the icons sit closer, so at a fixed speed they arrived faster than a signal can finish and the next one missed its window and waited a whole lap (up to 50 seconds). The row now drifts in proportion to the spacing (38px/s at 1440, about 32px/s at 390), so an icon arrives every 1.95s on every screen. Unchanged at 1440.
- **A long pause is not time that passed.** A frame after the tab was in the background moves the row on by one frame at most, instead of by the whole time away.

Measured at 390px: the incoming and reply pills never overlap, nothing overlaps Waldo, and no pill is clipped.

### Pills with connector marks, and a stronger card change (2026-10-01)

- **Pills only for things that live in a connector, with that connector's mark.** In the phone card, a [bracketed] subject is now a pill with the mark of the app it belongs to in front of it (Design review and Board prep with Google Calendar, PR #184 with GitHub, Empty state with Figma, Quote v4 with Drive, 5km easy with Strava, and so on). A bracketed subject with no connector (the 60-seat cap, SSO, a combined "quote and update") is set as plain words, not a pill. The table is `CHIP_TOOLS` in `hero-states.ts` (`chipTool`); to give a subject a pill, add it there.
- **The card change is bigger.** The new card now rises 44 units from below while it fades in (it was 16), the copy of the old card behind it shrinks back and fades, and the two slivers behind spring up a step (with a little overshoot) one after the other. 800ms in all. It runs on every change: a signal landing in Waldo, or a click on a dot.

## The container and the bezel (2026-10-01)

- **Container.** The white container behind the phone now hugs it: 10px of padding on all four sides
  (`--loop-pad`), 30px corners smoothed 60% (`--loop-radius`). The smoothing is a clip path cut by
  `lib/squircle.ts` (Figma's corner-smoothing maths) to the container's size, redone when it resizes;
  without the script it falls back to plain 30px rounding. The dots sit below it, outside.
- **Bezel in Safari.** The bezel picture was inside `phone-front.svg` (an `<image>` painted through a
  `<pattern>`), which Safari does not paint when the SVG is used as a border image. It is now its own
  file, `phone-bezel.png`, on its own layer (`.site-loop-phone-layer--bezel`); `phone-front.svg` keeps
  only the vector parts (header, status bar). Same size and slicing as before.
- Hero body copy: "A personal assistant that meets all life, work & health needs, with nothing hidden."

## The phone is removed (2026-10-01)

The phone under Waldo (the Overview card with its 27 states, the stack animation, the white container and the dots under it) is gone from the homepage hero, on Suyash's instruction. What stays: the headline and buttons, the connector row on its curve, the 27 signals (the notification that flies from each connector into Waldo, and his reply that flies back; `hero-states.ts` is unchanged, its `body`, `asks` and `work` are simply no longer shown), and Waldo, who sits where he always did above the fold. The "What you see of it" carousel now follows directly. Removed from `waldo-loop.tsx`: the phone markup, `pushCard`, the pills (`Rich`), the dots and their state. Removed from `site.css`: the white container, the phone and card styles and their motion. Kept: `phone-dots.tsx` and the dots styles (the carousel uses them), the phone bezel picture, `chipTool` and the card helpers in `hero-states.ts` (tested, unused for now).
