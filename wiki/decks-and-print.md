# Decks and print — repo side

**The brand rules for slides, banners and print live in the PDF, not here:**
`brand/CORE-Brand-Guidelines.pdf`, built by `scripts/brand-guide.mjs`.

That PDF is what gets sent to people outside the team — partners, designers, print shops,
event organisers. It assumes the reader has never seen this repo and never will, so it
mentions no file paths, no tokens and no build steps. Send it as-is; do not paraphrase it
into an email, or there will be two versions of the rules.

This file holds only what does **not** belong in a document handed to outsiders: how the
PDF is produced, where its numbers came from, and what is still undecided.

## Regenerating

```bash
node scripts/brand-guide.mjs
```

Renders an HTML document to A4 with Playwright — the same Chromium the prerender pass
already depends on, so this adds no new dependency. Commit the PDF with any change to the
script.

Two things it does deliberately, both of which look like they could be simplified:

- **Colours are read out of `src/index.css`**, not typed into the script. A brand colour
  change propagates into the guide on the next run, and the guide cannot quote a shade the
  site has stopped using.
- **The logo SVGs are base64'd into the document**, so the PDF is self-contained and shows
  the real marks. An early draft redrew the lockup as a schematic and produced a mark that
  did not match the shipped one.

Also note `page.setContent` resolves *before* webfonts paint. The `document.fonts.ready`
await after it is load-bearing — without it the PDF ships in Helvetica and looks like a
different brand entirely.

**`background-clip: text` does not survive Chromium's PDF path.** The partnership gradient
on the word "Cluj" rendered with a white plate over the glyphs. It is drawn as SVG
`<text>` with a `linearGradient` fill instead. Do not "tidy" that back into CSS.

## Where the numbers came from

The guide states minimum sizes as fact. They were derived, not chosen:

- **Minimum logo size** comes from the smallest element in the lockup, which is the site
  tag. Measured off a 2400-dpi raster of `core_ubb.svg`, its cap height is 3.57 of the
  file's 28 user units — 12.7% of lockup height. A 12 mm lockup therefore puts those caps
  at 1.5 mm, about where small caps stop surviving ink spread on coated stock. 64 px on
  screen is the same calculation against an 8 px cap.
- **Clear space** is half the lockup height, which for `core_ubb.svg` (avocado 17.37 units
  against a 28-unit lockup) is almost exactly the avocado's height — hence the mnemonic in
  the PDF.
- **Type minimums** come from *cap height ≥ viewing distance / 200*.

Re-measure if a logo file is ever redrawn. `scripts/print-figures.mjs` holds the working
for the internal diagrams.

## Facts worth not rediscovering

- **The four background variants are not one file recoloured.** The avocado is identical in
  all four — `#01BC2B` / `#C8F200` / `#4C3006` — and only the wordmark ink and site tag
  move, so the tag holds contrast on each background: `#2D8F35` on white, `#28942E` on
  light, `#35A33C` on dark, `#3DB845` on black.
- **The site tags read "TU CLAUSTHAL", "UBB CLUJ" and "UNI ROSTOCK"** — not the internal
  shorthands TUC / URA. Material for external readers should follow the mark.
- **`public/logos/core/legacy/` is superseded.** Raster, kept for history. Never ship it.

## Still open

- **Nobody owns print colour.** No CMYK or Pantone values exist for this brand — not in
  the repo, not in the logo files, which carry sRGB and nothing else. The avocado green
  sits near the edge of the CMYK gamut, so the first person to invent a conversion sets
  the print colour by accident. The PDF tells printers to match against the sRGB values
  and ask; **record whatever they match here** once someone has run a real job.
- **There is no deck template.** No `.pptx` or `.potx` anywhere. The guide is written so a
  deck can be built by hand, but a template would remove most of the remaining ways to get
  it wrong. Worth building after the colour question is settled, since it would bake in
  whatever gets decided.
- **Roll-up dimensions are the common case, not a measured spec.** 850 × 2000 mm with a
  200 mm cassette is typical; confirm against the actual supplier before a print run.
- **The guide is English only.** The site carries EN/DE; a German edition would mean
  parameterising the copy in `scripts/brand-guide.mjs`, which is currently inline.

## Internal diagrams

`scripts/print-figures.mjs` emits `wiki/decks-and-print/*.svg` — roll-up zones, slide
anatomy, logo clear space. These are the working drawings behind the PDF's numbers and are
kept for whoever maintains it; the PDF has its own artwork and does not use them.
