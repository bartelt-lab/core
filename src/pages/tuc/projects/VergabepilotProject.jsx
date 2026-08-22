import ProjectLayout from '../../../components/tuc/ProjectLayout';
import FinishedProjectContent from '../../../components/tuc/FinishedProjectContent';
import { FiExternalLink } from 'react-icons/fi';
import assetUrl from '../../../utils/assetUrl';
import { useLanguage } from '../../../i18n/useLanguage';

const VergabepilotProject = () => {
    const { pick } = useLanguage();

    return (
    <ProjectLayout
        title="Vergabepilot.AI"
        titleHref="https://www.vergabepilot.ai/"
        subtitle={pick('Autonomous tender data extraction across changing procurement portals', 'Autonome Ausschreibungsdatenextraktion über wechselnde Vergabeportale hinweg')}
        tags={pick(['URL Intelligence', 'Cost-Aware Extraction', 'Browser Automation'], ['URL-Intelligenz', 'Kostenbewusste Extraktion', 'Browserautomatisierung'])}
        overview={pick('Vergabepilot.AI automates tender discovery across changing procurement portals. Its cost-aware pipeline moves from reusable scrapers to browser automation and AI extraction, remembers successful routes, and retrieved 97% of 100 German tenders for only $0.02 in model costs.', 'Vergabepilot.AI automatisiert die Suche nach Ausschreibungen über wechselnde Vergabeportale hinweg. Die kostenbewusste Pipeline reicht von wiederverwendbaren Scrapern über Browserautomatisierung bis zur KI-Extraktion, merkt sich erfolgreiche Routen und rief 97 von 100 deutschen Ausschreibungen für nur 0,02 US-Dollar Modellkosten ab.')}
        introBackgroundImage={assetUrl('/images/projects/vergabepilot/hero-workflow.webp')}
        introImageAlt={pick('Vergabepilot.AI workflow from tender discovery through cost-aware AI processing to decision-ready results', 'Vergabepilot.AI-Workflow von der Ausschreibungssuche über kostenbewusste KI-Verarbeitung bis zu entscheidungsreifen Ergebnissen')}
        introImageFit="contain"
        showEvalSection={false}
        softBackground
        compact
    >
        <FinishedProjectContent
            showcase={{
                title: 'Vergabepilot.AI walkthrough',
                mediaOnly: true,
                caption: pick('Tender extraction walkthrough · portal detection, adaptive retrieval, and document processing', 'Ausschreibungsextraktion · Portalerkennung, adaptiver Abruf und Dokumentverarbeitung'),
                videoSrc: '/videos/ai-team-projects/vergabepilot-walkthrough.mp4',
                poster: '/videos/ai-team-projects/vergabepilot-walkthrough-poster.webp'
            }}
            summary={{
                title: pick('How the extraction pipeline works', 'So funktioniert die Extraktionspipeline'),
                paragraphs: [
                    pick(
                        <>Each tender URL first passes through a <strong className="font-bold text-gray-800">URL intelligence layer</strong>, which identifies the portal type and selects the most suitable extraction order. The system then tries different strategies — from cached and deterministic methods to adaptive browser automation, LLM-generated scrapers, learned routes, and agent-based navigation.</>,
                        <>Jede Ausschreibungs-URL durchläuft zunächst eine <strong className="font-bold text-gray-800">URL-Intelligenzschicht</strong>, die den Portaltyp erkennt und die passende Extraktionsreihenfolge auswählt. Anschließend testet das System verschiedene Strategien – von gecachten und deterministischen Methoden bis zu adaptiver Browserautomatisierung, LLM-generierten Scrapern, gelernten Routen und agentenbasierter Navigation.</>
                    ),
                    pick(
                        <>The strategies are executed from <strong className="font-bold text-gray-800">cheaper and faster methods to more advanced ones</strong>, and the process stops as soon as one succeeds. The retrieved tender documents are then downloaded and processed to extract structured procurement information for further use or reporting.</>,
                        <>Die Strategien werden von <strong className="font-bold text-gray-800">günstigeren und schnelleren Methoden bis zu fortgeschrittenen Verfahren</strong> ausgeführt; der Prozess stoppt, sobald eine Strategie erfolgreich ist. Die abgerufenen Ausschreibungsdokumente werden anschließend heruntergeladen und verarbeitet, um strukturierte Vergabeinformationen für die weitere Nutzung oder Berichterstellung zu gewinnen.</>
                    )
                ],
                image: {
                    src: '/images/projects/vergabepilot/cost-aware-extraction-pipeline.webp',
                    alt: pick('Cost-aware tender extraction pipeline from URL intelligence through reusable extraction strategies to structured procurement data', 'Kostenbewusste Ausschreibungsextraktion von der URL-Intelligenz über wiederverwendbare Strategien bis zu strukturierten Vergabedaten'),
                    caption: pick('Cost-aware extraction from tender URL to structured data.', 'Kostenbewusste Extraktion von der Ausschreibungs-URL zu strukturierten Daten.'),
                    width: 1600,
                    height: 880
                }
            }}
            focus={pick(
                ['URL Intelligence', 'Cost-aware extraction', 'Playwright automation', 'LLM-generated scrapers', 'Self-healing', 'Computer Use Agent', 'Document extraction', 'Scraper caching'],
                ['URL-Intelligenz', 'Kostenbewusste Extraktion', 'Playwright-Automatisierung', 'LLM-generierte Scraper', 'Selbstheilung', 'Computer-Use-Agent', 'Dokumentextraktion', 'Scraper-Caching']
            )}
            artifacts={[
                pick('Portal-specific strategy selection reduces unnecessary processing and AI calls', 'Portalspezifische Strategieauswahl reduziert unnötige Verarbeitung und KI-Aufrufe'),
                pick('Failed LLM-generated scrapers can automatically be corrected and retried', 'Fehlgeschlagene LLM-generierte Scraper können automatisch korrigiert und erneut ausgeführt werden'),
                pick('Successful scrapers and navigation routes are stored and reused for future tender URLs', 'Erfolgreiche Scraper und Navigationsrouten werden gespeichert und für künftige Ausschreibungs-URLs wiederverwendet')
            ]}
            benchmark={{
                eyebrow: pick('Model evaluation', 'Modellevaluation'),
                title: pick('Multi-model benchmarking', 'Multi-Modell-Benchmarking'),
                description: pick('Nine models were compared using extraction success, response latency, and cost per run. Gemini 2.5 Flash Lite achieved the strongest overall balance in this benchmark.', 'Neun Modelle wurden anhand von Extraktionserfolg, Antwortlatenz und Kosten pro Lauf verglichen. Gemini 2.5 Flash Lite erzielte in diesem Benchmark die beste Gesamtbalance.'),
                highlights: [
                    { label: pick('Best model', 'Bestes Modell'), value: 'Gemini 2.5 Flash Lite' },
                    { label: pick('Extraction success', 'Extraktionserfolg'), value: '83%' },
                    { label: pick('Latency', 'Latenz'), value: '4.176 ms' },
                    { label: pick('Cost per run', 'Kosten pro Lauf'), value: '0,00181 $' }
                ],
                image: {
                    src: '/images/projects/vergabepilot/multi-model-benchmark.png',
                    alt: pick('Benchmark table comparing model extraction success, latency, and cost per run', 'Benchmark-Tabelle zum Vergleich von Extraktionserfolg, Latenz und Kosten pro Lauf'),
                    caption: pick('Extraction success, latency, and cost across nine language models.', 'Extraktionserfolg, Latenz und Kosten für neun Sprachmodelle.'),
                    width: 1498,
                    height: 1050
                }
            }}
            showMaterial={false}
        />
        <div className="mx-auto mt-12 flex max-w-6xl justify-center px-4">
            <a
                href="https://www.ciconia-systems.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 rounded-2xl border border-slate-200/70 bg-white/75 px-5 py-3 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.55)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-[0_22px_55px_-38px_rgba(15,23,42,0.5)]"
                aria-label={pick('Ciconia Systems website', 'Website von Ciconia Systems')}
            >
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{pick('In collaboration with', 'In Zusammenarbeit mit')}</span>
                <img
                    src={assetUrl('/logos/partners/ciconia-systems.webp')}
                    alt="Ciconia Systems"
                    width="500"
                    height="192"
                    className="h-9 w-auto rounded-md"
                />
                <FiExternalLink className="h-3.5 w-3.5 shrink-0 text-slate-400 transition-colors group-hover:text-primary-600" aria-hidden="true" />
            </a>
        </div>
    </ProjectLayout>
    );
};

export default VergabepilotProject;
