// [label](href) — the only markup news text uses (see src/data/news.js).
export const NEWS_LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g

/** The text with its [label](href) links reduced to the label, for cards and meta text. */
export const plainText = (text) => text.replace(NEWS_LINK, '$1')

// News carries month and year only (`date: 'YYYY-MM'`), shown as "July 2026".
export const formatNewsDate = (date, language) =>
  new Intl.DateTimeFormat(language === 'DE' ? 'de-DE' : 'en-GB', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date.slice(0, 7)}-01T00:00:00Z`))
