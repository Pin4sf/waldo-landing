// The homepage loop's whole script: one fictional Wednesday, 27 signals, from waldo-phone-copy-v2.
// Every person, company, message and number is invented. The work Waldo reports as done (checked,
// compared, drafted, held) is scripted for the demo, not a claim about what the product does, and
// nothing in it is ever sent, moved, approved, charged, merged or scheduled.
//
// One entry per signal, in the order the stream tells them:
//   incoming  the notification as the source sent it: the full payload Waldo reads from
//   waldo     his reply in full
//   pill      the short preview of `incoming` that shows in the flying pill (waldo-pill-copy-short)
//   say       the short preview of `waldo` that shows in his reply pill
//   body      the Overview card, written out whole: this replaces the card, it is not added to it.
//             [Brackets] mark subject chips (a thing, never an app).
//   asks      the two-decision focus view: what still needs the reader, at most two
//   work      what this signal raises or re-words in the ledger below
//
// The card shows only two decisions, but the day does not forget the rest: `openWork` folds every
// signal so far into one ledger, and an item is never dropped because it left the visible bullets.

import type { ToolId } from "./waldo-loop";

export type WorkId =
  | "clash" // Board prep and Design review both at 3pm
  | "rohan" // Dadar at 5:50
  | "quote" // the Northstar quote: v2, v3, v4
  | "update" // Maya's update: one evolving, unsent draft
  | "sso" // the SSO date
  | "walkthrough" // the 10-minute onboarding walkthrough
  | "empty" // the empty-state button, which is what v1.8 waits on
  | "pr184" // the PR: green checks are not approval
  | "tempo" // Thursday's 8km tempo against the 5km easy option
  | "soundroom" // Flat 402, not 204
  | "cedar" // a retry Stripe already scheduled
  | "kits"; // three orders, one courier delay

/** `watching` is tracked but not a decision: something Waldo keeps an eye on. */
export type Work = { id: WorkId; label: string; watching?: boolean };
export type Ask = { text: string; covers: WorkId[] };

export type HeroState = {
  tool: ToolId;
  incoming: string;
  waldo: string;
  pill: string;
  say: string;
  body: string[];
  asks: Ask[];
  work: Work[];
};

