/**
 * Video gate. Enforces wiki/video.md against what is actually on disk.
 *
 * Runs from two places: as the first step of `npm run build` (so it fires locally and in
 * CI without a separate workflow), and from .githooks/pre-commit.
 *
 * Filesystem checks always run. The media checks need `ffprobe`; if it is missing the
 * script says so and skips them rather than failing, so a machine without ffmpeg can
 * still build. The registry checks — including the description requirement — never skip.
 */

import { execFileSync } from 'node:child_process'
import { existsSync, openSync, readSync, closeSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { videos } from '../src/data/videos.js'

const VIDEO_ROOT = 'public/videos'
const SIZE_WARN_BYTES = 25 * 1024 * 1024
const MIN_DESCRIPTION = 40

const errors = []
const warnings = []
const fail = (id, msg) => errors.push(`${id}: ${msg}`)
const warn = (id, msg) => warnings.push(`${id}: ${msg}`)

const hasFfprobe = (() => {
    try {
        execFileSync('ffprobe', ['-version'], { stdio: 'ignore' })
        return true
    } catch {
        return false
    }
})()

const probe = (file, args) =>
    execFileSync('ffprobe', ['-v', 'error', ...args, '-of', 'default=nw=1:nk=1', file], {
        encoding: 'utf8',
    }).trim()

/** moov must precede mdat, otherwise playback waits on the whole file. */
const isFaststart = (file) => {
    const fd = openSync(file, 'r')
    const buf = Buffer.alloc(4 * 1024 * 1024)
    const read = readSync(fd, buf, 0, buf.length, 0)
    closeSync(fd)
    const head = buf.subarray(0, read)
    const moov = head.indexOf('moov')
    const mdat = head.indexOf('mdat')
    return moov !== -1 && (mdat === -1 || moov < mdat)
}

const walk = (dir) =>
    readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
        e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
    )

const onDisk = walk(VIDEO_ROOT)
    .filter((f) => f.toLowerCase().endsWith('.mp4'))
    .map((f) => f.replaceAll('\\', '/'))

// --- registry parity -------------------------------------------------------
const registered = new Map(videos.map((v) => ['public' + v.src, v]))

for (const file of onDisk) {
    if (!registered.has(file)) {
        fail(file.replace('public/videos/', ''), 'no entry in src/data/videos.js — see wiki/video-workflow.md')
    }
}

const seenIds = new Set()
for (const v of videos) {
    const file = 'public' + v.src

    if (seenIds.has(v.id)) fail(v.id, 'duplicate id in the registry')
    seenIds.add(v.id)

    if (!existsSync(file)) {
        fail(v.id, `registry points at ${v.src}, which does not exist`)
        continue
    }

    if (!v.description || v.description.trim().length < MIN_DESCRIPTION) {
        fail(v.id, 'missing or too-thin description — a video is not shippable without one')
    }
    if (!v.bucket) fail(v.id, 'no bucket set')
    if (!v.poster) {
        fail(v.id, 'no poster in the registry')
    } else if (!existsSync('public' + v.poster)) {
        fail(v.id, `poster ${v.poster} does not exist`)
    }
    if (v.frames && !existsSync(v.frames)) {
        warn(v.id, `frame strip ${v.frames} is missing`)
    }

    const size = statSync(file).size
    if (size > SIZE_WARN_BYTES) {
        warn(v.id, `${(size / 1048576).toFixed(1)} MB is over the ${SIZE_WARN_BYTES / 1048576} MB soft cap`)
    }

    if (!isFaststart(file)) {
        fail(v.id, 'no +faststart (moov after mdat) — playback stalls until the file is fetched')
    }

    if (!hasFfprobe) continue

    const [codec, pixFmt] = probe(file, [
        '-select_streams',
        'v:0',
        '-show_entries',
        'stream=codec_name,pix_fmt',
    ]).split('\n')

    if (codec !== 'h264') fail(v.id, `codec is ${codec}, must be h264 (wiki/video.md: single H.264 source)`)
    if (pixFmt !== 'yuv420p') fail(v.id, `pix_fmt is ${pixFmt}, must be yuv420p`)

    const audioCodec = probe(file, ['-select_streams', 'a', '-show_entries', 'stream=codec_name'])
    if (audioCodec) {
        const out = execFileSync(
            'ffmpeg',
            ['-nostdin', '-v', 'info', '-t', '20', '-i', file, '-vn', '-af', 'volumedetect', '-f', 'null', '-'],
            { encoding: 'utf8', stdio: ['ignore', 'ignore', 'pipe'] },
        )
        const mean = Number(/mean_volume: (-?[\d.]+)/.exec(out)?.[1] ?? 0)
        const max = Number(/max_volume: (-?[\d.]+)/.exec(out)?.[1] ?? 0)
        if (mean <= -80 && max <= -80) {
            fail(v.id, `audio track is digital silence (${mean} dB) — strip it with -an`)
        }
    }
}

// --- report ----------------------------------------------------------------
const label = `${videos.length} registered, ${onDisk.length} on disk`
if (!hasFfprobe) console.log('check-videos: ffprobe not found, skipping codec and audio checks')

for (const w of warnings) console.log(`  warn  ${w}`)

/**
 * Whoever sees this failure has demonstrably not read the docs, so pointing at them
 * again is not a fix — print the rules themselves. They are read from
 * PROJECT_CONTEXT.md rather than copied here, so the repo holds exactly one copy of
 * them and this message cannot drift from what the agent-context files say.
 */
const rulesPath = new URL('../PROJECT_CONTEXT.md', import.meta.url)
const PRIMER = existsSync(rulesPath)
    ? `\n${readFileSync(rulesPath, 'utf8')}`
    : `
A video ships only if src/data/videos.js has an entry for it carrying a written
description. PROJECT_CONTEXT.md is missing, so the full rules could not be printed.
Read wiki/video.md (policy) and wiki/video-workflow.md (step by step).
`

if (errors.length) {
    console.error(`\ncheck-videos: ${errors.length} problem(s) (${label})`)
    for (const e of errors) console.error(`  fail  ${e}`)
    console.error(PRIMER)
    process.exit(1)
}

console.log(`check-videos: ok — ${label}${warnings.length ? `, ${warnings.length} warning(s)` : ''}`)
