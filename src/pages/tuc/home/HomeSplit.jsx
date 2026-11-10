import { Link } from 'react-router-dom'
import { FiArrowRight, FiBriefcase, FiBookOpen, FiUsers, FiFileText, FiMail, FiMapPin } from 'react-icons/fi'
import assetUrl from '../../../utils/assetUrl'
import { useLanguage } from '../../../i18n/useLanguage'
import { MemberPhoto, MemberLinks, FontLink } from './shared'
import { groupMembers, stats, hero, about, topics, work, affiliations, contact, labPhoto, roleLabel, displayName } from './content'

const FONTS = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&display=swap'
const head = "font-['Plus_Jakarta_Sans',Inter,sans-serif]"
const WORK_ICONS = [FiBriefcase, FiBookOpen, FiUsers, FiFileText]

const Eyebrow = ({ children }) => (
    <p className="inline-flex items-center gap-2 text-sm font-semibold text-site-900">
        <span className="h-1.5 w-1.5 rounded-full bg-site-900" />
        {children}
    </p>
)

const HomeSplit = () => {
    const { pick } = useLanguage()
    const txt = (pair) => pick(pair[1], pair[0])
    const { lead, researchers, assistants, support } = groupMembers()

    return (
        <div className="bg-white text-slate-900 [&_h3]:font-['Plus_Jakarta_Sans',Inter,sans-serif]">
            <FontLink href={FONTS} />

            {/* Hero: text left, lab photo right with stats overlapping */}
            <section id="hero" className="bg-gradient-to-b from-site-100/70 via-site-100/20 to-white">
                <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:pb-20">
                    <div>
                        <Eyebrow>{txt(hero.kicker)}</Eyebrow>
                        <h1 className={`${head} mt-4 text-4xl font-bold sm:text-5xl`}>Cognitive Software</h1>
                        <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">{txt(hero.lede)}</p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <a href="#people" className="inline-flex items-center gap-2 rounded-full bg-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-800 hover:shadow-md">
                                {pick('Meet the group', 'Das Team')} <FiArrowRight />
                            </a>
                            <Link to="/tuc/join-us" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-primary-600 hover:text-primary-700">
                                {pick('Join us', 'Mitmachen')}
                            </Link>
                        </div>
                    </div>
                    <figure className="relative">
                        <img
                            src={assetUrl(labPhoto.src)}
                            alt={txt(labPhoto.alt)}
                            decoding="async"
                            className="aspect-[3/2] w-full rounded-3xl object-cover shadow-xl shadow-site-900/10"
                            style={{ objectPosition: '45% 50%' }}
                        />
                        <dl className="relative -mt-10 ml-4 mr-4 grid grid-cols-3 gap-2 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur sm:absolute sm:-bottom-8 sm:left-6 sm:right-auto sm:m-0 sm:gap-6 sm:px-6">
                            {stats().map((s) => (
                                <div key={s.label[1]}>
                                    <dd className={`${head} text-2xl font-bold text-site-900`}>{s.value}</dd>
                                    <dt className="text-xs text-slate-600">{txt(s.label)}</dt>
                                </div>
                            ))}
                        </dl>
                        <figcaption className="mt-3 text-xs text-slate-500 sm:mt-14">{txt(labPhoto.caption)}</figcaption>
                    </figure>
                </div>
            </section>

            {/* People */}
            <section id="people" className="scroll-mt-20">
                <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
                    <Eyebrow>{pick('People', 'Personen')}</Eyebrow>
                    <h2 className={`${head} mt-2 text-3xl font-bold`}>{pick('The group', 'Die Gruppe')}</h2>

                    {lead && (
                        <article className="mt-8 flex flex-col gap-6 rounded-3xl border border-slate-200 bg-site-100/30 p-6 sm:flex-row sm:items-center sm:p-8">
                            <MemberPhoto member={lead} className="h-32 w-32 shrink-0 rounded-2xl" />
                            <div>
                                <h3 className={`${head} text-2xl font-bold`}>{displayName(lead)}</h3>
                                <p className="mt-1 text-sm font-medium text-site-900">{txt(roleLabel(lead))}</p>
                                <p className="mt-3 max-w-2xl text-slate-600">{lead.bio}</p>
                                <MemberLinks member={lead} className="-ml-2 mt-2 text-slate-500 [&_a:hover]:bg-primary-50 [&_a:hover]:text-primary-700" />
                            </div>
                        </article>
                    )}

                    <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                        {researchers.map((m) => (
                            <li key={m.slug} className="group rounded-2xl border border-slate-200 bg-white p-3 transition hover:-translate-y-1 hover:border-site-200 hover:shadow-lg hover:shadow-site-900/10">
                                <MemberPhoto member={m} className="aspect-square w-full rounded-xl" imgClassName="transition duration-500 group-hover:scale-105" />
                                <h3 className="mt-3 font-semibold leading-snug">{displayName(m)}</h3>
                                <p className="text-sm text-slate-600">{txt(roleLabel(m))}</p>
                                <MemberLinks member={m} className="-ml-2 mt-1 text-slate-500 [&_a:hover]:bg-primary-50 [&_a:hover]:text-primary-700" />
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        {[
                            { title: ['Wissenschaftliche Hilfskräfte', 'Research assistants'], list: assistants },
                            { title: ['Unterstützung', 'Support'], list: support },
                        ].map((g) => (
                            <div key={g.title[1]} className="rounded-2xl border border-slate-200 p-5">
                                <p className="text-sm font-semibold text-slate-700">{txt(g.title)}</p>
                                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-4">
                                    {g.list.map((m) => (
                                        <li key={m.slug} className="flex items-center gap-3">
                                            <MemberPhoto member={m} className="h-11 w-11 shrink-0 rounded-full text-[10px]" />
                                            <div>
                                                <p className="text-sm font-semibold">{displayName(m)}</p>
                                                <p className="text-xs text-slate-600">{txt(roleLabel(m))}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Research */}
            <section id="research" className="bg-site-100/40">
                <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
                    <Eyebrow>{pick('Research', 'Forschung')}</Eyebrow>
                    <h2 className={`${head} mt-2 text-3xl font-bold`}>{pick('Six research directions', 'Sechs Forschungsrichtungen')}</h2>
                    <p className="mt-5 max-w-3xl leading-relaxed text-slate-700">{txt(about)}</p>
                    <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {topics.map((t, i) => (
                            <li key={t.title[1]} className="rounded-2xl border border-site-200 bg-white p-6 shadow-sm">
                                <span className="text-sm font-bold tabular-nums text-site-900">{String(i + 1).padStart(2, '0')}</span>
                                <h3 className="mt-2 text-lg font-bold leading-snug">{txt(t.title)}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">{txt(t.text)}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Work */}
            <section id="work">
                <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
                    <Eyebrow>{pick('Our work', 'Unsere Arbeit')}</Eyebrow>
                    <h2 className={`${head} mt-2 text-3xl font-bold`}>{pick('Projects, teaching, papers', 'Projekte, Lehre, Paper')}</h2>
                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {work.map((w, i) => {
                            const Icon = WORK_ICONS[i]
                            return (
                                <Link key={w.to} to={w.to} className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg">
                                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-site-100 text-site-900">
                                        <Icon size={20} />
                                    </span>
                                    <h3 className={`${head} mt-5 text-lg font-bold`}>{txt(w.title)}</h3>
                                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{txt(w.text)}</p>
                                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary-700">
                                        {pick('Open', 'Öffnen')} <FiArrowRight className="transition group-hover:translate-x-1" />
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="pb-14 sm:pb-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 lg:grid-cols-2 lg:items-center">
                        <div>
                            <h2 className={`${head} text-2xl font-bold`}>{pick('Contact', 'Kontakt')}</h2>
                            <div className="mt-4 space-y-2 text-slate-700">
                                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 hover:text-primary-700"><FiMail className="text-site-900" /> {contact.email}</a>
                                <a href={contact.map} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-primary-700"><FiMapPin className="text-site-900" /> {contact.address}</a>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-8 gap-y-5 lg:justify-end">
                            {affiliations.map((a) => {
                                const img = <img src={assetUrl(a.logo)} alt={a.name} decoding="async" className="h-11 w-auto object-contain" />
                                return a.to ? <Link key={a.name} to={a.to}>{img}</Link> : <a key={a.name} href={a.href} target="_blank" rel="noreferrer">{img}</a>
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomeSplit
