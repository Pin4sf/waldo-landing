# Deep UI/UX Report: Bevel and Smallest AI

**Source files:** `competitor-visuals/forensics-bevel.md`, `competitor-visuals/forensics-smallest-ai.md`  
**Basis:** live DOM, computed styles, extracted CSS variables, section geometry, assets, and interaction maps.

---

## Executive Summary

Bevel and Smallest AI sit at opposite ends of the product-marketing spectrum.

Bevel is a high-polish consumer health app site. The code reveals a mature Webflow design system with named variables for typography, spacing, color, button themes, section themes, and component radii. The UX depends on emotional clarity: soft backgrounds, oversized product mockups, friendly copy, repeated app-download CTAs, ratings proof, pastel feature gradients, and many short sections that make the product feel companionable and safe.

Smallest AI is a technical infrastructure site built in Framer. Its code is less semantic and more generated, but it has a crisp system: mostly black, white, gray, green/teal accents, Geist typography, monospace technical blocks, compact CTAs, logo proof, API-oriented sections, security proof, and documentation links. The UX is credibility-first. It tries to feel fast, minimal, programmable, and enterprise-ready.

For Waldo, Bevel is the stronger emotional and consumer-facing reference. Smallest is useful for technical trust, code/API credibility, restrained enterprise sections, and sharp monochrome interface modules.

---

## Bevel: UI/UX System

### Product Positioning

Bevel presents itself as a connected health coach, not as a data dashboard. The page architecture repeatedly translates complexity into reassurance:

- Hero promise: "Your Connected Health Coach"
- Supporting proposition: health data from wearables, bloodwork, and everything between
- Proof: "4.8 / 28.6k ratings globally"
- Section sequence: compatibility, user count, daily confidence, intelligence, feature breadth, privacy, reviews, final CTA
- UX arc: understand me, guide me, protect me, fit into my daily life

The page is designed to make health data feel less clinical and more supportive. The code backs this with friendly spacing, rounded cards, pastel accents, device mockups, and repeated app-store style actions.

### Layout Style

Bevel uses a spacious one-column consumer landing page with modular full-width sections.

Key measured layout traits:

| Area | Code evidence | UX role |
|---|---|---|
| Fixed nav | `nav.navigation`, `position: fixed`, `height: 86.3984px`, `z-index: 10` | Keeps app download available without adding pressure |
| Hero | `section.hero_section.section-3`, `807x1037` viewport fill | Creates first-screen immersion |
| Product mockup area | `div.hero_phone-section`, starts at `y=419`, `791x451` | Makes product tangible immediately |
| Compatibility band | `section.works-with.section-3`, `807x164` | Low-friction proof after hero |
| Feature system | repeated `section.section-2` blocks | Turns complexity into digestible chapters |
| Dark intelligence section | `section.section-2.u-theme-dark`, `rgb(31, 32, 37)` | Signals AI depth and premium capability |
| Privacy section | `privacy_container.u-theme-dark` with mint radial gradient | Converts trust into a visual destination |

The page scroll height is `10786px`, which is long but segmented into clear value chapters. The code suggests Bevel relies on distinct section backgrounds and mockup/media rhythm rather than dense text.

### Visual Style

Bevel's visual language is soft, glossy, mobile-native, and emotionally warm.

Core style markers:

- Background body: `rgb(243, 246, 247)`, a cool near-white rather than pure white
- Primary text: `rgb(34, 35, 38)` and `rgb(31, 32, 37)`
- Light text: `rgb(235, 240, 248)` for dark CTAs/sections
- Accent orange: `rgb(255, 149, 0)` appears heavily in extracted color counts
- Pastel system: orange, red, lilac, pink, green, teal, cyan, blue, mint
- High radii: `16px`, `24px`, `32px`, `36px`, `128px`
- Shadow language is subtle: `rgba(0, 0, 0, 0.25) 0px 0px 16px -8px`
- Gradients are used as semantic atmospheres around feature categories

The overall effect is not "medical". It is closer to Apple Health plus fitness coaching: polished, rounded, calming, optimistic.

### Typography

Bevel uses a system font stack:

```css
-apple-system, "system-ui", Inter, "Segoe UI", sans-serif
```

The design system exposes typography variables:

