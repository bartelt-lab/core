# Agent context — core repo

> **Read `PROJECT_CONTEXT.md` first.** It holds the rules this repo enforces at
> build time: above all that a video does not ship without a registry entry
> and a written description. Those rules live there, in one copy, and are not
> repeated here.

This file is the map: what the site is, where things are, and the rules that
have already cost someone time. Detail lives in `wiki/`; follow the pointers.

## What this is

The website of **CORE**, a network of researchers and research groups working
on cognitive software, at <https://www.core-network.ai>. One React app
(React 19, Vite 7, Tailwind 3, React Router 7), prerendered to static HTML and
deployed to GitHub Pages on every push to `main`. Repository:
`github.com/bartelt-lab/core`.

It describes three kinds of thing, and mixing them is the commonest mistake:

- **the network** (CORE itself): every page not under `/tuc` or `/ubb`;
- **a group** (the researchers at one place): TU Clausthal at `/tuc/*`,
  CORE Cluj at `/ubb`; the Rostock group has its own site;
- **the labs** (CORE Labs, the shared laboratories): `/core-labs` and its
  project pages.

Wording, in everything a visitor reads or hears: TU Clausthal, CORE Cluj and
MDS Rostock are **groups**, not labs. "Lab" is for the laboratories and for
"MDS Lab", which is that group's name. CORE is a network of **researchers**,
never of universities. "Cognitive Software" is not translated. Code names
(`LabHeader`, `lab="tuc"`) kept the old word. Full table:
`wiki/site-structure.md`.

## Where to read before you change something

| Before you … | Read |
|---|---|
| add, move or remove a page | `wiki/routing-and-seo.md`, `wiki/site-structure.md` |
| touch a header, a menu, a nav item, the side dots | `wiki/navigation.md` |
| add or change a person, a paper, a news item, a contact | `wiki/editing-content.md` |
| add, re-encode or delete a video | `PROJECT_CONTEXT.md`, `wiki/video.md`, `wiki/video-workflow.md` |
| add a colour, a surface, a logo | `wiki/dark-mode.md`, `wiki/visual-identity.md` |
| add an image | `wiki/assets.md` |
| build or restyle a lab project page (`/dynamo` …) | `wiki/project-subsites.md` |
| touch the legal pages, fonts or embeds | `wiki/legal-pages.md` |
| make something for print or for a partner | `wiki/decks-and-print.md` (and send `brand/CORE-Brand-Guidelines.pdf`, do not paraphrase it) |
| pick up known problems or deferred work | `wiki/open-issues.md`, `wiki/later.md` |
| explain to a person how to contribute | `CONTRIBUTING.md` (fork, branch, checks, pull request; what needs asking first) |

Also in `wiki/`: `paper-pdfs-needed.md` (papers without a picture),
`navbar-scroll-hide.md` (a parked technique), `video-frames/` (a contact strip
per video, to identify a clip without opening it; not shipped).

## Shells and routes

`src/App.jsx` splits the app into three shells, each with its own header and
footer:

| Shell | Paths | Header |
|---|---|---|
| `CoreShell` | everything else | `components/common/Navbar.jsx` (floating pill) |
| `TucShell` | `/tuc`, `/tuc/teaching`, `/tuc/seminar`, `/tuc/theses` | `components/common/LabHeader.jsx` |
| `UbbShell` | `/ubb` | `components/common/LabHeader.jsx` |

Network pages: `/` and `/network` (same page), `/publications`,
`/industry-projects` (+ `/medicar`), `/core-labs`, `/demos`, `/dynamo`,
`/vial-sort`, `/leader-following`, `/ai-team-projects` (+ 11 project pages),
`/compute-cluster`, `/join-us`, `/join-us/tuc`, `/news` (+ one page per item),
`/iclr-2025`, `/impressum`, `/datenschutz`. The full table with files, and the
old addresses that forward, is in `wiki/site-structure.md`.

Several network pages live in `pages/tuc/` (AI Team Projects, Industry
Projects, Join Us): they were written for the TU Clausthal site and moved.
They are built from `components/tuc/ui.jsx`, and `App.jsx` wraps them in
`UnderNavbar` to clear the floating navbar.

