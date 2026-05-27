import { Link } from 'react-router-dom'
import {
  FaDatabase,
  FaMicrochip,
  FaNetworkWired,
  FaCogs,
  FaFlask,
  FaUniversity,
  FaCheckCircle,
  FaArrowRight,
  FaShieldAlt,
} from 'react-icons/fa'
import PublicationCarousel from '../components/publications/PublicationCarousel'
import assetUrl from '../utils/assetUrl'

// ─── Data ──────────────────────────────────────────────────────────────────

const clusterStats = [
  { label: 'Research Projects', value: '10+', icon: FaFlask, description: 'Active and completed' },
  { label: 'Publications', value: '21', icon: FaDatabase, description: 'Peer-reviewed outputs' },
  { label: 'Network Sites', value: '3', icon: FaNetworkWired, description: 'DE · DE · RO' },
  { label: 'Research Staff', value: '15+', icon: FaMicrochip, description: 'Across all institutions' },
]

const capabilities = [
  {
    icon: FaMicrochip,
    title: 'GPU Compute',
    tag: 'Training Infrastructure',
    description:
      'High-performance GPU nodes support deep learning training, reinforcement learning, and large-scale simulation workloads distributed across TU Clausthal and partner sites.',
    points: ['Multi-GPU training jobs', 'Distributed experiment queues', 'Checkpoint storage'],
  },
  {
    icon: FaDatabase,
    title: 'Dataset Storage',
    tag: 'Research Data Management',
    description:
      'Shared persistent storage keeps datasets, model checkpoints, evaluation artifacts, and paper supplementary material co-located with the experiments that produced them.',
    points: ['Versioned dataset registry', 'Cross-site data access', 'Artifact archiving'],
  },
  {
    icon: FaNetworkWired,
    title: 'Multi-Site Network',
    tag: 'Distributed Infrastructure',
    description:
      'Secure inter-site connectivity enables researchers at TU Clausthal, University of Rostock, and Babeș-Bolyai University to share jobs, access shared storage, and coordinate experiments.',
    points: ['TUC ↔ Rostock ↔ UBB links', 'Managed access controls', 'Remote job submission'],
  },
  {
    icon: FaCogs,
    title: 'Robotics Simulation',
    tag: 'Sim-to-Real Pipeline',
    description:
      'Isaac Lab and ROS2-based simulation environments run repeatable robot trials before hardware deployment, supporting the DyNAMO project and future robotics initiatives.',
    points: ['Isaac Lab USD environments', 'Navigation & manipulation scenes', 'Sim2Real validation loop'],
  },
]

const infrastructure = [
  {
    site: 'TU Clausthal',
    location: 'Goslar, Germany',
    role: 'Primary Compute Node',
    specs: ['GPU cluster (multi-node)', 'ROS2 / Isaac Lab stack', 'Ridgeback & G1 robot hardware'],
    color: 'blue',
  },
  {
    site: 'University of Rostock',
    location: 'Rostock, Germany',
    role: 'Research & Storage Node',
    specs: ['Signal processing workloads', 'Shared storage endpoint', 'Communications engineering lab'],
    color: 'emerald',
  },
  {
    site: 'Babeș-Bolyai University',
    location: 'Cluj-Napoca, Romania',
    role: 'AI Research Node',
    specs: ['Machine learning pipelines', 'Formal methods compute', 'Federated experiment access'],
    color: 'violet',
  },
]

