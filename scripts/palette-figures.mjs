// Draws the figures embedded in wiki/visual-identity.md, reading the live palette
// out of src/index.css so they cannot drift from what the site actually ships.
//
//   node scripts/palette-figures.mjs
//
// Writes wiki/visual-identity/{ramps,hue-vs-chroma,contrast}.svg. Re-run after any
// change to the :root block and commit the result alongside it.

import fs from 'node:fs'
import path from 'node:path'

// ─── colour maths ──────────────────────────────────────────────────────────

const srgb2lin = (c) => {
  c /= 255
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}
const lin2srgb = (c) => {
  const v = c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055
  return Math.max(0, Math.min(255, Math.round(v * 255)))
}

const rgb2oklab = ([r0, g0, b0]) => {
  const r = srgb2lin(r0), g = srgb2lin(g0), b = srgb2lin(b0)
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  return [
    0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s,
  ]
}

const oklab2rgb = ([L, a, bb]) => {
  const l = (L + 0.3963377774 * a + 0.2158037573 * bb) ** 3
  const m = (L - 0.1055613458 * a - 0.0638541728 * bb) ** 3
  const s = (L - 0.0894841775 * a - 1.2914855480 * bb) ** 3
  return [
    lin2srgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    lin2srgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    lin2srgb(-0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s),
  ]
}

const lum = ([r, g, b]) => 0.2126 * srgb2lin(r) + 0.7152 * srgb2lin(g) + 0.0722 * srgb2lin(b)
const contrastOnWhite = (c) => 1.05 / (lum(c) + 0.05)
const hex = (v) => '#' + v.map((x) => x.toString(16).padStart(2, '0')).join('').toUpperCase()

// ─── inputs ────────────────────────────────────────────────────────────────

const ROOT = path.resolve(import.meta.dirname, '..')
const OUT = path.join(ROOT, 'wiki', 'visual-identity')

const css = fs.readFileSync(path.join(ROOT, 'src', 'index.css'), 'utf8')

// Read one rule's declarations. Stop at the rule's own closing brace — slicing
// to the next @layer would swallow the .theme-* blocks that follow :root, and
// their --site-* values would silently overwrite the defaults parsed here.
function block(selector) {
  const start = css.indexOf(selector)
  if (start === -1) throw new Error(`palette-figures: no ${selector} in index.css`)
  const body = css.slice(start, css.indexOf('}', start))
  const out = {}
  for (const m of body.matchAll(/--([a-z]+)-(\d+):\s*(\d+) (\d+) (\d+)/g)) {
    ;(out[m[1]] ??= {})[m[2]] = [+m[3], +m[4], +m[5]]
  }
  return out
}

const pal = block(':root')
const themes = { ubb: block('.theme-ubb') }

// The logo SVGs are the authority; these are the hexes they carry.
const LOGO = {
  primary: { rgb: [1, 188, 43], anchor: '500', label: 'avocado green' },
  secondary: { rgb: [200, 242, 0], anchor: '300', label: 'lime' },
  tertiary: { rgb: [76, 48, 6], anchor: '600', label: 'pit brown' },
}

