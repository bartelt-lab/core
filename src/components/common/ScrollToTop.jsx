import { useEffect, useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FaChevronUp } from 'react-icons/fa'

const ScrollToTop = () => {
    const { pathname, hash } = useLocation()
    const [isVisible, setIsVisible] = useState(false)

    useLayoutEffect(() => {
        // Prevent browser from restoring scroll position
        if (window.history.scrollRestoration) {
            window.history.scrollRestoration = 'manual'
        }

        if (hash) {
            // Scroll to id
            const id = hash.replace('#', '')
            const element = document.getElementById(id)
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }, 300)
            }
        } else {
            // Default to top
            window.scrollTo(0, 0)
        }

        // Double check for race conditions or if hash failed
        const timeout = setTimeout(() => {
            if (!hash) window.scrollTo(0, 0)
        }, 0)

        return () => clearTimeout(timeout)
    }, [pathname, hash])

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 420)
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-900 shadow-xl backdrop-blur transition-all duration-300 hover:bg-blue-700 hover:text-white ${
                isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
            }`}
            aria-label="Back to top"
        >
            <FaChevronUp className="h-4 w-4" aria-hidden="true" />
        </button>
    )
}

export default ScrollToTop
