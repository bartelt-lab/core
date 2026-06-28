import { Link } from 'react-router-dom'
import Section from '../common/Section'
import DemoCard from './DemoCard'
import { autonomousDemonstrations, cognitiveProjects } from '../../data/demonstrations'
import assetUrl from '../../utils/assetUrl'

const DemonstrationsSection = ({ priority = false }) => {
  const projectMeta = {
    dynamo: ['Cognitive robotics', 'Dynamic manipulation', 'Operational intelligence'],
    'leader-following': ['Ridgeback', 'Person tracking', 'Sensor fusion', '3D perception'],
    'vial-sort': ['VLA policy', 'LeRobot', 'Jetson inference'],
  }

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
                      src={assetUrl(project.image)}
                      alt={project.title}
                      loading={priority ? "eager" : "lazy"}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900/88 to-gray-900/20"></div>
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-gray-950/70 to-transparent"></div>
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-950 via-slate-900 to-black"></div>
                )}
              </div>

              {/* Content */}
              <div className={`relative z-10 p-8 ${project.isTeaser ? 'md:p-10 flex flex-col justify-center h-full' : 'md:p-12'} max-w-3xl`}>

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
                    <div className="mb-5 flex flex-wrap gap-2">
                      {(projectMeta[project.id] || []).map((item) => (
                        <span key={item} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white/70 backdrop-blur">
                          {item}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-4xl font-heading font-bold text-white mb-6">
                      <Link to={project.link} className="hover:text-primary-400 transition-colors">
                        {project.title}
                      </Link>
                    </h3>
                    <p className="text-lg text-gray-100 leading-8 mb-6 font-light md:text-xl">
                      {project.description}
                    </p>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8 shadow-2xl shadow-black/20">
                      <p className="text-sm leading-7 text-gray-100 md:text-base">
                        {project.content}
                      </p>
                    </div>
                    <Link
                      to={project.link}
                      className="inline-flex items-center px-6 py-3 bg-white text-gray-950 rounded-full font-bold transition-colors shadow-lg hover:bg-primary-50"
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
