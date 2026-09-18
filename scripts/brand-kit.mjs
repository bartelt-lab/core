// Builds brand/CORE-Brand-Kit.zip — the package we hand to someone who has to make
// something with the brand and does not have this repo.
//
// Everything in it is derived from committed sources, so the zip itself is gitignored:
// a stale kit that disagrees with the logos is worse than no kit. Rebuild and re-send
// rather than editing its contents by hand.
//
// Run: node scripts/brand-kit.mjs   (requires the PDF: node scripts/brand-guide.mjs)

import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import sharp from 'sharp'

const ROOT = path.resolve(import.meta.dirname, '..')
const LOGOS = path.join(ROOT, 'public/logos/core')
const OUT_DIR = path.join(ROOT, 'brand')
const STAGE = path.join(OUT_DIR, 'CORE-Brand-Kit')
const ZIP = path.join(OUT_DIR, 'CORE-Brand-Kit.zip')
const PDF = path.join(OUT_DIR, 'CORE-Brand-Guidelines.pdf')

// Repo filenames are terse and lowercase. Nobody outside the team should have to guess
// what "core_ura" means, so everything is renamed on the way into the kit.
const LOCKUPS = {
  'core.svg': 'CORE-Network',
  'core_tuc.svg': 'CORE-TU-Clausthal',
  'core_ubb.svg': 'CORE-UBB-Cluj',
  'core_ura.svg': 'CORE-Uni-Rostock',
}
const BACKGROUNDS = {
  'white-background': 'for-white-backgrounds',
  'light-background': 'for-light-backgrounds',
  'dark-background': 'for-dark-backgrounds',
  'black-background': 'for-black-backgrounds',
}

const PNG_WIDTH = 2000 // wide enough to place in print without anyone scaling a small file up

if (!fs.existsSync(PDF)) {
  console.error('brand-kit: brand/CORE-Brand-Guidelines.pdf is missing.')
  console.error('           Run `node scripts/brand-guide.mjs` first.')
  process.exit(1)
}

fs.rmSync(STAGE, { recursive: true, force: true })
const mk = (...p) => {
  const d = path.join(STAGE, ...p)
  fs.mkdirSync(d, { recursive: true })
  return d
}

// ─── the guidelines ────────────────────────────────────────────────────────
fs.mkdirSync(STAGE, { recursive: true })
fs.copyFileSync(PDF, path.join(STAGE, 'CORE-Brand-Guidelines.pdf'))

// ─── logos, vector and raster ──────────────────────────────────────────────
let svgCount = 0
const pngJobs = []
for (const [srcDir, dstDir] of Object.entries(BACKGROUNDS)) {
  const vec = mk('Logos', 'Vector (SVG)', dstDir)
  const ras = mk('Logos', 'PNG', dstDir)
  for (const [file, name] of Object.entries(LOCKUPS)) {
    const src = path.join(LOGOS, srcDir, file)
    fs.copyFileSync(src, path.join(vec, `${name}.svg`))
    svgCount++
    // Transparent background: a dark-background lockup has to sit on the user's own
    // dark colour, which we do not know.
    pngJobs.push(
      sharp(src, { density: 600 })
        .resize({ width: PNG_WIDTH })
        .png()
        .toFile(path.join(ras, `${name}.png`))
    )
  }
}

// ─── the avocado on its own ────────────────────────────────────────────────
const avo = mk('Avocado')
fs.copyFileSync(path.join(LOGOS, 'avocando-icon.svg'), path.join(avo, 'CORE-Avocado.svg'))
for (const size of [1024, 512, 256]) {
  pngJobs.push(
    sharp(path.join(LOGOS, 'avocando-icon.svg'), { density: 900 })
      .resize({ height: size })
      .png()
      .toFile(path.join(avo, `CORE-Avocado-${size}px.png`))
  )
}

await Promise.all(pngJobs)

// ─── colours, as a flat list anyone can copy ───────────────────────────────
// Read from index.css so the kit cannot ship a colour the site has stopped using.
const css = fs.readFileSync(path.join(ROOT, 'src/index.css'), 'utf8')
const hexOf = (scope, name) => {
  const from = scope === ':root' ? 0 : css.indexOf(scope)
  const body = css.slice(from, css.indexOf('}', from))
  const m = body.match(new RegExp(`--${name}:\\s*(\\d+) (\\d+) (\\d+)`))
  return '#' + [m[1], m[2], m[3]].map((v) => (+v).toString(16).padStart(2, '0')).join('').toUpperCase()
}
const C = {
  green: hexOf(':root', 'primary-500'),
  deep: hexOf(':root', 'primary-700'),
  lime: hexOf(':root', 'secondary-300'),
  brown: hexOf(':root', 'tertiary-600'),
  ubb: hexOf('.theme-ubb', 'site-900'),
}

