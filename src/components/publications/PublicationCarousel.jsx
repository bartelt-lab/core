import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import assetUrl from '../../utils/assetUrl'
import { publicationsWithImages } from '../../data/publications'

// Doubled so the marquee loops seamlessly — the second pass scrolls in behind the first.
const carouselItems = [...publicationsWithImages, ...publicationsWithImages]

const PublicationCarousel = ({
  title = 'Publication outputs from the network.',
  subtitle = 'Research Carousel',
  intro = 'These cards are loaded from the existing publications data and continuously swipe across the page.',
  viewAllLink = '/publications',
  className = 'bg-slate-50',
}) => {
  return (
    <section id="publications" className={`py-16 md:py-20 overflow-hidden ${className}`}>
      <div className="container mx-auto max-w-7xl px-6 md:px-12 lg:px-20 mb-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-700">{subtitle}</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-950 mt-3 mb-4">
              {title}
            </h2>
            {intro && <p className="text-slate-600 leading-7">{intro}</p>}
          </div>
          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="inline-flex w-fit items-center gap-3 rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-700"
            >
              View full publication archive
              <FaArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-slate-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-slate-50 to-transparent" />
        <div className="compute-carousel flex w-max gap-6 px-6">
          {carouselItems.map((publication, index) => (
            <article
              key={`${publication.id}-${index}`}
              className="w-[280px] md:w-[340px] flex-shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg"
            >
              <div className="aspect-[4/3] bg-slate-100">
                <img
                  src={assetUrl(publication.image)}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-primary-700 mb-2">
                  {publication.venue} {publication.year}
                </p>
                <h3 className="text-base font-bold leading-6 text-slate-950 line-clamp-3">
                  {publication.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PublicationCarousel
