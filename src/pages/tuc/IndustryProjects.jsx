import { Link } from 'react-router-dom';
import { FiArrowRight, FiMail, FiMapPin, FiPlay, FiShield } from 'react-icons/fi';
import { useLanguage } from '../../i18n/useLanguage';
import { projects, domainClass } from '../../data/industryProjects';
import { videos } from '../../data/videos';
import PartnerLogoStrip from '../../components/tuc/PartnerLogoStrip';
import { PageShell, Section, Card, ContactBand } from '../../components/tuc/ui';

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

const formatDuration = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.round(seconds % 60)).padStart(2, '0')}`;

const ProjectFacts = ({ project, pick, className = '' }) => (
    <dl className={`grid grid-cols-3 gap-3 text-xs ${className}`}>
        <div>
            <dt className="font-semibold uppercase tracking-wide text-slate-500">{pick('Funding', 'Förderung')}</dt>
            <dd className="mt-1 font-semibold text-slate-800">{txt(pick, project.fundingProgram)}</dd>
        </div>
        <div>
            <dt className="font-semibold uppercase tracking-wide text-slate-500">Budget</dt>
            <dd className="mt-1 font-semibold text-slate-800">{txt(pick, project.budget)}</dd>
        </div>
        <div>
            <dt className="font-semibold uppercase tracking-wide text-slate-500">{pick('Duration', 'Laufzeit')}</dt>
            <dd className="mt-1 font-semibold text-slate-800">{txt(pick, project.duration)}</dd>
        </div>
    </dl>
);

/** One image in the featured card's mosaic. Zooms slightly while the card is hovered. */
const GalleryTile = ({ image, pick, className = '', children }) => (
    <figure className={`relative overflow-hidden rounded-lg bg-slate-800 ${className}`}>
        <img
            src={image.src}
            alt={txt(pick, image.alt)}
            width="1600"
            height="900"
            loading="lazy"
            decoding="async"
            style={image.focus ? { objectPosition: image.focus } : undefined}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent" />
        <figcaption className="absolute bottom-2 left-2.5 right-2.5 text-[11px] font-semibold leading-4 text-white sm:bottom-3 sm:left-3 sm:text-xs">
            {txt(pick, image.label)}
        </figcaption>
        {children}
    </figure>
);

/**
 * Large card above the grid for the project whose data carries `feature`.
 * Same stretched-link pattern as the tiles: the title link covers the card,
 * the partner logos sit above it (z-10) and keep their own links.
 */
const FeaturedProject = ({ project, pick }) => {
    const [main, ...thumbs] = project.feature.gallery;
    const film = project.feature.film && videos.find((v) => v.id === project.feature.film);

    return (
        <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-[0_24px_60px_-28px_rgb(var(--primary-700)/0.45)] focus-within:ring-2 focus-within:ring-primary-500 lg:grid lg:grid-cols-2">
            <div className="grid grid-cols-3 gap-1.5 bg-slate-950 p-1.5 sm:gap-2 sm:p-2 lg:order-2 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] lg:grid-rows-3">
                <GalleryTile image={main} pick={pick} className="col-span-3 aspect-[16/9] lg:col-span-1 lg:row-span-3 lg:aspect-auto">
                    {film && (
                        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur sm:left-4 sm:top-4">
                            <FiPlay className="h-3.5 w-3.5 text-primary-700" aria-hidden="true" />
                            {pick('Project film', 'Projektfilm')} · {formatDuration(film.duration)}
                        </span>
                    )}
                </GalleryTile>
                {thumbs.map((image) => (
                    <GalleryTile key={image.src} image={image} pick={pick} className="aspect-[4/3] lg:aspect-auto" />
                ))}
            </div>

            <div className="flex flex-col p-6 sm:p-7 lg:order-1">
                <div className="flex flex-wrap gap-2">
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${domainClass(project.domain[0])}`}>
                        {txt(pick, project.domain)}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                        <FiMapPin className="h-3 w-3" aria-hidden="true" />
                        {txt(pick, project.feature.badge)}
                    </span>
                </div>

                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                    <Link
                        to={project.href}
                        className="transition-colors after:absolute after:inset-0 after:content-[''] focus:outline-none group-hover:text-primary-700"
                    >
                        {project.title}
                    </Link>
                </h2>
                <p className="mt-1 text-sm font-semibold text-primary-700">{txt(pick, project.topic)}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{txt(pick, project.contribution)}</p>

                <div className="relative z-10 mb-4 [&>div]:mt-4 [&>div]:justify-start">
                    <PartnerLogoStrip partners={project.partners} />
                </div>

                <div className="mt-auto flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-slate-200 pt-4">
                    <ProjectFacts project={project} pick={pick} className="min-w-[15rem] flex-1" />
                    <span className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition group-hover:bg-primary-800">
                        {pick('Explore the project', 'Zum Projekt')}
                        <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                </div>
            </div>
        </article>
    );
};

