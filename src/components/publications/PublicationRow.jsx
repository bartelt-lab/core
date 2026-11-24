import { FaExternalLinkAlt } from 'react-icons/fa'
import assetUrl from '../../utils/assetUrl'
import formatAuthorName from '../../utils/formatAuthorName'
import { topicLabel } from '../../data/publicationTopics'
import { venueShortName } from '../../data/venueShortNames'
import { useLanguage } from '../../i18n/useLanguage'

// What fills the image slot when a publication has neither a figure nor a
// first-page image: a cover with the name researchers know the venue by
// ("CHI", "UbiComp"), set as large as the slot allows. The card text gives the
// venue in full, where it is clamped to one line and mostly reads "Proceedings
// of the …", so the cover is what tells two venues apart at a glance.
//
// The name is sized in cqw (a share of the slot's width, see the container on
// the slot in PublicationRow), so it fits the slot at every breakpoint. A
// glyph of the heading face is about 0.68em wide, and the padding leaves about
// 75% of the slot: 75 / 0.68 = 110.
const VenueCover = ({ publication }) => {
  const { lines, track } = venueShortName(publication)
  const longest = Math.max(...lines.map((line) => line.length))
  const size = Math.min(30, 110 / longest)
  return (
    // The same facts are in the card text, so this is not read out twice.
    <div className="flex h-full flex-col justify-between bg-primary-100 p-3 sm:p-4" aria-hidden="true">
      <span className="text-[13px] font-semibold tabular-nums leading-none text-primary-800">{publication.year}</span>
      <div>
        <p className="font-heading font-bold leading-[0.95] tracking-[-0.02em] text-primary-900" style={{ fontSize: `${size.toFixed(1)}cqw` }}>
          {lines.map((line) => (
            <span key={line} className="block whitespace-nowrap">{line}</span>
          ))}
        </p>
        {track && <p className="mt-1.5 text-[11px] font-semibold leading-tight text-primary-800 sm:text-xs">{track}</p>}
      </div>
    </div>
  )
}

// The image slot, in order of preference:
//   image  a figure the authors chose: shown whole (cropping a diagram leaves
//          an unreadable strip)
//   page   the paper's first page (scripts/paper-pages.mjs): fills the slot
//          from the top, so the title block is what shows
//   else   the venue cover
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
  return <VenueCover publication={publication} />
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
    <article className="group relative grid h-full min-h-[10rem] grid-cols-[7rem_minmax(0,1fr)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-[0_24px_60px_-28px_rgb(var(--primary-700)/0.45)] focus-within:ring-2 focus-within:ring-primary-500 sm:min-h-[12.5rem] sm:grid-cols-[10.5rem_minmax(0,1fr)] xl:grid-cols-[9rem_minmax(0,1fr)] 2xl:grid-cols-[10.5rem_minmax(0,1fr)]">
      <div className="relative border-r border-slate-200 [container-type:inline-size]">
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
                <li key={id} className="max-w-full truncate rounded-full bg-primary-50 px-2 py-0.5 text-[11px] font-semibold text-primary-700">{pick(label[1], label[0])}</li>
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
