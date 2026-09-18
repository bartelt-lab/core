// Builds brand/CORE-Brand-Guidelines.pdf — the document we hand to people outside
// the team: partners, designers, print shops, event organisers.
//
// It is deliberately NOT wiki/decks-and-print.md. That file is for whoever works in
// this repo and talks about tokens, scripts and open questions. This one assumes the
// reader has never seen the code and never will, so nothing in it references a file
// path, a CSS variable or a build step.
//
// Run: node scripts/brand-guide.mjs

import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright'

const ROOT = path.resolve(import.meta.dirname, '..')
const LOGOS = path.join(ROOT, 'public/logos/core')
const OUT_DIR = path.join(ROOT, 'brand')
const OUT = path.join(OUT_DIR, 'CORE-Brand-Guidelines.pdf')

// Colours come out of index.css so the guide cannot quote a shade the site stopped
// using. Names are the human ones — the reader never sees a token.
const css = fs.readFileSync(path.join(ROOT, 'src/index.css'), 'utf8')
const tok = (name) => {
  const m = css.match(new RegExp(`--${name}:\\s*(\\d+) (\\d+) (\\d+)`))
  if (!m) throw new Error(`brand-guide: --${name} missing from index.css`)
  return '#' + [m[1], m[2], m[3]].map((v) => (+v).toString(16).padStart(2, '0')).join('').toUpperCase()
}

const GREEN = tok('primary-500')
const DEEP = tok('primary-700')
const DARKER = tok('primary-800')
const LIME = tok('secondary-300')
const BROWN = tok('tertiary-600')
const PALE = tok('primary-50')

// The UBB seal lives under .theme-ubb, not :root.
const ubbBlock = css.slice(css.indexOf('.theme-ubb'), css.indexOf('}', css.indexOf('.theme-ubb')))
const ubbM = ubbBlock.match(/--site-900:\s*(\d+) (\d+) (\d+)/)
const UBB = '#' + [ubbM[1], ubbM[2], ubbM[3]].map((v) => (+v).toString(16).padStart(2, '0')).join('').toUpperCase()

const img = (rel) =>
  'data:image/svg+xml;base64,' + fs.readFileSync(path.join(LOGOS, rel)).toString('base64')

const LOCKUPS = {
  core: img('light-background/core.svg'),
  tuc: img('light-background/core_tuc.svg'),
  ubb: img('light-background/core_ubb.svg'),
  ura: img('light-background/core_ura.svg'),
  onWhite: img('white-background/core_ubb.svg'),
  onLight: img('light-background/core_ubb.svg'),
  onDark: img('dark-background/core_ubb.svg'),
  onBlack: img('black-background/core_ubb.svg'),
  icon: 'data:image/svg+xml;base64,' + fs.readFileSync(path.join(LOGOS, 'avocando-icon.svg')).toString('base64'),
}

const today = new Date().toISOString().slice(0, 10)

