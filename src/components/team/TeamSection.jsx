import Section from '../common/Section'
import TeamMemberCard from './TeamMemberCard'
import { teamMembers } from '../../data/team'

const TeamSection = () => {
  return (
    <Section
      id="team"
      title="Our Team"
      subtitle="Meet the Researchers"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>

      <div className="text-center max-w-3xl mx-auto">
        <p className="text-gray-600 text-base">
          Our multidisciplinary team brings together expertise in artificial intelligence,
          robotics, computer vision, and cognitive science to tackle the most challenging
          problems in autonomous systems.
        </p>
      </div>
    </Section>
  )
}

export default TeamSection
