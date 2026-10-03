# "What you see of it": local implementation plan

Status: **built as a local review page (2026-10-01), not on the homepage.** See the result log at the bottom. Plan updated to the **corrected brief** (`waldo-five-cards-claude-brief-corrected-2c085333.txt`), which supersedes the first brief. Nothing in this plan touches the production homepage (`app/page.tsx`), the 27 hero states or the hero dots, and nothing is pushed, deployed or opened as a PR. Implementation was requested on 2026-10-01 and is isolated to the hidden review route.

## 1. What this is

A section that continues the hero story. The hero shows Waldo working with your apps; this shows what reaches you: the result, the reasoning, the conversation and the decisions left in your hands.

- Eyebrow: **What you see of it**
- Headline: **Less to sort. / Still your call.** (two lines, as every site title is)
- Intro (one line): He connects the dots. You see what matters, ask why, and decide what happens next.
- Five large landscape cards in a horizontal carousel, neighbours peeking at the edges. Each card holds its own headline, one supporting line and a real app screen. No second paragraph outside the cards.

| # | Card | Headline | Screen |
|---|---|---|---|
| 1 | Overview | Your day. Already untangled. | Afternoon Overview: summary, three "Needs you" items, two status rows |
| 2 | Chat | Ask once. Keep going. | "Tomorrow's run" thread, metric chips, sleep bar, linked follow-up |
| 3 | Health logic | A suggestion. With its reasons. | Form / Recovery / Weight rows, evidence panel; no score ring |
| 4 | Permission handoff | Ready. When you say so. | "Soundroom delivery" thread with the draft, "Draft only" |
| 5 | Quiet-hours catch-up | Quiet hours. Nothing lost. | "After quiet hours": recap, four-choice block, input, calendar glimpse |

## 2. Guardrails

- Local only, port 3005. No commit, push, deploy or PR. A plan until implementation is requested.
- Built **outside the homepage**: hidden review route `app/preview/what-you-see/page.tsx`, `robots: noindex` (like `app/design-system`), no entry in `app/sitemap.ts`. Placing it directly under the hero later is a recommendation, not approval to edit the homepage.
- **The 27 hero states and the hero dots stay as they are.** This section follows them and does not replace their story. (This closes the earlier 5-dots question: no change.)
- Presentation only: nothing sends, moves, approves, charges, changes a workout or records audio. Demo controls open local detail or edit states.
- Fictional names, amounts and readings are labelled as an illustrative scenario for assistive tech (section 7).
- Copy is used exactly as in the corrected brief. Waldo is "he".
- **No exact snapshot time and no timed quiet-hours interval.** The screens show "the aftermath of the hero's later states, still on the same fictional Wednesday, before the 5pm quote deadline." The label on card 5 is "After quiet hours"; the quiet period is illustrative, not a hero event or a shipped setting.

## 3. Continuity check: the corrected brief against the repo

The brief says continuity is checked against the originally supplied 27-state hero source, and that any difference in the repo is reported before either story is changed.

**Repo vs source:** `components/site/hero-states.ts` differs from the committed version (`8cd64a84`) by 61 added lines and nothing removed or changed: the `CHIP_TOOLS` pill table and `chipTool()` (connector marks in pills). All 27 states, their text, tools, asks and work items are untouched. **No delta to the story.**

**Fixture facts found in the repo, line by line:**
- Garmin 5h 12m, bedtime 1:18am, awake 6:30am (state 1). Board prep and Design review both 3pm; Thursday at 11 works for Priya and Leon, option kept ready, neither meeting moved.
- Quote: v2 $46k, v3 $48k / 60 seats (Dev, Outlook); Dev needs the final PDF by 5pm (Maya, Gmail); Leon asks in #sales (Slack) whether $48k / 60 seats is signed off; Leon uploads Northstar-renewal-v4.pdf in Drive ($48k / 60 seats, SSO Monday, walkthrough Thursday).
- SSO: Claude's draft promised Thursday; Priya's plan says Monday, password login for Thursday; Maya's update rewritten and unsent.
- WHOOP 32%; Strava 12.4km hills; 8km tempo vs the prepared 5km easy; plan unchanged.
- Soundroom SR-2081: email Flat 204, order Flat 402, 18 Church Street; headphones arrive Thursday; **no delivery window** in the repo; correction drafted, not sent.
- Northstar kits #1041, #1042, #1043: one courier delay, Thursday to Friday; Maya's draft gets Friday delivery; Thursday's walkthrough uses the demo kit; separate from Soundroom.
- The ledger still holds Rohan (Dadar 5:50), design/PR work and Cedar's retry; they are not part of the five-card focus and are not complete.

**Corrections to my earlier read:** the first plan flagged the kits, Leon and the delivery window as differences. Against the repo and the corrected brief they all agree: kits belong in the story, Leon is a colleague who asks in Slack and uploads v4, and no delivery window is shown. Those flags are withdrawn.

**Two small things to confirm** (neither blocks):
1. "Maya's 10am call" in card 2 is the hero's Thursday 10am onboarding review. Used as written.
2. The hero says the quote closes Friday 5pm and Dev needs the PDF by 5pm today. The corrected copy uses "Before 5pm" and "Dev needs the final PDF by 5". Used as written.

## 4. References received (2026-10-01) and what each decides

Ten images arrived with the brief: two chat screenshots, three Figma views, and five stills of the carousel video. They are layout references only: **old sample copy, scores and numbers in them (61, 8h 02m, 38 minutes deep, 76% / 63% / 84%, 6h 40m) are not used.** The Figma overlays and controls in the screenshots are ignored.

