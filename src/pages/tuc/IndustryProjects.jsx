import {
    FiArrowUpRight,
    FiMail,
    FiShield,
} from 'react-icons/fi';
import assetUrl from '../../utils/assetUrl';

const projects = [
    {
        slug: 'ai-bim',
        title: 'AI-BIM',
        domain: 'Bau & BIM',
        topic: 'KI-Co-Pilot für nachhaltige Architekturplanung',
        partners: ['neoBIM', 'Cogintal Ltd.'],
        duration: '3 Jahre',
        fundingProgram: 'BMFTR',
        budget: '2,0 Mio. EUR / 140 Tsd. EUR',
        summary:
            'AI-BIM entwickelt einen KI-gestützten Co-Piloten, der nachhaltige Architekturentwürfe unter Einbezug von Umweltstandards planbar und optimierbar macht.',
        contribution:
            'Unsere Rolle liegt in der Entwicklung und Integration der Co-Pilot-Architektur, damit KI-Modelle konkrete Planungsentscheidungen unterstützen statt nur Entwurfsvarianten zu erzeugen.',
        visual: assetUrl('/images/projects/industry/ai-bim.webp'),
    },
    {
        slug: 'show2instruct',
        title: 'Show2Instruct',
        domain: 'Bau & BIM',
        topic: 'Multimodaler BIM-Copilot für maschinenlesbare Anweisungen',
        partners: ['neoBIM', 'Ramblr GmbH', 'University of Rostock'],
        duration: '3 Jahre',
        fundingProgram: 'BMFTR',
        budget: '2,6 Mio. EUR / 670 Tsd. EUR',
        summary:
            'Show2Instruct übersetzt natürlichsprachige Bedieninteraktion und visuelle Objektreferenzen in maschinenverarbeitbare Steuerbefehle für BIM-Kontexte.',
        contribution:
            'Wir integrieren Foundation-Model-basierte KI-Architekturen und arbeiten an der Zuverlässigkeit multimodaler BIM-Copiloten, die Fachwissen, Modelldaten und Werkzeugaufrufe verbinden.',
        visual: assetUrl('/images/projects/industry/show2instruct.webp'),
    },
    {
        slug: 'lelamar',
        title: 'LeLaMar',
        domain: 'Gesundheit & Einsatzsysteme',
        topic: 'KI-Prototypen für Rettungsleitstellen',
        partners: ['ILS Mannheim gGmbH'],
        duration: '0,5 Jahre',
        fundingProgram: 'Industrie / Transfer',
        budget: '30 Tsd. EUR',
        summary:
            'LeLaMar untersucht KI-Use-Cases für Rettungsleitstellen, um Notrufdaten schneller zu strukturieren, Einsatzlagen zu erkennen und Zusammenhänge zwischen mehreren Anrufen sichtbar zu machen.',
        contribution:
            'Wir entwickeln und evaluieren Proof-of-Concepts für Transkription, Risikoanalyse, Event Linking, Event Tracking und ad-hoc erzeugte Einsatz-Zusammenfassungen.',
        visual: assetUrl('/images/projects/industry/lelamar.webp'),
    },
    {
        slug: 'medicar',
        title: 'MediCar 4.0',
        domain: 'Gesundheit & Einsatzsysteme',
        topic: 'Autonome On-Demand-Transportsysteme für Kliniken',
        partners: ['SEW-Eurodrive', 'Things Alive Robotics', 'insensiv', 'FZI', 'Fraunhofer IML'],
        duration: '3 Jahre',
        fundingProgram: 'BMFTR',
        budget: '3,5 Mio. EUR / 800,7 Tsd. EUR',
        summary:
            'MediCar 4.0 entwickelt hochautomatisierte E-Fahrzeugsysteme und modulare Container für sichere On-Demand-Transportprozesse in Krankenhäusern.',
        contribution:
            'Unser Beitrag ist die robuste Multi-Agenten-Koordination autonomer Fahrzeugflotten sowie die Absicherung ihres Verhaltens in dynamischen Klinikfluren mit Menschen, Übergabepunkten und wechselnden Transportaufträgen.',
        visual: assetUrl('/images/projects/industry/medicar.webp'),
    },
    {
        slug: 'maas-cu',
        title: 'MaaS-CU',
        domain: 'Kreislaufwirtschaft & Handel',
        topic: 'Optimierung von Mehrwegkreisläufen',
        partners: ['CU Mehrweg GmbH'],
        duration: '2 Jahre',
        fundingProgram: 'BMWE / VDI VDE IT',
        budget: '180 Tsd. EUR',
        summary:
            'MaaS-CU modelliert Mehrweg-as-a-Service-Prozesse für die Lebensmittelindustrie, damit Umlaufzahlen, Engpässe und Kosten datengetrieben optimiert werden können.',
        contribution:
            'Wir entwickeln ML-basierte Analysen für den Produktzyklus, einschließlich Digital-Twin-Logik, Bottleneck Detection, Outlier-Analyse und entscheidungsfähigen Frontend-Sichten für operative Nutzer.',
        visual: assetUrl('/images/projects/industry/maas-cu.webp'),
    },
    {
        slug: 'maimuse',
        title: 'mAImuse',
        domain: 'Kreislaufwirtschaft & Handel',
        topic: 'Personalisierte virtuelle Anprobe',
        partners: ['Scannery GmbH'],
        duration: '1,5 Jahre',
        fundingProgram: 'BMFTR',
        budget: '292 Tsd. EUR / 173 Tsd. EUR',
        summary:
            'mAImuse optimiert virtuelle Kleidungsanprobe durch KI-gestützte Bilderkennung und personalisierte Produktvorschläge auf Basis individueller Körperformen.',
        contribution:
            'Wir definieren die technischen Anforderungen, bewerten Bild-, 3D- und Virtual-Try-On-Modelle und integrieren Vision-KI prototypisch in einen Demonstrator für Passform- und Erscheinungsbewertung.',
        visual: assetUrl('/images/projects/industry/maimuse.webp'),
    },
    {
        slug: 'physical-guards',
        title: 'Physical Guards',
        domain: 'Sicherheit & IoT',
        topic: 'Intrusion Detection aus physikalischen Signalparametern',
        partners: ['University of Mannheim', 'M2M', 'Osapiens'],
        duration: '3 Jahre',
        fundingProgram: 'BMFTR',
        budget: '2,2 Mio. EUR / 327 Tsd. EUR',
        summary:
            'Physical Guards adressiert IoT-Sicherheit in Smart Home, Produktion und sensibler Infrastruktur über physikalische Signalparameter statt isolierter Sensormeldungen.',
        contribution:
            'Wir entwickeln KI-basierte Verfahren für multivariate Zeitreihen, Autoencoder-gestützte Intrusion Detection und interpretierbare System-Fingerprints, mit denen Manipulationen einzelner Sensoren im Gesamtkontext erkannt werden.',
        visual: null,
    },
];

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

