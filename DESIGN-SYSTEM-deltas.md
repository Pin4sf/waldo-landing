# Design System Deltas: Bevel-Calibrated Proposals
**Date:** June 2, 2026  
**Status:** PROPOSAL ONLY (No token edits implemented)

This document contains proposed updates to the Waldo Design System based on a visual audit of `bevel.health` and the local landing page implementation on branch `codex/visual-updates`.

---

## 1. Hero Dome Geometry & Background Fit
Bevel’s background dome is a soft, non-distorting arc that scales gracefully. In our implementation, stretching the SVG with `object-fill` causes vertical distortion at tall viewports (especially on mobile `375px`).

*   **Current Token:** Hardcoded `object-fill` inside a `100vw` container.
*   **Proposed Token:** `object-cover` or a clean CSS `clip-path: ellipse(80% 50% at 50% 0%)` on the background canvas container to prevent aspect-ratio stretching.
*   **Proportion Proposal:** Set background canvas aspect ratio to `1440 / 720` (2:1 aspect ratio) rather than `1440 / 989` to ensure the dome is shallower and does not swallow the hero fold content on desktop viewports.

---

## 2. Floating Card Shadows and Radii
Bevel’s floating cards feel extremely premium due to high blur, low opacity shadows and micro-elevations.

*   **Current Token:**
    *   `shadow-card`: `0 1px 2px rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.05)`
    *   `shadow-floating-hero`: `0 22px 46px rgba(26,26,26,.16)`
*   **Proposed Bevel Calibration:**
    *   `shadow-floating-hero`: `0 20px 48px rgba(26, 26, 26, 0.08), 0 2px 8px rgba(26, 26, 26, 0.04)` (softer, less harsh contrast).
    *   `card-radius`: Keep `24px` for main floating action cards (e.g., The Brief), but use `16px` for small accessory tiles (e.g., Heart/Stress tiles) to avoid a clunky "bubbled" appearance.

---

## 3. Typographic Ladder Tuning
At narrow viewports (e.g. mobile 375px), the display heading size clamps to `2.25rem` (36px). This causes the manually tapered headline lines (`The first app that knows`) to wrap onto separate lines, destroying the taper shape.

*   **Current Token:** `display` = `clamp(2.25rem, 1rem + 5vw, 3.875rem)`
*   **Proposed Bevel Calibration:** `display` = `clamp(1.875rem, 1.2rem + 3vw, 3.875rem)`
    *   At 375px, this resolves to `30px`, which allows the longest line (`The first app that knows`) to fit inside a `343px` content box without browser-forced wrapping.
*   **Font Weights:** Standardize `label` and button text to `SF Pro Rounded` (500 weight) instead of using `Corben` (400) for buttons.

---

## 5. Nested-Box Enforcement (concentric corners · stroke · shadow)
**Status: IMPLEMENTED on `staging`.** Audit found the nesting rules (DESIGN-SYSTEM.md §4) were not being enforced. Enforced rules going forward:

*   **Shadows belong only on deliberately "floating" illustration elements.** Section shells, page cards, navbars, buttons, and any structural UI surface carry **no shadow**. Shadows are reserved exclusively for:
    *   **Phone / device mockups** (the physical frame that floats in an illustration)
    *   **Floating insight / data cards** positioned as "flying above" a visual stage (e.g. the InsightCard in the Brief stage, hero floating cards)
    *   **Fan-deck / stacked-card illustrations** used as product-feature visuals
    If you are unsure whether a card qualifies: if it exists to build a page layout (section wrapper, content card, nav pill, CTA button), it has **no shadow**. If it exists to *illustrate* a floating UI artifact in a visual, it may have a shadow.

*   **Concentric corners are mandatory:** `r_inner = r_outer − padding` (floor `8px`). If a large gap forces a tiny inner radius, **reduce the padding or collapse a tier** — do not keep large inner radii (that is what made corners "all look the same" / bulge outside the outer arc).
*   **Max 3 surfaces.** Do not stack `dark-panel → dark-card → inner` with 20px gaps. Collapse to a single outer container + one inner tier; add depth with spacing, not more tiers.
*   **Stroke placement — strict tier adjacency rule:** a 1px `border-[var(--border-default)]` stroke belongs **only** when two adjacent tiers meet (one tier apart). It is removed when tiers skip:

    | Pair | Gap | Stroke? |
    |---|---|---|
    | T1 + T2 | 1 step | **Yes** |
    | T2 + T3 | 1 step | **Yes** |
    | T3 + T4 | 1 step | **Yes** |
    | T1 + T3 | 2 steps (skip) | **No** |
    | T2 + T4 | 2 steps (skip) | **No** |
    | T1 + T4 | 3 steps (skip) | **No** |

    The stroke always goes on the **lighter surface** of the pair as a 1px inset border.

