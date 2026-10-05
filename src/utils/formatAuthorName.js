// publications.json stores names BibTeX-style ("Last, First"). Joining those
// with ", " makes the name-internal comma read as an author separator, so drop it
// for display: "Zenkner, Janis" -> "Zenkner Janis".
const formatAuthorName = (name) => name.replace(/\s*,\s*/, ' ').trim()

export default formatAuthorName
