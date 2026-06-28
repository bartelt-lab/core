import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaExternalLinkAlt, FaFilter, FaSearch } from 'react-icons/fa'
import Section from '../common/Section'
import PublicationItem from './PublicationItem'
import assetUrl from '../../utils/assetUrl'
import { getMemberBySlug } from '../../data/team'

const PublicationCard = ({ publication, featured = false, compact = false }) => {
  const image = publication.image || '/logos/core/light-background/core.svg'
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

const pillClass = (active) =>
  `rounded-full border px-3.5 py-1.5 text-sm font-semibold transition ${
    active
      ? 'border-primary-600 bg-primary-600 text-white shadow-sm'
      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
  }`

// Multi-select pill group. `selected` is an array; empty array = "All".
const FilterPills = ({ label, options, selected, onToggle, onClear, renderLabel }) => (
  <div>
    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-500">{label}</span>
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={onClear} aria-pressed={selected.length === 0} className={pillClass(selected.length === 0)}>
        All
      </button>
      {options.map((option) => {
        const active = selected.includes(option)
        return (
          <button key={option} type="button" onClick={() => onToggle(option)} aria-pressed={active} className={pillClass(active)}>
            {renderLabel ? renderLabel(option) : option}
          </button>
        )
      })}
    </div>
  </div>
)

const YearRangeSlider = ({ min, max, value, onChange }) => {
  const [from, to] = value
  const span = max - min || 1
  const pctFrom = ((from - min) / span) * 100
  const pctTo = ((to - min) / span) * 100

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Year</span>
        <span className="text-sm font-semibold text-gray-700">{from === to ? from : `${from} – ${to}`}</span>
      </div>
      <div className="range-dual">
        <div className="pointer-events-none absolute left-0 top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-gray-200" />
        <div
          className="pointer-events-none absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-primary-600"
          style={{ left: `${pctFrom}%`, right: `${100 - pctTo}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={from}
          onChange={(event) => onChange([Math.min(Number(event.target.value), to), to])}
          aria-label="Earliest year"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={to}
          onChange={(event) => onChange([from, Math.max(Number(event.target.value), from)])}
          aria-label="Latest year"
        />
      </div>
    </div>
  )
}

// Default institution for a member when a publication doesn't override it per-author.
// szilagyi is affiliated with both TUC and UBB; default his output to TUC unless a
// publication's author entry specifies otherwise (see the `institution` field in publications.json).
const memberInstitutionDefaults = {
  szilagyi: ['TUC'],
}

const getPublicationInstitutions = (publication) => {
  const institutions = publication.authors.flatMap((author) => {
    if (!author.memberSlug) return []
    if (author.institution) return [author.institution]
    if (memberInstitutionDefaults[author.memberSlug]) return memberInstitutionDefaults[author.memberSlug]

    const member = getMemberBySlug(author.memberSlug)
    return member?.affiliations.map(({ institution }) => institution.shortName) || []
  })

  return [...new Set(institutions)]
}

const PublicationsSection = ({
  limit,
  viewAllLink,
  layout = 'list',
  title = 'Publications',
  subtitle = 'Research Output',
  intro,
  showFilters = false,
  compact = false,
  initialInstitution = 'all',
}) => {
  const [publications, setPublications] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [filters, setFilters] = useState({
    query: '',
    type: [],
    status: [],
    yearRange: null,
    researcher: 'all',
    institution: initialInstitution === 'all' ? [] : [initialInstitution],
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
    // Only CORE members (authors linked to a team.js member via memberSlug), not external coauthors.
    researchers: getUnique(
      publications.flatMap((publication) =>
        publication.authors.filter((author) => author.memberSlug).map((author) => author.name),
      ),
    ),
    institutions: ['TUC', 'UBB', 'Rostock'],
  }), [publications])

  const yearBounds = useMemo(() => {
    const years = publications.map((publication) => Number(publication.year)).filter(Boolean)
    return years.length ? [Math.min(...years), Math.max(...years)] : null
  }, [publications])


  const filteredPublications = useMemo(() => {
    const query = filters.query.trim().toLowerCase()

    const yearRange = filters.yearRange

    return publications.filter((publication) => {
      const authorNames = publication.authors.map((author) => author.name).join(' ')
      const searchable = `${publication.title} ${publication.venue} ${authorNames}`.toLowerCase()
      const year = Number(publication.year)

      return (
        (!query || searchable.includes(query)) &&
        (filters.type.length === 0 || filters.type.includes(publication.type)) &&
        (filters.status.length === 0 || filters.status.includes(publication.status)) &&
        (!yearRange || (year >= yearRange[0] && year <= yearRange[1])) &&
        (filters.researcher === 'all' || publication.authors.some((author) => author.name === filters.researcher)) &&
        (filters.institution.length === 0 || getPublicationInstitutions(publication).some((institution) => filters.institution.includes(institution)))
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

  // Initialise the year range to the full span once data has loaded.
  if (yearBounds && !filters.yearRange) {
    setFilters((current) => ({ ...current, yearRange: yearBounds }))
  }

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

  const toggleFilter = (key, option) => {
    setFilters((current) => {
      const selected = current[key]
      return {
        ...current,
        [key]: selected.includes(option) ? selected.filter((value) => value !== option) : [...selected, option],
      }
    })
  }

  const clearFilter = (key) => updateFilter(key, [])

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

          <div className="grid gap-3 md:grid-cols-2">
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

            <label>
              <span className="sr-only">All researchers</span>
              <select
                value={filters.researcher}
                onChange={(event) => updateFilter('researcher', event.target.value)}
                className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm font-medium text-gray-700 outline-none transition focus:border-primary-500 focus:bg-white"
              >
                <option value="all">All researchers</option>
                {options.researchers.map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <FilterPills
              label="Institution"
              options={options.institutions}
              selected={filters.institution}
              onToggle={(value) => toggleFilter('institution', value)}
              onClear={() => clearFilter('institution')}
            />
            <FilterPills
              label="Type"
              options={options.types}
              selected={filters.type}
              onToggle={(value) => toggleFilter('type', value)}
              onClear={() => clearFilter('type')}
            />
            <FilterPills
              label="Status"
              options={options.statuses}
              selected={filters.status}
              onToggle={(value) => toggleFilter('status', value)}
              onClear={() => clearFilter('status')}
            />
            {filters.yearRange && yearBounds && yearBounds[0] !== yearBounds[1] && (
              <YearRangeSlider
                min={yearBounds[0]}
                max={yearBounds[1]}
                value={filters.yearRange}
                onChange={(range) => updateFilter('yearRange', range)}
              />
            )}
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
