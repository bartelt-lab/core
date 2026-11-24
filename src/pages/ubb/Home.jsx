import { Link } from 'react-router-dom'
import { FiArrowRight, FiArrowUpRight, FiMapPin } from 'react-icons/fi'
import { FaRobot } from 'react-icons/fa'
import PublicationsSection from '../../components/publications/PublicationsSection'
import ShellLink from '../../components/common/ShellLink'
import ThirdPartyLogo from '../../components/common/ThirdPartyLogo'
import { MemberPhoto, MemberLinks } from '../tuc/home/shared'
import { getMemberBySlug, getMembersByInstitution, institutions } from '../../data/team'
import assetUrl from '../../utils/assetUrl'
import { useLanguage } from '../../i18n/useLanguage'

// CORE Cluj: the page of the network's researchers at Babeș-Bolyai University.
// It is the group's page, built like the /tuc home page: people, research,
// the Robotics Club, contact. The laboratories themselves are not described
// here: everything about them is on /core-labs, and this page links there.
//
// Text pairs are [German, English]. People, their titles, emails and links
// come from data/team.js.

const SECTIONS = [
  { id: 'people', label: ['Personen', 'People'] },
  { id: 'research', label: ['Forschung', 'Research'] },
  { id: 'robotics-club', label: ['Robotics Club', 'Robotics Club'] },
  { id: 'labs', label: ['Labore', 'Labs'] },
  { id: 'contact', label: ['Kontakt', 'Contact'] },
]

const hero = {
  photo: {
    src: '/images/ubb/robotics-club-meeting.webp',
    alt: [
      'Ein Treffen des Robotics Club: etwa ein Dutzend Studierende sitzen mit Laptops im Kreis, auf einem Tisch steht ein kleiner Roboter auf Rädern.',
      'A Robotics Club meeting: about a dozen students sit in a circle with laptops, and a small wheeled robot stands on a table.',
    ],
  },
  lede: [
    'Forschende an der Babeș-Bolyai-Universität in Cluj-Napoca, Teil des CORE Network.',
    'Researchers at Babeș-Bolyai University in Cluj-Napoca, part of the CORE Network.',
  ],
}

// Who leads the group, and who answers what.
const LEAD = 'sacarea'
const CONTACTS = [
  { about: ['Promotion', 'PhD'], member: 'sacarea' },
  { about: ['Robotics Club', 'Robotics Club'], member: 'benta' },
]

const about = [
  'Wir arbeiten an autonomem Fahren, Simulation, Machine Learning und formalen Methoden. Studierende können im Robotics Club mitmachen, und unsere Labore gehören zu den CORE Labs.',
  'We work on autonomous driving, simulation, machine learning and formal methods. Students can join the Robotics Club, and our laboratories are part of CORE Labs.',
]

// Each area is drawn from the group's publications and from team.js; add to
// this list rather than widening the wording.
const topics = [
  {
    title: ['Autonomes Fahren', 'Autonomous driving'],
    text: [
      'Sehen für intelligente Fahrzeuge, modulare Simulation und Benchmarks, erprobt auf Forschungsfahrzeugen im Maßstab 1:10.',
      'Vision for intelligent vehicles, modular simulation and benchmarking, tried out on 1:10-scale research vehicles.',
    ],
  },
  {
    title: ['Machine Learning', 'Machine learning'],
    text: [
      'Föderiertes Lernen, wenn die beteiligten Geräte unterschiedlich viel Rechenleistung haben.',
      'Federated learning when the participating devices differ in compute.',
    ],
  },
  {
    title: ['Formale Methoden und KI', 'Formal methods and AI'],
    text: ['Formale Methoden in Verbindung mit künstlicher Intelligenz.', 'Formal methods combined with artificial intelligence.'],
  },
  {
    title: ['Embodied AI', 'Embodied AI'],
    text: ['In Vorbereitung: eine humanoide Roboterplattform in den CORE Labs.', 'In preparation: a humanoid robot platform in CORE Labs.'],
  },
]

// What the group has in CORE Labs. Both entries are sections of /core-labs.
const labs = [
  {
    to: '/core-labs#autonomous',
    title: ['Labor für autonomes Fahren', 'Autonomous driving lab'],
    text: ['Demonstrationen zu Fahrzeugsehen, Simulation und Planung.', 'Demonstrations of vehicle vision, simulation and planning.'],
  },
  {
    to: '/core-labs#cluj',
    title: ['Humanoide Robotik', 'Humanoid robotics'],
    text: ['Eine neue Plattform für Embodied AI, im Aufbau.', 'A new platform for embodied AI, being set up.'],
  },
]

