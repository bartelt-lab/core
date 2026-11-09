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
 * `date` is 'YYYY-MM': news shows month and year only. Newest first is not
 * required: consumers sort by `date`.
 *
 * Optional per item: `logo` ({ src, alt }) for an organisation badge,
 * `imageFocus` (CSS object-position), `cta`, `people` (team.js slugs).
 */

export const news = [
    {
        slug: 'medicar-field-trial-freiburg',
        // Field trial month, as given by the project team. The detail text
        // comes from the MediCar page (src/pages/tuc/industry/MediCar.jsx).
        date: '2026-07',
        tag: ['Projekte', 'Projects'],
        title: [
            'MediCar 4.0: Autonomer Transport im Feldversuch am Universitätsklinikum Freiburg',
            'MediCar 4.0: autonomous hospital transport in a field trial at the University Medical Center Freiburg',
        ],
        teaser: [
            'Im Juli 2026 wurde MediCar 4.0 am Universitätsklinikum Freiburg im Feldversuch erprobt. Unser Teil: Sprachmodelle, die Routen live anpassen, und Roboter, die Transportboxen selbst be- und entladen.',
            'In July 2026, MediCar 4.0 was tested in a field trial at the University Medical Center Freiburg. Our part: language models that adapt routes live, and robots that load and unload the transport boxes themselves.',
        ],
        lead: [
            'Blutproben, Medikamente, Material: [MediCar 4.0](/tuc/industry-projects/medicar) bringt sie im Krankenhaus mit autonomen Transportfahrzeugen bedarfsgerecht ans Ziel. Im Juli 2026 wurde das System am Universitätsklinikum Freiburg im Feldversuch erprobt.',
            'Blood samples, medication, supplies: [MediCar 4.0](/tuc/industry-projects/medicar) gets them where they are needed in the hospital, with autonomous transport vehicles. In July 2026 the system was tested in a field trial at the University Medical Center Freiburg.',
        ],
        body: [
            [
                'Klassische Routenführung kennt nur, was vorab definiert wurde. Eine blockierte Zufahrt, ein Unfall auf dem Parkplatz oder eine Baustelle bringen sie aus dem Takt. Bei MediCar 4.0 werten große Sprachmodelle die Meldungen von Klinikmitarbeitenden aus und erzeugen kleine Programme, die einzelne Wegabschnitte in Echtzeit neu bewerten. Ein Routenalgorithmus berechnet daraus laufend die beste Strecke, und das Klinikpersonal sieht auf der Karte, warum sich eine Route geändert hat.',
                'Classic route guidance only knows what was defined in advance. A blocked access road, an accident in the car park or a construction site throws it off. In MediCar 4.0, large language models evaluate reports from hospital staff and generate small programs that re-score individual path segments in real time. A routing algorithm continuously computes the best route from them, and staff can see on the map why a route has changed.',
            ],
            [
                'Bislang be- und entladen Menschen die Transportboxen. Wir erproben Roboter, die Objekte erkennen, greifen und ablegen: Ein Sprachmodell zerlegt jede Aufgabe in einzelne Schritte, eine trainierte Steuerung führt die Greifbewegungen aus. Trainiert und getestet wird zunächst in virtuellen, zufällig variierten Krankenhausräumen. So lassen sich viele Situationen sicher durchspielen, bevor ein Roboter in der realen Welt arbeitet. Beide Bausteine brauchen viel Rechenleistung: Auf dem [GenAI-Cluster](/compute-cluster) der TU Clausthal trainieren wir Sprachmodelle und evaluieren das Routing in zahlreichen Szenarien.',
                'Today, people still load and unload the transport boxes. We are testing robots that recognise, grasp and place objects: a language model breaks each task into individual steps, and a trained controller carries out the grasping motions. Training and testing start in virtual, randomly varied hospital rooms, so many situations can be played through safely before a robot works in the real world. Both building blocks need a lot of computing power: on the TU Clausthal [GenAI-Cluster](/compute-cluster) we train language models and evaluate the routing across many scenarios.',
            ],
            [
                'Unsere Komponenten wurden mit den Systemen der Projektpartner zusammengeführt und am Universitätsklinikum Freiburg im Feldversuch erprobt. Sie sind modular aufgebaut und lassen sich nach dem Plug&Work-Prinzip in bestehende Systeme einbinden. Künftig sollen auch Pflege- und Betreuungseinrichtungen profitieren.',
                'Our components were integrated with the partners’ systems and tested in the field trial at the University Medical Center Freiburg. They are modular and plug into existing systems following the plug-and-work principle. In future, care and nursing facilities are meant to benefit as well.',
            ],
        ],
        cta: {
            heading: ['Mehr zu MediCar 4.0', 'More on MediCar 4.0'],
            text: [
                'Projektfilm, Partner und Details zu unserem Beitrag stehen auf der [MediCar-Projektseite](/tuc/industry-projects/medicar).',
                'The project film, the partners and details of our contribution are on the [MediCar project page](/tuc/industry-projects/medicar).',
            ],
            href: '/tuc/industry-projects/medicar',
            label: ['Zum Projekt', 'Explore the project'],
        },
        image: '/images/projects/industry/medicar/corridor.webp',
        imageAlt: [
            'MediCar-Transportroboter mit blauen Transportboxen im Foyer einer Klinik',
            'MediCar transport robot carrying blue transport boxes in a hospital lobby',
        ],
        imageFocus: '61% 50%',
        people: ['bartelt'],
    },
    {
        slug: 'sascha-marton-nvidia',
        date: '2026-11',
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
    {
        slug: 'ecml-pkdd-2026-transduction-induction',
        date: '2026-09',
        tag: ['Publikationen', 'Publications'],
        title: [
            'Paper auf der ECML PKDD 2026 angenommen: Transduktion und Induktion im Zusammenspiel',
            'Paper accepted at ECML PKDD 2026: transduction and induction working together',
        ],
        teaser: [
            'Janis Zenkner, Tobias Sesterhenn und Christian Bartelt stellen TIIPS vor: ein Verfahren, in dem sich Transduktion und Induktion bei der Programmsynthese gegenseitig leiten.',
            'Janis Zenkner, Tobias Sesterhenn and Christian Bartelt introduce TIIPS, a method in which transduction and induction guide each other during program synthesis.',
        ],
        lead: [
            'Unser Paper [Beyond Either-Or Reasoning: Transduction and Induction as Cooperative Problem-Solving Paradigms](https://arxiv.org/abs/2505.14744) wurde auf der ECML PKDD 2026 angenommen.',
            'Our paper [Beyond Either-Or Reasoning: Transduction and Induction as Cooperative Problem-Solving Paradigms](https://arxiv.org/abs/2505.14744) has been accepted at ECML PKDD 2026.',
        ],
        body: [
            [
                'Beim Programming by Example sieht ein System wenige Ein- und Ausgabepaare und soll ein Programm finden, das sie erklärt. Bisher wird meist eines von zwei Vorgehen gewählt: Induktion schreibt das Programm, Transduktion sagt die Ausgaben direkt vorher. TIIPS verschränkt beide, sodass sie die Programmsynthese gemeinsam leiten und das Verhalten der gefundenen Lösungen verbessern.',
                'In programming by example, a system sees a few input–output pairs and has to find a program that explains them. Usually one of two approaches is chosen: induction writes the program, transduction predicts the outputs directly. TIIPS interleaves the two, so that together they guide program synthesis and improve how the resulting solutions behave.',
            ],
        ],
        cta: {
            heading: ['Alle Publikationen', 'All publications'],
            text: [
                'Paper, Preprints und Workshop-Beiträge aus dem Netzwerk stehen auf der [Publikationsseite](/publications).',
                'Papers, preprints and workshop contributions from the network are on the [publications page](/publications).',
            ],
            href: '/publications',
            label: ['Publikationen ansehen', 'Browse publications'],
        },
        image: '/papers/tiips.webp',
        imageAlt: ['Abbildung aus dem TIIPS-Paper', 'Figure from the TIIPS paper'],
        people: ['zenkner', 'sesterhenn', 'bartelt'],
    },
    {
        slug: 'icml-cvpr-2026-workshops',
        date: '2026-07',
        tag: ['Publikationen', 'Publications'],
        title: [
            'Zwei Paper auf Workshops der ICML und CVPR 2026: egozentrisches Video und erklärbare KI',
            'Two papers at ICML and CVPR 2026 workshops: egocentric video and explainable AI',
        ],
        teaser: [
            'BARISTA, ein Benchmark für egozentrisches Videoverstehen, und Concepts in Motion, ein erklärbares Modell zur Videoklassifikation, wurden auf drei Workshops angenommen.',
            'BARISTA, a benchmark for egocentric video understanding, and Concepts in Motion, an interpretable model for video classification, were accepted at three workshops.',
        ],
        lead: [
            'Zwei Paper mit Patrick Knab als Erstautor wurden im Juli 2026 auf Workshops der ICML und der CVPR angenommen.',
            'Two papers with Patrick Knab as first author were accepted at ICML and CVPR workshops in July 2026.',
        ],
        body: [
            [
                '[BARISTA: A Multi-Task Egocentric Benchmark for Compositional Visual Understanding](https://openreview.net/forum?id=xtnrFDmu1O) ist ein Benchmark mit mehreren Aufgaben für das Verstehen von Videos aus der Ich-Perspektive. Angenommen auf dem ICML-2026-Workshop Combining Theory and Benchmarks.',
                '[BARISTA: A Multi-Task Egocentric Benchmark for Compositional Visual Understanding](https://openreview.net/forum?id=xtnrFDmu1O) is a multi-task benchmark for understanding video from the first-person view. Accepted at the ICML 2026 workshop Combining Theory and Benchmarks.',
            ],
            [
                '[Concepts in Motion: Temporal Concept Bottleneck Model for Interpretable Video Classification](https://arxiv.org/abs/2509.20899) stellt MoTIF vor: Das Modell findet mit Vision-Language-Modellen Konzepte in Videos und modelliert, wie sie sich über die Zeit verändern. So lässt sich jede Klassifikation über diese Konzepte nachvollziehen. Angenommen auf dem CVPR-2026-Workshop XAI4CV und dem ICML-2026-Workshop CompLearn; [Projektseite](https://patrick-knab.github.io/MoTIF/).',
                '[Concepts in Motion: Temporal Concept Bottleneck Model for Interpretable Video Classification](https://arxiv.org/abs/2509.20899) introduces MoTIF. It discovers concepts in videos with vision-language models and models how they change over time, so each classification can be traced back to those concepts. Accepted at the CVPR 2026 XAI4CV workshop and the ICML 2026 CompLearn workshop; [project page](https://patrick-knab.github.io/MoTIF/).',
            ],
        ],
        image: '/papers/barista.webp',
        imageAlt: ['Abbildung aus dem BARISTA-Paper', 'Figure from the BARISTA paper'],
        people: ['knab', 'marton', 'bartelt'],
    },
    {
        slug: 'tmlr-2026-concept-bottleneck-survey',
        date: '2026-05',
        tag: ['Publikationen', 'Publications'],
        title: [
            'Übersichtsarbeit in TMLR: eine Roadmap für Concept Bottleneck Models',
            'Survey in TMLR: a roadmap for concept bottleneck models',
        ],
        teaser: [
            'Concept Bottleneck Models treffen Vorhersagen über verständliche Konzepte. Eine Übersichtsarbeit in Transactions on Machine Learning Research ordnet das Feld und zeigt, wo es hingehen kann.',
            'Concept bottleneck models make predictions through human-understandable concepts. A survey in Transactions on Machine Learning Research maps the field and where it can go next.',
        ],
        lead: [
            '[What’s in the Bottle? A Survey and Roadmap of Concept Bottleneck Models](https://openreview.net/forum?id=IF5vnqxBEW) ist in Transactions on Machine Learning Research (TMLR) erschienen, mit Patrick Knab als Erstautor und Christian Bartelt als Koautor.',
            '[What’s in the Bottle? A Survey and Roadmap of Concept Bottleneck Models](https://openreview.net/forum?id=IF5vnqxBEW) has been published in Transactions on Machine Learning Research (TMLR), with Patrick Knab as first author and Christian Bartelt as co-author.',
        ],
        body: [
            [
                'Ein Concept Bottleneck Model sagt nicht direkt das Ergebnis vorher, sondern zuerst Konzepte, die Menschen verstehen, und entscheidet dann auf deren Grundlage. So bleibt sichtbar, worauf eine Entscheidung beruht. Die Übersichtsarbeit benennt die Kernbausteine und offenen Probleme solcher Modelle und schlägt eine einheitliche Taxonomie und eine Roadmap für künftige Forschung vor.',
                'A concept bottleneck model does not predict the result directly: it first predicts concepts that people understand, then decides on that basis, so it stays visible what a decision rests on. The survey names the core components and open problems of these models and proposes a unified taxonomy and a roadmap for future research.',
            ],
            [
                'Die Arbeit knüpft an unsere eigenen Modelle an, etwa [DCBM](https://arxiv.org/abs/2412.11576) für dateneffiziente visuelle Concept Bottleneck Models auf der ICML 2025.',
                'It builds on our own models, such as [DCBM](https://arxiv.org/abs/2412.11576), data-efficient visual concept bottleneck models at ICML 2025.',
            ],
        ],
        image: '/papers/whats-in-the-bottle.webp',
        imageAlt: ['Abbildung aus der Übersichtsarbeit zu Concept Bottleneck Models', 'Figure from the concept bottleneck model survey'],
        people: ['knab', 'bartelt'],
    },
    {
        slug: 'iclr-icse-2025',
        date: '2025-04',
        tag: ['Publikationen', 'Publications'],
        title: ['Sechs Paper auf der ICLR und ICSE 2025', 'Six papers at ICLR and ICSE 2025'],
        teaser: [
            'Sechs Paper von CORE-Mitgliedern oder mit ihrer Beteiligung wurden auf der ICLR 2025 in Singapur und der ICSE 2025 in Seoul angenommen, auf den Hauptkonferenzen und auf Workshops.',
            'Six papers authored or co-authored by CORE members were accepted at ICLR 2025 in Singapore and ICSE 2025 in Seoul, at the main conferences and at workshops.',
        ],
        lead: [
            'Sechs Paper von CORE-Mitgliedern oder mit ihrer Beteiligung wurden auf der International Conference on Learning Representations (ICLR 2025) in Singapur und der International Conference on Software Engineering (ICSE 2025) in Seoul angenommen.',
            'Six papers authored or co-authored by CORE members were accepted at the International Conference on Learning Representations (ICLR 2025) in Singapore and the International Conference on Software Engineering (ICSE 2025) in Seoul.',
        ],
        body: [
            [
                'Auf der ICLR-Hauptkonferenz stellt [SYMPOL](https://arxiv.org/pdf/2408.08761) eine Methode vor, die Entscheidungsbäume direkt in gängigen On-Policy-Verfahren des Reinforcement Learning optimiert. Die Policy bleibt so als Baum lesbar, ohne den Informationsverlust, der entsteht, wenn man ein neuronales Netz nachträglich in einen Baum übersetzt. Ebenfalls auf der ICLR: NNsight und NDIF, die Forschenden Zugang zum Innenleben großer Open-Weight-Modelle geben.',
                'At the ICLR main conference, [SYMPOL](https://arxiv.org/pdf/2408.08761) optimises decision trees directly inside standard on-policy reinforcement learning algorithms. The policy stays readable as a tree, without the information loss of translating a neural network into one afterwards. Also at ICLR: NNsight and NDIF, which give researchers access to the internals of large open-weight models.',
            ],
            [
                'Auf der ICSE-Hauptkonferenz zeigt GUIDE, wie große Sprachmodelle aus Textbeschreibungen Prototypen von Benutzeroberflächen erzeugen. Alle sechs Paper stehen auf unserer [Seite zur ICLR und ICSE 2025](https://www.core-network.ai/tuc/iclr-2025/).',
                'At the ICSE main conference, GUIDE shows how large language models generate user interface prototypes from text descriptions. All six papers are on our [ICLR and ICSE 2025 page](https://www.core-network.ai/tuc/iclr-2025/).',
            ],
        ],
        image: '/papers/mitigating.webp',
        imageAlt: ['Abbildung aus dem SYMPOL-Paper', 'Figure from the SYMPOL paper'],
        people: ['marton', 'grams', 'ludtke', 'bartelt'],
    },
    {
        slug: 'genai-cluster',
        // Month the cluster page gives for commissioning ("by Sep 1, 2025"), not a
        // confirmed go-live date. Correct it if the cluster started later.
        date: '2025-09',
        tag: ['Infrastruktur', 'Infrastructure'],
        title: [
            'GenAI-Cluster: eigene GPUs zum Trainieren und Evaluieren von Modellen',
            'GenAI-Cluster: our own GPUs for training and evaluating models',
        ],
        teaser: [
            'Mit über 400.000 Euro aus Mitteln der EU und Niedersachsens hat das CORE-Netzwerk einen eigenen GPU-Cluster: 20 NVIDIA-GPUs, davon 8 vom Typ H200.',
            'With more than €400,000 from the EU and Lower Saxony, the CORE network has its own GPU cluster: 20 NVIDIA GPUs, 8 of them H200.',
        ],
        lead: [
            'Mit über 400.000 Euro aus Mitteln der EU und Niedersachsens hat das CORE-Netzwerk einen eigenen [GPU-Cluster](/compute-cluster) für Forschung und Lehre.',
            'With more than €400,000 from the EU and Lower Saxony, the CORE network has its own [GPU cluster](/compute-cluster) for research and teaching.',
        ],
        body: [
            [
                'Zwei Hochleistungsknoten mit NVIDIA-H200-NVL-GPUs, verbunden über NVLink, sind für das Feintuning von Modellen bis 70 Milliarden Parametern und für die Inferenz offener Modelle wie Llama 3, Qwen 3 und Gemma 3 ausgelegt. Zwei weitere Knoten mit 12 NVIDIA RTX PRO 6000 Blackwell eignen sich für das ressourcenschonende Training kleinerer Modelle und für Vision-Modelle.',
                'Two high-performance nodes with NVIDIA H200 NVL GPUs, connected via NVLink, are built for fine-tuning models up to 70 billion parameters and for inference of open models such as Llama 3, Qwen 3 and Gemma 3. Two further nodes with 12 NVIDIA RTX PRO 6000 Blackwell GPUs handle resource-efficient training of smaller models and vision models.',
            ],
            [
                'Weil die Daten auf eigener Infrastruktur bleiben, lassen sich Modelle jederzeit anpassen und Experimente ohne Wartezeit starten. Das nutzt etwa das Projekt [MediCar 4.0](/tuc/industry-projects/medicar). Regelmäßige Workshops stellen den Cluster Wissenschaft, Start-ups und Industrie vor.',
                'Because data stays on our own infrastructure, models can be adapted at any time and experiments start without waiting. The [MediCar 4.0](/tuc/industry-projects/medicar) project, for example, relies on it. Regular workshops introduce the cluster to researchers, start-ups and industry.',
            ],
        ],
        cta: {
            heading: ['Mehr zum Cluster', 'More on the cluster'],
            text: [
                'Hardware, Standorte und Nutzungsregeln stehen auf der [Seite zum Rechencluster](/compute-cluster).',
                'Hardware, sites and usage policies are on the [compute cluster page](/compute-cluster).',
            ],
            href: '/compute-cluster',
            label: ['Zum Cluster', 'See the cluster'],
        },
        image: '/images/hero/compute-cluster-hero.webp',
        imageAlt: ['Illustration von Server-Racks', 'Illustration of server racks'],
    },
]

export const newsByDate = [...news].sort((a, b) => b.date.localeCompare(a.date))

export const findNews = (slug) => news.find((item) => item.slug === slug)
