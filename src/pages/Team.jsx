import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiArrowUpRight, FiMail, FiMapPin } from 'react-icons/fi'
import TeamMemberCard from '../components/team/TeamMemberCard'
import { institutions, teamMembers } from '../data/team'
import useInstitution from '../hooks/useInstitution'
import { useLanguage } from '../i18n/useLanguage'
import assetUrl from '../utils/assetUrl'
import { institutionLabel, matchesInstitution, withInstitution as applyInstitution } from '../utils/institutions'
import JoinUs from './tuc/JoinUs'

const roleGroups = [
  { id: 'faculty', roles: ['professor', 'lecturer', 'assistant_professor'], title: ['Professors & lecturers', 'Professoren & Lehrende'] },
  { id: 'postdocs', roles: ['postdoc'], title: ['Postdoctoral researchers', 'Postdocs'] },
  { id: 'researchers', roles: ['phd_student', 'researcher'], title: ['PhD students & researchers', 'Promovierende & Forschende'] },
  { id: 'research-assistants', roles: ['research_assistant'], title: ['Research assistants', 'Wissenschaftliche Hilfskräfte'] },
  { id: 'support', roles: ['support_staff', 'staff'], title: ['Administration & IT', 'Verwaltung & IT'] },
]

const networkInstitutions = [institutions.TUC, institutions.ROSTOCK, institutions.UBB]

const memberInstitutions = (member) => member.affiliations.map(({ institution }) => institution.shortName)

const Team = () => {
  const { institution, withInstitution } = useInstitution()
  const { pick } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()
  const members = teamMembers.filter((member) => matchesInstitution(memberInstitutions(member), institution))
  const contacts = networkInstitutions.filter((site) => matchesInstitution([site.shortName], institution))
  const requestedSlug = location.hash.startsWith('#member-') ? location.hash.slice('#member-'.length) : ''
  const requestedMember = teamMembers.find((member) => member.slug === requestedSlug)
  const targetIsVisible = requestedMember && matchesInstitution(memberInstitutions(requestedMember), institution)
  const [expiredKey, setExpiredKey] = useState(null)
  const highlightedSlug = targetIsVisible && expiredKey !== location.key ? requestedSlug : null

  // A direct link to a person takes precedence over a filter that would hide them.
  // Replace the URL so Back returns to the page the visitor came from.
  useEffect(() => {
    if (requestedMember && !targetIsVisible) {
      navigate(applyInstitution(`${location.pathname}${location.search}${location.hash}`, 'all'), { replace: true })
    }
  }, [requestedMember, targetIsVisible, location.pathname, location.search, location.hash, navigate])

  useEffect(() => {
    if (!targetIsVisible) return undefined

    const scrollToCard = () => document.getElementById(`member-${requestedSlug}`)?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'center',
    })
    const frame = requestAnimationFrame(scrollToCard)
    const settle = setTimeout(scrollToCard, 600)
    const fade = setTimeout(() => setExpiredKey(location.key), 5000)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(settle)
      clearTimeout(fade)
    }
  }, [requestedSlug, targetIsVisible, location.key])

  return (
    <div className="min-h-screen bg-white">
      <section id="hero" className="border-b border-slate-200 bg-primary-50/50">
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-44 md:px-10 md:pb-16 md:pt-48">
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">Team</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {pick(
              'Meet the people behind our research, teaching, and laboratories across the CORE Network.',
              'Lerne die Menschen hinter Forschung, Lehre und Laboren im CORE Network kennen.',
            )}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to={withInstitution('/team#contact')} className="rounded-full bg-primary-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-800">
              {pick('Contact', 'Kontakt')}
            </Link>
            <Link to={withInstitution('/team#join-us')} className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:border-primary-700 hover:text-primary-700">
              {pick('Join us', 'Mitmachen')}
            </Link>
          </div>
        </div>
      </section>

      <section id="members" className="scroll-mt-40 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
          <p className="mb-10 text-sm text-slate-500" role="status">
            {pick(`${members.length} team members`, `${members.length} Teammitglieder`)}
            {' · '}
            {institution === 'all' ? pick('All institutions', 'Alle Institutionen') : institutionLabel(institution)}
          </p>
          <div className="space-y-14">
            {roleGroups.map((group) => {
              const groupMembers = members.filter((member) => group.roles.includes(member.roleCategory))
              if (groupMembers.length === 0) return null
              return (
                <section key={group.id} aria-labelledby={`team-${group.id}`}>
                  <h2 id={`team-${group.id}`} className="mb-8 text-2xl font-bold text-slate-950">{pick(...group.title)}</h2>
                  <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {groupMembers.map((member) => (
                      <div
                        key={member.slug}
                        id={`member-${member.slug}`}
                        className={`scroll-mt-40 rounded-2xl p-4 transition-shadow duration-500 ${highlightedSlug === member.slug ? 'bg-primary-50 ring-2 ring-primary-600' : ''}`}
                      >
                        <TeamMemberCard member={member} />
                      </div>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-40 border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
          <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">{pick('Contact', 'Kontakt')}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {contacts.map((site) => (
              <article key={site.shortName} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-primary-700">{institutionLabel(site.shortName)}</p>
                <h3 className="mt-3 text-lg font-bold leading-7 text-slate-950">{site.name}</h3>
                {site.shortName === 'TUC' ? (
                  <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
                    <p>Cognitive Software · Institute for Software and Systems Engineering</p>
                    <p className="flex items-start gap-3">
                      <FiMail className="mt-1.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>
                        Christian Bartelt<br />
                        <a href="mailto:bartelt@isse.tu-clausthal.de" className="break-all font-semibold text-primary-700 hover:underline">bartelt@isse.tu-clausthal.de</a>
                      </span>
                    </p>
                    <p className="flex items-start gap-3">
                      <FiMapPin className="mt-1.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      <a href="https://maps.app.goo.gl/ZeN3Gz2aWHZDJxc8A" target="_blank" rel="noreferrer" className="text-primary-700 hover:underline">Wallstrasse 6, 38640 Goslar, {pick('Germany', 'Deutschland')}</a>
                    </p>
                    <div className="border-t border-slate-200 pt-4">
                      <p className="mb-3 text-xs font-semibold text-slate-500">{pick('Affiliation', 'Affiliation')}</p>
                      <a href="https://www.digit-research.de" target="_blank" rel="noreferrer" className="inline-flex transition-opacity hover:opacity-70">
                        <img src={assetUrl('/logos/digit.webp')} alt="DIGIT" loading="lazy" decoding="async" className="h-12 w-auto object-contain" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <p className="mt-4 text-sm leading-7 text-slate-600">{site.location}</p>
                )}
                <a href={site.website} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary-700 hover:text-primary-800">
                  {pick('Institution website', 'Website der Institution')}
                  <FiArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {matchesInstitution(['TUC'], institution) ? <JoinUs embedded /> : (
        <section id="join-us" className="scroll-mt-40">
          <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
            <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">{pick('Join us', 'Mitmachen')}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              {pick('No openings are listed for this institution.', 'Für diese Institution sind hier keine offenen Stellen aufgeführt.')}
            </p>
          </div>
        </section>
      )}
    </div>
  )
}

export default Team
