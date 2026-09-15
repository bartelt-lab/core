import { useEffect, useRef, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import assetUrl from '../../utils/assetUrl'
import { MiniLabel } from './Eyebrow'

const drivePreview = (id, playKey = 0) =>
    `https://drive.google.com/file/d/${id}/preview?autoplay=1&mute=1&playsinline=1&loop=1&play=${playKey}`
const pad = (n) => String(n).padStart(2, '0')
const keyOf = (item) => item.media.id || item.media.src

// Thumbnail for a selector row: an image is its own thumbnail, a video uses its poster.
// A Drive embed has neither, so those rows fall back to the number tile.
const thumbOf = (media) => {
    if (media.type === 'image') return media.src
    if (media.type === 'video') return media.poster || null
    return null
}

// One frame of a milestone's media, absolutely filling the player. `active` controls
// visibility (we keep all visited media mounted so swapping never reloads). Supports a
// Google Drive embed, a native local video, or a still image placeholder.
//
// Video controls default to ON and should stay on: these are minutes-long research
// clips, so without them a viewer cannot scrub, pause or go fullscreen. Do not pass
// `controls: false` — LeaderFollowing did and the clips were unskimmable.
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
                    className={`h-full w-full ${media.fit === 'contain' ? 'object-contain' : 'object-cover'}`}
                />
                {media.placeholder && (
                    <span className="absolute right-3 top-3 rounded-full bg-slate-950/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/90 backdrop-blur">
                        Placeholder
                    </span>
                )}
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
//   media: { type: 'video', src, poster } | { type: 'image', src, alt, placeholder, fit }
//         | { type: 'drive', id }  — legacy; all milestone media is local now
//
// `fit: 'contain'` letterboxes an image instead of cropping it. Needed for figures whose
// aspect is far from the player's 16:9 — a 5:1 filmstrip cropped to cover loses its outer
// frames entirely.
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
        <section className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur-sm lg:flex-1">
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-3.5 py-3">
                <MiniLabel>{label}</MiniLabel>
                <span className="font-mono text-[11px] font-bold tabular-nums text-slate-400">
                    {pad(activeRun + 1)}
                    <span className="text-slate-300">/{pad(total)}</span>
                </span>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-1.5 [scrollbar-color:#cbd5e1_transparent] [scrollbar-width:thin] max-lg:max-h-[26rem]">
                {displayOrder.map((idx, position) => {
                    const item = items[idx]
                    const isActive = idx === activeRun
                    const thumb = thumbOf(item.media)
                    // Operation labels repeat across consecutive milestones (several
                    // "Exploration" entries in a row). Only the first of a run prints a
                    // heading, which turns the flat list into visible phases.
                    const prev = displayOrder[position - 1]
                    const startsPhase = item.operation && (prev === undefined || items[prev].operation !== item.operation)

                    return (
                        <div key={keyOf(item)}>
                            {startsPhase && (
                                <p className="px-2 pb-1.5 pt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 first:pt-1">
                                    {item.operation}
                                </p>
                            )}
                            <button
                                type="button"
                                onClick={() => selectRun(idx)}
                                aria-current={isActive}
                                className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-xl p-2 text-left transition duration-200 ${
                                    isActive
                                        ? 'bg-gradient-to-r from-primary-50 to-white shadow-sm ring-1 ring-primary-300'
                                        : 'hover:bg-slate-50'
                                }`}
                            >
                                {/* accent rail on the active row */}
                                <span
                                    className={`absolute inset-y-1.5 left-0 w-[3px] rounded-full bg-primary-500 transition-opacity duration-200 ${
                                        isActive ? 'opacity-100' : 'opacity-0'
                                    }`}
                                />

                                <div
                                    className={`relative aspect-video w-[72px] shrink-0 overflow-hidden rounded-lg bg-slate-900 ring-1 transition duration-200 ${
                                        isActive ? 'ring-primary-300' : 'ring-slate-200 group-hover:ring-slate-300'
                                    }`}
                                >
                                    {thumb ? (
                                        <img
                                            src={assetUrl(thumb)}
                                            alt=""
                                            loading="lazy"
                                            decoding="async"
                                            className={`h-full w-full object-cover transition duration-300 ${
                                                isActive
                                                    ? 'scale-105 opacity-100'
                                                    : 'opacity-60 saturate-50 group-hover:scale-105 group-hover:opacity-90 group-hover:saturate-100'
                                            }`}
                                        />
                                    ) : (
                                        <span className="flex h-full w-full items-center justify-center bg-slate-100 font-mono text-xs font-bold text-slate-400">
                                            {pad(idx + 1)}
                                        </span>
                                    )}
                                    <span className="absolute bottom-0.5 left-0.5 rounded bg-slate-950/75 px-1 font-mono text-[9px] font-bold text-white/90 backdrop-blur-sm">
                                        {pad(idx + 1)}
                                    </span>
                                </div>

                                <p
                                    className={`min-w-0 flex-1 line-clamp-2 text-[13px] font-semibold leading-5 transition-colors ${
                                        isActive ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'
                                    }`}
                                >
                                    {item.title}
                                </p>

                                {/* auto-advance timer; restarts with playKey, hidden once the user takes over */}
                                {isActive && !paused && (
                                    <span
                                        key={playKey}
                                        className="absolute inset-x-2 bottom-0.5 h-[2px] origin-left animate-[sweep_linear_forwards] rounded-full bg-primary-400/70"
                                        style={{ animationDuration: `${autoCycleMs}ms` }}
                                    />
                                )}
                            </button>
                        </div>
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

            {/* Sidebar: newest-first selector (+ optional aside card).
                From lg up the column is pinned to the player's height: the cell is
                `relative` and its contents `absolute inset-0`, so the list — however many
                milestones it holds — contributes nothing to row height and scrolls inside
                instead. Below lg it is ordinary flow under the player. */}
            <div className="lg:relative">
                <div className="flex flex-col gap-6 lg:absolute lg:inset-0 lg:overflow-y-auto">
                    {sidebar}
                    {aside && (typeof aside === 'function' ? aside({ run, activeRun }) : aside)}
                </div>
            </div>
        </div>
    )
}

export default MilestoneBrowser
