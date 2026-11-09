/**
 * Swap the file behind an existing registry entry, keeping its path and URL.
 *
 *   npm run replace-video -- <id> <path/to/new.mp4> [--poster-at <seconds>] [--crf <n>] [--max-width <px>]
 *
 * Example:
 *   npm run replace-video -- medicar ~/Downloads/Medicar-final.mp4
 *
 * Looks the entry up in src/data/videos.js, encodes the new file with the settings of
 * the entry's bucket (wiki/video.md), and overwrites the .mp4, its <name>-poster.webp
 * and the frame strip in place. Every link to the video keeps working, because
 * the file name does not change.
 *
 * --crf and --max-width override the bucket's defaults, for a long clip that would
 * otherwise get too large. Keep the whole site well under a few hundred MB:
 * GitHub Pages cancels any deploy that takes longer than 10 minutes, and that limit
 * cannot be raised (actions/deploy-pages caps its timeout at 600000 ms).
 *
 * What it cannot do for you: if the new clip shows something different, update the
 * `description` and `duration` of the entry in src/data/videos.js. The script prints
 * the new duration so you can copy it in.
 */

import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, renameSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import sharp from 'sharp'
import { videos, BUCKETS } from '../src/data/videos.js'

const args = process.argv.slice(2)
const takeFlag = (name) => {
    const i = args.indexOf(name)
    return i === -1 ? undefined : Number(args.splice(i, 2)[1])
}
const posterAt = takeFlag('--poster-at') ?? 3
const crfOverride = takeFlag('--crf')
const maxWidthOverride = takeFlag('--max-width')
const [id, input] = args

if (!id || !input) {
    console.error('Usage: npm run replace-video -- <id> <path/to/new.mp4> [--poster-at <seconds>] [--crf <n>] [--max-width <px>]')
    console.error('Known ids: ' + videos.map((v) => v.id).join(', '))
    process.exit(1)
}
const entry = videos.find((v) => v.id === id)
if (!entry) {
    console.error(`No video with id "${id}" in src/data/videos.js.`)
    process.exit(1)
}
if (!existsSync(input)) {
    console.error(`Input file not found: ${input}`)
    process.exit(1)
}

const run = (cmd, cmdArgs) => execFileSync(cmd, cmdArgs, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
try {
    run('ffmpeg', ['-version'])
} catch {
    console.error('ffmpeg is not installed. On macOS: brew install ffmpeg')
    process.exit(1)
}

// Bucket → encode settings. Mirrors the table in wiki/video.md.
const SETTINGS = {
    [BUCKETS.TALKING_HEAD]: { maxWidth: 1280, crf: 27, audio: true },
    [BUCKETS.UI_CAPTURE]: { maxWidth: null, crf: 21, audio: false },
    [BUCKETS.INSTRUMENTED]: { maxWidth: null, crf: 22, audio: false },
    [BUCKETS.CAMERA]: { maxWidth: 1920, crf: 23, audio: true },
    [BUCKETS.BACKGROUND_LOOP]: { maxWidth: null, crf: 22, audio: false },
}
if (!SETTINGS[entry.bucket]) {
    console.error(`Unknown bucket "${entry.bucket}" on ${id}.`)
    process.exit(1)
}
const s = {
    ...SETTINGS[entry.bucket],
    ...(crfOverride !== undefined && { crf: crfOverride }),
    ...(maxWidthOverride !== undefined && { maxWidth: maxWidthOverride }),
}

const hasAudio = run('ffprobe', ['-v', 'error', '-select_streams', 'a', '-show_entries', 'stream=codec_name', '-of', 'csv=p=0', input]).trim() !== ''
let keepAudio = s.audio && hasAudio
if (keepAudio) {
    // Drop digital silence even in buckets that keep audio.
    const log = execFileSync('ffmpeg', ['-nostdin', '-i', input, '-vn', '-af', 'volumedetect', '-f', 'null', '-'], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
    })
    const meanDb = Number((/mean_volume: (-?[\d.]+) dB/.exec(log) || [])[1])
    if (Number.isFinite(meanDb) && meanDb < -60) keepAudio = false
}

