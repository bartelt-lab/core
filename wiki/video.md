# Video policy

Everything about video on this site: what may ship, how it is encoded, and where the
rules are enforced. For the step-by-step "I have a clip, what do I do" guide, see
[`video-workflow.md`](./video-workflow.md). Image loading and the `sharp` pipeline stay
in [`assets.md`](./assets.md).

## The rule

**A video ships only if it has an entry in [`src/data/videos.js`](../src/data/videos.js)
with a written description.** No entry, no ship. An entry pointing at a file that is not
on disk is equally a failure. Everything below is detail on top of that one rule.

## Why this exists

`public/` once carried ~700 MB of video, and the repo had drifted into three
uncoordinated habits at once: plain git blobs, Git LFS, and Google Drive iframes.
Three concrete failures came out of that drift:

- A documented rule ("testimonials at 720p / CRF 28") was silently undone when a later
  commit re-added the 196 MB camera originals through LFS. A doc alone did not hold.
- CI checked out without LFS, so the build published 134-byte pointer files named
  `.mp4` and three testimonials were dead on the live site.
- 15 videos lived only in a Google Drive account — unversioned, un-posterable, and
  two of them in codecs (MPEG-4 Part 2, VP8) that Chrome and Firefox cannot decode.
  Drive was transcoding on the fly and hiding that.

The fix for all three is the same: one registry, one encoder policy, one automated gate.

## Encode buckets

The bucket decides resolution and CRF. Pick it by **what the frame contains**, not by
where the file came from. The dividing question is: *does the frame carry synthetic thin
lines or small text?* If yes, never downscale.

| Bucket | Looks like | Resolution | CRF (x264) | Audio |
|---|---|---|---|---|
| `talking-head` | one person to camera, static background | 720p | 26–28 | keep, AAC 96–128k |
| `ui-capture` | app UI, dashboards, desktop captures, RViz/Gazebo panels | **native** | 20–22 | strip |
| `instrumented` | camera feed plus overlays, bounding boxes, plots, multi-pane | **native** | 20–23 | strip |
| `camera` | plain real-world footage, no overlays | 1080p | 23 | keep if meaningful |
| `background-loop` | decorative, muted, behind an overlay | native | 21–23 | strip |

Two traps worth stating outright:

- **Multi-pane content makes downscaling doubly destructive.** A 1080p quad view is four
  960×540 panes; drop the file to 720p and each pane is 640×360, which destroys the
  wrist-camera detail and the plot legibility.
- **A dark overlay argues for a *lower* CRF, not a higher one.** Darkening pushes
  everything toward the shadow end, which is exactly where H.264 banding lives. The hero
  loop sits under a 50% black scrim and is not a place to save bytes.

## Codec: H.264, single source

`.mp4` / H.264 High profile / `yuv420p` / AAC / `+faststart`. No exceptions, no
`<source>` fallback chains.

AV1 is genuinely better per byte — measured on our own testimonials, AV1 at CRF 46 beat
H.264 CRF 28 on SSIM (0.9875 vs 0.9850) using 28% less video bitrate. It still does not
ship, because **Safari has no software AV1 decoder**: AV1 needs hardware decode, which
means iPhone 15 Pro (A17 Pro) or later and M3 or later Macs. Every older iPhone and every
M1/M2 or Intel Mac installs Safari 17 and still cannot play it, and on iOS every browser
is WebKit, so Chrome on an iPhone fails identically. caniuse reports ~95% "support" only
by counting Safari 17 as partial.

Multi-codec `<source>` chains would dodge that, but they trade *storage* for *bandwidth* —
you keep the H.264 fallback plus extra renditions. Storage is our binding constraint, so
the trade runs the wrong way. If video ever moves to a CDN, revisit this.

The same single-format answer also covers reuse in slide decks: PowerPoint and Keynote
play H.264 MP4 reliably and handle WebM and AV1 badly or not at all.

## CRF, briefly

CRF is a constant *quality* target — you declare the quality, the encoder spends whatever
bytes each scene needs. That is why a 158-second low-motion clip here sits at 301 kbps
while a 20-second busy one sits at 4.9 Mbps. Both are correct.

- ±6 CRF roughly halves or doubles file size. ±1 is imperceptible.
- CRF numbers are **not comparable across encoders**. x265 CRF 28 ≈ x264 CRF 23, and
  SVT-AV1 uses 0–63 with different semantics again. Always name the encoder.
- **CRF does not bound file size.** That is how a clip reached 11.5 Mbps while still
  "using CRF". Hence the size cap below, and `-maxrate`/`-bufsize` (capped CRF) when a
  hard ceiling is needed.
- `-preset slow` is the default. `veryslow` buys ~5% for double the time.

### When re-encoding makes things worse

