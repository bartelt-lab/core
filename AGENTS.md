# Agent context — core repo

> **Read `PROJECT_CONTEXT.md` first.** It holds the rules this repo enforces at build
> time — most importantly that a video does not ship without a registry entry and a
> written description. `npm run build` fails otherwise. This file is the repo map and
> conventions; the enforced rules live there, in one copy, deliberately not repeated
> here.

## Project state

Merged to `main`; the old `merge/*` branches are gone. Deploys to GitHub Pages
on push to `main` (`.github/workflows/deploy.yml`). This repo
(`github.com/bartelt-lab/core`) is the merged home of two sites:

- **CORE Network / CORE Labs** — React 19 + Vite 7 + Tailwind v3, BrowserRouter.
  Routes (all in `CoreShell`): `/` (CORE Network landing, `pages/Home.jsx`),
  `/network` (renders the same `Home.jsx`), `/core-labs` (`pages/CoreLabs.jsx`),
  `/demos`, `/dynamo`, `/leader-following`, `/vial-sort`, `/publications`,
  `/compute-cluster`, `/ubb`, `/ai-team-projects`
  (`pages/tuc/AiTeamProjects.jsx`) plus 11 project subpages under
  `/ai-team-projects/{tempo,lectra,fastmile,human-awareness-detection,ai4bim,
  vergabepilot,werewolfs,neurocore,stratego,traffic-network,self-driving}`
  (`pages/tuc/projects/*Project.jsx`), with `ai4ai` an alias of `ai4bim`.
  There is no `/ai-team-projects/dynamo` — it was deleted as an orphan; the
  DyNAMO page readers want is `/dynamo`.
  CORE = Cognitive Software; CORE Labs = Cognitive Robotics in Europe.
- **Bartelt Lab** (formerly `bartelt-lab.github.io`) — academic lab site,
  merged in under `/tuc/*` (`TucShell`). Routes: `/tuc`,
  `/tuc/industry-projects`, `/tuc/teaching`, `/tuc/seminar`, `/tuc/theses`,
  `/tuc/join-us`, `/tuc/projects`. TUC navbar links out to the CORE Network
  site for `/network` and `/publications` (no `/tuc/publications`).

Note: the AI Team Projects pages live in `pages/tuc/` but route under
`/ai-team-projects/*` in `CoreShell` (not `/tuc/*`).

App is split via `<Routes>` in `src/App.jsx` between `CoreShell` (core's
pill Navbar + Footer) and `TucShell` (bartelt-style Layout). Each subtree
has its own header/footer.

### Routing and prerendering — read before adding a route

The site switched from `HashRouter` to `BrowserRouter` (2026-09). Every route
is prerendered to static HTML at build time, because a client-rendered SPA
serves an empty `<div id="root">` to anything that does not run JavaScript —
crawlers, link unfurlers, and agents all saw a blank page before this.

`src/routes.js` is the single source of truth. It feeds three consumers:

- `src/components/common/SeoHead.jsx` — per-route `<title>`/`<meta>`/canonical,
  using React 19 document-metadata hoisting (no helmet library).
- `scripts/prerender.mjs` — headless Chromium renders each route and writes
  `<path>.html` + `<path>/index.html`. Build fails on an untitled, undersized,
  or wrong-canonical capture.
- `scripts/seo-files.mjs` — `robots.txt`, `sitemap.xml`, `llms.txt`, `og-image.png`.

**Adding a `<Route>` to `App.jsx` without adding it to `routes.js` leaves the
page unindexed and un-prerendered.** Aliases (two paths, one page) get a
`canonical` field pointing at the real path; they are prerendered but kept out
of the sitemap. `/network` → `/` and `/ai-team-projects/ai4ai` → `/ai4bim` are
the existing two.

`index.html` deliberately has no `<title>`/description/og tags — SeoHead owns
them. Adding static copies back would leave two of each in the document.

### Site accents — per-host colour on a lab page

A lab page can carry its host university's colour through four tokens,
`--site-{100,200,300,900}`. They are declared green in `:root` and rebound by a
`.theme-*` class on the subtree root; `.theme-ubb` on `UbbLayout`'s outer `div`
is the only live one, anchored on the Babeș-Bolyai seal `#034E84`.

