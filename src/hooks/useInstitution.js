import { useLocation, useNavigate } from 'react-router-dom'
import { getInstitutionFromSearch, withInstitution } from '../utils/institutions'

export default function useInstitution() {
  const location = useLocation()
  const navigate = useNavigate()
  const institution = getInstitutionFromSearch(location.search)

  return {
    institution,
    withInstitution: (to) => withInstitution(to, institution),
    setInstitution: (next, options = {}) => {
      const to = options.to ?? `${location.pathname}${location.search}${location.hash}`
      navigate(withInstitution(to, next), { replace: options.replace ?? false })
    },
  }
}
