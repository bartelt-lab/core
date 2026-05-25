import HeroSection from '../components/hero/HeroSection'
import AboutSection from '../components/about/AboutSection'
import DemonstrationsSection from '../components/demonstrations/DemonstrationsSection'
import PublicationsSection from '../components/publications/PublicationsSection'

const Home = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <PublicationsSection
        title="CORE Labs Publications"
        subtitle="Research Archive"
        intro="A fuller archive of publications connected to CORE Labs and the wider network, shown with available paper visuals and direct links."
      />
      <DemonstrationsSection />
    </>
  )
}

export default Home
