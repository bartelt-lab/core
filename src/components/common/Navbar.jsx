import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

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

  const isHome = location.pathname === '/'
  const isNetwork = location.pathname === '/network'

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className={`
        relative flex items-center p-1.5 rounded-full 
        bg-gray-900/80 backdrop-blur-md border border-white/10 shadow-2xl 
        transition-all duration-300 ${isScrolled ? 'scale-95' : 'scale-100'}
      `}>

        {/* Tab 1: Home (CORE Labs) */}
        <Link
          to="/"
          className="relative z-10 px-6 py-2 rounded-full flex items-center justify-center transition-colors duration-200"
        >
          {isHome && (
            <motion.div
              layoutId="nav-pill"
              className="absolute inset-0 bg-white rounded-full shadow-md"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <div className="relative z-20 flex items-center gap-2">
            <img
              src={`${import.meta.env.BASE_URL}images/logos/core labs logo.svg`}
              alt="CORE Labs"
              // Interactive Logic: Active (White Pill) -> Black Logo (filter-none). Inactive (Dark BG) -> White Logo (invert).
              className={`h-10 w-auto transition-all duration-200 ${isHome ? 'opacity-100 scale-105' : 'opacity-70 invert hover:opacity-100 hover:scale-105'}`}
            />
            {/* Optional Text Label if needed, mostly user wanted logo */}
            {/* <span className={`text-sm font-bold tracking-wider ${isHome ? 'text-gray-900' : 'text-gray-400'}`}>HOME</span> */}
          </div>
        </Link>

        {/* Tab 2: Network (CORE Network) */}
        <Link
          to="/network"
          className="relative z-10 px-6 py-2 rounded-full flex items-center justify-center transition-colors duration-200"
        >
          {isNetwork && (
            <motion.div
              layoutId="nav-pill"
              className="absolute inset-0 bg-white rounded-full shadow-md"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <div className="relative z-20 flex items-center gap-2">
            <img
              src={`${import.meta.env.BASE_URL}images/logos/core network logo.svg`}
              alt="Network"
              className={`h-10 w-auto transition-all duration-200 ${isNetwork ? 'opacity-100 scale-105' : 'opacity-70 invert hover:opacity-100 hover:scale-105'}`}
            />
          </div>
        </Link>

      </div>
    </nav>
  )
}

export default Navbar
