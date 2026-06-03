# Waldo — Design System

**Status: frozen v3.** Source of truth for all build work. Derived from `CODEX_CONTEXT.md`,
`AGENTS.md`, the owner's expanded UI palette + component sheets, and the Bevel/Smallest/Apple
forensics in `competitor-visuals/`. **Where this file and the older docs disagree, this file wins.**

Tools (Codex, Antigravity) must read this file before touching any section. Items marked
`⟡ DEFAULT` are sensible fills awaiting owner sign-off — safe to build against, easy to redline.

> **Conflicts resolved in this version** (flagged for a one-word correction if I guessed wrong):
> - **Accent = `#FB943F`** (from the named palette swatch), not the `#F97316` referenced in an earlier multiple-choice option.
> - **Border focus = `16%`** — confirmed (palette token); the `20%` typed in chat was set aside.
> - **Dark canvas (Page BG) = `#1C1B1A`** per the palette; your typed tier list said `#191817` (visually identical). Using the palette value.

---

## 1. Color tokens

### Light mode
| Token | Hex |
|---|---|
| Surface (T2) | `#FAFAF8` |
| Page BG (T3, canvas) | `#F4F3F0` |
| Surface sunken (T4) | `#E8E6E0` |
| Border default | `#1A1A1A` @ 8% |
| Border focus | `#1A1A1A` @ 16% |
| Text primary | `#1A1A1A` |
| Text secondary | `#6B6B68` |
| Text tertiary | `#9A9A96` |
| Text disabled | `#C4C3BF` |
| Accent | `#FB943F` |
| Accent subtle | `#FB943F` @ 10% |
| Action | `#2388FF` |

### Dark mode
| Token | Hex |
|---|---|
| Surface (T2) | `#1D1D1B` |
| Page BG (T3, canvas) | `#1C1B1A` |
| Surface sunken (T4) | `#171616` |
| Border default | `#FAFAF8` @ 8% |
| Border focus | `#FAFAF8` @ 16% |
| Text primary | `#FAFAF8` |
| Text secondary | `#9A9A96` |
| Text tertiary | `#6B6B68` |
| Text disabled | `#444441` |
| Accent | `#FB943F` |
| Accent subtle | `#FB943F` @ 10% |
| Action | `#2388FF` |

**Accent vs Action — keep distinct:**
- **Accent `#FB943F`** = brand emphasis. **Once per viewport, never two visible.** The Primary *icon* button (orange squircle) and a Flagging donut ring each count as that one orange.
- **Action `#2388FF`** = functional UI state — checkbox tick, radio dot, toggle track, selected dropdown rows. Does **not** count toward the accent rule.

