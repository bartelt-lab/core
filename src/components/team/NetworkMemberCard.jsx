import { FaGithub, FaTwitter, FaLinkedin, FaGlobe } from 'react-icons/fa'
import { SiGooglescholar } from 'react-icons/si'

const getAssetUrl = (path) => {
  if (!path) return path
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${cleanPath}`
}

const NetworkMemberCard = ({ member }) => {
  const affiliationText = member.affiliations
    .map(a => a.institution.shortName)
    .join(' / ')

  return (
    <div className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      {/* Profile Photo */}
      <div className="flex-shrink-0">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
          <img
            src={getAssetUrl(member.photo)}
            alt={member.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.parentElement.innerHTML = `<span class="text-white text-xl font-bold">${member.name.split(' ').map(n => n[0]).join('')}</span>`
            }}
          />
        </div>
      </div>

      {/* Info */}
      <div className="flex-grow min-w-0">
        <h4 className="text-lg font-heading font-bold text-gray-900 truncate">
          {member.name}
        </h4>
        <p className="text-primary-600 text-sm font-medium mb-1">
          {member.title}
        </p>
        <p className="text-gray-500 text-sm">
          {affiliationText}
        </p>

        {/* Social Links */}
        {member.links && Object.keys(member.links).length > 0 && (
          <div className="flex gap-2 mt-2">
            {member.links.scholar && (
              <a
                href={member.links.scholar}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-600 transition-colors"
                title="Google Scholar"
              >
                <SiGooglescholar className="text-base" />
              </a>
            )}
            {member.links.github && (
              <a
                href={member.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-600 transition-colors"
                title="GitHub"
              >
                <FaGithub className="text-base" />
              </a>
            )}
            {member.links.twitter && (
              <a
                href={member.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-600 transition-colors"
                title="Twitter"
              >
                <FaTwitter className="text-base" />
              </a>
            )}
            {member.links.linkedin && (
              <a
                href={member.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-600 transition-colors"
                title="LinkedIn"
              >
                <FaLinkedin className="text-base" />
              </a>
            )}
            {member.links.website && (
              <a
                href={member.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-600 transition-colors"
                title="Website"
              >
                <FaGlobe className="text-base" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default NetworkMemberCard
