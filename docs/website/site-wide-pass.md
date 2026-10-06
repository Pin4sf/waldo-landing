# Site-wide pass: the rest of the site, made like the homepage

Status: **Built locally, 2026-10-04. For Suyash's review, not published.**

Suyash, 2026-10-04: "now the homepage is made as per my needs, with proper layouts, visuals, motion, etc. can you update the rest of the site based on that?"

## The rule for this pass

**The words stay as they are.** Every page's copy was already reviewed (see each page doc's "Live copy"). This pass only changes layout, pictures and motion, so each page looks and moves like the homepage. The homepage itself was not touched.

## What the homepage does, and every page now does too

| Homepage pattern | Where it is on the homepage | What changed on the other pages |
|---|---|---|
| Warm white page (#FAFAF8), picture frames with a hairline | Whole page | Every light page is #FAFAF8 now (it was #F4F3F0). Kennel stays dark, as decided before. |
| Centred titles | Hero, "You can't keep up", "Different hats", "Your context" | Every page opening and section title is centred. Question lists keep the homepage's left-aligned layout, and long reading (the Why Waldo letter, tables) reads left-aligned in a centred column. |
| Opening close to the menu | Hero | Every page opening sits closer to the menu, centred, like the hero (`Section size="open"`). |
| Centred, endless carousels where only the middle card moves | "You can't keep up", "Different hats" | Every carousel on every page is the centred, endless kind (How it works, Kennel, Blog). |
| One rounded box with the title inside and a picture rising out of its foot | "Your context. Your call." | New shared block, `Stage`. Kennel's hero and its four "how it runs" pictures, How it works' Connectors part, the Connectors professions picture. The picture rises out of the box when it scrolls into view. |
| White cards | Carousel cards | Short lists of points became white boxed cards (`Grid boxed`): How it works and Support jump links, Kennel's "stays home" and "part of Waldo", Connectors "You hold the keys", the Privacy and Terms short versions, Support's Kennel help, the 404 links. Linked cards are clickable as a whole and grow a touch on hover. |
| Pictures drawn in code that move when they're in view | Every carousel card | New moving pictures where slots were empty or where a table stood (below). They play only when in view, and only the middle card of a carousel plays (`use-live.ts`), like the homepage. |
| A centred close | The live close | Every other page ends on the same box with its title, line and button (`Close`). The homepage keeps its own live close. |

## New pictures

| Page | Section | Picture | Code |
|---|---|---|---|
| How it works | Done before you're up | The table became a carousel of six lock screens: The Brief, The Window, Prep, The Heads-Up, The Close (evening, dark) and The Adjustment (Friday). Each is Waldo's message arriving at that time of day. Same words as the table. | `components/site/day-moments.tsx` |
| How it works | Already fluent in your tools | The homepage's drifting tool tiles, rising out of a box | `connector-rows.tsx` (shared) |
| Kennel | Three things stop being your job | Card 1: Kennel's work board (`many-hands.svg`). Card 2: a contract with its checks (`intent-contract.svg`). Card 3, drawn in code: a contract and the five agents, each through your own subscription or key; the choice settles, you approve, it goes. | `components/site/agent-picker.tsx` |
| Connectors | Work Gmail. Personal Gmail. | Two Gmail cards, each with its day from 6am to midnight: work hours shaded, the blocks when Waldo works that inbox (two in work hours for work, only outside them for personal), and a marker running through the day. | `components/site/two-accounts.tsx` |
| 404 | Opening | The mascot, smaller, centred above the links | |

## Page by page

- **How it works:** centred opening with five white jump cards; Health carousel centred and endless (phone pictures in white frames); "+" feature rows centred; Day to day as lock screens; Connectors in a Stage; centred close.
- **Kennel (dark):** hero in a Stage with the app window rising out; carousels centred and endless; the four pictures each in a Stage; white cards; the open-source links in one centred row; questions as on the homepage; centred close.
- **Connectors:** centred opening; directory unchanged; the "reads what it needs" table stays (it's looked up, not scrolled); the two-accounts cards; professions picture in a narrow Stage with its table under it; "You hold the keys" as four white cards; centred close.
- **Why Waldo:** the letter is a centred column with a centred opening; it ends on the shared close ("One person. / One Waldo.", now a title).
- **Support:** centred opening with four white jump cards; questions as on the homepage; Kennel help as three white link cards (it was a table); contact centred.
- **Privacy, Terms:** centred opening and titles; the short versions as white cards; the detailed tables and lists stay.
- **Blog:** centred opening; "All notes" carousel centred and endless; shared close. Articles unchanged.
- **Let Waldo in:** the form in the homepage's box, everything centred. *Replaced 2026-10-05 by the amped-up page (Waldo's notifications, the sky, the pill form, the rising phone, questions): see [pages/waitlist.md](pages/waitlist.md).*

## The footer (2026-10-05)

Suyash: the dock illustration should be at the edge, the last part of the site with nothing below it; the links stay exactly as they are but sit in one container, right before the illustration, after the close.

- Order is now: the page's close, one box with every link, then the dock scene at the very bottom, flush with the page edge (checked: the scene's bottom is the page's bottom at desktop and phone widths).
- The box is white (#ffffff) with a hairline and the white-box corner, on the page's own background (#FAFAF8; nothing is tinted behind the footer). On Kennel's dark page it is Kennel's raised dark card, as the other white boxes are there. It holds the Waldo logo, the same four groups (Products, Company, Legal, Elsewhere) and the same "© Waldo" and "Let Waldo in →" row. The line under the logo ("One personal agent across work and life.") was removed at Suyash's request. No link was added, removed or renamed.
- The homepage's close band (the live build's cards) no longer has its own colour (it was #F4F3F0): it sits on the page's default #FAFAF8, like the footer around it. The cards are unchanged.
- The scene is shown as drawn: full width at its own height (1440 x 1060 on desktop), never cropped, squeezed or faded. It keeps its art-directed versions for phone, tablet and landscape, each shown whole.
- Code: `components/site/site-footer.tsx` and the "Footer" block in `components/site/site.css`.

## In the code

- `components/site/site-pages.css` (imported by `site-shell.tsx`): all the new styles.
- `components/site/blocks.tsx`: `Stage`, `StageImage`, `Close`, `Section size="open"`, `Grid boxed`.
- `components/site/feature-sheet.tsx`: `FeatureList center`.
- `components/site/site.css`: the #FAFAF8 page rule now covers every light page.

## Open

- How it works' Health carousel still uses the older phone screenshots. When the new app screens (the kit from "What you see of it") are final, swap them in.
- The empty slots that need Suyash (his photo on Why Waldo, the support email, the legal text) are still marked.
- The words inside the new pictures (the contract names, "Two blocks a day", "Handled, and two are waiting for you") are illustrative, like the homepage's. Check them against the product before launch.
