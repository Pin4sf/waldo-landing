# Apple Sections - Layout + Motion Code Inspection

Source pages inspected:

- https://www.apple.com/apple-watch-series-11/
- https://www.apple.com/in/health/

Sections inspected:

- Apple Watch Series 11: `Take a closer look.`
- Apple Health: `Stay close to your heart.`

Inspection date: 2026-06-03

This is a code handoff, not a copy/content inventory. It documents the DOM contract, CSS layout rules, motion wiring, responsive behavior, and interaction state Apple uses on the two sections.

---

## 1. Apple Watch Series 11 - Take a Closer Look

### Component Identity

The section is a custom product viewer. It is not a normal carousel.

Root contract:

```html
<section
  class="section section-product-viewer no-pad-top"
  data-anim-scroll-group="Product Viewer"
  data-component-list="StaggeredFadeIn">

  <div
    class="product-viewer-component"
    data-component-list="ProductViewerCore ProductViewer ProductViewerSmall"
    data-mode="2d"
    role="region"
    tabindex="0">
    ...
  </div>
</section>
```

The three important JS components are:

| Component | Responsibility |
|---|---|
| `ProductViewerCore` | Caches controls, media, breakpoints, accessibility containers, and shared viewer state. |
| `ProductViewer` | Desktop/tablet all-access-pass behavior: control expansion, pane animation, media swap, close behavior. |
| `ProductViewerSmall` | Mobile behavior: horizontal control strip, spring-based pill intro, swipe/wheel movement, mobile tour state. |

### DOM Architecture

The product viewer has two major layers:

1. Full-size media stage.
2. Floating control system.

Simplified DOM:

```html
<div class="product-viewer-component" data-mode="2d">
  <div class="product-viewer-container">
    <div class="product-viewer gallery">
      <div class="product-viewer-media pin-center">...</div>
      <div class="colornav-gallery product-viewer-media tour-colornav-gallery">...</div>
      <div class="product-viewer-media tour-video tour-sleek-design">...</div>
      <div class="product-viewer-media tour-image tour-longer-battery-life">...</div>
      <div class="product-viewer-media tour-image tour-advanced-sensors">...</div>
      <div class="product-viewer-media tour-video tour-durable-display">...</div>
      <div class="product-viewer-media tour-video tour-water-dust-resistance">...</div>
      <div class="product-viewer-media tour-image tour-personalization">...</div>
    </div>
  </div>

  <div class="all-access-pass--product-viewer">
    <div class="controls" aria-hidden="true">
      <div class="intro-element"></div>
      <ul class="control-group">
        <li class="control-item control-color" data-index="0" data-type="color-selector" data-mtype="gallery">...</li>
        <li class="control-item control-tour-sleek-design" data-index="1" data-mtype="video">...</li>
        <li class="control-item control-tour-longer-battery-life" data-index="2" data-mtype="image">...</li>
        ...
      </ul>
    </div>
  </div>
</div>
```

Each control is a collapsed pill. The pill contains:

- `.control-item-bg` for glass/scrim background.
- `.control-item-open` button.
- `.control-item-label` for the collapsed label.
- `.control-item-content-mask` for the expandable content panel.
- `.control-item-content-inner` for text, image, nav, and video UI.
- `.control-item-nav` with previous/next paddlenav buttons.

### Media Stack

Every stage item is absolutely overlaid inside `.product-viewer.gallery`.

Core CSS shape:

```css
.product-viewer-media,
.product-viewer.gallery .product-viewer-media {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  display: grid;
  max-width: none;
}

.product-viewer-media.should-hide {
  display: none;
}
```

Only the landing media is visible by default. After selecting a tour control, Apple keeps the landing media and the active tour media mounted, with the selected media fading to near `opacity: 1`.

Measured after clicking the first tour control:

| Viewport | Landing media | Selected media |
|---|---:|---:|
| 1440 desktop | `2016 x 1064`, `display:grid`, `opacity:1` | `1440 x 760`, `display:grid`, `opacity:~1` |
| 1068 tablet | `1495 x 1008`, `display:grid`, `opacity:1` | `1068 x 720`, `display:grid`, `opacity:1` |
| 390 mobile | `469 x 770`, `display:grid`, `opacity:1` | `391 x 641`, `display:flex`, `opacity:~1` |

Video tour items use a layered inline-media model:

```html
<video
  preload="none"
  muted
  playsinline
  data-inline-media
  data-inline-media-basepath="/.../anim/sleek-design/">
</video>

<picture class="fallback-frame static">...</picture>
<picture class="end-frame">...</picture>
<picture class="start-frame show">...</picture>
```

