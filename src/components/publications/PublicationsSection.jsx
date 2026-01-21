import Section from '../common/Section'
import PublicationItem from './PublicationItem'
import { publications } from '../../data/publications'

const PublicationsSection = () => {
  return (
    <Section
      id="publications"
      title="Publications"
      subtitle="Research Output"
      className="bg-gray-50"
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {[...publications]
          .sort((a, b) => b.year - a.year)
          .map((publication) => (
            <PublicationItem key={publication.id} publication={publication} />
          ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 text-base">
          Additional publications forthcoming as our research progresses.
          Our team publishes regularly in top-tier venues for robotics and artificial intelligence.
        </p>
      </div>
    </Section>
  )
}

export default PublicationsSection
