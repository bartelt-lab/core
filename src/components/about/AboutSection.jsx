import Section from '../common/Section'

const getAssetUrl = (path) => {
  if (!path) return path
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${cleanPath}`
}

const AboutSection = () => {
  return (
    <Section id="about">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
          About Us
        </h2>

        <div className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            CORE (Cognitive Robotics in Europe) represents a groundbreaking collaboration
            between leading European universities to advance the frontiers of cognitive
            robotics research.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            By combining expertise in artificial intelligence, machine learning, and
            autonomous systems, we are developing the next generation of intelligent
            robots capable of understanding and interacting with complex, real-world
            environments.
          </p>
        </div>

        {/* Simple logo strip */}
        <div className="flex items-center justify-center gap-12 pt-8 opacity-60">
          <img
            src={getAssetUrl('images/logos/ubb-logo.png')}
            alt="UBB"
            className="h-20"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <img
            src={getAssetUrl('images/logos/fmi-logo.png')}
            alt="FMI"
            className="h-20"
            onError={(e) => { e.target.style.display = 'none' }}
          />
        </div>
      </div>
    </Section>
  )
}

export default AboutSection
