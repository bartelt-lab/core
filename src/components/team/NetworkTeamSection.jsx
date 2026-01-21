import NetworkMemberCard from './NetworkMemberCard'
import { getMembersGroupedByRole } from '../../data/team'

const RoleGroup = ({ title, members }) => {
  if (!members || members.length === 0) return null

  return (
    <div className="mb-12 last:mb-0">
      <h3 className="text-xl font-heading font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
        {title}
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        {members.map((member) => (
          <NetworkMemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  )
}

const NetworkTeamSection = () => {
  const groupedMembers = getMembersGroupedByRole()

  return (
    <div>
      <RoleGroup title="Professors" members={groupedMembers.professors} />
      <RoleGroup title="Postdoctoral Researchers" members={groupedMembers.postdocs} />
      <RoleGroup title="PhD Students & Researchers" members={[...groupedMembers.phdStudents, ...groupedMembers.researchers]} />
      <RoleGroup title="Support Staff" members={groupedMembers.staff} />
    </div>
  )
}

export default NetworkTeamSection
