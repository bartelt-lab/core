import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import assetUrl from '../utils/assetUrl'

const drivePreview = (id) => `https://drive.google.com/file/d/${id}/preview?autoplay=1&mute=1&playsinline=1&loop=1`

const pad = (n) => String(n).padStart(2, '0')

const heroTags = ['Cognitive robotics', 'Dynamic manipulation', 'Operational intelligence']

const researchTags = ['Ridgeback', 'Unitree G1', 'Isaac Lab', 'Nav2']

const stackRows = [
    { layer: 'Mobile base', system: 'Ridgeback navigation', approach: 'Nav2 + exploration', detail: 'Mapping · Path planning · Hardware-facing runs' },
    { layer: 'Manipulator', system: 'Unitree G1 control', approach: 'Teleop + policy interface', detail: 'Command timing · Safety boundaries · Manipulation trials' },
    { layer: 'Simulation', system: 'Isaac Lab pipeline', approach: 'Repeatable test scenes', detail: 'USD environments · Synthetic scenarios · Sim2Real validation' },
    { layer: 'Integration', system: 'Interface contracts', approach: 'Mobility + manipulation', detail: 'Scene state · Perception links · Evidence loop' },
]

const experimentResults = [
    {
        operation: 'Ridgeback perception and navigation',
        title: 'Starting with SLAM, navigation, and a visible target',
        summary: 'The Ridgeback work began with SLAM and navigation around a clear perception cue: a detected red sphere. This gave the mobile-base track a concrete target for validating detection, localization, and movement in the same run.',
        outcome: 'The run shows the Ridgeback using the red-sphere detection as part of the navigation story, connecting perception evidence with the robot motion that follows from it.',
        video: { id: '1aUkfy_dM499HRmpudlG6zFFvVCRq36yF', title: 'Red-sphere SLAM and navigation' },
    },
    {
        operation: 'Frontier exploration',
        title: 'Moving from target navigation to environment exploration',
        summary: 'After the target-based navigation run, the next step was frontier exploration. The Ridgeback was tasked with exploring unknown space so the system could evaluate how the map grows and how the robot chooses useful next regions.',
        outcome: 'This stage documents the first exploration behavior: the robot begins to expand the known environment, exposing the practical limits that had to be improved in later runs.',
        video: { id: '1Hin82KFFeiVCN8Djjczv8MRuGI2HrbrS', title: 'Frontier exploration attempt' },
    },
    {
        operation: 'Distance estimator benchmarking',
        title: 'Measuring distance with a consistent detection baseline',
        summary: 'The distance-estimator benchmark keeps the detection step fixed: the G1 bounding box is detected with the same method for every estimator, and only valid detections are evaluated. Each estimator then calculates distance on the camera view, with results compared against Gazebo ground truth.',
        outcome: 'The benchmark saves individual logs per estimator, an overall summary report, and the camera footage. This gives the project a repeatable way to compare distance estimates before those estimates are used inside larger robot behavior.',
        video: { id: '1S7JTz9UyBMKuEjdReUGhigULS6RMaK_4', title: 'Distance Estimator Benchmarking' },
    },
    {
        operation: 'Exploration iteration',
        title: 'Improving exploration after an incomplete run',
        summary: 'One Ridgeback exploration run expanded the map but did not cover the full environment. That partial result was still useful because it showed where the exploration behavior needed adjustment before the final coverage run.',
        outcome: 'The result captures the project in progress: the robot explores part of the environment, the limitation is visible, and the next iteration has a clear target.',
        video: { id: '19ro5Az4d_Qzw95xYvcMBbgbkThifTZDG', title: 'Partial Ridgeback exploration' },
    },
    {
        operation: 'Full environment exploration',
        title: 'Completing the Ridgeback exploration loop',
        summary: 'The later Ridgeback run shows the intended behavior more completely: the robot explores the full environment properly and demonstrates a stronger navigation and coverage result.',
        outcome: 'This is the clearest mobile-base result in the sequence. The Ridgeback completes the environment exploration more reliably, giving the navigation side a stronger foundation for later integration.',
        video: { id: '1Q60muLRK3wOiiZelpSNghu_nWZ8qYblP', title: 'Full Ridgeback environment exploration' },
    },
    {
        operation: 'Humanoid teleoperation',
        title: 'Adding the Unitree G1 humanoid control track',
        summary: 'Alongside the Ridgeback navigation work, the humanoid side was tested through teleoperation with the Unitree G1. This focused on direct operator control before moving toward more autonomous behavior.',
        outcome: 'The teleoperation run documents that the G1 can be controlled in the project setup, giving the humanoid track a practical starting point for later manipulation and integration experiments.',
        video: { id: '1PAxkPUROKN5dDTs7-5LCuMKNqdZAJL6t', title: 'Unitree G1 teleoperation' },
    },
]

// Quiet uppercase eyebrow with a single green hairline — the page's one accent, kept from the glassy pass.
const Label = ({ children }) => (
    <div className="flex items-center gap-2.5">
        <span className="h-px w-5 bg-primary-500" aria-hidden="true" />
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{children}</span>
    </div>
)