| Token | Value / meaning |
|---|---|
| `--_typography---font-families--sf-pro` | `-apple-system,BlinkMacSystemFont,Inter,"Segoe UI",sans-serif` |
| `--_typography---weight--regular` | `400` |
| `--_typography---weight--medium` | `500` |
| `--_typography---weight--semibold` | `600` |
| `--_typography---weight--bold` | `700` |
| `--_typography---heading-1--line-height` | `1` |
| `--_typography---heading-1--letter-spacing` | `-.03em` |
| `--_typography---heading-2--line-height` | `1` |
| `--_typography---heading-2--letter-spacing` | `-.03em` |
| `--_typography---body--line-height` | `1.3` |
| `--_typography---body--letter-spacing` | `0em` |
| `--_typography---eyebrow--letter-spacing` | `.1em` |

Hero H1 computed style:

```css
font-family: -apple-system, "system-ui", Inter, "Segoe UI", sans-serif;
font-size: 61.92px;
font-weight: 600;
line-height: 61.92px;
letter-spacing: -1.8576px;
text-align: center;
color: rgb(34, 35, 38);
```

UX implication: Bevel uses compressed, confident headings. The tight line-height and negative tracking make large headings feel premium, while the system font keeps the product feeling native and trustworthy.

### Color Variables

Bevel has the clearer variable architecture of the two sites.

Primary variables:

| Variable | Value | Role |
|---|---|---|
| `--black` | `#222326` | Near-black text |
| `--white-smoke` | `#f4f5f8` | Soft page/light surface |
| `--white` | `white` | Base surface |
| `--dark-4` | `#616265` | Muted text |
| `--dark-3` | `#8b8c8f` | Secondary muted text |
| `--dark-2` | `#cacbce` | Light border/muted UI |
| `--_colors---primary--dark` | `#1f2025` | Dark theme background and primary button background |
| `--_colors---primary--light` | `#ebf0f8` | Light text on dark surfaces |
| `--_colors---primary--white` | `white` | White surface |
| `--_colors---primary--transparent` | `#fff0` | Transparent utility |

Secondary accents:

| Variable | Value | Observed use |
|---|---|---|
| `--_colors---secondary--orange` | `#ffab94` | Feature gradients, warm coaching tone |
| `--_colors---secondary--red` | `#f46c41` | Intelligence card emphasis |
| `--_colors---secondary--lilac` | `#b9a6ff` | AI/insight softness |
| `--_colors---secondary--pink` | `#ff96c2` | Friendly feature variation |
| `--_colors---secondary--green` | `#31ce01` | Health/action signal |
| `--_colors---secondary--teal` | `#83e3de` | Calm technical trust |
| `--_colors---secondary--cyan` | `#7ddcff` | Light data accent |
| `--_colors---secondary--blue` | `#415eee` | Analytical/metric accent |
| `--_colors---secondary--mint` | `#3fffc2` | Privacy/security glow |

Theme variables:

| Variable | Role |
|---|---|
| `--_theme---text--primary` | Primary text color alias |
| `--_theme---text--secondary` | Secondary text color alias |
| `--_theme---background--primary` | Default background |
| `--_theme---background--secondary` | Light secondary surface |
| `--_theme---background--invert` | Dark inverted background |
| `--_theme---button-primary--text` | Primary button text |
| `--_theme---button-primary--background` | Primary button background |
| `--_theme---button-secondary--background` | Secondary button background |

### Spacing and Radius Variables

Bevel uses rem-based spacing tokens and responsive clamp tokens.

Important spacing variables:

| Variable | Value |
|---|---|
| `--_spacing---rems--0rem` | `0rem` |
| `--_spacing---rems--0-25rem` | `.25rem` |
| `--_spacing---rems--0-5rem` | `.5rem` |
| `--_spacing---rems--0-75rem` | `.75rem` |
| `--_spacing---rems--1rem` | `1rem` |
| `--_spacing---rems--1-25rem` | `1.25rem` |
| `--_spacing---rems--1-5rem` | `1.5rem` |
| `--_spacing---rems--2rem` | `2rem` |
| `--_spacing---rems--2-5rem` | `2.5rem` |
| `--_spacing---rems--3rem` | `3rem` |
| `--_spacing---rems--4rem` | `4rem` |
| `--_spacing---rems--5rem` | `5rem` |
| `--_spacing---rems--8rem` | `8rem` |

Responsive spacing:

| Variable | Value |
|---|---|
| `--_responsive-spacing---80-40` | `clamp(2.5rem, 3.571vw + 1.786rem, 5rem)` |
| `--_responsive-spacing---64-40` | `clamp(2.5rem, 2.143vw + 2.071rem, 4rem)` |
| `--_responsive-spacing---16-8` | `clamp(.5rem, .714vw + .357rem, 1rem)` |

