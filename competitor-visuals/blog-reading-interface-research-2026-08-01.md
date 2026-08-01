# Waldo blog reading interface research

**Date:** 2026-08-01
**Status:** Researched and implemented in the Waldo landing repository.
**Source standard:** First-party live pages, the current `waldo-landing` repository, and the linked `waldo-brain` branch at commit `5af47d37127652b07aee0aef757ef1e353b675c8`.

## Executive recommendation

Waldo should not copy one blog.

The strongest practical combination is:

- **Linear** for the archive shell and quiet product-led art direction.
- **Anthropic** for calm, evidence-rich explanatory articles.
- **LessWrong** for long-form orientation and footnotes.
- **Apple Machine Learning Research** for dated corrections, captions, and provenance.
- **OpenAI** for a compact table of contents and reader utilities.
- **Vercel** for terminal and code treatment in the CLI-agent article.
- **Hugging Face Papers** for source packets and future discovery, not for the initial visual style.

In one line: **Linear's restraint + Anthropic's explanations + LessWrong's orientation + Apple's provenance, expressed in Waldo's own warm visual language.**

The initial library contains only six roughly six-minute articles. It does not need search, voting, comments, rankings, a chatbot, or a complex taxonomy. It needs a compelling archive, an unusually comfortable reader, and credible handling of sources and updates.

## What was inspected

This pass examined both archive/discovery and article-reading states. Observations are based on live rendered pages and accessible page structure where available.

