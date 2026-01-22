import { Link } from 'react-router-dom'
import Section from '../common/Section'
import { getCoreLabsLeads } from '../../data/team'
import PartnerNetwork from '../network/PartnerNetwork'
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
            Advancing the Field <br /> of Cognitive Robotics
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
          >
            CORE (Cognitive Robotics in Europe) is a cross-institutional initiative uniting leading European universities. We combine expertise in AI, machine learning, and control theory, focusing on developing autonomous systems capable of robust perception and adaptability.
          </motion.p>
        </div>

        {/* 2. The Network (Map & Logos) */}
        <div id="partners">
          <PartnerNetwork />
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
                className="group cursor-default bg-transparent md:bg-gray-50 rounded-2xl p-0 md:p-6 hover:bg-transparent md:hover:bg-white md:hover:shadow-xl transition-all duration-300 flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0"
              >
                {/* Image */}
                <div className="relative overflow-hidden bg-gray-200 flex-shrink-0 w-20 h-20 rounded-2xl md:w-full md:h-auto md:aspect-square md:rounded-xl md:mb-5">
                  <img
                    src={getAssetUrl(lead.photo)}
                    alt={lead.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 md:group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>

                <div className="text-left md:text-left flex-grow min-w-0">
                  <h4 className="text-base md:text-xl font-bold text-gray-900 mb-0.5 md:mb-1 truncate">
                    {lead.name}
                  </h4>

                  {/* Mobile-optimized Role/Affiliation Order */}

                  {/* Role */}
                  <p className="text-sm font-bold text-primary-600 md:text-primary-700 mb-0.5 md:mb-2 truncate">
                    {lead.coreLabsLead.role}
                  </p>

                  {/* Affiliation */}
                  <div className="text-xs text-gray-400 md:text-gray-500 font-bold uppercase tracking-wider mb-0 md:mb-3 truncate md:whitespace-normal md:min-h-[2.5em]">
                    {lead.affiliations.map(aff => aff.institution.name).join(' / ')}
                  </div>

                  {/* Short Bio / Context - Hidden on Mobile */}
                  <p className="hidden md:block text-sm text-gray-600 mb-4 italic leading-relaxed line-clamp-3">
                    {lead.coreLabsLead.shortDescription || lead.bio}
                  </p>

                  {/* Research Focus - Hidden on Mobile */}
                  <div className="hidden md:flex flex-wrap gap-2 justify-start">
                    {lead.coreLabsLead.researchFocus.map((focus, i) => (
                      <span key={i} className="px-2 py-1 bg-white border border-gray-200 rounded text-xs text-gray-700 font-medium">
                        {focus}
                      </span>
                    ))}
                  </div>
                </div>
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
