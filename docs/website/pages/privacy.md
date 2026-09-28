# Privacy — Copy Structure

Status: **Built (plain-language part). The live copy is at the top (2026-09-28). The legal part still needs a lawyer.**
Last updated: 2026-09-28
URL: `/privacy`

> ⚠️ **This is not legal advice.** The plain-language part below is a draft of what Waldo actually does, built from the codebase and the product docs. The **legal policy (Part B) must be written or reviewed by a lawyer** before launch. Waldo handles health data, which carries extra legal duties in most places. Every "⚠️ confirm" must be checked against how the product really works.

---

## Live copy (2026-09-28)

This is the copy on the built page right now, top to bottom. **Edit the words here**, then carry them into `app/privacy/page.tsx`.

How to read it (the three text levels are in [../type.md](../type.md)):
- `Label:` is the small grey word above a title.
- `###` lines are **titles**, and `/` marks where the line breaks.
- `Body:` is the regular text. There are no subtitles any more (2026-09-28): what used to be the subtitle and the line after it are now one paragraph.
- In lists, `(…)` is a small label, and *italics* or **bold** mark emphasis (dark, medium weight).
- `Picture:` lines describe the picture (and name its file, once there is one). They're notes, not copy.

### Your data, / plainly.
Body: What Waldo collects, why, who else touches it, and how to take it back. The legal version is further down, and it says the same thing in more words. The boundary is part of the product.

Draft. This page is being written and reviewed, and the legal policy below isn't final yet.

---

### The short / version.

- **You choose what Waldo connects to.** Nothing connects on its own.
- **From email and messages, Waldo reads the pattern, never the words:** volume, timing, urgency.
- **We never sell your data** and never use it for ads.
- **We don't train AI models on your data.**
- **You can see it, download it and delete it,** any time.

---

### Which Waldo / are you using?
Body: Different parts of Waldo handle different data.

- **Visiting this website** — Almost nothing. No ad trackers, no analytics scripts.
- **On the waitlist** — Your email, and where you found us.
- **Using Waldo (beta)** — Only what you connect. See below.
- **Using Kennel for Mac** — Kennel keeps its records on your Mac.

---

### The website / and the waitlist.

| What | Why | Where it goes |
|---|---|---|
| Your email (if you join the waitlist) | To let you in, and to send updates | Loops, our email provider |
| Where you came from (e.g. “from Kennel”) | To know which links work | Saved with your waitlist signup |
| That you closed the cookie notice | So it doesn't pop up again | Your own browser only |

---

### Using Waldo: / what it collects, and why.
Body: Only from what you connect.

| Source | What Waldo reads | Why |
|---|---|---|
| Your watch (Apple Health, Health Connect) | Sleep, heart rate, HRV, resting heart rate, breathing rate, blood oxygen, wrist temperature, steps, exercise, daylight | To work out how you're doing (Recovery, Form, Weight) |
| Calendar | Event times, lengths, how packed your day is | To plan around your day, and move or protect time if you allow it |
| Email (Gmail) | Metadata only: how many, when, whether they're waiting on you. Never the words. | To notice when messages are piling up |
| Tasks | Task names, due dates, what's overdue | To order your list by deadline and energy |
| Location | Roughly where you are | For local weather and air quality |
| What you tell Waldo | Your messages to Waldo, your corrections, your preferences | To answer you, and to remember what you've taught it |

---

### Who else / touches it.
Body: Waldo uses a few companies to run. They process data only to provide Waldo's service to you, not for their own purposes.

| Company | What they do for Waldo | What they see |
|---|---|---|
| Supabase | Stores your account and data | Everything above, encrypted |
| Anthropic (Claude) | Writes Waldo's messages and replies | The context needed for each message |
| Telegram (if you choose it) | Delivers Waldo's messages to you | The messages Waldo sends you |
| Google (if you connect it) | Calendar, Gmail metadata, Tasks | Their own service, under your Google account |
| Apple / Health Connect | Where your health data comes from | Their own service, on your phone |
| Open-Meteo | Weather | A rough location, no identity |
| Loops | Waitlist and update emails | Your email |
| Vercel | Hosts this website | Normal web server logs |

---

### What we / never do.

- Sell your data, or use it for ads
- Read the words in your email or messages
- Use health data to make medical decisions. Waldo isn't a medical device.
- Share your health data with anyone else without your say-so
- Store your Apple Health data in iCloud

> **For Suyash to write:** **How long we keep it, and where it's stored.** Retention period, deletion timing and data region, once decided.

---

### Kennel / for Mac.
Body: Kennel is open source and runs on your Mac.

- Kennel keeps its records on your Mac, in a folder you control (~/.kennel).
- Your agents work through your own accounts (Codex, Claude Code, Cursor and others), under those companies' terms.
- We don't receive your code or your project data.

---

### Your / controls.

| You can… | How |
|---|---|
| See what Waldo knows about you | Settings → What Waldo knows |
| Change or remove any of it | Same place, tap an item |
| Disconnect any tool | Settings → Connections, or from that tool's own settings |
| Download everything | Settings → Your data → Export |
| Delete your account and data | Settings → Your data → Delete |

