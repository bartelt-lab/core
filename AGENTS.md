# Agent context — core repo

## Project state (as of branch `merge/tuc`)

This repo (`github.com/bartelt-lab/core`) is the merged home of two sites:

- **CORE Labs / CORE Network** — original content of this repo. React 19 + Vite 7
  + Tailwind v3, HashRouter. Routes: `/`, `/demos`, `/network`, `/dynamo`.
- **Bartelt Lab** (formerly `bartelt-lab.github.io`) — academic lab site,
  merged in under the hash prefix `/#/tuc/*`. Routes: `/tuc`,
  `/tuc/publications`, `/tuc/teaching`, `/tuc/seminar`, `/tuc/theses`,
  `/tuc/join-us`, `/tuc/projects`, `/tuc/core-team-projects`, plus 7 project
  subpages under `/tuc/core-team-projects/{dynamo,ai4ai,vergabepilot,
  neurocore,stratego,traffic-network,self-driving}`.

App is split via `<Routes>` in `src/App.jsx` between `CoreShell` (core's
pill Navbar + Footer) and `TucShell` (bartelt-style Layout). Each subtree
has its own header/footer.

### Source tree

```
src/
  App.jsx                          route gating
  main.jsx
  index.css                        tailwind v3 entry, no @import anymore
  data/
    team.js                        18 members + 4 institutions + helpers
                                   (getCoreLabsLeads, getMembersByInstitution,
                                    getMemberBySlug, getMembersGroupedByRole)
    projects.js                    CORE Labs projects metadata
    demonstrations.js              demo cards
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
      PublicationItem.jsx          shared by tuc Home preview + Publications
  pages/
    Home.jsx Demos.jsx Network.jsx Dynamo.jsx   core
    tuc/
      Home.jsx                     bartelt landing (hero + members + pubs + contact)
      Publications.jsx             full publications list
      Teaching.jsx Seminar.jsx Theses.jsx  teaching subtree
      JoinUs.jsx Projects.jsx AiTeamProjects.jsx
      projects/{AI4AI,Dynamo,NeuroCore,SelfDriving,Stratego,TrafficNetwork,Vergabepilot}Project.jsx

public/
  data/
    publications.json              canonical, 21 entries
    publications.bib               BibTeX export (download artifact)
  members/                         18 photos, full-name scheme
  logos/                           15 logos, flat, kebab-case names
  papers/                          16 publication preview images
  documents/project-descriptions/  3 PDFs
  images/projects/{ai4ai,dynamo,neurocore,stratego,vergabepilot}/
  images/locations.png             /network page map
  videos/hero* hero-poster.png     core hero
  videos/demonstrations/{autonomous_driving,robotics,neurocore,stratego}/
  videos/testimonials/             student testimonial mp4s
  icons/avocado.png                bartelt favicon source (unused)
  tuc/iclr-2025/                   static subsite kept as-is (see issue 9)
```

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
  "image": "/papers/x.png or null (may be a PDF — see issue 2)",
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
- Single team source of truth: `src/data/team.js` with 18 members carrying
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

### 1. Favicon
`public/favicon.ico` is the default Vite icon. `public/icons/avocado.png`
is the bartelt favicon source (carried over). Pick one — likely generate
a proper multi-resolution favicon set from one of the CORE logos (or
avocado for tuc nostalgia). Not urgent.

### 2. Member detail pages — `memberSlug` lookup target
`publications.json` carries `authors[].memberSlug` and `team.js` carries
`slug` per member. There is no `/network/member/:slug` route yet, so no
component renders the link. Until that page exists, `PublicationItem`
just shows the author name as text. Plan: add a `MemberDetail` page,
route it under both `/network/member/:slug` (core) and possibly
`/tuc/member/:slug` (bartelt-style). When that exists, `PublicationItem`
(both tuc shared one + core one) can wrap author names in `<Link>`.

### 3. Fetch path inconsistency between core and tuc Publications
- `src/components/publications/PublicationsSection.jsx:11` —
  `fetch(\`${import.meta.env.BASE_URL}data/publications.json\`)`
- `src/pages/tuc/Publications.jsx:10` and `src/pages/tuc/Home.jsx:84` —
  `fetch(assetUrl('/data/publications.json'))`
Same result, two patterns. Pick one (`assetUrl` is the project-wide helper
and is the better choice).

