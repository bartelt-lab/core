# Site structure: network, groups and labs

What the website is made of, which page belongs to whom, and the words to use
for each. Read this before adding a page or moving content between pages.

## Three kinds of thing

The site describes three different things. Most structural mistakes on this
site came from mixing two of them.

| | What it is | Where it lives | Looks like |
|---|---|---|---|
| **The network** | CORE: a network of researchers and research groups | everything not under `/tuc` or `/ubb` | floating pill navbar, CORE green |
| **A group** | the researchers at one place: TU Clausthal, CORE Cluj, MDS Rostock | `/tuc/*`, `/ubb`; Rostock has its own site (mds-lab.de) | the group header (two tiers), the group's accent colour |
| **The labs** | CORE Labs: the laboratories the network runs together in Goslar, Cluj-Napoca and Rostock | `/core-labs` and the project pages under it | part of the network site |

Rules that follow from this:

- **CORE is a network of researchers, not of universities.** No page may read
  as if a university owned or ran the site. University logos appear as "where
  our members work", with the disclaimer in the footer.
- **Everything about a laboratory goes on `/core-labs`,** once. A group's page
  links there; it does not describe the lab again. (`/ubb` used to be a second
  lab page; that is why this rule exists.)
- **A group's page is about the group:** who to talk to, what they work on,
  what a student can join. It is shaped by what that group has to show. Do not
  copy one group's layout onto another: CORE Cluj has no group photo and three
  contacts, so it has no group picture and no member grid.
- **A position belongs to a group, not to the network.** One can be a PhD
  student in Goslar, Cluj or Rostock. `/join-us` therefore speaks for no single
  place; the Goslar content is on `/join-us/tuc`.

## Words

| Say | For | Not |
|---|---|---|
| group, research group | TU Clausthal, CORE Cluj, MDS Rostock | lab |
| CORE Labs, the labs, laboratory | the shared laboratories | — |
| MDS Lab | the Rostock group, by its own name | — |
| CORE Cluj | the group at Babeș-Bolyai University | CORE Labs Cluj, UBB lab |
| Cognitive Software | the TU Clausthal group; never translated, also not in German | Kognitive Software |
| researchers at … | people's relation to a university | the universities of the network |

Code still uses the old word in names (`LabHeader`, `lab="tuc"`, `LAB_NAV`).
That is fine; the rule is about what a visitor reads or hears.

## The three shells

`src/App.jsx` splits the app into three shells. Each has its own header and
footer.

| Shell | Paths | Header | Footer |
|---|---|---|---|
| `CoreShell` | everything else | `components/common/Navbar.jsx` | `components/common/Footer.jsx` |
| `TucShell` | `/tuc/*` | `components/common/LabHeader.jsx` via `components/tuc/Layout.jsx` | in `tuc/Layout.jsx` |
| `UbbShell` | `/ubb` | `LabHeader.jsx` via `components/ubb/Layout.jsx` | in `ubb/Layout.jsx` |

How the headers work, and how the jump between shells is animated, is in
[navigation.md](navigation.md).

## Pages

### Network site (`CoreShell`)

| Path | What it is | File |
|---|---|---|
| `/`, `/network` | the network's home page: news, research, groups, team | `pages/Home.jsx` |
| `/publications` | all papers of the network, with filters | `pages/Publications.jsx` |
| `/industry-projects`, `/industry-projects/medicar` | funded and industry projects | `pages/tuc/IndustryProjects.jsx`, `pages/tuc/industry/MediCar.jsx` |
| `/core-labs` | the laboratories: who, projects, papers | `pages/CoreLabs.jsx` |
| `/dynamo`, `/vial-sort`, `/leader-following`, `/demos` | lab project pages | `pages/*.jsx` |
| `/ai-team-projects`, `/ai-team-projects/<project>` | the student project programme | `pages/tuc/AiTeamProjects.jsx`, `pages/tuc/projects/*Project.jsx` |
| `/compute-cluster` | the GenAI cluster | `pages/ComputeCluster.jsx` |
| `/join-us` | joining the network; where to ask for a position | `pages/tuc/JoinUs.jsx` |
| `/join-us/tuc` | positions at the TU Clausthal group in Goslar | `pages/tuc/JoinUs.jsx` (`lab="tuc"`) |
| `/news`, `/news/<slug>` | news | `pages/News.jsx`, `pages/NewsArticle.jsx` |
| `/iclr-2025` | papers at ICLR and ICSE 2025; its data is in the page file, its images in `public/images/iclr-2025/` | `pages/Iclr2025.jsx` |
| `/impressum`, `/datenschutz` | legal pages | `pages/legal/*.jsx` |

Several of these files sit in `pages/tuc/` although they are network pages.
They were written for the TU Clausthal site and moved to the network later;
they are built from the `components/tuc/ui.jsx` blocks, and `App.jsx` wraps
them in `UnderNavbar` so the floating navbar does not cover their top.

### TU Clausthal group (`TucShell`)

| Path | What it is | File |
|---|---|---|
| `/tuc` | the group: people, research, work, contact | `pages/tuc/Home.jsx`, text in `pages/tuc/home/content.js` |
| `/tuc/teaching`, `/tuc/seminar`, `/tuc/theses` | teaching, one page with three tabs | `pages/tuc/Teaching.jsx` |

### CORE Cluj (`UbbShell`)

| Path | What it is | File |
|---|---|---|
| `/ubb` | the group at Babeș-Bolyai: Robotics Club, publications, links into the network, contacts | `pages/ubb/Home.jsx` |

### Old addresses that forward

A page that moved keeps its old address working: a `<Navigate>` in the shell
and an alias entry in `src/routes.js` with `canonical` set.

| Old | Now |
|---|---|
| `/tuc/industry-projects`, `/tuc/industry-projects/medicar` | `/industry-projects`, `/industry-projects/medicar` |
| `/tuc/join-us` | `/join-us/tuc` |
| `/tuc/iclr-2025` | `/iclr-2025` |
| `/ai-team-projects/ai4ai` | `/ai-team-projects/ai4bim` |

There is no `/tuc/publications` and no `/ai-team-projects/dynamo`.

## Where does new content go?

| You have | It goes |
|---|---|
| a paper | `publications.json`; it appears on `/publications`, and on `/core-labs` if tagged `robotics` |
| a new person | `team.js`; they appear in the network's team grid and on their group's page |
| a lab demo, a robot, a lab photo | `/core-labs` |
| something a group offers (a club, a course, a position) | that group's page |
| a position | the group's own Join Us page if it has one (`/join-us/tuc`), else its card on `/join-us` |
| an announcement | a news item in `news.js` |

How to make each of these edits is in [editing-content.md](editing-content.md).