Small print: Step-by-step help is on the [Support](/support) page. Waldo is for people 18 and over.

---

Label: Part B
### Privacy / Policy.
Body: The legal version of everything above.

> **For Suyash to write:** **Legal policy goes here, written and reviewed by a lawyer.** It covers who we are, what we collect and why, the legal basis, sharing, international transfers, retention, security, your rights, children, automated decisions, cookies and local storage, changes, and contact and grievance officer. The outline and compliance checklist are in docs/website/pages/privacy.md.

> **Everything below this point is the earlier draft and the reasoning behind it, kept as a record.** Where it disagrees with the live copy above, the live copy wins.

---

## The page's job

1. **Tell people plainly** what Waldo collects, why, who else touches it, and how to control it.
2. **Hold the legal policy** that app stores, Google and the law require.
3. **Match every other promise on the site.** Home, How it works, Connectors, the privacy blog post and Support all make privacy claims. This page is the source of truth, and they must agree with it.

## Page layout

```
Header → Part A: Your data, plainly (7 short sections) → Part B: Privacy Policy (legal text) → Footer
```

A sticky mini-menu down the side: *Plainly · What we collect · Who else · Your controls · Full policy*

---

# PART A — YOUR DATA, PLAINLY

## Header

**Headline**
```
Your data,
plainly.
```

**Body line:** What Waldo collects, why, who else touches it, and how to take it back. The legal version is further down, and it says the same thing in more words.

**Last updated:** {date}

**Aside:** *the boundary is part of the product.*

---

## A1. The short version

Five lines, big and calm:
- **You choose what Waldo connects to.** Nothing connects on its own.
- **From email and messages, Waldo reads the pattern, never the words:** volume, timing, urgency.
- **We never sell your data** and never use it for ads.
- **We don't train AI models on your data.** ⚠️ *confirm with every AI provider's terms*
- **You can see it, download it and delete it**, any time.

---

## A2. Which Waldo are you using?

Different parts of Waldo handle different data. Four tabs:

| You're… | What we hold |
|---|---|
| **Visiting this website** | Almost nothing. See A3. |
| **On the waitlist** | Your email, and where you found us. See A3. |
| **Using Waldo (beta)** | What you connect. See A4. |
| **Using Kennel for Mac** | Kennel keeps its records on your Mac. See A5. |

---

## A3. The website and the waitlist

| What | Why | Where it goes |
|---|---|---|
| **Your email** (if you join the waitlist) | To let you in, and to send updates | Loops, our email provider |
| **Where you came from** (e.g. "from Kennel," "from a newsletter link") | To know which links work | Saved with your waitlist signup |
| **That you closed the cookie notice** | So it doesn't pop up again | Your own browser only |

**No ad trackers. No analytics scripts.** ⚠️ *Confirm no analytics is switched on in the hosting dashboard (for example Vercel Analytics).*

> **The cookie notice needs a fix.** It says "We use a couple of essential cookies," but the site's code doesn't set any. It saves one note in your browser (that you closed the notice) and, for the waitlist, where you came from. Suggested wording: **"No tracking cookies here. We only remember that you closed this."** ⚠️ *A lawyer should confirm whether the "where you came from" note needs consent where you operate.*

---

## A4. Using Waldo

### What Waldo collects, and why

Only from what you connect.

| Source | What Waldo reads | Why |
|---|---|---|
| **Your watch** (Apple Health, Health Connect) | Sleep, heart rate, HRV, resting heart rate, breathing rate, blood oxygen, wrist temperature, steps, exercise, daylight | To work out how you're doing (Recovery, Form, Weight) |
| **Calendar** | Event times, lengths, how packed your day is. ⚠️ *Titles and attendees too? Confirm.* | To plan around your day, and move or protect time if you allow it |
| **Email** (Gmail) | **Metadata only:** how many, when, whether they're waiting on you. **Never the words.** | To notice when messages are piling up |
| **Tasks** | Task names, due dates, what's overdue | To order your list by deadline and energy |
| **Music** (Spotify, once live) | The mood of what you play, not a list of songs ⚠️ *confirm* | One more clue to how you're doing |
| **Location** | Roughly where you are | For local weather and air quality |
| **What you tell Waldo** | Your messages to Waldo, your corrections, your preferences | To answer you, and to remember what you've taught it |

### Who else touches it

Waldo uses a few companies to run. They process data **only to provide Waldo's service to you**, not for their own purposes.

| Company | What they do for Waldo | What they see |
|---|---|---|
| **Supabase** | Stores your account and data | Everything above, encrypted ⚠️ *confirm the data region* |
| **Anthropic** (Claude) | Writes Waldo's messages and replies | The context needed for each message ⚠️ *confirm Anthropic's API terms (no training on API data) and put a data processing agreement in place* |
| **Telegram** (if you choose it) | Delivers Waldo's messages to you | The messages Waldo sends you |
| **Google** (if you connect it) | Calendar, Gmail metadata, Tasks | Their own service, under your Google account |
| **Apple / Health Connect** | Where your health data comes from | Their own service, on your phone |
| **Open-Meteo** | Weather | A rough location, no identity |
| **Loops** | Waitlist and update emails | Your email |
| **Vercel** | Hosts this website | Normal web server logs |

