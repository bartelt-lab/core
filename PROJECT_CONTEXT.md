# Project context — read before changing anything

Canonical source for the rules that are expensive to get wrong. `CLAUDE.md` imports
this file, `AGENTS.md` points at it, the pre-edit hook prints it, and
`scripts/check-videos.mjs` prints it when it fails. **Do not copy these rules into
another file** — update them here and every consumer follows. Detail lives in `wiki/`.

## Video

**A clip ships only if `src/data/videos.js` has an entry for it carrying a written
description.** `npm run build` runs `scripts/check-videos.mjs` first and fails on any
violation below. This is enforced, not advisory.

- **Description says what is literally on screen** — overlay text, panel labels, HUD
  fields, how many panes, what changes across the clip. Not marketing copy. The next
  agent picks a clip from that text without opening the file, so a confidently wrong
  description is worse than none. If you cannot tell what a clip shows, **ask**.
- **H.264 / `yuv420p` / `+faststart`, single source.** No AV1, HEVC or WebM. AV1 wins
  on quality per byte but Safari has no software AV1 decoder, so a lone AV1 source is a
  black box on every iPhone before the 15 Pro.
- **Never downscale a frame containing small text or thin lines** — UI captures,
  RViz/Gazebo recordings, plots, multi-pane instrumented footage. Downscaling is the
  destructive step, not the CRF.
- **Every video needs `<name>-poster.webp` beside it.** Two call sites derive that path
  by string replacement, so breaking the convention breaks them silently.
- **Never reintroduce Git LFS.** Removed deliberately after it published 134-byte
  pointer files as `.mp4` and killed three videos in production.
- **Strip silent audio** (`-an`). Eleven files here shipped tracks at −91 dB, four of
  them encoded at 192 kbps.
- **Re-encode only when it actually helps.** On noisy camera footage a re-encode can
  come out *larger* than the source; if it does, remux instead (`-c:v copy`) and take
  the zero-loss path.

Policy and reasoning: `wiki/video.md` · Step by step: `wiki/video-workflow.md`
Frame strips to identify a clip without opening it: `wiki/video-frames/<id>.jpg`

## Before you commit

- `npm run lint` and `npm run build` must pass.
- Enable the pre-commit gate once per clone: `git config core.hooksPath .githooks`
- No AI attribution trailers in commit messages.
