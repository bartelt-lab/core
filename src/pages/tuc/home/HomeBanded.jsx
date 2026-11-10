import { Link } from 'react-router-dom'
import { FiArrowRight, FiMail, FiMapPin } from 'react-icons/fi'
import assetUrl from '../../../utils/assetUrl'
import { useLanguage } from '../../../i18n/useLanguage'
import { MemberPhoto, MemberLinks, FontLink } from './shared'
import { groupMembers, stats, hero, about, topics, work, affiliations, contact, labPhoto, roleLabel, displayName } from './content'

const FONTS = 'https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&display=swap'
const source = "font-['Source_Sans_3',Inter,sans-serif]"

// Section title with a short accent rule above it, centred.
const Title = ({ children, sub }) => (
    <div className="text-center">
        <span className="mx-auto block h-1 w-12 rounded-full bg-site-900" />
        <h2 className="mt-4 text-3xl font-bold tracking-tight">{children}</h2>
        {sub && <p className="mx-auto mt-2 max-w-2xl text-slate-600">{sub}</p>}
    </div>
)

const Member = ({ m, txt, size = 'h-28 w-28' }) => (
    <li className="group flex w-[9.5rem] flex-col sm:w-44 items-center text-center">
        <MemberPhoto member={m} className={`${size} rounded-full ring-4 ring-white shadow-md transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:ring-site-100`} />
        <h3 className="mt-3 font-semibold leading-snug">{displayName(m)}</h3>
        <p className="text-sm text-slate-600">{txt(roleLabel(m))}</p>
        <MemberLinks member={m} className="mt-1 justify-center text-slate-500 [&_a:hover]:bg-primary-50 [&_a:hover]:text-primary-700" />
    </li>
)

