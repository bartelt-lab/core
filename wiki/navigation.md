# Navigation

How a visitor moves around the site, and what to change when the navigation
has to change. The site has two headers, one side navigation and one animated
jump between them.

For which page belongs to the network, a group or the labs, see
[site-structure.md](site-structure.md).

## Overview

| Part | Shown on | File |
|---|---|---|
| Network navbar | every network page | `src/components/common/Navbar.jsx` |
| Group header | `/tuc/*`, `/ubb` | `src/components/common/LabHeader.jsx` |
| Side dots | some long network pages | `src/components/common/RightSidebar.jsx` |
| Language and theme buttons | every page, bottom left | `LanguageToggle.jsx`, `ThemeToggle.jsx`, placed in `App.jsx` |
| Back-to-top button | every page, bottom right | `src/components/common/ScrollToTop.jsx` |

## The network navbar

A floating pill at the top of every network page.

- **Sections:** Publications, Industry Projects, CORE Labs, AI Team Projects,
  Compute Cluster. The list is `navItems` in `Navbar.jsx`; each entry has a
  path, an English and a German label, an icon and a rule for when it counts
  as the current page.
- **Join Us:** the outlined button, to `/join-us`.
- **Group switch:** TUC, MDS, UBB (`labSites`). TUC and UBB lead to the group
  pages, MDS to the Rostock group's own website. **No pill is highlighted:**
  this navbar only shows on the network site, where no group is the current
  one.

What shows at which width:

| Width | Bar |
|---|---|
| below 360px | logo, Join Us as an icon, Menu |
| 360px to 1023px | logo, Join Us, Menu |
| 1024px to 1279px | logo, the five sections as text, Join Us as an icon, group switch |
| 1280px and up | logo, the five sections with icons, Join Us, group switch |

Below 1024px the sections and the groups are in the menu that drops out of the
bar. It closes when an item is picked, on Escape, and on a tap beside it. The
menu button keeps the label "Menu" while open and only changes its icon: a
longer word ("Schließen") pushed the bar wider than a phone screen.

**To add a section:** add an entry to `navItems`. Check 1024px in German, where
the labels are longest; five items is about what fits. The group header lists
the same pages (see below), so add it there too.

## The group header

One component, `LabHeader.jsx`, for both group sites, so they cannot drift
apart. A group's `Layout.jsx` passes what is its own.

It has two tiers, so that it is plain which links belong to the group and
which leave for the network:

- **Top row (1024px and up), two capsules.** The dark one holds the network:
  "← CORE Network" and the same five pages as the network navbar, in the same
  order; Publications opens filtered to the group. The light one is the group
  switch, with the current group marked.
- **Bar.** The group itself: its sections and pages, then Join Us. A section
  entry scrolls to that section of the group's home page and is underlined
  while the section is on screen. The underline is green on every group's site,
  not the group's accent: green marks what is active everywhere
  ([visual-identity.md](visual-identity.md)).

Below 1024px the top row folds into the menu, under the headings "This group",
"CORE Network" and "Other groups".

What a group passes (`components/tuc/Layout.jsx`, `components/ubb/Layout.jsx`):

| Prop | Meaning |
|---|---|
| `lab` | `'TUC'` or `'UBB'`: which entry of the switch is current, and the institution the Publications link filters by |
| `home` | the group's home path |
| `logo`, `logoLabel` | what stands at the left of the bar |
| `nav` | the group's links: `{ to, label, section?, aliases? }`. `section` is the id of a section on the home page; `aliases` are other paths on which the entry counts as current (`/tuc/seminar` for Teaching) |
| `sections` | every section id of the home page in page order, for the underline. Include sections that have no entry in `nav`: while one of those is on screen, nothing is underlined |
| `join` | the Join Us link |

**To change the header for both groups,** edit `LabHeader.jsx`. **To change
one group's links,** edit `LAB_NAV`, `HOME_SECTIONS` and `JOIN` in its
`Layout.jsx`. When a section of a home page is added, renamed or removed,
update `HOME_SECTIONS` in the same change, or the underline lights the wrong
entry.

**To add a group site:** give it a shell in `App.jsx`, a `Layout.jsx` that
renders `LabHeader`, a `.theme-*` class if it has an accent colour
([visual-identity.md](visual-identity.md)), and an entry in `LABS` in
`LabHeader.jsx` and in `labSites` in `Navbar.jsx`.

The header is 93px tall from 1024px up (a 36px top row, a 56px bar, the
border) and 65px below. Sticky sidebars and `scroll-mt-*` on these pages
assume 96px.

