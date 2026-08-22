import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaArrowRight, FaBookOpen, FaBrain, FaEnvelope, FaExternalLinkAlt,
  FaFlask, FaGlobe, FaGithub, FaLinkedin, FaServer, FaTwitter,
} from 'react-icons/fa'
import { SiGooglescholar } from 'react-icons/si'
import PublicationMiniCarousel from '../components/publications/PublicationMiniCarousel'
import { getNetworkMembers, institutions } from '../data/team'
import { cognitiveProjects } from '../data/demonstrations'
import assetUrl from '../utils/assetUrl'
import { useLanguage } from '../i18n/useLanguage'

// Which project gets the homepage spotlight. Swap the id to feature a different one
// (it must be a non-teaser entry in cognitiveProjects with an /images/projects/<id>/hero.webp).
const FEATURED_PROJECT_ID = 'dynamo'

const pillars = [
  { to: '/core-labs', icon: FaFlask, eyebrow: 'Research Labs', title: 'CORE Labs', body: 'Joint laboratory infrastructure spanning Goslar, Cluj-Napoca, and Rostock.' },
  { to: '/ai-team-projects', icon: FaBrain, eyebrow: 'Education & Projects', title: 'AI Team Projects', body: 'Semester-long, cross-national student projects jointly run by TU Clausthal and Babeș-Bolyai University.' },
  { to: '/compute-cluster', icon: FaServer, eyebrow: 'Infrastructure', title: 'Compute Cluster', body: 'Shared GPU infrastructure, dataset storage, and simulation environments for CORE researchers.' },
  { to: '/publications', icon: FaBookOpen, eyebrow: 'Research Output', title: 'Publications', body: 'Peer-reviewed papers, preprints, and workshop contributions from the CORE Network.' },
]

const LinkIcons = ({ member }) => (
  <div className="flex max-w-[10rem] flex-wrap items-center justify-center gap-1.5 self-center">
    {member.email && (
      <a href={`mailto:${member.email}`} title="Email" className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-primary-300 hover:text-primary-600">
        <FaEnvelope className="h-3.5 w-3.5" />
      </a>
    )}
    {member.links?.scholar && (
      <a href={member.links.scholar} target="_blank" rel="noopener noreferrer" title="Google Scholar" className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-primary-300 hover:text-primary-600">
        <SiGooglescholar className="h-3.5 w-3.5" />
      </a>
    )}
    {member.links?.github && (
      <a href={member.links.github} target="_blank" rel="noopener noreferrer" title="GitHub" className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-primary-300 hover:text-primary-600">
        <FaGithub className="h-3.5 w-3.5" />
      </a>
    )}
    {member.links?.twitter && (
      <a href={member.links.twitter} target="_blank" rel="noopener noreferrer" title="Twitter" className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-primary-300 hover:text-primary-600">
        <FaTwitter className="h-3.5 w-3.5" />
      </a>
    )}
    {member.links?.linkedin && (
      <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-primary-300 hover:text-primary-600">
        <FaLinkedin className="h-3.5 w-3.5" />
      </a>
    )}
    {member.links?.website && (
      <a href={member.links.website} target="_blank" rel="noopener noreferrer" title="Website" className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-primary-300 hover:text-primary-600">
        <FaGlobe className="h-3.5 w-3.5" />
      </a>
    )}
  </div>
)

