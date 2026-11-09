import { Link } from 'react-router-dom'
import { NEWS_LINK } from './newsText'

/**
 * Renders news text with its links. An href starting with "/" becomes a router
 * Link; anything else opens in a new tab.
 */
const RichText = ({ text, linkClassName = 'font-semibold text-primary-700 underline decoration-primary-200 underline-offset-4 transition hover:decoration-primary-600' }) => {
  const parts = []
  let last = 0
  for (const match of text.matchAll(NEWS_LINK)) {
    const [whole, label, href] = match
    if (match.index > last) parts.push(text.slice(last, match.index))
    parts.push(
      href.startsWith('/') ? (
        <Link key={match.index} to={href} className={linkClassName}>
          {label}
        </Link>
      ) : (
        <a key={match.index} href={href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
          {label}
        </a>
      ),
    )
    last = match.index + whole.length
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts}</>
}

export default RichText
