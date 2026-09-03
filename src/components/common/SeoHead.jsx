import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
    DEFAULT_OG_IMAGE,
    DEFAULT_ROUTE_META,
    SITE_NAME,
    SITE_URL,
    canonicalUrl,
    findRoute,
} from '../../routes'

/**
 * Per-route document metadata.
 *
 * React 19 hoists <title>, <meta> and <link> rendered anywhere in the tree into
 * <head>, so no helmet library is needed. index.html deliberately ships without
 * a <title> or description — this component owns them, which keeps exactly one
 * of each in the document and lets scripts/prerender.mjs bake them into the
 * static HTML.
 */
const SeoHead = () => {
    const { pathname } = useLocation()

    // The prerendered HTML already carries a full set of these tags. React does
    // not adopt them (the app calls createRoot, not hydrateRoot), so it appends
    // its own alongside — leaving two of each, with the stale prerendered copy
    // first. Drop them once React has committed its own set, which keeps the
    // document from ever being without metadata.
    useEffect(() => {
        for (const el of document.querySelectorAll('head [data-prerendered]')) {
            el.remove()
        }
    }, [])

    const meta = findRoute(pathname)

    // Unknown path: the router will show the shell with no matching route, so
    // fall back to the site defaults and keep it out of the index.
    const { title, description } = meta ?? DEFAULT_ROUTE_META
    const url = canonicalUrl(pathname)
    const image = `${SITE_URL}${meta?.image ?? DEFAULT_OG_IMAGE}`

    return (
        <>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />

            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {!meta && <meta name="robots" content="noindex" />}
        </>
    )
}

export default SeoHead