export const HERO_STATES: HeroState[] = [
  {
    tool: "garmin",
    incoming: "Last night’s sleep: 5h 12m. Bedtime 1:18am; awake 6:30am.",
    waldo: "Five hours. Let’s not book you twice.",
    pill: "Sleep: 5h 12m. Up at 6:30.",
    say: "Let’s leave some room today.",
    body: [
      "Morning. [5h 12m sleep] isn’t much to run on. I’ve checked today’s calendar: [Board prep] and [Design review] both start at 3pm. Ambitious. Physically difficult.",
      "Thursday at 11 works for Priya and Leon. I’ve kept that option ready; neither meeting has moved.",
    ],
    asks: [{ text: "Move [Design review] to Thursday at 11?", covers: ["clash"] }],
    work: [
      {
        id: "clash",
        label: "Design review and Board prep both start at 3pm; Thursday 11am is only a proposal",
      },
    ],
  },
  {
    tool: "google-calendar",
    incoming:
      "Today, 3pm: Board prep with Anika, Nikhil + Tara, 60 min. Design review with Priya + Leon, 30 min.",
    waldo: "Keep the board slot. Move the review?",
    pill: "3pm: Board prep + Design review.",
    say: "Move the review to Thursday?",
    body: [
      "[Board prep] has four people; [Design review] has three and a clear Thursday slot. I’ve checked both calendars. Moving the smaller meeting gets your 3pm back without rearranging everyone else’s day.",
      "With [5h 12m sleep], I’d keep the hour after board prep free too.",
    ],
    asks: [{ text: "Move [Design review] to Thursday at 11?", covers: ["clash"] }],
    work: [],
  },
  {
    tool: "whatsapp",
    incoming:
      "Rohan in Kamshet Saturday: “Train’s at 6:15 now. Meet at Dadar by 5:50? I’ll bring coffee.”",
    waldo: "Dadar, 5:50. Coffee is doing some heavy lifting.",
    pill: "Rohan: Dadar at 5:50 Saturday?",
    say: "Early train. Coffee essential.",
    body: [
      "[Rohan’s train] is Saturday at 6:15am; Dadar at 5:50, not the old 6:30 meetup. I’ve pulled the change into your weekend plan and checked for a calendar clash. Saturday’s clear.",
      "Today’s [3pm clash] still needs a choice. The trip hasn’t quietly rearranged your workday.",
    ],
    asks: [
      { text: "Move [Design review] to Thursday at 11?", covers: ["clash"] },
      { text: "Confirm 5:50 at Dadar with Rohan?", covers: ["rohan"] },
    ],
    work: [{ id: "rohan", label: "Confirm 5:50 at Dadar with Rohan" }],
  },
  {
    tool: "gmail",
    incoming:
      "Maya Chen, Northstar renewal: “Can the $48k quote include 60 seats? Dev needs the final PDF by 5pm.”",
    waldo: "Found the question behind the deadline.",
    pill: "Maya: $48k for 60 seats? PDF by 5.",
    say: "One answer clears the quote.",
    body: [
      "[Maya] needs one answer, not another “checking on this.” I’ve drafted a reply covering the [60-seat cap] and pulled the quote beside it. Nothing sent.",
      "That leaves a price decision before 5pm and your [3pm clash]. Rohan’s Saturday plan is saved for later.",
    ],
    asks: [
      { text: "Approve the $48k / 60-seat offer?", covers: ["quote"] },
      { text: "Move [Design review] to Thursday at 11?", covers: ["clash"] },
    ],
    work: [
      {
        id: "quote",
        label: "Approve the $48k, 60-seat Northstar offer; Dev needs the final PDF by 5pm",
      },
    ],
  },
  {
    tool: "slack",
    incoming:
      "Leon in #sales: “Maya asked me too. Are we signing off 60 seats at $48k, or does Dev need another quote?”",
    waldo: "Same decision. Two places asking.",
    pill: "Leon: Is Maya’s $48k quote approved?",
    say: "Same question. Two threads.",
    body: [
      "[Leon] and [Maya] are asking about the same [Northstar quote]. I’ve combined the buyer’s question and the sales thread into one decision, with a reply draft for each. Your inbox has formed a committee.",
      "The $48k price is still unapproved. So is the proposed [Design review] move.",
    ],
    asks: [
      { text: "Approve $48k for 60 seats?", covers: ["quote"] },
      { text: "Move the review to Thursday at 11?", covers: ["clash"] },
    ],
    work: [],
  },
  {
    tool: "hubspot",
    incoming:
      "Northstar annual renewal: $48,000. Close Friday, 5pm. Blocker: Dev Rao awaiting final 60-seat quote.",
    waldo: "Friday depends on today’s PDF.",
    pill: "Northstar: $48k. Closes Friday.",
    say: "Today’s PDF unlocks Friday.",
    body: [
      "[Northstar’s $48k renewal] closes Friday, but [Dev] needs the quote today. I’ve put the 5pm PDF ahead of the general sales catch-up and linked it to Maya’s reply. One decision clears both threads.",
      "[Board prep] stays at 3pm; Thursday’s review slot is still only a proposal.",
    ],
    asks: [
      { text: "Approve $48k for 60 seats?", covers: ["quote"] },
      { text: "Move [Design review] to Thursday at 11?", covers: ["clash"] },
    ],
    work: [],
  },
  {
    tool: "microsoft-outlook",
    incoming:
      "Dev Rao: “Please use Northstar-renewal-v3.pdf. v2 still says $46,000 and doesn’t include the extra 20 seats.”",
    waldo: "Two grand hiding in a version number.",
    pill: "Dev: Use quote v3. v2 says $46k.",
    say: "Two grand in a version number.",
    body: [
      "I’ve compared [Quote v2] with [v3]: $46k became $48k when 20 seats were added. The new cap is 60. I’ve marked the old PDF out of the reply draft so Dev won’t get yesterday’s numbers.",
      "The math is checked. The commercial call is yours. Nothing has gone to [Maya] or [Dev].",
    ],
    asks: [
      { text: "Approve the $48k / 60-seat quote?", covers: ["quote"] },
      { text: "Move [Design review] to Thursday at 11?", covers: ["clash"] },
    ],
    work: [
      {
        id: "quote",
        label: "Quote v3: $48k for 60 seats (v2 was $46k); the price is not approved",
      },
    ],
  },
  {
    tool: "github",
    incoming:
      "Priya opened PR #184: “v1.8 onboarding empty state.” Checks 8/8 passed; design review requested.",
    waldo: "Green checks. Still needs eyes.",
    pill: "PR #184: Empty state. Checks passed.",
    say: "Green checks. Still needs eyes.",
    body: [
      "[PR #184] passes its checks, but the [Empty state] still needs design approval. I’ve put the preview beside Priya’s review request, not marked the release finished.",
      "Today’s order stays simple: [Northstar quote] before 5pm, then the release decision. The [3pm clash] is still open.",
    ],
    asks: [
      { text: "Approve Northstar’s $48k quote?", covers: ["quote"] },
      { text: "Move [Design review] to Thursday at 11?", covers: ["clash"] },
    ],
    work: [
      { id: "empty", label: "The empty state still needs design approval" },
      { id: "pr184", label: "PR #184: checks pass, design approval and review still open" },
    ],
  },
  {
    tool: "jira",
    incoming:
      "REL-42, v1.8 launch: Blocked. Priya: “Waiting for empty-state sign-off; target Thursday, 2pm.”",
    waldo: "More code won’t answer a design question.",
    pill: "v1.8: Design approval blocking launch.",
    say: "Not a code problem. A decision.",
    body: [
      "[v1.8] is blocked on the [Empty state], not a failing build. I’ve joined [REL-42] to [PR #184] and flagged the Thursday 2pm target. The proposed 11am review leaves three hours; it isn’t booked yet.",
      "The [Northstar quote] still goes first today.",
    ],
    asks: [
      { text: "Approve Northstar’s $48k quote?", covers: ["quote"] },
      { text: "Move [Design review] to Thursday at 11?", covers: ["clash"] },
    ],
    work: [
      {
        id: "empty",
        label: "Empty-state sign-off is what blocks v1.8 (REL-42); launch target is Thursday 2pm",
      },
    ],
  },
  {
    tool: "figma",
    incoming:
      "Priya on Onboarding / Empty state v6: “Try a sample workspace” or “Import your team’s data” for the primary button?",
    waldo: "“Try a sample workspace.” Let them see the thing.",
    pill: "Priya: Sample workspace or import?",
    say: "Sample first. Show the thing.",
    body: [
      "I’ve compared both [Empty state v6] buttons. I’d lead with [Try a sample workspace]: someone with no data can still get started. Import can stay secondary. Priya has the recommendation in a draft, not a surprise decision.",
      "That clears the design question for [v1.8] if you agree. [Northstar’s quote] is still waiting.",
    ],
    asks: [
      { text: "Approve the sample-workspace button?", covers: ["empty"] },
      { text: "Approve Northstar’s $48k quote?", covers: ["quote"] },
    ],
    work: [
      { id: "empty", label: "Approve the sample-workspace button on Empty state v6" },
    ],
  },
  {
    tool: "oura",
    incoming:
      "Sleep timing, last 7 nights: average bedtime 1:06am, 54 min later than your usual 12:12am.",
    waldo: "Not one bad night. A week of them.",
    pill: "Bedtime: 54 min later this week.",
    say: "A pattern, not just one night.",
    body: [
      "[Sleep timing] has drifted nearly an hour all week. I’ve put tonight’s wind-down back on the plan rather than trying to rescue tomorrow with another early start. No calendar changes.",
      "For work, I’ve kept the two decisions that actually unblock people together: [Northstar’s quote] and [Empty state v6].",
    ],
    asks: [
      { text: "Approve $48k for 60 seats?", covers: ["quote"] },
      { text: "Approve the sample-workspace button?", covers: ["empty"] },
    ],
    work: [],
  },
  {
    tool: "asana",
    incoming:
      "v1.8 launch: Leon’s demo recording and Priya’s release notes both depend on Empty state v6 approval.",
    waldo: "One button. Three people waiting.",
    pill: "Demo + notes await empty-state approval.",
    say: "One button. Three people waiting.",
    body: [
      "[Priya’s build], [Leon’s demo] and the release notes all depend on [Empty state v6]. I’ve grouped those dependencies behind one approval. No need to chase three progress updates for one missing answer.",
      "I’ve kept [Northstar’s quote] alongside it because Dev’s 5pm deadline is earlier than launch.",
    ],
    asks: [
      { text: "Approve Northstar’s $48k quote?", covers: ["quote"] },
      { text: "Approve the sample-workspace button?", covers: ["empty"] },
    ],
    work: [],
  },
  {
    tool: "calendly",
    incoming:
      "Northstar onboarding review with Maya Chen + Dev Rao. Thursday, 10-10:30am. Topic: SSO + 60-seat rollout.",
    waldo: "Tomorrow’s call starts with today’s loose ends.",
    pill: "Maya + Dev: Thursday, 10am. SSO review.",
    say: "I’ll gather the loose ends.",
    body: [
      "I’ve built the [Northstar call brief] for Thursday at 10: quote v3, the 60-seat rollout and the open [SSO] question. It’s one brief, not a scavenger hunt through Maya’s threads.",
      "The [Empty state] decision still holds up v1.8. Neither it nor the price is approved.",
    ],
    asks: [
      { text: "Approve Northstar’s $48k quote?", covers: ["quote"] },
      { text: "Approve the sample-workspace button?", covers: ["empty"] },
    ],
    work: [],
  },
  {
    tool: "openai",
    incoming:
      "Coding agent: “Proposed fix: reuse createSampleWorkspace() in PR #184. No new onboarding API needed.”",
    waldo: "Smaller fix. Let’s check the claim.",
    pill: "Fix proposed: reuse sample-workspace helper.",
    say: "Smaller fix. Still needs checking.",
    body: [
      "I’ve checked the [Sample workspace fix] against [Empty state v6]: it uses the existing helper instead of adding another API. That fits the proposed button. Code review is still open; I haven’t merged anything.",
      "[Northstar’s call brief] is ready for the quote decision. Two useful approvals, zero ceremonial status meetings.",
    ],
    asks: [
      { text: "Approve Northstar’s $48k quote?", covers: ["quote"] },
      { text: "Approve the button and review [PR #184]?", covers: ["empty", "pr184"] },
    ],
    work: [
      {
        id: "pr184",
        label: "Review PR #184: the fix reuses createSampleWorkspace(); nothing is merged",
      },
    ],
  },
  {
    tool: "claude",
    incoming:
      "Customer-update draft: “Hi Maya, SSO will be live for your Thursday onboarding review. Your 60-seat rollout is ready.”",
    waldo: "Nice sentence. Big promise.",
    pill: "Draft for Maya: SSO live Thursday.",
    say: "Nice sentence. Big promise.",
    body: [
      "The [Maya update] promises SSO tomorrow. I’ve held the draft and marked that line for a check; the [Call brief] lists SSO as open, not shipped.",
      "The quote can be reviewed separately. A confident sentence shouldn’t accidentally become your release plan.",
    ],
    asks: [
      { text: "Approve Northstar’s $48k quote?", covers: ["quote"] },
      {
        text: "Confirm the SSO commitment before Maya’s update goes out?",
        covers: ["sso", "update"],
      },
    ],
    work: [
      { id: "update", label: "Maya’s update is held: it promises SSO on Thursday" },
      { id: "sso", label: "Confirm the SSO commitment before the update goes out" },
    ],
  },
  {
    tool: "granola",
    incoming:
      "Friday’s Northstar call: “SSO next week” and “Send Maya a 10-minute onboarding walkthrough before Thursday’s review.”",
    waldo: "Found the promises. One needs a date.",
    pill: "Call notes: SSO next week + 10-min demo.",
    say: "Found the promises. Date next.",
    body: [
      "I’ve checked [Friday’s call] against the [Maya update]. You promised SSO “next week,” not Thursday, plus a 10-minute walkthrough before the call. I’ve removed the invented Thursday promise from the draft and added the walkthrough to the brief.",
      "[SSO] still needs a confirmed date. The $48k price still needs your approval.",
    ],
    asks: [
      { text: "Approve Northstar’s $48k quote?", covers: ["quote"] },
      { text: "Confirm the SSO date for Maya?", covers: ["sso", "update"] },
    ],
    work: [
      {
        id: "update",
        label: "Maya’s update: the invented Thursday promise is out, the walkthrough is in the brief",
      },
      { id: "sso", label: "Confirm the SSO date for Maya; you promised “next week”" },
      {
        id: "walkthrough",
        label: "Send Maya the 10-minute onboarding walkthrough before Thursday’s review",
      },
    ],
  },
  {
    tool: "whoop",
    incoming: "Recovery 32%. Thursday training plan: 8km tempo, 6:30am; coach target 4:45/km.",
    waldo: "Eight at tempo might be asking a lot.",
    pill: "Recovery: 32%. Tomorrow: 8km tempo.",
    say: "Five easy instead?",
    body: [
      "[32% recovery], short sleep and an [8km tempo] tomorrow. I’ve prepared a 5km easy alternative, with no pace target. The scheduled session is unchanged.",
      "[Northstar] is still the work priority: quote today, SSO date before tomorrow’s 10am call. The walkthrough is in the brief too.",
    ],
    asks: [
      { text: "Approve Northstar’s $48k quote?", covers: ["quote"] },
      { text: "Swap tomorrow’s tempo for 5km easy?", covers: ["tempo"] },
    ],
    work: [
      { id: "tempo", label: "Swap Thursday’s 8km tempo for a 5km easy run; the session is unchanged" },
    ],
  },
  {
    tool: "notion",
    incoming:
      "Northstar rollout plan: “SSO moved to Monday. Thursday onboarding review will use password login. Owner: Priya.”",
    waldo: "Thursday’s call needs the new plan, not the old promise.",
    pill: "Northstar: SSO moved to Monday.",
    say: "Maya needs the new plan.",
    body: [
      "[SSO] is now Monday in Priya’s plan. I’ve rewritten [Maya’s update] with the change, password login for Thursday and an apology for the delay. No “everything’s ready” fiction.",
      "The [Northstar quote] is still unapproved. I’ve kept the walkthrough beside the revised update for tomorrow’s call.",
    ],
    asks: [
      { text: "Approve Northstar’s $48k quote?", covers: ["quote"] },
      { text: "Review Maya’s update with the Monday SSO date?", covers: ["update", "sso"] },
    ],
    work: [
      {
        id: "sso",
        label: "SSO is Monday in Priya’s plan; Thursday’s call uses password login",
        watching: true,
      },
      {
        id: "update",
        label: "Maya’s update is rewritten: Monday SSO, password login on Thursday, an apology; unsent",
      },
    ],
  },
  {
    tool: "google-drive",
    incoming:
      "Northstar-renewal-v4.pdf uploaded by Leon. $48,000 / 60 seats; SSO delivery Monday; onboarding walkthrough Thursday.",
    waldo: "v4 finally agrees with the plan.",
    pill: "Quote v4: $48k, 60 seats, SSO Monday.",
    say: "Finally agrees with the plan.",
    body: [
      "I’ve compared [Quote v4] with the rollout plan: $48k, 60 seats, SSO Monday. I’ve replaced v3 in the prepared reply and checked [Maya’s update] against the same terms. Nobody gets the obsolete attachment.",
      "Your [5km easy] option is still ready. Nothing has been sent, signed or rescheduled.",
    ],
    asks: [
      { text: "Approve [Quote v4], $48k for 60 seats?", covers: ["quote"] },
      { text: "Review Maya’s Monday-SSO update?", covers: ["update"] },
    ],
    work: [
      {
        id: "quote",
        label: "Quote v4: $48k for 60 seats, SSO Monday; it replaces v3 and is not approved",
      },
      { id: "update", label: "Maya’s update is checked against the v4 terms; unsent" },
    ],
  },
  {
    tool: "apple-health",
    incoming: "Resting heart rate: 64 bpm this morning. Your 30-day average is 57 bpm.",
    waldo: "Seven above usual. Context first.",
    pill: "Resting HR: 64. Usual: 57 bpm.",
    say: "Context first. Not a diagnosis.",
    body: [
      "I’ve added [64 bpm] to the sleep and recovery picture, not treated it as a diagnosis. With [32% recovery], the 5km easy option still looks better than chasing tomorrow’s tempo pace.",
      "[Quote v4] and [Maya’s update] agree on Monday SSO. Both are ready for review, not sent.",
    ],
    asks: [
      { text: "Approve the quote and Maya’s update?", covers: ["quote", "update"] },
      { text: "Swap the tempo for [5km easy]?", covers: ["tempo"] },
    ],
    work: [],
  },
  {
    tool: "stripe",
    incoming: "Cedar Studio renewal: $399 payment failed, insufficient funds. Retry scheduled Thursday, 9am.",
    waldo: "There’s already a retry. No pile-on.",
    pill: "Cedar: $399 failed. Retry Thu, 9am.",
    say: "Retry’s set. No pile-on.",
    body: [
      "I’ve checked [Cedar’s $399 renewal]: a retry is already set for Thursday at 9am. I’ve kept a short follow-up draft ready if it fails again. No extra reminder now and no second charge started.",
      "[Northstar] remains ahead of it: the quote and Monday-SSO update need review today.",
    ],
    asks: [
      { text: "Approve the Northstar quote and update?", covers: ["quote", "update"] },
      { text: "Swap tomorrow’s tempo for [5km easy]?", covers: ["tempo"] },
    ],
    work: [
      {
        id: "cedar",
        label: "Cedar’s $399 retry is set for Thursday 9am; a follow-up is drafted, not sent",
        watching: true,
      },
    ],
  },
  {
    tool: "strava",
    incoming: "Yesterday: 12.4km Hill repeats, 1h 09m, 310m elevation. Effort rated 9/10.",
    waldo: "Ah. Yesterday explains a few things.",
    pill: "Yesterday: 12.4km hills. Effort 9/10.",
    say: "That explains a few things.",
    body: [
      "[12.4km of hills] gives today’s recovery signals context. I’ve compared the load with tomorrow’s [8km tempo]; my suggestion stays 5km easy, not a second hard session. Your training plan hasn’t changed behind your back.",
      "[Cedar’s retry] is covered. [Northstar’s quote and update] still need your review.",
    ],
    asks: [
      { text: "Swap tomorrow’s tempo for [5km easy]?", covers: ["tempo"] },
      { text: "Approve the Northstar quote and update?", covers: ["quote", "update"] },
    ],
    work: [],
  },
  {
    tool: "google-calendar",
    incoming: "Thursday morning: 8:30-9:30am free. Northstar onboarding review starts at 10am.",
    waldo: "An empty hour. Let’s resist improving it to death.",
    pill: "Thursday: 8:30-9:30 free. Maya at 10.",
    say: "No need to fill every gap.",
    body: [
      "I’ve left [8:30-9:30am] out of the prep plan. After yesterday’s hills, that hour can be breakfast and breathing room. The [Northstar brief] is already assembled; it doesn’t need a new meeting to explain it.",
      "The quote, update and easy-run choice are still open. [Design review] hasn’t moved.",
    ],
    asks: [
      { text: "Approve the Northstar quote and update?", covers: ["quote", "update"] },
      { text: "Swap tomorrow’s tempo for [5km easy]?", covers: ["tempo"] },
    ],
    work: [],
  },
  {
    tool: "gmail",
    incoming:
      "Soundroom order SR-2081: “Bose QC Ultra arriving Thursday. Please confirm: Flat 204, 18 Church Street, Bengaluru.”",
    waldo: "204 isn’t 402. That’s worth catching.",
    pill: "Soundroom: Confirm Flat 204 for delivery.",
    say: "Your order says 402. Caught it.",
    body: [
      "[Soundroom] has Flat 204; your order confirmation says [Flat 402]. I’ve drafted the correction with the full address. No reply sent. Headphones are more useful in your flat than somebody else’s.",
      "[Northstar’s quote and update] still need review before the client deadline. The 8:30 gap stays out of the prep plan.",
    ],
    asks: [
      { text: "Confirm [Flat 402] and approve the address reply?", covers: ["soundroom"] },
      { text: "Approve the Northstar quote and update?", covers: ["quote", "update"] },
    ],
    work: [
      {
        id: "soundroom",
        label: "Confirm Flat 402 and send the Soundroom address correction; the reply is drafted",
      },
    ],
  },
  {
    tool: "shopify",
    incoming: "Northstar kit orders #1041, #1042, #1043: courier pickup delayed. ETA moved Thursday to Friday.",
    waldo: "One courier delay. Not three separate emergencies.",
    pill: "Northstar: 3 kits delayed to Friday.",
    say: "One delay. Not three fires.",
    body: [
      "I’ve grouped [Northstar’s three kits] under the same delay and added Friday delivery to [Maya’s update]. Thursday’s walkthrough can use the demo kit instead. I’ve checked that the brief no longer assumes the shipments arrive first.",
      "[Quote v4] still covers the same $48k / 60 seats. The separate [Soundroom address] correction remains unsent.",
    ],
    asks: [
      {
        text: "Review Northstar’s quote and updated delivery note?",
        covers: ["quote", "update", "kits"],
      },
      { text: "Confirm Flat 402 for Soundroom?", covers: ["soundroom"] },
    ],
    work: [
      {
        id: "kits",
        label: "Northstar’s three kits share one courier delay, now Friday; the demo kit covers Thursday",
        watching: true,
      },
      { id: "update", label: "Maya’s update: Monday SSO and Friday kit delivery; unsent" },
    ],
  },
  {
    tool: "spotify",
    incoming:
      "Your saved playlist After Hours is ready: 42 tracks, 2h 18m. Starts with Khruangbin - Friday Morning.",
    waldo: "One thing tonight doesn’t need a decision.",
    pill: "After Hours: 42 tracks, ready.",
    say: "No decision needed for this one.",
    body: [
      "[After Hours] is ready when you are. I’ve kept tonight’s plan simple: wind down, no new recovery checklist. Tomorrow’s [5km easy] suggestion is still yours to accept.",
      "For work, [Maya’s draft] now covers Monday SSO and Friday kit delivery. No separate contradictory update hiding in another app.",
    ],
    asks: [
      { text: "Review Northstar’s quote and update?", covers: ["quote", "update"] },
      { text: "Confirm Flat 402 for Soundroom?", covers: ["soundroom"] },
    ],
    work: [],
  },
  {
    tool: "linear",
    incoming:
      "ONB-73 blank sample workspace + ONB-74 stuck loading: both blocked by createSampleWorkspace() returning no workspace ID.",
    waldo: "Same missing ID. Two tickets wearing different hats.",
    pill: "ONB-73 + 74: Same missing workspace ID.",
    say: "Two tickets. One missing ID.",
    body: [
      "I’ve matched [ONB-73] and [ONB-74] to the same missing workspace ID. That changes the [PR #184] review: the proposed helper reuse still needs that return value fixed. The button choice alone won’t unblock v1.8.",
      "[Northstar’s quote and update] are ready to review. Maya’s draft includes Monday SSO and Friday kit delivery; nothing sent.",
    ],
    asks: [
      { text: "Approve Northstar’s $48k quote and update?", covers: ["quote", "update"] },
      {
        text: "Approve the sample button, then review the ID fix in [PR #184]?",
        covers: ["empty", "pr184"],
      },
    ],
    work: [
      {
        id: "pr184",
        label: "PR #184: createSampleWorkspace() returns no workspace ID (ONB-73, ONB-74); the review stays open",
      },
    ],
  },
];

