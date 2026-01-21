import Section from '../common/Section'
import TeamMemberCard from './TeamMemberCard'
import { getMembersGroupedByRole } from '../../data/team'

const TeamSection = () => {
  const groupedMembers = getMembersGroupedByRole()

  const roleGroups = [
    { key: 'professors', title: 'Professors' },
    { key: 'postdocs', title: 'Postdocs' },
    { key: 'phdStudents', title: 'PhD Students' },
    { key: 'staff', title: 'Support Staff' }
  ]

  return (
    <Section
      id="team"
      title="Our Team"
      subtitle="Meet the Researchers"
    >
      {roleGroups.map(({ key, title }) => {
        const members = groupedMembers[key]
        if (!members || members.length === 0) return null

        return (
          <div key={key} className="mb-12 last:mb-0">
            <h3 className="text-xl font-heading font-semibold text-gray-800 mb-6 text-center">
              {title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {members.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )
      })}
    </Section>
  )
}

export default TeamSection
