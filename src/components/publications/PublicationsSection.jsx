import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaCheck, FaExternalLinkAlt, FaFilter, FaSearch } from 'react-icons/fa'
import Section from '../common/Section'
import PublicationItem from './PublicationItem'
import PublicationRow from './PublicationRow'
import assetUrl from '../../utils/assetUrl'
import formatAuthorName from '../../utils/formatAuthorName'
import { getMemberBySlug } from '../../data/team'
import { publications } from '../../data/publications'
import { publicationTopics, topicLabel } from '../../data/publicationTopics'
import { useLanguage } from '../../i18n/useLanguage'

const PublicationCard = ({ publication, featured = false, compact = false, compactHeightClass = 'h-[350px]' }) => {
  const { pick } = useLanguage()
  const image = publication.image || '/logos/core/light-background/core.svg'
  const hasUrl = publication.url && publication.url !== '#'
  const institutions = getPublicationInstitutions(publication)

  return (
    <article className={`group flex ${compact ? compactHeightClass : 'h-full'} overflow-hidden ${compact ? 'rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70' : 'rounded-lg border border-slate-200 bg-white shadow-sm'} transition-all hover:border-primary-200 hover:shadow-xl ${featured && !compact ? 'md:grid md:grid-cols-[44%_1fr]' : 'flex-col'}`}>
      <div className={`${featured ? (compact ? 'hidden' : 'min-h-[220px]') : 'h-36'} relative shrink-0 bg-slate-100 overflow-hidden`}>
        <img
          src={assetUrl(image)}
          alt=""
          className={`h-full w-full brightness-[0.96] saturate-[0.9] transition-transform duration-500 group-hover:scale-105 group-hover:brightness-100 group-hover:saturate-100 ${publication.image ? 'object-cover' : 'object-contain p-12 opacity-70'}`}
          loading="lazy"
        />
        {institutions.length > 0 && (
          <div className="absolute left-0 top-3 flex overflow-hidden rounded-r-full bg-primary-700 text-white shadow-lg shadow-primary-900/15">
            {institutions.map((institution, index) => (
              <span
                key={institution}
                className={`px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] ${index > 0 ? 'border-l border-white/25' : ''}`}
              >
                {institution}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className={`${featured ? (compact ? 'p-4' : 'p-7 md:p-8') : 'p-4'} flex flex-1 flex-col`}>
        {compact && <div className="mb-2.5 h-1 w-12 rounded-full bg-primary-600" />}
        <div className={`${compact ? 'mb-2.5 text-[10px]' : 'mb-2 text-[11px]'} flex flex-wrap items-center gap-2 font-bold uppercase tracking-widest text-primary-700`}>
          <span>{publication.type}</span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span>{publication.year}</span>
          {publication.status && (
            <>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span>{publication.status}</span>
            </>
          )}
        </div>
        <h3 className={`${featured ? (compact ? 'text-base leading-6 line-clamp-3' : 'text-2xl leading-8') : 'text-base leading-6 line-clamp-3'} mb-2 font-bold text-slate-950`}>
          {publication.title}
        </h3>
        <p className={`${featured ? (compact ? 'text-xs leading-5 line-clamp-2' : 'text-base leading-7') : 'text-sm leading-6 line-clamp-2'} mb-1.5 text-slate-600`}>
          {publication.authors.map((a) => formatAuthorName(a.name)).join(', ')}
        </p>
        <div className={`${compact ? 'border-t border-slate-100 pt-2.5' : ''} mt-auto flex flex-wrap items-center justify-between gap-2`}>
          <span className={`text-xs font-semibold text-slate-700 ${compact ? 'line-clamp-1' : 'line-clamp-2'}`}>{publication.venue}</span>
          {hasUrl && (
            <a
              href={publication.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-primary-100 px-2.5 py-1 text-xs font-bold text-primary-700 hover:border-primary-700 hover:text-primary-900"
            >
              {pick('Paper', 'Paper')}
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
      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
  }`

// Multi-select pill group. `selected` is an array; empty array = "All".
const FilterPills = ({ label, options, selected, onToggle, onClear, renderLabel }) => {
  const { pick } = useLanguage()
  return (
  <div>
    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">{label}</span>
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={onClear} aria-pressed={selected.length === 0} className={pillClass(selected.length === 0)}>
        {pick('All', 'Alle')}
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
}

// Multi-select as a checklist, one option per line, with how many papers carry
// each. For options whose labels are too long to sit side by side as pills.
const FilterChecklist = ({ label, options, counts = {}, selected, onToggle, renderLabel }) => (
  <div>
    <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">{label}</span>
    <ul className="space-y-0.5">
      {options.map((option) => {
        const active = selected.includes(option)
        return (
          <li key={option}>
            <button
              type="button"
              onClick={() => onToggle(option)}
              aria-pressed={active}
              className={`flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-sm transition ${
                active ? 'bg-primary-50 font-semibold text-primary-700' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                  active ? 'border-primary-600 bg-primary-600 text-white' : 'border-slate-300 bg-white'
                }`}
                aria-hidden="true"
              >
                {active && <FaCheck className="h-2.5 w-2.5" />}
              </span>
              <span className="min-w-0 flex-1">{renderLabel ? renderLabel(option) : option}</span>
              <span className="text-xs font-medium text-slate-500">{counts[option]}</span>
            </button>
          </li>
        )
      })}
    </ul>
  </div>
)

const YearRangeSlider =({ min, max, value, onChange }) => {
  const { pick } = useLanguage()
  const [from, to] = value
  const span = max - min || 1
  const pctFrom = ((from - min) / span) * 100
  const pctTo = ((to - min) / span) * 100

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{pick('Year', 'Jahr')}</span>
        <span className="text-sm font-semibold text-slate-700">{from === to ? from : `${from} – ${to}`}</span>
      </div>
      <div className="range-dual">
        <div className="pointer-events-none absolute left-0 top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-slate-200" />
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
          aria-label={pick('Earliest year', 'Frühestes Jahr')}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={to}
          onChange={(event) => onChange([from, Math.max(Number(event.target.value), from)])}
          aria-label={pick('Latest year', 'Spätestes Jahr')}
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
  if (Array.isArray(publication.institutions)) return publication.institutions

  const institutions = publication.authors.flatMap((author) => {
    if (!author.memberSlug) return []
    if (author.institution) return [author.institution]
    if (memberInstitutionDefaults[author.memberSlug]) return memberInstitutionDefaults[author.memberSlug]

    const member = getMemberBySlug(author.memberSlug)
    return member?.affiliations.map(({ institution }) => institution.shortName) || []
  })

  return [...new Set(institutions)]
}

// Filter options and the year span are derived from the whole corpus, which is now a
// build-time constant — so they are computed once per module rather than per mount.
const FILTER_OPTIONS = {
  types: getUnique(publications.map((publication) => publication.type)),
  statuses: getUnique(publications.map((publication) => publication.status)),
  // Only CORE members (authors linked to a team.js member via memberSlug), not external coauthors.
  researchers: getUnique(
    publications.flatMap((publication) =>
      publication.authors.filter((author) => author.memberSlug).map((author) => author.name),
    ),
  ),
  institutions: ['TUC', 'UBB', 'Rostock'],
  // In the order publicationTopics.js lists them, and only those in use.
  topics: publicationTopics
    .map((topic) => topic.id)
    .filter((id) => publications.some((publication) => publication.topics?.includes(id))),
  topicCounts: Object.fromEntries(
    publicationTopics.map((topic) => [topic.id, publications.filter((publication) => publication.topics?.includes(topic.id)).length]),
  ),
}

const YEAR_BOUNDS = (() => {
  const years = publications.map((publication) => Number(publication.year)).filter(Boolean)
  return years.length ? [Math.min(...years), Math.max(...years)] : null
})()

const PublicationsSection = ({
  limit,
  viewAllLink,
  layout = 'list',
  title = 'Publications',
  subtitle = 'Research Output',
  intro,
  showFilters = false,
  compact = false,
  compactHeightClass = 'h-[350px]',
  initialInstitution = 'all',
  // Pages that embed this inside their own <section id="publications"> pass
  // sectionId={null} — two elements with the same id break the scroll-spy.
  sectionId = 'publications',
}) => {
  const { pick } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const [filters, setFilters] = useState({
    query: '',
    type: [],
    status: [],
    topic: [],
    // The full span, available on the first render now that the corpus is not fetched.
    yearRange: YEAR_BOUNDS,
    researcher: 'all',
    institution: initialInstitution === 'all' ? [] : [initialInstitution],
  })

  const filteredPublications = useMemo(() => {
    const query = filters.query.trim().toLowerCase()

    const yearRange = filters.yearRange

    return publications.filter((publication) => {
      const authorNames = publication.authors.map((author) => formatAuthorName(author.name)).join(' ')
      const searchable = `${publication.title} ${publication.venue} ${authorNames}`.toLowerCase()
      const year = Number(publication.year)

      return (
        (!query || searchable.includes(query)) &&
        (filters.type.length === 0 || filters.type.includes(publication.type)) &&
        (filters.status.length === 0 || filters.status.includes(publication.status)) &&
        (!yearRange || (year >= yearRange[0] && year <= yearRange[1])) &&
        (filters.topic.length === 0 || (publication.topics ?? []).some((topic) => filters.topic.includes(topic))) &&
        (filters.researcher === 'all' || publication.authors.some((author) => author.name === filters.researcher)) &&
        (filters.institution.length === 0 || getPublicationInstitutions(publication).some((institution) => filters.institution.includes(institution)))
      )
    })
  }, [filters])

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

  // The sidebar is always open from lg up; below that it is a toggle.
  const [filtersOpen, setFiltersOpen] = useState(false)
  const yearNarrowed = Boolean(YEAR_BOUNDS && filters.yearRange && (filters.yearRange[0] !== YEAR_BOUNDS[0] || filters.yearRange[1] !== YEAR_BOUNDS[1]))
  const activeFilterCount =
    filters.topic.length + filters.institution.length + filters.type.length + filters.status.length +
    (filters.researcher !== 'all' ? 1 : 0) + (filters.query.trim() ? 1 : 0) + (yearNarrowed ? 1 : 0)
  const resetFilters = () =>
    setFilters({ query: '', type: [], status: [], topic: [], yearRange: YEAR_BOUNDS, researcher: 'all', institution: [] })

  return (
    <Section
      id={sectionId || undefined}
      title={pick(title, title === 'Publications' ? 'Publikationen' : title)}
      subtitle={pick(subtitle, subtitle === 'Research Output' ? 'Forschungsergebnisse' : subtitle)}
      className={`bg-slate-50 ${compact ? '!py-0' : ''}`}
      // The sidebar layout needs more width than a text section's 6xl column.
      contentClassName={compact ? '!max-w-none !px-0' : showFilters ? '!max-w-[96rem] !px-4 sm:!px-6 lg:!px-10' : ''}
    >
      {intro && (
        <p className="mx-auto mb-10 max-w-3xl text-center leading-7 text-slate-600">
          {intro}
        </p>
      )}

      {/* With filters, the page is a sidebar plus the list: the filters used
          to be one wide panel above the list, which pushed the papers a full
          screen down and read as a wall of pills. The sidebar stays in view
          while the list scrolls. Below lg it folds into a "Filters" toggle.
          Its height stops short of the viewport's bottom edge, where the
          language and theme controls float. */}
      <div className={showFilters ? 'lg:grid lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-start lg:gap-8' : undefined}>
      {showFilters && (
        <aside className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:sticky lg:top-28 lg:mb-0 lg:max-h-[calc(100vh-11.5rem)] lg:overflow-y-auto">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="flex items-center gap-2 text-base font-bold text-slate-950">
                <FaFilter className="h-3.5 w-3.5 text-primary-700" aria-hidden="true" />
                {pick('Filters', 'Filter')}
              </h3>
              <p className="mt-0.5 text-sm text-slate-500" aria-live="polite">
                {pick(`${displayPublications.length} of ${publications.length} papers`, `${displayPublications.length} von ${publications.length} Papern`)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {activeFilterCount > 0 && (
                <button type="button" onClick={resetFilters} className="rounded-full px-2.5 py-1 text-xs font-bold text-primary-700 transition hover:bg-primary-50">
                  {pick('Clear all', 'Alle löschen')}
                </button>
              )}
              <button
                type="button"
                onClick={() => setFiltersOpen((open) => !open)}
                aria-expanded={filtersOpen}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 lg:hidden"
              >
                {filtersOpen ? pick('Hide', 'Ausblenden') : pick('Show', 'Anzeigen')}
                {activeFilterCount > 0 && ` (${activeFilterCount})`}
              </button>
            </div>
          </div>

          <div className={`${filtersOpen ? 'block' : 'hidden'} mt-4 space-y-5 lg:block`}>
            <label className="relative block">
              <span className="sr-only">{pick('Search publications', 'Publikationen suchen')}</span>
              <FaSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
              <input
                value={filters.query}
                onChange={(event) => updateFilter('query', event.target.value)}
                placeholder={pick('Search title, venue, author', 'Titel, Venue, Autor suchen')}
                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none transition focus:border-primary-500 focus:bg-white"
              />
            </label>

            {/* Topics come from data/publicationTopics.js; a paper matches when
                it carries any of the selected ones. */}
            <FilterChecklist
              label={pick('Topic', 'Thema')}
              options={FILTER_OPTIONS.topics}
              counts={FILTER_OPTIONS.topicCounts}
              selected={filters.topic}
              onToggle={(value) => toggleFilter('topic', value)}
              renderLabel={(id) => pick(topicLabel(id)[1], topicLabel(id)[0])}
            />

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">{pick('Researcher', 'Forschende')}</span>
              <select
                value={filters.researcher}
                onChange={(event) => updateFilter('researcher', event.target.value)}
                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-primary-500 focus:bg-white"
              >
                <option value="all">{pick('All researchers', 'Alle Forschenden')}</option>
                {FILTER_OPTIONS.researchers.map((value) => (
                  <option key={value} value={value}>{formatAuthorName(value)}</option>
                ))}
              </select>
            </label>

            <FilterPills
              label="Institution"
              options={FILTER_OPTIONS.institutions}
              selected={filters.institution}
              onToggle={(value) => toggleFilter('institution', value)}
              onClear={() => clearFilter('institution')}
            />
            <FilterPills
              label="Type"
              options={FILTER_OPTIONS.types}
              selected={filters.type}
              onToggle={(value) => toggleFilter('type', value)}
              onClear={() => clearFilter('type')}
            />
            <FilterPills
              label="Status"
              options={FILTER_OPTIONS.statuses}
              selected={filters.status}
              onToggle={(value) => toggleFilter('status', value)}
              onClear={() => clearFilter('status')}
            />
            {filters.yearRange && YEAR_BOUNDS && YEAR_BOUNDS[0] !== YEAR_BOUNDS[1] && (
              <YearRangeSlider
                min={YEAR_BOUNDS[0]}
                max={YEAR_BOUNDS[1]}
                value={filters.yearRange}
                onChange={(range) => updateFilter('yearRange', range)}
              />
            )}
          </div>
        </aside>
      )}

      <div className="min-w-0">
      {isRotator ? (
        <div className={`mx-auto ${compact ? 'max-w-2xl' : 'max-w-5xl'}`}>
          {displayPublications.length > 0 && (
            <PublicationCard publication={displayPublications[activeIndex]} featured compact={compact} compactHeightClass={compactHeightClass} />
          )}
          {displayPublications.length > 1 && (
            <div className="mt-5 flex items-center justify-center gap-2">
              {displayPublications.map((publication, index) => (
                <button
                  key={publication.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`relative h-2.5 rounded-full transition-all after:absolute after:-inset-x-1 after:-inset-y-2 after:content-[''] ${index === activeIndex ? 'w-8 bg-primary-700' : 'w-2.5 bg-slate-300 hover:bg-slate-400'}`}
                  aria-label={`Show publication ${index + 1}`}
                />
              ))}
            </div>
          )}
          {viewAllLink && (
            <div className="mt-10 text-center">
              <Link
                to={viewAllLink}
                className="inline-flex items-center gap-3 rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-700"
              >
                {pick('View all publications', 'Alle Publikationen ansehen')}
                <FaArrowRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      ) : layout === 'cards' ? (
        <div>
          {/* The archive: compact rows, two side by side from lg up. Picture
              tiles four across made 65 papers a very long page, and a single
              column of rows a longer one. */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {displayPublications.map((publication) => (
              <PublicationRow key={publication.id} publication={publication} institutions={getPublicationInstitutions(publication)} />
            ))}
          </div>
          {viewAllLink && (
            <div className="mt-10 text-center">
              <Link
                to={viewAllLink}
                className="inline-flex items-center gap-3 rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-700"
              >
                {pick('View full publication archive', 'Vollständiges Publikationsarchiv ansehen')}
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
                    <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white/90 px-8 py-4 shadow-2xl backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                      <span className="font-bold text-slate-900">{pick('View full publication archive', 'Vollständiges Publikationsarchiv ansehen')}</span>
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

      {displayPublications.length === 0 && (
        <div className="mx-auto max-w-xl rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
          {pick('No publications match the selected filters.', 'Keine Publikationen passen zu den ausgewählten Filtern.')}
        </div>
      )}
      </div>
      </div>
    </Section>
  )
}

export default PublicationsSection
