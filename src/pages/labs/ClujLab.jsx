import { Link } from 'react-router-dom'
import { FaArrowLeft, FaArrowRight, FaLock } from 'react-icons/fa'
import { autonomousDemonstrations } from '../../data/demonstrations'
import { useLanguage } from '../../i18n/useLanguage'
import useInstitution from '../../hooks/useInstitution'
import assetUrl from '../../utils/assetUrl'

const ClujLab = () => {
  const { pick } = useLanguage()
  const { withInstitution } = useInstitution()

  return (
    <div className="theme-ubb min-h-screen bg-white text-slate-950">
      <header className="relative overflow-hidden border-b border-slate-200 pb-16 pt-44 md:pb-20 md:pt-48">
        <div className="lab-hero-wash absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-6 md:px-10">
          <Link to={withInstitution('/labs')} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-primary-700 hover:border-primary-600">
            <FaArrowLeft className="h-3 w-3" aria-hidden="true" /> {pick('All labs', 'Alle Labore')}
          </Link>
          <div className="mt-10 grid items-center gap-8 md:grid-cols-[1.3fr_0.7fr]">
            <div>
              <p className="text-sm font-semibold text-site-900">Babeș-Bolyai University · Cluj-Napoca</p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
                CORE Labs <span className="wordmark-partnership inline-block bg-clip-text text-transparent">Cluj</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                {pick(
                  'Joint research in autonomous systems, intelligent simulation, and robot learning. Our autonomous driving programme is joined by a new humanoid robotics platform, currently in preparation.',
                  'Gemeinsame Forschung an autonomen Systemen, intelligenter Simulation und Roboterlernen. Unser Programm zum autonomen Fahren wird um eine neue Humanoid-Robotik-Plattform erweitert, die derzeit im Aufbau ist.',
                )}
              </p>
            </div>
            <div className="flex items-center justify-start gap-7 md:justify-center">
              <img src={assetUrl('/logos/ubb-logo-only.webp')} width="88" height="88" alt="Babeș-Bolyai University" className="h-20 w-20 object-contain" />
              <span className="h-16 w-px bg-site-200" aria-hidden="true" />
              <img src={assetUrl('/logos/core/avocando-icon.svg')} width="80" height="80" alt="CORE Network" className="h-20 w-20 object-contain" />
            </div>
          </div>
        </div>
      </header>

      <section id="humanoid" className="scroll-mt-40 bg-slate-950 py-16 text-white md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 md:px-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold text-site-300">{pick('Platform in development', 'Plattform im Aufbau')}</p>
            <h2 className="mt-3 text-3xl font-bold">{pick('Humanoid robotics', 'Humanoide Robotik')}</h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              {pick(
                'CORE Labs Cluj is preparing a research platform around the Unitree R1 for embodied AI, locomotion, and human–robot interaction. Lab integration is in progress; experiments and platform details will follow.',
                'CORE Labs Cluj bereitet eine Forschungsplattform rund um den Unitree R1 für verkörperte KI, Fortbewegung und Mensch-Roboter-Interaktion vor. Die Einbindung ins Labor läuft; Experimente und Plattformdetails folgen.',
              )}
            </p>
            <a href="https://www.unitree.com/R1/" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-200 hover:text-white">
              {pick('Explore the Unitree R1', 'Den Unitree R1 entdecken')} <FaArrowRight className="h-3 w-3 -rotate-45" aria-hidden="true" />
            </a>
          </div>
          <div className="relative min-h-[22rem] overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
            <div className="absolute inset-0 grid scale-[1.04] grid-cols-[1.35fr_0.65fr] gap-2 p-2 blur-[9px]" aria-hidden="true">
              <img src={assetUrl('/images/ubb/unitree-r1-lab-wide.webp')} alt="" loading="lazy" decoding="async" className="h-full w-full rounded-xl object-cover" />
              <img src={assetUrl('/images/ubb/unitree-r1-lab-detail.webp')} alt="" loading="lazy" decoding="async" className="h-full w-full rounded-xl object-cover" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950/30 p-6">
              <div className="max-w-sm rounded-2xl border border-white/15 bg-slate-950/85 p-6 text-center backdrop-blur">
                <FaLock className="mx-auto h-5 w-5 text-site-300" aria-hidden="true" />
                <p className="mt-4 font-semibold">{pick('Lab integration in progress', 'Laborintegration läuft')}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{pick('Experiments, capabilities, and platform details will be revealed soon.', 'Experimente, Fähigkeiten und Plattformdetails werden bald vorgestellt.')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="autonomous" className="scroll-mt-40 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <p className="text-sm font-semibold text-site-900">{pick('Established research programme', 'Etabliertes Forschungsprogramm')}</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">{pick('Autonomous driving', 'Autonomes Fahren')}</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {pick(
              'The Cluj lab connects intelligent vehicle vision, modular simulation, scenario generation, planning, and physical 1:10-scale research platforms.',
              'Das Labor in Cluj verbindet intelligente Fahrzeugwahrnehmung, modulare Simulation, Szenariogenerierung, Planung und reale Forschungsplattformen im Maßstab 1:10.',
            )}
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {autonomousDemonstrations.map((demo) => (
              <article key={demo.id} className="overflow-hidden rounded-2xl border border-slate-200">
                <div className="aspect-video bg-slate-950">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${demo.youtubeId}?rel=0`}
                    title={demo.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full border-0"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm font-semibold text-site-900">{demo.category}</p>
                  <h3 className="mt-2 text-xl font-bold">{demo.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{demo.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-site-100/40 py-14 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2 md:px-10">
          <div>
            <h2 className="text-2xl font-bold">{pick('Research and publications', 'Forschung und Publikationen')}</h2>
            <p className="mt-4 leading-7 text-slate-600">{pick('Explore the research topics and publications from Babeș-Bolyai University across the CORE Network.', 'Entdecke die Forschungsthemen und Publikationen der Babeș-Bolyai University im CORE Network.')}</p>
            <Link to="/research?institution=UBB" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-900">
              {pick('Research at UBB', 'Forschung an der UBB')} <FaArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>
          <div>
            <h2 className="text-2xl font-bold">AI Team Projects</h2>
            <p className="mt-4 leading-7 text-slate-600">{pick('Students from UBB and TU Clausthal work together on AI systems, with onsite project weeks in Cluj and Goslar.', 'Studierende der UBB und der TU Clausthal entwickeln gemeinsam KI-Systeme, mit Projektwochen vor Ort in Cluj und Goslar.')}</p>
            <div className="mt-5 flex flex-wrap gap-5 text-sm font-semibold text-primary-700">
              <Link to={withInstitution('/teaching#student-projects')} className="hover:text-primary-900">{pick('Projects and registration', 'Projekte und Anmeldung')}</Link>
              <Link to="/team?institution=UBB" className="hover:text-primary-900">{pick('Meet the team', 'Das Team kennenlernen')}</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ClujLab
