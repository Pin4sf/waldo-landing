# New Yorker article-layout reference for Waldo

**Date:** 2026-08-01
**Status:** Researched and adapted into the Waldo article reader.
**Source standard:** First-party New Yorker production pages and first-party New Yorker product notes only. No secondary descriptions were used.

## Recommendation in one line

Borrow The New Yorker's editorial sequencing—clear article provenance, a composed hero, a quiet reading rail, and audio immediately before the prose—while expressing it entirely through Waldo's Mottle / SF Pro Rounded typography, warm-white palette, original illustrations, and restrained voice.

## What is directly observed

### Target article

On [“The Failures of the Fauci Hearing”](https://www.newyorker.com/magazine/2026/08/10/the-failures-of-the-fauci-hearing), the article hierarchy is:

1. Section rubric (“Comment”)
2. Headline
3. One-sentence dek
4. Author and publication date
5. Lead illustration and credit
6. Save utility
7. Narrated-audio module
8. Article body, beginning with a drop cap
9. Print-edition attribution
10. Related reading, newsletter prompt, and author bio

This is an effective transition from **identity → promise → provenance → image → reading utility → prose**. The title is not crowded with every action; utility controls arrive at the threshold of the article body.

The page's delivered data configures a narrated track named after the article, with a duration of 450,000 ms (7:30). Its audio mount is the first element inside the body, before the first paragraph. The same pre-body “Listen to this article” placement is visible on [“Can You Read a Book in a Quarter of an Hour?”](https://www.newyorker.com/magazine/2024/05/27/can-you-read-a-book-in-a-quarter-of-an-hour) and [“Piecing Together My Father's Murder”](https://www.newyorker.com/magazine/2023/11/27/piecing-together-my-fathers-murder).

The target page does not supply a transcript URL in its page data. That is a boundary, not a feature to imitate: Waldo should not label a transcript unless one actually exists.

### Desktop hierarchy

The target page's first-party responsive CSS uses a twelve-column grid from 768 px upward. The hero's text and artwork each span six columns; the text is centered and capped at 500 px, while the lead art may occupy the remaining viewport height (`calc(100vh - 108px)`). From 1024 px upward, the body sits in a six-column reading rail with space reserved for an aside, and the save action moves to a sticky left-side rail around the middle of the viewport.

The practical effect is a broad, confident opening followed by a much narrower reading measure. Art has enough room to establish tone, but prose becomes the dominant object once reading begins.

### Mobile hierarchy

Below 768 px, both hero halves span the full grid. The source order keeps the rubric, title, dek, byline, and date before the image. The image returns to natural height instead of forcing a viewport-filling crop. Below 1024 px, the save action returns to normal document flow and is centered above the article.

This is a useful rule for Waldo: on small screens, preserve editorial meaning before decoration, then keep listen/save controls in the reading flow where they remain discoverable.

### Audio beyond the article page

The New Yorker's own product notes describe narration as an alternate way to consume reporting, criticism, fiction, and podcasts—not as a separate article type. Its app player supports speed changes, rewinding, reading along, and background playback; a later Audio tab groups content by editorial collections and supports “Continue Listening,” downloads, and saved-library access. These are first-party product descriptions, not observations of the current web player. See [“A New Way to Listen to The New Yorker”](https://www.newyorker.com/news/news-desk/a-new-way-to-listen-to-the-new-yorker) and [“A New Home for Audio in the New Yorker App”](https://www.newyorker.com/news/news-desk/a-new-home-for-audio-in-the-new-yorker-app).

## What Waldo should adapt

### Article shell

- Keep the header order simple: topic → title → one-sentence dek → author / published date / read time.
- Give each article one meaningful Waldo artifact or original illustration rather than a generic thumbnail.
- Move from a spacious hero into a narrow prose column. Let diagrams, evidence cards, or product artifacts break wider only when they genuinely need room.
- Keep publish and updated dates visible. End with author/provenance, sources, and exactly chosen related posts before any broader call to action.
- Use a mobile stack in the same semantic order as desktop; do not reposition important metadata purely with CSS.

### Listen option

Place a compact player immediately before the first paragraph, after the hero and article metadata. Recommended initial label: **“Listen · 7 min”**; after activation, change it to an explicit **“Now playing”** state.

Minimum useful controls:

- Play / pause with an accessible text label
- Total duration and elapsed progress
- Seek backward and forward
- Playback speed
- A visible progress bar operable by keyboard
- Pause/resume state that survives ordinary in-site navigation when technically feasible

Do not autoplay. Do not turn the player into a second hero. Keep it in normal document flow on mobile. If Waldo uses generated speech rather than recorded narration, label that truthfully and offer a stop control; do not imply a human narrator.

“Continue listening” and a sticky mini-player are reasonable later enhancements, inferred from the app model rather than observed on the current web article. They are unnecessary for the first six-post library.

### Archive

The [New Yorker magazine archive](https://www.newyorker.com/archive) leads with the latest issue, then exposes a plain year-and-date history. Waldo does not need a magazine-issue metaphor, but it can borrow the confidence of a visible chronological record: one lead post, a compact list of the remaining posts, and unambiguous dates. Search, complex categories, and ranking can wait until the library is large enough to need them.

## What not to copy

- The New Yorker masthead, red/black identity, proprietary type treatment, magazine rubrics, illustration language, or exact grid proportions
- Drop caps merely to signal “editorial”; use one only if it feels native to Waldo's own article system
- Subscription pressure, dense global navigation, ad rails, or repeated recirculation modules
- A feature-rich audio library before there is enough narrated material to justify one

The transferable idea is hierarchy, not resemblance.

## Confidence and limits

- **High confidence:** content order, audio-before-prose placement, responsive breakpoints, hero/body grid behavior, action-bar variants, configured audio duration, and absence of a transcript URL. These were observed in first-party page content, delivered markup, and responsive CSS.
- **High confidence:** app audio capabilities described above. They are explicit first-party product statements.
- **Medium confidence:** the precise rendered look of the current audio player's interactive states. The in-app browser connection was unavailable during this pass, so no screenshot-based visual inspection was possible.
- **Inference:** Waldo's proposed control set, sticky mini-player, archive simplification, and brand treatment are design recommendations, not claims about The New Yorker.