Radius:

| Variable / computed value | Role |
|---|---|
| `--v3-bento-radius` = `36px` | Large bento/product cards |
| `16px` | Small cards and chips |
| `24px` | Medium panels |
| `32px` | Larger media cards |
| `128px` | Pill CTAs |

### Component System

#### 1. Fixed Navigation

Code signature:

```css
selector: nav.navigation;
position: fixed;
height: 86.3984px;
padding: 16px 0px;
display: flex;
justify-content: center;
font-size: 18px;
font-weight: 500;
letter-spacing: 0.17px;
z-index: 10;
```

UX notes:

- Nav is persistent but light.
- It includes brand, "About", "Login", and a primary "Download app" action.
- The nav CTA uses the same pill language as hero CTA, reinforcing a single conversion path.

#### 2. Primary CTA Button

Code signature:

```css
selector: a.btn.cc-navigation.w-inline-block;
background-color: rgb(31, 32, 37);
color: rgb(235, 240, 248);
border-radius: 128px;
padding: 8px 16px;
display: flex;
align-items: center;
justify-content: center;
gap: 12px;
font-size: 16px;
font-weight: 500;
transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.3s;
```

UX notes:

- The CTA is tactile and app-like.
- The radial `btn-highlight` background creates a glow beneath/inside the button.
- The transition curve is premium and slow enough to feel smooth.
- The button is not huge, which keeps the site calm rather than salesy.

#### 3. Hero Section

Components:

- `hero_section.section-3`
- `hero_clouds`
- `hero_tunnel`
- `hero_phone-section`
- `hero_phone-container`
- `hero_phone-video`
- `hero_watch-video`
- `hero_card` floating cards
- rating row
- app download CTA

UX notes:

- Hero combines emotional copy with product proof immediately.
- Device frames and live videos help users understand that this is a real app, not an abstract coaching concept.
- Clouds and tunnel media create depth, but the visual hierarchy still centers the H1 and CTA.

#### 4. Feature Cards

Code evidence:

- `feature_card.cc-orange`
- `feature_card.cc-blue`
- `feature_card.cc-green`
- `feature_horizontal-layout.cc-lilac`
- `feature_horizontal-layout.cc-teal`

Gradient examples:

```css
linear-gradient(rgba(255,255,255,0) 40%, rgba(255,171,148,0.2) 90%, rgba(255,171,148,0.4))
linear-gradient(rgba(255,255,255,0) 40%, rgba(65,94,238,0.2) 90%, rgba(65,94,238,0.4))
linear-gradient(rgba(255,255,255,0) 40%, rgba(49,206,1,0.2) 90%, rgba(49,206,1,0.4))
```

UX notes:

- Each metric category gets a color atmosphere.
- The card system avoids dense dashboard grids by giving each feature room.
- The pastel bottoms imply data rising from the phone interface without making the page feel technical.

#### 5. Bevel Intelligence Cards

Code evidence:

- `section.section-2.u-theme-dark`
- `intelligence_card.cc-lilac`
- `intelligence_card.cc-red`
- `intelligence_card.cc-pink`
- `intelligence_card.cc-teal`
- `video.intelligence_video.lazy`

UX notes:

- The dark section is a narrative shift: the product moves from tracking to intelligence.
- Cards use radial gradients anchored at the lower-right, giving each card a soft active area.
- Copy topics like "Get answers from your data", "Proactive check-ins", and "Finds sources you can trust" turn AI into practical behaviors.

#### 6. Privacy Panel

Code evidence:

```css
privacy_container.u-theme-dark.u-color-primary.u-overflow-hidden
background-image: radial-gradient(circle at 50% 0px, rgba(255,255,255,0) 40%, rgba(63,255,194,0.2) 90%, rgba(63,255,194,0.4))
```

UX notes:

- Privacy is treated as a premium product feature, not footer copy.
- Mint glow is a good semantic fit: security, cleanliness, health.
- The section likely reduces anxiety after AI/data claims.

#### 7. Reviews and Social Proof

Components:

- "Join over 1 million members"
- "Crafted with Care Loved Everywhere"
- repeated review cards
- app rating row

UX notes:

- Social proof is layered across the page rather than isolated.
- Review cards use repeated short quotes, names, and dates to build authenticity.
- The page uses both aggregate proof and individual testimonial proof.