const swatch = (name, hex, use, opts = {}) => `
  <div class="sw">
    <div class="chip" style="background:${hex};${opts.border ? 'box-shadow:inset 0 0 0 1px #E2E8F0;' : ''}"></div>
    <div class="swb">
      <div class="swn">${name}</div>
      <div class="swh">${hex}</div>
      <div class="swu">${use}</div>
    </div>
  </div>`

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">
<style>
  @page { size: A4 portrait; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Inter, system-ui, sans-serif; color: #0F172A; -webkit-print-color-adjust: exact; print-color-adjust: exact; }

  .page { width: 210mm; height: 297mm; padding: 20mm 18mm 16mm; position: relative; page-break-after: always; overflow: hidden; }
  .page:last-child { page-break-after: auto; }

  h1 { font-family: Poppins, sans-serif; font-weight: 700; font-size: 34pt; line-height: 1.05; letter-spacing: -0.02em; }
  h2 { font-family: Poppins, sans-serif; font-weight: 600; font-size: 19pt; letter-spacing: -0.01em; margin-bottom: 2mm; }
  h3 { font-family: Poppins, sans-serif; font-weight: 600; font-size: 11pt; margin-bottom: 1.5mm; }
  p  { font-size: 9.5pt; line-height: 1.6; color: #334155; max-width: 150mm; }
  p + p { margin-top: 2.5mm; }
  .lede { font-size: 11pt; color: #1E293B; }
  small { font-size: 8pt; color: #64748B; line-height: 1.5; display: block; }

  .kicker { font-size: 7.5pt; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: ${DEEP}; margin-bottom: 3mm; }
  .rule { height: 2px; background: ${GREEN}; width: 22mm; margin: 4mm 0 6mm; }
  .foot { position: absolute; left: 18mm; right: 18mm; bottom: 10mm; display: flex; justify-content: space-between;
          font-size: 7.5pt; color: #94A3B8; border-top: 1px solid #E2E8F0; padding-top: 2.5mm; }

  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; }
  .grid3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 5mm; }
  .card { border: 1px solid #E2E8F0; border-radius: 4mm; padding: 5mm; }
  .card img { width: 100%; height: auto; }

  .sw { display: flex; gap: 4mm; align-items: center; margin-bottom: 4mm; }
  .chip { width: 24mm; height: 16mm; border-radius: 2.5mm; flex: none; }
  .swn { font-weight: 600; font-size: 10pt; }
  .swh { font-family: ui-monospace, Menlo, monospace; font-size: 8.5pt; color: #64748B; margin-top: 0.5mm; }
  .swu { font-size: 8.5pt; color: #475569; margin-top: 1mm; }

  .note { background: ${PALE}; border-left: 3px solid ${GREEN}; padding: 4mm 5mm; border-radius: 0 2mm 2mm 0; margin-top: 5mm; }
  .note p { font-size: 9pt; max-width: none; }
  .warn { background: #FEF2F2; border-left-color: #DC2626; }

  table { width: 100%; border-collapse: collapse; font-size: 9pt; }
  th { text-align: left; font-weight: 600; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.08em;
       color: #64748B; padding: 0 0 2mm; border-bottom: 1px solid #E2E8F0; }
  td { padding: 2.5mm 0; border-bottom: 1px solid #F1F5F9; vertical-align: top; color: #334155; }
  td:first-child { font-weight: 600; color: #0F172A; width: 42mm; }

  ul { margin: 2mm 0 0 4.5mm; }
  li { font-size: 9.5pt; line-height: 1.55; color: #334155; margin-bottom: 1.5mm; }

  .yn { display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; margin-top: 4mm; }
  .yn h3 { display: flex; align-items: center; gap: 2mm; }
  .dot { width: 3mm; height: 3mm; border-radius: 50%; display: inline-block; }
  .box { border-radius: 3mm; padding: 4mm; height: 30mm; display: flex; align-items: center; justify-content: center; margin-bottom: 2mm; }
</style></head><body>

<!-- ─── cover ─────────────────────────────────────────────────────────── -->
<section class="page" style="display:flex;flex-direction:column;justify-content:space-between;padding-top:34mm">
  <img src="${LOCKUPS.core}" style="width:78mm">
  <div>
    <h1>Brand<br>Guidelines</h1>
    <div class="rule" style="width:34mm;height:3px"></div>
    <p class="lede" style="max-width:120mm">How the CORE identity is put together — the mark, the colours, the
    type — and what to do with them on a slide, a banner or a printed page.</p>
  </div>
  <div>
    <div style="display:flex;gap:2mm;margin-bottom:6mm">
      <div style="width:26mm;height:5mm;background:${GREEN};border-radius:1mm"></div>
      <div style="width:14mm;height:5mm;background:${LIME};border-radius:1mm"></div>
      <div style="width:9mm;height:5mm;background:${BROWN};border-radius:1mm"></div>
    </div>
    <small>CORE — Cognitive Software · Goslar · Cluj-Napoca · Rostock<br>Version ${today}</small>
  </div>
</section>

<!-- ─── the mark ──────────────────────────────────────────────────────── -->
<section class="page">
  <div class="kicker">01 — The mark</div>
  <h2>Four versions. Pick by who is speaking.</h2>
  <div class="rule"></div>
  <p>The avocado is the constant. What changes is the line underneath it, which names the
  site the material comes from. Use the plain version when the material represents the
  network as a whole.</p>

  <div class="grid2" style="margin-top:7mm">
    <div class="card"><img src="${LOCKUPS.core}" style="width:70%"><h3 style="margin-top:4mm">CORE Network</h3><small>The whole network. Use when no single site is speaking.</small></div>
    <div class="card"><img src="${LOCKUPS.tuc}" style="width:78%"><h3 style="margin-top:4mm">TU Clausthal</h3><small>Material from Clausthal University of Technology, Goslar.</small></div>
    <div class="card"><img src="${LOCKUPS.ubb}" style="width:78%"><h3 style="margin-top:4mm">UBB Cluj</h3><small>Material from Babeș-Bolyai University, Cluj-Napoca.</small></div>
    <div class="card"><img src="${LOCKUPS.ura}" style="width:78%"><h3 style="margin-top:4mm">Uni Rostock</h3><small>Material from the University of Rostock.</small></div>
  </div>

  <div class="note">
    <p><strong>Never rebuild the mark.</strong> Do not retype the word CORE, redraw the avocado,
    change its colours, stretch it, add a shadow or place it in a coloured box. Every version
    you need already exists as a file — ask for it rather than recreating it.</p>
  </div>
  <div class="foot"><span>CORE Brand Guidelines</span><span>The mark · 2</span></div>
</section>

<!-- ─── backgrounds ───────────────────────────────────────────────────── -->
<section class="page">
  <div class="kicker">02 — Backgrounds</div>
  <h2>Four files, so the mark never needs recolouring</h2>
  <div class="rule"></div>
  <p>Each lockup comes in four variants, one per background type. The avocado is identical in
  all of them — only the lettering changes, so it stays readable. If the mark looks wrong on
  your background, you have the wrong file, not a colour problem.</p>

  <div class="grid2" style="margin-top:7mm;gap:5mm">
    <div><div class="box" style="background:#FFFFFF;box-shadow:inset 0 0 0 1px #E2E8F0"><img src="${LOCKUPS.onWhite}" style="width:64%"></div><h3>On white</h3><small>Pure white pages and slides.</small></div>
    <div><div class="box" style="background:#F1F5F9"><img src="${LOCKUPS.onLight}" style="width:64%"></div><h3>On light</h3><small>Light tints, pale photographs.</small></div>
    <div><div class="box" style="background:#1E293B"><img src="${LOCKUPS.onDark}" style="width:64%"></div><h3>On dark</h3><small>Dark slides, deep photography.</small></div>
    <div><div class="box" style="background:#000000"><img src="${LOCKUPS.onBlack}" style="width:64%"></div><h3>On black</h3><small>True black only.</small></div>
  </div>

  <div style="display:flex;gap:6mm;align-items:center;margin-top:7mm;border:1px solid #E2E8F0;border-radius:4mm;padding:5mm">
    <img src="${LOCKUPS.icon}" style="height:24mm">
    <div>
      <h3>The avocado alone</h3>
      <small>Only where the word CORE already appears nearby — a social avatar, a favicon, a
      repeated corner mark. It is not a substitute for the full mark on a first impression.</small>
    </div>
  </div>
  <div class="foot"><span>CORE Brand Guidelines</span><span>Backgrounds · 3</span></div>
</section>

<!-- ─── clear space ───────────────────────────────────────────────────── -->
<section class="page">
  <div class="kicker">03 — Space and size</div>
  <h2>Give it one avocado of room</h2>
  <div class="rule"></div>
  <p>Keep clear space around the mark equal to <strong>half its height</strong> on every side —
  which is roughly the height of the avocado itself. Nothing enters that area: no photo edge,
  no partner logo, no caption, no page border.</p>

  <div style="margin-top:6mm;border:1px dashed #CBD5E1;border-radius:3mm;padding:14mm;background:#F8FAFC;text-align:center">
    <img src="${LOCKUPS.ubb}" style="width:96mm;background:#fff;outline:1px solid #0F172A">
  </div>
  <small style="text-align:center;margin-top:2mm">The dashed edge shows the minimum clear space.</small>

  <h3 style="margin-top:9mm">Smallest usable size</h3>
  <p>Below these sizes the site name under the mark closes up and stops being readable.</p>
  <table style="margin-top:4mm">
    <tr><td>Printed</td><td>12 mm tall (about 44 mm wide)</td></tr>
    <tr><td>Screen or slide</td><td>64 pixels tall (about 233 pixels wide)</td></tr>
    <tr><td>Avocado alone</td><td>8 mm, or 32 pixels</td></tr>
  </table>
  <p style="margin-top:4mm">If you need it smaller than that, use the version without a site
  name underneath, or the avocado on its own.</p>

  <div class="note">
    <p><strong>Always scale proportionally.</strong> Hold Shift while dragging a corner. A mark
    stretched even slightly reads as a mistake to anyone who knows the brand.</p>
  </div>
  <div class="foot"><span>CORE Brand Guidelines</span><span>Space and size · 4</span></div>
</section>

<!-- ─── colour ────────────────────────────────────────────────────────── -->
<section class="page">
  <div class="kicker">04 — Colour</div>
  <h2>One green does the talking</h2>
  <div class="rule"></div>
  <p>CORE Green is the brand. The other colours support it — they are not alternatives to it.</p>

  <div style="margin-top:6mm">
    ${swatch('CORE Green', GREEN, 'The brand colour. Marks, fills, rules, highlights.')}
    ${swatch('Deep Green', DEEP, 'Green type, links and buttons. Use this whenever green carries words.')}
    ${swatch('Lime', LIME, 'Inside the avocado, and as a small highlight on dark backgrounds.')}
    ${swatch('Stone Brown', BROWN, 'The avocado stone. Rare elsewhere.')}
    ${swatch('Slate', '#0F172A', 'Body text, headlines, dark backgrounds.')}
    ${swatch('Cool Grey', '#64748B', 'Captions, secondary text, fine rules.')}
  </div>

  <div class="note warn">
    <p><strong>Never set text in CORE Green.</strong> It is a bright colour and words in it are
    hard to read on white, especially projected. Use Deep Green whenever green has to carry
    words. CORE Green is for shapes, not sentences.</p>
  </div>

  <div class="note">
    <p><strong>Printers: please match to the values above, do not convert blindly.</strong>
    These are screen colours, and CORE Green sits near the edge of what four-colour process can
    reproduce — a straight conversion comes back noticeably duller. If you are running spot
    colour, propose a match against ${GREEN} and let us confirm it. Large flat areas of the
    green are the risky case; rules and small marks convert comfortably.</p>
  </div>
  <div class="foot"><span>CORE Brand Guidelines</span><span>Colour · 5</span></div>
</section>

<!-- ─── host colour ───────────────────────────────────────────────────── -->
<section class="page">
  <div class="kicker">05 — Host universities</div>
  <h2>Green is CORE. A second colour can be the host.</h2>
  <div class="rule"></div>
  <p>Each lab sits inside a university, and material from a specific site may carry that
  university's own colour alongside the green. This is optional — a site that prefers to stay
  green simply does, and material for the network as a whole always does.</p>

  <p>The rule is about <em>what each colour means</em>, not how much of it there is:</p>
  <table style="margin-top:5mm">
    <tr><td style="color:${DEEP}">CORE Green</td><td>The mark, the structure, anything a reader should act on. Present on everything, everywhere.</td></tr>
    <tr><td style="color:${UBB}">Host colour</td><td>Says where you are. Section labels, rules, institutional marks. Never on a button or a link.</td></tr>
  </table>

  <div style="margin-top:8mm">
    <h3>Currently defined</h3>
    ${swatch('Babeș-Bolyai Blue', UBB, 'CORE Labs Cluj only. Taken from the university seal.')}
    <small>Goslar and Rostock have not defined one. Their material runs green.</small>
  </div>

  <div style="margin-top:8mm;border:1px solid #E2E8F0;border-radius:4mm;padding:6mm">
    <h3>Where the two meet</h3>
    <p style="margin-top:1mm">On the CORE Labs Cluj wordmark the place name runs from the
    university's blue into CORE's green — the two institutions in one word. This is the only
    place a brand colour is ever used as a gradient.</p>
    <!-- Drawn as SVG, not background-clip:text. The CSS version renders with a white
         plate over the glyphs in Chromium's PDF output; SVG gradient fills do not. -->
    <svg viewBox="0 0 300 96" style="width:86mm;margin-top:4mm;display:block" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="pg" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="${UBB}"/><stop offset="1" stop-color="${DEEP}"/>
      </linearGradient></defs>
      <text x="0" y="40" font-family="Poppins, sans-serif" font-weight="700" font-size="42" letter-spacing="-1.2" fill="#0F172A">CORE Labs</text>
      <text x="0" y="86" font-family="Poppins, sans-serif" font-weight="700" font-size="42" letter-spacing="-1.2" fill="url(#pg)">Cluj</text>
    </svg>
    <small style="margin-top:3mm">Everywhere else, brand colour is flat. No gradient fills, no
    gradient backgrounds, no gradient headings.</small>
  </div>
  <div class="foot"><span>CORE Brand Guidelines</span><span>Host universities · 6</span></div>
</section>

<!-- ─── type ──────────────────────────────────────────────────────────── -->
<section class="page">
  <div class="kicker">06 — Typography</div>
  <h2>Two typefaces, both free</h2>
  <div class="rule"></div>
  <p>Poppins for headings, Inter for everything else. Both are open-licensed and free to
  download and embed, so there is no reason to substitute them.</p>

  <div style="margin-top:7mm;border:1px solid #E2E8F0;border-radius:4mm;padding:6mm">
    <div style="font-family:Poppins,sans-serif;font-weight:700;font-size:30pt;letter-spacing:-0.02em">Poppins</div>
    <div style="font-family:Poppins,sans-serif;font-weight:600;font-size:13pt;margin-top:2mm">Headings and titles · Semibold 600 to Extrabold 800</div>
    <small style="margin-top:2mm">Geometric and confident. Short lines only — it is not a
    typeface for paragraphs.</small>
  </div>

  <div style="margin-top:5mm;border:1px solid #E2E8F0;border-radius:4mm;padding:6mm">
    <div style="font-family:Inter,sans-serif;font-weight:600;font-size:30pt;letter-spacing:-0.02em">Inter</div>
    <div style="font-family:Inter,sans-serif;font-size:13pt;margin-top:2mm">Body, captions, labels · Light 300 to Bold 700</div>
    <small style="margin-top:2mm">Built for screens and small sizes. This paragraph is Inter.</small>
  </div>

  <div class="note warn" style="margin-top:7mm">
    <p><strong>The most common way a CORE document goes wrong.</strong> You send a PowerPoint
    file, the other computer does not have Poppins, it silently swaps in Calibri, and every
    heading reflows. You will never see it — they will. Embed the fonts in the file, or send a
    PDF. For anything you are not presenting yourself, send a PDF.</p>
  </div>

  <p style="margin-top:6mm"><strong>For print:</strong> convert type to outlines before sending
  artwork, or supply the font files with it.</p>
  <div class="foot"><span>CORE Brand Guidelines</span><span>Typography · 7</span></div>
</section>

<!-- ─── slides ────────────────────────────────────────────────────────── -->
<section class="page">
  <div class="kicker">07 — Slides</div>
  <h2>Built for the back row</h2>
  <div class="rule"></div>
  <p>Use 16:9 widescreen, PowerPoint's default. The person furthest from the screen is about
  eight metres away, and that — not your laptop — decides every size below.</p>

  <table style="margin-top:6mm">
    <tr><td>Margin</td><td>Keep a clear margin of about 6% on all four sides. Projectors crop the edges and video calls crop them further.</td></tr>
    <tr><td>Title</td><td>Poppins Semibold, 32–40 pt. One line. A title that wraps to three lines is a paragraph.</td></tr>
    <tr><td>Body</td><td>Inter Regular, 24 pt as a floor, never below 18 pt.</td></tr>
    <tr><td>Logo</td><td>Bottom right, inside the margin, at least 64 pixels tall. Once per slide — and not on the title slide if the mark is already the title slide.</td></tr>
    <tr><td>Density</td><td>One idea per slide.</td></tr>
  </table>

  <h3 style="margin-top:8mm">Colour in a lit room</h3>
  <p>A projector washes out contrast — ambient light lifts the blacks and everything drifts
  toward grey. Colours that look fine on a laptop can disappear on the wall.</p>
  <ul>
    <li>Body text is Slate on white, or white on Slate. Avoid pure black on pure white — it glares.</li>
    <li>Never set text in CORE Green. This matters more projected than it does on screen.</li>
    <li>When choosing between two shades, take the darker one.</li>
  </ul>
  <div class="foot"><span>CORE Brand Guidelines</span><span>Slides · 8</span></div>
</section>

<!-- ─── banners ───────────────────────────────────────────────────────── -->
<section class="page">
  <div class="kicker">08 — Banners and posters</div>
  <h2>Only the middle metre gets read</h2>
  <div class="rule"></div>
  <p>A standard roll-up is 850 × 2000 mm. Two parts of it are not usable and one part does
  almost all the work — design around that before anything else.</p>

  <div style="display:flex;gap:8mm;margin-top:6mm">
    <div style="width:46mm;flex:none">
      <div style="height:9mm;background:#FEE2E2;border:1px solid #DC2626;border-bottom:0;font-size:7pt;padding:1.5mm 2mm;color:#991B1B">curls back</div>
      <div style="height:20mm;background:#F1F5F9;border:1px solid #E2E8F0;border-bottom:0;font-size:7.5pt;padding:2mm;font-weight:600">logo</div>
      <div style="height:38mm;background:#fff;border:1px solid #E2E8F0;border-bottom:0;font-size:7.5pt;padding:2mm;font-weight:600">headline</div>
      <div style="height:36mm;background:${PALE};border:1px solid ${GREEN};border-bottom:0;font-size:7.5pt;padding:2mm;font-weight:600;color:${DARKER}">eye level<br><span style="font-weight:400">read at a glance</span></div>
      <div style="height:16mm;background:#fff;border:1px solid #E2E8F0;border-bottom:0;font-size:7.5pt;padding:2mm;font-weight:600">detail, QR</div>
      <div style="height:13mm;background:#FEE2E2;border:1px solid #DC2626;font-size:7pt;padding:1.5mm 2mm;color:#991B1B">hidden by the stand</div>
    </div>
    <div style="flex:1">
      <h3>The three rules</h3>
      <ul>
        <li><strong>The bottom 200 mm does not exist.</strong> The cassette the banner rolls into covers it. A logo or web address placed there will not be visible.</li>
        <li><strong>The top curls backwards</strong> as the banner leans on its stand. Nothing important in the first 100 mm.</li>
        <li><strong>Between 1.0 m and 1.55 m is standing eye level.</strong> It is the only band read without effort. Put the one sentence that matters there — not at the top.</li>
      </ul>
      <h3 style="margin-top:6mm">Sizes</h3>
      <table>
        <tr><td>Headline</td><td>40 mm capital height or more</td></tr>
        <tr><td>Body</td><td>15 mm capitals — roughly 42 pt. Never below 24 pt.</td></tr>
        <tr><td>Side margins</td><td>60 mm; the print wraps at the edges</td></tr>
        <tr><td>Resolution</td><td>300 dpi at full size, or vector artwork</td></tr>
      </table>
    </div>
  </div>

  <div class="note">
    <p>A rough guide for any printed piece: <strong>capital letters need to be at least the
    viewing distance divided by 200</strong>. Read from two metres, that is 10 mm. From five
    metres, 25 mm. Confirm the exact panel size and bleed with your print supplier before you
    start — hardware varies.</p>
  </div>
  <div class="foot"><span>CORE Brand Guidelines</span><span>Banners and posters · 9</span></div>
</section>

<!-- ─── do / don't ────────────────────────────────────────────────────── -->
<section class="page">
  <div class="kicker">09 — At a glance</div>
  <h2>The short version</h2>
  <div class="rule"></div>

  <div class="yn">
    <div>
      <h3><span class="dot" style="background:${GREEN}"></span> Do</h3>
      <ul>
        <li>Use the supplied logo files, unchanged</li>
        <li>Pick the background variant that matches what is behind it</li>
        <li>Leave half the mark's height clear on every side</li>
        <li>Use Deep Green whenever green carries words</li>
        <li>Embed fonts, or send a PDF</li>
        <li>Set type for the person furthest away</li>
        <li>Keep brand colour flat</li>
      </ul>
    </div>
    <div>
      <h3><span class="dot" style="background:#DC2626"></span> Don't</h3>
      <ul>
        <li>Redraw, retype or recolour the mark</li>
        <li>Stretch it, rotate it, or add effects to it</li>
        <li>Put text in bright CORE Green</li>
        <li>Crowd the mark with other logos</li>
        <li>Place anything important in the bottom of a roll-up</li>
        <li>Use a gradient as a brand fill</li>
        <li>Substitute a different typeface</li>
      </ul>
    </div>
  </div>

  <div style="margin-top:10mm;border-top:1px solid #E2E8F0;padding-top:6mm">
    <h3>Getting the files</h3>
    <p>Logos are available as vector files, which stay sharp at any size — always ask for
    vector for print rather than scaling up an image from a website. If you are unsure which
    version to use, or you want to do something these pages do not cover, ask before you
    produce it. It is far cheaper than a reprint.</p>
  </div>

  <div style="position:absolute;left:18mm;bottom:26mm">
    <img src="${LOCKUPS.core}" style="width:52mm;opacity:0.9">
  </div>
  <div class="foot"><span>CORE — Cognitive Software</span><span>At a glance · 10</span></div>
</section>

</body></html>`

const browser = await chromium.launch()
const page = await browser.newPage()
await page.setContent(html, { waitUntil: 'networkidle' })
// setContent resolves before webfonts paint; without this the PDF ships in Helvetica.
await page.evaluate(() => document.fonts.ready)

fs.mkdirSync(OUT_DIR, { recursive: true })
await page.pdf({ path: OUT, format: 'A4', printBackground: true, preferCSSPageSize: true })
const pages = await page.evaluate(() => document.querySelectorAll('.page').length)
await browser.close()

console.log(`wrote ${path.relative(ROOT, OUT)}  (${(fs.statSync(OUT).size / 1024).toFixed(0)} KB, ${pages} pages)`)