### 4. `tuc/iclr-2025/` orphan subsite
Static page at `public/tuc/iclr-2025/index.html` (title: "CORE at ICLR
2025"). Has its own `style.css` + `assets/`. **Not linked from any React
page.** Reachable directly at `<domain>/tuc/iclr-2025/` (bypasses
HashRouter — it's a real path served by the static file server, no `#`).
Decide: keep as direct-link archive (do nothing) OR add a link from
Publications/Home/News.

### 5. Manual browser smoke pass
Build passes consistently but nobody has clicked through the app in a
real browser since the restyle. Verify in dev (`npm run dev`):
- `/#/` (core home, pill nav, hero video plays)
- `/#/demos`, `/#/network`, `/#/dynamo` (core unaffected)
- `/#/tuc` (bartelt home, members grid loads from team.js, pubs preview
  fetches `/data/publications.json`, contact links work)
- `/#/tuc/publications` (full list with images where present)
- `/#/tuc/teaching`, `/#/tuc/seminar`, `/#/tuc/theses` (teaching-* CSS
  still applies — those inline `<style>` blocks survived)
- `/#/tuc/join-us` (disclosure pattern expands/collapses)
- `/#/tuc/projects` (YouTube embed click-to-play)
- `/#/tuc/core-team-projects` (project tiles)
- `/#/tuc/core-team-projects/dynamo` (RightSidebar shows Overview/
  Features/Evaluation/Science/Architecture, scroll-spy follows)
- Network panel: zero 404s on `/members/*`, `/papers/*`, `/logos/*`,
  `/videos/*`, `/data/*`
- DevTools console: no React 19 deprecation warnings, no router v7
  future-flag warnings, no missing-key warnings

### 6. RightSidebar `ROUTE_SECTIONS` entries vs actual DOM
`src/components/common/RightSidebar.jsx` ROUTE_SECTIONS map declares
section IDs per route. Verify each route actually renders `<div id="...">`
for the listed ids:
- `/`: `hero, initiative, team, dynamo, autonomous, publications`
- `/dynamo`: `hero, goal, overview, technical, experiments`
- `/network`: `hero, team, publications`
- `/tuc/core-team-projects`: `hero, active-projects, archive`
- `/tuc/core-team-projects/dynamo`: `hero, features, evaluation, science,
  architecture`
- `/tuc/core-team-projects/ai4ai`, `/vergabepilot`: same shape
Missing sections gracefully fall through (sidebar still renders, just
that dot won't activate). Worth a one-time audit.

### 7. Publications page filtering / grouping
`pages/tuc/Publications.jsx` currently renders all 21 entries flat,
sorted by date. With hundreds of entries planned, add: year grouping,
type/venue filter, member filter (powered by `memberSlug`), search
box. Defer until count ≥ 30.

### 8. `AiTeamProjects.jsx` audit
381 lines. Restyle pass left it alone because it was Tailwind already.
Worth a once-over for: residual bartelt-only inline styles, motion
animations that might fight with the new minimal Layout, refs to removed
classes. Scroll-spy ids: `hero`, `active-projects`, `archive` — verify
these still match section ids in the file.

### 9. Helper consolidation for Tuc social icons
`pages/tuc/Home.jsx` has a `SOCIAL_ICON` map and `socialEntries(member)`
helper inline. `team.js` has `links: { scholar, github, twitter,
linkedin, website, ... }` but the Home page only renders
`email/scholar/website`. Other icons unused. Either expand the icon map
to cover all of `team.js` keys OR document why only those three are
shown on tuc Home (visual density / academic context).

### 10. `publications.bib` ↔ `publications.json` parity
`public/data/publications.bib` is the BibTeX export (15 entries from
bartelt source). `publications.json` has 21 entries (8 from old core
publications.js merged in). The `.bib` is currently *behind* the JSON.
Either regenerate the `.bib` from the JSON on every update (build-time
script) or stop carrying the `.bib` separately.

### 11. (Future) Publications page "Download BibTeX" link
Once issue 10 is resolved, surface a "Download BibTeX" button on the
Publications page that links to `/data/publications.bib`. Trivial.

---

## How to work in this repo

1. Work on `merge/tuc` branch. Don't merge to `main` until smoke pass
   (issue 5) is clean.
2. After any change touching pages/routes/styles, run `npm run build` —
   it's fast (~2s) and catches missing imports / dead refs.
3. When editing team membership, only touch `src/data/team.js`. Both core
   and tuc Home derive from it.
4. When editing publications, only touch `public/data/publications.json`.
   The components on both core and tuc sides fetch it.
5. Asset paths: write `/<bucket>/...` (e.g. `/members/foo.png`,
   `/logos/bar.svg`, `/papers/baz.png`). Use `assetUrl()` from
   `src/utils/assetUrl.js` so the base prefix is applied.
6. Never re-introduce Hugo CSS, Bootstrap classes, or `font-awesome`/
   `academicons` icon classes in `/tuc/*` pages. Use `react-icons` for
   icons.
7. The original bartelt-lab repo is preserved at
   `D:/Programming/Websites/tuc/bartelt-lab.github.io` — read-only
   reference, do not edit or delete.
