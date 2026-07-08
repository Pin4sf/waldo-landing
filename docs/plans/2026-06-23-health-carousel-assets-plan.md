# Health Carousel Asset Update Plan

Date: 2026-06-23
Base branch: `upstream/codex/upstream-production-ready`
Working branch: `codex/health-carousel-assets`
Source asset folder: `/Users/shivansh.fulper/Downloads/waldo-web-assets`

## Goal

Update the health carousel on the main Waldo landing page to use the final exported frames from `waldo-web-assets`.

The important requirement is visual fidelity: use the full-frame assets without cropping at desktop and tablet widths so text, device chrome, cards, and ratios stay intact. At smaller breakpoints, the image may begin cropping from the left; the mobile-specific breakpoint and composition will be decided separately.

## Current Upstream State

The clean upstream branch already has the newer carousel implementation in `components/sections/already-done-section.tsx`.

The carousel has five tabs:

1. `Mornings, sorted.`
2. `The edge, taken off.`
3. `Connecting the Dots`
4. `Gut Feeling, verified`
5. `old habits new endings`

Each tab has five expandable pills, for a total of 25 carousel panel states.

The new download folder contains exactly 25 compressed WebP frames and 25 matching PNG frames:

- PNGs: `/Users/shivansh.fulper/Downloads/waldo-web-assets/Frame 18*.png`
- WebPs: `/Users/shivansh.fulper/Downloads/waldo-web-assets/compressed/Frame 18*.webp`
- Frame dimensions: `4208x2436`
- Aspect ratio: about `1.728:1`
- WebP sizes: about `55KB` to `139KB` each

Because the WebPs are already compressed and visually complete, they should be the production assets. The PNGs should remain local source/reference files unless we explicitly want to commit high-res source assets.

## Existing Asset Problem

The current upstream carousel still imports older, individually named Figma exports from `public/figma-assets/waldo-cards`.

Those older assets are not full carousel frames. They are partial product cards, watch/phone/tablet crops, or generated placeholder compositions. Two later tabs also have no visual assets for their pills and fall back to a generic placeholder.

This is why replacing individual images one by one inside the old visual shell is the wrong direction. The final exports are full frame compositions, so the implementation should treat each pill state as a single complete frame.

## UI/CSS Direction

The new frame should become the card canvas, not an image fitted into the old two-column visual stage.

The current component has a left copy/pill column and a right visual stage, with a lot of CSS that tries to size individual phone, watch, tablet, network, and artifact exports. That made sense for partial assets. It is the wrong abstraction for the completed frames because the frame already contains the composition, spacing, device chrome, shadow, and product cards.

The premium direction is:

1. Render one full-frame WebP as an absolutely positioned image inside each carousel card.
2. Keep the card itself at the native frame ratio on desktop/tablet: `4208 / 2436`.
3. Place the headline and pill rail as an overlay on top of the frame, preferably in the left safe area where the exports have the most white space.
4. Use a subtle left-side readability scrim behind the pill overlay rather than a visible nested panel.
5. Remove the old visual-stage sizing rules for this carousel path. We should not need per-shape CSS like `phone`, `watch`, `tablet`, `network`, or `artifact` for these full frames.
6. Keep the existing carousel drag/progress behavior, but make the slide interior a stable composition rather than a responsive two-column layout.

Recommended desktop structure:

```tsx
<article className="waldo-health-frame-card">
  <Image className="waldo-health-frame-image" fill />
  <div className="waldo-health-frame-scrim" aria-hidden />
  <div className="waldo-health-frame-overlay">
    <h3>...</h3>
    <Accordion.Root>...</Accordion.Root>
  </div>
</article>
```

Recommended desktop CSS shape:

```css
.waldo-health-frame-card {
  aspect-ratio: 4208 / 2436;
  overflow: hidden;
  position: relative;
}

.waldo-health-frame-image {
  height: 100%;
  object-fit: contain;
  object-position: center center;
  width: 100%;
}

.waldo-health-frame-overlay {
  left: clamp(24px, 4vw, 56px);
  max-width: min(420px, 36%);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
}
```

The exact numbers should be tuned in-browser, but the principle is important: the article's geometry should follow the exported frame. That is how we avoid accidental desktop cropping while preserving the designer's ratios.

## Overlay/Pill Behavior

The first pill is always open for each card. There is no empty/default state.

Because one pill is always open, the close button is no longer useful. It creates a state we no longer want. The accordion should either be non-collapsible or should convert an attempted collapse back to index `0`.

The pill rail should feel like it belongs to the frame:

- Closed pills stay compact, quiet, and translucent.
- The open pill gets a soft white/surface fill, light border, and restrained shadow.
- The overlay should avoid a large surrounding card; the frame is already the card.
- The left-side scrim should be a gradient, not a hard rectangle.
- Copy should remain readable without covering important product details.

Proposed overlay CSS concept:

```css
.waldo-health-frame-scrim {
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--surface-t1) 94%, transparent) 0%,
    color-mix(in srgb, var(--surface-t1) 78%, transparent) 34%,
    transparent 62%
  );
  inset: 0;
  pointer-events: none;
  position: absolute;
}
```

