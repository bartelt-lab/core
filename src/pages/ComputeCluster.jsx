import { Link } from 'react-router-dom'
import {
  FaDatabase,
  FaMicrochip,
  FaNetworkWired,
  FaCogs,
  FaUniversity,
  FaCheckCircle,
  FaArrowRight,
  FaShieldAlt,
} from 'react-icons/fa'
import PublicationCarousel from '../components/publications/PublicationCarousel'
import assetUrl from '../utils/assetUrl'
import { useLanguage } from '../i18n/useLanguage'

// ─── Data ──────────────────────────────────────────────────────────────────

const clusterStats = [
  { label: 'Total Nodes', value: '5', icon: FaNetworkWired, description: '1 Login, 4 Workers' },
  { label: 'NVIDIA GPUs', value: '16', icon: FaMicrochip, description: '8x H200, 8x RTX 6000' },
  { label: 'Funding', value: '€400k+', icon: FaUniversity, description: 'EU & Niedersachsen' },
  { label: 'Scheduler', value: 'Slurm', icon: FaCogs, description: 'Resource manager' },
]

const capabilities = [
  {
    icon: FaMicrochip,
    title: 'High-Performance Nodes',
    tag: '2 Nodes · H200 GPUs',
    description:
      'Two high-performance worker nodes, each hosting up to 8 NVIDIA H200 NVL GPUs (minimum 8 H200 GPUs total) interconnected via NVLink for maximum data throughput.',
    points: ['Up to 8 H200 NVL per node', 'Optimized for model fine-tuning up to 70B', 'Inference of Llama 3, Qwen 3, Gemma 3'],
  },
  {
    icon: FaMicrochip,
    title: 'Mid-Performance Nodes',
    tag: '2 Nodes · RTX 6000 GPUs',
    description:
      'Two mid-performance worker nodes hosting up to 8 NVIDIA RTX PRO 6000 Blackwell Max-Q GPUs. Tailored for resource-efficient training and vision models.',
    points: ['Blackwell Max-Q GPU architecture', 'Optimized for training models < 3B', 'Supports vision models (SAM, CLIP)'],
  },
  {
    icon: FaDatabase,
    title: 'Storage & Master Node',
    tag: 'Fileserver · ≥ 150 TB',
    description:
      'A master node and fileserver equipped with ≥ 150 TB of high-speed persistent storage to manage large datasets, model checkpoints, and evaluation runs.',
    points: ['≥ 150 TB persistent storage capacity', 'Centralized checkpoint registry', 'Secure, high-availability backups'],
  },
  {
    icon: FaNetworkWired,
    title: 'InfiniBand Network Interconnect',
    tag: 'Up to 200 Gbit/s',
    description:
      'High-speed InfiniBand network interface running up to 200 Gbit/s to minimize latency and maximize transfer rates during distributed training operations.',
    points: ['200 Gbit/s maximum throughput', 'Low latency multi-GPU sync', 'Fast dataset streaming from fileserver'],
  },
]

const infrastructure = [
  {
    site: 'batch (Default)',
    location: 'Non-interactive partition',
    role: 'All Cluster Nodes',
    specs: ['Default queue for sbatch jobs', 'Supports long-running training tasks', 'Max duration up to 36 hours (llm-research)'],
    color: 'blue',
  },
  {
    site: 'interactive',
    location: 'Interactive partition',
    role: 'RTX 6000 Pro Nodes Only',
    specs: ['Enables srun --pty bash or salloc sessions', 'Strict 6-hour time limit per session', 'Ideal for debugging and GPU checking'],
    color: 'emerald',
  },
  {
    site: 'Login / Frontend',
    location: 'cloud-201.rz.tu-clausthal.de',
    role: 'Gateway Node (Rechenzentrum)',
    specs: ['Located at the Computing Center of TU Clausthal', 'For editing code, data upload, and scheduling', 'Strictly no compute workloads allowed'],
    color: 'violet',
  },
]

