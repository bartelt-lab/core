import { FiArrowUpRight, FiMail, FiShield } from 'react-icons/fi';
import assetUrl from '../../utils/assetUrl';
import { useLanguage } from '../../i18n/useLanguage';

const projects = [
    {
        slug: 'ai-bim',
        title: 'AI-BIM',
        domain: ['Bau & BIM', 'Construction & BIM'],
        topic: ['KI-Co-Pilot für nachhaltige Architekturplanung', 'AI copilot for sustainable architectural planning'],
        partners: ['neoBIM', 'Cogintal Ltd.'],
        duration: ['3 Jahre', '3 years'],
        fundingProgram: ['BMFTR', 'BMFTR'],
        budget: ['2,0 Mio. EUR', 'EUR 2.0M'],
        summary: [
            'AI-BIM entwickelt einen KI-gestützten Co-Piloten, der nachhaltige Architekturentwürfe unter Einbezug von Umweltstandards planbar und optimierbar macht.',
            'AI-BIM develops an AI-supported copilot that makes sustainable architectural designs plannable and optimizable while taking environmental standards into account.',
        ],
        contribution: [
            'Unsere Rolle liegt in der Entwicklung und Integration der Co-Pilot-Architektur, damit KI-Modelle konkrete Planungsentscheidungen unterstützen statt nur Entwurfsvarianten zu erzeugen.',
            'Our role is to develop and integrate the copilot architecture so that AI models support concrete planning decisions instead of only generating design variants.',
        ],
        visual: assetUrl('/images/projects/industry/ai-bim.webp'),
    },
    {
        slug: 'show2instruct',
        title: 'Show2Instruct',
        domain: ['Bau & BIM', 'Construction & BIM'],
        topic: ['Multimodaler BIM-Copilot für maschinenlesbare Anweisungen', 'Multimodal BIM copilot for machine-readable instructions'],
        partners: ['neoBIM', 'Ramblr GmbH', 'TU Clausthal', 'University of Rostock'],
        duration: ['3 Jahre', '3 years'],
        fundingProgram: ['BMFTR', 'BMFTR'],
        budget: ['2,6 Mio. EUR', 'EUR 2.6M'],
        summary: [
            'Show2Instruct übersetzt natürlichsprachige Bedieninteraktion und visuelle Objektreferenzen in maschinenverarbeitbare Steuerbefehle für BIM-Kontexte.',
            'Show2Instruct translates natural-language interaction and visual object references into machine-processable control commands for BIM contexts.',
        ],
        contribution: [
            'Wir integrieren Foundation-Model-basierte KI-Architekturen und arbeiten an der Zuverlässigkeit multimodaler BIM-Copiloten, die Fachwissen, Modelldaten und Werkzeugaufrufe verbinden.',
            'We integrate foundation-model-based AI architectures and work on reliable multimodal BIM copilots that connect domain knowledge, model data, and tool calls.',
        ],
        visual: assetUrl('/images/projects/industry/show2instruct.webp'),
    },
    {
        slug: 'lelamar',
        title: 'LeLaMar',
        domain: ['Gesundheit & Einsatzsysteme', 'Healthcare & emergency response systems'],
        topic: ['KI-Prototypen für Rettungsleitstellen', 'AI prototypes for emergency dispatch centers'],
        partners: ['ILS Mannheim gGmbH'],
        duration: ['0,5 Jahre', '0.5 years'],
        fundingProgram: ['Industrie / Transfer', 'Industry / Transfer'],
        budget: ['30 Tsd. EUR', 'EUR 30k'],
        summary: [
            'LeLaMar untersucht KI-Use-Cases für Rettungsleitstellen, um Notrufdaten schneller zu strukturieren, Einsatzlagen zu erkennen und Zusammenhänge zwischen mehreren Anrufen sichtbar zu machen.',
            'LeLaMar investigates AI use cases for emergency dispatch centers to structure emergency-call data faster, recognize incident situations, and reveal links between multiple calls.',
        ],
        contribution: [
            'Wir entwickeln und evaluieren Proof-of-Concepts für Transkription, Risikoanalyse, Event Linking, Event Tracking und ad-hoc erzeugte Einsatz-Zusammenfassungen.',
            'We develop and evaluate proof-of-concepts for transcription, risk analysis, event linking, event tracking, and ad-hoc incident summaries.',
        ],
        visual: assetUrl('/images/projects/industry/lelamar.webp'),
    },
    {
        slug: 'medicar',
        title: 'MediCar 4.0',
        domain: ['Gesundheit & Einsatzsysteme', 'Healthcare & emergency response systems'],
        topic: ['Autonome On-Demand-Transportsysteme für Kliniken', 'Autonomous on-demand transport systems for hospitals'],
        partners: ['SEW-Eurodrive', 'Things Alive Robotics', 'insensiv', 'FZI', 'Fraunhofer IML'],
        duration: ['3 Jahre', '3 years'],
        fundingProgram: ['BMFTR', 'BMFTR'],
        budget: ['3,5 Mio. EUR', 'EUR 3.5M'],
        summary: [
            'MediCar 4.0 entwickelt hochautomatisierte E-Fahrzeugsysteme und modulare Container für sichere On-Demand-Transportprozesse in Krankenhäusern.',
            'MediCar 4.0 develops highly automated electric vehicle systems and modular containers for safe on-demand transport processes in hospitals.',
        ],
        contribution: [
            'Unser Beitrag ist die robuste Multi-Agenten-Koordination autonomer Fahrzeugflotten sowie die Absicherung ihres Verhaltens in dynamischen Klinikfluren mit Menschen, Übergabepunkten und wechselnden Transportaufträgen.',
            'Our contribution is robust multi-agent coordination of autonomous vehicle fleets and safeguarding their behavior in dynamic hospital corridors with people, handover points, and changing transport tasks.',
        ],
        visual: assetUrl('/images/projects/industry/medicar.webp'),
    },
    {
        slug: 'maas-cu',
        title: 'MaaS-CU',
        domain: ['Kreislaufwirtschaft & Handel', 'Circular economy & retail'],
        topic: ['Optimierung von Mehrwegkreisläufen', 'Optimization of reusable packaging cycles'],
        partners: ['CU Mehrweg GmbH'],
        duration: ['2 Jahre', '2 years'],
        fundingProgram: ['BMWE / VDI VDE IT', 'BMWE / VDI VDE IT'],
        budget: ['180 Tsd. EUR', 'EUR 180k'],
        summary: [
            'MaaS-CU modelliert Mehrweg-as-a-Service-Prozesse für die Lebensmittelindustrie, damit Umlaufzahlen, Engpässe und Kosten datengetrieben optimiert werden können.',
            'MaaS-CU models reusable-packaging-as-a-service processes for the food industry so circulation counts, bottlenecks, and costs can be optimized with data.',
        ],
        contribution: [
            'Wir entwickeln ML-basierte Analysen für den Produktzyklus, einschließlich Digital-Twin-Logik, Bottleneck Detection, Outlier-Analyse und entscheidungsfähigen Frontend-Sichten für operative Nutzer.',
            'We develop ML-based analyses for the product cycle, including digital-twin logic, bottleneck detection, outlier analysis, and decision-ready frontend views for operational users.',
        ],
        visual: assetUrl('/images/projects/industry/maas-cu.webp'),
    },
    {
        slug: 'maimuse',
        title: 'mAImuse',
        domain: ['Kreislaufwirtschaft & Handel', 'Circular economy & retail'],
        topic: ['Personalisierte virtuelle Anprobe', 'Personalized virtual try-on'],
        partners: ['Scannery GmbH'],
        duration: ['1,5 Jahre', '1.5 years'],
        fundingProgram: ['BMFTR', 'BMFTR'],
        budget: ['292 Tsd. EUR', 'EUR 292k'],
        summary: [
            'mAImuse optimiert virtuelle Kleidungsanprobe durch KI-gestützte Bilderkennung und personalisierte Produktvorschläge auf Basis individueller Körperformen.',
            'mAImuse optimizes virtual clothing try-on through AI-supported image recognition and personalized product recommendations based on individual body shapes.',
        ],
        contribution: [
            'Wir definieren die technischen Anforderungen, bewerten Bild-, 3D- und Virtual-Try-On-Modelle und integrieren Vision-KI prototypisch in einen Demonstrator für Passform- und Erscheinungsbewertung.',
            'We define technical requirements, evaluate image, 3D, and virtual-try-on models, and integrate vision AI into a demonstrator for fit and appearance assessment.',
        ],
        visual: assetUrl('/images/projects/industry/maimuse.webp'),
    },
    {
        slug: 'physical-guards',
        title: 'Physical Guards',
        domain: ['Sicherheit & IoT', 'Security & IoT'],
        topic: ['Intrusion Detection aus physikalischen Signalparametern', 'Intrusion detection from physical signal parameters'],
        partners: ['University of Mannheim', 'M2M', 'Osapiens'],
        duration: ['3 Jahre', '3 years'],
        fundingProgram: ['BMFTR', 'BMFTR'],
        budget: ['2,2 Mio. EUR', 'EUR 2.2M'],
        summary: [
            'Physical Guards adressiert IoT-Sicherheit in Smart Home, Produktion und sensibler Infrastruktur über physikalische Signalparameter statt isolierter Sensormeldungen.',
            'Physical Guards addresses IoT security in smart homes, production, and sensitive infrastructure using physical signal parameters instead of isolated sensor alerts.',
        ],
        contribution: [
            'Wir entwickeln KI-basierte Verfahren für multivariate Zeitreihen, Autoencoder-gestützte Intrusion Detection und interpretierbare System-Fingerprints, mit denen Manipulationen einzelner Sensoren im Gesamtkontext erkannt werden.',
            'We develop AI-based methods for multivariate time series, autoencoder-supported intrusion detection, and interpretable system fingerprints that reveal manipulation of individual sensors in the overall system context.',
        ],
        visual: null,
    },
];