**A host does not have to opt in.** No override means the tokens stay green and
the page is still correct — `/tuc` uses no accent at all.

The rule that keeps three labs looking like one network: **green owns action**
(buttons, links, active states, focus rings, everywhere), **the site accent owns
place** (kickers, rules, institutional marks, tints, never anything clickable).
Full reasoning, the AA numbers and the partnership-gradient exception are in
`wiki/visual-identity.md` — read it before adding a lab accent or touching
`/ubb`'s colour.

Note `tailwind.config.js` does not hot-reload. Restart the dev server after
adding a colour family, or every new utility silently renders as nothing.

### Feature flags

`src/config/features.js` holds build-time flags. They are plain module
constants, not `import.meta.env` reads, on purpose: every route is prerendered
to static HTML, so a runtime-only flag could make the prerendered markup and
the hydrated client disagree. Flip the value and rebuild.

- `showProjectPeople` — **currently `false`.** Gates the contributor avatar
  rows (`components/common/ProjectPeople.jsx`) on `/dynamo`, `/vial-sort`,
  `/leader-following` and the demo cards in `DemonstrationsSection` (which
  renders two rows per card: an inline one under the CTA on mobile, an absolute
  one bottom-right on desktop). Hidden on request 2026-09-17. `ProjectPeople`
  is the single choke point — every call site goes through it — and the `slugs`
  props are untouched at the call sites, so setting the flag back to `true`
  restores every row with no other edit. `demonstrations.js` still carries
  `people` / `peopleLabel` for the same reason; do not delete those fields as
  "unused" while the flag is off.

### Member deep links — `/#member-<slug>`

Until a per-member route exists (open issue 2), a person is linked as
`/#member-<slug>`, pointing at their card in the CORE Network team grid.
`pages/Home.jsx` owns both halves:

- each grid card carries `id="member-<slug>"` (plus `scroll-mt-28`, so the pill
  navbar does not cover it on a native hash jump), and
- an effect reads the hash, scrolls the card to centre, and ring-highlights it
  for 5 s. It scrolls twice — immediately and again at 600 ms — because the
  lazy member photos resolve mid-scroll and drift the target out of view.

The ring is *derived* from the hash; only its expiry is state, keyed by
`location.key`. Keep it that way: storing the slug in state meant setting state
from inside the effect, which `react-hooks/set-state-in-effect` fails the lint
on. Keying the expiry by navigation is also what makes clicking the same person
twice re-light the ring.

Slugs come from `slug` in `team.js`, so a slug rename breaks every link that
spells it out. The current callers are the five people on the `/core-labs`
institutions card (`memberLink()` in `pages/CoreLabs.jsx`). Note the grid skips
`research_assistant` and `support_staff`, so those members have no anchor to
link to.

### Files that look deletable but are not

- `public/google2e6aa57e94108948.html` — Google Search Console verification for
  the `https://www.core-network.ai` URL prefix property. Serves at the site
  root. Google re-checks it, so deleting it un-verifies the property. The
  contents (`google-site-verification: <filename>`) are load-bearing; do not
  reformat or add a trailing edit.
- `public/tuc/iclr-2025/` — standalone static subsite, not linked from any
  React page (see open issue 4).

### Source tree

