import { Link, Navigate, useParams } from 'react-router-dom'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import RichText from '../components/news/RichText'
import { formatNewsDate } from '../components/news/newsText'
import { findNews } from '../data/news'
import { getMemberBySlug } from '../data/team'
import { useLanguage } from '../i18n/useLanguage'
import assetUrl from '../utils/assetUrl'

const txt = (pick, pair) => pick(pair[1], pair[0])

const NewsArticle = () => {
  const { slug } = useParams()
  const { pick, language } = useLanguage()
  const item = findNews(slug)

  if (!item) return <Navigate to="/news" replace />

  // People named in the story link to their card in the homepage team grid.
  const people = (item.people ?? []).map(getMemberBySlug).filter(Boolean)

  return (
    <article className="min-h-screen bg-white">
      <header className="border-b border-slate-200 bg-slate-50">
        <div className="container mx-auto max-w-5xl px-6 pb-10 pt-32 md:px-12">
          <Link to="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-primary-700">
            <FaArrowLeft className="h-3 w-3" aria-hidden="true" />
            {pick('All news', 'Alle Neuigkeiten')}
          </Link>

          <div className="mt-6 grid gap-8 md:grid-cols-[minmax(0,1fr)_16rem] md:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-primary-700">{txt(pick, item.tag)}</span>
                <time dateTime={item.date} className="text-slate-500">{formatNewsDate(item.date, language)}</time>
              </div>
              <h1 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight text-slate-950 md:text-4xl">{txt(pick, item.title)}</h1>
              {item.logo && (
                <img src={assetUrl(item.logo.src)} alt={item.logo.alt} decoding="async" className="mt-6 h-7 w-auto" />
              )}
            </div>
            {item.image && (
              <figure className="w-40 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:w-full">
                <img
                  src={assetUrl(item.image)}
                  alt={txt(pick, item.imageAlt)}
                  decoding="async"
                  style={item.imageFocus ? { objectPosition: item.imageFocus } : undefined}
                  className="aspect-[4/3] w-full object-cover"
                />
              </figure>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-3xl px-6 py-12 md:px-12 md:py-16">
        {item.imageCredit && <p className="mb-8 text-xs leading-5 text-slate-500">{txt(pick, item.imageCredit)}</p>}
        <p className="text-lg font-medium leading-8 text-slate-900 md:text-xl md:leading-9">
          <RichText text={txt(pick, item.lead)} />
        </p>
        <div className="mt-8 space-y-6 text-base leading-8 text-slate-700">
          {item.body.map((paragraph, index) => (
            <p key={index}>
              <RichText text={txt(pick, paragraph)} />
            </p>
          ))}
        </div>

        {item.cta && (
          <aside className="mt-12 rounded-2xl border border-primary-200 bg-primary-50 p-6 sm:p-8">
            <h2 className="font-heading text-xl font-bold text-slate-950">{txt(pick, item.cta.heading)}</h2>
            <p className="mt-2 text-base leading-7 text-slate-700">
              <RichText text={txt(pick, item.cta.text)} />
            </p>
            <Link
              to={item.cta.href}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-800"
            >
              {txt(pick, item.cta.label)}
              <FaArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </aside>
        )}

        {people.length > 0 && (
          <footer className="mt-12 border-t border-slate-200 pt-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">{pick('People in this story', 'Personen in diesem Beitrag')}</p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {people.map((member) => (
                <li key={member.slug}>
                  <Link
                    to={`/#member-${member.slug}`}
                    className="flex items-center gap-3 rounded-full border border-slate-200 bg-white py-1.5 pl-1.5 pr-4 text-sm font-semibold text-slate-800 transition hover:border-primary-300 hover:text-primary-700"
                  >
                    <img src={assetUrl(member.photo)} alt="" loading="lazy" className="h-8 w-8 rounded-full object-cover" />
                    {member.prefix ? `${member.prefix} ` : ''}
                    {member.name}
                  </Link>
                </li>
              ))}
            </ul>
          </footer>
        )}
      </div>
    </article>
  )
}

export default NewsArticle
