import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const drivePreview = (id) => `https://drive.google.com/file/d/${id}/preview?autoplay=1&mute=1`

const videos = [
    {
        id: '1I3MewBHfAIEDlvqzZKx_gaFmSe2IZ_qo',
        label: 'Run 01',
        title: 'Leader Following',
        note: 'The Ridgeback is placed in a simulated room with three humans wearing purple, red, and yellow shirts plus two green sphere obstacles. YOLOv8 detects humans and objects, HSV analysis classifies shirt colors, and RViz overlays each person in the 3D point cloud with matching colors and 3D bounding boxes. The yellow human is tele-operated as the leader, while a light yellow line shows the intended follow path.',
    },
    {
        id: '16poGKtDsxvexz3IPuVGQ8PdITIMffGqa',
        label: 'Run 02',
        title: 'Leader Following - 3D LiDAR',
        note: 'This version uses a 3D 360-degree LiDAR instead of 2D LiDARs. The Ridgeback understands the surrounding environment mainly from the LiDAR point cloud, while the camera is used only for human detection, shirt-color classification, and highlighting the detected humans in RViz.',
    },
]

const LeaderFollowing = () => {
    const [active, setActive] = useState(0)
    const video = videos[active]

    return (
        <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 text-slate-950">
            <div className="container mx-auto max-w-6xl px-6 pt-8 md:px-10">
                <Link
                    to="/core-labs"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary-700 transition hover:text-primary-900"
                >
                    <FaArrowLeft className="h-3 w-3" />
                    CORE Labs
                </Link>
            </div>

            <header className="container mx-auto max-w-6xl px-6 pt-10 pb-8 md:px-10">
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <div>
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-primary-700">
                            Cognitive Robotics · Ridgeback Simulation
                        </p>
                        <h1 className="text-4xl font-black leading-none tracking-tight md:text-6xl">
                            Leader Following
                        </h1>
                        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                            Ridgeback leader-following experiments combine YOLOv8 detection, shirt-color classification, RGB-D sensing, and 3D LiDAR point clouds to identify a selected human leader and visualize the intended follow path in RViz.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2 pb-1">
                        {['Ridgeback', 'YOLOv8', 'HSV color', '3D LiDAR'].map((tag) => (
                            <span key={tag} className="rounded-full border border-primary-100 bg-white px-3 py-1 text-xs font-semibold text-primary-700 shadow-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </header>

            <div className="container mx-auto max-w-6xl px-6 pb-20 md:px-10">
                <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/80">
                        <div className="relative aspect-video w-full bg-black">
                            <iframe
                                key={video.id}
                                src={drivePreview(video.id)}
                                title={video.title}
                                className="absolute inset-0 h-full w-full"
                                allow="autoplay; encrypted-media; picture-in-picture"
                                allowFullScreen
                            />
                        </div>

                        <div className="flex items-start justify-between gap-4 border-t border-slate-200 bg-white px-5 py-4">
                            <div className="min-w-0">
                                <div className="mb-2 flex items-center gap-2">
                                    <span className="rounded bg-primary-600 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-white">
                                        {video.label}
                                    </span>
                                    <h2 className="text-sm font-bold text-slate-950">{video.title}</h2>
                                </div>
                                <p className="text-xs leading-5 text-slate-600">{video.note}</p>
                            </div>
                            <div className="flex shrink-0 items-center gap-1.5">
                                <button
                                    type="button"
                                    onClick={() => setActive((i) => (i === 0 ? videos.length - 1 : i - 1))}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-primary-50 hover:text-primary-700"
                                    aria-label="Previous"
                                >
                                    <FaArrowLeft className="h-3 w-3" />
                                </button>
                                <span className="w-8 text-center text-xs font-bold text-slate-400">{active + 1}/{videos.length}</span>
                                <button
                                    type="button"
                                    onClick={() => setActive((i) => (i + 1) % videos.length)}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-primary-50 hover:text-primary-700"
                                    aria-label="Next"
                                >
                                    <FaArrowRight className="h-3 w-3" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <section className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                            <p className="mb-3 px-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Runs</p>
                            <div className="space-y-2">
                                {videos.map((v, i) => (
                                    <button
                                        key={v.id}
                                        type="button"
                                        onClick={() => setActive(i)}
                                        className={`group w-full overflow-hidden rounded-xl text-left transition ${
                                            i === active
                                                ? 'bg-primary-50 ring-2 ring-primary-500 ring-offset-1 ring-offset-white'
                                                : 'hover:bg-slate-50'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3 p-3">
                                            <div className="relative aspect-video w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-[10px] font-bold text-slate-400">{v.label}</span>
                                                </div>
                                                {i === active && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-primary-600/15">
                                                        <div className="ml-0.5 h-0 w-0 border-y-4 border-l-[7px] border-y-transparent border-l-primary-700" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <p className={`text-xs font-bold leading-5 ${i === active ? 'text-primary-700' : 'text-slate-800'}`}>
                                                    {v.title}
                                                </p>
                                                <p className="mt-0.5 line-clamp-3 text-[11px] leading-4 text-slate-500">{v.note}</p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">About</p>
                            <div className="space-y-3">
                                {[
                                    { label: 'Platform', value: 'Ridgeback' },
                                    { label: 'Detection', value: 'YOLOv8' },
                                    { label: 'Color', value: 'HSV shirt analysis' },
                                    { label: 'Sensing', value: 'RGB-D + 3D LiDAR' },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center justify-between gap-3">
                                        <span className="text-xs text-slate-500">{item.label}</span>
                                        <span className="text-right text-xs font-semibold text-slate-800">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeaderFollowing
