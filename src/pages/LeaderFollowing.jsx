import { MiniLabel } from '../components/common/Eyebrow'
import BackToLabsPill from '../components/common/BackToLabsPill'
import ResearchQuestionCard from '../components/common/ResearchQuestionCard'
import MilestoneBrowser from '../components/common/MilestoneBrowser'
import ProjectPeople from '../components/common/ProjectPeople'
import assetUrl from '../utils/assetUrl'

// Chronological order (oldest first); the browser displays newest-first.
const milestones = [
    {
        operation: 'RGB-D + 2D LiDAR',
        title: 'Leader following',
        summary: 'The Ridgeback is placed in a simulated room with three humans wearing purple, red, and yellow shirts plus two green sphere obstacles. YOLOv8 detects humans and objects, HSV analysis classifies shirt colors, and RViz overlays each person in the 3D point cloud with matching colors and 3D bounding boxes. The yellow human is tele-operated as the leader, while a light yellow line shows the intended follow path.',
        facts: [
            { label: 'Platform', value: 'Ridgeback mobile robot' },
            { label: 'Detection', value: 'YOLOv8 humans + objects' },
            { label: 'Leader cue', value: 'Yellow shirt' },
            { label: 'Sensors', value: 'RGB-D camera + 2D LiDAR' },
            { label: 'View', value: 'RViz point cloud overlay' },
        ],
        media: {
            type: 'drive',
            id: '1wOFcRXhMusGE7kQjDZSdeHYO2RgWGDVe',
            title: 'Leader Following',
        },
    },
    {
        operation: '3D LiDAR',
        title: 'Leader following - 3D LiDAR',
        summary: 'This version uses a 3D 360-degree LiDAR instead of 2D LiDARs. The Ridgeback understands the surrounding environment mainly from the LiDAR point cloud, while the camera is used only for human detection, shirt-color classification, and highlighting the detected humans in RViz.',
        facts: [
            { label: 'Platform', value: 'Ridgeback mobile robot' },
            { label: 'Main sensor', value: '360-degree 3D LiDAR' },
            { label: 'Camera role', value: 'Human detection' },
            { label: 'Tracking cue', value: 'Shirt color' },
            { label: 'Output', value: 'Highlighted people in RViz' },
        ],
        media: {
            type: 'drive',
            id: '1Eml1fIPbXwCpqPxOgQ1XZ0ai-l422WQw',
            title: 'Leader Following - 3D LiDAR',
        },
    },
    {
        operation: 'Uni-NaVid',
        title: 'Unified navigation from visual instructions',
        summary: 'Uni-NaVid demonstrates navigation driven by visual context and high-level instructions. The demo shows how the robot can interpret the simulated environment, reason about the intended route, and move toward the relevant target area while preserving the leader-following project focus on perception-guided mobility.',
        facts: [
            { label: 'Demo', value: 'Uni-NaVid' },
            { label: 'Goal', value: 'Navigate from instructions' },
            { label: 'Input', value: 'Visual scene context' },
            { label: 'Task', value: 'Choose where to move' },
            { label: 'Focus', value: 'Perception-guided mobility' },
        ],
        media: {
            type: 'drive',
            id: '1KhtRRPXgEgeqK3cKySoHijQjgXfDbbUk',
            title: 'Uni-NaVid Demo',
        },
    },
    {
        operation: 'OmTrackVLA',
        title: 'Open-vocabulary tracking with VLA grounding',
        summary: 'OmTrackVLA extends the leader-following setup toward language-grounded tracking: the system connects visual observations with a target description, keeps the selected person or object in focus, and maintains the tracking context as the robot moves through the simulated scene.',
        facts: [
            { label: 'Demo', value: 'OmTrackVLA' },
            { label: 'Goal', value: 'Track a selected target' },
            { label: 'Input', value: 'Vision + language' },
            { label: 'Target type', value: 'Person or object' },
            { label: 'Focus', value: 'Keep target in view' },
        ],
        media: {
            type: 'drive',
            id: '1k6ZTqbS0-DoNKaWG8dzAAPpdpdoU-1rq',
            title: 'OmTrackVLA Demo',
        },
    },
]

const AboutCard = ({ facts }) => (
    <section className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur-sm">
        <div className="mb-3">
            <MiniLabel>About</MiniLabel>
        </div>
        <div className="space-y-3">
            {facts.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3">
                    <span className="text-xs text-slate-500">{item.label}</span>
                    <span className="text-right text-xs font-bold text-slate-800">{item.value}</span>
                </div>
            ))}
        </div>
    </section>
)

const LeaderFollowing = () => (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 font-sans text-slate-950">
        <header className="relative overflow-hidden px-6 pb-3 pt-18 md:pb-4 md:pt-20">
            <div className="absolute inset-x-0 top-0 h-[25rem] opacity-28" aria-hidden="true">
                <img
                    src={assetUrl('/images/projects/leader-following/gazebo-ridgeback-yellow-human.webp')}
                    alt=""
                    fetchPriority="high"
                    decoding="async"
                    className="h-full w-full object-cover"
                    style={{ objectPosition: 'center 68%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-sky-50/35 via-sky-50/80 to-white" />
            </div>

            <div className="container relative z-10 mx-auto grid max-w-6xl gap-6 md:grid-cols-[0.95fr_1.05fr] md:items-end">
                <div>
                    <BackToLabsPill className="mb-5" />
                    <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">
                        Cognitive robotics - Ridgeback simulation
                    </p>
                    <h1 className="text-4xl font-bold leading-none tracking-tight text-slate-950 md:text-5xl">Leader Following</h1>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700">
                        Ridgeback leader-following experiments that pick a chosen person out of a crowded scene and
                        follow them through clutter - fusing camera-based detection with point-cloud perception to
                        track the leader and visualize the intended follow path in RViz.
                    </p>
                    <ProjectPeople
                        slugs={['szilagyi', 'pratham-rathod']}
                        label="Team"
                        className="mt-4"
                    />
                </div>
                <ResearchQuestionCard
                    question="Can a mobile base reliably single out and follow one designated person in a cluttered, multi-person scene using color-cued detection and 3D point clouds?"
                    tags={['Ridgeback', 'Person tracking', 'Sensor fusion', '3D perception']}
                />
            </div>
        </header>

        <main className="container mx-auto max-w-6xl px-6 pb-20 pt-2 md:px-8 md:pt-3">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">Experiment log</p>
            <MilestoneBrowser items={milestones} aside={({ run }) => <AboutCard facts={run.facts} />} />
        </main>
    </div>
)

export default LeaderFollowing
