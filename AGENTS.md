# Agent context — core repo

> **Read `PROJECT_CONTEXT.md` first.** It holds the rules this repo enforces at build
> time — most importantly that a video does not ship without a registry entry and a
> written description. `npm run build` fails otherwise. This file is the repo map and
> conventions; the enforced rules live there, in one copy, deliberately not repeated
> here.

## Project state

`main` is the live branch; a push deploys to GitHub Pages through
`.github/workflows/deploy.yml`. The merged CORE Network site uses React 19,
Vite 7, Tailwind v3, and `BrowserRouter`.

All pages now share `CoreShell`, one Navbar, and one Footer. The header has five
sections, in this order:

| Route | Content |
| --- | --- |
| `/research` | Research topics and publications |
| `/projects` | Research and industry projects |
| `/teaching` | Courses, seminars, theses, and student team projects |
| `/labs` | Robotics Lab, Cluj Lab, and Kaiser compute infrastructure |
| `/team` | All team roles, contacts, and openings |

`/` remains the network homepage. Institutions are a shared filter, not separate
sites: All, TUC, MDS (Rostock), and UBB. The query parameter carries the selection
between pages; see `wiki/navigation.md`.

Lab details live at `/labs/robotics` and `/labs/cluj`; `/compute-cluster` remains
under Labs. Research detail URLs `/dynamo`, `/leader-following`, and `/vial-sort`
stay under Projects. Existing `/ai-team-projects/*` detail URLs stay under
Teaching, even though their files live in `pages/tuc/projects/`.

Old institutional and overview addresses redirect to the shared sections.
Examples: `/tuc` → `/research?institution=TUC`, `/ubb` →
`/labs?institution=UBB`, `/core-labs` → `/labs`, and `/ai-team-projects` →
`/teaching#student-projects`. The old TUC/UBB layouts and landing pages are removed.
CORE = Cognitive Software; CORE Labs = Cognitive Robotics in Europe.

### Routing and prerendering — read before adding a route

Every public route is prerendered to static HTML at build time. `src/routes.js`
is the shared route metadata and legacy redirect table:

- `section` selects Research, Projects, Teaching, Labs, or Team in the Navbar,
  including on detail pages whose URLs do not start with that section.
- `source` points to the current page file for sitemap modification dates.
- Old paths have `redirectTo` and a query-free `canonical` destination. They stay
  reachable and prerendered but are excluded from the sitemap.

`App.jsx` declares live routes. `LegacyRedirect.jsx` replaces retired addresses
before mounting page content. `SeoHead.jsx` owns titles, descriptions, canonical
links, and social metadata. `scripts/prerender.mjs` writes `<path>.html` and
`<path>/index.html`; `scripts/seo-files.mjs` writes the sitemap, robots, `llms.txt`,
and social image.

**Add new routes to both `App.jsx` and `routes.js`.** Filtered URLs use the
unfiltered page canonical. `index.html` preserves historic `/#/...` links and
intentionally contains no duplicate title, description, or social metadata.
See `wiki/navigation.md` for the URL contract and `tests/navigation.test.mjs`
for migration regression checks.

### Site accents — per-host colour on a lab page

A lab page can carry its host university's colour through four tokens,
`--site-{100,200,300,900}`. They are declared green in `:root` and rebound by a
`.theme-*` class on the subtree root; `.theme-ubb` on `pages/labs/ClujLab.jsx`
is the live blue variant, anchored on the Babeș-Bolyai seal `#034E84`.

**A host does not have to opt in.** No override means the tokens stay green and
the page is still correct — the Robotics Lab uses the default green tokens.

The rule that keeps three labs looking like one network: **green owns action**
(buttons, links, active states, focus rings, everywhere), **the site accent owns
place** (kickers, rules, institutional marks, tints, never anything clickable).
Full reasoning, the AA numbers and the partnership-gradient exception are in
`wiki/visual-identity.md` — read it before adding a lab accent or touching
`/labs/cluj`'s colour.

Note `tailwind.config.js` does not hot-reload. Restart the dev server after
adding a colour family, or every new utility silently renders as nothing.

### Feature flags

`src/config/features.js` holds build-time flags. They are plain module
constants, not `import.meta.env` reads, on purpose: every route is prerendered
to static HTML, so a runtime-only flag could make the prerendered markup and
the hydrated client disagree. Flip the value and rebuild.

