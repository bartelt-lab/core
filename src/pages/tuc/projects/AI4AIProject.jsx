import ProjectLayout from '../../../components/tuc/ProjectLayout';
import FinishedProjectContent from '../../../components/tuc/FinishedProjectContent';
import LazyVideo from '../../../components/common/LazyVideo';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import assetUrl from '../../../utils/assetUrl';
import { useLanguage } from '../../../i18n/useLanguage';

const demonstrators = (pick) => [
    {
        eyebrow: pick('Building intelligence', 'Gebäudeintelligenz'),
        title: pick('IFC Layout Generator', 'IFC-Layoutgenerator'),
        paragraphs: [pick(
            'Upload an IFC model to extract storeys, rooms, walls, floor areas, metadata, and geometry with IfcOpenShell. The browser renders room volumes as 3D boxes, while a model summary powers plain-language questions about the building.',
            'Ein IFC-Modell wird hochgeladen, damit IfcOpenShell Geschosse, Räume, Wände, Bodenflächen, Metadaten und Geometrie extrahiert. Der Browser stellt Raumvolumen als 3D-Boxen dar; eine Modellzusammenfassung ermöglicht Fragen zum Gebäude in natürlicher Sprache.'
        )],
        details: pick(
            ['IfcOpenShell extraction', '3D room visualisation', 'Natural-language BIM Q&A'],
            ['IfcOpenShell-Extraktion', '3D-Raumvisualisierung', 'BIM-Fragen in natürlicher Sprache']
        ),
        videoSrc: '/videos/ai-team-projects/ai4bim/ifc-layout.mp4',
        poster: '/videos/ai-team-projects/ai4bim/ifc-layout-poster.webp',
    },
    {
        eyebrow: pick('Computer vision', 'Computer Vision'),
        title: pick('Room Classifier', 'Raumklassifikator'),
        paragraphs: [pick(
            'A vision model classifies an uploaded room photo and returns confidence scores. Fine-tuned variants reached roughly 98% on their training dataset but generalised poorly, while the base model remained steadier at 86–89% across both datasets.',
            'Ein Vision-Modell klassifiziert ein hochgeladenes Raumfoto und liefert Konfidenzwerte. Feinabgestimmte Varianten erreichten auf ihrem Trainingsdatensatz rund 98 Prozent, generalisierten jedoch schwächer; das Basismodell blieb mit 86–89 Prozent über beide Datensätze hinweg stabiler.'
        )],
        details: pick(
            ['Room-type prediction', 'Confidence scores', 'Cross-dataset benchmarking'],
            ['Raumtypvorhersage', 'Konfidenzwerte', 'Datensatzübergreifendes Benchmarking']
        ),
        videoSrc: '/videos/ai-team-projects/ai4bim/room-classifier.mp4',
        poster: '/videos/ai-team-projects/ai4bim/room-classifier-poster.webp',
    },
    {
        eyebrow: pick('Machine learning', 'Maschinelles Lernen'),
        title: pick('House Price Prediction', 'Hauspreisvorhersage'),
        paragraphs: [pick(
            'A demonstrator connecting structured building attributes to a trained model: an XGBoost regressor estimates a price from living area, bedrooms, bathrooms, construction year, and kitchen count, using a model trained on a public US housing dataset.',
            'Dieser Demonstrator verbindet strukturierte Gebäudemerkmale mit einem trainierten Modell: Ein XGBoost-Regressor schätzt den Preis anhand von Wohnfläche, Schlaf- und Badezimmern, Baujahr und Küchenanzahl. Das Modell wurde mit einem öffentlichen US-Wohnungsdatensatz trainiert.'
        )],
        details: pick(
            ['XGBoost regression', 'Five-property input workflow', 'Public US housing dataset'],
            ['XGBoost-Regression', 'Workflow mit fünf Eingabemerkmalen', 'Öffentlicher US-Wohnungsdatensatz']
        ),
        videoSrc: '/videos/ai-team-projects/ai4bim/house-price-prediction.mp4',
        poster: '/videos/ai-team-projects/ai4bim/house-price-prediction-poster.webp',
    },
];

