import { useEffect, useMemo, useState } from 'react'
import { FaDatabase, FaMicrochip, FaNetworkWired, FaServer } from 'react-icons/fa'
import assetUrl from '../utils/assetUrl'

const clusterStats = [
  { label: 'Research Jobs', value: 'ML', icon: FaMicrochip },
  { label: 'Shared Storage', value: 'Datasets', icon: FaDatabase },
  { label: 'Networked Sites', value: 'DE + RO', icon: FaNetworkWired },
]

const fallbackImages = [
  '/papers/guide.png',
  '/papers/trove.png',
  '/papers/mitigating.png',
  '/papers/DSEG.png',
]

const ComputeCluster = () => {
  const [publications, setPublications] = useState([])

  useEffect(() => {
    fetch(assetUrl('/data/publications.json'))
      .then((res) => res.json())
      .then((data) => {
        const withImages = data.publications
          .filter((publication) => publication.image)
          .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
        setPublications(withImages)
      })
      .catch((err) => {
        console.error('Failed to load publication carousel', err)
      })
  }, [])

  const carouselItems = useMemo(() => {
    const source = publications.length > 0
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
    <div className="min-h-screen bg-gray-50">
      <section id="hero" className="relative min-h-screen overflow-hidden bg-[#f7fafc] text-gray-950">
        <img
          className="absolute inset-y-0 right-0 h-full w-full object-cover object-center opacity-76"
          src={assetUrl('/images/hero/compute-cluster-hero.png')}
          alt=""
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f7fafc] via-[#f7fafc]/96 via-[45%] to-[#f7fafc]/18" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f7fafc] via-transparent to-white/55" />
        <div className="absolute left-0 top-0 h-full w-2/3 bg-[radial-gradient(circle_at_18%_22%,rgba(37,99,235,.10),transparent_32%),radial-gradient(circle_at_42%_82%,rgba(132,204,22,.10),transparent_30%)]" />

        <div className="container relative mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-14 pt-28 md:px-12 lg:px-20">
          <div className="max-w-3xl">
              <div className="mb-8 flex flex-wrap items-center gap-4">
                <div className="inline-flex rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-lg">
                  <img
                    src={assetUrl('/logos/core-network-logo.svg')}
                    alt="CORE Network"
                    className="h-12 md:h-16 w-auto"
                  />
                </div>
                <div className="inline-flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-lg">
                  <FaServer className="h-5 w-5 text-blue-700" aria-hidden="true" />
                  <span className="text-sm font-bold tracking-wide text-gray-950">Compute Cluster</span>
                </div>
              </div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-blue-700">
                Shared Infrastructure
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6 tracking-tight text-gray-950">
                Compute infrastructure for research that needs to move.
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-gray-700 max-w-3xl">
                A shared environment for training, simulation, monitoring, and publication-backed
                experimentation across the CORE Network.
              </p>

            <div className="mt-10 grid grid-cols-3 gap-3 max-w-2xl">
              {clusterStats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                    <Icon className="h-5 w-5 text-blue-700 mb-3" aria-hidden="true" />
                    <p className="text-lg font-bold">{stat.value}</p>
                    <p className="text-xs text-gray-600 leading-5">{stat.label}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="overview" className="py-16 md:py-20 bg-white border-b border-gray-200">
        <div className="container mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              ['Experiment Queues', 'Run repeatable training and evaluation workloads for robotics, vision, language, and simulation projects.'],
              ['Research Artifacts', 'Keep datasets, checkpoints, reports, and paper previews close to the experiments that produced them.'],
              ['Network Access', 'Support collaboration across CORE sites while keeping workflows inspectable and easy to hand over.'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                <h2 className="text-lg font-bold text-gray-950 mb-3">{title}</h2>
                <p className="text-gray-600 leading-7">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="publications" className="py-16 md:py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6 md:px-12 lg:px-20 mb-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Research Carousel</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-950 mt-3 mb-4">
              Publication outputs from the network.
            </h2>
            <p className="text-gray-600 leading-7">
              These cards are loaded from the existing publications data and continuously swipe
              across the page, giving the cluster page a living view of current research.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-gray-50 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-gray-50 to-transparent" />
          <div className="compute-carousel flex w-max gap-6 px-6">
            {carouselItems.map((publication, index) => (
              <article
                key={`${publication.id}-${index}`}
                className="w-[280px] md:w-[340px] flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
              >
                <div className="aspect-[4/3] bg-gray-100">
                  <img
                    src={assetUrl(publication.image)}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-700 mb-2">
                    {publication.venue} {publication.year}
                  </p>
                  <h3 className="text-base font-bold leading-6 text-gray-950 line-clamp-3">
                    {publication.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ComputeCluster
