import PublicationsSection from '../components/publications/PublicationsSection'
import { useSearchParams } from 'react-router-dom'

const Publications = () => {
  const [searchParams] = useSearchParams()
  const requestedInstitution = searchParams.get('institution')
  const institution = ['TUC', 'UBB', 'Rostock'].includes(requestedInstitution)
    ? requestedInstitution
    : 'all'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Publications list with filters ── */}
      <PublicationsSection
        key={institution}
        layout="cards"
        showFilters
        initialInstitution={institution}
      />
    </div>
  )
}

export default Publications
