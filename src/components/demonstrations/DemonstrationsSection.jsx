import Section from '../common/Section'
import DemoCard from './DemoCard'
import { demonstrations } from '../../data/demonstrations'

const DemonstrationsSection = () => {
  return (
    <Section
      id="demonstrations"
      title="Autonomous Driving Research"
      subtitle="Demonstrations"
    >
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {demonstrations.map((demo) => (
          <DemoCard key={demo.id} demo={demo} />
        ))}
      </div>

      <div className="text-center">
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Our autonomous driving research combines cutting-edge algorithms with practical
          implementation, resulting in robust solutions for real-world scenarios.
          Click on any demonstration to view the full video.
        </p>
      </div>
    </Section>
  )
}

export default DemonstrationsSection
