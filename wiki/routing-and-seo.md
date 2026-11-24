# Routing, prerendering and SEO

Read this before adding, moving or removing a page.

## Why every page is prerendered

The site is a single-page app. Served as is, every address would return an
empty `<div id="root">` to anything that does not run JavaScript: search
engines, link previews in chat apps, AI agents. So the build renders each
route once in a headless browser and writes the result as static HTML.

## `src/routes.js` is the single source

One entry per address: `path`, `title`, `description`, and the source file.
It feeds three consumers:

- **`src/components/common/SeoHead.jsx`** sets the page's `<title>`,
  description and canonical link from it. `index.html` deliberately has none
  of these; adding static copies would leave two of each.
- **`scripts/seo-files.mjs`** writes `robots.txt`, `sitemap.xml`, `llms.txt`
  and the 1200×630 `og-image.png`.
- **`scripts/prerender.mjs`** drives headless Chromium over every route and
  writes `<path>.html` and `<path>/index.html`, so `/foo` and `/foo/` both
  serve the page. `404.html` is the raw app shell, which boots the app for any
  address that matches nothing.

The prerender step fails the build when a page comes back without a title,
undersized, or with the wrong canonical address: the signature of the app
shell being served in place of a real page.

`news.js` is imported by `routes.js`, so each news item gets its own entry
automatically. For the same reason `news.js` and `routes.js` must stay plain
data with no bundler-only imports: the build scripts load them with plain
Node.

## Adding a page

1. Add the `<Route>` in `src/App.jsx`, in the right shell
   ([site-structure.md](site-structure.md)).
2. Add an entry to `src/routes.js`.

**A route without an entry in `routes.js` still works in the browser, but it
ships with the default title, is not prerendered and never reaches the
sitemap.** It stays invisible to everything but a person with the link.

A page built from the `components/tuc/ui.jsx` blocks but shown on the network
site needs the `UnderNavbar` wrapper in `App.jsx`, or the floating navbar
covers its top.

## Moving a page

Keep the old address alive:

1. In the shell that owned the old address, add
   `<Route path="…" element={<Navigate to="/new" replace />} />`.
2. In `routes.js`, keep an entry for the old path with
   `canonical: '/new'`.

An entry with `canonical` is an **alias**: it is prerendered, so the old link
does not break, but it is left out of the sitemap and tells search engines
where the real page is. Current aliases are listed in
[site-structure.md](site-structure.md).

## The router

`BrowserRouter` (clean addresses, no `#/`), since September 2026. It applies
navigation as a React transition, which is why a lazily loaded page does not
flash a loading state: the old page stays until the new one is ready.
`ShellLink` relies on that ([navigation.md](navigation.md)).

## Language and what gets prerendered

The language button's choice is kept in the browser (`localStorage`); the
default is English, so the prerendered HTML is English. Dark mode likewise:
the default is light, and an inline script in `index.html` applies a stored
choice before the page paints.

## Deployment

A push to `main` runs `.github/workflows/deploy.yml`, which builds and
publishes to GitHub Pages at <https://www.core-network.ai>. `vite.config.js`
has `base: '/'`.

To run the full build locally, the prerender step needs a browser once:
`npx playwright install chromium`.

## Do not delete `public/google2e6aa57e94108948.html`

It is the Google Search Console verification file for the
`https://www.core-network.ai` property. Vite copies `public/` to the site root
as is, so it is served where Google looks for it. **Google re-checks it:
removing or editing it silently un-verifies the property** and Search Console
stops reporting. Its content is load-bearing; do not reformat it.

A domain-wide property would need a DNS record, and the domain's DNS is not
ours to change. With HTTPS enforced, every variant of the address redirects to
`https://www.core-network.ai`, so the one property covers the site.
