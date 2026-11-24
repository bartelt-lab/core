import { Link } from 'react-router-dom'
import { FiArrowDown, FiArrowRight, FiArrowUpRight, FiMapPin } from 'react-icons/fi'
import PublicationsSection from '../../components/publications/PublicationsSection'
import ShellLink from '../../components/common/ShellLink'
import ThirdPartyLogo from '../../components/common/ThirdPartyLogo'
import { MemberPhoto, MemberLinks } from '../tuc/home/shared'
import { getMemberBySlug, institutions } from '../../data/team'
import assetUrl from '../../utils/assetUrl'
import { useLanguage } from '../../i18n/useLanguage'

// CORE Cluj: the page of the network's researchers at Babeș-Bolyai University.
//
// The page is shaped by what there is to show, and no more:
//   - the Robotics Club, with the one photo of it: the lead of the page
//   - the group's publications
//   - what the group takes part in elsewhere in the network (links)
//   - the two people to write to
// There is no photo of the group and no list of members, so the page has
// neither a group picture nor a people grid; the two contacts are the people
// it shows. The laboratories are described on /core-labs only.
//
// Text pairs are [German, English]. Names, photos, emails and links of people
// come from data/team.js.

const lede = [
  'Forschende an der Babeș-Bolyai-Universität in Cluj-Napoca, Teil des CORE Network.',
  'Researchers at Babeș-Bolyai University in Cluj-Napoca, part of the CORE Network.',
]

const about = [
  'Wir arbeiten an autonomem Fahren, Simulation und Machine Learning, und für Studierende gibt es den Robotics Club.',
  'We work on autonomous driving, simulation and machine learning, and run a Robotics Club for students.',
]

const club = {
  contact: 'benta',
  photo: {
    src: '/images/ubb/robotics-club-meeting.webp',
    alt: [
      'Ein Treffen des Robotics Club: etwa ein Dutzend Studierende sitzen mit Laptops im Kreis, auf einem Tisch steht ein kleiner Roboter auf Rädern.',
      'A Robotics Club meeting: about a dozen students sit in a circle with laptops, and a small wheeled robot stands on a table.',
    ],
  },
}

// What the group takes part in on the network site. Each entry is a page or a
// section of one there.
const network = [
  {
    to: '/core-labs#autonomous',
    kicker: ['CORE Labs', 'CORE Labs'],
    title: ['Labor für autonomes Fahren', 'Autonomous driving lab'],
    text: ['Demonstrationen zu Fahrzeugsehen, Simulation und Planung.', 'Demonstrations of vehicle vision, simulation and planning.'],
  },
  {
    to: '/core-labs#cluj',
    kicker: ['CORE Labs', 'CORE Labs'],
    title: ['Humanoide Robotik', 'Humanoid robotics'],
    text: ['Eine neue Plattform für Embodied AI, im Aufbau.', 'A new platform for embodied AI, being set up.'],
  },
  {
    to: '/ai-team-projects',
    kicker: ['Lehre', 'Teaching'],
    title: ['AI-Team-Projekte', 'AI Team Projects'],
    text: [
      'Studierende der Babeș-Bolyai-Universität und der TU Clausthal arbeiten in internationalen Teams.',
      'Students from Babeș-Bolyai University and TU Clausthal work in international teams.',
    ],
  },
]

// Who answers what.
const contacts = [
  { about: ['Promotion', 'PhD'], member: 'sacarea' },
  { about: ['Robotics Club', 'Robotics Club'], member: 'benta' },
]

const KICKER = 'text-xs font-bold uppercase tracking-[0.22em]'
const BAND = 'mx-auto max-w-7xl px-6 md:px-8'

const displayName = (member) => (member.prefix ? `${member.prefix} ${member.name}` : member.name)

// A person to write to: an email link, else their own page, else the name alone.
const ContactName = ({ member, className = '' }) => {
  const name = displayName(member)
  const href = member.email ? `mailto:${member.email}` : member.links?.website
  if (!href) return <span className={className}>{name}</span>
  return (
    <a href={href} target={member.email ? undefined : '_blank'} rel="noreferrer" className={`underline decoration-site-300 underline-offset-4 transition hover:decoration-site-900 ${className}`}>
      {name}
    </a>
  )
}

