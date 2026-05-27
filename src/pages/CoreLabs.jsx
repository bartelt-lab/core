import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'
import HeroVideo from '../components/hero/HeroVideo'
import { getCoreLabsLeads, getNetworkMembers } from '../data/team'
import PublicationsSection from '../components/publications/PublicationsSection'
import DemonstrationsSection from '../components/demonstrations/DemonstrationsSection'
import assetUrl from '../utils/assetUrl'

const leadDetails = {
  'David Szilagyi': {
    role: 'TUC & UBB Operations',
    institution: 'TU Clausthal / Babeș-Bolyai University',
    description: 'Leading operations fostering collaboration on autonomous systems and embodied robotics.',
    focus: ['Physical AI', 'Embodied AI', 'Locomanipulation', 'Imitation Learning'],
  },
  'Ashwin Nedungadi': {
    role: 'Rostock Operations',
    institution: 'University of Rostock',
    description: 'Coordinating the Rostock lab operations with a focus on human-centric perception and egocentric vision research.',
    focus: ['Egocentric Perception', 'Spatial Understanding'],
  },
  'Patrick Knab': {
    role: 'Multimodal Methods Lead',
    institution: 'TU Clausthal',
    description: 'Developing multimodal methods that fuse visual and language information to improve model robustness, generalization, and reasoning across diverse real-world tasks.',
    focus: ['Multimodal Learning', 'Vision-Language Models', 'Cross-Modal Reasoning'],
  },
  'Tim Grams': {
    role: 'Policy Learning Lead',
    institution: 'TU Clausthal',
    description: 'Researching Reinforcement Learning, Large Language Models, and Self-play algorithms for autonomous decision-making.',
    focus: ['Reinforcement Learning', 'Imitation Learning', 'LLMs', 'Self-play'],
  },
}

const CoreLabs = () => {
  const leads = getCoreLabsLeads()
  const principalInvestigators = getNetworkMembers().filter((member) => [1, 2, 4].includes(member.id))

  return (
    <div className="min-h-screen bg-white">
      <section id="hero" className="relative flex h-screen flex-col justify-end overflow-hidden pb-24 md:pb-32">
        <HeroVideo src={assetUrl('/videos/hero.mp4')} poster={assetUrl('/videos/hero-poster.webp')} />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

        <div className="container relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-secondary-400">CORE Labs</p>
            <h1 className="mb-6 text-4xl font-heading font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-7xl">
              Labs for Cognitive<br className="hidden md:block" /> Robotics in Europe
            </h1>
            <p className="mb-8 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
              Shared research infrastructure, joint projects, and a cross-national team advancing cognitive autonomous systems.
            </p>
            <a href="#initiative" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-gray-950 shadow-lg transition hover:bg-primary-50">
              Explore the labs
              <FaArrowRight className="h-3 w-3" aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </section>

      <section id="initiative" className="border-t border-gray-100 bg-white py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
          <div className="grid gap-14 lg:grid-cols-[1fr_.95fr] lg:items-start">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-primary-700">The Initiative</p>
              <h2 className="mb-8 text-4xl font-heading font-bold leading-tight tracking-tight text-gray-950 md:text-5xl">
                One lab across three cities
              </h2>
              <p className="text-lg leading-9 text-gray-700">
                CORE Labs runs shared laboratories in Goslar, Cluj-Napoca, and Rostock as a single facility. A joint compute cluster, common datasets, and a co-supervised student project programme let teams collaborate across borders.
              </p>
              <p className="mt-8 text-lg leading-9 text-gray-700">
                This shared infrastructure turns three institutions into one coherent scientific platform for cognitive systems research.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-950">Participating Institutions</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Our labs operate as a unified distributed entity, sharing resources, data, and expertise to accelerate discovery.
              </p>
              <div className="mt-6 space-y-5">
                {principalInvestigators.map((pi) => (
                  <div key={pi.id} className="flex items-center gap-4 rounded-xl bg-white p-3 shadow-sm">
                    <div className="h-14 w-14 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                      <img src={assetUrl(pi.photo)} alt={pi.name} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-950">{pi.prefix ? `${pi.prefix} ${pi.name}` : pi.name}</p>
                      <p className="text-xs font-semibold text-primary-700">Principal Investigator</p>
                      <p className="mt-0.5 text-xs font-semibold text-gray-400">{pi.affiliations[0].institution.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="border-t border-gray-100 bg-white py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary-700">Scientific Coordination</p>
              <h2 className="text-3xl font-heading font-bold leading-tight tracking-tight text-gray-950 md:text-4xl">Lab leads</h2>
              <p className="mt-3 text-base leading-7 text-gray-600">Our lab leads coordinate research and operational activities across our distributed locations.</p>
            </div>
            <Link to="/#team" className="hidden items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-600 shadow-sm transition hover:border-primary-300 hover:text-primary-700 md:inline-flex">
              Meet the Full Team
              <FaArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leads.map((lead, i) => {
              const details = leadDetails[lead.name] || {
                role: lead.coreLabsLead.role,
                institution: lead.affiliations.map((a) => a.institution.name).join(' / '),
                description: lead.coreLabsLead.shortDescription || lead.bio,
                focus: lead.coreLabsLead.researchFocus || [],
              }

              return (
                <motion.div key={lead.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }} className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-primary-200 hover:shadow-md">
                  <div className="mb-4 h-20 w-20 overflow-hidden rounded-xl border border-gray-100 bg-gray-100">
                    <img src={assetUrl(lead.photo)} alt={lead.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                  </div>
                  <h3 className="text-base font-bold leading-snug text-gray-950">{lead.name}</h3>
                  <p className="mt-1 text-xs font-bold text-primary-700">{details.role}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gray-400">{details.institution}</p>
                  <p className="mt-4 text-sm leading-6 text-gray-600">{details.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {details.focus.map((f) => (
                      <span key={f} className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600">{f}</span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <DemonstrationsSection priority />

      <section id="publications" className="border-t border-gray-100 bg-gradient-to-br from-white via-slate-50 to-white py-10 md:py-14">
        <div className="container mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[0.85fr_1fr] md:items-center md:px-12 lg:px-20">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary-700">CORE Labs</p>
            <h2 className="mb-4 text-3xl font-heading font-bold leading-tight tracking-tight text-gray-950 md:text-4xl">Research publications</h2>
            <p className="text-sm leading-6 text-gray-600">
              A rotating preview of recent publications connected to CORE Labs. Open the archive for the full publication list across the CORE Network.
            </p>
            <Link to="/publications" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gray-950 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-primary-700">
              View all publications
              <FaArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>
          <div className="rounded-[1.75rem] border border-white bg-white/75 p-3 shadow-2xl shadow-slate-200/80 ring-1 ring-slate-200/70 backdrop-blur">
            <PublicationsSection limit={4} layout="rotator" title="" subtitle="" compact />
          </div>
        </div>
      </section>
    </div>
  )
}

export default CoreLabs
