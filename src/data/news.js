/**
 * News items for the CORE Network homepage (`/`) and the news pages
 * (`/news`, `/news/<slug>`).
 *
 * Plain data, no bundler imports: src/routes.js imports this file so every item
 * gets its own prerendered page, title and og:image, and the build scripts load
 * routes.js with plain Node.
 *
 * Text fields are [German, English] pairs, like src/data/industryProjects.js.
 * Body paragraphs may contain links written as [label](href). An href starting
 * with "/" stays inside the site; anything else opens in a new tab.
 *
 * Newest first is not required: consumers sort by `date`.
 *
 * Optional per item: `logo` ({ src, alt }) for an organisation badge,
 * `imageFocus` (CSS object-position), `cta`, `people` (team.js slugs).
 */

export const news = [
    {
        slug: 'sascha-marton-nvidia',
        date: '2026-11-09',
        tag: ['Team', 'Team'],
        title: [
            'Von CORE zu NVIDIA: Sascha Marton forscht künftig an Tabular Foundation Models bei NVIDIA',
            'From CORE to NVIDIA: Sascha Marton joins NVIDIA to research tabular foundation models',
        ],
        // Short form for cards and the meta description.
        teaser: [
            'Dr. Sascha Marton wechselt ab November 2026 zu NVIDIA. Dort wird er an Tabular Foundation Models forschen, die neue Möglichkeiten für maschinelles Lernen auf tabellarischen Daten eröffnen.',
            'Dr. Sascha Marton joins NVIDIA in November 2026. There he will research tabular foundation models, which open up new possibilities for machine learning on tabular data.',
        ],
        lead: [
            'Dr. Sascha Marton ([Google Scholar](https://scholar.google.com/citations?user=5PQJ3sEAAAAJ)) wechselt ab November 2026 zu NVIDIA. Dort wird er an Tabular Foundation Models forschen, die neue Möglichkeiten für maschinelles Lernen auf tabellarischen Daten eröffnen.',
            'Dr. Sascha Marton ([Google Scholar](https://scholar.google.com/citations?user=5PQJ3sEAAAAJ)) joins NVIDIA in November 2026. There he will research tabular foundation models, which open up new possibilities for machine learning on tabular data.',
        ],
        body: [
            [
                'Wie lassen sich Entscheidungsbäume und Deep Learning miteinander verbinden? Mit dieser Frage beschäftigte sich Marton während seiner Promotion in der Forschungsgruppe AI Systems Engineering von Prof. Dr. Christian Bartelt an der Universität Mannheim. Daraus entstanden unter anderem die Verfahren GradTree und GRANDE sowie Veröffentlichungen auf führenden KI-Konferenzen wie AAAI und ICLR.',
                "How can decision trees and deep learning be combined? Marton pursued this question during his doctorate in Prof. Dr. Christian Bartelt's AI Systems Engineering research group at the University of Mannheim. The work produced, among other things, the methods GradTree and GRANDE, along with publications at leading AI conferences such as AAAI and ICLR.",
            ],
            [
                'Nach seiner Promotion wechselte Marton als Postdoc in die Forschungsgruppe COgnitive SoftwaRE (CORE), die Prof. Bartelt ([Google Scholar](https://scholar.google.de/citations?user=9FcF1gwAAAAJ&hl=de)) nach seinem Wechsel an die TU Clausthal am [ISSE](https://www.isse.tu-clausthal.de/) gründete. Hier verlagerte er seinen Forschungsschwerpunkt auf Tabular Foundation Models. Bei NVIDIA wird er diesen Schwerpunkt weiterverfolgen und gemeinsam im Team an Open-Source-Modellen arbeiten, die andere einsetzen und weiterentwickeln können. Wir als Forschungsgruppe CORE danken Dr. Sascha Marton für die sehr schönen und erfolgreichen Jahre in unserem Team und wünschen ihm in seiner weiteren Forschungskarriere weiterhin viel Erfolg und freuen uns über weitere Forschungskooperationen als neues Mitglied im [CORE Forschernetzwerk](/) in Zukunft.',
                'After his doctorate, Marton moved as a postdoc to the COgnitive SoftwaRE (CORE) research group, which Prof. Bartelt ([Google Scholar](https://scholar.google.de/citations?user=9FcF1gwAAAAJ&hl=de)) founded at the [ISSE](https://www.isse.tu-clausthal.de/) after moving to TU Clausthal. There he shifted his research focus to tabular foundation models. At NVIDIA he will continue this focus, working with his team on open-source models that others can use and build on. We at the CORE research group thank Dr. Sascha Marton for wonderful and successful years in our team, wish him continued success in his research career, and look forward to future research collaborations with him as a new member of the [CORE research network](/).',
            ],
            [
                'Sein Weg zeigt eine der Perspektiven, die universitäre KI-Forschung eröffnet: eigene Ideen entwickeln, international sichtbare Beiträge leisten und diese Erfahrung in die industrielle Spitzenforschung einbringen. Für angehende Promovierende bietet CORE ein Umfeld, das Grundlagenforschung, praktische Anwendungen und den Austausch mit internationalen Forschungs- und Industriepartnern verbindet.',
                'His path shows one of the perspectives that university AI research opens up: developing your own ideas, making internationally visible contributions, and bringing that experience into leading industrial research. For prospective doctoral students, CORE offers an environment that combines fundamental research, practical applications, and exchange with international research and industry partners.',
            ],
        ],
        cta: {
            heading: ['Du möchtest selbst an KI forschen?', 'Want to do AI research yourself?'],
            text: [
                'Wenn du dich für eine Promotion bei CORE interessierst, findest du weitere Informationen und Kontaktmöglichkeiten auf unserer Seite [Join us](/tuc/join-us).',
                "If you're interested in a PhD at CORE, you'll find more information and ways to get in touch on our [Join us](/tuc/join-us) page.",
            ],
            href: '/tuc/join-us',
            label: ['Zur Promotion bei CORE', 'Do a PhD at CORE'],
        },
        image: '/members/sascha-marton.webp',
        imageAlt: ['Porträt von Dr. Sascha Marton', 'Portrait of Dr. Sascha Marton'],
        // Square portrait: keep the face in frame in wide crops.
        imageFocus: '50% 30%',
        // Organisation the story is about, shown as a badge on the photo and in
        // the article header. NVIDIA asked for its logo to appear with the story.
        // File is the unmodified official SVG from nvidia.com.
        logo: { src: '/logos/partners/nvidia.svg', alt: 'NVIDIA' },
        people: ['marton', 'bartelt'],
    },
]

export const newsByDate = [...news].sort((a, b) => b.date.localeCompare(a.date))

export const findNews = (slug) => news.find((item) => item.slug === slug)