⚠️ *This list must be complete. Every service that touches user data goes here.*

### What we never do
- Sell your data, or use it for ads
- Read the words in your email or messages
- Use health data to make medical decisions. Waldo isn't a medical device.
- Share your health data with anyone else (including your team, in future team plans) without your say-so
- Store your Apple Health data in iCloud *(an Apple rule)*

### How long we keep it
⚠️ **Needs a decision.** The product docs say retention "is not yet addressed." Suggested: keep while your account is open; raw watch readings older than {X} months get summarised; everything is deleted within {30} days of deleting your account, including backups within {Y} days.

### Where it's kept
⚠️ *Which country is Supabase's data stored in? If it's outside the country your users are in, the legal part must cover international transfers.*

---

## A5. Kennel for Mac

Kennel is open source and runs on your Mac.
- **Kennel keeps its records on your Mac**, in a folder you control (`~/.kennel`).
- **Your agents work through your own accounts** (Codex, Claude Code, Cursor and others), under those companies' terms.
- **We don't receive your code or your project data.** ⚠️ *Confirm Kennel sends no analytics or crash reports home. If it does, list exactly what.*

---

## A6. Your controls

| You can… | How |
|---|---|
| See what Waldo knows about you | Settings → What Waldo knows |
| Change or remove any of it | Same place, tap an item |
| Disconnect any tool | Settings → Connections, or from that tool's own settings |
| Download everything | Settings → Your data → Export ⚠️ *confirm* |
| Delete your account and data | Settings → Your data → Delete ⚠️ *confirm* |
| Ask us anything about your data | ⚠️ {PRIVACY_EMAIL} |

**Link:** Step-by-step help → `/support`

---

## A7. Kids

Waldo is for people 18 and over. ⚠️ *Confirm the age, and make sure the Terms say the same.*

---

# PART B — PRIVACY POLICY (legal)

**⚠️ For a lawyer to write.** Below is the outline it needs to cover, so nothing is missed. Part A's wording should be reused where possible, so both parts say the same thing.

### Sections the policy needs
1. **Who we are:** legal company name, address, contact ⚠️ {LEGAL_ENTITY}, {ADDRESS}
2. **What this covers:** the website, the waitlist, the Waldo app, Kennel
3. **What we collect:** matching A3–A5
4. **Why, and on what legal basis:** for health data this usually means **explicit consent**
5. **Who we share with:** the processor list from A4, and on what terms
6. **International transfers**
7. **How long we keep it:** matching A4
8. **Security:** encryption at rest and in transit, access controls ⚠️ *only claim what's true; no certifications unless earned*
9. **Your rights:** access, correction, deletion, portability, withdrawing consent, complaints
10. **Children**
11. **Automated decisions:** Waldo acts on your behalf. Explain the autonomy levels and how to undo.
12. **Cookies and local storage**
13. **Changes to this policy**
14. **Contact, and grievance officer** ⚠️ {GRIEVANCE_OFFICER}

### Rules this policy must satisfy

| Rule | Why it applies | What it needs |
|---|---|---|
| **India, DPDP Act 2023** | Waldo appears to be India-based (.in domain) ⚠️ *confirm* | Clear notice, consent, a named grievance officer, a process for user rights |
| **Apple HealthKit rules** | Waldo reads Apple Health | A privacy policy, no ads or data brokering from health data, no iCloud storage of health data, clear disclosure |
| **Google API Services User Data Policy ("Limited Use")** | Waldo reads Gmail and Calendar | The exact "Limited Use" statement in the policy. Gmail metadata is a *restricted* scope, which also needs Google's verification and a security assessment before public launch. |
| **EU / UK GDPR** | If anyone in Europe signs up | Legal basis, explicit consent for health data, transfer safeguards, possibly an EU representative |
| **US state health-data laws** (e.g. Washington's My Health My Data Act) | If US users sign up | Possibly a separate consumer health data notice |
| **Anthropic, Supabase, Loops, Telegram terms** | They process user data | Data processing agreements in place |

---

## Also update elsewhere

| Where | Change |
|---|---|
| Cookie notice (site-wide) | New wording (see A3) |
| Home trust section, Connectors "You hold the keys," Support | Must match this page word for word on the key promises |
| Blog post "What we actually do with your data" | Check every claim against this page |
| Footer | Privacy link on every page |

---

## Open questions for Suyash

1. **Legal entity:** company name and registered address?
2. **Lawyer:** who's reviewing? This page shouldn't go live without them.
3. **Emails:** privacy contact and grievance officer?
4. **Data region:** where is Supabase hosted?
5. **Retention:** how long is data kept, and how fast is deletion?
6. **Calendar:** does Waldo read event titles and attendees, or only times?
7. **AI providers:** is there a data processing agreement with Anthropic (and any other model provider)?
8. **Kennel:** does it send anything home (analytics, crash reports)?
9. **Google verification:** has the Gmail restricted-scope verification started?
10. **Age:** 18+?
