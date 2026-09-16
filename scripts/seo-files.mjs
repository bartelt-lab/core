/**
 * Generate the machine-readable entry points into dist/:
 *   robots.txt    — crawl policy + sitemap pointer
 *   sitemap.xml   — every indexable route (aliases excluded)
 *   llms.txt      — a plain-markdown index for LLM agents
 *   og-image.png  — 1200x630 social card, derived from the network hero
 *
 * All of it is generated from src/routes.js so the published URL list cannot
 * drift from the routes that actually exist.
 *
 * Run via `npm run build`, before scripts/prerender.mjs.
 */

import { execFileSync } from 'node:child_process'
import { writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { SITE_NAME, SITE_URL, indexableRoutes, routes } from '../src/routes.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(ROOT, 'dist')
const OG_SOURCE = path.join(ROOT, 'public', 'images', 'hero', 'core-network-hero.webp')

/**
 * Must match canonicalUrl() in src/routes.js: the slashless form, which is what
 * in-app links produce and what prerender.mjs emits as `<path>.html`.
 */
const urlFor = (routePath) => SITE_URL + (routePath === '/' ? '/' : routePath)

const escapeXml = (value) =>
    value.replace(/[<>&'"]/g, (c) =>
        ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c],
    )

function buildRobots() {
    return [
        '# https://www.robotstxt.org/robotstxt.html',
        'User-agent: *',
        'Allow: /',
        '',
        `Sitemap: ${SITE_URL}/sitemap.xml`,
        '',
    ].join('\n')
}

/**
 * When each route's page component was last committed, as YYYY-MM-DD.
 *
 * This used to be `new Date()` — one build timestamp stamped onto all 29 URLs,
 * so every deploy told Google that the entire site had changed. Google only
 * honours `lastmod` when it is "consistently and verifiably accurate", and a
 * sitemap that cries wolf on every push gets the field ignored, which is the
 * opposite of what a sitemap is for.
 *
 * Asking git is approximate — a page also changes when a shared component or a
 * data file under it changes — but it is approximate in the honest direction:
 * it under-reports rather than claiming edits that never happened.
 *
 * Routes whose date cannot be resolved (missing `source`, a file git has never
 * seen, no git at all in the build environment) get no `<lastmod>` at all. An
 * absent date costs nothing; a wrong one costs trust in every other date.
 */
function lastmodBySource() {
    const dates = new Map()

    for (const source of new Set(routes.map((route) => route.source).filter(Boolean))) {
        try {
            const date = execFileSync('git', ['log', '-1', '--format=%cs', '--', source], {
                cwd: ROOT,
                encoding: 'utf8',
            }).trim()
            if (/^\d{4}-\d{2}-\d{2}$/.test(date)) dates.set(source, date)
        } catch {
            // No git, shallow clone, or an untracked file — fall through to no date.
        }
    }

    return dates
}

function buildSitemap(dates) {
    const entries = indexableRoutes
        .map((route) => {
            const lastmod = dates.get(route.source)
            return [
                '  <url>',
                `    <loc>${escapeXml(urlFor(route.path))}</loc>`,
                ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
                `    <priority>${route.path === '/' ? '1.0' : '0.7'}</priority>`,
                '  </url>',
            ].join('\n')
        })
        .join('\n')

    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        entries,
        '</urlset>',
        '',
    ].join('\n')
}

/**
 * llms.txt — an emerging convention for handing an agent the shape of a site in
 * one fetch, instead of making it crawl and strip HTML.
 */
function buildLlmsTxt() {
    const group = (heading, prefixTest) => {
        const matched = indexableRoutes.filter(prefixTest)
        if (matched.length === 0) return null
        const lines = matched.map(
            (route) => `- [${route.title.split(' | ')[0]}](${urlFor(route.path)}): ${route.description}`,
        )
        return `## ${heading}\n\n${lines.join('\n')}\n`
    }

    return [
        `# ${SITE_NAME}`,
        '',
        '> A joint initiative by leading European universities — TU Clausthal, Babeș-Bolyai',
        '> University Cluj-Napoca, and partners — advancing cognitive software, autonomous',
        '> systems, and machine learning research.',
        '',
        group('Overview', (r) => r.path === '/' || ['/core-labs', '/publications', '/compute-cluster', '/demos'].includes(r.path)),
        group('Research demonstrators', (r) => ['/dynamo', '/leader-following', '/vial-sort'].includes(r.path)),
        group('AI Team Projects', (r) => r.path.startsWith('/ai-team-projects')),
        group('Cognitive Software (TU Clausthal)', (r) => r.path.startsWith('/tuc')),
        group('Babeș-Bolyai University (Cluj-Napoca)', (r) => r.path.startsWith('/ubb')),
    ]
        .filter((section) => section !== null)
        .join('\n')
}

/** 1200x630 is the size every major social/link unfurler crops to. */
async function buildOgImage() {
    await sharp(OG_SOURCE)
        .resize(1200, 630, { fit: 'cover', position: 'centre' })
        .png({ quality: 90 })
        .toFile(path.join(DIST, 'og-image.png'))
}

async function main() {
    await mkdir(DIST, { recursive: true })
    const dates = lastmodBySource()

    const aliases = routes.length - indexableRoutes.length

    await writeFile(path.join(DIST, 'robots.txt'), buildRobots(), 'utf8')
    await writeFile(path.join(DIST, 'sitemap.xml'), buildSitemap(dates), 'utf8')
    await writeFile(path.join(DIST, 'llms.txt'), buildLlmsTxt(), 'utf8')
    await buildOgImage()

    console.log(
        `SEO files: robots.txt, llms.txt, og-image.png, ` +
            `sitemap.xml (${indexableRoutes.length} URLs, ${aliases} alias${aliases === 1 ? '' : 'es'} excluded)`,
    )
}

main().catch((error) => {
    console.error(error)
    process.exit(1)
})
