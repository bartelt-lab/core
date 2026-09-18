# Later — deferred work

Things that were deliberately not done, with enough context to pick them up cold.

## Why this exists

These all came out of the September 2026 crawlability work (`HashRouter` →
`BrowserRouter` + prerendering). Each was a real option that got weighed and set
aside, either because the cost outranked the payoff or because it was blocked on
something outside the repo. Without a record, the next person re-derives the same
analysis — or worse, does the work without knowing why it was skipped.

Nothing here is a bug. The site works. These are judgement calls with an
expiry date on them.

---

## Video sitemap / `VideoObject` markup

**Status:** not started. **Blocked on:** editorial content, not code.

Search Console reports **0 discovered videos**, which is correct — `scripts/seo-files.mjs`
emits a plain URL sitemap with no `<video:video>` entries. But the site hosts **24
self-hosted MP4s** plus **12 YouTube embeds**: DyNAMO, leader following, vial sort,
the autonomous-driving demos, NeuroCore, Stratego, Traffic Network Builder, the
AI4BIM and Vergabepilot walkthroughs, and the student testimonials.

For a robotics lab that is arguably the most distinctive content on the site, and
footage of robots doing things performs well in video search.

**What it needs:** per video — `title`, `description`, `thumbnail_loc`,
`content_loc`, ideally `duration`.

**What already exists:** 12 poster images under `public/videos/**/*poster*`, usable
as thumbnails. The AI Team Project videos have titles and descriptions in
`src/pages/tuc/AiTeamProjects.jsx`.

**What is missing:** the demonstration videos are bare filenames
(`CTP_Showcase_2022.mp4`, `ADatIG.mp4`). Someone has to write real titles and
descriptions — that cannot be generated.

**Cheaper first step:** schema.org `VideoObject` JSON-LD on the pages that already
have video metadata. Reuses existing titles and posters, skips the ones needing
new copy.

**Trigger:** wait for Search Console to show whether the text pages get traction
first. If organic traffic is materially non-zero, video is the next lever. If it
stays flat, video metadata will not rescue it.

---

## `/ai-team-projects/dynamo` is orphaned — RESOLVED, deleted

The route was live, prerendered and in the sitemap but linked from nowhere. It
was deleted rather than linked: `/dynamo` already covers DyNAMO for readers. The
v1.2 technical PDF it linked went with it; `architecture.webp` stayed, because
`/dynamo` renders it as Fig. 1.

Kept here only as a warning: **a route in `routes.js` that nothing links to is
worse than no route at all.** Google indexes it, then surfaces a page the site
itself does not acknowledge.

---

## `hydrateRoot` instead of `createRoot`

**Status:** deliberately not done. **Cost of doing it:** medium. **Risk:** real.

`src/main.jsx` calls `createRoot`, so React discards the prerendered DOM and
re-renders from scratch. Two consequences:

1. React appends a second set of `<head>` metadata instead of adopting the
   prerendered tags. `SeoHead` works around this by removing anything marked
   `data-prerendered` on mount (see `scripts/prerender.mjs`). It works, and is
   verified, but it is a workaround.
2. The prerendered markup is painted and then thrown away rather than reused.

`hydrateRoot` would fix both. **Why it was not done:** `getInitialLanguage()` in
`i18n/LanguageContext.jsx` reads `localStorage` during render. The prerender
always produces `EN`; a visitor with `DE` stored gets a guaranteed hydration
mismatch, and React logs errors in production for a real segment of users.
Framer-motion's inline styles are a second, softer mismatch source.

**To do it properly:** inline a blocking script that resolves language before
hydration, or move language out of render-time state. Then switch and watch the
console.

---

## Dropping Playwright

**Status:** one blocker left of the three. Still not worth taking on its own.

Prerendering drives headless Chromium because the app's content did not exist
without a browser. Three reasons were on that list; two are now gone.

- ~~**Publications fetched at runtime.**~~ Resolved: the corpus is a build-time
  import (`src/data/publications.js`). It was never 180 KB either — 68 KB.
- ~~**`localStorage` for theme and language.**~~ Already SSR-safe:
  `LanguageContext.jsx` guards on `typeof localStorage === 'undefined'`. The theme
  half of this is moot — `ThemeToggle` and the runtime palette switcher were
  removed; there is one palette now (`wiki/visual-identity.md`).
- **Scroll-reveal animations.** The one that remains, and the expensive one.
  Roughly eight `whileInView` / `useInView` sites start at `opacity: 0` and only
  reveal once IntersectionObserver fires against real layout. `prerender.mjs`
  handles this by scrolling the page before capturing; `renderToString` cannot
  scroll, so every one of those sites needs a different pattern first — and
  getting it wrong ships HTML with `style="opacity:0"` on most of the content,
  which is strictly worse than today.

**If that last one is ever resolved**, `scripts/prerender.mjs` could be swapped
for `renderToString` and the Playwright dependency dropped. `src/routes.js` and
`SeoHead` would not change; only the renderer.

That is still a refactor of the app, not the build. Worth folding in if those
components are being reworked anyway; not worth a dedicated pass.

---

## Search Console Domain property

**Status:** blocked, and probably fine as is.

A *Domain* property covers every hostname and protocol in one place, but needs a
DNS TXT record on the apex. `core-network.ai` DNS is at Strato
(`shades04.rzone.de` / `docks18.rzone.de`) and we do not have access.

We used a *URL prefix* property for `https://www.core-network.ai` instead,
verified by `public/google2e6aa57e94108948.html`. **With Enforce HTTPS on, the
apex and both `http://` variants all redirect to `https://www.core-network.ai`,
so the single property covers the whole site.** There is no practical gap.

**Revisit only if** a second hostname is added, or the redirect behaviour changes.
Otherwise this is closed, not pending.
