/**
 * Prerender every route in src/routes.js to static HTML.
 *
 * Why a real browser rather than renderToString: the app leans on browser APIs
 * throughout — localStorage (theme + language), IntersectionObserver (scroll
 * reveals), framer-motion, and a runtime fetch of /data/publications.json.
 * Driving headless Chromium renders all of it without sprinkling `typeof
 * window` guards across the component tree.
 *
 * Output per route: `<path>.html` and `<path>/index.html` (see outputFiles),
 * plus dist/index.html for '/' and dist/404.html as the SPA fallback.
 *
 * Run via `npm run build`. Requires `npx playwright install chromium`.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { preview } from 'vite'
import { canonicalUrl, routes } from '../src/routes.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(ROOT, 'dist')
const PORT = 4183
const CONCURRENCY = 4

/**
 * Every file a route's HTML has to land in.
 *
 * Both shapes are written on purpose. Hosts differ on how they resolve an
 * extensionless URL: some serve `/foo` straight from `foo.html`, others 301 it
 * to `/foo/` and serve `foo/index.html`. Emitting both means `/foo` and `/foo/`
 * each return the right page whichever rule applies, and the canonical tag
 * (slashless, matching in-app links) tells crawlers which one to keep.
 */
const outputFiles = (routePath) => {
    if (routePath === '/') return [path.join(DIST, 'index.html')]

    const segments = routePath.split('/').filter(Boolean)
    const leaf = segments[segments.length - 1]
    const parents = segments.slice(0, -1)

    return [
        path.join(DIST, ...parents, `${leaf}.html`),
        path.join(DIST, ...segments, 'index.html'),
    ]
}

/**
 * Render one route and return its serialized HTML.
 *
 * The scroll pass matters: framer-motion `whileInView` sections start at
 * opacity 0, so without walking the page the captured markup would carry
 * `style="opacity:0"` on most of the content.
 */
async function renderRoute(context, routePath) {
    const page = await context.newPage()

    // Videos and webfonts are large and irrelevant to the captured DOM — the
    // <video>/<link> tags are serialized either way.
    await page.route('**/*', (route) => {
        const type = route.request().resourceType()
        if (type === 'media' || type === 'font') return route.abort()
        return route.continue()
    })

    try {
        const url = `http://localhost:${PORT}${routePath}`
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45_000 })

        // App mounted, and the lazy route chunk has replaced LoadingFallback.
        await page.waitForFunction(
            () => {
                const root = document.querySelector('#root')
                if (!root || root.children.length === 0) return false
                return !document.querySelector('.animate-spin.border-t-primary-600')
            },
            { timeout: 45_000 },
        )

        await page.waitForLoadState('networkidle', { timeout: 45_000 }).catch(() => {
            // A stray retry shouldn't fail the whole build; the DOM check above
            // already proved the route rendered.
            console.warn(`  ! ${routePath}: network never went idle, capturing anyway`)
        })

        await page.evaluate(async () => {
            const step = Math.floor(window.innerHeight * 0.75)
            for (let y = 0; y < document.body.scrollHeight; y += step) {
                window.scrollTo(0, y)
                await new Promise((r) => setTimeout(r, 110))
            }
            window.scrollTo(0, 0)
            await new Promise((r) => setTimeout(r, 250))
        })

        // Tag the metadata SeoHead produced. In the browser this HTML is not
        // hydrated — createRoot re-renders into #root and React appends a second
        // set of head tags — so SeoHead removes anything carrying this marker on
        // mount. Without it the first <title>/<link rel=canonical> in the document
        // stays frozen on whichever route was loaded first.
        await page.evaluate(() => {
            const selector = [
                'title',
                'meta[name="description"]',
                'meta[name="robots"]',
                'link[rel="canonical"]',
                'meta[property^="og:"]',
                'meta[name^="twitter:"]',
            ].join(',')
            for (const el of document.head.querySelectorAll(selector)) {
                el.setAttribute('data-prerendered', '')
            }
        })

        const html = await page.evaluate(() => document.documentElement.outerHTML)
        return `<!doctype html>\n${html}`
    } finally {
        await page.close()
    }
}

/**
 * Fail the build rather than publish a page that is empty, untitled, or —
 * the failure mode this whole refactor exists to prevent — the SPA shell.
 *
 * `expectedCanonical` catches the subtle one: if the host's SPA fallback served
 * index.html instead of the route's own file, the capture is the *home* page
 * with a home canonical, which is easy to miss by eye.
 */
function validate(html, expectedCanonical) {
    const problems = []
    const titles = html.match(/<title[^>]*>/g) ?? []

    if (titles.length !== 1) {
        problems.push(`expected exactly 1 <title>, found ${titles.length}`)
    }
    if (!/<meta name="description"/.test(html)) {
        problems.push('no meta description')
    }

    const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1]
    if (!canonical) {
        problems.push('no canonical link')
    } else if (canonical !== expectedCanonical) {
        problems.push(`canonical is ${canonical}, expected ${expectedCanonical}`)
    }

    // The shell is ~1.9 KB; anything near that means the route never rendered.
    if (html.length < 8_000) {
        problems.push(`suspiciously small (${html.length} bytes)`)
    }
    return problems
}

async function main() {
    // Capture the un-prerendered shell before anything overwrites index.html.
    const shell = await readFile(path.join(DIST, 'index.html'), 'utf8')

    const server = await preview({
        root: ROOT,
        preview: { port: PORT, strictPort: true },
        logLevel: 'warn',
    })

    const browser = await chromium.launch()
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } })

    // Render everything into memory first. Writing as we go would replace the
    // very index.html the preview server falls back on mid-run.
    const rendered = new Map()
    const failures = []

    console.log(`Prerendering ${routes.length} routes…`)
    const queue = [...routes]
    const workers = Array.from({ length: CONCURRENCY }, async () => {
        while (queue.length > 0) {
            const route = queue.shift()
            try {
                const html = await renderRoute(context, route.path)
                const problems = validate(html, canonicalUrl(route.path))
                if (problems.length > 0) {
                    failures.push(`${route.path}: ${problems.join('; ')}`)
                } else {
                    console.log(`  ✓ ${route.path} (${(html.length / 1024).toFixed(0)} KB)`)
                    rendered.set(route.path, html)
                }
            } catch (error) {
                failures.push(`${route.path}: ${error.message}`)
            }
        }
    })
    await Promise.all(workers)

    await context.close()
    await browser.close()
    await server.close()

    if (failures.length > 0) {
        console.error('\nPrerender failed:')
        for (const failure of failures) console.error(`  ✗ ${failure}`)
        process.exit(1)
    }

    let written = 0
    for (const [routePath, html] of rendered) {
        for (const file of outputFiles(routePath)) {
            await mkdir(path.dirname(file), { recursive: true })
            await writeFile(file, html, 'utf8')
            written += 1
        }
    }

    // SPA fallback for genuinely unknown URLs. Deliberately the raw shell: it
    // boots the app, which reads window.location and renders the right route
    // (or, for an unknown path, SeoHead's noindex default). No static <title>
    // here — SeoHead supplies exactly one once React mounts.
    await writeFile(
        path.join(DIST, '404.html'),
        shell.replace('</head>', '    <meta name="robots" content="noindex" />\n  </head>'),
        'utf8',
    )

    console.log(`\nPrerendered ${rendered.size} routes into ${written} files, + 404.html`)
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})