## Rules that have bitten

Each is one line here; the linked page has the reasoning.

**Pages and navigation**

- A `<Route>` in `App.jsx` needs an entry in `src/routes.js`, or the page is
  not prerendered, has no title and is in no sitemap. A moved page keeps its
  old address as a `<Navigate>` plus an alias entry with `canonical`.
  (`wiki/routing-and-seo.md`)
- `routes.js` and `data/news.js` are loaded by plain Node in the build scripts:
  no bundler-only imports in them.
- Links that cross between the network site and a group site use `ShellLink`,
  never inside one shell. The `viewTransitionName`s (`shell-*`) in `Navbar.jsx`
  and `LabHeader.jsx` must each be on one visible element per page.
  (`wiki/navigation.md`)
- Both group sites share `LabHeader.jsx`. Change the header there, not per
  group. When a home-page section changes, update `HOME_SECTIONS` in that
  group's `Layout.jsx`.
- Every id in `RightSidebar.jsx`'s `ROUTE_SECTIONS` must be an element the page
  renders, in page order; some ids come from child components.
  (`wiki/navigation.md`)
- The network navbar highlights no group pill; only a group's own header marks
  that group.

**Content**

- People: `src/data/team.js` only. `id` and `slug` must be unique; a `slug` is
  used in links, so never rename one.
- Publications: `src/data/publications.json` only; consumers import it through
  `data/publications.js`. `page` is written by `scripts/paper-pages.mjs`, not by
  hand. A paper tagged `robotics` appears on `/core-labs`.
  (`wiki/editing-content.md`)
- Everything about a laboratory goes on `/core-labs`, once; a group's page
  links there. A group's page is shaped by what that group has to show: do not
  copy `/tuc`'s layout onto `/ubb`. (`wiki/site-structure.md`)
- `/join-us` speaks for no single place; positions in Goslar are on
  `/join-us/tuc`.
- David Szilagyi is not a PhD student at Babeș-Bolyai. On `/ubb` he appears as
  CORE Labs coordinator and UBB alumnus; do not list him as a member there.
- Text is `[German, English]` pairs in data files and `pick(english, german)`
  in components. Mind the order.

**Look**

- Dark mode works by role: `bg-white`, `text-slate-900`, `border-slate-200` and
  the like flip by themselves. A hard-coded hex or `rgba()` background does
  not, and needs a `dark:` twin. Light is the default; the system preference is
  not followed. (`wiki/dark-mode.md`)
- Green owns action (buttons, links, focus), everywhere. A group's accent
  (`--site-*`, set by `.theme-tuc` / `.theme-ubb`) owns place: kickers, rules,
  tints, never anything clickable. (`wiki/visual-identity.md`)
- `tailwind.config.js` does not hot-reload. Restart the dev server after
  changing it, or new utilities render as nothing.
- Third-party logos go through `ThirdPartyLogo`, CORE's own through
  `ThemedLogo`, so each gets its dark-mode version.

**Third parties and law**

- Fonts are bundled (`src/fonts.js`, `components/tuc/fonts.js`). Never link
  Google Fonts or hotlink anything. YouTube only through
  `youtube-nocookie.com`. The privacy policy states both; change it when an
  embed or storage use changes. (`wiki/legal-pages.md`)
- The legal pages stay plain: one text column, no cards.
- `public/google2e6aa57e94108948.html` is Google's verification file. It looks
  deletable and is not. (`wiki/routing-and-seo.md`)

**Switches**

- `src/config/features.js` holds build-time flags as plain constants (a
  runtime flag would make prerendered HTML and the live page disagree).
  Currently off: `showProjectPeople` (contributor avatars; the `people` fields
  in `demonstrations.js` are kept for it, do not delete them as unused) and
  `showStudentTestimonials`.

## Source tree