Fixes applied (June 3): Removed shadows from navbar pill, CTA button, all section shells, all structural page cards, connector icon circles, waitlist form. Kept shadows on PhonePlaceholder mockup, pattern-bubble floating pills, InsightCard floating stage element, FanStackCard illustration deck.

---

## 6. Typographic Logic Update (IMPLEMENTED on `staging`)

*   **Headline font:** `h1` and `h2` move from Corben to **SF Pro Rounded** (`--font-body`). Only the hero **`display`** token stays Corben — it is the one remaining Corben usage on the page.
*   **Letter-spacing:** standardised to **+0.01em (+1%)** on every token except `display` (which keeps its tight Corben `-0.02em`).
*   **Body line-height:** `body` → **1.3 (130%)** (was 1.5).

### Highlight logic (text emphasis)
Two axes, each moving **exactly one step** — never two:

1.  **Weight:** base text is regular **400**; a highlight is one step heavier → medium **500**.
2.  **Colour state:** text has three prominence states — `tertiary < secondary < primary`. A block sits at one state; a highlight jumps **one state up**. `tertiary → secondary`, `secondary → primary`, `primary → primary` (already top; weight-only bump).

Implemented as CSS: put a tone class on the block and `.hl` on the run.
*   Light surfaces: `tone-primary | tone-secondary | tone-tertiary`
*   Dark surfaces: `tone-d-primary | tone-d-secondary | tone-d-tertiary` (states are light: dim-grey → light-grey → near-white)
*   Helpers in `landing-primitives.tsx`: `<Highlight>` and `withHighlights("…*run*…")` (the `*…*` marks the highlighted run). Demonstrated on the Morning-Brief insight cards (base `tone-secondary`, metric highlighted to primary + medium).

---

## 4. Color Wash Restrictions (Accent Guard)
To preserve the "once-per-viewport" accent rule while matching Bevel's premium cleanliness:
*   **Current practice:** Floating cards mix multiple brand colors (green, orange, pink, cyan).
*   **Proposed rule:** Hero state transitions must update *all* active accent details in unison. When in "Form State", only orange highlights are visible; when in "Recovery State", only green highlights are visible. No static rainbow layouts should coexist in a single viewport.

---

## 7. Load-in / Progress Bar (carousel timing) — NEW COMPONENT
**Status: SPEC (to implement on `staging`).** Drives auto-advance timing and the transition state between carousel slides. This is a **sunken control** — it inverts the elevation ladder (the track recesses *below* its host) and therefore follows the sunken/T4 rules, not the floating-card rules.

### 7.1 Anatomy (3 parts)
1.  **Track** — the recessed groove. The full-width pill the fill runs inside.
2.  **Fill** — the committed progress, growing left→right, capped by a semicircle.
3.  **Head** — the soft lighter tip at the advancing edge (the pale orange cap in the reference). Represents the *live, in-motion* portion; not part of committed progress.

### 7.2 Surface logic (track = sunken, not floating)
*   The track is **one sunken step below its host**, mapped through the tier table: host `T2` → track `T4`; host `T1` → track `T3`. This is a **skip-one** relationship (the middle tier is skipped), which by §2 carries **no stroke**.
*   Depth comes from the tier drop, **not** a drop shadow. A sunken control **never** takes `--shadow-card` (that means "floating above the page" — the opposite of what a groove is).
*   **Light mode** needs help reading as recessed: add a top-edge **inset** shadow on the track only — `box-shadow: inset 0 1px 2px rgba(26,26,26,0.06)`. **Dark mode** does not: `T4 #171616` is already darker than every host tier, so the recess reads on tier alone — no inset shadow.
*   **No outer container card is required.** The reference's outer pill is just the host surface. If a bar *is* wrapped in its own card (e.g. a standalone status chip), that wrapper follows normal floating rules (T2-on-T3 → 8% stroke + soft shadow); the **track inside it still follows the sunken rules above.**

### 7.3 Radius & size
*   Track and fill are both **pill `999px`** — the fill's leading edge is a clean semicircle.
*   If ever nested in a padded wrapper, concentric rule still holds (`r_inner = r_outer − padding`), but at pill radii both resolve to fully-round.
*   **Heights:** Compact `4px` · **Default `6px`** · Prominent `8px`. Head length = **8% of track width**, floor `12px`.

