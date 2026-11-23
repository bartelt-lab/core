/**
 * First-page thumbnails for publications that have no figure of their own.
 *
 * The publications page shows a paper's `image` (a figure) when it has one,
 * else its `page` (the first page of the PDF), else a plain year tile. This
 * script makes the `page` images.
 *
 * Run:  node scripts/paper-pages.mjs <folder with PDFs>
 *
 * The folder holds one PDF per paper, named after the paper's `id` in
 * src/data/publications.json: either <id>.pdf or <id>/paper.pdf. For each PDF
 * whose id is known, it writes public/papers/pages/<id>.webp and sets
 * `"page": "/papers/pages/<id>.webp"` on the entry. PDFs are not copied into
 * the repo. Re-runnable: existing pages are overwritten, other entries are
 * left alone.
 *
 * Needs `pdftoppm` (Poppler) on the PATH. On Windows it ships with MiKTeX.
 *
 * Prefer the authors' own version of a paper over the publisher's PDF: the
 * first page of a publisher PDF is the publisher's layout.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const DATA = path.join(ROOT, 'src', 'data', 'publications.json')
const OUT = path.join(ROOT, 'public', 'papers', 'pages')
const WIDTH = 520 // px; shown at up to about 180px wide, so this covers 2x screens

const source = process.argv[2]
if (!source || !existsSync(source)) {
  console.error('Usage: node scripts/paper-pages.mjs <folder with PDFs>')
  process.exit(1)
}

/** id -> absolute PDF path, for <id>.pdf and <id>/paper.pdf. */
const pdfs = new Map()
for (const name of readdirSync(source)) {
  const full = path.join(source, name)
  if (statSync(full).isDirectory()) {
    const inner = path.join(full, 'paper.pdf')
    if (existsSync(inner)) pdfs.set(name, inner)
  } else if (name.toLowerCase().endsWith('.pdf')) {
    pdfs.set(name.slice(0, -4), full)
  }
}

const raw = readFileSync(DATA, 'utf8')
const data = JSON.parse(raw)
const byId = new Map(data.publications.map((p) => [p.id, p]))
mkdirSync(OUT, { recursive: true })
const tmp = mkdtempSync(path.join(os.tmpdir(), 'paper-pages-'))
let made = 0

try {
  for (const [id, pdf] of pdfs) {
    const entry = byId.get(id)
    if (!entry) { console.warn(`skip  ${id}: no publication with this id`); continue }
    const prefix = path.join(tmp, 'page')
    try {
      execFileSync('pdftoppm', ['-f', '1', '-l', '1', '-r', '110', '-png', '-singlefile', pdf, prefix], { stdio: 'pipe' })
      const png = readFileSync(`${prefix}.png`)
      const webp = await sharp(png).resize({ width: WIDTH }).webp({ quality: 82 }).toBuffer()
      writeFileSync(path.join(OUT, `${id}.webp`), webp)
      entry.page = `/papers/pages/${id}.webp`
      made++
      console.log(`page  ${id}  ${Math.round(webp.length / 1024)} KB`)
    } catch (error) {
      console.warn(`fail  ${id}: ${String(error.message).split('\n')[0]}`)
    }
  }
} finally {
  rmSync(tmp, { recursive: true, force: true })
}

// Keep the file's own line endings and trailing newline, so the diff is only
// the added `page` lines.
const eol = raw.includes('\r\n') ? '\r\n' : '\n'
writeFileSync(DATA, JSON.stringify(data, null, 2).replace(/\n/g, eol) + (raw.endsWith('\n') ? eol : ''))
console.log(`\n${made} page image(s) written to public/papers/pages/`)