#### 8. Footer

Footer groups:

- Company
- Product
- Legal
- Social
- Knowledge Base, Release Notes, Roadmap, FAQ, Request a feature, Report a bug

UX notes:

- Product operations are visible. Roadmap, release notes, and bug report links make the brand feel active and user-responsive.
- This is unusually strong for trust in a health product.

### Bevel UX Strengths

- Strong emotional clarity: the product is a coach, not a dashboard.
- Excellent product tangibility through phone/watch/video media.
- Clear conversion path: repeated "Download app" links.
- Robust variable system that can scale across pages.
- Health trust is handled through privacy, ratings, release notes, and support links.
- Accent colors are semantic and varied without feeling chaotic.

### Bevel UX Risks

- Very long page can become heavy if media is not optimized.
- Heavy reliance on video/mockup assets may reduce performance.
- The design is polished but could feel familiar among premium wellness apps.
- Feature abundance may dilute focus if every card receives similar visual weight.

### Bevel Rebuild Guidance

Use this component hierarchy:

1. Fixed transparent nav with pill CTA
2. Centered hero with compact copy, app CTA, rating proof
3. Product mockup/video cluster in the lower hero
4. Compatibility/proof strip
5. Three-column metric cards with pastel gradient bottoms
6. Dark AI/intelligence section with radial cards
7. Secondary feature grid
8. Privacy trust panel with mint glow
9. Review carousel or repeated testimonials
10. Final CTA and structured footer

Use these base CSS variables:

```css
:root {
  --bevel-font: -apple-system, BlinkMacSystemFont, Inter, "Segoe UI", sans-serif;
  --bevel-dark: #1f2025;
  --bevel-ink: #222326;
  --bevel-light: #ebf0f8;
  --bevel-bg: #f3f6f7;
  --bevel-white: #fff;
  --bevel-muted: color-mix(in hsl, var(--bevel-dark) 60%, transparent);
  --bevel-orange: #ffab94;
  --bevel-red: #f46c41;
  --bevel-lilac: #b9a6ff;
  --bevel-pink: #ff96c2;
  --bevel-green: #31ce01;
  --bevel-teal: #83e3de;
  --bevel-cyan: #7ddcff;
  --bevel-blue: #415eee;
  --bevel-mint: #3fffc2;
  --bevel-radius-sm: 16px;
  --bevel-radius-md: 24px;
  --bevel-radius-lg: 32px;
  --bevel-radius-bento: 36px;
  --bevel-radius-pill: 128px;
  --bevel-space-1: .5rem;
  --bevel-space-2: 1rem;
  --bevel-space-3: 1.5rem;
  --bevel-space-4: 2rem;
  --bevel-space-5: 2.5rem;
  --bevel-space-6: 4rem;
  --bevel-space-7: 5rem;
}
```

---

## Smallest AI: UI/UX System

### Product Positioning

Smallest AI sells technical capability and scale. The H1 is direct:

- "Real-time Voice AI. Built to Scale."

The section sequence is infrastructure-oriented:

- Thesis
- Best-in-class models
- Agentic platform
- Code-first scaling
- Enterprise security
- Future of voice agent orchestration

This is not a soft consumer story. It is an engineering credibility story.

### Layout Style

Smallest uses a generated Framer layout with fewer semantic section markers, but the visual system is clear from computed styles and assets.

Measured traits:

| Area | Code evidence | UX role |
|---|---|---|
| Nav | `nav.framer-19dzicf`, `775x72`, `padding: 16px 0` | Lightweight technical header |
| Hero | full-viewport image at `807x1037` | Cinematic technical backdrop |
| CTA row | Contact sales and Sign up links at `48px` height | Dual enterprise/product-led conversion |
| Logo strip | client logos around `y=1190` | Credibility after hero |
| Code/action block | `icon-btn`, `lang-btn`, `cta-btn` | Developer trust and API affordance |
| Security/compliance links | ISO, SOC 2, GDPR, HIPAA | Enterprise readiness |
| Footer | product, industry, legal, docs links | B2B sitemap depth |

The document height is `8435px`, shorter than Bevel but still substantial. It is more sparse and more technical, with fewer emotional pivots.

### Visual Style

Smallest uses a near-monochrome technical palette with selective green/teal and purple accents.

Core style markers:

