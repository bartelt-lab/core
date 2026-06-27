import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    FaArrowLeft,
    FaArrowRight,
    FaBezierCurve,
    FaCubes,
    FaHome,
    FaLayerGroup,
    FaMapMarkedAlt,
    FaMicrochip,
    FaProjectDiagram,
    FaRobot,
    FaRoute,
} from 'react-icons/fa'
import assetUrl from '../utils/assetUrl'
import LazyVideo from '../components/common/LazyVideo'

const drivePreview = (id) => `https://drive.google.com/file/d/${id}/preview?autoplay=1&mute=1&playsinline=1`

const statusCards = [
    {
        icon: FaMapMarkedAlt,
        eyebrow: 'Active Experiment',
        title: 'Mobile Base',
        text: 'Ridgeback navigation is being validated through simulation, exploration, and hardware-facing runs.',
    },
    {
        icon: FaRobot,
        eyebrow: 'Teleop Track',
        title: 'Manipulator',
        text: 'Unitree G1 operation is being tested through teleoperation to understand control and safety constraints.',
    },
    {
        icon: FaCubes,
        eyebrow: 'Simulation First',
        title: 'Integration',
        text: 'The project is moving toward stable interfaces between navigation, manipulation, perception, and scene state.',
    },
]

const tabs = [
    { id: 'home', label: 'Home', icon: FaHome },
    { id: 'architecture', label: 'Architecture', icon: FaProjectDiagram },
    { id: 'experiments', label: 'Experiments & Results', icon: FaBezierCurve },
]

const technicalBlocks = [
    {
        icon: FaRoute,
        label: 'Mobile Base',
        title: 'Ridgeback navigation',
        metric: 'Nav2 + exploration',
        color: 'blue',
        points: ['Mapping', 'Path planning', 'Hardware-facing runs'],
    },
    {
        icon: FaRobot,
        label: 'Manipulator',
        title: 'Unitree G1 control',
        metric: 'Teleop + policy interface',
        color: 'emerald',
        points: ['Command timing', 'Safety boundaries', 'Manipulation trials'],
    },
    {
        icon: FaMicrochip,
        label: 'Simulation',
        title: 'Isaac Lab pipeline',
        metric: 'Repeatable test scenes',
        color: 'amber',
        points: ['USD environments', 'Synthetic scenarios', 'Sim2Real validation'],
    },
    {
        icon: FaLayerGroup,
        label: 'Integration',
        title: 'Interface contracts',
        metric: 'Mobility + manipulation',
        color: 'violet',
        points: ['Scene state', 'Perception links', 'Evidence loop'],
    },
]

