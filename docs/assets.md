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

## Video pipeline — `scripts/compress-videos.ps1`

Needs `ffmpeg` on PATH (`winget install Gyan.FFmpeg`). The script re-encodes to web-friendly
H.264 (libx264, `+faststart`, `yuv420p`), caps width, and writes `<name>.opt.mp4` next to each
source — pass `-Replace` to overwrite in place.

```powershell
# Test one clip (writes Student-Testim-2.opt.mp4 alongside for review)
./scripts/compress-videos.ps1 -Path public/videos/testimonials/Student-Testim-2.mp4

# Replace in place, per the settings used for this repo:
./scripts/compress-videos.ps1 -Path public/videos/testimonials      -MaxWidth 1280 -Crf 28 -Replace             # 720p, keep audio
./scripts/compress-videos.ps1 -Path public/videos/demonstrations     -MaxWidth 1920 -Crf 23 -Replace             # 1080p, keep audio
./scripts/compress-videos.ps1 -Path public/videos/core-labs-hero.mp4 -MaxWidth 1920 -Crf 23 -Replace -StripAudio # 1080p background, muted
```

Resolution rule: **talking-head testimonials → 720p (CRF 28); everything else
(detail demos, background hero) → 1080p (CRF 23)**. `-StripAudio` for muted
background/preview loops, keep audio where a clip plays with sound (testimonials, demo modal).

**Codec — H.264 only.** HEVC/H.265 is ~40–50% smaller but doesn't play in a plain `<video>`
on Firefox and often fails in Chrome (no reliable decoder); only Safari is dependable. A single
H.264 MP4 plays everywhere. Use **CRF** (constant quality), not a fixed bitrate — CRF picks the
bytes for you; ~21–25 is the 1080p web sweet spot (don't go as low as CRF 12 — near-lossless,
huge files).

Raw `ffmpeg` equivalents if you need them:

```bash
ffmpeg -i in.mp4 -vf "scale='min(1280,iw)':-2" -c:v libx264 -crf 28 -preset slow \
       -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 96k out.mp4   # -an to drop audio
ffmpeg -i in.mp4 -ss 1 -frames:v 1 poster.png   # poster frame -> npm run optimize-images
```

> Even compressed, the video lives in git. Consider Git LFS or external/CDN hosting for
> `public/videos/**` as a follow-up if repo size becomes a problem.

## Checklist for a new asset

1. Put it in `public/` and reference it through `assetUrl('/path')` (the single helper in
   `src/utils/assetUrl.js`).
2. Image? Decide eager vs lazy by fold position (rule above); add `decoding="async"` and
   `width`/`height`. Then run `npm run optimize-images`.
3. Video? Use `LazyVideo` with a `poster`; compress with `ffmpeg` first.
4. `npm run build` to confirm nothing references a missing file.