const PhysicalSignalVisual = () => (
    <div className="flex h-full min-h-[220px] flex-col justify-between bg-slate-950 p-6 text-white">
        <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-300">
                <FiShield className="h-4 w-4" aria-hidden="true" />
                Signal-Fingerabdruck
            </div>
            <p className="max-w-sm text-sm leading-6 text-slate-300">
                Sensoren werden als verbundenes physikalisches System bewertet, sodass manipulierte Einzelsignale im
                Raumkontext auffallen.
            </p>
        </div>
        <div className="grid grid-cols-4 items-end gap-3">
            {[72, 46, 88, 58, 64, 36, 80, 52].map((height, index) => (
                <div key={height + index} className="flex flex-col items-center gap-2">
                    <div
                        className={`w-full rounded-sm ${index === 5 ? 'bg-rose-400' : 'bg-primary-400'}`}
                        style={{ height }}
                    />
                    <span className={`h-2 w-2 rounded-full ${index === 5 ? 'bg-rose-400' : 'bg-slate-500'}`} />
                </div>
            ))}
        </div>
    </div>
);

const ProjectVisual = ({ project }) => {
    if (!project.visual) return <PhysicalSignalVisual />;

    return (
        <img
            src={project.visual}
            alt={`Projektvisualisierung zu ${project.title}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
        />
    );
};

const IndustryProjects = () => {
    return (
        <>
            <section className="border-b border-gray-200 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
                        Transfer & öffentliche Förderung
                    </p>
                    <h1 className="max-w-3xl text-3xl font-bold leading-tight text-gray-900 sm:text-5xl">
                        Industrieprojekte
                    </h1>
                    <p className="mt-5 max-w-3xl text-base leading-8 text-gray-600 sm:text-lg">
                        Wir entwickeln angewandte KI-Systeme in öffentlich geförderten und industrienahen
                        Transferprojekten. Im Mittelpunkt stehen robuste Demonstratoren, nachvollziehbare
                        KI-Architekturen und Lösungen, die in realen Abläufen von Bauwesen, Gesundheit,
                        Kreislaufwirtschaft, Handel und IoT-Sicherheit bestehen müssen.
                    </p>
                </div>
            </section>

            <section className="bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project) => (
                            <article
                                key={project.slug}
                                className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
                            >
                                <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                                    <ProjectVisual project={project} />
                                </div>
                                <div className="flex flex-1 flex-col p-5">
                                    <div className="mb-4">
                                        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${domainClass(project.domain)}`}>
                                            {project.domain}
                                        </span>
                                    </div>

                                    <h2 className="text-xl font-bold text-gray-900">{project.title}</h2>
                                    <p className="mt-2 text-sm font-semibold text-primary-700">{project.topic}</p>
                                    <div className="mt-4 space-y-3 text-sm leading-6 text-gray-600">
                                        <p>{project.summary}</p>
                                        <p>{project.contribution}</p>
                                    </div>

                                    <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-gray-200 pt-5 text-xs">
                                        <div>
                                            <dt className="font-semibold uppercase tracking-wide text-gray-400">Förderung</dt>
                                            <dd className="mt-1 font-semibold text-gray-800">{project.fundingProgram}</dd>
                                        </div>
                                        <div>
                                            <dt className="font-semibold uppercase tracking-wide text-gray-400">Budget</dt>
                                            <dd className="mt-1 font-semibold text-gray-800">{project.budget}</dd>
                                        </div>
                                        <div>
                                            <dt className="font-semibold uppercase tracking-wide text-gray-400">Laufzeit</dt>
                                            <dd className="mt-1 font-semibold text-gray-800">{project.duration}</dd>
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
                                Transfer mit öffentlichen und industriellen Partnern
                            </p>
                            <h2 className="mt-2 text-2xl font-bold">Interesse an einem Transferprojekt?</h2>
                            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-300">
                                Wir begleiten Partner von der Machbarkeitsstudie über öffentlich geförderte
                                Verbundprojekte bis zum belastbaren KI-Demonstrator.
                            </p>
                        </div>
                        <a
                            href="mailto:bartelt@isse.tu-clausthal.de"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-primary-100"
                        >
                            <FiMail className="h-4 w-4" aria-hidden="true" />
                            Kontakt aufnehmen
                            <FiArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};

export default IndustryProjects;
