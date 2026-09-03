# CORE

Website for the **CORE** initiative (Cognitive Software / Cognitive Robotics in
Europe). One React app hosts two sites behind a `BrowserRouter`:

- **CORE Network / CORE Labs** — `/`, `/core-labs`, `/network`, `/publications`,
  `/demos`, `/dynamo`, `/compute-cluster`, and the AI Team Projects pages under
  `/ai-team-projects/*`.
- **Bartelt Lab** (TU Clausthal group) — everything under `/tuc/*`.

`src/App.jsx` splits the two into `CoreShell` (pill navbar + footer) and
`TucShell` (minimal sticky header). See `AGENTS.md` for the full route map and
architecture notes.

## Tech stack

- React 19 + Vite 7
- Tailwind CSS 3
- React Router 7 (`BrowserRouter`), prerendered to static HTML at build time
- Framer Motion 12
- react-icons 5

## Getting started

Requires Node.js 20+ and npm.

```bash
npm install
npm run dev      # vite dev server at http://localhost:5173
```

### Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start the Vite dev server (HMR). |
| `npm run build` | Production build to `dist/`, then prerender every route to static HTML. ~60s. |
| `npm run build:fast` | Vite build only, no prerender (~6s). For quick dead-ref checks. |
| `npm run prerender` | Re-run the SEO + prerender passes over an existing `dist/`. |
| `npm run preview` | Serve the built `dist/` locally. |
| `npm run lint` | ESLint (flat config), zero warnings allowed. |
| `npm run optimize-images` | Convert large PNG/JPEG in `public/` to WebP (see `wiki/assets.md`). |

## Project structure

```
src/
  App.jsx              route gating: CoreShell vs TucShell (BrowserRouter)
  routes.js            canonical route table — paths + per-route title/meta
  index.css            Tailwind v3 entry + theme palettes (CSS vars)
  data/                team.js, projects.js, demonstrations.js
  utils/assetUrl.js    prefixes BASE_URL onto /public asset paths
  components/
    common/            Navbar, Footer, RightSidebar, ThemeToggle, ...
    tuc/               TucShell Layout + ProjectLayout
    about/ demonstrations/ hero/ network/ publications/ team/
  pages/
    Home.jsx CoreLabs.jsx Demos.jsx Dynamo.jsx ComputeCluster.jsx
    Publications.jsx AiTeamProjects.jsx
    tuc/               bartelt pages + tuc/projects/*Project.jsx
public/
  data/publications.json   canonical publications source
  members/ logos/ papers/ images/ videos/ documents/ icons/
```

## Editing content

- **Team members** — `src/data/team.js` only. Both CORE and TUC pages derive
  from it (filtered by `roleCategory` / institution).
- **Publications** — `public/data/publications.json` only (fetched at runtime).
- **CORE Labs projects / demos** — `src/data/projects.js`, `demonstrations.js`.
- **Asset paths** — write `/<bucket>/...` (e.g. `/members/foo.webp`) and wrap in
  `assetUrl()` so the base prefix is applied.

## Theming

Themes are `[data-theme]` attributes on `<html>` (`ThemeToggle`) backed by
`--primary-*` / `--secondary-*` CSS variables in `src/index.css`. Tailwind color
classes (`primary-600`, …) resolve those vars, so theme-aware UI must use
Tailwind color classes or `currentColor` — a static `<img>`/SVG file cannot pick
up the theme.

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

### Adding a route

Add the `<Route>` to `src/App.jsx` **and** an entry to `src/routes.js`. Without
the second one the page still works, but it ships with the default title and
never reaches the sitemap or the prerenderer — i.e. it stays invisible.
Prerendering needs a browser locally: `npx playwright install chromium`.
