import { motion } from 'framer-motion'
import HeroVideo from './HeroVideo'
import Button from '../common/Button'

const HeroSection = () => {
  const scrollToAbout = () => {
    const element = document.querySelector('#about')
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <HeroVideo src={`${import.meta.env.BASE_URL}videos/hero.mp4`} />

      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-8 text-balance"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Labs for Cognitive Robotics in Europe
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            A joint initiative by leading European universities to advance the frontiers
            of cognitive robotics research and establish world-class laboratories
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              variant="secondary"
              onClick={scrollToAbout}
            >
              Explore
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