const policies = [
  {
    title: 'Workshops & Open Lab',
    items: [
      'Regular workshops presenting the infrastructure to science, start-ups, and industry.',
      'Active initiation of collaborative research and engineering projects.',
      'Workshops registration opens after cluster commissioning (by Sep 1, 2025).',
    ],
  },
  {
    title: 'Innovation Hub',
    items: [
      'Connects regional universities and enterprises to strengthen technology transfer.',
      'Directly supports the Lower Saxony RIS3 innovation strategy.',
      'Enables resource-efficient design, circular production, and cognitive robotics.',
    ],
  },
  {
    title: 'User-Friendly Access',
    items: [
      'Training courses, direct hotline, and on-site support in German.',
      'Full maintenance and replacement part service guaranteed for five years.',
      'For collaboration inquiries, contact bartelt@isse.tu-clausthal.de.',
    ],
  },
]

const de = {
  'Total Nodes': 'Knoten gesamt',
  '1 Login, 4 Workers': '1 Login, 4 Worker',
  'NVIDIA GPUs': 'NVIDIA-GPUs',
  'Funding': 'Förderung',
  'EU & Niedersachsen': 'EU & Niedersachsen',
  'Scheduler': 'Scheduler',
  'Resource manager': 'Ressourcenverwaltung',
  'High-Performance Nodes': 'High-Performance-Knoten',
  '2 Nodes Â· H200 GPUs': '2 Knoten · H200-GPUs',
  'Two high-performance worker nodes, each hosting up to 8 NVIDIA H200 NVL GPUs (minimum 8 H200 GPUs total) interconnected via NVLink for maximum data throughput.':
    'Zwei High-Performance-Worker-Knoten mit jeweils bis zu 8 NVIDIA H200 NVL GPUs (mindestens 8 H200 GPUs insgesamt), verbunden über NVLink für maximalen Datendurchsatz.',
  'Up to 8 H200 NVL per node': 'Bis zu 8 H200 NVL pro Knoten',
  'Optimized for model fine-tuning up to 70B': 'Optimiert für Modell-Fine-Tuning bis 70B',
  'Inference of Llama 3, Qwen 3, Gemma 3': 'Inference für Llama 3, Qwen 3, Gemma 3',
  'Mid-Performance Nodes': 'Mid-Performance-Knoten',
  '2 Nodes Â· RTX 6000 GPUs': '2 Knoten · RTX-6000-GPUs',
  'Two mid-performance worker nodes hosting up to 8 NVIDIA RTX PRO 6000 Blackwell Max-Q GPUs. Tailored for resource-efficient training and vision models.':
    'Zwei Mid-Performance-Worker-Knoten mit bis zu 8 NVIDIA RTX PRO 6000 Blackwell Max-Q GPUs. Ausgelegt für ressourceneffizientes Training und Vision-Modelle.',
  'Blackwell Max-Q GPU architecture': 'Blackwell Max-Q GPU-Architektur',
  'Optimized for training models < 3B': 'Optimiert für das Training von Modellen < 3B',
  'Supports vision models (SAM, CLIP)': 'Unterstützt Vision-Modelle (SAM, CLIP)',
  'Storage & Master Node': 'Storage- & Master-Knoten',
  'Fileserver Â· â‰¥ 150 TB': 'Fileserver · ≥ 150 TB',
  'A master node and fileserver equipped with â‰¥ 150 TB of high-speed persistent storage to manage large datasets, model checkpoints, and evaluation runs.':
    'Ein Master-Knoten und Fileserver mit ≥ 150 TB schnellem persistentem Speicher für große Datensätze, Modell-Checkpoints und Evaluationsläufe.',
  'â‰¥ 150 TB persistent storage capacity': '≥ 150 TB persistente Speicherkapazität',
  'Centralized checkpoint registry': 'Zentrale Checkpoint-Verwaltung',
  'Secure, high-availability backups': 'Sichere, hochverfügbare Backups',
  'InfiniBand Network Interconnect': 'InfiniBand-Netzwerkverbindung',
  'High-speed InfiniBand network interface running up to 200 Gbit/s to minimize latency and maximize transfer rates during distributed training operations.':
    'Eine schnelle InfiniBand-Netzwerkschnittstelle mit bis zu 200 Gbit/s minimiert Latenzen und maximiert Transferraten bei verteiltem Training.',
  '200 Gbit/s maximum throughput': '200 Gbit/s maximaler Durchsatz',
  'Low latency multi-GPU sync': 'Niedrige Latenz bei Multi-GPU-Synchronisation',
  'Fast dataset streaming from fileserver': 'Schnelles Dataset-Streaming vom Fileserver',
  'batch (Default)': 'batch (Standard)',
  'Non-interactive partition': 'Nicht-interaktive Partition',
  'All Cluster Nodes': 'Alle Cluster-Knoten',
  'Default queue for sbatch jobs': 'Standard-Queue für sbatch-Jobs',
  'Supports long-running training tasks': 'Unterstützt lang laufende Trainingsjobs',
  'Max duration up to 36 hours (llm-research)': 'Maximale Laufzeit bis zu 36 Stunden (llm-research)',
  'interactive': 'interactive',
  'Interactive partition': 'Interaktive Partition',
  'RTX 6000 Pro Nodes Only': 'Nur RTX-6000-Pro-Knoten',
  'Enables srun --pty bash or salloc sessions': 'Ermöglicht srun --pty bash oder salloc-Sessions',
  'Strict 6-hour time limit per session': 'Striktes 6-Stunden-Limit pro Session',
  'Ideal for debugging and GPU checking': 'Ideal für Debugging und GPU-Prüfungen',
  'Login / Frontend': 'Login / Frontend',
  'Gateway Node (Rechenzentrum)': 'Gateway-Knoten (Rechenzentrum)',
  'Located at the Computing Center of TU Clausthal': 'Standort im Rechenzentrum der TU Clausthal',
  'For editing code, data upload, and scheduling': 'Für Codebearbeitung, Datenupload und Scheduling',
  'Strictly no compute workloads allowed': 'Compute-Workloads sind dort nicht erlaubt',
  'Workshops & Open Lab': 'Workshops & Open Lab',
  'Regular workshops presenting the infrastructure to science, start-ups, and industry.':
    'Regelmäßige Workshops stellen die Infrastruktur Wissenschaft, Start-ups und Industrie vor.',
  'Active initiation of collaborative research and engineering projects.':
    'Aktive Anbahnung gemeinsamer Forschungs- und Engineering-Projekte.',
  'Workshops registration opens after cluster commissioning (by Sep 1, 2025).':
    'Die Workshop-Registrierung öffnet nach der Inbetriebnahme des Clusters (bis 1. September 2025).',
  'Innovation Hub': 'Innovation Hub',
  'Connects regional universities and enterprises to strengthen technology transfer.':
    'Verbindet regionale Hochschulen und Unternehmen, um Technologietransfer zu stärken.',
  'Directly supports the Lower Saxony RIS3 innovation strategy.':
    'Unterstützt direkt die RIS3-Innovationsstrategie Niedersachsens.',
  'Enables resource-efficient design, circular production, and cognitive robotics.':
    'Ermöglicht ressourceneffizientes Design, zirkuläre Produktion und kognitive Robotik.',
  'User-Friendly Access': 'Nutzerfreundlicher Zugang',
  'Training courses, direct hotline, and on-site support in German.':
    'Schulungen, direkte Hotline und Vor-Ort-Unterstützung auf Deutsch.',
  'Full maintenance and replacement part service guaranteed for five years.':
    'Vollständiger Wartungs- und Ersatzteilservice für fünf Jahre garantiert.',
  'For collaboration inquiries, contact bartelt@isse.tu-clausthal.de.':
    'Für Kooperationsanfragen kontaktieren Sie bartelt@isse.tu-clausthal.de.',
  'Kaiser I funded by the European Union & Land Niedersachsen (EFRE/ESF/ELER)':
    'Kaiser I wird von der Europäischen Union und dem Land Niedersachsen (EFRE/ESF/ELER) gefördert',
  'Located at Rechenzentrum der TU Clausthal, ErzstraÃŸe 18':
    'Standort im Rechenzentrum der TU Clausthal, Erzstraße 18',
  'Led by Prof. Dr. Christian Bartelt (ISSE)': 'Leitung durch Prof. Dr. Christian Bartelt (ISSE)',
  'Open workshops and innovation hub access for industry partners':
    'Offene Workshops und Innovation-Hub-Zugang für Industriepartner',
  'Submit': 'Absenden',
  'Submit jobs via the Slurm scheduler using sbatch (batch) or srun (interactive).':
    'Jobs über den Slurm-Scheduler mit sbatch (batch) oder srun (interactive) absenden.',
  'Monitor': 'Überwachen',
  'Monitor active jobs and resource allocations with squeue and sinfo.':
    'Aktive Jobs und Ressourcenzuweisungen mit squeue und sinfo überwachen.',
  'Execute': 'Ausführen',
  'Jobs run in isolated environments with resources allocated automatically.':
    'Jobs laufen in isolierten Umgebungen mit automatisch zugewiesenen Ressourcen.',
}

