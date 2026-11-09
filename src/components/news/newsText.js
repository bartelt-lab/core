// [label](href) — the only markup news text uses (see src/data/news.js).
export const NEWS_LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g

/** The text with its [label](href) links reduced to the label, for cards and meta text. */
export const plainText = (text) => text.replace(NEWS_LINK, '$1')

export const formatNewsDate = (date, language) =>
  new Intl.DateTimeFormat(language === 'DE' ? 'de-DE' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`))
