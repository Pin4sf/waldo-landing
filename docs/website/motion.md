# Motion and spacing

How the site moves, and why it has almost no lines. Built 2026-09-28 on branch `site/scaffold`.

## Space instead of lines

- No lines between sections, table rows, list items, questions, or footer blocks. Big gaps separate them instead.
- The menu bar has no bottom line. It's see-through at the top of the page. Once you scroll, it gets a soft, blurred background.
- Lines stay only on things you press or type into, where they show the edges: the outline button, filter chips, text fields, and the Products menu panel.
- The "draft" notice on legal pages is a light grey block, not an outlined box.

## Where the values come from

Every timing and curve was copied from linear.app's live site (its CSS files and its running animations), captured 2026-09-28. They live as tokens at the top of `components/site/site.css`, with Linear's own name beside each one.

| Token | Value | Linear uses it for |
|---|---|---|
| `--ease-out-quad` | cubic-bezier(0.25, 0.46, 0.45, 0.94) | Almost every hover and state change |
| `--ease-reveal` | cubic-bezier(0.25, 0.1, 0.25, 1) | Hero headline reveal |
| `--ease-spring` | a 30-step spring curve | Chat messages appearing in the product demo |
| `--motion-quick` | 0.1s | Menu links, header background |
| `--motion-chevron` | 0.12s | Accordion arrow |
| `--motion-button` | 0.16s | Buttons, underlines |
| `--motion-popup` | 0.18s | Dropdown menu, phone menu |
| `--motion-toast` | 0.175s | Small floating panels |
| `--motion-regular` | 0.25s | General transitions |
| `--motion-appear` | 0.3s | Message appear |
| `--motion-reveal` | 1s | Headline reveal |
| `--motion-dot` | 0.42s | Dots popping in |
| `--motion-sheet` | 0.5s | Side panel ("Features +") sliding in and out, and the page dimming behind it |
| `--ease-sheet` | cubic-bezier(0.32, 0.72, 0, 1) | The same side panel and its backdrop |
| `--motion-card-spring` / `--ease-card-spring` | 0.564s, a spring curve | Carousel cards growing on hover and shrinking on press. From tutundzhian.com (stiffness 380, damping 28), not Linear |

## What moves, and when

| Where | What happens | Values |
|---|---|---|
| Page headline (first screen) | Each line rises out of a blur, one after another. Then the body text, then the buttons | Fades in from 10px blur and 20% lower, over 1s. Line 1 starts at 400ms, and each piece is 100ms after the one before. Buttons come 250ms after the text (Linear's exact hero sequence) |
| Every other headline | Same rise, when it scrolls into view | Same values, starting at 0ms |
| Grids (feature columns, blog cards) | Items fade in from a slight blur, one after another | 0.3s spring, 2px blur, 33ms apart |
| Tables, lists, question groups, placeholders | Fade in from a slight blur on scroll | 0.3s spring |
| Status dots (connectors) | Pop in from small | Scale from 0.4, 0.42s |
| Menu bar | Gains its background after you scroll | 80% page colour + 20px blur, 0.1s |
| Menu links | Soft grey pill on hover | 8% ink fill, 0.1s |
| Products menu | Opens on hover or click. Grows in from 98%, shrinks out when closing. Arrow flips | 0.18s in and out. Arrow 0.12s |
| Phone menu | Fades in and out. The button reads "Close" while it's open | 0.18s |
| Buttons | Darken on hover, press down to 97% on click. The "→" leans 2px forward | 0.16s |
| Text links | Underline darkens and drops slightly | 0.16s |
| Filter chips | Grey on hover, press to 97%, fill when selected | 0.16s |
| Text fields | Border darkens on hover and on focus | 0.16s |
| Questions | Arrow turns down, the row grows open, and the answer fades in. Closing shrinks it back | Arrow 0.12s, height 0.25s, answer 0.3s spring |
| Waitlist: wrong or failed email | The form gives a tiny nudge, and the new headline rises in. What you typed stays | Nudge: 0.15s dip to 98% (Linear's own nudge) |
| Waitlist: success | The success headline rises in | Same rise, starting at 0ms |
| Connector request: sent or error | The message fades in, and on error the form nudges | 0.3s spring |
| Connector search | Tools that come back into the list fade in, and the count updates softly | 0.3s spring |
| Cookie notice | Grows in from 96%, and shrinks away when closed | 0.175s |
| Card carousels (every three-card row with pictures) | Scrolls sideways with soft snapping. With a mouse you can drag it: a drag counts after 4px, and on release it settles onto the nearest card if that card is within 65px. Cards rise 20px and fade in as they come into view, 80ms apart. On hover the picture frame grows to 101% (97% when pressed), the picture zooms to 104%, and a soft light follows the cursor | Rise 0.65s ease-out-quad. Spring 0.564s. Zoom 0.4s ease. The light eases 9% of the way to the cursor each frame, 22% white fading out at 60%. All from tutundzhian.com |
| Feature "+" rows (How it works) | The "+" darkens on hover. Clicking a name slides a panel in from the right while the page behind dims. Escape, the close button or a click outside slides it back out | Plus 0.16s. Panel and dimming 0.5s on Linear's sheet curve, both ways |
| Keyboard focus | A clear orange ring on anything you tab to | 2px, offset 2px (Linear's focus ring) |

## Rules

- Everything is off when a visitor's device asks for reduced motion. The page just appears.
- Nothing needs the animation to be readable. If the page script fails to start, everything shows after 3 seconds anyway.
- Two things are ours, not Linear's: the 2px arrow lean (it uses Linear's button timing), and applying the headline rise on scroll. Linear only does it on the first screen.
- Linear's accordion height timing wasn't visible in its code, so the question rows use its regular 0.25s speed.

## How to use it when building a page

- Headlines: use the `Header` block. It animates on its own (`as="h1"` plays on load, anything else plays on scroll). `reveal="none"` turns it off.
- Grids, tables, lists, questions: use the blocks. They already fade in.
- Anything custom: add `data-appear="self"` to fade a block in on scroll. For headline-style pieces, give the wrapper `data-reveal="view"` and each piece the class `site-rv` with `style={revealDelay(n)}`.
