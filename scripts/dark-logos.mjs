/**
 * Dark-mode versions of third-party logos (universities, DIGIT).
 *
 * These logos are dark artwork, some of it on an opaque white background, so on
 * a dark page they either vanish or sit in a white box. This writes a variant
 * of each into public/logos/dark/ under the same file name, for
 * components/common/ThemedImg.jsx to show in dark mode.
 *
 * Run:  node scripts/dark-logos.mjs      (re-runnable; overwrites its output)
 *
 * Each logo names how it is made:
 *   copy   an official light-on-dark file already in the repo is used as is
 *   crop   cut a region out of such a file (left, top, width, height in px)
 *   ink    for a logo on opaque white: the background becomes transparent and
 *          the neutral (grey/black) lettering becomes light. Coloured parts,
 *          and white enclosed by them (the crest in the TU Clausthal emblem),
 *          are left exactly as they are.
 *   text   for a logo on a transparent background: black lettering becomes
 *          light; everything coloured or white is left exactly as it is.
 *          `disc` ({ cx, cy, r } in px) lays a white disc under a dark seal.
 *
 * Only neutral pixels are ever recoloured. No brand colour is changed, and
 * nothing is redrawn: if a university publishes its own negative logo, prefer
 * it (`copy`) over a generated one.
 */
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const LOGOS = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'logos')
const OUT = path.join(LOGOS, 'dark')

const JOBS = [
  // The official white lockup, cut to the same box the light ubb-logo.webp was
  // trimmed to (2026-11: the file carried a wide empty margin that made the
  // logo look small beside the others). Keep the two boxes equal.
  { file: 'ubb-logo.webp', how: 'crop', from: 'ubb-white.webp', box: { left: 23, top: 40, width: 454, height: 173 } },
  // The seal alone, cut from the official white lockup (seal on the left).
  { file: 'ubb-logo-only.webp', how: 'crop', from: 'ubb-white.webp', box: { left: 14, top: 34, width: 184, height: 184 } },
  { file: 'clausthal-logo.webp', how: 'ink' },
  { file: 'tu-clausthal.webp', how: 'ink' },
  { file: 'digit.webp', how: 'ink' },
  // The Rostock seal is dark blue line art with nothing behind it. A white
  // disc is laid under it, so the seal shows as it does on paper.
  { file: 'rostock-logo.webp', how: 'text', disc: { cx: 422, cy: 86.5, r: 76 } },
  { file: 'universitaet-rostock.webp', how: 'text', disc: { cx: 422, cy: 86.5, r: 76 } },
]

// Lettering colour in dark mode: slate-100, the site's light text.
const LIGHT = [241, 245, 249]
// A pixel counts as neutral when its channels differ by less than this.
const NEUTRAL = 38

const isNeutral = (r, g, b) => Math.max(r, g, b) - Math.min(r, g, b) < NEUTRAL

/** Logo on opaque white: clear the background, lighten the neutral lettering. */
function ink(data, width, height) {
  const at = (x, y) => (y * width + x) * 4
  // Region = neutral pixels reachable from the border. That is the background
  // and the lettering on it, but not white enclosed by colour (an emblem's
  // crest), which stays untouched.
  const region = new Uint8Array(width * height)
  const stack = []
  const visit = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return
    const idx = y * width + x
    if (region[idx]) return
    const i = idx * 4
    if (!isNeutral(data[i], data[i + 1], data[i + 2])) return
    region[idx] = 1
    stack.push(x, y)
  }
  for (let x = 0; x < width; x++) { visit(x, 0); visit(x, height - 1) }
  for (let y = 0; y < height; y++) { visit(0, y); visit(width - 1, y) }
  while (stack.length) {
    const y = stack.pop()
    const x = stack.pop()
    visit(x + 1, y); visit(x - 1, y); visit(x, y + 1); visit(x, y - 1)
  }
  // Darkest lettering value: full ink. Lighter neutral pixels are that ink
  // blended with the white background, so their darkness is their coverage.
  let darkest = 255
  for (let idx = 0; idx < region.length; idx++) {
    if (region[idx]) darkest = Math.min(darkest, data[idx * 4])
  }
  const span = Math.max(1, 255 - darkest - 12)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!region[y * width + x]) continue
      const i = at(x, y)
      const value = (data[i] + data[i + 1] + data[i + 2]) / 3
      const coverage = Math.max(0, Math.min(1, (255 - value) / span))
      data[i] = LIGHT[0]; data[i + 1] = LIGHT[1]; data[i + 2] = LIGHT[2]
      data[i + 3] = Math.round(data[i + 3] * coverage)
    }
  }
}

/** Logo on transparent: black lettering becomes light; colour and white stay. */
function text(data) {
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) continue
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]]
    if (!isNeutral(r, g, b)) continue
    const value = (r + g + b) / 3
    if (value > 150) continue // white or light grey: part of an emblem, keep
    data[i] = LIGHT[0]; data[i + 1] = LIGHT[1]; data[i + 2] = LIGHT[2]
  }
}

await mkdir(OUT, { recursive: true })
for (const job of JOBS) {
  const source = path.join(LOGOS, job.from ?? job.file)
  const target = path.join(OUT, job.file)
  if (job.how === 'copy') {
    await sharp(source).webp({ quality: 90, alphaQuality: 100 }).toFile(target)
  } else if (job.how === 'crop') {
    await sharp(source).extract(job.box).webp({ quality: 90, alphaQuality: 100 }).toFile(target)
  } else {
    const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
    if (job.how === 'ink') ink(data, info.width, info.height)
    else text(data)
    const raw = { raw: { width: info.width, height: info.height, channels: 4 } }
    let image = sharp(data, raw)
    if (job.disc) {
      const { cx, cy, r } = job.disc
      const disc = Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${info.width}" height="${info.height}"><circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff"/></svg>`,
      )
      image = sharp(disc).composite([{ input: data, ...raw }])
    }
    await image.webp({ quality: 90, alphaQuality: 100 }).toFile(target)
  }
  console.log(`${job.how.padEnd(5)} ${job.file}`)
}
