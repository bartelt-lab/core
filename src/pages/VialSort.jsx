import { FaCamera, FaCheckCircle, FaCogs, FaRobot } from 'react-icons/fa'
import { MiniLabel } from '../components/common/Eyebrow'
import BackToLabsPill from '../components/common/BackToLabsPill'
import ResearchQuestionCard from '../components/common/ResearchQuestionCard'
import MilestoneBrowser from '../components/common/MilestoneBrowser'
import ProjectPeople from '../components/common/ProjectPeople'
import assetUrl from '../utils/assetUrl'

// Chronological order (oldest first); the browser displays newest-first.
const milestones = [
    {
        operation: 'Setup',
        title: 'SO-101 vial-sorting rig',
        summary: 'The SO-101 6-DOF arm runs on an NVIDIA Jetson Thor with two 6-slot racks arranged diagonally to the arm and a bin on the left. Three 640x480 camera views observe the tabletop while language commands specify which colored vial should move to which rack slot.',
        outcome: 'The physical workspace, camera layout, racks, bin, and language-conditioned task definition are fixed for the data-collection and policy runs.',
        media: { type: 'drive', id: '1-jHS8TeIWsyKniH9FTj2ViHlYPo0KEsW', title: 'Vial Sort setup' },
    },
    {
        operation: 'Data collection',
        title: 'Teleoperated dataset episode',
        summary: 'A human drives the leader arm, the follower mirrors it, and each episode records camera streams, joint states, and the language instruction into a LeRobot dataset. The replay shows the synchronized cameras, joint trajectory, and prompt in the same timeline the policy trains on.',
        outcome: 'Each demonstration captures one atomic skill with distractor vials, so the model must follow the prompt rather than memorize a fixed scene.',
        media: { type: 'drive', id: '13fSm6mxCNbBhC_LgIeBx6YqSSpP9mFCY', title: 'Data collection visualization' },
    },
    {
        operation: 'Depth perception',
        title: 'RGB, Depth Anything V2, and RealSense comparison',
        summary: 'The depth comparison shows Depth Anything V2 capturing the tubes more clearly than the Intel RealSense sensor, which struggles with transparent glass. The current pi0.5 training remains RGB-first, with Depth Anything planned for the next training round.',
        outcome: 'RGB remains the primary VLA input, while learned depth becomes the candidate signal for the next dataset and policy iteration.',
        media: { type: 'drive', id: '1D9lvUM2RohNmbwkyxsmtrwB2m7QzQxN-', title: 'Depth perception comparison' },
    },
    {
        operation: 'Autonomous inference',
        title: 'ACT, pi0, and pi0.5 policy runs',
        summary: 'The autonomous comparison shows the sequence of policies built so far: ACT as the pick-and-place baseline, pi0 as a stronger policy that did not reliably follow the language prompt, and pi0.5 as the current model with improved prompt-following.',
        outcome: 'Early tests on the previous dataset guide the retraining plan for the new dataset.',
        media: { type: 'drive', id: '1rY4kOW3txd81okTD42vrPGUyVo6KQQBm', title: 'Autonomous inference policy comparison' },
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
    { label: 'Robot', value: 'SO-101 6-DOF arm' },
    { label: 'Compute', value: 'NVIDIA Jetson Thor' },
    { label: 'Workspace', value: '2 x 6-slot racks + bin' },
    { label: 'Cameras', value: '3 x RGB, 640x480 @ 30fps' },
    { label: 'Framework', value: 'LeRobot' },
    { label: 'Policies', value: 'ACT, pi0, pi0.5' },
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
        <header className="relative overflow-hidden px-6 pb-3 pt-18 md:pb-4 md:pt-20">
            <div className="absolute inset-x-0 top-0 h-[25rem] opacity-30" aria-hidden="true">
                <img
                    src={assetUrl('/images/projects/vial-sort/hero.webp')}
                    alt=""
                    fetchPriority="high"
                    decoding="async"
                    className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-sky-50/35 via-sky-50/80 to-white" />
            </div>

            <div className="container relative z-10 mx-auto grid max-w-6xl gap-6 md:grid-cols-[0.95fr_1.05fr] md:items-end">
                <div>
                    <BackToLabsPill className="mb-5" />
                    <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">
                        Cognitive robotics - SO-101 robotic arm
                    </p>
                    <h1 className="text-4xl font-bold leading-none tracking-tight text-slate-950 md:text-5xl">Vial Sort</h1>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700">
                        A language-conditioned vial sorting project for the Waveshare SO-101 arm. The robot observes a
                        tabletop scene with two 6x1 vial racks and three camera views, receives an instruction such as
                        placing a red vial into a target rack position, and executes the corresponding pick-and-place
                        behavior through a pi0 vision-language-action pipeline.
                    </p>
                    <ProjectPeople
                        slugs={['szilagyi', 'sari-abdan']}
                        label="Team"
                        className="mt-4"
                    />
                </div>
                <ResearchQuestionCard
                    question="Which training setup produces a higher success rate for VLA-based vial sorting on the SO-101 robot arm: a static tabletop dataset or a domain-randomized dataset?"
                    tags={['SO-101', 'pi0 + LoRA', 'LeRobot', 'Jetson AGX Thor']}
                />
            </div>
        </header>

        <main className="container mx-auto max-w-6xl px-6 pb-20 pt-2 md:px-8 md:pt-3">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">Experiment log</p>
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
