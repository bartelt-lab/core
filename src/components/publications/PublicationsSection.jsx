import { Link } from 'react-router-dom'
import Section from '../common/Section'
import PublicationItem from './PublicationItem'
import { publications } from '../../data/publications'

const PublicationsSection = ({ limit, viewAllLink }) => {
  const sortedPublications = [...publications].sort((a, b) => b.year - a.year)
  const displayPublications = limit ? sortedPublications.slice(0, limit) : sortedPublications

  return (
    <Section
      id="publications"
      title="Publications"
      subtitle="Research Output"
      className="bg-gray-50"
    >
      {limit ? (
        // Preview Mode (Vertical List with Blurred 3rd Item)
        <div className="space-y-6 max-w-4xl mx-auto relative">
          {displayPublications.map((publication, index) => {
            const isLast = index === displayPublications.length - 1

            if (isLast && viewAllLink) {
              return (
                <div key={publication.id} className="relative group overflow-hidden rounded-lg">
                  {/* Blurred Background Item */}
                  <div className="filter blur-sm opacity-60 pointer-events-none select-none grayscale transition-all duration-500 group-hover:blur-md group-hover:scale-[1.02]">
                    <PublicationItem publication={publication} />
                  </div>

                  {/* Overlay Link */}
                  <Link
                    to={viewAllLink}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 hover:bg-white/20 transition-colors z-10 cursor-pointer"
                  >
                    <div className="bg-white/90 backdrop-blur-md px-8 py-4 rounded-full shadow-2xl border border-gray-200 transform transition-transform duration-300 group-hover:scale-110 flex items-center gap-3">
                      <span className="font-bold text-gray-900">View All at CORE Network</span>
                      <span className="w-6 h-6 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm">→</span>
                    </div>
                  </Link>
                </div>
              )
            }

            return <PublicationItem key={publication.id} publication={publication} />
          })}
        </div>
      ) : (
        // Full Mode (Vertical List)
        <div className="space-y-6 max-w-4xl mx-auto">
          {displayPublications.map((publication) => (
            <PublicationItem key={publication.id} publication={publication} />
          ))}
        </div>
      )}

      {/* Footer Text (only show in full mode or if not limiting? User asked for user input to navigate. The link card handles it for preview.) */}
      {!limit && (
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-base">
            Additional publications forthcoming as our research progresses.
            Our team publishes regularly in top-tier venues for robotics and artificial intelligence.
          </p>
        </div>
      )}
    </Section>
  )
}

export default PublicationsSection
