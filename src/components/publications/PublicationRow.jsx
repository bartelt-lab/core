import { FaExternalLinkAlt } from 'react-icons/fa'
import assetUrl from '../../utils/assetUrl'
import formatAuthorName from '../../utils/formatAuthorName'
import { useLanguage } from '../../i18n/useLanguage'

// A venue name short enough to stand in the image slot ("ICLR 2025", "i-com").
// Longer ones ("Proceedings of the 2026 CHI Conference on …") are not shortened
// by guessing an acronym: the tile shows the publication type instead, and the
// full venue is in the card text either way.
const SHORT_VENUE = 14

// What fills the image slot when a publication has no picture of its own.
const VenueTile = ({ publication }) => {
  const venue = publication.venue ?? ''
  const short = venue.length > 0 && venue.length <= SHORT_VENUE
  // "ICLR 2025" already carries the year: show the name on top, the year below.
  const label = short ? venue.replace(String(publication.year), '').trim() : publication.type
  return (
    <div className="flex h-full flex-col items-center justify-center gap-1 bg-slate-100 px-2 text-center">
      <span className="text-[10px] font-bold uppercase leading-tight tracking-[0.14em] text-slate-500 [overflow-wrap:anywhere]">{label}</span>
      <span className="font-heading text-xl font-bold leading-none text-slate-700 sm:text-2xl">{publication.year}</span>
    </div>
  )
}

/**
 * One publication as a compact row: image slot on the left, text on the right.
 * Two of these sit side by side on the publications page.
 *
 * The slot shows the publication's own image whole (they are paper figures, so
 * cropping them leaves an unreadable strip), or a venue tile when it has none.
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
    <article className="group relative grid h-full grid-cols-[5.5rem_minmax(0,1fr)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-[0_24px_60px_-28px_rgb(var(--primary-700)/0.45)] focus-within:ring-2 focus-within:ring-primary-500 sm:grid-cols-[6.5rem_minmax(0,1fr)]">
      <div className="border-r border-slate-200">
        {publication.image ? (
          <div className="flex h-full items-center bg-[#fff] p-1.5">
            <img src={assetUrl(publication.image)} alt="" loading="lazy" decoding="async" className="max-h-full w-full object-contain" />
          </div>
        ) : (
          <VenueTile publication={publication} />
        )}
      </div>

      <div className="flex min-w-0 flex-col px-4 py-3">
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
        {/* Clamped hard on purpose: two title lines and one author line keep a
            row near 8rem, which is what makes 65 papers a short page. The full
            title is the link's text, so nothing is lost to assistive tech. */}
        <h3 className="mt-1 line-clamp-2 text-[15px] font-bold leading-snug text-slate-950" title={publication.title}>{title}</h3>
        <p className="mt-1 line-clamp-1 text-sm leading-5 text-slate-600">
          {publication.authors.map((author) => formatAuthorName(author.name)).join(', ')}
        </p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-1.5">
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
