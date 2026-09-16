/**
 * Publications, resolved at build time.
 *
 * This list used to be fetched from `/data/publications.json` in an effect, on each of
 * the six routes that show publications. That cost a round-trip per route, made every
 * one of them render an empty state first, and — worst — meant the prerendered HTML
 * shipped with no publications in it at all: the crawler captured the loading message,
 * not the content. The file only changes when a human edits it, so the bundler is the
 * right place to read it.
 *
 * Edit `src/data/publications.json` and nothing else. The schema is documented in
 * AGENTS.md; `memberSlug` on an author resolves against `slug` in `./team.js`.
 */
import data from './publications.json'

/**
 * Every publication, newest first — the order all three consumers wanted, so no call
 * site sorts again. Entries with no `date` sort last.
 */
export const publications = [...data.publications].sort((a, b) =>
  (b.date || '').localeCompare(a.date || ''),
)

/** The subset carrying a preview image, for the two carousels. */
export const publicationsWithImages = publications.filter((publication) => publication.image)

export default publications
