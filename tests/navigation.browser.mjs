import assert from 'node:assert/strict'
import { chromium } from 'playwright'
import { createServer } from 'vite'
import { indexableRoutes, canonicalUrl } from '../src/routes.js'

const server = await createServer({ logLevel: 'error', server: { host: '127.0.0.1', port: 0 } })
await server.listen()
let browser
let checks = 0

try {
  browser = await chromium.launch()
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' })
  const page = await context.newPage()
  const origin = server.resolvedUrls.local[0].replace(/\/$/, '')
  const errors = []
  const reactWarnings = []
  const missingAssets = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (['error', 'warning'].includes(message.type()) && /unique.*key|React does not recognize|Invalid DOM|hydration|deprecated/i.test(message.text())) reactWarnings.push(message.text())
  })
  page.on('response', (response) => {
    if (response.url().startsWith(origin) && response.status() >= 400) missingAssets.push(response.url())
  })
  // Exercise local content without making embeds or webfonts a test dependency.
  await page.route('**/*', (route) => route.request().url().startsWith(origin) ? route.continue() : route.abort())

  const visit = async (path) => {
    await page.goto(origin + path, { waitUntil: 'domcontentloaded' })
    await page.locator('main h1').waitFor()
  }
  const count = async (selector, expected) => {
    await page.waitForFunction(({ selector, expected }) => document.querySelectorAll(selector).length === expected, { selector, expected })
    checks += 1
  }
  const banner = page.getByRole('banner')
  const nav = banner.getByRole('navigation', { name: 'Main navigation' })
  const choose = async (id) => {
    await banner.getByRole('button', { name: id, exact: true }).click()
    await page.waitForURL((url) => id === 'All' ? !url.searchParams.has('institution') : url.searchParams.get('institution') === (id === 'MDS' ? 'Rostock' : id))
  }

  for (const route of indexableRoutes) {
    await visit(route.path)
    assert.equal(await page.locator('main h1').count(), 1, `${route.path}: one page heading`)
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), canonicalUrl(route.path))
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${route.path}: horizontal overflow`)
    if (route.section) assert.equal(await nav.locator('[aria-current="page"]').textContent(), route.section[0].toUpperCase() + route.section.slice(1))
    checks += 1
  }

  const newsPath = '/news/sascha-marton-nvidia'
  await visit('/?institution=TUC#news')
  const news = page.locator('#news')
  await news.getByRole('heading', { name: 'News', exact: true }).waitFor()
  await news.locator(`a[href^="${newsPath}"]`).first().click()
  await page.waitForURL((url) => url.pathname === newsPath && url.searchParams.get('institution') === 'TUC')
  await page.getByRole('heading', { level: 1, name: /Sascha Marton.*tabular/i }).waitFor()
  assert.equal(await page.locator('main time').first().getAttribute('datetime'), '2026-11-12')
  assert.equal(await page.getByRole('img', { name: 'NVIDIA logo', exact: true }).getAttribute('src'), '/logos/nvidia.webp')
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), canonicalUrl(newsPath))
  const articleLinks = await page.locator('main a').evaluateAll((links) => links.map((link) => link.getAttribute('href')))
  for (const href of [
    'https://scholar.google.com/citations?user=5PQJ3sEAAAAJ',
    'https://scholar.google.de/citations?user=9FcF1gwAAAAJ&hl=de',
    'https://ojs.aaai.org/index.php/AAAI/article/view/29345',
    'https://openreview.net/forum?id=XEFWBxi075',
    'https://www.isse.tu-clausthal.de/',
    '/team?institution=TUC#join-us',
  ]) assert.ok(articleLinks.includes(href), `Article link: ${href}`)
  await page.getByRole('button', { name: 'DE', exact: true }).click()
  await page.getByRole('heading', { level: 1, name: /^Von CORE zu NVIDIA/ }).waitFor()
  await page.getByRole('link', { name: 'Zurück zu Aktuelles', exact: true }).click()
  await page.waitForURL((url) => url.pathname === '/' && url.hash === '#news' && url.searchParams.get('institution') === 'TUC')
  await news.getByRole('heading', { name: 'Aktuelles', exact: true }).waitFor()
  await page.getByRole('button', { name: 'EN', exact: true }).click()
  await news.locator(`a[href^="${newsPath}"]`).first().click()
  await page.waitForURL((url) => url.pathname === newsPath)
  await choose('UBB')
  await page.waitForURL((url) => url.pathname === '/' && url.hash === '#news')
  assert.equal(await news.locator(`a[href^="${newsPath}"]`).count(), 0, 'TUC news is hidden by the UBB filter')
  await news.getByRole('link', { name: 'Show all news', exact: true }).click()
  await page.waitForURL((url) => url.pathname === '/' && url.hash === '#news' && !url.searchParams.has('institution'))
  await news.locator(`a[href^="${newsPath}"]`).first().waitFor()
  checks += 1

  await visit('/research')
  assert.deepEqual(await nav.getByRole('link').allTextContents(), ['Research', 'Projects', 'Teaching', 'Labs', 'Team'])
  await count('#publications article', 65)
  await choose('UBB')
  await count('#publications article', 3)
  await nav.getByRole('link', { name: 'Labs', exact: true }).click()
  await count('main article', 1)
  assert.match(await page.locator('main').innerText(), /CORE Labs Cluj/)
  await nav.getByRole('link', { name: 'Projects', exact: true }).click()
  await page.getByRole('heading', { name: 'Autonomous Driving', exact: true }).waitFor()
  await count('#research-projects article', 1)
  await count('#industry-projects article', 0)
  await nav.getByRole('link', { name: 'Teaching', exact: true }).click()
  await page.locator('#student-projects').waitFor()
  assert.equal(new URL(page.url()).searchParams.get('institution'), 'UBB')
  assert.equal(await page.getByRole('heading', { name: 'TU Clausthal students', exact: true }).count(), 0)
  await page.getByRole('heading', { name: 'UBB students', exact: true }).waitFor()
  for (const title of ['TEMPO', 'LECTRA', 'FastMile']) assert.match(await page.locator('main').innerText(), new RegExp(title))
  const pdfLinks = await page.locator('main a[href$=".pdf"]').evaluateAll((links) => links.map((link) => link.href))
  assert.ok(pdfLinks.length >= 3, 'Project PDFs remain available')
  for (const href of new Set(pdfLinks)) assert.equal((await page.request.get(href)).status(), 200)
  await page.reload({ waitUntil: 'domcontentloaded' })
  await page.locator('#student-projects').waitFor()
  assert.equal(new URL(page.url()).searchParams.get('institution'), 'UBB')
  await choose('TUC')
  await page.getByRole('link', { name: 'AI Team Projects', exact: true }).first().click()
  await page.getByRole('heading', { name: 'TU Clausthal students', exact: true }).waitFor()
  assert.equal(await page.getByRole('heading', { name: 'UBB students', exact: true }).count(), 0)
  checks += 1

  await choose('MDS')
  await page.getByRole('heading', { name: 'No teaching listed for this institution' }).waitFor()
  await page.getByRole('link', { name: 'Show all teaching' }).click()
  await page.locator('#courses-overview').waitFor()
  assert.equal(new URL(page.url()).search, '')
  await page.goBack({ waitUntil: 'domcontentloaded' })
  await page.getByRole('heading', { name: 'No teaching listed for this institution' }).waitFor()
  checks += 1

  for (const [old, path, hash] of [
    ['/tuc/seminar', '/teaching', '#seminars'],
    ['/tuc/theses', '/teaching', '#theses'],
    ['/ai-team-projects?institution=UBB', '/teaching', '#student-projects'],
    ['/tuc/industry-projects', '/projects', '#industry-projects'],
    ['/ubb#autonomous', '/labs/cluj', '#autonomous'],
    ['/#/tuc/seminar', '/teaching', '#seminars'],
    ['/#member-knab', '/team', '#member-knab'],
  ]) {
    await visit(old)
    await page.waitForURL((url) => url.pathname === path && url.hash === hash)
    await page.locator(hash).waitFor()
    checks += 1
  }

  await visit('/team')
  await count('[id^="member-"]', 25)
  await visit('/team?institution=UBB#member-knab')
  await page.waitForURL((url) => !url.searchParams.has('institution'))
  await page.locator('#member-knab').waitFor()
  await choose('UBB')
  assert.equal(new URL(page.url()).hash, '')
  await count('#member-knab', 0)
  checks += 1

  await visit('/ai-team-projects/lectra?institution=UBB')
  await page.getByRole('link', { name: 'AI Team Projects', exact: true }).first().click()
  await page.waitForURL((url) => url.pathname === '/teaching' && url.searchParams.get('institution') === 'UBB')
  await visit('/labs/cluj?institution=UBB')
  await choose('TUC')
  await page.waitForURL((url) => url.pathname === '/labs' && url.searchParams.get('institution') === 'TUC')
  checks += 1

  await visit('/teaching#theses')
  const beforeSkip = page.url()
  await banner.getByRole('link', { name: 'Skip to content' }).focus()
  await page.keyboard.press('Enter')
  assert.equal(page.url(), beforeSkip)
  assert.equal(await page.evaluate(() => document.activeElement.id), 'main-content')
  await page.locator('#theses').waitFor()
  checks += 1

  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 })
    for (const path of ['/', newsPath, '/research', '/projects', '/teaching', '/labs', '/team']) {
      await visit(path)
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${path} at ${width}px overflows`)
      checks += 1
    }
    await visit('/labs')
    await banner.getByRole('button', { name: 'Open menu' }).click()
    const mobileNav = page.locator('#mobile-navigation')
    assert.deepEqual(await mobileNav.getByRole('link').allTextContents(), ['Research', 'Projects', 'Teaching', 'Labs', 'Team'])
    await page.keyboard.press('Escape')
    assert.equal(await banner.getByRole('button', { name: 'Open menu' }).getAttribute('aria-expanded'), 'false')
    await banner.getByRole('combobox').selectOption('UBB')
    await count('main article', 1)
    await banner.getByRole('button', { name: 'Open menu' }).click()
    await mobileNav.getByRole('link', { name: 'Teaching', exact: true }).click()
    await page.locator('#student-projects').waitFor()
    assert.equal(new URL(page.url()).searchParams.get('institution'), 'UBB')
    assert.equal(await page.locator('#mobile-navigation').count(), 0)
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Teaching at ${width}px overflows`)
    checks += 1
  }

  await page.getByRole('button', { name: 'DE', exact: true }).click()
  await page.getByRole('heading', { name: 'Lehre', exact: true }).waitFor()
  assert.equal(await page.locator('html').getAttribute('lang'), 'de')
  assert.deepEqual(errors, [], 'No browser errors')
  assert.deepEqual(reactWarnings, [], 'No React warnings')
  assert.deepEqual(missingAssets, [], 'No missing local assets')
  console.log(`Browser checks passed: ${checks}; desktop, mobile, filters, redirects, PDFs, and language switching.`)
} finally {
  await browser?.close()
  await server.close()
}
