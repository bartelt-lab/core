# Open issues

Known problems and work that is waiting. Delete an entry when it is done (git
history keeps how it was fixed); add new ones at the end of their group.
Deferred ideas with their reasoning are in [later.md](later.md).

## Things that are wrong

### `npm run build` fails on Windows at the video check

`scripts/check-videos.mjs` reads `ffprobe` output and chokes on Windows line
endings, so the first step of `npm run build` fails on a Windows machine
whatever was changed. The workflows run on Linux and are not affected: a pull
request gets the full build from `.github/workflows/check.yml`. Until it is
fixed, `npm run lint` plus `npm run build:fast` is the local check on
Windows, and the prerender step is only verified once a pull request is open.

### The BibTeX export is far behind

`public/data/publications.bib` has 13 entries; `src/data/publications.json`
has 65. Either generate the `.bib` from the JSON at build time, or stop
shipping it. Nothing on the site links to it at present. Once it is generated,
a "Download BibTeX" link on `/publications` is a small addition.

### Embedded videos contact Google before consent

The YouTube players in the demonstration cards (`/demos`, `/core-labs`), on
`/ai-team-projects` and on its project pages start by themselves. They use the
privacy-enhanced address, but the visitor's browser still contacts Google on
page load. A click-to-load placeholder would fix it. The Google Drive embeds
on the project pages have the same problem.

### The deploy workflow pins actions built for Node 20

Each run of `.github/workflows/deploy.yml` (and of `check.yml`, which pins the
same versions) ends with a deprecation note for
`actions/cache@v4`, `actions/checkout@v4`, `actions/configure-pages@v4` and
`actions/setup-node@v4`. Builds pass, because GitHub runs them on Node 24
anyway; it becomes a failure when GitHub stops doing that. Bump each to its
current major (check each action; they do not move together) on a branch,
since a broken workflow only shows after it has failed on `main`.

## Content that needs a person

- **Publication topics are a draft.** The topic list and most assignments were
  made from the paper titles and need the authors' review
  (`src/data/publicationTopics.js`).
- **25 papers have no picture.** They need a PDF from an author:
  [paper-pdfs-needed.md](paper-pdfs-needed.md).
- **Partner logos and paper figures** are used without recorded permission.
- **The legal texts** are drafts ([legal-pages.md](legal-pages.md)).

## Not built

### A page per person

`publications.json` records `memberSlug` per author and `team.js` a `slug` per
member, but there is no `/network/member/<slug>` page, so author names are
plain text. Until it exists, a person is linked as `/#member-<slug>` into the
team grid ([navigation.md](navigation.md)); that is the link to replace when
the page lands.

### Side dots on more pages

`/demos`, the four project pages without an evaluation section, and every page
under `/tuc` have no side dots. Not broken; add lists to `ROUTE_SECTIONS` if
they should have them ([navigation.md](navigation.md)).

## Checks nobody has done

- **A full click-through in a real browser** since the navigation was rebuilt
  in November 2026: every nav item on both headers at phone, tablet and
  desktop width, in both languages and both themes; the network panel for
  missing files; the console for warnings.
- **Safari and Firefox** for the animated jump between the network and a
  group.
- **The prerendered output, read by a person.** The full build, prerender
  included, passed for the pages added or rebuilt in November 2026 (first run
  of the pull request check, 2026-11-24). That proves each page renders with
  a title, a plausible size and the right canonical address; nobody has opened
  the generated HTML of `/join-us`, `/join-us/tuc`, `/ubb` or `/core-labs` to
  see that it says what the live page says.
