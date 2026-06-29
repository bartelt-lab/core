import { FaCamera, FaCheckCircle, FaCogs, FaRobot } from 'react-icons/fa'
import { MiniLabel } from '../components/common/Eyebrow'
import BackToLabsPill from '../components/common/BackToLabsPill'
import ResearchQuestionCard from '../components/common/ResearchQuestionCard'
import MilestoneBrowser from '../components/common/MilestoneBrowser'

// Chronological order (oldest first); the browser displays newest-first.
const milestones = [
    {
        operation: 'Teleoperated demonstration',
        title: 'Annotated episode',
        summary: 'Language instruction, camera observation, and vial manipulation in one run - the annotated demonstration the training dataset is built from.',
        media: { type: 'video', src: '/videos/demonstrations/vial-sort/annotated_episode.mp4', title: 'Annotated episode' },
    },
    {
        operation: 'Autonomous policy',
        title: 'First successful autonomous run',
        summary: 'The first end-to-end autonomous vial sort executed by the fine-tuned pi0 policy.',
        media: {
            type: 'video',
            src: '/videos/demonstrations/vial-sort/autonomous_run.mp4',
            poster: '/videos/demonstrations/vial-sort/autonomous_run-poster.webp',
            title: 'First successful autonomous run',
        },
    },
]

const pipeline = [
    {
        icon: FaCogs,
        title: 'Control Stack',
        text: 'A seven-dimensional end-effector delta action space drives translation, rotation, and gripper commands.',
    },
    {
        icon: FaRobot,
        title: 'VLA Training',
        text: 'The vial dataset is converted into a VLA-compatible format and pi0 is fine-tuned with LoRA.',
    },
    {
        icon: FaCamera,
        title: 'Robot Deployment',
        text: 'Three RGB camera views and robot-side Jetson inference connect language instructions to pick-and-place actions.',
    },
]

const aboutFacts = [
    { label: 'Platform', value: 'Waveshare SO-101' },
    { label: 'Policy', value: 'pi0 + LoRA' },
    { label: 'Framework', value: 'LeRobot' },
    { label: 'Inference', value: 'Jetson AGX Thor' },
    { label: 'Cameras', value: '3 x RGB views' },
]

const metrics = ['Task success rate', 'Scenario difficulty', 'Grip failures', 'Dropped vials', 'Wrong placement', 'Latency']

const AboutCard = () => (
    <section className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur-sm">
        <div className="mb-3">
            <MiniLabel>About</MiniLabel>
        </div>
        <div className="space-y-3">
            {aboutFacts.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3">
                    <span className="text-xs text-slate-500">{item.label}</span>
                    <span className="text-right text-xs font-bold text-slate-800">{item.value}</span>
                </div>
            ))}
        </div>
    </section>
)

const VialSort = () => (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 font-sans text-slate-950">
        <header className="relative overflow-hidden pb-12 pt-36 md:pt-40">
            <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-white/80 to-transparent" aria-hidden="true" />
            <div className="container relative mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[0.95fr_1.05fr] md:items-end md:px-10">
                <div>
                    <BackToLabsPill variant="light" className="mb-8" />
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">
                        Cognitive robotics - SO-101 robotic arm
                    </p>
                    <h1 className="text-4xl font-bold leading-none tracking-tight md:text-6xl">Vial Sort</h1>
                    <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                        A language-conditioned vial sorting project for the Waveshare SO-101 arm. The robot observes a
                        tabletop scene with two 6x1 vial racks and three camera views, receives an instruction such as
                        placing a red vial into a target rack position, and executes the corresponding pick-and-place
                        behavior through a pi0 vision-language-action pipeline.
                    </p>
                </div>
                <ResearchQuestionCard
                    question="Which training setup produces a higher success rate for VLA-based vial sorting on the SO-101 robot arm: a static tabletop dataset or a domain-randomized dataset?"
                    tags={['SO-101', 'pi0 + LoRA', 'LeRobot', 'Jetson AGX Thor']}
                />
            </div>
        </header>

        <main className="container mx-auto max-w-6xl px-6 pb-20 md:px-10">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">Experiment log</p>
            <MilestoneBrowser items={milestones} aside={<AboutCard />} />

            <section className="mt-8 grid gap-5 md:grid-cols-3">
                {pipeline.map((item) => {
                    const Icon = item.icon
                    return (
                        <article key={item.title} className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur-sm">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white">
                                <Icon className="h-4 w-4" aria-hidden="true" />
                            </div>
                            <h2 className="text-lg font-bold text-slate-950">{item.title}</h2>
                            <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                        </article>
                    )
                })}
            </section>

            <section className="mt-8 rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur-sm">
                <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
                    <div>
                        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">Expected outcome</p>
                        <h2 className="text-2xl font-bold leading-tight md:text-3xl">
                            A complete VLA pipeline for language-conditioned vial sorting.
                        </h2>
                        <p className="mt-4 text-sm leading-7 text-slate-600">
                            The project should produce documented components for end-effector control, inverse kinematics,
                            dataset conversion, LoRA fine-tuning, deployment, and evaluation. The evaluation compares
                            success rate, robustness, latency, and failure modes across controlled lab scenarios.
                        </p>
                    </div>
                    <div>
                        <div className="mb-3">
                            <MiniLabel>Evaluation metrics</MiniLabel>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {metrics.map((metric) => (
                                <span
                                    key={metric}
                                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700"
                                >
                                    <FaCheckCircle className="h-3 w-3 text-primary-600" aria-hidden="true" />
                                    {metric}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
)

export default VialSort
