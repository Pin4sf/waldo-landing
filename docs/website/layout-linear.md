# Layout experiment: Linear

Status: **Rejected and removed, 2026-09-28.** Suyash compared the two and kept the current layout. The code (the CSS block, the switch, and the Header wrappers) was deleted. This page stays as a record of what was tried.

## How to compare (no longer available)

- On any page in development, use the **Layout: Current / Linear** switch in the bottom-right corner. The choice is remembered in your browser.
- Or open any page with `?layout=linear` (and `?layout=current` to go back). This also works on a shared preview, for showing someone else.
- The switch never shows on the live site unless someone has opened a `?layout=` link.

## What Linear does (measured on linear.app: home, about, now, pricing, method)

| Pattern | Linear | Current Waldo layout |
|---|---|---|
| Page width | Nearly edge to edge: 46px sides, 1344px max | Narrow: 12.75% sides (163px at 1280) |
| Hero | One big headline (64px, 2 lines). A short, small description under it (15px, 2 lines). Lots of empty space on the right | Headline ~43px, a larger body (17px), and buttons |
| Section header | **Split in two.** Headline on the left half (48px). A bigger description on the right half (24px, slightly dimmer than the headline), then a "Learn more →" link | Headline, then the text stacked under it |
| Section spacing | 128px top and bottom | 88–160px, and many sections fill the whole screen |
| Feature columns | Picture first, with a tiny mono label ("FIG 0.1"). Then a small plain title (16px), then grey text | Title (headline font) → blank space → bold line → text |
| Labels | Small mono capitals for figures and dates | Small grey text |
| Long text (about page) | Heading on the left half, paragraphs in the right half | One narrow column |
| Questions / lists | Right half, next to the heading | Under the heading, narrow column |
| Last call to action | Centred headline (40px) with two buttons, lots of space around it | Left-aligned, like every other section |
| Footer | Logo column + 5 link columns, headings in full black | Brand column + 4 link columns, grey headings |
| Lines | Linear uses lines between sections and columns | We don't (our minimal pass). The experiment keeps it that way |

## What the experiment changes

1. **Wider page.** Content runs from 46px in on each side (max 1344px), like Linear.
2. **Hero:** headline up to 64px, a short 16px description, and buttons 40px below. More air above the headline.
3. **Section headers split in two:** headline left, description right (up to 24px). Headers with no description stay on their own.
4. **Sections 128px apart** instead of full-screen frames.
5. **Columns:** a picture slot comes first (a soft grey box labelled FIG 2.1, 2.2… by section and column). Then a plain 16px title (body font, not the headline font) and the text.
6. **Labels** (eyebrows, categories) in small mono capitals.
7. **Questions:** when a section has only a headline, the headline sits on the left and **stays in view** while the questions scroll on the right. Otherwise, questions and lists sit in the right half.
8. **Why Waldo:** the letter runs in the right half, and each chapter heading hangs in the left half, level with its first paragraph.
9. **The last call to action on each page is centred**, with extra space around it.
10. **Footer** headings in full black, with slightly smaller links.
11. Phones: everything stacks into one column, same as now.

## Things to decide

- **Width:** the wide Linear page or the current narrow one? The wide one feels more like a product. The narrow one feels more like a letter.
- **Split headers:** keep them? They make every section shorter and easier to scan.
- **Titles in columns:** plain body font (Linear) or Mottle (brand)? The experiment uses the body font. AGENTS.md says headlines use the headline font.
- **Picture slots:** grey boxes with FIG labels make the missing visuals obvious. Keep them as a placeholder style, or go back to blank space?
- **Mixing:** any single change above can be kept on its own. Name the ones you like.

## Where it lived (all deleted)

- CSS: the "Layout experiment: Linear" block at the end of `components/site/site.css`. Every rule starts with `html[data-layout="linear"]`, so deleting that block removes the experiment completely.
- Switch: `components/site/layout-switch.tsx`, plus a line in the start-up script in `app/layout.tsx`.
- The only shared change: the `Header` block now wraps its headline and its text in two containers (`site-header-title`, `site-header-text`) so they can sit side by side. The current layout looks exactly the same.