const MiniLabel = ({ children }) => (
    <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
        <span className="h-px w-4 bg-primary-500" aria-hidden="true" />
        {children}
    </p>
)

const total = experimentResults.length
// Newest progress entry first; numbering stays chronological (first ever = 01).
const displayOrder = Array.from({ length: total }, (_, k) => total - 1 - k)

const Dynamo = () => {
    const [activeRun, setActiveRun] = useState(total - 1)
    const [paused, setPaused] = useState(false)
    // Indices whose iframe has been mounted. A video mounts the moment it first
    // becomes active (so it loads while visible and autoplays), then stays
    // mounted — revisiting it is instant with no reload.
    const [mounted, setMounted] = useState(() => new Set([total - 1]))
    const activeRunRef = useRef(total - 1)

    const run = experimentResults[activeRun]

    useEffect(() => {
        activeRunRef.current = activeRun
    }, [activeRun])

    const show = (i) => {
        activeRunRef.current = i
        setActiveRun(i)
        setMounted((prev) => (prev.has(i) ? prev : new Set(prev).add(i)))
    }

    // Auto-advance newest → oldest every 8s until the user picks one manually.
    useEffect(() => {
        if (paused) return undefined
        const timer = window.setInterval(() => {
            const next = (activeRunRef.current - 1 + total) % total
            activeRunRef.current = next
            setActiveRun(next)
            setMounted((prev) => (prev.has(next) ? prev : new Set(prev).add(next)))
        }, 8000)
        return () => window.clearInterval(timer)
    }, [paused])

    const selectRun = (i) => {
        setPaused(true)
        show(i)
    }

    const step = (delta) => {
        setPaused(true)
        show((activeRunRef.current + delta + total) % total)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 font-sans text-slate-950">
            {/* Hero — kept from the cinematic pass: a dark rounded render panel anchoring the light page */}
            <section className="px-3 pt-3 sm:px-4 sm:pt-4">
                <div className="relative min-h-[33rem] overflow-hidden rounded-3xl bg-slate-950 md:min-h-[36rem]">
                    <img
                        src={assetUrl('/images/projects/dynamo/hero.webp')}
                        alt=""
                        fetchPriority="high"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover"
                        aria-hidden="true"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/15" aria-hidden="true" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/25" aria-hidden="true" />

                    <div className="container relative z-10 mx-auto max-w-7xl px-6 pb-12 pt-28 sm:px-10 md:pb-16 md:pt-32">
                        <div className="max-w-2xl">
                            <div className="flex flex-wrap gap-2.5">
                                {heroTags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full border border-white/25 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white/85 backdrop-blur-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h1 className="mt-6 text-5xl font-bold tracking-tight text-white md:text-6xl">DyNAMO</h1>
                            <p className="mt-5 text-lg leading-8 text-white/85">
                                DyNAMO advances cognitive robotics by bridging perception, reasoning, and action — an
                                integrated framework for dynamic navigation and manipulation, carried from simulation
                                through to real hardware.
                            </p>

                            <div className="mt-7 rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md">
                                <p className="text-[15px] leading-7 text-white/85">
                                    A cognitive robotic system built to adapt to unstructured environments and learn
                                    through interaction. It pairs foundation-model reasoning with classical navigation
                                    and control to reach versatile, robust behavior in real-world settings.
                                </p>
                            </div>

                            <Link
                                to="/core-labs"
                                className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/90 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700 shadow-lg shadow-slate-950/30 backdrop-blur transition hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-primary-900"
                            >
                                <FaArrowLeft className="h-3 w-3" aria-hidden="true" />
                                CORE Labs
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experiment browser — leader-follower layout: player + run selector + about */}
            <section id="experiments" className="scroll-mt-6 py-14 md:py-20">
                <div className="container mx-auto max-w-7xl px-6 md:px-10">
                    {/* Objective + research question — VialSort-style intro replacing the old "Results and proof videos" header */}
                    <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-end">
                        <div>
                            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">Objective</p>
                            <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-950 md:text-4xl">
                                Integrate navigation, manipulation, and reasoning
                            </h2>
                            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-600 md:text-base md:leading-8">
                                Dynamo demonstrates an integrated system where a humanoid robot identifies, grasps, and
                                places objects while working with an autonomously navigating mobile base. The core
                                challenge is Sim2Real transfer: behavior developed in simulation must survive the noise
                                and constraints of physical operation.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-primary-100 bg-white/85 p-5 shadow-xl shadow-primary-100/70 backdrop-blur">
                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">Research question</p>
                            <p className="mt-3 text-sm leading-7 text-slate-600">
                                Can navigation and manipulation developed in simulation transfer to real hardware as one
                                integrated system — and how reliably does each subsystem hold up under physical conditions?
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {researchTags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-bold text-primary-800"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <p className="mb-5 mt-12 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">Experiment log</p>
                    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
                        {/* Player */}
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 lg:self-start">
                            <div className="relative aspect-video w-full bg-black">
                                {/* Each iframe mounts when first active (loads visible → autoplays) then stays mounted, so swapping back is instant with no reload */}
                                {experimentResults.map((item, i) =>
                                    i === activeRun || mounted.has(i) ? (
                                        <iframe
                                            key={item.video.id}
                                            src={drivePreview(item.video.id)}
                                            title={item.video.title}
                                            className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
                                                i === activeRun ? 'z-10 opacity-100' : 'pointer-events-none z-0 opacity-0'
                                            }`}
                                            allow="autoplay; encrypted-media; picture-in-picture"
                                            allowFullScreen
                                        />
                                    ) : null,
                                )}
                            </div>

                            <div className="flex items-start justify-between gap-4 border-t border-slate-200 bg-white px-5 py-4">
                                <div className="min-w-0">
                                    <div className="mb-2 flex flex-wrap items-center gap-2">
                                        <span className="rounded bg-primary-600 px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-white">
                                            Milestone {pad(activeRun + 1)}
                                        </span>
                                        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                                            {run.operation}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-950">{run.title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">{run.summary}</p>
                                    <p className="mt-3 border-l-2 border-primary-400 pl-3 text-sm leading-6 text-slate-500">
                                        <span className="font-bold uppercase tracking-[0.18em] text-primary-700">Outcome</span>
                                        <span className="mx-1">·</span>
                                        {run.outcome}
                                    </p>
                                </div>
                                <div className="flex shrink-0 items-center gap-1.5">
                                    <button
                                        type="button"
                                        onClick={() => step(1)}
                                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-primary-50 hover:text-primary-700"
                                        aria-label="Newer milestone"
                                    >
                                        <FaArrowLeft className="h-3 w-3" />
                                    </button>
                                    <span className="w-9 text-center font-mono text-xs font-bold text-slate-400">
                                        {pad(activeRun + 1)}/{pad(total)}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => step(-1)}
                                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-primary-50 hover:text-primary-700"
                                        aria-label="Older milestone"
                                    >
                                        <FaArrowRight className="h-3 w-3" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar: update selector — newest first, stretches full height as more land */}
                        <section className="flex flex-col rounded-2xl border border-slate-200 bg-white/70 p-3 shadow-sm backdrop-blur-sm">
                            <div className="mb-3 px-1">
                                <MiniLabel>Milestones</MiniLabel>
                            </div>
                            <div className="space-y-2">
                                {displayOrder.map((idx) => {
                                    const item = experimentResults[idx]
                                    const isActive = idx === activeRun
                                    return (
                                        <button
                                            key={item.video.id}
                                            type="button"
                                            onClick={() => selectRun(idx)}
                                            className={`group w-full overflow-hidden rounded-xl text-left transition ${
                                                isActive
                                                    ? 'bg-primary-50 ring-2 ring-primary-500 ring-offset-1 ring-offset-white'
                                                    : 'hover:bg-slate-50'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3 p-3">
                                                <div className="relative flex aspect-video w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
                                                    <span className="font-mono text-sm font-bold text-slate-400">{pad(idx + 1)}</span>
                                                    {isActive && <span className="absolute inset-0 bg-primary-600/10" />}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className={`truncate text-[11px] font-bold uppercase tracking-[0.18em] ${isActive ? 'text-primary-700' : 'text-slate-400'}`}>
                                                        {item.operation}
                                                    </p>
                                                    <p className={`mt-0.5 line-clamp-2 text-sm font-semibold leading-5 ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                                                        {item.title}
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        </section>
                    </div>
                </div>
            </section>

            {/* System architecture + technical stack */}
            <section id="architecture" className="border-t border-slate-200/70 py-14 md:py-20">
                <div className="container mx-auto grid max-w-7xl gap-10 px-6 md:px-10 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                        <Label>System architecture</Label>
                        <figure className="mt-5 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                            <div className="overflow-hidden rounded-xl bg-white">
                                <img
                                    src={assetUrl('/images/projects/dynamo/architecture.webp')}
                                    alt="Dynamo system architecture"
                                    loading="lazy"
                                    decoding="async"
                                    className="max-h-[440px] w-full object-contain"
                                />
                            </div>
                            <figcaption className="mt-3 px-1 text-xs leading-5 text-slate-500">
                                <span className="font-mono text-slate-400">Fig. 1</span>
                                <span className="mx-1.5">·</span>
                                Interfaces between navigation, manipulation, perception, and scene state.
                            </figcaption>
                        </figure>
                    </div>

                    <div className="lg:col-span-5">
                        <Label>Technical stack</Label>
                        <div className="mt-5 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white/70 shadow-sm backdrop-blur-sm">
                            {stackRows.map((row) => (
                                <div key={row.layer} className="px-5 py-3.5">
                                    <div className="flex items-baseline justify-between gap-3">
                                        <h3 className="text-sm font-semibold text-slate-900">{row.layer}</h3>
                                        <span className="font-mono text-xs text-slate-500">{row.approach}</span>
                                    </div>
                                    <p className="mt-1 text-sm text-slate-700">{row.system}</p>
                                    <p className="mt-1 text-xs leading-5 text-slate-500">{row.detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Dynamo