const policies = [
  {
    title: 'Access & Allocation',
    items: [
      'Access is granted to active CORE Network researchers and affiliated students.',
      'Compute allocations are managed through the CORE infrastructure coordination team.',
      'Priority scheduling applies to publication-deadline-critical jobs.',
    ],
  },
  {
    title: 'Data Governance',
    items: [
      'All research data is stored in compliance with GDPR and institutional data protection guidelines.',
      'Shared datasets require a brief data management plan before upload.',
      'Data retention follows a minimum 5-year policy for published research.',
    ],
  },
  {
    title: 'Software Environment',
    items: [
      'Container-based environments (Docker / Singularity) are supported on all compute nodes.',
      'Core software stack: ROS2, PyTorch, Isaac Lab, CUDA, Python 3.10+.',
      'Environment snapshots are versioned alongside experiment checkpoints.',
    ],
  },
]

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
              <span className="text-slate-600">Compute Cluster</span>
            </nav>

            {/* Eyebrow */}
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-primary-700">
              Shared Research Infrastructure
            </p>

            {/* Title */}
            <h1 className="mb-6 text-4xl font-heading font-bold leading-tight tracking-tight text-gray-950 md:text-5xl lg:text-6xl">
              Compute Cluster
            </h1>

            {/* Description */}
            <p className="mb-8 max-w-xl text-lg leading-8 text-gray-600 md:text-xl">
              A shared, multi-site computational infrastructure supporting AI training,
              robotics simulation, and research data management across the CORE Network.
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="mailto:bartelt@isse.tu-clausthal.de"
                className="inline-flex items-center gap-2 rounded-full bg-gray-950 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-primary-700"
              >
                Request Access
                <FaArrowRight className="h-3 w-3" aria-hidden="true" />
              </a>
              <a
                href="#capabilities"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-bold text-gray-700 shadow-sm transition hover:border-primary-300 hover:text-primary-700"
              >
                View Capabilities
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
                    <p className="text-xs font-semibold text-gray-700 leading-5">{s.label}</p>
                    <p className="mt-0.5 text-xs text-gray-400">{s.description}</p>
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
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary-700">About the Infrastructure</p>
              <h2 className="mb-5 text-3xl font-heading font-bold leading-tight tracking-tight text-gray-950 md:text-4xl">
                Built for distributed, reproducible research
              </h2>
              <p className="mb-6 text-base leading-8 text-gray-600">
                The CORE Compute Cluster is a shared research infrastructure spanning three partner institutions.
                It provides centralised access to GPU resources, persistent dataset storage, and simulation
                environments — allowing researchers across Germany and Romania to run experiments, share
                artifacts, and iterate on results without institutional silos.
              </p>
              <p className="text-base leading-8 text-gray-600">
                The cluster directly supports publication workflows: model checkpoints, evaluation data,
                and supplementary materials are versioned and archived alongside the papers they underpin.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: FaCheckCircle, text: 'GPU-accelerated training and evaluation workloads' },
                { icon: FaCheckCircle, text: 'ROS2 + Isaac Lab robotics simulation pipeline' },
                { icon: FaCheckCircle, text: 'Shared persistent storage across all CORE sites' },
                { icon: FaCheckCircle, text: 'GDPR-compliant data governance and retention' },
                { icon: FaCheckCircle, text: 'Containerised software environments (Docker / Singularity)' },
                { icon: FaCheckCircle, text: 'Remote job submission via shared SLURM queue' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" aria-hidden="true" />
                  <p className="text-sm leading-6 text-gray-700">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section id="capabilities" className="border-t border-gray-100 bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary-700">Capabilities</p>
            <h2 className="text-3xl font-heading font-bold leading-tight tracking-tight text-gray-950 md:text-4xl">
              Core infrastructure services
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              Each capability is available to all CORE Network researchers through unified access credentials.
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
                      {cap.tag}
                    </span>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-gray-950">{cap.title}</h3>
                  <p className="mb-5 text-sm leading-7 text-gray-600">{cap.description}</p>
                  <ul className="space-y-1.5">
                    {cap.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                        {pt}
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
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary-700">Network Sites</p>
            <h2 className="text-3xl font-heading font-bold leading-tight tracking-tight text-gray-950 md:text-4xl">
              Three institutions. One shared platform.
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              Each site contributes compute, storage, or specialised hardware to the network.
              Researchers at any site can access the full shared environment.
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
                      <FaUniversity className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-xs font-bold ${colors.badge}`}>
                      {site.role}
                    </span>
                  </div>
                  <h3 className="mb-1 text-lg font-bold text-gray-950">{site.site}</h3>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-400">{site.location}</p>
                  <ul className="space-y-2">
                    {site.specs.map((spec) => (
                      <li key={spec} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${colors.dot}`} />
                        {spec}
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
                { step: '01', title: 'Submit', desc: 'Researchers submit jobs via the shared SLURM scheduler from any network site.' },
                { step: '02', title: 'Execute', desc: 'Jobs are routed to available GPU nodes based on resource requirements and priority.' },
                { step: '03', title: 'Archive', desc: 'Results, checkpoints, and artifacts are automatically stored in the shared registry.' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex items-start gap-4 p-7">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-black">
                    {step}
                  </span>
                  <div>
                    <h4 className="font-bold">{title}</h4>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{desc}</p>
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
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary-700">Policies</p>
            <h2 className="text-3xl font-heading font-bold leading-tight tracking-tight text-gray-950 md:text-4xl">
              Access, data, and usage policies
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              Use of the CORE Compute Cluster is governed by shared policies agreed across all partner institutions.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {policies.map((pol) => (
              <div key={pol.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-950 text-white">
                  <FaShieldAlt className="h-4 w-4" aria-hidden="true" />
                </div>
                <h3 className="mb-4 text-base font-bold text-gray-950">{pol.title}</h3>
                <ul className="space-y-3">
                  {pol.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-6 text-gray-600">
                      <FaCheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-500" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Publications carousel ── */}
      <div className="border-t border-gray-100">
        <PublicationCarousel
          title="Research outputs from the network."
          subtitle="Publications"
          intro="Papers, preprints, and workshop contributions produced using CORE Network infrastructure."
          viewAllLink="/publications"
          className="bg-white"
        />
      </div>

    </div>
  )
}

export default ComputeCluster
