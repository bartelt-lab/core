import { Link } from 'react-router-dom';
import { FiArrowRight, FiArrowUpRight, FiMail, FiShield } from 'react-icons/fi';
import { useLanguage } from '../../i18n/useLanguage';
import { projects, domainClass } from '../../data/industryProjects';
import PartnerLogoStrip from '../../components/tuc/PartnerLogoStrip';

const txt = (pick, pair) => pick(pair[1], pair[0]);

const PhysicalSignalVisual = ({ pick }) => (
    <div className="flex h-full min-h-[220px] flex-col justify-between bg-slate-950 p-6 text-white">
        <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-300">
                <FiShield className="h-4 w-4" aria-hidden="true" />
                {pick('Signal fingerprint', 'Signal-Fingerabdruck')}
            </div>
            <p className="max-w-sm text-sm leading-6 text-slate-300">
                {pick(
                    'Sensors are evaluated as a connected physical system so manipulated individual signals become visible in spatial context.',
                    'Sensoren werden als verbundenes physikalisches System bewertet, sodass manipulierte Einzelsignale im Raumkontext auffallen.',
                )}
            </p>
        </div>
        <div className="grid grid-cols-4 items-end gap-3">
            {[72, 46, 88, 58, 64, 36, 80, 52].map((height, index) => (
                <div key={height + index} className="flex flex-col items-center gap-2">
                    <div className={`w-full rounded-sm ${index === 5 ? 'bg-rose-400' : 'bg-primary-400'}`} style={{ height }} />
                    <span className={`h-2 w-2 rounded-full ${index === 5 ? 'bg-rose-400' : 'bg-slate-500'}`} />
                </div>
            ))}
        </div>
    </div>
);

const ProjectVisual = ({ project, pick }) => {
    if (!project.visual) return <PhysicalSignalVisual pick={pick} />;

    return (
        <img
            src={project.visual}
            alt={pick(`Project visualization for ${project.title}`, `Projektvisualisierung zu ${project.title}`)}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
        />
    );
};

const IndustryProjects = () => {
    const { pick } = useLanguage();

    return (
        <>
            <section className="border-b border-slate-200 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
                        {pick('Transfer & public funding', 'Transfer & öffentliche Förderung')}
                    </p>
                    <h1 className="max-w-3xl text-3xl font-bold leading-tight text-slate-900 sm:text-5xl">
                        {pick('Industry Projects', 'Industrieprojekte')}
                    </h1>
                    <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                        {pick(
                            'We develop applied AI systems in publicly funded and industry-oriented transfer projects. The focus is on robust demonstrators, understandable AI architectures, and solutions that must work in real processes across construction, healthcare, circular economy, retail, and IoT security.',
                            'Wir entwickeln angewandte KI-Systeme in öffentlich geförderten und industrienahen Transferprojekten. Im Mittelpunkt stehen robuste Demonstratoren, nachvollziehbare KI-Architekturen und Lösungen, die in realen Abläufen von Bauwesen, Gesundheit, Kreislaufwirtschaft, Handel und IoT-Sicherheit bestehen müssen.',
                        )}
                    </p>
                </div>
            </section>

            <section className="bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project) => (
                            <article
                                key={project.slug}
                                className={`flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm ${
                                    project.href ? 'group relative transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary-500' : ''
                                }`}
                            >
                                <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                                    <ProjectVisual project={project} pick={pick} />
                                </div>
                                <div className="flex flex-1 flex-col p-5">
                                    <div className="mb-4">
                                        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${domainClass(project.domain[0])}`}>
                                            {txt(pick, project.domain)}
                                        </span>
                                    </div>

                                    <h2 className="text-xl font-bold text-slate-900">
                                        {project.href ? (
                                            // Stretched link: the ::after overlay makes the whole tile clickable,
                                            // while the partner logos (z-10) keep their own links.
                                            <Link
                                                to={project.href}
                                                className="transition-colors after:absolute after:inset-0 after:content-[''] focus:outline-none group-hover:text-primary-700"
                                            >
                                                {project.title}
                                            </Link>
                                        ) : (
                                            project.title
                                        )}
                                    </h2>
                                    <p className="mt-2 text-sm font-semibold text-primary-700">{txt(pick, project.topic)}</p>
                                    <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                                        <p>{txt(pick, project.summary)}</p>
                                        <p>{txt(pick, project.contribution)}</p>
                                    </div>

                                    <div className={project.href ? 'relative z-10' : undefined}>
                                        <PartnerLogoStrip partners={project.partners} />
                                    </div>

                                    <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-slate-200 pt-5 text-xs">
                                        <div>
                                            <dt className="font-semibold uppercase tracking-wide text-slate-400">{pick('Funding', 'Förderung')}</dt>
                                            <dd className="mt-1 font-semibold text-slate-800">{txt(pick, project.fundingProgram)}</dd>
                                        </div>
                                        <div>
                                            <dt className="font-semibold uppercase tracking-wide text-slate-400">Budget</dt>
                                            <dd className="mt-1 font-semibold text-slate-800">{txt(pick, project.budget)}</dd>
                                        </div>
                                        <div>
                                            <dt className="font-semibold uppercase tracking-wide text-slate-400">{pick('Duration', 'Laufzeit')}</dt>
                                            <dd className="mt-1 font-semibold text-slate-800">{txt(pick, project.duration)}</dd>
                                        </div>
                                    </dl>

                                    {project.href && (
                                        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700">
                                            {pick('Learn more', 'Mehr erfahren')}
                                            <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                                        </span>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                    <div className="grid gap-6 rounded-lg border border-slate-200 bg-slate-900 p-6 text-white sm:p-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                                {pick('Transfer with public and industry partners', 'Transfer mit öffentlichen und industriellen Partnern')}
                            </p>
                            <h2 className="mt-2 text-2xl font-bold">{pick('Interested in a transfer project?', 'Interesse an einem Transferprojekt?')}</h2>
                            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                                {pick(
                                    'We support partners from feasibility studies through publicly funded collaborative projects to robust AI demonstrators.',
                                    'Wir begleiten Partner von der Machbarkeitsstudie über öffentlich geförderte Verbundprojekte bis zum belastbaren KI-Demonstrator.',
                                )}
                            </p>
                        </div>
                        <a
                            href="mailto:bartelt@isse.tu-clausthal.de"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-primary-100"
                        >
                            <FiMail className="h-4 w-4" aria-hidden="true" />
                            {pick('Get in touch', 'Kontakt aufnehmen')}
                            <FiArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};

export default IndustryProjects;
