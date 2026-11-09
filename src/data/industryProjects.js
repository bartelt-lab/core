import assetUrl from '../utils/assetUrl';

/**
 * Industry / transfer projects shown on /tuc/industry-projects.
 *
 * Text fields are [German, English] pairs. An entry with `href` gets a clickable
 * tile that opens its detail page (currently only MediCar 4.0).
 */
export const projects = [
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
        href: '/tuc/industry-projects/medicar',
        domain: ['Gesundheit & Einsatzsysteme', 'Healthcare & emergency response systems'],
        topic: ['Autonome On-Demand-Transportsysteme für Kliniken', 'Autonomous on-demand transport systems for hospitals'],
        // Consortium per medicar40.de/konsortium (bridgingIT leads) and fzi.de/project/medicar-40,
        // plus the pilot hospital, which is the field-trial site rather than a consortium member.
        // Order is deliberate: lead, pilot hospital, SEW, TU Clausthal, then the rest.
        partners: [
            'bridgingIT',
            'University Medical Center Freiburg',
            'SEW-Eurodrive',
            'TU Clausthal',
            'Things Alive Robotics',
            'insensiv',
            'FZI',
            'Fraunhofer IML',
        ],
        duration: ['3 Jahre', '3 years'],
        fundingProgram: ['BMFTR', 'BMFTR'],
        budget: ['3,5 Mio. EUR', 'EUR 3.5M'],
        summary: [
            'MediCar 4.0 entwickelt hochautomatisierte E-Fahrzeugsysteme und modulare Container für sichere On-Demand-Transportprozesse in Krankenhäusern.',
            'MediCar 4.0 develops highly automated electric vehicle systems and modular containers for safe on-demand transport processes in hospitals.',
        ],
        contribution: [
            'Wir entwickeln lernfähiges Routing mit großen Sprachmodellen, das Meldungen aus dem Klinikbetrieb in Echtzeit in neue Routen übersetzt, sowie Roboter, die Transportboxen autonom be- und entladen. Trainiert und abgesichert wird auf dem GenAI-Cluster der TU Clausthal.',
            'We develop adaptive routing with large language models that turns reports from hospital staff into new routes in real time, and robots that load and unload transport boxes autonomously. Training and validation run on the TU Clausthal GenAI-Cluster.',
        ],
        visual: assetUrl('/images/projects/industry/medicar.webp'),
        // `feature` puts the project in the large card above the grid on
        // /tuc/industry-projects. The images are the ones its detail page shows.
        feature: {
            badge: ['Feldversuch am Universitätsklinikum Freiburg', 'Field trial at the University Medical Center Freiburg'],
            // id in src/data/videos.js; the card shows that the detail page carries the film
            film: 'medicar',
            gallery: [
                {
                    src: assetUrl('/images/projects/industry/medicar/corridor.webp'),
                    // object-position: the robot sits right of centre in this frame
                    focus: '61% 50%',
                    label: ['Im Klinikbetrieb', 'On duty'],
                    alt: [
                        'MediCar-Transportroboter mit blauen Transportboxen im Foyer einer Klinik',
                        'MediCar transport robot carrying blue transport boxes in a hospital lobby',
                    ],
                },
                {
                    src: assetUrl('/images/projects/industry/medicar/routing-severity.webp'),
                    label: ['LLM-Routing', 'LLM routing'],
                    alt: [
                        'Wegabschnitte auf dem Klinikcampus, eingefärbt nach Schweregrad der Beeinträchtigung',
                        'Path segments on the hospital campus, coloured by how severely they are affected',
                    ],
                },
                {
                    // Still from the project film at 1:47.5 (public/videos/industry-projects/medicar.mp4)
                    src: assetUrl('/images/projects/industry/medicar/lidar-pointcloud.webp'),
                    focus: '68% 60%',
                    label: ['Lidar-Sicht', 'Lidar view'],
                    alt: [
                        'Transportroboter auf einem Klinikhof, daneben eine farbige Lidar-Punktwolke der Umgebung',
                        'Transport robot in a hospital courtyard, next to a coloured lidar point cloud of its surroundings',
                    ],
                },
                {
                    src: assetUrl('/images/projects/industry/medicar/humanoid.webp'),
                    label: ['Robotik', 'Robotics'],
                    alt: [
                        'Humanoider Roboter im Labor an einem Tisch mit Kühlbox und Probenröhrchen',
                        'Humanoid robot in the lab at a bench with a cooler box and sample tubes',
                    ],
                },
            ],
        },
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

/** Partner logos, keyed by the names used in `partners` above. A partner without an entry renders as text. */
export const PARTNER_LOGOS = {
    neoBIM: { src: assetUrl('/logos/partners/neobim.svg'), alt: 'neoBIM logo', href: 'https://neobim.ai/' },
    'Cogintal Ltd.': { src: assetUrl('/logos/partners/cogintal.svg'), alt: 'Cogintal Ltd. logo' },
    'Ramblr GmbH': { src: assetUrl('/logos/partners/ramblr.svg'), alt: 'Ramblr logo', href: 'https://ramblr.ai/' },
    'TU Clausthal': { src: assetUrl('/logos/tu-clausthal.webp'), alt: 'TU Clausthal logo', href: 'https://www.tu-clausthal.de/en/' },
    'University of Rostock': { src: assetUrl('/logos/rostock-logo.webp'), alt: 'University of Rostock logo', href: 'https://www.uni-rostock.de/en/' },
    'ILS Mannheim gGmbH': { src: assetUrl('/logos/partners/ils-mannheim.jpg'), alt: 'ILS Mannheim logo', href: 'https://www.ils-mannheim.de/' },
    bridgingIT: { src: assetUrl('/logos/partners/bridgingit.png'), alt: 'bridgingIT logo', href: 'https://www.bridging-it.de/' },
    'University Medical Center Freiburg': {
        src: assetUrl('/logos/partners/uniklinik-freiburg.webp'),
        alt: 'Universitätsklinikum Freiburg logo',
        href: 'https://www.uniklinik-freiburg.de/',
    },
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

/** Pill colours per domain (keyed by the German label). */
export const domainClass = (domain) => {
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
            return 'border-slate-200 bg-slate-50 text-slate-700';
    }
};
