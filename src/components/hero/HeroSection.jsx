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
    <section id="hero" className="relative h-screen flex flex-col justify-end overflow-hidden pb-24 md:pb-32">
      <HeroVideo src={`${import.meta.env.BASE_URL}videos/hero.mp4`} />

      {/* Gradient Overlay for bottom text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-0"></div>

      {/* Content Container - Matching Navbar alignment */}
      <div className="relative z-10 w-full container mx-auto px-4 max-w-7xl">
        <div className="max-w-4xl text-left text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold mb-8 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Labs for Cognitive <br className="hidden md:block" /> Robotics in Europe
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button
                variant="primary"
                onClick={scrollToAbout}
                className="px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Explore
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