/** The text cut into plain runs and [bracketed] chips. */
export function segments(text: string): { text: string; chip: boolean }[] {
  return text
    .split(/(\[[^\]]+\])/)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("[") && part.endsWith("]")
        ? { text: part.slice(1, -1), chip: true }
        : { text: part, chip: false },
    );
}

/*
  The connector a chip belongs to: the app the thing lives in. A chip is shown as a pill with that
  app's mark in front of it; a [bracketed] subject with no connector in this table is set as plain
  words, not a pill. Calendar items are in Google Calendar, a person is where they write to him,
  quotes and documents are in Drive, a deal is in HubSpot, a build in GitHub, a design in Figma, a
  ticket in Jira or Linear, training in Strava, and so on.
*/
const CHIP_TOOLS: Record<string, ToolId> = {
  "5h 12m sleep": "garmin",
  "Board prep": "google-calendar",
  "Design review": "google-calendar",
  "3pm clash": "google-calendar",
  "8:30-9:30am": "google-calendar",
  "Rohan’s train": "whatsapp",
  Maya: "gmail",
  "Flat 402": "gmail",
  Soundroom: "gmail",
  "Soundroom address": "gmail",
  Leon: "slack",
  Dev: "microsoft-outlook",
  "Northstar quote": "hubspot",
  "Northstar’s quote": "hubspot",
  "Northstar’s $48k renewal": "hubspot",
  Northstar: "hubspot",
  "Quote v2": "google-drive",
  v3: "google-drive",
  "Quote v4": "google-drive",
  "PR #184": "github",
  "Empty state": "figma",
  "Empty state v6": "figma",
  "Try a sample workspace": "figma",
  "v1.8": "jira",
  "REL-42": "jira",
  "ONB-73": "linear",
  "ONB-74": "linear",
  "Sleep timing": "oura",
  "Priya’s build": "asana",
  "Leon’s demo": "asana",
  "Northstar call brief": "calendly",
  "Northstar’s call brief": "calendly",
  "Call brief": "calendly",
  "Northstar brief": "calendly",
  "Sample workspace fix": "openai",
  "Maya update": "claude",
  "Maya’s update": "claude",
  "Maya’s draft": "claude",
  "Friday’s call": "granola",
  "32% recovery": "whoop",
  "8km tempo": "strava",
  "5km easy": "strava",
  "12.4km of hills": "strava",
  "64 bpm": "apple-health",
  "Cedar’s $399 renewal": "stripe",
  "Cedar’s retry": "stripe",
  "Northstar’s three kits": "shopify",
  "After Hours": "spotify",
};

