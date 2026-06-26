import { FaGithub, FaTwitter, FaLinkedin, FaGlobe, FaEnvelope } from 'react-icons/fa'
import { SiGooglescholar } from 'react-icons/si'
import assetUrl from '../../utils/assetUrl'

const TeamMemberCard = ({ member }) => {
  const hasPhoto = member.photo && member.photo !== '/placeholder-avatar.svg'
  return (
    <div className="text-center">
      {/* Profile Photo */}
      <div className="mb-4">
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
          {hasPhoto ? (
            <img
              src={assetUrl(member.photo)}
              alt={member.name}
              loading="lazy"
              decoding="async"
              width="128"
              height="128"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentElement.innerHTML = `<span class="text-white text-4xl font-bold">${member.name.split(' ').map(n => n[0]).join('')}</span>`
              }}
            />
          ) : (
            // Themed placeholder: white silhouette over the primary gradient,
            // which follows the active [data-theme] palette.
            <svg viewBox="0 0 400 400" className="h-3/4 w-3/4 text-white" fill="currentColor" aria-hidden="true">
              <circle cx="200" cy="150" r="70" />
              <path d="M 80 380 Q 200 270 320 380 Z" />
            </svg>
          )}
        </div>
      </div>

      {/* Name */}
      <h3 className="text-xl font-heading font-bold text-gray-900 mb-1">
        {member.name}
      </h3>

      {/* Title */}
      <p className="text-primary-600 font-semibold mb-4">
        {member.title}
      </p>

      {/* Social/Academic Links */}
      {(member.email || member.links) && (
        <div className="flex justify-center gap-3">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="text-gray-600 hover:text-primary-600 transition-colors"
              title="Email"
            >
              <FaEnvelope className="text-xl" />
            </a>
          )}
          {member.links?.scholar && (
            <a
              href={member.links.scholar}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary-600 transition-colors"
              title="Google Scholar"
            >
              <SiGooglescholar className="text-xl" />
            </a>
          )}
          {member.links?.github && (
            <a
              href={member.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary-600 transition-colors"
              title="GitHub"
            >
              <FaGithub className="text-xl" />
            </a>
          )}
          {member.links?.twitter && (
            <a
              href={member.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary-600 transition-colors"
              title="Twitter"
            >
              <FaTwitter className="text-xl" />
            </a>
          )}
          {member.links?.linkedin && (
            <a
              href={member.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary-600 transition-colors"
              title="LinkedIn"
            >
              <FaLinkedin className="text-xl" />
            </a>
          )}
          {member.links?.website && (
            <a
              href={member.links.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary-600 transition-colors"
              title="Website"
            >
              <FaGlobe className="text-xl" />
            </a>
          )}
        </div>
      )}
    </div>
  )
}

export default TeamMemberCard