Implementation takeaway for Waldo:

- Build a stage with absolutely stacked media states.
- Use `display:none` for inactive, distant states.
- Keep only the base/landing state plus active state mounted during transitions.
- Model video states as `startFrame`, `video`, `endFrame`, `fallbackFrame`.

### Layout CSS

Root variables:

```css
:root {
  --product-viewer-height: 760px;
  --product-viewer-ref-border-radius: 28px;
}

@media (max-width: 1068px) {
  :root { --product-viewer-height: 720px; }
}

@media (max-width: 734px) {
  :root { --product-viewer-height: 640px; }
}
```

Viewer container:

```css
.product-viewer-component {
  --clip-path-progress: 1;
  width: 100%;
  height: var(--product-viewer-height);
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-color: var(--global-section-background-color-alt);
}

@media (min-width: 1441px) {
  .product-viewer-component {
    border-radius: var(--product-viewer-ref-border-radius);
  }
}

html.small-breakpoint .product-viewer-component {
  --clip-path-progress: 0;
  border: none;
  clip-path: unset;
  overflow: unset;
  background-color: transparent;
}

@media (max-width: 734px) {
  .product-viewer-container {
    clip-path: inset(
      0 calc(var(--clip-path-progress) * 6.25vw)
      0 calc(var(--clip-path-progress) * 6.25vw)
      round calc(var(--clip-path-progress) * var(--product-viewer-ref-border-radius))
    );
  }
}
```

Measured viewport behavior:

| Viewport | HTML mode classes | Component size | Control position |
|---|---|---:|---|
| 1440 desktop | `enhanced no-small-breakpoint inline-media` | `1440 x 760` | vertical stack, `x=90`, `y=258` |
| 1068 tablet | `enhanced no-small-breakpoint inline-media` | `1068 x 720` | vertical stack, `x=66.75`, `y=282` |
| 390 mobile | `no-enhanced small-breakpoint no-inline-media` | `390 x 640` | all controls share bottom strip position |

### All Access Pass Controls

The control system is called `all-access-pass--product-viewer`.

Core variables:

```css
.all-access-pass--product-viewer {
  --blur-amount: 20px;
  --max-card-height: 56px;
  --aap-expanded-width: 423px;
  --aap-contracted-height: 56px;

  --label-offset-y-distance: 0px;
  --label-offset-t-duration-enter: 300ms;
  --label-offset-t-duration-exit: 300ms;
  --label-offset-t-delay: 200ms;
  --label-offset-o-duration-enter: 300ms;
  --label-offset-o-duration-exit: 200ms;
  --label-offset-o-delay: 200ms;

  --content-offset-y-distance: 24px;
  --content-offset-y-distance-tour: 24px;
  --content-offset-y-duration-enter: 420ms;
  --content-offset-y-duration-exit: 300ms;
  --content-offset-o-duration-enter: 420ms;
  --content-offset-o-duration-exit: 200ms;

  pointer-events: none;
  z-index: 999;
}

@media (max-width: 1068px) {
  .all-access-pass--product-viewer {
    --aap-expanded-width: 374px;
  }
}

@media (max-width: 734px) {
  .all-access-pass--product-viewer {
    --aap-expanded-width: min(calc(100vw - 80px), 400px);
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: clip;
  }
}
```

Desktop/tablet collapsed control measurements:

| Control | Type | Desktop width | Tablet width | Height |
|---|---|---:|---:|---:|
| Color selector | `gallery` | `150px` | `150px` | `56px` |
| Sleek design | `video` | `186px` | `186px` | `56px` |
| Longer battery | `image` | `231px` | `231px` | `56px` |
| Advanced sensors | `image` | `231px` | `231px` | `56px` |
| Durable display | `video` | `255px` | `255px` | `56px` |
| Water/dust resistance | `video` | `293px` | `293px` | `56px` |
| Personalization | `image` | `207px` | `207px` | `56px` |

Expanded pane measurements after selecting the first tour:

| Viewport | Expanded content mask |
|---|---:|
| 1440 desktop | `423 x 156` |
| 1068 tablet | `374 x 156` |
| 390 mobile | `309 x 127` |

Label behavior:

```css
.control-item-label {
  white-space: nowrap;
  opacity: 0;
  display: flex;
  align-items: center;
}

html.no-js .control-item-label,
html.reduced-motion.no-small-breakpoint .control-item-label {
  opacity: 1;
}

@media (max-width: 734px) {
  .control-item-label {
    opacity: 1;
    transform: translateY(0) scale(1);
    transition:
      opacity var(--label-offset-o-duration-enter) ease-out var(--label-offset-o-delay),
      transform var(--label-offset-t-duration-enter) ease-out var(--label-offset-t-delay);
  }
}

.expanded .control-item-label,
.tour-engaged .control-item-label {
  opacity: 0;
}
```

### Motion Logic

Desktop/tablet expansion uses an Apple animation tween with a spring easing string.

Important JS fields observed:

```js
this._controlItemButtons = Array.from(
  this.el.querySelectorAll(".control-item-open")
);

this._controlItemContent = Array.from(
  this.el.querySelectorAll(".control-item-content-mask")
);

this.ANIM_CONSTANTS = {
  easeBoth: "cubic-bezier(0.42, 0, 0.58, 1)",
  easeIn: "cubic-bezier(0.42, 0, 1, 1)"
};
```

Expansion behavior:

```js
onInputChange(event) {
  if (this.productViewerCore._isSmall()) return;

  if (this.productViewerCore._isReducedMotion()) {
    selectedMask.style.height = `${cachedContentHeight}px`;
    return;
  }

  this.anim.addTween(selectedMask, {
    duration: PANE_PARAMS.expandCard.duration,
    delay: PANE_PARAMS.expandCard.delay,
    easeFunction: `spring(${mass}, ${stiffness}, ${damping}, ${initialVelocity})`,
    height: [null, cachedContentHeight]
  });
}
```

Breakpoint behavior:

```js
onBreakpointChange(event) {
  closeActiveTour();
  controls.removeAttribute("aria-hidden");
  introElement.style.display = "none";
  introAnimationFinished = true;

  if (event.breakpoint === "small" || event.breakpoint === "xsmall") {
    softDestroyDesktopBehavior();
  } else {
    resetAccessibilityContainers();
    resetControlDimensions();
    aapEl.style.setProperty("--blur-amount", "20px");
  }
}
```

Scroll-triggered clip-path animation:

```js
_containerAnimation() {
  const group = anim.createScrollGroup(this.el);
  group.addKeyframe(this.el, {
    start: "t - (70vh + var(--r-localnav-height))",
    end: "t - var(--r-localnav-height)",
    "--clip-path-progress": ["1", "0"],
    ease: 0.3
  });
}
```

Mobile product viewer has different motion. It uses a spring-driven bottom strip, not the desktop vertical stack.

Mobile settings observed:

```js
settings = {
  scrollVelocityThreshold: 4,
  minimumQuickSwipeDistance: 16,
  peekMax: 0.5,
  swipeDistance: 74,

  tourMorphBounce: 0.42,
  tourMorphDuration: 0.5,
  tourImageClipBounce: 0.24,
  tourImageClipDuration: 0.5,

  interactiveMorphBounce: 0,
  interactiveMorphDuration: 0.32,
  interactiveImageClipBounce: 0,
  interactiveImageClipDuration: 0.32,

  cardMorphBounce: 0.16,
  cardMorphDuration: 0.5,
  cardImageClipBounce: 0.16,
  cardImageClipDuration: 0.5
};
```

Mobile intro behavior:

- On scroll enter, controls begin as narrow 40px pills.
- First pill scales in.
- Remaining pills scale in after a short stagger.
- Widths animate from compact to measured button width.
- Control strip becomes interactive after `.activated` and `.intro-complete` are applied.
- Reduced motion skips the sequence and snaps controls into place.

Implementation takeaway for Waldo:

- Desktop: use a fixed/absolute vertical stack with individual expanding pills.
- Mobile: use a bottom horizontal pill strip with swipe/scroll state.
- Keep breakpoint behavior separate in code; Apple treats small breakpoints as a distinct implementation, not a compressed desktop layout.

---

## 2. Apple Health - Stay Close to Your Heart

### Component Identity

This section is a scroll gallery inside the reusable Apple Health section-body system.

Root contract:

```html
<section
  id="heart-health"
  class="section section-heart-health fill-red glyph-red"
  data-anim-scroll-group="Section - Heart Health">

  <div class="section-content" data-component-list="WillChange StaggeredFadeIn">
    ...
  </div>

  <div
    id="heart-health-gallery"
    class="gallery"
    data-component-list="ScrollGallery WillChange"
    aria-label="Stay Close to Your Heart gallery">
    ...
  </div>
</section>
```

### DOM Architecture