**Chat (cards 2 and 4).** Phone header: a small rounded icon button left, a one-line title, a "more" button right. Under it a pinned chip row: pin, a sleep chip with a down arrow, a moon time, a sun time, "+". The person's message is a white pill on the right. Waldo's side is typeset, not bubbled: a small grey line with an icon ("Checked ... against your 7-night baseline..."), the lead answer in the headline serif at about 1.5x body size, then a grey serif paragraph. A rounded card holds the data graphic with a chip at top left, a "Tap to flip" chip at top right and the moon/sun times at the bottom corners. Under the answer: a row of round buttons (comment with a count badge, copy, collapse, thumbs up, thumbs down). The composer is a rounded bar: "+", placeholder "woo, type away...", mic, and a black square send button with an up arrow. The expanded thread (second image, right side) shows Waldo's replies as soft grey rounded bubbles in the serif, the person's as white pills, an expand icon at a bubble's corner, and the same button row.
- Card 2 uses this composition with the brief's copy. The data card shows the **sleep-duration bar** (1:18am to 6:30am, 5h 12m) in the same card shape, with no stage curve, no deep-sleep numbers and no "Tap to flip".
- Card 4 uses the same header and composer, with the draft laid out as a card inside Waldo's side; there is no send button (the composer arrow is the *review/confirm* mark only if kept at all; plan default: keep the composer visible but with "Confirm or edit the draft" and no active send).