const Home = () => {
  const { pick } = useLanguage()
  const members = getNetworkMembers().filter((m) => !['research_assistant', 'support_staff'].includes(m.roleCategory))
  const featured = cognitiveProjects.find((project) => project.id === FEATURED_PROJECT_ID)
  const partnerLogos = [
    { name: 'TU Clausthal', src: '/logos/clausthal-logo.webp', to: '/tuc' },
    { name: 'UBB', src: '/logos/ubb-logo.webp', href: institutions.UBB.website },
    { name: 'University of Rostock', src: '/logos/rostock-logo.webp', href: institutions.ROSTOCK.website },
  ]

  return (
    <div className="min-h-screen bg-white">
      <section id="hero" className="relative min-h-screen overflow-hidden bg-[#f7fafc] text-gray-950">
        <img src={assetUrl('/images/hero/core-network-hero.webp')} alt="" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover object-center opacity-60" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f7fafc] via-[#f7fafc]/95 via-[40%] to-[#f7fafc]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f7fafc] via-transparent to-white/40" />

        <div className="container relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-14 pt-28 md:px-12 lg:px-20">
          <div className="w-full max-w-6xl">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
              <div className="max-w-2xl">
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-primary-700">{pick('Research Network', 'Forschungsnetzwerk')}</p>
                <h1 className="mb-6 text-4xl font-heading font-bold leading-tight tracking-tight text-gray-950 md:text-5xl lg:text-6xl">
                  {pick(
                    <>Cognitive Software<br className="hidden md:block" /> in Europe.</>,
                    <>Kognitive Software<br className="hidden md:block" /> in Europa.</>,
                  )}
                </h1>
                <p className="mb-4 max-w-xl text-lg leading-8 text-gray-600 md:text-xl">
                  {pick(
                    'Shared labs, shared compute, one mission: cognitive systems that perceive, reason, and act.',
                    'Gemeinsame Labore, gemeinsame Rechenleistung, eine Mission: kognitive Systeme, die wahrnehmen, schlussfolgern und handeln.',
                  )}
                </p>
              </div>

              {featured && (
                <Link
                  to={featured.link}
                  aria-label={`Featured project: ${featured.title}`}
                  className="group relative block w-44 shrink-0 overflow-hidden rounded-3xl border border-white/70 shadow-2xl shadow-slate-300/50 backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl sm:w-52"
                >
                  <div className="relative aspect-square">
                    <img
                      src={assetUrl(`/images/projects/${featured.id}/hero.webp`)}
                      alt={featured.title}
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/25 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-300">{pick('Featured project', 'Ausgewähltes Projekt')}</p>
                      <div className="mt-1 flex items-center justify-between gap-2">
                        <h3 className="font-heading text-lg font-bold leading-tight">{featured.title}</h3>
                        <FaArrowRight className="h-3.5 w-3.5 shrink-0 -rotate-45 transition group-hover:rotate-0" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>

            <PublicationMiniCarousel />
          </div>
        </div>
      </section>

      <section id="about" className="border-t border-gray-100 bg-white py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
          <div className="mb-12 max-w-3xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary-700">{pick('The Network', 'Das Netzwerk')}</p>
              <h2 className="mb-5 text-4xl font-heading font-bold leading-tight tracking-tight text-gray-950 md:text-5xl">
                {pick(
                  <>Three universities,<br className="hidden sm:block" /> one research platform</>,
                  <>Drei Universitäten,<br className="hidden sm:block" /> eine Forschungsplattform</>,
                )}
              </h2>
              <p className="text-lg leading-8 text-gray-600">
                {pick(
                  'CORE unites TU Clausthal, the University of Rostock, and Babeș-Bolyai University into a single distributed entity spanning Germany and Romania.',
                  'CORE verbindet die TU Clausthal, die Universität Rostock und die Babeș-Bolyai University zu einer verteilten Einheit über Deutschland und Rumänien hinweg.',
                )}
              </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[260px_1fr] lg:items-stretch">
            <div className="flex flex-col">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-primary-700">{pick('Member Institutions', 'Mitgliedsinstitutionen')}</p>
              <div className="grid flex-1 gap-4">
                {partnerLogos.map((logo) => {
                  const content = (
                    <div className="group relative flex h-full cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-1 shadow-sm ring-primary-100 transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md hover:ring-4">
                      <img src={assetUrl(logo.src)} alt={logo.name} loading="lazy" decoding="async" className={`object-contain ${logo.name === 'UBB' ? 'max-h-[6.5rem] max-w-full' : 'max-h-[5.5rem] max-w-[90%]'}`} />
                      <FaArrowRight className="absolute right-3 top-3 h-3 w-3 -rotate-45 text-secondary-600 opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
                    </div>
                  )
                  return logo.to ? (
                    <Link key={logo.name} to={logo.to} aria-label={`Open ${logo.name} lab page`}>{content}</Link>
                  ) : (
                    <a key={logo.name} href={logo.href} target="_blank" rel="noreferrer" aria-label={`Open ${logo.name} website`}>{content}</a>
                  )
                })}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
              <div className="relative h-full min-h-[340px]">
                <img src={assetUrl('/images/locations.webp')} alt="CORE Network Map" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/85 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-sm font-bold uppercase tracking-widest text-primary-200">{pick('CORE Network Map', 'CORE-Netzwerkkarte')}</p>
                  <h3 className="mt-2 text-2xl font-bold">{pick('Distributed Research Network', 'Verteiltes Forschungsnetzwerk')}</h3>
                  <p className="mt-1 text-sm text-gray-200">{pick('Connecting innovation hubs across Germany and Romania.', 'Wir verbinden Innovationsstandorte in Deutschland und Rumänien.')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="platform" className="border-t border-gray-100 bg-white py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary-700">{pick("What's in the Network", 'Was zum Netzwerk gehört')}</p>
            <h2 className="text-3xl font-heading font-bold leading-tight tracking-tight text-gray-950 md:text-4xl">{pick('Four pillars of the CORE platform', 'Vier Säulen der CORE-Plattform')}</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ to, icon: Icon, eyebrow, title, body }) => (
              <Link key={to} to={to} className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-lg">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gray-950 text-white transition group-hover:bg-secondary-500 group-hover:text-gray-950">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary-700">{pick(eyebrow, {
                  'Research Labs': 'Forschungslabore',
                  'Education & Projects': 'Lehre & Projekte',
                  Infrastructure: 'Infrastruktur',
                  'Research Output': 'Forschungsergebnisse',
                }[eyebrow] || eyebrow)}</p>
                <h3 className="mb-2 text-base font-bold text-gray-950 group-hover:text-primary-700 transition-colors">{pick(title, {
                  'AI Team Projects': 'AI-Team-Projekte',
                  'Compute Cluster': 'Rechencluster',
                  Publications: 'Publikationen',
                }[title] || title)}</h3>
                <p className="flex-1 text-sm leading-6 text-gray-600">{pick(body, {
                  'CORE Labs': 'Gemeinsame Laborinfrastruktur über Goslar, Cluj-Napoca und Rostock hinweg.',
                  'AI Team Projects': 'Semesterlange, internationale Studierendenprojekte, gemeinsam durchgeführt von der TU Clausthal und der Babes-Bolyai University.',
                  'Compute Cluster': 'Gemeinsame GPU-Infrastruktur, Datenspeicher und Simulationsumgebungen für CORE-Forschende.',
                  Publications: 'Begutachtete Artikel, Preprints und Workshop-Beiträge aus dem CORE Network.',
                }[title] || body)}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-primary-700">{pick('Explore', 'Entdecken')} <FaArrowRight className="h-2.5 w-2.5" aria-hidden="true" /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="border-t border-gray-100 bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
          <div className="mb-12 max-w-xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary-700">{pick('People', 'Menschen')}</p>
            <h2 className="text-3xl font-heading font-bold leading-tight tracking-tight text-gray-950 md:text-4xl">{pick('Research team', 'Forschungsteam')}</h2>
            <p className="mt-3 text-base leading-7 text-gray-600">{pick('Faculty, postdoctoral researchers, and PhD students across all three CORE institutions.', 'Professorinnen und Professoren, Postdocs und Promovierende an allen drei CORE-Institutionen.')}</p>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {members.map((member, i) => (
              <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.4 }} className="group relative grid h-[19rem] grid-rows-[5rem_4rem_2.5rem_4.5rem] justify-items-center gap-1 overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:border-primary-200 hover:shadow-md">
                <div className="absolute left-0 top-3 flex flex-col gap-1">
                  {member.affiliations.map((a) => (
                    <span key={a.institution.shortName} className="rounded-r-md bg-primary-600 py-0.5 pl-1.5 pr-2 text-[9px] font-bold uppercase tracking-wide text-white shadow-sm">{a.institution.shortName}</span>
                  ))}
                </div>
                <div className="h-20 w-20 overflow-hidden rounded-full border border-gray-200 bg-gray-100">
                  <img src={assetUrl(member.photo)} alt={member.name} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <p className="flex h-full items-center text-center text-sm font-bold leading-5 text-gray-950">{member.prefix ? `${member.prefix} ` : ''}{member.name}</p>
                <p className="flex h-full items-center text-center text-xs font-semibold leading-5 text-primary-700">{member.title}</p>
                <LinkIcons member={member} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-gray-200 bg-gray-950 py-16 text-white">
        <div className="container mx-auto max-w-4xl px-6 text-center md:px-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary-300">{pick('Get in touch', 'Kontakt')}</p>
          <h2 className="mb-4 text-3xl font-heading font-bold md:text-4xl">{pick('Collaborate with the CORE Network', 'Mit dem CORE Network zusammenarbeiten')}</h2>
          <p className="mx-auto mb-8 max-w-xl text-base leading-7 text-slate-300">
            {pick(
              'We welcome collaboration proposals from researchers and institutions interested in cognitive software, autonomous systems, and AI research.',
              'Wir freuen uns über Kooperationsvorschläge von Forschenden und Institutionen mit Interesse an kognitiver Software, autonomen Systemen und KI-Forschung.',
            )}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="mailto:bartelt@isse.tu-clausthal.de" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-gray-950 shadow-lg transition hover:bg-primary-50">
              bartelt@isse.tu-clausthal.de
              <FaExternalLinkAlt className="h-3 w-3" aria-hidden="true" />
            </a>
            <Link to="/publications" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-bold text-white transition hover:border-white/50">
              {pick('Browse publications', 'Publikationen ansehen')}
              <FaArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
