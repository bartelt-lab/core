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

        if (!hash) {
            window.scrollTo(0, 0)
            return
        }

        let id = hash.slice(1)
        try {
            id = decodeURIComponent(id)
        } catch {
            // A malformed escaped fragment can still be a literal element id.
        }

        let frame
        let observer
        const scrollWhenReady = () => {
            const element = document.getElementById(id)
            if (!element) return false
            observer?.disconnect()
            frame = requestAnimationFrame(() => {
                element.scrollIntoView({
                    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                    block: id.startsWith('member-') ? 'center' : 'start',
                })
            })
            return true
        }

        // Route chunks and Teaching tabs may commit after this layout effect.
        // Observe until the actual target appears instead of guessing a delay.
        if (!scrollWhenReady()) {
            observer = new MutationObserver(scrollWhenReady)
            observer.observe(document.getElementById('root'), { childList: true, subtree: true })
        }
        const timeout = setTimeout(() => observer?.disconnect(), 10_000)

        return () => {
            clearTimeout(timeout)
            cancelAnimationFrame(frame)
            observer?.disconnect()
        }
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
            className={`fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-900 shadow-xl backdrop-blur transition-all duration-300 hover:bg-primary-700 hover:text-white ${
                isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
            }`}
            aria-label="Back to top"
        >
            <FaChevronUp className="h-4 w-4" aria-hidden="true" />
        </button>
    )
}

export default ScrollToTop