This keeps the overlay readable while still feeling like it is placed over the exported frame, not boxed away from it.

## Responsive Frame Strategy

Desktop/tablet should preserve the whole frame:

- Card uses the frame aspect ratio.
- Image uses `object-fit: contain`.
- Image uses `object-position: center center`.
- The card background should match the exported frame's off-white/white background so any letterboxing is invisible.

For the narrower breakpoint before mobile, the card can intentionally become narrower than the frame:

```css
@media (max-width: 900px) and (min-width: 735px) {
  .waldo-health-frame-card {
    aspect-ratio: 1.42;
  }

  .waldo-health-frame-image {
    object-fit: cover;
    object-position: right center;
  }

  .waldo-health-frame-overlay {
    bottom: clamp(20px, 4vw, 36px);
    left: clamp(20px, 4vw, 40px);
    max-width: min(390px, calc(100% - 48px));
    top: auto;
    transform: none;
  }
}
```

That makes the crop come from the left while preserving the important product composition on the right. We should keep the final phone breakpoint separate, as planned.

## Proposed Asset Location

Copy only the compressed WebPs into:

`public/figma-assets/health-carousel/`

Use stable, semantic filenames instead of raw Figma export names. Keep the mapping in code so future exports can be swapped safely.

Example:

- `mornings-hrv.webp`
- `mornings-resting-state.webp`
- `mornings-sleep-stage.webp`
- `mornings-sleep-debt.webp`
- `mornings-action.webp`

This avoids shipping asset names like `Frame 18-17.webp` into the codebase, where they are hard to audit.

## Proposed Frame Mapping

This mapping follows the screenshot order provided on 2026-06-23. Each screenshot row is one carousel tab. The first frame in the row is both the initial visual state and the first pill's visual. There should be no separate default-image path; every carousel card starts with pill index `0` open.

| Carousel tab | Position | Figma frame label | Source WebP | Proposed filename | Visual summary |
|---|---:|---|---|---|---|
| Mornings, sorted. | 1 | `Frame 1686558135` | `Frame 18-3.webp` | `mornings-01-action.webp` | Orange iPad/calendar frame showing the recovery-driven morning move. |
| Mornings, sorted. | 2 | `Frame 1686558130` | `Frame 18.webp` | `mornings-02-hrv-watch.webp` | Apple Watch HRV frame with `65ms` rising. |
| Mornings, sorted. | 3 | `Frame 1686558133` | `Frame 18-1.webp` | `mornings-03-resting-state.webp` | Resting-state phone frame with heart/lung/O2 context. |
| Mornings, sorted. | 4 | `Frame 1686558134` | `Frame 18-2.webp` | `mornings-04-sleep.webp` | Sleep phone screen with sleep schedule and required sleep. |
| Mornings, sorted. | 5 | `Frame 1686558132` | `Frame 18-4.webp` | `mornings-05-sleep-debt.webp` | Sleep chart/debt frame with tomorrow adjustment. |
| The edge, taken off. | 1 | `Frame 1686558136` | `Frame 18-5.webp` | `edge-01-stress-elevated.webp` | Stress elevated phone frame. |
| The edge, taken off. | 2 | `Frame 1686558138` | `Frame 18-21.webp` | `edge-02-context-graph.webp` | App/signal graph feeding a recovery action card. |
| The edge, taken off. | 3 | `Frame 1686558140` | `Frame 18-22.webp` | `edge-03-run-plan.webp` | Blurred context with handoff prompt asking to run the plan. |
| The edge, taken off. | 4 | `Frame 1686558141` | `Frame 18-23.webp` | `edge-04-form-spike.webp` | Phone Form chart showing same spike, different action. |
| The edge, taken off. | 5 | `Frame 1686558142` | `Frame 18-24.webp` | `edge-05-calendar-action.webp` | Calendar frame preserving priority work and moving lower-priority work. |
| Connecting the Dots | 1 | `Frame 1686558143` | `Frame 18-6.webp` | `dots-01-patrol.webp` | Patrol timeline with Brief, Fetch Fired, and Adjustment entries. |
| Connecting the Dots | 2 | `Frame 1686558144` | `Frame 18-17.webp` | `dots-02-spot.webp` | The Spot card: Tuesdays are expensive. |
| Connecting the Dots | 3 | `Frame 1686558146` | `Frame 18-18.webp` | `dots-03-constellation.webp` | Tuesday Crash constellation node graph. |
| Connecting the Dots | 4 | `Frame 1686558147` | `Frame 18-19.webp` | `dots-04-readiness.webp` | Investor call readiness check with calendar context. |
| Connecting the Dots | 5 | `Frame 1686558148` | `Frame 18-20.webp` | `dots-05-wednesday-protected.webp` | Calendar heatmap with next Wednesday mornings protected. |
| Gut Feeling, verified | 1 | `Frame 1686558149` | `Frame 18-7.webp` | `gut-01-sleep-signal.webp` | Sleep/recovery chart frame with explanatory Waldo card. |
| Gut Feeling, verified | 2 | `Frame 1686558150` | `Frame 18-13.webp` | `gut-02-heart-rate.webp` | Recovery phone screen with heart-rate chart. |
| Gut Feeling, verified | 3 | `Frame 1686558151` | `Frame 18-14.webp` | `gut-03-stress-action.webp` | Without/with Waldo action frame for elevated HR. |
| Gut Feeling, verified | 4 | `Frame 1686558152` | `Frame 18-15.webp` | `gut-04-recovery-check.webp` | Recovery/watch readiness check and cleared evening. |
| Gut Feeling, verified | 5 | `Frame 1686558153` | `Frame 18-16.webp` | `gut-05-motion-context.webp` | Form/load/motion context chart with protected windows. |
| old habits new endings | 1 | `Frame 1686558165` | `Frame 18-8.webp` | `habits-01-deep-dive.webp` | Deep dive phone screen explaining sleep and circadian mismatch. |
| old habits new endings | 2 | `Frame 1686558166` | `Frame 18-9.webp` | `habits-02-dreaming-mode.webp` | Overnight timeline: promote patterns, merge memories, pre-build Brief. |
| old habits new endings | 3 | `Frame 1686558167` | `Frame 18-10.webp` | `habits-03-corrections.webp` | Weekly Sync undo/decline sequence, then pattern confirmation. |
| old habits new endings | 4 | `Frame 1686558168` | `Frame 18-11.webp` | `habits-04-slope.webp` | Phone overview labeled The Slope, 4 weeks ago vs today. |
| old habits new endings | 5 | `Frame 1686558169` | `Frame 18-12.webp` | `habits-05-run-it.webp` | Tuesday Crash run-it prompt with week 2/week 3 protected outcomes. |

