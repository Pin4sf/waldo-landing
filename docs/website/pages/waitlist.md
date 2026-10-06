# Let Waldo in (Waitlist) — Copy Structure

Status: **Built. The live copy is at the top (2026-09-28).**

Layout (2026-10-05): **amped up**, after two references from Suyash: Soonix (a Framer waitlist template) for the page, and locky.so for the notifications, then made flat and minimal the same day. See "Layout (2026-10-05)" just below. New words: the title "Waldo handles it. / Get in line early.", Waldo's notifications and the questions section.

Last updated: 2026-10-05
URL: `/waitlist`
Live source: `app/waitlist/page.tsx`, `components/site/waitlist-hero.tsx`, `components/site/waitlist-panel.tsx`, `components/site/waldo-pings.tsx`, `components/site/waitlist.css`, `actions/submit-email.ts`
Reviewed: the live page at desktop width, plus the code

---

## Layout (2026-10-05)

Suyash: "we need to amp up the waitlist page" (with a Soonix screenshot), then "https://www.locky.so — need you to implement these sort of notifications as well."

**Revised the same day** after Suyash: "the gradients don't fall in our design language, yeet all of them. I need this to be minimal UI. For Waldo's pfp, keep the Waldo illustration. Remove the Waldo illustration above the title. The line is short, but we shouldn't lead with that. Any other BS, move it below the phone visual." Then: "the drop shadows as well, not our thing."

Flat and minimal: white and hairlines on the warm page. **No gradients, no drop shadows, no blur.**

**First screen, top to bottom** (nothing else):

