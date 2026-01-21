import { useState } from 'react'
import Card from '../common/Card'
import VideoPlayer from '../common/VideoPlayer'

const getAssetUrl = (path) => {
  if (!path) return path
  // Remove leading slash if present, then prepend BASE_URL
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${cleanPath}`
}

const DemoCard = ({ demo }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  return (
    <>
      <Card className="h-full flex flex-col cursor-pointer group" onClick={() => setIsVideoOpen(true)}>
        <div className="relative overflow-hidden bg-gray-900 aspect-video">
          {/* YouTube, GIF, or Video Preview */}
          {demo.youtubeId ? (
            <div className="w-full h-full pointer-events-none">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${demo.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${demo.youtubeId}&playsinline=1&modestbranding=1&rel=0`}
                title={demo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-cover"
                style={{ pointerEvents: 'none' }} // Disable interaction in preview
              ></iframe>
            </div>
          ) : demo.gif ? (
            <img
              src={getAssetUrl(demo.gif)}
              alt={demo.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          ) : demo.thumbnail ? (
            <img
              src={getAssetUrl(demo.thumbnail)}
              alt={demo.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          ) : demo.video ? (
            <video
              src={getAssetUrl(demo.video)}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
            </div>
          )}



          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              {demo.category}
            </span>
          </div>
        </div>

        <div className="p-6 flex-grow">
          <h3 className="text-2xl font-heading font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
            {demo.title}
          </h3>
          <p className="text-gray-600">
            {demo.description}
          </p>
        </div>
      </Card>

      {/* Video Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {(demo.youtubeId || demo.youtubeIdModal) ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${demo.youtubeId || demo.youtubeIdModal}?autoplay=1&rel=0`}
                title={demo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            ) : (
              <VideoPlayer
                src={getAssetUrl(demo.video)}
                controls={true}
                className="w-full h-full"
                autoPlay={true}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default DemoCard
