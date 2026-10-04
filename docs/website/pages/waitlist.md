# Let Waldo in (Waitlist) — Copy Structure

Status: **Built. The live copy is at the top (2026-09-28).**

Layout (2026-10-04): made like the homepage (centred, endless carousels, the Stage box, white cards, one close). Words unchanged. See [../site-wide-pass.md](../site-wide-pass.md).

Last updated: 2026-09-28
URL: `/waitlist`
Live source: `app/waitlist/page.tsx`, `components/site/waitlist-panel.tsx`, `actions/submit-email.ts`
Reviewed: the live page at desktop width, plus the code

---

## Live copy (2026-09-28)

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