```
src/
  App.jsx              the three shells and every <Route>
  routes.js            one entry per address: title, description, canonical
  index.css            Tailwind entry; the brand palette, the dark-mode role
                       tokens, the group accents, view-transition timing
  fonts.js             bundled Inter and Poppins
  config/features.js   build-time switches
  i18n/                EN/DE: LanguageProvider, useLanguage() -> pick(en, de)
  utils/               assetUrl (base path for /public files), formatAuthorName
  data/
    team.js            people and institutions, with lookup helpers
    publications.json  every paper; publications.js sorts and exports it
    publicationTopics.js  topic ids and labels for the filter
    venueShortNames.js    "CHI", "UbiComp": covers for papers without a picture
    news.js            news items, one prerendered page each
    videos.js          video registry (enforced by the build)
    demonstrations.js  lab demo cards        projects.js  lab project metadata
    industryProjects.js  /industry-projects  legal.js     Impressum operator
  components/
    common/            Navbar, LabHeader, ShellLink, Footer, RightSidebar,
                       ScrollToTop, SeoHead, LegalLinks, ThemeToggle,
                       LanguageToggle, ThemedLogo, ThirdPartyLogo, LazyVideo,
                       Section, ...
    publications/      PublicationsSection (list, filters, carousel),
                       PublicationRow (one paper), the carousels
    demonstrations/ hero/ news/ team/
    tuc/               Layout (TucShell), ui.jsx (PageShell, Section, Card,
                       Callout, ButtonLink: the blocks the tuc-built pages use),
                       ProjectLayout + FinishedProjectContent (AI Team Project
                       pages), PartnerLogoStrip, fonts.js (IBM Plex Sans)
    ubb/               Layout (UbbShell)
  pages/
    Home.jsx           network home          CoreLabs.jsx   /core-labs
    Publications.jsx   ComputeCluster.jsx    Demos.jsx      News*.jsx
    Dynamo.jsx VialSort.jsx LeaderFollowing.jsx HumanAwarenessDetection.jsx
    Iclr2025.jsx       legal/ (Impressum, Datenschutz, shared)
    tuc/               Home (+ home/content.js, shared.jsx), Teaching,
                       AiTeamProjects, IndustryProjects, JoinUs,
                       industry/MediCar, projects/*Project
    ubb/Home.jsx       CORE Cluj

public/
  members/  logos/ (+ logos/dark/, logos/core/)  papers/ (+ papers/pages/)
  images/   videos/  documents/  data/publications.bib
  google2e6aa57e94108948.html   do not delete

scripts/
  check-videos.mjs     the video gate, first step of the build
  seo-files.mjs        robots.txt, sitemap.xml, llms.txt, og-image
  prerender.mjs        static HTML for every route (needs Chromium)
  paper-pages.mjs      first-page images for papers, from PDFs
  dark-logos.mjs       dark-mode versions of logos
  optimize-images.mjs  large PNG/JPEG to WebP
  replace-video.mjs compress-videos.ps1   video tooling
  brand-guide.mjs brand-kit.mjs palette-figures.mjs print-figures.mjs   print

wiki/                  the documentation this file points to
brand/                 CORE-Brand-Guidelines.pdf (generated)
```

## How to work here

1. **`main` is live.** A push to it deploys. Work on a branch; ask before
   pushing or merging.
2. **Check before committing:** `npm run lint` and `npm run build`
   (`PROJECT_CONTEXT.md`). On Windows the build's first step fails for an
   unrelated reason (`wiki/open-issues.md`); run `npm run lint` and
   `npm run build:fast` and say that the prerender step was not run.
3. **Look at what you changed** in the dev server (`npm run dev`), in both
   themes and both languages, at phone width as well. A build that passes says
   nothing about a white title on a white background.
4. **Keep the docs true.** A change that makes a sentence in `wiki/` or here
   wrong changes that sentence in the same commit. Put detail in the wiki page
   for the topic and at most one line here.
5. **Paths to assets** are written `/<folder>/...` and wrapped in `assetUrl()`.
6. Icons come from `react-icons`. No Bootstrap, no Hugo CSS, no icon fonts.
7. The original Bartelt Lab repository is kept read-only at
   `D:/Programming/Websites/tuc/bartelt-lab.github.io`. Do not edit or delete
   it.
