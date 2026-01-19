import Card from '../common/Card'
import { FaArrowRight } from 'react-icons/fa'

const ProjectCard = ({ project }) => {
  const getCategoryColor = (category) => {
    const colors = {
      'Autonomous Driving': 'bg-blue-100 text-blue-800',
      'Cognitive Systems': 'bg-purple-100 text-purple-800',
      'Swarm Robotics': 'bg-green-100 text-green-800',
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <Card className="h-full flex flex-col">
      <div className="p-6 flex flex-col h-full">
        {/* Category Badge */}
        <div className="mb-4">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(project.category)}`}>
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-heading font-bold text-gray-900 mb-3">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 flex-grow mb-4">
          {project.description}
        </p>

        {/* Status & Learn More */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center text-sm font-medium text-green-600">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            {project.status}
          </span>
          <button className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-2 transition-colors">
            <span>Learn More</span>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </Card>
  )
}

export default ProjectCard
