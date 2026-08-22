import ProjectLayout from '../../../components/tuc/ProjectLayout';
import FinishedProjectContent from '../../../components/tuc/FinishedProjectContent';
import { useLanguage } from '../../../i18n/useLanguage';

const NeuroCoreProject = () => {
    const { pick } = useLanguage();

    return (
    <ProjectLayout
        title="NeuroCore Dashboard"
        subtitle={pick('Live cluster telemetry and ML benchmarking through a Next.js dashboard', 'Live-Cluster-Telemetrie und ML-Benchmarking in einem Next.js-Dashboard')}
        tags={['MLOps', pick('Monitoring', 'Überwachung')]}
        overview={pick('NeuroCore connects to configured compute nodes over SSH, collects GPU, process, Slurm, and storage data, and presents the results in a Next.js dashboard. It also starts ML and performance benchmarks and stores historical snapshots for comparison over time.', 'NeuroCore verbindet sich per SSH mit konfigurierten Compute-Knoten, erfasst GPU-, Prozess-, Slurm- und Speicherdaten und stellt die Ergebnisse in einem Next.js-Dashboard dar. Außerdem startet es ML- und Leistungsbenchmarks und speichert historische Momentaufnahmen für zeitliche Vergleiche.')}
        heroVideo="/videos/demonstrations/neurocore/NeuroCore_demo.mp4"
        heroImage="/images/projects/neurocore/neurocore-dashboard.svg"
        heroCaption={pick('Live cluster monitoring and ML benchmark dashboard', 'Live-Clusterüberwachung und ML-Benchmark-Dashboard')}
        showHeroTags={false}
        showHeroOverview={false}
        showEvalSection={false}
        compact
    >
        <FinishedProjectContent
            showShowcase={false}
            showcase={{
                title: 'NeuroCore Dashboard',
                subtitle: 'Cluster telemetry and benchmarks',
                eyebrow: 'Next.js cluster dashboard',
                heading: 'GPU, node, job, and training metrics in one interface',
                body: 'Server-side API routes run commands such as nvidia-smi and Slurm queries on remote nodes. The frontend turns their output into live resource cards, job tables, storage views, training charts, and historical benchmark comparisons.',
                videoSrc: '/videos/demonstrations/neurocore/NeuroCore_demo.mp4',
                imageSrc: '/images/projects/neurocore/neurocore-dashboard.svg'
            }}
            summary={{
                title: pick('How NeuroCore collects and displays cluster state', 'Wie NeuroCore den Clusterzustand erfasst und darstellt'),
                paragraphs: [
                    pick('Next.js API routes open SSH connections to the configured nodes and parse command output for GPU utilization, memory, temperature, power, running GPU or CPU processes, Slurm partitions, and storage usage.', 'Next.js-API-Routen öffnen SSH-Verbindungen zu den konfigurierten Knoten und analysieren Befehlsausgaben zu GPU-Auslastung, Speicher, Temperatur, Leistung, laufenden GPU- oder CPU-Prozessen, Slurm-Partitionen und Speichernutzung.'),
                    pick('The React interface refreshes live data with SWR and uses charts to compare current and historical measurements. Benchmark views track training loss, perplexity, learning rate, evaluation metrics, and GPU performance across runs.', 'Die React-Oberfläche aktualisiert Live-Daten mit SWR und vergleicht aktuelle und historische Messwerte in Diagrammen. Benchmark-Ansichten verfolgen Trainingsverlust, Perplexität, Lernrate, Evaluationsmetriken und GPU-Leistung über mehrere Läufe hinweg.')
                ]
            }}
            focus={pick(
                ['Next.js and TypeScript', 'SSH node queries', 'nvidia-smi', 'Slurm monitoring', 'SWR data refresh', 'Recharts analytics', 'Docker deployment'],
                ['Next.js und TypeScript', 'SSH-Knotenabfragen', 'nvidia-smi', 'Slurm-Überwachung', 'SWR-Datenaktualisierung', 'Recharts-Analysen', 'Docker-Bereitstellung']
            )}
            artifacts={[
                pick('SSH data collectors parse GPU, process, Slurm, and storage information from each configured node', 'SSH-Datensammler analysieren GPU-, Prozess-, Slurm- und Speicherinformationen jedes konfigurierten Knotens'),
                pick('Dashboard views expose utilization, memory, temperature, power, queue state, and running jobs', 'Dashboard-Ansichten zeigen Auslastung, Speicher, Temperatur, Leistung, Warteschlangenstatus und laufende Jobs'),
                pick('Benchmark pages track ML training metrics and compare historical GPU performance snapshots', 'Benchmark-Seiten verfolgen ML-Trainingsmetriken und vergleichen historische GPU-Leistungsdaten')
            ]}
            materialTitle={pick('Dashboard source', 'Dashboard-Quellcode')}
            materialBody={pick('The repository contains the Next.js interface, SSH data collectors, API routes, benchmark scripts, charts, and Docker deployment configuration.', 'Das Repository enthält die Next.js-Oberfläche, SSH-Datensammler, API-Routen, Benchmark-Skripte, Diagramme und die Docker-Bereitstellungskonfiguration.')}
            materialHref="https://github.com/davszi/NeuroCore.git"
            materialLabel={pick('Open on GitHub', 'Auf GitHub öffnen')}
            materialIcon="github"
        />
    </ProjectLayout>
    );
};

export default NeuroCoreProject;
