import { Link } from 'react-router-dom'
import { FaArrowRight, FaServer } from 'react-icons/fa'
import { useLanguage } from '../i18n/useLanguage'
import useInstitution from '../hooks/useInstitution'
import { matchesInstitution } from '../utils/institutions'
import assetUrl from '../utils/assetUrl'
import { getMemberBySlug } from '../data/team'

// Roles preserved from the former CORE Labs overview.
const principalInvestigators = ['bartelt', 'kai-kunze', 'sacarea', 'ludtke'].map(getMemberBySlug).filter(Boolean)
const operationsContact = getMemberBySlug('szilagyi')

const labs = [
  {
    id: 'robotics',
    title: 'CORE Robotics Lab',
    location: 'TU Clausthal · Goslar',
    institutions: ['TUC'],
    image: '/videos/demonstrations/robotics/Lab4K.webp',
    description: 'Robot learning, mobile navigation, manipulation, and human–robot interaction, from simulation to experiments in the lab.',
    descriptionDe: 'Roboterlernen, mobile Navigation, Manipulation und Mensch-Roboter-Interaktion, von der Simulation bis zum Experiment im Labor.',
    link: '/labs/robotics',
  },
  {
    id: 'cluj',
    title: 'CORE Labs Cluj',
    location: 'Babeș-Bolyai University · Cluj-Napoca',
    institutions: ['UBB'],
    image: '/logos/ubb-logo.webp',
    description: 'An established autonomous driving programme and a new humanoid robotics platform around the Unitree R1, currently in preparation.',
    descriptionDe: 'Ein etabliertes Forschungsprogramm zum autonomen Fahren und eine neue Humanoid-Robotik-Plattform rund um den Unitree R1, derzeit im Aufbau.',
    link: '/labs/cluj',
  },
  {
    id: 'compute',
    title: 'Kaiser I Compute Cluster',
    location: 'TU Clausthal',
    institutions: ['TUC'],
    description: 'Shared GPU computing for training and evaluating AI models, with Slurm scheduling, research storage, and support for collaboration.',
    descriptionDe: 'Gemeinsame GPU-Rechenleistung für Training und Evaluation von KI-Modellen, mit Slurm-Verwaltung, Forschungsspeicher und Unterstützung für gemeinsame Projekte.',
    link: '/compute-cluster',
  },
]

