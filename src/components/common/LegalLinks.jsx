import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/useLanguage'

// Impressum and privacy policy. German law wants both reachable from every
// page, so all three footers (network, /tuc, /ubb) render this. `tone="dark"`
// is for a footer that is dark in both themes (/ubb).
const LegalLinks = ({ className = '', tone = 'light' }) => {
  const { pick } = useLanguage()
  const link = tone === 'dark'
    ? 'py-1 text-slate-300 underline-offset-2 transition hover:text-white hover:underline'
    : 'py-1 text-slate-600 underline-offset-2 transition hover:text-primary-700 hover:underline'

  return (
    <nav aria-label={pick('Legal', 'Rechtliches')} className={`flex flex-wrap items-center gap-x-5 gap-y-1 text-sm ${className}`}>
      <Link to="/impressum" className={link}>{pick('Legal notice', 'Impressum')}</Link>
      <Link to="/datenschutz" className={link}>{pick('Privacy policy', 'Datenschutz')}</Link>
    </nav>
  )
}

export default LegalLinks
