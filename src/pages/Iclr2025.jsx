import { FaArrowRight } from 'react-icons/fa'
import { useLanguage } from '../i18n/useLanguage'
import assetUrl from '../utils/assetUrl'

// Papers by CORE members at ICLR and ICSE 2025. This replaced the standalone
// static page that used to sit at public/tuc/iclr-2025/; that address still
// works and forwards here (see App.jsx and routes.js).
// Text pairs are [German, English]. Paper titles stay in English.
const IMG = '/images/iclr-2025'

const venues = [
  {
    id: 'iclr-main',
    title: ['ICLR-Hauptkonferenz', 'ICLR Main Conference'],
    papers: [
      {
        title: 'Mitigating Information Loss in Tree-Based Reinforcement Learning via Direct Optimization',
        href: 'https://arxiv.org/abs/2408.08761',
        image: 'marton_mitigating.webp',
        affiliations: ['University of Mannheim', 'TU Clausthal', 'University of Rostock'],
        description: [
          'Das Paper stellt SYMPOL vor, ein Verfahren, das symbolische, baumbasierte Modelle mit Policy-Gradient-Methoden verbindet, um Reinforcement Learning besser interpretierbar zu machen. SYMPOL optimiert achsenparallele Entscheidungsbäume direkt und durchgängig innerhalb gängiger On-Policy-Algorithmen und vermeidet so den Informationsverlust, der bei herkömmlichen Policies auf Basis neuronaler Netze entsteht.',
          'The paper introduces SYMPOL, a method that integrates symbolic, tree-based models with policy gradient methods to make reinforcement learning more interpretable. By enabling direct, end-to-end optimization of axis-aligned decision trees within standard on-policy RL algorithms, SYMPOL addresses the information loss associated with traditional neural network policies.',
        ],
      },
      {
        title: 'NNsight and NDIF: Democratizing Access to Open-Weight Foundation Model Internals',
        href: 'https://arxiv.org/abs/2407.14561',
        image: 'ndif.webp',
        affiliations: ['Northeastern University', 'TU Clausthal', 'University of Hamburg'],
        description: [
          'Das Paper stellt NNsight vor, eine Open-Source-Erweiterung für PyTorch, die Berechnungen verzögert und auf entfernten Rechnern ausführt, sowie NDIF, einen skalierbaren Inferenzdienst, über den GPU-Ressourcen und vortrainierte Modelle geteilt werden. Zusammen ermöglichen sie einen transparenten Zugriff auf das Innere großer neuronaler Netze wie großer Sprachmodelle, ohne dass jede Gruppe eigene angepasste Modelle betreiben muss.',
          'The paper introduces NNsight, an open-source extension to PyTorch enabling deferred remote execution, and NDIF, a scalable inference service for sharing GPU resources and pretrained models. Together, they give transparent access to the internals of large neural networks, such as large language models, without each group having to host customized models.',
        ],
      },
    ],
  },
  {
    id: 'icse-main',
    title: ['ICSE-Hauptkonferenz', 'ICSE Main Conference'],
    papers: [
      {
        title: 'GUIDE: LLM-Driven GUI Generation Decomposition for Automated Prototyping',
        href: 'https://arxiv.org/abs/2502.21068',
        image: 'guide.webp',
        affiliations: ['TU Clausthal', 'Karlsruhe Institute of Technology', 'University of Mannheim'],
        description: [
          'Das Paper stellt GUIDE vor, einen Ansatz, der mit großen Sprachmodellen Prototypen grafischer Benutzeroberflächen automatisch erzeugt, indem er allgemeine Textbeschreibungen in feingranulare GUI-Anforderungen zerlegt. GUIDE ist in das Prototyping-Werkzeug Figma integriert und übersetzt diese Anforderungen per Retrieval-Augmented Generation in bearbeitbare Material-Design-Komponenten. Das macht das Ergebnis besser steuerbar und den Prototyping-Prozess schlanker.',
          'The paper introduces GUIDE, an approach that uses large language models to automate the generation of graphical user interface prototypes by decomposing high-level textual descriptions into fine-grained GUI requirements. Integrated with the prototyping tool Figma, GUIDE uses retrieval-augmented generation to translate these requirements into editable Material Design components, which improves controllability and streamlines prototyping.',
        ],
      },
    ],
  },
  {
    id: 'iclr-workshops',
    title: ['ICLR-Workshops', 'ICLR Workshops'],
    papers: [
      {
        title: 'Decision Trees That Remember: Gradient-Based Learning of Recurrent Decision Trees with Memory',
        href: 'https://openreview.net/forum?id=u2Hh24rxW1',
        image: 'marton.webp',
        affiliations: ['University of Mannheim', 'Boehringer Ingelheim', 'TU Clausthal', 'University of Rostock'],
        description: [
          'Das Paper stellt ReMeDe Trees vor, eine Entscheidungsbaum-Architektur für sequenzielle Daten mit einem internen Gedächtnis, ähnlich dem rekurrenter neuronaler Netze. Während klassische Entscheidungsbäume zeitliche Abhängigkeiten nur über Feature Engineering erfassen, lernen ReMeDe Trees harte, achsenparallele Entscheidungsregeln sowohl für die Ausgabe als auch für die Aktualisierung des Zustands, effizient optimiert per Gradientenabstieg.',
          'The paper introduces ReMeDe Trees, a decision tree architecture for sequential data with an internal memory mechanism akin to that of recurrent neural networks. Unlike traditional decision trees, which rely on feature engineering to capture temporal dependencies, ReMeDe Trees learn hard, axis-aligned decision rules for both output generation and state updates, optimized efficiently via gradient descent.',
        ],
      },
      {
        title: 'Disentangling Exploration of Large Language Models by Optimal Exploitation',
        href: 'https://arxiv.org/abs/2501.08925',
        image: 'grams_disentangling.webp',
        affiliations: ['TU Clausthal', 'University of Mannheim'],
        description: [
          'Das Paper untersucht, wie gut große Sprachmodelle explorieren. Es betrachtet Exploration als alleiniges Ziel und führt ein Framework ein, das entgangene Belohnungen anhand des optimal erreichbaren Ertrags in einen Explorations- und einen Exploitationsanteil zerlegt.',
          'The paper investigates the exploration capabilities of large language models by isolating exploration as the sole objective and introducing a framework that decomposes missing rewards into exploration and exploitation components, based on the optimal achievable return.',
        ],
      },
      {
        title: 'Shedding Light on Task Decomposition in Program Synthesis: The Driving Force of the Synthesizer Model',
        href: 'https://arxiv.org/abs/2503.08738',
        image: 'zenkner_shedding.webp',
        affiliations: ['TU Clausthal'],
        description: [
          'Das Paper vergleicht ExeDec, ein Framework für Programmsynthese mit expliziter Aufgabenzerlegung, mit REGISM, einer Variante, die allein auf iterative, ausführungsgeleitete Synthese setzt. ExeDec überzeugt dank seiner Zerlegungsstrategie bei Längengeneralisierung und Konzeptkomposition; REGISM erreicht oder übertrifft diese Leistung jedoch häufig. Wiederholte Ausführung kann also in vielen Szenarien ebenso wirksam oder wirksamer sein.',
          'This paper compares ExeDec, a program synthesis framework that uses explicit task decomposition, with REGISM, its variant that relies solely on iterative execution-guided synthesis. While ExeDec performs strongly in length generalization and concept composition thanks to its decomposition strategy, REGISM often matches or exceeds it, suggesting that repeated execution can be equally or more effective in many scenarios.',
        ],
      },
      {
        title: 'Beyond Pixels: Enhancing LIME with Hierarchical Features and Segmentation Foundation Models',
        href: 'https://arxiv.org/abs/2403.07733',
        image: 'dseg_lime.webp',
        affiliations: ['TU Clausthal', 'University of Mannheim'],
        description: [
          'Das Paper stellt DSEG-LIME vor, ein verbessertes Framework für Local Interpretable Model-agnostic Explanations (LIME) in der Bildanalyse. Es nutzt Foundation-Modelle für eine datengetriebene Segmentierung und erlaubt eine vom Nutzer gesteuerte hierarchische Segmentierung. So entsprechen die Erklärungen eher den Konzepten, die Menschen erkennen, und DSEG-LIME übertrifft herkömmliche Verfahren bei mehreren Metriken für erklärbare KI.',
          'The paper introduces DSEG-LIME, an improved framework for Local Interpretable Model-agnostic Explanations (LIME) in image analysis. By integrating data-driven segmentation through foundation models and enabling user-controlled hierarchical segmentation, DSEG-LIME aligns explanations more closely with human-recognized concepts and outperforms traditional methods on several explainable AI metrics.',
        ],
      },
      {
        title: 'Unreflected Use of Tabular Data Repositories Can Undermine Research Quality',
        href: 'https://arxiv.org/abs/2503.09159',
        image: 'tschalzev_unreflected.webp',
        affiliations: ['University of Mannheim', 'TU Clausthal', 'University of Rostock', 'University of Freiburg'],
        description: [
          'Das Paper zeigt, dass die unkritische Nutzung von Datensätzen aus Repositorien wie OpenML die Qualität von Forschung gefährden kann. Die Autoren belegen an Beispielen Probleme wie eine unzureichende Modellauswahl, fehlende robuste Baselines und fehlerhafte Vorverarbeitung und schlagen Verbesserungen für den Umgang mit Daten-Repositorien vor, um empirische Forschung zu stärken.',
          'The paper shows that indiscriminate use of datasets from repositories such as OpenML can compromise research integrity. The authors present cases illustrating issues such as suboptimal model selection, neglect of robust baselines and improper preprocessing, and propose improvements to data repository practices to strengthen empirical research standards.',
        ],
      },
    ],
  },
]

