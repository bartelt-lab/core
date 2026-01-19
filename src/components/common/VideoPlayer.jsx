import { useState, useRef } from 'react'
import { FaPlay, FaPause } from 'react-icons/fa'

const VideoPlayer = ({
  src,
  poster,
  autoPlay = false,
  loop = false,
  muted = false,
  controls = true,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [error, setError] = useState(false)
  const videoRef = useRef(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleError = () => {
    setError(true)
    console.error('Video failed to load:', src)
  }

  if (error) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <p className="text-gray-500">Video unavailable</p>
      </div>
    )
  }

  return (
    <div className={`relative group ${className}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        controls={controls}
        onError={handleError}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="w-full h-full object-cover"
      />
      {!controls && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-60 transition-opacity duration-300"
        >
          {isPlaying ? (
            <FaPause className="text-white text-4xl" />
          ) : (
            <FaPlay className="text-white text-4xl" />
          )}
        </button>
      )}
    </div>
  )
}

export default VideoPlayer