- Base background: `rgb(255, 255, 255)`
- Primary ink: `rgb(0, 0, 0)`
- Neutrals: `rgb(250, 250, 250)`, `rgb(245, 245, 245)`, `rgb(229, 229, 229)`, `rgb(212, 212, 212)`, `rgb(161, 161, 161)`, `rgb(64, 64, 64)`, `rgb(38, 38, 38)`
- Green/teal accents: `#2a9d90`, `#1be2b3`, `#33b8a0`, `#26ffed`, `rgb(22, 101, 52)`, `rgb(34, 197, 94)`
- Purple/blue accent: `rgb(124, 58, 237)`, `#758fff`, `#4d80e6`
- CTA surfaces: black primary, light gray secondary
- Background decorative pattern: embedded SVG hatching
- Fades: white and gray linear gradients to soften content edges

The visual system says: technical, exact, controlled, scalable.

### Typography

Smallest uses multiple font modes:

| Font | Role |
|---|---|
| `Geist, "Geist Placeholder", sans-serif` | Primary UI/content type |
| `"Geist Mono", monospace` | Technical/code content |
| `"Cooper Lt BT Light", "Cooper Lt BT Light Placeholder", sans-serif` | Hero/editorial headlines |
| `sans-serif` | Framer/generated fallback |

Hero H1 computed style:

```css
font-family: "Cooper Lt BT Light", "Cooper Lt BT Light Placeholder", sans-serif;
font-size: 32px;
font-weight: 400;
line-height: 38px;
letter-spacing: -0.32px;
text-align: center;
color: rgb(0, 0, 0);
```

This is surprisingly modest for a hero. The brand leans on composition, imagery, and product category rather than huge headline scale. The serif-ish Cooper headline gives a small amount of personality against otherwise technical Geist UI.

Framer text variables:

| Variable | Value |
|---|---|
| `--framer-font-family` | `Inter,Inter Placeholder,sans-serif` |
| `--framer-font-weight` | `500` |
| `--framer-text-color` | `#000` |
| `--framer-font-size` | `16px` |
| `--framer-letter-spacing` | `0` |
| `--framer-line-height` | `1.2em` |
| `--framer-text-alignment` | `start` |
| `--framer-font-family` alternate | `"Geist","Geist Placeholder",sans-serif` |
| `--framer-font-weight-bold` | `700` |

### Color Variables

Smallest's variables are Framer token IDs rather than human-readable names. They still reveal the design system.

Primary token groups:

| Token | Value | Inferred role |
|---|---|---|
| `--token-80213b73-0147-48bb-b0d4-c1173427bdbf` | `#fff` | White surface |
| `--token-f600125a-784c-478a-9c6e-390ad305f79b` | `#191919` | Near-black |
| `--token-37ab042a-a6c9-4cab-b2be-9c075d020c09` | `#000` | Pure black |
| `--token-824ac123-9700-474c-9114-91b9503d813c` | `#ededed` | Light border/surface |
| `--token-c529f6b5-c43a-4364-a1f8-e34aeca80890` | `#6f6f6f` | Muted text |
| `--token-ccb9250f-3fd5-4e15-b828-d7cf01600dcc` | `#000000b3` | 70 percent black |
| `--token-cc0b0589-32d9-442c-93d5-ffa96eec7a30` | `#0006` | 40 percent black |
| `--token-1b646ed8-3bbd-433c-922d-8fb93f89859b` | `#1919191a` | 10 percent dark surface |
| `--token-947a7635-5d0b-4963-8f1c-f2bdac197283` | `#00000080` | 50 percent black |

Accent token groups:

| Token | Value | Inferred role |
|---|---|---|
| `--token-1bbb4506-f6f1-47c8-91dc-6b3f2dfc9afd` | `#2a9d90` | Teal brand accent |
| `--token-425827a2-c8ed-46b6-9c63-44096b2a1a9d` | `#1be2b3` | Bright mint/active accent |
| `--token-71ca3ac1-35a0-4614-a450-a910161933e1` | `#49b2a1` | Muted teal |
| `--token-e62129ff-c346-46ef-9e97-3558fba8b2e2` | `#33b8a0` | Secondary teal |
| `--token-8bd0ca1b-274f-46ac-9dd5-cafbeed12c60` | `#26ffed` | Electric cyan |
| `--token-b21a2c94-07f2-4652-9ec2-be93f83399a3` | `#758fff` | Blue-violet accent |
| `--token-47eb13e1-adae-49e4-89aa-c03336a0ce61` | `#4d80e6` | Blue link/accent |

