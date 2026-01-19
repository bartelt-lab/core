import { useInView } from 'react-intersection-observer'

const useScrollAnimation = (threshold = 0.1) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold,
  })

  return { ref, inView }
}

export default useScrollAnimation
