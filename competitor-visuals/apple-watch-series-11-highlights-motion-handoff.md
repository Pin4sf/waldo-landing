# Apple Watch Series 11 - Highlights Motion Handoff

Source inspected: https://www.apple.com/apple-watch-series-11/
Section inspected: "Get the highlights."
Inspection date: 2026-06-03

## Purpose

This handoff documents the motion and interaction logic behind Apple's highlights carousel so we can reuse the interaction pattern for Waldo without copying Apple code, assets, or product copy.

The useful pattern is not the watch imagery. It is the motion system:

- One large horizontal media-card carousel.
- Six timed slides controlled by a compact progress dotnav.
- A play/pause control grouped with the dotnav inside a floating control pill.
- Video slides use start frames, end frames, and static fallbacks.
- Only the current slide and neighboring slides stay visually mounted after transitions.
- Desktop/tablet use enhanced inline video. Mobile falls back to static imagery on the inspected page.

## High-Level Behavior

The section is a full-width carousel immediately after the hero. It starts as a large single-card stage with adjacent slides off-canvas. The carousel advances automatically, but the user can also click the dotnav to jump to a specific slide.

Observed timing:

| Token | Value | Behavior |
|---|---:|---|
| `--shared-media-gallery-transition-duration` | `1s` | Slide-to-slide movement duration |
| `--autoplay-persist-duration` | `6.15s` | Time each slide remains active before auto-advancing |
| `--frame-transition-duration` | `200ms` | Start/end/fallback frame opacity transition |
| Dot progress animation | `6.15s linear` | Active dot expands and fills during the slide hold |

State classes observed:

| Class | Meaning |
|---|---|
| `playing` | Autoplay timeline is running |
| `paused` | Autoplay is stopped after user interaction or play/pause toggle |
| `current` | Current dot and current slide |
| `media-gallery-initialized` | JS has hydrated the carousel |
| `animating` | Pointer interaction temporarily disabled during slide transition |
| `show` | Visible start or end frame for a media block |
| `loaded` | Lazy-loaded image/frame is available |

## DOM Contract

Apple's section is built around a `MediaCardGallery` component.

Key structure:

```html
<section class="section section-highlights" data-component-list="StaggeredFadeIn">
  <h2>...</h2>

  <div id="highlights-gallery"
       class="media-card-gallery-content media-card-set paused"
       data-component-list="MediaCardGallery"
       data-preload-strategy="keyframe, prior-section"
       data-media-card-gallery>

    <div class="all-access-pass">
      <button class="play-pause-button">...</button>
      <ul role="tablist" class="dotnav-items">
        <a data-ac-gallery-trigger="highlights-gallery-item-1">...</a>
      </ul>
    </div>

    <div class="media-gallery-wrapper">
      <div class="gallery media-gallery scroll-container">
        <ul class="card-set grid card-set-full-bleed item-container">
          <li class="card-container gallery-item" data-ac-gallery-item="...">
            <div class="card tile tile-rounded">
              <div class="media-block media-container" data-media-type="video|static">
                ...
              </div>
              <div class="caption-container">
                <p class="caption" data-headline>...</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>
```

For Waldo, we should preserve the contract, not the Apple names:

- `section`
- `carousel root`
- `control pill`
- `progress dots`
- `horizontal scroll viewport`
- `grid track`
- `slide item`
- `card`
- `media layer`
- `caption/action copy layer`

## Slide Types

Apple mixes static and video slides:

| Slide type | Media layers | Behavior |
|---|---|---|
| Static | One `picture` layer | Loads responsive image and remains still |
| Video | `video` + static fallback + start frame + end frame | Shows start frame before play, video during play, end frame after completion, fallback if enhanced media is unavailable |

Video slides have this pattern:

```html
<video
  preload="none"
  muted
  playsinline
  data-inline-media
  data-inline-media-basepath="/.../anim/highlights-.../"
></video>

<picture class="fallback-frame static">...</picture>
<picture class="end-frame">...</picture>
<picture class="start-frame show">...</picture>
```

Implementation note for Waldo:

- Use static SVG/PNG/React UI states for the first build.
- If video is needed later, model each slide as `startFrame`, `motion`, `endFrame`, and `fallbackFrame`.
- Keep the frame transition separate from the slide transition. Apple uses `200ms` for frame opacity and `1s` for slide movement.

