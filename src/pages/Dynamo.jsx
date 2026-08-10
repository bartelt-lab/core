import assetUrl from '../utils/assetUrl'
import { Label } from '../components/common/Eyebrow'
import BackToLabsPill from '../components/common/BackToLabsPill'
import ResearchQuestionIntro from '../components/common/ResearchQuestionIntro'
import MilestoneBrowser from '../components/common/MilestoneBrowser'
import ProjectPeople from '../components/common/ProjectPeople'

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
        operation: 'Humanoid teleoperation',
        title: 'Adding the Unitree G1 humanoid control track',
        summary: 'Alongside the Ridgeback navigation work, the humanoid side was tested through teleoperation with the Unitree G1. This focused on direct operator control before moving toward more autonomous behavior.',
        outcome: 'The teleoperation run documents that the G1 can be controlled in the project setup, giving the humanoid track a practical starting point for later manipulation and integration experiments.',
        media: { type: 'drive', id: '1PAxkPUROKN5dDTs7-5LCuMKNqdZAJL6t', title: 'Unitree G1 teleoperation' },
    },
    {
        operation: 'Environment generation',
        title: 'Randomized Isaac Sim room scenes',
        summary: 'The first room-generation work explores randomized placement of objects across surfaces such as tables, the robot, and wall-mounted elements. Multiple environments are generated in parallel for inspection.',
        outcome: 'This creates a practical foundation for testing scene diversity and evaluating randomized object placement.',
        media: { type: 'drive', id: '1ETMXBPVD0uwvC2E2-eEu4HAG7PnPVfXB', title: 'Initial Isaac Sim room generation' },
    },
    {
        operation: 'Ridgeback perception and navigation',
        title: 'Starting with SLAM, navigation, and a visible target',
        summary: 'The Ridgeback work began with SLAM and navigation around a clear perception cue: a detected red sphere. This gave the mobile-base track a concrete target for validating detection, localization, and movement in the same run.',
        outcome: 'The run shows the Ridgeback using the red-sphere detection as part of the navigation story, connecting perception evidence with the robot motion that follows from it.',
        media: { type: 'drive', id: '1aUkfy_dM499HRmpudlG6zFFvVCRq36yF', title: 'Red-sphere SLAM and navigation' },
    },
    {
        operation: 'Demonstration data',
        title: 'Demonstration data collection',
        summary: 'The operator repeatedly performs pick-and-place tasks with the G1 and Dex1 hands through teleoperation. Multi-view camera images, joint states, and actions are recorded at each timestep.',
        outcome: 'Each successful run becomes one training episode for pi0.5, making the size and variety of the dataset a key factor for later policy performance.',
        media: { type: 'drive', id: '1pU50eyYvszLwmZiXx5Czi8Og3qTQTxib', title: 'Demonstration data collection' },
    },
    {
        operation: 'Overlap detection',
        title: 'Improving placement with bounding boxes',
        summary: 'Bounding boxes make object placement and intersections easier to inspect. Each object type is shown in a distinct color so generated scenes can be checked quickly.',
        outcome: 'The visualization helped refine the placement logic and overlap-detection algorithm, resulting in more reliable object positioning across generated environments.',
        media: { type: 'drive', id: '1YZcWjOT0z6Nn4dO9z1bm5_r2c0teNYXe', title: 'Bounding-box room generation' },
    },
    {
        operation: 'Distance estimator benchmarking',
        title: 'Measuring distance with a consistent detection baseline',
        summary: 'The distance-estimator benchmark keeps the detection step fixed: the G1 bounding box is detected with the same method for every estimator, and only valid detections are evaluated. Each estimator then calculates distance on the camera view, with results compared against Gazebo ground truth.',
        outcome: 'The benchmark saves individual logs per estimator, an overall summary report, and the camera footage. This gives the project a repeatable way to compare distance estimates before those estimates are used inside larger robot behavior.',
        media: { type: 'drive', id: '1S7JTz9UyBMKuEjdReUGhigULS6RMaK_4', title: 'Distance Estimator Benchmarking' },
    },
    {
        operation: 'Real-robot policy',
        title: 'Red block pick and place',
        summary: 'A fine-tuned pi0.5 model runs on the real robot. From camera images, robot state, and a language instruction, the model outputs actions in real time so the G1 can grasp the red block and move it to the target position.',
        outcome: 'This single-object baseline confirms that teleoperation, data collection, fine-tuning, and deployment work together as one end-to-end pipeline.',
        media: { type: 'drive', id: '1Cgjxm1uxCZXPFIVNmrSz7h0cazscpVYg', title: 'Red block pick and place' },
    },
    {
        operation: 'Full environment exploration',
        title: 'Completing the Ridgeback exploration loop',
        summary: 'The later Ridgeback run shows the intended behavior more completely: the robot explores the full environment properly and demonstrates a stronger navigation and coverage result.',
        outcome: 'This is the clearest mobile-base result in the sequence. The Ridgeback completes the environment exploration more reliably, giving the navigation side a stronger foundation for later integration.',
        media: { type: 'drive', id: '1Q60muLRK3wOiiZelpSNghu_nWZ8qYblP', title: 'Full Ridgeback environment exploration' },
    },
    {
        operation: 'Pick-and-place integration',
        title: 'Randomized task environments for pick and place',
        summary: 'The randomized Isaac Sim environment is connected to the pick-and-place task and its restart mechanism. Extra cubes are placed on the table to create more varied and demanding training scenes.',
        outcome: 'The setup supports automated resets in diverse scenes and helps the model learn to handle cluttered object placements.',
        media: { type: 'drive', id: '1rO2wTx2Yegn4wCfOfl5HCxcH6nRtHB1V', title: 'Randomized pick-and-place environment' },
    },
    {
        operation: 'Multi-object manipulation',
        title: 'Three-color block pick and place',
        summary: 'The task is extended from one object to three colored blocks. The G1 receives natural-language instructions, identifies the correct block by color, and places each block at its target position in sequence.',
        outcome: 'This moves the manipulation pipeline closer to the capstone goal, where the robot must handle multiple objects and eventually place them onto the Ridgeback.',
        media: { type: 'drive', id: '11WKgAMWyji5y63Qe1UMqCkH_aY2U5vY5', title: 'Three-color block pick and place' },
    },
    {
        operation: 'Simulation teleoperation',
        title: 'G1 and Ridgeback teleoperation in simulation',
        summary: 'The G1 upper body with Dex1 dexterous hands and the Ridgeback are loaded into one NVIDIA Isaac Sim scene. The operator teleoperates the G1 to perform manipulation next to the Ridgeback.',
        outcome: 'This verifies that the teleoperation interface works in Isaac Sim and that both robots can share the same workspace for the final object-placement task.',
        media: { type: 'drive', id: '1GKC_pMXkN1mcfHdPOctymIzjfvxmjmN-', title: 'G1 and Ridgeback teleoperation in simulation' },
    },
]

