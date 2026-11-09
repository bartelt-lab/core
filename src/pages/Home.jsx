import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  FaArrowRight, FaEnvelope, FaGithub, FaGlobe, FaLinkedin, FaTwitter,
} from 'react-icons/fa'
import { SiGooglescholar } from 'react-icons/si'
import NewsCard from '../components/news/NewsCard'
import { formatNewsDate } from '../components/news/newsText'
import PublicationMiniCarousel from '../components/publications/PublicationMiniCarousel'
import { getNetworkMembers, institutions } from '../data/team'
import { cognitiveProjects } from '../data/demonstrations'
import { newsByDate } from '../data/news'
import assetUrl from '../utils/assetUrl'
import { useLanguage } from '../i18n/useLanguage'

// Deep-link prefix for a single team member, e.g. `/#member-szilagyi`.
const MEMBER_HASH = '#member-'

const txt = (pick, pair) => pick(pair[1], pair[0])

const eyebrow = 'mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary-700'
const sectionTitle = 'font-heading text-3xl font-bold leading-tight tracking-tight text-slate-950 md:text-4xl'

// Research highlights, in display order: the page each card opens, its photo
// and a one-line summary. Titles and links of the robotics cards come from the
// project data so a rename follows.
const project = (id) => cognitiveProjects.find((p) => p.id === id)
const highlights = [
  {
    title: ['Industrieprojekte', 'Industry Projects'],
    to: '/tuc/industry-projects',
    image: '/images/projects/industry/ai-bim.webp',
    summary: ['Angewandte KI mit Partnern aus Bau, Gesundheit und Handel', 'Applied AI with partners in construction, healthcare and retail'],
  },
  {
    title: [project('dynamo').title, project('dynamo').title],
    to: project('dynamo').link,
    image: '/images/projects/dynamo/hero.webp',
    summary: ['Dynamische Manipulation für kognitive Roboter', 'Dynamic manipulation for cognitive robots'],
  },
  {
    title: [project('vial-sort').title, project('vial-sort').title],
    to: project('vial-sort').link,
    image: '/images/projects/vial-sort/hero.webp',
    summary: ['Sprachgesteuertes Sortieren mit einer VLA-Policy', 'Language-conditioned sorting with a VLA policy'],
  },
  {
    title: ['AI-Team-Projekte', 'AI Team Projects'],
    to: '/ai-team-projects',
    image: '/videos/ai-team-projects/ai-team-project-showcase-poster.webp',
    summary: ['Studierendenprojekte zwischen TU Clausthal und UBB', 'Student projects across TU Clausthal and UBB'],
  },
]

// Member universities of the network, in display order. `to` stays on this
// site, `href` leaves it.
const sites = [
  { institution: institutions.TUC, logo: '/logos/clausthal-logo.webp', to: '/tuc', lab: ['Cognitive Software, ISSE', 'Cognitive Software, ISSE'] },
  { institution: institutions.UBB, logo: '/logos/ubb-logo.webp', to: '/ubb', lab: ['CORE Cluj', 'CORE Cluj'] },
  { institution: institutions.ROSTOCK, logo: '/logos/rostock-logo.webp', href: institutions.ROSTOCK.website, lab: ['MDS Lab', 'MDS Lab'] },
]

const COUNT_WORDS = { 2: ['Zwei', 'Two'], 3: ['Drei', 'Three'], 4: ['Vier', 'Four'], 5: ['Fünf', 'Five'] }

const LINK_ICONS = [
  { key: 'scholar', icon: SiGooglescholar, title: 'Google Scholar' },
  { key: 'github', icon: FaGithub, title: 'GitHub' },
  { key: 'linkedin', icon: FaLinkedin, title: 'LinkedIn' },
  { key: 'twitter', icon: FaTwitter, title: 'Twitter' },
  { key: 'website', icon: FaGlobe, title: 'Website' },
]

