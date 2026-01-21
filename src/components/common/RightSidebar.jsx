import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const RightSidebar = () => {
    const [activeSection, setActiveSection] = useState('hero')
    const location = useLocation()
    const isHome = location.pathname === '/'

    // Sections to track for the vertical line
    const sections = [
        { id: 'initiative', label: 'Initiative' },
        { id: 'partners', label: 'Partners' },
        { id: 'team', label: 'Team' },
        { id: 'dynamo', label: 'Dynamo' },
        { id: 'autonomous', label: 'Autonomous' },
        { id: 'publications', label: 'Publications' },
    ]

    // Scroll Spy Logic
    useEffect(() => {
        if (!isHome) return

        const handleScroll = () => {
            // Find the section that is currently most visible
            let current = 'hero'
            const scrollPosition = window.scrollY + window.innerHeight / 3

            // Check each section position
            for (const section of sections) {
                const element = document.getElementById(section.id)
                if (element) {
                    const { top, bottom } = element.getBoundingClientRect()
                    const elementTop = top + window.scrollY
                    const elementBottom = bottom + window.scrollY

                    if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
                        current = section.id
                    }
                }
            }
            setActiveSection(current)
        }

        window.addEventListener('scroll', handleScroll)
        // Initial check
        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [isHome])

    const scrollToSection = (id) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    // Theme Colors based on section
    const isDarkSection = activeSection !== 'hero'
    // Dark theme: heavily opaque/solid black/gray for high visibility
    const lineColor = isDarkSection ? 'bg-gray-900' : 'bg-white/30'
    const dotBaseClass = isDarkSection ? 'bg-transparent border-gray-900 border-2' : 'bg-white/50 border-white'
    const dotHoverClass = isDarkSection ? 'group-hover:bg-gray-900' : 'group-hover:bg-white'
    const labelColor = isDarkSection ? 'text-gray-900' : 'text-white'

    return (
        <AnimatePresence>
            {isHome && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed top-0 right-0 h-full w-24 z-40 flex flex-col items-center justify-center pointer-events-none"
                >
                    <div className="flex flex-col items-center space-y-8 pointer-events-auto">
                        <div className={`w-px h-16 ${lineColor} transition-colors duration-300`}></div>

                        {sections.map((section) => (
                            <div key={section.id} className="relative group flex items-center justify-center">
                                {/* Label (Tooltip) */}
                                <span className={`absolute right-12 text-xs font-bold uppercase tracking-widest transition-all duration-200 whitespace-nowrap px-2 py-1 rounded
                  ${activeSection === section.id
                                        ? 'opacity-100 translate-x-0 bg-white/10 backdrop-blur-sm'
                                        : 'opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'
                                    }
                  ${labelColor}
                `}>
                                    {section.label}
                                </span>

                                {/* Dot with Larger Hit Area */}
                                <button
                                    onClick={() => scrollToSection(section.id)}
                                    className="relative flex items-center justify-center w-12 h-12 group-hover:scale-110 transition-transform duration-200"
                                    aria-label={`Scroll to ${section.label}`}
                                >
                                    <div className={`rounded-full transition-all duration-300 border-2
                    ${activeSection === section.id
                                            ? 'w-4 h-4 bg-primary-600 border-primary-600 scale-125'
                                            : `w-3 h-3 ${dotBaseClass} ${dotHoverClass}`
                                        }
                  `} />
                                </button>
                            </div>
                        ))}

                        <div className={`w-px h-16 ${lineColor} transition-colors duration-300`}></div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default RightSidebar
