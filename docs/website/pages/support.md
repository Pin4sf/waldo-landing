# Support — Copy Structure

Status: **Built. The live copy is at the top (2026-09-28).**

Layout (2026-10-04): made like the homepage (centred, endless carousels, the Stage box, white cards, one close). Words unchanged. See [../site-wide-pass.md](../site-wide-pass.md).

Last updated: 2026-09-28
URL: `/support`

---

## Live copy (2026-09-28)

This is the copy on the built page right now, top to bottom. **Edit the words here**, then carry them into `app/support/page.tsx`.

How to read it (the three text levels are in [../type.md](../type.md)):
- `Label:` is the small grey word above a title.
- `###` lines are **titles**, and `/` marks where the line breaks.
- `Body:` is the regular text. There are no subtitles any more (2026-09-28): what used to be the subtitle and the line after it are now one paragraph.
- In lists, `(…)` is a small label, and *italics* or **bold** mark emphasis (dark, medium weight).
- `Picture:` lines describe the picture (and name its file, once there is one). They're notes, not copy.

### How can we / help?
Body: Quick answers below. If they don't cover it, a real person reads every message. No bots in the inbox. We checked that too.

- **Getting in** — Access, the waitlist, price.
- **Kennel** — Bugs, questions, setup.
- **Your data** — Download, delete, disconnect.
- **Contact us** — A real person, by email.

---

### Quick / answers.

**Getting in**

- **When do I get access to Waldo?**
  We're letting people in a few at a time. Joining the list is the way in, and people who joined earlier get in earlier.
- **I joined the waitlist but didn't get an email.**
  Check spam and promotions first. Still nothing? Write to us from the same address, and we'll sort it out.
- **How do I leave the waitlist?**
  Every email we send has an unsubscribe link. Or write to us, and we'll remove you.
- **How much will Waldo cost?**
  Free while it's in beta. We'll tell you well before anything changes, and nothing will be charged without you choosing a plan.
- **Is there an Android app?**
  iPhone comes first. Android follows. Join the list to hear when.

**Using Waldo**

- **Which watches work?**
  Apple Watch works best. Oura, WHOOP, Garmin and Fitbit are coming. The full list is on the Connectors page.
- **Waldo moved something I didn't want moved.**
  Undo it in one tap from the activity log. To stop it happening again, change that area to “Ask me” in your settings.
- **Waldo's gone quiet.**
  Check that your watch has synced recently (the app shows “Updated X min ago”), and that notifications are on for the channel Waldo uses to reach you.
- **How do I change where Waldo messages me?**
  Settings → Messages. Pick Telegram, the web, or (soon) WhatsApp.

---

### Kennel / for Mac.
Body: Kennel is open source, so its help lives where the code does. Found a bug? Kennel's on GitHub, and so are we.

