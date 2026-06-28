import { MiniLabel } from '../components/common/Eyebrow'
import BackToLabsPill from '../components/common/BackToLabsPill'
import ResearchQuestionCard from '../components/common/ResearchQuestionCard'
import MilestoneBrowser from '../components/common/MilestoneBrowser'

// Chronological order (oldest first); the browser displays newest-first.
const milestones = [
    {
        operation: 'RGB-D + 2D LiDAR',
        title: 'Leader following',
        summary: 'The Ridgeback is placed in a simulated room with three humans wearing purple, red, and yellow shirts plus two green sphere obstacles. YOLOv8 detects humans and objects, HSV analysis classifies shirt colors, and RViz overlays each person in the 3D point cloud with matching colors and 3D bounding boxes. The yellow human is tele-operated as the leader, while a light yellow line shows the intended follow path.',
        media: { type: 'drive', id: '1I3MewBHfAIEDlvqzZKx_gaFmSe2IZ_qo', title: 'Leader Following' },
    },
    {
        operation: '3D LiDAR',
        title: 'Leader following — 3D LiDAR',
        summary: 'This version uses a 3D 360-degree LiDAR instead of 2D LiDARs. The Ridgeback understands the surrounding environment mainly from the LiDAR point cloud, while the camera is used only for human detection, shirt-color classification, and highlighting the detected humans in RViz.',
        media: { type: 'drive', id: '16poGKtDsxvexz3IPuVGQ8PdITIMffGqa', title: 'Leader Following - 3D LiDAR' },
    },
]

const aboutFacts = [
    { label: 'Platform', value: 'Ridgeback' },
    { label: 'Detection', value: 'YOLOv8' },
    { label: 'Color', value: 'HSV shirt analysis' },
    { label: 'Sensing', value: 'RGB-D + 3D LiDAR' },
]

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

const LeaderFollowing = () => (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 font-sans text-slate-950">
        <header className="container mx-auto max-w-6xl px-6 pt-36 md:px-10 md:pt-40">
            <BackToLabsPill variant="light" className="mb-8" />
            <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-end">
                <div>
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">
                        Cognitive robotics · Ridgeback simulation
                    </p>
                    <h1 className="text-4xl font-bold leading-none tracking-tight md:text-6xl">Leader Following</h1>
                    <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
                        Ridgeback leader-following experiments that pick a chosen person out of a crowded scene and
                        follow them through clutter — fusing camera-based detection with point-cloud perception to
                        track the leader and visualize the intended follow path in RViz.
                    </p>
                </div>
                <ResearchQuestionCard
                    question="Can a mobile base reliably single out and follow one designated person in a cluttered, multi-person scene using color-cued detection and 3D point clouds?"
                    tags={['Ridgeback', 'Person tracking', 'Sensor fusion', '3D perception']}
                />
            </div>
        </header>

        <main className="container mx-auto max-w-6xl px-6 pb-20 pt-12 md:px-10 md:pt-16">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">Experiment log</p>
            <MilestoneBrowser items={milestones} aside={<AboutCard />} />
        </main>
    </div>
)

export default LeaderFollowing