const featured = projects.find((p) => p.feature && p.href);
const gridProjects = projects.filter((p) => p !== featured);

const IndustryProjects = () => {
    const { pick } = useLanguage();

    return (
        <PageShell
            kicker={pick('Transfer & public funding', 'Transfer & öffentliche Förderung')}
            title={pick('Industry Projects', 'Industrieprojekte')}
            lede={pick(
                'We develop applied AI systems in publicly funded and industry-oriented transfer projects. The focus is on robust demonstrators, understandable AI architectures, and solutions that must work in real processes across construction, healthcare, circular economy, retail, and IoT security.',
                'Wir entwickeln angewandte KI-Systeme in öffentlich geförderten und industrienahen Transferprojekten. Im Mittelpunkt stehen robuste Demonstratoren, nachvollziehbare KI-Architekturen und Lösungen, die in realen Abläufen von Bauwesen, Gesundheit, Kreislaufwirtschaft, Handel und IoT-Sicherheit bestehen müssen.',
            )}
            nav={[
                ...(featured ? [{ id: 'featured', label: pick('Featured project', 'Projekt im Fokus') }] : []),
                { id: 'projects', label: pick('All projects', 'Alle Projekte') },
                { id: 'contact', label: pick('Contact', 'Kontakt') },
            ]}
        >
            {featured && (
                <Section id="featured" kicker={pick('Featured project', 'Projekt im Fokus')}>
                    <FeaturedProject project={featured} pick={pick} />
                </Section>
            )}

            <Section id="projects" tone="tint" kicker={featured ? pick('More projects', 'Weitere Projekte') : undefined} title={pick('Projects', 'Projekte')}>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {gridProjects.map((project) => (
                        <Card
                            as="article"
                            key={project.slug}
                            interactive={!!project.href}
                            className={`flex h-full flex-col overflow-hidden ${project.href ? 'group relative' : ''}`}
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

                                <ProjectFacts project={project} pick={pick} className="mt-4 border-t border-slate-200 pt-5" />

                                {project.href && (
                                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700">
                                        {pick('Learn more', 'Mehr erfahren')}
                                        <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                                    </span>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            </Section>

            <div id="contact" className="scroll-mt-24">
                <ContactBand
                    kicker={pick('Transfer with public and industry partners', 'Transfer mit öffentlichen und industriellen Partnern')}
                    title={pick('Interested in a transfer project?', 'Interesse an einem Transferprojekt?')}
                    text={pick(
                        'We support partners from feasibility studies through publicly funded collaborative projects to robust AI demonstrators.',
                        'Wir begleiten Partner von der Machbarkeitsstudie über öffentlich geförderte Verbundprojekte bis zum belastbaren KI-Demonstrator.',
                    )}
                    href="mailto:bartelt@isse.tu-clausthal.de"
                    label={pick('Get in touch', 'Kontakt aufnehmen')}
                    icon={FiMail}
                />
            </div>
        </PageShell>
    );
};

export default IndustryProjects;
