import { FaCamera, FaCogs, FaRobot } from 'react-icons/fa'
import BackToLabsPill from '../components/common/BackToLabsPill'
import ResearchQuestionCard from '../components/common/ResearchQuestionCard'
import MilestoneBrowser from '../components/common/MilestoneBrowser'
import ProjectPeople from '../components/common/ProjectPeople'
import assetUrl from '../utils/assetUrl'

const FIG = '/images/projects/vial-sort'

// Inline jump to a section further down the page. `scroll-behavior: smooth` is set
// globally in index.css and every target carries `scroll-mt-28` to clear the floating
// navbar, so a plain anchor is enough — no handler, and it still works without JS.
const Jump = ({ to, children }) => (
    <a
        href={`#${to}`}
        className="font-semibold text-primary-700 underline decoration-primary-300 underline-offset-2 transition hover:text-primary-800 hover:decoration-primary-500"
    >
        {children}
        <span aria-hidden="true"> &darr;</span>
    </a>
)

// Chronological order (oldest first); the browser displays newest-first.
//
// Entries 01-03 are the exploratory run on an EARLIER dataset, before the rig was fixed
// and the final dataset recorded. Do not describe them as results of the deployed policy
// — none of those policies were carried through to deployment.
//
// Figures are lifted from the project report at native resolution and carry small text,
// so every one is `fit: 'contain'`: the player is 16:9 and cropping a 5:1 filmstrip or a
// 4:3 annotated scene to cover cuts the labels off.
const milestones = [
    {
        operation: 'Exploration',
        title: 'What one recorded episode looks like',
        summary: 'A replay of a single teleoperated entry from the earlier dataset, in the multi-pane viewer: a colormapped depth view, a side camera on the arm and rack, a wrist camera closing on a vial, and the joint signals plotted on a shared timeline.',
        outcome: 'Fixes the recording format every later dataset uses — synchronized camera streams, joint trajectory and the language instruction on one timeline.',
        media: {
            type: 'video',
            src: '/videos/demonstrations/vial-sort/data-collection-viz.mp4',
            poster: '/videos/demonstrations/vial-sort/data-collection-viz-poster.webp',
            title: 'One recorded episode, replayed',
        },
    },
    {
        operation: 'Exploration',
        title: 'First policies, before the real dataset',
        summary: 'Three early attempts run side by side on the earlier dataset — ACT as a motion baseline with no language conditioning, then pi0 and pi0.5 — each column showing the arm attempting the commanded arrangement under its own status overlay.',
        outcome: 'None of these were carried through. ACT could not be commanded in language, pi0 was only ever driven with a single fixed instruction, and the run exposed how much the dataset itself had to change.',
        media: {
            type: 'video',
            src: '/videos/demonstrations/vial-sort/policy-comparison.mp4',
            poster: '/videos/demonstrations/vial-sort/policy-comparison-poster.webp',
            // 2020x440. Cropping this to fill a 16:9 player would show only the middle
            // policy, which is the whole point of the clip.
            fit: 'contain',
            title: 'Early policy comparison',
        },
    },
    {
        operation: 'Exploration',
        title: 'Depth fails on transparent glass',
        summary: 'A three-way comparison on the vial rack, panelled as RGB input, Depth Anything V2 and the Intel RealSense stream. The learned monocular depth resolves the tubes as continuous surfaces; the active-stereo RealSense output drops out to black across the glass.',
        outcome: 'Settled the input question before any training: the policy reads RGB, and depth is recorded alongside as a reference channel rather than fed to the model.',
        media: {
            type: 'video',
            src: '/videos/demonstrations/vial-sort/depth-perception-comparison.mp4',
            poster: '/videos/demonstrations/vial-sort/depth-perception-comparison-poster.webp',
            // 1920x522, three depth panes side by side — cover would crop the outer two.
            fit: 'contain',
            title: 'Depth perception comparison',
        },
    },
    {
        operation: 'Assembly',
        title: 'The rig, and why nothing on it may move',
        summary: 'The SO-101 is an open 3D-printed six-DOF design. Six Feetech STS3215 serial-bus servos were assembled into the linkage and wired as a daisy chain, built as a matched pair — a leader arm for teleoperation and a follower that executes — with every joint range and zero position calibrated and a watchdog cutting torque on repeated temperature or current violations.',
        outcome: 'Cameras, racks and bin are pinned in place. When the top camera once drifted from its mounted pose, a working policy stopped working — its inputs had left the distribution it was trained on — so each camera is now re-anchored to a saved reference frame before recording.',
        media: { type: 'image', src: `${FIG}/rig-labeled.webp`, fit: 'contain', alt: 'The rig with the leader arm, follower arm, top and side cameras, racks and discard bin labeled', title: 'Labeled rig' },
    },
    {
        operation: 'Scene grammar',
        title: 'Scenes generated under constraints',
        summary: 'Every scene comes off a seeded layout sheet under rules with physical reasons. No two vials sit in adjacent slots, because the parallel-jaw gripper needs finger clearance on both sides. A destination slot and both its neighbours must be empty, since leaving only one side free turned out not to be enough. Racks hold at most three vials and at most three of any colour, and distractors are never the target colour, so the target is the unique vial of its colour.',
        outcome: 'Targets originate only from slots 1, 3, 4 and 6 and are placed only into 1, 3 and 6 — slots 2, 4 and 5 are held out of training entirely to test whether the policy interpolates to positions it has never picked from.',
        media: { type: 'image', src: `${FIG}/scene-grammar.webp`, fit: 'contain', alt: 'The vial-sorting scene from the side camera with the two racks, slots numbered 1 to 6, the discard bin and the target and distractor vials labeled', title: 'Scene grammar' },
    },
    {
        operation: 'Prompt design',
        title: 'One command, thousands of phrasings',
        summary: 'Commands use a source-to-destination position grammar and the vial’s colour is deliberately never named — the high-level planner does the colour-to-position grounding, and the policy performs a purely spatial pick-and-place. Each instruction is composed by drawing independently from six verbs, four object nouns, five slot phrasings, four rack phrasings and four sentence templates.',
        outcome: 'Roughly 3.8 x 10⁴ surface forms exist for a single rack-to-rack command, and the dataset draws from that space deterministically, so consecutive demonstrations of the same move are worded differently and the policy has to parse the language rather than latch onto one template.',
        media: { type: 'image', src: `${FIG}/prompt-design.svg`, fit: 'contain', alt: 'The five prompt pools multiplied together to about 38,000 phrasings, with three differently worded realizations of the same move', title: 'Prompt design' },
    },
    {
        operation: 'Dataset',
        title: '150 demonstrations across 46 command pairs',
        summary: 'Each demonstration is one atomic pick-and-place of roughly 23 seconds — about 700 frames at 30 Hz. Per timestep the dataset stores three RGB views, a colorized depth image, the seven-dimensional end-effector state and action, and the language string. The 150 episodes cover 46 distinct source-to-destination pairs, averaging 3.3 episodes per pair, split 120 rack placements to 30 bin discards.',
        outcome: 'Coverage is deliberately uneven — the layout constraints forbid some combinations outright — and every colour is paired with every destination, so no colour correlates with a fixed slot and the instruction alone determines where the vial goes.',
        media: { type: 'image', src: `${FIG}/dataset-coverage.webp`, fit: 'contain', alt: 'Heatmap of episode counts per source-to-destination pair, with the rack versus bin destination split', title: 'Dataset coverage' },
    },
    {
        operation: 'Policy training',
        title: 'Frozen backbone, action expert only',
        summary: 'The deployed policy is pi0.5, a roughly three-billion-parameter vision-language-action flow model, fine-tuned from released base weights. The vision encoder and the language backbone are held fixed and only the action expert — the flow-matching head that produces motion — receives gradients. It emits an entire fifty-step action chunk in a single forward pass.',
        outcome: (
            <>
                Because the frozen majority runs forward-only, with no gradients, optimiser state or stored
                activations, the fine-tune fits in about 19 GB. The choice was empirical as much as principled: an
                unfrozen variant overfit and failed to grasp, while the frozen policy trained cleanly.{' '}
                <Jump to="system">Which checkpoint gets deployed, and why, is laid out below</Jump>.
            </>
        ),
        media: { type: 'image', src: `${FIG}/frozen-training.svg`, fit: 'contain', alt: 'The frozen SigLIP encoder and Gemma language model feeding a trainable action expert that emits a 50-step action chunk, with the training configuration', title: 'Frozen-backbone training' },
    },
    {
        operation: 'Deployment',
        title: 'Driving the policy from the browser',
        summary: 'The checkpoint is served on the Jetson behind a control panel showing the three live camera feeds. The operator picks a source rack and slot and a destination, the matching instruction is composed underneath, and Execute issues it — with Home and an emergency stop available at all times.',
        outcome: (
            <>
                The arm homes to the demonstration start pose before every command. An early mismatch there produced
                an out-of-distribution transient in which the arm flailed before recovering; setting the home pose
                directly from the recorded data removed it.{' '}
                <Jump to="system">See how the panel, the server and the arm are wired together</Jump>.
            </>
        ),
        media: { type: 'image', src: `${FIG}/control-panel.webp`, fit: 'contain', alt: 'The deployment control panel with three live camera feeds, command entry, and Execute, Home and emergency stop controls', title: 'Deployment control panel' },
    },
    {
        operation: 'Results',
        title: 'Autonomous rollouts, and where they fail',
        summary: 'The deployed checkpoint was run autonomously across fifteen distinct source-to-destination commands, several rollouts each, with a human scoring every one as a missed pickup, a missed drop, a collision, or a complete success. A rollout that misses the first grasp but recovers and finishes within the time budget counts as a success.',
        outcome: (
            <>
                The system completes the full pick-and-place on a quarter of rollouts, and the failures are
                overwhelmingly one thing: the gripper missing the target vial on its first attempt. Once a grasp
                lands, transport, targeting and release usually finish.{' '}
                <Jump to="results">Every rate and the per-command breakdown are charted below</Jump>.
            </>
        ),
        media: {
            type: 'video',
            src: '/videos/demonstrations/vial-sort/first-experiment-montage.mp4',
            poster: '/videos/demonstrations/vial-sort/first-experiment-montage-poster.webp',
            // 1440x360, three camera views side by side — cover would crop the outer two.
            fit: 'contain',
            title: 'Test-time rollouts, both outcomes',
        },
    },
]

