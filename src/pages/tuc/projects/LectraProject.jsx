import { Link } from 'react-router-dom'
import { FiArrowLeft, FiArrowRight, FiBookOpen, FiCheckCircle, FiFileText, FiMessageSquare } from 'react-icons/fi'
import assetUrl from '../../../utils/assetUrl'
import { useLanguage } from '../../../i18n/useLanguage'

const LectraProject = () => {
  const { pick } = useLanguage()

  const workspace = [
    [FiFileText, pick('Course material', 'Kursmaterial'), pick('Slides, PDFs, and a rendered Jupyter notebook stay visible while the student works.', 'Folien, PDFs und ein gerendertes Jupyter-Notebook bleiben sichtbar, während die Studierenden arbeiten.')],
    [FiMessageSquare, pick('Material-aware conversation', 'Materialbezogenes Gespräch'), pick('A student selects the relevant slide, page, section, or notebook cell before asking a question.', 'Vor einer Frage wählen Studierende die relevante Folie, Seite, den Abschnitt oder die Notebook-Zelle aus.')],
    [FiBookOpen, pick('Grounded help', 'Fundierte Unterstützung'), pick('Answers should point back to the relevant source material, then offer a deeper or simpler explanation and additional examples.', 'Antworten sollen auf das relevante Quellmaterial verweisen und anschließend vertiefende oder einfachere Erklärungen sowie zusätzliche Beispiele anbieten.')],
  ]

  const loop = [
    [pick('Ask or practise', 'Fragen oder üben'), pick('Ask about the selected material, request an explanation or example, or start a practice question.', 'Fragen zum gewählten Material stellen, eine Erklärung oder ein Beispiel anfordern oder eine Übungsfrage starten.')],
    [pick('Receive feedback', 'Feedback erhalten'), pick('The demonstrator should check an answer, explain mistakes, identify missing concepts, and suggest what to review.', 'Der Demonstrator soll eine Antwort prüfen, Fehler erklären, fehlende Konzepte benennen und eine Wiederholung empfehlen.')],
    [pick('Adapt the next step', 'Nächsten Schritt anpassen'), pick('A lightweight topic-level estimate of understanding, uncertainty, or gaps should shape at least one visible recommendation.', 'Eine leichtgewichtige themenbezogene Schätzung von Verständnis, Unsicherheit oder Lücken soll mindestens eine sichtbare Empfehlung beeinflussen.')],
  ]

  const scope = [
    pick('One prepared pilot course workspace', 'Ein vorbereiteter Arbeitsbereich für einen Pilotkurs'),
    pick('Slide/PDF and rendered notebook viewers', 'Betrachter für Folien/PDFs und gerenderte Notebooks'),
    pick('Explicit material context and referenced answers', 'Expliziter Materialkontext und Antworten mit Quellenverweisen'),
    pick('Explanations, examples, questions, and answer feedback', 'Erklärungen, Beispiele, Fragen und Feedback zu Antworten'),
    pick('Topic-level learning-state tracking and one adaptive behaviour', 'Themenbezogene Lernstandsverfolgung und ein adaptives Verhalten'),
    pick('A deployed demonstrator', 'Ein bereitgestellter Demonstrator'),
  ]

  return (
    <div className="min-h-screen bg-white font-sans text-slate-950">
      <header className="relative isolate overflow-hidden border-b border-slate-200 bg-white px-6 pb-10 pt-24 md:px-10 md:pt-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_14%,rgba(220,252,231,0.72),transparent_28%),radial-gradient(circle_at_88%_65%,rgba(224,231,255,0.58),transparent_30%),linear-gradient(135deg,#ffffff_0%,#fbfffc_55%,#f7f9ff_100%)]" aria-hidden="true" />
        <div className="mx-auto max-w-6xl">
          <Link to="/ai-team-projects" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600 shadow-sm backdrop-blur transition hover:border-primary-200 hover:text-primary-700">
            <FiArrowLeft className="h-3 w-3" aria-hidden="true" />
            {pick('AI Team Projects', 'KI-Teamprojekte')}
          </Link>

          <div className="mt-7 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">{pick('AI Team Project / Learning technology', 'KI-Teamprojekt / Lerntechnologie')}</p>
              <h1 className="mt-4 max-w-2xl font-heading text-4xl font-black leading-[1.04] tracking-tight text-slate-950 sm:text-5xl">
                LECTRA
                <span className="mt-2 block text-xl font-semibold leading-tight text-slate-600 sm:text-2xl">{pick('LLM-Enhanced Course Teaching and Retrieval Assistant', 'LLM-gestützter Assistent für Lehre und Kursmaterialrecherche')}</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
                {pick('LECTRA is a planned interactive learning platform where students keep course material visible while working with a context-aware LLM assistant. It is designed to provide grounded answers, explanations, examples, practice questions, feedback, and a visible adaptive next step.', 'LECTRA ist eine geplante interaktive Lernplattform, auf der Studierende Kursmaterial sichtbar halten und gleichzeitig mit einem kontextbezogenen LLM-Assistenten arbeiten. Sie soll fundierte Antworten, Erklärungen, Beispiele, Übungsfragen, Feedback und einen sichtbaren adaptiven nächsten Schritt bieten.')}
              </p>
            </div>
            <figure className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-300/50">
              <img src={assetUrl('/images/projects/lectra/workspace.webp')} alt={pick('Conceptual learning workspace with course material, notebook, and context-aware chat side by side', 'Konzeptioneller Lernarbeitsbereich mit Kursmaterial, Notebook und kontextbezogenem Chat nebeneinander')} width="1200" height="676" fetchPriority="high" decoding="async" className="aspect-video w-full rounded-2xl object-cover" />
              <figcaption className="px-3 pb-1 pt-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">{pick('Illustration of the planned demonstrator', 'Illustration des geplanten Demonstrators')}</figcaption>
            </figure>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-20 px-6 py-16 md:px-10 md:py-20">
        <section className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">{pick('The question', 'Die Frage')}</p><h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950">{pick('More useful help than retrieval alone?', 'Hilfreichere Unterstützung als reine Recherche?')}</h2></div>
          <div className="rounded-3xl border border-primary-100 bg-primary-50/70 p-6 sm:p-8"><p className="text-lg font-semibold leading-8 text-slate-800">{pick('Does a lightweight student learning-state model enable more useful and appropriately difficult explanations and exercises than course-material retrieval alone?', 'Ermöglicht ein leichtgewichtiges Modell des Lernstands nützlichere und angemessen schwierige Erklärungen und Übungen als die reine Recherche im Kursmaterial?')}</p><p className="mt-5 text-sm leading-7 text-slate-600">{pick('LECTRA will model topic-level signals from prior interactions, questions, and performance. These signals are estimates—not grades—and should be transparent enough for students or teachers to understand why practice on a topic was recommended.', 'LECTRA wird themenbezogene Signale aus bisherigen Interaktionen, Fragen und Leistungen modellieren. Diese Signale sind Schätzungen, keine Noten, und sollen für Studierende oder Lehrende transparent genug sein, um eine Übungsempfehlung nachvollziehen zu können.')}</p></div>
        </section>

        <section>
          <div className="max-w-2xl"><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">{pick('The working screen', 'Der Arbeitsbildschirm')}</p><h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">{pick('Keep the material in view while asking', 'Material im Blick behalten und gleichzeitig fragen')}</h2></div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">{workspace.map(([Icon, title, body]) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><Icon className="h-5 w-5 text-primary-600" aria-hidden="true" /><h3 className="mt-5 text-base font-bold text-slate-900">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{body}</p></article>)}</div>
        </section>

        <section className="grid gap-8 border-y border-slate-100 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <figure className="order-2 overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/60 lg:order-1"><img src={assetUrl('/images/projects/lectra/practice-feedback.webp')} alt={pick('Conceptual practice flow from question and answer to feedback and an adaptive next-step recommendation', 'Konzeptioneller Übungsablauf von Frage und Antwort über Feedback bis zu einer adaptiven Empfehlung für den nächsten Schritt')} width="1200" height="676" loading="lazy" decoding="async" className="aspect-video w-full rounded-2xl object-cover" /></figure>
          <div className="order-1 lg:order-2"><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">{pick('A learning loop, not just a chat', 'Ein Lernkreislauf, nicht nur ein Chat')}</p><h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950">{pick('From a question to a targeted next step', 'Von einer Frage zum gezielten nächsten Schritt')}</h2><ol className="mt-7 space-y-4">{loop.map(([title, body], index) => <li key={title} className="flex gap-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">{index + 1}</span><div><h3 className="font-bold text-slate-900">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{body}</p></div></li>)}</ol></div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">{pick('Apply what you learn', 'Gelerntes anwenden')}</p><h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950">{pick('Practise with questions and code in context', 'Mit Fragen und Code im Kontext üben')}</h2><p className="mt-5 text-base leading-7 text-slate-600">{pick('Students will be able to simulate exam-style questions based on the selected course content, answer them, and receive targeted feedback. When a concept is best understood through its effect on an implementation, the agent should also be able to write code into the Jupyter notebook so that the student can see the explanation alongside its impact on code.', 'Studierende sollen prüfungsähnliche Fragen auf Grundlage des gewählten Kursinhalts simulieren, beantworten und gezieltes Feedback erhalten können. Wenn sich ein Konzept am besten über seine Wirkung in einer Implementierung erklären lässt, soll der Agent außerdem Code in das Jupyter-Notebook schreiben können, sodass Studierende die Erklärung zusammen mit ihren Auswirkungen auf den Code sehen.')}</p><div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-800"><FiMessageSquare className="h-4 w-4" aria-hidden="true" />{pick('Exam-style practice and notebook code', 'Prüfungsähnliche Übungen und Notebook-Code')}</div></div>
          <figure className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/60"><img src={assetUrl('/images/projects/lectra/teacher-review.webp')} alt={pick('Conceptual interface with course-content questions, feedback guidance, and linked material', 'Konzeptionelle Oberfläche mit Fragen zu Kursinhalten, Feedbackhinweisen und verknüpftem Material')} width="1200" height="676" loading="lazy" decoding="async" className="aspect-video w-full rounded-2xl object-cover" /></figure>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-9"><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">{pick('What the demonstrator must cover', 'Was der Demonstrator abdecken muss')}</p><div className="mt-6 grid gap-x-8 gap-y-4 md:grid-cols-2">{scope.map((item) => <div key={item} className="flex gap-3 text-sm leading-6 text-slate-700"><FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" aria-hidden="true" />{item}</div>)}</div></section>

        <section className="rounded-3xl bg-slate-950 px-6 py-9 text-white sm:px-9"><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-300">{pick('Final demonstration', 'Abschlussdemonstration')}</p><p className="mt-4 max-w-4xl text-xl font-semibold leading-8 text-slate-100">{pick('A student opens lecture material and a related notebook, follows references from the chat, requests a simpler explanation and examples, answers a generated question, receives targeted feedback, and sees an adaptive follow-up recommendation.', 'Eine studentische Person öffnet Vorlesungsmaterial und ein zugehöriges Notebook, folgt Quellenverweisen aus dem Chat, fordert eine einfachere Erklärung und Beispiele an, beantwortet eine generierte Frage, erhält gezieltes Feedback und sieht eine adaptive Folgeempfehlung.')}</p><Link to="/ai-team-projects" className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-primary-50">{pick('Explore all AI Team Projects', 'Alle KI-Teamprojekte ansehen')}<FiArrowRight className="h-4 w-4" aria-hidden="true" /></Link></section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <div><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">{pick('For students', 'Für Studierende')}</p><h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950">{pick('Thinking about joining?', 'Möchtest du mitmachen?')}</h2><p className="mt-4 text-sm leading-7 text-slate-600">{pick('The project is about taking a research question through to a working product demonstrator: connecting course material, interaction design, grounded LLM support, feedback, and a transparent topic-level learning-state estimate.', 'In diesem Projekt wird eine Forschungsfrage bis zu einem funktionierenden Produktdemonstrator weiterentwickelt: Kursmaterial, Interaktionsdesign, fundierte LLM-Unterstützung, Feedback und eine transparente themenbezogene Lernstandsschätzung werden miteinander verbunden.')}</p></div>
            <div><ul className="grid gap-3"><li className="flex gap-3 text-sm leading-6 text-slate-700"><FiCheckCircle className="mt-1 h-4 w-4 shrink-0 text-primary-600" aria-hidden="true" />{pick('You are comfortable writing Python.', 'Du fühlst dich beim Programmieren mit Python sicher.')}</li><li className="flex gap-3 text-sm leading-6 text-slate-700"><FiCheckCircle className="mt-1 h-4 w-4 shrink-0 text-primary-600" aria-hidden="true" />{pick('You are comfortable with git and working in a shared repository.', 'Du arbeitest sicher mit Git und in einem gemeinsam genutzten Repository.')}</li><li className="flex gap-3 text-sm leading-6 text-slate-700"><FiCheckCircle className="mt-1 h-4 w-4 shrink-0 text-primary-600" aria-hidden="true" />{pick('You enjoy working in a mixed international team across two universities.', 'Du arbeitest gern in einem gemischten internationalen Team über zwei Universitäten hinweg.')}</li><li className="flex gap-3 text-sm leading-6 text-slate-700"><FiCheckCircle className="mt-1 h-4 w-4 shrink-0 text-primary-600" aria-hidden="true" />{pick('Interest in machine learning helps—especially personalisation and learning from user feedback.', 'Interesse an maschinellem Lernen hilft – insbesondere an Personalisierung und dem Lernen aus Nutzerfeedback.')}</li><li className="flex gap-3 text-sm leading-6 text-slate-700"><FiCheckCircle className="mt-1 h-4 w-4 shrink-0 text-primary-600" aria-hidden="true" />{pick('Curiosity about how people learn, become uncertain, and benefit from feedback matters as much as model experience.', 'Neugier darauf, wie Menschen lernen, unsicher werden und von Feedback profitieren, ist ebenso wertvoll wie Modellerfahrung.')}</li></ul><div className="mt-6 rounded-2xl border border-primary-100 bg-primary-50 p-5"><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-700">{pick('What you walk away with', 'Was du aus dem Projekt mitnimmst')}</p><p className="mt-2 text-sm font-semibold leading-6 text-slate-800">{pick('The experience of carrying a genuine research question all the way to a working system, in a mixed team across two universities and one shared repository.', 'Die Erfahrung, eine echte Forschungsfrage bis zu einem funktionierenden System zu führen – in einem gemischten Team über zwei Universitäten und ein gemeinsames Repository hinweg.')}</p></div></div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default LectraProject
