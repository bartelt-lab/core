import { Link } from 'react-router-dom'
import { FiArrowRight, FiArrowUpRight, FiMail, FiMapPin } from 'react-icons/fi'
import assetUrl from '../../utils/assetUrl'
import { useLanguage } from '../../i18n/useLanguage'
import { MemberPhoto, MemberLinks } from './home/shared'
import { groupMembers, stats, hero, about, topics, work, affiliations, contact, groupPhoto, roleLabel, displayName } from './home/content'


const SECTIONS = [
    { id: 'people', label: ['Personen', 'People'] },
    { id: 'research', label: ['Forschung', 'Research'] },
    { id: 'work', label: ['Arbeit', 'Work'] },
    { id: 'contact', label: ['Kontakt', 'Contact'] },
]

const H2 = ({ children }) => (
    <h2 className={`flex items-center gap-3 text-2xl font-semibold`}>
        <span className="h-6 w-1 rounded-full bg-site-900" />
        {children}
    </h2>
)

const Person = ({ m, txt }) => (
    <li className="group flex items-center gap-4 rounded-xl p-3 transition hover:bg-site-100/50">
        <MemberPhoto member={m} className="h-16 w-16 shrink-0 rounded-full ring-2 ring-white shadow" />
        <div className="min-w-0">
            <h3 className="font-semibold leading-snug">{displayName(m)}</h3>
            <p className="text-sm text-slate-600">{txt(roleLabel(m))}</p>
            <MemberLinks member={m} className="-ml-2 text-slate-500 [&_a:hover]:bg-white [&_a:hover]:text-primary-700" />
        </div>
    </li>
)

// The group lead: same row as everyone else, just a bigger photo and name.
const LeadRow = ({ m, txt }) => (
    <div className="flex items-center gap-5 p-3">
        <MemberPhoto member={m} className="h-24 w-24 shrink-0 rounded-full ring-2 ring-white shadow" />
        <div className="min-w-0">
            <h3 className="text-xl font-semibold leading-snug">{displayName(m)}</h3>
            <p className="text-sm text-slate-600">{txt(roleLabel(m))}</p>
            <MemberLinks member={m} className="-ml-2 mt-1 text-slate-500 [&_a:hover]:bg-slate-100 [&_a:hover]:text-primary-700" />
        </div>
    </div>
)

const Home = () => {
    const { pick } = useLanguage()
    const txt = (pair) => pick(pair[1], pair[0])
    const { lead, researchers, assistants, support } = groupMembers()

    return (
        <div className="bg-slate-50 text-slate-900">
            <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-12 lg:py-12">
                {/* Identity rail */}
                {/* Sticky only where it fits: with the photo the sidebar is ~800px tall,
                    so on shorter screens (13" laptops) it scrolls with the page rather
                    than having its bottom, and the Join us button, cut off. */}
                <aside id="hero" className="lg:self-start lg:[@media(min-height:60rem)]:sticky lg:[@media(min-height:60rem)]:top-24">
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <img src={assetUrl(groupPhoto.src)} alt={txt(groupPhoto.alt)} width="1600" height="1200" decoding="async" fetchPriority="high" className="aspect-[4/3] w-full object-cover" />
                        <div className="border-t-4 border-site-900 p-6">
                            <p className="text-xs font-semibold uppercase tracking-wider text-site-900">ISSE · TU Clausthal</p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight">Cognitive Software</h1>
                            <p className="mt-3 text-sm leading-relaxed text-slate-600">{txt(hero.lede)}</p>
                            <dl className="mt-5 grid grid-cols-3 gap-2 border-y border-slate-200 py-4 text-center">
                                {stats().map((s) => (
                                    <div key={s.label[1]}>
                                        <dd className="text-xl font-bold text-site-900">{s.value}</dd>
                                        <dt className="text-[11px] leading-tight text-slate-600">{txt(s.label)}</dt>
                                    </div>
                                ))}
                            </dl>
                            <nav className="mt-4 hidden lg:block" aria-label={pick('On this page', 'Auf dieser Seite')}>
                                <ul className="space-y-0.5">
                                    {SECTIONS.map((s) => (
                                        <li key={s.id}>
                                            <a href={`#${s.id}`} className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-primary-50 hover:text-primary-700">
                                                {txt(s.label)} <FiArrowRight size={14} />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                            <Link to="/join-us" className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-primary-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-800">
                                {pick('Join us', 'Mitmachen')} <FiArrowRight />
                            </Link>
                        </div>
                    </div>
                </aside>

                {/* Content column */}
                <div className="min-w-0 space-y-8">
                    <section id="people" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                        <H2>{pick('The group', 'Die Gruppe')}</H2>
                        {lead && <div className="mt-5"><LeadRow m={lead} txt={txt} /></div>}
                        <ul className="mt-2 grid gap-1 sm:grid-cols-2">
                            {researchers.map((m) => <Person key={m.slug} m={m} txt={txt} />)}
                        </ul>
                        <div className="mt-6 grid gap-6 border-t border-slate-200 pt-6 md:grid-cols-2">
                            {[
                                { title: ['Wissenschaftliche Hilfskräfte', 'Research assistants'], list: assistants },
                                { title: ['Unterstützung', 'Support'], list: support },
                            ].map((g) => (
                                <div key={g.title[1]}>
                                    <p className="px-3 text-sm font-semibold text-slate-700">{txt(g.title)}</p>
                                    <ul className="mt-1">{g.list.map((m) => <Person key={m.slug} m={m} txt={txt} />)}</ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="research" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                        <H2>{pick('Research', 'Forschung')}</H2>
                        <p className="mt-4 max-w-3xl leading-relaxed text-slate-700">{txt(about)}</p>
                        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                            {topics.map((t, i) => (
                                <li key={t.title[1]} className="flex gap-3 rounded-lg bg-site-100/50 px-4 py-3">
                                    <span className="pt-0.5 text-xs font-semibold tabular-nums text-site-900">{String(i + 1).padStart(2, '0')}</span>
                                    <div>
                                        <h3 className="text-sm font-semibold">{txt(t.title)}</h3>
                                        <p className="mt-1 text-sm leading-relaxed text-slate-600">{txt(t.text)}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section id="work" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                        <H2>{pick('Our work', 'Unsere Arbeit')}</H2>
                        <ul className="mt-4 divide-y divide-slate-200">
                            {work.map((w) => (
                                <li key={w.to}>
                                    <Link to={w.to} className="group flex items-center gap-4 rounded-lg px-3 py-4 transition hover:bg-primary-50">
                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-semibold group-hover:text-primary-700">{txt(w.title)}</h3>
                                            <p className="mt-0.5 text-sm text-slate-600">{txt(w.text)}</p>
                                        </div>
                                        <FiArrowUpRight className="shrink-0 text-slate-400 transition group-hover:text-primary-700" size={20} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section id="contact" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                        <H2>{pick('Contact', 'Kontakt')}</H2>
                        <div className="mt-4 grid gap-6 md:grid-cols-2 md:items-center">
                            <div className="space-y-2 text-slate-700">
                                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 hover:text-primary-700"><FiMail className="text-site-900" /> {contact.email}</a>
                                <a href={contact.map} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-primary-700"><FiMapPin className="text-site-900" /> {contact.address}</a>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 md:justify-end">
                                {affiliations.map((a) => {
                                    const img = <img src={assetUrl(a.logo)} alt={a.name} decoding="async" className="h-10 w-auto object-contain" />
                                    return a.to ? <Link key={a.name} to={a.to}>{img}</Link> : <a key={a.name} href={a.href} target="_blank" rel="noreferrer">{img}</a>
                                })}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Home