fs.writeFileSync(path.join(STAGE, 'Colours.txt'), `CORE — COLOURS
==============

Screen values (RGB / hex). These are the reference; see the note on printing below.

  CORE Green    ${C.green}     The brand colour. Marks, fills, rules, highlights.
                              Do NOT set text in this colour.

  Deep Green    ${C.deep}     Use whenever green has to carry words — headings,
                              links, buttons.

  Lime          ${C.lime}     Inside the avocado. A small highlight on dark
                              backgrounds.

  Stone Brown   ${C.brown}     The avocado stone. Rarely used elsewhere.

  Slate         #0F172A     Body text, headlines, dark backgrounds.
  Cool Grey     #64748B     Captions, secondary text, fine rules.


HOST UNIVERSITY COLOUR
----------------------
Material from a specific lab may carry that university's own colour alongside the
green. This is optional.

  Babes-Bolyai Blue  ${C.ubb}   CORE Labs Cluj only. From the university seal.

Green always means CORE and marks anything the reader should act on.
The host colour only says where you are — never put it on a button or a link.


PRINTING
--------
There are no CMYK or Pantone values for this brand yet, deliberately. CORE Green
sits near the edge of what four-colour process can reproduce, so a blind
conversion comes back noticeably duller.

Please match to the hex values above and tell us what you used, rather than
converting on your own. If you are running spot colour, propose a match against
${C.green} and we will confirm it.

Large flat areas of the green are the risky case. Rules, type and small marks
convert comfortably.
`)

// ─── fonts: pointer, not payload ───────────────────────────────────────────
const fonts = mk('Fonts')
fs.writeFileSync(path.join(fonts, 'How to get the fonts.txt'), `CORE — FONTS
============

Two typefaces. Both are free and open-licensed (SIL Open Font License), so you can
download, install and embed them at no cost.

  Poppins   headings and titles      https://fonts.google.com/specimen/Poppins
  Inter     body text and labels     https://fonts.google.com/specimen/Inter

Use the "Get font" / "Download all" button on those pages, then install the files
on your machine.

Weights we use:
  Poppins   SemiBold 600, Bold 700, ExtraBold 800
  Inter     Light 300 through Bold 700


WHY THIS MATTERS MORE THAN IT SOUNDS
------------------------------------
This is the single most common way CORE material goes wrong:

  You build a slide deck, it looks right on your machine, you send the
  PowerPoint file. The other computer does not have Poppins. PowerPoint
  silently substitutes Calibri. Every heading reflows and the deck no
  longer looks like ours.

You will never see it happen. They will.

  - Embed the fonts in the file if your PowerPoint offers it, OR
  - send a PDF instead. For anything you are not presenting yourself,
    send a PDF.

For print: convert type to outlines before sending artwork to a printer, or
supply the font files along with it.

The fonts are not bundled in this kit on purpose — please download them from the
official source above, so you get the current version with its licence intact.
`)

// ─── README ────────────────────────────────────────────────────────────────
fs.writeFileSync(path.join(STAGE, 'READ ME FIRST.txt'), `CORE — BRAND KIT
================

Everything you need to make something that looks like CORE.

Start with CORE-Brand-Guidelines.pdf. It is ten pages and answers most questions
you are likely to have.


WHAT IS IN HERE
---------------
  CORE-Brand-Guidelines.pdf   The full guide. Read this first.
  Colours.txt                 Colour values, and a note for printers.
  Logos/                      Every version of the logo.
  Avocado/                    The avocado on its own.
  Fonts/                      Where to download the two typefaces.


PICKING A LOGO — TWO QUESTIONS
------------------------------
1. WHO IS SPEAKING?

     CORE-Network         the network as a whole
     CORE-TU-Clausthal    material from Clausthal / Goslar
     CORE-UBB-Cluj        material from Babes-Bolyai / Cluj-Napoca
     CORE-Uni-Rostock     material from Rostock

2. WHAT IS BEHIND IT?

     for-white-backgrounds    pure white
     for-light-backgrounds    light tints, pale photos
     for-dark-backgrounds     dark slides, deep photos
     for-black-backgrounds    true black

  These are four different files, not one file recoloured. If the logo looks
  wrong on your background, you have picked the wrong file — do not recolour it.


SVG OR PNG?
-----------
  Use SVG where you can. It stays sharp at any size and is what a printer wants.
  Use PNG if your software will not take SVG. These are 2000 px wide with a
  transparent background, which is enough for print at a sensible size.

  Never take a logo off the website and enlarge it.


THE THREE RULES THAT MATTER MOST
--------------------------------
  1. Do not rebuild the mark. Do not retype CORE, redraw the avocado, recolour
     it, stretch it, rotate it, or put it in a coloured box. If you need a
     version that is not in here, ask for it.

  2. Give it room. Keep clear space around the logo equal to half its height on
     every side. Nothing enters that area.

  3. Never set text in bright CORE Green. Use Deep Green when green has to
     carry words. See Colours.txt.


If you are unsure, or you want to do something the guide does not cover, ask
before you produce it. That is always cheaper than a reprint.
`)

// ─── zip ───────────────────────────────────────────────────────────────────
fs.rmSync(ZIP, { force: true })
execFileSync('zip', ['-r', '-q', '-X', ZIP, 'CORE-Brand-Kit'], { cwd: OUT_DIR })
fs.rmSync(STAGE, { recursive: true, force: true })

const files = execFileSync('unzip', ['-l', ZIP], { encoding: 'utf8' })
  .trim().split('\n').pop().trim().split(/\s+/)[1]
console.log(`wrote ${path.relative(ROOT, ZIP)}  (${(fs.statSync(ZIP).size / 1024 / 1024).toFixed(1)} MB, ${files} files)`)
console.log(`  ${svgCount} logo SVGs + ${svgCount} PNGs, avocado in 4 formats, guidelines PDF, 3 text files`)