```
src/
  App.jsx                          route gating
  main.jsx
  index.css                        tailwind v3 entry, no @import anymore.
                                   Also the single definition of the brand
                                   palette (:root vars), the per-host site
                                   accents (.theme-ubb) and the two named
                                   gradient classes (.wordmark-partnership,
                                   .lab-hero-wash) — see
                                   wiki/visual-identity.md before editing it
  data/
    team.js                        20 members + 4 institutions + helpers
                                   (getCoreLabsLeads, getMembersByInstitution,
                                    getMemberBySlug, getMembersGroupedByRole)
                                   NOTE: member `id` must be unique — a merge
                                   once produced duplicate ids; grep before reuse.
    projects.js                    CORE Labs projects metadata
    demonstrations.js              demo cards
    publications.json              canonical publications source, 21 entries
    publications.js                imports that JSON at build time and exports
                                   it sorted newest-first. Import from here —
                                   the old runtime fetch of
                                   /data/publications.json is gone, and with it
                                   the empty first render and the prerendered
                                   pages that shipped with no publications.
  config/
    features.js                    build-time feature flags (see Feature flags
                                   below). Currently: showProjectPeople = false
  utils/
    assetUrl.js                    BASE_URL helper, used widely in /tuc/*
  components/
    common/                        core Navbar/Footer/RightSidebar/Card/...
    about/ demonstrations/ hero/ network/ publications/ team/   core
    tuc/                           tuc-specific shells
      Layout.jsx                   minimal Tailwind sticky header + footer
      ProjectCard.jsx
      ProjectLayout.jsx            outer chrome for /tuc/core-team-projects/*
      ProjectRow.jsx
      PublicationItem.jsx          publication row (tuc-style)
    ubb/
      Layout.jsx                   /ubb header + footer. Its root div carries
                                   `theme-ubb`, which rebinds --site-* to the
                                   Babeș-Bolyai blue for the whole subtree
  pages/
    Home.jsx CoreLabs.jsx Demos.jsx Dynamo.jsx   core
                                   (Home.jsx = CORE Network landing,
                                    CoreLabs.jsx = CORE Labs page)
    ComputeCluster.jsx Publications.jsx   core
    tuc/
      Home.jsx                     bartelt landing (hero + members + contact)
      Teaching.jsx                   teaching subtree (/seminar, /theses route to it)
      JoinUs.jsx Projects.jsx AiTeamProjects.jsx
      projects/{AI4AI,Dynamo,NeuroCore,SelfDriving,Stratego,TrafficNetwork,Vergabepilot}Project.jsx
    ubb/
      Home.jsx                     CORE Labs Cluj (/ubb), third shell. Carries
                                   the only site accent — see below

public/
  data/
    publications.bib               BibTeX export (download artifact)
  members/                         member photos, full-name scheme
                                   (photoless members → themed placeholder, see
                                    TeamMemberCard)
  logos/                           partner logos (flat, kebab-case) +
                                   logos/core/ CORE brand SVGs in 4 bg variants
                                   (white/light/dark/black-background) +
                                   logos/core/legacy/ old raster logos +
                                   logos/core/avocando-icon.svg (mascot)
  favicon.{ico,svg,png} +          generated from avocando-icon.svg
    apple-touch-icon.png
  papers/                          16 publication preview images
  documents/project-descriptions/  2 PDFs, both currently unreferenced —
                                   nothing in src/ links a .pdf any more
  images/projects/{ai4ai,dynamo,neurocore,stratego,vergabepilot}/
  images/locations.png             /network page map
  videos/core-labs-hero.mp4        core hero + shared hero-poster.webp
  videos/ai-team-projects/         AI4BIM, Vergabepilot, programme showcases
  videos/demonstrations/{dynamo,vial-sort,leader-following,neurocore,stratego,robotics}/
  videos/testimonials/             student testimonial mp4s
  tuc/iclr-2025/                   static subsite kept as-is (see issue 9)
```

Image loading rules, the `LazyVideo` component and `npm run optimize-images` are in
`wiki/assets.md`. Large PNG/JPEG (>250 KB) are converted to WebP;
`public/tuc/iclr-2025/` is excluded from that pipeline.

**Video has its own rules and they are enforced.** Every clip needs an entry in
`src/data/videos.js` carrying a written description, or `npm run build` fails via
`scripts/check-videos.mjs`. Read `wiki/video.md` before touching any video, and follow
`wiki/video-workflow.md` to add one.

## Wiki — `wiki/`

Longer-form conventions and parked techniques live in the `wiki/` folder (sorts to
the bottom of the file tree). Read the relevant one before related work:

