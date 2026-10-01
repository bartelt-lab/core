import { Link } from 'react-router-dom'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import HeroVideo from '../../components/hero/HeroVideo'
import ProjectPeople from '../../components/common/ProjectPeople'
import { cognitiveProjects } from '../../data/demonstrations'
import { useLanguage } from '../../i18n/useLanguage'
import useInstitution from '../../hooks/useInstitution'
import assetUrl from '../../utils/assetUrl'

const RoboticsLab = () => {
  const { pick } = useLanguage()
  const { withInstitution } = useInstitution()

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <section className="relative flex min-h-[650px] items-end overflow-hidden pb-16 pt-48 md:min-h-[760px] md:pb-20">
        <HeroVideo src={assetUrl('/videos/core-labs-hero.mp4')} poster={assetUrl('/videos/hero-poster.webp')} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/20" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10">
          <p className="text-sm font-semibold text-primary-200">TU Clausthal · Goslar</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-white md:text-6xl">CORE Robotics Lab</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
            {pick(
              'We connect perception, reasoning, and action to build robots that learn and work in changing environments.',
              'Wir verbinden Wahrnehmung, Schlussfolgern und Handeln, damit Roboter in wechselnden Umgebungen lernen und arbeiten können.',
            )}
          </p>
          <Link to={withInstitution('/labs')} className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary-700 hover:bg-primary-50">
            <FaArrowLeft className="h-3 w-3" aria-hidden="true" /> {pick('All labs', 'Alle Labore')}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <h2 className="text-3xl font-bold">{pick('From simulation to the lab', 'Von der Simulation ins Labor')}</h2>
          <p className="text-lg leading-8 text-slate-600">
            {pick(
              'Our projects study mobile navigation, robot manipulation, and human–robot interaction. They combine learning methods with physical platforms, including the Ridgeback mobile base, the Unitree G1 humanoid, and the SO-101 arm.',
              'Unsere Projekte untersuchen mobile Navigation, Robotermanipulation und Mensch-Roboter-Interaktion. Sie verbinden Lernverfahren mit realen Plattformen, darunter die mobile Ridgeback-Basis, der Unitree-G1-Humanoid und der SO-101-Arm.',
            )}
          </p>
        </div>
        <div className="mt-14 space-y-10">
          {cognitiveProjects.filter((project) => !project.isTeaser).map((project) => (
            <article key={project.id} className="grid gap-7 border-t border-slate-200 pt-10 md:grid-cols-[0.85fr_1.15fr]">
              <Link to={withInstitution(project.link)} className="aspect-video overflow-hidden rounded-2xl bg-slate-100">
                <img src={assetUrl(project.image)} alt={project.title} loading="lazy" decoding="async" className="h-full w-full object-cover" style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined} />
              </Link>
              <div>
                <h3 className="text-2xl font-bold"><Link to={withInstitution(project.link)} className="hover:text-primary-700">{project.title}</Link></h3>
                <p className="mt-4 text-base leading-7 text-slate-600">{project.description}</p>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-5">
                  <Link to={withInstitution(project.link)} className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-900">
                    {pick('View project and experiments', 'Projekt und Experimente ansehen')} <FaArrowRight className="h-3 w-3" aria-hidden="true" />
                  </Link>
                  <ProjectPeople slugs={project.people || []} label={pick('Team', 'Team')} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-primary-50/50 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2 md:px-10">
          <div>
            <h2 className="text-2xl font-bold">{pick('Student research in the lab', 'Studentische Forschung im Labor')}</h2>
            <p className="mt-4 leading-7 text-slate-600">{pick('AI Team Projects connect students with current research, including visual human awareness estimation for mobile robots.', 'AI-Team-Projekte bringen Studierende mit aktueller Forschung zusammen, etwa zur visuellen Erkennung menschlicher Aufmerksamkeit gegenüber mobilen Robotern.')}</p>
            <Link to={withInstitution('/teaching#student-projects')} className="mt-5 inline-flex text-sm font-semibold text-primary-700 hover:text-primary-900">{pick('Explore AI Team Projects', 'AI-Team-Projekte entdecken')}</Link>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{pick('People and research', 'Menschen und Forschung')}</h2>
            <p className="mt-4 leading-7 text-slate-600">{pick('The lab is part of the shared CORE Labs programme with teams in Cluj-Napoca and Rostock.', 'Das Labor gehört zum gemeinsamen CORE-Labs-Programm mit Teams in Cluj-Napoca und Rostock.')}</p>
            <div className="mt-5 flex flex-wrap gap-5 text-sm font-semibold text-primary-700">
              <Link to={withInstitution('/team')} className="hover:text-primary-900">{pick('Team and contact', 'Team und Kontakt')}</Link>
              <Link to={withInstitution('/research')} className="hover:text-primary-900">{pick('Research and publications', 'Forschung und Publikationen')}</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RoboticsLab
