# Navigation and filter URLs

The site has one shared header and footer. Institutions are filters within the
five main sections; they do not have their own landing pages or layouts.

## Public routes

| Route | Content | Main navigation |
| --- | --- | --- |
| `/` | Network homepage | Logo |
| `/#news` | Latest news, filtered by institution | Homepage and footer |
| `/news/sascha-marton-nvidia` | News article | Homepage and footer |
| `/research` | Research topics and publications | Research |
| `/projects` | Research and industry projects | Projects |
| `/teaching` | Courses, seminars, theses, student projects | Teaching |
| `/labs` | Physical labs and compute overview | Labs |
| `/team` | People, contacts, openings | Team |
| `/labs/robotics` | TU Clausthal Robotics Lab | Labs |
| `/labs/cluj` | UBB humanoid and autonomous driving lab | Labs |
| `/compute-cluster` | Kaiser compute infrastructure | Labs |
| `/dynamo`, `/leader-following`, `/vial-sort` | Research project details | Projects |
| `/ai-team-projects/<slug>` | Existing student project details | Teaching |

Student detail slugs are `tempo`, `lectra`, `fastmile`,
`human-awareness-detection`, `ai4bim`, `vergabepilot`, `werewolfs`, `neurocore`,
`stratego`, `traffic-network`, and `self-driving`.

`src/App.jsx` declares live routes. `src/routes.js` supplies each route's
`section`, `source`, title, and description. The Navbar uses `section`, rather
than guessing the category from the URL prefix. Add new pages to both files.

## Institution filter

The URL is the filter state. For example:

```text
/research?institution=TUC#publications
/teaching?institution=UBB#student-projects
/team?institution=Rostock
```

- All uses no `institution` parameter in generated links. An absent, invalid,
  or explicit `all` value also means All when reading a URL.
- Accepted stored values are `TUC`, `UBB`, and `Rostock`. The UI calls Rostock
  **MDS**; incoming `MDS` is accepted and generated links use `Rostock`.
- `src/hooks/useInstitution.js` reads the current URL and changes it through
  the router. There is no localStorage fallback.
- Build internal links with the hook's `withInstitution(to)` helper. It keeps
  the selected institution, other query parameters, and the section anchor.
  External links stay unchanged.
- Changing the filter on a hub stays on that hub. Changing it on a detail page
  returns to its section; student details return to `#student-projects`.
  News articles use `institutionFilterTarget: '/#news'` to return to the filtered
  homepage news section. A directly opened article remains readable regardless
  of the incoming filter.
- Lists include an item when any of its institutions matches. Keep affiliation
  data in the shared data sources; do not infer membership from a page's folder.
  Publications use `src/utils/publicationInstitutions.js`.
- Empty filtered lists should explain that no content is listed and offer All.
  A selected institution must not silently show another institution's content.

The current Teaching anchors are `courses-overview`, `seminars`, `theses`, and
`student-projects`. Select the matching content before scrolling. The global
skip link must focus the main element without replacing this tab hash.

People use `/team#member-<slug>`. Team clears an incompatible filter with history
replacement so a direct person link can reveal and highlight its target.

## News

The homepage shows up to three recent articles immediately after the hero.
`src/data/news.js` holds their date, institution tags, bilingual title and summary,
and image. The list respects the shared institution filter and offers an All link
when there are no matching articles. Researcher links come from `src/data/team.js`;
article images can use existing portraits or logos in `public/`.

Article bodies live in `src/pages/news/`. To add one, add its metadata to
`newsArticles` in newest-first order, then register its page in both `App.jsx`
and `routes.js`. Keep the route's title, description, and image tied to that data.
Articles are prerendered and included in the sitemap and the News group in
`llms.txt`. Use `type: 'article'` for sharing metadata and
`institutionFilterTarget: '/#news'` for filter navigation.

The five main navigation sections stay unchanged. The footer links to `/#news`;
each article links back there. A separate `/news` archive can be added once the
number of articles warrants it.

## Old addresses

`routes.js` keeps the alias table (`redirectTo` plus a query-free `canonical`)
and special moved-anchor mappings. `LegacyRedirect.jsx` replaces the old URL
before page content mounts. Keep query parameters unless an old institutional
address needs to set its own institution.

| Old address | Destination |
| --- | --- |
| `/network` | `/` |
| `/publications` | `/research#publications` |
| `/core-labs` | `/labs` |
| `/demos` | `/projects#research-projects` |
| `/ai-team-projects` | `/teaching#student-projects` |
| `/tuc` | `/research?institution=TUC` |
| `/ubb` | `/labs?institution=UBB` |
| `/tuc/industry-projects` | `/projects?institution=TUC#industry-projects` |
| `/tuc/projects` | `/teaching?institution=TUC#student-projects` |
| `/tuc/teaching`, `/tuc/seminar`, `/tuc/theses` | Teaching, TUC filter, matching tab |
| `/tuc/join-us` | `/team?institution=TUC#join-us` |
| `/tuc/publications` | `/research?institution=TUC#publications` |
| `/ai-team-projects/ai4ai` | `/ai-team-projects/ai4bim` |
| `/ai-team-projects/dynamo` | `/dynamo` |

Old homepage/network `#team` and `#member-<slug>` links move to Team. Autonomous
driving links from `/demos`, `/core-labs`, and `/ubb` move to
`/labs/cluj?institution=UBB#autonomous`; the Cluj humanoid anchor moves to the
same detail page. Research demo collection anchors move to Projects.

`index.html` first translates old `/#/...` links into plain paths, preserving a
nested anchor such as `/#/tuc/teaching#theses`. Keep its same-site redirect guard.
The standalone static archive at `/tuc/iclr-2025/` remains outside React routing.

## Static output and checks

The build prerenders live routes and aliases into both `<path>.html` and
`<path>/index.html`. Alias capture waits for its destination. The sitemap and
`llms.txt` include only canonical routes; filter variants share the unfiltered
page canonical. Do not store query strings or anchors in `canonical`.

Install Chromium once with `npx playwright install chromium`. Run `npm test`,
`npm run test:browser`, `npm run lint`, and the full `npm run build` after
route/filter changes. The browser suite starts Vite itself and checks desktop
and mobile navigation, filters, history, old links, and focus. Also inspect visual
layout and retained media in a browser; pure helper tests cannot check them.
