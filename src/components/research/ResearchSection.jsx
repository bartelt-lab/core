import Section from '../common/Section'
import ProjectCard from './ProjectCard'
import { projects } from '../../data/projects'

const ResearchSection = () => {
  return (
    <Section
      id="research"
      title="Research & Projects"
      subtitle="What We Do"
      className="bg-gray-50"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 text-lg">
          Our research combines theoretical foundations with practical applications,
          pushing the boundaries of what autonomous systems can achieve.
        </p>
      </div>
    </Section>
  )
}

export default ResearchSection