const PaperCard = ({ paper, pick }) => (
  <article className="group relative grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-[0_24px_60px_-28px_rgb(var(--primary-700)/0.45)] focus-within:ring-2 focus-within:ring-primary-500 sm:grid-cols-[11rem_minmax(0,1fr)] md:grid-cols-[13rem_minmax(0,1fr)]">
    {/* The images are first pages of the papers: portrait, on white. Show the
        top of the page, and keep the plate white in dark mode. */}
    <div className="border-b border-slate-200 bg-[#fff] p-3 sm:border-b-0 sm:border-r">
      <img src={assetUrl(`${IMG}/${paper.image}`)} alt="" loading="lazy" decoding="async" className="mx-auto aspect-[4/5] w-full max-w-[13rem] rounded border border-[#e2e8f0] object-cover object-top" />
    </div>
    <div className="flex flex-col p-5 sm:p-6">
      <h3 className="text-lg font-bold leading-snug text-slate-950">
        <a
          href={paper.href}
          target="_blank"
          rel="noreferrer"
          className="transition-colors after:absolute after:inset-0 after:content-[''] focus:outline-none group-hover:text-primary-700"
        >
          {paper.title}
        </a>
      </h3>
      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={pick('Affiliations', 'Zugehörigkeiten')}>
        {paper.affiliations.map((name) => (
          <li key={name} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">{name}</li>
        ))}
      </ul>
      <p className="mt-3 text-sm leading-6 text-slate-600">{pick(paper.description[1], paper.description[0])}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary-700">
        {pick('Read the paper', 'Zum Paper')}
        <FaArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </div>
  </article>
)

