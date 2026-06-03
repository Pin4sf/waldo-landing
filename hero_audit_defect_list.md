# Waldo Hero Audit & Prioritized Defect List (Updated)
**Date:** June 2, 2026  
**Review Version:** Commit `61598fd` ("Tighten hero mobile card visibility")  
**Branch:** `codex/visual-updates`

---

## Executive Summary & Visual Evidence
This updated audit tracks what was resolved in Codex's latest pass (commit `61598fd`) versus what defects remain open. 

### Capture Reference (Host Local Screenshots)
- **Bevel Health Hero:** ![Bevel Health Hero](/Users/suyashpingale/.gemini/antigravity-ide/brain/1c0c7b5e-2d01-48ad-9b7e-ea32d7b59730/bevel-hero.png)
- **Waldo Hero - Mobile (375px):** ![Waldo 375px](/Users/suyashpingale/.gemini/antigravity-ide/brain/1c0c7b5e-2d01-48ad-9b7e-ea32d7b59730/waldo-hero-375.png)
- **Waldo Hero - Tablet (768px):** ![Waldo 768px](/Users/suyashpingale/.gemini/antigravity-ide/brain/1c0c7b5e-2d01-48ad-9b7e-ea32d7b59730/waldo-hero-768.png)
- **Waldo Hero - Small Desktop (1024px):** ![Waldo 1024px](/Users/suyashpingale/.gemini/antigravity-ide/brain/1c0c7b5e-2d01-48ad-9b7e-ea32d7b59730/waldo-hero-1024.png)
- **Waldo Hero - Standard Desktop (1280px):** ![Waldo 1280px](/Users/suyashpingale/.gemini/antigravity-ide/brain/1c0c7b5e-2d01-48ad-9b7e-ea32d7b59730/waldo-hero-1280.png)
- **Waldo Hero - Wide Desktop (1440px):** ![Waldo 1440px](/Users/suyashpingale/.gemini/antigravity-ide/brain/1c0c7b5e-2d01-48ad-9b7e-ea32d7b59730/waldo-hero-1440.png)

---

## 2. Defect Status (Fixed vs. Open)

### Fixed / Resolved
*   **Tablet Overlap & Mobile Card Spills:** Codex successfully changed card visibility breakpoints. `SlackCard` is now `lg:block` and `ActivityCard` is `xl:block`. All floating cards are now hidden on mobile (`375px`) and tablet (`768px`), which removes layout clashing on those viewports.
*   **Mascot & Dome Asset Integrity:** The mascot `/illustrations/default.svg` and the original `hero-bg.svg` background are correctly used. No custom CSS gradients or alternate files were introduced.
*   **CTA Sizing Stability:** The waitlist button remains the same size (`min-h-[60px] px-10 text-[18px]`) at all widths (no responsive padding/sizing shifts).

---

### Open / Outstanding Defects

#### P0 (Critical Layout & Scaling Issues)

##### 1. Desktop Card-to-Text Overlaps (1024px – 1280px Seam)
*   **Description:** At `1024px` width, `SlackCard` (stretching to `297px` rightwards from `61px`) overlaps the left side of the centered headline (which starts at `133px`). `RecoveryBadge` (spanning `717px` to `819px`) also overlaps the right side of the headline. At `1280px` width, `ActivityCard` (spanning `1007px` to `1197px`) overlaps the right side of the text container (which extends to `1113px`).
*   **Failed Rule:** *DESIGN-SYSTEM.md §11:* Seam testing from 1024–1280px fails due to layout collisions.

##### 2. Vertically Stretched Dome on Mobile (375px)
*   **Description:** The background `hero-bg.svg` uses `object-fill` inside a container with `min-h-[760px]`. This vertically stretches the curves and circles of the dome out of proportion on narrow mobile screens.
*   **Failed Rule:** *User Rule (AGENTS.md):* Dome must be the original, non-distorted shape.

---

#### P1 (Copy & Style Violations)

##### 3. Wrong Primary CTA Copy and Arrow Format
*   **Description:** The button currently renders `Get Started ->` instead of `Let Waldo in →`.
*   **Failed Rule:** *DESIGN-SYSTEM.md §5 & §10:* "Primary CTA label is always `Let Waldo in →` (real `→` glyph)."

##### 4. Headline Line-Wrap Taper Failure on Mobile (375px)
*   **Description:** The headline uses `text-[34px]` font size. The first line (`The first app that knows`) exceeds `375px` in width, forcing the browser to wrap "knows" onto a new line, which breaks the triangular taper.
*   **Failed Rule:** *DESIGN-SYSTEM.md §3:* "Headlines: manual `<br>` for the triangular/oval taper."

##### 5. Missing Italic Aside
*   **Description:** The hero sub-copy paragraph text has been replaced with:
    > "Waldo scans complex data from your health wearable, and figures your day before you smell your morning coffee."
    It lacks the specified 3-line stack and the required italic aside.
*   **Failed Rule:** *AGENTS.md Block 1 - Hero:* Line 3 must be: `"Your schedule. Your meals. Your sleep. Your stress. All of it."` (Italic aside, Text-tertiary).

---

#### P2 (Color & Elevation Violations)

##### 6. Multi-Accent/Rainbow Cards in Single Viewport
*   **Description:** The static overlay cards coexist in the same viewport, displaying conflicting accent colors (lime green, orange, pink, cyan) at the same time.
*   **Failed Rule:** *DESIGN-SYSTEM.md §1:* "Accent `#FB943F` = brand emphasis. Once per viewport, never two visible."

##### 7. Naked Numbers in Cards
*   **Description:** `ActivityCard` displays raw numbers (`→345 →43 →10`) and `RecoveryBadge` displays raw numbers (`63%`) without plain-language reads.
*   **Failed Rule:** *DESIGN-SYSTEM.md §10:* "Raw-data rule: no number without Waldo's plain-language read beside it."

##### 8. Ad-hoc Typography Sizes
*   **Description:** Overlay cards use ad-hoc font sizes like `text-[8px]`, `text-[6px]`, `text-[12px]`, `text-[15px]` rather than indexing the standard typography tokens.
*   **Failed Rule:** *DESIGN-SYSTEM.md §3:* Sizing and hierarchy must follow the standardized ladder.
