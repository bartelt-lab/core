import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'
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

const CoreLabs = () => {
  const { pick } = useLanguage()
  const members = getNetworkMembers()
  const principalInvestigators = PI_IDS.map((id) => members.find((m) => m.id === id)).filter(Boolean)
  const contact = members.find((m) => m.id === OPERATIONS_CONTACT_ID) || null

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
            <a href="#initiative" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-gray-950 shadow-lg transition hover:bg-primary-50">
              {pick('Explore the labs', 'Labore erkunden')}
              <FaArrowRight className="h-3 w-3" aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </section>

      <section id="initiative" className="border-t border-gray-100 bg-white pb-8 pt-14 md:pb-10 md:pt-20">
        <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_.95fr] lg:items-start">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-primary-700">{pick('The Initiative', 'Die Initiative')}</p>
              <h2 className="mb-5 text-4xl font-heading font-bold leading-tight tracking-tight text-gray-950 md:text-5xl">
                {pick('One lab across three cities', 'Ein Labor über drei Städte hinweg')}
              </h2>
              <p className="text-base leading-7 text-gray-700 md:text-lg md:leading-8">
                {pick(
                  'CORE Labs runs shared laboratories in Goslar, Cluj-Napoca, and Rostock as a single facility. A joint compute cluster, common datasets, and a co-supervised student project programme let teams collaborate across borders.',
                  'CORE Labs betreibt gemeinsame Labore in Goslar, Cluj-Napoca und Rostock als eine zusammenhängende Einrichtung. Ein gemeinsamer Rechencluster, gemeinsame Datensätze und co-betreute Studierendenprojekte ermöglichen grenzüberschreitende Zusammenarbeit.',
                )}
              </p>
              <p className="mt-4 text-base leading-7 text-gray-700 md:text-lg md:leading-8">
                {pick(
                  'This shared infrastructure turns three institutions into one coherent scientific platform for cognitive systems research.',
                  'Diese gemeinsame Infrastruktur macht aus drei Institutionen eine kohärente wissenschaftliche Plattform für Forschung an kognitiven Systemen.',
                )}
              </p>

              {contact && (
                // Affiliations are omitted on purpose — the institutions card
                // beside this block already names TUC and UBB.
                <div className="mt-6 flex max-w-md items-center gap-3 rounded-xl border border-gray-200 bg-white p-3.5 shadow-sm">
                  <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-gray-100">
                    <img src={assetUrl(contact.photo)} alt={contact.name} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
                      {pick('Operations & contact', 'Betrieb & Kontakt')}
                    </p>
                    <p className="mt-0.5 text-sm font-bold leading-tight text-gray-950">
                      {contact.name}
                      <span className="text-gray-300"> · </span>
                      <span className="text-xs font-semibold text-gray-500">{pick('PhD candidate', 'Doktorand')}</span>
                    </p>
                    {/* Research leads the title so the scientific side reads
                        first; "Coordinator" keeps it clear this is not a PI
                        slot. The Scholar link carries the publication record
                        by evidence rather than by adjective. */}
                    {/* No "·" separators: the row wraps at narrow widths and a
                        dangling separator at the break looks broken. Colour
                        alone (gray role, green links) carries the split. */}
                    <p className="flex flex-wrap items-center gap-x-3 text-xs font-semibold text-gray-500">
                      <span>{pick('Research & Operations Coordinator', 'Forschung & Betrieb')}</span>
                      {contact.email && (
                        <a href={`mailto:${contact.email}`} className="font-bold text-primary-700 underline decoration-primary-200 underline-offset-2 transition hover:decoration-primary-500">
                          {pick('email', 'E-Mail')}
                        </a>
                      )}
                      {contact.links?.scholar && (
                        <a href={contact.links.scholar} target="_blank" rel="noreferrer" className="font-bold text-primary-700 underline decoration-primary-200 underline-offset-2 transition hover:decoration-primary-500">
                          Scholar
                        </a>
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-950">{pick('Participating Institutions', 'Beteiligte Institutionen')}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                {pick(
                  'Our labs operate as a unified distributed entity, sharing resources, data, and expertise to accelerate discovery.',
                  'Unsere Labore arbeiten als verteilte Einheit, die Ressourcen, Daten und Expertise teilt, um Forschung zu beschleunigen.',
                )}
              </p>
              <div className="mt-6 space-y-5">
                {principalInvestigators.map((pi) => (
                  <div key={pi.id} className="flex items-center gap-4 rounded-xl bg-white p-3 shadow-sm">
                    <div className="h-14 w-14 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                      <img src={assetUrl(pi.photo)} alt={pi.name} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-950">{pi.prefix ? `${pi.prefix} ${pi.name}` : pi.name}</p>
                      <p className="text-xs font-semibold text-primary-700">{pick('Principal Investigator', 'Principal Investigator')}</p>
                      <p className="mt-0.5 text-xs font-semibold text-gray-400">{pi.affiliations[0].institution.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <DemonstrationsSection priority tightTop />

      <section id="publications" className="border-t border-gray-100 bg-gradient-to-br from-white via-slate-50 to-white py-10 md:py-14">
        <div className="container mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[1fr_0.82fr] md:items-center md:px-12 lg:px-20">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary-700">CORE Labs</p>
            <h2 className="mb-4 text-3xl font-heading font-bold leading-tight tracking-tight text-gray-950 md:text-4xl">{pick('Research publications', 'Forschungspublikationen')}</h2>
            <p className="text-sm leading-6 text-gray-600">
              {pick(
                'A rotating preview of recent publications connected to CORE Labs. Open the archive for the full publication list across the CORE Network.',
                'Eine rotierende Vorschau aktueller Publikationen mit Bezug zu CORE Labs. Öffnen Sie das Archiv für die vollständige Publikationsliste des CORE Network.',
              )}
            </p>
            <Link to="/publications" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gray-950 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-primary-700">
              {pick('View all publications', 'Alle Publikationen ansehen')}
              <FaArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>
          <div className="mx-auto w-full max-w-lg rounded-2xl border border-white bg-white/75 p-2 shadow-xl shadow-slate-200/70 ring-1 ring-slate-200/70 backdrop-blur">
            <PublicationsSection limit={4} layout="rotator" title="" subtitle="" compact compactHeightClass="h-[220px]" sectionId={null} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default CoreLabs