// Headline rates from the human-scored rollouts. The failure modes are not mutually
// exclusive — a rollout can be scored for both a collision and a missed pickup — so these
// deliberately do not sum to 100.
const outcomeStats = [
    { value: '25%', label: 'Complete success', note: 'full pick-and-place, no error', tone: 'success' },
    { value: '54%', label: 'Missed pickup', note: 'the dominant failure mode', tone: 'bad' },
    { value: '13%', label: 'Collision', note: 'never occurs on its own', tone: 'warn' },
    { value: '8%', label: 'Wrong target or slot', note: 'command following is not the limit', tone: 'mild' },
]

const TONE = {
    success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    bad: 'border-red-200 bg-red-50 text-red-700',
    warn: 'border-amber-200 bg-amber-50 text-amber-700',
    mild: 'border-slate-200 bg-slate-50 text-slate-600',
}

// `width`/`height` are the figures' intrinsic pixel sizes. They are load-bearing: without
// them an unloaded lazy image collapses to zero height, which both shifts the layout when
// it arrives and keeps it out of the viewport that would trigger the load.
const resultFigures = [
    {
        src: `${FIG}/outcomes.webp`,
        width: 1357,
        height: 702,
        title: 'Outcome prevalence',
        caption: 'Complete success against the failure rate, then the failures broken down by mode. A missed pickup occurs on 54% of rollouts, though a few of those recover and still complete the placement.',
    },
    {
        src: `${FIG}/outcome-composition.webp`,
        width: 1650,
        height: 827,
        title: 'What each scenario fails at',
        caption: 'In almost every scenario the non-success mass is a single mode rather than a spread. Missed drops cluster on the bin commands; wrong-slot errors are confined to a handful of adjacent-slot cases.',
    },
    {
        src: `${FIG}/per-scenario.webp`,
        width: 1816,
        height: 749,
        title: 'Success per command',
        caption: 'Success is very uneven across commands, ranging from none to four in five. The scenarios that fail completely do so almost entirely to a missed pickup of the source vial.',
    },
    {
        src: `${FIG}/held-out-slots.webp`,
        width: 1146,
        height: 766,
        title: 'Held-out source slots',
        caption: 'Source slots never seen in training scored higher than trained ones — but on a handful of rollouts, with a confidence interval spanning the trained rate. The gap is within chance, and no generalization claim rests on it.',
    },
]

