# Waldo Website — Working Docs

This folder is where the whole website gets planned before it gets built. Each page is fully written here first. Code comes after.

## Files

| File | What it holds | Status |
|---|---|---|
| [sitemap.md](sitemap.md) | Every page, the menu, the footer, the shared page template | Locked |
| [pages/home.md](pages/home.md) | Home page: live copy at the top, then the drafts behind it | **Built — copy review applied** |
| [pages/how-it-works.md](pages/how-it-works.md) | How it works (features) page: live copy at the top, then v4 notes and the full feature index | **Built — copy review applied** |
| [pages/kennel.md](pages/kennel.md) | Kennel for Mac page: live copy at the top | **Built — new hero from the copy review** |
| [pages/connectors.md](pages/connectors.md) | Connectors page: live copy at the top, plus the tool status list | **Built — copy review applied** |
| [pages/blog.md](pages/blog.md) | Blog index (live copy at the top) + article template + content plan + Motto reference | **Built** |
| [blog-system.md](blog-system.md) | How a post goes from idea to live, the writing guide, art spec, review checklist | **Live — in use** |
| [blog-backlog.md](blog-backlog.md) | Post ideas and their status | Ongoing — waiting on Shivansh's topics |
| [pages/why-waldo.md](pages/why-waldo.md) | Why Waldo, as a founder's note: live letter at the top, then the draft and layout notes | Built — **needs Suyash's own story** |
| [pages/support.md](pages/support.md) | Support: live copy at the top (quick answers, Kennel help, data and account, contact) | Built — **needs a real support email** |
| [pages/privacy.md](pages/privacy.md) | Privacy: live copy at the top, then the legal outline and compliance checklist | Built — **legal part needs a lawyer** |
| [pages/terms.md](pages/terms.md) | Terms: live copy at the top, then the legal outline | Built — **legal text needs a lawyer** |
| [pages/404.md](pages/404.md) | Page not found: live copy at the top | **Built** |
| [pages/waitlist.md](pages/waitlist.md) | Let Waldo in: live copy at the top (page, Kennel version, errors, success), then the confirmation email draft | **Built** |
| [dark-mode.md](dark-mode.md) | Dark mode: Kennel is always dark, everything else light (the site-wide switch was built, then dropped) | **Live — Kennel only** |
| [layout-linear.md](layout-linear.md) | Layout experiment: a Linear-style layout, compared with the current one | Rejected — removed, kept as a record |
| [copy-review.md](copy-review.md) | Copy review of every page against the older Codex copy, with options per block (★ = recommended) | **Applied — the ★ picks are live** |
| [type.md](type.md) | The three text levels on every page (label, title, body, with ink-and-medium emphasis), 20px body text, titles always two lines | **Live — in use** |
| [motion.md](motion.md) | Space instead of lines, and every animation on the site (values copied from Linear) | **Live — in use** |
| [hero-loop.md](hero-loop.md) | The moving picture under the homepage hero: tools in a wave, what they carry dropping into Waldo, his Overview card (in a phone) filling in underneath | **Built — one stream, card states waiting on matching copy** |
| [what-you-see-plan.md](what-you-see-plan.md) | The five-card "What you see of it" section after the hero: story, screens, carousel behaviour, fixture checks. Section 17: one kit for all the app screens | **Built, on the homepage (local)** |
| [sessions/](sessions/) | One log per working session: what was decided, what's open | Ongoing |

## Build status

**Scaffold built on branch `site/scaffold` (2026-09-28).** Every page uses one layout system in `components/site/` (menu, footer, section, header, grid, table, questions). There are no visuals yet: blank spaces are held for them, each described for designers. See [sessions/2026-09-28.md](sessions/2026-09-28.md).

**Minimal pass + motion (2026-09-28).** Divider lines removed site-wide, with space doing the separating. Hover, press, open/close, scroll-in and form-state animations were added using Linear's exact timings. See [motion.md](motion.md).

**Titles, pictures and feature panels (2026-09-28).** Every title fits in two lines at any width (see [type.md](type.md)). Pictures from the older build now fill most of the empty spaces: Kennel's own pictures, Home's illustrations, the footer scene, menu icons, tool logos and blog art. How it works lists its smaller features as Linear-style "+" rows that open a side panel. See [sessions/2026-09-28.md](sessions/2026-09-28.md).

## How this works

1. A page is written here first: its job, its sections and its copy.
2. Suyash reviews and marks it approved.
3. Only then does it get built, using the shared menu, footer and template in [sitemap.md](sitemap.md).
4. Every working session adds a log in `sessions/`.

## Open questions (carry forward until answered)

- **AGENTS.md is out of date.** As of 2026-09-25 the story is agent-first (one personal agent across work and life, health as context), following /why-waldo. AGENTS.md still says health-first and "no mention of AI or agents." It needs a rewrite, pending Suyash's go-ahead.
- **Quote cards on the live homepage** (Garry Tan, Andrew Chen, Josh Miller, Notion x Qualtrics, Anthropic). Each quote and number needs a checked source link before it goes anywhere. Proposed home for them: Why Waldo, not Home.
- **Menu button wording.** Proposed: "Let Waldo in →" everywhere. The live site uses "Early Access" and "Learn More".
- **Legal basics (blocks Privacy, Terms and Support):** company legal name and address, a lawyer to review, a real support email, a privacy / grievance contact, the data storage region and a data retention policy.
- **Pronoun for Waldo:** "he" (the live site) or "it" (AGENTS.md)? Pick one site-wide.
- **Cookie notice is inaccurate:** it says "essential cookies," but the site sets none. New wording is in pages/privacy.md A3.