Simplified DOM:

```html
<div id="heart-health-gallery" class="gallery" data-component-list="ScrollGallery WillChange">
  <div class="card-gallery-container" data-component-list="StaggeredFadeIn">
    <div class="scroll-container">
      <ul role="list" class="item-container">
        <li class="gallery-item current" data-analytics-gallery-item-id="hypertension">
          <div class="card card-hypertension">
            <div class="card-media-container card-media-container-wide">...</div>
            <div class="card-block">...</div>
          </div>
        </li>

        <li class="gallery-item" data-analytics-gallery-item-id="heart notifications">
          <div class="card card-notifications">...</div>
        </li>

        <li class="gallery-item" data-analytics-gallery-item-id="ecg">
          <div class="card card-ecg">...</div>
        </li>

        <li class="gallery-item" data-analytics-gallery-item-id="afib">
          <div class="card card-insight">
            <div class="card-media-container card-media-container-stacked">...</div>
          </div>
        </li>

        <li class="gallery-item" data-analytics-gallery-item-id="afib history">
          <div class="card card-afib-history">
            <div class="card-media-container card-media-container-wide">...</div>
          </div>
        </li>
      </ul>
    </div>

    <div class="paddlenav paddlenav-alpha" data-gallery-paddlenav>
      <ul class="sticky-element">
        <li class="left-item">
          <button class="paddlenav-arrow paddlenav-arrow-previous">...</button>
        </li>
        <li class="right-item">
          <button class="paddlenav-arrow paddlenav-arrow-next">...</button>
        </li>
        <div class="scrim"></div>
      </ul>
    </div>
  </div>
</div>
```

### Layout CSS

Generic gallery variables:

```css
.gallery {
  --viewport-content: 980px;
  --gallery-side-padding: calc(50% - var(--viewport-content) / 2);
  --card-gap: 20px;
  --card-bg-color: var(--sk-fill);
  position: relative;
  padding-block: var(--gallery-padding-block);
}

@media (max-width: 1068px) {
  .gallery {
    --viewport-content: 692px;
  }
}

@media (max-width: 734px) {
  .gallery {
    --card-width: 304px;
    --viewport-content: 420.875px;
    --gallery-side-padding: calc(50% - var(--card-width) / 2);
  }
}
```

Scroll container:

```css
.gallery .scroll-container {
  position: relative;
  overflow-x: scroll;
  scrollbar-width: none;
  scroll-snap-type: x mandatory;
  scroll-padding: var(--gallery-side-padding);
  padding: 10px 0 var(--staggered-translate-y, 30px);
  margin: -10px 0 calc(var(--staggered-translate-y, 30px) * -1);
}

.gallery .item-container {
  display: grid;
  grid-auto-flow: column;
  grid-gap: var(--card-gap);
  width: fit-content;
  padding-left: var(--gallery-side-padding);
  padding-right: var(--gallery-side-padding);
  list-style-type: none;
}

.gallery .card {
  min-width: var(--card-width);
  width: 100%;
  height: 100%;
  scroll-snap-align: start;
  box-sizing: border-box;
}
```

Card sizing:

```css
.section-body .gallery {
  --gallery-padding-block: 90px 0;
  --card-height: 450px;
  --card-block-spacing-top: 30px;
  --card-block-spacing-inline: 15px;
  --card-stacked-content-padding: 40px;
}

@media (min-width: 1069px) {
  .section-body .gallery {
    --card-width: 372px;
  }
  .section-body .card-media-container-wide {
    --card-width: 764px;
  }
}

@media (min-width: 735px) and (max-width: 1068px) {
  .section-body .gallery {
    --card-width: 304px;
  }
  .section-body .card-media-container-wide {
    --card-width: 628px;
  }
}

@media (max-width: 1068px) {
  .section-body .gallery {
    --gallery-padding-block: 50px;
    --card-height: 368px;
    --card-block-spacing-top: 15px;
    --card-stacked-content-padding: 30px;
  }
}

@media (max-width: 734px) {
  .section-body .gallery {
    --gallery-padding-block: 50px 0;
  }
}

.section-body .card-media-container {
  min-width: var(--card-width);
  min-height: var(--card-height);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--card-bg-color);
  border-radius: var(--global-border-radius);
  overflow: hidden;
  position: relative;
}

.section-body .card-media-container-stacked {
  display: grid;
}
```

### Breakpoint Measurements