const experimentResults = [
    {
        phase: 'Result 01',
        operation: 'Ridgeback perception and navigation',
        title: 'Starting with SLAM, navigation, and a visible target',
        summary: 'The Ridgeback work began with SLAM and navigation around a clear perception cue: a detected red sphere. This gave the mobile-base track a concrete target for validating detection, localization, and movement in the same run.',
        outcome: 'The run shows the Ridgeback using the red-sphere detection as part of the navigation story, connecting perception evidence with the robot motion that follows from it.',
        videos: [
            {
                title: 'Red-sphere SLAM and navigation',
                id: '1aUkfy_dM499HRmpudlG6zFFvVCRq36yF',
                note: 'SLAM and Ridgeback navigation with the red sphere used as the detected object in the scene.',
            },
        ],
    },
    {
        phase: 'Result 02',
        operation: 'Frontier exploration',
        title: 'Moving from target navigation to environment exploration',
        summary: 'After the target-based navigation run, the next step was frontier exploration. The Ridgeback was tasked with exploring unknown space so the system could evaluate how the map grows and how the robot chooses useful next regions.',
        outcome: 'This stage documents the first exploration behavior: the robot begins to expand the known environment, exposing the practical limits that had to be improved in later runs.',
        videos: [
            {
                title: 'Frontier exploration attempt',
                id: '1Hin82KFFeiVCN8Djjczv8MRuGI2HrbrS',
                note: 'Ridgeback frontier exploration run for mapping and environment coverage.',
            },
        ],
    },
    {
        phase: 'Result 03',
        operation: 'Distance estimator benchmarking',
        title: 'Measuring distance with a consistent detection baseline',
        summary: 'The distance-estimator benchmark keeps the detection step fixed: the G1 bounding box is detected with the same method for every estimator, and only valid detections are evaluated. Each estimator then calculates distance on the camera view, with results compared against Gazebo ground truth.',
        outcome: 'The benchmark saves individual logs per estimator, an overall summary report, and the camera footage. This gives the project a repeatable way to compare distance estimates before those estimates are used inside larger robot behavior.',
        videos: [
            {
                title: 'Distance Estimator Benchmarking',
                id: '1S7JTz9UyBMKuEjdReUGhigULS6RMaK_4',
                note: 'Detect, estimate, and log: one detector baseline, distance overlays against Gazebo ground truth, per-estimator logs, a summary report, and saved camera footage.',
            },
        ],
    },
    {
        phase: 'Result 04',
        operation: 'Exploration iteration',
        title: 'Improving exploration after an incomplete run',
        summary: 'One Ridgeback exploration run expanded the map but did not cover the full environment. That partial result was still useful because it showed where the exploration behavior needed adjustment before the final coverage run.',
        outcome: 'The result captures the project in progress: the robot explores part of the environment, the limitation is visible, and the next iteration has a clear target.',
        videos: [
            {
                title: 'Partial Ridgeback exploration',
                id: '19ro5Az4d_Qzw95xYvcMBbgbkThifTZDG',
                note: 'Exploration run where the environment is explored, but not yet fully covered.',
            },
        ],
    },
    {
        phase: 'Result 05',
        operation: 'Full environment exploration',
        title: 'Completing the Ridgeback exploration loop',
        summary: 'The later Ridgeback run shows the intended behavior more completely: the robot explores the full environment properly and demonstrates a stronger navigation and coverage result.',
        outcome: 'This is the clearest mobile-base result in the sequence. The Ridgeback completes the environment exploration more reliably, giving the navigation side a stronger foundation for later integration.',
        videos: [
            {
                title: 'Full Ridgeback environment exploration',
                id: '1Q60muLRK3wOiiZelpSNghu_nWZ8qYblP',
                note: 'Ridgeback explores the full environment properly and completes the exploration behavior more cleanly.',
            },
        ],
    },
    {
        phase: 'Result 06',
        operation: 'Humanoid teleoperation',
        title: 'Adding the Unitree G1 humanoid control track',
        summary: 'Alongside the Ridgeback navigation work, the humanoid side was tested through teleoperation with the Unitree G1. This focused on direct operator control before moving toward more autonomous behavior.',
        outcome: 'The teleoperation run documents that the G1 can be controlled in the project setup, giving the humanoid track a practical starting point for later manipulation and integration experiments.',
        videos: [
            {
                title: 'Unitree G1 teleoperation',
                id: '1PAxkPUROKN5dDTs7-5LCuMKNqdZAJL6t',
                note: 'Teleoperation trial with the humanoid robot.',
            },
        ],
    },
]

const goalSlides = [
    {
        title: 'Clinical inspection task',
        image: '/images/projects/dynamo/goal-clinic.webp',
        note: 'Humanoid reasoning and operator-facing task execution in a structured room.',
        fit: 'object-contain bg-slate-100',
    },
    {
        title: 'Warehouse manipulation task',
        image: '/images/projects/dynamo/goal-warehouse.webp',
        note: 'Mobile-base support for logistics-style object handling and placement.',
        fit: 'object-contain bg-slate-100',
    },
    {
        title: 'Domestic handling task',
        image: '/images/projects/dynamo/goal-laundry.webp',
        note: 'Humanoid handling in a domestic environment with soft-object manipulation.',
        fit: 'object-contain bg-slate-100',
    },
]

