// Building blocks for the /tuc pages. Every page is written against these, so the
// layout rules live in one place: white panels with a TU Clausthal green top edge on a
// pale slate page, green (primary) for anything clickable, the site accent for place.
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

const CONTAINER = 'mx-auto max-w-7xl px-4 sm:px-6'

export const Kicker = ({ children, className = '' }) => (
    <p className={`text-xs font-semibold uppercase tracking-wider text-site-900 sm:text-sm ${className}`}>{children}</p>
)

const BackLink = ({ back, className = '' }) =>
    back ? (
        <Link to={back.to} className={`inline-flex items-center gap-2 py-1 text-sm font-semibold text-slate-600 transition-colors hover:text-primary-700 ${className}`}>
            <FiArrowLeft className="h-4 w-4" aria-hidden="true" />
            {back.label}
        </Link>
    ) : null

const navItemClass = (active) =>
    `flex w-full items-center justify-between gap-3 whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
        active ? 'bg-primary-50 text-primary-700' : 'text-slate-700 hover:bg-primary-50 hover:text-primary-700'
    }`

/**
 * Page frame: header plus body. `nav` lists in-page targets; each item is
 * { id, label } (an anchor) or { id, label, onSelect, active } (a tab).
 *
 * With `rail`, the header becomes a sticky sidebar holding the title, the nav and the
 * actions; use it only for long documents with tabs (Teaching). Every other page gets a
 * full-width header panel, so galleries like Industry Projects keep the whole width;
 * there, tabs show under the title and anchor items are not shown.
 */
export const PageShell = ({ kicker, title, lede, back, actions, media, nav = [], rail = false, children }) => {
    const tabs = nav.filter((n) => n.onSelect)

    if (rail) {
        return (
            <div className="bg-slate-50">
                <div className={`${CONTAINER} grid gap-6 py-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-10 lg:py-12`}>
                    <aside className="lg:sticky lg:top-24 lg:self-start">
                        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <div className="border-t-4 border-site-900 p-6">
                                <BackLink back={back} className="-mt-1 mb-3" />
                                {kicker && <Kicker>{kicker}</Kicker>}
                                <h1 className="mt-2 text-3xl font-bold tracking-tight">{title}</h1>
                                {lede && <p className="mt-3 text-sm leading-relaxed text-slate-600">{lede}</p>}
                                {nav.length > 0 && (
                                    <nav className={`mt-5 border-t border-slate-200 pt-3 ${tabs.length ? '' : 'hidden lg:block'}`} aria-label={title}>
                                        <ul className={tabs.length ? 'flex gap-1 overflow-x-auto lg:block lg:space-y-0.5' : 'space-y-0.5'}>
                                            {nav.map((n) => (
                                                <li key={n.id}>
                                                    {n.onSelect ? (
                                                        <button type="button" onClick={() => n.onSelect(n.id)} aria-pressed={!!n.active} className={navItemClass(n.active)}>
                                                            {n.label}
                                                        </button>
                                                    ) : (
                                                        <a href={`#${n.id}`} className={navItemClass(false)}>
                                                            {n.label} <FiArrowRight size={14} aria-hidden="true" />
                                                        </a>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                )}
                                {actions && <div className="mt-5 flex flex-col gap-2 [&>*]:justify-center">{actions}</div>}
                            </div>
                        </div>
                    </aside>
                    <div className="min-w-0 space-y-6">
                        {media && <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">{media}</div>}
                        {children}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-slate-50">
            <div className={`${CONTAINER} space-y-6 py-8 lg:py-10`}>
                <header className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className={`border-t-4 border-site-900 p-6 sm:p-8 ${media ? 'grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center' : ''}`}>
                        <div>
                            <BackLink back={back} className="-mt-1 mb-3" />
                            {kicker && <Kicker>{kicker}</Kicker>}
                            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
                            {lede && <p className="mt-3 max-w-3xl leading-relaxed text-slate-600">{lede}</p>}
                            {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
                            {tabs.length > 0 && (
                                <div className="mt-8 flex flex-wrap gap-x-6 border-b border-slate-300" role="tablist">
                                    {tabs.map((t) => (
                                        <button
                                            key={t.id}
                                            type="button"
                                            role="tab"
                                            aria-selected={!!t.active}
                                            onClick={() => t.onSelect(t.id)}
                                            className={`-mb-px border-b-2 py-3 text-base font-semibold transition ${
                                                t.active ? 'border-primary-600 text-slate-900' : 'border-transparent text-slate-600 hover:border-slate-400 hover:text-slate-900'
                                            }`}
                                        >
                                            {t.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        {media && <div className="overflow-hidden rounded-xl">{media}</div>}
                    </div>
                </header>
                {children}
            </div>
        </div>
    )
}

/** A titled white panel with an accent bar before the heading. */
export const Section = ({ id, kicker, title, intro, children, className = '' }) => (
    <section id={id} className={`scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 ${className}`}>
        {kicker && <Kicker className="mb-2">{kicker}</Kicker>}
        {title && (
            <h2 className="flex items-center gap-3 text-2xl font-semibold">
                <span className="h-6 w-1 shrink-0 rounded-full bg-site-900" />
                {title}
            </h2>
        )}
        {intro && <p className="mt-3 max-w-3xl leading-relaxed text-slate-600">{intro}</p>}
        <div className={title || intro ? 'mt-6' : ''}>{children}</div>
    </section>
)

/** Surface for grouped content. `interactive` adds the hover lift used on linked cards. */
export const Card = ({ as: Tag = 'div', interactive = false, className = '', children, ...rest }) => {
    const hover = interactive ? 'transition duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary-500' : ''
    return (
        <Tag className={`rounded-xl border border-slate-200 bg-white ${hover} ${className}`} {...rest}>
            {children}
        </Tag>
    )
}

/** Pale accent note. Place, not action: never put the only link of a page in here. */
export const Callout = ({ title, children, className = '' }) => (
    <div className={`rounded-xl border border-site-200 bg-site-100/50 px-5 py-4 ${className}`}>
        {title && <p className="font-semibold text-slate-900">{title}</p>}
        <div className={`text-slate-700 [&_a]:font-semibold [&_a]:text-primary-700 [&_a]:underline [&_a]:underline-offset-2 ${title ? 'mt-1' : ''}`}>{children}</div>
    </div>
)

/** Closing call to action: white panel, one green button. */
export const ContactBand = ({ title, text, href, label, icon: Icon, kicker }) => (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div>
                {kicker && <Kicker className="mb-2">{kicker}</Kicker>}
                <h2 className="text-2xl font-bold">{title}</h2>
                {text && <p className="mt-2 max-w-2xl leading-relaxed text-slate-600">{text}</p>}
            </div>
            <a href={href} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-800 hover:shadow-md">
                {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                {label}
            </a>
        </div>
    </section>
)

/** Primary and secondary action buttons, shared so every page uses the same two. */
export const ButtonLink = ({ to, href, children, variant = 'primary', className = '', ...rest }) => {
    const cls =
        variant === 'primary'
            ? 'inline-flex items-center gap-2 rounded-full bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-800 hover:shadow-md'
            : 'inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-primary-600 hover:text-primary-700'
    return to ? <Link to={to} className={`${cls} ${className}`} {...rest}>{children}</Link> : <a href={href} className={`${cls} ${className}`} {...rest}>{children}</a>
}
