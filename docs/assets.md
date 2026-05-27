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

## Video pipeline — `ffmpeg` (run manually)

`ffmpeg` is not installed in CI here, so compress videos locally before committing. Targets in
priority order: `public/videos/testimonials/*` (80–98 MB each), the
`autonomous_driving` demos (34–60 MB), and `videos/hero.mp4` (25 MB).

```bash
# Re-encode to a web-friendly H.264 (1280px wide cap, faststart for streaming).
# Drop -an to strip audio (use for muted background loops); keep it for testimonials.
ffmpeg -i in.mp4 -vf "scale='min(1280,iw)':-2" -c:v libx264 -crf 28 -preset slow \
       -movflags +faststart -an out.mp4

# Smaller still (VP9/WebM) when you want a modern-only path:
ffmpeg -i in.mp4 -vf "scale='min(1280,iw)':-2" -c:v libvpx-vp9 -crf 34 -b:v 0 -an out.webm

# Generate a poster frame, then convert it to WebP via the image pipeline:
ffmpeg -i in.mp4 -ss 1 -frames:v 1 poster.png   # then: npm run optimize-images
```

CRF ~26–30 is a good quality/size tradeoff; lower = better quality + bigger. Always add
`-movflags +faststart` so playback can begin before the full file downloads.

> The 665 MB of video makes the git repo heavy. Consider Git LFS or external/CDN hosting for
> the testimonial and demo clips as a follow-up.

## Checklist for a new asset

1. Put it in `public/` and reference it through `assetUrl('/path')` (the single helper in
   `src/utils/assetUrl.js`).
2. Image? Decide eager vs lazy by fold position (rule above); add `decoding="async"` and
   `width`/`height`. Then run `npm run optimize-images`.
3. Video? Use `LazyVideo` with a `poster`; compress with `ffmpeg` first.
4. `npm run build` to confirm nothing references a missing file.
