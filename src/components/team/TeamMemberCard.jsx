import { FaGithub, FaTwitter, FaLinkedin, FaGlobe } from 'react-icons/fa'
import { SiGooglescholar } from 'react-icons/si'

const getAssetUrl = (path) => {
  if (!path) return path
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${cleanPath}`
}

const TeamMemberCard = ({ member }) => {
  return (
    <div className="text-center">
      {/* Profile Photo */}
      <div className="mb-4">
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
          <img
            src={getAssetUrl(member.photo)}
            alt={member.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.parentElement.innerHTML = `<span class="text-white text-4xl font-bold">${member.name.split(' ').map(n => n[0]).join('')}</span>`
            }}
          />
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
      {member.links && (
        <div className="flex justify-center gap-3">
          {member.links.scholar && (
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
          {member.links.github && (
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
          {member.links.twitter && (
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
          {member.links.linkedin && (
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
          {member.links.website && (
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
