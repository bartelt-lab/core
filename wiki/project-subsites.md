# Project subsites — design conventions

How a CORE Labs project subpage (e.g. `/dynamo`) should look and behave. The goal
is that every project page feels like the same family without being a copy-paste.

**Shared components** (`src/components/common/`) — build with these, don't re-roll them:

- `Eyebrow.jsx` → `Label` (hairline section eyebrow) and `MiniLabel` (sidebar/quiet eyebrow).
- `BackToLabsPill.jsx` → back-to-CORE-Labs pill; `variant="dark"` (on a dark hero) or
  `variant="light"` (light header).
- `ResearchQuestionCard.jsx` → the primary-tinted question + tags card.
- `ResearchQuestionIntro.jsx` → two-column objective + `ResearchQuestionCard` (use below a hero).
- `MilestoneBrowser.jsx` → the player + newest-first selector (autocycle, mount-once media).
  Each item's `media` is `{ type: 'drive', id }`, `{ type: 'video', src }` (local mp4), or
  `{ type: 'image', src, alt }` (a "Placeholder" still). Props: `items`, `label`, `pillLabel`,
  `autoCycleMs`, `aside`.

**Reference implementations** (how the pieces compose):

- `src/pages/Dynamo.jsx` — fullest version (cinematic hero + `ResearchQuestionIntro` +
  `MilestoneBrowser` + architecture/stack).
- `src/pages/VialSort.jsx` — light header with `ResearchQuestionCard`; `MilestoneBrowser`
  with mixed media (a native video + an image placeholder) and a Project-setup / About
  `aside`; pipeline / expected-outcome / metrics sections.
- `src/pages/LeaderFollowing.jsx` — light header + `MilestoneBrowser` with an ABOUT `aside`.

## The mental model

Every project has two halves: the **pitch/context** (goal, research question,
architecture, stack) and the **actual work** (experiment videos / progress over
time). A subpage leads with enough context to orient a visitor, then hands most of
the space to the work. Don't split this across tabs — it reads as one scrollable
page.

## Visual language

- **Light page.** Wrapper: `min-h-screen bg-gradient-to-b from-sky-50 via-white
  to-slate-50 font-sans text-slate-950`.
- **Two typefaces only.** Inter (`font-sans`, the default) for everything;
  `font-mono` **only for data** — indices, counters (`01/06`), key/value
  "approach" fields. No `font-heading` (Poppins) on subpages.
- **One eyebrow spec everywhere:** `text-[11px] font-bold uppercase
  tracking-[0.18em]`. Color is the only thing that varies — `text-primary-700`
  for an accent eyebrow, `text-slate-400/500` for a quiet one. Don't invent new
  sizes/tracking per section; that drift is what made the page look unprofessional
  mid-redesign.
- **Green is the highlight, used sparingly.** `primary` (green) for eyebrows, tag
  pills, the active-item ring, the hairline accent, OUTCOME bars. Everything else
  is slate. One accent, applied consistently, beats color sprinkled around.
- **Glassy accents, lightly.** Frosted cards: `rounded-2xl border border-slate-200
  bg-white/70 shadow-sm backdrop-blur-sm`. The signature accent is a single green
  hairline before a label (the `Label` component in `Dynamo.jsx`).
- Display headings are **bold** (not black, not semibold). Small subheads can be
  `font-semibold`.

## Hero

Two acceptable forms:

1. **Cinematic** (Dynamo) — a full-bleed **dark** rounded render panel
   (`rounded-3xl bg-slate-950`, `object-cover` photo, left-to-right + bottom
   gradients) sitting on the light page. Inside: uppercase tag pills, a big bold
   title, a **thin one-paragraph subtitle**, an optional frosted glass blurb card,
   and the back-to-labs pill at the **bottom** of the hero.
2. **Light header** (VialSort / LeaderFollowing) — title + thin subtitle on the
   light background, tags or a research-question card to the side. No hero photo.

Keep the subtitle thin (one paragraph). Fold the "what is this" into it rather than
adding a separate Objective section up top.

### Back-to-labs pill (steal this)

A white pill, primary text, top of the page or bottom of the hero — links to
`/core-labs`:

```jsx
<Link to="/core-labs"
  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/90 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700 shadow-lg shadow-slate-950/30 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-primary-900">
  <FaArrowLeft className="h-3 w-3" /> CORE Labs
</Link>
```

On a light header use `border-primary-200 shadow-primary-100/60` instead (VialSort).

## Research-question intro

A two-column block introducing the work (replaces a generic "results" header):

- **Left:** `Objective` eyebrow (primary) → bold heading → one paragraph.
- **Right:** a **Research question** card — `rounded-2xl border border-primary-100
  bg-white/85 p-5 shadow-xl shadow-primary-100/70 backdrop-blur`, a `Research
  question` eyebrow, the question in plain language, then primary tag pills
  (`border-primary-200 bg-primary-50 text-primary-800`) naming the stack.

Every project should pose a real research question — it's the spine of the page.

## The work: a milestone browser

The progress milestones are the centerpiece — use the `MilestoneBrowser` component
(`src/components/common/MilestoneBrowser.jsx`); don't re-roll it. Shape per the props
above. Layout (from LeaderFollowing):

- Grid `lg:grid-cols-[1fr_300px]` — **player left**, **selector right**.
- **Player:** `aspect-video` media on top (Drive embed, local video, or image
  placeholder), caption below — a label pill (`Milestone 06`), an operation eyebrow,
  bold title, summary, and a green-bordered **OUTCOME** line. Prev/next arrows + an
  `NN/total` counter. A milestone whose footage isn't ready yet uses an `image` media
  with a "Placeholder" badge until the clip lands.
- **Selector** (labelled **Milestones**): a stretching frosted card listing entries
  **newest-first**, numbered chronologically (01 = first ever, highest = latest).
  Active item gets a primary ring. The list defines the row height so it can grow
  as milestones are added.
- **Autoplay:** advance newest → oldest every ~8s; **stop the autocycle once the
  user clicks** an entry or an arrow.
- **No reload on swap:** the component mounts each milestone's media the moment it
  first becomes active (so it loads visible and autoplays) and keeps it mounted —
  revisiting is instant (`mounted` set + `activeRunRef` pattern).

## Supporting sections

Below the work, light + glassy: **System architecture** (diagram in a white card
with a `Fig. 1 ·` mono caption) beside a **Technical stack** divided list
(`layer` / `system` / mono `approach` / detail). Keep these calm — hairline
eyebrows, no heavy color.

## Video hosting (current limitation)

Most clips are Google Drive `/preview` iframes (`media.type: 'drive'`). **Drive's
player has no working loop parameter** — to loop a clip on end, host it as a real file
and use `media.type: 'video'` (a native `<video loop muted>`, like VialSort's annotated
episode in `public/videos/demonstrations/...`; the `LazyVideo` component is the
viewport-gated variant — see [assets.md](assets.md)). Migrate Drive clips when
looping/finer control is needed.
