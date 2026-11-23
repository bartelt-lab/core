import { FaExternalLinkAlt } from 'react-icons/fa'
import assetUrl from '../../utils/assetUrl'
import formatAuthorName from '../../utils/formatAuthorName'
import { topicLabel } from '../../data/publicationTopics'
import { useLanguage } from '../../i18n/useLanguage'

// A venue name short enough to stand in the image slot ("ICLR 2025", "i-com").
// Longer ones ("Proceedings of the 2026 CHI Conference on …") are not shortened
// by guessing an acronym: the tile shows the publication type instead, and the
// full venue is in the card text either way.
const SHORT_VENUE = 14

// What fills the image slot when a publication has neither a figure nor a
// first-page image.
const VenueTile = ({ publication }) => {
  const venue = publication.venue ?? ''
  const short = venue.length > 0 && venue.length <= SHORT_VENUE
  // "ICLR 2025" already carries the year: show the name on top, the year below.
  const label = short ? venue.replace(String(publication.year), '').trim() : publication.type
  return (
    <div className="flex h-full flex-col items-center justify-center gap-1.5 bg-slate-100 px-2 text-center">
      <span className="text-[11px] font-bold uppercase leading-tight tracking-[0.14em] text-slate-500 [overflow-wrap:anywhere]">{label}</span>
      <span className="font-heading text-2xl font-bold leading-none text-slate-700 sm:text-3xl">{publication.year}</span>
    </div>
  )
}

// The image slot, in order of preference:
//   image  a figure the authors chose: shown whole (cropping a diagram leaves
//          an unreadable strip)
//   page   the paper's first page (scripts/paper-pages.mjs): fills the slot
//          from the top, so the title block is what shows
//   else   the venue tile
// Figures and pages are drawn on white, so the plate stays white in dark mode.
const Slot = ({ publication }) => {
  if (publication.image) {
    return (
      <div className="flex h-full items-center bg-[#fff] p-2">
        <img src={assetUrl(publication.image)} alt="" loading="lazy" decoding="async" className="max-h-full w-full object-contain" />
      </div>
    )
  }
  if (publication.page) {
    return <img src={assetUrl(publication.page)} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full bg-[#fff] object-cover object-top" />
  }
  return <VenueTile publication={publication} />
}

/**
 * One publication as a row: image slot on the left, text on the right.
 * Two of these sit side by side on the publications page.
 * The title link is stretched over the whole card.
 */
const PublicationRow = ({ publication, institutions = [] }) => {
  const { pick } = useLanguage()
  const hasUrl = publication.url && publication.url !== '#'
  const title = hasUrl ? (
    <a
      href={publication.url}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-colors after:absolute after:inset-0 after:content-[''] focus:outline-none group-hover:text-primary-700"
    >
      {publication.title}
    </a>
  ) : (
    publication.title
  )

  return (
    <article className="group relative grid h-full min-h-[10rem] grid-cols-[7rem_minmax(0,1fr)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-[0_24px_60px_-28px_rgb(var(--primary-700)/0.45)] focus-within:ring-2 focus-within:ring-primary-500 sm:min-h-[12.5rem] sm:grid-cols-[10.5rem_minmax(0,1fr)]">
      <div className="relative border-r border-slate-200">
        <Slot publication={publication} />
      </div>

      <div className="flex min-w-0 flex-col px-4 py-3.5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-bold uppercase tracking-widest text-primary-700">
          <span>{publication.type}</span>
          <span className="h-1 w-1 rounded-full bg-slate-300" aria-hidden="true" />
          <span>{publication.year}</span>
          {publication.status && (
            <>
              <span className="h-1 w-1 rounded-full bg-slate-300" aria-hidden="true" />
              <span>{publication.status}</span>
            </>
          )}
          {institutions.map((institution) => (
            <span key={institution} className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] tracking-[0.12em] text-slate-700">{institution}</span>
          ))}
        </div>
        <h3 className="mt-1.5 line-clamp-3 text-base font-bold leading-snug text-slate-950" title={publication.title}>{title}</h3>
        <p className="mt-1.5 line-clamp-1 text-sm leading-5 text-slate-600">
          {publication.authors.map((author) => formatAuthorName(author.name)).join(', ')}
        </p>
        {publication.topics?.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-1.5" aria-label={pick('Topics', 'Themen')}>
            {publication.topics.map((id) => {
              const label = topicLabel(id)
              return label ? (
                <li key={id} className="rounded-full bg-primary-50 px-2 py-0.5 text-[11px] font-semibold text-primary-700">{pick(label[1], label[0])}</li>
              ) : null
            })}
          </ul>
        )}
        <div className="mt-auto flex items-end justify-between gap-3 pt-2.5">
          <span className="line-clamp-1 text-xs font-semibold text-slate-700">{publication.venue}</span>
          {hasUrl && (
            <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-bold text-primary-700">
              {pick('Paper', 'Paper')}
              <FaExternalLinkAlt className="h-3 w-3" aria-hidden="true" />
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

export default PublicationRow
