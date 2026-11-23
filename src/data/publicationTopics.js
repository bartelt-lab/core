// Topics for the publications filter. Each publication in publications.json
// carries one or two of these ids in `topics`.
//
// DRAFT (2026-11): the list and every assignment were made from the paper
// titles alone and have not been reviewed by the authors. Expect a few wrong
// ones; fix them in publications.json. A paper may carry two topics.
//
// Labels are [German, English], like the rest of the site's data.
export const publicationTopics = [
  { id: 'xai', label: ['Erklärbare und interpretierbare KI', 'Explainable and interpretable AI'] },
  { id: 'llm', label: ['Sprachmodelle und Code', 'Language models and code'] },
  { id: 'ml', label: ['Methoden des maschinellen Lernens', 'Machine learning methods'] },
  { id: 'robotics', label: ['Robotik und autonome Systeme', 'Robotics and autonomous systems'] },
  { id: 'wearables', label: ['Wearables, Haptik und Sensorik', 'Wearables, haptics and sensing'] },
  { id: 'xr', label: ['Augmented Humans und XR', 'Augmented humans and XR'] },
  { id: 'health', label: ['Gesundheits- und Pflegetechnologie', 'Health and care technology'] },
  { id: 'design', label: ['Design, Lernen und Inklusion', 'Design, learning and inclusion'] },
]

const byId = new Map(publicationTopics.map((topic) => [topic.id, topic]))

/** [German, English] label for a topic id, or undefined for an unknown id. */
export const topicLabel = (id) => byId.get(id)?.label
