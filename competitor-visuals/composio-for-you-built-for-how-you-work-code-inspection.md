# Composio For You - Built For How You Work Code Inspection

Source inspected: https://composio.dev/for-you
Section inspected: `Built for how you work`
Inspection date: 2026-06-03

This is a code-oriented scrape of the carousel section shown in the screenshot. It focuses on the rendered DOM contract, Tailwind layout classes, shader/background layer, scroll behavior, card data, and responsive measurements.

---

## Section Contract

The section is server-rendered by Next.js and styled almost entirely through Tailwind utility classes. The client chunk for `/for-you` mostly contains the hero animation; this section itself is present in the initial HTML payload and behaves through native horizontal scrolling plus button-driven scroll movement.

Top-level section:

```html
<section class="relative overflow-hidden bg-white pb-16 md:pb-24">
  <div
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 z-40 mx-auto hidden w-full max-w-page border-black/[0.06] border-x lg:block">
  </div>

  <div class="relative z-10 mx-auto w-full max-w-page border-black/[0.06] border-t pt-16 md:pt-24">
    ...
  </div>
</section>
```

Structural reads:

- `max-w-page` resolves to the site container token `--container-page: 1240px`.
- The outer section clips horizontal overflow.
- The centered max-width wrapper receives the top divider and vertical section padding.
- A separate absolute border rail is shown only at `lg` and up.

---

## Header And Controls

Header block:

```html
<div class="flex flex-col gap-5 px-5 pb-10 md:flex-row md:items-start md:justify-between md:gap-6 md:px-10 md:pb-14">
  <div class="flex flex-col gap-3">
    <h2 class="text-black text-h1">...</h2>
    <p class="max-w-[560px] font-sans text-base text-black/70 text-wrap-balance leading-normal">...</p>
  </div>

  <div class="flex shrink-0 items-center gap-2">
    <a class="group inline-flex h-10 items-center gap-1.5 border border-black/15 bg-white px-4 font-mono text-black text-sm leading-normal tracking-default transition-colors hover:border-black/30 hover:bg-neutral-50" href="/use-cases">
      ...
    </a>

    <button aria-label="Previous personas" class="flex size-10 items-center justify-center border border-black/15 bg-white text-black transition-colors hover:border-black/30 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40" disabled type="button">
      ...
    </button>

    <button aria-label="Next personas" class="flex size-10 items-center justify-center border border-black/15 bg-white text-black transition-colors hover:border-black/30 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40" type="button">
      ...
    </button>
  </div>
</div>
```

Typography token from CSS:

```css
.text-h1 {
  font-family: var(--font-sans);
  font-size: var(--text-2xl);
  line-height: var(--leading-tight);
  font-weight: var(--font-weight-normal);
  letter-spacing: var(--tracking-tight);
}

@media (min-width: 48rem) {
  .text-h1 { font-size: var(--text-4xl); }
}

@media (min-width: 64rem) {
  .text-h1 { font-size: 44px; }
}
```

Measured header/control layout:

| Viewport | Header x | Header size | Controls position | Button size |
|---|---:|---:|---:|---:|
| 1440 desktop | `140` | `560 x 48.4` | right side, row | `40 x 40` |
| 1024 tablet | `40` | `560 x 48.4` | right side, row | `40 x 40` |
| 390 mobile | `20` | `350 x 26.4` | below header, row | `40 x 40` |

Control state:

- Previous starts disabled with opacity `0.4`.
- Next starts enabled with opacity `1`.
- After advancing once, both buttons are enabled.
- Buttons use icon-only Lucide arrows with stroke width `1.75`.

---

## Background Shader Layer

The visible blue/white grid wash is not part of the cards. It sits beneath the carousel rail as a full-width absolutely positioned visual layer.

DOM:

