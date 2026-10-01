import { getMemberBySlug } from '../data/team.js'

// Keep the existing publication-specific attribution: a member's current
// affiliations do not necessarily describe every paper they wrote.
const memberInstitutionDefaults = { szilagyi: ['TUC'] }

export const getPublicationInstitutions = (publication) => {
  if (Array.isArray(publication.institutions)) return publication.institutions

  const institutions = publication.authors.flatMap((author) => {
    if (!author.memberSlug) return []
    if (author.institution) return [author.institution]
    if (memberInstitutionDefaults[author.memberSlug]) return memberInstitutionDefaults[author.memberSlug]
    const member = getMemberBySlug(author.memberSlug)
    return member?.affiliations.map(({ institution }) => institution.shortName) || []
  })

  return [...new Set(institutions)]
}