const HomeBanded = () => {
    const { pick } = useLanguage()
    const txt = (pair) => pick(pair[1], pair[0])
    const { lead, postdocs, phds, assistants, support } = groupMembers()
    const groups = [
        { title: ['Postdocs', 'Postdocs'], list: postdocs },
        { title: ['Promovierende', 'PhD students'], list: phds },
        { title: ['Wissenschaftliche Hilfskräfte', 'Research assistants'], list: assistants },
        { title: ['Unterstützung', 'Support'], list: support },
    ].filter((g) => g.list.length)

    return (
        <div className={`${source} bg-white text-slate-900 [&_:is(h1,h2,h3)]:font-[inherit]`}>
            <FontLink href={FONTS} />

            {/* Photo band with overlapping intro card */}
            <section id="hero" className="relative">
                <div className="relative h-64 sm:h-80 lg:h-[26rem]">
                    <img src={assetUrl(labPhoto.src)} alt={txt(labPhoto.alt)} decoding="async" className="h-full w-full object-cover" style={{ objectPosition: '45% 22%' }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                                    </div>
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="relative -mt-20 grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:-mt-24 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wider text-site-900">{txt(hero.kicker)}</p>
                            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">Cognitive Software</h1>
                            <p className="mt-4 max-w-2xl text-lg text-slate-600">{txt(hero.lede)}</p>
                        </div>
                        <dl className="grid grid-cols-3 gap-4 lg:flex lg:flex-col lg:gap-3 lg:border-l lg:border-slate-200 lg:pl-8">
                            {stats().map((s) => (
                                <div key={s.label[1]} className="flex flex-col lg:flex-row lg:items-baseline lg:gap-2">
                                    <dd className="text-3xl font-bold text-site-900">{s.value}</dd>
                                    <dt className="text-sm text-slate-600">{txt(s.label)}</dt>
                                </div>
                            ))}
                        </dl>
                    </div>
                    <p className="mt-3 text-xs text-slate-500">{txt(labPhoto.caption)}</p>
                </div>
            </section>

            {/* People */}
            <section id="people" className="scroll-mt-28">
                <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
                    <Title sub={pick('Researchers, students and staff of the Cognitive Software group.', 'Forschende, Studierende und Mitarbeitende der Gruppe Cognitive Software.')}>
                        {pick('Our group', 'Unsere Gruppe')}
                    </Title>

                    {lead && (
                        <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-6 rounded-2xl bg-site-100/40 p-6 text-center sm:flex-row sm:p-8 sm:text-left">
                            <MemberPhoto member={lead} className="h-36 w-36 shrink-0 rounded-full ring-4 ring-white shadow-lg" />
                            <div>
                                <p className="text-sm font-semibold text-site-900">{txt(roleLabel(lead))}</p>
                                <h3 className="text-2xl font-bold">{displayName(lead)}</h3>
                                <p className="mt-2 text-slate-700">{lead.bio}</p>
                                <MemberLinks member={lead} className="-ml-2 mt-2 justify-center text-slate-500 sm:justify-start [&_a:hover]:bg-white [&_a:hover]:text-primary-700" />
                            </div>
                        </div>
                    )}

                    {groups.map((g) => (
                        <div key={g.title[1]} className="mt-14">
                            <div className="flex items-center gap-4">
                                <span className="h-px flex-1 bg-slate-200" />
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-600">{txt(g.title)}</h3>
                                <span className="h-px flex-1 bg-slate-200" />
                            </div>
                            <ul className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-10 sm:gap-x-6">
                                {g.list.map((m) => <Member key={m.slug} m={m} txt={txt} size={g.list === phds || g.list === postdocs ? 'h-28 w-28' : 'h-20 w-20'} />)}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Research */}
            <section id="research" className="bg-site-100/40">
                <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
                    <Title>{pick('Research', 'Forschung')}</Title>
                    <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-relaxed text-slate-700">{txt(about)}</p>
                    <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {topics.map((t) => (
                            <li key={t.title[1]} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-site-200">
                                <h3 className="text-xl font-bold leading-snug">{txt(t.title)}</h3>
                                <p className="mt-2 text-slate-600">{txt(t.text)}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Work */}
            <section id="work">
                <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
                    <Title>{pick('Our work', 'Unsere Arbeit')}</Title>
                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {work.map((w) => (
                            <Link key={w.to} to={w.to} className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg">
                                <h3 className="text-xl font-bold group-hover:text-primary-700">{txt(w.title)}</h3>
                                <p className="mt-2 flex-1 text-slate-600">{txt(w.text)}</p>
                                <span className="mt-5 inline-flex items-center gap-1 font-semibold text-primary-700">
                                    {pick('More', 'Mehr')} <FiArrowRight className="transition group-hover:translate-x-1" />
                                </span>
                            </Link>
                        ))}
                    </div>
                    <div className="mt-10 text-center">
                        <Link to="/tuc/join-us" className="inline-flex items-center gap-2 rounded-lg bg-primary-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-primary-800 hover:shadow-md">
                            {pick('Open positions and theses', 'Offene Stellen und Abschlussarbeiten')} <FiArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="border-t border-slate-200 bg-slate-50">
                <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:items-center">
                    <div>
                        <h2 className="text-2xl font-bold">{pick('Contact', 'Kontakt')}</h2>
                        <div className="mt-4 space-y-2 text-lg text-slate-700">
                            <a href={`mailto:${contact.email}`} className="flex items-center gap-3 hover:text-primary-700"><FiMail className="text-site-900" /> {contact.email}</a>
                            <a href={contact.map} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-primary-700"><FiMapPin className="text-site-900" /> {contact.address}</a>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-10 gap-y-5 md:justify-end">
                        {affiliations.map((a) => {
                            const img = <img src={assetUrl(a.logo)} alt={a.name} decoding="async" className="h-12 w-auto object-contain" />
                            return a.to ? <Link key={a.name} to={a.to}>{img}</Link> : <a key={a.name} href={a.href} target="_blank" rel="noreferrer">{img}</a>
                        })}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomeBanded
