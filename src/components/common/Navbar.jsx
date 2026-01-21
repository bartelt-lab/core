import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

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

  const isActive = (path) => location.pathname === path

  const linkBaseClasses = "relative text-sm font-bold uppercase tracking-widest transition-colors duration-300"
  const activeClasses = "text-white"
  const inactiveClasses = "text-gray-400 hover:text-white"

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className={`
        flex items-center gap-8 px-8 py-3 rounded-full 
        bg-gray-900/90 backdrop-blur-md border border-white/10 shadow-2xl 
        transition-all duration-300 ${isScrolled ? 'scale-95 py-2' : 'scale-100'}
      `}>

        {/* Left Link: Home */}
        <Link
          to="/"
          className={`${linkBaseClasses} ${isActive('/') ? activeClasses : inactiveClasses}`}
        >
          Home
          {isActive('/') && (
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white rounded-full animate-fade-in" />
          )}
        </Link>

        {/* Center: Logo */}
        <Link to="/" className="group relative flex items-center justify-center">
          <div className="bg-white/10 p-1.5 rounded-full group-hover:bg-white/20 transition-colors">
            <img
              src={`${import.meta.env.BASE_URL}images/logos/core labs logo.svg`}
              alt="CORE Labs"
              className="h-8 w-auto invert brightness-100"
            />
          </div>
        </Link>

        {/* Right Link: Network */}
        <Link
          to="/network"
          className={`${linkBaseClasses} ${isActive('/network') ? activeClasses : inactiveClasses}`}
        >
          Network
          {isActive('/network') && (
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white rounded-full animate-fade-in" />
          )}
        </Link>

        {/* Future links could go here if requested, e.g. Demos */}

      </div>
    </nav>
  )
}

export default Navbar
