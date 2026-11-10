import { FaGithub, FaLinkedin, FaGlobe, FaEnvelope } from 'react-icons/fa'
import { SiGooglescholar } from 'react-icons/si'
import assetUrl from '../../../utils/assetUrl'

const initials = (name) => name.split(' ').map((n) => n[0]).join('').slice(0, 2)

// Photo or initials. Shape and size come from className.
export const MemberPhoto = ({ member, className = '', imgClassName = '', fallbackClassName = 'bg-slate-200 text-slate-600' }) => {
    const hasPhoto = member.photo && member.photo !== '/placeholder-avatar.svg'
    return (
        <div className={`relative overflow-hidden ${className}`}>
            {hasPhoto ? (
                <img
                    src={assetUrl(member.photo)}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full object-cover ${imgClassName}`}
                />
            ) : (
                <div className={`flex h-full w-full items-center justify-center font-semibold ${fallbackClassName}`} aria-label={member.name} role="img">
                    <span className="text-[1.6em]">{initials(member.name)}</span>
                </div>
            )}
        </div>
    )
}

const LINKS = [
    { key: 'email', icon: FaEnvelope, label: 'Email', href: (m) => (m.email ? `mailto:${m.email}` : null) },
    { key: 'scholar', icon: SiGooglescholar, label: 'Google Scholar', href: (m) => m.links?.scholar },
    { key: 'github', icon: FaGithub, label: 'GitHub', href: (m) => m.links?.github },
    { key: 'linkedin', icon: FaLinkedin, label: 'LinkedIn', href: (m) => m.links?.linkedin },
    { key: 'website', icon: FaGlobe, label: 'Website', href: (m) => m.links?.website },
]

// Icon links with a 32px hit area. Colour comes from className.
export const MemberLinks = ({ member, className = '' }) => {
    const items = LINKS.map((l) => ({ ...l, url: l.href(member) })).filter((l) => l.url)
    if (!items.length) return null
    return (
        <div className={`flex flex-wrap items-center gap-1 ${className}`}>
            {items.map(({ key, icon: Icon, label, url }) => (
                <a
                    key={key}
                    href={url}
                    target={key === 'email' ? undefined : '_blank'}
                    rel="noreferrer"
                    aria-label={`${member.name}: ${label}`}
                    title={label}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                >
                    <Icon size={15} />
                </a>
            ))}
        </div>
    )
}

// Page-scoped web font. React 19 hoists the stylesheet into <head> and dedupes it.
export const FontLink = ({ href }) => <link rel="stylesheet" href={href} precedence="default" />
