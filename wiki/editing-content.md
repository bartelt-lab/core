# Editing content

How to change what the site says: people, papers, news, contacts, positions.
Each section names the one file to edit and what to write there. No knowledge
of React is needed for most of it.

Two things hold everywhere:

- **Text comes in pairs, German first:** `['Deutscher Text', 'English text']`.
  The site shows the one that matches the language button. If a text is the
  same in both, write it twice.
- **A path to a picture starts with `/` and names a file under `public/`:**
  `/members/jane-doe.webp` is `public/members/jane-doe.webp`.

When you are done, see [Check and publish](#check-and-publish) at the end.

## People

File: `src/data/team.js`. It is the only place people are listed; the team
grid on the network home page, the group pages and the contact cards all read
it.

Add an entry to `members`:

```js
{
  id: 26,                      // a number no other member has: search the file first
  name: 'Jane Doe',
  slug: 'doe',                 // short, lower case, unique; links use it, so never rename it later
  prefix: 'Dr.',               // optional: 'Prof. Dr.', 'Dr.', 'Dr. Ing.'
  title: 'PhD Student',        // shown as the role
  roleCategory: 'phd_student', // see the list below
  affiliations: [
    { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' },
  ],
  photo: '/members/jane-doe.webp',   // or leave it out: a placeholder is shown
  bio: 'One sentence.',
  email: 'jane.doe@tu-clausthal.de', // or ''
  links: { scholar: '…', github: '…', linkedin: '…', website: '…' },  // each optional
},
```

- **`roleCategory`** is one of `professor`, `assistant_professor`, `lecturer`,
  `postdoc`, `phd_student`, `research_assistant`, `support_staff`,
  `network_member`. It decides the group a person is listed under. Research
  assistants and support staff appear on their group's page but not in the
  network's team grid.
- **Order in the file is the order on the site.** Add `external: true` to move
  someone to the end of their role group.
- **Institutions** are defined at the top of the same file (`TUC`, `UBB`,
  `ROSTOCK`, …). A person can have two affiliations.
- **Photo:** square or portrait, as WebP, in `public/members/`, named
  `first-last.webp`.
- **An email set here shows everywhere that person appears,** as a mail icon in
  the team grid and written out on contact cards. Only add an address the
  person wants public.

To remove someone, delete their entry, then search `src/` for their `slug`:
contact cards and news items may name it.

## Publications

File: `src/data/publications.json`. Nothing else: the publication list, the
CORE Labs carousel, the group pages and the home page all read it.

```jsonc
{
  "id": "doe2026example",           // unique; also the file name for its PDF page image
  "title": "…",
  "authors": [
    { "name": "Doe, Jane", "memberSlug": "doe" },      // memberSlug: their slug in team.js, or null
    { "name": "Smith, A.", "memberSlug": null }
  ],
  "venue": "Proceedings of the 2026 CHI Conference on Human Factors in Computing Systems",
  "year": 2026,
  "date": "2026-04",                 // sorts the list, newest first
  "type": "Conference",              // Conference | Journal | Workshop | Preprint | Thesis
  "status": "Published",             // Published | Accepted | Preprint
  "url": "https://doi.org/…",        // or ""
  "code": null,                      // or a link
  "image": null,                     // or "/papers/<file>.webp": a figure, see below
  "abstract": null,                  // or one or two sentences
  "topics": ["robotics"]             // one or two topic ids, see below
}
```

### The picture beside a paper

A paper shows, in this order of preference:

1. **`image`: a figure from the paper,** shown whole. Save it as WebP in
   `public/papers/` and write the path in `image`. Wide diagrams come out
   small in the slot; a figure that is closer to square reads better.
2. **`page`: the first page of the PDF.** Do not write this field by hand. Put
   the PDF in a folder, named `<id>.pdf`, and run
   `node scripts/paper-pages.mjs <folder>`. It writes the image and the field.
   It needs `pdftoppm` (part of Poppler or MiKTeX) on the PATH.
3. **Neither: a green cover with the venue's short name** ("CHI", "UbiComp").
   The short names are rules in `src/data/venueShortNames.js`. A venue without
   a rule shows its publication type ("Journal") instead, so add a rule for a
   new venue. Only add a name the venue uses for itself.

[paper-pdfs-needed.md](paper-pdfs-needed.md) lists the papers that still have
neither a figure nor a first page.

### Topics

`topics` holds one or two ids from `src/data/publicationTopics.js`: `xai`,
`llm`, `ml`, `robotics`, `wearables`, `xr`, `health`, `design`. They drive the
topic filter on `/publications`.

**A paper tagged `robotics` also appears on the CORE Labs page.** That is the
only switch for it: to put a paper on `/core-labs`, give it that topic; to take
it off, remove the topic.

The topic list and most assignments were drafted from the titles in November
2026 and have not been checked by the authors. Fix wrong ones as you find them.

### Which group a paper belongs to

The "TUC" / "UBB" / "Rostock" badge and the institution filter come from the
authors: an author with a `memberSlug` counts for the institutions that member
has in `team.js`. Two ways to override that:

- for one author of one paper, add `"institution": "UBB"` to that author's
  entry;
- for the whole paper, add `"institutions": ["UBB"]` to the paper.

One person has a fixed default: David Szilagyi is affiliated with both
TU Clausthal and Babeș-Bolyai, and his papers count for TU Clausthal unless
the paper says otherwise (`memberInstitutionDefaults` in
`components/publications/PublicationsSection.jsx`).

## News

File: `src/data/news.js`. Each item gets its own page at `/news/<slug>`, and
the newest four show on the network home page.

```js
{
  slug: 'my-news-item',            // the address; never change it once published
  date: '2026-11',                 // year and month
  tag: ['Publikationen', 'Publications'],
  title: ['…', '…'],
  teaser: ['…', '…'],              // the short text on cards
  lead: ['…', '…'],                // the first paragraph of the article
  body: [                          // further paragraphs
    ['…', '…'],
  ],
  image: '/images/news/….webp',
  imageAlt: ['…', '…'],            // what the picture shows, for screen readers
},
```

- **Links inside text** are written `[label](address)`. An address starting
  with `/` stays on the site; anything else opens in a new tab.
- **Headline style for an accepted paper:** "Our paper … has been accepted at
  …".
- **Optional fields:** `featured: true` (on the home page ahead of newer
  items), `imageFit: 'figure'` (a paper figure, shown whole) or `'contain'` (a
  logo, shown whole with air), `imageFocus`, `imageCredit`, `logo`, `cta`,
  `people` (slugs from `team.js`). The comment at the top of the file explains
  each.

## Contacts and positions

| What | Where |
|---|---|
| Who to write to for a PhD or a club at a group, on the network's Join Us page | `GROUPS` in `src/pages/tuc/JoinUs.jsx`: each group's `contacts` names a member by slug |
| The PhD position and student assistant jobs in Goslar | `PHD`, `HIWI` and `APPLY` in the same file; shown on `/join-us/tuc` |
| The contacts on the CORE Cluj page | `contacts` in `src/pages/ubb/Home.jsx` |
| The Robotics Club text and photo | `club` in the same file |
| The TU Clausthal group's address, email and research text | `src/pages/tuc/home/content.js` |
| The operations contact on CORE Labs | `OPERATIONS_CONTACT_ID` in `src/pages/CoreLabs.jsx` |
| The operator in the Impressum | `src/data/legal.js` |

A contact is a person from `team.js`: the name, photo and email come from
there. Change an email in `team.js`, not on the page.

**A position belongs to a group.** Do not put Goslar's positions on the
network's Join Us page, and do not list someone under a group they are not a
member of ([site-structure.md](site-structure.md)).

## Projects

| What | Where |
|---|---|
| Industry and funded projects (`/industry-projects`) | `src/data/industryProjects.js` |
| Student projects (`/ai-team-projects`) | `activeProjects` and `archiveProjects` in `src/pages/tuc/AiTeamProjects.jsx`; each project page is `src/pages/tuc/projects/<Name>Project.jsx` |
| Lab demonstrations on CORE Labs | `src/data/demonstrations.js` |

A new project page is a new address: it needs a `<Route>` in `App.jsx` and an
entry in `routes.js` ([routing-and-seo.md](routing-and-seo.md)).

## Pictures and video

- **Pictures:** WebP, under `public/`. Anything larger than about 250 KB
  should be converted: `npm run optimize-images`. Loading rules are in
  [assets.md](assets.md).
- **Photos of people** need those people's agreement before they go live.
  Phone photos carry the place they were taken; convert them (which drops
  that) and do not upload the original.
- **A third party's logo or branding in a photo** (a partner's sign in a lab)
  is that partner's call. Ask before publishing.
- **Video has strict rules that the build enforces.** A clip without an entry
  and a description in `src/data/videos.js` stops the build. Read
  [video.md](video.md) first and follow [video-workflow.md](video-workflow.md).
- **YouTube** is embedded through `youtube-nocookie.com` only
  ([legal-pages.md](legal-pages.md)).

## Hiding something without deleting it

`src/config/features.js` holds switches for parts of the site that are turned
off but kept: the contributor avatars on project cards and the student
testimonials. Each has a comment saying what it hides and what else to change
when turning it back on. Set the value and rebuild.

## Check and publish

1. Look at your change: `npm run dev`, then open the address it prints. Check
   the page in German and in dark mode as well (the buttons at the bottom
   left).
2. `npm run lint` must pass.
3. `npm run build` must pass. It takes about a minute and needs a browser for
   the last step (`npx playwright install chromium`, once). On Windows the
   first step, the video check, currently fails for a reason unrelated to your
   change ([open-issues.md](open-issues.md)); `npm run build:fast` then at
   least proves the site compiles.
4. Commit on a branch. **Pushing to `main` publishes the site,** so do not push
   there directly; open a pull request or ask.
