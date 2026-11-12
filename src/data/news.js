export const saschaMartonNvidia = {
  slug: 'sascha-marton-nvidia',
  path: '/news/sascha-marton-nvidia',
  date: '2026-11-12',
  institutions: ['TUC'],
  title: {
    en: 'From CORE to NVIDIA: Sascha Marton to research tabular foundation models',
    de: 'Von CORE zu NVIDIA: Sascha Marton forscht künftig an Tabular Foundation Models',
  },
  summary: {
    en: 'Sascha Marton joins NVIDIA in November 2026 to research tabular foundation models and work on open-source models that others can use and build on.',
    de: 'Sascha Marton wechselt im November 2026 zu NVIDIA. Dort erforscht er vortrainierte KI-Modelle für tabellarische Daten und arbeitet an offenen Modellen.',
  },
  image: '/logos/nvidia.webp',
  imageAlt: {
    en: 'NVIDIA logo',
    de: 'NVIDIA-Logo',
  },
}

// Dates are publication dates. Keep the most recent stories first.
export const newsArticles = [saschaMartonNvidia].sort((a, b) => b.date.localeCompare(a.date))

export function formatNewsDate(date, language) {
  return new Intl.DateTimeFormat(language === 'DE' ? 'de-DE' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`))
}