// Site accents: a host institution's own mark, rebound under a .theme-* class.
// Anchored the same way the brand ramps are — one step IS the seal exactly.
const SITES = {
  ubb: { rgb: [3, 78, 132], anchor: '900', label: 'Babeș-Bolyai seal', where: '/ubb' },
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const INK = '#0f172a'
const MUTED = '#64748b'
const HAIR = '#cbd5e1'
const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"

const svg = (w, h, body, title, desc) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="t d">
<title id="t">${esc(title)}</title><desc id="d">${esc(desc)}</desc>
<rect width="${w}" height="${h}" fill="#ffffff"/>
${body}
</svg>
`

// ─── figure 1: the ramps, with the logo anchors marked ─────────────────────

function figureRamps() {
  const SW = 64, SH = 46, GAP = 4, X0 = 104, PAD = 22
  const rows = Object.keys(LOGO)
  const widest = Math.max(...rows.map((f) => Object.keys(pal[f]).length))
  const W = X0 + widest * (SW + GAP) + PAD
  const ROW_H = 112
  const H = 62 + rows.length * ROW_H

  let s = `<text x="${PAD}" y="30" font-family="${FONT}" font-size="15" fill="${INK}">Brand ramps — the outlined swatch is the logo hex, byte for byte</text>`
  s += `<text x="${PAD}" y="48" font-family="${FONT}" font-size="12" fill="${MUTED}">contrast ratio against white shown under each step</text>`

  rows.forEach((fam, i) => {
    const y = 74 + i * ROW_H
    const steps = Object.keys(pal[fam]).sort((a, b) => +a - +b)
    s += `<text x="${PAD}" y="${y + 22}" font-family="${FONT}" font-size="13" fill="${INK}">${fam}</text>`
    s += `<text x="${PAD}" y="${y + 38}" font-family="${FONT}" font-size="11" fill="${MUTED}">${LOGO[fam].label}</text>`

    steps.forEach((step, j) => {
      const x = X0 + j * (SW + GAP)
      const c = pal[fam][step]
      const isAnchor = step === LOGO[fam].anchor
      s += `<rect x="${x}" y="${y}" width="${SW}" height="${SH}" rx="5" fill="${hex(c)}"/>`
      if (isAnchor) {
        s += `<rect x="${x - 3}" y="${y - 3}" width="${SW + 6}" height="${SH + 6}" rx="8" fill="none" stroke="${INK}" stroke-width="2.5"/>`
        s += `<text x="${x + SW / 2}" y="${y - 10}" text-anchor="middle" font-family="${FONT}" font-size="10" font-weight="600" fill="${INK}">LOGO</text>`
      } else {
        s += `<rect x="${x}" y="${y}" width="${SW}" height="${SH}" rx="5" fill="none" stroke="${HAIR}" stroke-width="0.5"/>`
      }
      s += `<text x="${x + SW / 2}" y="${y + SH + 16}" text-anchor="middle" font-family="${FONT}" font-size="11" fill="${INK}">${step}</text>`
      s += `<text x="${x + SW / 2}" y="${y + SH + 30}" text-anchor="middle" font-family="${MONO}" font-size="9" fill="${MUTED}">${hex(c)}</text>`
      s += `<text x="${x + SW / 2}" y="${y + SH + 43}" text-anchor="middle" font-family="${MONO}" font-size="9" fill="${MUTED}">${contrastOnWhite(c).toFixed(2)}</text>`
    })
  })

  return svg(W, H, s, 'Brand colour ramps',
    'The primary, secondary and tertiary ramps. One step in each is outlined and labelled LOGO, marking the step that equals the logo hex exactly.')
}

// ─── figure 2: hue-only vs propagating the anchor's chroma ─────────────────

function figureHueVsChroma() {
  const fam = 'primary'
  const steps = ['50', '100', '200', '300', '400', '500']
  const [, la, lb] = rgb2oklab(LOGO[fam].rgb)
  const hue = Math.atan2(lb, la)
  const anchorC = Math.hypot(la, lb)

  const SW = 118, SH = 60, GAP = 6, X0 = 176, PAD = 22
  const W = X0 + steps.length * (SW + GAP) + PAD
  const H = 296

  let s = `<text x="${PAD}" y="30" font-family="${FONT}" font-size="15" fill="${INK}">Why the ramp rotates in hue only</text>`
  s += `<text x="${PAD}" y="48" font-family="${FONT}" font-size="12" fill="${MUTED}">the light steps are meant to look desaturated next to the mark — that is not a bug to fix</text>`

  // The shipped row IS the live palette — read it, do not re-derive it, or the
  // figure drifts from index.css. The rejected row takes each shipped step's
  // lightness and forces the anchor's chroma onto it.
  const rowsSpec = [
    { y: 76, label: 'hue only', sub: 'shipped', build: (c) => c },
    { y: 176, label: "anchor's chroma", sub: 'rejected', build: (c) => {
        const [L] = rgb2oklab(c)
        return oklab2rgb([L, anchorC * Math.cos(hue), anchorC * Math.sin(hue)])
      } },
  ]

  for (const row of rowsSpec) {
    const rejected = row.sub === 'rejected'
    s += `<text x="${PAD}" y="${row.y + 26}" font-family="${FONT}" font-size="13" fill="${INK}">${esc(row.label)}</text>`
    s += `<text x="${PAD}" y="${row.y + 44}" font-family="${FONT}" font-size="11" font-weight="600" fill="${rejected ? '#b91c1c' : '#15803d'}">${row.sub}</text>`

    steps.forEach((step, j) => {
      const x = X0 + j * (SW + GAP)
      // Rebuild from the pre-realignment ramp so both rows start from the same place.
      const out = step === LOGO[fam].anchor ? LOGO[fam].rgb : row.build(pal[fam][step])
      s += `<rect x="${x}" y="${row.y}" width="${SW}" height="${SH}" rx="5" fill="${hex(out)}"/>`
      s += `<rect x="${x}" y="${row.y}" width="${SW}" height="${SH}" rx="5" fill="none" stroke="${HAIR}" stroke-width="0.5"/>`
      s += `<text x="${x + SW / 2}" y="${row.y + SH + 16}" text-anchor="middle" font-family="${MONO}" font-size="10" fill="${MUTED}">${hex(out)}</text>`
      if (row.y === 76) {
        s += `<text x="${x + SW / 2}" y="${row.y - 8}" text-anchor="middle" font-family="${FONT}" font-size="11" fill="${INK}">${step}</text>`
      }
    })
  }

  s += `<text x="${PAD}" y="${H - 14}" font-family="${FONT}" font-size="11" fill="${MUTED}">Both rows share the anchor and every step's lightness. Only chroma differs — and it is enough to turn every tint neon.</text>`

  return svg(W, H, s, 'Hue-only rotation versus propagating the anchor chroma',
    'Two versions of the primary ramp from step 50 to 500. The shipped row keeps each step original chroma and looks soft. The rejected row applies the logo chroma at every step and turns the light tints into saturated neon greens.')
}

