import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowRight, FaLock } from 'react-icons/fa'
import HeroVideo from '../components/hero/HeroVideo'
import { getNetworkMembers } from '../data/team'
import PublicationsSection from '../components/publications/PublicationsSection'
import DemonstrationsSection from '../components/demonstrations/DemonstrationsSection'
import assetUrl from '../utils/assetUrl'
import { useLanguage } from '../i18n/useLanguage'

// Institutions card lists the PIs, grouped by site: Bartelt + Kunze (TUC),
// Sacarea (UBB), Lüdtke (Rostock). The operations contact is a PhD student, so
// that block sits in the left column instead — same section, own footing, not
// a fourth row in the PI list.
const PI_IDS = [1, 24, 2, 4]
const OPERATIONS_CONTACT_ID = 5

// The papers this page lists: every publication tagged with one of these
// topics (the `topics` field in publications.json, ids from
// data/publicationTopics.js). To add a paper here, give it the topic.
const LAB_TOPICS = ['robotics']

// The part of the labs that is in preparation: Kai Kunze's group will add its
// work. Until then it has an entry and nothing more. `lead` is his id in
// team.js. The title is a working title.
const AUGMENTATION = {
  lead: 24,
  title: ['Human Augmentation', 'Human Augmentation'],
  text: [
    'Die Gruppe von Kai Kunze an der TU Clausthal richtet ihren Teil der Labore ein. Ihre Arbeiten erscheinen hier in Kürze.',
    'Kai Kunze\u2019s group at TU Clausthal is setting up its part of the labs. Its work will appear here soon.',
  ],
}

// Where the hero sends people. Visitors come for different things, so the
// first screen offers each of them directly instead of one "explore" button.
const JUMPS = [
  { href: '#dynamo', label: ['Projekte', 'Projects'] },
  { href: '#publications', label: ['Publikationen', 'Publications'] },
  { href: '#initiative', label: ['Beteiligte', 'People'] },
]

// Every person here links to their card in the CORE Network team grid, which
// Home.jsx scrolls to and ring-highlights off this hash. There is still no
// per-member detail route (see AGENTS.md issue 2), so the grid is the target.
const memberLink = (member) => `/#member-${member.slug}`

