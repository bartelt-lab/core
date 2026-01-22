import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import TeamMemberCard from '../components/team/TeamMemberCard'
import PublicationsSection from '../components/publications/PublicationsSection'
import { getNetworkMembers } from '../data/team'
import PartnerNetwork from '../components/network/PartnerNetwork'

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
          <PartnerNetwork />
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
