// Operator details for /impressum and /datenschutz. One copy, read by both.
//
// The site is operated by Prof. Bartelt as a person (decided 2026-11): CORE is
// a network of researchers, not a body of the universities its members work at.
//
// Every field except `phone` is required. `legalDetailsComplete` below is false
// while one of them is missing: do not merge to main (which deploys) then.
export const operator = {
    name: 'Prof. Dr. Christian Bartelt',
    // Address and email as given by the operator, 2026-11.
    street: 'Thomasstraße 6',
    city: '38640 Goslar',
    country: ['Deutschland', 'Germany'],
    email: 'core.b@rtelt.net',
    // Optional. Left out on the operator's decision (2026-11); the Impressum
    // shows no phone line while this is null. Note the risk before copying this
    // pattern: § 5 DDG asks for a way of fast, direct contact besides email, and
    // a phone number is the usual way to meet that. Format when set: '+49 …'
    phone: null,
}

// Person responsible for editorial content (§ 18 Abs. 2 MStV). Same person
// unless someone else is named.
export const editor = operator

const REQUIRED = ['name', 'street', 'city', 'country', 'email']
export const legalDetailsComplete = REQUIRED.every((key) => operator[key] != null)

// Month the privacy policy text was last revised, shown at its foot.
export const privacyRevised = ['November 2026', 'November 2026']