// ─── Sub-components ─────────────────────────────────────────────────────────

const SiteColorMap = {
  blue: {
    badge: 'bg-primary-50 text-primary-700 border-primary-100',
    icon: 'bg-primary-700',
    dot: 'bg-primary-500',
  },
  emerald: {
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    icon: 'bg-emerald-700',
    dot: 'bg-emerald-500',
  },
  violet: {
    badge: 'bg-violet-50 text-violet-700 border-violet-100',
    icon: 'bg-violet-700',
    dot: 'bg-violet-500',
  },
}

// ─── Page ───────────────────────────────────────────────────────────────────

const ComputeCluster = () => {
  const { pick } = useLanguage()
  const t = (text) => pick(text, de[text] || text)

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <section id="hero" className="relative min-h-screen overflow-hidden bg-[#f7fafc] text-gray-950">
        <img
          className="absolute inset-0 h-full w-full object-cover object-center opacity-60"
          src={assetUrl('/images/hero/compute-cluster-hero.webp')}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f7fafc] via-[#f7fafc]/96 via-[40%] to-[#f7fafc]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f7fafc] via-transparent to-white/40" />

        <div className="container relative mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-14 pt-28 md:px-12 lg:px-20">
          <div className="max-w-2xl">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-400" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-primary-600 transition-colors">CORE Network</Link>
              <span>/</span>
              <span className="text-slate-600">{pick('Compute Cluster', 'Rechencluster')}</span>
            </nav>

            {/* Eyebrow */}
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-primary-700">
              {pick('High-Performance Infrastructure', 'High-Performance-Infrastruktur')}
            </p>

            {/* Title */}
            <h1 className="mb-4 text-4xl font-heading font-bold leading-tight tracking-tight text-gray-950 md:text-5xl lg:text-6xl">
              Kaiser I
            </h1>

            {/* Funding Logo */}
            <div className="mb-6 max-w-[280px] rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
              <img
                src={assetUrl('/images/eu_fuer_niedersachsen.png')}
                alt={pick('EU & Land Niedersachsen Funding', 'Förderung durch EU und Land Niedersachsen')}
                className="w-full object-contain h-12"
                loading="lazy"
              />
            </div>

            {/* Description */}
            <p className="mb-8 max-w-xl text-lg leading-8 text-gray-600 md:text-xl">
              {pick(
                'Kaiser I is our scalable, high-performance GPU computing cluster designed to advance generative AI models, cognitive robotics, and circular systems engineering.',
                'Kaiser I ist unser skalierbarer High-Performance-GPU-Cluster zur Weiterentwicklung generativer KI-Modelle, kognitiver Robotik und zirkulärer Systemtechnik.'
              )}
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://genai-cluster.github.io/documentation/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gray-950 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:bg-primary-700 hover:scale-[1.02] active:scale-[0.98]"
              >
                {pick('Documentation Website', 'Dokumentationswebsite')}
                <FaArrowRight className="h-3 w-3" aria-hidden="true" />
              </a>
              <a
                href="#capabilities"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-bold text-gray-700 shadow-sm transition-all duration-200 hover:border-primary-300 hover:text-primary-700 hover:scale-[1.02] active:scale-[0.98]"
              >
                {pick('View Nodes & Hardware', 'Knoten & Hardware ansehen')}
              </a>
            </div>
            {/* Stat pills */}
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {clusterStats.map((s) => {
                const Icon = s.icon
                return (
                  <div key={s.label} className="rounded-xl border border-gray-200 bg-white/90 p-4 shadow-sm backdrop-blur">
                    <Icon className="mb-2 h-4 w-4 text-primary-600" aria-hidden="true" />
                    <p className="text-2xl font-bold text-gray-950">{s.value}</p>
                    <p className="text-xs font-semibold text-gray-700 leading-5">{t(s.label)}</p>
                    <p className="mt-0.5 text-xs text-gray-400">{t(s.description)}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Purpose ── */}
      <section id="purpose" className="border-t border-gray-100 bg-white py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary-700">{pick('Project Description', 'Projektbeschreibung')}</p>
              <h2 className="mb-5 text-3xl font-heading font-bold leading-tight tracking-tight text-gray-950 md:text-4xl">
                {pick('The Kaiser I GPU Cluster', 'Der Kaiser I GPU-Cluster')}
              </h2>
              <p className="mb-6 text-base leading-8 text-gray-600">
                {pick(
                  'The Kaiser I cluster is established as the central digital platform at the Technical University of Clausthal to unlock the full potential of Generative Artificial Intelligence (GenAI) for systems engineering. The goal is to both advance fundamental AI methods and drive concrete engineering applications - ranging from resource-efficient design and circular production to cognitive robotics and sustainable mobility.',
                  'Der Kaiser I Cluster wird als zentrale digitale Plattform der Technischen Universität Clausthal aufgebaut, um das Potenzial generativer Künstlicher Intelligenz (GenAI) für das Systems Engineering nutzbar zu machen. Ziel ist es, sowohl grundlegende KI-Methoden weiterzuentwickeln als auch konkrete Engineering-Anwendungen voranzutreiben - von ressourceneffizientem Design und zirkulärer Produktion bis hin zu kognitiver Robotik und nachhaltiger Mobilität.'
                )}
              </p>
              <p className="text-base leading-8 text-gray-600">
                {pick(
                  'Led by Prof. Dr. Christian Bartelt at the Institute for Software and Systems Engineering (ISSE), Kaiser I provides a scalable, high-performance environment that strengthens research, teaching, and technology transfer while fostering regional and international innovation partnerships.',
                  'Unter der Leitung von Prof. Dr. Christian Bartelt am Institute for Software and Systems Engineering (ISSE) bietet Kaiser I eine skalierbare High-Performance-Umgebung, die Forschung, Lehre und Technologietransfer stärkt und regionale sowie internationale Innovationspartnerschaften fördert.'
                )}
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm">
                <img
                  src={assetUrl('/images/genai-lab-opening.jpg')}
                  alt="Inauguration of Kaiser I"
                  className="w-full object-cover"
                  loading="lazy"
                />
                <div className="p-4 text-xs font-semibold text-gray-500 leading-normal text-center bg-white border-t border-gray-100">
                  {pick(
                    'Prof. Dr. Christian Bartelt and researchers powering up the new Kaiser I GPU Cluster at TU Clausthal.',
                    'Prof. Dr. Christian Bartelt und Forschende bei der Inbetriebnahme des neuen Kaiser I GPU-Clusters an der TU Clausthal.'
                  )}
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { icon: FaCheckCircle, text: 'Kaiser I funded by the European Union & Land Niedersachsen (EFRE/ESF/ELER)' },
                  { icon: FaCheckCircle, text: 'Located at Rechenzentrum der TU Clausthal, Erzstraße 18' },
                  { icon: FaCheckCircle, text: 'Led by Prof. Dr. Christian Bartelt (ISSE)' },
                  { icon: FaCheckCircle, text: 'Open workshops and innovation hub access for industry partners' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" aria-hidden="true" />
                    <p className="text-sm leading-6 text-gray-700">{t(text)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section id="capabilities" className="border-t border-gray-100 bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary-700">{pick('Hardware & Nodes', 'Hardware & Knoten')}</p>
            <h2 className="text-3xl font-heading font-bold leading-tight tracking-tight text-gray-950 md:text-4xl">
              {pick('Cluster nodes and hardware layout', 'Cluster-Knoten und Hardware-Aufbau')}
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              {pick(
                'The cluster is structured into login and worker nodes containing specific GPU architectures.',
                'Der Cluster ist in Login- und Worker-Knoten mit spezifischen GPU-Architekturen gegliedert.'
              )}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {capabilities.map((cap) => {
              const Icon = cap.icon
              return (
                <article
                  key={cap.title}
                  className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-lg"
                >
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-950 text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-500">
                      {t(cap.tag)}
                    </span>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-gray-950">{t(cap.title)}</h3>
                  <p className="mb-5 text-sm leading-7 text-gray-600">{t(cap.description)}</p>
                  <ul className="space-y-1.5">
                    {cap.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                        {t(pt)}
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Infrastructure Sites ── */}
      <section id="sites" className="border-t border-gray-100 bg-white py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary-700">{pick('Cluster Queues', 'Cluster-Queues')}</p>
            <h2 className="text-3xl font-heading font-bold leading-tight tracking-tight text-gray-950 md:text-4xl">
              {pick('Partition layouts and nodes', 'Partitionsaufbau und Knoten')}
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              {pick(
                'Slurm uses partitions to manage resource allocations and group nodes.',
                'Slurm nutzt Partitionen, um Ressourcenzuweisungen zu verwalten und Knoten zu gruppieren.'
              )}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {infrastructure.map((site) => {
              const colors = SiteColorMap[site.color]
              return (
                <article
                  key={site.site}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.icon} text-white`}>
                      <FaNetworkWired className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-xs font-bold ${colors.badge}`}>
                      {t(site.role)}
                    </span>
                  </div>
                  <h3 className="mb-1 text-lg font-bold text-gray-950">{t(site.site)}</h3>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-400">{t(site.location)}</p>
                  <ul className="space-y-2">
                    {site.specs.map((spec) => (
                      <li key={spec} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${colors.dot}`} />
                        {t(spec)}
                      </li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>

          {/* Network diagram row */}
          <div className="mt-8 overflow-hidden rounded-2xl bg-gray-950 text-white shadow-xl">
            <div className="grid divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
              {[
                { step: '01', title: 'Submit', desc: 'Submit jobs via the Slurm scheduler using sbatch (batch) or srun (interactive).' },
                { step: '02', title: 'Monitor', desc: 'Monitor active jobs and resource allocations with squeue and sinfo.' },
                { step: '03', title: 'Execute', desc: 'Jobs run in isolated environments with resources allocated automatically.' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex items-start gap-4 p-7">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-black">
                    {step}
                  </span>
                  <div>
                    <h4 className="font-bold">{t(title)}</h4>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{t(desc)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Policies ── */}
      <section id="policies" className="border-t border-gray-100 bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary-700">{pick('Policies', 'Richtlinien')}</p>
            <h2 className="text-3xl font-heading font-bold leading-tight tracking-tight text-gray-950 md:text-4xl">
              {pick('Access, queue, and usage policies', 'Zugangs-, Queue- und Nutzungsrichtlinien')}
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              {pick(
                'Use of the Kaiser I GPU Cluster is governed by account groups and limits designed to share compute resources fairly.',
                'Die Nutzung des Kaiser I GPU-Clusters wird durch Account-Gruppen und Limits geregelt, damit Compute-Ressourcen fair geteilt werden.'
              )}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {policies.map((pol) => (
              <div key={pol.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-950 text-white">
                  <FaShieldAlt className="h-4 w-4" aria-hidden="true" />
                </div>
                <h3 className="mb-4 text-base font-bold text-gray-950">{t(pol.title)}</h3>
                <ul className="space-y-3">
                  {pol.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-6 text-gray-600">
                      <FaCheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-500" aria-hidden="true" />
                      {t(item)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-gray-250 bg-gradient-to-br from-white to-gray-50/70 p-8 shadow-md text-center">
            <h3 className="text-xl font-bold text-gray-950 mb-2">{pick('Need detailed usage instructions?', 'Brauchen Sie detaillierte Nutzungshinweise?')}</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {pick(
                'Learn how to connect via SSH, run interactive pseudo-terminals, submit batch jobs, and manage your conda/singularity environments in our comprehensive cluster documentation.',
                'In unserer ausführlichen Cluster-Dokumentation erfahren Sie, wie Sie sich per SSH verbinden, interaktive Pseudo-Terminals starten, Batch-Jobs absenden und conda-/singularity-Umgebungen verwalten.'
              )}
            </p>
            <a
              href="https://genai-cluster.github.io/documentation/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gray-950 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:bg-primary-700 hover:scale-[1.02] active:scale-[0.98]"
            >
              {pick('Access Cluster Documentation', 'Cluster-Dokumentation öffnen')}
              <FaArrowRight className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Publications carousel ── */}
      <div className="border-t border-gray-100">
        <PublicationCarousel
          title={pick('Research outputs from the network.', 'Forschungsergebnisse aus dem Netzwerk.')}
          subtitle={pick('Publications', 'Publikationen')}
          intro={pick(
            'Papers, preprints, and workshop contributions produced using CORE Network infrastructure.',
            'Papers, Preprints und Workshop-Beiträge, die mit Infrastruktur des CORE Network entstanden sind.'
          )}
          viewAllLink="/publications"
          className="bg-white"
        />
      </div>

    </div>
  )
}

export default ComputeCluster
