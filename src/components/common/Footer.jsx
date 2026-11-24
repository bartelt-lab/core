import { useLanguage } from '../../i18n/useLanguage'
import LegalLinks from './LegalLinks'
import ThirdPartyLogo from './ThirdPartyLogo'

const Footer = () => {
  const { pick } = useLanguage()
  // Heights differ on purpose: the three logos have different proportions, and
  // these make them come out about equally wide, so none looks bigger.
  const logos = [
    { src: 'logos/clausthal-logo.webp', alt: 'TU Clausthal', url: 'https://www.tu-clausthal.de', className: 'h-11' },
    { src: 'logos/ubb-logo.webp', alt: 'Babes-Bolyai University', url: 'https://www.ubbcluj.ro', className: 'h-16' },
    { src: 'logos/rostock-logo.webp', alt: 'University of Rostock', url: 'https://www.uni-rostock.de/en/', className: 'h-14' },
  ]

  return (
    <footer className="border-t border-slate-200 bg-white py-12 text-slate-950">
      <div className="container mx-auto max-w-7xl px-4 md:pr-20 lg:pr-24">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-4">
          <div className="md:col-span-3">
            <h3 className="mb-4 text-lg font-semibold">{pick('Where our members work', 'Hier arbeiten unsere Mitglieder')}</h3>
            {/* Three equal cards in one row. Cards sized to their logo wrapped
                unevenly: one logo ended up alone on a second row. */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {logos.map((logo) => (
                <a
                  key={logo.src}
                  href={logo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-24 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-4 transition hover:border-primary-200 hover:bg-white hover:shadow-md"
                >
                  <ThirdPartyLogo
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    decoding="async"
                    className={`${logo.className} w-auto max-w-full object-contain opacity-85 grayscale transition hover:opacity-100 hover:grayscale-0`}
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
            <p className="mb-4 text-slate-600">Cognitive Software</p>
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} CORE Initiative. All rights reserved.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
          <p>{pick('Advancing cognitive software research through European collaboration', 'Wir fördern Forschung zu Cognitive Software durch europäische Zusammenarbeit')}</p>
          <p className="mt-2">
            {pick(
              'CORE is a network of researchers, not an official body of the universities shown.',
              'CORE ist ein Netzwerk von Forschenden und keine offizielle Einrichtung der gezeigten Universitäten.',
            )}
          </p>
          <LegalLinks className="mt-4 justify-center" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
