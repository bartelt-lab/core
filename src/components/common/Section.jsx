import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const Section = ({
  id,
  children,
  className = '',
  title,
  subtitle,
  dark = false,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
  }

  return (
    <section
      id={id}
      ref={ref}
      className={`py-16 md:py-24 ${dark ? 'bg-gray-900 text-white' : 'bg-white'} ${className}`}
    >
      <motion.div
        variants={variants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="container mx-auto px-8 md:px-16 lg:px-24 max-w-6xl"
      >
        {(title || subtitle) && (
          <div className="text-center mb-12 md:mb-16">
            {subtitle && (
              <p className="text-primary-600 font-semibold uppercase tracking-wider mb-2 text-sm">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-balance">
                {title}
              </h2>
            )}
          </div>
        )}
        {children}
      </motion.div>
    </section>
  )
}

export default Section
