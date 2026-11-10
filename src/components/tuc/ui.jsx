// Look-aware building blocks for the /tuc subpages. Each page is written once
// against these; the active look (?style=split|rail|banded) decides how they
// render. REVIEW SCAFFOLD: once a look is chosen, collapse every switch below
// to that look's branch.
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { useTucStyle } from '../../pages/tuc/home/tucStyle'

const CONTAINER = {
    split: 'mx-auto max-w-7xl px-4 sm:px-6',
    rail: 'mx-auto max-w-7xl px-4 sm:px-6',
    banded: 'mx-auto max-w-6xl px-4 sm:px-6',
}

const useLook = () => useTucStyle()

export const Kicker = ({ children, className = '' }) => {
    const look = useLook()
    if (look === 'split') {
        return (
            <p className={`inline-flex items-center gap-2 text-sm font-semibold text-site-900 ${className}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-site-900" />
                {children}
            </p>
        )
    }
    return <p className={`text-xs font-semibold uppercase tracking-wider text-site-900 sm:text-sm ${className}`}>{children}</p>
}

const BackLink = ({ back, className = '' }) =>
    back ? (
        <Link to={back.to} className={`inline-flex items-center gap-2 py-1 text-sm font-semibold text-slate-600 transition-colors hover:text-primary-700 ${className}`}>
            <FiArrowLeft className="h-4 w-4" aria-hidden="true" />
            {back.label}
        </Link>
    ) : null

/**
 * Page frame: header plus body. `nav` lists in-page targets; each item is
 * { id, label } (an anchor) or { id, label, onSelect, active } (a tab).
 * Tabs show under the header; anchor items appear only in the Rail sidebar.
 * The Rail look uses its sticky sidebar only on pages that pass `rail`
 * (long documents with tabs); every other page gets a full-width header
 * panel, so galleries like Industry Projects keep the whole width.
 */
export const PageShell = ({ kicker, title, lede, back, actions, media, nav = [], rail = false, children }) => {
    const look = useLook()
    const tabs = nav.filter((n) => n.onSelect)

    if (look === 'rail' && rail) {
        return (
            <div className="bg-slate-50">
                <div className={`${CONTAINER.rail} grid gap-6 py-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-10 lg:py-12`}>
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
                                            {nav.map((n) => {
                                                const cls = `flex w-full items-center justify-between gap-3 whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                                                    n.active ? 'bg-primary-50 text-primary-700' : 'text-slate-700 hover:bg-primary-50 hover:text-primary-700'
                                                }`
                                                return (
                                                    <li key={n.id}>
                                                        {n.onSelect ? (
                                                            <button type="button" onClick={() => n.onSelect(n.id)} aria-pressed={!!n.active} className={cls}>
                                                                {n.label}
                                                            </button>
                                                        ) : (
                                                            <a href={`#${n.id}`} className={cls}>
                                                                {n.label} <FiArrowRight size={14} aria-hidden="true" />
                                                            </a>
                                                        )}
                                                    </li>
                                                )
                                            })}
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

    const Tabs = tabs.length > 0 && (
        <div className={look === 'split' ? 'mt-8 inline-flex flex-wrap gap-1 rounded-full border border-slate-200 bg-white p-1 shadow-sm' : 'mt-8 flex flex-wrap gap-x-6 border-b border-slate-300'} role="tablist">
            {tabs.map((t) => (
                <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={!!t.active}
                    onClick={() => t.onSelect(t.id)}
                    className={
                        look === 'split'
                            ? `rounded-full px-4 py-2 text-sm font-semibold transition ${t.active ? 'bg-primary-700 text-white' : 'text-slate-700 hover:bg-primary-50 hover:text-primary-700'}`
                            : `-mb-px border-b-2 py-3 text-base font-semibold transition ${t.active ? 'border-primary-600 text-slate-900' : 'border-transparent text-slate-600 hover:border-slate-400 hover:text-slate-900'}`
                    }
                >
                    {t.label}
                </button>
            ))}
        </div>
    )

    if (look === 'rail') {
        return (
            <div className="bg-slate-50">
                <div className={`${CONTAINER.rail} space-y-6 py-8 lg:py-10`}>
                    <header className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className={`border-t-4 border-site-900 p-6 sm:p-8 ${media ? 'grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center' : ''}`}>
                            <div>
                                <BackLink back={back} className="-mt-1 mb-3" />
                                {kicker && <Kicker>{kicker}</Kicker>}
                                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
                                {lede && <p className="mt-3 max-w-3xl leading-relaxed text-slate-600">{lede}</p>}
                                {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
                                {Tabs}
                            </div>
                            {media && <div className="overflow-hidden rounded-xl">{media}</div>}
                        </div>
                    </header>
                    {children}
                </div>
            </div>
        )
    }

    if (look === 'banded') {
        return (
            <>
                <header className="border-b border-slate-200 bg-site-100/40">
                    <div className={`${CONTAINER.banded} py-10 sm:py-14 ${media ? 'grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center' : ''}`}>
                        <div>
                            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                                <Link to="/tuc" className="py-1 hover:text-primary-700">Cognitive Software</Link>
                                {back && <><span aria-hidden="true">/</span><Link to={back.to} className="py-1 hover:text-primary-700">{back.label}</Link></>}
                                <span aria-hidden="true">/</span>
                                <span className="font-semibold text-slate-900">{title}</span>
                            </nav>
                            <span className="mt-6 block h-1 w-12 rounded-full bg-site-900" />
                            {kicker && <Kicker className="mt-4">{kicker}</Kicker>}
                            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
                            {lede && <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-700">{lede}</p>}
                            {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
                            {!media && Tabs}
                        </div>
                        {media && <div className="overflow-hidden rounded-2xl shadow-xl">{media}</div>}
                    </div>
                    {media && Tabs && <div className={CONTAINER.banded}>{Tabs}</div>}
                </header>
                {children}
            </>
        )
    }

    // split
    return (
        <>
            <header className="bg-gradient-to-b from-site-100/70 via-site-100/20 to-white">
                <div className={`${CONTAINER.split} pb-10 pt-10 sm:pt-14 ${media ? 'grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]' : ''}`}>
                    <div>
                        <BackLink back={back} className="mb-6" />
                        {kicker && <Kicker>{kicker}</Kicker>}
                        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{title}</h1>
                        {lede && <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">{lede}</p>}
                        {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
                        {Tabs}
                    </div>
                    {media && <div className="overflow-hidden rounded-3xl shadow-xl shadow-site-900/10">{media}</div>}
                </div>
            </header>
            {children}
        </>
    )
}

/** A titled block of the page. `tone="tint"` gives Split and Banded a pale accent band. */
export const Section = ({ id, kicker, title, intro, tone, children, className = '' }) => {
    const look = useLook()
    if (look === 'rail') {
        return (
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
    }
    const tint = tone === 'tint' ? 'bg-site-100/40' : ''
    if (look === 'banded') {
        return (
            <section id={id} className={`scroll-mt-28 ${tint} ${className}`}>
                <div className={`${CONTAINER.banded} py-12 sm:py-16`}>
                    {title && (
                        <div className="text-center">
                            <span className="mx-auto block h-1 w-12 rounded-full bg-site-900" />
                            {kicker && <Kicker className="mt-4">{kicker}</Kicker>}
                            <h2 className="mt-3 text-3xl font-bold tracking-tight">{title}</h2>
                            {intro && <p className="mx-auto mt-3 max-w-2xl text-slate-600">{intro}</p>}
                        </div>
                    )}
                    <div className={title ? 'mt-10' : ''}>{children}</div>
                </div>
            </section>
        )
    }
    return (
        <section id={id} className={`scroll-mt-20 ${tint} ${className}`}>
            <div className={`${CONTAINER.split} py-12 sm:py-16`}>
                {kicker && <Kicker>{kicker}</Kicker>}
                {title && <h2 className="mt-2 text-3xl font-bold">{title}</h2>}
                {intro && <p className="mt-3 max-w-3xl leading-relaxed text-slate-600">{intro}</p>}
                <div className={title || intro ? 'mt-8' : ''}>{children}</div>
            </div>
        </section>
    )
}

/** Surface for grouped content. `interactive` adds the hover lift used on linked cards. */
export const Card = ({ as: Tag = 'div', interactive = false, className = '', children, ...rest }) => {
    const look = useLook()
    const base = {
        split: 'rounded-2xl border border-slate-200 bg-white shadow-sm',
        rail: 'rounded-xl border border-slate-200 bg-white',
        banded: 'rounded-2xl border border-slate-200 bg-white shadow-sm',
    }[look]
    const hover = interactive ? 'transition duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary-500' : ''
    return (
        <Tag className={`${base} ${hover} ${className}`} {...rest}>
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

/** Closing call to action: light surface, one green button. */
export const ContactBand = ({ title, text, href, label, icon: Icon, kicker }) => {
    const look = useLook()
    const inner = (
        <div className={`grid gap-6 p-6 sm:p-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center ${
            look === 'rail' ? '' : look === 'split' ? 'rounded-3xl border border-site-200 bg-site-100/40' : 'rounded-2xl border border-slate-200 bg-white shadow-sm'
        }`}>
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
    )
    if (look === 'rail') return <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">{inner}</section>
    return (
        <section className={look === 'banded' ? 'bg-slate-50' : ''}>
            <div className={`${CONTAINER[look]} py-12 sm:py-16`}>{inner}</div>
        </section>
    )
}

/** Primary and secondary action buttons, shared so every page uses the same two. */
export const ButtonLink = ({ to, href, children, variant = 'primary', className = '', ...rest }) => {
    const cls =
        variant === 'primary'
            ? 'inline-flex items-center gap-2 rounded-full bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-800 hover:shadow-md'
            : 'inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-primary-600 hover:text-primary-700'
    return to ? <Link to={to} className={`${cls} ${className}`} {...rest}>{children}</Link> : <a href={href} className={`${cls} ${className}`} {...rest}>{children}</a>
}
