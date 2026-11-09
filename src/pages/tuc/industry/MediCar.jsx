import { Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowUpRight, FiDownload, FiMail } from 'react-icons/fi';
import LazyVideo from '../../../components/common/LazyVideo';
import PartnerLogoStrip from '../../../components/tuc/PartnerLogoStrip';
import { projects, domainClass } from '../../../data/industryProjects';
import { videos } from '../../../data/videos';
import assetUrl from '../../../utils/assetUrl';
import { useLanguage } from '../../../i18n/useLanguage';

const project = projects.find((p) => p.slug === 'medicar');

// The film is swapped by replacing the file at this path
// (`npm run replace-video -- medicar <new.mp4>`), so the URL never changes.
const film = videos.find((v) => v.id === 'medicar');

const IMG = '/images/projects/industry/medicar';

const gallery = [
    {
        src: `${IMG}/lidar.webp`,
        caption: [
            'Unterwegs im Klinikflur: Der Roboter gleicht seine Sensordaten laufend mit einer Karte ab.',
            'In a hospital corridor: the robot continuously matches its sensor data against a map.',
        ],
    },
    {
        src: `${IMG}/routing.webp`,
        caption: [
            'Das Wegenetz des Klinikcampus ist die Grundlage für die Routenplanung.',
            'The route network of the hospital campus is the basis for route planning.',
        ],
    },
    {
        src: `${IMG}/outdoor.webp`,
        caption: [
            'Auch zwischen den Gebäuden unterwegs: Transporte über das Klinikgelände.',
            'Between buildings, too: transport runs across the hospital grounds.',
        ],
    },
];

const txt = (pick, pair) => pick(pair[1], pair[0]);