// ─── figure 3: contrast against the AA floor ───────────────────────────────

function figureContrast() {
  const fam = 'primary'
  const steps = Object.keys(pal[fam]).sort((a, b) => +a - +b)
  const PAD = 22, X0 = 78, BW = 58, GAP = 10
  const W = X0 + steps.length * (BW + GAP) + PAD + 40
  const PLOT_H = 230, TOP = 78
  const H = TOP + PLOT_H + 76

  const maxC = 16
  const yFor = (c) => TOP + PLOT_H - (Math.min(c, maxC) / maxC) * PLOT_H

  let s = `<text x="${PAD}" y="30" font-family="${FONT}" font-size="15" fill="${INK}">Contrast on white, per primary step</text>`
  s += `<text x="${PAD}" y="48" font-family="${FONT}" font-size="12" fill="${MUTED}">the 4.5:1 line is the AA floor for body text</text>`

  for (const g of [0, 4.5, 8, 12, 16]) {
    const y = yFor(g)
    const isAA = g === 4.5
    s += `<line x1="${X0 - 10}" y1="${y}" x2="${W - PAD}" y2="${y}" stroke="${isAA ? '#dc2626' : HAIR}" stroke-width="${isAA ? 1.5 : 0.5}" ${isAA ? 'stroke-dasharray="5 3"' : ''}/>`
    s += `<text x="${X0 - 16}" y="${y + 4}" text-anchor="end" font-family="${MONO}" font-size="10" fill="${isAA ? '#dc2626' : MUTED}">${g === 4.5 ? '4.5' : g}</text>`
  }
  // Sits left of where any bar crosses the line — steps 50-500 are all below 4.5,
  // so this strip is empty. Bars are painted after this, and would cover it.
  s += `<text x="${X0 + 6}" y="${yFor(4.5) - 9}" font-family="${FONT}" font-size="11" font-weight="600" fill="#dc2626">AA floor for text</text>`

  steps.forEach((step, j) => {
    const x = X0 + j * (BW + GAP)
    const c = pal[fam][step]
    const ratio = contrastOnWhite(c)
    const y = yFor(ratio)
    s += `<rect x="${x}" y="${y}" width="${BW}" height="${TOP + PLOT_H - y}" rx="4" fill="${hex(c)}"/>`
    s += `<rect x="${x}" y="${y}" width="${BW}" height="${TOP + PLOT_H - y}" rx="4" fill="none" stroke="${HAIR}" stroke-width="0.5"/>`
    s += `<text x="${x + BW / 2}" y="${y - 7}" text-anchor="middle" font-family="${MONO}" font-size="10" fill="${INK}">${ratio.toFixed(2)}</text>`
    s += `<text x="${x + BW / 2}" y="${TOP + PLOT_H + 18}" text-anchor="middle" font-family="${FONT}" font-size="11" fill="${INK}">${step}</text>`

    if (step === '600') {
      s += `<text x="${x + BW / 2}" y="${TOP + PLOT_H + 40}" text-anchor="middle" font-family="${FONT}" font-size="10" font-weight="600" fill="#15803d">pinned</text>`
      s += `<text x="${x + BW / 2}" y="${TOP + PLOT_H + 53}" text-anchor="middle" font-family="${FONT}" font-size="10" fill="${MUTED}">55 text uses</text>`
    }
    if (step === '500') {
      s += `<text x="${x + BW / 2}" y="${TOP + PLOT_H + 40}" text-anchor="middle" font-family="${FONT}" font-size="10" font-weight="600" fill="${MUTED}">logo</text>`
      s += `<text x="${x + BW / 2}" y="${TOP + PLOT_H + 53}" text-anchor="middle" font-family="${FONT}" font-size="10" fill="${MUTED}">never text</text>`
    }
  })

  return svg(W, H, s, 'Contrast of each primary step against white',
    'A bar per step of the primary ramp showing its contrast ratio on white, with the 4.5 to 1 AA floor drawn as a dashed line. Step 600 sits just above the floor and step 500, the logo colour, sits well below it.')
}

