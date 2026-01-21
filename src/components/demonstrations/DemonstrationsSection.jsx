import { Link } from 'react-router-dom'
import Section from '../common/Section'
import DemoCard from './DemoCard'
import { autonomousDemonstrations, cognitiveProjects } from '../../data/demonstrations'

const DemonstrationsSection = ({ priority = false }) => {
  return (
    <div id="demonstrations" className="space-y-20">
      {/* Cognitive Robotics / Dynamo Section - Now First */}
      <Section
        id="dynamo"
        title="Cognitive Robotics"
        className="bg-gray-50"
      >
        <div className="max-w-5xl mx-auto space-y-12">
          {cognitiveProjects.map((project) => (
            <div
              key={project.id}
              className={`relative rounded-3xl overflow-hidden shadow-2xl group ${project.isTeaser ? 'min-h-[200px]' : ''
                }`}
            >
              {/* Background */}
              <div className="absolute inset-0">
                {project.image ? (
                  <>
                    <img
                      src={`${import.meta.env.BASE_URL}${project.image.startsWith('/') ? project.image.slice(1) : project.image}`}
                      alt={project.title}
                      loading={priority ? "eager" : "lazy"}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
                )}
              </div>

              {/* Content */}
              <div className={`relative z-10 p-8 ${project.isTeaser ? 'md:p-10 flex flex-col justify-center h-full' : 'md:p-12'} max-w-2xl`}>

                {project.isTeaser ? (
                  /* Teaser Content */
                  <div className="space-y-4">
                    <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur border border-white/20 rounded-full text-xs font-bold text-primary-300 uppercase tracking-widest">
                      Coming Soon
                    </div>
                    <h3 className="text-3xl font-heading font-bold text-white/30 blur-[6px] select-none">
                      {project.title}
                    </h3>
                    <p className="text-lg text-gray-400 leading-relaxed font-light border-l-2 border-primary-500/50 pl-4">
                      {project.description}
                    </p>
                  </div>
                ) : (
                  /* Standard Content (Dynamo) */
                  <>
                    <h3 className="text-4xl font-heading font-bold text-white mb-6">
                      <Link to={project.link} className="hover:text-primary-400 transition-colors">
                        {project.title}
                      </Link>
                    </h3>
                    <p className="text-xl text-gray-200 leading-relaxed mb-8 font-light">
                      {project.description}
                    </p>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 mb-8">
                      <p className="text-gray-100 italic">
                        {project.content}
                      </p>
                    </div>
                    <Link
                      to={project.link}
                      className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors shadow-lg"
                    >
                      View Technical Overview &rarr;
                    </Link>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Autonomous Driving Section - Now Second */}
      <Section
        id="autonomous"
        title="Autonomous Driving"
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
