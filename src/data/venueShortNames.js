// Short names for venues, for the cover a publication gets when it has neither
// a figure nor a first-page image (components/publications/PublicationRow.jsx).
//
// Each rule is [pattern, name, track]. The first pattern that matches the
// `venue` string of a publication wins, so the specific rule (a companion or
// extended-abstracts volume) goes above the general one for the same venue.
//   name   what the community calls the venue. An array sets it on several lines.
//   track  the part of the venue the paper appeared in, when it is not the main
//          proceedings. Optional.
//
// Only add a name the venue uses for itself. When in doubt leave the venue
// out: it then gets its publication type ("Journal") on the cover instead.
const RULES = [
  [/Extended Abstracts.*CHI Conference/, 'CHI', 'Extended Abstracts'],
  [/CHI Conference on Human Factors/, 'CHI'],
  [/Companion.*Pervasive and Ubiquitous Computing/, 'UbiComp', 'Companion'],
  [/Pervasive and Ubiquitous Computing/, 'UbiComp'],
  [/Interactive, Mobile, Wearable and Ubiquitous Technologies/, 'IMWUT'],
  [/Symposium on Wearable Computers/, 'ISWC'],
  [/Designing Interactive Systems/, 'DIS'],
  [/Augmented Humans/, 'AHs'],
  [/Virtual Reality and 3D User Interfaces Abstracts and Workshops/, ['IEEE', 'VR'], 'Abstracts and Workshops'],
  [/SIGGRAPH Asia.*Emerging Technologies/, ['SIGGRAPH', 'Asia'], 'Emerging Technologies'],
  [/SIGGRAPH.*Emerging Technologies/, 'SIGGRAPH', 'Emerging Technologies'],
  [/Adjunct.*Mobile Human-Computer Interaction/, 'MobileHCI', 'Adjunct'],
  [/Mobile Human-Computer Interaction/, 'MobileHCI'],
  [/Mensch und Computer/, 'MuC'],
  [/Communities & Technologies/, 'C&T'],
  [/Eye Tracking Research and Applications/, 'ETRA'],
  [/Companion.*Supporting Group Work/, 'GROUP', 'Companion'],
  [/EUSSET Conference on Computer.Supported Cooperative Work/, 'ECSCW'],
  [/ICTAI/, 'ICTAI'],
  [/Transactions on Computer-Human Interaction/, 'TOCHI', 'ACM Transactions'],
  [/Transactions on Computing for Healthcare/, 'HEALTH', 'ACM Transactions'],
  [/Interactive Health Conference/, ['Interactive', 'Health']],
  [/Romanian Journal of Information Technology and Automatic Control/, 'RRIA'],
  [/Transactions on Machine Learning Research/, 'TMLR'],
  [/International Journal of Computer Vision/, 'IJCV'],
  [/^arXiv/, 'arXiv', 'Preprint'],
]

// A venue this short is already its own short name ("ICLR 2025", "i-com").
const SHORT_ENOUGH = 12

/**
 * What to print on a publication's cover.
 * Returns { lines, track }: `lines` is the name, one entry per line.
 */
export const venueShortName = (publication) => {
  const venue = publication.venue ?? ''
  const rule = RULES.find(([pattern]) => pattern.test(venue))
  if (rule) return { lines: [rule[1]].flat(), track: rule[2] ?? null }

  // "ICML 2025 (AI4MATH Workshop)" -> ICML, with the workshop as the track.
  // The year is printed separately, so it comes off the name.
  const [, head, inParens] = venue.match(/^([^(]*?)\s*(?:\(([^)]*)\))?$/) ?? []
  const name = (head ?? '').replace(String(publication.year), '').replace(/\s+/g, ' ').trim()
  if (name && name.length <= SHORT_ENOUGH) return { lines: [name], track: inParens ?? null }

  return { lines: [publication.type], track: null }
}