const out = 'public' + entry.src
const poster = 'public' + entry.poster
const work = mkdtempSync(join(tmpdir(), 'replace-video-'))
const tmpOut = join(work, 'out.mp4')

const vf = s.maxWidth ? ['-vf', `scale='min(${s.maxWidth},iw)':-2`] : []
const audio = keepAudio ? ['-c:a', 'aac', '-b:a', '96k'] : ['-an']

console.log(`Encoding ${input} → ${out}  (bucket ${entry.bucket}, CRF ${s.crf}, audio ${keepAudio ? 'kept' : 'stripped'})`)
console.log('This can take a few minutes for a long clip.')
execFileSync(
    'ffmpeg',
    ['-nostdin', '-y', '-v', 'error', '-stats', '-i', input, ...vf, '-c:v', 'libx264', '-crf', String(s.crf), '-preset', 'slow',
        '-pix_fmt', 'yuv420p', '-profile:v', 'high', ...audio, '-movflags', '+faststart', tmpOut],
    { stdio: 'inherit' },
)

// Re-encode only when it helps (wiki/video.md): if the source is already H.264 and
// the encode came out larger, remux the source instead.
const srcCodec = run('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=codec_name,pix_fmt', '-of', 'csv=p=0', input]).trim()
if (srcCodec === 'h264,yuv420p' && statSync(tmpOut).size >= statSync(input).size) {
    console.log('Re-encode was not smaller than the source; remuxing the source instead.')
    execFileSync('ffmpeg', ['-nostdin', '-y', '-v', 'error', '-i', input, '-c:v', 'copy', ...(keepAudio ? ['-c:a', 'copy'] : ['-an']),
        '-movflags', '+faststart', tmpOut])
}

renameSync(tmpOut, out)

const duration = Number(run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', out]))
// Grab the frame as PNG and let sharp write the WebP: many ffmpeg builds
// (Homebrew's included) ship without libwebp.
const posterPng = join(work, 'poster.png')
execFileSync('ffmpeg', ['-nostdin', '-y', '-v', 'error', '-ss', String(Math.min(posterAt, duration / 2)), '-i', out, '-frames:v', '1',
    '-vf', "scale='min(1280,iw)':-2", posterPng])
await sharp(posterPng).webp({ quality: 78 }).toFile(poster)

if (entry.frames) {
    const pngs = [15, 40, 65, 90].map((p, i) => {
        const png = join(work, `f${i}.png`)
        execFileSync('ffmpeg', ['-nostdin', '-y', '-v', 'error', '-ss', (duration * p / 100).toFixed(2), '-i', out, '-frames:v', '1', '-vf', 'scale=320:-2', png])
        return png
    })
    execFileSync('ffmpeg', ['-nostdin', '-y', '-v', 'error', ...pngs.flatMap((p) => ['-i', p]),
        '-filter_complex', 'hstack=inputs=4', '-q:v', '5', entry.frames])
}
rmSync(work, { recursive: true, force: true })

const mb = (f) => (statSync(f).size / 1048576).toFixed(1) + ' MB'
console.log(`\nDone. ${out} is ${mb(out)}, poster ${dirname(poster)}/… rewritten.`)
console.log(`Duration: ${Math.round(duration)} s (registry says ${entry.duration} s).`)
if (Math.round(duration) !== entry.duration) {
    console.log(`→ Update duration to ${Math.round(duration)} in src/data/videos.js.`)
}
console.log('→ If the clip shows something new, update its description in src/data/videos.js.')
console.log('→ Then run: npm run check-videos')
const outMb = statSync(out).size / 1048576
if (outMb > 95) {
    console.log('\nWARNING: over 95 MB. GitHub rejects files over 100 MB, so this push would fail.')
} else if (outMb > 40) {
    console.log(`\nWARNING: ${outMb.toFixed(0)} MB is large for this site. Big clips slow the GitHub Pages deploy,`)
    console.log('which is cancelled after 10 minutes. Try a higher --crf (+2 roughly cuts the size by a fifth) or --max-width 1280.')
}
