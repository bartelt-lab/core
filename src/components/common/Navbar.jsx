import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import assetUrl from '../../utils/assetUrl'
import { useLanguage } from '../../i18n/useLanguage'
import useInstitution from '../../hooks/useInstitution'
import { INSTITUTION_OPTIONS } from '../../utils/institutions'
import { findRoute } from '../../routes'

const items = [
  { id: 'research', label: 'Research' },
  { id: 'projects', label: 'Projects' },
  { id: 'teaching', label: 'Teaching' },
  { id: 'labs', label: 'Labs' },
  { id: 'team', label: 'Team' },
]

export default function Navbar() {
  const location = useLocation()
  const { pick } = useLanguage()
  const { institution, setInstitution, withInstitution } = useInstitution()
  const [openAt, setOpenAt] = useState(null)
  const menuButton = useRef(null)
  const menuOpen = openAt === location.key
  const route = findRoute(location.pathname)
  const section = route?.section
  const isDetail = section && location.pathname.replace(/\/$/, '') !== `/${section}`

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setOpenAt(null)
        menuButton.current?.focus()
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  const chooseInstitution = (value) => {
    const to = route?.institutionFilterTarget ?? (isDetail
      ? `/${section}${section === 'teaching' ? '#student-projects' : ''}`
      : location.hash.startsWith('#member-') ? `${location.pathname}${location.search}` : undefined)
    setInstitution(value, { to })
    setOpenAt(null)
  }

  return (
    <header className="fixed inset-x-3 top-3 z-[60] mx-auto max-w-[94rem] sm:inset-x-5 sm:top-4">
      <a href="#main-content" onClick={(event) => {
        event.preventDefault()
        const main = document.getElementById('main-content')
        main?.focus({ preventScroll: true })
        main?.scrollIntoView({ behavior: 'instant' })
      }} className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-2 focus:z-10 focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-primary-700">
        {pick('Skip to content', 'Zum Inhalt')}
      </a>
      <div className="rounded-3xl border border-white/90 bg-white/95 p-2.5 shadow-[0_18px_55px_-24px_rgba(15,23,42,0.34)] backdrop-blur-xl sm:p-3">
        <div className="flex h-11 items-center gap-3 sm:h-12 lg:gap-5">
          <Link to={withInstitution('/')} aria-label="CORE Network home" className="flex h-full w-16 shrink-0 items-center justify-center rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700 sm:w-24">
            <img src={assetUrl('/logos/core/light-background/core.svg')} alt="CORE Network" className="h-10 w-full object-contain sm:h-12" />
          </Link>

          <nav aria-label={pick('Main navigation', 'Hauptnavigation')} className="hidden h-full min-w-0 flex-1 items-center rounded-2xl bg-slate-900 px-2 lg:flex">
            {items.map((item) => (
              <Link key={item.id} to={withInstitution(`/${item.id}`)} aria-current={section === item.id ? 'page' : undefined}
                className={`relative flex h-full flex-1 items-center justify-center rounded-xl px-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-300 ${section === item.id ? 'text-white' : 'text-slate-300 hover:text-white'}`}>
                {item.label}
                {section === item.id && <span className="absolute bottom-0 h-[3px] w-8 rounded-t-full bg-primary-400" />}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden shrink-0 lg:block">
            <span className="mb-0.5 block pl-2 text-[10px] font-medium text-slate-500">{pick('Institution', 'Institution')}</span>
            <div role="group" aria-label={pick('Filter by institution', 'Nach Institution filtern')} className="flex gap-0.5 rounded-full bg-slate-100 p-0.5">
              {INSTITUTION_OPTIONS.map((option) => (
                <button key={option.value} type="button" onClick={() => chooseInstitution(option.value)} aria-pressed={institution === option.value} title={option.name}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-700 ${institution === option.value ? 'bg-primary-700 text-white' : 'text-slate-600 hover:bg-white hover:text-primary-700'}`}>
                  {pick(option.label, option.labelDe ?? option.label)}
                </button>
              ))}
            </div>
          </div>

          <label className="ml-auto flex min-w-0 max-w-44 flex-col gap-0.5 lg:hidden">
            <span className="pl-2 text-[10px] font-medium text-slate-500">{pick('Institution', 'Institution')}</span>
            <select value={institution} onChange={(event) => chooseInstitution(event.target.value)} className="w-full rounded-full border-slate-200 bg-slate-50 py-1 pl-3 pr-8 text-xs font-semibold text-slate-700 focus:border-primary-700 focus:ring-primary-700">
              {INSTITUTION_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.value === 'Rostock' ? 'MDS (Rostock)' : pick(option.label, option.labelDe ?? option.label)}</option>)}
            </select>
          </label>

          <button ref={menuButton} type="button" aria-controls="mobile-navigation" aria-expanded={menuOpen} aria-label={menuOpen ? pick('Close menu', 'Menü schließen') : pick('Open menu', 'Menü öffnen')} onClick={() => setOpenAt(menuOpen ? null : location.key)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700 lg:hidden">
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <nav id="mobile-navigation" aria-label={pick('Main navigation', 'Hauptnavigation')} className="mt-3 grid gap-1 border-t border-slate-200 pt-3 lg:hidden">
            {items.map((item) => <Link key={item.id} to={withInstitution(`/${item.id}`)} onClick={() => setOpenAt(null)} aria-current={section === item.id ? 'page' : undefined} className={`rounded-xl px-4 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-700 ${section === item.id ? 'bg-primary-700 text-white' : 'text-slate-700 hover:bg-slate-100'}`}>{item.label}</Link>)}
          </nav>
        )}
      </div>
    </header>
  )
}