- `wiki/decks-and-print.md` — **repo side of the brand-for-print work.** The
  rules themselves live in `brand/CORE-Brand-Guidelines.pdf` (built by
  `scripts/brand-guide.mjs`), which is what gets sent to partners, designers and
  print shops — send that file, do not paraphrase it. The wiki page covers how
  the PDF is generated, where its measured numbers came from, and what is still
  undecided. Note it records that **no CMYK/Pantone spec exists** — do not
  invent one.
- `wiki/visual-identity.md` — **the colour, type and shape rules, and why the palette
  values are what they are.** The logo is the authority for brand colour; ramps are
  regenerated hue-only; `primary-600` is pinned above the AA floor on purpose. Read
  before changing a brand colour or adding a colour family.
- `wiki/project-subsites.md` — **how CORE Labs project subpages (e.g. `/dynamo`)
  should look and behave.** Visual language, hero forms, the research-question
  intro, the milestone video browser. Read this before building or restyling any
  project subpage. Reference impls: `Dynamo.jsx`, `VialSort.jsx`,
  `LeaderFollowing.jsx`.
- `wiki/assets.md` — image loading, optimization, and how video is *loaded*.
- `wiki/video.md` — **video policy: encode buckets, H.264-only, the registry and the
  gate.** A clip without a registry entry and a description does not ship. Read before
  adding, re-encoding or deleting any video.
- `wiki/video-workflow.md` — step-by-step for adding a clip, including handing a
  Google Drive link to an agent and letting it do the whole job.
- `wiki/video-frames/` — four-frame contact strip per video, for identifying a clip
  without opening it. Not shipped to the site.
- `wiki/later.md` — **deferred work with the reasoning intact.** Video sitemap,
  `hydrateRoot`, dropping the Playwright dependency. Read before re-litigating
  any of those.
- `wiki/navbar-scroll-hide.md` — how to make the navbar slide away past a scroll
  threshold on a route (removed from `/dynamo`, kept here for reuse).

## Schema — publications.json

```jsonc
{
  "id": "kebab-id",
  "title": "string",
  "authors": [
    { "name": "Last, F.", "memberSlug": "knab" | null }
  ],
  "venue": "string",
  "year": 2025,
  "date": "YYYY-MM",
  "type": "Conference|Journal|Workshop|Preprint|Thesis",
  "status": "Published|Preprint|Accepted",
  "url": "primary link or \"\"",
  "code": "code link or null",
  "image": "/papers/x.webp|.png or null (may be a PDF — see issue 2)",
  "abstract": "string or null"
}
```

`memberSlug` resolves against `slug` on each entry in `src/data/team.js`.
Currently the value is written but not yet rendered as a link (issue 2).

## Working state — what's been done

- Merge commit `2708ba8`: bartelt site copied under `/tuc/*`.
- Dedupe commit `052ac63`: deduplicated team photos, logos, videos; unified
  publications into one JSON; reorganized `/public/`.
- Hugo Academic theme stripped — `public/tuc/css/`, `public/tuc/fonts/`, the
  legacy `<link>` tags in `index.html`, and `src/styles/legacy.css` are gone.
- All `/tuc/*` pages restyled to minimal neutral Tailwind (grays, no brand
  palette). Bootstrap grid classes (`col-xs-*`, `col-md-*`, `row`,
  `container`) eliminated.
- Single team source of truth: `src/data/team.js` with 20 members carrying
  `slug` fields. Tuc Home pulls members via `getMemberBySlug` over a fixed
  slug order.

## Package versions (locked by `merge/tuc` branch)

```
react 19.2 / react-dom 19.2 / react-router-dom 7.13 / vite 7.3 /
@vitejs/plugin-react 5.1 / framer-motion 12.34 / tailwindcss 3.4 /
eslint 9.39 (flat config) / @tailwindcss/{typography,forms} /
react-icons 5.6 / react-intersection-observer 9.16 / prettier 3.3
```

`vite.config.js` `base: '/'` — kept from before the merge; works with the
existing Pages deploy.

---

## Open issues

Numbered for stable reference. Add new items at the end. Resolved
issues are deleted (see git history for what was fixed and how).