## The jump between the network and a group

Links that leave one shell for another use `components/common/ShellLink.jsx`
in place of `Link`. Where the browser supports view transitions, the parts the
two headers share move and resize from their place in one header to their
place in the other, and the rest of the page fades:

| Name | Network navbar | Group header |
|---|---|---|
| `shell-header` | the floating pill | the full-width header |
| `shell-logo` | CORE logo | the group's logo |
| `shell-nav` | the dark section pill | the dark capsule |
| `shell-labs` | the group switch | the group switch |
| `shell-join` | Join Us | Join Us |

Each part carries its name as `style={{ viewTransitionName: '…' }}`. Timing is
in `src/index.css` (`::view-transition-group(shell-…)`).

Rules:

- **A name may be on only one visible element of a page.** Two elements with
  the same name make the browser drop the whole transition, silently. A hidden
  element (`display: none`) does not count, which is how the phone layouts get
  away with not having some parts.
- **Use `ShellLink` only for links that leave the current shell.** Inside a
  shell nothing morphs, and a link to a section of the page already open would
  freeze the page for a second: `ShellLink` holds the old page on screen until
  the address changes, and for such a link it never does.
- `ShellLink` waits for the router to show the new page before it lets the
  transition run. `ScrollToTop` marks that moment by writing the path to
  `<html data-route>`. Do not remove that line.
- Without view transitions, with reduced motion, or on a modified click (new
  tab), `ShellLink` is a plain link. The back and forward buttons do not
  animate.

## The side dots

`RightSidebar.jsx` shows a column of dots on the right edge of some long
network pages; each dot scrolls to a section. Which dots a page gets is
`ROUTE_SECTIONS` in that file, one list of `{ id, label }` per path. A path
with an empty list, or none, has no dots.

**Every `id` must be an element that page really renders,** or the dot is dead:
it neither scrolls nor lights up. Two traps:

1. **An id can come from a child component, not the page file.**
   - `/core-labs` gets `#dynamo` and `#autonomous` from
     `components/demonstrations/DemonstrationsSection.jsx`.
   - Project pages get `#hero #features #evaluation #extra` from
     `components/tuc/ProjectLayout.jsx`. `#evaluation` only renders when
     `showEvalSection` is not `false` (neurocore, stratego, traffic-network and
     self-driving pass `false`).
   - `/` and `/network` render the same `Home.jsx`. `#news` only exists while
     `news.js` has an item.
2. **The dots must be in page order,** or the wrong one lights up.

Current lists:

| Path | Dots |
|---|---|
| `/`, `/network` | hero, news, research, network, team, contact |
| `/core-labs` | hero, initiative, dynamo, autonomous, augmentation, publications, cluj |
| `/ai-team-projects` | hero, active-projects, archive (`testimonials` is switched off) |
| `/compute-cluster` | hero, purpose, capabilities, sites, policies |

When a section is added, removed, renamed or reordered on one of these pages,
change the list in the same commit.

## Links to a section, and to a person

- **A link with a hash** (`/tuc#contact`, `/join-us#positions`) scrolls to that
  element. `ScrollToTop.jsx` does this, and looks for the target again for a
  moment, because pages load lazily and a link from another page arrives
  before its target exists. Give the target `scroll-mt-24` so the header does
  not cover it.
- **A link to a person** is `/#member-<slug>`: their card in the team grid on
  the network home page, which scrolls into view and is ringed for five
  seconds. `pages/Home.jsx` owns both halves. The slug is `slug` in `team.js`,
  so renaming a slug breaks every link that spells it out. Research assistants
  and support staff are not in that grid and have no anchor. There is no page
  per person yet ([open-issues.md](open-issues.md)).

  Two details of that code are deliberate. It scrolls twice, at once and again
  after 600 ms, because the lazily loaded member photos resize the grid while
  the first scroll is under way. And the ring is derived from the hash, with
  only its expiry kept in state and keyed by `location.key`: keeping the slug
  in state meant setting state inside the effect, which the lint rule
  `react-hooks/set-state-in-effect` rejects, and keying by navigation is what
  makes a second click on the same person light the ring again.

## Filters in the address

`/publications?institution=TUC|UBB|Rostock` and `/publications?topic=<id>`
open the list already filtered. The group headers and the CORE Labs page link
this way. The filter in effect shows as a chip at the top of the filter panel,
because the filter itself can be out of sight.

## Parked

[navbar-scroll-hide.md](navbar-scroll-hide.md) describes how the network
navbar once slid away on scroll on one page, in case that is wanted again.
