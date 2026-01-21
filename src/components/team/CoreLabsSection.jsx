import { Link } from 'react-router-dom'
import Section from '../common/Section'
import CoreLabsLeadCard from './CoreLabsLeadCard'
import { getCoreLabsLeads } from '../../data/team'

const CoreLabsSection = () => {
  const labLeads = getCoreLabsLeads()

  return (
    <Section
      id="labs"
      title="CORE Labs"
      subtitle="Research Leadership"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {labLeads.map((member) => (
          <CoreLabsLeadCard key={member.id} member={member} />
        ))}
      </div>

      <div className="text-center">
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Our lab leads drive focused research initiatives across autonomous systems,
          computer vision, reinforcement learning, and more.
        </p>
        <Link
          to="/network"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
        >
          View Full Network
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </Section>
  )
}

export default CoreLabsSection
