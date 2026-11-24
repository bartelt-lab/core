# Open issues

Known problems and work that is waiting. Delete an entry when it is done (git
history keeps how it was fixed); add new ones at the end of their group.
Deferred ideas with their reasoning are in [later.md](later.md).

## Things that are wrong

### `npm run build` fails on Windows at the video check

`scripts/check-videos.mjs` reads `ffprobe` output and chokes on Windows line
endings, so the first step of `npm run build` fails on a Windows machine
whatever was changed. The deploy workflow runs on Linux and is not affected.
Until it is fixed, `npm run lint` plus `npm run build:fast` is the local
check, and the prerender step goes unverified locally.

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

Each run of `.github/workflows/deploy.yml` ends with a deprecation note for
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
- **The Cluj contacts' email addresses** were taken from the faculty's staff
  page, not given by the two people. Confirm them.
- **Photos of people** on the site (member photos, the Robotics Club meeting
  on `/ubb`): confirm that those shown agree.
- **Partner logos and paper figures** are used without recorded permission.
- **The legal texts** are drafts ([legal-pages.md](legal-pages.md)).
- **"CORE in Europe"** still appears in the footer tagline and the browser
  title, after it was removed from the home page headline.
- **The ICLR/ICSE 2025 news item** says six papers where the page lists eight,
  and names Seoul as the venue of ICSE 2025.

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
- **The prerendered output** of the pages added or rebuilt in November 2026
  (`/join-us`, `/join-us/tuc`, `/ubb`, `/core-labs`, `/impressum`,
  `/datenschutz`, `/iclr-2025`). The prerender step has not been run on them:
  it cannot run on the Windows machine they were built on (see above).