Neutral scale:

| Token | Value |
|---|---|
| `--token-0ebd34f6-0f80-40c4-98ed-a5c2277db70a` | `#fafafa` |
| `--token-1bf7e748-e994-475a-ae6b-851cdc36ed88` | `#f5f5f5` |
| `--token-73e20bf2-100b-4095-ac57-b386147b0f38` | `#e5e5e5` |
| `--token-57317e7b-b332-4e6e-9fe3-7fa64ab8d3dc` | `#d4d4d4` |
| `--token-bc63af02-fcdb-4351-8cb2-4055d33c250e` | `#a1a1a1` |
| `--token-4131b042-5718-4a5f-a3d6-1a0d96d00e12` | `#737373` |
| `--token-fe92d1bb-e666-457b-a786-653b7547f629` | `#525252` |
| `--token-e4eb613e-966d-4156-84d6-7a06c5904ef5` | `#404040` |
| `--token-74394ea1-0fad-4fce-b7ed-51b38f9750fe` | `#262626` |
| `--token-38ba863d-bbcb-48b1-a3ef-efcb2d1e7ed9` | `#010101` |

### Radius, Shadows, and Surfaces

Smallest radii:

| Radius | Count | Role |
|---|---:|---|
| `12px` | 22 | CTAs, small cards |
| `20px` | 11 | medium cards |
| `16px` | 5 | utility cards |
| `24px` | 4 | large modules |
| `999px` | 1 | pill |
| `100%` / `50%` | 18 total | avatars/icons/circular controls |

Shadows:

| Shadow | Role |
|---|---|
| `rgb(255, 255, 255) 10px 0px 18px -4px, rgb(255, 255, 255) 4px 0px 12px -2px` | White edge fade for horizontal logo/content overflow |
| `rgb(255, 255, 255) 0px 0px 92.1px 100px inset` | Hero/media wash |
| `rgb(255, 255, 255) 0px 4px 170px 101px` | Large atmospheric glow |

The shadow language is not card-depth. It is mostly white fog/fade, used to control the edges of busy or wide content.

### Component System

#### 1. Navigation

Code signature:

```css
selector: nav.framer-19dzicf;
width: 775px;
height: 72px;
padding: 16px 0px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
font-size: 12px;
```

UX notes:

- Header is compact and utility-first.
- The visible nav action is "Contact sales", which biases toward enterprise conversion.
- Logo is represented through background SVG rather than a simple image tag.

#### 2. Hero

Assets:

- Full viewport image: `GedxGXXvqNyVHSP28cRmUJpOk5o.png`, measured at `807x1037`
- Embedded SVG hatch/pattern background
- CTA row: "Contact sales" and "Sign up"

UX notes:

- The hero reads more like a technology poster than a SaaS dashboard.
- Headline is relatively small, letting the visual background establish mood.
- Copy is direct: real-time, voice AI, scale.

#### 3. CTAs

Primary CTA code:

```css
selector: a.framer-8ivhe...v-12gqblv;
text: Contact sales;
background-color: rgb(1, 1, 1);
border-radius: 12px;
height: 48px;
padding: 14px 14px 14px 18px;
display: flex;
align-items: center;
justify-content: center;
gap: 8px;
```

Secondary CTA code:

```css
selector: a.framer-8ivhe...v-18djfav;
text: Sign up;
background-color: rgb(245, 245, 245);
border-radius: 12px;
height: 48px;
padding: 14px 18px;
```

UX notes:

- The split conversion model supports both enterprise buyer and self-serve developer.
- Buttons are rectangular with mild radius, not pills. This feels more technical and less consumer.
- The extracted link color appears as browser blue in computed styles for some anchors, which suggests Framer nesting or style inheritance may hide true text color at the parent anchor level.

#### 4. Logo / Trust Strip

Assets:

- Multiple client logo images around `y=1190`
- Edge fade shadows and gradient overlays

UX notes:

- Trust appears immediately after hero.
- The use of placeholder alt text on some logos is an accessibility weakness.
- Horizontal overflow/fade treatment creates a marketplace or platform feel.

#### 5. Thesis and Research Sections

Headings:

- "Smallest AI: Our Thesis"
- "Specialisation Is a Superpower"
- "World Models for Voice"

UX notes:

- These sections move from sales page to manifesto.
- Strong for deep-tech positioning.
- Less immediately scannable for a user seeking product fit, but good for investor/developer credibility.