const DemonstratorVideos = ({ pick }) => (
    <section aria-labelledby="ai4bim-demonstrators" className="mx-auto max-w-6xl pt-10">
        <div className="mb-8 max-w-3xl px-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">
                {pick('Demonstrators in action', 'Demonstratoren in Aktion')}
            </p>
            <h2 id="ai4bim-demonstrators" className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                {pick('See the AI4BIM workflows', 'AI4BIM-Workflows ansehen')}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
                {pick(
                    'Three short walkthroughs show how building-data extraction, computer vision, and predictive machine learning support different stages of a building workflow.',
                    'Drei kurze Rundgänge zeigen, wie Gebäudedatenextraktion, Computer Vision und prädiktives maschinelles Lernen verschiedene Phasen eines Gebäudeworkflows unterstützen.'
                )}
            </p>
        </div>

        <div className="space-y-8">
            {demonstrators(pick).map((demo, index) => {
                const videoOnRight = index % 2 === 1;
                return (
                    <article
                        key={demo.title}
                        className="grid overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white/70 shadow-[0_26px_75px_-58px_rgba(15,23,42,0.55)] backdrop-blur-sm lg:h-[22rem] lg:grid-cols-2 lg:items-stretch"
                    >
                        <div className={`flex min-h-0 items-center bg-gradient-to-br from-slate-50/90 via-white/70 to-primary-50/35 p-2.5 sm:p-3 ${videoOnRight ? 'lg:order-2' : ''}`}>
                            <LazyVideo
                                src={assetUrl(demo.videoSrc)}
                                poster={assetUrl(demo.poster)}
                                controls
                                autoPlay
                                muted
                                loop
                                aria-label={`${demo.title} ${pick('walkthrough', 'Rundgang')}`}
                                className="aspect-video max-h-full w-full rounded-[1.4rem] border border-slate-200/70 bg-slate-50 object-contain shadow-[0_18px_50px_-40px_rgba(15,23,42,0.55)]"
                            />
                        </div>
                        <div className={`flex flex-col justify-center p-7 sm:p-8 ${videoOnRight ? 'lg:order-1' : ''}`}>
                            <div className="flex items-center gap-3">
                                <span className="font-mono text-sm font-bold text-primary-700">{String(index + 1).padStart(2, '0')}</span>
                                <span className="h-px w-10 bg-primary-200" aria-hidden="true" />
                                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">{demo.eyebrow}</p>
                            </div>
                            <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{demo.title}</h3>
                            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600 sm:text-base">
                                {demo.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                            </div>
                            <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${demo.title} ${pick('capabilities', 'Funktionen')}`}>
                                {demo.details.map((detail) => (
                                    <li key={detail} className="rounded-full border border-primary-100 bg-primary-50/80 px-3 py-1.5 text-xs font-bold text-primary-800">{detail}</li>
                                ))}
                            </ul>
                        </div>
                    </article>
                );
            })}
        </div>
    </section>
);

const TechnicalDetails = ({ pick }) => (
    <section className="mx-auto max-w-6xl pt-8">
        <div className="grid gap-8 rounded-[2rem] border border-slate-200/70 bg-white/70 p-7 shadow-[0_24px_70px_-55px_rgba(15,23,42,0.5)] backdrop-blur-sm sm:grid-cols-2 sm:p-8">
            <div>
                <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">{pick('Technical focus', 'Technischer Fokus')}</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                    {pick(
                        ['IFC processing', 'BIM Q&A', 'XGBoost', 'Room classification', 'Stable Diffusion', 'Flask / Next.js'],
                        ['IFC-Verarbeitung', 'BIM-Fragen und Antworten', 'XGBoost', 'Raumklassifikation', 'Stable Diffusion', 'Flask / Next.js']
                    ).map((item) => (
                        <li key={item} className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-700">{item}</li>
                    ))}
                </ul>
            </div>
            <div className="border-gray-200 sm:border-l sm:pl-8">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">{pick('Implementation', 'Implementierung')}</h2>
                <ul className="mt-3 space-y-2 text-sm font-semibold leading-6 text-gray-700">
                    <li>{pick('IfcOpenShell structures building data.', 'IfcOpenShell strukturiert Gebäudedaten.')}</li>
                    <li>{pick('ML models provide predictions and generation.', 'ML-Modelle liefern Vorhersagen und generative Ergebnisse.')}</li>
                    <li>{pick('Flask and Next.js connect the platform.', 'Flask und Next.js verbinden die Plattform.')}</li>
                </ul>
            </div>
        </div>
    </section>
);

const GitHubSection = ({ pick }) => (
    <section aria-labelledby="ai4bim-source" className="mx-auto max-w-6xl pt-8">
        <div className="flex flex-col gap-5 rounded-[2rem] border border-slate-200/70 bg-white/75 p-6 shadow-[0_24px_70px_-55px_rgba(15,23,42,0.5)] backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div className="flex items-start gap-4 sm:items-center">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-950 text-white shadow-sm">
                    <FaGithub className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">
                        {pick('Source repository', 'Quellcode-Repository')}
                    </p>
                    <h2 id="ai4bim-source" className="mt-1.5 text-xl font-bold text-slate-950 sm:text-2xl">
                        {pick('Explore AI4BIM on GitHub', 'AI4BIM auf GitHub entdecken')}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                        {pick(
                            'View the implementation, project structure, and setup documentation for the AI4BIM platform.',
                            'Implementierung, Projektstruktur und Einrichtungsdokumentation der AI4BIM-Plattform ansehen.'
                        )}
                    </p>
                </div>
            </div>
            <a
                href="https://github.com/Show2Instruct/AI4BIM"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md"
            >
                {pick('Open on GitHub', 'Auf GitHub öffnen')}
                <FiExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
        </div>
    </section>
);

const AI4AIProject = () => {
    const { pick } = useLanguage();
    return (
        <ProjectLayout
            title="AI4BIM"
            subtitle={pick('AI-assisted Building Information Modeling for intelligent analysis, prediction, and design', 'KI-gestütztes Building Information Modeling für intelligente Analyse, Vorhersage und Gestaltung')}
            tags={pick(['IFC / BIM', 'Machine Learning', 'Generative AI'], ['IFC / BIM', 'Maschinelles Lernen', 'Generative KI'])}
            overview={pick(
                'AI4BIM turns building data into practical analysis and early design support. One web platform combines IFC exploration and BIM questions with room classification, house-price prediction, and generative layout tools.',
                'AI4BIM überführt Gebäudedaten in praktische Analysen und frühe Entwurfsunterstützung. Eine Webplattform verbindet IFC-Erkundung und BIM-Fragen mit Raumklassifikation, Hauspreisvorhersage und generativen Layoutwerkzeugen.'
            )}
            introBackgroundImage={assetUrl('/images/projects/ai4ai/showcase-background-clean.webp')}
            introImageAlt={pick('AI4BIM architectural model illustration', 'Illustration eines AI4BIM-Architekturmodells')}
            introImageStyle={{ transform: 'scale(1.65)', objectPosition: 'center 72%' }}
            showEvalSection={false}
            softBackground
            compact
        >
            <FinishedProjectContent
                showcase={{
                    title: 'AI4BIM platform walkthrough',
                    mediaOnly: true,
                    caption: pick('IFC Explorer · model upload, 3D room exploration, and BIM question answering', 'IFC Explorer · Modell-Upload, 3D-Raumerkundung und BIM-Fragen'),
                    videoSrc: '/videos/ai-team-projects/ai4bim-platform-walkthrough.mp4',
                    poster: '/videos/ai-team-projects/ai4bim-platform-walkthrough-poster.webp'
                }}
                showDetails={false}
                showMaterial={false}
            />
            <DemonstratorVideos pick={pick} />
            <TechnicalDetails pick={pick} />
            <GitHubSection pick={pick} />
        </ProjectLayout>
    );
};

export default AI4AIProject;