```html
<div class="relative overflow-hidden">
  <div
    aria-hidden="true"
    class="pointer-events-none absolute top-0 right-0 left-0 z-0 mx-auto h-[760px] w-full max-w-page">
    <div class="h-full w-full" style="position:relative">
      <img
        alt=""
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
        src="/images/shader-fallback.jpg"
        style="opacity:1" />

      <div class="shader relative h-full w-full" style="width:100%;height:100%">
        <canvas data-renderer="shaders" style="width:100%;height:100%;display:block"></canvas>
        <span style="display:contents" data-shader-id="..."></span>
        ...
      </div>
    </div>
  </div>

  <div class="relative z-10 snap-x snap-mandatory ...">
    ...
  </div>
</div>
```

Measured shader/canvas sizing:

| Viewport | Shader/canvas rect |
|---|---:|
| 1440 desktop | `1240 x 760`, centered at `x=100` |
| 1024 tablet | `1024 x 760`, full viewport width |
| 390 mobile | `390 x 760`, full viewport width |

Implementation notes:

- The fallback image remains mounted at opacity `1`.
- The shader canvas overlays the same geometry.
- The shader layer is `pointer-events-none` and z-index `0`; cards sit at z-index `10`.
- Height stays `760px` across inspected breakpoints, while the cards occupy only the top part of the shader.

---

## Carousel Rail

Scroll container:

```html
<div class="relative z-10 snap-x snap-mandatory scroll-px-5 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] md:scroll-px-10 [&::-webkit-scrollbar]:hidden">
  <div class="flex w-max">
    <div aria-hidden="true" class="w-5 shrink-0 bg-white md:w-10"></div>
    <a data-card="true" class="group relative flex ...">...</a>
    <div aria-hidden="true" class="w-4 shrink-0 bg-white"></div>
    <a data-card="true" class="group relative flex ...">...</a>
    ...
    <div aria-hidden="true" class="w-5 shrink-0 bg-white md:w-10"></div>
  </div>
</div>
```

Computed behavior:

```css
/* utility-expanded behavior */
.carousel-viewport {
  position: relative;
  z-index: 10;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scroll-padding-left: 20px;
  scrollbar-width: none;
}

@media (min-width: 48rem) {
  .carousel-viewport {
    scroll-padding-left: 40px;
  }
}

.carousel-track {
  display: flex;
  width: max-content;
}
```

Measured rail behavior:

| Viewport | Rail rect | Scroll width | Client width | Start padding | Card width | Spacer | Advance delta |
|---|---:|---:|---:|---:|---:|---:|---:|
| 1440 desktop | `1240 x 290` | `3760` | `1240` | `40` | `320` | `16` | `336` |
| 1024 tablet | `1024 x 290` | `3760` | `1024` | `40` | `320` | `16` | `336` |
| 390 mobile | `390 x 266.7` | `3280` | `390` | `20` | `280` | `16` | `296` |

The next button moves the viewport by exactly one card plus one spacer:

```js
const cardStep = isMobile ? 280 + 16 : 320 + 16;
scrollContainer.scrollBy({ left: cardStep, behavior: "smooth" });
```

State after one next click:

| Viewport | `scrollLeft` | Visible first aligned card |
|---|---:|---|
| 1440 desktop | `336` | Sales & Revenue at `x=140` |
| 1024 tablet | `336` | Sales & Revenue at `x=40` |
| 390 mobile | `296` | Sales & Revenue at `x=20` |

The native `scroll-snap-align: start` on each card keeps the card edge aligned to the padded rail origin.

---

## Card Contract

Card anchor:

```html
<a
  class="group relative flex min-h-[260px] w-[280px] shrink-0 snap-start flex-col overflow-hidden border border-black/15 bg-transparent shadow-md transition-all hover:shadow-xl md:min-h-[290px] md:w-[320px]"
  data-card="true"
  href="/product/composio-for-everyday-ai-users">

  <div class="relative z-10 flex flex-1 flex-col gap-5 p-5">
    <h3 class="font-sans text-[22px] text-black leading-tight md:text-2xl">...</h3>
    <p class="min-h-[2.8em] font-sans text-[14px] text-black/70 leading-normal">...</p>

    <div class="mt-auto flex items-center gap-2.5">
      <span class="flex size-12 items-center justify-center rounded-lg border border-black/[0.08] bg-white">
        <img width="28" height="28" class="size-7 object-contain" src="https://logos.composio.dev/api/gmail" />
      </span>
      ...
    </div>

    <div class="flex items-center justify-between border-black/[0.06] border-t pt-3">
      <span class="font-mono text-[11px] text-black/60 uppercase tracking-wider">Explore</span>
      <svg class="lucide lucide-arrow-right size-3.5 text-black/60 transition-transform group-hover:translate-x-0.5 group-hover:text-black">...</svg>
    </div>
  </div>
</a>
```

Card styling:

- Transparent card background lets the shader/grid show through.
- Border: `1px solid black / 15%`.
- Shadow: Tailwind `shadow-md`; hover upgrades to `shadow-xl`.
- Cards are flex columns with `mt-auto` pushing the icon row and CTA footer downward.
- Body copy receives `min-h-[2.8em]` to normalize card rhythm even when text length varies.
- Icon boxes are `48 x 48`, rounded `8px`, white fill, subtle border.

Measured card sizes:

| Viewport | Card size | Inner padding | Heading size | Icon box |
|---|---:|---:|---:|---:|
| Desktop/tablet | `320 x 290` | `20px` | `24px` via `md:text-2xl` | `48 x 48` |
| Mobile | `280 x ~266.7` | `20px` | `22px` | `48 x 48` |

---

## Card Data

Extracted card list:

```js
const personaCards = [
  {
    title: "Everyday AI Users",
    href: "/product/composio-for-everyday-ai-users",
    icons: ["gmail", "slack", "notion", "googlecalendar"]
  },
  {
    title: "Sales & Revenue",
    href: "/product/composio-for-sales-revenue",
    icons: ["salesforce", "hubspot", "gmail", "linkedin"]
  },
  {
    title: "Marketing & Growth",
    href: "/product/composio-for-marketing-growth",
    icons: ["hubspot", "mailchimp", "klaviyo", "google_analytics"]
  },
  {
    title: "Product & Design",
    href: "/product/composio-for-product-design",
    icons: ["figma", "linear", "notion", "posthog"]
  },
  {
    title: "Customer Support",
    href: "/product/composio-for-customer-support",
    icons: ["zendesk", "intercom", "salesforce", "hubspot"]
  },
  {
    title: "Engineering & DevOps",
    href: "/product/composio-for-engineering-devops",
    icons: ["github", "linear", "sentry", "datadog"]
  },
  {
    title: "HR & Recruiting",
    href: "/product/composio-for-hr-recruiting",
    icons: ["ashby", "lever", "bamboohr", "deel"]
  },
  {
    title: "Finance & Operations",
    href: "/product/composio-for-finance-operations",
    icons: ["stripe", "brex", "netsuite", "xero"]
  },
  {
    title: "E-Commerce",
    href: "/product/composio-for-ecommerce",
    icons: ["shopify", "stripe", "klaviyo", "googleads"]
  },
  {
    title: "Content & Media",
    href: "/product/composio-for-content-media",
    icons: ["youtube", "linkedin", "twitter", "typefully"]
  },
  {
    title: "IT & Security Ops",
    href: "/product/composio-for-it-security",
    icons: ["pagerduty", "datadog", "sentry", "auth0"]
  }
];
```

Logo URL pattern:

```js
const logoUrl = (id) => `https://logos.composio.dev/api/${id}`;
```

---

## Interaction Logic

No transform-based carousel movement was observed. The rail uses native scroll.

Likely implementation:

```js
const railRef = useRef(null);
const [canGoBack, setCanGoBack] = useState(false);
const [canGoForward, setCanGoForward] = useState(true);

