# Dark mode

Status: **Kennel only, 2026-09-28.** The Kennel page is always dark. Every other page is always light. There's no switch, and the site ignores the device's light/dark setting.

## What happened

1. A site-wide dark mode was planned, then built: it followed the device, and a System · Light · Dark switch sat in the footer. Its colours came from the live Kennel page.
2. Suyash: "lets ditch this, keep kennel dark constantly and continue light mode for everything else."
3. So the switch, the device-following and the start-up theme script are gone. What's kept:
   - **The Kennel colour tokens** (`app/globals.css`, `[data-theme="dark"]`). Only the Kennel page uses them, through `<SiteShell theme="dark">`.
   - **The Kennel dark adjustments** (`components/site/site.css`, "Dark pages"): an off-white main button, a deeper menu shadow, and the cookie notice as a dark card. The area behind the page goes dark too, when a trackpad bounces past the top or bottom.
   - **The Kennel page's phone browser bar is dark** (`#111111`). Every other page's bar is light (`#F4F3F0`).
   - **The light-mode contrast fix.** The darker greys and ink links stay site-wide.
4. **Checked:** Kennel is dark and every other page is light, whether the Mac is set to light or dark. All text passes contrast (Kennel in dark, everything else in light).

The rest of this file is the record of the site-wide version.

---

## What was decided

Suyash: "use the colours found on the latest kennel page and go ahead with the rest."

| # | Decision | Outcome |
|---|---|---|
| 1 | When dark turns on | Follows the device, plus a **System · Light · Dark** switch in the footer |
| 2 | Which dark colours | **The live Kennel page's** (heywaldo.in/kennel), replacing both earlier sets. See the table below |
| 3 | Which orange | Unchanged for now (`#FB943F`, what the site uses). It's still open, because AGENTS.md and Brand Standards say `#F97316` |
| 4 | Kennel page | Follows the same setting as every page |
| 5 | Where the switch lives | Footer only |
| — | Light-mode contrast | Small print uses the body grey, and both light greys are darker so everything passes (see Still open → Fixed) |

## The Kennel dark palette (as built)

Measured from heywaldo.in/kennel. It lives in `app/globals.css` under `html[data-theme="dark"]`.

| Token | Used for | Dark value | Kennel source | Contrast on the page |
|---|---|---|---|---|
| `--surface-t3` | Page | `#111111` | Page background | — |
| `--surface-t2` | Panels, text on light buttons | `#161616` | Panels | — |
| `--surface-t1` | Raised: menus, inputs, cookie notice | `#1A1A1A` | Cards | — |
| `--surface-t4` | Strongest tint (avatar spot, tracks) | `#232323` | — | — |
| `--ink` | Headlines, main text | `#FAFAF8` | Off-white text | 18.1:1 |
| `--text-secondary` | Body text | `#9D9D9C` | Off-white at 60% | 7.0:1 |
| `--text-tertiary` | Labels | `#868685` | Off-white at 50% | 5.2:1 |
| `--text-disabled` | Disabled | `#575756` | — | — |
| `--border-default` | Field and chip edges | white at 8% | Kennel's lines | — |
| Main button | "Let Waldo in →" | `#E6E6E4` → `#FAFAF8` on hover | Off-white button | 14.5:1 |

**Checked:** every text element on all 12 site pages (including a blog article and the 404) passes in dark (4.5:1 for small text, 3:1 for large).

## What was built

- **Start-up script** (`app/layout.tsx`) applies dark before the page draws, from the saved choice or the device setting. Tested: the page is already dark before its content starts rendering, so there's no white flash.
- **Footer switch** (`components/site/theme-switch.tsx`): System · Light · Dark. "System" follows the device live. The choice is saved in the browser only (no cookie). Switching is instant, with transitions paused for a moment.
- **Phone browser bar colour**: `#F4F3F0` in light, `#111111` in dark.
- **Dark-only adjustments** (`components/site/site.css`): an off-white main button that brightens on hover, a deeper menu shadow, the cookie notice as a raised dark card (instead of turning white) with a light "Got it" button, and blog illustrations dimmed to 90% so the light artwork doesn't glare.
- **Light-mode small print** (`.site-note`, status labels like "Working today", and menu notes like "Open beta") moved from the faint grey to the body grey.
- Mottle stays at its normal weight in dark, as it does on the Kennel page.

