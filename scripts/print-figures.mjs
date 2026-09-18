// Figures for wiki/decks-and-print.md — roll-up zones, slide anatomy, logo
// clear space. Geometry is computed from the real dimensions, not drawn by eye,
// so the numbers in the doc and the numbers in the pictures cannot drift.
//
// Run: node scripts/print-figures.mjs

import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const OUT = path.join(ROOT, 'wiki', 'decks-and-print')

// Brand colours come from index.css, same as scripts/palette-figures.mjs.
const css = fs.readFileSync(path.join(ROOT, 'src', 'index.css'), 'utf8')
function tok(name) {
  const m = css.match(new RegExp(`--${name}:\\s*(\\d+) (\\d+) (\\d+)`))
  if (!m) throw new Error(`print-figures: --${name} not found in index.css`)
  return `#${[m[1], m[2], m[3]].map((v) => (+v).toString(16).padStart(2, '0')).join('')}`
}

const GREEN = tok('primary-700')
const AVOCADO = tok('primary-500')
const LIME = tok('secondary-300')

const INK = '#0f172a'
const MUTED = '#64748b'
const HAIR = '#cbd5e1'
const WARN = '#dc2626'
const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const svg = (w, h, body, title, desc) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="t d">
<title id="t">${esc(title)}</title><desc id="d">${esc(desc)}</desc>
<rect width="${w}" height="${h}" fill="#ffffff"/>
${body}
</svg>
`
const text = (x, y, s, o = {}) =>
  `<text x="${x}" y="${y}" font-family="${o.mono ? MONO : FONT}" font-size="${o.size ?? 11}" ` +
  `fill="${o.fill ?? INK}" ${o.weight ? `font-weight="${o.weight}"` : ''} ` +
  `${o.anchor ? `text-anchor="${o.anchor}"` : ''}>${esc(s)}</text>`

// ─── figure 1: roll-up banner zones ────────────────────────────────────────
// 850 x 2000 mm is the common European roll-up. The cassette hides the bottom
// of the print and the top curls, so neither end is usable.

function figureRollup() {
  const MM_W = 850, MM_H = 2000
  const SCALE = 0.33
  const BW = MM_W * SCALE, BH = MM_H * SCALE
  const PAD = 30, LEFT = 96
  const W = LEFT + BW + 290, H = BH + PAD * 2 + 56

  const mm = (v) => v * SCALE
  const X = LEFT, Y = PAD + 42

  const zones = [
    { from: 0, to: 100, label: 'top curl', note: 'leans back — nothing critical', fill: '#fee2e2', stroke: WARN },
    { from: 100, to: 400, label: 'logo zone', note: 'lockup here, never lower', fill: '#f1f5f9', stroke: HAIR },
    { from: 400, to: 1000, label: 'headline', note: 'above eye level, read first', fill: '#ffffff', stroke: HAIR },
    { from: 1000, to: 1550, label: 'eye-level band', note: 'the only zone read at a glance', fill: '#ecfdf5', stroke: AVOCADO },
    { from: 1550, to: 1800, label: 'detail / QR', note: 'read up close, if at all', fill: '#ffffff', stroke: HAIR },
    { from: 1800, to: 2000, label: 'cassette', note: 'hidden by the stand', fill: '#fee2e2', stroke: WARN },
  ]

  let s = text(PAD, 28, 'Roll-up banner — 850 × 2000 mm', { size: 15 })
  s += text(PAD, 46, 'only the middle metre is read standing up', { size: 12, fill: MUTED })

  for (const z of zones) {
    const y = Y + mm(z.from), h = mm(z.to - z.from)
    s += `<rect x="${X}" y="${y}" width="${BW}" height="${h}" fill="${z.fill}" stroke="${z.stroke}" stroke-width="1"/>`
    // Thin zones cannot hold two stacked lines; drop the note rather than overlap.
    const roomy = h >= 46
    const tx = X + mm(60) + 10 // clear the dashed side margin
    s += text(tx, y + (roomy ? 20 : 15), z.label, { size: 11, weight: 600 })
    if (roomy) s += text(tx, y + 35, z.note, { size: 10, fill: MUTED })
    s += text(X - 10, y + 13, `${z.from}`, { size: 9, fill: MUTED, anchor: 'end', mono: true })
  }
  s += text(X - 10, Y + BH + 13, `${MM_H}`, { size: 9, fill: MUTED, anchor: 'end', mono: true })
  s += text(X - 10, Y - 9, 'mm', { size: 9, fill: MUTED, anchor: 'end' })

  // safe side margins
  const SIDE = 60
  s += `<line x1="${X + mm(SIDE)}" y1="${Y}" x2="${X + mm(SIDE)}" y2="${Y + BH}" stroke="${GREEN}" stroke-dasharray="4 3" stroke-width="1"/>`
  s += `<line x1="${X + BW - mm(SIDE)}" y1="${Y}" x2="${X + BW - mm(SIDE)}" y2="${Y + BH}" stroke="${GREEN}" stroke-dasharray="4 3" stroke-width="1"/>`

  const RX = X + BW + 28
  s += text(RX, Y + 16, 'Fixed rules', { size: 12, weight: 700 })
  const notes = [
    ['60 mm side margin', 'dashed — the print wraps at the edges'],
    ['bottom 200 mm is lost', 'the cassette covers it'],
    ['cap height ≥ 15 mm', 'read at 3 m — roughly 42 pt and up'],
    ['headline ≥ 40 mm cap', 'read from across a room'],
    ['no body copy below 24 pt', 'nobody crouches to read a banner'],
    ['300 dpi at final size', 'or vector; a web export looks soft'],
  ]
  notes.forEach(([a, b], i) => {
    const y = Y + 46 + i * 44
    s += text(RX, y, a, { size: 11, weight: 600 })
    s += text(RX, y + 15, b, { size: 10, fill: MUTED })
  })

  return svg(W, H, s, 'Roll-up banner layout zones',
    'An 850 by 2000 mm roll-up banner divided into zones: a top curl and a bottom cassette that are both unusable, a logo zone, a headline zone, an eye-level band between 1000 and 1550 mm, and a detail zone.')
}

// ─── figure 2: slide anatomy ───────────────────────────────────────────────

function figureSlide() {
  const SW = 640, SH = 360 // 16:9
  const PAD = 30, TOP = 74
  const W = SW + PAD * 2 + 240, H = SH + TOP + 96

  const M = 40 // margin, ~6% of width
  let s = text(PAD, 28, 'Slide — 16:9, 13.333 × 7.5 in (33.87 × 19.05 cm)', { size: 15 })
  s += text(PAD, 46, 'the margin is not decoration: projectors and video calls crop the edges', { size: 12, fill: MUTED })

  s += `<rect x="${PAD}" y="${TOP}" width="${SW}" height="${SH}" fill="#ffffff" stroke="${INK}" stroke-width="1.5"/>`
  s += `<rect x="${PAD + M}" y="${TOP + M}" width="${SW - M * 2}" height="${SH - M * 2}" fill="none" stroke="${GREEN}" stroke-dasharray="5 4"/>`

  // title + body zones
  s += `<rect x="${PAD + M}" y="${TOP + M}" width="${SW - M * 2}" height="64" fill="#f1f5f9"/>`
  s += text(PAD + M + 14, TOP + M + 30, 'Title — Poppins 600, 32–40 pt', { size: 12, weight: 600 })
  s += text(PAD + M + 14, TOP + M + 50, 'one line; if it wraps to three, it is a paragraph', { size: 10, fill: MUTED })

  s += `<rect x="${PAD + M}" y="${TOP + M + 78}" width="${SW - M * 2}" height="150" fill="#ffffff" stroke="${HAIR}" stroke-dasharray="3 3"/>`
  s += text(PAD + M + 14, TOP + M + 104, 'Body — Inter 400, 24 pt floor, 18 pt absolute', { size: 12, weight: 600 })
  s += text(PAD + M + 14, TOP + M + 124, 'the back row is ~8 m from the screen', { size: 10, fill: MUTED })

  // logo corner
  const lw = 96, lh = 26
  s += `<rect x="${PAD + SW - M - lw}" y="${TOP + SH - M - lh}" width="${lw}" height="${lh}" fill="none" stroke="${AVOCADO}" stroke-width="1.5"/>`
  s += text(PAD + SW - M - lw + 6, TOP + SH - M - lh + 17, 'lockup ≥ 64 px', { size: 9, fill: GREEN, mono: true })

  s += text(PAD + M + 14, TOP + SH - M - 14, 'one idea per slide', { size: 10, fill: MUTED })

  // annotations
  s += text(PAD + SW / 2, TOP - 8, `6% margin — safe area`, { size: 10, fill: GREEN, anchor: 'middle' })

  const RX = PAD + SW + 26
  s += text(RX, TOP + 16, 'Carry over from the web', { size: 12, weight: 700 })
  const rows = [
    ['Poppins headings, Inter body', 'embed both, or a stranger’s laptop picks Calibri'],
    ['green marks CORE', 'site accent marks the host institution'],
    ['flat brand colour', 'the one gradient is the wordmark, nothing else'],
    ['never green text on white', `${AVOCADO} is 2.6:1 — worse on a projector`],
    ['slate for body text', 'not black, not pure grey'],
  ]
  rows.forEach(([a, b], i) => {
    const y = TOP + 44 + i * 44
    s += text(RX, y, a, { size: 11, weight: 600 })
    s += text(RX, y + 15, b, { size: 10, fill: MUTED })
  })

  return svg(W, H, s, 'Slide layout anatomy',
    'A 16:9 slide with a 6 percent safe margin, a title zone, a body zone, and the logo in the bottom right corner, annotated with type sizes.')
}

// ─── figure 3: logo clear space and minimum size ───────────────────────────

function figureLogo() {
  // core_ubb.svg is 104 x 28 user units; the avocado is 12.72 x 17.37 of those,
  // and the site tag's cap height is 3.57 — which is what sets the minimum size.
  const U = 4.6 // px per user unit
  const LW = 104 * U, LH = 28 * U
  const CLEAR = LH / 2
  const PAD = 30, TOP = 78
  const W = PAD * 2 + LW + CLEAR * 2 + 292
  const H = TOP + LH + CLEAR * 2 + 96

  let s = text(PAD, 28, 'Clear space and minimum size', { size: 15 })
  s += text(PAD, 46, 'one avocado of space on every side — which is half the lockup height', { size: 12, fill: MUTED })

  const X = PAD + CLEAR, Y = TOP + CLEAR
  s += `<rect x="${PAD}" y="${TOP}" width="${LW + CLEAR * 2}" height="${LH + CLEAR * 2}" fill="#f8fafc" stroke="${HAIR}" stroke-dasharray="4 3"/>`
  s += `<rect x="${X}" y="${Y}" width="${LW}" height="${LH}" fill="#ffffff" stroke="${INK}"/>`

  // The real lockup, base64'd in. Redrawing it as a schematic is how you end up
  // documenting a mark that does not match the one in public/logos/core/.
  const logo = fs.readFileSync(path.join(ROOT, 'public/logos/core/light-background/core_ubb.svg'))
  s += `<image x="${X}" y="${Y}" width="${LW}" height="${LH}" href="data:image/svg+xml;base64,${logo.toString('base64')}"/>`

  // clear-space arrows
  const arrow = (x1, y1, x2, y2) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${GREEN}" stroke-width="1.2"/>`
  s += arrow(PAD + 6, Y + LH / 2, X - 4, Y + LH / 2)
  s += text((PAD + X) / 2, Y + LH / 2 - 8, '½ H', { size: 10, fill: GREEN, anchor: 'middle', weight: 600 })
  s += arrow(X + LW / 2, TOP + 6, X + LW / 2, Y - 4)
  s += text(X + LW / 2 + 16, (TOP + Y) / 2 + 4, '½ H', { size: 10, fill: GREEN, weight: 600 })

  // the tag cap height, which drives the minimum
  // Measured off the raster: the site tag sits at y 20.79-24.36, x 64.34+.
  const ty = Y + 20.79 * U
  s += `<line x1="${X + 62 * U}" y1="${ty}" x2="${X + 62 * U}" y2="${ty + 3.57 * U}" stroke="${WARN}" stroke-width="2"/>`
  s += text(X + 60 * U, Y + LH + 16, 'cap 3.57u = 12.7% of H', { size: 9, fill: WARN, mono: true })

  const RX = PAD + LW + CLEAR * 2 + 26
  s += text(RX, TOP + 16, 'Minimums', { size: 12, weight: 700 })
  const rows = [
    ['print: 12 mm tall', '≈ 44 mm wide — below this “UBB CLUJ” fills in'],
    ['screen: 64 px tall', '≈ 233 px wide'],
    ['icon alone: 8 mm / 32 px', 'only where CORE is already named'],
    ['never redraw or recolour', 'four background variants already exist'],
  ]
  rows.forEach(([a, b], i) => {
    const y = TOP + 44 + i * 42
    s += text(RX, y, a, { size: 11, weight: 600 })
    s += text(RX, y + 15, b, { size: 10, fill: MUTED })
  })

  const fy = TOP + LH + CLEAR * 2 + 36
  s += `<line x1="${PAD}" y1="${fy - 18}" x2="${W - PAD}" y2="${fy - 18}" stroke="${HAIR}"/>`
  s += text(PAD, fy, 'The smallest element sets the floor: the site tag’s cap height is 12.7% of the lockup height,', { size: 11 })
  s += text(PAD, fy + 17, 'so a 12 mm lockup puts that cap at 1.5 mm — the point where small caps stop surviving ink spread.', { size: 11 })

  return svg(W, H, s, 'Logo clear space and minimum size',
    'The CORE UBB lockup surrounded by clear space equal to half its height on every side, with the site tag cap height marked as the element that sets the minimum reproduction size.')
}

// ─── write ─────────────────────────────────────────────────────────────────

fs.mkdirSync(OUT, { recursive: true })
const figures = {
  'rollup-zones.svg': figureRollup(),
  'slide-anatomy.svg': figureSlide(),
  'logo-clear-space.svg': figureLogo(),
}
for (const [name, body] of Object.entries(figures)) {
  fs.writeFileSync(path.join(OUT, name), body)
  console.log(`wrote wiki/decks-and-print/${name}  (${(body.length / 1024).toFixed(1)} KB)`)
}