#### 6. Model/Product Cards

Headings:

- "Best in class models across the board."
- "The agentic platform for every use case."

Links:

- Text to Speech
- Speech to Text
- Speech to Speech
- Voice cloning
- Voice Agents
- On Prem

UX notes:

- Product taxonomy is built around capabilities and use cases.
- The page invites technical exploration through many docs/API links.
- This works for B2B AI buyers because each product path has an obvious next step.

#### 7. Code/API Module

Interaction evidence:

- `button.icon-btn`
- `button.lang-btn` with text `JavaScript`
- `button.cta-btn` with text `Get API key`

UX notes:

- This is the most important trust component for a developer-facing AI company.
- The `JavaScript` language selector and API key CTA turn technical promise into immediate action.
- The module should be treated as a product demo component, not just decoration.

#### 8. Security and Compliance

Links:

- ISO 27001
- SOC 2 Type 2
- GDPR Compliant
- HIPAA Compliant
- View compliance

UX notes:

- Security is a purchase-enablement section.
- It expands the brand from model vendor to enterprise platform.
- Compliance proof matters heavily for voice AI in healthcare, debt collection, and real estate.

#### 9. Footer

Footer taxonomy:

- Product: Text to Speech, Speech to Text, Speech to Speech, Voice cloning
- Platform: Voice Agents, On Prem
- Industries: Debt Collection, Healthcare, Real Estate, Small Business, E-commerce
- Legal: MSA, Privacy Policy, Privacy Notice, HIPAA, Terms, DPA, User Policy
- Developer: docs for agents and models

UX notes:

- Footer doubles as an IA map.
- It has stronger bottom-of-funnel coverage than Bevel.
- This is useful for SEO and enterprise due diligence.

### Smallest UX Strengths

- Strong technical credibility through docs, API links, language selector, and compliance links.
- Clean neutral palette supports enterprise seriousness.
- Geist plus Geist Mono creates a good product/developer rhythm.
- Compact CTAs provide clear buyer paths: sales and sign-up.
- Security section and industry links reduce enterprise friction.

### Smallest UX Risks

- Generated Framer class names make system maintenance less transparent.
- Some extracted anchor styles show default blue, which can indicate inheritance/accessibility inconsistency.
- Hero typography is relatively small for the page's main promise.
- Sparse semantic DOM may reduce accessibility and code readability.
- Placeholder alt text on logos weakens accessibility and polish.
- Product story is less emotionally memorable than Bevel.

### Smallest Rebuild Guidance

Use this component hierarchy:

1. Compact header with logo and sales CTA
2. Full-viewport hero image/pattern with centered editorial H1
3. Dual CTA row: sales and self-serve sign-up
4. Client logo strip with edge fade
5. Thesis/editorial section
6. Model capability cards
7. Use-case/platform cards
8. Code/API module with language selector and API key CTA
9. Enterprise security/compliance band
10. Dense footer grouped by products, docs, industries, and legal

Use these semantic CSS aliases over Framer token IDs:

```css
:root {
  --smallest-font-ui: Geist, Inter, system-ui, sans-serif;
  --smallest-font-mono: "Geist Mono", ui-monospace, SFMono-Regular, monospace;
  --smallest-font-display: "Cooper Lt BT Light", Georgia, serif;
  --smallest-black: #010101;
  --smallest-ink: #191919;
  --smallest-white: #fff;
  --smallest-bg: #fff;
  --smallest-surface-1: #fafafa;
  --smallest-surface-2: #f5f5f5;
  --smallest-border: #e5e5e5;
  --smallest-muted: #a1a1a1;
  --smallest-muted-strong: #737373;
  --smallest-text-secondary: #404040;
  --smallest-teal: #2a9d90;
  --smallest-mint: #1be2b3;
  --smallest-cyan: #26ffed;
  --smallest-blue: #4d80e6;
  --smallest-violet: #758fff;
  --smallest-radius-sm: 12px;
  --smallest-radius-md: 16px;
  --smallest-radius-lg: 20px;
  --smallest-radius-xl: 24px;
  --smallest-radius-pill: 999px;
}
```

---

## Comparative Analysis

### Design Philosophy