## Still open

- ~~Light-mode labels too faint~~ **Fixed 2026-09-28.** The light greys are darker: body `#6B6B68` → `#5E5E5B` (5.9:1), labels `#9A9A96` → `#6F6E69` (4.6:1). Blog article links are now ink with an orange underline (orange text was 2.0:1), and the current chapter in "On this page" is ink (its orange rail stays). All 12 pages pass in light and dark.
- **Orange:** `#FB943F` or `#F97316`?
- **Brand Standards V2** (in the product repo) still lists `#1A1A1A` / `#242424` for dark. Update it to the Kennel palette.
- **Visual pass:** dark-friendly mascot, footer scene, rings (the Brand Standards dark zone colours) and Kennel screenshots.
- The old pages outside the new site (`/home`, `/design-system`) also switch to dark (the tokens are shared), but they weren't designed for it. They're not linked from the site.

---

# The original plan (kept for reference)

## The short version

- The site follows the visitor's device: dark if their phone or laptop is set to dark, light if not.
- A small switch in the footer lets anyone pick **System · Light · Dark**. The site remembers the choice.
- Dark is warm near-black, never cool grey and never pure black. Orange stays orange.
- It covers every page in the new site: the menu, footer, all pages and blog articles.
- Most of the work is already done by design. The site is built on colour tokens, so switching the tokens switches almost everything. The rest is a short list of hand-set colours, the images, and a contrast fix.

---

## Decisions for Suyash

| # | Question | Options | Recommendation |
|---|---|---|---|
| 1 | When does dark turn on? | a) Follow the device, plus a switch · b) Switch only, light by default · c) Always dark (like Linear) | **a.** It respects what people already chose, and the switch covers everyone else |
| 2 | Which dark colours? | a) The warm set already in the site code (`#1C1B1A` page, `#272725` raised) · b) Brand Standards V2 (`#1A1A1A` page, `#242424` surface) · c) The old Kennel page's `#111111` | **a.** Brand Standards says "every surface is warm near-black, nothing is cool grey," but its own hex values are neutral grey. The code set is the warm one. Then update Brand Standards to match |
| 3 | Which orange? (This affects light mode too) | `#FB943F` (the site today) · `#F97316` (AGENTS.md and Brand Standards) | Pick one site-wide. Both read well on dark (7.7:1 and 6.1:1) |
| 4 | Kennel page | a) Follows the same setting as every page · b) Always dark, as the old page was | **a.** One website, one rule. Its screenshots get dark versions in the visual pass |
| 5 | Where does the switch live? | Footer only · footer + menu | **Footer only.** It's a preference, not navigation. It keeps the menu short |

---

## The colours

Every colour on the site comes from a token. Dark mode swaps the token values. The site code already defines most of these (`app/globals.css`, `html[data-theme="dark"]`); **bold** marks what changes or is new.