// ─── figure 4: site accents, default against each host override ────────────

function figureSiteAccent() {
  const steps = Object.keys(pal.site).sort((a, b) => +a - +b)
  const rows = [{ key: null, label: ':root default — the CORE green', note: 'what an unscoped text-site-* resolves to' },
    ...Object.entries(SITES).map(([k, v]) => ({ key: k, label: `.theme-${k} — ${v.label}`, note: `applied on ${v.where}` }))]

  const PAD = 22, X0 = 250, SW = 118, GAP = 12, SH = 54
  const W = X0 + steps.length * (SW + GAP) + PAD
  const ROW = 104
  const H = 78 + rows.length * ROW + 66

  let s = `<text x="${PAD}" y="30" font-family="${FONT}" font-size="15" fill="${INK}">Site accent — one token set, rebound per host institution</text>`
  s += `<text x="${PAD}" y="48" font-family="${FONT}" font-size="12" fill="${MUTED}">a host that wants no colour of its own simply does not override; the defaults are already on brand</text>`

  steps.forEach((step, j) => {
    s += `<text x="${X0 + j * (SW + GAP) + SW / 2}" y="74" text-anchor="middle" font-family="${FONT}" font-size="11" fill="${MUTED}">site-${step}</text>`
  })

  rows.forEach((row, i) => {
    const y = 88 + i * ROW
    const source = row.key ? themes[row.key].site : pal.site
    s += `<text x="${PAD}" y="${y + 24}" font-family="${FONT}" font-size="12" fill="${INK}">${esc(row.label)}</text>`
    s += `<text x="${PAD}" y="${y + 42}" font-family="${FONT}" font-size="11" fill="${MUTED}">${esc(row.note)}</text>`

    steps.forEach((step, j) => {
      const c = source[step]
      const x = X0 + j * (SW + GAP)
      const isAnchor = row.key && step === SITES[row.key].anchor
      s += `<rect x="${x}" y="${y}" width="${SW}" height="${SH}" rx="7" fill="${hex(c)}"/>`
      s += `<rect x="${x}" y="${y}" width="${SW}" height="${SH}" rx="7" fill="none" stroke="${isAnchor ? INK : HAIR}" stroke-width="${isAnchor ? 2 : 0.5}"/>`
      if (isAnchor) {
        s += `<text x="${x + SW / 2}" y="${y + 32}" text-anchor="middle" font-family="${FONT}" font-size="10" font-weight="700" fill="#ffffff">THE SEAL</text>`
      }
      s += `<text x="${x + SW / 2}" y="${y + SH + 16}" text-anchor="middle" font-family="${MONO}" font-size="9" fill="${MUTED}">${hex(c).toUpperCase()}</text>`
    })
  })

  const y = 88 + rows.length * ROW + 18
  s += `<line x1="${PAD}" y1="${y - 14}" x2="${W - PAD}" y2="${y - 14}" stroke="${HAIR}" stroke-width="0.5"/>`
  s += `<text x="${PAD}" y="${y + 8}" font-family="${FONT}" font-size="12" fill="${INK}">Green owns action — buttons, links, active states, focus rings — on every lab page.</text>`
  s += `<text x="${PAD}" y="${y + 26}" font-family="${FONT}" font-size="12" fill="${INK}">The site accent owns place — kickers, rules, institutional marks, tints. Never anything clickable.</text>`

  return svg(W, H, s, 'Site accent tokens and their per-host overrides',
    'The four site accent steps shown twice: the root defaults in CORE green, and the theme-ubb override in Babes-Bolyai blue with step 900 outlined as the seal colour.')
}

// ─── write ─────────────────────────────────────────────────────────────────

fs.mkdirSync(OUT, { recursive: true })
const figures = {
  'ramps.svg': figureRamps(),
  'hue-vs-chroma.svg': figureHueVsChroma(),
  'contrast.svg': figureContrast(),
  'site-accent.svg': figureSiteAccent(),
}
for (const [name, body] of Object.entries(figures)) {
  fs.writeFileSync(path.join(OUT, name), body)
  console.log(`wrote wiki/visual-identity/${name}  (${(body.length / 1024).toFixed(1)} KB)`)
}
