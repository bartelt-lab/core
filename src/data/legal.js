// Operator details for /impressum and /datenschutz. One copy, read by both.
//
// The site is operated by Prof. Bartelt as a person (decided 2026-11): CORE is
// a network of researchers, not a body of the universities its members work at.
//
// A field set to `null` is NOT YET CONFIRMED. The legal pages render it as a
// highlighted "missing" marker, and `legalDetailsComplete` below is false.
// Do not merge to main (which deploys) while anything here is null: an
// incomplete Impressum is worse than a late one.
export const operator = {
    name: 'Prof. Dr. Christian Bartelt',
    // Address confirmed 2026-11.
    building: 'DIGIT Center of Technologies',
    street: 'Wallstraße 6',
    city: '38640 Goslar',
    country: ['Deutschland', 'Germany'],
    email: 'bartelt@isse.tu-clausthal.de',
    // Required: a second, fast contact channel besides email. Format: '+49 …'
    phone: null,
}

// Person responsible for editorial content (§ 18 Abs. 2 MStV). Same person
// unless someone else is named.
export const editor = operator

export const legalDetailsComplete = Object.values(operator).every((value) => value !== null)

// Month the privacy policy text was last revised, shown at its foot.
export const privacyRevised = ['November 2026', 'November 2026']
