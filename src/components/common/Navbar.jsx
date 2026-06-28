import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaBookOpen, FaBrain, FaFlask, FaServer } from 'react-icons/fa'
import assetUrl from '../../utils/assetUrl'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  // Shrink the bar slightly once scrolled. (To make the bar hide entirely past a
  // scroll threshold on a specific route, see wiki/navbar-scroll-hide.md.)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const labSites = [
    { initials: 'TUC', to: '/tuc', title: 'TU Clausthal lab' },
    { initials: 'MDS', href: 'https://www.mds-lab.de/', title: 'MDS Lab, Rostock' },
    { initials: 'UBB', to: '/ubb', title: 'Babeș-Bolyai lab' },
  ]

  const navItems = [
    {
      to: '/publications',
      label: 'Publications',
      icon: FaBookOpen,
      isActive: location.pathname === '/publications',
    },
    {
      to: '/core-labs',
      label: 'CORE Labs',
      icon: FaFlask,
      isActive: location.pathname.startsWith('/core-labs'),
    },
    {
      to: '/ai-team-projects',
      label: 'AI Team Projects',
      icon: FaBrain,
      isActive: location.pathname.startsWith('/ai-team-projects'),
    },
    {
      to: '/compute-cluster',
      label: 'Compute Cluster',
      icon: FaServer,
      isActive: location.pathname === '/compute-cluster',
    },
  ]

  return (
    <header
      className={`fixed inset-x-3 top-3 z-[60] mx-auto max-w-[94rem] transition-all duration-300 sm:inset-x-5 sm:top-4 ${
        isScrolled ? 'scale-[0.985] opacity-100' : 'scale-100 opacity-100'
      }`}
    >
      <div className="flex h-[3.75rem] items-center gap-3 rounded-[1.5rem] border border-white/90 bg-white/90 p-2.5 shadow-[0_18px_55px_-24px_rgba(15,23,42,0.34)] backdrop-blur-xl sm:h-[4.5rem] sm:gap-4 sm:p-3">
        <Link
          to="/"
          aria-label="CORE Network home"
          className="flex h-full w-[5.25rem] shrink-0 items-center justify-center rounded-2xl transition hover:bg-slate-50 sm:w-[7.5rem] lg:w-[9rem]"
        >
          <img
            src={assetUrl('/logos/core/light-background/core.svg')}
            alt="CORE Network"
            className="h-10 max-w-[4.5rem] object-contain sm:h-12 sm:max-w-[6.75rem]"
          />
        </Link>

        <div className="hidden h-10 w-px shrink-0 bg-slate-200 lg:block" aria-hidden="true" />

        <nav className="relative flex h-full min-w-0 flex-1 items-center justify-center overflow-hidden rounded-[1.4rem] border border-slate-700/40 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 px-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_30px_-18px_rgba(15,23,42,0.9)] sm:px-3">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group relative flex h-full min-w-0 flex-1 items-center justify-center gap-2 px-2 text-xs font-semibold whitespace-nowrap transition-colors duration-200 sm:gap-2.5 sm:px-3 sm:text-sm lg:text-[15px] ${
                  item.isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 transition-colors sm:h-[1.1rem] sm:w-[1.1rem] ${
                    item.isActive ? 'text-primary-400' : 'text-slate-300 group-hover:text-primary-300'
                  }`}
                  aria-hidden="true"
                />
                <span className="hidden lg:inline">{item.label}</span>
                {item.isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 h-[3px] w-12 rounded-t-full bg-primary-400 shadow-[0_-2px_12px_rgba(74,222,128,0.42)] sm:w-16"
                    transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="hidden h-10 w-px shrink-0 bg-slate-200 md:block" aria-hidden="true" />

        <div className="hidden h-10 shrink-0 items-center rounded-full border border-slate-200/80 bg-slate-50/80 px-1 md:flex">
          {labSites.map((lab) => {
            const isTucActive = lab.initials === 'TUC' && location.pathname.startsWith('/tuc')
            const isUbbActive = lab.initials === 'UBB' && location.pathname.startsWith('/ubb')
            const isPrimaryLab = lab.initials === 'TUC' && !isUbbActive
            const cls = `flex h-8 min-w-11 items-center justify-center rounded-full px-2.5 text-xs font-semibold tracking-wide transition duration-200 lg:min-w-12 lg:px-3 ${
              isTucActive || isUbbActive || isPrimaryLab
                ? 'bg-white text-primary-700 shadow-sm'
                : 'text-slate-600 hover:bg-white hover:text-slate-900'
            }`
            return lab.to ? (
              <Link key={lab.initials} to={lab.to} title={lab.title} aria-label={lab.title} className={cls}>{lab.initials}</Link>
            ) : (
              <a key={lab.initials} href={lab.href} target="_blank" rel="noreferrer" title={lab.title} aria-label={lab.title} className={cls}>{lab.initials}</a>
            )
          })}
        </div>
      </div>
    </header>
  )
}

export default Navbar