const Labs = () => {
  const { pick } = useLanguage()
  const { institution, withInstitution } = useInstitution()
  const visibleLabs = labs.filter((lab) => matchesInstitution(lab.institutions, institution))
  const visibleInvestigators = principalInvestigators.filter((member) => matchesInstitution(member.affiliations.map((affiliation) => affiliation.institution.shortName), institution))

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <header className="border-b border-slate-200 bg-primary-50/50 pb-12 pt-44 md:pb-16 md:pt-48">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">Labs</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            {pick(
              'Explore the laboratories and computing infrastructure behind our work in cognitive systems.',
              'Entdecke die Labore und Recheninfrastruktur für unsere Forschung an kognitiven Systemen.',
            )}
          </p>
        </div>
      </header>

      <section aria-label={pick('Laboratories and infrastructure', 'Labore und Infrastruktur')} className="mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-20">
        {visibleLabs.length ? (
          <div className="space-y-8">
            {visibleLabs.map((lab) => (
              <article key={lab.id} className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white md:grid-cols-[0.8fr_1.2fr]">
                <div className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden ${lab.id === 'compute' ? 'bg-slate-950' : 'bg-slate-50'}`}>
                  {lab.image ? (
                    <img src={assetUrl(lab.image)} alt={lab.id === 'cluj' ? 'Babeș-Bolyai University' : 'Robotics laboratory with experimental platforms'} loading="lazy" decoding="async" className={`h-full w-full ${lab.id === 'cluj' ? 'object-contain p-12' : 'object-cover'}`} />
                  ) : (
                    <div className="text-center text-white">
                      <FaServer className="mx-auto h-16 w-16 text-primary-300" aria-hidden="true" />
                      <p className="mt-5 text-2xl font-semibold">Kaiser I</p>
                      <p className="mt-2 text-sm text-slate-300">GPU compute infrastructure</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-start p-7 md:p-9">
                  <p className="text-sm font-semibold text-slate-500">{lab.location}</p>
                  <h2 className="mt-3 text-2xl font-bold md:text-3xl">
                    <Link to={withInstitution(lab.link)} className="hover:text-primary-700">{lab.title}</Link>
                  </h2>
                  <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">{pick(lab.description, lab.descriptionDe)}</p>
                  <Link to={withInstitution(lab.link)} className="mt-6 inline-flex items-center gap-3 rounded-full bg-primary-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-800">
                    {lab.id === 'compute' ? pick('Explore the cluster', 'Cluster entdecken') : pick('Explore the lab', 'Labor entdecken')}
                    <FaArrowRight className="h-3 w-3" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 p-8">
            <h2 className="text-2xl font-bold">{pick('No lab page listed for this institution', 'Keine Laborseite für diese Institution eingetragen')}</h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">{pick('Rostock contributes to the shared CORE Labs programme. Explore the network’s laboratories and infrastructure below.', 'Rostock beteiligt sich am gemeinsamen CORE-Labs-Programm. Entdecke die Labore und Infrastruktur des Netzwerks.')}</p>
            <Link to="/labs" className="mt-6 inline-flex rounded-full bg-primary-700 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-800">{pick('Show all labs', 'Alle Labore anzeigen')}</Link>
          </div>
        )}
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[0.85fr_1.15fr] md:px-10">
          <h2 className="max-w-sm text-3xl font-bold">{pick('Shared across the CORE Network', 'Gemeinsam im CORE Network')}</h2>
          <div>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              {pick(
                'CORE Labs connects teams in Goslar, Cluj-Napoca, and Rostock through shared infrastructure, datasets, and jointly supervised student projects. Each location contributes to research in cognitive autonomous systems.',
                'CORE Labs verbindet Teams in Goslar, Cluj-Napoca und Rostock durch gemeinsame Infrastruktur, Datensätze und gemeinsam betreute studentische Projekte. Jeder Standort trägt zur Forschung an kognitiven autonomen Systemen bei.',
              )}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-primary-700">
              <Link to={withInstitution('/team')} className="hover:text-primary-900">{pick('Meet the team', 'Das Team kennenlernen')}</Link>
              <Link to={withInstitution('/teaching#student-projects')} className="hover:text-primary-900">AI Team Projects</Link>
              <Link to={withInstitution('/research')} className="hover:text-primary-900">{pick('Research and publications', 'Forschung und Publikationen')}</Link>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-6xl px-6 md:px-10">
          <div className="grid gap-8 border-t border-slate-200 pt-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <h3 className="text-lg font-bold">Principal Investigators</h3>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {visibleInvestigators.map((member) => (
                  <li key={member.slug}>
                    <Link to={withInstitution(`/team#member-${member.slug}`)} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition-colors hover:border-primary-600">
                      <img src={assetUrl(member.photo)} alt="" width="44" height="44" loading="lazy" decoding="async" className="h-11 w-11 shrink-0 rounded-full object-cover" />
                      <span>
                        <span className="block text-sm font-semibold text-slate-950">{member.prefix ? `${member.prefix} ${member.name}` : member.name}</span>
                        <span className="mt-1 block text-xs leading-5 text-slate-500">{member.affiliations[0].institution.name}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {operationsContact && (
              <div>
                <h3 className="text-lg font-bold">{pick('Research & Operations Coordinator', 'Koordination für Forschung & Betrieb')}</h3>
                <div className="mt-5 flex items-start gap-3">
                  <img src={assetUrl(operationsContact.photo)} alt="" width="44" height="44" loading="lazy" decoding="async" className="h-11 w-11 shrink-0 rounded-full object-cover" />
                  <div className="min-w-0">
                    <Link to={withInstitution(`/team#member-${operationsContact.slug}`)} className="text-sm font-semibold text-primary-700 hover:text-primary-900">{operationsContact.name}</Link>
                    <p className="mt-1 text-xs text-slate-500">{pick('PhD candidate', 'Doktorand')}</p>
                    {operationsContact.email && <a href={`mailto:${operationsContact.email}`} className="mt-2 inline-block break-all text-sm font-semibold text-primary-700 hover:underline">{operationsContact.email}</a>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Labs
