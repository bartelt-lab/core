import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import { useLanguage } from '../../i18n/useLanguage'
import assetUrl from '../../utils/assetUrl'
import { formatNewsDate, plainText } from './newsText'

const txt = (pick, pair) => pick(pair[1], pair[0])

const Meta = ({ item, pick, language, light = false }) => (
  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
    <span className={`rounded-full px-2.5 py-0.5 ${light ? 'bg-white/15 text-white' : 'bg-primary-50 text-primary-700'}`}>{txt(pick, item.tag)}</span>
    <time dateTime={item.date} className={light ? 'text-slate-200' : 'text-slate-500'}>
      {formatNewsDate(item.date, language)}
    </time>
  </div>
)

// `fill`: cover the positioned parent instead of sizing it, so a tall image
// cannot set the height of the row it sits in.
const Image = ({ item, pick, badge = false, fill = false }) => (
  <div className={fill ? 'absolute inset-0' : 'relative h-full w-full'}>
    <img
      src={assetUrl(item.image)}
      alt={txt(pick, item.imageAlt)}
      loading="lazy"
      decoding="async"
      style={item.imageFocus ? { objectPosition: item.imageFocus } : undefined}
      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
    />
    {badge && item.logo && (
      <span className="absolute bottom-3 left-3 rounded-lg bg-white/95 px-3 py-2 shadow-md backdrop-blur">
        <img src={assetUrl(item.logo.src)} alt={item.logo.alt} loading="lazy" decoding="async" className="h-5 w-auto" />
      </span>
    )}
  </div>
)

/**
 * One news item as a card. The title link is stretched over the whole card.
 *   lead     large, image beside the text from md up
 *   tile     image on top, for grids
 *   row      small image beside title and teaser, for the homepage pair
 *   compact  small thumbnail and title, for side lists
 */
const NewsCard = ({ item, variant = 'tile' }) => {
  const { pick, language } = useLanguage()
  const href = `/news/${item.slug}`
  const title = txt(pick, item.title)
  const shell =
    'group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-[0_24px_60px_-28px_rgb(var(--primary-700)/0.45)] focus-within:ring-2 focus-within:ring-primary-500'
  const stretched = "after:absolute after:inset-0 after:content-[''] focus:outline-none"

  if (variant === 'compact') {
    return (
      <article className={`${shell} flex items-center gap-4 p-3`}>
        <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image item={item} pick={pick} />
        </div>
        <div className="min-w-0">
          <Meta item={item} pick={pick} language={language} />
          <h3 className="mt-1.5 line-clamp-2 text-sm font-bold leading-5 text-slate-950">
            <Link to={href} className={`${stretched} transition-colors group-hover:text-primary-700`}>{title}</Link>
          </h3>
        </div>
      </article>
    )
  }

  if (variant === 'row') {
    return (
      <article className={`${shell} grid grid-cols-[6.5rem_minmax(0,1fr)] sm:grid-cols-[10rem_minmax(0,1fr)]`}>
        <div className="relative min-h-[8.5rem] overflow-hidden bg-slate-100">
          <Image item={item} pick={pick} fill />
          {item.logo && (
            <span className="absolute bottom-2 left-2 rounded-md bg-white/95 px-2 py-1 shadow-sm">
              <img src={assetUrl(item.logo.src)} alt={item.logo.alt} loading="lazy" decoding="async" className="h-3.5 w-auto" />
            </span>
          )}
        </div>
        <div className="flex flex-col justify-center p-4 sm:p-5">
          <Meta item={item} pick={pick} language={language} />
          <h3 className="mt-2 text-base font-bold leading-snug text-slate-950 sm:text-lg">
            <Link to={href} className={`${stretched} transition-colors group-hover:text-primary-700`}>{title}</Link>
          </h3>
          {/* line-clamp sets its own display, so the breakpoint toggle lives on a wrapper */}
          <div className="mt-1.5 hidden sm:block">
            <p className="line-clamp-2 text-sm leading-6 text-slate-600">{plainText(txt(pick, item.teaser))}</p>
          </div>
        </div>
      </article>
    )
  }

  // Lead: one row on md+, small image beside the text, so a single story stays
  // about as tall as its image (~12rem) instead of a full-height feature block.
  if (variant === 'lead') {
    return (
      <article className={`${shell} grid sm:grid-cols-[14rem_minmax(0,1fr)] md:grid-cols-[18rem_minmax(0,1fr)]`}>
        <div className="relative h-40 overflow-hidden bg-slate-100 sm:h-auto sm:min-h-[11rem]">
          <Image item={item} pick={pick} badge fill />
        </div>
        <div className="flex flex-col justify-center p-5 sm:p-6">
          <Meta item={item} pick={pick} language={language} />
          <h3 className="mt-2 font-heading text-xl font-bold leading-snug tracking-tight text-slate-950 md:text-2xl">
            <Link to={href} className={`${stretched} transition-colors group-hover:text-primary-700`}>{title}</Link>
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{plainText(txt(pick, item.teaser))}</p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-primary-700">
            {pick('Read the story', 'Weiterlesen')}
            <FaArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </article>
    )
  }

  return (
    <article className={`${shell} flex flex-col`}>
      <div className="aspect-[16/9] overflow-hidden bg-slate-100">
        <Image item={item} pick={pick} badge />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <Meta item={item} pick={pick} language={language} />
        <h3 className="mt-2 text-lg font-bold leading-snug text-slate-950">
          <Link to={href} className={`${stretched} transition-colors group-hover:text-primary-700`}>{title}</Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{plainText(txt(pick, item.teaser))}</p>
      </div>
    </article>
  )
}

export default NewsCard
