import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import TeamMemberCard from '../components/team/TeamMemberCard'
import PublicationsSection from '../components/publications/PublicationsSection'
import { getNetworkMembers } from '../data/team'

const getAssetUrl = (path) => {
  if (!path) return path
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${cleanPath}`
}

const Network = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div id="hero" className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-8 md:px-16 lg:px-24 max-w-6xl py-12 md:py-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 text-sm mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
            Our Network
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            CORE brings together researchers from leading institutions across Germany and Romania,
            united by a shared mission to advance cognitive robotics and embodied AI.
          </p>
        </div>
      </div>

      {/* Participating Institutions Section */}
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="container mx-auto px-8 md:px-16 lg:px-24 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
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
                <h3 className="text-3xl font-bold mb-2">Distributed Research Network</h3>
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
                <h3 className="text-2xl font-bold text-gray-900">Participating Institutions</h3>
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Content */}
      <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        id="team"
        className="container mx-auto px-8 md:px-16 lg:px-24 max-w-6xl py-12 md:py-16"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {getNetworkMembers().map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </motion.div>

      {/* Full Publications List */}
      <PublicationsSection />
    </div >
  )
}

export default Network
