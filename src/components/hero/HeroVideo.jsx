import { useState } from 'react'

const HeroVideo = ({ src, poster }) => {
  const [error, setError] = useState(false)

  const handleError = () => {
    setError(true)
    console.error('Hero video failed to load:', src)
  }

  if (error) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-600" />
    )
  }

  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={poster}
        onError={handleError}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50" />
    </>
  )
}

export default HeroVideo