**Health (card 3).** The health-stats frame is a stack of rounded white cards, one per Form / Recovery / Weight: a ring on the left, the title, a one-line note and a small status chip. The detail frame shows a score header, a list of component rows and a Waldo note card below. For card 3 the layout is kept (rows, then a focused panel with Waldo's note and four evidence rows) and **the rings and numbers are replaced**: Form gets a context mark, Recovery shows 32% as WHOOP's reading, Weight shows "No reading linked".

**Recap and Overview (cards 1 and 5).** The recap frame: a two-line serif headline, a larger serif paragraph, a small grey prompt, one rounded block of four checkbox rows, then a pill input ("None of these - let me explain") with mic and a black send circle, and the Calendar block beneath. The Overview frame: the dog, the two serif paragraphs, a small italic line, then "Today's Brief" with the day calendar. Card 5 follows the recap; card 1 follows the Overview (greeting and summary) with the "Needs you" rows added as the brief specifies.

**Carousel video (the five stills).**
- Dark surround; the cards sit on it. Each card is about **2:1 landscape** (about 658 x 320 in an 848-wide frame, so a card is roughly 78% of the track), corners about 20px, and the neighbouring cards show **about 85px (10% of the track) on each side**, with a gap of roughly 12px.
- The headline is **inside the card at the top left**, short, in a small size; the picture carries the rest. Two cards centre the line at the top instead; one holds a large picture on the right.
- Mid-transition frames show the previous card's right edge sliding out as the next card comes in, so cards move as one strip.
- **Controls sit centred under the strip**, about 25px below it: a dark rounded pill holding small dots, the current one a longer pill; and a **separate round play button** to the right of the pill.
- Waldo's translation, as the brief says: the site's own surface and type (not black and green), with the cards as light rounded surfaces. The card ratio, the peek size and the control layout are taken from these stills; the timing stays the proposal in section 5.

**Still needed:** nothing blocking. The Figma connector is no longer needed for the layouts (the screenshots cover them); the carousel stills replace the unreadable video.

## 5. How it is built

### Files (all new; no existing file changed for this section)

```
app/preview/what-you-see/page.tsx   hidden review route (noindex, not in the sitemap)
components/site/see/see-fixture.ts  the one fixture: facts and every screen's exact text
components/site/see/see-section.tsx the five-card strip, its controls, drag, keys, autoplay (client)
components/site/see/screens.tsx     the phone and the five screens
components/site/see/see.css         the strip, the cards and the screens' styles
tests/see-fixture.test.mjs          nine checks on the fixture against the hero
```

### The carousel (`see-section.tsx`)

The existing `Carousel` is a row of small cards with text beneath. This is a different pattern (big landscape cards, copy inside, peeks, progress and play controls), so it is a new component.

- **Track:** native horizontal scroll with `scroll-snap-type: x mandatory`, so swipe, trackpad and touch are native; mouse drag as in `carousel.tsx` (4px threshold, never a click).
- **Position:** the active card comes from the scroll position; five position buttons, previous/next and the keyboard (left/right, Home/End on the track) all call one `goTo(index)`.
- **Transition:** one slide, 500ms, `cubic-bezier(0.32, 0.72, 0, 1)` (a proposal; the stills confirm one strip moving, not the timing). Card movement and an inner reveal are separate: the screen inside a card that lands rises about 12px and fades in over 400ms.
- **Cards and peeks:** about 2:1 landscape, about 78% of the track wide; the neighbours show about 10% of the track on each side with a 12px gap (from the video stills); they narrow at 820 and 390 as in section 6.
- **Controls, below the cards and separate from the app's own controls:** five named dots (the pill/dot pattern from `phone-dots.tsx`), previous/next, and a play/pause button.
- **Autoplay:** starts **paused**. Play cycles with an 8s hold per card; pauses on hover, on keyboard focus inside the section and on any direct control. Manual controls always work. Plays only while on screen (`useLive`, one visual moving at a time). Under `prefers-reduced-motion`: no auto-cycling and no inner reveal; the track still moves when the person scrolls or uses the controls.

### Shared fixture (`see-fixture.ts`) and its test

One object holds the facts and the exact UI strings for every screen; screens only read it. `tests/see-fixture.test.mjs` checks:
- every fact the brief takes from the hero matches `HERO_STATES` (sleep 5h 12m / 1:18 to 6:30, $48k / 60 seats, Flat 402 / 204 / 18 Church Street, kits #1041-#1043, Monday SSO, SR-2081, Thursday arrival);
- no screen shows a snapshot time or a quiet-hours interval; no delivery window; Quote v4 (not v3) is the quote everywhere in the aftermath;
- every item open on card 1 is still open on card 5 (its four choices cover the three decisions plus the run); nothing says sent, approved, moved, charged or done;
- the 3pm clash and Thursday's proposal are never resolved or called accepted; Northstar approval never appears on card 4;
- no banned word or exclamation mark; each card has exactly one headline and one supporting line.

### The five screens (real HTML, not flattened images)

All five sit in the hero's phone mockup (`--u = 100cqw / 517` units) at one phone scale and one stable card height. Deliberate crops are allowed, but never of an approval question, recipient or draft.

1. **Overview.** Greeting "Afternoon. Here's where things stand." Summary: "Quote v4 is $48k for 60 seats. Maya's draft covers Monday SSO and Friday kits, with the demo kit for Thursday. Soundroom's address still needs your check. Nothing sent." Needs you: Northstar (Review Quote v4, $48k / 60 seats · Before 5pm), Maya's update (Monday SSO, Friday kits · Draft held), Soundroom (Flat 204 or 402? · Confirm address). Quiet rows: Design review (Thursday 11am proposal still unsent), Tomorrow's run (5km easy option prepared · Plan unchanged). Tapping an item opens a local detail sheet; items never drop because only three are featured.
2. **Chat.** Title "Tomorrow's run", chips (5h 12m sleep · 32% recovery · 12.4km hills), the question, the activity line, the lead answer, the supporting paragraph, and a plain sleep-duration bar labelled 1:18am-6:30am / 5h 12m (no stage trace, no deep-sleep numbers). On wide screens a second crop beside the phone shows the written follow-up; on small screens "open follow-up" reveals it. Already written, no typing animation, no changed workout.
3. **Health logic.** Rows Form / Recovery / Weight; Form shows its context line (no ring, no percentage, no curve); Recovery 32% "WHOOP's reading. One signal, not a verdict."; Weight "No reading linked", no chart. Form and Recovery open the evidence panel ("Time isn't the only thing you need." with Sleep, Recovery, Previous run, Prepared option rows).
4. **Permission handoff.** New draft-review state in the chat style: "Soundroom delivery", Waldo's note, To: Soundroom support, Subject: SR-2081: delivery address, Status: Draft only, the shortened draft ("...Please confirm the corrected delivery address."), the review question, composer placeholder "Confirm or edit the draft". "Edit" reveals the edit state and the written exchange ("402 is right. Let me read the draft once more." / "The draft is still here. Nothing sent."). No send button, no "Sent" state. Northstar approval is not on this screen.
5. **Quiet-hours catch-up.** The v2 recap composition: small label "After quiet hours", headline "Back? Here's what needs you.", the recap ("Ready when you are: Quote v4, Maya's Monday-SSO and Friday-kit update, and the Soundroom address reply. All held for your review. Dev needs the final PDF by 5."), the prompt, the four choices, input "Something else? Tell me." with mic and send, the line "Choosing an item opens it. It doesn't approve or send it.", and a small calendar glimpse with no new events. A choice highlights that item's review thread; it never marks anything done. The input is local; the mic never asks for access.

## 6. Responsive

- **1440:** one wide main card with generous peeks; copy left, screen right.
- **820:** smaller peeks and gutter; same layout; text and screens stay at reading size.
- **390:** one near-full-width card, small peeks; copy above the screen/detail crop; the desktop card is not shrunk. No page-level horizontal scroll (measured on `scrollWidth`).
- No scroll-jacking or pinned scroll.

## 7. Accessibility

- A labelled region with `aria-roledescription="carousel"`; each card a labelled slide ("1 of 5: Overview"); controls are real buttons with names; the active position is `aria-current`.
- Auto-rotation only on request; a visible, named play/pause.
- One line of accessible text: "An illustrative scenario. The names, amounts, readings and quiet hours shown are samples, not your data."
- Visible focus rings; every demo control reachable by keyboard.

## 8. Build order

1. Fixture and its test (checked against `HERO_STATES`).
2. Section shell, header and the carousel with five empty cards (controls, drag, keyboard, autoplay, reduced motion).
3. Cards 1 and 5.
4. Cards 2 and 4 (the chat pair).
5. Card 3.
6. Review-route polish and a result log at the bottom of this file.

## 9. Verification

Port 3005, screenshots of `/preview/what-you-see` at 1440, 820 and 390 (each card active, plus a mid-slide frame): reading size, line wraps, card crops, draft visible on card 4, peeking neighbours, no horizontal overflow; manual cycling by dots, arrows, keyboard and drag; reduced motion; autoplay paused on load, plays on request, pauses on hover and focus. Plus `tsc`, `eslint`, `npm run build` and the fixture test. Nothing is called finished for production.

## 10. Open items (defaults in bold)

1. References: received (section 4); building from them plus the brief's exact text.
2. Later placement on the homepage: **directly under the hero** (recommendation only; not done).
3. Start building the hidden review route: waiting for an explicit go.


## 11. Result log (2026-10-01)

Built at `http://localhost:3005/preview/what-you-see` (hidden; `noindex`; not in `sitemap.ts`). `app/page.tsx` and the hero were not touched for this section.

**Checked**
- `node --test tests/see-fixture.test.mjs tests/hero-states.test.mjs`: 19 pass (9 new: the fixture against `HERO_STATES`, no snapshot time or quiet-hours interval, no delivery window, nothing sent or approved, the three decisions open on both card 1 and card 5, clash and Thursday proposal unresolved, Northstar absent from card 4, Weight empty and Form without a score, copy rules).
- `tsc`, `eslint` (the new files) and `npm run build` pass; `/preview/what-you-see` is built as a static route.
- Headless Chromium at 1440, 820 and 390 px, each card active: no page-level horizontal overflow (scrollWidth equals clientWidth at all three); every approval question, recipient and draft is visible on card 4; card 3's four evidence rows and card 1's three decisions are inside the card at all three widths.
- Interaction, run in the browser: starts paused; next/previous, the five dots, ArrowLeft/Right, Home and End all move one strip; a mouse drag of more than 80px turns one card; Play advances after 8s and pauses on hover; with `prefers-reduced-motion` there is no Play button and nothing moves by itself. Choosing an item opens its detail over the phone; Weight shows the empty state; Edit draft shows an editable draft and the written exchange with no "Sent" anywhere; a catch-up choice highlights and opens that item's detail without marking it done.

**Choices made that you may want to change**
- Card ratio 7:4 (about 1120 x 640 at 1440); the video stills read as about 2:1, but card 3's four evidence rows would not fit in that height. Tablet 680px and phone 700px tall.
- Cards are light (white) on the page's own surface, neighbours at 60% opacity; the first card is centred with nothing on its left.
- Card 4's composer shows the placeholder and the mic but no send arrow. The mic does nothing and never asks for access; the "something else" field on card 5 is local and Enter does nothing.
- The text that opens when an item is chosen (card 1 and card 5) is not in the brief; it is built only from the brief's own facts (see `ITEM_DETAIL` in `see-fixture.ts`). Please read it.
- Under 1024px the follow-up on card 2 opens from a "Read the follow-up" button over the card rather than sitting beside the phone.

**Not done / open**
- Not checked in Safari or Firefox. The cards use `corner-shape` like the site's other white boxes, which falls back to plain rounded corners where it is not supported.
- The chat and health screens follow the layout of the references but are built in code, so details (icons, the pinned-chip row) are close, not pixel-matched.
- Weight's evidence "No weight claim to make here." (brief) and "No reading linked" both appear, as the brief's rows say.
- Moving it under the hero on the homepage is a separate step; not done.

## 12. Changes after review (2026-10-01)

- **On the homepage, right after the hero**, with no section heading: the eyebrow, "Less to sort. Still your call." and the intro line are not shown (still in `see-fixture.ts`, unused on the page).
- **No end:** the strip is infinite, like the last section on apple.com/in. The five cards are laid out three times over; the middle set is the real one; once the strip rests in an outer set it is moved, unseen, to the same card in the middle set. Next after the fifth is the first; previous before the first is the fifth; the left neighbour of the first card is the fifth. The extra copies are `inert` and hidden from assistive tech. Autoplay (8s a card, with the hero's dots) runs forward without end; hover and focus hold it; reduced motion stops it.
- **Card words:** body text only, centred (in the middle of the left column on desktop, at the top on tablet and phone).
- **Controls:** the hero's dots, no pause button, no visible arrows.

## 13. Arrival animation (2026-10-01)

Each card's screen plays when its card comes into view: the parts rise into place in turn (16 units, 0.7s, the sheet curve, 90ms apart after a 380ms wait), in the order a person would read them. Only the card in the middle plays, once per arrival; the others rest as finished screens. It waits until the section is on screen and does nothing with `prefers-reduced-motion`. CSS only: `.see-in` / `.see-pop` / `.see-turn` / `.see-fill` with `--i` as the place in the order (`see.css`, "Arrival"); the section marks the playing slide with `data-arrive` and the section with `data-live`.

- **1 Overview:** Waldo, the greeting, the summary, "Needs you", the three decisions one by one, then the two quiet rows.
- **2 Chat:** the chips, the person's message pops in from its corner (spring), the activity line, the answer, the supporting paragraph, the sleep card, the sleep bar fills from left to right, the times; beside the phone the follow-up arrives bubble by bubble (520ms apart). Nothing types.
- **3 Health:** the summary, the three rows, the panel, then the four evidence rows. Choosing Weight or another row brings its panel in the same way.
- **4 Handoff:** Waldo's note, the draft card, To / Subject / Status, the draft, the question, the composer.
- **5 Catch-up:** the label, the headline, the recap, the prompt, the four choices one by one, the input, the note, the calendar.

Swapping a copy of a card for the real one (the strip's loop) does not replay it; a copy is swapped only after its screen has finished arriving (3.2s), or at once at the far ends.

## 14. Responsive composition, copy size unchanged (2026-10-01)

Cause of the "caption" look: the card words are the site's 16px body text (kept, by decision), sitting in a column sized to the window (34% of a card that was 78vw wide and as tall as width/1.75), with the phone also sized to the window, and the layout switching at fixed window widths (1023 and 640px). Between 1024 and 1200px the card shrank to about 800 x 456 and the phone to 317px; at 1023px the card jumped to nearly full width.

Fix (composition only; same words, same 16px, same weight):
- **Card width changes continuously:** the window less two peeks, where a peek grows smoothly from about 16px on a phone to 160px, up to 1120px. No jump at any width.
- **Each card is a container** (`container: see-card`), and what is inside is laid out for the card's own width.
  - **Wide (card 760px and up):** the words have their own column (220–300px; 200–260px on the chat card). Words and phone sit together as one centred group with a 40–88px gap. The words are vertically centred and left-aligned. The card is a steady 580–640px tall. The phone is up to 440px wide (400px on the chat card).
  - **Chat card under 900px:** the follow-up moves from beside the phone to a "Read the follow-up" sheet.
  - **Narrow (under 760px):** the words get their own place at the top, centred, at most 32 characters a line, 24px from the top, with a 24px gap to the phone. The phone is up to 380px wide, and the card is 660px tall.
- **Per-card text width (`copyCh` in `see-fixture.ts`)** so each headline breaks well without forced line breaks.
- **Only the middle card can be used** (the others are `inert`), so a copy of a card the loop shows for a moment is never a dead picture.

Checked: all five cards at 1440, 1024, 820 and 390 (reduced motion, so the screens are finished). A resize from 1440 to 340px in 20px steps on each of the five cards found, at every step: the same card stays in the middle and centred, no page-level sideways scroll, the words always inside the card and never over the phone, and the handoff question always inside the card. Keys, dots, drag, autoplay, hover hold, reduced motion, the loop seam, the item sheets, Edit draft and the catch-up choices still work. Not checked in Safari.

## 15. Card 1 uses the hero's animated Overview card (2026-10-01)

On Suyash's instruction card 1's screen is the hero's own Overview card, the version that writes itself, with the connector marks in its pills, in place of the static afternoon overview (`overview-player.tsx`; styles `.see-h-*` in `see.css`). It plays through the hero's 27 states (`hero-states.ts`, unchanged) with the stacked-card change (the card in front shrinks back, the next rises, the two behind step up), one state every 2.6s while card 1 is the one in view and the section is playing; it keeps its place between visits and starts on state 27, the afternoon. With reduced motion it rests on state 27. Every copy of the card that the loop needs shows the same state. The `OVERVIEW` text in `see-fixture.ts` is no longer shown on any screen (it is still tested and still the source for the card 5 item details).

Update (same day): the change is now the card itself, after Suyash's Linear triage recording (the card stays put; nothing slides). The old card swells to 103% and fades out over 420ms; the new one grows from 96.5% to full and fades in over 520ms starting 180ms later, so both are faint for a moment; the cards behind dim and settle with it. Nothing inside the card moves by itself (no per-line rise, no text cross-fade). What still needs the reader is a checkbox (a small rounded square), not a ring.

Second pass on the card change (same day), from the recording read frame by frame: the old card also moves down about 6px as it swells and fades (340ms); the next card starts about 10px higher and at 96.5%, and comes forward into place (520ms, after 140ms). It now starts in a layout effect, so the new state is never painted at full strength for a frame before the change begins. Measured in the browser: the old card goes from 377px to 388px wide and 3px lower and is gone by 375ms; the new one goes from 363px wide and 6.5px higher to full by about 700ms.

Status bar and header from the asset (2026-10-02): the status bar (9:41, signal, wifi, battery) on every phone, and the Overview header (back button and title, with the fade under it) on card 1, are now the Figma mockup's own drawings, cut from `phone-front.svg` into `public/assets/home/phone/phone-status.svg` and `phone-header-overview.svg` and laid over the screen at the mockup's size, in place of the hand-drawn versions. The other screens' headers (Tomorrow's run, Health, Soundroom delivery) are still drawn in code, because the mockup has no art for them.

## 16. Card 2 is Suyash's own drawing (2026-10-02)

Card 2 now shows `public/assets/home/chat-form.svg` (Suyash's `form.svg`, copied unchanged; the whole phone in one picture, so its words are his: "Why do I feel inactive today?", Recovery 61, 8h 02m). The hand-built chat screen is gone. On arrival a pointer goes to the replies button (the round message icon with the 7), presses it, and a thread opens beside the phone (over the phone on narrow cards, with a close button), with the conversation going on: Waldo's answer it hangs from, "But I did sleep for around 8 hours", Waldo's answer about 8h 2m in bed against 6h 40m asleep, "so the 8 hours basically lied to me?", and Waldo's last line, arriving one bubble at a time. The button is real: it opens and closes the thread. The thread text is taken from the chat screenshot Suyash supplied (the last line was cut off at "they count hours," in that screenshot; it ends "they count hours." here). Neighbouring cards and a card with less motion show the thread already open. This story (sleep 8h 2m, Recovery 61) is not the Wednesday fixture of the other cards; the fixture tests no longer assert hero facts on card 2. The picture is 976KB (it carries its own phone frame); not checked in Safari.

Update (same day): the thread now looks like Suyash's image (all in the body font at one size; Waldo's lines in soft rounded bubbles with a hairline, the person's in white pills on the right; an expand button on the first bubble's corner with a thin line hooking down to the reply; round buttons for copy, collapse, thumbs up and thumbs down under the last line), and its last line is as drawn, ending "they count hours,". The pointer-and-press sequence now starts by itself whenever the card arrives and is on screen, whether or not the pointer is resting over the section (it used to wait while the mouse was over the carousel, which paused it).

Update (same day): the thread opens in the same screen, inside the phone, not beside it. The replies button pushes a new screen in from the right (500ms, the sheet curve) over the chat and under the status bar; the picture's own status bar and island stay. The new screen: a header in the drawing's own style (the round-square back button, the title "Thread" with "7 replies" under it, a "more" button), then the conversation in the bubble style of Suyash's thread image arriving one by one (Waldo's answer it hangs from, with the expand button and the hook line; the person's lines as white pills; the copy / collapse / thumbs up / thumbs down row), then the chat's own composer at the foot ("woo, type away…", mic, black send button). The back button returns to the chat. The window the screen slides in matches the drawing's screen (x 23.2 to 374.2, y 68 to 790.3, rounded bottom corners). The side panel and the narrow-card overlay are gone; every card width does the same.

Update (same day): the thread is texted out, not loaded at once. Once the screen has pushed in, the person's line is typed (34ms a character) in a bubble that grows on the right (and in the composer, which the card's crop hides on wide cards), then sent; a moment later Waldo's three dots bounce for 1.5s and his answer pops in; a pause; the second line is typed and sent, the dots again, his last answer, and the buttons under it. Each line pops up on a spring and the thread keeps the newest line in view. The chat card holds for 15s (the others 8s) so the whole conversation plays before the strip moves on. A card at rest, or with less motion, shows the complete thread; opening it with the replies button plays it again.

Update (same day), the whole of card 2 now plays as a real conversation would arrive. Before the pointer there is a starting sequence: the card begins with an empty chat (the header, the chips and the composer of the drawing), then his question pops in from the right, Waldo's three dots, "Checked last night against your 7-night baseline..." appears, his answer, the explanation, the chart and the buttons under it, with the 7 on the replies button (each part rising in turn, about 0.7s apart), and then the pointer goes to the button. The drawing is one picture, so each part is the same picture clipped to its rows (`BANDS` in `screens.tsx`) and moved on its own, over a patch of the screen's flat colour (#f4f3f0, which the drawing is below y 170) that hides the finished chat until its parts have arrived. When the thread is pushed in, the chat under it dims. The thread's header is just "Thread" (the 7 is on the button). The card holds 21s. At rest (neighbours, reduced motion) it is the complete picture.

Health screen redone as the app's own UI (2026-10-02): card 3 is no longer rows plus a panel. It shows three rings side by side (Form 46, Recovery 32, Weight 38, 0 to 100, each in its zone's colour; Weight runs the other way, so 38 is a light day), then the suggestion card ("Easy 5 km", the summary, and the Sleep / Recovery / Previous run reasons with their sources) and a line that the calendar and plan have not changed. This replaces the earlier "no score ring, no percentage, Weight has no reading" rule: Recovery 32 is still WHOOP's reading, but Form 46 and Weight 38 are illustrative numbers chosen to fit the story (short sleep, hills yesterday, room in the calendar) and are not from the hero fixture.

Health suggestion card redone (2026-10-02): the lower card is now a prepared-run card: "Suggested for tomorrow", a large "5 km" with an "Easy · No pace target" line and a five-bar effort meter (one bar filled), the summary, then three small tiles (Sleep 5h 12m, Recovery 32%, Previous run 12.4km hills), each with its source's connector logo (Garmin, WHOOP, Strava). The "calendar and plan have not changed" footnote was dropped to make room; the summary already says the run was not changed.

## 17. One app, one kit (2026-10-02)

Why: the five screens looked like five different apps. Card 2 was a picture with its own story (8h 2m, Recovery 61), card 3 was a dashboard of rings, and cards 4 and 5 each had their own layout and type. Suyash asked for screens that read as one app and show Waldo solving things, continuing the hero's story.

**The rule:** card 1 stays the hero's Overview card (the app's home). Cards 2 to 5 are all **threads**, built from one kit in `screens.tsx`, with the look taken from Suyash's chat drawing (`chat-form.svg`):

1. Header: the round-square list button, the title, "more".
2. Chips: what Waldo is reading, with the pin before them and + after.
3. The person's message, as a white pill on the right (not on card 4, where Waldo starts it).
4. Waldo's three dots, then a grey line saying what he checked.
5. His answer: one bold line, then a grey detail.
6. **One white card** for what he prepared. Only this changes from card to card.

Every screen plays the same way when its card arrives, in that order. The chat card no longer holds longer than the others (all 9s).

**The story, all one Wednesday (the hero's facts):**

| Card | Asked | Waldo's answer | The card |
|---|---|---|---|
| 2 Chat | Why do I feel so flat today? | Short night that started late; Recovery 32%. I'd keep the hour after board prep free. | Sleep chart, 1:18am to 6:30am, 5h 12m |
| 3 Health | Still good for the tempo tomorrow? | I'd go easy. 5km, no pace target. Plan unchanged until you say so. | Thursday's run: 8km tempo beside 5km easy, "Swap it in" / "Keep the tempo" |
| 4 Handoff | (he starts it) | Their email says Flat 204. Your order says 402. Correction drafted. | Gmail draft, "Draft only", "Send it" (inert) / "Edit" |
| 5 Catch-up | Back. What did I miss? | Nothing's on fire. Three things need you; the quote can't wait past 5pm. | "Handled" (courier delay found, Cedar's retry set) and "Needs you" (the three decisions, each opens its detail) |

Removed: Suyash's chat picture and its thread-and-pointer sequence, the three rings, the calendar glimpse, the follow-up beside the phone, the "run" choice on card 5. The picture `chat-form.svg` stays in `public/` as the reference for the look. Fixture tests updated; type-check, lint and tests pass. Not checked in Safari.

**Type (2026-10-03):** on Suyash's call, everything inside the phones is set in SF Pro only, the iPhone's own font: no serif, and not the site's SF Pro Rounded. Waldo's answer line is SF Pro semibold. SF Pro is not bundled, so phones and Macs show it and other devices fall back to Helvetica or Arial. The words beside the phone stay in the site's type.

**Lines and shadows (2026-10-03):** no drop shadows anywhere in the phone screens. Every line (buttons, chips, message pill, cards, dividers) is 0.5px, #1A1A1A at 8%, in light and dark mode alike. The round header buttons lost their soft outer ring.

**Card 4 is not a thread (2026-10-03):** Suyash's note: it is something Waldo shows you, not a chat. It no longer uses the thread kit (no chips row, no message, no "checked" line). It is its own screen: a "Found by Waldo" tag and heading ("Wrong flat on your delivery"), a card comparing Soundroom's email (Flat 204, struck through, a red cross) with the order (Flat 402, a green tick), the order facts (SR-2081, Thursday), the drafted correction ("Draft only"), and the choice in a bar at the foot ("Send correction" is inert, "Edit" works). Cards 2, 3 and 5 still use the thread kit.

## 18. The delivery card opens from the Overview (2026-10-03)

Card 1 now carries the delivery story (Suyash's note: show it in the Overview itself, as a small actionable card first, then open the detailed screen with an animation).

- **The screen:** the Overview is scrolled up under the header, so only its foot shows (the last lines of the hero's card, faded out under the title, with the cards behind it as slivers below). The focus is the white **delivery card**: "Found by Waldo", "Wrong flat on your delivery", Soundroom's email (Flat 204, struck through) against the order (Flat 402), and a dark "Review the correction" button with "Draft only". Under it, "Also waiting on you" loads in from the bottom and is cut off by the phone: Northstar (Quote v4, $48k / 60 seats, before 5pm), Maya's update (held), Design review (unsent). These are the same three things as card 5, and they are not clickable.
- **The animation:** clicking the delivery card grows the full delivery screen (card 4's screen) out of the card's own outline, over 560ms, while the Overview's header fades and the screen's parts rise in one after another. The back button folds it back into the card (420ms). Esc also closes it. Leaving the card resets it to the Overview. With reduced motion it simply appears.
- **Still there:** card 4 keeps the same screen on its own. **Open question for Suyash: drop card 4 now that it lives inside card 1?** (One entry per feature.)
- Slide height is back to 580-640 (wide) and 660 (narrow). `FEED` in `see-fixture.ts` holds the three rows.

## 19. Second brief from Suyash (2026-10-03): the five cards, rebuilt

Rules for every screen: SF Pro only, no drop shadows, 0.5px lines (#1A1A1A at 8%), crisp copy, and **a button to talk to Waldo on every screen** (Siri-like: a glowing orb in a bar at the foot of the visible screen). Decisions are yes / no; details open in a sheet from the bottom ("toaster"), and documents are linked in that sheet, never in the decision itself.

| Card | Time | What it shows |
|---|---|---|
| 1 Daily brief | Wed, through the day | The brief card on top of a stack. It changes with the part of the day (6:40am, 11:20am, 2:10pm, 4:15pm, 8:30pm); the clock and a "Morning / Midday / ..." label change with it. The stack behind it is what Waldo did to get there, opened on demand ("How I got here"). Each decision has Yes / No and a Details link. The top of the "To send" box (card 4) shows under it. |
| 2 Chat | Wed 9:12am | Prequel: an empty chat, the question typed and sent. Waldo names the chat, pins the relevant trends, works through several checks at once (they collapse to one line), answers in short with a detailed sleep graphic and what to do about it. Copy / thread / like / dislike / speak / retry under it. Then a plain follow-up with no graphic. |
| 3 Plan | Wed 8:55pm | Prequel: Thursday's packed calendar. The Waldo button is pressed and the chat rises over it: "When do I train tomorrow, and what?" Waldo answers (7am, easy 5km and mobility), shows it on tomorrow's timeline, and quietly lists what he handled: the calendar block, a text to Mrs. Chen the chef, the Forerunner charge reminder. No meeting moves. |
| 4 To send ("Every reply drafted. Yours to send.") | Wed 4:15pm | The same screen as card 1, scrolled up: the brief's foot at the top, then the condensed "To send" box, ranked by priority, work and life mixed (Soundroom, Dev's quote, Mum's birthday, the landlord, Maya). A row opens a sheet with the draft and "Send with Gmail" (or WhatsApp / Slack). |
| 5 Overnight | Thu 6:30am | Not "what did I miss": the lock screen when you wake. Waldo held the night's noise and shows the few things that matter, including Soundroom confirming Flat 402. |

**Built (2026-10-03).** Files: `kit.tsx` (phone with live clock, header, Waldo button, bottom sheet, reply buttons, script player), `brief.tsx` (cards 1 and 4), `chat.tsx` (cards 2 and 3), `lock.tsx` (card 5), `phone.css` (all screen styles), `see-fixture.ts` (the story). `screens.tsx` and `overview-player.tsx` are gone; card 1 no longer plays the hero's 27 states, it plays five parts of the day.

- The phone measures where the card crops it, so the Waldo button and the sheets always sit just above the crop (checked at 1440, 800 and 390 wide).
- Each card holds long enough to play through: brief 17.5s, chat 19s, plan 22s, to send 9s, overnight 8s.
- Interactions: Yes / No and Details on every decision, "How I got here" (also by tapping the stack), every "To send" row opens its draft, Send marks it sent, Edit makes the draft editable.
- Sleep is shown with Apple Health's mark, since Garmin's mark is a wordmark that can't be read at chip size.
- Checks: `tests/see-fixture.test.mjs` rewritten for the new story (yes / no decisions, docs only in details, crisp copy, one set of facts, ranked list with work and life). Type-check, lint and production build pass.
- Not checked in Safari. On a 390px phone the phone picture is about 290px wide, so its text is small.

## 20. Simpler, quieter, Notion-like (2026-10-03, plan)

Suyash's note: the concepts are right, but the screens are confusing for someone seeing Waldo for the first time. Waldo shows things very simply. No rainbow on the Waldo button. Lower contrast, Notion-like, subtle like Linear (in light mode), with micro-interactions, subtle motion and subtle gradients. Better hierarchy and legibility.

**Look**
- Notion's warm palette: text #37352F, secondary #787774, faint #A3A29E; colour only from Notion's muted set (blue #337EA9, purple #9065B0, green #448361, orange #D9730D, red #D44C47) and their pale backgrounds. No black buttons: the one main action in a sheet is Notion blue; everything else is a soft grey fill.
- Lines stay 0.5px #1A1A1A at 8%. No drop shadows.
- Screen background is a barely-there warm gradient. The brief card carries a faint tint for the part of the day (peach morning, blue midday, butter afternoon, rose late afternoon, lilac evening) that cross-fades when the brief updates.
- Headers lose their boxed buttons (plain grey icons). Fewer weights: 500 for emphasis, 600 only for screen titles.

**Simpler**
- Card 1: the day label moves into the brief card (dog, "Morning brief", time); the separate day rail goes. Chips in sentences become soft inline mentions. Decisions: the question, a grey "Details", and two small soft buttons.
- Card 2 / 3: pinned trends without the + button and without orange badges; the graphic loses its legend; tips and "Handled" become one grouped list.
- Card 4: priority dots go; only what is due today is tinted.
- The Waldo button: a plain white bar with Waldo's dog, "Ask Waldo", and a mic. A slow grey shimmer passes over the words now and then.

**Motion (all subtle)**
- Brief updates: the old text blurs out, the new one sharpens in; the day tint cross-fades.
- Buttons press in slightly; Yes / No settle into a tick with a small spring; Undo brings them back.
- Sheets rise on a spring over a soft scrim. Chat lines rise and un-blur. Checks shimmer while running and settle into one line.
- "How I got here" is a small timeline whose dots appear one after another.

**Built (2026-10-03).** Section 20 is in: Notion palette and contrast in `phone.css`, plain header icons, the Waldo button with the dog (no rainbow) and an occasional grey shimmer, the brief card's part-of-day wash, soft Yes / No, quieter "To send" (no dots; only the most urgent due dates in orange), pins without + or badges, sleep stages on their own lines, grouped tip and "Handled" lists, timeline in "How I got here", blur-in motion for new text, spring ticks, a fade under the Waldo button in chats. Mum's message is now due "Tonight". Checked in the browser at 800px wide; type-check, lint, tests and build pass.

## 21. Linear's UI and charts, icons from Suyash's set, no gradients (2026-10-03, plan)

Suyash: use icons strictly from `waldo-icons/`; remove gradients; the infographics should follow Linear's, line by line; and the UI should come from Linear too.

**Icons.** Every icon is an SF Symbol from `waldo-icons/`, copied to `public/assets/home/icons/` with its glyph re-framed to fill its box, and drawn as a mask in the text colour. Mapping: back/chevron (chevron.left/right.tag), more (ellipsis.tag), panel (sidebar.left), mic, plus, send (arrow.up.tag), close (xmark.tag), check, pin, moon, sun (sun.and.horizon), bed (bed.double), heart, calendar, coffee tip (clock.tag), chat (bubble.left), watch (applewatch), copy (square.on.square), thread (text.bubble), like / dislike (thumbs.up / thumbs.down), speak (speaker.waves), retry (arrow.clockwise), lock, flashlight, camera, priority (cellularbars), pending (circle.dotted), milestone (diamond.shape).

**No gradients.** Flat screen colours; the Waldo button sits on a flat band; chart bars are flat colours. (The moving shimmer on "checking…" lines stays: it is motion, not a fill.)

**Linear's UI, in light.** Read from linear.app (their Thread panel, issue cards and Insights dashboard): 0.5px borders, ~9px card corners, two weights (510 / 590), 12 to 16px type, grey meta text, an indigo accent (#5E6AD2) for the one primary action, labels as small pills with a coloured dot. The chat becomes Linear's thread: avatar, name, time, then the text, no bubbles; the composer is Linear's input box with an indigo send button.

**Linear's charts.** As on linear.app/insights: a card with its title top left; thin stacked bars with small gaps between segments, flat colours; dotted horizontal gridlines; axis numbers on the right in small grey; dots for legends. Card 2: sleep over the last 7 nights (deep, REM, light), last night the short one. Card 3: tomorrow as Linear's timeline: hour ticks on top with dotted lines, rows for Run (a bar), Meals (diamonds) and Meetings (grey bars).

**Built (2026-10-03).** Section 21 is in. Icons: 31 SF Symbols from `waldo-icons/` in `public/assets/home/icons/` (plus person, priority, pending, diamond), drawn by `Icon` in `kit.tsx` as masks. No gradients anywhere in the screens (the screen, the brief card, chart bars, the chat sheet and the lock screen are flat; the old fades under the Waldo button are a flat band). Linear palette and type in `phone.css` (weights rendered as 500 / 600 because the system SF Pro snaps 510 / 590). Chat is Linear's thread: avatar, name, time, text. Card 2's chart: "Sleep, last 7 nights", stacked bars (deep / REM / light), dotted gridlines, scale on the right, last night in full and the six before at half strength. Card 3's chart: Linear's timeline for Thursday (Run bar, Meals diamonds, Meetings grey). Priority in "To send" uses the signal-bars icon. Checked in the browser at 800px; type-check, lint, tests and build pass.

## 22. Round, Apple-like, in Waldo's colours (2026-10-03)

- **Colours from DESIGN-SYSTEM.md:** ink #1A1A1A with greys #6B6B68 / #9A9A96, canvas #F4F3F0, white cards, sunken #E8E6E0. Primary actions are ink pills. The orange accent #FB943F appears once per screen: Waldo's send button (and a soft orange behind his dog in the Waldo button). Action blue #2388FF is for calendar items and edit focus. Green #22C55E for done, red #F43F5E for "below your usual". The indigo is gone; the sleep chart is ink / grey / sunken.
- **Round:** buttons, inputs, chips, header buttons and avatars are pills or circles; cards, sheets, lists and notifications have ~24 to 36 unit corners with the site's continuous (squircle) corner shape.
- **Brief text in the Overview mockup's style:** body in ink at a larger size; chips as white pills with a hairline and a coloured icon (Sleep in purple, calendar items in blue), an icon-only round chip, and a green circle with the run icon (figure.run, from waldo-icons) for the workout. "Needs you" as a quiet grey heading.
- **One-to-one chat:** your messages on the right in a rounded white bubble; Waldo's on the left beside his dog, with no names or times.

**Follow-up (2026-10-03):** taken from Waldo's own iOS app (`~/Documents/GitHub/Waldo/waldo-app`, `ChatBubble.tsx`) and the Overview mockup. Chat: no picture for Waldo; your messages in an ink bubble on the right (corner tucked bottom right), Waldo's words in a white bubble on the left (corner tucked bottom left), charts and lists full width under them. Brief: the dog at its mockup size at the top; a hairline and "One thing / Two things still need you." as a heading between the brief and its decisions; "How I got here" removed as a row, the stack behind is the way in, with a small grey line under the card ("Tap the cards behind to see how I got here. You probably won't need to."), which also separates the brief from "To send".

**Fixes (2026-10-03):**
- Card 3: the calendar's header (with its round buttons) fades out when the chat sheet rises, so nothing peeks past the sheet's rounded corners; the sheet's own header sits lower.
- Card 3's calendar made real: "October" with a week strip (Thursday 1 October picked), an all-day item (Release week · v1.8), hour and dotted half-hour lines, and each meeting with its time and place or people (Zoom · Dev, Maya; Room 4B · Priya, Leon; Jira REL-42...), a dashed "Commute", one-line meetings when under an hour. The date is now Thursday 1 October (2026's calendar) on the lock screen too.
- Card 5: no Ask Waldo bar on the lock screen; just the flashlight and camera at the corners.
- The dog is gone from the brief card.
- Bed, heart, run and watch icons were upside down (their health-set files carry a flip); fixed in the files.
- Type hierarchy pass: brief text 18, decisions 15.5, section heads 17 ("Two things still need you.", "To send"), chat text 16.5, sheet titles 19 with 16 body and buttons, list names 15.5 with 13 detail; meta (part of day, times, axes, notes) stays 10.5 to 13 in grey.
