import { Link } from 'react-router-dom'
import { FaArrowLeft, FaCamera, FaCheckCircle, FaCogs, FaRobot } from 'react-icons/fa'
import assetUrl from '../utils/assetUrl'

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

const metrics = ['Task success rate', 'Scenario difficulty', 'Grip failures', 'Dropped vials', 'Wrong placement', 'Latency']

const VialSort = () => (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-slate-50 text-slate-950">
        <header className="relative overflow-hidden pt-36 pb-12 md:pt-40">
            <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-white/80 to-transparent" aria-hidden="true" />
            <div className="container relative mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[0.95fr_1.05fr] md:items-end md:px-10">
            <div>
                <Link
                    to="/core-labs"
                    className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/90 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-primary-700 shadow-lg shadow-primary-100/60 backdrop-blur transition hover:-translate-y-0.5 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-900"
                >
                    <FaArrowLeft className="h-3 w-3" />
                    CORE Labs
                </Link>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-primary-700">
                    Cognitive Robotics · SO-101 Robotic Arm
                </p>
                <h1 className="text-4xl font-black leading-none tracking-tight md:text-6xl">
                    Vial Sort
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                    A language-conditioned vial sorting project for the Waveshare SO-101 arm. The robot observes a tabletop scene with two 6x1 vial racks and three camera views, receives an instruction such as placing a red vial into a target rack position, and executes the corresponding pick-and-place behavior through a pi0 vision-language-action pipeline.
                </p>
            </div>
            <div className="rounded-2xl border border-primary-100 bg-white/85 p-5 shadow-xl shadow-primary-100/70 backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-700">Research question</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                    Which training setup produces a higher success rate for VLA-based vial sorting on the SO-101 robot arm: a static tabletop dataset or a domain-randomized dataset?
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                    {['SO-101', 'pi0 + LoRA', 'LeRobot', 'Jetson AGX Thor'].map((tag) => (
                        <span key={tag} className="rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-bold text-primary-800">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            </div>
        </header>

        <main className="container mx-auto max-w-6xl px-6 pb-20 md:px-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/80">
                    <div className="relative aspect-video bg-slate-100">
                        <video
                            src={assetUrl('/videos/demonstrations/vial-sort/annotated_episode.mp4')}
                            className="h-full w-full object-cover"
                            controls
                            muted
                            playsInline
                            preload="metadata"
                        />
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-white px-5 py-4">
                        <div>
                            <p className="text-sm font-black text-slate-950">Annotated episode</p>
                            <p className="mt-1 text-xs font-semibold text-slate-500">Language instruction, camera observation, and vial manipulation in one run.</p>
                        </div>
                    </div>
                </section>

                <aside className="flex flex-col gap-4">
                    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Project setup</p>
                        <p className="text-sm leading-7 text-slate-600">
                            The task uses a tabletop scene with two 6x1 vial racks, colored vials, three camera views, and a SO-101 follower arm. The system maps a natural-language instruction to robot actions through a pi0 VLA policy fine-tuned with LoRA.
                        </p>
                    </section>

                    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">About</p>
                        <div className="space-y-3">
                            {[
                                { label: 'Platform', value: 'Waveshare SO-101' },
                                { label: 'Policy', value: 'pi0 + LoRA' },
                                { label: 'Framework', value: 'LeRobot' },
                                { label: 'Inference', value: 'Jetson AGX Thor' },
                                { label: 'Cameras', value: '3 x RGB views' },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center justify-between gap-3">
                                    <span className="text-xs text-slate-500">{item.label}</span>
                                    <span className="text-right text-xs font-bold text-slate-800">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </aside>
            </div>

            <section className="mt-8 grid gap-5 md:grid-cols-3">
                {pipeline.map((item) => {
                    const Icon = item.icon
                    return (
                        <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white">
                                <Icon className="h-4 w-4" aria-hidden="true" />
                            </div>
                            <h2 className="text-lg font-black text-slate-950">{item.title}</h2>
                            <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                        </article>
                    )
                })}
            </section>

            <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
                    <div>
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary-700">Expected outcome</p>
                        <h2 className="text-2xl font-black leading-tight md:text-3xl">A complete VLA pipeline for language-conditioned vial sorting.</h2>
                        <p className="mt-4 text-sm leading-7 text-slate-600">
                            The project should produce documented components for end-effector control, inverse kinematics, dataset conversion, LoRA fine-tuning, deployment, and evaluation. The evaluation compares success rate, robustness, latency, and failure modes across controlled lab scenarios.
                        </p>
                    </div>
                    <div>
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Evaluation metrics</p>
                        <div className="flex flex-wrap gap-2">
                            {metrics.map((metric) => (
                                <span key={metric} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700">
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