| Viewport | Section height | Gallery height | Base card | Wide card | Media height | Side padding |
|---|---:|---:|---:|---:|---:|---:|
| 1440 desktop | `1762px` | `928px` | `372px` | `764px` | `450px` | `230px` |
| 1068 tablet | `1531px` | `824px` | `304px` | `628px` | `368px` | `188px` |
| 390 mobile | `1460px` | `796px` | `304px` | `304px` | `368px` | `24.375px` |

Card sequence:

| Item | Desktop/tablet width | Mobile width | Notes |
|---|---:|---:|---|
| Item 1 | Wide card | `304px` | `card-media-container-wide` collapses to normal width on mobile. |
| Item 2 | Base card | `304px` | Standard card. |
| Item 3 | Base card | `304px` | Standard card. |
| Item 4 | Base card | `304px` | Uses `card-media-container-stacked`, image and overlay share `grid-area: 1 / 1`. |
| Item 5 | Wide card | `304px` | Wide on desktop/tablet, normal on mobile. |

After pressing next:

| Viewport | `scrollLeft` delta | Current item |
|---|---:|---|
| 1440 desktop | `784px` | Item 2 |
| 1068 tablet | `648px` | Item 2 |
| 390 mobile | `324px` | Item 2 |

The deltas match:

- Desktop: `764 wide card + 20 gap = 784`.
- Tablet: `628 wide card + 20 gap = 648`.
- Mobile: `304 card + 20 gap = 324`.

### ScrollGallery Motion Logic

Apple's `ScrollGallery` is native scroll-based, animated by a time-group tween on `scrollLeft` when paddlenav is clicked.

Relevant behavior, rewritten as readable pseudocode:

```js
mounted() {
  this.scrollContainer = this.el.querySelector(".scroll-container");
  this.itemContainer = this.el.querySelector(".item-container");
  this.dir = isRTL ? -1 : 1;

  cacheSizeInfo();
  if (model.startIndex) {
    scrollContainer.scrollLeft = itemOffsets[model.startIndex];
  }

  setCurrentIndex();
  scrollContainer.addEventListener("scroll", onScroll);
}

onScroll(event) {
  if (!isOldSafari && scrollContainer.style.scrollSnapType === "none") {
    scrollContainer.style.scrollSnapType = "x mandatory";
  }

  lastInteractionEvent = { type: "swipe", target: event.target };
  debounce(setCurrentIndex, 200);
}

setCurrentIndex() {
  const closestOffset = closest(scrollContainer.scrollLeft, itemOffsets);
  const nextIndex = itemOffsets.indexOf(closestOffset);

  if (nextIndex === currentIndex) return;

  currentIndex = nextIndex;
  trigger("ITEM_CHANGE_INITIATED", { next: items[currentIndex] });
  trigger("ITEM_CHANGE_COMPLETED", { current: items[currentIndex] });
}

animateToItem(index) {
  if (galleryTimeline) return;

  scrollContainer.removeEventListener("scroll", onScroll);
  trigger("ITEM_CHANGE_INITIATED", { next: items[index] });

  const from = scrollContainer.scrollLeft;
  const to = clamp(itemOffsets[index], 0, scrollWidth);

  if (prefersReducedMotion) {
    scrollContainer.style.scrollSnapType = "none";
    scrollContainer.scrollLeft = to;
    finish();
    return;
  }

  galleryTimeline = anim.createTimeGroup(itemContainer);
  galleryTimeline.addKeyframe(scrollContainer, {
    start: 0,
    end: model.duration,
    scrollLeft: [from, to],
    easeFunction: "easeInOutQuad"
  });

  galleryTimeline.addEvent(scrollContainer, {
    start: 0,
    onEvent: () => { scrollContainer.style.scrollSnapType = "none"; }
  });

  galleryTimeline.addEvent(scrollContainer, {
    start: galleryTimeline.duration,
    onEvent: finish
  });

  galleryTimeline.play();
}
```

Offset calculation:

```js
cacheSizeInfo() {
  contentWidth = parseFloat(getComputedStyle(itemContainer).width);
  contentPadding = parseFloat(getComputedStyle(itemContainer).paddingInlineStart);
  scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
  scrollContainerWidth = scrollContainer.offsetWidth;
  itemOffsets = [];

  let firstOffset = 0;

  items.forEach((item, index) => {
    if (index === 0) firstOffset = item.el.offsetLeft;

    if (getComputedStyle(item.el).scrollSnapAlign === "center") {
      const half = item.el.offsetWidth / 2;
      offset = floor(item.el.offsetLeft - scrollContainerWidth / 2 + half);
    } else {
      offset = floor(item.el.offsetLeft - firstOffset);
    }

    itemOffsets.push(offset * dir);
  });
}
```