| Need | Where |
|---|---|
| Something's broken | [Open an issue →](https://github.com/waldoco/Waldo-Kennel/issues) |
| A question, or an idea | [Discussions →](https://github.com/waldoco/Waldo-Kennel/discussions) |
| Setting it up | [The README →](https://github.com/waldoco/Waldo-Kennel) |

---

### Your data / and account.

- **How do I download my data?**
  Settings → Your data → Export. You'll get a file with everything Waldo holds about you.
- **How do I delete my account?**
  Settings → Your data → Delete account. It removes your account and the data that goes with it.
- **How do I disconnect a tool?**
  Settings → Connections → pick the tool → Disconnect. You can also revoke Waldo's access from the tool's own settings, for example your Google account's security page.
- **What does Waldo know about me?**
  Settings → What Waldo knows. Every item can be seen, changed or removed.

---

### Still stuck? / Write to us.
Body: A real person reads every message. We usually reply within two working days. The dog doesn't answer these. We do.

> **For Suyash to write:** **Support email goes here** (for example support@heywaldo.in, once it exists and someone reads it).

> **For Suyash to write:** **Found a security problem?** Please tell us privately, not in public. Security email goes here. For Kennel, follow SECURITY.md in the Kennel repo.

> **Everything below this point is the earlier draft and the reasoning behind it, kept as a record.** Where it disagrees with the live copy above, the live copy wins.

---

## The page's job

1. **Answer the practical questions** that don't belong on Home (access, account, data, Kennel troubleshooting).
2. **Give one clear way to reach a human.**
3. **Meet the App Store requirement.** Apple needs a working support URL before the iPhone app can be listed.

It's a utility page: calm, short, easy to scan. No selling.

## Page rules

- Same site rules (Corben headline, italic asides, British spelling). Only one CTA on the page, and it isn't "Let Waldo in →". Here the action is getting help.
- **Every answer must be true today.** Anything marked ⚠️ needs confirming before launch.
- No question repeats Home's FAQ. Home handles "why Waldo." Support handles "how do I."

## Sections

```
0 Header → 1 Quick answers (by topic) → 2 Kennel help → 3 Your data and account
→ 4 Still stuck? (contact) → 5 Report a security issue → Footer
```

---

## 0. Header

**Headline**
```
How can we
help?
```

**Body line:** Quick answers below. If they don't cover it, a real person reads every message.

**Visual:** A small row of topic tiles that jump down the page: **Getting in · Kennel · Your data · Contact us**

**Aside:** *no bots in the inbox. we checked that too.*

---

## 1. Quick answers

An accordion, grouped by topic. All closed by default.

### Getting in

**When do I get access to Waldo?**
We're letting people in a few at a time. Joining the list is the way in, and people who joined earlier get in earlier. ⚠️ *Confirm this is how invites work.*

**I joined the waitlist but didn't get an email.**
Check spam and promotions first. Still nothing? Write to us (below) from the same address, and we'll sort it out.

**How do I leave the waitlist?**
Every email we send has an unsubscribe link. Or write to us, and we'll remove you.

**How much will Waldo cost?**
Free while it's in beta. We'll tell you well before anything changes, and nothing will be charged without you choosing a plan. ⚠️ *Confirm. Pricing names (Pup, Pro, Pack) stay off the site until pricing is real.*

**Is there an Android app?**
iPhone comes first. Android follows. Join the list to hear when. ⚠️ *Confirm.*

**Does Waldo work in my country?**
⚠️ *Needs an answer: any countries it won't launch in, for example because of health data rules?*

### Using Waldo

**Which watches work?**
Apple Watch works best. Oura, WHOOP, Garmin and Fitbit are coming. See the full list on `/connectors`.

**Waldo moved something I didn't want moved.**
Undo it in one tap from the activity log. To stop it happening again, change that area to "Ask me" in your settings.

**Waldo's gone quiet.**
Check that your watch has synced recently (the app shows "Updated X min ago"), and that notifications are on for the channel Waldo uses to reach you.

**How do I change where Waldo messages me?**
Settings → Messages. Pick Telegram, the web, or (soon) WhatsApp.

---

## 2. Kennel help

**Headline:** Kennel for Mac

**Body line:** Kennel is open source, so its help lives where the code does.

| Need | Where |
|---|---|
| Something's broken | Open an issue → `github.com/waldoco/Waldo-Kennel/issues` |
| A question, or an idea | Discussions → `github.com/waldoco/Waldo-Kennel/discussions` |
| Setting it up | The README → `github.com/waldoco/Waldo-Kennel` |

**Aside:** *good dogs share. so do their bug reports.*

---

## 3. Your data and account

**How do I download my data?**
Settings → Your data → Export. You'll get a file with everything Waldo holds about you. ⚠️ *Confirm export exists and what format it's in (the product docs say CSV).*

**How do I delete my account?**
Settings → Your data → Delete account. It removes your account and the data that goes with it. ⚠️ *Confirm how long deletion takes, and whether any backups keep data for a while (the privacy page must say the same).*

**How do I disconnect a tool?**
Settings → Connections → pick the tool → Disconnect. You can also revoke Waldo's access from the tool's own settings, for example your Google account's security page.

**What does Waldo know about me?**
Settings → What Waldo knows. Every item can be seen, changed or removed.

**Link:** The full detail → `/privacy`

---

## 4. Still stuck?

**Headline**
```
Still stuck?
Write to us.
```

**Body line:** A real person reads every message. We usually reply within two working days. ⚠️ *Confirm the reply time you can keep.*

**Contact:** ⚠️ **{SUPPORT_EMAIL}**. *Needs a real, monitored address. The codebase only has placeholder addresses (`contact@waldo.in`, `sp@waldo.in`) on a different domain from the site. Suggested: `support@heywaldo.in` or `hello@heywaldo.in`.*

**Optional:** a simple form (name, email, topic, message) that emails the same inbox. An email link is enough to start.

**Aside:** *the dog doesn't answer these. we do.*

---

## 5. Report a security issue

**Body line:** Found a security problem? Please tell us privately, not in public. Write to ⚠️ **{SECURITY_EMAIL}** (suggested: `security@heywaldo.in`), and we'll respond quickly.
**For Kennel:** follow `SECURITY.md` in the Kennel repo.

---

## Search and sharing

- **Title:** Support | Waldo
- **Description:** Answers about getting in, your data, your account and Kennel, plus how to reach a real person.

---

## Open questions for Suyash

1. **Support email:** which address, and is it monitored? (Also a security address.)
2. **Reply time:** what can you honestly promise?
3. **Access:** how do invites work, first come first served?
4. **Price during beta:** free? Is that safe to say?
5. **Android and countries:** what's the plan?
6. **Export and delete:** do both exist in the app today? How long does deletion take?