### 1. Favicon — RESOLVED
Multi-resolution favicon set (`favicon.ico/.svg`, `favicon-16/32.png`,
`apple-touch-icon.png`) generated from `logos/core/avocando-icon.svg` and wired
into `index.html`. The old `public/icons/avocado.png` has been removed.

### 2. Member detail pages — `memberSlug` lookup target
`publications.json` carries `authors[].memberSlug` and `team.js` carries
`slug` per member. There is no `/network/member/:slug` route yet, so no
component renders the link. Until that page exists, `PublicationItem`
just shows the author name as text, and anything that does want to point at a
person uses the `/#member-<slug>` deep link into the team grid instead (see
"Member deep links" above) — that is the migration target when the route lands. Plan: add a `MemberDetail` page,
route it under both `/network/member/:slug` (core) and possibly
`/tuc/member/:slug` (bartelt-style). When that exists, `PublicationItem`
(both tuc shared one + core one) can wrap author names in `<Link>`.

### 4. `tuc/iclr-2025/` orphan subsite
Static page at `public/tuc/iclr-2025/index.html` (title: "CORE at ICLR
2025"). Has its own `style.css` + `assets/`. **Not linked from any React
page.** Reachable directly at `<domain>/tuc/iclr-2025/` (a real static file,
untouched by the router or the prerender pass).
Decide: keep as direct-link archive (do nothing) OR add a link from
Publications/Home/News.

### 5. Manual browser smoke pass
Build passes consistently but nobody has clicked through the app in a
real browser since the restyle. Verify in dev (`npm run dev`):
- `/` (core home, pill nav, hero video plays)
- `/demos`, `/network`, `/dynamo` (core unaffected)
- `/tuc` (bartelt home, members grid loads from team.js, CORE Network
  affiliation logo + contact links work)
- `/tuc/teaching`, `/tuc/seminar`, `/tuc/theses` (teaching-* CSS
  still applies — those inline `<style>` blocks survived)
- `/tuc/join-us` (disclosure pattern expands/collapses)
- `/tuc/projects` (YouTube embed click-to-play)
- `/ai-team-projects` (project tiles; sidebar Overview/Projects/Voices/Archive)
- Network panel: zero 404s on `/members/*`, `/papers/*`, `/logos/*`,
  `/videos/*`, `/data/*`
- DevTools console: no React 19 deprecation warnings, no router v7
  future-flag warnings, no missing-key warnings

### 6. RightSidebar `ROUTE_SECTIONS` — keep in sync (audited 2026-06)
**Recurring gotcha — read before touching sections or the sidebar.**
`src/components/common/RightSidebar.jsx` `ROUTE_SECTIONS` maps each route to
the dots shown in the right scroll-spy nav. Every `{ id }` MUST match an
element actually rendered for that route, or the dot is dead (won't scroll /
won't highlight). Two traps:

1. **Ids can come from child components, not just the page file.** Grep the
   rendered children too:
   - `/core-labs` gets `#dynamo` and `#autonomous` from
     `components/demonstrations/DemonstrationsSection.jsx`, not `CoreLabs.jsx`.
   - project pages get `#hero #features #evaluation #extra` from
     `components/tuc/ProjectLayout.jsx`; the page's own sections (e.g. Dynamo's
     `#science #architecture`) render inside `#extra` as children.
   - `ProjectLayout` only renders `#evaluation` when `showEvalSection !== false`
     (neurocore/stratego/traffic-network/self-driving pass `false`).
   - `/` and `/network` render the same `Home.jsx`; it has NO `#partners` or
     `#publications` (it uses `PublicationMiniCarousel`, which has no id).
2. **Dot order should follow DOM order**, or scroll-spy highlights the wrong
   dot. On `/core-labs` the demos render before `#publications`.

Current verified configs: `/` and `/network` →
`hero, about, platform, team, contact`; `/core-labs` →
`hero, initiative, dynamo, autonomous, publications` (the `#team` "Lab leads"
grid was deleted 2026-09-16; its dot went with it); `/ai-team-projects`
→ `hero, active-projects, testimonials, archive`; `/compute-cluster` →
`hero, purpose, capabilities, sites, policies`. Routes with `[]` (`/dynamo`,
`/publications`) and unconfigured routes show no sidebar by design.

Gap (not broken, just no nav): the 4 `showEvalSection={false}` project pages,
`/demos`, and all `/tuc/*` pages have no `ROUTE_SECTIONS` entry. Add configs if
they should get a side nav.

### 7. Publications page filtering / grouping
`pages/Publications.jsx` (core, `/publications`) renders all 21 entries
flat, sorted by date. With hundreds of entries planned, add: year grouping,
type/venue filter, member filter (powered by `memberSlug`), search
box. Defer until count ≥ 30. (The tuc-specific `/tuc/publications` page was
removed — TUC now links to the core publications page.)

### 8. `AiTeamProjects.jsx` audit
381 lines. Restyle pass left it alone because it was Tailwind already.
Worth a once-over for: residual bartelt-only inline styles, motion
animations that might fight with the new minimal Layout, refs to removed
classes. Scroll-spy ids (now in sync, see issue 6): `hero`,
`active-projects`, `testimonials`, `archive`.

### 9. Helper consolidation for Tuc social icons
`pages/tuc/Home.jsx` has a `SOCIAL_ICON` map and `socialEntries(member)`
helper inline. `team.js` has `links: { scholar, github, twitter,
linkedin, website, ... }` but the Home page only renders
`email/scholar/website`. Other icons unused. Either expand the icon map
to cover all of `team.js` keys OR document why only those three are
shown on tuc Home (visual density / academic context).

### 10. `publications.bib` ↔ `publications.json` parity
`public/data/publications.bib` is the BibTeX export (15 entries from
bartelt source). `src/data/publications.json` has 21 entries (8 from old core
publications.js merged in). The `.bib` is currently *behind* the JSON.
Either regenerate the `.bib` from the JSON on every update (build-time
script) or stop carrying the `.bib` separately. Now that the JSON is a build-
time import, a generator script could emit the `.bib` into `dist/` and the
checked-in copy could go.

### 11. (Future) Publications page "Download BibTeX" link
Once issue 10 is resolved, surface a "Download BibTeX" button on the
Publications page that links to `/data/publications.bib`. Trivial.

### 12. Deploy workflow pins actions that target deprecated Node 20
Every run of `.github/workflows/deploy.yml` now ends with an annotation:

> Node.js 20 is deprecated. The following actions target Node.js 20 but are
> being forced to run on Node.js 24: `actions/cache@v4`, `actions/checkout@v4`,
> `actions/configure-pages@v4`, `actions/setup-node@v4`,
> `actions/upload-artifact@v4`.

Builds still pass — GitHub is running them on Node 24 anyway — so this is a
warning, not a failure. It becomes a failure whenever GitHub stops forcing the
upgrade. Bump the five pins to `@v5` (`upload-pages-artifact` is at `@v3` and
`deploy-pages` at `@v4`; check each repo for its current major rather than
assuming they move together), push, and confirm the annotation is gone.

Worth doing on a branch: a broken deploy workflow is only visible after it has
already failed on `main`.

---

## How to work in this repo

1. `main` is the live branch — pushing to it deploys to GitHub Pages. Do
   feature work on a branch and merge when ready. Ask before pushing.
2. After any change touching pages/routes/styles, run `npm run build` —
   it's fast (~2s) and catches missing imports / dead refs.
3. When editing team membership, only touch `src/data/team.js`. Both core
   and tuc Home derive from it.
4. When editing publications, only touch `src/data/publications.json`. Every
   consumer imports it through `src/data/publications.js`, at build time.
5. Asset paths: write `/<bucket>/...` (e.g. `/members/foo.png`,
   `/logos/bar.svg`, `/papers/baz.png`). Use `assetUrl()` from
   `src/utils/assetUrl.js` so the base prefix is applied.
6. Never re-introduce Hugo CSS, Bootstrap classes, or `font-awesome`/
   `academicons` icon classes in `/tuc/*` pages. Use `react-icons` for
   icons.
7. The original bartelt-lab repo is preserved at
   `D:/Programming/Websites/tuc/bartelt-lab.github.io` — read-only
   reference, do not edit or delete.
