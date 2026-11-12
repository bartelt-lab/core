import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  SITE_URL,
  canonicalUrl,
  findRoute,
  indexableRoutes,
  legacyRedirect,
  routes,
} from '../src/routes.js'
import {
  getInstitutionFromSearch,
  institutionLabel,
  matchesInstitution,
  normalizeInstitution,
  withInstitution,
} from '../src/utils/institutions.js'

const aliasDestinations = {
  '/network': '/',
  '/core-labs': '/labs',
  '/demos': '/projects#research-projects',
  '/publications': '/research#publications',
  '/ai-team-projects': '/teaching#student-projects',
  '/ai-team-projects/ai4ai': '/ai-team-projects/ai4bim',
  '/tuc': '/research?institution=TUC',
  '/tuc/projects': '/teaching?institution=TUC#student-projects',
  '/tuc/industry-projects': '/projects?institution=TUC#industry-projects',
  '/tuc/teaching': '/teaching?institution=TUC',
  '/tuc/seminar': '/teaching?institution=TUC#seminars',
  '/tuc/theses': '/teaching?institution=TUC#theses',
  '/tuc/join-us': '/team?institution=TUC#join-us',
  '/ubb': '/labs?institution=UBB',
  '/ai-team-projects/dynamo': '/dynamo',
  '/tuc/publications': '/research?institution=TUC#publications',
}

for (const [oldPath, destination] of Object.entries(aliasDestinations)) {
  test(`${oldPath} redirects once to its new page and canonical`, () => {
    assert.equal(legacyRedirect(oldPath), destination)
    assert.equal(legacyRedirect(`${oldPath}/`), destination)
    const target = new URL(destination, SITE_URL)
    assert.ok(findRoute(target.pathname), 'destination is a published route')
    assert.equal(legacyRedirect(target.pathname, target.search, target.hash), null)
    assert.equal(canonicalUrl(oldPath), `${SITE_URL}${target.pathname}`)
    assert.equal(canonicalUrl(oldPath), canonicalUrl(target.pathname))
  })
}

test('every alias is covered, route paths are unique, and aliases stay out of the sitemap', () => {
  const aliases = routes.filter((route) => route.redirectTo)
  assert.deepEqual(aliases.map((route) => route.path).sort(), Object.keys(aliasDestinations).sort())
  assert.equal(new Set(routes.map((route) => route.path)).size, routes.length)
  for (const route of routes.filter((entry) => entry.canonical)) {
    assert.ok(!indexableRoutes.includes(route), route.path)
  }
  for (const path of ['/research', '/projects', '/teaching', '/labs', '/team']) {
    assert.ok(indexableRoutes.some((route) => route.path === path), path)
  }
})

test('old URLs retain filters and other query values, while institutional addresses set their own filter', () => {
  assert.equal(
    legacyRedirect('/publications', '?institution=UBB&q=robot', ''),
    '/research?institution=UBB&q=robot#publications',
  )
  assert.equal(
    legacyRedirect('/tuc/teaching', '?institution=UBB&source=mail', '#theses'),
    '/teaching?institution=TUC&source=mail#theses',
  )
  assert.equal(
    legacyRedirect('/ai-team-projects/ai4ai', '?institution=TUC', '#features'),
    '/ai-team-projects/ai4bim?institution=TUC#features',
  )
  assert.equal(
    legacyRedirect('/ai-team-projects', '?institution=UBB', '#archive'),
    '/teaching?institution=UBB#student-projects',
  )
})

test('existing member and section links reach their moved content', () => {
  for (const path of ['/', '/network']) {
    assert.equal(legacyRedirect(path, '', '#member-knab'), '/team#member-knab')
    assert.equal(legacyRedirect(path, '?institution=TUC', '#member-knab'), '/team?institution=TUC#member-knab')
    assert.equal(legacyRedirect(path, '', '#team'), '/team')
  }
  assert.equal(legacyRedirect('/tuc', '', '#members'), '/team?institution=TUC')
  assert.equal(legacyRedirect('/tuc', '', '#contact'), '/team?institution=TUC#contact')
  assert.equal(legacyRedirect('/core-labs', '', '#dynamo'), '/projects#research-projects')
  assert.equal(legacyRedirect('/core-labs', '', '#demonstrations'), '/projects#research-projects')
  assert.equal(legacyRedirect('/core-labs', '', '#autonomous'), '/labs/cluj?institution=UBB#autonomous')
  assert.equal(legacyRedirect('/demos', '', '#autonomous'), '/labs/cluj?institution=UBB#autonomous')
  assert.equal(legacyRedirect('/ubb', '', '#humanoid'), '/labs/cluj?institution=UBB#humanoid')
  assert.equal(legacyRedirect('/ubb', '', '#publications'), '/research?institution=UBB#publications')
  assert.equal(legacyRedirect('/network', '', '#contact'), '/#contact')
})

