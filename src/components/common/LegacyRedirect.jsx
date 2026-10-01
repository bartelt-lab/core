import { Navigate, useLocation } from 'react-router-dom'
import { legacyRedirect } from '../../routes'

// Old bookmarks use the same redirect table as the static build. Wrapping the
// routes avoids mounting the former institutional page before navigation.
const LegacyRedirect = ({ children }) => {
  const { pathname, search, hash } = useLocation()
  const target = legacyRedirect(pathname, search, hash)

  return target ? <Navigate replace to={target} /> : children
}

export default LegacyRedirect
