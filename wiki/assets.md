# Asset loading & optimization

How media is loaded on this site, and how to keep it fast when adding assets.

## Why this exists

`public/` shipped ~700 MB of assets (665 MB video, plus uncompressed PNGs — some 5–6 MB
each) and several were fetched eagerly or autoplayed off-screen. First load downloaded far
more than the viewport needed, and one hero referenced a poster that didn't exist. This doc
records the loading rules and the tooling so the site stays light as assets are added.

## Eager vs lazy — the rule

Decide by **position on the page, not file type**:

- **Above-the-fold / LCP** (the main hero still, the navbar/header logo): keep **eager**
  (no `loading="lazy"`). Give the single largest hero image `fetchPriority="high"` so the
  browser prioritizes it. Lazy-loading these *hurts* Largest Contentful Paint.
- **Below-the-fold** images: `loading="lazy"` + `decoding="async"`. The browser defers the
  fetch until the user scrolls near them.
- **Any image** that can shift layout: give it explicit `width`/`height` (or a fixed
  aspect-ratio container) so the slot doesn't collapse and cause layout shift (CLS).

Photos are cheap (KB), so lazy/eager is a modest win. **Video is where it matters** (MB–tens
of MB), so video is never downloaded or autoplayed off-screen — see below.

## Video — use `LazyVideo`

`src/components/common/LazyVideo.jsx` is a viewport-gated `<video>`. It renders
`preload="none"` with no `src` until the element nears the viewport (via
`react-intersection-observer`'s `useInView`), so off-screen clips cost **zero bytes** on load.
Background/autoplay clips also pause when scrolled out of view.

```jsx
// muted background loop (preview / hero) — plays in view, pauses out of view
<LazyVideo src={assetUrl('/videos/foo.mp4')} poster={assetUrl('/videos/foo-poster.webp')}
           autoPlay muted loop className="h-full w-full object-cover" />

// user-initiated playback (testimonials, showcases) — src still gated until in view
<LazyVideo src={assetUrl('/videos/bar.mp4')} controls className="aspect-video w-full" />
```

Always pass a `poster` so the slot paints instantly while the clip is gated. Use raw `<video>`
only for the one always-visible top-of-page hero (`HeroVideo`), and even there use
`preload="none"` + a poster.

> Everything else about video — encode buckets, the codec decision, the registry that makes
> a clip shippable, and the gate that enforces it — lives in **[`video.md`](./video.md)**,
> with the step-by-step guide in [`video-workflow.md`](./video-workflow.md). This section
> covers only how a video is *loaded* once it exists.

## Image pipeline — `npm run optimize-images`

`scripts/optimize-images.mjs` (uses `sharp`) walks `public/`, converts PNG/JPEG **larger than
250 KB** to WebP (quality 80) at a sensible max width, deletes the originals, and rewrites every
reference to them across `src/`, `public/data/*.json`, and `index.html`. It is **idempotent** —
re-running only touches new oversized assets.

- Max width by location: `members/` → 600 px, `logos/` → 500 px, everything else → 1600 px
  (tune in `widthFor()`).
- **Excluded:** `public/tuc/iclr-2025/` — a self-contained static HTML page; its assets are
  referenced by raw HTML and must not be rewritten.
- WebP is supported by all target browsers, so there is no `<picture>`/fallback.

Workflow when adding a large image: drop it in `public/`, reference it, then run
`npm run optimize-images` and commit the resulting `.webp` + the (auto-rewritten) refs.

## Video pipeline

Moved. Encode buckets, the H.264-only decision, the registry that makes a clip shippable,
Git LFS, the size budget and the `npm run check-videos` gate are all in
**[`video.md`](./video.md)**. To add a clip, follow [`video-workflow.md`](./video-workflow.md).

`scripts/compress-videos.ps1` still exists but is PowerShell-only and predates the bucket
rules — prefer the `ffmpeg` invocations in the workflow doc, which run anywhere.

## Checklist for a new asset

1. Put it in `public/` and reference it through `assetUrl('/path')` (the single helper in
   `src/utils/assetUrl.js`).
2. Image? Decide eager vs lazy by fold position (rule above); add `decoding="async"` and
   `width`/`height`. Then run `npm run optimize-images`.
3. Video? Follow [`video-workflow.md`](./video-workflow.md) — it must be encoded to its
   bucket, postered, described and registered in `src/data/videos.js`, or the build fails.
4. `npm run build` to confirm nothing references a missing file.