const ROLES = {
  Professor: ['Professor', 'Professor'],
  Lecturer: ['Lektor', 'Lecturer'],
  'PhD Student': ['Doktorand', 'PhD student'],
}
const roleLabel = (member) => ROLES[member.title] ?? [member.title, member.title]
const displayName = (member) => (member.prefix ? `${member.prefix} ${member.name}` : member.name)

const CARD = 'scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8'

const H2 = ({ children }) => (
  <h2 className="flex items-center gap-3 text-2xl font-semibold">
    <span className="h-6 w-1 rounded-full bg-site-900 dark:bg-site-300" />
    {children}
  </h2>
)

const Person = ({ member, txt, lead = false }) => (
  <li className="flex items-center gap-4 rounded-xl p-3">
    <MemberPhoto member={member} className={`${lead ? 'h-24 w-24' : 'h-16 w-16'} shrink-0 rounded-full shadow ring-2 ring-white`} />
    <div className="min-w-0">
      <h3 className={`font-semibold leading-snug ${lead ? 'text-xl' : ''}`}>{displayName(member)}</h3>
      <p className="text-sm text-slate-600">{txt(roleLabel(member))}</p>
      <MemberLinks member={member} className="-ml-2 text-slate-500 [&_a:hover]:bg-slate-100 [&_a:hover]:text-primary-700" />
    </div>
  </li>
)

// A person to write to: an email link, else their own page, else the name alone.
const ContactName = ({ member }) => {
  const name = displayName(member)
  const href = member.email ? `mailto:${member.email}` : member.links?.website
  if (!href) return name
  return (
    <a href={href} target={member.email ? undefined : '_blank'} rel="noreferrer" className="font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-800">
      {name}
    </a>
  )
}

const UbbHome = () => {
  const { pick } = useLanguage()
  const txt = (pair) => pick(pair[1], pair[0])

  const members = getMembersByInstitution('UBB')
  const lead = members.find((member) => member.slug === LEAD)
  const others = members.filter((member) => member.slug !== LEAD)
  const clubContact = getMemberBySlug('benta')
  const department = lead?.affiliations.find((affiliation) => affiliation.institution === institutions.UBB)?.department

  return (
    <div className="bg-slate-50 text-slate-900">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-12 lg:py-12">
        {/* Identity rail. Sticky only where it fits: with the photo it is
            about 760px tall, so on shorter screens it scrolls with the page. */}
        <aside id="hero" className="lg:self-start lg:[@media(min-height:58rem)]:sticky lg:[@media(min-height:58rem)]:top-28">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <img src={assetUrl(hero.photo.src)} alt={txt(hero.photo.alt)} width="1600" height="1200" decoding="async" fetchPriority="high" className="aspect-[4/3] w-full object-cover" />
            <div className="border-t-4 border-site-900 p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-site-900">CORE Network · Cluj-Napoca</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight">
                CORE{' '}
                {/* inline-block matters: bg-clip-text masks the gradient with
                    the glyphs, but the gradient is sized to the box. */}
                <span className="wordmark-partnership inline-block bg-clip-text text-transparent">Cluj</span>
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{txt(hero.lede)}</p>
              <nav className="mt-5 hidden border-t border-slate-200 pt-4 lg:block" aria-label={pick('On this page', 'Auf dieser Seite')}>
                <ul className="space-y-0.5">
                  {SECTIONS.map((section) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`} className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-site-100/60 hover:text-site-900">
                        {txt(section.label)} <FiArrowRight size={14} aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <ShellLink to="/join-us#positions" className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-primary-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-800">
                {pick('Join us', 'Mitmachen')} <FiArrowRight aria-hidden="true" />
              </ShellLink>
            </div>
          </div>
        </aside>

        <div className="min-w-0 space-y-8">
          <section id="people" className={CARD}>
            <H2>{pick('The group', 'Die Gruppe')}</H2>
            <ul className="mt-5">
              {lead && <Person member={lead} txt={txt} lead />}
            </ul>
            <ul className="mt-2 grid gap-1 sm:grid-cols-2">
              {others.map((member) => <Person key={member.slug} member={member} txt={txt} />)}
            </ul>
          </section>

          <section id="research" className={CARD}>
            <H2>{pick('Research', 'Forschung')}</H2>
            <p className="mt-4 max-w-3xl leading-relaxed text-slate-700">{txt(about)}</p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {topics.map((topic) => (
                <li key={topic.title[1]} className="rounded-lg bg-site-100/50 px-4 py-3">
                  <h3 className="text-sm font-semibold">{txt(topic.title)}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{txt(topic.text)}</p>
                </li>
              ))}
            </ul>
            <div id="publications" className="mt-8 scroll-mt-24 border-t border-slate-200 pt-6">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <h3 className="text-lg font-semibold">{pick('Recent publications', 'Aktuelle Publikationen')}</h3>
                <ShellLink to="/publications?institution=UBB" className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-800">
                  {pick('All publications from Cluj', 'Alle Publikationen aus Cluj')} <FiArrowRight size={14} aria-hidden="true" />
                </ShellLink>
              </div>
              <PublicationsSection limit={3} layout="rotator" title="" subtitle="" compact initialInstitution="UBB" sectionId={null} />
            </div>
          </section>

          <section id="robotics-club" className={CARD}>
            <p className="text-xs font-semibold uppercase tracking-wider text-site-900">{pick('New · For students', 'Neu · Für Studierende')}</p>
            <H2>Robotics Club</H2>
            <p className="mt-4 max-w-3xl leading-relaxed text-slate-700">
              {pick(
                'CORE Cluj now has a Robotics Club. Students are welcome to join.',
                'CORE Cluj hat jetzt einen Robotics Club. Studierende sind herzlich eingeladen mitzumachen.',
              )}
            </p>
            <div className="mt-6 flex w-fit items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-site-100 text-site-900">
                <FaRobot aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-500">{pick('To join, get in touch with', 'Zum Mitmachen wenden Sie sich an')}</p>
                <p className="font-semibold text-slate-950"><ContactName member={clubContact} /></p>
              </div>
            </div>
          </section>

          <section id="labs" className={CARD}>
            <H2>{pick('Our labs', 'Unsere Labore')}</H2>
            <p className="mt-4 max-w-3xl leading-relaxed text-slate-700">
              {pick(
                'Our laboratories are part of CORE Labs, the laboratories the network runs together in Goslar, Cluj-Napoca and Rostock. What they hold and what runs in them is on the CORE Labs page.',
                'Unsere Labore gehören zu den CORE Labs, den Laboren, die das Netzwerk gemeinsam in Goslar, Cluj-Napoca und Rostock betreibt. Was dort steht und läuft, zeigt die Seite der CORE Labs.',
              )}
            </p>
            <ul className="mt-4 divide-y divide-slate-200">
              {labs.map((lab) => (
                <li key={lab.to}>
                  <ShellLink to={lab.to} className="group flex items-center gap-4 rounded-lg px-3 py-4 transition hover:bg-site-100/50">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold group-hover:text-primary-700">{txt(lab.title)}</h3>
                      <p className="mt-0.5 text-sm text-slate-600">{txt(lab.text)}</p>
                    </div>
                    <FiArrowUpRight className="shrink-0 text-slate-400 transition group-hover:text-primary-700" size={20} aria-hidden="true" />
                  </ShellLink>
                </li>
              ))}
            </ul>
          </section>

          <section id="contact" className={CARD}>
            <H2>{pick('Contact', 'Kontakt')}</H2>
            <div className="mt-4 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
              <div className="space-y-4 text-slate-700">
                <dl className="space-y-2">
                  {CONTACTS.map((contact) => (
                    <div key={contact.about[1]} className="flex flex-wrap gap-x-2">
                      <dt className="font-semibold text-slate-900">{txt(contact.about)}:</dt>
                      <dd><ContactName member={getMemberBySlug(contact.member)} /></dd>
                    </div>
                  ))}
                </dl>
                <p className="flex items-start gap-3 text-sm">
                  <FiMapPin className="mt-0.5 shrink-0 text-site-900" aria-hidden="true" />
                  <span>
                    {institutions.UBB.name}
                    {department && <>, {department}</>}
                    <br />
                    {institutions.UBB.location}
                  </span>
                </p>
              </div>
              <a href={institutions.UBB.website} target="_blank" rel="noreferrer" className="w-fit">
                <ThirdPartyLogo src="/logos/ubb-logo.webp" alt={institutions.UBB.name} decoding="async" className="h-14 w-auto max-w-full object-contain" />
              </a>
            </div>
            <p className="mt-6 border-t border-slate-200 pt-4 text-sm text-slate-600">
              {pick('PhD positions and the other groups of the network:', 'Promotionsstellen und die anderen Gruppen des Netzwerks:')}{' '}
              <Link to="/join-us#positions" className="font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-800">
                {pick('Join us', 'Mitmachen')}
              </Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default UbbHome
