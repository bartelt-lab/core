/**
 * One-off, re-runnable image optimizer.
 *
 * Converts large PNG/JPEG assets under public/ to WebP (resized + quality 80),
 * deletes the originals, and rewrites every reference to them across src/ and
 * public/data/*.json so the app keeps working. Idempotent: already-converted
 * files are skipped, and reference rewrites are no-ops on a second run.
 *
 * Run:  npm run optimize-images
 *
 * NOTE: public/tuc/iclr-2025/ is a self-contained static HTML artifact and is
 * intentionally excluded.
 */
import { readdirSync, statSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { join, relative, extname, sep, posix } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const PUBLIC_DIR = join(ROOT, 'public')

const MIN_BYTES = 0 // convert every raster asset; the size guard below keeps the smaller file
const QUALITY = 80
const EXCLUDE = [
  join('tuc', 'iclr-2025'), // self-contained static page
  join('logos', 'core', 'legacy'), // historical brand archive, not displayed
  'icons', // favicon source assets, not page images
]
const SOURCE_EXT = new Set(['.png', '.jpg', '.jpeg'])

// Max width by location — photos/logos display small, hero stills large.
const widthFor = (relPath) => {
  if (relPath.startsWith('members/')) return 600
  if (relPath.startsWith('logos/')) return 500
  return 1600
}

// Files whose string references we rewrite (oldPath -> .webp).
const REF_GLOBS_DIRS = [join(ROOT, 'src'), join(PUBLIC_DIR, 'data'), join(ROOT, 'index.html')]

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) walk(full, acc)
    else acc.push(full)
  }
  return acc
}

function collectTextFiles() {
  const files = []
  for (const target of REF_GLOBS_DIRS) {
    try {
      if (statSync(target).isDirectory()) {
        for (const f of walk(target)) {
          if (/\.(jsx?|tsx?|json|html|css)$/.test(f)) files.push(f)
        }
      } else {
        files.push(target)
      }
    } catch {
      /* missing path — skip */
    }
  }
  return files
}

const fmt = (n) => `${(n / 1024).toFixed(0)} KB`

async function main() {
  const all = walk(PUBLIC_DIR)
  const conversions = [] // { oldRel, newRel, oldSize, newSize }

  for (const file of all) {
    const rel = relative(PUBLIC_DIR, file).split(sep).join(posix.sep)
    if (EXCLUDE.some((ex) => rel.startsWith(ex.split(sep).join(posix.sep)))) continue
    const ext = extname(file).toLowerCase()
    if (!SOURCE_EXT.has(ext)) continue

    const size = statSync(file).size
    if (size < MIN_BYTES) continue

    const newRel = rel.slice(0, -ext.length) + '.webp'
    const outFile = join(PUBLIC_DIR, newRel.split(posix.sep).join(sep))

    await sharp(file)
      .resize({ width: widthFor(rel), withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outFile)

    const newSize = statSync(outFile).size

    // Keep whichever is smaller — WebP can lose to an already-tiny PNG/JPEG.
    if (newSize >= size) {
      rmSync(outFile)
      continue
    }

    rmSync(file)
    conversions.push({ oldRel: rel, newRel, oldSize: size, newSize })
  }

  if (conversions.length === 0) {
    console.log('No images over threshold — nothing to convert.')
    return
  }

  // Rewrite references (substring replace of the public-relative path).
  const textFiles = collectTextFiles()
  let rewrites = 0
  for (const tf of textFiles) {
    let content = readFileSync(tf, 'utf8')
    let changed = false
    for (const { oldRel, newRel } of conversions) {
      if (content.includes(oldRel)) {
        content = content.split(oldRel).join(newRel)
        changed = true
        rewrites += 1
      }
    }
    if (changed) writeFileSync(tf, content)
  }

  let savedTotal = 0
  console.log('\nConverted:')
  for (const c of conversions.sort((a, b) => b.oldSize - a.oldSize)) {
    savedTotal += c.oldSize - c.newSize
    console.log(`  ${c.oldRel}  ${fmt(c.oldSize)} -> ${fmt(c.newSize)}`)
  }
  console.log(`\n${conversions.length} images, ${rewrites} reference rewrites.`)
  console.log(`Saved ${(savedTotal / 1024 / 1024).toFixed(1)} MB.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
