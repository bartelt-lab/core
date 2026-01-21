import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  const isHome = location.pathname === '/'

  // Handle scroll effect for transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Demos', href: '#demonstrations' },
    { name: 'Labs', href: '#labs' },
    { name: 'Publications', href: '#publications' },
    { name: 'Network', href: '#/network' },
  ]

  const handleNavigation = (e, href) => {
    // If it's a section link (starts with # but is NOT a route like #/)
    const isSectionLink = href.startsWith('#') && !href.startsWith('#/');

    if (isSectionLink) {
      e.preventDefault();
      if (isHome) {
        // We are on home, just scroll
        const targetId = href.substring(1);
        // Special case: if target is empty (#), do nothing or top? usually ID matches
        const element = document.getElementById(targetId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      } else {
        // Not on home, navigate to root.
        window.location.href = `${import.meta.env.BASE_URL}`;
      }
      setIsMobileMenuOpen(false);
    }
  }

  // Determine styles based on location and scroll state
  const navbarClasses = isHome
    ? `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`
    : 'bg-white border-b border-gray-200 py-4 sticky top-0 z-50'

  const logoFilter = isHome && !isScrolled ? 'invert(1) brightness(100%)' : 'none'
  const navPillClasses = "bg-gray-900/90 backdrop-blur-sm rounded-full px-8 py-3 flex items-center space-x-8 shadow-lg"
  const navLinkClasses = "text-white font-medium hover:text-primary-300 transition-colors text-sm uppercase tracking-wide"
  const buttonClasses = isHome && !isScrolled ? 'text-white' : 'text-gray-900'

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-4 max-w-7xl relative flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={`${import.meta.env.BASE_URL}images/logos/core labs logo.svg`}
            alt="CORE Labs"
            className="h-10 w-auto transition-all duration-300"
            style={{ filter: logoFilter }}
          />
        </Link>

        {/* Desktop Navigation - Centered Pill */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className={navPillClasses}>
            {navLinks.map((link) => (
              /* Using standard anchor for hash links helps with custom smooth scroll in handleNavigation
                 For pure routes like /network, standard Link or a tag with HashRouter might be needed.
                 Since we put /network as href, simple a tag in HashRouter works as long as we handle clicks.
               */
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavigation(e, link.href)}
                className={navLinkClasses}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden text-2xl ${buttonClasses}`}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-200 shadow-xl overflow-hidden absolute top-full left-0 right-0"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavigation(e, link.href)}
                  className="block text-gray-700 hover:text-primary-600 font-medium"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