Raising quality on noisy real-world camera footage can produce a **larger** file than the
source: CRF 23 on one 53 MB driving clip produced 63 MB. Denoising first (`hqdn3d`) did
not win either — a plain CRF bump beat it on the same material. So:

**Only re-encode when there is a real gain.** If the output is not meaningfully smaller,
keep the original and do a lossless remux instead (`-c:v copy`) to fix faststart or drop
an audio track. A remux costs no generation loss; a re-encode always does.

## Audio

Most clips here should have **no audio track at all**. Eleven files were found carrying
tracks measuring −91 dB mean *and* max — digital silence — four of them encoded at
192 kbps, which is megabytes of encoded nothing.

- Silent or muted-by-design: `-an`. Not "quiet", removed.
- Real speech: AAC 96–128 kbps.
- Check before deciding: `ffmpeg -i in.mp4 -vn -af volumedetect -f null -` and read
  `mean_volume`. −91 dB means silence.

## Faststart

Every file needs `moov` before `mdat` (`-movflags +faststart`), or the browser cannot
start playback until it has fetched enough to find the index. Verify by confirming `moov`
appears before `mdat` in the first megabytes — the gate does this automatically.

## Posters

**Every video has a poster, named `<video-name>-poster.webp` beside it.** This is a hard
naming convention, not a suggestion: two call sites derive the poster path by string
surgery (`src.replace('.mp4', '-poster.webp')`), so a file that breaks the convention
silently produces a broken poster. Generate with:

```bash
ffmpeg -ss 3 -i clip.mp4 -frames:v 1 -vf "scale='min(1280,iw)':-2" -c:v libwebp -quality 78 clip-poster.webp
```

`core-labs-hero.mp4` is the one legacy exception, sharing `/videos/hero-poster.webp`.

## Size and hosting

Video stays in plain git. `dist/` is currently ~29% of the **1 GB GitHub Pages published
site limit**, which is comfortable; revisit the decision if it passes ~60%.

- Soft cap: **25 MB per file.** Over that the gate warns rather than fails, because
  occasionally a long desktop capture genuinely justifies it.
- Git LFS covers `public/videos/testimonials/*.mp4` only (see `.gitattributes`). Do not
  extend it: CI must then check out LFS on every deploy, and GitHub's free LFS bandwidth
  is small relative to this much video. `.github/workflows/deploy.yml` pins `lfs: true`
  precisely because that path exists.
- **Compress before committing, never after.** The 196 MB regression happened by adding
  raw camera originals to LFS after the compressed versions already existed.

## The registry

[`src/data/videos.js`](../src/data/videos.js) holds one entry per file:

```js
{
  id: 'red-block-pick-place',
  src: '/videos/demonstrations/dynamo/red-block-pick-place.mp4',
  poster: '/videos/demonstrations/dynamo/red-block-pick-place-poster.webp',
  bucket: BUCKETS.INSTRUMENTED,
  duration: 69,
  description: '...',
  frames: 'wiki/video-frames/red-block-pick-place.jpg',
  usedOn: ['src/pages/Dynamo.jsx'],
}
```

`description` is the field that matters most and the reason the rule exists. It is
written so that a person — or an agent working on this site — can answer "which clip
shows X" without opening the file. That means **describing what is literally on screen**:
overlay text, panel labels, HUD readouts, how many panes, what changes over the clip. Not
marketing copy.

`frames` points at a four-frame contact strip in [`video-frames/`](./video-frames/), kept
outside `public/` so it never ships to the site (~1.3 MB for all 35). Use it when the
description is not enough, or when writing a new description.

`usedOn` is how you find every render site before touching a file. Several videos are
used on more than one page, and one was referenced from three.

## The gate

`npm run check-videos` runs from **two places**: as a step inside `npm run build` (so it
fires locally and in CI without a separate workflow to maintain) and from a local
pre-commit hook.

Hard failures — these are always bugs:

- codec is not H.264 / `yuv420p`
- `moov` after `mdat` (no faststart)
- an audio track that is digital silence
- missing poster, or a poster that breaks the naming convention
- a video on disk with no registry entry, or an entry with no file
- **a registry entry with no description**

Warnings — build continues:

- file over the 25 MB soft cap
- unusually high bitrate for the declared bucket

## Current state

35 videos, ~190 MB, every one registered, described, postered and faststart. Zero
third-party video embeds for milestone media; YouTube is still used where a clip exists
there already and no local copy is needed.

## Outstanding

A history rewrite to drop the superseded blobs is agreed but not yet done: `.git` still
carries the pre-compression originals, and ~555 MB of orphaned LFS objects remain on the
remote. Both merged branches (`origin/develop`, `origin/codex/update-hws-2026-seminars`)
are confirmed fully contained in `main` and can be deleted as part of it. The 1080p
testimonial masters are deliberately not being preserved.
