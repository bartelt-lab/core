import Section from '../common/Section'
import TeamMemberCard from './TeamMemberCard'
import { getNetworkMembers } from '../../data/team'

const TeamSection = () => {
  const members = getNetworkMembers()

  return (
    <Section
      id="team"
      title="Our Team"
      subtitle="Meet the Researchers"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {members.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </Section>
  )
}

export default TeamSection
