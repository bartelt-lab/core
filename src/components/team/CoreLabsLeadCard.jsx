import { FaGithub, FaTwitter, FaLinkedin, FaGlobe } from 'react-icons/fa'
import { SiGooglescholar } from 'react-icons/si'

const getAssetUrl = (path) => {
  if (!path) return path
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${cleanPath}`
}

const CoreLabsLeadCard = ({ member }) => {
  const { coreLabsLead } = member

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col items-center text-center">
        {/* Profile Photo */}
        <div className="mb-4">
          <div className="w-28 h-28 rounded-full overflow-hidden bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
            <img
              src={getAssetUrl(member.photo)}
              alt={member.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentElement.innerHTML = `<span class="text-white text-3xl font-bold">${member.name.split(' ').map(n => n[0]).join('')}</span>`
              }}
            />
          </div>
        </div>

        {/* Name */}
        <h3 className="text-xl font-heading font-bold text-gray-900 mb-1">
          {member.name}
        </h3>

        {/* Lab Role */}
        <p className="text-primary-600 font-semibold mb-3">
          {coreLabsLead.role}
        </p>

        {/* Research Focus Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {coreLabsLead.researchFocus.map((focus, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary-50 text-primary-700 text-sm font-medium rounded-full"
            >
              {focus}
            </span>
          ))}
        </div>

        {/* Short Description */}
        {coreLabsLead.shortDescription && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {coreLabsLead.shortDescription}
          </p>
        )}

        {/* Selected Publications */}
        {coreLabsLead.selectedPublications && coreLabsLead.selectedPublications.length > 0 && (
          <div className="w-full mt-2 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Selected Publications</p>
            <ul className="text-sm text-gray-600 space-y-1">
              {coreLabsLead.selectedPublications.slice(0, 2).map((pub, index) => (
                <li key={index} className="truncate">
                  {pub.title}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Social/Academic Links */}
        {member.links && Object.keys(member.links).length > 0 && (
          <div className="flex justify-center gap-3 mt-4 pt-4 border-t border-gray-100 w-full">
            {member.links.scholar && (
              <a
                href={member.links.scholar}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary-600 transition-colors"
                title="Google Scholar"
              >
                <SiGooglescholar className="text-lg" />
              </a>
            )}
            {member.links.github && (
              <a
                href={member.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary-600 transition-colors"
                title="GitHub"
              >
                <FaGithub className="text-lg" />
              </a>
            )}
            {member.links.twitter && (
              <a
                href={member.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary-600 transition-colors"
                title="Twitter"
              >
                <FaTwitter className="text-lg" />
              </a>
            )}
            {member.links.linkedin && (
              <a
                href={member.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary-600 transition-colors"
                title="LinkedIn"
              >
                <FaLinkedin className="text-lg" />
              </a>
            )}
            {member.links.website && (
              <a
                href={member.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary-600 transition-colors"
                title="Website"
              >
                <FaGlobe className="text-lg" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CoreLabsLeadCard
