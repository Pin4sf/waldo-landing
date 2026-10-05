# Blog — Structure and Fixes

Status: **Built. The live copy of the blog index is at the top (2026-09-28).** Posts are in `content/blogs/`, and how to write one is in [../blog-system.md](../blog-system.md).

Layout (2026-10-04): made like the homepage (centred, endless carousels, the Stage box, white cards, one close). Words unchanged. See [../site-wide-pass.md](../site-wide-pass.md).

Last updated: 2026-09-28
URLs: `/blogs` (index), `/blogs/[slug]` (articles), `/blogs/rss.xml`
Live source: `app/blogs/`, `components/blog/`, `lib/blog-posts.ts`, `content/blogs/*.md`
Reviewed: live site at desktop (1440px) and phone (375px) widths, plus the source code

---

## Live copy (2026-09-28)

This is the copy on the built page right now, top to bottom. **Edit the words here**, then carry them into `app/blogs/page.tsx` (each post's words are in its own file in `content/blogs/`).

How to read it (the three text levels are in [../type.md](../type.md)):
- `Label:` is the small grey word above a title.
- `###` lines are **titles**, and `/` marks where the line breaks.
- `Body:` is the regular text. There are no subtitles any more (2026-09-28): what used to be the subtitle and the line after it are now one paragraph.
- In lists, `(…)` is a small label, and *italics* or **bold** mark emphasis (dark, medium weight).
- `Picture:` lines describe the picture (and name its file, once there is one). They're notes, not copy.

Card labels show the category and the date on two lines (written here as `Category / Date`). The cards update themselves from the posts.

Label: Waldo notes
### Things worth / noticing.
Body: Plain-language notes about agents, your body, and the patterns hiding inside an ordinary day. A quiet place for the things Waldo noticed.

Label: Latest

- (Privacy / Aug 1, 2026) **What we actually do with your data, explained to your grandmother** — A plain-language account of what Waldo may access, what stays private, and what you control.
  - _Picture: A small protected archive translating private signals into a simple note (`/assets/blogs/your-data.webp`)_
- (Connectors / Jul 30, 2026) **Nobody wants to explain their job to a computer every morning** — The useful agent understands the shape of your work without making you describe it every day.
  - _Picture: Different working days connected into one clear and protected window (`/assets/blogs/connectors-and-professions.webp`)_

---

### All / notes.
Body: Every note so far, newest first. 6 in all.

- (Patterns / Jul 28, 2026) **You are stuck in a loop and your AI cannot tell** — A single Tuesday looks ordinary. A run of them can tell you exactly what keeps going wrong.
  - _Picture: A run of calendar pages connected by a quiet constellation of spots (`/assets/blogs/patterns.webp`)_
- (Inside Waldo / Jul 25, 2026) **We put a Dalmatian on it, and we would like to explain ourselves** — Spots, patterns, and a dog that makes the product easier to understand without saying a word.
  - _Picture: A resting Dalmatian studying a constellation made from its own spots (`/assets/blogs/why-a-dalmatian.webp`)_
- (Health data / Jul 23, 2026) **Your health app is a mirror. Mirrors do not catch you.** — Your wearable already knows when the day is too heavy. The missing part is an agent willing to act.
  - _Picture: A spotted orange trail crossing from a mirror into a protected day (`/assets/blogs/health-app-mirror.webp`)_
- (Agents / Jul 20, 2026) **What a CLI agent actually is, explained like you are five** — The difference between a chatbot that talks and an agent that can actually do the work.
  - _Picture: A warm editorial illustration of a command line becoming an open doorway (`/assets/blogs/cli-agent.webp`)_
---

### Waldo reads how you’re doing, / then handles your day.
Body: See everything it does, one part at a time. New notes arrive every two weeks. Follow them by [RSS](/blogs/rss.xml).
Buttons: "See how Waldo works →"

> **Everything below this point is the earlier draft and the reasoning behind it, kept as a record.** Where it disagrees with the live copy above, the live copy wins.

---

## The blog's job

1. **Bring people in from search and shares.** Each post answers one real question in Waldo's voice.
2. **Move readers one step closer.** Every post ends by pointing to the right next page: Kennel, How it works, or the waitlist.
3. **Mark launches.** Kennel, new connectors, new surfaces. Sitemap: "launch posts land here."

## Verdict

The writing is good. The six posts are sharp, on-voice and free of banned words, and the article reading page (contents sidebar, listen button, share) is solid.

**What makes it feel chopped is the frame around the writing:**
- A different menu and footer from the rest of the site
- Three different card styles for only six posts
- Six posts spread across six categories
- Several floating buttons covering the page
- Nothing at the end of an article telling you where to go next

---

## Reference: what to borrow from Motto

Reviewed [wearemotto.com/blog](https://wearemotto.com/blog) and one of its articles on 2026-09-28. Their blog feels like a *publication*, not a list of posts, because every piece follows the same frame.

| Motto does | Why it works | Waldo version |
|---|---|---|
| **A big, confident header**, then one line on what the blog is about | You know what you're reading in two seconds | "Things worth noticing." in Corben, plus one line |
| **"Latest": the two newest posts, big, side by side** | Fresh work gets the spotlight, and it looks alive | Two latest posts as large cards (instead of one) |
| **Category chips + search + "Showing 12 of 255"** in one row | Browsing feels deliberate, and the count signals depth | The same row, **once there are 10+ posts** |
| **One uniform grid, with the category pill sitting on the image** | Every post looks equally considered, with no chopped mix | One 3-column grid, category pill on each image |
| **"View more articles +"** | No separate archive list or second style | "More notes +" loads the next set |
| **Ends with a product CTA** ("Discover what we do →") | The blog feeds the business | "See how Waldo works →" |
| **Article: a sticky left rail** with author, category, date, share, "All articles →" | Context stays on screen while reading | Extend our existing rail (copy link, share) with author, category, date and "All notes →" |
| **Article: a dark call-to-action block inside the article** | Offers the next step while the reader is engaged | Our "Next step" card, as a dark block |
| **Real author sign-off** ("By Sunny Bonnell, Co-Founder & CEO") | People trust people | Real names (open question 1) |
| **Newsletter with a one-line privacy note** ("Unsubscribe anytime.") | Asks for little, promises little | Our subscribe band, plus "One email when there's something worth reading. Unsubscribe anytime." |
| **3 related articles from the same category**, plus "All articles" | Keeps readers in the topic they chose | 3 related from the same category (currently 2, picked in order) |

**Also worth a look:** Linear's changelog for how short *launch* posts are shaped (date, what shipped, one image, a few lines). Use that shape for connector launches.

**What NOT to borrow:** Motto's scrolling "ARTICLES ARTICLES" marquee and oversized all-caps type. They clash with Corben and Waldo's quieter voice.

---

## MUST FIX

| # | Problem | Where | Fix |
|---|---|---|---|
| 1 | **The menu links to Pricing and Support (both 404) and to the old Features page.** The button says "Early Access." | Every blog page | The shared site menu (from [sitemap.md](../sitemap.md)) |
| 2 | **A blog-only footer** ("Waldo notes"), with links to `/features` | Every blog page | The shared site footer. Keep a small subscribe band above it (see below) |
| 3 | **Articles end with nowhere to go.** No call to action after the post, only in the footer. | Article page | Add an end-of-article card (see the article template) |
| 4 | **"Sources" list internal documents as sources**, e.g. "Waldo pattern architecture, May 2026" linking to `/features` or `/` | **All 6 posts.** Two of them (patterns, connectors) have no other source. | Only list real, external sources. Drop the internal lines. If a post has none left, drop the section. |
| 5 | **No post about Kennel**, the only product people can use today | Index | Write a Kennel launch post (see the content plan) |
| 6 | **The privacy post makes privacy promises** ("what we actually do with your data") | `06-what-we-actually-do-with-your-data.md` | Check every claim against the Privacy page once it's written. Legal eyes before it stays up. |

---

## BLOG INDEX — new structure

```
Menu (shared) → Header → Latest two (big) → [Chips + search + count, once 10+ posts]
→ All posts (one grid) → "More notes +" → Subscribe → "See how Waldo works →" → Footer (shared)
```

### Header

**Kicker:** Waldo notes
**Headline** (keep, it's good)
```
Things worth
noticing.
```
**Body line:** Plain-language notes about agents, your body, and the patterns hiding inside an ordinary day.
**Aside:** *a quiet place for the things Waldo noticed.* (Make it readable. It's currently too small and faint to see.)

**Spacing:** Cut the empty space above the headline roughly in half. At desktop width, the header currently fills most of the first screen before any post shows.

**Search:** Hide it until there are about 15 posts. Searching six posts adds clutter without helping anyone.

### Latest two (big)

The two newest posts as large cards, side by side (one above the other on phones). Each has image, category, title, one-line summary, date and read time. *(Motto pattern. It replaces today's single featured card.)*

**Fix:** At narrow widths the title currently gets cut off on the right ("What we actually do with your data…"). It needs to wrap.

### All posts (one grid)

**Every other post goes in one uniform grid of cards,** each with image, category, title, summary and date. Replace today's mix of "two cards + a 'More from Waldo' text list." Three styles for six posts is what makes the page look chopped.

**The text-only archive list** comes back only once there are 12+ posts, for the older ones.

**Category filter chips** above the grid appear once there are 10+ posts.

### Subscribe band · NEW

**Headline:** New notes, now and then.
**Body:** One email when something's worth reading. Nothing else.
**Field + button:** Your email → **Subscribe**
**Small link:** or follow by RSS
**Aside:** *we write when there's something to say.*

**Build note:** Send it to Loops (already used for the waitlist), tagged `blog_subscriber`, so blog readers can later be offered the waitlist.

---

## ARTICLE PAGE — template

```
Menu → Back link → Category · Title · Summary → Author · Date · Read time
→ Hero image → Listen → Article
     (left rail: author, category, date, copy link, share, "All notes →"  ← extended, Motto pattern)
     (right: "On this page" contents)
→ Sources (external only, if any) → Author card → Next step card (NEW, dark block)
→ Related: 3 from the same category (was 2, picked in order) → Subscribe band → Footer
```

### Keep (works well)
- The contents sidebar that highlights the current section
- Copy link and share on the left rail
- The listen button (all six audio files exist and load)
- "Keep reading" with two posts
- Tapered two-line titles (`titleLines`)

### Change

| # | What | Fix |
|---|---|---|
| 1 | **Author is "Waldo team" on every post**, with a made-up role under it ("Product and continuity") and the logo as the photo | Use real people with a name, photo and one-line bio. At minimum, founder-written posts carry the founder's name. Real names build trust and help search ranking. |
| 2 | Listen shows "**Loading audio · System voice**" | Show "**Listen · 5 min**" straight away (the read time is already known). Drop "System voice." |
| 3 | Image caption "Waldo, made with OpenAI" | "Illustration made with OpenAI." Say it plainly, once, small. |
| 4 | **No next step at the end** | Add the Next step card below |

### Next step card · NEW

A single card after the author card. What it says depends on the post's category:

| Category | Card |
|---|---|
| Agents & work | **Kennel runs your agents to the finish.** Open beta for Mac. → `/kennel` |
| Body & health | **Waldo reads how you're doing, then handles your day.** → `/how-it-works` |
| Inside Waldo | **Waldo's getting ready.** Be first in. → **Let Waldo in →** |
| Launches | Whatever was launched → its page |

---

## CONTENT PLAN

### Categories: from six to four

Six posts in six categories makes the labels meaningless. Use four fixed categories that match the site's story:

| Category | Covers | Current posts |
|---|---|---|
| **Agents & work** | Agents, Kennel, outcomes, context | What a CLI agent actually is · Nobody wants to explain their job · You are stuck in a loop |
| **Body & health** | Wearables, health as context | Your health app is a mirror |
| **Inside Waldo** | Brand, privacy, how we build | We put a Dalmatian on it · What we do with your data |
| **Launches** | Kennel, connectors, new surfaces | *(none yet)* |

### Titles to fix

| Current | Problem | Suggested |
|---|---|---|
| What a CLI agent actually is, explained like you are five | "CLI" is jargon, and "like you are five" talks down to the reader | **The difference between an AI that talks and one that does the work** |
| What we actually do with your data, explained to your grandmother | Same "explained to…" trick again, and it talks down | **What Waldo can see, what it can't, and what you control** |

Keep the other four. They're good. Keep the URLs the same when retitling, so existing links still work.

### Posts to write next

1. **Kennel launch:** "Agent finished is not done." Why we built Kennel, what it does, how to try the beta. *(Category: Launches. Highest priority.)*
2. **Why Waldo, the short version:** the thesis from `/why-waldo` in 800 words, for sharing.
3. **Each connector launch** as it ships: "Waldo now speaks {tool}." One short post each, linked from `/connectors`.

**Cadence:** The last post was 3 August, eight weeks ago. Aim for one post every two weeks. A stale blog looks like a stale company.

---

## SUBTLE FIXES

| # | What | Fix |
|---|---|---|
| 1 | Three names for one thing: menu "Blog," kicker "Latest writing," footer "Waldo notes" | Menu: **Blog**. Page kicker: **Waldo notes**. Drop "Latest writing." |
| 2 | URL `/blogs` (plural) | Standard is `/blog`. Move it, with a permanent redirect from `/blogs` so nothing breaks. *(optional, low priority)* |
| 3 | Search page title "Latest writing \| Waldo" | "Waldo notes: agents, your body and your day" |
| 4 | Three floating items on screen at once: cookie banner, chat button, back-to-top | Make the cookie banner a slim bar. Hide the chat button on the blog. On a phone, the banner currently covers a quarter of the screen. |
| 5 | Phone menu: the menu icon sits awkwardly between the logo and the button | Fixed by the shared menu |
| 6 | Posts avoid contractions ("You are not," "do not") | Optional. Contractions ("you're," "don't") read warmer and match the site's voice. Suyash's call. |
| 7 | One date shows Aug 3 on the index but Aug 1 in the post's file | Check the date conversion |
| 8 | Heading anchors show as "#" | Show them only on hover (check they already do) |

---

## Open questions for Suyash

1. **Authors:** can posts carry real names (yours, the team's) with photos?
2. **The two retitles:** OK with the suggested titles?
3. **Subscribe:** OK to collect blog emails in Loops, separate from the waitlist?
4. **Kennel launch post:** who writes it? I can draft it from the Kennel page and the repo.
5. **Contractions:** keep the formal "do not," or switch to "don't"?
6. **URL:** move `/blogs` to `/blog` (with a redirect), or leave it?
