import { Link } from 'react-router-dom'
import Section from '../common/Section'
import { getCoreLabsLeads } from '../../data/team'

const getAssetUrl = (path) => {
  if (!path) return path
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${cleanPath}`
}

const AboutSection = () => {
  const leads = getCoreLabsLeads()

  return (
    <Section id="about">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Intro Text */}
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
            About Us
          </h2>

          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              CORE (Cognitive Robotics in Europe) represents a groundbreaking collaboration
              between leading European universities to advance the frontiers of cognitive
              robotics research. A joint initiative by leading European universities to advance
              the frontiers of cognitive robotics research and establish world-class laboratories.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              By combining expertise in artificial intelligence, machine learning, and
              autonomous systems, we are developing the next generation of intelligent
              robots capable of understanding and interacting with complex, real-world
              environments.
            </p>
          </div>
        </div>

        {/* Research Leadership */}
        <div id="labs" className="text-center">
          <h3 className="text-xl font-bold text-primary-600 tracking-wider uppercase mb-2">Research Leadership</h3>
          <h2 className="text-4xl font-heading font-bold text-gray-900 mb-12">CORE Labs</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {leads.map((lead) => (
              <div key={lead.id} className="flex flex-col items-center group">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-6 border-4 border-gray-100 shadow-lg group-hover:border-primary-100 transition-colors">
                  <img
                    src={getAssetUrl(lead.photo)}
                    alt={lead.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">{lead.name}</h4>
                <p className="text-primary-600 font-medium">{lead.coreLabsLead.role}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-600 mt-12 mb-8 max-w-2xl mx-auto">
            Our lab leads drive focused research initiatives across autonomous systems, computer vision, reinforcement learning, and more.
          </p>

          <Link
            to="/network"
            className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            View Full Network &rarr;
          </Link>
        </div>

        {/* Locations & Partners - Background Image Variant */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[500px] flex items-center">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={getAssetUrl('images/locations.png')}
              alt="CORE Locations Map"
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-transparent"></div>
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 p-8 md:p-12 max-w-2xl text-left text-white">
            <h3 className="text-xl font-bold text-primary-400 uppercase tracking-wider mb-2">Our Network</h3>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Across Europe
            </h2>
            <p className="text-lg text-gray-200 leading-relaxed mb-8">
              CORE Labs brings together researchers from four prestigious institutions, creating a vibrant ecosystem for cognitive robotics research.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/10">
                <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
                <span className="font-medium">TU Clausthal</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/10">
                <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
                <span className="font-medium">UBB Cluj-Napoca</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/10">
                <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
                <span className="font-medium">University of Rostock</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/10">
                <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
                <span className="font-medium">University of Mannheim</span>
              </div>
            </div>
          </div>
        </div>

        {/* Institution Logos & Placeholders */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          <div className="h-16 w-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 font-bold text-xs uppercase tracking-widest hover:bg-gray-300 transition-colors cursor-help" title="University of Rostock Logo Placeholder">
            TUC
          </div>
          <img
            src={getAssetUrl('images/logos/ubb-logo.png')}
            alt="UBB"
            className="h-16"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <img
            src={getAssetUrl('images/logos/fmi-logo.png')}
            alt="FMI"
            className="h-16"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <img
            src={getAssetUrl('images/logos/deutschsprachiger-logo.png')}
            alt="IG"
            className="h-16"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <div className="h-16 w-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 font-bold text-xs uppercase tracking-widest hover:bg-gray-300 transition-colors cursor-help" title="University of Rostock Logo Placeholder">
            Rostock
          </div>
          <div className="h-16 w-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 font-bold text-xs uppercase tracking-widest hover:bg-gray-300 transition-colors cursor-help" title="University of Mannheim Logo Placeholder">
            Mannheim
          </div>
        </div>
      </div>
    </Section>
  )
}

export default AboutSection
