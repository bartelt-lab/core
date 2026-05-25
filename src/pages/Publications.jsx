import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import PublicationsSection from '../components/publications/PublicationsSection'

const Publications = () => {
  return (
    <div className="min-h-screen bg-gray-50">

  
      {/* ── Publications list with filters ── */}
      <PublicationsSection
        layout="cards"
        showFilters
      />
    </div>
  )
}

export default Publications