const PARTNER_LOGOS = {
    neoBIM: { src: assetUrl('/logos/partners/neobim.svg'), alt: 'neoBIM logo', href: 'https://neobim.ai/' },
    'Cogintal Ltd.': { src: assetUrl('/logos/partners/cogintal.svg'), alt: 'Cogintal Ltd. logo' },
    'Ramblr GmbH': { src: assetUrl('/logos/partners/ramblr.svg'), alt: 'Ramblr logo', href: 'https://ramblr.ai/' },
    'TU Clausthal': { src: assetUrl('/logos/tu-clausthal.webp'), alt: 'TU Clausthal logo', href: 'https://www.tu-clausthal.de/en/' },
    'University of Rostock': { src: assetUrl('/logos/rostock-logo.webp'), alt: 'University of Rostock logo', href: 'https://www.uni-rostock.de/en/' },
    'ILS Mannheim gGmbH': { src: assetUrl('/logos/partners/ils-mannheim.jpg'), alt: 'ILS Mannheim logo', href: 'https://www.ils-mannheim.de/' },
    'SEW-Eurodrive': { src: assetUrl('/logos/partners/sew-eurodrive.png'), alt: 'SEW-Eurodrive logo', href: 'https://www.sew-eurodrive.de/' },
    'Things Alive Robotics': { src: assetUrl('/logos/partners/things-alive-robotics.svg'), alt: 'Things Alive Robotics logo', href: 'https://thingsalive.de/' },
    insensiv: { src: assetUrl('/logos/partners/insensiv.png'), alt: 'insensiv logo', href: 'https://insensiv.de/' },
    FZI: { src: assetUrl('/logos/partners/fzi.png'), alt: 'FZI logo', href: 'https://www.fzi.de/' },
    'Fraunhofer IML': { src: assetUrl('/logos/partners/fraunhofer-iml.png'), alt: 'Fraunhofer IML logo', href: 'https://www.iml.fraunhofer.de/' },
    'CU Mehrweg GmbH': { src: assetUrl('/logos/partners/cu-mehrweg.avif'), alt: 'CU Mehrweg logo', href: 'https://www.cu-mehrweg.com/' },
    'Scannery GmbH': { src: assetUrl('/logos/partners/scannery.svg'), alt: 'Scannery logo', href: 'https://scannery.de/' },
    'University of Mannheim': { src: assetUrl('/logos/uma.webp'), alt: 'University of Mannheim logo', href: 'https://www.uni-mannheim.de/' },
    M2M: { src: assetUrl('/logos/partners/m2m-germany.svg'), alt: 'M2M Germany logo', href: 'https://www.m2mgermany.de/' },
    Osapiens: { src: assetUrl('/logos/partners/osapiens.svg'), alt: 'osapiens logo', href: 'https://osapiens.com/' },
};

