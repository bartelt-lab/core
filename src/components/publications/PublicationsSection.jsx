import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaExternalLinkAlt, FaFilter, FaSearch } from 'react-icons/fa'
import Section from '../common/Section'
import PublicationItem from './PublicationItem'
import assetUrl from '../../utils/assetUrl'

const PublicationCard = ({ publication, featured = false, compact = false }) => {
  const image = publication.image || '/logos/core/core-no-text.png'
  const hasUrl = publication.url && publication.url !== '#'

  return (
    <article className={`group overflow-hidden ${compact ? 'rounded-3xl border border-gray-200 bg-white shadow-xl shadow-slate-200/70' : 'rounded-lg border border-gray-200 bg-white shadow-sm'} transition-all hover:border-primary-200 hover:shadow-xl ${featured && !compact ? 'grid md:grid-cols-[44%_1fr]' : ''}`}>
      <div className={`${featured ? (compact ? 'hidden' : 'min-h-[260px]') : 'aspect-[4/3]'} bg-gray-100 overflow-hidden`}>
        <img
          src={assetUrl(image)}
          alt=""
          className={`h-full w-full transition-transform duration-500 group-hover:scale-105 ${publication.image ? 'object-cover' : 'object-contain p-12 opacity-70'}`}
          loading="lazy"
        />
      </div>
      <div className={featured ? (compact ? 'p-5 md:p-6' : 'p-8 md:p-10') : 'p-6'}>
        {compact && <div className="mb-5 h-1 w-16 rounded-full bg-primary-600" />}
        <div className={`${compact ? 'mb-4 text-[11px]' : 'mb-3 text-xs'} flex flex-wrap items-center gap-2 font-bold uppercase tracking-widest text-primary-700`}>
          <span>{publication.type}</span>
          <span className="h-1 w-1 rounded-full bg-gray-300" />
          <span>{publication.year}</span>
          {publication.status && (
            <>
              <span className="h-1 w-1 rounded-full bg-gray-300" />
              <span>{publication.status}</span>
            </>
          )}
        </div>
        <h3 className={`${featured ? (compact ? 'text-xl leading-7 line-clamp-3 md:text-2xl md:leading-8' : 'text-2xl leading-8') : 'text-lg leading-7 line-clamp-3'} mb-3 font-bold text-gray-950`}>
          {publication.title}
        </h3>
        <p className={`${featured ? (compact ? 'text-sm leading-6 line-clamp-2' : 'text-base leading-7') : 'text-sm leading-6 line-clamp-2'} mb-5 text-gray-600`}>
          {publication.authors.map((a) => a.name).join(', ')}
        </p>
        <div className={`${compact ? 'border-t border-gray-100 pt-4' : ''} flex flex-wrap items-center justify-between gap-4`}>
          <span className="text-sm font-semibold text-gray-700">{publication.venue}</span>
          {hasUrl && (
            <a
              href={publication.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary-100 px-4 py-2 text-sm font-bold text-primary-700 hover:border-primary-700 hover:text-primary-900"
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

const getUnique = (items) => [...new Set(items.filter(Boolean))].sort()

const PublicationsSection = ({
  limit,
  viewAllLink,
  layout = 'list',
  title = 'Publications',
  subtitle = 'Research Output',
  intro,
  showFilters = false,
  compact = false,
}) => {
  const [publications, setPublications] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [filters, setFilters] = useState({
    query: '',
    type: 'all',
    status: 'all',
    year: 'all',
    researcher: 'all',
  })

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

  const options = useMemo(() => ({
    types: getUnique(publications.map((publication) => publication.type)),
    statuses: getUnique(publications.map((publication) => publication.status)),
    years: getUnique(publications.map((publication) => String(publication.year || ''))).reverse(),
    researchers: getUnique(publications.flatMap((publication) => publication.authors.map((author) => author.name))),
  }), [publications])

  const filteredPublications = useMemo(() => {
    const query = filters.query.trim().toLowerCase()

    return publications.filter((publication) => {
      const authorNames = publication.authors.map((author) => author.name).join(' ')
      const searchable = `${publication.title} ${publication.venue} ${authorNames}`.toLowerCase()

      return (
        (!query || searchable.includes(query)) &&
        (filters.type === 'all' || publication.type === filters.type) &&
        (filters.status === 'all' || publication.status === filters.status) &&
        (filters.year === 'all' || String(publication.year) === filters.year) &&
        (filters.researcher === 'all' || publication.authors.some((author) => author.name === filters.researcher))
      )
    })
  }, [filters, publications])

  const displayPublications = limit ? filteredPublications.slice(0, limit) : filteredPublications
  const isRotator = layout === 'rotator'

  useEffect(() => {
    if (!isRotator || displayPublications.length <= 1) return undefined

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % displayPublications.length)
    }, 5200)

    return () => window.clearInterval(timer)
  }, [displayPublications.length, isRotator])

  // Reset the rotator/list to the first item when filters or limit change.
  const resetKey = `${JSON.stringify(filters)}|${limit}`
  const [prevResetKey, setPrevResetKey] = useState(resetKey)
  if (prevResetKey !== resetKey) {
    setPrevResetKey(resetKey)
    setActiveIndex(0)
  }

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  return (
    <Section
      id="publications"
      title={title}
      subtitle={subtitle}
      className={`bg-gray-50 ${compact ? '!py-0' : ''}`}
      contentClassName={compact ? '!max-w-none !px-0' : ''}
    >
      {intro && (
        <p className="mx-auto mb-10 max-w-3xl text-center leading-7 text-gray-600">
          {intro}
        </p>
      )}

      {showFilters && (
        <div className="mx-auto mb-10 max-w-7xl rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-950 text-white">
              <FaFilter className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-950">Filter publications</h3>
              <p className="text-sm text-gray-500">{displayPublications.length} results from {publications.length} records</p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-[1.5fr_repeat(4,1fr)]">
            <label className="relative block">
              <span className="sr-only">Search publications</span>
              <FaSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input
                value={filters.query}
                onChange={(event) => updateFilter('query', event.target.value)}
                placeholder="Search title, venue, author"
                className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm outline-none transition focus:border-primary-500 focus:bg-white"
              />
            </label>

            {[
              ['type', 'All types', options.types],
              ['status', 'All statuses', options.statuses],
              ['year', 'All years', options.years],
              ['researcher', 'All researchers', options.researchers],
            ].map(([key, label, values]) => (
              <label key={key}>
                <span className="sr-only">{label}</span>
                <select
                  value={filters[key]}
                  onChange={(event) => updateFilter(key, event.target.value)}
                  className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm font-medium text-gray-700 outline-none transition focus:border-primary-500 focus:bg-white"
                >
                  <option value="all">{label}</option>
                  {values.map((value) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-500">Loading publications...</div>
      ) : isRotator ? (
        <div className={`mx-auto ${compact ? 'max-w-2xl' : 'max-w-5xl'}`}>
          {displayPublications.length > 0 && (
            <PublicationCard publication={displayPublications[activeIndex]} featured compact={compact} />
          )}
          {displayPublications.length > 1 && (
            <div className="mt-5 flex items-center justify-center gap-2">
              {displayPublications.map((publication, index) => (
                <button
                  key={publication.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${index === activeIndex ? 'w-8 bg-primary-700' : 'w-2.5 bg-gray-300 hover:bg-gray-400'}`}
                  aria-label={`Show publication ${index + 1}`}
                />
              ))}
            </div>
          )}
          {viewAllLink && (
            <div className="mt-10 text-center">
              <Link
                to={viewAllLink}
                className="inline-flex items-center gap-3 rounded-full bg-gray-950 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-700"
              >
                View all publications
                <FaArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      ) : layout === 'cards' ? (
        <div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
            {displayPublications.map((publication) => (
              <PublicationCard key={publication.id} publication={publication} />
            ))}
          </div>
          {viewAllLink && (
            <div className="mt-10 text-center">
              <Link
                to={viewAllLink}
                className="inline-flex items-center gap-3 rounded-full bg-gray-950 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-700"
              >
                View full publication archive
                <FaArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      ) : limit ? (
        <div className="relative mx-auto max-w-4xl space-y-6">
          {displayPublications.map((publication, index) => {
            const isLast = index === displayPublications.length - 1

            if (isLast && viewAllLink) {
              return (
                <div key={publication.id} className="group relative overflow-hidden rounded-lg">
                  <div className="pointer-events-none select-none opacity-60 blur-sm grayscale transition-all duration-500 group-hover:scale-[1.02] group-hover:blur-md">
                    <PublicationItem publication={publication} />
                  </div>

                  <Link
                    to={viewAllLink}
                    className="absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center bg-white/40 transition-colors hover:bg-white/20"
                  >
                    <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-white/90 px-8 py-4 shadow-2xl backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                      <span className="font-bold text-gray-900">View full publication archive</span>
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-sm text-white">-&gt;</span>
                    </div>
                  </Link>
                </div>
              )
            }

            return <PublicationItem key={publication.id} publication={publication} />
          })}
        </div>
      ) : (
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {displayPublications.map((publication) => (
            <PublicationCard key={publication.id} publication={publication} />
          ))}
        </div>
      )}

      {!loading && displayPublications.length === 0 && (
        <div className="mx-auto max-w-xl rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
          No publications match the selected filters.
        </div>
      )}
    </Section>
  )
}

export default PublicationsSection
