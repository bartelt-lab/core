import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaArrowRight, FaBookOpen, FaBrain, FaEnvelope, FaExternalLinkAlt,
  FaFlask, FaGlobe, FaServer,
} from 'react-icons/fa'
import { SiGooglescholar } from 'react-icons/si'
import PublicationMiniCarousel from '../components/publications/PublicationMiniCarousel'
import { getNetworkMembers, institutions } from '../data/team'
import assetUrl from '../utils/assetUrl'

const getAssetUrl = (path) => {
  if (!path) return path
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${cleanPath}`
}

const pillars = [
  { to: '/core-labs', icon: FaFlask, eyebrow: 'Research Labs', title: 'CORE Labs', body: 'Joint laboratory infrastructure spanning Goslar, Cluj-Napoca, and Rostock.' },
  { to: '/ai-team-projects', icon: FaBrain, eyebrow: 'Education & Projects', title: 'AI Team Projects', body: 'Semester-long, cross-national student projects jointly run by TU Clausthal and Babes-Bolyai University.' },
  { to: '/compute-cluster', icon: FaServer, eyebrow: 'Infrastructure', title: 'Compute Cluster', body: 'Shared GPU infrastructure, dataset storage, and simulation environments for CORE researchers.' },
  { to: '/publications', icon: FaBookOpen, eyebrow: 'Research Output', title: 'Publications', body: 'Peer-reviewed papers, preprints, and workshop contributions from the CORE Network.' },
]

const LinkIcons = ({ member }) => (
  <div className="mt-3 flex flex-wrap gap-2">
    {member.email && (
      <a href={`mailto:${member.email}`} title="Email" className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-blue-300 hover:text-blue-600">
        <FaEnvelope className="h-3.5 w-3.5" />
      </a>
    )}
    {member.links?.scholar && (
      <a href={member.links.scholar} target="_blank" rel="noopener noreferrer" title="Google Scholar" className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-blue-300 hover:text-blue-600">
        <SiGooglescholar className="h-3.5 w-3.5" />
      </a>
    )}
    {member.links?.website && (
      <a href={member.links.website} target="_blank" rel="noopener noreferrer" title="Website" className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-blue-300 hover:text-blue-600">
        <FaGlobe className="h-3.5 w-3.5" />
      </a>
    )}
  </div>
)

const Network = () => {
  const members = getNetworkMembers()
  const principalInvestigators = members.filter((member) => [1, 2, 4].includes(member.id))
  const partnerLogos = [
    { name: 'TU Clausthal', src: '/logos/clausthal-logo.png', to: '/tuc' },
    { name: 'UBB', src: '/logos/ubb-logo.png', href: institutions.UBB.website },
    { name: 'University of Rostock', src: '/logos/rostock-logo.png', href: institutions.ROSTOCK.website },
  ]

  return (
    <div className="min-h-screen bg-white">
      <section id="hero" className="relative min-h-screen overflow-hidden bg-[#f7fafc] text-gray-950">
        <img src={assetUrl('/images/hero/core-network-hero.png')} alt="" className="absolute inset-0 h-full w-full object-cover object-center opacity-60" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f7fafc] via-[#f7fafc]/95 via-[40%] to-[#f7fafc]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f7fafc] via-transparent to-white/40" />

        <div className="container relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-14 pt-28 md:px-12 lg:px-20">
          <div className="w-full max-w-6xl">
            <div className="max-w-2xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-blue-700">Research Network</p>
            <h1 className="mb-6 text-4xl font-heading font-bold leading-tight tracking-tight text-gray-950 md:text-5xl lg:text-6xl">
              Cognitive Software<br className="hidden md:block" /> in Europe.
            </h1>
            <p className="mb-4 max-w-xl text-lg leading-8 text-gray-600 md:text-xl">
              CORE connects universities, researchers, and infrastructure across Germany and Romania
              into a unified platform for cognitive systems research.
            </p>
            </div>
            <PublicationMiniCarousel />
          </div>
        </div>
      </section>

      <section id="about" className="border-t border-gray-100 bg-white py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
          <div className="mb-14 max-w-3xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-blue-700">The Initiative</p>
              <h2 className="mb-5 text-4xl font-heading font-bold leading-tight tracking-tight text-gray-950 md:text-5xl">
                Advancing the Field<br className="hidden sm:block" /> of Cognitive Robotics
              </h2>
              <p className="text-lg leading-8 text-gray-600">
                CORE (Cognitive Robotics in Europe) is a cross-institutional initiative uniting leading European universities. We combine expertise in AI, machine learning, and control theory, focusing on developing autonomous systems capable of robust perception and adaptability.
              </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-start">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
              <div className="relative h-[340px]">
                <img src={assetUrl('/images/locations.png')} alt="CORE Network Map" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/85 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-sm font-bold uppercase tracking-widest text-blue-200">CORE Network Map</p>
                  <h3 className="mt-2 text-2xl font-bold">Distributed Research Network</h3>
                  <p className="mt-1 text-sm text-gray-200">Connecting innovation hubs across Germany and Romania.</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-950">Participating Institutions</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Our labs operate as a unified distributed entity, sharing resources, data, and expertise to accelerate discovery.
              </p>
              <div className="mt-6 space-y-5">
                {principalInvestigators.map((pi) => (
                  <div key={pi.id} className="flex items-center gap-4 rounded-xl bg-white p-3 shadow-sm">
                    <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                      <img src={getAssetUrl(pi.photo)} alt={pi.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-950">{pi.prefix ? `${pi.prefix} ${pi.name}` : pi.name}</p>
                      <p className="text-xs font-semibold text-blue-700">Principal Investigator</p>
                      <p className="mt-0.5 text-xs font-semibold text-gray-400">{pi.affiliations[0].institution.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {partnerLogos.map((logo) => {
              const content = (
                <div className="flex min-h-28 items-center justify-center rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md">
                  <img src={assetUrl(logo.src)} alt={logo.name} className="max-h-16 max-w-full object-contain grayscale opacity-80 transition hover:grayscale-0 hover:opacity-100" />
                </div>
              )
              return logo.to ? (
                <Link key={logo.name} to={logo.to} aria-label="Open TU Clausthal page">{content}</Link>
              ) : (
                <a key={logo.name} href={logo.href} target="_blank" rel="noreferrer" aria-label={`Open ${logo.name} website`}>{content}</a>
              )
            })}
          </div>
        </div>
      </section>

      <section id="platform" className="border-t border-gray-100 bg-white py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-blue-700">What's in the Network</p>
            <h2 className="text-3xl font-heading font-bold leading-tight tracking-tight text-gray-950 md:text-4xl">Four pillars of the CORE platform</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ to, icon: Icon, eyebrow, title, body }) => (
              <Link key={to} to={to} className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gray-950 text-white transition group-hover:bg-blue-700">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-blue-700">{eyebrow}</p>
                <h3 className="mb-2 text-base font-bold text-gray-950 group-hover:text-blue-700 transition-colors">{title}</h3>
                <p className="flex-1 text-sm leading-6 text-gray-600">{body}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-blue-700">Explore <FaArrowRight className="h-2.5 w-2.5" aria-hidden="true" /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="border-t border-gray-100 bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
          <div className="mb-12 max-w-xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-blue-700">People</p>
            <h2 className="text-3xl font-heading font-bold leading-tight tracking-tight text-gray-950 md:text-4xl">Research team</h2>
            <p className="mt-3 text-base leading-7 text-gray-600">Faculty, postdoctoral researchers, and PhD students across all three CORE institutions.</p>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {members.map((member, i) => (
              <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.4 }} className="group flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md">
                <div className="mb-3 h-20 w-20 overflow-hidden rounded-full border border-gray-200 bg-gray-100">
                  <img src={getAssetUrl(member.photo)} alt={member.name} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <p className="text-center text-sm font-bold leading-snug text-gray-950">{member.prefix ? `${member.prefix} ` : ''}{member.name}</p>
                <p className="mt-1 text-center text-xs text-blue-700 font-semibold leading-5">{member.title}</p>
                <p className="mt-0.5 w-full truncate text-center text-xs leading-5 text-gray-400">{member.affiliations[0]?.institution.shortName}</p>
                <LinkIcons member={member} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-gray-200 bg-gray-950 py-16 text-white">
        <div className="container mx-auto max-w-4xl px-6 text-center md:px-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-blue-300">Get in touch</p>
          <h2 className="mb-4 text-3xl font-heading font-bold md:text-4xl">Collaborate with the CORE Network</h2>
          <p className="mx-auto mb-8 max-w-xl text-base leading-7 text-slate-300">
            We welcome collaboration proposals from researchers and institutions interested in cognitive robotics, autonomous systems, and AI research.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="mailto:bartelt@isse.tu-clausthal.de" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-gray-950 shadow-lg transition hover:bg-blue-50">
              bartelt@isse.tu-clausthal.de
              <FaExternalLinkAlt className="h-3 w-3" aria-hidden="true" />
            </a>
            <Link to="/publications" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-bold text-white transition hover:border-white/50">
              Browse publications
              <FaArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Network