const LinkIcons = ({ member }) => {
  const iconClass = 'flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition hover:bg-primary-50 hover:text-primary-700'
  return (
    <div className="flex flex-wrap items-center justify-center gap-0.5">
      {member.email && (
        <a href={`mailto:${member.email}`} title="Email" aria-label={`Email ${member.name}`} className={iconClass}>
          <FaEnvelope className="h-3.5 w-3.5" />
        </a>
      )}
      {LINK_ICONS.filter(({ key }) => member.links?.[key]).map(({ key, icon: Icon, title }) => (
        <a key={key} href={member.links[key]} target="_blank" rel="noopener noreferrer" title={title} aria-label={`${member.name} on ${title}`} className={iconClass}>
          <Icon className="h-3.5 w-3.5" />
        </a>
      ))}
    </div>
  )
}

const Home = () => {
  const { pick, language } = useLanguage()
  const members = getNetworkMembers().filter((m) => !['research_assistant', 'support_staff'].includes(m.roleCategory))
  const [leadNews, ...moreNews] = newsByDate

  // Other pages deep-link a single person as `/#member-<slug>` (see the
  // institutions card on /core-labs). The browser cannot honour that hash on a
  // client-side navigation, so scroll and flag the card here.
  const location = useLocation()
  const requestedSlug = location.hash.startsWith(MEMBER_HASH) ? location.hash.slice(MEMBER_HASH.length) : ''
  // The ring is derived from the hash, not stored — storing it would mean
  // setting state straight from an effect. Only the *expiry* is state, keyed by
  // the navigation it belongs to, so clicking the same link twice re-lights it.
  const [expiredKey, setExpiredKey] = useState(null)
  const highlightedSlug = requestedSlug && expiredKey !== location.key ? requestedSlug : null

  useEffect(() => {
    if (!requestedSlug) {
      return
    }

    const scrollToCard = () =>
      document.getElementById(`member-${requestedSlug}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })

    // Twice on purpose: once as soon as the grid has laid out, once after the
    // lazy member photos have had time to land. Without the second pass the
    // card drifts out of view when images resolve mid-scroll.
    const raf = requestAnimationFrame(scrollToCard)
    const settle = setTimeout(scrollToCard, 600)
    // Long enough to still be lit once the smooth scroll settles (~1s of that
    // window is the scroll itself).
    const fade = setTimeout(() => setExpiredKey(location.key), 5000)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(settle)
      clearTimeout(fade)
    }
  }, [requestedSlug, location.key])

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section id="hero" className="relative overflow-hidden bg-[#f7fafc] text-slate-950">
        <img src={assetUrl('/images/hero/core-network-hero.webp')} alt="" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover object-center opacity-60" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f7fafc] via-[#f7fafc]/95 via-[40%] to-[#f7fafc]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f7fafc] via-transparent to-white/40" />

        <div className="container relative z-10 mx-auto max-w-6xl px-6 pb-12 pt-32 md:px-12 md:pb-16 lg:px-20">
          <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <div className="max-w-2xl">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-primary-700">{pick('Research Network', 'Forschungsnetzwerk')}</p>
              <h1 className="mb-6 text-4xl font-heading font-bold leading-tight tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
                {pick(
                  <>Cognitive Software<br className="hidden md:block" /> in Europe.</>,
                  <>Kognitive Software<br className="hidden md:block" /> in Europa.</>,
                )}
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-600 md:text-xl">
                {pick(
                  'Shared labs, shared compute, one mission: cognitive systems that perceive, reason, and act.',
                  'Gemeinsame Labore, gemeinsame Rechenleistung, eine Mission: kognitive Systeme, die wahrnehmen, schlussfolgern und handeln.',
                )}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#research" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-primary-700">
                  {pick('See our research', 'Unsere Forschung')}
                  <FaArrowRight className="h-3 w-3" aria-hidden="true" />
                </a>
                <Link to="/tuc/join-us" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-6 py-3 text-sm font-bold text-slate-900 backdrop-blur transition hover:border-primary-400 hover:text-primary-700">
                  {pick('Join us', 'Mitmachen')}
                </Link>
              </div>
            </div>

            {leadNews && (
              <Link
                to={`/news/${leadNews.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-white/70 bg-white/85 p-3 shadow-xl shadow-slate-300/40 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-primary-200"
              >
                <img
                  src={assetUrl(leadNews.image)}
                  alt=""
                  decoding="async"
                  style={leadNews.imageFocus ? { objectPosition: leadNews.imageFocus } : undefined}
                  className="h-20 w-20 shrink-0 rounded-xl object-cover"
                />
                <span className="min-w-0">
                  <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary-500" aria-hidden="true" />
                    {pick('Latest news', 'Neuigkeit')}
                  </span>
                  <span className="mt-1 line-clamp-3 block text-sm font-bold leading-5 text-slate-950 transition-colors group-hover:text-primary-700">{txt(pick, leadNews.title)}</span>
                  <span className="mt-1 block text-xs font-semibold text-slate-500">{formatNewsDate(leadNews.date, language)}</span>
                </span>
              </Link>
            )}
          </div>

          <PublicationMiniCarousel />
        </div>
      </section>

      {/* ── News ── */}
      {leadNews && (
        <section id="news" className="border-t border-slate-100 bg-white py-10 md:py-12">
          <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-950">{pick('News', 'Neuigkeiten')}</h2>
              <Link to="/news" className="inline-flex items-center gap-2 text-sm font-bold text-primary-700 transition hover:text-primary-800">
                {pick('All news', 'Alle Neuigkeiten')}
                <FaArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </div>
            {/* One story gets the wide lead card; with more, the two newest sit
                side by side as rows and the rest wait on /news. */}
            {moreNews.length === 0 ? (
              <NewsCard item={leadNews} variant="lead" />
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {[leadNews, moreNews[0]].map((item) => (
                  <NewsCard key={item.slug} item={item} variant="row" />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Research highlights ── */}
      <section id="research" className="scroll-mt-24 border-t border-slate-100 bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className={eyebrow}>{pick('Research', 'Forschung')}</p>
              <h2 className={sectionTitle}>{pick('Research and projects', 'Forschung und Projekte')}</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {highlights.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-2xl bg-slate-900 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-28px_rgb(var(--primary-700)/0.55)]"
              >
                <img
                  src={assetUrl(item.image)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  style={item.focus ? { objectPosition: item.focus } : undefined}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                <div className="relative p-3 text-white sm:p-5">
                  <h3 className="flex items-center justify-between gap-2 font-heading text-base font-bold leading-tight sm:text-xl">
                    {txt(pick, item.title)}
                    <FaArrowRight className="h-3.5 w-3.5 shrink-0 -rotate-45 transition group-hover:rotate-0" aria-hidden="true" />
                  </h3>
                  <p className="mt-1 text-xs leading-4 text-slate-200 sm:text-sm sm:leading-5">{txt(pick, item.summary)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Network ── */}
      <section id="network" className="border-t border-slate-100 bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-center">
            <div>
              <p className={eyebrow}>{pick('The Network', 'Das Netzwerk')}</p>
              <h2 className={sectionTitle}>
                {pick(
                  `${txt(pick, COUNT_WORDS[sites.length])} universities, one research platform`,
                  `${txt(pick, COUNT_WORDS[sites.length])} Universitäten, eine Forschungsplattform`,
                )}
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                {pick(
                  'CORE connects labs, compute and people across its member universities. Projects, students and researchers move between the sites.',
                  'CORE verbindet Labore, Rechenleistung und Menschen an seinen Mitgliedsuniversitäten. Projekte, Studierende und Forschende wechseln zwischen den Standorten.',
                )}
              </p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-3">
              {sites.map(({ institution, logo, to, href, lab }) => {
                const content = (
                  <>
                    <div className="flex h-14 w-28 shrink-0 items-center justify-center sm:h-24 sm:w-auto">
                      <img src={assetUrl(logo)} alt={institution.name} loading="lazy" decoding="async" className="max-h-full max-w-full object-contain sm:max-h-20 sm:max-w-[85%]" />
                    </div>
                    <div className="min-w-0 sm:mt-3 sm:border-t sm:border-slate-100 sm:pt-3">
                      <p className="text-sm font-bold text-slate-950 transition-colors group-hover:text-primary-700">{txt(pick, lab)}</p>
                      <p className="mt-0.5 text-xs text-slate-500">{institution.location}</p>
                    </div>
                  </>
                )
                const className = 'group flex h-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md sm:block'
                return (
                  <li key={institution.shortName}>
                    {to ? (
                      <Link to={to} className={className}>{content}</Link>
                    ) : (
                      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{content}</a>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* ── People ── */}
      <section id="team" className="border-t border-slate-100 bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
          <div className="mb-8 max-w-xl">
            <p className={eyebrow}>{pick('People', 'Menschen')}</p>
            <h2 className={sectionTitle}>{pick('Research team', 'Forschungsteam')}</h2>
            <p className="mt-3 text-base leading-7 text-slate-600">{pick('Faculty, postdoctoral researchers, PhD students and network members across the CORE institutions.', 'Professorinnen und Professoren, Postdocs, Promovierende und Netzwerkmitglieder an den CORE-Institutionen.')}</p>
          </div>
          {/* No entrance animation: the prerendered HTML must show every card
              without JavaScript (it shipped at opacity 0 before). */}
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {members.map((member) => (
              <li
                key={member.id}
                id={`member-${member.slug}`}
                className={`relative flex scroll-mt-28 flex-col items-center rounded-xl border bg-white px-3 pb-3 pt-5 text-center shadow-sm transition hover:border-primary-200 hover:shadow-md ${
                  highlightedSlug === member.slug
                    ? 'border-primary-500 ring-2 ring-primary-400 ring-offset-2'
                    : 'border-slate-200'
                }`}
              >
                <div className="absolute left-0 top-2.5 flex flex-col gap-1">
                  {member.affiliations.map((a) => (
                    <span key={a.institution.shortName} className="rounded-r-md bg-primary-600 py-0.5 pl-1.5 pr-2 text-[9px] font-bold uppercase tracking-wide text-white shadow-sm">{a.institution.shortName}</span>
                  ))}
                </div>
                <img src={assetUrl(member.photo)} alt={member.name} loading="lazy" decoding="async" className="h-16 w-16 rounded-full border border-slate-200 bg-slate-100 object-cover" />
                <p className="mt-3 text-sm font-bold leading-5 text-slate-950">{member.prefix ? `${member.prefix} ` : ''}{member.name}</p>
                <p className="mt-0.5 text-xs font-semibold leading-5 text-primary-700">{member.title}</p>
                <div className="mt-auto pt-2">
                  <LinkIcons member={member} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Join and collaborate ── */}
      <section id="contact" className="border-t border-slate-200 bg-slate-950 py-16 text-white md:py-20">
        <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary-300">{pick('PhD and research', 'Promotion und Forschung')}</p>
              <h2 className="font-heading text-2xl font-bold md:text-3xl">{pick('Do a PhD with us', 'Promovieren bei CORE')}</h2>
              <p className="mt-3 text-base leading-7 text-slate-300">
                {pick(
                  'Fundamental research, practical applications and exchange with international research and industry partners.',
                  'Grundlagenforschung, praktische Anwendungen und Austausch mit internationalen Forschungs- und Industriepartnern.',
                )}
              </p>
              <Link to="/tuc/join-us" className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950 shadow-lg transition hover:bg-primary-100">
                {pick('Open positions', 'Offene Stellen')}
                <FaArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </div>
            <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary-300">{pick('Get in touch', 'Kontakt')}</p>
              <h2 className="font-heading text-2xl font-bold md:text-3xl">{pick('Collaborate with the CORE Network', 'Mit dem CORE Network zusammenarbeiten')}</h2>
              <p className="mt-3 text-base leading-7 text-slate-300">
                {pick(
                  'We welcome collaboration proposals from researchers and institutions interested in cognitive software, autonomous systems, and AI research.',
                  'Wir freuen uns über Kooperationsvorschläge von Forschenden und Institutionen mit Interesse an kognitiver Software, autonomen Systemen und KI-Forschung.',
                )}
              </p>
              <a href="mailto:bartelt@isse.tu-clausthal.de" className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition hover:border-white/60">
                <FaEnvelope className="h-3.5 w-3.5" aria-hidden="true" />
                bartelt@isse.tu-clausthal.de
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
