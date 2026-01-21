import { useState } from 'react'
import Card from '../common/Card'
import VideoPlayer from '../common/VideoPlayer'
import { FaPlay } from 'react-icons/fa'

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
      <Card className="h-full flex flex-col cursor-pointer" onClick={() => setIsVideoOpen(true)}>
        <div className="relative overflow-hidden bg-gray-900 aspect-video">
          {/* GIF Preview if available, otherwise video thumbnail */}
          {demo.gif ? (
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
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
              <FaPlay className="text-white text-5xl opacity-50" />
            </div>
          )}

          {/* Play Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-70 transition-opacity">
            <div className="bg-white rounded-full p-4">
              <FaPlay className="text-primary-600 text-3xl" />
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {demo.category}
            </span>
          </div>
        </div>

        <div className="p-6 flex-grow">
          <h3 className="text-2xl font-heading font-bold text-gray-900 mb-3">
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
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-12 right-0 text-white text-xl hover:text-gray-300"
            >
              Close ✕
            </button>
            <VideoPlayer
              src={getAssetUrl(demo.video)}
              controls={true}
              className="w-full rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default DemoCard