/** The connector for a chip's words, or undefined when it has none (so it is not a pill). */
export const chipTool = (text: string): ToolId | undefined => CHIP_TOOLS[text];

/** "One thing still needs you." or "Two things still need you." */
export const leadFor = (asks: number) =>
  asks === 1 ? "One thing still needs you." : "Two things still need you.";

/**
  The ledger once the first `count` signals have landed: every item any of them raised, with its
  latest wording, in the order it first appeared. Nothing is removed, because the card only shows the
  two decisions that matter most right now and work does not vanish by leaving the bullets.
*/
export function openWork(count: number): Work[] {
  const ledger = new Map<WorkId, Work>();
  for (const state of HERO_STATES.slice(0, Math.max(0, count))) {
    for (const item of state.work) ledger.set(item.id, item);
  }
  return [...ledger.values()];
}

/** The decisions still open after `count` signals that the card's two bullets are not showing. */
export function heldWork(count: number): Work[] {
  if (count < 1) return [];
  const shown = new Set(HERO_STATES[count - 1].asks.flatMap((ask) => ask.covers));
  return openWork(count).filter((item) => !item.watching && !shown.has(item.id));
}

// ── The row of tools ─────────────────────────────────────────────────────────────────────────────
// The row drifts right and each signal is sent by its own icon as it passes the low zone, so the row
// has to be laid out to match the stream. One icon passes every ~2s, and a signal now takes ~5.8s
// from its pill appearing to its reply having cleared (the next signal waits for that, so an
// incoming pill never meets the previous reply). So signals sit three places apart: two icons
// pass silent between one signal and the next. Stepping three at a time only visits every place
// if the number of places is not a multiple of three, and 27 signals are, so the row has one more
// place than there are signals: a silent icon (`FILLER`) that passes between the last signal and the
// first, which is also the short rest before the loop begins again. Calendar and Gmail speak twice,
// so each has two places in the row.

export const HERO_STRIDE = 3;

/**
  The one icon in the row that never speaks: it fills the place the walk would otherwise skip. It is
  OpenAI's second place, half a row from its first, so the two never show side by side.
*/
export const FILLER: ToolId = "openai";

/** How many places the row has: one per signal, and the filler. */
export const HERO_PLACES = HERO_STATES.length + 1;

/** The place on the row, counted in the order it passes the low zone, where signal `i` speaks from. */
export const slotOf = (i: number) => (i * HERO_STRIDE) % HERO_PLACES;

/** The row in the order it passes the low zone: the tool at each place. */
export const HERO_ROW: ToolId[] = (() => {
  const row = new Array<ToolId>(HERO_PLACES).fill(FILLER);
  HERO_STATES.forEach((state, i) => {
    row[slotOf(i)] = state.tool;
  });
  return row;
})();
