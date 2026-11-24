import { Link, useNavigate } from 'react-router-dom'

// How long the old page may stay frozen on screen while the new one loads.
const WAIT_MS = 1000

/**
 * A <Link> for the jumps between the network site and a lab site
 * (/ <-> /tuc, /ubb). Where the browser supports view transitions, the parts
 * the two headers share morph into each other instead of being swapped: the
 * header itself, the logo, the dark network nav, the lab switch and Join Us.
 * Those parts carry the same `viewTransitionName` in both headers
 * (common/Navbar.jsx, common/LabHeader.jsx); timing is in index.css.
 *
 * Use it only for links that leave the current shell. Within a shell nothing
 * morphs, and a link to a section of the page already open would freeze the
 * page until the wait below runs out.
 *
 * Without view transitions, with reduced motion, or on a modified click
 * (new tab), it is a plain <Link>.
 */
const ShellLink = ({ to, onClick, ...rest }) => {
    const navigate = useNavigate()

    const handleClick = (event) => {
        onClick?.(event)
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
        if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        event.preventDefault()
        document.startViewTransition(
            () =>
                new Promise((resolve) => {
                    // The router commits the new page in its own time (it
                    // waits for a lazy page to load), so the "after" picture is
                    // taken once the page has actually changed. ScrollToTop
                    // stamps the route on <html> in the same commit.
                    const root = document.documentElement
                    const before = root.dataset.route
                    const started = Date.now()
                    const check = () => {
                        if (root.dataset.route !== before || Date.now() - started > WAIT_MS) resolve()
                        else setTimeout(check, 16)
                    }
                    navigate(to)
                    check()
                }),
        )
    }

    return <Link to={to} onClick={handleClick} {...rest} />
}

export default ShellLink
