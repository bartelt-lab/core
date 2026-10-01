import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../i18n/useLanguage'
import useInstitution from '../hooks/useInstitution'
import { matchesInstitution } from '../utils/institutions'
import TucTeaching from './tuc/Teaching'
import AiTeamProjects from './tuc/AiTeamProjects'

const sections = [
  { id: 'courses-overview', label: 'Courses', labelDe: 'Kurse', institutions: ['TUC'] },
  { id: 'seminars', label: 'Seminars', labelDe: 'Seminare', institutions: ['TUC'] },
  { id: 'theses', label: 'Theses', labelDe: 'Abschlussarbeiten', institutions: ['TUC'] },
  { id: 'student-projects', label: 'AI Team Projects', labelDe: 'AI-Team-Projekte', institutions: ['TUC', 'UBB'] },
]

const projectAnchors = new Set(['ai-team-projects', 'active-projects', 'testimonials', 'archive'])

const Teaching = () => {
  const { pick } = useLanguage()
  const { institution, withInstitution } = useInstitution()
  const { hash } = useLocation()
  const availableSections = sections.filter((section) => matchesInstitution(section.institutions, institution))
  const requestedSection = hash.slice(1)
  const sectionId = projectAnchors.has(requestedSection) ? 'student-projects' : requestedSection
  const activeSection = availableSections.find((section) => section.id === sectionId) || availableSections[0]

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <header className="border-b border-slate-200 bg-primary-50/50 pb-10 pt-44 md:pb-12 md:pt-48">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">{pick('Teaching', 'Lehre')}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            {pick(
              'Learn the foundations, explore a research question, or build an AI system with an international team.',
              'Grundlagen lernen, eine Forschungsfrage untersuchen oder gemeinsam in einem internationalen Team ein KI-System entwickeln.',
            )}
          </p>
          {availableSections.length > 0 && (
            <nav className="mt-8 flex flex-wrap gap-2" aria-label={pick('Teaching sections', 'Bereiche der Lehre')}>
              {availableSections.map((section) => (
                <Link
                  key={section.id}
                  to={withInstitution(`/teaching#${section.id}`)}
                  aria-current={activeSection.id === section.id ? 'page' : undefined}
                  className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-700 ${activeSection.id === section.id ? 'border-primary-700 bg-primary-700 text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-primary-600 hover:text-primary-700'}`}
                >
                  {pick(section.label, section.labelDe)}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>

      {!activeSection ? (
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
          <h2 className="text-2xl font-bold">{pick('No teaching listed for this institution', 'Keine Lehrangebote für diese Institution eingetragen')}</h2>
          <p className="mt-3 text-slate-600">{pick('Explore the courses and student projects across the network.', 'Entdecke Kurse und studentische Projekte im gesamten Netzwerk.')}</p>
          <Link to="/teaching" className="mt-6 inline-flex rounded-full bg-primary-700 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-800">
            {pick('Show all teaching', 'Alle Lehrangebote anzeigen')}
          </Link>
        </div>
      ) : activeSection.id === 'student-projects' ? (
        <div id="student-projects" className="scroll-mt-40">
          <span id="ai-team-projects" className="block scroll-mt-40" />
          <AiTeamProjects embedded />
        </div>
      ) : (
        <TucTeaching key={activeSection.id} initialSection={activeSection.id} embedded />
      )}
    </div>
  )
}

export default Teaching
