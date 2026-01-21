import NetworkMemberCard from './NetworkMemberCard'
import { getNetworkMembers } from '../../data/team'

const NetworkTeamSection = () => {
  const members = getNetworkMembers()

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {members.map((member) => (
        <NetworkMemberCard key={member.id} member={member} />
      ))}
    </div>
  )
}

export default NetworkTeamSection
