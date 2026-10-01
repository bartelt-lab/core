export const INSTITUTION_OPTIONS = [
  { value: 'all', label: 'All', labelDe: 'Alle' },
  { value: 'TUC', label: 'TUC', name: 'TU Clausthal' },
  { value: 'Rostock', label: 'MDS', name: 'MDS · University of Rostock' },
  { value: 'UBB', label: 'UBB', name: 'Babeș-Bolyai University' },
]

export const normalizeInstitution = (value) => {
  if (value === 'MDS') return 'Rostock'
  return INSTITUTION_OPTIONS.some((option) => option.value === value) ? value : 'all'
}

export const getInstitutionFromSearch = (search) =>
  normalizeInstitution(new URLSearchParams(search).get('institution'))

export const institutionLabel = (id) =>
  id === 'Rostock' ? 'MDS (Rostock)' : INSTITUTION_OPTIONS.find((option) => option.value === id)?.label ?? id

export const matchesInstitution = (institutionIds = [], selected = 'all') =>
  normalizeInstitution(selected) === 'all' || institutionIds.includes(normalizeInstitution(selected))

/** Keep the filter in the URL, so links, reloads, and browser history agree. */
export const withInstitution = (to, institution) => {
  if (!to.startsWith('/') || to.startsWith('//')) return to
  const url = new URL(to, 'https://core.invalid')
  if (url.origin !== 'https://core.invalid') return to
  const selected = normalizeInstitution(institution)
  if (selected === 'all') url.searchParams.delete('institution')
  else url.searchParams.set('institution', selected)
  return `${url.pathname}${url.search}${url.hash}`
}