## Layout And Breakpoints

Apple uses these page breakpoints:

| Breakpoint | Class observed | Media behavior |
|---|---|---|
| Desktop / large | `enhanced`, `inline-media`, `no-small-breakpoint` | Inline videos load and play |
| Tablet / medium | `enhanced`, `inline-media`, `no-small-breakpoint` | Inline videos load and play with medium assets |
| Mobile / small | `no-enhanced`, `no-inline-media`, `small-breakpoint` | Static frames only; video sources remain empty |

Measured carousel layout:

| Viewport | Gallery height | Slide/card width | Slide/card height | Outer side padding | Gap |
|---|---:|---:|---:|---:|---:|
| 1440 desktop | `710px` wrapper, `680px` stage | `1260px` | `680px` | `90px` | `20px` |
| 1068 tablet | `658px` wrapper, `628px` stage | `934.5px` | `628px` | `66.75px` | `20px` |
| 390 mobile | `510px` wrapper, `480px` stage | `321.25px` | `480px` | `24.375px` | `20px` |

Core width formula observed:

```css
--shared-media-gallery-responsive-content-absolute-max-width: var(--global-content-max-width);
--shared-media-gallery-responsive-content-absolute-min-width: 280px;
--shared-media-gallery-viewport-content: max(87.5vw - scrollbar, min-width);
--shared-media-gallery-padding: max(6.25vw, centered-page-margin, safe-area-left, safe-area-right);
--shared-media-gallery-width: min(viewport-content, max-width);
```

For Waldo, use a simpler equivalent:

```css
.waldo-highlights {
  --slide-gap: 20px;
  --slide-width: min(87.5vw, 1260px);
  --slide-height: 680px;
  --slide-padding: max(6.25vw, 24px);
}

@media (max-width: 1068px) {
  .waldo-highlights {
    --slide-height: 628px;
  }
}

@media (max-width: 734px) {
  .waldo-highlights {
    --slide-width: max(calc(87.5vw - 20px), 280px);
    --slide-height: 480px;
    --slide-padding: max(6.25vw, 24px);
  }
}
```

## Carousel Movement

Apple relies on horizontal scrolling rather than transforms on each individual slide. After clicking the second dot:

- Slide 1 moved to `x = -1190` on desktop.
- Slide 2 became current at `x = 90`.
- Slide 3 sat next at `x = 1370`.
- Slides 4-6 had their inner card display set to `none`.

The slide elements themselves remain in a grid row. The scroll container changes position.

Grid behavior:

```css
.item-container {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(slideCount, var(--slide-width));
  gap: 20px;
  padding-inline: var(--slide-padding);
  width: fit-content;
}

.gallery-item {
  width: var(--slide-width);
  min-height: var(--slide-height);
  scroll-snap-align: center;
}

@media (max-width: 734px) {
  .gallery-item {
    scroll-snap-align: start;
  }
}
```

Recommended Waldo implementation:

- Use a horizontal scroll container with `scrollTo({ left, behavior: "smooth" })`.
- Track `activeIndex`.
- On autoplay tick, increment `activeIndex`.
- On dot click, set `activeIndex` and pause autoplay.
- Use `scroll-snap-type: x mandatory` as a fallback and for mobile drag.
- Keep `overflow-x: scroll`, hide scrollbar.

## Autoplay Logic

Apple creates a timeline group called `MediaCardGallery: AutoPlay`. The dotnav sets one timeout keyframe per item. Each timeout advances the carousel if:

- Autoplay is still playing.
- The carousel is not transitioning.
- The current index still matches the timed dot.
- The current item has finished any required media playback or playback promise.

Important JS behavior observed from the bundle:

- `persistDuration` comes from CSS, defaulting to `6.15`.
- The autoplay timeline time is set to `targetIndex * persistDuration` on dot click.
- User-initiated interactions pause autoplay.
- The first video is manually played if the gallery begins in a playing state.
- On item-change initiated, the old item pauses.
- On item-change occurred, the new item plays and the previous item resets.
- On item-change completed, autoplay resumes if still in `playing`.

Waldo pseudocode:

```tsx
const SLIDE_HOLD_MS = 6150;
const SLIDE_TRANSITION_MS = 1000;

function HighlightsCarousel({ slides }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((nextIndex: number, source: "auto" | "user") => {
    setIsTransitioning(true);
    setActiveIndex(nextIndex);

    const left = getSlideLeft(nextIndex);
    viewportRef.current?.scrollTo({ left, behavior: "smooth" });

    if (source === "user") setIsPlaying(false);

    window.setTimeout(() => {
      setIsTransitioning(false);
    }, SLIDE_TRANSITION_MS);
  }, []);

  useEffect(() => {
    if (!isPlaying || isTransitioning) return;

    const timer = window.setTimeout(() => {
      goTo((activeIndex + 1) % slides.length, "auto");
    }, SLIDE_HOLD_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex, isPlaying, isTransitioning, slides.length, goTo]);

  return null;
}
```

## Current / Neighbor Mounting

Apple keeps only a small working set visible after transitions.

Observed logic:

```js
onItemChangeCompleted(event) {
  const current = event.current.index;

  for (let i = 0; i <= maxIndex; i++) {
    slide[i].children[0].style.display =
      i === current || i === current - 1 || i === current + 1
        ? ""
        : "none";
  }
}
```

Use this for Waldo if the slides contain heavy animated UI:

```tsx
const shouldRenderHeavyMedia =
  index === activeIndex ||
  index === activeIndex - 1 ||
  index === activeIndex + 1;
```

For static cards, keep all cards mounted. For video/canvas/Lottie/large UI animation, only mount the current and neighboring slides.

## Caption Motion

Captions are not just static overlays. They have a parallax/fade relationship to the active index:

```css
.caption {
  --parallax-offset: calc((var(--progress) - var(--autoplay-progress)) * var(--ltr));
  --parallax-x: calc((var(--parallax-offset) + var(--parallax-offset) * 1.6) * var(--caption-offset));
  --parallax-opacity: calc(1 - max(var(--parallax-offset), -1 * var(--parallax-offset)) * 3.2);
  transform: translateX(var(--parallax-x));
  opacity: var(--parallax-opacity);
}
```

In plain terms:

- Current caption is fully opaque.
- Entering/leaving captions slide horizontally.
- Captions fade quickly as they move away from active progress.
- Reduced motion disables transform and keeps opacity at `1`.

Waldo implementation option:

```css
.slide-caption {
  transform: translateX(calc((var(--slide-index) - var(--active-index)) * 120px));
  opacity: max(0, calc(1 - abs(var(--slide-index) - var(--active-index)) * 3.2));
  transition: transform 1s cubic-bezier(0.2, 0, 0, 1), opacity 1s ease;
}

@media (prefers-reduced-motion: reduce) {
  .slide-caption {
    transform: none;
    opacity: 1;
    transition: none;
  }
}
```

CSS cannot directly use `abs()` everywhere yet, so implement the opacity from React state or assign classes like `is-current`, `is-prev`, and `is-next`.

## Dotnav And Progress Pill

Apple wraps dotnav and play/pause in a floating control called `all-access-pass`.

Observed values:

| Control | Desktop/tablet | Mobile |
|---|---:|---:|
| Play/pause button | `56px` round | `56px` round |
| Active progress width | `48px` | `32px` |
| Dotnav measured width | `216px` | `200px` |
| Dot height | `8px` | `8px` |
| Control activation delay | Dot opacity `740ms`, play/pause `940ms` | Same tokens, but mobile inspected as non-enhanced |

The active dot expands from a normal dot into a progress bar. Its `::after` fill animates from left to right over the slide hold duration.

Recommended Waldo dot:

```css
.dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.28);
  overflow: hidden;
  transition: width 250ms ease, background-color 250ms ease;
}

.dot.is-active {
  width: 48px;
  background: rgba(0, 0, 0, 0.18);
}

@media (max-width: 734px) {
  .dot.is-active {
    width: 32px;
  }
}

.dot.is-active::after {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  transform-origin: left;
  animation: fill-dot 6.15s linear forwards;
  background: currentColor;
}

.carousel.is-paused .dot.is-active::after {
  animation-play-state: paused;
}

@keyframes fill-dot {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
```

