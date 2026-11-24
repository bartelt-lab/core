# CORE website

The website of **CORE**, a network of researchers and research groups working
on cognitive software: <https://www.core-network.ai>.

One React app serves three things:

- **the network's site**: home, publications, industry projects, CORE Labs,
  AI Team Projects, the compute cluster, news, Join Us;
- **the group sites**: the TU Clausthal group under `/tuc` and CORE Cluj under
  `/ubb` (the Rostock group has its own site);
- **CORE Labs**: the laboratories the network runs together, at `/core-labs`.

How these relate, and which page belongs to whom, is in
[wiki/site-structure.md](wiki/site-structure.md).

## Getting started

Needs Node.js 20 or newer.

```bash
npm install
npm run dev      # http://localhost:5173
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server with live reload. |
| `npm run lint` | ESLint. No warnings allowed. |
| `npm run build` | The full build: video check, compile, SEO files, then every page rendered to static HTML. About a minute. Needs a browser for the last step: `npx playwright install chromium`, once. |
| `npm run build:fast` | Compile only, a few seconds. Proves nothing is broken at the import level. |
| `npm run preview` | Serve the built `dist/` locally. |
| `npm run optimize-images` | Convert large PNG/JPEG under `public/` to WebP. |

On Windows the full build currently stops at its first step, for a reason that
has nothing to do with your change. See
[wiki/open-issues.md](wiki/open-issues.md).

## Changing content

You do not need to know React to add a person, a paper or a news item:
[wiki/editing-content.md](wiki/editing-content.md) names the one file to edit
for each and shows what to write.

In short:

| What | File |
|---|---|
| People | `src/data/team.js` |
| Publications | `src/data/publications.json` |
| News | `src/data/news.js` |
| Industry projects | `src/data/industryProjects.js` |
| Video | `src/data/videos.js`, and read [wiki/video.md](wiki/video.md) first: the build enforces its rules |

Text is written twice, German first: `['Deutsch', 'English']`.

## Publishing

**A push to `main` publishes the site.** GitHub Actions builds it and deploys
to GitHub Pages. Work on a branch and open a pull request.

Before committing, `npm run lint` and `npm run build` must pass
([PROJECT_CONTEXT.md](PROJECT_CONTEXT.md)). Look at your change in the browser
too, in German and in dark mode: the buttons for both are at the bottom left
of every page.

## Documentation

| Read | For |
|---|---|
| [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) | the rules the build enforces, mainly for video |
| [wiki/site-structure.md](wiki/site-structure.md) | network, groups and labs; every page and its file; the words to use |
| [wiki/navigation.md](wiki/navigation.md) | the two headers, the menus, the side dots, the animated jump between sites |
| [wiki/editing-content.md](wiki/editing-content.md) | adding and changing people, papers, news, contacts |
| [wiki/routing-and-seo.md](wiki/routing-and-seo.md) | adding or moving a page; why and how pages are prerendered |
| [wiki/dark-mode.md](wiki/dark-mode.md) | how dark mode works and what new UI must do |
| [wiki/visual-identity.md](wiki/visual-identity.md) | colour, type and shape, and why |
| [wiki/assets.md](wiki/assets.md) | where files go; image and video loading |
| [wiki/video.md](wiki/video.md), [wiki/video-workflow.md](wiki/video-workflow.md) | video policy; adding a clip step by step |
| [wiki/project-subsites.md](wiki/project-subsites.md) | how a lab project page should look |
| [wiki/legal-pages.md](wiki/legal-pages.md) | Impressum, privacy policy, and the rules that keep them true |
| [wiki/decks-and-print.md](wiki/decks-and-print.md) | the brand guide for print and partners |
| [wiki/open-issues.md](wiki/open-issues.md), [wiki/later.md](wiki/later.md) | known problems; deferred work |
| [AGENTS.md](AGENTS.md) | the repo map and hard-won rules, written for AI coding agents and useful to anyone new |

## Built with

React 19, Vite 7, Tailwind CSS 3, React Router 7, Framer Motion. Exact versions
are in `package.json`.
