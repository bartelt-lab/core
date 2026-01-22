import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const RightSidebar = () => {
    const [activeSection, setActiveSection] = useState('hero')
    const location = useLocation()
    const isVisible = location.pathname === '/' || location.pathname === '/dynamo' || location.pathname === '/network'

    // Section configurations for different routes
    const routeSections = {
        '/': [
            { id: 'hero', label: 'Vision' },
            { id: 'initiative', label: 'Initiative' },
            { id: 'team', label: 'Team' },
            { id: 'dynamo', label: 'Dynamo' },
            { id: 'autonomous', label: 'Self-Driving' },
            { id: 'publications', label: 'Publications' },
        ],
        '/dynamo': [
            { id: 'hero', label: 'Introduction' },
            { id: 'goal', label: 'Goal' },
            { id: 'overview', label: 'Overview' },
            { id: 'technical', label: 'Technical' },
            { id: 'experiments', label: 'Experiments' },
        ],
        '/network': [
            { id: 'hero', label: 'Network' },
            { id: 'team', label: 'Team' },
            { id: 'publications', label: 'Publications' },
        ]
    }

    const sections = routeSections[location.pathname] || []

    // Scroll Spy Logic
    useEffect(() => {
        if (!isVisible) return

        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 3

            // Find valid sections (that exist in DOM)
            const validSections = sections
                .map(section => {
                    const element = document.getElementById(section.id)
                    if (!element) return null
                    const { top, height } = element.getBoundingClientRect()
                    return {
                        id: section.id,
                        top: top + window.scrollY,
                        bottom: top + window.scrollY + height
                    }
                })
                .filter(Boolean)

            // Logic:
            // 1. If we are near the bottom of page, highlight the last item (Publication/Contact usually)
            // 2. Otherwise, find the last section that has its TOP above the scrollPosition.
            //    This handles gaps because if we are in a gap, we are conceptually "inside" the previous section or just past it.

            // Check bottom of page
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
                if (validSections.length > 0) {
                    setActiveSection(validSections[validSections.length - 1].id)
                    return
                }
            }

            // Find active section
            let current = validSections.length > 0 ? validSections[0].id : 'hero'
            // Reverse iterate: find the first one whose top is <= scrollPosition
            for (let i = validSections.length - 1; i >= 0; i--) {
                if (validSections[i].top <= scrollPosition) {
                    current = validSections[i].id
                    break
                }
            }

            setActiveSection(current)
        }

        window.addEventListener('scroll', handleScroll)
        // Initial check
        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [isVisible, sections])

    const scrollToSection = (id) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    // Theme Colors based on section
    // Theme Colors based on section
    // Only Home and Dynamo have dark Heroes. Network has a light Hero.
    const isDarkBackground = (location.pathname === '/' || location.pathname === '/dynamo') && activeSection === 'hero'

    // If background is dark, use light sidebar. If background is light (default), use dark sidebar.
    const useDarkSidebar = !isDarkBackground

    const lineColor = useDarkSidebar ? 'bg-gray-900' : 'bg-white/30'
    const dotBaseClass = useDarkSidebar ? 'bg-transparent border-gray-900 border-2' : 'bg-white/50 border-white'
    const dotHoverClass = useDarkSidebar ? 'group-hover:bg-gray-900' : 'group-hover:bg-white'
    const labelColor = useDarkSidebar ? 'text-gray-900' : 'text-white'

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed top-0 right-0 h-full w-12 lg:w-24 z-40 flex flex-col items-center justify-center pointer-events-none"
                >
                    <div className="flex flex-col items-center space-y-8 pointer-events-auto">
                        <div className={`w-px h-16 ${lineColor} transition-colors duration-300`}></div>

                        {sections.map((section) => (
                            <div key={section.id} className="relative group flex items-center justify-center">
                                {/* Label (Tooltip) - Hidden on Mobile */}
                                <span className={`hidden lg:block absolute right-12 text-xs font-bold uppercase tracking-widest transition-all duration-200 whitespace-nowrap px-2 py-1 rounded
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