**Color washes:** the **hero orange dome only**. Every other section uses neutral tier surfaces.
The dome is the provided `public/assets/hero-bg.svg` asset — **never replaced or restyled**. Display
it at its **native `1440 / 989`** proportions with `object-cover object-top` (owner override, June 2 —
the deeper arc shows the concentric bands + white inner circle as designed); never `object-fill` (it
stretches/distorts the asset). The mascot is centered on the **top edge of the white inner ellipse**
(`≈28.1%` down the dome — the asset's inner `#F4F3F0` ellipse has its top edge at y≈278 of 989).

---

## 2. Surface elevation — "higher = lighter"

The more foreground / nested a surface, the lighter it is. Four tiers per mode.

| Tier | Light | Dark | Role |
|---|---|---|---|
| T1 | `#FFFFFF` | `#272725` | top-most / most-nested cards |
| T2 | `#FAFAF8` | `#1D1D1B` | default card / panel surface |
| T3 | `#F4F3F0` | `#1C1B1A` | page canvas |
| T4 | `#E8E6E0` | `#171616` | **sunken** — pressed buttons / active toggles only |

*(T1 white / `#272725` and the T4 sunken tier are the owner's most recent additions; the component
sheets predate them.)*

### Rules (both modes)
- **Adjacency:** combine adjacent tiers, or skip exactly one (T1+T2 ✓, T1+T3 ✓). **Never jump two** (T1+T4 ✗).
- **Stroke:** adjacent-tier pairs get a **1px inset stroke on the lighter surface** = the Border-default token (8%). Skipping a tier needs no stroke.
- **Focus:** Border token rises **8% → 16%**.
- **Default mapping:** canvas = T3 · cards = T2 (+stroke) or T1 (no stroke) · nested = step one lighter · sunken controls = T4.

---

## 3. Typography

Hierarchy mirrors **Smallest AI**'s ladder (tight, technical, restrained), mapped onto our
typefaces, **plus one extra state**: the italic aside (Waldo's voice).
Smallest's DNA we adopt: **negative tracking** (`-0.01em` everywhere; headlines `-0.02em`),
**400-weight headlines**, tight heading line-heights, **500-weight** compact UI labels.

**Corben 400** — headline tier (`display`/`h1`/`h2`), *never bold*. **SF Pro Rounded** — everything else.

| Token | Font | Size | Wt | LH | Tracking | Use |
|---|---|---|---|---|---|---|
| `display` | Corben | `clamp(1.65rem,1.05rem+2.64vw,3.4rem)` (26→54) | 400 | 1.06 | -0.02em | hero h1 (−12%, owner call Jun 2) |
| `h1` | Corben | `clamp(2rem,1.4rem+2.4vw,3rem)` (32→48) | 400 | 1.10 | -0.02em | section headline |
| `h2` | Corben | `clamp(1.5rem,1.2rem+1.4vw,2rem)` (24→32) | 400 | 1.18 | -0.01em | sub-headline |
| `h3` | SF Pro Rounded | `1.25rem` (20) | 500 | 1.30 | -0.01em | card title / subhead |
| `body` | SF Pro Rounded | `1rem` (16) | 400 | 1.5 | -0.01em | paragraph; max ~58ch; Text-secondary |
| `label` | SF Pro Rounded | `0.875rem` (14) | 500 | 1.2 | -0.01em | UI labels, buttons, chips |
| `eyebrow` | SF Pro Rounded | `0.8125rem` (13) | 400 | 1.3 | -0.01em | section label (regular, per owner) |
| `caption` | SF Pro Rounded | `0.75rem` (12) | 400 | 1.3 | -0.01em | fine print, meta |
| `aside` ★ | SF Pro Rounded *italic* | `0.8125rem` (13) | 400 | 1.3 | -0.01em | **the +1 state — Waldo's closing sarcastic line; Text-tertiary** |
| `data` | SF Pro Rounded | — | 500 | — | tabular-nums | all metrics/numerals |

- ★ `aside` is the single level **beyond** Smallest's set — italic, Text-tertiary, closes a copy block.
- **Italic aside:** SF Pro Rounded has no italic (Apple ships italics only for SF Pro Text/Display, not Rounded), so the aside renders as a **browser-synthesized oblique** — accepted fallback.
- **Headlines:** manual `<br>` for the triangular/oval taper. **Never** `text-wrap:balance` or browser-decided breaks.
- Eyebrow ≠ aside — eyebrow is the regular top label; aside is the italic closing voice line.
- Mapping note: **our typefaces are fixed** — Corben for the headline tier (`display`/`h1`/`h2`), SF Pro Rounded from `h3` down. We borrow only Smallest AI's **sizing / hierarchy / layout logic**, never its font choices.

---

## 4. Spacing · Radius · Shadow · Grid

- **Spacing** (8px base): `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 80 · 128`. Section rhythm `clamp(6rem, 4rem + 8vw, 10rem)` (96→160px).
- **Grid** ⟡ DEFAULT: 12-col, content max **1200px**, gutters `clamp(1rem, .5rem + 3vw, 2.5rem)`, column gap `24px`.
- **Radius:** card `24px` · bento `≤36px` · pill (text/number buttons, toggles) `999px` · input / icon-button / select `12px` · **small accessory tiles `16px`** (heart/stress-type tiles — keep `24px` only on main cards) · checkbox `6px`.
- **Shadow:** card `0 1px 2px rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.05)` · elevated `0 2px 4px/.04, 0 16px 40px/.06` · floating hero card `0 20px 48px rgba(26,26,26,.08), 0 2px 8px rgba(26,26,26,.04)`.

### Nested boxes ("boxes within boxes")

The system is built to nest. Three rules keep it sound at any depth — they always move together:

1. **Elevation step.** Each box nested inside another steps **one tier lighter**
   (canvas `T3` → card `T2` → inner card `T1`). Honor the no-jump-2-tiers rule, so a clean stack
   is at most **T3 → T2 → T1** (3 visible surfaces). Need more depth? Separate with spacing or a
   stroke, **not** more tiers.
2. **Concentric corners.** Inner radius = **outer radius − padding** between them
   (`r_inner = r_outer − p`). Keeps the corner gap constant (true concentric look). **Floor inner
   radius at `8px`**; if the math drops below, increase padding or raise the outer radius. Pills
   (`999`) stay pills — the formula applies to rounded-rects only.
3. **Stroke.** Adjacent-tier pairs get the **8% Border stroke on the lighter (inner) surface**;
   skipping a tier needs none (contrast suffices). Focus raises that stroke to 16%.

**Worked examples**
| Outer radius | Padding | Inner radius |
|---|---|---|
| card `24` | `16` | `8` |
| bento `36` | `24` | `12` |
| section panel `36` | `12` | `24` |
| input `12` in card `24` | `12` | `12` (already concentric ✓) |

---

## 5. Buttons & badges

3 emphasis × 3 content types (text / icon / number) × 2 sizes, light + dark.

| | Fill | Content | Stroke |
|---|---|---|---|
| **Primary** | solid — light: ink `#1A1A1A`/light text · dark: light surface/ink text. **Icon variant = accent `#FB943F` squircle, white glyph** | text (opt. leading icon + trailing `→`), icon, number | none |
| **Secondary** | filled one tier above its background | ink content, leading icon + trailing `→` | 8% inset stroke |
| **Tertiary / ghost** | transparent | ink content | hairline stroke only |

- **Shapes:** text & number = pill `999px`; icon = squircle `12px`.
- **Sizes:** Default `48px` (pad `12×24`) · Small `36px` (pad `8×16`) · **Large `56px`** (hero CTA). Icon squircles `40 / 32 / 48px`.
- **States:** hover = lift `translateY(-1px)` + shadow bump · active = `scale(.98)` (filled may sink to T4) · disabled = `40%` opacity / Text-disabled token, no pointer · focus = the 8→16% Border bump.
- **Primary CTA label is always `Let Waldo in →`** (real `→` glyph). Never "Get started" / "Get early access".

---

## 6. Form controls & inputs

All "selected / on" states use **Action `#2388FF`**. Focus = Border 8→16%. Disabled = Text-disabled + reduced fill.

- **Text input / textarea** — two variants:
  - *Filled*: surface T-step, `12px` radius, 8% inset border, optional leading Lucide icon, placeholder in Text-tertiary.
  - *Line*: no box; single bottom border only, placeholder + optional icon.
  - Sizes Small / Default.
- **Select** — Filled input with a trailing chevron-down, optional leading icon, placeholder "Select".
- **Tabs** — segmented group in a recessed track; **active tab = elevated chip one tier lighter** (+ small shadow), inactive = transparent text; optional leading icon. Sizes Small / Default.
- **Checkbox** — rounded square (`6px`). On = Action fill + white check · Off = transparent + 8% border · disabled = muted/lighter.
- **Radio** — circle. On = Action fill + white center dot · Off = border only.
- **Toggle** — pill track + circular knob. On = Action track, knob right · Off = neutral/sunken track, knob left.
- **Dropdown / menu** — rows support leading content: Text · Icon · Checkbox · Radio · Avatar. Hover = row fills one tier lighter; selected = Action indicator. Nested menus use a leading icon + trailing submenu chevron. Rows are pill-shaped or full-width.

---

## 7. Icons & logos

- **UI glyphs:** Lucide line icons, `1.5px` stroke, sized to text (20–24px).
- **Source-app references** (e.g. hero floating cards): real brand logos as PNG/SVG (Apple Health, Whoop, etc.) — never a generic glyph or emoji.

---

## 8. Inline links

- Color: **Accent `#FB943F`**.
- Underline: `text-decoration-skip-ink: auto`, thickness `0.07em`, offset `0.13em`, **rounded caps** (custom rounded underline if `text-decoration` can't round).
- Underline color: lighter tint light mode `#FDBF8C`, darker shade dark mode `#B0682C`. ⟡ DEFAULT (derived from accent).

---

## 9. Motion

- Primary easing `cubic-bezier(0.19, 1, 0.22, 1)`. Micro `150ms` · transitions `300–600ms`.
- Scroll reveal ⟡ DEFAULT: fade + `16–24px` rise, `0.5s`, stagger `60–80ms`, fires once.
- Always honor `prefers-reduced-motion`.

---

## 10. Copy & brand rules (non-negotiable)

- **CTA** is always `Let Waldo in →`.
- **Raw-data rule:** no number without Waldo's plain-language read beside it.
- **No feature duplication:** each agent action (Spot, Constellation, Brief, Fetch, Adjustment, Patrol…) appears **once** on the page, ever.
- **Mascot:** always doing something; resting pose on landing; never sad / static / speech-bubbled.
- **Banned words:** `smart / smarter`, `optimize`, `wellness`, `dashboard`, `AI-powered`, `intelligent`, `health tracker`, `"Meet Waldo"`, `"Waldo AI"`, and exclamation marks.

---

## 11. Responsive

Mobile-first (Tailwind min-width): **sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536**.
Must hold at **375 / 768 / 1024 / 1280 / 1440**. The **1024–1280 seam** is the known failure
zone — test it explicitly every section.

Calibrated from competitor breakpoint forensics (Bevel, Composio, et al. — `competitor-visuals/*` Block 7):
- **Headline scales fluidly** with the viewport (our `display`/`h1` clamps). Competitors drop H1 ~35–40% desktop→mobile (Bevel 80→50, Composio 64→36), always staying centered.
- **CTA geometry stays constant** across breakpoints — do NOT shrink the button on mobile (Bevel holds 174×46, Composio 116×43 at every width). Only the surrounding layout reflows.
- **Cards: shrink-then-stack** — feature/floating cards scale down through tablet, then go near-full-width and stack vertically on mobile. Never keep many absolutely-positioned floating cards on small screens (that clips/overflows) — reduce to the key 1–2 or stack them.
- **Nav collapses to a menu** below md (768): full links on desktop → hamburger/toggle on tablet & phone.
- Honor `prefers-reduced-motion` and `prefers-color-scheme` (both present across competitors).

---

## 12. Section → competitor layout map

| Section | Borrow layout from |
|---|---|
| Hero | Bevel floating-card state rotation + product mockup; Dia cursor-proximity parallax |
| Problem (data ticker / app graveyard) | Smallest AI dark container, monospace data feel |
| Turn (passive vs action) | Smallest AI side-by-side contrast, sparse copy |
| Product Showcase | Bevel colour-blocked sections; dark product-UI cards inside |
| Depth (Constellation) | Bevel dark intelligence section + Stripe-style data viz |
| Liveness (Where's Waldo) | Stripe live ticker on Bevel warm bg |
| FAQ | Headspace clean bordered accordion |
| Footer | Headspace mascot + Stripe time-of-day adaptive gradient |
