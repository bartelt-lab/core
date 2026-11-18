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
 * Optional per item: `imageCredit` ([de, en] caption under the article photo),
 * `featured: true` puts the item on the homepage ahead of
 * newer ones (the homepage shows two), `logo` ({ src, alt }) for an organisation badge,
 * `imageFocus` (CSS object-position), `imageFit: 'contain'` for uncropped logos,
 * `cta`, `people` (team.js slugs).
 */

export const news = [
    {
        slug: 'medicar-field-trial-freiburg',
        featured: true,
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
        featured: true,
        date: '2026-11',
        tag: ['Team', 'Team'],
        title: [
            'Von CORE zu NVIDIA: Sascha Marton forscht künftig an Tabular Foundation Models',
            'From CORE to NVIDIA: Sascha Marton to research tabular foundation models',
        ],
        // Short form for cards and the meta description.
        teaser: [
            'Dr. Sascha Marton wechselt im November 2026 zu NVIDIA. Dort wird er an Tabular Foundation Models forschen, die neue Möglichkeiten für maschinelles Lernen auf tabellarischen Daten eröffnen.',
            'Dr. Sascha Marton joins NVIDIA in November 2026. There he will research tabular foundation models, which open up new possibilities for machine learning on tabular data.',
        ],
        lead: [
            'Dr. [Sascha Marton](https://scholar.google.com/citations?user=5PQJ3sEAAAAJ) wechselt im November 2026 zu NVIDIA. Dort wird er an Tabular Foundation Models forschen: vortrainierten KI-Modellen, die neue Möglichkeiten für maschinelles Lernen auf tabellarischen Daten eröffnen.',
            'Dr. [Sascha Marton](https://scholar.google.com/citations?user=5PQJ3sEAAAAJ) joins NVIDIA in November 2026. He will research tabular foundation models: pretrained AI models that open up new ways to apply machine learning to data stored in tables.',
        ],
        body: [
            [
                'Während seiner Promotion in der Forschungsgruppe AI Systems Engineering von Prof. Dr. Christian Bartelt an der Universität Mannheim untersuchte Marton, wie sich Entscheidungsbäume und Deep Learning miteinander verbinden lassen. Daraus entstanden unter anderem die Verfahren [GradTree](https://ojs.aaai.org/index.php/AAAI/article/view/29345) und [GRANDE](https://openreview.net/forum?id=XEFWBxi075), die auf den internationalen KI-Konferenzen AAAI und ICLR veröffentlicht wurden.',
                'During his doctorate in Prof. Dr. Christian Bartelt’s AI Systems Engineering group at the University of Mannheim, Marton studied how to bring decision trees and deep learning together. His work led to methods including [GradTree](https://ojs.aaai.org/index.php/AAAI/article/view/29345) and [GRANDE](https://openreview.net/forum?id=XEFWBxi075), published at the international AI conferences AAAI and ICLR.',
            ],
            [
                'Nach seiner Promotion wechselte Marton als Postdoc in die Forschungsgruppe COgnitive SoftwaRE (CORE). Diese gründete [Prof. Dr. Christian Bartelt](https://scholar.google.de/citations?user=9FcF1gwAAAAJ&hl=de) nach seinem Wechsel an die TU Clausthal am [Institute for Software and Systems Engineering (ISSE)](https://www.isse.tu-clausthal.de/). Hier verlagerte Marton seinen Forschungsschwerpunkt auf Tabular Foundation Models.',
                'After completing his doctorate, Marton joined the COgnitive SoftwaRE (CORE) research group as a postdoctoral researcher. [Prof. Dr. Christian Bartelt](https://scholar.google.de/citations?user=9FcF1gwAAAAJ&hl=de) founded the group at the [Institute for Software and Systems Engineering (ISSE)](https://www.isse.tu-clausthal.de/) after moving to TU Clausthal. Here, Marton shifted his research focus to tabular foundation models.',
            ],
            [
                'Bei NVIDIA wird er diesen Schwerpunkt weiterverfolgen und gemeinsam mit seinem Team an Open-Source-Modellen arbeiten, die andere einsetzen und weiterentwickeln können.',
                'At NVIDIA, he will continue this work with his team, developing open-source models that others can use and build on.',
            ],
            [
                'Wir als Forschungsgruppe CORE danken Sascha Marton für die schöne und erfolgreiche Zusammenarbeit. Für seine weitere Forschungskarriere wünschen wir ihm viel Erfolg. Zugleich freuen wir uns auf weitere gemeinsame Forschungsprojekte und darauf, dass er uns als Mitglied im [CORE-Forschernetzwerk](/) verbunden bleibt.',
                'We at CORE thank Sascha Marton for the enjoyable and successful time working together. We wish him every success in his research career and look forward to further joint projects as he stays connected with us as a member of the [CORE research network](/).',
            ],
            [
                'Sein Weg zeigt eine Perspektive, die universitäre KI-Forschung eröffnet: eigene Ideen entwickeln, international sichtbare Beiträge leisten und diese Erfahrung in die industrielle Forschung einbringen. Für angehende Promovierende bietet CORE ein Umfeld, das Grundlagenforschung, praktische Anwendungen und den Austausch mit internationalen Forschungs- und Industriepartnern verbindet.',
                'His path shows one of the opportunities that university AI research offers: developing original ideas, making internationally visible contributions, and bringing that experience into industrial research. For prospective doctoral researchers, CORE combines fundamental research, practical applications, and collaboration with international academic and industry partners.',
            ],
        ],
        cta: {
            heading: ['Du möchtest selbst an KI forschen?', 'Want to research AI?'],
            text: [
                'Informationen zu einer Promotion bei CORE und Kontaktmöglichkeiten findest du auf unserer Seite [Promotion und Mitarbeit bei CORE](/tuc/join-us).',
                'Find information about a doctorate at CORE and how to get in touch on our [PhD opportunities and joining CORE](/tuc/join-us) page.',
            ],
            href: '/tuc/join-us',
            label: ['Zur Promotion bei CORE', 'Do a PhD at CORE'],
        },
        image: '/logos/nvidia.webp',
        imageAlt: ['NVIDIA-Logo', 'NVIDIA logo'],
        imageFit: 'contain',
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
    {
        slug: 'core-labs-opening-tu-clausthal',
        // Month of the TU Clausthal press release (3 July 2026); the release
        // does not date the kick-off event itself.
        date: '2026-07',
        tag: ['Netzwerk', 'Network'],
        title: ['Erstes CORE Lab an der TU Clausthal eröffnet', 'First CORE Lab opens at TU Clausthal'],
        teaser: [
            'Mit der Babeș-Bolyai-Universität Cluj und der Universität Rostock hat die TU Clausthal das erste Labor des europäischen CORE-Labs-Netzwerks in Betrieb genommen: eine Plattform für Embodied AI.',
            'Together with Babeș-Bolyai University in Cluj and the University of Rostock, TU Clausthal has put the first lab of the European CORE Labs network into operation: a platform for embodied AI.',
        ],
        lead: [
            'Bei einer Auftaktveranstaltung ging an der TU Clausthal das erste Labor der [CORE Labs](/core-labs) offiziell in Betrieb. Die Forschungsgruppe CORE am ISSE hat die Initiative gemeinsam mit der Babeș-Bolyai-Universität in Cluj und der Universität Rostock gestartet ([Pressemitteilung der TU Clausthal](https://www.tu-clausthal.de/pressemitteilungen/pressemitteilungendetail/europaeisches-robotiknetzwerk-fuer-embodied-ai-startet-an-der-tu-clausthal)).',
            'At a kick-off event, the first lab of the [CORE Labs](/core-labs) went into official operation at TU Clausthal. The CORE research group at the ISSE started the initiative together with Babeș-Bolyai University in Cluj and the University of Rostock ([TU Clausthal press release](https://www.tu-clausthal.de/pressemitteilungen/pressemitteilungendetail/europaeisches-robotiknetzwerk-fuer-embodied-ai-startet-an-der-tu-clausthal), in German).',
        ],
        body: [
            [
                'Ziel ist eine verteilte Laborplattform für Embodied AI, also für KI, die über Roboter in der realen Welt wahrnimmt, entscheidet und handelt. Im Clausthaler Labor stehen ein humanoider Roboter, ein autonomer Transportroboter und eine Testumgebung, die Augmented Reality mit robotischen Greifarmen verbindet. Weitere Labore entstehen in Cluj ([CORE Labs Cluj](/ubb)) und in Rostock.',
                'The aim is a distributed lab platform for embodied AI: AI that perceives, decides and acts through robots in the real world. The Clausthal lab has a humanoid robot, an autonomous transport robot and a test setup that combines augmented reality with robotic gripper arms. Further labs are being set up in Cluj ([CORE Labs Cluj](/ubb)) and Rostock.',
            ],
            [
                'Ein erstes Anwendungsfeld ist die Krankenhauslogistik im Projekt [MediCar 4.0](/tuc/industry-projects/medicar). Die Labore dienen auch der Lehre: Die Universitäten verbinden sie über gemeinsame Experimente, technische Plattformen und Lehrformate, und sie passen zum neuen Bachelorstudiengang AI Engineering an der TU Clausthal, der im Wintersemester 2026/27 startet.',
                'A first application area is hospital logistics in the [MediCar 4.0](/tuc/industry-projects/medicar) project. The labs also serve teaching: the universities connect them through shared experiments, technical platforms and teaching formats, and they fit the new AI Engineering bachelor’s programme at TU Clausthal, which starts in the winter semester 2026/27.',
            ],
        ],
        cta: {
            heading: ['Mehr zu den CORE Labs', 'More on CORE Labs'],
            text: [
                'Laborausstattung, Demonstrationen und Projekte stehen auf der [Seite der CORE Labs](/core-labs).',
                'Equipment, demonstrations and projects are on the [CORE Labs page](/core-labs).',
            ],
            href: '/core-labs',
            label: ['Zu den CORE Labs', 'See CORE Labs'],
        },
        image: '/images/news/core-labs-opening.webp',
        imageAlt: [
            'Gruppenbild zur Eröffnung der CORE Labs mit einem humanoiden Roboter im Clausthaler Labor',
            'Group photo at the CORE Labs opening with a humanoid robot in the Clausthal lab',
        ],
        imageFocus: '45% 50%',
        imageCredit: [
            'Von links: Dr. Christian Săcărea und Dr. Brigitte Breckner (Babeș-Bolyai-Universität), Prof. Joachim Deubener, Sari Abdan, David Szilagyi, Prof. Kai Kunze und Prof. Christian Bartelt (TU Clausthal). Foto: Christian Ernst, CORE',
            'From left: Dr. Christian Săcărea and Dr. Brigitte Breckner (Babeș-Bolyai University), Prof. Joachim Deubener, Sari Abdan, David Szilagyi, Prof. Kai Kunze and Prof. Christian Bartelt (TU Clausthal). Photo: Christian Ernst, CORE',
        ],
        people: ['bartelt', 'sacarea', 'ludtke', 'kai-kunze', 'szilagyi', 'sari-abdan'],
    },
    {
        slug: 'goslar-christmas-market-robot',
        // Visit at the start of the Goslar Christmas market season, late November
        // 2025; the TU Clausthal press release followed on 2 December 2025.
        date: '2025-11',
        tag: ['Robotik', 'Robotics'],
        title: [
            'Humanoider Roboter „Thorsten“ auf dem Goslarer Weihnachtsmarkt',
            'Humanoid robot “Thorsten” at the Goslar Christmas market',
        ],
        teaser: [
            'Als Nikolaus verkleidet verteilte der humanoide Roboter RO101 „Thorsten“ Geschenke auf dem Goslarer Weihnachtsmarkt: sein erster öffentlicher Auftritt und der Start des neuen Labors für kognitive Robotik.',
            'Dressed as Saint Nicholas, the humanoid robot RO101 “Thorsten” handed out gifts at the Goslar Christmas market: its first public appearance, and the start of the new lab for cognitive robotics.',
        ],
        lead: [
            'Zum Start der Weihnachtsmarktsaison war die Forschungsgruppe CORE mit ihrem humanoiden Roboter RO101 „Thorsten“ auf dem Goslarer Weihnachtsmarkt unterwegs ([Pressemitteilung der TU Clausthal](https://www.tu-clausthal.de/pressemitteilungen/pressemitteilungendetail/forschende-mit-humanoidem-kognitivem-roboter-auf-dem-weihnachtsmarkt)).',
            'At the start of the Christmas market season, the CORE research group took its humanoid robot RO101 “Thorsten” to the Goslar Christmas market ([TU Clausthal press release](https://www.tu-clausthal.de/pressemitteilungen/pressemitteilungendetail/forschende-mit-humanoidem-kognitivem-roboter-auf-dem-weihnachtsmarkt), in German).',
        ],
        body: [
            [
                'Als Nikolaus verkleidet verteilte Thorsten Geschenke, lief über das unebene Pflaster und applaudierte dem Publikum: seine ersten Begegnungen mit der Öffentlichkeit. Dabei waren Studierende der Digitalen Technologien, Austauschstudierende der Babeș-Bolyai-Universität in Cluj-Napoca und Schülerinnen und Schüler des Ratsgymnasiums Goslar, die ein Schnupperstudium an der TU Clausthal planen.',
                'Dressed as Saint Nicholas, Thorsten handed out gifts, walked across the uneven paving and applauded the crowd: his first encounters with the public. Students of Digital Technologies, exchange students from Babeș-Bolyai University in Cluj-Napoca and pupils of the Ratsgymnasium Goslar, who are planning a taster study period at TU Clausthal, came along.',
            ],
            [
                'Der Auftritt markierte den Start des neuen Labors für kognitive Robotik unter Leitung von Prof. Christian Bartelt. Dort erforscht die Gruppe Methoden, mit denen Roboter aus ihrer Umgebung und aus der Interaktion mit Menschen lernen, um sich in den Alltag einzufügen. Ende November 2025 gründete die Gruppe mit der Babeș-Bolyai-Universität außerdem die europäische Initiative [CORE Labs](/core-labs).',
                'The appearance marked the start of the new lab for cognitive robotics led by Prof. Christian Bartelt. There the group researches methods that let robots learn from their surroundings and from interaction with people, so they can fit into everyday life. At the end of November 2025 the group also founded the European [CORE Labs](/core-labs) initiative with Babeș-Bolyai University.',
            ],
        ],
        image: '/images/news/goslar-christmas-market.webp',
        imageAlt: [
            'Humanoider Roboter im Nikolauskostüm läuft über den Goslarer Weihnachtsmarkt',
            'Humanoid robot in a Saint Nicholas costume walking across the Goslar Christmas market',
        ],
        imageFocus: '45% 50%',
        imageCredit: ['Foto: CORE', 'Photo: CORE'],
        people: ['bartelt', 'szilagyi'],
    },
]

export const newsByDate = [...news].sort((a, b) => b.date.localeCompare(a.date))

/** Homepage order: featured items first (newest first), then everything else by date. */
export const homepageNews = [...newsByDate.filter((item) => item.featured), ...newsByDate.filter((item) => !item.featured)]

export const findNews = (slug) => news.find((item) => item.slug === slug)
