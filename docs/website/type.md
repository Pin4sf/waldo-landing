# Type — three levels

Status: **Live, 2026-09-28.** It applies to every page.
History: it started as four levels after [Apple Newsroom](https://www.apple.com/newsroom/2026/09/apple-advances-health-and-fitness-capabilities-using-apple-intelligence/) (label, title, subtitle, body). Later the same day the subtitle level was dropped (see below).

## The rule

Suyash: "structure it in title, subtitle and body format only … try to have only 3–4 hierarchies all around a page." Then: "i dont like this type of subtitle … get rid of them, and replace them with the normal text. wherever there is a need of emphasis, use #1a1a1a and medium weight." And: "make sure the body text maintain 20px … on desktop, 130% line height."

Every piece of copy is one of three things. Nothing else: no subtitles, no asides, no notes, and no "A · B · C" lists.

| Level | Looks like | Used for |
|---|---|---|
| **Label** | 12.8px, grey (it was 13.5px, then 12px) | The small word above a title ("Health"), categories, dates, table headings, question groups, footer headings, small print (form consent, counts) |
| **Title** | Mottle, 28.8px to 36px (same as the hero) | Page and section headlines. One size everywhere, including blog article titles |
| **Body** | 16px everywhere (same as the hero; it was 17.1px, then 15px), 140% line height, +0.02em, grey #6B6B68 | Everything else |

**Emphasis** inside body text is `#1A1A1A` (ink) and medium weight. Use it for:
- the names of columns, items and features
- the first line of a card
- questions
- letter chapter headings and pull quotes
- blog section headings
- the one line of a side panel

Buttons, the menu and the footer links are controls, not copy. They use the label size.

## Titles are always two lines (or one)

Suyash, 2026-09-28: "make sure the titles fit in 2 lines."

- A title is written as one or two lines, and **each line always stays on one line**. It never wraps into a third.
- The title size (28.8px to 36px) comes down only as much as the longest line needs to fit the screen. On a normal phone most titles stay at 32px. The longest lines end up around 24px.
- To keep titles large on phones, keep each line short. Up to about 20 characters stays at full size on a 390px phone. The site's longest line today is "Co-ordinating your data with AI" (32), which stays at about 23px on a 390px phone.
- Phones now have a 24px edge on each side (it used to be about 48px), which gives titles and text more room.
- How it works in the code: `titleFit()` in `lib/title-fit.ts` measures each line using a table of Mottle letter widths (measured in the browser), and the title's CSS uses that to pick the size. Blog article titles and the side panel titles use it too. Long feature names in the side panels are split over two lines.
- Three blog titles get small on phones (about 19–22px): the Dalmatian post, the data post and the "explain your job" post. Shorter title lines would fix it.

## How a block is written

```
Label      (optional)  Health
Title                  Your health, / without the homework.
Body                   Health apps hand you charts and a score, then leave the reading to you. … You have better things to memorise.
Buttons    (optional)
```

- **Body** under a title is one paragraph. What used to be the subtitle comes first, and the short line that followed it is joined on the end.
- Columns and cards: label (optional), name (emphasis), first line (emphasis), text (body).
- The Home problem cards have no names. The first line leads.

## In the code

- `Header` block (`components/site/blocks.tsx`): `label`, `lines` (title), `subtitle`, `body`, `actions`. `subtitle` and `body` are joined into one paragraph of body text. The old `eyebrow`, `lead`, `aside` and `note` are gone.
- CSS (`components/site/site.css`): `--type-label`, `--type-title`, `--type-body`, `--body-leading` (1.3). Classes: `.site-label`, `.site-heading` (title), `.site-text` (body; `<strong>` inside it is the emphasis), and `.site-note` (small print, label-sized). `.site-subtitle` and `--type-subtitle` are gone.
- Blog articles are mapped to the same three levels in `site.css`: category and date → label, headline → title, dek → body, section headings → body with emphasis, text → body.

## What changed on the pages (2026-09-28)

- Every old "lead" line became the **subtitle** (larger and dark), and every old "aside" became the **body**.
- The "·" lists became sentences:
  - Kennel hero: "It's free, open source and in open beta. It runs on your Mac, and works with Codex, Claude Code, Cursor, OpenCode and Pi."
  - Connectors hero: "13 tools work today and 13 are coming next, growing to 200+ across 27 categories." (The counts update as the list changes.)
  - Home and Kennel surface columns: the labels are now "Open beta" and "Coming soon" only.
  - Blog cards: the category and date are stacked label lines, and the reading time is gone. The card body is the dek.
  - Why Waldo byline: "Founder, September 2026".
  - Phone menu: "Waldo for iPhone (coming soon)".
- Notes became subtitles or body text: How it works → Talk to Waldo ("Talk to it on Telegram and the web today…"), and the blog's "All notes" and closing section.
- Why Waldo ends with "One person. One Waldo." as a subtitle above the buttons.
- The announcement strip ("Kennel for Mac is in open beta") now sits **under** the menu bar, not above it.
- The page docs in `pages/` still show the older structure (asides and notes). **The built pages are now the reference for structure.**
- Later the same day, every page doc got a **Live copy** section at the top, written in these four levels. That section is where to read and edit the words.


## White boxes (2026-10-01)

Every `#ffffff` container shares one shape, set by tokens at the top of `site.css`: `--box-radius` 30px, `--box-corner` a squircle (`corner-shape: superellipse(1.6)`, about Figma's 60% smoothing; browsers without it show a plain 30px radius), and `--box-pad` 10px between the edge and what the box holds. What it holds is rounded one step less (`--box-inner-radius`, 20px). Today that covers the trust section box (`.site-box`), the picture frames in every card row (`.site-visual--plain`) and the side panel (`.site-sheet`). New white containers should join the shared rule at the end of `site.css`.
