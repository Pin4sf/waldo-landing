# Waldo Hero Audit & Prioritized Defect List
**Date:** June 2, 2026  
**Review Version:** Commit `a7b48c0` ("Restore original orange-dome hero background")  
**Branch:** `codex/visual-updates`

---

## Executive Summary & Visual Evidence
This audit reviews the current Waldo Hero implementation against the specified constraints in [DESIGN-SYSTEM.md](file:///Users/suyashpingale/Documents/GitHub/waldo-landing/DESIGN-SYSTEM.md) and [AGENTS.md](file:///Users/suyashpingale/Documents/GitHub/waldo-landing/AGENTS.md), with visual reference to Bevel Health's premium design tokens.

### Capture Reference (Host Local Screenshots)
- **Bevel Health Hero:** ![Bevel Health Hero](/Users/suyashpingale/.gemini/antigravity-ide/brain/1c0c7b5e-2d01-48ad-9b7e-ea32d7b59730/bevel-hero.png)
- **Waldo Hero - Mobile (375px):** ![Waldo 375px](/Users/suyashpingale/.gemini/antigravity-ide/brain/1c0c7b5e-2d01-48ad-9b7e-ea32d7b59730/waldo-hero-375.png)
- **Waldo Hero - Tablet (768px):** ![Waldo 768px](/Users/suyashpingale/.gemini/antigravity-ide/brain/1c0c7b5e-2d01-48ad-9b7e-ea32d7b59730/waldo-hero-768.png)
- **Waldo Hero - Small Desktop (1024px):** ![Waldo 1024px](/Users/suyashpingale/.gemini/antigravity-ide/brain/1c0c7b5e-2d01-48ad-9b7e-ea32d7b59730/waldo-hero-1024.png)
- **Waldo Hero - Standard Desktop (1280px):** ![Waldo 1280px](/Users/suyashpingale/.gemini/antigravity-ide/brain/1c0c7b5e-2d01-48ad-9b7e-ea32d7b59730/waldo-hero-1280.png)
- **Waldo Hero - Wide Desktop (1440px):** ![Waldo 1440px](/Users/suyashpingale/.gemini/antigravity-ide/brain/1c0c7b5e-2d01-48ad-9b7e-ea32d7b59730/waldo-hero-1440.png)

---

## 1. Prioritized Defect List

### P0 (Critical Layout & Functional Issues)

#### 1. Severe Card-to-Text Overlaps and Collisions (1024px – 1280px Seam)
*   **Description:** The centered headline (`w-[74%]`, up to `760px` max-width) and the floating cards (SlackCard, RecoveryBadge, ActivityCard) collide directly at small-to-medium desktop viewports. The absolute percentages place the cards directly over the text.
*   **Impact:** Text is illegible and layout is broken at `1024px`.
*   **Failed Rule:** *DESIGN-SYSTEM.md §11:* "The 1024–1280 seam is the known failure zone — test it explicitly every section."

#### 2. Distorted and Vertically Stretched Dome on Mobile (375px)
*   **Description:** The hero container is styled with `aspectRatio: "1440 / 989"` on desktop but has `min-h-[760px]` on mobile. The background `hero-bg.svg` image is styled with `object-fill` which stretches it vertically into a distorted shape.
*   **Impact:** Destroys the premium aesthetics of the dome.
*   **Failed Rule:** *User Rule (AGENTS.md):* "Flag distorted/stretched dome. It must look proportional."

---

### P1 (Design System & Copy Violations)

#### 3. Banned Text / Wrong Primary CTA Label
*   **Description:** The primary button uses the label `Get Started ->` (with a literal hyphen-arrow).
*   **Impact:** Violates the non-negotiable branding copy rules.
*   **Failed Rule:** *DESIGN-SYSTEM.md §5 & §10:* "Primary CTA label is always `Let Waldo in →` (real `→` glyph). Never 'Get started' / 'Get early access'."

#### 4. Headline Line-Wrapping Taper Failure on Mobile (375px)
*   **Description:** The font size is hardcoded as `text-[34px]` on mobile. At `34px` font size, the first line (`The first app that knows`) exceeds `375px` in width, forcing the browser to wrap "knows" onto a new line, destroying the triangular taper structure.
*   **Failed Rule:** *DESIGN-SYSTEM.md §3:* "Headlines: manual `<br>` for the triangular/oval taper. Never `text-wrap:balance` or browser-decided breaks."

#### 5. Missing / Replaced Italic Aside Copy
*   **Description:** The hero sub-copy paragraph text has been replaced with:
    > "Waldo scans complex data from your health wearable, and figures your day before you smell your morning coffee."
    It entirely lacks the specified 3-line structure and the required italic aside.
*   **Failed Rule:** *AGENTS.md Block 1 - Hero:* Line 3 must be: `"Your schedule. Your meals. Your sleep. Your stress. All of it."` (Italic aside, Text-tertiary).

---

### P2 (Color & Elevation Violations)

#### 6. Multi-Accent/Rainbow Cards in Single Viewport
*   **Description:** Instead of rotating state colors, the current static implementation displays all cards simultaneously showing conflicting colors (lime green `#8CD91F`, orange `#F97316`, pink `#F43F5E`, and cyan `#06B6D4`) in the same viewport.
*   **Failed Rule:** *DESIGN-SYSTEM.md §1:* "Accent `#FB943F` = brand emphasis. Once per viewport, never two visible. ... Color washes: the hero orange dome only."

#### 7. Naked Numbers in Accessory Cards
*   **Description:** The `ActivityCard` lists raw data `→345 →43 →10` and the `StressTile` renders raw y-axis/x-axis gridline labels without any plain-language read beside them.
*   **Failed Rule:** *DESIGN-SYSTEM.md §10 & AGENTS.md:* "Raw-data rule: no number without Waldo's plain-language read beside it."

#### 8. Ad-hoc Typography Sizes
*   **Description:** Card texts are styled with ad-hoc pixel values like `text-[8px]`, `text-[6px]`, `text-[12px]`, `text-[15px]` rather than indexing the standard typography tokens in the design system.
*   **Failed Rule:** *DESIGN-SYSTEM.md §3:* Sizing / hierarchy / layout must follow the standardized ladder.
