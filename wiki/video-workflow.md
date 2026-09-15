# Adding a video

Step-by-step for getting a clip onto the site. The reasoning behind every rule here is in
[`video.md`](./video.md) — read that if you want to know *why*, read this if you just want
it done.

There are three routes. Pick by how much you want to do yourself.

---

## Route A — hand it to an agent (easiest)

Give Claude (or whichever coding agent is set up on this repo) the file or a link, plus a
sentence about what it shows and where it should appear. For example:

> Add this to the Dynamo milestones, after the SLAM one:
> https://drive.google.com/file/d/1AbC.../view
> It's the Ridgeback doing autonomous exploration in a simulated office.

The agent is expected to do all of Route C: download, identify the bucket, encode, make
the poster and the frame strip, write the description, register it, wire the call site,
and run the gate. **Google Drive links work** — a public Drive file can be pulled with:

```bash
curl -L -o clip.mp4 "https://drive.usercontent.google.com/download?id=<FILE_ID>&export=download&confirm=t"
```

Watch for two things when reviewing the result:

- The description should describe what is on screen, not what the project is about.
  If it reads like marketing copy, send it back.
- If the agent could not tell what the clip shows, it should **ask** rather than guess.
  A confidently wrong description is worse than none, because the next agent believes it.

## Route B — you have a link, someone else does the work

Drop the link in the PR or the issue with one sentence of context. The video is not on the
site until someone runs Route C, so this is a request, not a contribution. Include:

- what the clip shows, in your own words
- which page and which position it belongs to
- whether the audio matters (almost always: no)

## Route C — do it yourself

### 1. Pick the bucket

From [`video.md`](./video.md). The question is what the *frame contains*:

- a person talking to camera → `talking-head`, 720p, CRF 26–28, keep audio
- app UI, a dashboard, an RViz/Gazebo desktop capture → `ui-capture`, **native res**, CRF 20–22
- camera footage with boxes, plots, HUD readouts, multiple panes → `instrumented`, **native res**, CRF 20–23
- plain real-world footage → `camera`, 1080p, CRF 23
- decorative muted loop → `background-loop`, native res, CRF 21–23

When in doubt, do not downscale. Downscaling is the destructive choice for anything with
text or thin lines in it.

### 2. Check what you actually have

```bash
ffprobe -v error -select_streams v:0 \
  -show_entries stream=codec_name,width,height,bit_rate,r_frame_rate \
  -show_entries format=duration,bit_rate -of default=nw=1 in.mp4

# is the audio real, or digital silence? read mean_volume; -91 dB is silence
ffmpeg -i in.mp4 -vn -af volumedetect -f null -
```

Two failure modes this catches:

- **Not H.264.** MPEG-4 Part 2 and VP8 files have reached this repo. They play in Drive
  because Drive transcodes; they do not play in Chrome or Firefox from `public/`.
- **A nonsense frame rate.** One VP8 source reported `r_frame_rate` 1000/1 (variable frame
  rate on a 1 ms timebase); transcoding without pinning the rate produced a 182 MB file
  from a 47 MB source. If the rate looks absurd, add `-vf fps=30`.

### 3. Encode

```bash
# instrumented / ui-capture — native resolution, silent
ffmpeg -i in.mp4 -c:v libx264 -crf 21 -preset slow -pix_fmt yuv420p -an \
       -movflags +faststart out.mp4

# talking-head — 720p, keep speech
ffmpeg -i in.mp4 -vf "scale='min(1280,iw)':-2" -c:v libx264 -crf 28 -preset slow \
       -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart out.mp4

# already fine, just needs faststart and the silent track dropped — no generation loss
ffmpeg -i in.mp4 -c:v copy -an -movflags +faststart out.mp4
```

**Compare the output size to the source.** If it did not get meaningfully smaller, throw
the re-encode away and use the remux instead — on noisy footage a re-encode can come out
*larger* while also costing a generation of quality.

### 4. Poster and frame strip

```bash
# poster — ships with the site, required
ffmpeg -ss 3 -i out.mp4 -frames:v 1 -vf "scale='min(1280,iw)':-2" \
       -c:v libwebp -quality 78 out-poster.webp

# frame strip — context for humans and agents, stays out of public/
for p in 15 40 65 90; do
  t=$(awk -v d=$DURATION -v p=$p 'BEGIN{printf "%.2f", d*p/100}')
  ffmpeg -ss $t -i out.mp4 -frames:v 1 -vf scale=320:-2 -y /tmp/f_$p.png
done
montage /tmp/f_15.png /tmp/f_40.png /tmp/f_65.png /tmp/f_90.png \
        -tile 4x1 -geometry +1+1 -background '#222' -quality 74 \
        wiki/video-frames/<id>.jpg
```

Use `awk` rather than `bc` for the timestamps — `bc` emits `.93` without a leading zero
and ffmpeg rejects it, which silently leaves the previous clip's frames in place.

### 5. Write the description

This is the part that cannot be automated away, and the clip is not shippable without it.

Watch the clip — or read the frame strip — and write down **what is on screen**:

- what the setting is, and what is being done
- the literal overlay text, panel labels and HUD fields, quoted where they are meaningful
- how many panes, and what each one shows
- what changes between the start and the end
- anything a reader would otherwise get wrong

Good:

> Colour-conditioned pick-and-place evaluation with green, blue and red blocks on the
> table. The HUD names the commanded colour per trial and the reward reaches R=+1 on
> success. Not every trial succeeds — one green attempt runs past 27 seconds still at
> R=+0 — so the reel shows both outcomes.

Bad:

> A demonstration of our advanced manipulation capabilities.

The second one tells a future agent nothing, and it is the kind of sentence that leads to
the wrong clip being embedded on the wrong page.

Two standing constraints:

- **People.** Describe the setting and the subject matter, not the person. No names, no
  physical descriptions.
- **Anything sensitive on screen** — internal hostnames, real customer data, credentials —
  either keep the description generic or do not ship the clip. Say when footage is a
  sandbox rather than production.

### 6. Register it

Add an entry to [`src/data/videos.js`](../src/data/videos.js) with `id`, `src`, `poster`,
`bucket`, `duration`, `description`, `frames` and `usedOn`. Then wire the call site —
`LazyVideo` with a `poster` for anything below the fold.

### 7. Run the gate

```bash
npm run check-videos   # or just npm run build, which calls it
npm run lint
```

Fix anything it fails on. Size warnings are allowed through, but if a clip is over 25 MB,
consider whether it needs to be that long before shipping it.

---

## Checklist

- [ ] bucket chosen from what the frame contains
- [ ] H.264 / `yuv420p`, sane frame rate
- [ ] `+faststart`
- [ ] silent audio stripped, real speech kept at 96–128k
- [ ] output is actually smaller than the source, or it is a remux
- [ ] `<name>-poster.webp` beside the video
- [ ] frame strip in `wiki/video-frames/`
- [ ] description written, concrete, no names, sandbox noted
- [ ] registered in `src/data/videos.js` with `usedOn` filled in
- [ ] `npm run build` and `npm run lint` pass
