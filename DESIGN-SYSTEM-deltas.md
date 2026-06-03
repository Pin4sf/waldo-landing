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

*   **One shadow per stack, on the outermost card only.** A shadow (`--shadow-card`) means "floating on the page canvas." Nested/inner boxes get **no shadow** — depth comes from tier + stroke. What looked like "a shadow on every box" was the outer card's shadow halo plus tier strokes, not real per-box shadows.
*   **Concentric corners are mandatory:** `r_inner = r_outer − padding` (floor `8px`). If a large gap forces a tiny inner radius, **reduce the padding or collapse a tier** — do not keep large inner radii (that is what made corners "all look the same" / bulge outside the outer arc).
*   **Max 3 surfaces.** Do not stack `dark-panel → dark-card → inner` with 20px gaps. Collapse to a single outer container + one inner tier; add depth with spacing, not more tiers.
*   **Stroke placement:** 8% border on the *lighter (inner)* surface of an *adjacent-tier* pair; a tier-*skip* (e.g. dark island on light canvas) needs none. A `T2` card floating on the `T3` canvas carries **both** an 8% stroke and the soft shadow.

Fixes applied: Turn section dark stack collapsed `30/24/18` (20px pads) → single `24px` container, `12px` pad, `12px` inner (concentric, matches the left column). `Readout` dark tile `16px → 12px`. Problem section outer `T2` shell given its missing 8% stroke.

---

## 4. Color Wash Restrictions (Accent Guard)
To preserve the "once-per-viewport" accent rule while matching Bevel's premium cleanliness:
*   **Current practice:** Floating cards mix multiple brand colors (green, orange, pink, cyan).
*   **Proposed rule:** Hero state transitions must update *all* active accent details in unison. When in "Form State", only orange highlights are visible; when in "Recovery State", only green highlights are visible. No static rainbow layouts should coexist in a single viewport.