const VideoCarousel = ({ videos }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const hasVideos = videos.length > 0
    const video = hasVideos ? videos[activeIndex] : null
    const hasMultiple = videos.length > 1

    useEffect(() => {
        if (!hasMultiple) return undefined

        const timer = window.setInterval(() => {
            setActiveIndex((current) => (current + 1) % videos.length)
        }, 18000)

        return () => window.clearInterval(timer)
    }, [hasMultiple, videos.length])

    const showPrevious = () => {
        setActiveIndex((current) => (current === 0 ? videos.length - 1 : current - 1))
    }

    const showNext = () => {
        setActiveIndex((current) => (current + 1) % videos.length)
    }

    if (!hasVideos) {
        return (
            <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <div className="aspect-video bg-slate-950">
                    <LazyVideo
                        src={assetUrl('/videos/core-labs-hero.mp4')}
                        poster={assetUrl('/videos/hero-poster.webp')}
                        className="h-full w-full object-cover opacity-75"
                        autoPlay
                        muted
                        loop
                    />
                </div>
                <div className="p-4">
                    <h4 className="text-sm font-bold text-slate-950">Project context preview</h4>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                        This milestone defines the technical objective. Operation-specific proof appears once concrete robot runs are executed.
                    </p>
                </div>
            </article>
        )
    }

    return (
        <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="relative aspect-video bg-slate-950">
                <iframe
                    key={video.id}
                    src={drivePreview(video.id)}
                    title={video.title}
                    className="h-full w-full"
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    allowFullScreen
                />
                {hasMultiple && (
                    <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-3 pointer-events-none">
                        <button
                            type="button"
                            onClick={showPrevious}
                            className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-950 shadow-lg transition hover:bg-white"
                            aria-label="Previous video"
                        >
                            <FaArrowLeft className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button
                            type="button"
                            onClick={showNext}
                            className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-950 shadow-lg transition hover:bg-white"
                            aria-label="Next video"
                        >
                            <FaArrowRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                    </div>
                )}
            </div>
            <div className="p-4">
                <div className="mb-2 flex items-center justify-between gap-4">
                    <h4 className="text-sm font-bold text-slate-950">{video.title}</h4>
                    {hasMultiple && (
                        <span className="text-xs font-bold text-slate-400">
                            {activeIndex + 1}/{videos.length}
                        </span>
                    )}
                </div>
                <p className="text-sm leading-6 text-slate-600">{video.note}</p>
            </div>
        </article>
    )
}

const GoalImageCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const slide = goalSlides[activeIndex]

    useEffect(() => {
        const timer = window.setInterval(() => {
            setActiveIndex((current) => (current + 1) % goalSlides.length)
        }, 4200)

        return () => window.clearInterval(timer)
    }, [])

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/70">
            <div className="relative h-[620px] max-h-[72vh] min-h-[480px] bg-slate-100">
                <img
                    key={slide.image}
                    src={assetUrl(slide.image)}
                    alt={slide.title}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full transition-opacity duration-500 ${slide.fit}`}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 to-transparent p-5 text-white">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-200">{slide.title}</p>
                    <p className="mt-2 text-sm leading-6 text-white/82">{slide.note}</p>
                </div>
                <button
                    type="button"
                    onClick={() => setActiveIndex((current) => (current === 0 ? goalSlides.length - 1 : current - 1))}
                    className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-950 shadow-lg transition hover:bg-white"
                    aria-label="Previous goal image"
                >
                    <FaArrowLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                    type="button"
                    onClick={() => setActiveIndex((current) => (current + 1) % goalSlides.length)}
                    className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-950 shadow-lg transition hover:bg-white"
                    aria-label="Next goal image"
                >
                    <FaArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
            </div>
            <div className="flex items-center justify-center gap-2 p-4">
                {goalSlides.map((item, index) => (
                    <button
                        key={item.title}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`h-2.5 rounded-full transition-all ${index === activeIndex ? 'w-8 bg-primary-700' : 'w-2.5 bg-slate-300 hover:bg-slate-400'}`}
                        aria-label={`Show ${item.title}`}
                    />
                ))}
            </div>
        </div>
    )
}

const Dynamo = () => {
    const [activeTab, setActiveTab] = useState('home')

    return (
        <div className="bg-white text-slate-950">
            <section id="hero" className="relative min-h-[72vh] overflow-hidden bg-slate-950 text-white">
                <img
                    src={assetUrl('/images/projects/dynamo/hero.webp')}
                    alt=""
                    fetchPriority="high"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover opacity-55"
                    aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/82 to-slate-950/22" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                <div className="container relative z-10 mx-auto flex min-h-[72vh] max-w-7xl items-end px-6 pb-16 pt-28 md:px-10">
                    <div className="max-w-3xl">
                        <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-primary-200">
                            Dynamic Navigation and Manipulation Operations
                        </p>
                        <h1 className="mb-5 text-5xl font-black leading-none tracking-tight md:text-7xl">
                            DyNAMO
                        </h1>
                        <p className="max-w-2xl text-lg leading-8 text-white/78">
                            A visible robotics research progression: from an integrated navigation-manipulation goal
                            to simulation, teleoperation, and hardware-facing validation.
                        </p>
                        <button
                            type="button"
                            onClick={() => setActiveTab('experiments')}
                            className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950 shadow-xl transition hover:bg-primary-50"
                        >
                            View result timeline
                        </button>
                    </div>
                </div>
            </section>

            <div className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl">
                <div className="container mx-auto max-w-5xl px-4 pt-2">
                    <div className="grid grid-cols-3 items-end gap-1 border-b border-slate-200">
                        {tabs.map((tab) => {
                            const Icon = tab.icon
                            const isActive = activeTab === tab.id
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative -mb-px flex min-h-11 items-center justify-center gap-2 rounded-t-md border px-3 text-xs font-bold transition md:text-sm ${
                                        isActive
                                            ? 'border-slate-200 border-b-white bg-white text-slate-950 shadow-[0_-8px_24px_rgba(15,23,42,0.08)]'
                                            : 'border-transparent bg-slate-100/75 text-slate-500 hover:bg-white hover:text-slate-950'
                                    }`}
                                >
                                    <Icon className="h-4 w-4" aria-hidden="true" />
                                    <span className="hidden sm:inline">{tab.label}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            <main>
                {activeTab === 'home' && (
                    <>
                <section id="goal" className="py-20 md:py-28">
                    <div className="container mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center md:px-10">
                        <div>
                            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-primary-700">Project Goal</p>
                            <h2 className="mb-6 text-4xl font-black leading-tight tracking-tight md:text-5xl">
                                Build the bridge between navigation, manipulation, and embodied reasoning.
                            </h2>
                            <p className="text-lg leading-8 text-slate-600">
                                Dynamo aims to demonstrate an integrated system where a humanoid robot identifies,
                                grasps, and places objects while working with an autonomously navigating mobile base.
                                The core challenge is Sim2Real transfer: behavior developed in simulation must survive
                                the noise and constraints of physical operation.
                            </p>
                            <div className="mt-8 rounded-lg border-l-4 border-primary-600 bg-slate-50 p-5">
                                <p className="text-sm italic leading-7 text-slate-600">
                                    Bridging perception, reasoning, navigation, and manipulation through a visible experiment pipeline.
                                </p>
                            </div>
                        </div>

                        <GoalImageCarousel />
                    </div>
                </section>

                <section id="status" className="bg-slate-50 py-20 md:py-24">
                    <div className="container mx-auto max-w-6xl px-6 md:px-10">
                        <div className="mx-auto mb-12 max-w-3xl text-center">
                            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-primary-700">Current Status</p>
                            <h2 className="mb-4 text-3xl font-black leading-tight tracking-tight md:text-4xl">
                                Active workstreams moving toward one integrated robot testbed.
                            </h2>
                            <p className="text-slate-600">
                                The current project state is intentionally iterative: each operation captures
                                simulation, teleoperation, or hardware validation rather than a polished final product.
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-3">
                            {statusCards.map((card) => {
                                const Icon = card.icon
                                return (
                                    <article key={card.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                                        <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-md bg-slate-950 text-white">
                                            <Icon className="h-4 w-4" aria-hidden="true" />
                                        </div>
                                        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-700">{card.eyebrow}</p>
                                        <h3 className="mb-3 text-xl font-bold">{card.title}</h3>
                                        <p className="leading-7 text-slate-600">{card.text}</p>
                                    </article>
                                )
                            })}
                        </div>
                    </div>
                </section>

                    </>
                )}

                {activeTab === 'architecture' && (
                <section id="architecture" className="bg-gradient-to-b from-white to-slate-50 py-20 md:py-24">
                    <div className="container mx-auto max-w-6xl px-6 md:px-10">
                        <div className="mb-10 text-center">
                            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-primary-700">System Architecture</p>
                            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                                Interface-driven robotics architecture.
                            </h2>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-200/70 md:p-6">
                          <div className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                            <img
                                src={assetUrl('/images/projects/dynamo/architecture.webp')}
                                alt="Dynamo system architecture"
                                loading="lazy"
                                decoding="async"
                                className="w-full object-contain"
                            />
                          </div>
                        </div>
                    </div>
                </section>
                )}

                {activeTab === 'home' && (
                <section id="technical" className="bg-[#f6f9fc] py-20 md:py-24">
                    <div className="container mx-auto max-w-6xl px-6 md:px-10">
                        <div className="mb-12 text-center">
                            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-primary-700">Technical Overview</p>
                            <h2 className="text-3xl font-black tracking-tight md:text-4xl">The stack behind the experiments.</h2>
                        </div>

                        <div className="relative rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/60 md:p-6">
                            <div className="grid gap-5 md:grid-cols-2">
                                {technicalBlocks.map((block, index) => {
                                    const Icon = block.icon
                                    const colorClasses = {
                                        blue: 'bg-primary-50 text-primary-700 border-primary-100',
                                        emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
                                        amber: 'bg-amber-50 text-amber-700 border-amber-100',
                                        violet: 'bg-violet-50 text-violet-700 border-violet-100',
                                    }

                                    return (
                                        <article key={block.title} className="relative rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg">
                                            <div className="mb-5 flex items-start justify-between gap-4">
                                                <div className={`flex h-12 w-12 items-center justify-center rounded-lg border ${colorClasses[block.color]}`}>
                                                    <Icon className="h-5 w-5" aria-hidden="true" />
                                                </div>
                                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                                                    0{index + 1}
                                                </span>
                                            </div>
                                            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-700">{block.label}</p>
                                            <h3 className="mb-2 text-xl font-bold text-slate-950">{block.title}</h3>
                                            <p className="mb-5 text-sm font-semibold text-slate-500">{block.metric}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {block.points.map((point) => (
                                                    <span key={point} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600">
                                                        {point}
                                                    </span>
                                                ))}
                                            </div>
                                        </article>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="mt-8 overflow-hidden rounded-2xl bg-slate-950 text-white shadow-2xl">
                            <div className="grid md:grid-cols-3">
                                {['Simulate', 'Validate', 'Integrate'].map((step, index) => (
                                    <div key={step} className="flex items-start gap-4 border-white/10 p-6 md:border-r md:last:border-r-0">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-sm font-black">
                                            {index + 1}
                                        </span>
                                        <div>
                                            <h3 className="font-bold">{step}</h3>
                                            <p className="text-sm text-slate-300">
                                                {index === 0 && 'Build repeatable scenes and robot behavior trials.'}
                                                {index === 1 && 'Compare simulation evidence with hardware-facing runs.'}
                                                {index === 2 && 'Connect mobility, manipulation, perception, and state.'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                )}

                {activeTab === 'experiments' && (
                <section id="experiments" className="py-20 md:py-24">
                    <div className="container mx-auto max-w-6xl px-6 md:px-10">
                        <div className="mx-auto mb-12 max-w-3xl text-center">
                            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-primary-700">Experiments & Results</p>
                            <h2 className="mb-4 text-3xl font-black leading-tight tracking-tight md:text-4xl">
                                Timeline of Dynamo results with associated proof videos.
                            </h2>
                            <p className="text-slate-600">
                                Each result is described by the technical operation carried out, the observed outcome,
                                and one visible video at a time for that part of the project.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {experimentResults.map((item, index) => (
                                <article key={item.title} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">
                                    <div className="grid lg:grid-cols-12">
                                        <div className="p-8 md:p-10 lg:col-span-5">
                                            <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-700 text-sm font-bold text-white">
                                                {index + 1}
                                            </span>
                                            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-700">{item.phase}</p>
                                            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{item.operation}</p>
                                            <h3 className="mb-4 text-2xl font-bold">{item.title}</h3>
                                            <p className="mb-5 leading-7 text-slate-600">{item.summary}</p>
                                            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                                                <p className="mb-2 text-sm font-bold text-slate-950">Result</p>
                                                <p className="text-sm leading-6 text-slate-600">{item.outcome}</p>
                                            </div>
                                        </div>

                                        <div className="bg-slate-50 p-5 md:p-8 lg:col-span-7">
                                            <VideoCarousel videos={item.videos} />
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
                )}

                <section className="pb-20 text-center">
                    <Link
                        to="/core-labs"
                        className="inline-flex items-center gap-3 rounded-full border border-primary-700 px-6 py-3 text-sm font-bold text-primary-700 transition hover:bg-primary-700 hover:text-white"
                    >
                        <FaArrowLeft className="h-3 w-3" aria-hidden="true" />
                        Back to CORE Labs
                    </Link>
                </section>
            </main>
        </div>
    )
}

export default Dynamo
