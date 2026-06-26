import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaBookOpen, FaBrain, FaFlask, FaServer } from 'react-icons/fa'
import assetUrl from '../../utils/assetUrl'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [hideOnDynamoContent, setHideOnDynamoContent] = useState(false)
  const location = useLocation()

  // Handle scroll opacity/scale animation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      setHideOnDynamoContent(location.pathname === '/dynamo' && window.scrollY > window.innerHeight * 0.68)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  const labSites = [
    { initials: 'TUC', to: '/tuc', title: 'TU Clausthal lab' },
    { initials: 'MDS', href: 'https://www.mds-lab.de/', title: 'MDS Lab, Rostock' },
    { initials: 'UBB', href: 'https://www.ubbcluj.ro/en/', title: 'Babeș-Bolyai lab' }, // TODO placeholder until UBB lab site exists
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
      isActive: location.pathname === '/core-labs',
    },
    {
      to: '/ai-team-projects',
      label: 'AI Team Projects',
      icon: FaBrain,
      isActive: location.pathname === '/ai-team-projects',
    },
    {
      to: '/compute-cluster',
      label: 'Compute Cluster',
      icon: FaServer,
      isActive: location.pathname === '/compute-cluster',
    },
  ]

  return (
    <>
      <Link
        to="/"
        aria-label="CORE Network home"
        className={`fixed left-4 top-4 z-[60] flex h-12 w-20 items-center justify-center rounded-full border border-white/70 bg-white/85 shadow-xl backdrop-blur-md transition-all duration-300 hover:bg-white sm:h-14 sm:w-24 ${
          hideOnDynamoContent ? 'pointer-events-none -translate-y-20 opacity-0' : isScrolled ? 'scale-95 opacity-100' : 'scale-100 opacity-100'
        }`}
      >
        <img
          src={assetUrl('/logos/core/light-background/core.svg')}
          alt="CORE Network"
          className="h-8 max-w-[4rem] object-contain sm:h-10 sm:max-w-[5rem]"
        />
      </Link>

      <div className={`fixed right-4 top-4 z-[60] flex items-center gap-1.5 transition-all duration-300 ${
        hideOnDynamoContent ? 'pointer-events-none -translate-y-20 opacity-0' : isScrolled ? 'scale-95 opacity-100' : 'scale-100 opacity-100'
      }`}>
        {labSites.map((lab) => {
          const cls = 'flex h-9 items-center justify-center rounded-full border border-white/70 bg-white/85 px-3 text-xs font-bold tracking-wide text-gray-900 shadow-lg backdrop-blur-md transition hover:bg-white sm:h-10 sm:px-3.5 sm:text-sm'
          return lab.to ? (
            <Link key={lab.initials} to={lab.to} title={lab.title} aria-label={lab.title} className={cls}>{lab.initials}</Link>
          ) : (
            <a key={lab.initials} href={lab.href} target="_blank" rel="noreferrer" title={lab.title} aria-label={lab.title} className={cls}>{lab.initials}</a>
          )
        })}
      </div>

      <nav className={`fixed top-16 left-1/2 z-50 w-[calc(100%-5rem)] max-w-4xl -translate-x-1/2 px-2 transition-all duration-300 sm:top-4 sm:w-[calc(100%-9rem)] ${
        hideOnDynamoContent ? 'pointer-events-none -translate-y-20 opacity-0' : 'opacity-100'
      }`}>
        <div className={`
          relative flex items-center justify-center gap-1 p-1.5 rounded-full 
          bg-gray-900/80 backdrop-blur-md border border-white/10 shadow-2xl 
          transition-all duration-300 ${isScrolled ? 'scale-95' : 'scale-100'}
        `}>
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.to}
                to={item.to}
                className="relative z-10 min-w-0 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                {item.isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white rounded-full shadow-md"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div
                  className={`relative z-20 flex items-center gap-2 px-3 sm:px-4 lg:px-5 py-2 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${
                    item.isActive ? 'text-gray-900' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {item.logo ? (
                    <img
                      src={item.logo}
                      alt=""
                      className={`h-7 sm:h-8 w-auto transition-all duration-200 ${
                        item.isActive ? 'opacity-100' : 'opacity-75 invert'
                      }`}
                    />
                  ) : (
                    <Icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  )}
                  <span className="hidden md:inline">{item.label}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}

export default Navbar
