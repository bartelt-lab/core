import { useEffect, useRef, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import assetUrl from '../../utils/assetUrl'
import { MiniLabel } from './Eyebrow'

const drivePreview = (id, playKey = 0) =>
    `https://drive.google.com/file/d/${id}/preview?autoplay=1&mute=1&playsinline=1&loop=1&play=${playKey}`
const pad = (n) => String(n).padStart(2, '0')
const keyOf = (item) => item.media.id || item.media.src

// One frame of a milestone's media, absolutely filling the player. `active` controls
// visibility (we keep all visited media mounted so swapping never reloads). Supports a
// Google Drive embed, a native local video, or a still image placeholder.
const Media = ({ media, title, active, playKey = 0 }) => {
    const videoRef = useRef(null)
    const cls = `absolute inset-0 h-full w-full transition-opacity duration-500 ${
        active ? 'z-10 opacity-100' : 'pointer-events-none z-0 opacity-0'
    }`

    useEffect(() => {
        if (media.type !== 'video' || !videoRef.current) return

        if (active) {
            videoRef.current.currentTime = 0
            videoRef.current.play().catch(() => {})
        } else {
            videoRef.current.pause()
        }
    }, [active, media.type, playKey])

    if (media.type === 'image') {
        return (
            <div className={cls}>
                <img
                    src={assetUrl(media.src)}
                    alt={media.alt || title}
                    decoding="async"
                    className="h-full w-full object-cover"
                />
                <span className="absolute right-3 top-3 rounded-full bg-slate-950/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/90 backdrop-blur">
                    Placeholder
                </span>
            </div>
        )
    }

    if (media.type === 'video') {
        return (
            <video
                ref={videoRef}
                src={assetUrl(media.src)}
                poster={media.poster ? assetUrl(media.poster) : undefined}
                title={media.title || title}
                className={`${cls} object-cover`}
                autoPlay
                muted
                loop
                playsInline
                controls={media.controls !== false}
                preload="metadata"
            />
        )
    }

    return (
        <iframe
            src={drivePreview(media.id, active ? playKey : 0)}
            title={media.title || title}
            className={cls}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
        />
    )
}

// Leader-follower-style video browser: a player driven by a newest-first selector.
//
// Each milestone's media mounts the moment it first becomes active (so it loads while
// visible and autoplays), then stays mounted — swapping back is instant with no reload.
// Auto-advances newest → oldest until the user picks one. Numbering stays chronological
// (01 = first ever).
//
// items: [{ media, operation?, title, summary, outcome? }]
//   media: { type: 'drive', id } | { type: 'video', src } | { type: 'image', src, alt }
// aside: optional ReactNode or ({ run, activeRun }) => ReactNode below the list.
const MilestoneBrowser = ({ items, label = 'Milestones', pillLabel = 'Milestone', autoCycleMs = 8000, aside = null }) => {
    const total = items.length
    const displayOrder = Array.from({ length: total }, (_, k) => total - 1 - k)

    const [activeRun, setActiveRun] = useState(total - 1)
    const [paused, setPaused] = useState(false)
    const [mounted, setMounted] = useState(() => new Set([total - 1]))
    const [playKey, setPlayKey] = useState(1)
    const activeRunRef = useRef(total - 1)

    const run = items[activeRun]

    useEffect(() => {
        activeRunRef.current = activeRun
    }, [activeRun])

    const show = (i) => {
        activeRunRef.current = i
        setActiveRun(i)
        setPlayKey((prev) => prev + 1)
        setMounted((prev) => (prev.has(i) ? prev : new Set(prev).add(i)))
    }

    useEffect(() => {
        if (paused) return undefined
        const timer = window.setInterval(() => {
            const next = (activeRunRef.current - 1 + total) % total
            activeRunRef.current = next
            setActiveRun(next)
            setPlayKey((prev) => prev + 1)
            setMounted((prev) => (prev.has(next) ? prev : new Set(prev).add(next)))
        }, autoCycleMs)
        return () => window.clearInterval(timer)
    }, [paused, total, autoCycleMs])

    const selectRun = (i) => {
        setPaused(true)
        show(i)
    }

    const step = (delta) => {
        setPaused(true)
        show((activeRunRef.current + delta + total) % total)
    }

    const sidebar = (
        <section className="flex flex-col rounded-2xl border border-slate-200 bg-white/80 p-2.5 shadow-sm backdrop-blur-sm lg:sticky lg:top-28 lg:max-h-[calc(100vh-9rem)]">
            <div className="mb-2.5 flex items-center justify-between gap-3 px-1">
                <MiniLabel>{label}</MiniLabel>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                    {total} videos
                </span>
            </div>
            <div className="-mr-1 max-h-[23rem] space-y-1.5 overflow-y-auto pr-1 [scrollbar-color:#cbd5e1_transparent] [scrollbar-width:thin] lg:max-h-[calc(100vh-13rem)]">
                {displayOrder.map((idx) => {
                    const item = items[idx]
                    const isActive = idx === activeRun
                    return (
                        <button
                            key={keyOf(item)}
                            type="button"
                            onClick={() => selectRun(idx)}
                            className={`group w-full overflow-hidden rounded-xl text-left transition ${
                                isActive
                                    ? 'bg-primary-50 ring-2 ring-primary-500 ring-offset-1 ring-offset-white'
                                    : 'hover:bg-slate-50'
                            }`}
                        >
                            <div className="flex items-center gap-2.5 p-2.5">
                                <div className="relative flex aspect-video w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
                                    <span className="font-mono text-xs font-bold text-slate-400">{pad(idx + 1)}</span>
                                    {isActive && <span className="absolute inset-0 bg-primary-600/10" />}
                                </div>
                                <div className="min-w-0">
                                    {item.operation && (
                                        <p className={`truncate text-[10px] font-bold uppercase tracking-[0.16em] ${isActive ? 'text-primary-700' : 'text-slate-400'}`}>
                                            {item.operation}
                                        </p>
                                    )}
                                    <p className={`mt-0.5 line-clamp-2 text-[13px] font-semibold leading-5 ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                                        {item.title}
                                    </p>
                                </div>
                            </div>
                        </button>
                    )
                })}
            </div>
        </section>
    )

    return (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
            {/* Player */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60 lg:self-start">
                <div className="relative aspect-video w-full bg-black">
                    {/* Each milestone mounts when first active (loads visible → autoplays) then stays mounted */}
                    {items.map((item, i) =>
                        i === activeRun || mounted.has(i) ? (
                            <Media
                                key={keyOf(item)}
                                media={item.media}
                                title={item.title}
                                active={i === activeRun}
                                playKey={i === activeRun ? playKey : 0}
                            />
                        ) : null,
                    )}
                </div>

                <div className="flex items-start justify-between gap-3 border-t border-slate-200 bg-white px-4 py-3.5">
                    <div className="min-w-0">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                            <span className="rounded bg-primary-600 px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-white">
                                {pillLabel} {pad(activeRun + 1)}
                            </span>
                            {run.operation && (
                                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                                    {run.operation}
                                </span>
                            )}
                        </div>
                        <h3 className="text-base font-bold text-slate-950">{run.title}</h3>
                        <p className="mt-1.5 text-sm leading-6 text-slate-600">{run.summary}</p>
                        {run.outcome && (
                            <p className="mt-2.5 border-l-2 border-primary-400 pl-3 text-sm leading-6 text-slate-500">
                                <span className="font-bold uppercase tracking-[0.18em] text-primary-700">Outcome</span>
                                <span className="mx-1">·</span>
                                {run.outcome}
                            </p>
                        )}
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                        <button
                            type="button"
                            onClick={() => step(1)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-primary-50 hover:text-primary-700"
                            aria-label={`Newer ${pillLabel.toLowerCase()}`}
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
                            aria-label={`Older ${pillLabel.toLowerCase()}`}
                        >
                            <FaArrowRight className="h-3 w-3" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Sidebar: newest-first selector (+ optional aside card) */}
            {aside ? (
                <div className="flex flex-col gap-6">
                    {sidebar}
                    {typeof aside === 'function' ? aside({ run, activeRun }) : aside}
                </div>
            ) : (
                sidebar
            )}
        </div>
    )
}

export default MilestoneBrowser
