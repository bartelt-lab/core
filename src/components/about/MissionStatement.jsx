import { motion } from 'framer-motion'

const MissionStatement = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="prose prose-lg md:prose-xl max-w-none"
    >
      <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
        CORE (Cognitive Robotics in Europe) represents a groundbreaking collaboration
        between leading European universities to advance the frontiers of cognitive
        robotics research. By combining expertise in artificial intelligence, machine
        learning, and autonomous systems, we are developing the next generation of
        intelligent robots capable of understanding and interacting with complex,
        real-world environments.
      </p>
      <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
        Our research spans autonomous navigation, human-robot interaction, and
        cognitive architectures, with applications in transportation, healthcare,
        and industrial automation. Through this partnership, we are establishing
        world-class laboratories and training the next generation of robotics
        researchers to tackle the grand challenges of intelligent autonomous systems.
      </p>
    </motion.div>
  )
}

export default MissionStatement
