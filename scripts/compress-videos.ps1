<#
.SYNOPSIS
  Compress videos under public/ to web-friendly H.264 (MP4) with ffmpeg.

.DESCRIPTION
  Re-encodes with libx264, caps width, and sets +faststart so playback can
  begin before the full file downloads. Writes "<name>.opt.mp4" next to each
  source; pass -Replace to overwrite the original in place.

  Requires ffmpeg on PATH (winget install Gyan.FFmpeg), or pass -FFmpeg <path>.

.EXAMPLE
  # Test one file (leaves Student-Testim-2.opt.mp4 alongside for review)
  ./scripts/compress-videos.ps1 -Path public/videos/testimonials/Student-Testim-2.mp4

.EXAMPLE
  # Muted background clips: strip audio, replace originals
  ./scripts/compress-videos.ps1 -Path public/videos/demonstrations -StripAudio -Replace

.EXAMPLE
  # Testimonials: keep audio, replace originals
  ./scripts/compress-videos.ps1 -Path public/videos/testimonials -Replace
#>
param(
  [string]$Path = 'public/videos',
  [int]$Crf = 28,            # 26 = better/bigger, 30 = smaller
  [int]$MaxWidth = 1280,
  [switch]$StripAudio,       # for muted background/preview loops
  [switch]$Replace,          # overwrite originals instead of writing *.opt.mp4
  [string]$FFmpeg = 'ffmpeg'
)

$ErrorActionPreference = 'Stop'

$files = if (Test-Path $Path -PathType Leaf) {
  @(Get-Item $Path)
} else {
  Get-ChildItem $Path -Recurse -File -Include *.mp4, *.MP4, *.mov, *.webm
}

$totalBefore = 0L
$totalAfter = 0L

foreach ($f in $files) {
  if ($f.BaseName -like '*.opt') { continue } # skip our own outputs
  $tmp = Join-Path $f.DirectoryName ($f.BaseName + '.opt.mp4')

  $ffArgs = @(
    '-y', '-hide_banner', '-loglevel', 'error', '-i', $f.FullName,
    '-vf', "scale='min($MaxWidth,iw)':-2",
    '-c:v', 'libx264', '-crf', "$Crf", '-preset', 'slow',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart'
  )
  $ffArgs += if ($StripAudio) { '-an' } else { '-c:a', 'aac', '-b:a', '96k' }
  $ffArgs += $tmp

  & $FFmpeg @ffArgs

  if ($LASTEXITCODE -ne 0) { Write-Warning "failed: $($f.Name)"; continue }

  $before = $f.Length
  $after = (Get-Item $tmp).Length

  # Keep whichever is smaller — an already-compressed source can grow when
  # re-encoded at a higher-quality CRF.
  if ($after -ge $before) {
    Remove-Item $tmp
    $totalBefore += $before
    $totalAfter += $before
    '{0,-42} {1,7:N1} MB -> kept original (re-encode {2:N1} MB was larger)' -f $f.Name, ($before / 1MB), ($after / 1MB)
    continue
  }

  $totalBefore += $before
  $totalAfter += $after
  '{0,-42} {1,7:N1} MB -> {2,6:N1} MB' -f $f.Name, ($before / 1MB), ($after / 1MB)

  if ($Replace) { Move-Item -Force $tmp $f.FullName }
}

if ($totalBefore -gt 0) {
  ''
  'TOTAL {0:N1} MB -> {1:N1} MB  (saved {2:N1} MB)' -f `
    ($totalBefore / 1MB), ($totalAfter / 1MB), (($totalBefore - $totalAfter) / 1MB)
}
