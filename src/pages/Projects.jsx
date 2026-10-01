import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import { FiMail, FiShield } from 'react-icons/fi'
import { industryPartnerLogos, industryProjects, researchProjects } from '../data/projectCatalog'
import useInstitution from '../hooks/useInstitution'
import { useLanguage } from '../i18n/useLanguage'
import assetUrl from '../utils/assetUrl'
import { institutionLabel, matchesInstitution } from '../utils/institutions'

const InstitutionTags = ({ ids }) => (
  <div className="flex flex-wrap gap-2">
    {ids.map((id) => (
      <span key={id} className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-600">{institutionLabel(id)}</span>
    ))}
  </div>
)

const Partner = ({ name }) => {
  const logo = industryPartnerLogos[name]
  const content = logo
    ? <img src={logo.src} alt={logo.alt} loading="lazy" decoding="async" className="max-h-8 max-w-[6rem] object-contain" />
    : <span className="text-xs font-semibold text-slate-600">{name}</span>

  return logo?.href
    ? <a href={logo.href} target="_blank" rel="noreferrer" title={name} className="inline-flex min-h-10 items-center transition-opacity hover:opacity-70">{content}</a>
    : <span title={name} className="inline-flex min-h-10 items-center">{content}</span>
}

const Projects = () => {
  const { institution, withInstitution } = useInstitution()
  const { pick } = useLanguage()
  const research = researchProjects.filter((project) => matchesInstitution(project.institutionIds, institution))
  const industry = industryProjects.filter((project) => matchesInstitution(project.institutionIds, institution))
  // Industry content keeps its original [German, English] text pairs.
  const text = (pair) => pick(pair[1], pair[0])

  return (
    <div className="min-h-screen bg-white">
      <section id="hero" className="border-b border-slate-200 bg-primary-50/50">
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-44 md:px-10 md:pb-16 md:pt-48">
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">{pick('Projects', 'Projekte')}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {pick(
              'Research in practice: explore our research projects and our work with industry and public partners.',
              'Forschung in der Praxis: Entdecke unsere Forschungsprojekte und unsere Zusammenarbeit mit Industrie und öffentlichen Partnern.',
            )}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to={withInstitution('/projects#research-projects')} className="rounded-full bg-primary-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-800">
              {pick('Research projects', 'Forschungsprojekte')}
            </Link>
            <Link to={withInstitution('/projects#industry-projects')} className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:border-primary-700 hover:text-primary-700">
              {pick('Industry projects', 'Industrieprojekte')}
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pt-8 text-sm text-slate-500" role="status">
        {pick(`${research.length + industry.length} projects`, `${research.length + industry.length} Projekte`)}
        {' · '}
        {institution === 'all' ? pick('All institutions', 'Alle Institutionen') : institutionLabel(institution)}
      </div>

      <section id="research-projects" className="scroll-mt-40 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-6 pb-14 pt-8 sm:pb-16">
          <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">{pick('Research projects', 'Forschungsprojekte')}</h2>
          {research.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {research.map((project) => (
                <article key={project.id} className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <Link to={withInstitution(project.link)} aria-label={project.title} className="group block aspect-[16/10] overflow-hidden bg-slate-100">
                    <img src={assetUrl(project.image)} alt={project.title} loading="lazy" decoding="async" className={`h-full w-full transition-transform duration-300 group-hover:scale-105 ${project.imageFit === 'contain' ? 'object-contain p-8' : 'object-cover'}`} style={{ objectPosition: project.imagePosition }} />
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <InstitutionTags ids={project.institutionIds} />
                    <h3 className="mt-4 text-xl font-bold text-slate-950">
                      <Link to={withInstitution(project.link)} className="transition-colors hover:text-primary-700">{project.title}</Link>
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{pick(project.description, project.descriptionDe || project.description)}</p>
                    <Link to={withInstitution(project.link)} className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-primary-700 hover:text-primary-800">
                      {pick('Explore project', 'Projekt ansehen')}
                      <FaArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm leading-7 text-slate-600">
              <p>{pick('No research projects are listed for this institution yet.', 'Für diese Institution sind derzeit keine Forschungsprojekte aufgeführt.')}</p>
              <Link to="/projects" className="mt-4 inline-flex font-semibold text-primary-700 hover:text-primary-800">
                {pick('Show all projects', 'Alle Projekte anzeigen')}
              </Link>
            </div>
          )}
        </div>
      </section>

      <section id="industry-projects" className="scroll-mt-40 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
          <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">{pick('Industry projects', 'Industrieprojekte')}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            {pick('Applied AI in publicly funded collaborations and industry transfer projects.', 'Angewandte KI in öffentlich geförderten Kooperationen und Transferprojekten mit der Industrie.')}
          </p>
          {industry.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {industry.map((project) => (
                <article key={project.slug} id={project.slug} className="scroll-mt-40 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                    {project.visual ? (
                      <img src={project.visual} alt={pick(`Project visualization for ${project.title}`, `Projektvisualisierung zu ${project.title}`)} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full flex-col justify-end bg-slate-950 p-6 text-white">
                        <FiShield className="mb-4 h-8 w-8 text-primary-300" aria-hidden="true" />
                        <p className="text-sm font-semibold">{pick('Signal fingerprints for IoT security', 'Signal-Fingerabdrücke für IoT-Sicherheit')}</p>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <InstitutionTags ids={project.institutionIds} />
                    <p className="mt-4 text-xs font-semibold text-slate-500">{text(project.domain)}</p>
                    <h3 className="mt-1 text-xl font-bold text-slate-950">{project.title}</h3>
                    <p className="mt-2 text-sm font-semibold leading-6 text-primary-700">{text(project.topic)}</p>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{text(project.summary)}</p>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{text(project.contribution)}</p>
                    <div className="mt-5 flex flex-wrap items-center gap-4" aria-label={pick('Project partners', 'Projektpartner')}>
                      {project.partners.map((partner) => <Partner key={partner} name={partner} />)}
                    </div>
                    <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-200 pt-5 text-xs">
                      {[
                        [pick('Funding', 'Förderung'), text(project.fundingProgram)],
                        ['Budget', text(project.budget)],
                        [pick('Duration', 'Laufzeit'), text(project.duration)],
                      ].map(([label, value]) => (
                        <div key={label}>
                          <dt className="font-semibold text-slate-500">{label}</dt>
                          <dd className="mt-1 font-semibold leading-5 text-slate-800">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm leading-7 text-slate-600">
              <p>{pick('No industry projects are listed for this institution yet.', 'Für diese Institution sind derzeit keine Industrieprojekte aufgeführt.')}</p>
              <Link to="/projects" className="mt-4 inline-flex font-semibold text-primary-700 hover:text-primary-800">
                {pick('Show all projects', 'Alle Projekte anzeigen')}
              </Link>
            </div>
          )}
          {matchesInstitution(['TUC'], institution) && (
            <div className="mt-10 flex flex-col gap-5 rounded-2xl bg-slate-950 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <h3 className="text-xl font-bold">{pick('Interested in a transfer project?', 'Interesse an einem Transferprojekt?')}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{pick('Get in touch to discuss a collaboration.', 'Nimm Kontakt auf, um eine Zusammenarbeit zu besprechen.')}</p>
              </div>
              <a href="mailto:bartelt@isse.tu-clausthal.de" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-primary-50">
                <FiMail className="h-4 w-4" aria-hidden="true" />
                {pick('Get in touch', 'Kontakt aufnehmen')}
              </a>
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <Link to={withInstitution('/teaching#student-projects')} className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-800">
          {pick('Looking for student projects? Explore Teaching', 'Du suchst Studierendenprojekte? Zur Lehre')}
          <FaArrowRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

export default Projects
