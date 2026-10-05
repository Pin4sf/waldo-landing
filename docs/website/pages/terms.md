# Terms — Copy Structure

Status: **Built (plain summaries). The live copy is at the top (2026-09-28). The legal text still needs a lawyer.**

Layout (2026-10-04): made like the homepage (centred, endless carousels, the Stage box, white cards, one close). Words unchanged. See [../site-wide-pass.md](../site-wide-pass.md).

Last updated: 2026-09-28
URL: `/terms`

> ⚠️ **This is not legal advice.** The summary below says what the Terms should cover, in Waldo's plain voice. **The binding legal text must be written by a lawyer.** An agent that acts on someone's calendar and reads health data needs careful wording around responsibility and liability.

---

## Live copy (2026-09-28)

This is the copy on the built page right now, top to bottom. **Edit the words here**, then carry them into `app/terms/page.tsx`.

How to read it (the three text levels are in [../type.md](../type.md)):
- `Label:` is the small grey word above a title.
- `###` lines are **titles**, and `/` marks where the line breaks.
- `Body:` is the regular text. There are no subtitles any more (2026-09-28): what used to be the subtitle and the line after it are now one paragraph.
- In lists, `(…)` is a small label, and *italics* or **bold** mark emphasis (dark, medium weight).
- `Picture:` lines describe the picture (and name its file, once there is one). They're notes, not copy.

### The terms. / Readable ones.
Body: Each section starts with the plain version. The legal version follows, and it's the one that counts. We tried to make this the least boring legal page you'll read today.

Draft. The plain summaries are here. The legal text is being written and reviewed.

---

### The short / version.

- **Waldo is in beta.** It works, but it's still being finished. Things may change or break.
- **Waldo isn't a doctor.** It uses health signals to plan your day. It doesn't diagnose or treat anything.
- **You're in charge of what Waldo can do.** You choose what it connects to and how much it does on its own, and you can undo what it does.
- **Your data is yours.** How we handle it is on the Privacy page.
- **Be decent.** Don't misuse Waldo, other people's data, or our systems.
- **Kennel is open source** under its own licence (Apache-2.0).

---

### Section by / section.

| Section | In plain words |
|---|---|
| 1. Who we are and what this covers | These terms are between you and Waldo's company. They cover the website, the waitlist and the Waldo app. |
| 2. Who can use Waldo | You need to be 18 or over. |
| 3. Beta | Waldo is in beta. Features may change, pause or disappear, and it may not always work. |
| 4. Not medical advice | Waldo uses health signals as context for planning your day. It isn't a medical device, it doesn't diagnose or treat anything, and it's no replacement for a doctor. If you're worried about your health, talk to one. |
| 5. What Waldo does for you | Waldo can take actions for you, like moving meetings, blocking time or updating tools, but only the kinds you've allowed, and you can undo them. You're still responsible for your calendar, your commitments and anything sent in your name. |
| 6. Connected tools | When you connect a tool (Google, Slack, a watch), you're also using that company's service, under their terms. You can disconnect any time. |
| 7. Your data | You own your data. You let us use it only to run Waldo for you, as the Privacy page describes. |
| 8. Using Waldo fairly | Don't break the law with Waldo, don't try to break Waldo, and don't connect accounts or data that aren't yours to connect. |
| 9. Price | Waldo is free during beta. If that changes, we'll tell you first, and you won't be charged unless you choose a plan. |
| 10. Kennel for Mac | Kennel is open source under the Apache-2.0 licence. That licence covers the Kennel code. Your agents run through your own accounts, under those companies' terms. |
| 11. Our stuff | The Waldo name, the Dalmatian, the design and the writing belong to us. Please don't copy them. |
| 12. Ending things | You can leave any time by deleting your account. We may suspend accounts that break these terms, and we'll tell you why when we can. |
| 13. Limits on our responsibility | We work hard to get things right, but we can't promise Waldo will be perfect, and there are limits to what we're responsible for. |
| 14. Changes to these terms | If we change these terms in a way that matters, we'll tell you before it takes effect. |

> **For Suyash to write:** **Legal text, section by section,** written by a lawyer, plus the governing law and a contact for questions about these terms.

> **Everything below this point is the earlier draft and the reasoning behind it, kept as a record.** Where it disagrees with the live copy above, the live copy wins.

---

## The page's job

1. Set the rules for using Waldo, the website and the waitlist.
2. **Be readable.** A plain summary sits above each legal section, so people know what they're agreeing to.
3. **Match Privacy, Support and the product.** No clause should promise or deny something the product does differently.

## Page layout

```
Header → The short version → Legal sections (each with a one-line plain summary on top) → Footer
```

---

## Header

**Headline**
```
The terms.
Readable ones.
```

**Body line:** Each section starts with the plain version. The legal version follows, and it's the one that counts.

**Last updated:** {date}

**Aside:** *we tried to make this the least boring legal page you'll read today.*

---

## The short version

