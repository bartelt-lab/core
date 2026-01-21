import { Link } from 'react-router-dom'
import Section from '../common/Section'
import { getCoreLabsLeads } from '../../data/team'
import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'

const getAssetUrl = (path) => {
  if (!path) return path
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${cleanPath}`
}

const AboutSection = () => {
  const leads = getCoreLabsLeads()

  return (
    <Section id="about" className="bg-white">
      <div className="max-w-7xl mx-auto space-y-24">

        {/* 1. Mission Statement */}
        <div id="initiative" className="max-w-4xl mx-auto text-center space-y-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary-600 font-bold tracking-widest uppercase text-sm"
          >
            The Initiative
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-gray-900 leading-tight"
          >
            Shaping the Future <br /> of Cognitive Robotics
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
          >
            CORE (Cognitive Robotics in Europe) is a groundbreaking collaboration between leading European universities. We combine expertise in AI, machine learning, and control theory to build robots that truly understand their world.
          </motion.p>
        </div>

        {/* 2. The Network (Map & Logos) */}
        <div id="partners" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Map Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-[500px] group"
          >
            <img
              src={getAssetUrl('images/locations.png')}
              alt="CORE Network Map"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-white">
              <h3 className="text-3xl font-bold mb-2">A European Ecosystem</h3>
              <p className="text-gray-300">Connecting innovation hubs across Germany and Romania.</p>
            </div>
          </motion.div>

          {/* Partner Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-12"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Prestigious Partners</h3>
              <p className="text-gray-600 leading-relaxed">
                Our labs operate as a unified distributed entity, sharing resources, data, and expertise to accelerate discovery.
              </p>

              {/* Logo Grid */}
              <div className="grid grid-cols-2 gap-6 opacity-80">
                <div className="h-14 bg-gray-100 rounded flex items-center justify-center text-gray-400 font-bold text-xs uppercase tracking-widest" title="TU Clausthal Placeholder">
                  TUC
                </div>
                <img src={getAssetUrl('images/logos/ubb-logo.png')} alt="UBB" className="h-14 object-contain" />
                <img src={getAssetUrl('images/logos/fmi-logo.png')} alt="FMI" className="h-14 object-contain" />
                <img src={getAssetUrl('images/logos/deutschsprachiger-logo.png')} alt="IG" className="h-14 object-contain" />
                <div className="h-14 bg-gray-100 rounded flex items-center justify-center text-gray-400 font-bold text-xs uppercase tracking-widest" title="Rostock Placeholder">
                  Rostock
                </div>
                <div className="h-14 bg-gray-100 rounded flex items-center justify-center text-gray-400 font-bold text-xs uppercase tracking-widest" title="Mannheim Placeholder">
                  Mannheim
                </div>
              </div>
            </div>

            {/* Link removed as requested */}
          </motion.div>
        </div>

        {/* 3. Scientific Coordination */}
        <div id="team" className="space-y-12 border-t border-gray-100 pt-16">
          <div className="text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="max-w-2xl">
              <h3 className="text-3xl font-heading font-bold text-gray-900 mb-4">Scientific Coordination</h3>
              <p className="text-gray-600 text-lg">
                Our lab leads coordinate research and operational activities across our distributed locations.
              </p>
            </div>

            <Link to="/network" className="hidden md:inline-flex px-6 py-3 bg-gray-100 text-gray-900 font-semibold rounded-full hover:bg-primary-50 hover:text-primary-600 transition-colors">
              Meet the Full Team
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {leads.map((lead, index) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-default"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-5 bg-gray-200">
                  <img
                    src={getAssetUrl(lead.photo)}
                    alt={lead.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                </div>

                <h4 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-1">
                  {lead.name}
                </h4>

                {/* Role (Operations or Methods Lead) */}
                <p className="text-sm font-bold text-primary-600 uppercase tracking-wide mb-2">
                  {lead.coreLabsLead.role}
                </p>

                {/* Research Focus */}
                <p className="text-sm font-medium text-gray-800 mb-3">
                  <span className="text-gray-500 font-normal">Focus:</span> {lead.coreLabsLead.researchFocus.join(', ')}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="md:hidden text-center mt-8">
            <Link to="/network" className="inline-flex px-6 py-3 bg-gray-100 text-gray-900 font-semibold rounded-full hover:bg-gray-200 transition-colors">
              Meet the Full Team
            </Link>
          </div>
        </div>

      </div>
    </Section>
  )
}

export default AboutSection