const domainClass = (domain) => {
    switch (domain) {
        case 'Bau & BIM':
            return 'border-emerald-200 bg-emerald-50 text-emerald-800';
        case 'Gesundheit & Einsatzsysteme':
            return 'border-sky-200 bg-sky-50 text-sky-800';
        case 'Kreislaufwirtschaft & Handel':
            return 'border-amber-200 bg-amber-50 text-amber-800';
        case 'Sicherheit & IoT':
            return 'border-slate-300 bg-slate-100 text-slate-800';
        default:
            return 'border-gray-200 bg-gray-50 text-gray-700';
    }
};

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

const PartnerLogo = ({ partner, compact = false }) => {
    const logo = PARTNER_LOGOS[partner];

    if (!logo) {
        return <span className={`text-xs font-semibold text-gray-700 ${compact ? 'block max-w-full truncate text-center' : ''}`}>{partner}</span>;
    }

    const logoImage = (
        <img
            src={logo.src}
            alt={logo.alt}
            loading="lazy"
            decoding="async"
            className={`h-auto w-auto object-contain ${compact ? 'max-h-7 max-w-[4.75rem] sm:max-w-[5.25rem]' : 'max-h-8 max-w-[7rem]'}`}
        />
    );

    const className = compact
        ? 'inline-flex h-9 w-[4.75rem] shrink-0 items-center justify-center transition hover:opacity-80 sm:w-[5.25rem]'
        : 'inline-flex items-center justify-center transition hover:opacity-80';

    if (!logo.href) return <span className={className} title={partner}>{logoImage}</span>;

    return (
        <a href={logo.href} target="_blank" rel="noreferrer" className={className} title={partner} aria-label={`${partner} website`}>
            {logoImage}
        </a>
    );
};