test('nested anchors in historic HashRouter links survive the initial path rewrite', () => {
  // index.html first replaces location with the path after the leading '#'.
  // Feed that parsed path/query/remaining anchor into the shared redirect map.
  const examples = [
    ['/#/tuc/teaching?institution=UBB#theses', '/teaching?institution=TUC#theses'],
    ['/#/network?institution=TUC#member-knab', '/team?institution=TUC#member-knab'],
    ['/#/publications?institution=UBB', '/research?institution=UBB#publications'],
  ]
  for (const [oldAddress, expected] of examples) {
    const oldUrl = new URL(oldAddress, SITE_URL)
    const rewritten = new URL(oldUrl.hash.slice(1), SITE_URL)
    assert.equal(legacyRedirect(rewritten.pathname, rewritten.search, rewritten.hash), expected)
  }
})

test('live routes and unknown routes do not unexpectedly redirect', () => {
  for (const path of ['/research', '/projects', '/teaching', '/labs/robotics', '/labs/cluj', '/team', '/missing']) {
    assert.equal(legacyRedirect(path, '?institution=TUC', '#section'), null)
  }
  assert.equal(legacyRedirect('/', '', '#main-content'), null)
  assert.equal(findRoute('/missing'), undefined)
})

test('published project details select the correct main navigation category', () => {
  for (const path of ['/dynamo', '/leader-following', '/vial-sort']) {
    assert.equal(findRoute(path).section, 'projects', path)
  }
  const studentSlugs = [
    'tempo', 'lectra', 'fastmile', 'human-awareness-detection', 'ai4bim',
    'vergabepilot', 'werewolfs', 'neurocore', 'stratego', 'traffic-network', 'self-driving',
  ]
  for (const slug of studentSlugs) {
    assert.equal(findRoute(`/ai-team-projects/${slug}`).section, 'teaching', slug)
  }
  for (const path of ['/labs/robotics', '/labs/cluj', '/compute-cluster']) {
    assert.equal(findRoute(path).section, 'labs', path)
  }
})

test('news articles are public routes with a stable canonical and a return to filtered news', () => {
  const path = '/news/sascha-marton-nvidia'
  const route = findRoute(path)
  assert.ok(route, 'the article has metadata for prerendering')
  assert.ok(indexableRoutes.includes(route), 'the article is included in the sitemap')
  assert.equal(canonicalUrl(`${path}/`), `${SITE_URL}${path}`)
  assert.equal(legacyRedirect(path, '?institution=TUC'), null)
  assert.equal(route.institutionFilterTarget, '/#news')
  assert.equal(withInstitution(route.institutionFilterTarget, 'UBB'), '/?institution=UBB#news')
})

test('institution values accept MDS as Rostock and use All for absent or invalid values', () => {
  for (const value of ['TUC', 'UBB', 'Rostock', 'all']) assert.equal(normalizeInstitution(value), value)
  assert.equal(normalizeInstitution('MDS'), 'Rostock')
  assert.equal(institutionLabel('Rostock'), 'MDS (Rostock)')
  for (const value of [undefined, null, '', 'unknown', 'tuc']) assert.equal(normalizeInstitution(value), 'all')
  assert.equal(getInstitutionFromSearch('?institution=MDS'), 'Rostock')
  assert.equal(getInstitutionFromSearch('?institution=UBB&from=home'), 'UBB')
  for (const search of ['', '?institution=all', '?institution=unknown']) {
    assert.equal(getInstitutionFromSearch(search), 'all')
  }
})

test('internal links carry the chosen filter without dropping query values or anchors', () => {
  assert.equal(withInstitution('/teaching#student-projects', 'UBB'), '/teaching?institution=UBB#student-projects')
  assert.equal(withInstitution('/research?q=robot&institution=TUC#publications', 'UBB'), '/research?q=robot&institution=UBB#publications')
  assert.equal(withInstitution('/team#member-knab', 'MDS'), '/team?institution=Rostock#member-knab')
  const nested = new URL(withInstitution('/research?next=%2Fteaching%23theses#publications', 'TUC'), SITE_URL)
  assert.equal(nested.searchParams.get('next'), '/teaching#theses')
  assert.equal(nested.searchParams.get('institution'), 'TUC')
  assert.equal(nested.hash, '#publications')
})

test('All and invalid selections remove only the institution query', () => {
  for (const value of ['all', 'unknown', undefined, null]) {
    assert.equal(withInstitution('/research?institution=UBB&q=robot#publications', value), '/research?q=robot#publications')
  }
  assert.equal(withInstitution('/labs?institution=TUC', 'all'), '/labs')
})

test('external, mail, fragment, and relative links are left untouched', () => {
  const links = [
    'https://example.com/paper?year=2026#abstract',
    'http://example.com/demo',
    '//example.com/project',
    '/\\example.com/project',
    'mailto:person@example.com',
    '#publications',
    'relative-page.html',
  ]
  for (const to of links) assert.equal(withInstitution(to, 'TUC'), to)
})

test('shared and single-institution content match the global selection', () => {
  assert.ok(matchesInstitution(['TUC', 'UBB'], 'TUC'))
  assert.ok(matchesInstitution(['TUC', 'UBB'], 'UBB'))
  assert.ok(!matchesInstitution(['TUC'], 'UBB'))
  assert.ok(matchesInstitution(['Rostock'], 'MDS'))
  assert.ok(matchesInstitution([], 'all'))
  assert.ok(matchesInstitution(['TUC'], 'invalid'))
})