const CoreLabs = () => {
  const { pick } = useLanguage()
  const members = getNetworkMembers()
  const principalInvestigators = PI_IDS.map((id) => members.find((m) => m.id === id)).filter(Boolean)
  const contact = members.find((m) => m.id === OPERATIONS_CONTACT_ID) || null
  const augmentationLead = members.find((m) => m.id === AUGMENTATION.lead) || null

  return (
    <div className="min-h-screen bg-white">
      <section id="hero" className="relative flex h-screen flex-col justify-end overflow-hidden pb-24 md:pb-32">
        <HeroVideo src={assetUrl('/videos/core-labs-hero.mp4')} poster={assetUrl('/videos/hero-poster.webp')} />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

        <div className="container relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-secondary-400">CORE Labs</p>
            <h1 className="mb-6 text-4xl font-heading font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-7xl">
              {pick(
                <>Labs for Cognitive<br className="hidden md:block" /> Robotics in Europe</>,
                <>Labore für kognitive<br className="hidden md:block" /> Robotik in Europa</>,
              )}
            </h1>
            <p className="mb-8 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
              {pick(
                'Shared research infrastructure, joint projects, and a cross-national team advancing cognitive autonomous systems.',
                'Gemeinsame Forschungsinfrastruktur, gemeinsame Projekte und ein internationales Team zur Weiterentwicklung kognitiver autonomer Systeme.',
              )}
            </p>
            <nav className="flex flex-wrap gap-3" aria-label={pick('On this page', 'Auf dieser Seite')}>
              {JUMPS.map((jump, index) => (
                <a
                  key={jump.href}
                  href={jump.href}
                  className={`inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition ${
                    index === 0
                      ? 'bg-white text-slate-950 shadow-lg hover:bg-primary-50'
                      : 'border border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20'
                  }`}
                >
                  {pick(jump.label[1], jump.label[0])}
                  <FaArrowRight className="h-3 w-3 rotate-90" aria-hidden="true" />
                </a>
              ))}
            </nav>
          </motion.div>
        </div>
      </section>

      <section id="initiative" className="border-t border-slate-100 bg-white pb-8 pt-14 md:pb-10 md:pt-20">
        <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_.95fr] lg:items-start">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-primary-700">{pick('The Initiative', 'Die Initiative')}</p>
              <h2 className="mb-5 text-4xl font-heading font-bold leading-tight tracking-tight text-slate-950 md:text-5xl">
                {pick('One lab across three cities', 'Ein Labor über drei Städte hinweg')}
              </h2>
              <p className="text-base leading-7 text-slate-700 md:text-lg md:leading-8">
                {pick(
                  'CORE Labs runs shared laboratories in Goslar, Cluj-Napoca, and Rostock as a single facility. A joint compute cluster, common datasets, and a co-supervised student project programme let teams collaborate across borders.',
                  'CORE Labs betreibt gemeinsame Labore in Goslar, Cluj-Napoca und Rostock als eine zusammenhängende Einrichtung. Ein gemeinsamer Rechencluster, gemeinsame Datensätze und co-betreute Studierendenprojekte ermöglichen grenzüberschreitende Zusammenarbeit.',
                )}
              </p>
              <p className="mt-4 text-base leading-7 text-slate-700 md:text-lg md:leading-8">
                {pick(
                  'This shared infrastructure turns research groups at three sites into one coherent scientific platform for cognitive systems research.',
                  'Diese gemeinsame Infrastruktur macht aus Forschungsgruppen an drei Standorten eine kohärente wissenschaftliche Plattform für Forschung an kognitiven Systemen.',
                )}
              </p>

              {contact && (
                // Affiliations are omitted on purpose — the institutions card
                // beside this block already names TUC and UBB. The whole card
                // leads to the team grid, like the investigators' cards beside
                // it: the name's link is stretched over the card (after:inset-0).
                // Anchors cannot nest, so the mailto is a second link that
                // sits above the stretched one (relative z-10).
                <div className="relative mt-6 flex max-w-md items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm transition hover:shadow-md hover:ring-1 hover:ring-primary-200 focus-within:ring-2 focus-within:ring-primary-500">
                  <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                    <img src={assetUrl(contact.photo)} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                      {pick('Operations & contact', 'Betrieb & Kontakt')}
                    </p>
                    <p className="mt-0.5 text-sm font-bold leading-tight text-slate-950">
                      <Link to={memberLink(contact)} className="transition after:absolute after:inset-0 after:rounded-xl after:content-[''] hover:text-primary-700 focus:outline-none">{contact.name}</Link>
                      <span className="text-slate-300"> · </span>
                      <span className="text-xs font-semibold text-slate-500">{pick('PhD candidate', 'Doktorand')}</span>
                    </p>
                    {/* Research leads the title so the scientific side reads
                        first; "Coordinator" keeps it clear this is not a PI
                        slot. No "·" before the mailto: the row wraps at narrow
                        widths and a dangling separator reads as a bug. */}
                    <p className="flex flex-wrap items-center gap-x-3 text-xs font-semibold text-slate-500">
                      <span>{pick('Research & Operations Coordinator', 'Forschung & Betrieb')}</span>
                      {contact.email && (
                        <a href={`mailto:${contact.email}`} className="relative z-10 font-bold text-primary-700 underline decoration-primary-200 underline-offset-2 transition hover:decoration-primary-500">
                          {pick('email', 'E-Mail')}
                        </a>
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-950">{pick('Participating researchers', 'Beteiligte Forschende')}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {pick(
                  'Our labs operate as a unified distributed entity, sharing resources, data, and expertise to accelerate discovery.',
                  'Unsere Labore arbeiten als verteilte Einheit, die Ressourcen, Daten und Expertise teilt, um Forschung zu beschleunigen.',
                )}
              </p>
              <div className="mt-6 space-y-5">
                {principalInvestigators.map((pi) => (
                  <Link
                    key={pi.id}
                    to={memberLink(pi)}
                    className="flex items-center gap-4 rounded-xl bg-white p-3 shadow-sm transition hover:shadow-md hover:ring-1 hover:ring-primary-200"
                  >
                    <div className="h-14 w-14 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                      <img src={assetUrl(pi.photo)} alt={pi.name} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-950">{pi.prefix ? `${pi.prefix} ${pi.name}` : pi.name}</p>
                      <p className="text-xs font-semibold text-primary-700">{pick('Principal Investigator', 'Principal Investigator')}</p>
                      <p className="mt-0.5 text-xs font-semibold text-slate-500">{pi.affiliations[0].institution.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <DemonstrationsSection priority tightTop />

      {/* In preparation: an entry for the part of the labs Kai Kunze's group
          will add. Deliberately small: a dashed card, no pictures, no
          carousel. It grows into a section when there is something to show. */}
      <section id="augmentation" className="scroll-mt-24 border-t border-slate-100 bg-white py-10 md:py-12">
        <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
          <div className="flex flex-col gap-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 md:flex-row md:items-center md:justify-between md:p-7">
            <div className="max-w-2xl">
              <p className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden="true" />
                {pick('Under construction', 'Im Aufbau')}
              </p>
              <h2 className="text-xl font-heading font-bold tracking-tight text-slate-950 md:text-2xl">{pick(AUGMENTATION.title[1], AUGMENTATION.title[0])}</h2>
              <p className="mt-1.5 text-sm leading-6 text-slate-600">{pick(AUGMENTATION.text[1], AUGMENTATION.text[0])}</p>
            </div>
            {augmentationLead && (
              <Link
                to={memberLink(augmentationLead)}
                className="flex w-fit shrink-0 items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 pr-5 shadow-sm transition hover:shadow-md hover:ring-1 hover:ring-primary-200"
              >
                <span className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                  <img src={assetUrl(augmentationLead.photo)} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-slate-950">{augmentationLead.prefix ? `${augmentationLead.prefix} ${augmentationLead.name}` : augmentationLead.name}</span>
                  <span className="block text-xs font-semibold text-slate-500">{augmentationLead.affiliations[0].institution.name}</span>
                </span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* The papers that fit CORE Labs, in a carousel: a list of them took a
          screen and a half. It stands above the Cluj block: papers are what
          many visitors come for, the block below announces something that is
          not there yet. */}
      <section id="publications" className="scroll-mt-24 border-t border-slate-100 bg-gradient-to-br from-white via-slate-50 to-white py-10 md:py-14">
        <div className="container mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[1fr_0.82fr] md:items-center md:px-12 lg:px-20">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary-700">CORE Labs</p>
            <h2 className="mb-4 text-3xl font-heading font-bold leading-tight tracking-tight text-slate-950 md:text-4xl">{pick('Research publications', 'Forschungspublikationen')}</h2>
            <p className="text-sm leading-6 text-slate-600">
              {pick(
                'Papers from the network on robots, autonomous systems and the vision they need. The publication list has every paper of the CORE Network, on all topics.',
                'Arbeiten aus dem Netzwerk zu Robotern, autonomen Systemen und dem Sehen, das sie brauchen. Die Publikationsliste enthält alle Arbeiten des CORE Network, zu allen Themen.',
              )}
            </p>
            <Link to={`/publications?topic=${LAB_TOPICS[0]}`} className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-primary-700">
              {pick('See all of them', 'Alle ansehen')}
              <FaArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>
          <div className="mx-auto w-full max-w-lg rounded-2xl border border-white bg-white/75 p-2 shadow-xl shadow-slate-200/70 ring-1 ring-slate-200/70 backdrop-blur">
            <PublicationsSection layout="rotator" title="" subtitle="" compact compactHeightClass="h-[220px]" initialTopics={LAB_TOPICS} sectionId={null} />
          </div>
        </div>
      </section>

      {/* The Cluj laboratory's humanoid platform. Everything about the labs
          lives on this page; the Cluj group's own page (/ubb) links here.
          The photos stay blurred until the platform is announced. */}
      <section id="cluj" className="scroll-mt-24 border-t border-slate-100 bg-slate-950 py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary-300">CORE Labs · Cluj-Napoca</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">{pick('Humanoid robotics in Cluj', 'Humanoide Robotik in Cluj')}</h2>
              <p className="mt-5 text-base leading-8 text-slate-300">
                {pick(
                  'The Cluj laboratory is preparing a new humanoid robotics research platform around the Unitree R1 for embodied AI, locomotion, and human–robot interaction.',
                  'Das Labor in Cluj bereitet eine neue Forschungsplattform für humanoide Robotik rund um den Unitree R1 vor: für Embodied AI, Fortbewegung und Mensch-Roboter-Interaktion.',
                )}
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                <a
                  href="https://www.unitree.com/R1/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-fit items-center gap-2 text-sm font-semibold text-white transition hover:text-primary-300"
                >
                  {pick('Explore the Unitree R1', 'Zum Unitree R1')}
                  <FaArrowRight className="-rotate-45 text-xs" aria-hidden="true" />
                </a>
                <Link to="/ubb" className="flex w-fit items-center gap-2 text-sm font-semibold text-white transition hover:text-primary-300">
                  {pick('The group in Cluj', 'Die Gruppe in Cluj')}
                  <FaArrowRight className="text-xs" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="relative min-h-[24rem] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-2xl shadow-black/30">
              <div className="absolute inset-0 grid scale-[1.04] grid-cols-[1.35fr_0.65fr] gap-2 p-2 blur-[9px]" aria-hidden="true">
                <img src={assetUrl('/images/ubb/unitree-r1-lab-wide.webp')} alt="" loading="lazy" decoding="async" className="h-full w-full rounded-[1.5rem] object-cover" />
                <img src={assetUrl('/images/ubb/unitree-r1-lab-detail.webp')} alt="" loading="lazy" decoding="async" className="h-full w-full rounded-[1.5rem] object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-950/20" />
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="max-w-sm rounded-2xl border border-white/15 bg-slate-950/75 p-6 text-center shadow-xl backdrop-blur-xl">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-primary-300/30 bg-primary-300/10 text-primary-300">
                    <FaLock aria-hidden="true" />
                  </div>
                  <p className="mt-4 text-sm font-bold uppercase tracking-[0.18em]">{pick('Lab integration in progress', 'Labor im Aufbau')}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {pick(
                      'Experiments, capabilities, and platform details will be revealed soon.',
                      'Experimente, Fähigkeiten und Details zur Plattform folgen in Kürze.',
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CoreLabs
