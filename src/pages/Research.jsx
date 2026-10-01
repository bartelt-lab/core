import { Link } from 'react-router-dom'
import { FaArrowRight, FaBrain, FaCar, FaCode, FaCommentDots, FaRobot } from 'react-icons/fa'
import PublicationsSection from '../components/publications/PublicationsSection'
import { researchThemes } from '../data/researchThemes'
import useInstitution from '../hooks/useInstitution'
import { useLanguage } from '../i18n/useLanguage'
import { institutionLabel, matchesInstitution } from '../utils/institutions'

const themeIcons = {
  'machine-learning': FaBrain,
  'language-models': FaCommentDots,
  'software-engineering': FaCode,
  'cognitive-robotics': FaRobot,
  'autonomous-driving': FaCar,
}

const Research = () => {
  const { institution, withInstitution } = useInstitution()
  const { pick } = useLanguage()
  const themes = researchThemes.filter((theme) => matchesInstitution(theme.institutionIds, institution))

  return (
    <div className="min-h-screen bg-white">
      <section id="hero" className="border-b border-slate-200 bg-primary-50/50">
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-44 md:px-10 md:pb-16 md:pt-48">
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">{pick('Research', 'Forschung')}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {pick(
              'Our research connects cognitive software, machine learning, and autonomous systems. Explore our topics and publications across the network.',
              'Unsere Forschung verbindet kognitive Software, Machine Learning und autonome Systeme. Entdecke unsere Themen und Publikationen im gesamten Netzwerk.',
            )}
          </p>
          <Link to={withInstitution('/research#publications')} className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary-700 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-800">
            {pick('Browse publications', 'Publikationen ansehen')}
            <FaArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section id="topics" className="scroll-mt-40 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
          <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">{pick('Research topics', 'Forschungsthemen')}</h2>
          <p className="mt-3 text-sm text-slate-500" role="status">
            {institution === 'all'
              ? pick('Across all CORE institutions', 'An allen CORE-Institutionen')
              : institutionLabel(institution)}
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {themes.map((theme) => {
              const Icon = themeIcons[theme.id]
              return (
                <article key={theme.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <Icon className="mb-5 h-6 w-6 text-primary-700" aria-hidden="true" />
                  <h3 className="text-lg font-bold leading-7 text-slate-950">{pick(...theme.title)}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{pick(...theme.description)}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {theme.institutionIds.map((id) => (
                      <span key={id} className="rounded-full border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600">{institutionLabel(id)}</span>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <PublicationsSection
        institution={institution}
        layout="cards"
        showFilters
        title={pick('Publications', 'Publikationen')}
        subtitle={pick('Research output', 'Forschungsergebnisse')}
      />
    </div>
  )
}

export default Research
