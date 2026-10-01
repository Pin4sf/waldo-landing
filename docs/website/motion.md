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

## Card carousels: size (2026-10-01)

The cards in every sideways row keep one size across a whole range of window widths and change it in a few steps, as on tutundzhian.com (measured: 420x520 on a wide screen, 360x480 from about 1100px down to tablets, 300x420 on a phone). Making the cards grow and shrink with the window (first tried here, so that two cards and a peek always showed) was dropped: resizing the window now shows more or fewer cards instead.

| Window width | Card | Picture height | What shows near the bottom of the range |
|---|---|---|---|
| 1440px and up | 560px | 543px | two cards and 17% of a third at 1440px |
| 1200 to 1439px | 480px | 466px | two cards and 10% of a third at 1200px |
| 1024 to 1199px | 400px | 388px | two cards and 13% of a third at 1024px |
| 768 to 1023px | 400px | 460px | one card and most of the next |
| 520 to 767px | 440px | 427px | one card and 9% of the next at 520px |
| under 520px | 300px | 300px | one card and 17% of the next at 390px |

The gap is 20px (16px under 768px). It is `.site-carousel` in `site.css` and applies to every row that uses the carousel: the home page, Kennel, How it works and the blog.

## Card pictures: one moves at a time (2026-10-01)

Every moving picture in a card (the text thread, the three "hats" scenes, the weeks, the Mac notification) asks `useLive` (`components/site/use-live.ts`) whether it should be playing, instead of each deciding for itself. Of the pictures that show at least a third of themselves, the one nearest the middle of the window plays and the rest rest on their last frame; the one that is playing keeps its place unless another is at least 80px nearer the middle, so they do not swap back and forth while you scroll. Scrolling the page or a row of cards, resizing, or putting the tab behind another all re-decide. With reduced motion nothing plays. The hero's loop is separate (it is at the top of the page, a long way from any card).

## Card text sits inside the picture (2026-10-01)

In a sideways row, the words under a picture (the label, the title, the text, the link) are indented 8px from the left (5px on a narrow phone) and stop 9% of the card plus 8px short of the right edge, so a 400px card still has a 348px line, the area Suyash boxed on the 890px-wide screen, set a little further left than first built (it was 16px in). The gap between the picture and its words is 22px (it was 16px).
