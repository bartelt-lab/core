import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { FaBrain, FaExternalLinkAlt, FaFlask, FaServer } from 'react-icons/fa'
import TeamMemberCard from '../components/team/TeamMemberCard'
import PublicationsSection from '../components/publications/PublicationsSection'
import { getNetworkMembers } from '../data/team'
import PartnerNetwork from '../components/network/PartnerNetwork'
import assetUrl from '../utils/assetUrl'

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
      <div id="hero" className="relative min-h-screen overflow-hidden bg-[#f7fafc] text-gray-950">
        <img
          src={assetUrl('/images/hero/core-network-hero.png')}
          alt=""
          className="absolute inset-y-0 right-0 h-full w-full object-cover object-center opacity-72"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f7fafc] via-[#f7fafc]/95 via-[45%] to-[#f7fafc]/22" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f7fafc] via-transparent to-white/55" />
        <div className="absolute left-0 top-0 h-full w-2/3 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,.10),transparent_32%),radial-gradient(circle_at_42%_80%,rgba(132,204,22,.10),transparent_30%)]" />

        <div className="container relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-14 pt-28 md:px-12 lg:px-20">
          <div className="max-w-3xl">
              <div className="mb-8 inline-flex rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-lg">
                <img
                  src={assetUrl('/logos/core-network-logo.svg')}
                  alt="CORE Network"
                  className="h-12 md:h-16 w-auto"
                />
              </div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-blue-700">
                Research Network
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight tracking-tight text-gray-950">
                A research network for cognitive systems in Europe.
              </h1>
              <p className="text-gray-700 text-lg md:text-xl max-w-2xl leading-relaxed">
                CORE connects universities, teams, infrastructure, and publications across
                Germany and Romania to turn distributed research into one coherent scientific platform.
              </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                {
                  to: '/core-labs',
                  icon: FaFlask,
                  title: 'CORE Labs',
                  text: 'Open the current CORE Labs experience, including demos and research highlights.',
                },
                {
                  to: '/ai-team-projects',
                  icon: FaBrain,
                  title: 'AI Team Projects',
                  text: 'Visit the project page shown in the reference, with active projects and archive work.',
                },
                {
                  to: '/compute-cluster',
                  icon: FaServer,
                  title: 'Compute Cluster',
                  text: 'Explore the compute environment and a live carousel of publication outputs.',
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="group rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:border-blue-200 hover:shadow-xl transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-950 text-white group-hover:bg-blue-700 flex items-center justify-center flex-shrink-0 transition-colors">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h2 className="font-bold text-sm text-gray-950">{item.title}</h2>
                          <FaExternalLinkAlt className="w-3 h-3 text-gray-400 group-hover:text-blue-600" />
                        </div>
                        <p className="mt-1 text-xs leading-5 text-gray-600">{item.text}</p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
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

      <PublicationsSection
        limit={4}
        viewAllLink="/core-labs#publications"
        layout="cards"
        title="Selected Publications"
        subtitle="Recent Research"
        intro="A short view into current outputs from the CORE Network. The full publication overview lives with CORE Labs."
      />
    </div >
  )
}

export default Network