## Media Preloading

Apple uses `data-preload-strategy="keyframe, prior-section"`.

Observed strategy:

- Preload begins when the carousel approaches the viewport.
- The previous section's videos can gate preload.
- Video preload range is roughly `1.5 * viewportWidth`.
- Preloading checks whether the pending item is close enough to current scroll.
- Once an item loads, it is removed from the pending map.

For Waldo:

- Preload current, previous, and next slide immediately.
- Preload slide `activeIndex + 2` after the transition completes.
- Do not load all video/canvas content upfront.
- On mobile, prefer static frames or CSS-only animation unless the motion is essential.

## Accessibility And Reduced Motion

Apple's accessible controls:

- Dotnav is a `role="tablist"`.
- Each dot is an anchor trigger with a visually hidden label.
- Play/pause button has separate labels for play, pause, and replay.
- The gallery can be paused.
- In reduced motion or no-inline-media mode, media falls back to static frames.

Waldo requirements:

- Provide a visible pause/play icon button with an `aria-label`.
- Use buttons for dots rather than anchors if we are not changing URL hash.
- Respect `prefers-reduced-motion`.
- Disable autoplay when reduced motion is requested.
- Do not trap keyboard focus inside the carousel.
- Do not require autoplay for the user to access any slide.

## Waldo-Specific Adaptation

This pattern would fit a Waldo "highlights" or "three agent actions" strip:

| Apple concept | Waldo equivalent |
|---|---|
| Product feature slide | Agent action slide |
| Watch animation | Waldo UI artifact animation |
| Dotnav progress | Timed action/state indicator |
| Static fallback frame | Final UI state screenshot/card |
| Start frame | Pre-action UI state |
| End frame | Already-handled UI state |

Suggested Waldo slides:

1. The Brief - morning action card, Recovery ring, moved calendar chips.
2. The Fetch - stress intervention, pulled meeting, protected afternoon.
3. The Adjustment - week load summary, Friday cleared, team notified.
4. The Patrol - quiet background log.
5. The Spot - single pattern observation.
6. The Constellation - long-term pattern map.

Motion direction:

- Keep the Apple-like horizontal stage and timed progress dots.
- Use Waldo's warm white background, Corben headings, SF Pro Rounded body text, and zone colors.
- Avoid Apple's stark product-card neutrality if the section appears on the Waldo landing page.
- Keep copy restrained and action-focused.

## Implementation Checklist

- Build a reusable `TimedMediaCarousel` component.
- Expose props: `slides`, `holdMs`, `transitionMs`, `autoplay`, `pauseOnInteraction`, `renderHeavyMedia`.
- Use CSS vars for `--slide-width`, `--slide-height`, `--slide-gap`, `--slide-padding`.
- Use `scrollTo` for slide movement and `scroll-snap` as fallback.
- Implement progress dots with CSS animation reset on `activeIndex`.
- Pause autoplay on user dot click, play/pause click, and reduced motion.
- Keep current and neighbor heavy media mounted.
- Use static frames for mobile-first delivery.
- Add keyboard access for dot controls.
- Test at `1440`, `1068`, and `390` widths.

## Key Constants To Reuse

```ts
export const HIGHLIGHTS_MOTION = {
  holdMs: 6150,
  slideTransitionMs: 1000,
  frameTransitionMs: 200,
  desktopSlideHeight: 680,
  tabletSlideHeight: 628,
  mobileSlideHeight: 480,
  slideGap: 20,
  activeDotWidth: {
    desktop: 48,
    mobile: 32,
  },
  controlButtonSize: 56,
};
```

## Notes From Live Inspection

- Desktop and tablet loaded `large.mp4` / `medium.mp4` highlight videos.
- Mobile inspected at `390px` had `no-inline-media`; video `src` stayed empty and only static images loaded.
- Card radius was `28px` across inspected breakpoints.
- Card background was `rgb(245,245,247)` for light slides and black for the final dark slide.
- The carousel wrapper is taller than the card stage to leave room for the lower control pill.
- The dotnav/play-pause controls are visually detached from the card but tied to the carousel timeline.
- The source page's mobile behavior is a useful performance cue: do not force inline video on small viewports unless necessary.