| Reference | Best at | First-party evidence |
|---|---|---|
| LessWrong | Deep reading orientation and durable archives | [Article](https://www.lesswrong.com/posts/mrGeJ4Wt66PxN9RQh/lw-update-2018-12-06-table-of-contents-and-q-and-a), [TOC rationale](https://www.lesswrong.com/posts/mrGeJ4Wt66PxN9RQh/lw-update-2018-12-06-table-of-contents-and-q-and-a), [recommendation system](https://www.lesswrong.com/posts/PfceWjEqdRDvGkKZ8/recommendation-features-on-lesswrong-1) |
| Hugging Face Papers | Search, provenance, compact source actions, related work | [Daily Papers](https://huggingface.co/papers), [paper detail](https://huggingface.co/papers/2607.28618) |
| Anthropic Research | Calm editorial trust and figure-led explanation | [Research archive](https://www.anthropic.com/research), [long-form article](https://www.anthropic.com/research/global-workspace) |
| Linear Now | Brand-forward archive and restrained article shell | [Now archive](https://linear.app/now), [article](https://linear.app/now/output-isn-t-design) |
| OpenAI Research | Long-article utilities and nested section navigation | [Research index](https://openai.com/news/research/), [FrontierScience article](https://openai.com/index/frontierscience/) |
| Apple ML Research | Corrections, numbered figures, anchored headings, related updates | [Archive](https://machinelearning.apple.com/), [updated research article](https://machinelearning.apple.com/research/apple-foundation-models-2025-updates) |
| Vercel Blog | Technical article affordances | [Blog archive](https://vercel.com/blog), [design-engineering article](https://vercel.com/blog/design-engineering-at-vercel) |
| Stripe Developer Blog | Machine-readable article utilities and technical metadata | [Engineering archive](https://stripe.dev/blog/topic/engineering), [Markdoc article](https://stripe.dev/blog/markdoc) |
| Every | Strong metadata, update markers, listen/share controls | [Extendable Articles](https://every.to/on-every/introducing-extendable-articles) |

## Reference findings

### 1. LessWrong: the best deep-reading mechanics

**Observed**

- Desktop articles use a narrow serif reading column with substantial white space.
- Long posts expose a persistent left-side table-of-contents rail; LessWrong explicitly describes the goal as helping readers orient and making complex posts easier to skim.
- Article metadata includes author and date, while the wider system supports tags, sequences, comments, ratings, archives, and continuing to related material.
- Footnotes and comments turn a post into a durable knowledge object rather than a disposable marketing page.

**Useful for Waldo**

- A compact desktop TOC for the six drafts, each of which has six or seven sections.
- Numbered footnotes with return links.
- Clear “more in this series” navigation.
- Progress without gamification: show where the reader is, not how well they are doing.

**Do not copy**

- Voting, karma, comments, dense community chrome, or multiple recommendation feeds.
- Its information density is appropriate for a mature knowledge community, not a six-post product publication.

### 2. Hugging Face Papers: the best discovery and provenance packet

**Observed**

- The archive combines prominent search with Daily, Weekly, and Monthly views, date navigation, ranked cards, submitter identity, and community signals.
- A paper page presents the canonical identifier, publication and submission dates, authors, rank, abstract, arXiv/PDF/project/GitHub actions, collections, discussion, related papers, and downstream models/datasets/spaces.
- It includes `Copy markdown` and a CLI command for opening the paper in an agent workflow.

**Useful for Waldo**

- For privacy, body-data, and technical posts, create a compact “Sources and notes” packet with canonical links and dates.
- Add Copy link immediately; consider a plain Markdown representation later.
- When the archive is substantially larger, add search and date/topic views.

**Do not copy**

- Popularity ranking, community reaction counts, or its dense research-database layout.
- It is excellent for deciding what to read, but not the model for reading narrative prose.

### 3. Anthropic Research: the best editorial baseline

**Observed**

- The archive opens with a simple research statement, team/topic routes, featured pieces, then a searchable Date–Category–Title list.
- A long-form article begins with topic, title, date, and one primary source action.
- Body copy is a comfortable serif at roughly 17px with generous line height; at a 390px viewport it retained 32px side gutters and no horizontal overflow.
- Figures are frequent and carry descriptive captions. Claims link directly to papers, code, demos, and external commentary.
- The article includes caveats and related content rather than ending in a hard product CTA.

**Useful for Waldo**

- The overall reading temperament: quiet, warm, explanatory, and confident.
- One strong primary evidence action near the title.
- Let diagrams and real Waldo artifacts interrupt a focused prose column.
- Treat caveats as part of credibility, particularly in health-adjacent and privacy writing.

**Missing there, worth adding here**

- Read time, visible author/update metadata, and a compact TOC.

### 4. Linear Now: the best archive shell

**Observed**

- `Now` unifies product launches, team writing, changelog, community, press, and an archive without making the page feel like a content warehouse.
- The archive uses a clear category row, art-directed feature cards, concise summaries, author/date metadata, and a compact lower archive.
- On mobile the card grid becomes a clean single column while the category row stays horizontally available.
- The article shell is spare: breadcrumb, large title, one meaningful hero illustration, author/date, narrow 624px body measure, and Copy link.

**Useful for Waldo**

- Use this as the primary archive reference.
- One lead story, two secondary cards, then a compact dated list is enough for six posts.
- Give each post one art-directed artifact, not a generic stock thumbnail.
- Preserve a narrow reading column even when figures break wider.

**Do not copy**

- The dark palette. Waldo should retain its warm off-white and near-black system.
- A broad category system before there is enough content to justify it.

### 5. OpenAI: the best long-article utility layer

**Observed**

- Research pages include category/date/dek, a primary paper action, Share, and a nested table of contents.
- The FrontierScience article uses deep headings, interactive tabbed examples, figures, direct sources, and limitations.
- Other article templates expose a “Listen to article” control.

**Useful for Waldo**

- A compact sticky TOC on long posts and a collapsed “On this page” disclosure on mobile.
- Copy/share utilities that stay secondary to reading.
- Exactly two contextually chosen related pieces at the end.
- Audio can be a later enhancement, not a launch requirement.

**Do not copy**

- The large global product shell or duplicated visible navigation.

### 6. Apple ML Research: the best trust mechanics

**Observed**

- The archive separates highlights, publications, and events.
- Research articles show content type and date, use anchored headings, numbered figures and tables, and end with related readings and updates.
- Apple places a dated update note near the beginning when figures or evaluations change, explaining what changed and linking to the newer technical report.

**Useful for Waldo**

- A dated update/correction block is essential for health, privacy, connector, and product-capability claims.
- Numbered figures and visible captions should be first-class content, not decorative imagery.
- Sources should point to the evidence that owns the claim.

**Do not copy**

- The colder research-publication voice. Borrow the provenance system, not the personality.

### 7. Vercel: the best technical-post components

**Observed**

- Articles expose authors, category, date, read time, and Copy.
- H2/H3 headings include direct permalinks.
- Technical posts support filename-labelled code, copy controls, diagrams, captions, install commands, contributor credits, and downstream documentation.

**Useful for Waldo**

- Apply this selectively to `What a CLI agent actually is`: terminal blocks, filenames when relevant, copy affordances, and stable section links.
- Anchor every H2/H3 and expose its link on keyboard focus as well as hover.

**Do not copy**

- Product navigation and technical controls on articles that do not need them.

### 8. Stripe Developer Blog: the most agent-readable article packaging

**Observed**

- The current developer blog exposes a structured metadata panel with date, author, reading time, categories, share actions, `Copy for LLM`, and `View as Markdown`.
- Technical posts support code-copy controls, diagrams, links, author information, and topic archives.

**Useful for Waldo**

- Generate a clean Markdown representation and good structured metadata behind the scenes.
- Keep the reader human-first while ensuring articles are easy to cite, save, and consume through other tools.

**Do not copy**

- The terminal aesthetic or an explicit `Copy for LLM` control. Those belong to Stripe's developer identity and would turn Waldo into an AI brand.

### 9. Every: the best metadata header, with an important warning

**Observed**

- The header combines credited art, author identity, vertical, title, dek, publication date, read time, Updated date, Listen, Copy link, and social sharing.
- Its Extendable Articles expose the writer's source material.

**Useful for Waldo**

- A concise Published / Updated / read-time row.
- Optional audio later.
- A source drawer is a credible future enhancement for evidence-heavy posts.

**Do not copy**

- Paywall interruption, engagement counters, subscription pressure, or an article chatbot.

## Recommended Waldo information architecture

### Archive: `/blog`

For the initial six-post library:

1. One lead article with a wide, useful illustration.
2. Two secondary cards.
3. The remaining articles as a compact dated list.
4. Each entry contains only: topic/tag, title, one-sentence dek, published date, read time, and optional art.
5. RSS from day one.

Do not launch search, ranking, pagination, comments, or a complex filter system. Add search and no more than three durable collections only after the library reaches roughly 12–15 posts and actual browsing pressure appears.

The linked draft metadata contains `tags`; use them lightly. Do not expose internal `site_section` values as reader-facing labels.

### Article: `/blog/[slug]`

#### Header

- Lightweight breadcrumb back to Blog.
- Topic/tag.
- Deliberately line-broken Corben title, following Waldo's required tapered headline shape.
- One-sentence dek.
- Real author or team owner.
- Published date, Updated date when applicable, and calculated read time.
- Copy link. Social sharing can sit inside the same restrained menu.
- One meaningful hero artifact, or no hero at all. Never add decoration to fill a slot.

#### Reading body

- Warm `#FAFAF8` page and `#1A1A1A` text.
- SF Pro Rounded body at approximately 18px, 1.6–1.7 line height, and a 66–70ch measure.
- H2/H3 links with visible focus and hover affordances.
- Desktop: a minimal sticky rail with progress and TOC only when there are at least four H2s.
- Mobile: a collapsed “On this page” disclosure; never require hover.
- Figures may break out to approximately 1100px while body copy stays narrow.
- Meaningful alt text, visible captions, numbered footnotes with return links, and an explicit Sources and notes section.
- Tables become labelled card rows on narrow screens instead of tiny horizontally scrolling text.
- Terminal/code blocks get a filename or context label and Copy.
- Dated update/correction callouts stay near the top of the article.

#### Ending

- The article's restrained italic Waldo aside.
- Exactly two related-reading cards, chosen by series/topic rather than popularity.
- “All notes” or equivalent back-link to the archive.
- No hard waitlist interruption inside the prose. A quiet site-level CTA may appear after related reading.

### Mascot role

The mascot should remain functional and active within the landing-page rules: resting beside a source stack, following a visual trail, or watching the related-reading shelf. It should not become an author avatar, speech bubble, reaction icon, or decorative stamp.

## How the six drafts map to one reusable system

The six source files are unusually consistent in length and heading count, so one article template can serve them all while optional blocks supply different kinds of evidence.

| Draft | Approx. words | H2s | Best optional components |
|---|---:|---:|---|
| `01-what-is-a-cli-agent.md` | 1,179 | 7 | Terminal anatomy, copyable command block, small agent-loop diagram |
| `02-how-waldo-cares-about-your-health.md` | 1,157 | 6 | Source notes, evidence footnotes, body-to-day flow artifact |
| `03-why-a-dalmatian.md` | 1,236 | 7 | Illustration-led pacing, mascot studies with captions |
| `04-the-patterns.md` | 1,152 | 7 | Spot-to-Constellation diagram, time-series evidence |
| `05-connectors-and-professions.md` | 1,176 | 7 | Connector flow, profession examples, compact capability matrix |
| `06-what-we-actually-do-with-your-data.md` | 1,266 | 7 | Data-flow diagram, claim/evidence notes, dated update ledger |

Source directory: [Waldo blog series on GitHub](https://github.com/Pin4sf/waldo-brain/tree/claude/waldo-blog-strategy-djuoqz/01-Waldo/marketing/blog).

## Accessibility and performance baseline

- Server-render the article body. It must remain readable without client JavaScript.
- Include a skip-to-content link and a real `<article>` landmark.
- Maintain one H1 and a strict H2/H3 hierarchy.
- Provide visible keyboard focus and at least 44px touch targets for controls.
- Do not encode Recovery, Form, or Weight meaning by colour alone.
- Decorative mascot assets use empty alt text; explanatory figures use specific alt text plus captions.
- Respect reduced motion. The reader needs little or no continuous animation.
- Reserve media dimensions and lazy-load non-hero figures.
- Subset the two permitted brand families rather than loading unused weights.
- Preserve a clean single column on phones with no horizontal page overflow.

## Current Waldo constraints and publication blockers

### Confirmed in the linked blog source

- All six pieces are `type: draft` and were created/updated on 2026-07-28.
- The series index says the intended information-to-promotion ratio is approximately 70/20/10.
- The index leaves the byline unresolved: Waldo, the founders, or unsigned.
- The index contains a fact-check queue for external retention, burnout, and competitor claims.
- The drafts currently have no dek, hero, author, source-list, or explicit correction metadata.
- `02-how-waldo-cares-about-your-health.md` uses the title “Your health app is a mirror. Mirrors do not catch you.” The phrase `health app` is banned by the landing-page source of truth and needs a separate copy review before publication.

### Confirmed in `waldo-landing`

- There is no `/blog` route yet.
- `Blog` appears in the menu configuration but has no `href`, so it is intentionally disabled today.
- The current checkout has unrelated untracked skill directories; they were not touched.

### Typography drift to resolve before implementation

The supplied `AGENTS.md` and `DESIGN-SYSTEM.md` require Corben 400 for headlines and SF Pro Rounded for body/UI. The current app runtime maps the headline variable to Mottle, while a later design delta also describes a different headline allocation. Because the supplied `AGENTS.md` is declared canonical, this recommendation assumes **Corben + SF Pro Rounded**. Implementation should resolve the existing runtime drift explicitly rather than silently making the blog a third typography system.

## Decision summary

### Adopt now

- Linear-style archive hierarchy.
- Anthropic-style calm narrative and figure rhythm.
- LessWrong-style compact TOC and footnotes.
- Apple-style update notes, captions, and related evidence.
- Read time, Published/Updated metadata, Copy link, anchored headings, RSS, and exactly two related posts.
- One reusable article template with optional evidence components.

### Add later when usage justifies it

- Search and up to three durable collections.
- Audio.
- Plain Markdown view or source drawer.
- Richer series/reading-path navigation.

### Reject for launch

- Comments, likes, scores, rankings, badges, reading streaks, article chatbot, autoplay, newsletter interruption, hover-only controls, and decorative motion inside the reading flow.

## Confidence and open decisions

**High confidence:** The initial architecture should be a simple archive plus a single flexible reader. All six drafts fit it, and the reference interfaces converge on a narrow column, strong metadata, deep links, figures/captions, and related reading.

**Medium confidence:** Exact body width and TOC threshold should be tuned with the real SF Pro Rounded font and the longest existing title in-browser.

**Implementation decisions:**

1. “Waldo team” is the honest launch byline, paired with a topic-specific ownership lane and bio for each article.
2. Mottle is the current headline face, following the owner’s explicit override.
3. External and product claims are narrowed to the documented public boundaries and linked to owning sources.
4. Every launch article receives a generated hero artifact in the current Waldo illustration system.