const UbbHome = () => {
  const { pick } = useLanguage()
  const txt = (pair) => pick(pair[1], pair[0])
  const clubContact = getMemberBySlug(club.contact)
  const department = getMemberBySlug('sacarea').affiliations.find((affiliation) => affiliation.institution === institutions.UBB)?.department

  return (
    <div>
      {/* Hero. No picture: the wordmark is the image. */}
      <section className="relative overflow-hidden border-b border-slate-200/70 bg-white pb-16 pt-32 md:pb-24 md:pt-44">
        <div className="lab-hero-wash absolute inset-0" aria-hidden="true" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(100,116,139,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" aria-hidden="true" />

        <div className={`relative ${BAND}`}>
          <p className={`${KICKER} text-site-900`}>CORE Network · Cluj-Napoca</p>
          <h1 className="mt-4 text-6xl font-semibold leading-[0.95] tracking-[-0.055em] text-slate-950 sm:text-7xl lg:text-[7.5rem]">
            CORE{' '}
            {/* inline-block matters: bg-clip-text masks the gradient with the
                glyphs, but the gradient is sized to the box. */}
            <span className="wordmark-partnership inline-block bg-clip-text pr-[0.06em] text-transparent">Cluj</span>
          </h1>
          <p className="mt-8 max-w-2xl text-xl font-medium leading-8 text-slate-700">{txt(lede)}</p>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">{txt(about)}</p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <a
              href="#robotics-club"
              className="group inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-300/60 transition duration-300 hover:bg-primary-700"
            >
              Robotics Club
              <FiArrowDown className="transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            </a>
            <div className="flex items-center gap-4">
              <ThirdPartyLogo src="/logos/ubb-logo-only.webp" alt="" className="h-10 w-10 object-contain opacity-80" />
              <div className="h-8 w-px bg-slate-200" aria-hidden="true" />
              <img src={assetUrl('/logos/core/avocando-icon.svg')} alt="" className="h-9 w-9 object-contain opacity-80" />
              <p className="max-w-[13rem] text-xs leading-5 text-slate-500">{institutions.UBB.name}<br />{pick('in the CORE Network', 'im CORE Network')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Robotics Club: the lead of the page, with the one photo there is. */}
      <section id="robotics-club" className="scroll-mt-24 bg-slate-950 py-16 text-white md:py-24">
        <div className={`${BAND} grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16`}>
          <img
            src={assetUrl(club.photo.src)}
            alt={txt(club.photo.alt)}
            width="1600"
            height="1200"
            decoding="async"
            className="aspect-[4/3] w-full rounded-[2rem] border border-white/10 object-cover shadow-2xl shadow-black/40"
          />
          <div>
            <p className={`${KICKER} text-site-300`}>{pick('New · For students', 'Neu · Für Studierende')}</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">Robotics Club</h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              {pick(
                'CORE Cluj now has a Robotics Club. Students are welcome to join.',
                'CORE Cluj hat jetzt einen Robotics Club. Studierende sind herzlich eingeladen mitzumachen.',
              )}
            </p>
            <div className="mt-8 flex w-fit items-center gap-4 rounded-2xl border border-white/15 bg-white/5 py-3 pl-3 pr-6">
              <MemberPhoto member={clubContact} className="h-14 w-14 shrink-0 rounded-full" />
              <div>
                <p className="text-xs font-semibold text-slate-400">{pick('To join, get in touch with', 'Zum Mitmachen wenden Sie sich an')}</p>
                <p className="font-semibold text-white"><ContactName member={clubContact} /></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research: the papers themselves. */}
      <section id="research" className="scroll-mt-24 border-t border-slate-100 bg-slate-50 py-16 md:py-24">
        <div className={BAND}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className={`${KICKER} text-site-900`}>{pick('Research', 'Forschung')}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">{pick('Our publications', 'Unsere Publikationen')}</h2>
            </div>
            <ShellLink to="/publications?institution=UBB" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-700 hover:text-primary-800">
              {pick('Open in the publication list', 'In der Publikationsliste öffnen')} <FiArrowRight aria-hidden="true" />
            </ShellLink>
          </div>
          <div className="mt-10">
            <PublicationsSection layout="cards" title="" subtitle="" compact initialInstitution="UBB" sectionId={null} />
          </div>
        </div>
      </section>

      {/* What the group takes part in elsewhere in the network. */}
      <section id="network" className="scroll-mt-24 border-t border-slate-100 bg-white py-16 md:py-24">
        <div className={BAND}>
          <p className={`${KICKER} text-site-900`}>{pick('In the network', 'Im Netzwerk')}</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">{pick('Labs and teaching we share', 'Labore und Lehre, die wir teilen')}</h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {network.map((item) => (
              <li key={item.to}>
                <ShellLink to={item.to} className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-site-200 hover:shadow-xl">
                  <span className="flex items-center justify-between">
                    <span className={`${KICKER} text-slate-500`}>{txt(item.kicker)}</span>
                    <FiArrowUpRight className="text-slate-400 transition group-hover:text-site-900" size={20} aria-hidden="true" />
                  </span>
                  <span className="mt-14 block text-2xl font-bold tracking-tight text-slate-950">{txt(item.title)}</span>
                  <span className="mt-2 block text-sm leading-6 text-slate-600">{txt(item.text)}</span>
                </ShellLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact: the two people are the people this page shows. */}
      <section id="contact" className="scroll-mt-24 border-t border-slate-100 bg-site-100/50 py-16 md:py-24">
        <div className={BAND}>
          <p className={`${KICKER} text-site-900`}>{pick('Contact', 'Kontakt')}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">{pick('Who to write to', 'An wen Sie sich wenden')}</h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {contacts.map((contact) => {
              const member = getMemberBySlug(contact.member)
              return (
                <li key={contact.member} className="flex items-center gap-5 rounded-3xl border border-slate-200 bg-white p-6">
                  <MemberPhoto member={member} className="h-20 w-20 shrink-0 rounded-full" />
                  <div className="min-w-0">
                    <p className={`${KICKER} text-site-900`}>{txt(contact.about)}</p>
                    <p className="mt-1 text-lg font-bold text-slate-950"><ContactName member={member} /></p>
                    <MemberLinks member={member} className="-ml-2 text-slate-500 [&_a:hover]:bg-slate-100 [&_a:hover]:text-primary-700" />
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="mt-10 flex flex-col gap-6 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-start gap-3 text-sm leading-6 text-slate-700">
              <FiMapPin className="mt-1 shrink-0 text-site-900" aria-hidden="true" />
              <span>
                {institutions.UBB.name}
                {department && <>, {department}</>}
                <br />
                {institutions.UBB.location}
              </span>
            </p>
            <Link to="/join-us#positions" className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-primary-600 hover:text-primary-700">
              {pick('Positions across the network', 'Stellen im ganzen Netzwerk')} <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default UbbHome
