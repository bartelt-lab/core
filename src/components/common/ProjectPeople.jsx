import { getMemberBySlug } from '../../data/team'
import assetUrl from '../../utils/assetUrl'

const ProjectPeople = ({ slugs, label = 'Team', variant = 'light', className = '' }) => {
  const members = slugs.map(getMemberBySlug).filter(Boolean)

  if (!members.length) {
    return null
  }

  const dark = variant === 'dark'

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <span className={`text-[11px] font-bold uppercase tracking-[0.18em] ${dark ? 'text-white/65' : 'text-slate-500'}`}>
        {label}
      </span>
      <div className="flex gap-2">
        {members.map((member) => (
          <div key={member.slug} className="group/avatar relative">
            <img
              src={assetUrl(member.photo)}
              alt={member.name}
              loading="lazy"
              decoding="async"
              className={`h-11 w-11 rounded-full border-2 object-cover shadow-md transition duration-200 group-hover/avatar:z-10 group-hover/avatar:-translate-y-1 ${
                dark ? 'border-white/80 bg-slate-800' : 'border-white bg-slate-100'
              }`}
            />
            <span
              role="tooltip"
              className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-950 px-2.5 py-1.5 text-xs font-semibold text-white shadow-lg group-hover/avatar:block"
            >
              {member.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectPeople
