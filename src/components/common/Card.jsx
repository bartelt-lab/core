import { motion } from 'framer-motion'

const Card = ({ children, className = '', hover = true, ...props }) => {
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-xl border border-gray-200 ${hover ? 'hover:border-gray-300' : ''} transition-colors overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card