### 7.4 Fill variants (this is the "different colors" logic)
The fill colour is a **variant token**, chosen by how much attention the bar should pull. The **track is always the sunken T4/T3 groove** regardless of variant — only the *fill* changes.

| Variant | Fill (light) | Fill (dark) | Head (fill @ opacity) | Use |
|---|---|---|---|---|
| **Accent** | `#FB943F` | `#FB943F` | fill @ **35%** | Only when the carousel **is** the one accent moment of its viewport. Spends the once-per-viewport accent budget (§1). |
| **Ink** ⟡ DEFAULT | `#1A1A1A` (Text-primary) | `#FAFAF8` (Text-primary) | fill @ **30%** | Everyday default. The neutral timer — does **not** spend the accent budget. Use this unless there's a reason not to. |
| **Neutral** | `#9A9A96` (Text-tertiary) | `#6B6B68` (Text-tertiary) | fill @ **40%** | Quietest. Background / secondary carousels where the timer should barely register against the groove. |

*   **Empty/unfilled track** is always the sunken surface (`T4` / `T3`), in **every** variant — the variant never recolours the groove.
*   **One accent per viewport still rules:** if an orange element already exists in the same fold (a Primary icon button, a flagging ring), the bar **must** be Ink or Neutral, never Accent.
*   Contrast guard: the Neutral fill (`#9A9A96`) on a light `T4 #E8E6E0` groove is intentionally low-contrast — that is correct for the "barely register" role. If the bar must stay legible at a glance, use Ink, not Neutral.

### 7.5 Head (advancing tip) logic
*   The fill is **solid** up to committed progress; the final `8%` (head) is a left→right gradient from solid → the variant's head opacity, marking the live edge.
*   Implement as a gradient on the fill, e.g. `linear-gradient(90deg, var(--bar-fill) 0%, var(--bar-fill) calc(100% - 8%), color-mix(in srgb, var(--bar-fill) 35%, transparent) 100%)`, masked to the fill width.
*   **`prefers-reduced-motion`: drop the head entirely** — render a solid fill that jumps between committed positions. No gradient tail, no continuous growth.

### 7.6 Continuous vs segmented
*   **Continuous (single bar):** one track; fill grows over the dwell duration, resets to 0 on slide change.
*   **Segmented (one short bar per slide, Apple-story style):** N tracks in a row.
    *   **Completed** slides = fill at **100%, dimmed to Neutral** (Text-tertiary) regardless of the active variant — done is quiet.
    *   **Active** slide = fills live in the chosen variant (Ink/Accent).
    *   **Upcoming** slides = empty sunken track.
    *   Tap a segment → jump to that slide (the segment is the control's hit target; min `44px` tap height even if the visual bar is `6px`).

### 7.7 States
*   **Filling** — fill width animates 0→100% over the dwell duration (linear), head visible.
*   **Complete** — fill at 100%, head collapses into the solid cap, then slide advances.
*   **Paused** (hover / focus-within / tab hidden) — fill width freezes, head dims to the committed opacity. Resumes from the frozen position, never restarts.
*   **Focus** — the interactive segment/bar takes the §2 focus treatment (Border `8% → 16%`), not an accent glow.

### 7.8 Motion
*   Fill growth = **linear** (it's a clock — easing would misrepresent elapsed time). Default dwell `6s` ⟡ DEFAULT.
*   Pause/resume + segment jump transitions use the system micro easing `cubic-bezier(0.19,1,0.22,1)` at `150ms`.
*   Honour `prefers-reduced-motion` per §7.5.

### 7.9 Proposed tokens
```css
/* sunken groove — resolved from host tier per §7.2 */
--bar-track-light: var(--surface-t4);   /* #E8E6E0 */
--bar-track-dark:  var(--surface-t4);   /* #171616 */
--bar-track-inset-light: inset 0 1px 2px rgba(26,26,26,0.06);
--bar-track-inset-dark:  none;
/* fill variants */
--bar-fill-accent:  #FB943F;
--bar-fill-ink:     var(--ink);            /* #1A1A1A / #FAFAF8 */
--bar-fill-neutral: var(--text-tertiary);  /* #9A9A96 / #6B6B68 */
--bar-head-opacity: 0.35;                  /* per-variant: accent .35 · ink .30 · neutral .40 */
/* geometry */
--bar-h: 6px;            /* compact 4 · default 6 · prominent 8 */
--bar-radius: 999px;
--bar-dwell: 6s;
```
