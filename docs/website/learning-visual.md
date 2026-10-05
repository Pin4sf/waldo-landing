# Visual for "Knows what kind of day it is."

Status: **Built** (2026-10-01), inside Apple Calendar's own day view instead of a UI of ours: `components/site/learning-weeks.tsx` (white card, `Item`'s `scene` prop). Calendar draws everything except one thing: the month in red and the week strip along the top (Wk 41, 42, 43, with the dates turning over each week), the day's timeline with hour lines, an all-day row, and the Weekly Sync as a tinted blue event with a bar down its left edge. Waldo has no screen of his own; what he does shows up as the calendar changing. Under it is a small card with his one line and, in Weeks 1 and 2, the buttons. Defaults taken for the open questions: the cause is shown as an all-day event, "Form is low 41" (the Form line and the "steps in before the dip" dot were dropped as not Calendar's own), and the card is white like its neighbours.

Second pass (2026-10-01): the weeks were not evident at first sight and the calendar looked empty. A segmented control (Week 1 | Week 2 | Week 3, iOS style, its thumb sliding to the week playing; clickable) now sits top right, and each day carries a realistic set of events in Calendar's colours (Design crit, Standup, Lunch with Anika, 1:1 with Leon on Tuesday; Call with Maya, Board prep, Investor update on Thursday), shown 10 AM to 4 PM so the 4 PM Weekly Sync is fully visible. "Moved by Waldo" is text on the event, with no illustration.

How it plays: each week the strip turns over and the view is on Tuesday, the day with "Form is low". **Week 1** (5.6s): the Weekly Sync is at 4 PM and he asks, "Form is low. Move Team Sync to Thursday?" with Yes and No. Yes is pressed, the selected day slides from Tuesday to Thursday, and the meeting is at 11 AM, marked "Moved by Waldo". **Week 2** (4.6s): the meeting is on Tuesday for a moment, he moves it and says "Moved Team Sync to Thursday, like last week." with one Undo. **Week 3** (5s): Tuesday is already clear, the view moves to Thursday where it sits, and he says "Team Sync is on Thursday." with a tick. It loops, plays only on screen, and rests on the end of Week 3 with reduced motion. Dates are October 2026 (Tuesday 6, 13, 20).

The original brainstorm follows.

The card sits third in "Agents do tasks. Waldo carries outcomes." Today it is a still picture (`/build/returns-illustration.svg`): the same weekly sync across three weeks, with Form low each time. The line under it: *The same request gets a different plan on a rough day. Waldo can tell which day you're having.*

The new picture should move, and should show Waldo **learning you over three weeks**. One idea has to land in a few seconds, with no reading: **the longer he knows you, the less he has to ask.**

## What stays fixed

- One recurring thing (the Weekly Sync) in the middle, so the eye compares like with like.
- Three beats: Week 1, Week 2, Week 3. The same bad Tuesday each time.
- Plays by itself, only while on screen, loops, and with reduced motion rests on Week 3 (the payoff).
- Same card size and white frame as its neighbours; type and chips from the homepage loop; no exclamation marks.

## Five ways to show it

### A. He stops asking (the strongest)
The Weekly Sync card stays put. What sits under it changes each week:
- **Week 1:** he asks. "Form is low. Move this to Thursday?" with two buttons. You tap one.
- **Week 2:** he suggests. "Moved to Thursday, like last time. Undo?" One small button.
- **Week 3:** he just does it. A single quiet line, no buttons: "Form was low. Sync is on Thursday." and a tick.

The buttons shrink to one, then none. That is the whole story: trust built, friction gone.

### B. He gets ahead of you
A Form line across the day, with the same dip every week. A marker shows when Waldo acts:
- Week 1: after the dip. Week 2: during it. Week 3: **before** it, on the climb down, labelled "Heads-Up".
The marker slides left each week. Learning shown as getting earlier. Clear, but more chart than the page wants.

### C. His notebook fills up
Small cards type themselves in, one a week, like notes he keeps: "Tuesdays after three meetings: Form drops." / "You are sharper before noon." / "Friday 4pm never works." By Week 3 there is a short list, and the calendar behind it is already arranged to match. Warm and a little funny, but it shows what he knows, not what he does with it.

### D. The calendar rearranges itself
A week of calendar blocks. Week 1 nothing moves (a faint "noticed" dot on Tuesday). Week 2 one block slides. Week 3 the whole afternoon quietly reshuffles before you would have looked. Pretty and wordless, but it hides the cause (the Form dip).

### E. Same message, three replies
You text the same line each Tuesday ("tuesday looks rough"). His answer changes: a question, then a plan, then a one-word "Handled." Reuses the thread style of the neighbouring card, so too similar to it.

## Recommendation

**A, with a thin piece of B along the top.**
- A week track along the top (Week 1 · 2 · 3, the current one filled as a pill, like the dots under the phone).
- Under it, a small Form dial or line that dips each week, so the reader sees the cause.
- In the middle, the Weekly Sync card, the same each time.
- Under that, the asking shrinks: two buttons, one button, none.
- A last line fades in at the end of Week 3, in his voice: *you stopped having to tell me.*

Timing: about 3.5 seconds a week, 12 seconds a loop, a short rest on Week 3. Week buttons let the reader jump to a week; clicking pauses the loop.

## Copy sketch (fictional, same people as the homepage)

| Week | Form | Under the card |
|---|---|---|
| 1 | 41, low | "Form is low. Move Team Sync to Thursday?"  [Yes] [No] |
| 2 | 38, low | "Moved Team Sync to Thursday, like last week."  [Undo] |
| 3 | 40, low | "Team Sync is on Thursday." and a tick |

Closing aside, small and italic as the house style asks: *quietly familiar now.* (That line is already in the current picture.)

## Open questions

- Is Form the right dial to show, or is "what kind of day" better as a word (Rough, Steady, Peak) with the colour wash from the zone palette?
- Should Week 3 show one more thing Waldo does *without* being asked (an earlier bedtime nudge, the lunch moved), to say the learning spreads beyond the one meeting?
- Do we keep the grey/dark pairing of the current picture (grey for earlier weeks, dark for the payoff) or go white like the other two cards?