const Iclr2025 = () => {
  const { pick } = useLanguage()

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="container mx-auto max-w-6xl px-6 pb-12 pt-32 md:px-12 lg:px-20">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary-700">{pick('Conferences 2025', 'Konferenzen 2025')}</p>
          <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-slate-950 md:text-5xl">
            {pick('CORE at ICLR and ICSE 2025', 'CORE auf der ICLR und ICSE 2025')}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            {pick(
              'Papers authored or co-authored by CORE members, accepted at the main conferences and workshops of the 2025 International Conference on Learning Representations (ICLR) in Singapore and the 2025 International Conference on Software Engineering (ICSE).',
              'Paper von CORE-Mitgliedern als Autorinnen, Autoren oder Mitautoren, angenommen auf den Hauptkonferenzen und Workshops der International Conference on Learning Representations (ICLR) 2025 in Singapur und der International Conference on Software Engineering (ICSE) 2025.',
            )}
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl space-y-12 px-6 py-12 md:px-12 md:py-16 lg:px-20">
        {venues.map((venue) => (
          <section key={venue.id} id={venue.id} className="scroll-mt-28">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-950">{pick(venue.title[1], venue.title[0])}</h2>
            <div className="mt-5 space-y-5">
              {venue.papers.map((paper) => (
                <PaperCard key={paper.href} paper={paper} pick={pick} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default Iclr2025