| Token | Used for | Light | Dark | Dark contrast on the page |
|---|---|---|---|---|
| `--surface-t3` | Page background | `#F4F3F0` | `#1C1B1A` | — |
| `--surface-t2` | Text on dark buttons, soft panels | `#FAFAF8` | `#1D1D1B` | — |
| `--surface-t1` | Raised: menus, inputs | `#FFFFFF` | `#272725` | — |
| `--surface-t4` | Deepest tint | `#E8E6E0` | `#171616` | — |
| `--ink` | Headlines, main text, primary buttons | `#1A1A1A` | `#FAFAF8` | 16.5:1 |
| `--text-secondary` | Body text | `#6B6B68` | `#9A9A96` | 6.1:1 |
| `--text-tertiary` | Labels, notes, small print | `#9A9A96` | **`#8A8984`** (today `#6B6B68`) | **4.9:1** (today 3.2:1, too faint) |
| `--accent` | Focus ring, quote rule | `#FB943F` | unchanged | 7.7:1 |
| Hover fill | Menu pills, chips | 8% ink | 8% ink (becomes a light tint on its own) | — |
| Menu bar after scrolling | | Page colour at 80% + blur | Same rule, dark page colour | — |
| Primary button | "Let Waldo in →" | Black with light text | **Off-white with dark text** (Linear's approach) | 16.5:1 |
| Primary button hover | | A little darker | **A little lighter** (already set up) | — |
| Status dots | Working today / Coming next | `#22C55E` / `#F59E0B` | unchanged | — |
| Shadows | Menus, cookie notice | Soft | Deeper (already set up) | — |

**Found while planning:** the light-mode tertiary grey (`#9A9A96` on `#F4F3F0`) is only **2.5:1**, which is too faint for small text in either mode. A grey that passes (about `#6F6E69`) is almost the same as the body grey, which would flatten the hierarchy. Proposed: keep tertiary for things that don't need reading (decoration, counters), and use the body grey for small print people must read (form notes, legal notes). This is its own fix, and it applies to light mode today.

---

## What changes, piece by piece

**Set-up (once)**
- The start-up script that already runs before the first paint (it switches on the animations) also applies the saved theme, so the page never flashes white in dark mode.
- `color-scheme: dark`, so scrollbars, text fields and autofill turn dark too.
- `theme-color` for phone browsers, so the browser bar matches (`#F4F3F0` light, `#1C1B1A` dark).
- Change the dark tertiary grey to `#8A8984`.

**Things with hand-set colours (need a dark value)**
- The Products menu shadow (currently a fixed light-mode shadow).
- The cookie notice. Today it's a black card on a light page. In dark mode, a black card would disappear, so it becomes a raised `#272725` card with light text, not an inverted white card.
- The dashed placeholder boxes and the draft notice. They use ink tints, so they should adapt on their own. Check them.
- The Mottle headlines. Light text on dark looks heavier than dark on light, so try weight 460 → about 430 in dark, and judge by eye.

**Pages**
- All the new-site pages use the shared blocks, so they switch on their own. Each still gets a pass on laptop and phone.
- Blog articles: the article styles already have some dark rules. The cover illustrations have light backgrounds, so keep them as they are, with rounded corners, and check whether a slight dim looks better. Check the audio player, table of contents and code blocks.
- Waitlist and the connector request form: fields, errors, and the success state.
- Old pages outside the new site (`/home`, `/design-system` and others): not included.

**The visual pass (later, with the pictures)**
- The mascot and the footer scene need dark-friendly versions. The time-of-day footer gradient already has a natural night version.
- The Recovery, Form and Weight rings use the dark zone colours from Brand Standards V2 (Peak `#064E3B` / `#6EE7B7`, and so on).
- The Kennel app screenshots get dark versions.
- Social share images stay as they are (they aren't themed).

---

## The switch

- In the footer, next to the copyright: **System · Light · Dark**, as a small pill with three options.
- "System" is the default, and it follows the device live: if someone's laptop turns dark at sunset, the page follows.
- The choice is saved in the browser (no cookie, no account), so the cookie notice stays true.
- Switching is **instant**, with no colour fade. Fading every colour at once makes the page ripple unevenly, and Linear switches instantly too. Animations are paused for that moment, so buttons and links don't each fade on their own.

## For reference: Linear

Linear's marketing site is dark only: page `#08090A`, text `#F7F8F8`, body `#8A8F98`, labels `#62666D`, lines at 8% white. Its colours are cool and blue-grey, and ours stay warm, so we don't copy them. What we take is the approach: an off-white primary button on dark, faint white tints instead of lines, and an instant switch.

---

## Build steps

1. **Foundation** (small): the start-up script, the colour fixes, `color-scheme`, `theme-color`, and the footer switch. After this step the whole site can be switched.
2. **Page pass**: every page in dark, at 1280px and 375px. Fix what stands out, and run a contrast check on all text.
3. **Visual pass**: dark versions of the mascot, footer scene, rings and Kennel screenshots. This happens with the wider visual pass.

## How it gets checked

- Every page, in light and dark, at laptop and phone width.
- No white flash on load in dark mode, including on a slow connection.
- All readable text passes 4.5:1 (large headlines 3:1).
- The menu, dropdown, phone menu, questions, forms, errors, cookie notice and the theme switch work in both modes.
- Reduced motion still turns off all animation in dark.

## Open questions

- Decisions 1–5 above.
- The light-mode tertiary grey fix: approve the proposed rule?
- Should dark mode wait for the visual pass, or ship first with the current blank picture spaces?
