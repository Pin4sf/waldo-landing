# Feature Handoff Performance Notes

Date: 2026-07-07

Scope: `/features`, specifically the scroll handoff from the hero to the health-card showcase.

## Browser Guidance Applied

- web.dev's CSS animation guidance recommends keeping motion on `transform` and `opacity`; animating paint-heavy properties such as `filter` can cause jank during scroll-adjacent motion.
  Source: https://web.dev/articles/animations-guide
- MDN documents `content-visibility` as a way to let the browser skip rendering work for offscreen content. This is useful for deferred cards, but risky for the immediate next viewport because it can move work into the handoff moment.
  Source: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/content-visibility
- web.dev's `content-visibility` guide calls out that skipped rendering can improve work on visible content. In this PR it is kept for later cards only, not the first two health cards.
  Source: https://web.dev/articles/content-visibility
- Chrome DevTools performance guidance centers on measuring frames, long tasks, and doing less work during interactions. The local check used Chrome's DevTools Protocol with rAF frame deltas and Long Animation Frame observations.
  Source: https://developer.chrome.com/docs/devtools/performance
- Chrome's Long Animation Frames API is useful for finding animation/rendering stalls that do not show up as classic JavaScript long tasks.
  Source: https://developer.chrome.com/docs/web-platform/long-animation-frames

## Findings

- The old homepage carousel preloader was still mounted on the features route and requested obsolete carousel media. Removing it reduces network and decode pressure before the health showcase.
- Whole-card blur on inactive health cards was the clearest reproduced paint cost. Replacing it with opacity and transform retained the reveal without forcing filter work on large card surfaces.
- The first health card is close enough to the hero that `content-visibility: auto` can push rendering into the handoff. The first two cards now stay warm; later cards remain deferred.
- The hero's blurred decorative layers are visually useful while the hero is active, but they should not keep painting once the user has committed to the health-card section.
