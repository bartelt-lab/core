# CORE

Website for the **CORE** initiative (Cognitive Software / Cognitive Robotics in
Europe). One React app provides five shared sections:

- **Research** — topics and publications.
- **Projects** — research and industry projects.
- **Teaching** — courses, seminars, theses, and student team projects.
- **Labs** — physical laboratories and shared compute infrastructure.
- **Team** — people, contacts, and openings.

All pages share one header and footer. Institutions — TUC, MDS (Rostock), and
UBB — are a URL-based filter that follows navigation. The network homepage stays
at `/`; existing project URLs and old institutional links remain reachable.
See [wiki/navigation.md](wiki/navigation.md) for routes and filter behavior, and
[AGENTS.md](AGENTS.md) for the repository map and working rules.

## Tech stack

- React 19 + Vite 7
- Tailwind CSS 3
- React Router 7 (`BrowserRouter`), prerendered to static HTML at build time
- Framer Motion 12
- react-icons 5

## Getting started

Requires Node.js 22.12+ (or 20.19+ on the 20.x line) and npm.

```bash
npm ci
npx playwright install chromium
npm run dev
```

The dev server starts at `http://localhost:5173`. Chromium is needed for the full
production build and browser tests. The browser test script starts its own Vite
server; a separate running dev server is unnecessary.

### Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite dev server with hot reload. |
| `npm test` | Test route redirects and institution filter rules with Node. |
| `npm run test:browser` | Run Chromium navigation, filter, and accessibility checks; starts Vite automatically. |
| `npm run lint` | Run ESLint with zero warnings allowed. |
| `npm run build` | Check video rules, build to `dist/`, generate SEO files, and prerender all routes. |
| `npm run build:fast` | Run only the Vite build for a quick import check. |
| `npm run prerender` | Regenerate SEO files and static pages from an existing `dist/`. |
| `npm run preview` | Serve the built `dist/` locally. |
| `npm run check-videos` | Check registered videos against the video policy. |
| `npm run optimize-images` | Convert large PNG/JPEG files to WebP; see `wiki/assets.md`. |

## Project structure

```
src/
  App.jsx                    shared shell and live BrowserRouter routes
  routes.js                  route metadata, navigation sections, old URL redirects
  index.css                  Tailwind entry, CORE palette, lab accent tokens
  hooks/useInstitution.js     URL-based institution filter
  utils/                     asset paths, institution and publication helpers
  data/                      team, researchThemes, projectCatalog, demonstrations,
                             videos, publications.json + its build-time import
  components/
    common/                  Navbar, Footer, LegacyRedirect, SeoHead, project/media UI
    demonstrations/ hero/ publications/ team/
    tuc/                     shared student project layout and content
  pages/
    Home.jsx                 network homepage
    Research.jsx Projects.jsx Teaching.jsx Labs.jsx Team.jsx
    Dynamo.jsx LeaderFollowing.jsx VialSort.jsx
    ComputeCluster.jsx HumanAwarenessDetection.jsx
    labs/                    RoboticsLab.jsx and ClujLab.jsx
    tuc/                     embedded teaching, student catalogue, and openings
      projects/              retained student project detail pages
public/
  data/publications.bib       separate BibTeX download artifact
  members/ logos/ papers/ images/ videos/ documents/
  tuc/iclr-2025/             standalone static archive
tests/
  navigation.test.mjs        pure routing and filter regression tests
  navigation.browser.mjs     Chromium UI checks
```

## Editing content

- **People** — edit `src/data/team.js`. Team and other member displays derive
  their roles and affiliations from this source.
- **Research topics** — edit `src/data/researchThemes.js`.
- **Research and industry projects** — edit `src/data/projectCatalog.js`.
  Shared demo media remains in `src/data/demonstrations.js`.
- **Publications** — edit `src/data/publications.json`. Consumers import it
  through `src/data/publications.js`; no runtime fetch is needed.
- **Teaching** — courses, seminars, and theses are in
  `src/pages/tuc/Teaching.jsx`; the student catalogue and archive are in
  `src/pages/tuc/AiTeamProjects.jsx`. Both are embedded in the shared Teaching page.
- **Labs** — overview cards are in `src/pages/Labs.jsx`; lab detail pages are in
  `src/pages/labs/`. The compute detail keeps `src/pages/ComputeCluster.jsx`.
- **Assets** — use `/<bucket>/...` paths and `assetUrl()` for the base prefix.
  Read `PROJECT_CONTEXT.md` before adding videos: every clip needs a registry
  entry and a written description.

Use `useInstitution().withInstitution(to)` for internal navigation so the filter
survives. Membership belongs in the content's institution metadata, not in
separate institutional page trees.

## Colours and lab accents

`src/index.css` defines the shared CORE palette with CSS variables;
Tailwind's `primary-*`, `secondary-*`, and `tertiary-*` classes use those values.
There is no theme switcher. Use the existing classes instead of adding unrelated
colour palettes.

Lab pages may use scoped `--site-*` accents. `ClujLab.jsx` applies `.theme-ubb`
at `/labs/cluj` for the Babeș-Bolyai blue; other pages inherit the green defaults.
Green remains the colour for actions and focus, while the lab accent identifies
place. See [wiki/visual-identity.md](wiki/visual-identity.md) before changing colours.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes to GitHub Pages at <https://www.core-network.ai>.

### Prerendering

The site is a client-rendered SPA, so a plain HTTP fetch would return an empty
`<div id="root">` — invisible to crawlers, link unfurlers, and agents. The build
therefore has two passes after `vite build`:

1. `scripts/seo-files.mjs` — writes `robots.txt`, `sitemap.xml`, `llms.txt`, and
   a 1200x630 `og-image.png`, all generated from `src/routes.js`.
2. `scripts/prerender.mjs` — drives headless Chromium over every route and
   writes the rendered DOM to static HTML. Each route lands in two files,
   `<path>.html` and `<path>/index.html`, so `/foo` and `/foo/` both serve the
   right page whichever way the host resolves extensionless URLs. `404.html` is
   the raw shell, which boots the app for anything unmatched.

The prerender pass fails the build if a page comes back untitled, undersized, or
carrying the wrong canonical URL — the signature of the SPA fallback being served
in place of a real route.

### Do not delete `public/google2e6aa57e94108948.html`

That is the Google Search Console verification file for the
`https://www.core-network.ai` URL prefix property. Vite copies `public/` to the
site root verbatim, so it serves at `/google2e6aa57e94108948.html`, which is
where Google looks.

**Google re-checks it periodically — removing it silently un-verifies the
property and Search Console stops reporting.** It looks like a stray file; it
is not.

A Domain property would cover every hostname at once, but it needs a DNS TXT
record and the domain's DNS (Strato) is not ours to change. With Enforce HTTPS
on, the apex and both `http://` variants all redirect to
`https://www.core-network.ai`, so the single URL prefix property covers the
whole site.

### Adding a route

Add the `<Route>` to `src/App.jsx` **and** an entry to `src/routes.js`, including
its `section`, current `source` file, title, and description. Without the metadata
entry, a page misses its navigation category, sitemap entry, and prerender.

When moving content, preserve its old address with `redirectTo` and a query-free
`canonical` destination. Extend the navigation tests and run `npm test`,
`npm run test:browser`, `npm run lint`, and `npm run build`.
