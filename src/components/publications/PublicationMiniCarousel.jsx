import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import assetUrl from '../../utils/assetUrl'
import { publicationsWithImages } from '../../data/publications'
import { useLanguage } from '../../i18n/useLanguage'

// Doubled so the marquee can loop seamlessly: the second pass scrolls in behind the
// first. Eight is enough to fill the widest viewport before the seam comes round.
const items = [...publicationsWithImages.slice(0, 8), ...publicationsWithImages.slice(0, 8)]

const PublicationMiniCarousel = () => {
  const { pick } = useLanguage()

  return (
    <div className="mt-6 w-full max-w-6xl overflow-hidden rounded-3xl border border-white/70 bg-white/88 p-4 shadow-2xl shadow-slate-200/70 backdrop-blur-xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-1">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary-700">{pick('Latest publications', 'Neueste Publikationen')}</p>
        </div>
        <Link to="/publications" className="inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-4 py-2 text-xs font-bold text-primary-700 transition hover:border-primary-200 hover:bg-primary-700 hover:text-white">
          {pick('All publications', 'Alle Publikationen')}
          <FaArrowRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </div>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent" />
        <div className="compute-carousel flex w-max gap-4">
          {items.map((publication, index) => {
            const hasUrl = publication.url && publication.url !== '#'
            const content = (
              <>
                <div className="aspect-[16/9] bg-slate-100">
                  <img src={assetUrl(publication.image)} alt="" className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="p-4">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-primary-700">
                    {publication.venue} {publication.year}
                  </p>
                  <h3 className="line-clamp-2 text-sm font-bold leading-5 text-slate-950">{publication.title}</h3>
                </div>
              </>
            )

            return hasUrl ? (
              <a key={`${publication.id}-${index}`} href={publication.url} target="_blank" rel="noopener noreferrer" className="w-64 flex-shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-lg">
                {content}
              </a>
            ) : (
              <article key={`${publication.id}-${index}`} className="w-64 flex-shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-lg">
                {content}
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default PublicationMiniCarousel