- `showProjectPeople` — **currently `false`.** Gates contributor avatar rows in
  `components/common/ProjectPeople.jsx`, used by research details and retained
  demo components. Hidden on request 2026-09-17. Keep the caller's `slugs` and
  `demonstrations.js`'s `people` / `peopleLabel` fields so the flag can restore
  rows wherever those components render. Do not delete them as "unused" merely
  because the flag is off.

### Member deep links — `/team#member-<slug>`

`pages/Team.jsx` renders a stable `member-<slug>` id for every member, including
research assistants and support staff. A direct person link scrolls to the card
and highlights it for 5 seconds. If the active institution filter hides that
person, Team clears the filter with a history replacement first.

Old `/#member-<slug>` and `/network#member-<slug>` links redirect here. Build new
links with `useInstitution().withInstitution('/team#member-…')`. Slugs come from
`src/data/team.js`; renaming one breaks existing person links.

Highlighting is derived from the hash; only its expiry is state, keyed by
`location.key`. Keep that pattern so repeated navigation highlights the card
again without setting state directly inside the effect.

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
  App.jsx                          shared shell and live routes
  routes.js                        metadata, categories, legacy redirects
  main.jsx
  index.css                        Tailwind, brand palette, site accents,
                                   partnership gradient, and lab hero wash
  hooks/useInstitution.js           URL-based shared filter
  utils/
    institutions.js                filter values, matching, link helpers
    publicationInstitutions.js      publication affiliation rules
    assetUrl.js                    BASE_URL asset helper
  data/
    team.js                        canonical members, affiliations, and helpers
                                   Member ids and slugs must stay unique.
    researchThemes.js              research topics and institutions
    projectCatalog.js              research/industry projects and partners
    demonstrations.js              research demos and shared project media
    publications.json              canonical publication source
    publications.js                build-time import, sorted newest-first
    videos.js                      enforced video registry and descriptions
  config/features.js               build-time flags; showProjectPeople = false
  components/
    common/                        Navbar, Footer, LegacyRedirect, SeoHead,
                                   RightSidebar, video/project components
    demonstrations/ hero/ publications/ team/
    tuc/                           retained student-project content components
      ProjectLayout.jsx            shared /ai-team-projects/* detail layout
      FinishedProjectContent.jsx
  pages/
    Home.jsx                       network homepage
    Research.jsx Projects.jsx Teaching.jsx Labs.jsx Team.jsx
    Dynamo.jsx LeaderFollowing.jsx VialSort.jsx
    HumanAwarenessDetection.jsx    student project, category Teaching
    ComputeCluster.jsx             existing Labs detail URL
    labs/RoboticsLab.jsx ClujLab.jsx
    tuc/
      Teaching.jsx                 embedded courses, seminars, and theses
      AiTeamProjects.jsx           embedded student catalogue and archive
      JoinUs.jsx                   embedded openings on Team
      projects/*Project.jsx        retained student detail pages

public/
  data/publications.bib             separate BibTeX download artifact
  members/                         member photos; TeamMemberCard has fallbacks
  logos/                           partner logos and CORE SVG brand variants
  favicon.* apple-touch-icon.png    generated from the CORE mascot
  papers/                          publication preview images
  documents/project-descriptions/  project briefs and pitch PDFs
  images/projects/                 project imagery
  videos/                          registered H.264 videos and WebP posters
  tuc/iclr-2025/                   standalone static archive (issue 4)
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

- `wiki/navigation.md` — five shared sections, filter URLs, preserved detail
  routes, redirects, and navigation checks. Read before changing navigation.
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
- `wiki/project-subsites.md` — **how research project subpages (e.g. `/dynamo`)
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
- Single team source of truth: `src/data/team.js`; the shared Team page groups
  all members by role and applies the global institution filter.
- Navigation consolidation (2026-10): five shared sections replace the separate
  institutional sites. Published URLs remain reachable through redirects.

## Package versions (exact versions in `package-lock.json`)

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

`publications.json` carries `authors[].memberSlug`, and `team.js` carries each
member's `slug`. There are no individual profile pages yet. Until those exist,
link people to `/team#member-<slug>`. A future profile feature should stay under
the shared Team section; it should not recreate institution-specific sites.

### 4. `tuc/iclr-2025/` orphan subsite
Static page at `public/tuc/iclr-2025/index.html` (title: "CORE at ICLR
2025"). Has its own `style.css` + `assets/`. **Not linked from any React
page.** Reachable directly at `<domain>/tuc/iclr-2025/` (a real static file,
untouched by the router or the prerender pass).
Decide: keep as direct-link archive (do nothing) OR add a link from
Publications/Home/News.

### 5. Browser smoke checklist

After navigation changes, verify in dev (`npm run dev`):

- `/` and the five header destinations, on desktop and mobile.
- All/TUC/MDS/UBB filters across section links, reload, and Back/Forward.
- `/teaching#seminars`, `#theses`, and `#student-projects`, including the archive.
- `/labs/robotics`, `/labs/cluj`, `/compute-cluster`, and retained project details.
- `/team#member-knab`, including a filter that would otherwise hide the person.
- Old `/tuc`, `/ubb`, `/core-labs`, `/publications`, `/ai-team-projects`, and
  nested historic links such as `/#/tuc/teaching#theses`.
- No missing assets or console errors; videos and embeds still play.

`npm test` covers pure routing/filter rules. `npm run test:browser` starts Vite
and runs Chromium UI checks. Install it with `npx playwright install chromium`.
Also inspect visual layout and media manually.

### 6. RightSidebar `ROUTE_SECTIONS` — keep in sync

Every sidebar id must match a rendered element, in DOM order. Check child
components too: `ProjectLayout` supplies `hero`, `features`, `evaluation`, and
`extra`, and it omits evaluation when `showEvalSection={false}`.

Only verified detail pages currently have dots:

- `/compute-cluster`: `hero, purpose, capabilities, sites, policies`.
- `/ai-team-projects/ai4bim` and `/ai-team-projects/vergabepilot`:
  `hero, features, evaluation, extra`.

The homepage, shared hubs, lab details, and other project pages intentionally
have no sidebar. Retired pages must not leave stale sidebar configurations.

### 7. Publications grouping

Research embeds `PublicationsSection` with the global institution filter. Search,
type, status, researcher, and year-range controls already exist. Consider year
grouping and a venue filter when the corpus warrants them. Avoid adding a second
institution control to Research.

### 8. `AiTeamProjects.jsx` maintenance

This catalogue is embedded in Teaching's `student-projects` tab. Keep its project
links, institution matching, testimonials, and archive together when changing it.
The nested anchors `active-projects`, `testimonials`, and `archive` remain useful;
they do not imply a separate institution page or a site sidebar.

### 10. `publications.bib` ↔ `publications.json` parity
`public/data/publications.bib` is maintained separately from
`src/data/publications.json` and has fallen behind the JSON.
Either regenerate the `.bib` from the JSON on every update (build-time
script) or stop carrying the `.bib` separately. Now that the JSON is a build-
time import, a generator script could emit the `.bib` into `dist/` and the
checked-in copy could go.

### 11. (Future) Publications page "Download BibTeX" link
Once issue 10 is resolved, surface a "Download BibTeX" button on the
Research publications section that links to `/data/publications.bib`. Trivial.

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
2. After changes, run `npm run lint` and `npm run build`. The full build includes
   video checks and browser prerendering. For navigation/filter changes, also run
   `npm test` and `npm run test:browser` (Chromium required).
3. When editing team membership, only touch `src/data/team.js`. Team and other
   member displays derive from it.
4. When editing publications, only touch `src/data/publications.json`. Every
   consumer imports it through `src/data/publications.js`, at build time.
5. Asset paths: write `/<bucket>/...` (e.g. `/members/foo.png`,
   `/logos/bar.svg`, `/papers/baz.png`). Use `assetUrl()` from
   `src/utils/assetUrl.js` so the base prefix is applied.
6. Never re-introduce Hugo CSS, Bootstrap, or `font-awesome`/`academicons`
   icon libraries. Use Tailwind and `react-icons`.
7. The original bartelt-lab repo is preserved at
   `D:/Programming/Websites/tuc/bartelt-lab.github.io` — read-only
   reference, do not edit or delete.