### Paddlenav

The nav is right-aligned to the gallery viewport by offsetting it with the same `--gallery-side-padding`.

```css
.gallery .paddlenav {
  --paddlenav-offset: 40px;
  position: relative;
  margin-top: var(--paddlenav-offset);
  right: var(--gallery-side-padding);
  height: 100%;
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 1068px) {
  .gallery .paddlenav {
    --paddlenav-offset: 59px;
  }
}

@media (max-width: 734px) {
  .gallery .paddlenav {
    --paddlenav-offset: 63px;
  }
}

@media (max-width: 480px) {
  .gallery .paddlenav {
    position: unset;
    margin-inline: auto;
    max-width: 280px;
  }
}
```

Button states:

- Previous button is disabled at `scrollLeft = 0`.
- Disabled arrows use opacity around `0.42`.
- After pressing next, both previous and next are enabled.
- Paddlenav buttons are `36 x 36` in the inspected viewport.

### Implementation Takeaways for Waldo

For a Waldo equivalent of the Apple Health gallery:

```css
.waldo-scroll-gallery {
  --viewport-content: 980px;
  --side-padding: calc(50% - var(--viewport-content) / 2);
  --card-width: 372px;
  --wide-card-width: 764px;
  --card-height: 450px;
  --gap: 20px;
}

@media (max-width: 1068px) {
  .waldo-scroll-gallery {
    --viewport-content: 692px;
    --card-width: 304px;
    --wide-card-width: 628px;
    --card-height: 368px;
  }
}

@media (max-width: 734px) {
  .waldo-scroll-gallery {
    --viewport-content: 420.875px;
    --side-padding: calc(50% - 304px / 2);
    --wide-card-width: 304px;
  }
}

.waldo-scroll-gallery__viewport {
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-padding: var(--side-padding);
  scrollbar-width: none;
}

.waldo-scroll-gallery__track {
  display: grid;
  grid-auto-flow: column;
  gap: var(--gap);
  width: fit-content;
  padding-inline: var(--side-padding);
}

.waldo-scroll-gallery__item {
  width: var(--card-width);
  scroll-snap-align: start;
}

.waldo-scroll-gallery__item[data-wide="true"] {
  width: var(--wide-card-width);
}
```

For motion:

```js
function animateToItem(index) {
  const from = viewport.scrollLeft;
  const to = itemOffsets[index];

  if (prefersReducedMotion) {
    viewport.scrollLeft = to;
    setCurrent(index);
    return;
  }

  viewport.style.scrollSnapType = "none";

  animateNumber({
    from,
    to,
    duration: 1000,
    ease: easeInOutQuad,
    onUpdate(value) {
      viewport.scrollLeft = value;
    },
    onComplete() {
      viewport.style.scrollSnapType = "x mandatory";
      setCurrent(index);
    }
  });
}
```

---

## 3. Shared Patterns Worth Reusing

### Pattern A - State Is Stored in Classes and Scroll Position

Apple does not rely on React-style visible state in the markup. The important state is:

- `.current` on the active gallery item.
- `.should-hide` on inactive media layers.
- `.expanded` on active product-viewer controls.
- `aria-expanded` / `aria-hidden` on controls and content panels.
- `scrollLeft` on native horizontal galleries.
- HTML-level capability classes such as `enhanced`, `no-enhanced`, `small-breakpoint`, `inline-media`, `no-inline-media`, and `reduced-motion`.

### Pattern B - Desktop and Mobile Are Separate Behaviors

The Watch product viewer is the clearest example. Desktop/tablet uses a vertical expandable control stack. Mobile uses a bottom strip with swipe physics and a separate intro sequence.

Do not build this as one layout that merely wraps. Build two interaction models behind the same data model.

### Pattern C - CSS Variables Drive Component Geometry

Both sections use variables for geometry, then swap variable values at breakpoints:

- Watch: `--product-viewer-height`, `--clip-path-progress`, `--aap-expanded-width`, `--aap-contracted-height`.
- Health: `--viewport-content`, `--gallery-side-padding`, `--card-width`, `--card-height`, `--card-gap`.

### Pattern D - Reduced Motion Is First-Class

Both components short-circuit motion:

- Product viewer sets transition durations to `0ms` or snaps pane heights directly.
- ScrollGallery sets `scrollLeft` directly instead of tweening it.

For Waldo, every motion system should have a no-animation path before polish is added.

