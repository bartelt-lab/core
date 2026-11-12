import { Link } from 'react-router-dom'
import { FaArrowRight, FaBookOpen, FaBrain, FaExternalLinkAlt, FaFlask, FaGraduationCap, FaUsers } from 'react-icons/fa'
import PublicationMiniCarousel from '../components/publications/PublicationMiniCarousel'
import LatestNews from '../components/news/LatestNews'
import { cognitiveProjects } from '../data/demonstrations'
import assetUrl from '../utils/assetUrl'
import { useLanguage } from '../i18n/useLanguage'
import useInstitution from '../hooks/useInstitution'

const pillars = [
  { to: '/research', icon: FaBookOpen, title: 'Research', body: ['Our research themes, papers, and results.', 'Unsere Forschungsthemen, Publikationen und Ergebnisse.'] },
  { to: '/projects', icon: FaBrain, title: 'Projects', body: ['Research systems and industry collaborations.', 'Forschungssysteme und Kooperationen mit der Industrie.'] },
  { to: '/teaching', icon: FaGraduationCap, title: 'Teaching', body: ['Courses, seminars, theses, and international student projects.', 'Kurse, Seminare, Abschlussarbeiten und internationale Studierendenprojekte.'] },
  { to: '/labs', icon: FaFlask, title: 'Labs', body: ['Robotics, autonomous driving, and shared computing infrastructure.', 'Robotik, autonomes Fahren und gemeinsame Recheninfrastruktur.'] },
  { to: '/team', icon: FaUsers, title: 'Team', body: ['Meet our people and find ways to work with us.', 'Unser Team kennenlernen und mit uns zusammenarbeiten.'] },
]

const Home = () => {
  const { pick } = useLanguage()
  const { institution, withInstitution } = useInstitution()
  const featured = ['all', 'TUC'].includes(institution) ? cognitiveProjects.find((project) => project.id === 'dynamo') : null
  const partnerLogos = [
    { name: 'TU Clausthal', src: '/logos/clausthal-logo.webp', to: '/research?institution=TUC' },
    { name: 'UBB', src: '/logos/ubb-logo.webp', to: '/research?institution=UBB' },
    { name: 'University of Rostock', src: '/logos/rostock-logo.webp', to: '/research?institution=Rostock' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <section id="hero" className="relative min-h-screen overflow-hidden bg-[#f7fafc] text-slate-950">
        <img src={assetUrl('/images/hero/core-network-hero.webp')} alt="" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover object-center opacity-60" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f7fafc] via-[#f7fafc]/95 via-[40%] to-[#f7fafc]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f7fafc] via-transparent to-white/40" />

        <div className="container relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-14 pt-28 md:px-12 lg:px-20">
          <div className="w-full max-w-6xl">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
              <div className="max-w-2xl">
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-primary-700">{pick('Research Network', 'Forschungsnetzwerk')}</p>
                <h1 className="mb-6 text-4xl font-heading font-bold leading-tight tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
                  {pick(
                    <>Cognitive Software<br className="hidden md:block" /> in Europe.</>,
                    <>Kognitive Software<br className="hidden md:block" /> in Europa.</>,
                  )}
                </h1>
                <p className="mb-4 max-w-xl text-lg leading-8 text-slate-600 md:text-xl">
                  {pick(
                    'Shared labs, shared compute, one mission: cognitive systems that perceive, reason, and act.',
                    'Gemeinsame Labore, gemeinsame Rechenleistung, eine Mission: kognitive Systeme, die wahrnehmen, schlussfolgern und handeln.',
                  )}
                </p>
              </div>

              {featured && (
                <Link
                  to={withInstitution(featured.link)}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />
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

      <LatestNews />

      <section id="about" className="border-t border-slate-100 bg-white py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
          <div className="mb-12 max-w-3xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary-700">{pick('The Network', 'Das Netzwerk')}</p>
              <h2 className="mb-5 text-4xl font-heading font-bold leading-tight tracking-tight text-slate-950 md:text-5xl">
                {pick(
                  <>Three universities,<br className="hidden sm:block" /> one research platform</>,
                  <>Drei Universitäten,<br className="hidden sm:block" /> eine Forschungsplattform</>,
                )}
              </h2>
              <p className="text-lg leading-8 text-slate-600">
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
                    <div className="group relative flex h-full cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-1 shadow-sm ring-primary-100 transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md hover:ring-4">
                      <img src={assetUrl(logo.src)} alt={logo.name} loading="lazy" decoding="async" className={`object-contain ${logo.name === 'UBB' ? 'max-h-[6.5rem] max-w-full' : 'max-h-[5.5rem] max-w-[90%]'}`} />
                      <FaArrowRight className="absolute right-3 top-3 h-3 w-3 -rotate-45 text-secondary-600 opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
                    </div>
                  )
                  return logo.to ? (
                    <Link key={logo.name} to={logo.to} aria-label={`View research from ${logo.name}`}>{content}</Link>
                  ) : (
                    <a key={logo.name} href={logo.href} target="_blank" rel="noreferrer" aria-label={`Open ${logo.name} website`}>{content}</a>
                  )
                })}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
              <div className="relative h-full min-h-[340px]">
                <img src={assetUrl('/images/locations.webp')} alt="CORE Network Map" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-sm font-bold uppercase tracking-widest text-primary-200">{pick('CORE Network Map', 'CORE-Netzwerkkarte')}</p>
                  <h3 className="mt-2 text-2xl font-bold">{pick('Distributed Research Network', 'Verteiltes Forschungsnetzwerk')}</h3>
                  <p className="mt-1 text-sm text-slate-200">{pick('Connecting innovation hubs across Germany and Romania.', 'Wir verbinden Innovationsstandorte in Deutschland und Rumänien.')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="platform" className="border-t border-slate-100 bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <h2 className="mb-8 text-3xl font-bold text-slate-950">{pick('Explore CORE', 'CORE entdecken')}</h2>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
            {pillars.map(({ to, icon: Icon, title, body }) => (
              <Link key={to} to={withInstitution(to)} className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-primary-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-700">
                <Icon className="mb-5 h-6 w-6 text-primary-700" aria-hidden="true" />
                <h3 className="mb-2 text-lg font-bold text-slate-950 group-hover:text-primary-700">{title}</h3>
                <p className="flex-1 text-sm leading-6 text-slate-600">{pick(...body)}</p>
                <FaArrowRight className="mt-5 h-3 w-3 text-primary-700" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-slate-200 bg-slate-950 py-16 text-white">
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
            <a href="mailto:bartelt@isse.tu-clausthal.de" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-slate-950 shadow-lg transition hover:bg-primary-50">
              bartelt@isse.tu-clausthal.de
              <FaExternalLinkAlt className="h-3 w-3" aria-hidden="true" />
            </a>
            <Link to={withInstitution('/research#publications')} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-bold text-white transition hover:border-white/50">
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
