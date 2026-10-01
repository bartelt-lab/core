import assetUrl from '../../utils/assetUrl'
import { useLanguage } from '../../i18n/useLanguage'
import { Link } from 'react-router-dom'
import useInstitution from '../../hooks/useInstitution'

const Footer = () => {
  const { pick } = useLanguage()
  const { withInstitution } = useInstitution()
  const logos = [
    { src: 'logos/clausthal-logo.webp', alt: 'TU Clausthal', url: 'https://www.tu-clausthal.de', className: 'h-16' },
    { src: 'logos/ubb-logo.webp', alt: 'Babes-Bolyai University', url: 'https://www.ubbcluj.ro', className: 'h-20' },
    { src: 'logos/rostock-logo.webp', alt: 'University of Rostock', url: 'https://www.uni-rostock.de/en/', className: 'h-20' },
  ]

  return (
    <footer className="border-t border-slate-200 bg-white py-12 text-slate-950">
      <div className="container mx-auto max-w-7xl px-4 md:pr-20 lg:pr-24">
        <nav aria-label={pick('Footer navigation', 'Navigation im Footer')} className="mb-9 flex flex-wrap gap-x-7 gap-y-3 border-b border-slate-200 pb-6 text-sm font-semibold text-slate-700">
          {['Research', 'Projects', 'Teaching', 'Labs', 'Team'].map((label) => (
            <Link key={label} to={withInstitution(`/${label.toLowerCase()}`)} className="hover:text-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-700">{label}</Link>
          ))}
          <Link to={withInstitution('/team#contact')} className="hover:text-primary-700">{pick('Contact', 'Kontakt')}</Link>
        </nav>
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-4">
          <div className="md:col-span-3">
            <h3 className="mb-4 text-lg font-semibold">{pick('Partner Institutions', 'Partnerinstitutionen')}</h3>
            <div className="flex flex-wrap items-center gap-4">
              {logos.map((logo) => (
                <a
                  key={logo.src}
                  href={logo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-24 min-w-48 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-5 py-4 transition hover:border-primary-200 hover:bg-white hover:shadow-md"
                >
                  <img
                    src={assetUrl(logo.src)}
                    alt={logo.alt}
                    loading="lazy"
                    decoding="async"
                    className={`${logo.className} w-auto object-contain opacity-85 grayscale transition hover:opacity-100 hover:grayscale-0`}
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-1 md:pr-6 md:text-right lg:pr-10">
            <h3 className="mb-2 text-2xl font-heading font-bold text-tertiary-600">CORE</h3>
            <p className="mb-4 text-slate-600">{pick('Cognitive Software in Europe', 'Kognitive Software in Europa')}</p>
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} CORE Initiative. All rights reserved.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
          <p>{pick('Advancing cognitive software research through European collaboration', 'Wir fördern Forschung zu kognitiver Software durch europäische Zusammenarbeit')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
