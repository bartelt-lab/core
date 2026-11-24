import PublicationsSection from '../components/publications/PublicationsSection'
import { useSearchParams } from 'react-router-dom'
import { topicLabel } from '../data/publicationTopics'

const Publications = () => {
  const [searchParams] = useSearchParams()
  const requestedInstitution = searchParams.get('institution')
  const institution = ['TUC', 'UBB', 'Rostock'].includes(requestedInstitution)
    ? requestedInstitution
    : 'all'
  // ?topic=<id> presets a topic the same way (the CORE Labs page links here
  // with its own). An id that is not a topic is ignored.
  const requestedTopic = searchParams.get('topic')
  const topic = requestedTopic && topicLabel(requestedTopic) ? requestedTopic : null

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Publications list with filters ── */}
      <PublicationsSection
        key={`${institution}|${topic}`}
        layout="cards"
        showFilters
        initialInstitution={institution}
        initialTopics={topic ? [topic] : []}
      />
    </div>
  )
}

export default Publications
