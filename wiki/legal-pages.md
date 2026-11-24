# Legal pages and what they promise

`/impressum` and `/datenschutz`, and the rules the rest of the site has to
keep so that what they say stays true.

These texts are drafts written without a lawyer. Have them checked before
relying on them.

## The pages

- `src/pages/legal/Impressum.jsx` and `Datenschutz.jsx`, on the network site.
- Both are deliberately plain: one narrow column of text from `LegalPage` and
  `Block` in `pages/legal/shared.jsx`. No cards, no hero. Keep them that way.
- German law wants both reachable from every page, so all three footers render
  `components/common/LegalLinks.jsx`.

## The operator

`src/data/legal.js`, once. The operator is Prof. Christian Bartelt **as a
person**, not a university: CORE is a network of researchers, and the site is
not an official page of any university.

There is no phone number, on the operator's decision. The comment in that file
records the legal risk of leaving it out.

## What the privacy policy says, and what depends on it

The policy describes what the site actually does:

- hosting on GitHub Pages,
- embedded YouTube videos (privacy-enhanced mode) and Google Drive videos,
- the language and theme choice kept in the browser's `localStorage`,
- email when someone writes to an address on the site.

The comment at the top of `Datenschutz.jsx` lists which code each section
depends on. **When one of those things changes, change the policy in the same
commit.**

It also says that nothing else contacts a third party. Two rules keep that
true:

- **Fonts are bundled, not linked.** `src/fonts.js` (Inter, Poppins) and
  `components/tuc/fonts.js` (IBM Plex Sans) import them from `@fontsource`.
  Never add a `fonts.googleapis.com` link, and never hotlink an image, a
  script or a stylesheet from another server.
- **YouTube is embedded through `youtube-nocookie.com`,** never
  `youtube.com/embed`.

## Open points

Tracked in [open-issues.md](open-issues.md): some embedded videos start by
themselves and so contact Google before the visitor has agreed to anything;
consent for photos of people; use of partner logos.
