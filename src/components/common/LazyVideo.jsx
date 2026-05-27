import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

/**
 * Viewport-gated <video>. Nothing downloads until the element nears the
 * viewport (preload="none" + no src), so heavy clips that are off-screen cost
 * zero bytes on load. Background/autoplay clips also pause when scrolled out of
 * view to save CPU and bandwidth.
 *
 * Use `autoPlay` for muted background loops (previews/hero); use `controls` for
 * user-initiated playback (testimonials, modals). Pass a `poster` so the slot
 * paints instantly while the clip is still gated.
 */
const LazyVideo = ({
  src,
  poster,
  autoPlay = false,
  loop = false,
  muted = false,
  controls = false,
  className = '',
  ...rest
}) => {
  const { ref: inViewRef, inView } = useInView({ rootMargin: '300px 0px', threshold: 0.01 })
  const videoRef = useRef(null)

  // Begin (and keep) loading once the clip first nears the viewport. Latched in
  // render so it never reverts to unloaded once shown.
  const [shouldLoad, setShouldLoad] = useState(false)
  if (inView && !shouldLoad) setShouldLoad(true)

  // Background clips: play while in view, pause when out of view.
  useEffect(() => {
    const el = videoRef.current
    if (!el || !autoPlay || !shouldLoad) return
    if (inView) {
      const played = el.play()
      if (played && typeof played.catch === 'function') played.catch(() => {})
    } else {
      el.pause()
    }
  }, [inView, autoPlay, shouldLoad])

  const setRefs = (node) => {
    videoRef.current = node
    inViewRef(node)
  }

  return (
    <video
      ref={setRefs}
      src={shouldLoad ? src : undefined}
      poster={poster}
      preload="none"
      loop={loop}
      muted={muted}
      controls={controls}
      playsInline
      className={className}
      {...rest}
    />
  )
}

export default LazyVideo