Initial open pill choices:

| Carousel tab | Initial open pill | Initial frame |
|---|---|
| Mornings, sorted. | Position 1 | `mornings-01-action.webp` |
| The edge, taken off. | Position 1 | `edge-01-stress-elevated.webp` |
| Connecting the Dots | Position 1 | `dots-01-patrol.webp` |
| Gut Feeling, verified | Position 1 | `gut-01-sleep-signal.webp` |
| old habits new endings | Position 1 | `habits-01-deep-dive.webp` |

Interaction rule: if a user collapses the currently open pill or presses the close control, reset that card to pill index `0` instead of showing an empty/default visual state.

## Implementation Plan

1. Copy the compressed WebPs from `/Users/shivansh.fulper/Downloads/waldo-web-assets/compressed` into `public/figma-assets/health-carousel/` with semantic names.
2. Replace the old individual `waldo-cards` imports in `components/sections/already-done-section.tsx` with imports from the new health-carousel folder.
3. Keep the existing tab copy for now, but reorder each tab's pill data to match the screenshot order. Update pill labels only where the old label clearly conflicts with the final frame.
4. Remove the separate `defaultVisual` behavior from the health carousel:
   - Resolve the active panel as `openPanels[index] ?? 0`.
   - Initialize every card to pill index `0`.
   - If Radix returns an empty accordion value, set the panel back to `0`.
   - Change the close button to reset to `0`, or remove it if it no longer has a useful role.
5. Extend `HealthCardVisual` for full-frame assets:
   - Add a `shape: "frame"` or `mode: "full-frame"` option.
   - Keep the current visual stage and accordion mechanics.
   - Render full frames through a new `waldo-card-visual-shell--frame` class.
6. CSS behavior:
   - Desktop/tablet: `object-fit: contain`, `object-position: center center`, no crop.
   - Smaller breakpoint: switch the frame to `object-fit: cover` and `object-position: right center`, which crops from the left because all final frames put important content on the right side.
   - Defer phone-specific breakpoint tuning until the mobile decision is made.
7. Preserve carousel mechanics:
   - Autoplay/progress controls
   - Drag-to-scroll
   - Pill expand/collapse
   - Reduced-motion behavior
   - Existing `data-lenis-prevent` behavior
8. Avoid touching unrelated sections unless a shared CSS variable makes the new frames clip.

## Validation Plan

Run on the clean worktree:

1. `npm run lint`
2. `npm run build`
3. Start `npm run dev`
4. Render-check the `#already-handled` carousel:
   - Desktop wide viewport
   - Tablet-ish viewport
   - Narrow non-mobile breakpoint where left crop begins
5. For each carousel tab:
   - Initial state has pill index `0` open and renders the first frame from that tab's screenshot row
   - Every pill click swaps to the expected frame
   - No image is cropped on desktop/tablet
   - Text inside the frame remains legible
   - No visual overlap with pills or close button
   - No framework overlay or console errors

## Branch/Workflow

Do not implement in the current local `main` checkout. It is behind and has local changes. Use:

`/Users/shivansh.fulper/.codex/worktrees/health-carousel-assets/waldo-landing`

This worktree is based on `upstream/codex/upstream-production-ready`, which is the current upstream branch containing the production-ready homepage work.
