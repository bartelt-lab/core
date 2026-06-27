import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowRight, FaBrain, FaFlask, FaLock, FaProjectDiagram, FaRobot } from 'react-icons/fa'
import LazyVideo from '../../components/common/LazyVideo'
import PublicationsSection from '../../components/publications/PublicationsSection'
import { autonomousDemonstrations } from '../../data/demonstrations'
import assetUrl from '../../utils/assetUrl'

const upcomingAreas = ['Embodied AI', 'Robot learning', 'Multi-modal perception']

const UbbHome = () => {
  const scrollToProjects = () => {
    document.getElementById('autonomous')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div>
      <section className="relative flex min-h-[720px] items-center overflow-hidden border-b border-slate-200/70 bg-white pb-20 pt-32 md:min-h-[820px] md:pb-24 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(186,230,253,0.65),transparent_30%),radial-gradient(circle_at_88%_78%,rgba(167,243,208,0.5),transparent_32%),linear-gradient(135deg,#f8fbff_0%,#ffffff_48%,#f4fbf8_100%)]" aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(100,116,139,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" aria-hidden="true" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 px-6 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: 'easeOut' }}>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 shadow-sm backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
              </span>
              Opening soon in Cluj-Napoca
            </div>
            <p className="mt-9 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">UBB × CORE Network</p>
            <h1 className="mt-4 max-w-2xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-[5.4rem]">
              CORE Labs
              <span className="block bg-gradient-to-r from-sky-700 via-cyan-700 to-emerald-600 bg-clip-text text-transparent">Cluj</span>
            </h1>
            <p className="mt-7 max-w-xl text-xl font-medium leading-8 text-slate-700">
              A new home for cognitive robotics and embodied intelligence.
            </p>
            <p className="mt-3 max-w-lg text-base leading-7 text-slate-500">
              Joint research at Babeș-Bolyai University in autonomous systems, intelligent simulation, and robot learning.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={scrollToProjects}
                className="group inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-300/60 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-700"
              >
                Explore the lab
                <FaArrowRight className="text-xs transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </button>
              <Link
                to="/publications?institution=UBB"
                className="rounded-full border border-white bg-white/75 px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-sky-700"
              >
                UBB publications
              </Link>
            </div>
            <div className="mt-12 flex items-center gap-5 border-t border-slate-200/80 pt-6">
              <img src={assetUrl('/logos/ubb-logo-only.webp')} alt="" className="h-10 w-10 object-contain opacity-80" />
              <div className="h-8 w-px bg-slate-200" aria-hidden="true" />
              <img src={assetUrl('/logos/core/core-no-text.webp')} alt="" className="h-9 w-9 object-contain opacity-80" />
              <p className="max-w-[12rem] text-xs leading-5 text-slate-400">A joint research initiative in the CORE Network.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.12, ease: 'easeOut' }}
            className="relative mx-auto flex min-h-[29rem] w-full max-w-[38rem] items-center justify-center sm:min-h-[34rem]"
          >
            <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-sky-300/25 to-emerald-300/25 blur-3xl" aria-hidden="true" />
            <div className="absolute h-[27rem] w-[27rem] rounded-full border border-dashed border-sky-200/80 bg-white/20 sm:h-[31rem] sm:w-[31rem]" aria-hidden="true" />
            <div className="absolute h-[18rem] w-[18rem] rounded-full border border-slate-200/80 bg-white/35 sm:h-[22rem] sm:w-[22rem]" aria-hidden="true" />

            <motion.div
              animate={{ y: [-10, 10, -10], rotate: [-1.5, 1.5, -1.5] }}
              transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 flex h-56 w-56 flex-col items-center justify-center rounded-[2.25rem] border border-white bg-white/88 text-center shadow-[0_32px_90px_-40px_rgba(15,23,42,0.55)] backdrop-blur-xl sm:h-64 sm:w-64"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-600 to-emerald-500 text-white shadow-xl shadow-sky-200/80">
                <FaFlask className="text-3xl" aria-hidden="true" />
              </div>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-sky-700">AI Lab</p>
              <p className="mt-2 max-w-[10rem] text-sm font-semibold leading-5 text-slate-700">Research systems under construction</p>
            </motion.div>

            {[
              { label: 'AI', detail: 'Models', icon: FaBrain, className: 'left-0 top-14' },
              { label: 'Robotics', detail: 'Embodied', icon: FaRobot, className: 'right-0 top-20' },
              { label: 'Projects', detail: 'Teams', icon: FaProjectDiagram, className: 'bottom-14 right-8' },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.label}
                  className={`absolute ${item.className} hidden rounded-2xl border border-white bg-white/90 p-4 shadow-xl shadow-slate-200/70 backdrop-blur sm:flex sm:items-center sm:gap-3`}
                  animate={{ y: index % 2 === 0 ? [8, -8, 8] : [-8, 8, -8] }}
                  transition={{ duration: 4.4 + index * 0.45, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                    <Icon aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-slate-950">{item.label}</span>
                    <span className="block text-xs font-semibold text-slate-400">{item.detail}</span>
                  </span>
                </motion.div>
              )
            })}

            <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-600 shadow-lg backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Opening soon
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-950 py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-300">Upcoming platform</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">Humanoid robotics in Cluj</h2>
              <p className="mt-5 text-base leading-8 text-slate-300">
                CORE Labs Cluj is preparing a new humanoid robotics research platform around the Unitree R1 for embodied AI, locomotion, and human–robot interaction.
              </p>
              <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-200">
                <FaLock className="text-[10px]" aria-hidden="true" />
                Coming soon
              </div>
              <a
                href="https://www.unitree.com/R1/"
                target="_blank"
                rel="noreferrer"
                className="mt-6 flex w-fit items-center gap-2 text-sm font-semibold text-white transition hover:text-sky-300"
              >
                Explore the Unitree R1
                <FaArrowRight className="-rotate-45 text-xs" aria-hidden="true" />
              </a>
            </div>

            <div className="relative min-h-[24rem] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 shadow-2xl shadow-black/30">
              <div className="absolute inset-0 grid grid-cols-[1.35fr_0.65fr] gap-2 p-2 blur-[9px] scale-[1.04]" aria-hidden="true">
                <img
                  src={assetUrl('/images/ubb/unitree-r1-lab-wide.webp')}
                  alt=""
                  className="h-full w-full rounded-[1.5rem] object-cover"
                />
                <img
                  src={assetUrl('/images/ubb/unitree-r1-lab-detail.webp')}
                  alt=""
                  className="h-full w-full rounded-[1.5rem] object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-sky-950/20" />
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="max-w-sm rounded-2xl border border-white/15 bg-slate-950/75 p-6 text-center shadow-xl backdrop-blur-xl">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-sky-300/30 bg-sky-300/10 text-sky-300">
                    <FaLock aria-hidden="true" />
                  </div>
                  <p className="mt-4 text-sm font-bold uppercase tracking-[0.18em]">Lab integration in progress</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">Experiments, capabilities, and platform details will be revealed soon.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="research" className="scroll-mt-24 border-t border-slate-100 bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-700">Coming soon</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">The next research chapter</h2>
            <p className="mt-4 leading-7 text-slate-600">New laboratory capabilities are in development. These areas remain intentionally hidden while the programme takes shape.</p>
          </div>

          <div className="relative mt-12">
            <div className="grid gap-5 md:grid-cols-3 blur-[5px] select-none" aria-hidden="true">
              {upcomingAreas.map((area, index) => (
                <div key={area} className={`h-64 rounded-3xl border p-7 ${index === 0 ? 'border-sky-200 bg-sky-50' : index === 1 ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-slate-50'}`}>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Research area 0{index + 1}</span>
                  <h3 className="mt-24 text-2xl font-bold text-slate-800">{area}</h3>
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="rounded-full border border-slate-200 bg-white/95 px-6 py-3 text-sm font-semibold text-slate-700 shadow-lg backdrop-blur">
                Under construction · Details available soon
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="autonomous" className="scroll-mt-24 border-t border-slate-100 bg-slate-50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-700">Established research programme</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">Autonomous Driving Lab</h2>
            <p className="mt-5 text-base leading-8 text-slate-600">The Cluj lab connects intelligent vehicle vision, modular simulation, scenario generation, planning, and physical 1:10-scale research platforms.</p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {autonomousDemonstrations.map((demo) => (
              <article key={demo.id} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="aspect-video overflow-hidden bg-slate-100">
                  <LazyVideo src={assetUrl(demo.video)} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" muted autoPlay loop />
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-sky-700">{demo.category}</p>
                  <h3 className="mt-2 text-xl font-bold text-slate-950">{demo.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{demo.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-gradient-to-br from-sky-50 via-white to-emerald-50 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-700">UBB research output</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Recent publications</h2>
            </div>
            <Link to="/publications?institution=UBB" className="text-sm font-bold text-sky-700 hover:text-sky-900">View all publications →</Link>
          </div>
          <div className="rounded-3xl border border-white bg-white/75 p-3 shadow-xl shadow-sky-100/60">
            <PublicationsSection limit={3} layout="rotator" title="" subtitle="" compact initialInstitution="UBB" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default UbbHome