const MediCar = () => {
    const { pick } = useLanguage();

    const facts = [
        { label: pick('Funding', 'Förderung'), value: txt(pick, project.fundingProgram) },
        { label: pick('Duration', 'Laufzeit'), value: '09/2023 – 08/2026' },
        { label: 'Budget', value: txt(pick, project.budget) },
        { label: pick('Pilot hospital', 'Pilotklinik'), value: pick('University Medical Center Freiburg', 'Universitätsklinikum Freiburg') },
    ];

    return (
        <>
            {/* ── Hero ── */}
            <section className="border-b border-slate-200 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
                    <Link
                        to="/tuc/industry-projects"
                        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-primary-700"
                    >
                        <FiArrowLeft className="h-4 w-4" aria-hidden="true" />
                        {pick('Industry Projects', 'Industrieprojekte')}
                    </Link>

                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center">
                        <div>
                            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${domainClass(project.domain[0])}`}>
                                {txt(pick, project.domain)}
                            </span>
                            <h1 className="mt-5 text-3xl font-bold leading-tight text-slate-900 sm:text-5xl">{project.title}</h1>
                            <p className="mt-3 text-base font-semibold text-primary-700 sm:text-lg">{txt(pick, project.topic)}</p>
                            <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                                {pick(
                                    'Blood samples, medication, lab supplies: in a hospital, nursing staff cover many kilometres a day just carrying things. MediCar 4.0 develops autonomous transport robots that take over these trips, safely and in the middle of everyday clinical life. That leaves more time for what matters most: caring for patients.',
                                    'Blutproben, Medikamente, Laborbedarf: Im Krankenhaus legen Pflegekräfte täglich viele Wege nur für Transporte zurück. MediCar 4.0 entwickelt autonome Transportroboter, die diese Fahrten übernehmen, sicher und mitten im Klinikalltag. So bleibt mehr Zeit für das Wichtigste: die Versorgung der Patientinnen und Patienten.',
                                )}
                            </p>
                        </div>
                        <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm">
                            <img
                                src={assetUrl(`${IMG}/corridor.webp`)}
                                alt={pick(
                                    'MediCar transport robot carrying blue transport boxes in a hospital lobby',
                                    'MediCar-Transportroboter mit blauen Transportboxen im Foyer einer Klinik',
                                )}
                                width="1600"
                                height="900"
                                fetchPriority="high"
                                decoding="async"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    <dl className="mt-10 grid grid-cols-2 gap-4 border-t border-slate-200 pt-6 text-sm sm:grid-cols-4">
                        {facts.map((f) => (
                            <div key={f.label}>
                                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">{f.label}</dt>
                                <dd className="mt-1 font-semibold text-slate-800">{f.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* ── Film ── */}
            <section className="bg-slate-50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">{pick('Project film', 'Projektfilm')}</p>
                    <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                        {pick('MediCar 4.0 in the hospital', 'MediCar 4.0 im Klinikalltag')}
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                        {pick(
                            'The robots on duty at the pilot hospital, and the people from the consortium who build them.',
                            'Die Roboter im Einsatz in der Pilotklinik, und die Menschen aus dem Konsortium, die sie entwickeln.',
                        )}
                    </p>
                    <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-black shadow-sm">
                        <LazyVideo
                            src={assetUrl(film.src)}
                            poster={assetUrl(film.poster)}
                            controls
                            className="aspect-video w-full"
                            aria-label={pick('MediCar 4.0 project film', 'Projektfilm MediCar 4.0')}
                        />
                    </div>
                    <a
                        href={assetUrl(film.src)}
                        target="_blank"
                        rel="noopener"
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-primary-700"
                    >
                        <FiDownload className="h-4 w-4" aria-hidden="true" />
                        {pick('Open video directly (MP4)', 'Video direkt öffnen (MP4)')}
                    </a>
                </div>
            </section>

            {/* ── Idea + contribution ── */}
            <section className="bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                    <div className="grid gap-10 md:grid-cols-2">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">{pick('The idea', 'Die Idee')}</h2>
                            <div className="mt-4 space-y-4 text-base leading-8 text-slate-600">
                                <p>
                                    {pick(
                                        'A hospital is not a warehouse. Corridors are busy, lifts are shared, and many transports cannot wait. MediCar 4.0 connects electric transport vehicles, handover stations and a shared data platform into one modular system, following the plug-and-work idea of Industry 4.0.',
                                        'Ein Krankenhaus ist kein Lager. Flure sind belebt, Aufzüge werden geteilt, und viele Transporte dulden keinen Aufschub. MediCar 4.0 verbindet elektrische Transportfahrzeuge, Übergabestationen und eine gemeinsame Datenplattform zu einem modularen System, nach dem Plug&Work-Gedanken der Industrie 4.0.',
                                    )}
                                </p>
                                <p>
                                    {pick(
                                        'An urgent blood sample, for example, is placed in a handover box. A robot collects it, reports its position along the way and hands it over at its destination. The system is being tested at the University Medical Center Freiburg.',
                                        'Eine eilige Blutprobe etwa wird in eine Übergabebox gelegt. Ein Roboter holt sie ab, meldet unterwegs seine Position und übergibt sie am Ziel. Erprobt wird das System im Universitätsklinikum Freiburg.',
                                    )}
                                </p>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">{pick('Our contribution', 'Unser Beitrag')}</h2>
                            <div className="mt-4 space-y-4 text-base leading-8 text-slate-600">
                                <p>
                                    {pick(
                                        'We work on coordinating whole fleets: which robot takes which job, how vehicles make way for each other and for people, and how their behaviour stays safe when the situation and the orders keep changing.',
                                        'Wir arbeiten an der Koordination ganzer Flotten: Welcher Roboter übernimmt welchen Auftrag, wie weichen Fahrzeuge einander und Menschen aus, und wie bleibt ihr Verhalten sicher, wenn sich Lage und Aufträge laufend ändern?',
                                    )}
                                </p>
                                <p>
                                    {pick(
                                        'The goal: robust multi-agent coordination that holds up in a real hospital, with people in the corridors, handover points and urgent orders arriving at any time.',
                                        'Das Ziel: eine robuste Multi-Agenten-Koordination, die im echten Klinikbetrieb besteht, mit Menschen auf den Fluren, Übergabepunkten und eiligen Aufträgen zu jeder Zeit.',
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 grid gap-6 sm:grid-cols-3">
                        {gallery.map((g) => (
                            <figure key={g.src} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                                <img
                                    src={assetUrl(g.src)}
                                    alt={txt(pick, g.caption)}
                                    width="1600"
                                    height="900"
                                    loading="lazy"
                                    decoding="async"
                                    className="aspect-[16/10] w-full object-cover"
                                />
                                <figcaption className="p-4 text-xs leading-5 text-slate-500">{txt(pick, g.caption)}</figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Partners ── */}
            <section className="border-t border-slate-200 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-14 text-center">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{pick('Project partners', 'Projektpartner')}</p>
                    <PartnerLogoStrip partners={project.partners} />
                    <a
                        href="https://www.medicar40.de/"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800"
                    >
                        {pick('Project website medicar40.de', 'Projektwebsite medicar40.de')}
                        <FiArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                </div>
            </section>

            {/* ── Contact ── */}
            <section className="bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
                    <div className="grid gap-6 rounded-lg border border-slate-200 bg-slate-900 p-6 text-white sm:p-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                        <div>
                            <h2 className="text-2xl font-bold">{pick('Questions about MediCar 4.0?', 'Fragen zu MediCar 4.0?')}</h2>
                            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                                {pick(
                                    'We are happy to talk about autonomous hospital logistics and fleet coordination.',
                                    'Wir sprechen gern über autonome Kliniklogistik und Flottenkoordination.',
                                )}
                            </p>
                        </div>
                        <a
                            href="mailto:bartelt@isse.tu-clausthal.de"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-primary-100"
                        >
                            <FiMail className="h-4 w-4" aria-hidden="true" />
                            {pick('Get in touch', 'Kontakt aufnehmen')}
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MediCar;
