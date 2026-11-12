import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import { newsArticles, formatNewsDate } from '../../data/news'
import { useLanguage } from '../../i18n/useLanguage'
import useInstitution from '../../hooks/useInstitution'
import { matchesInstitution } from '../../utils/institutions'
import assetUrl from '../../utils/assetUrl'

export default function LatestNews() {
  const { language, pick } = useLanguage()
  const { institution, withInstitution } = useInstitution()
  const articles = newsArticles.filter((article) => matchesInstitution(article.institutions, institution)).slice(0, 3)

  return (
    <section id="news" aria-labelledby="news-heading" className="scroll-mt-28 border-t border-slate-200 bg-white py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-20">
        <h2 id="news-heading" className="mb-8 text-3xl font-semibold tracking-tight text-slate-950 md:mb-10 md:text-4xl">
          {pick('News', 'Aktuelles')}
        </h2>

        {articles.length > 0 ? (
          <div className="space-y-10">
            {articles.map((article) => (
              <article key={article.slug}>
                <Link
                  to={withInstitution(article.path)}
                  aria-labelledby={`news-title-${article.slug}`}
                  className="group grid items-center gap-6 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-primary-700 sm:grid-cols-[180px_1fr] sm:gap-8 lg:grid-cols-[220px_1fr] lg:gap-12"
                >
                  <img
                    src={assetUrl(article.image)}
                    alt={pick(article.imageAlt.en, article.imageAlt.de)}
                    width={600}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-36 rounded-2xl object-contain sm:w-full"
                  />
                  <div>
                    <time dateTime={article.date} className="text-sm text-slate-500">
                      {formatNewsDate(article.date, language)}
                    </time>
                    <h3 id={`news-title-${article.slug}`} className="mt-3 text-2xl font-semibold leading-snug tracking-tight text-slate-950 transition-colors group-hover:text-primary-700 lg:text-3xl">
                      {pick(article.title.en, article.title.de)}
                    </h3>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                      {pick(article.summary.en, article.summary.de)}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-3 text-sm font-semibold text-primary-700 group-hover:underline group-hover:underline-offset-4">
                      {pick('Read article', 'Artikel lesen')}
                      <FaArrowRight className="h-3 w-3" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="max-w-xl">
            <p className="text-base leading-7 text-slate-600">
              {pick('No news for this institution yet.', 'Für diese Institution gibt es noch keine Meldungen.')}
            </p>
            <Link to="/#news" className="mt-4 inline-block rounded font-semibold text-primary-700 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-700">
              {pick('Show all news', 'Alle Meldungen anzeigen')}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
