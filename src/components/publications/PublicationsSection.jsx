import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa'
import Section from '../common/Section'
import PublicationItem from './PublicationItem'
import assetUrl from '../../utils/assetUrl'

const PublicationCard = ({ publication }) => {
  const image = publication.image || '/logos/core-no-text.png'
  const hasUrl = publication.url && publication.url !== '#'

  return (
    <article className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:border-blue-200 hover:shadow-xl transition-all">
      <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
        <img
          src={assetUrl(image)}
          alt=""
          className={`h-full w-full transition-transform duration-500 group-hover:scale-105 ${publication.image ? 'object-cover' : 'object-contain p-12 opacity-70'}`}
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-700 mb-3">
          <span>{publication.type}</span>
          <span className="h-1 w-1 rounded-full bg-gray-300" />
          <span>{publication.year}</span>
        </div>
        <h3 className="text-lg font-bold leading-7 text-gray-950 mb-3 line-clamp-3">
          {publication.title}
        </h3>
        <p className="text-sm text-gray-600 leading-6 line-clamp-2 mb-5">
          {publication.authors.map((a) => a.name).join(', ')}
        </p>
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-semibold text-gray-700">{publication.venue}</span>
          {hasUrl && (
            <a
              href={publication.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900"
            >
              Paper
              <FaExternalLinkAlt className="h-3 w-3" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

const PublicationsSection = ({
  limit,
  viewAllLink,
  layout = 'list',
  title = 'Publications',
  subtitle = 'Research Output',
  intro,
}) => {
  const [publications, setPublications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(assetUrl('/data/publications.json'))
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data.publications].sort((a, b) => (b.date || '').localeCompare(a.date || ''))
        setPublications(sorted)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load publications', err)
        setLoading(false)
      })
  }, [])

  const displayPublications = limit ? publications.slice(0, limit) : publications

  return (
    <Section
      id="publications"
      title={title}
      subtitle={subtitle}
      className="bg-gray-50"
    >
      {intro && (
        <p className="max-w-3xl mx-auto text-center text-gray-600 leading-7 mb-10">
          {intro}
        </p>
      )}

      {loading ? (
        <div className="text-center text-gray-500">Loading publications...</div>
      ) : layout === 'cards' ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {displayPublications.map((publication) => (
              <PublicationCard key={publication.id} publication={publication} />
            ))}
          </div>
          {viewAllLink && (
            <div className="mt-10 text-center">
              <Link
                to={viewAllLink}
                className="inline-flex items-center gap-3 rounded-full bg-gray-950 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700 transition-colors"
              >
                View full publication archive
                <FaArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      ) : limit ? (
        <div className="space-y-6 max-w-4xl mx-auto relative">
          {displayPublications.map((publication, index) => {
            const isLast = index === displayPublications.length - 1

            if (isLast && viewAllLink) {
              return (
                <div key={publication.id} className="relative group overflow-hidden rounded-lg">
                  <div className="filter blur-sm opacity-60 pointer-events-none select-none grayscale transition-all duration-500 group-hover:blur-md group-hover:scale-[1.02]">
                    <PublicationItem publication={publication} />
                  </div>

                  <Link
                    to={viewAllLink}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 hover:bg-white/20 transition-colors z-10 cursor-pointer"
                  >
                    <div className="bg-white/90 backdrop-blur-md px-8 py-4 rounded-full shadow-2xl border border-gray-200 transform transition-transform duration-300 group-hover:scale-110 flex items-center gap-3">
                      <span className="font-bold text-gray-900">View full publication archive</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {displayPublications.map((publication) => (
            <PublicationCard key={publication.id} publication={publication} />
          ))}
        </div>
      )}

      {!loading && !limit && (
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
