import NewsCard from '../components/news/NewsCard'
import { newsByDate } from '../data/news'
import { useLanguage } from '../i18n/useLanguage'

const News = () => {
  const { pick } = useLanguage()
  const [lead, ...rest] = newsByDate

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="container mx-auto max-w-6xl px-6 pb-12 pt-32 md:px-12 lg:px-20">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary-700">{pick('CORE Network', 'CORE Network')}</p>
          <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-slate-950 md:text-5xl">{pick('News', 'Neuigkeiten')}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            {pick(
              'People, projects and results from the CORE research group and its partner universities.',
              'Menschen, Projekte und Ergebnisse aus der Forschungsgruppe CORE und ihren Partneruniversitäten.',
            )}
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-6 py-12 md:px-12 md:py-16 lg:px-20">
        {lead && <NewsCard item={lead} variant="lead" />}
        {rest.length > 0 && (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((item) => (
              <NewsCard key={item.slug} item={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default News
