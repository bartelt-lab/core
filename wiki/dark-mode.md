# Dark mode

First pass, 2026-11. Light stays the default; the moon/sun button beside the
EN/DE switch (bottom left, every shell) turns dark mode on and remembers the
choice per browser (`localStorage["core-theme"]`). The system preference is not
followed, by decision (2026-11): light is what every visitor gets until they
choose otherwise.

## How it works

The theme is a `dark` class on `<html>`. An inline script in `index.html`
applies the stored choice before first paint; `components/common/ThemeToggle.jsx`
flips it.

Pages are **not** covered in `dark:` variants. Instead, colours flip by role:

| Role | Utilities | Variables |
| --- | --- | --- |
| Surface | `bg-white`, `bg-slate-50…300`, `bg-primary-50…200`, `bg-site-100`, pastel `bg-*-50`, and the same names as gradient stops | `--bg-*` |
| Text | `text-slate-500…950`, `text-primary-600…900`, `text-site-900`, pastel text | `--tx-*` |
| Hairline | `border-*`, `divide-*`, `ring-*` for white, slate 100–400, primary 100–300, and the `border-site-900` accent line | `--bd-*` |
| Shadow tint | `shadow-slate-*` | `--sh-slate` |

`tailwind.config.js` maps those utilities to the variables (per property, via
`backgroundColor`, `textColor`, `borderColor`, …). `src/index.css` declares the
light values in `:root`, equal to the Tailwind defaults, and rebinds them under
`.dark`. So `bg-white text-slate-900 border-slate-200` is a card in both themes
with no extra classes.

Everything **not** in the table renders the same in both themes. That is what
keeps the intentionally dark parts working: `bg-slate-950` sections,
`text-white`, `text-slate-300`, green `bg-primary-600/700` buttons.

## Rules when writing new UI

- Use the role utilities above for anything that should follow the theme.
  A new light tint (say `bg-teal-50`) will stay light in dark mode until it is
  added to the config and to both variable blocks.
- Arbitrary colours (`bg-[#f7fafc]`) never flip. Pair them with an explicit
  `dark:` class, as the two photo heroes do (`pages/Home.jsx`,
  `pages/ComputeCluster.jsx`).
- **The same goes for a gradient written as an arbitrary value**
  (`bg-[radial-gradient(...rgba(220,252,231,0.72)...)]`): its colours are
  literals and stay light. Add `dark:hidden` to it and a `hidden dark:block`
  twin with dark colours beside it, as the AI Team Projects hero does. That
  hero shipped with a white title on a near-white wash for exactly this
  reason; a passing build does not show it, only looking at the page does.
- To keep something white in dark mode, use `bg-[#fff]`.
- Third-party logos (universities, partners) are dark artwork and vanish on a
  dark card. Render them with `components/common/ThirdPartyLogo.jsx`:
  - If the logo has a dark-mode file in `public/logos/dark/`, that file shows
    in dark mode. The TU Clausthal, UBB, Rostock and DIGIT logos have one.
  - Otherwise it falls back to `logo-plate`: no effect in light mode, a white
    plate in dark mode. The industry partner logos still use the plate.
  To add a dark-mode file, add the logo to `JOBS` in `scripts/dark-logos.mjs`
  and to the list in `ThirdPartyLogo.jsx`, then run the script. It only clears
  white backgrounds and lightens neutral lettering; brand colours are never
  changed. Where an official light-on-dark logo exists (UBB), it is used.
- `bg-site-900` does not flip, because it also sits under white text (number
  badges). Where it is a thin accent bar, add `dark:bg-site-300` by hand, as
  `Section` in `components/tuc/ui.jsx` does.
- CORE's own logos go through `components/common/ThemedLogo.jsx`, which picks
  the `light-background` or `dark-background` file.
- `tailwind.config.js` does not hot-reload. Restart the dev server after
  changing the role maps.

## Special cases in `index.css`

- Near-black pill buttons (`bg-slate-950` on a rounded link or button) turn
  green in dark mode; otherwise they vanish into the page.
- `.lab-hero-wash` and `.wordmark-partnership` have dark variants.
- The site accents (`.theme-ubb`, `.theme-tuc`) re-declare their role
  variables, because a variable that points at `var(--site-*)` resolves where
  it is declared.

## Open points

- **System preference.** Deliberately not followed (see top). If that changes,
  extend the inline script in `index.html` to also add `dark` when nothing is
  stored and `matchMedia('(prefers-color-scheme: dark)')` matches.
- **Checked by eye:** home, publications, industry projects, CORE Labs, AI Team
  Projects, compute cluster, both Join Us pages, `/tuc`, `/tuc/teaching`,
  `/ubb`, `/dynamo`, TEMPO, and both headers with their phone menus. An
  automated contrast sweep also covered news, MediCar, vial-sort,
  leader-following and demos. The other student project pages and most hover
  and focus states have not been looked at.
- **Inline colours.** A few pages carry hex colours in `style` attributes or
  SVG diagrams (mostly `pages/tuc/projects/TempoProject.jsx`). They do not flip.
- **Photo heroes.** The home page hero is its light render inverted with a CSS
  filter. The compute cluster hero is dimmed instead (`dark:opacity-50`):
  inverted, that photo turned muddy. Dedicated dark images would look better
  than either.
- **Print/brand.** `wiki/visual-identity.md` documents the light palette only;
  the dark surface and text values are a first proposal, not a brand decision.