1. **Waldo's notifications** (from Locky). Phone-style notifications drop in at the top, under the menu. The newest sits in front; the two before it tuck in behind, smaller. Each line types itself in. Hover the pile and it fans out; a small × dismisses one. Tapping one takes you to the email box. On phones they sit at the top of the page and scroll away with it; on wider screens they stay put while the form is on screen. **Waldo's picture** on each is the same Waldo illustration the app's own notifications use (`waldo-card.svg`). It is the only place the illustration appears on this page.
2. **The title, on its own.** No picture above it, no label, no line under it: the title carries the whole message (Suyash: "this should be consolidated into the title itself, so make sure it has the bang for the buck").
   ### Waldo handles it. / Get in line early.
   *Why it works:* the first line is the promise (the homepage's own "Waldo handles it"), the second is the action and the reason to act now ("line" says waitlist; "early" is true, since people who join earlier get in earlier). The old line under it ("Waldo is letting people in a few at a time. Leave your email, and you'll hear the moment it's your turn.") is gone from the page; "One email when you're in" in the small print covers the rest.
   From Kennel: **Get the Mac app / the day it ships.** (the old "Kennel is in open beta on GitHub today..." line is gone too; the beta link is below the phone.)
   Only a problem with the email gets a line under the title (the error words, unchanged).
3. **The form as one pill** (from Soonix): the email box and "Let Waldo in →" inside one white pill with a hairline. On phones the button sits under the box, inside the same pill.
4. **Small print**, one short line under the form (the Terms and Privacy agreement). It stays here because it has to sit with the button.
5. **The app rising out of a box**: the homepage's Overview phone (the daily brief) in the same flat box as "Your context. Your call.", cropped by the box's edge. It opens on the brief for the visitor's part of the day and moves through the day while it's on screen. Screen readers hear that the names and numbers in it are samples.

**Below the phone:**

6. *(Deleted by Suyash, 2026-10-05: the "The line is short. / For now." section with its three cards and the "About time." aside. The words are kept in "Live copy" below in case they come back. From Kennel, only "Can't wait? Try the beta now →" remains here.)*
7. **Before you get in.** A short questions section, centred (below).
8. The footer, as on every page.

What we did **not** copy from Soonix: the "Join +1,000 others" faces, the countdown clock, the sky and the glow behind it. No real faces, numbers or launch date to show, and nothing on the page is made up.

## Waldo's notifications (2026-10-05)

Every line is true: it only uses what the page itself can see (the visitor's clock, the email box, them leaving the tab and coming back). He never claims to have read anything of theirs. Lowercase, no exclamation marks. A handful of lines, then he goes quiet: Waldo doesn't nag. Edit the words here, then carry them into `components/site/waldo-pings.tsx`.

Every notification reads **Waldo** · *now* (it becomes "1m ago" and so on as time passes).

**On their own, one at a time** (the first after about 1.5 seconds, then 6 to 12 seconds apart, only while the form is on screen and the tab is open):

| # | Everyone | From Kennel (`?utm_source=kennel`) |
|---|---|---|
| 1 | *By their clock:* 5–11am "morning. good time to get in line." · 11am–5pm "afternoon. this takes ten seconds." · 5–9pm "evening. one small thing before bed." · 9pm–5am "it's 11:42pm. join first, then sleep." (their actual time) | that was kennel. i'm the rest of it. |
| 2 | the box wants one email. the real one. *(skipped once they've clicked into the box)* | your email gets you the mac app first. *(same)* |
| 3 | that's all i need. no password. no card. | no password. no card. one email. |
| 4 | no rush. waiting is most of my job. | no rush. waiting is most of my job. |
| 5 | your watch has been waiting too. | |

**When something happens** (each once per visit):

| When | Line |
|---|---|
| They click into the email box | that one. i'll write when it matters. |
| They leave the tab for a few seconds and come back | you left. i noticed. it's my thing. |
| They join | got you. you're on the list. *then* go on. i'll write when it's your turn. *(9pm–5am: "now sleep. i'll write when it's time.")* After this he says nothing more. |

## Before you get in (2026-10-05)

### Before you / get in.

- **When do I get access to Waldo?** We're letting people in a few at a time. Joining the list is the way in, and people who joined earlier get in earlier. *(Support)*
- **What can I use today?** Kennel for Mac is in open beta now. iPhone and messaging come next, and people on the list get in first. *(Home)*
- **How much will Waldo cost?** Free while it's in beta. We'll tell you well before anything changes, and nothing will be charged without you choosing a plan. *(Support)*
- **Which watches work?** Apple Watch works best. Oura, WHOOP, Garmin and Fitbit are coming. The full list is on the Connectors page. *(Support)*
- **Is there an Android app?** iPhone comes first. Android follows. Join the list to hear when. *(Support)*
- **I joined the waitlist but didn't get an email.** Check spam and promotions first. Still nothing? Write to us from the same address, and we'll sort it out. *(Support)*
- **How do I leave the waitlist?** Every email we send has an unsubscribe link. Or write to us, and we'll remove you. *(Support)*

[More questions →](/support)

⚠️ Home says "Apple Watch, Oura, WHOOP, Garmin and Fitbit all work"; Support says the others "are coming". This page uses Support's, the more careful one. One of the two needs correcting.

## Live copy (2026-09-28)

> **Where this disagrees with "Layout (2026-10-05)" above, the layout section wins.** The title, the mascot pictures, the "Let Waldo in" label and where the list and "About time." sit have all changed. The error and success words below are unchanged.

This is the copy on the built page right now, top to bottom. **Edit the words here**, then carry them into `components/site/waitlist-panel.tsx`.

How to read it (the three text levels are in [../type.md](../type.md)):
- `Label:` is the small grey word above a title.
- `###` lines are **titles**, and `/` marks where the line breaks.
- `Body:` is the regular text. There are no subtitles any more (2026-09-28): what used to be the subtitle and the line after it are now one paragraph.
- In lists, `(…)` is a small label, and *italics* or **bold** mark emphasis (dark, medium weight).
- `Picture:` lines describe the picture (and name its file, once there is one). They're notes, not copy.

#### Everyone (`/waitlist`)

_Picture above the label: Waldo, content (`/assets/home/mascots/good-week-dark-mode.svg`). When something goes wrong: Waldo, alert (`/assets/home/mascots/watching-dark-mode.svg`). After joining: Waldo, pleased (`/illustrations/success.svg`)._

Label: Let Waldo in

### The line is short. / For now.
Body: Waldo is letting people in a few at a time. Leave your email, and you'll hear the moment it's your turn.

- First access to Waldo for iPhone
- The Kennel for Mac app when it ships (it's in open beta now)
- A note when something ships. Nothing else.

Form: fields "enter your email — the one you actually check"; button "Let Waldo in →"

Body: About time.

Small print: One email when you're in, and the odd update. Unsubscribe anytime. By joining, you agree to our [Terms](/terms) and [Privacy Policy](/privacy).

#### From Kennel (`/waitlist?utm_source=kennel`)

Label: Let Waldo in

### Get the Mac app / first.
Body: Kennel is in open beta on GitHub today. Join the list, and you'll get the packaged Mac app the day it ships.

Form: fields "enter your email — the one you actually check"; button "Let Waldo in →"

Body: About time.

Small print: Can't wait? [Try the beta now →](https://github.com/waldoco/Waldo-Kennel)

Small print: One email when you're in, and the odd update. Unsubscribe anytime. By joining, you agree to our [Terms](/terms) and [Privacy Policy](/privacy).

#### When something goes wrong

The title and text change, the form keeps what was typed, the button reads "Try again", and the form gives a small nudge.

| Case | Title | Text |
|---|---|---|
| Typo | That email / looks off. | Check for a typo and try again. We'll wait. |
| Throwaway address | We need an inbox / you'll check. | Throwaway addresses can't get the invite. Your real one's safe with us. |
| Our side | That one's / on us. | It didn't go through on our end. Give it a minute and try again. |

#### After joining

### Already on it.
Body: You're on the list. We'll write to **[their email]** when it's your turn. Check your inbox for a note from us, and your promotions tab, just in case.

Label: While you wait
- [See how Waldo works →](/how-it-works)
- [Try Kennel for Mac, in open beta →](/kennel)
- [Read the blog →](/blogs)

> **Everything below this point is the earlier draft and the reasoning behind it, kept as a record.** Where it disagrees with the live copy above, the live copy wins.

---

## The page's job

Every "Let Waldo in →" on the site lands here. The visitor has already decided. This page's only jobs are:

1. **Take the email with zero friction.**
2. **Tell them what they just signed up for,** and what happens next.
3. **Use the moment:** one optional question that helps decide who to let in first, and somewhere to go while they wait.

## Verdict

The bones are good. One focused card, the mascot, a witty button ("About time."), a clever placeholder ("the one you actually check") and a sweet time-of-day scene after signing up. It already filters fake emails (a typo check, throwaway domains, and a check that the domain can receive mail).

What's missing is **clarity and honesty**. The page never says what you get or when, the error message blames you even when the fault is ours, and the time-of-day scene pretends Waldo has already read your data.

---

## MUST FIX

| # | Problem | Fix |
|---|---|---|
| 1 | **It never says what you're signing up for,** or what happens next | Add "what you get" and a small-print line (see the page copy) |
| 2 | **One error message for everything.** If our email service is down, people are told "That email doesn't exist." | Three separate messages: typo, throwaway address, our fault (see Error states) |
| 3 | **The error copy blames the user:** "typos are somehow still on you" | Friendlier wording (see Error states) |
| 4 | **The success scene makes up the visitor's data:** "already scanned your night," "hrv looking steady," "cortisol is peaking," "already adjusting tomorrow's schedule." Waldo has read nothing. | Rewrite every line so it's playful but true (see Time-of-day scene) |
| 5 | **The story is the old health-first one:** "ChatGPT knows your tasks… neither knows you slept three hours." | New copy that matches Home |
| 6 | **No agreement line.** Terms and Privacy aren't mentioned. | Small print under the button (see page copy) |
| 7 | **The floating "Get early access" button shows on this page** and links to the page you're already on | Hide it on `/waitlist` |
| 8 | Menu has dead links (Pricing, Support) | The shared site menu |

---

## THE PAGE

Keep it **one calm card in the middle of the screen**. No sections, no scrolling, nothing to distract.

### Default state

**Mascot:** the current Dalmatian, awake.

**Headline**
```
The line is short.
For now.
```

**Body line:** Waldo is letting people in a few at a time. Leave your email, and you'll hear the moment it's your turn.

**What you get** (three short lines with small ticks):
- First access to Waldo for iPhone
- The Kennel for Mac app when it ships (it's in open beta now)
- A note when something ships. Nothing else.

**Email field placeholder:** enter your email — the one you actually check *(keep)*

**Button:** **Let Waldo in →** *(currently "About time.")*

**Aside (under the button):** *about time.* *(the old button line becomes the aside, so the joke stays)*

**Small print:** One email when you're in, and the odd update. Unsubscribe anytime. By joining, you agree to our [Terms](/terms) and [Privacy Policy](/privacy).

---

### Coming from Kennel · NEW

When someone arrives from the Kennel page (`?utm_source=kennel`), the card speaks to them directly. Same form, different words:

**Headline**
```
Get the Mac app
first.
```

**Body line:** Kennel is in open beta on GitHub today. Join the list, and you'll get the packaged Mac app the day it ships.

**Small link:** Can't wait? Try the beta now → GitHub

Everything else is the same.

---

### Error states · three, not one

**Typo, or an address that can't receive mail**
- **Headline:** That email looks off.
- **Body:** Check for a typo and try again. We'll wait.
- **Button:** Try again

**Throwaway address** (e.g. a 10-minute inbox)
- **Headline:** We need an inbox you'll check.
- **Body:** Throwaway addresses can't get the invite. Your real one's safe with us.
- **Button:** Try again

**Our fault** (the email service didn't answer)
- **Headline:** That one's on us.
- **Body:** It didn't go through on our end. Give it a minute and try again.
- **Button:** Try again

**Build note:** `actions/submit-email.ts` currently returns `invalid_email` for typos, throwaway domains and missing mail servers alike, and the page treats server errors the same way. It needs three codes, `invalid_email`, `disposable_email` and `server_error`, and the page needs to show the matching message.

---

### Success state

**Headline:** Already on it. *(keep, it's perfect)*

**Body line:** You're on the list. We'll write to **{their email}** when it's your turn.
*(Showing the address lets people catch a typo.)*

**Small line:** Check your inbox for a note from us, and your promotions tab, just in case.

**One optional question · NEW**

> **While you're here: what do you do?**
> Founder · Engineer · Investor · Designer · Student · Something else
> *(tap one, or skip)*

After tapping: *Thanks. That helps us let the right people in first.*

**Why:** Waldo's rollout goes profession by profession (founders and engineers first). Knowing who's waiting tells you who to let in. It's one tap, and it's optional.

**Build note:** It updates the same Loops contact with a `profession` field. That field must also be listed on the Privacy page (A3).

**While you wait** (three quiet links):
- See how Waldo works → `/how-it-works`
- Try Kennel for Mac, in open beta → `/kennel`
- Read the blog → `/blogs`

**Then:** the time-of-day button (below), and "← Back to home."

---

### Time-of-day scene (after signing up)

Keep the idea: after signing up, a button opens a full-screen scene matching the visitor's time of day, with the mascot and a little line. It's delightful.

**Rewrite every line so it doesn't claim to know their data.** The joke is now "I can't see it yet, so let me in," which is true and still sells.

| Time | Button | Label | Headline | Closer | Mascot lines (one picked at random) |
|---|---|---|---|---|---|
| **Morning** (5–11) | go make the most of your morning | waldo's awake. | your window's open. | soon i'll tell you exactly how open. | "can't see your night yet. soon." · "coffee first. then let me in." · "go. i'll be ready when you are." |
| **Afternoon** (11–5) | go. deep work window is open | waldo's waiting. | peak window. | once i'm in, i'll guard it for you. | "focus window: open." · "tabs closed?" · "block the noise. i'll learn the rest." |
| **Evening** (5–9) | start winding down | waldo noticed the time. | wind it down. | tonight shapes tomorrow. soon i'll show you how much. | "tomorrow starts tonight." · "sleep debt compounds. just saying." · "rest. i'll be here." |
| **Night** (9–5) | now is the time you get some sleep | waldo's got the watch. | sleep well. | we'll be here in the morning. | "don't wake me. i'm working." · "still here. always." · "the patrol never sleeps. even when waldo does." |

**Removed:** "already scanned your night," "hrv looking steady," "cortisol is peaking," "already adjusting tomorrow's schedule," "hrv looking better already," "ssh. your sleep debt is recovering." Each one claims Waldo read data it hasn't read, and "cortisol is peaking" is a health claim about a stranger.

---

## THE CONFIRMATION EMAIL · NEW

Signing up already sends a `waitlist_signup` event to Loops. ⚠️ **Confirm whether a welcome email is set up in Loops.** If not, set this one to send on that event.

**From:** Suyash at Waldo *(a real person, not "The Waldo Team")*
**Subject:** You're on the list.
**Preview text:** Waldo's letting people in a few at a time.

**Body:**

> You're in line.
>
> Here's what happens next:
>
> **1.** We're letting people in a few at a time, earliest first.
> **2.** When it's your turn, you'll get one email with your invite.
> **3.** Until then, we'll only write when something ships.
>
> Want something now? **Kennel for Mac** is in open beta: it runs your coding agents to the finish, with proof. → heywaldo.in/kennel
>
> Reply to this email any time. It reaches a real person.
>
> — Suyash
> *already on it.*

**Kennel version** (for `utm_source=kennel`): swap the middle paragraph for:
> The packaged Mac app lands in your inbox the day it ships. Until then, the beta's on GitHub → github.com/waldoco/Waldo-Kennel

**Rules:** no exclamation marks, no "Welcome to the Waldo family," and "reply to this" only if that inbox is actually read.

**Later:** the invite email ("It's your turn") gets written when invites start.

---

## SUBTLE FIXES

| # | What | Fix |
|---|---|---|
| 1 | The placeholder uses "–" normally and "—" in the error state | Use "—" in both |
| 2 | Someone already on the list gets the normal success screen | Fine as it is (it keeps the list private). Optionally: "You're already on the list. We haven't forgotten you." |
| 3 | The cookie notice covers the bottom of the card on small screens | The new slim notice (see pages/privacy.md A3) |
| 4 | Search title "Let Waldo in \| Waldo" | Keep. Description: "Join the Waldo waitlist. First access to Waldo for iPhone and the Kennel Mac app." |
| 5 | The success state only offers "Back to home" | Replaced by the three "while you wait" links |

---

## Build notes (for when this gets built)

- Three error codes in `actions/submit-email.ts`, each with its own message
- Show the submitted email on the success screen
- A Kennel variant when `utm_source=kennel`
- The optional profession question, as a new small action that updates the Loops contact (`profession`)
- Rewrite the `TIME_CONFIG` lines in `components/waitlist-page.tsx`
- Hide `floating-contact-button` on `/waitlist`
- The shared menu and footer
- Add `profession` to the Privacy page's list of what's collected

---

## Open questions for Suyash

1. **Welcome email:** is one set up in Loops today? Who should it come from?
2. **Reply-to:** is there an inbox someone reads? (Same as the Support question.)
3. **What you get:** is "first access to Waldo for iPhone + the Kennel Mac app" the right promise?
4. **Profession question:** OK to add? Any options to change?
5. **Button:** "Let Waldo in →" (consistent with the site), or keep "About time." as the button?
6. **Watches (2026-10-05):** do Oura, WHOOP, Garmin and Fitbit work today (Home) or are they coming (Support)?
7. **Notifications (2026-10-05):** happy with Waldo's lines, and with how many there are?
