import { Link } from 'react-router-dom'
import Section from '../common/Section'
import DemoCard from './DemoCard'
import { autonomousDemonstrations, cognitiveRobotics } from '../../data/demonstrations'

const DemonstrationsSection = () => {
  return (
    <div id="demonstrations" className="space-y-20">
      {/* Cognitive Robotics / Dynamo Section - Now First */}
      <Section
        id="dynamo"
        title="Cognitive Robotics"
        subtitle="New Directions"
        className="bg-gray-50"
      >
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={`${import.meta.env.BASE_URL}videos/demonstrations/robotics/Lab4K.jpeg`}
                alt="Dynamo Lab"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 max-w-2xl">
              <h3 className="text-4xl font-heading font-bold text-white mb-6">
                <Link to="/dynamo" className="hover:text-primary-400 transition-colors">
                  Dynamo
                </Link>
              </h3>
              <p className="text-xl text-gray-200 leading-relaxed mb-8 font-light">
                {cognitiveRobotics.description}
              </p>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-8">
                <p className="text-gray-100 italic">
                  {cognitiveRobotics.content}
                </p>
              </div>

              <Link
                to="/dynamo"
                className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors shadow-lg"
              >
                View Technical Overview &rarr;
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Autonomous Driving Section - Now Second */}
      <Section
        id="autonomous"
        title="Autonomous Driving"
        subtitle="Research & Demonstrations"
      >
        <p className="text-gray-600 text-lg max-w-3xl mx-auto text-center mb-12">
          Our autonomous driving research combines cutting-edge algorithms with practical
          implementation, resulting in robust solutions for real-world scenarios.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {autonomousDemonstrations.map((demo) => (
            <DemoCard key={demo.id} demo={demo} />
          ))}
        </div>
      </Section>
    </div>
  )
}

export default DemonstrationsSection
