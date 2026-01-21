import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
    const { pathname, hash } = useLocation()

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

    return null
}

export default ScrollToTop