const Dynamo = () => (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 font-sans text-slate-950">
        {/* Hero — cinematic dark render panel anchoring the light page */}
        <section className="px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
            <div className="relative mx-auto min-h-[24rem] max-w-7xl overflow-hidden rounded-3xl bg-slate-950 md:min-h-[27rem]">
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

                <div className="container relative z-10 mx-auto max-w-6xl px-5 pb-7 pt-20 sm:px-8 md:pb-9 md:pt-24">
                    <div className="max-w-2xl">
                        <BackToLabsPill variant="dark" className="mb-5" />
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

                        <h1 className="mt-5 text-3xl font-bold tracking-tight text-white md:text-4xl">DyNAMO</h1>
                        <p className="mt-4 text-sm leading-7 text-white/85 md:text-base">
                            DyNAMO advances cognitive robotics by bridging perception, reasoning, and action — an
                            integrated framework for dynamic navigation and manipulation, carried from simulation
                            through to real hardware.
                        </p>

                        <div className="mt-4 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                            <p className="text-sm leading-6 text-white/85">
                                A cognitive robotic system built to adapt to unstructured environments and learn
                                through interaction. It pairs foundation-model reasoning with classical navigation
                                and control to reach versatile, robust behavior in real-world settings.
                            </p>
                        </div>
                        <ProjectPeople
                            slugs={['szilagyi', 'pratham-rathod', 'shidan-chen']}
                            label="Team"
                            variant="dark"
                            className="mt-4"
                        />
                    </div>
                </div>
            </div>
        </section>

        {/* Objective + research question, then the milestone browser */}
        <section id="experiments" className="scroll-mt-6 py-10 md:py-14">
            <div className="container mx-auto max-w-6xl px-6 md:px-8">
                <ResearchQuestionIntro
                    heading="Integrate navigation, manipulation, and reasoning"
                    body="Dynamo demonstrates an integrated system where a humanoid robot identifies, grasps, and places objects while working with an autonomously navigating mobile base. The core challenge is Sim2Real transfer: behavior developed in simulation must survive the noise and constraints of physical operation."
                    question="Can navigation and manipulation developed in simulation transfer to real hardware as one integrated system — and how reliably does each subsystem hold up under physical conditions?"
                    tags={researchTags}
                />

                <p className="mb-4 mt-9 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">Experiment log</p>
                <MilestoneBrowser items={experimentResults} />
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

export default Dynamo