| Dimension | Bevel | Smallest AI |
|---|---|---|
| Category feeling | Consumer health companion | Technical AI infrastructure |
| Emotional tone | Calm, supportive, polished | Precise, technical, credible |
| Main proof | App ratings, users, product mockups, reviews | Models, docs, security, logos |
| CTA model | One repeated consumer CTA: Download app | Split CTA: Contact sales and Sign up |
| Visual density | High media and product mockups | Sparse modules and technical cards |
| Token quality | Human-readable design system | Framer token IDs plus generated classes |
| Best lesson for Waldo | Humanize complex health data | Add technical trust and enterprise clarity |

### Component Contrast

| Component | Bevel pattern | Smallest pattern | Recommendation for Waldo |
|---|---|---|---|
| Nav | Fixed, centered, app CTA | Compact, sales CTA | Use Bevel's persistent CTA, keep Waldo nav lighter |
| Hero | Large centered promise plus device mockups | Small editorial headline over full visual | Use Bevel's tangible product mockup but keep Smallest's restraint |
| Buttons | Pill, dark, glossy highlight | Rounded rectangle, black/gray | Consumer waitlist/app CTA should use pill; technical docs buttons can be rectangular |
| Cards | Rounded, pastel semantic gradients | Neutral, technical, code/product cards | Use Bevel for health insights, Smallest for API/trust modules |
| Trust | Reviews, ratings, privacy | Logos, compliance, docs | Waldo needs both: emotional trust and data/security proof |
| Variables | Named, maintainable | Generated token IDs | Use Bevel-style named variables in code |

### Accessibility and UX Quality

Bevel:

- Strong visual hierarchy through H1, H2, H3 structure.
- Links are clear and repeated.
- Product media likely needs careful alt text and performance handling.
- Button links are anchors, so semantic button count is zero even though CTA UI exists.

Smallest:

- DOM semantics are weaker because Framer emits generated wrappers.
- Some logo alt text is placeholder text.
- Anchor computed color can surface as default blue at parent level.
- The code module has real buttons, which is good for interactive affordances.

### Variable Strategy for Waldo

Waldo should not copy either variable system directly. Use a readable hybrid:

```css
:root {
  /* Core */
  --color-ink: #1f2025;
  --color-muted: rgba(31, 32, 37, .6);
  --color-bg: #f3f6f7;
  --color-surface: #fff;
  --color-surface-soft: #ebf0f8;

  /* Health/accent */
  --color-warm: #ffab94;
  --color-alert: #f46c41;
  --color-lilac: #b9a6ff;
  --color-teal: #83e3de;
  --color-mint: #3fffc2;
  --color-blue: #415eee;

  /* Technical/trust */
  --color-code-bg: #010101;
  --color-code-text: #fafafa;
  --color-code-muted: #a1a1a1;
  --color-trust-green: #2a9d90;

  /* Type */
  --font-ui: -apple-system, BlinkMacSystemFont, Inter, "Segoe UI", sans-serif;
  --font-mono: "Geist Mono", ui-monospace, SFMono-Regular, monospace;

  /* Shape */
  --radius-sm: 12px;
  --radius-card: 24px;
  --radius-bento: 36px;
  --radius-pill: 128px;

  /* Motion */
  --ease-premium: cubic-bezier(0.19, 1, 0.22, 1);
  --duration-hover: 300ms;
  --duration-smooth: 600ms;
}
```

### Practical Design Takeaways

1. Use Bevel's emotional product storytelling for the main Waldo flow.
2. Use Smallest's technical credibility only where Waldo needs proof: integrations, privacy, data security, model/API behavior, or product architecture.
3. Use Bevel-style named variables. Avoid Framer-style opaque token IDs.
4. Use semantic color accents. Bevel's accents map nicely to health signals and feature categories.
5. Keep one primary consumer CTA. Smallest's split sales/sign-up flow is useful only if Waldo has a B2B path.
6. Make product media concrete. Bevel wins because users see the app experience early.
7. Add a trust stack. Combine Bevel's privacy/reviews with Smallest's compliance/docs style.
8. Preserve developer credibility without making the whole site feel like infrastructure.

---

## Final Recommendation

For a Waldo-facing UI, Bevel should be the dominant reference for design language: soft system typography, friendly health colors, rounded product surfaces, tangible app mockups, privacy emphasis, and companion-like copy.

Smallest should be the secondary reference for credibility modules: code-like panels, security/compliance badges, technical proof, model/data confidence, docs-like links, and concise enterprise claims.

The strongest direction is a hybrid: Bevel's health companion warmth with Smallest's proof architecture. That gives Waldo a product that feels caring without feeling vague, and technical without feeling cold.
