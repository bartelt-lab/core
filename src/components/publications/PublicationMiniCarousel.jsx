import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import assetUrl from '../../utils/assetUrl'

const fallbackImages = ['/papers/guide.png', '/papers/trove.png', '/papers/mitigating.png']

const PublicationMiniCarousel = () => {
  const [publications, setPublications] = useState([])

  useEffect(() => {
    fetch(assetUrl('/data/publications.json'))
      .then((res) => res.json())
      .then((data) => {
        const withImages = data.publications
          .filter((publication) => publication.image)
          .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
          .slice(0, 8)
        setPublications(withImages)
      })
      .catch((err) => console.error('Failed to load hero publication carousel', err))
  }, [])

  const items = useMemo(() => {
    const source = publications.length
      ? publications
      : fallbackImages.map((image, index) => ({
        id: `fallback-${index}`,
        title: 'CORE research output',
        venue: 'Publication preview',
        year: '',
        image,
      }))

    return [...source, ...source]
  }, [publications])

  return (
    <div className="mt-6 w-full max-w-6xl overflow-hidden rounded-3xl border border-white/70 bg-white/88 p-4 shadow-2xl shadow-slate-200/70 backdrop-blur-xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-1">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">Recent Publications</p>
          <p className="mt-1 text-xs font-semibold text-gray-500">Moving preview from the CORE research archive</p>
        </div>
        <Link to="/publications" className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700 transition hover:border-blue-200 hover:bg-blue-700 hover:text-white">
          All publications
          <FaArrowRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </div>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent" />
        <div className="compute-carousel flex w-max gap-4">
          {items.map((publication, index) => (
            <article key={`${publication.id}-${index}`} className="w-64 flex-shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg">
              <div className="aspect-[16/9] bg-gray-100">
                <img src={assetUrl(publication.image)} alt="" className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="p-4">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-blue-700">
                  {publication.venue} {publication.year}
                </p>
                <h3 className="line-clamp-2 text-sm font-bold leading-5 text-gray-950">{publication.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PublicationMiniCarousel
