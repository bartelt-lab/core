import { Link } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiCpu, FiDownload, FiMail } from 'react-icons/fi';
import LazyVideo from '../../../components/common/LazyVideo';
import PartnerLogoStrip from '../../../components/tuc/PartnerLogoStrip';
import { projects, domainClass } from '../../../data/industryProjects';
import { videos } from '../../../data/videos';
import assetUrl from '../../../utils/assetUrl';
import { useLanguage } from '../../../i18n/useLanguage';

const project = projects.find((p) => p.slug === 'medicar');

// The film is swapped by replacing the file at this path
// (`npm run replace-video -- medicar <new.mp4> --crf 28 --poster-at 126`),
// so the URL never changes.
const film = videos.find((v) => v.id === 'medicar');

const IMG = '/images/projects/industry/medicar';

// Text pairs are [German, English], like in src/data/industryProjects.js.
const contributions = [
    {
        image: `${IMG}/routing-severity.webp`,
        title: ['Lernfähiges Routing mit Sprachmodellen', 'Adaptive routing with language models'],
        body: [
            'Klassische Routenführung kennt nur, was vorab definiert wurde. Eine blockierte Zufahrt, ein Unfall auf dem Parkplatz oder eine Baustelle bringen sie aus dem Takt. Bei MediCar 4.0 werten große Sprachmodelle die Meldungen von Klinikmitarbeitenden aus und erzeugen kleine Programme, die einzelne Wegabschnitte in Echtzeit neu bewerten. Ein Routenalgorithmus berechnet daraus laufend die beste Strecke, und das Klinikpersonal sieht auf der Karte, warum sich eine Route geändert hat.',
            'Classic route guidance only knows what was defined in advance. A blocked access road, an accident in the car park or a construction site throws it off. In MediCar 4.0, large language models evaluate reports from hospital staff and generate small programs that re-score individual path segments in real time. A routing algorithm continuously computes the best route from them, and staff can see on the map why a route has changed.',
        ],
        caption: [
            'Wegabschnitte auf dem Klinikcampus, eingefärbt nach Schweregrad der Beeinträchtigung.',
            'Path segments on the hospital campus, coloured by how severely they are affected.',
        ],
    },
    {
        image: `${IMG}/humanoid.webp`,
        title: ['Robotik: von der Simulation in die Praxis', 'Robotics: from simulation to practice'],
        body: [
            'Bislang be- und entladen Menschen die Transportboxen. Wir erproben Roboter, die Objekte erkennen, greifen und ablegen: Ein Sprachmodell zerlegt jede Aufgabe in einzelne Schritte, eine trainierte Steuerung führt die Greifbewegungen aus. Trainiert und getestet wird zunächst in virtuellen, zufällig variierten Krankenhausräumen. So lassen sich viele Situationen sicher durchspielen, bevor ein Roboter in der realen Welt arbeitet. Die Übertragung auf reale Hardware ist der nächste Schritt.',
            'Today, people still load and unload the transport boxes. We are testing robots that recognise, grasp and place objects: a language model breaks each task into individual steps, and a trained controller carries out the grasping motions. Training and testing start in virtual, randomly varied hospital rooms, so many situations can be played through safely before a robot works in the real world. Transferring this to real hardware is the next step.',
        ],
        caption: [
            'Humanoider Roboter im Labor an einem Tisch mit Kühlbox und Probenröhrchen.',
            'Humanoid robot in the lab at a bench with a cooler box and sample tubes.',
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
                                    'Blood samples, medication, supplies: MediCar 4.0 gets them where they are needed in the hospital, with autonomous transport vehicles. TU Clausthal develops the system together with the University Medical Center Freiburg and technology partners for autonomous driving. Our part: AI that adapts routes live, and robots that load and unload the transport boxes themselves.',
                                    'Blutproben, Medikamente, Material: MediCar 4.0 bringt sie im Krankenhaus bedarfsgerecht ans Ziel, mit autonomen Transportfahrzeugen. Die TU Clausthal entwickelt das System gemeinsam mit dem Universitätsklinikum Freiburg und Technologiepartnern für autonomes Fahren. Unser Teil: KI, die Routen live anpasst, und Roboter, die Transportboxen selbst be- und entladen.',
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

            {/* ── The idea ── */}
            <section className="bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16">
                    <div className="grid gap-10 md:grid-cols-2 md:items-center">
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
                                        'An urgent blood sample, for example, is placed in a handover box. A robot collects it, reports its position along the way and hands it over at its destination.',
                                        'Eine eilige Blutprobe etwa wird in eine Übergabebox gelegt. Ein Roboter holt sie ab, meldet unterwegs seine Position und übergibt sie am Ziel.',
                                    )}
                                </p>
                            </div>
                        </div>
                        <figure className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                            <img
                                src={assetUrl(`${IMG}/lidar.webp`)}
                                alt={pick(
                                    'Transport robot in a hospital corridor, with an inset of its local map',
                                    'Transportroboter im Klinikflur, mit eingeblendeter lokaler Karte',
                                )}
                                width="1600"
                                height="900"
                                loading="lazy"
                                decoding="async"
                                className="aspect-[16/10] w-full object-cover"
                            />
                            <figcaption className="p-4 text-xs leading-5 text-slate-500">
                                {pick(
                                    'In a hospital corridor: the robot continuously matches its sensor data against a map.',
                                    'Unterwegs im Klinikflur: Der Roboter gleicht seine Sensordaten laufend mit einer Karte ab.',
                                )}
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </section>

            {/* ── Our contribution ── */}
            <section className="bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">TU Clausthal</p>
                    <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{pick('Our contribution', 'Unser Beitrag')}</h2>
                    <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
                        {pick(
                            'The team led by Prof. Dr. Christian Bartelt at the Institute for Software and Systems Engineering contributes two building blocks to MediCar 4.0.',
                            'Das Team um Prof. Dr. Christian Bartelt am Institut für Software and Systems Engineering bringt zwei Bausteine in MediCar 4.0 ein.',
                        )}
                    </p>

                    <div className="mt-8 grid gap-6 md:grid-cols-2">
                        {contributions.map((c) => (
                            <article key={c.image} className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                                <figure>
                                    <img
                                        src={assetUrl(c.image)}
                                        alt={txt(pick, c.caption)}
                                        width="1600"
                                        height="900"
                                        loading="lazy"
                                        decoding="async"
                                        className="aspect-[16/9] w-full object-cover"
                                    />
                                    <figcaption className="border-b border-slate-100 px-5 py-2.5 text-xs leading-5 text-slate-500">
                                        {txt(pick, c.caption)}
                                    </figcaption>
                                </figure>
                                <div className="p-5 sm:p-6">
                                    <h3 className="text-lg font-bold text-slate-900">{txt(pick, c.title)}</h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-600">{txt(pick, c.body)}</p>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="mt-6 grid gap-6 md:grid-cols-2">
                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 sm:p-6">
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                                <FiCpu className="h-4 w-4 text-primary-700" aria-hidden="true" />
                                {pick('Computing power from the GenAI-Cluster', 'Rechenleistung aus dem GenAI-Cluster')}
                            </div>
                            <p className="mt-3 text-sm leading-7 text-slate-600">
                                {pick(
                                    'Both building blocks need a lot of computing power. On the GenAI-Cluster at TU Clausthal we train language models, generate and refine test datasets, and evaluate the routing across many scenarios. Because this runs on our own infrastructure, we can adapt models at any time and start experiments without waiting, and sensitive data never leaves the university, which matters especially in healthcare.',
                                    'Beide Bausteine brauchen viel Rechenleistung. Auf dem GenAI-Cluster der TU Clausthal trainieren wir Sprachmodelle, erzeugen und verbessern Testdatensätze und evaluieren das Routing in zahlreichen Szenarien. Weil das auf eigener Infrastruktur läuft, können wir Modelle jederzeit anpassen und Experimente ohne Wartezeiten starten, und sensible Daten verlassen die Universität nicht. Im Gesundheitsbereich ist das besonders wichtig.',
                                )}
                            </p>
                            <Link
                                to="/compute-cluster"
                                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800"
                            >
                                {pick('About the GenAI-Cluster', 'Zum GenAI-Cluster')}
                                <FiArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 sm:p-6">
                            <p className="text-sm font-bold text-slate-900">{pick('Tested in the hospital', 'Erprobt im Klinikum')}</p>
                            <p className="mt-3 text-sm leading-7 text-slate-600">
                                {pick(
                                    'Our components were integrated with the partners’ systems and tested in a field trial at the University Medical Center Freiburg. They are modular and plug into existing systems following the plug-and-work principle. In future, care and nursing facilities are meant to benefit as well. Several students have already worked on the topic in research projects and theses.',
                                    'Unsere Komponenten wurden mit den Systemen der Projektpartner zusammengeführt und am Universitätsklinikum Freiburg in einem Feldversuch erprobt. Sie sind modular aufgebaut und lassen sich nach dem Plug&Work-Prinzip in bestehende Systeme einbinden. Künftig sollen auch Pflege- und Betreuungseinrichtungen profitieren. Mehrere Studierende haben bereits in Forschungsprojekten und Abschlussarbeiten mitgearbeitet.',
                                )}
                            </p>
                        </div>
                    </div>

                    <blockquote className="mt-10 border-l-4 border-primary-500 pl-5 sm:pl-6">
                        <p className="text-lg font-semibold leading-8 text-slate-800 sm:text-xl">
                            {pick(
                                '“With the GPU cluster, we can not only develop AI applications like MediCar 4.0, but also validate them thoroughly. That is what it takes for such systems to earn trust in a hospital.”',
                                '„Mit dem GPU-Cluster können wir KI-Anwendungen wie in MediCar 4.0 nicht nur entwickeln, sondern auch gründlich absichern. Das ist die Voraussetzung dafür, dass solche Systeme im Krankenhaus Vertrauen gewinnen.“',
                            )}
                        </p>
                        <footer className="mt-3 text-sm text-slate-500">
                            Prof. Dr. Christian Bartelt, {pick('project lead, Institute for Software and Systems Engineering', 'Projektleiter, Institut für Software and Systems Engineering')}
                        </footer>
                    </blockquote>
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
                                    'We are happy to talk about AI for hospital logistics, adaptive routing and robotics.',
                                    'Wir sprechen gern über KI für die Krankenhauslogistik, lernfähiges Routing und Robotik.',
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