const pipeline = [
    {
        icon: FaCogs,
        title: 'Control stack',
        text: 'Actions and proprioceptive state live in the end-effector frame: recorded joint positions are mapped through forward kinematics to a seven-dimensional pose covering translation, rotation and the gripper.',
    },
    {
        icon: FaRobot,
        title: 'Hierarchical instruction following',
        text: 'A high-level planner grounds which vial goes where and emits an atomic source-to-destination command; the low-level flow policy executes the spatial pick-and-place at 30 Hz.',
    },
    {
        icon: FaCamera,
        title: 'On-robot inference',
        text: 'Camera capture, policy inference and motor control all run on the Jetson Thor beside the arm, so a command entered in the browser becomes motion without leaving the robot.',
    },
]

const aboutFacts = [
    { label: 'Robot', value: 'SO-101 6-DOF arm' },
    { label: 'Compute', value: 'NVIDIA Jetson Thor' },
    { label: 'Workspace', value: '2 x 6-slot racks + bin' },
    { label: 'Cameras', value: '3 x RGB, 640x480 @ 30fps' },
    { label: 'Framework', value: 'LeRobot' },
    { label: 'Policy', value: 'pi0.5, frozen backbone' },
    { label: 'Dataset', value: '150 teleoperated episodes' },
]

