import { motion } from 'framer-motion'
import { FaFilePdf, FaExternalLinkAlt, FaCode } from 'react-icons/fa'

const PublicationItem = ({ publication }) => {
  const getTypeColor = (type) => {
    return type === 'Journal' ? 'text-purple-600' : 'text-blue-600'
  }

  const getStatusBadge = (status) => {
    const colors = {
      'Published': 'bg-green-100 text-green-800',
      'Under Review': 'bg-yellow-100 text-yellow-800',
      'In Press': 'bg-blue-100 text-blue-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
            <a href={publication.url} target="_blank" rel="noopener noreferrer">
              {publication.title}
            </a>
          </h3>
        </div>
        <span className={`ml-4 px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(publication.status)}`}>
          {publication.status}
        </span>
      </div>

      <p className="text-gray-700 mb-3">
        {publication.authors.join(', ')}
      </p>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <span className={`font-medium ${getTypeColor(publication.type)}`}>
            {publication.type}
          </span>
          <span className="text-gray-600">
            {publication.venue}, {publication.year}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {publication.url !== '#' && (
            <a
              href={publication.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              <FaExternalLinkAlt className="text-sm" />
              <span>Paper</span>
            </a>
          )}
          {publication.code && (
            <a
              href={publication.code}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-accent-500 hover:text-accent-600 font-medium"
            >
              <FaCode className="text-sm" />
              <span>Code</span>
            </a>
          )}
        </div>
      </div>

      {publication.abstract && (
        <p className="mt-4 text-sm text-gray-600 line-clamp-2">
          {publication.abstract}
        </p>
      )}
    </motion.div>
  )
}

export default PublicationItem