- **Waldo is in beta.** It works, but it's still being finished. Things may change or break.
- **Waldo isn't a doctor.** It uses health signals to plan your day. It doesn't diagnose or treat anything.
- **You're in charge of what Waldo can do.** You choose what it connects to and how much it does on its own, and you can undo what it does.
- **Your data is yours.** How we handle it is on the Privacy page.
- **Be decent.** Don't misuse Waldo, other people's data, or our systems.
- **Kennel is open source** under its own licence (Apache-2.0).

---

## Legal sections — outline with plain summaries

Each section below shows: **plain summary** (goes on the page, above the legal text) → *what the lawyer needs to cover*.

### 1. Who we are and what this covers
**Plain:** These terms are between you and {LEGAL_ENTITY}. They cover the website, the waitlist and the Waldo app.
*Cover: legal entity, address, what counts as "the Service," how you agree (by using it).*

### 2. Who can use Waldo
**Plain:** You need to be 18 or over. ⚠️ *confirm*
*Cover: age, capacity, one account per person, accurate information.*

### 3. Beta
**Plain:** Waldo is in beta. Features may change, pause or disappear, and it may not always work.
*Cover: "as is" during beta, no guaranteed uptime, how much notice we give for big changes.*

### 4. Not medical advice
**Plain:** Waldo uses health signals as context for planning your day. It isn't a medical device, it doesn't diagnose or treat anything, and it's no replacement for a doctor. If you're worried about your health, talk to one.
*Cover: medical disclaimer, no doctor–patient relationship, emergencies (Waldo is not for emergencies).*

### 5. What Waldo does for you (agent actions)
**Plain:** Waldo can take actions for you, like moving meetings, blocking time or updating tools, but only the kinds you've allowed, and you can undo them. You're still responsible for your calendar, your commitments and anything sent in your name.
*Cover: the autonomy levels, how you authorise actions, responsibility for actions taken within the permissions you set, undo, what Waldo never does without asking ⚠️ (the list from How it works, open question 2), and no guarantee that every action is right.*

### 6. Connected tools
**Plain:** When you connect a tool (Google, Slack, a watch), you're also using that company's service, under their terms. You can disconnect any time.
*Cover: third-party services, their terms, no responsibility for their failures, revoking access.*

### 7. Your data
**Plain:** You own your data. You let us use it only to run Waldo for you, as the Privacy page describes.
*Cover: licence to process for providing the service, reference to the Privacy Policy, no sale of data, what happens to data on termination.*

### 8. Using Waldo fairly
**Plain:** Don't break the law with Waldo, don't try to break Waldo, and don't connect accounts or data that aren't yours to connect.
*Cover: acceptable use, no reverse engineering of the service (Kennel excepted, see 10), no abuse, no scraping, no misuse of others' data.*

### 9. Price
**Plain:** Waldo is free during beta. If that changes, we'll tell you first, and you won't be charged unless you choose a plan. ⚠️ *confirm*
*Cover: free beta, future paid plans (Pup, Pro, Pack) under separate terms, notice before any charges.*

### 10. Kennel for Mac
**Plain:** Kennel is open source under the Apache-2.0 licence. That licence covers the Kennel code. Your agents run through your own accounts, under those companies' terms.
*Cover: the Apache-2.0 licence governs Kennel's code, these terms cover any Waldo services Kennel connects to, and no warranty for the open-source software.*

### 11. Our stuff
**Plain:** The Waldo name, the Dalmatian, the design and the writing belong to us. Please don't copy them.
*Cover: intellectual property, trademarks, feedback you send us (we may use it freely).*

### 12. Ending things
**Plain:** You can leave any time by deleting your account. We may suspend accounts that break these terms, and we'll tell you why when we can.
*Cover: termination by either side, what happens to data (per Privacy), clauses that survive termination.*

### 13. Limits on our responsibility
**Plain:** We work hard to get things right, but we can't promise Waldo will be perfect, and there are limits to what we're responsible for.
*Cover: disclaimers, limitation of liability, indemnity. ⚠️ Needs careful drafting: an agent acting on a calendar and health data raises real questions about fault.*

### 14. Changes to these terms
**Plain:** If we change these terms in a way that matters, we'll tell you before it takes effect.
*Cover: notice period, how notice is given, continuing to use Waldo means accepting.*

### 15. Disputes and the law
**Plain:** ⚠️ {Which country's law, and where disputes are heard.}
*Cover: governing law, jurisdiction, dispute resolution.*

### 16. Contact
**Plain:** Questions about these terms: ⚠️ {LEGAL_EMAIL}.

---

## Also update elsewhere

| Where | Change |
|---|---|
| Waitlist form | A short line under the button: "By joining, you agree to our Terms and Privacy Policy." (both linked) |
| Footer | Terms link on every page |
| Onboarding (in the app) | Accept Terms and Privacy, plus a separate, explicit health-data consent |

---

## Open questions for Suyash

1. **Legal entity:** company name and address?
2. **Lawyer:** who's drafting the legal text?
3. **Governing law:** which country, and which courts?
4. **Age:** 18+?
5. **Price:** free during beta, confirmed?
6. **Never without asking:** what does Waldo never do on its own? (Needed for section 5, and for How it works.)
