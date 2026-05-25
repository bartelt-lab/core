import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaBrain, FaServer } from 'react-icons/fa'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  // Handle scroll opacity/scale animation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    {
      to: '/',
      label: 'CORE Network',
      logo: `${import.meta.env.BASE_URL}logos/core-network-logo.svg`,
      isActive: location.pathname === '/' || location.pathname === '/network',
    },
    {
      to: '/core-labs',
      label: 'CORE Labs',
      logo: `${import.meta.env.BASE_URL}logos/core-labs-logo.svg`,
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
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-1rem)] max-w-5xl px-2">
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
  )
}

export default Navbar