function getStep() {
  const firstCard = railRef.current?.querySelector('[data-card="true"]');
  const spacer = firstCard?.nextElementSibling;
  return (firstCard?.offsetWidth ?? 0) + (spacer?.offsetWidth ?? 16);
}

function updateButtons() {
  const el = railRef.current;
  if (!el) return;

  setCanGoBack(el.scrollLeft > 0);
  setCanGoForward(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
}

function next() {
  railRef.current?.scrollBy({ left: getStep(), behavior: "smooth" });
}

function previous() {
  railRef.current?.scrollBy({ left: -getStep(), behavior: "smooth" });
}

useEffect(() => {
  const el = railRef.current;
  if (!el) return;

  updateButtons();
  el.addEventListener("scroll", updateButtons, { passive: true });
  window.addEventListener("resize", updateButtons);

  return () => {
    el.removeEventListener("scroll", updateButtons);
    window.removeEventListener("resize", updateButtons);
  };
}, []);
```

Important behavioral details:

- Button movement is one card step, not viewport-page movement.
- Scroll smoothing comes from CSS `scroll-smooth`; the button code can simply call `scrollBy`.
- Snap comes from `snap-x snap-mandatory` on the viewport and `snap-start` on cards.
- Disabled button state is visual and semantic: `disabled` attribute plus `disabled:opacity-40`.

---

## Rebuild Skeleton

```tsx
function BuiltForHowYouWorkSection() {
  const railRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative overflow-hidden bg-white pb-16 md:pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-40 mx-auto hidden w-full max-w-page border-black/[0.06] border-x lg:block" />

      <div className="relative z-10 mx-auto w-full max-w-page border-black/[0.06] border-t pt-16 md:pt-24">
        <div className="flex flex-col gap-5 px-5 pb-10 md:flex-row md:items-start md:justify-between md:gap-6 md:px-10 md:pb-14">
          <div className="flex flex-col gap-3">
            <h2 className="text-black text-h1">Built for how you work</h2>
            <p className="max-w-[560px] font-sans text-base text-black/70 text-wrap-balance leading-normal">
              ...
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <a className="group inline-flex h-10 items-center gap-1.5 border border-black/15 bg-white px-4 font-mono text-black text-sm leading-normal tracking-default transition-colors hover:border-black/30 hover:bg-neutral-50" href="/use-cases">
              All use cases
            </a>
            <button aria-label="Previous personas" className="flex size-10 items-center justify-center border border-black/15 bg-white text-black transition-colors hover:border-black/30 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40">
              <ArrowLeft className="size-4" />
            </button>
            <button aria-label="Next personas" className="flex size-10 items-center justify-center border border-black/15 bg-white text-black transition-colors hover:border-black/30 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40">
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute top-0 right-0 left-0 z-0 mx-auto h-[760px] w-full max-w-page">
            <img className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out" src="/images/shader-fallback.jpg" alt="" />
            <ShaderCanvas className="shader relative h-full w-full" />
          </div>

          <div ref={railRef} className="relative z-10 snap-x snap-mandatory scroll-px-5 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] md:scroll-px-10 [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max">
              <div aria-hidden className="w-5 shrink-0 bg-white md:w-10" />
              {personaCards.map((card) => (
                <Fragment key={card.href}>
                  <PersonaCard card={card} />
                  <div aria-hidden className="w-4 shrink-0 bg-white" />
                </Fragment>
              ))}
              <div aria-hidden className="w-5 shrink-0 bg-white md:w-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## What To Copy As A Pattern

- Use a native scroll-snap rail rather than a heavy slider dependency.
- Put a decorative shader/grid layer behind transparent cards.
- Keep card geometry fixed and simple: one card width, one spacer width, one scroll step.
- Use spacer divs instead of track padding so first/last cards align cleanly at snap positions.
- Keep the card as the link; avoid extra click targets inside the card.
- Disable nav controls based on `scrollLeft`, not a separate active-index model.