// The build facts used to sit in the milestone browser's sidebar, where they ate the
// vertical space the milestone list needs. They read better as a full-width strip.
const SpecStrip = () => (
    <section className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {aboutFacts.map((item) => (
            <div
                key={item.label}
                className="rounded-xl border border-slate-200 bg-white/70 px-4 py-3.5 shadow-sm backdrop-blur-sm transition duration-200 hover:border-primary-200 hover:shadow-md"
            >
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">{item.label}</p>
                <p className="mt-1.5 text-sm font-bold text-slate-800">{item.value}</p>
            </div>
        ))}
    </section>
)

// Page shell width. The milestone player is the widest thing on the page and scales 16:9
// with whatever the shell gives it, so a single cap wasted more than half the screen on a
// large display. It steps up instead of stopping at one value. Widening is safe here
// because every text block below is either multi-column or carries its own `max-w`, so
// nothing stretches to an unreadable measure. Hero and main share the constant so their
// edges stay aligned — they were 24px/32px apart before.
const SHELL = 'mx-auto w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[88rem] min-[1920px]:max-w-[96rem]'

const VialSort = () => (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 font-sans text-slate-950">
        <header className="relative overflow-hidden pb-3 pt-18 md:pb-4 md:pt-20">
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

            <div className={`relative z-10 grid gap-6 px-6 md:grid-cols-[0.95fr_1.05fr] md:items-end md:px-8 ${SHELL}`}>
                <div>
                    <BackToLabsPill className="mb-5" />
                    <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">
                        Cognitive robotics - SO-101 robotic arm
                    </p>
                    <h1 className="text-4xl font-bold leading-none tracking-tight text-slate-950 md:text-5xl">Vial Sort</h1>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700">
                        A language-conditioned sorting system on a low-cost SO-101 arm. The robot reads a tabletop
                        scene of two six-slot vial racks from three camera views, receives an instruction such as
                        moving the vial in position 3 of the left rack to slot 6 of the right one, and carries out the
                        pick-and-place through a frozen-backbone pi0.5 vision-language-action policy running on the
                        robot itself.
                    </p>
                    <ProjectPeople
                        slugs={['szilagyi', 'sari-abdan']}
                        label="Team"
                        className="mt-4"
                    />
                </div>
                <ResearchQuestionCard
                    question="Can a vision-language-action policy fine-tuned on 150 teleoperated demonstrations - training only its action expert and leaving the vision and language backbones frozen - produce a deployable language-conditioned sorter, and what limits it?"
                    tags={['SO-101', 'pi0.5 frozen backbone', 'LeRobot', 'Jetson Thor']}
                />
            </div>
        </header>

        <main className={`px-6 pb-20 pt-2 md:px-8 md:pt-3 ${SHELL}`}>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">Experiment log</p>
            <MilestoneBrowser items={milestones} />
            <SpecStrip />

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

            <section id="system" className="mt-8 scroll-mt-28 rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur-sm md:p-8">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">Built and trained</p>
                <h2 className="text-2xl font-bold leading-tight md:text-3xl">How the pieces fit together.</h2>
                <div className="mt-6 grid gap-5 lg:grid-cols-2">
                    <figure className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                        <img
                            src={assetUrl(`${FIG}/architecture.svg`)}
                            alt="Workstation control panel talking over HTTP to the Jetson-hosted inference server, policy, cameras and arm"
                            width={1600}
                            height={900}
                            loading="lazy"
                            decoding="async"
                            className="h-auto w-full bg-white object-contain"
                        />
                        <figcaption className="border-t border-slate-100 px-4 py-3">
                            <p className="text-xs font-bold text-slate-800">One HTTP interface in front of the hardware</p>
                            <p className="mt-1 text-xs leading-5 text-slate-500">
                                The arm, the three cameras and the policy all sit on the Jetson behind an inference
                                server: <code className="rounded bg-slate-100 px-1 py-0.5 text-[11px]">/execute</code> runs a
                                commanded move, <code className="rounded bg-slate-100 px-1 py-0.5 text-[11px]">/home</code> returns
                                the arm to the training start pose,{' '}
                                <code className="rounded bg-slate-100 px-1 py-0.5 text-[11px]">/observe</code> and{' '}
                                <code className="rounded bg-slate-100 px-1 py-0.5 text-[11px]">/state</code> stream frames and
                                status, and <code className="rounded bg-slate-100 px-1 py-0.5 text-[11px]">/stop</code> halts
                                motion. No client touches the hardware directly, so the browser panel and the
                                evaluation harness drive the same robot through one surface.
                            </p>
                        </figcaption>
                    </figure>
                    <figure className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                        <img
                            src={assetUrl(`${FIG}/checkpoint-study.svg`)}
                            alt="The 8k, 12k and 16k checkpoints compared on following the command, grasping, and completing placement"
                            width={1600}
                            height={900}
                            loading="lazy"
                            decoding="async"
                            className="h-auto w-full bg-white object-contain"
                        />
                        <figcaption className="border-t border-slate-100 px-4 py-3">
                            <p className="text-xs font-bold text-slate-800">Why 12,000 steps is the operating point</p>
                            <p className="mt-1 text-xs leading-5 text-slate-500">
                                Checkpoints were written every 2,000 steps. At 8,000 the policy does not yet follow the
                                command; at 12,000 it follows, grasps and completes placements; by 16,000 it still
                                parses the instruction but has lost the grasp. The usable window is narrow because the
                                dataset is small — every number on this page comes from the 12,000-step checkpoint.
                            </p>
                        </figcaption>
                    </figure>
                </div>
            </section>

            <section id="results" className="mt-8 scroll-mt-28 rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur-sm md:p-8">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">Evaluation</p>
                <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-start">
                    <div>
                        <h2 className="text-2xl font-bold leading-tight md:text-3xl">
                            The limit is grasping, not language.
                        </h2>
                        <p className="mt-4 text-sm leading-7 text-slate-600">
                            Holding the scene fixed and changing only the destination clause sends the arm to a
                            different target, and gross targeting errors account for a small minority of rollouts. So
                            instruction following and slot targeting are largely solved. What fails is the first
                            grasp — worst at the outermost slots, which sit at the extremes of the arm&rsquo;s reach.
                            Collisions never stand alone; they accompany a missed grasp or drop at those same extremes.
                        </p>
                        <p className="mt-4 text-sm leading-7 text-slate-600">
                            The policy also tolerated substantial nuisance variation. The background was not held
                            constant during inference — people moved through the scene and the room changed — and the
                            demonstrations themselves were recorded with the lights both on and off, with no material
                            effect on behaviour.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {outcomeStats.map((stat) => (
                            <div key={stat.label} className={`rounded-xl border p-4 ${TONE[stat.tone]}`}>
                                <p className="text-3xl font-bold leading-none">{stat.value}</p>
                                <p className="mt-2 text-xs font-bold">{stat.label}</p>
                                <p className="mt-1 text-[11px] opacity-80">{stat.note}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-2">
                    {resultFigures.map((figure) => (
                        <figure key={figure.title} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                            <img
                                src={assetUrl(figure.src)}
                                alt={figure.title}
                                width={figure.width}
                                height={figure.height}
                                loading="lazy"
                                decoding="async"
                                className="h-auto w-full bg-white object-contain"
                            />
                            <figcaption className="border-t border-slate-100 px-4 py-3">
                                <p className="text-xs font-bold text-slate-800">{figure.title}</p>
                                <p className="mt-1 text-xs leading-5 text-slate-500">{figure.caption}</p>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </section>

            <section className="mt-8 rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur-sm md:p-8">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">Where it goes next</p>
                <div className="grid gap-6 md:grid-cols-3">
                    <div>
                        <h3 className="text-base font-bold text-slate-950">Grasp reliability</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">
                            More demonstrations per source slot, and closed-loop grasp correction — a shorter action
                            horizon so the policy re-plans on a missed contact instead of committing a full fifty-step
                            chunk.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-slate-950">Depth as an input</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">
                            The system is RGB-only because active-stereo depth fails on transparent glass. Feeding a
                            monocular depth estimator in as an extra channel is the natural next step for localizing
                            grasps at the reach extremes.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-slate-950">A cleaner generalization test</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">
                            Train several policies, each holding out a different set of source positions, and evaluate
                            each on its own held-out slots with a large rollout budget — enough to separate genuine
                            position generalization from per-slot grasp difficulty.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    </div>
)

export default VialSort