const PartnerLogoStrip = ({ partners }) => {
    const isCompact = partners.length >= 3;
    const className = isCompact
        ? 'mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-3'
        : 'mt-5 flex flex-wrap items-center justify-center gap-3';

    return (
        <div className={className} aria-label="Project partners">
            {partners.map((partner) => <PartnerLogo key={partner} partner={partner} compact={isCompact} />)}
        </div>
    );
};

const IndustryProjects = () => {
    const { pick } = useLanguage();

    return (
        <>
            <section className="border-b border-gray-200 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
                        {pick('Transfer & public funding', 'Transfer & öffentliche Förderung')}
                    </p>
                    <h1 className="max-w-3xl text-3xl font-bold leading-tight text-gray-900 sm:text-5xl">
                        {pick('Industry Projects', 'Industrieprojekte')}
                    </h1>
                    <p className="mt-5 max-w-3xl text-base leading-8 text-gray-600 sm:text-lg">
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
                            <article key={project.slug} className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                                <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                                    <ProjectVisual project={project} pick={pick} />
                                </div>
                                <div className="flex flex-1 flex-col p-5">
                                    <div className="mb-4">
                                        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${domainClass(project.domain[0])}`}>
                                            {txt(pick, project.domain)}
                                        </span>
                                    </div>

                                    <h2 className="text-xl font-bold text-gray-900">{project.title}</h2>
                                    <p className="mt-2 text-sm font-semibold text-primary-700">{txt(pick, project.topic)}</p>
                                    <div className="mt-4 space-y-3 text-sm leading-6 text-gray-600">
                                        <p>{txt(pick, project.summary)}</p>
                                        <p>{txt(pick, project.contribution)}</p>
                                    </div>

                                    <PartnerLogoStrip partners={project.partners} />

                                    <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-gray-200 pt-5 text-xs">
                                        <div>
                                            <dt className="font-semibold uppercase tracking-wide text-gray-400">{pick('Funding', 'Förderung')}</dt>
                                            <dd className="mt-1 font-semibold text-gray-800">{txt(pick, project.fundingProgram)}</dd>
                                        </div>
                                        <div>
                                            <dt className="font-semibold uppercase tracking-wide text-gray-400">Budget</dt>
                                            <dd className="mt-1 font-semibold text-gray-800">{txt(pick, project.budget)}</dd>
                                        </div>
                                        <div>
                                            <dt className="font-semibold uppercase tracking-wide text-gray-400">{pick('Duration', 'Laufzeit')}</dt>
                                            <dd className="mt-1 font-semibold text-gray-800">{txt(pick, project.duration)}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                    <div className="grid gap-6 rounded-lg border border-gray-200 bg-gray-900 p-6 text-white sm:p-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                                {pick('Transfer with public and industry partners', 'Transfer mit öffentlichen und industriellen Partnern')}
                            </p>
                            <h2 className="mt-2 text-2xl font-bold">{pick('Interested in a transfer project?', 'Interesse an einem Transferprojekt?')}</h2>
                            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-300">
                                {pick(
                                    'We support partners from feasibility studies through publicly funded collaborative projects to robust AI demonstrators.',
                                    'Wir begleiten Partner von der Machbarkeitsstudie über öffentlich geförderte Verbundprojekte bis zum belastbaren KI-Demonstrator.',
                                )}
                            </p>
                        </div>
                        <a
                            href="mailto:bartelt@isse.tu-clausthal.de"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-primary-100"
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
