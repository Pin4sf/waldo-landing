# The Waldo Blog System

How a post goes from idea to live. For Suyash, Shivansh, and anyone else writing for Waldo.

Last updated: 2026-09-28

---

## In one line

**One post = one Markdown file** in `content/blogs/`. Copy the template, fill it in, write, and it appears on the site. No code to touch.

---

## The flow

```
Idea → Outline → Draft → Review → Publish → Share
```

| Step | Who | What happens | Where |
|---|---|---|---|
| **1. Idea** | Anyone | Add a line to the backlog: working title, the one question it answers, category | [blog-backlog.md](blog-backlog.md) |
| **2. Outline** | Writer | 4–6 section headings, plus the one sentence the reader should leave with. Suyash okays the angle before any writing. | The backlog entry |
| **3. Draft** | Writer | Copy `content/blogs/_TEMPLATE.md` to `content/blogs/<slug>.md`. Fill in the top block, write the post. `status: draft` | New file |
| **4. Review** | Suyash | Read it on the preview link. Run the checklist below. Writer sets `status: review` while it's being read. | Preview deploy |
| **5. Publish** | Writer | Set `status: published` and today's date. Merge. It's live on the next deploy. | Same file |
| **6. Share** | Suyash | Post on X and LinkedIn. Email subscribers (once subscribe exists). If it's a launch, link it from the product page. | Outside the site |

**Drafts are safe.** Anything not marked `published` never appears anywhere on the site, in search, or in the RSS feed.

---

## What the site does for you

When the file is saved, the site automatically:
- Adds the post to the blog page, newest first
- Builds the article page, with the "On this page" list made from your `##` headings
- Works out the reading time
- Adds it to the RSS feed and the sitemap
- Shows the listen button only if there's an `audio:` line
- Shows "Sources" only if there are sources
- Links two more posts under "Keep reading"

**It also checks the file.** If a required line is missing, a category is misspelled, or the image file isn't where the file says, the page shows an error naming the file and exactly what to fix. The site can't go live with a broken post.

It also prints gentle **style notes** (without blocking anything) if the title, dek, excerpt or aside has an exclamation mark or a banned word, or if the dek or excerpt is too long.

---

## Writing guide

### What a Waldo post is
- **Answers one real question** someone would actually type or ask. "Why does my health app never do anything?" beats "Our vision for health."
- **Plain language.** If a smart friend outside tech wouldn't follow it, rewrite it.
- **800–1,500 words.** Long enough to be useful, short enough to finish.
- **Written by a person, for a person.** Warm, dry, capable. A little braggadocious is fine. Preachy isn't.

### Shape of a post
1. **Open on the reader's problem** in 1–2 short paragraphs. No "In today's fast-paced world."
2. **3–5 sections**, each with a `##` heading that's a statement, not a label. "The loop nobody notices" beats "Background."
3. **Waldo appears late and lightly.** One section near the end that says what Waldo does about it. The post has to be worth reading even if Waldo didn't exist.
4. **End on a feeling, not a pitch.** The `aside` line does the last beat.

### Headlines
- **Two lines, the second shorter.** Mark the break with ` / ` in the `title:` line.
- **Say something.** A claim or a tension: "Your health app is a mirror. / Mirrors do not catch you."
- **Don't talk down.** No "explained like you're five" or "explained to your grandmother."
- **No jargon in the headline.** "CLI," "MCP" and "LLM" can appear in the body, explained.

### Rules from the brand book (AGENTS.md Part 7)
- **Never:** wellness, mindfulness, holistic, optimise, hustle, grind, peak performance, AI-powered, smart, intelligent (about Waldo), empower, journey, unlock, dashboard, "Waldo AI," "Meet Waldo"
- **No exclamation marks.**
- **No medical claims.** Waldo doesn't diagnose, treat or promise health results.
- **Numbers only from AGENTS.md Part 3,** or with a real external source listed.
- **Messages and email:** Waldo reads metadata (volume, timing), never content. Never imply otherwise.
- **Spelling:** British (optimise, prioritise, summarise).

### Sources
- **Only real, external sources:** research, docs, reputable articles. Name and date each one.
- **Never list our own docs or pages as sources.**
- No sources is fine for an opinion post. Just delete the `sources:` block.

### Categories (pick one)
`Agents` · `Health data` · `Inside Waldo` · `Patterns` · `Connectors` · `Privacy`

> A move to four categories (Agents & work · Body & health · Inside Waldo · Launches) is proposed in [pages/blog.md](pages/blog.md). Once approved, the list updates in `lib/blog-posts.ts` (`BLOG_CATEGORIES`) and in each post. It's a two-minute change.

### Authors (pick one)
`team` · `team-health` · `team-brand` · `team-continuity` · `team-connectors` · `team-privacy`

> Adding a real person (name, role, one-line bio, photo) is one entry in `BLOG_AUTHORS` in `lib/blog-posts.ts`. Real names are recommended (see pages/blog.md).

---

## Art

Every post needs one hero illustration.

| Spec | Value |
|---|---|
| Size | **1536 × 1024** (3:2) |
| Format | `.webp`, under 300 KB |
| File | `public/assets/blogs/<slug>.webp` |
| Style | Match the existing six: warm off-white background, black ink line drawing, one orange accent, the Dalmatian somewhere in the scene, quiet and editorial. No text in the image. |
| Credit | `artCredit:` line, e.g. "Waldo, made with OpenAI" |
| Alt text | `imageAlt:` describes what's in the picture, for people who can't see it |

**Tip:** Keep the prompt used for each image in the backlog entry, so the series stays consistent.

## Audio (optional)

A read-aloud version adds the listen button.
- File: `public/assets/blogs/audio/<slug>.m4a`
- Add the line `audio: /assets/blogs/audio/<slug>.m4a` to the top block
- **Ask Suyash** how the existing six were recorded, so new ones match

---

## Review checklist (Suyash, before publishing)

- [ ] Answers one clear question in the first two paragraphs
- [ ] Headline is two lines, the second shorter, and says something
- [ ] No banned words, no exclamation marks, no medical claims
- [ ] Every number has a source or comes from AGENTS.md Part 3
- [ ] Sources are external and real, and every link works
- [ ] Waldo appears once, late, lightly
- [ ] The aside lands
- [ ] Image matches the series, alt text is written
- [ ] Reads well on a phone (check the preview link)
- [ ] Anything it says about Waldo is true today, and doesn't promise features that aren't built

## After publishing

- [ ] Share on X and LinkedIn, with the hero image and the dek
- [ ] If it's a **launch** (Kennel, a connector, a new surface): link it from that product's page
- [ ] If it's a **connector launch**: it also goes in "Latest launches" on `/connectors`
- [ ] Add it to the backlog as done, with the date

---

## Cadence

**One post every two weeks.** Keep 2–3 outlines ready in the backlog, so a busy week doesn't break the rhythm.

---

## Where things live

| Thing | Location |
|---|---|
| Posts | `content/blogs/*.md` |
| Template | `content/blogs/_TEMPLATE.md` |
| Images | `public/assets/blogs/` |
| Audio | `public/assets/blogs/audio/` |
| Authors and categories | `lib/blog-posts.ts` (`BLOG_AUTHORS`, `BLOG_CATEGORIES`) |
| Topic list | [docs/website/blog-backlog.md](blog-backlog.md) |
| Page design | [docs/website/pages/blog.md](pages/blog.md) |
