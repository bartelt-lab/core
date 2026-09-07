import { Link } from 'react-router-dom'
import {
  FiAlertTriangle,
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiCpu,
  FiDatabase,
  FiRepeat,
  FiSliders,
} from 'react-icons/fi'
import { useLanguage } from '../../../i18n/useLanguage'

const FastMileProject = () => {
  const { pick } = useLanguage()

  const scenarios = [
    {
      icon: FiRepeat,
      label: pick('Scenario I', 'Szenario I'),
      title: pick('The regular journey', 'Der reguläre Weg'),
      body: pick(
        'A recurring trip at a familiar time — the daily commute from the surrounding area into the city. High trip volumes, settled routines, and the case the system has to get right before anything else.',
        'Ein wiederkehrender Weg zu einer vertrauten Zeit – der tägliche Pendelweg aus dem Umland in die Stadt. Hohe Wegemengen, feste Routinen, und der Fall, den das System zuerst beherrschen muss.',
      ),
      load: pick('Predictable', 'Vorhersehbar'),
    },
    {
      icon: FiAlertTriangle,
      label: pick('Scenario II', 'Szenario II'),
      title: pick('A connection at risk, or gone', 'Anschluss gefährdet oder ausgefallen'),
      body: pick(
        'A train is cancelled or a transfer will not be made. The planned chain is now wrong, and it is wrong while the traveller is already on the way. The system has to notice, replan, and offer an alternative that actually exists.',
        'Ein Zug fällt aus oder ein Umstieg ist nicht mehr zu schaffen. Die geplante Wegekette stimmt nicht mehr – und zwar während die reisende Person bereits unterwegs ist. Das System muss das bemerken, neu planen und eine Alternative anbieten, die es tatsächlich gibt.',
      ),
      load: pick('Time-critical', 'Zeitkritisch'),
    },
    {
      icon: FiCalendar,
      label: pick('Scenario III', 'Szenario III'),
      title: pick('The event case', 'Der Event-Fall'),
      body: pick(
        'A large event draws many people to one place at the same time — a place where parking is scarce and public transport does not reach far enough. The demand is foreseeable, but it arrives all at once.',
        'Ein Großereignis zieht viele Menschen gleichzeitig an einen Ort, an dem Parkraum knapp ist und der ÖPNV nicht weit genug reicht. Der Bedarf ist absehbar, kommt aber geballt.',
      ),
      load: pick('Foreseeable, but bursty', 'Absehbar, aber stoßweise'),
    },
  ]

  const regularCase = [
    pick(
      'The chain is optimised as a whole, not leg by leg.',
      'Die Wegekette wird als Ganzes optimiert, nicht Teilstrecke für Teilstrecke.',
    ),
    pick(
      'Any combination of modes is possible — not only the feeder trip to the station.',
      'Beliebige Kombinationen von Verkehrsträgern sind möglich – nicht nur die Zubringerfahrt zum Bahnhof.',
    ),
    pick(
      'Availability and utilisation of the offers feed into the recommendation.',
      'Verfügbarkeit und Auslastung der Angebote fließen in die Empfehlung ein.',
    ),
    pick(
      'The recommendation follows the current situation instead of being planned once and then held.',
      'Die Empfehlung folgt der aktuellen Lage, statt einmal geplant und dann festgehalten zu werden.',
    ),
  ]

  const dataSources = [
    [
      pick('Public transport timetables, stops, and real-time data', 'Fahrpläne, Haltestellen und Echtzeitdaten des ÖPNV'),
      pick('The basis for intermodal connections that work in practice', 'Grundlage für intermodale Verbindungen, die im Alltag funktionieren'),
    ],
    [
      pick('Utilisation of lines and vehicles', 'Auslastung von Linien und Fahrzeugen'),
      pick('Capacity-aware recommendations, including at peak times', 'Kapazitätsbewusste Empfehlungen, auch zu Stoßzeiten'),
    ],
    [
      pick('Trip data from on-demand services', 'Fahrdaten aus dem On-Demand-Betrieb'),
      pick('Fleet state, pooling opportunities, demand patterns', 'Flottenzustand, Pooling-Möglichkeiten, Nachfragemuster'),
    ],
    [
      pick('Car-sharing and micromobility offers', 'Carsharing- und Mikromobilitätsangebote'),
      pick('Further modes available inside a single chain', 'Weitere Verkehrsträger innerhalb einer Wegekette'),
    ],
    [
      pick('Disruption reports and event announcements', 'Störungsmeldungen und Veranstaltungsinformationen'),
      pick('The trigger for the special cases — unstructured, and arriving as text', 'Auslöser der Spezialfälle – unstrukturiert und als Text'),
    ],
    [
      pick('Regional movement data', 'Regionale Bewegungsdaten'),
      pick('Movement patterns and gaps in the network', 'Bewegungsmuster und Lücken im Netz'),
    ],
  ]

  const deliverable = [
    pick('Ingest data from several mobility providers', 'Daten mehrerer Mobilitätsdienstleister einlesen'),
    pick('Compute a complete door-to-door chain at the press of a button', 'Auf Knopfdruck eine vollständige Wegekette von Tür zu Tür berechnen'),
    pick('Derive special cases from the data rather than from a fixed list', 'Spezialfälle aus den Daten ableiten statt aus einer festen Liste'),
    pick('Replan when the situation changes and offer a checked alternative', 'Neu planen, wenn sich die Lage ändert, und eine geprüfte Alternative anbieten'),
    pick('Make visible why a particular route was recommended', 'Sichtbar machen, warum eine bestimmte Route empfohlen wurde'),
  ]

  return (
    <div className="min-h-screen bg-white font-sans text-slate-950">
      <header className="relative isolate overflow-hidden border-b border-slate-200 bg-white px-6 pb-12 pt-24 md:px-10 md:pt-28">
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,rgba(224,242,254,0.75),transparent_30%),radial-gradient(circle_at_85%_12%,rgba(220,252,231,0.6),transparent_28%),linear-gradient(160deg,#ffffff_0%,#f8fbff_60%,#f6fbf8_100%)]"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-6xl">
          <Link
            to="/ai-team-projects"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600 shadow-sm backdrop-blur transition hover:border-primary-200 hover:text-primary-700"
          >
            <FiArrowLeft className="h-3 w-3" aria-hidden="true" />
            {pick('AI Team Projects', 'KI-Teamprojekte')}
          </Link>

          <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">
            {pick('AI Team Project / Intermodal mobility', 'KI-Teamprojekt / Intermodale Mobilität')}
          </p>
          <h1 className="mt-4 max-w-4xl font-heading text-4xl font-black leading-[1.04] tracking-tight text-slate-950 sm:text-5xl">
            FastMile
            <span className="mt-3 block text-xl font-semibold leading-tight text-slate-600 sm:text-2xl">
              {pick(
                'Unified Mobility Platform for LLM-Guided Routing',
                'Einheitliche Mobilitätsplattform für LLM-gestütztes Routing',
              )}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600">
            {pick(
              'A real-time routing platform that takes data from several mobility providers and, at the press of a button, brings a traveller to their destination across whichever modes fit. The student team builds the routing itself — the regular case, and above all the situations in which the plan stops being true.',
              'Eine Echtzeit-Routing-Plattform, die Daten verschiedener Mobilitätsdienstleister zusammenführt und Reisende auf Knopfdruck ans Ziel bringt – über die Verkehrsträger, die gerade passen. Das studentische Team baut das Routing selbst: den Regelfall und vor allem die Situationen, in denen der Plan nicht mehr stimmt.',
            )}
          </p>

        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-20 px-6 py-16 md:px-10 md:py-20">
        <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">
              {pick('The starting point', 'Der Ausgangspunkt')}
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950">
              {pick('People judge the whole chain', 'Bewertet wird die ganze Wegekette')}
            </h2>
          </div>
          <div className="rounded-3xl border border-primary-100 bg-primary-50/70 p-6 sm:p-8">
            <p className="text-lg font-semibold leading-8 text-slate-800">
              {pick(
                'Nobody chooses a mode of transport. People choose whether the entire journey — from leaving the house to arriving reliably — works for them.',
                'Niemand wählt einen Verkehrsträger. Menschen entscheiden, ob die gesamte Verbindung – vom Verlassen des Hauses bis zur verlässlichen Ankunft – für sie funktioniert.',
              )}
            </p>
            <p className="mt-5 text-sm leading-7 text-slate-600">
              {pick(
                'This is why treating the last mile as a separate problem falls short. Optimising one leg does not help if the chain breaks somewhere else. Public transport, on-demand services, car sharing and micromobility are therefore treated as equal options: what makes a mode the right one for a part of the way is the journey it belongs to, not the provider it comes from.',
                'Deshalb greift es zu kurz, die letzte Meile als eigenständiges Problem zu behandeln. Die Optimierung einer Teilstrecke hilft nicht, wenn die Kette an anderer Stelle reißt. ÖPNV, On-Demand-Verkehre, Carsharing und Mikromobilität werden daher als gleichberechtigte Optionen behandelt: Ob ein Verkehrsträger für einen Teil des Weges der richtige ist, entscheidet die Reise, zu der er gehört, nicht der Anbieter, von dem er stammt.',
              )}
            </p>
          </div>
        </section>

        <section>
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">
              {pick('Three situations to solve', 'Drei Situationen, die zu lösen sind')}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
              {pick('The regular case is where it starts, not where it ends', 'Der Regelfall ist der Anfang, nicht das Ende')}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              {pick(
                'The routing has to cover three situations. They are ordered by how far reality is allowed to drift from the plan — and the further it drifts, the more of the interesting work there is.',
                'Das Routing muss drei Situationen abdecken. Sie sind danach geordnet, wie weit die Realität vom Plan abweichen darf – und je weiter sie abweicht, desto mehr der interessanten Arbeit steckt darin.',
              )}
            </p>
          </div>
          <ol className="mt-9 grid gap-4 md:grid-cols-3">
            {scenarios.map(({ icon: Icon, label, title, body, load }, index) => (
              <li key={label} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <Icon className="h-5 w-5 text-primary-600" aria-hidden="true" />
                </div>
                <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{label}</p>
                <h3 className="mt-2 text-base font-bold leading-6 text-slate-900">{title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{body}</p>
                <p className="mt-5 inline-flex w-fit rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-bold text-slate-600">
                  {load}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid gap-8 border-y border-slate-100 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">
              {pick('The regular case', 'Der Regelfall')}
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950">
              {pick('Plan the chain as a whole', 'Die Wegekette als Ganzes planen')}
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              {pick(
                'Data-driven methods are combined with analytical route optimisation. What the traveller needs is weighed against what the network actually has available — which is what makes a genuinely intermodal chain possible rather than a feeder trip bolted onto a timetable.',
                'Datengetriebene Methoden werden mit analytischer Routenoptimierung kombiniert. Was die reisende Person braucht, wird gegen das abgewogen, was im Netz tatsächlich verfügbar ist – erst das ergibt eine echte intermodale Wegekette statt einer an den Fahrplan angehängten Zubringerfahrt.',
              )}
            </p>
          </div>
          <ul className="grid gap-3">
            {regularCase.map((item) => (
              <li key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-700 shadow-sm">
                <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">
              {pick('The special case', 'Der Spezialfall')}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
              {pick('Two layers: read the situation, then check it', 'Zwei Schichten: Situation lesen, dann prüfen')}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              {pick(
                'Disruptions do not arrive as clean parameters. They arrive as text: a cancellation notice, an event announcement, a remark from the control room. Pretrained language models are used to interpret such information semantically and turn it into candidate courses of action. The optimisation procedures then check those candidates against the modes, capacities and time constraints that actually exist. Rare or not fully specified situations become tractable this way.',
                'Störungen kommen nicht als saubere Parameter an. Sie kommen als Text: eine Ausfallmeldung, eine Veranstaltungsankündigung, eine Rückmeldung aus dem Betrieb. Vortrainierte Sprachmodelle interpretieren solche Informationen semantisch und übersetzen sie in mögliche Handlungsoptionen. Die Optimierungsverfahren prüfen diese Optionen anschließend anhand der tatsächlich verfügbaren Verkehrsmittel, Kapazitäten und Zeitvorgaben. So werden auch seltene oder vorher nicht vollständig beschriebene Situationen behandelbar.',
              )}
            </p>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <FiDatabase className="h-5 w-5 text-slate-500" aria-hidden="true" />
              <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                {pick('Unstructured input', 'Unstrukturierte Eingaben')}
              </p>
              <h3 className="mt-2 text-base font-bold text-slate-900">
                {pick('What the system is told', 'Was dem System gemeldet wird')}
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                <li>{pick('Disruption and cancellation reports', 'Störungs- und Ausfallmeldungen')}</li>
                <li>{pick('Event and programme announcements', 'Veranstaltungs- und Programmankündigungen')}</li>
                <li>{pick('Feedback from ongoing operations', 'Rückmeldungen aus dem laufenden Betrieb')}</li>
              </ul>
            </article>

            <article className="rounded-2xl border border-primary-200 bg-primary-50/60 p-6">
              <FiCpu className="h-5 w-5 text-primary-600" aria-hidden="true" />
              <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">
                {pick('Layer 1 — semantic reading', 'Schicht 1 – semantisch lesen')}
              </p>
              <h3 className="mt-2 text-base font-bold text-slate-900">
                {pick('Language model interprets', 'Sprachmodell interpretiert')}
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                <li>{pick('Classify what is actually happening', 'Einordnen, was tatsächlich passiert')}</li>
                <li>{pick('Derive possible courses of action', 'Mögliche Handlungsoptionen ableiten')}</li>
                <li>{pick('Hand them on as candidates, not as decisions', 'Sie als Kandidaten weitergeben, nicht als Entscheidung')}</li>
              </ul>
            </article>

            <article className="rounded-2xl border border-slate-900/10 bg-slate-950 p-6 text-white">
              <FiSliders className="h-5 w-5 text-primary-300" aria-hidden="true" />
              <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-300">
                {pick('Layer 2 — formal check', 'Schicht 2 – formal prüfen')}
              </p>
              <h3 className="mt-2 text-base font-bold text-white">
                {pick('Optimisation verifies', 'Optimierung verifiziert')}
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                <li>{pick('Against available modes and vehicles', 'Gegen verfügbare Verkehrsträger und Fahrzeuge')}</li>
                <li>{pick('Against capacities and utilisation', 'Gegen Kapazitäten und Auslastung')}</li>
                <li>{pick('Against the time the traveller actually has', 'Gegen die Zeit, die tatsächlich zur Verfügung steht')}</li>
              </ul>
            </article>
          </div>

        </section>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">
              {pick('What it runs on', 'Womit es arbeitet')}
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950">
              {pick('The data behind a recommendation', 'Die Daten hinter einer Empfehlung')}
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              {pick(
                'Routing is only as good as what it knows. FastMile brings together scheduled and live data across providers — and the same pool is what the special cases are derived from.',
                'Routing ist nur so gut wie das, was es weiß. FastMile führt Plan- und Echtzeitdaten über Anbieter hinweg zusammen – und aus demselben Bestand werden die Spezialfälle abgeleitet.',
              )}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-left">
              <caption className="sr-only">
                {pick('Data sources and what they are used for', 'Datenquellen und wofür sie genutzt werden')}
              </caption>
              <thead>
                <tr className="border-b border-slate-200">
                  <th scope="col" className="py-3 pr-4 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    {pick('Source', 'Quelle')}
                  </th>
                  <th scope="col" className="py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    {pick('Used for', 'Wofür')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataSources.map(([source, use]) => (
                  <tr key={source} className="border-b border-slate-100 align-top">
                    <td className="py-4 pr-4 text-sm font-bold leading-6 text-slate-900">{source}</td>
                    <td className="py-4 text-sm leading-6 text-slate-600">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-3xl bg-slate-950 px-6 py-10 text-white sm:px-9">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-300">
            {pick('The deliverable', 'Das Endprodukt')}
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white">
            {pick('A web application that routes on one button', 'Eine Webanwendung, die auf einen Knopf hin routet')}
          </h2>
          <div className="mt-8 grid gap-x-8 gap-y-4 md:grid-cols-2">
            {deliverable.map((item) => (
              <div key={item} className="flex gap-3 text-sm leading-6 text-slate-200">
                <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary-300" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">{pick('For students', 'Für Studierende')}</p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950">{pick('Thinking about joining?', 'Möchtest du mitmachen?')}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{pick('The project is about taking a research question through to a working product demonstrator: connecting provider data, route optimisation, the semantic interpretation of disruptions, and a web application that puts all of it behind a single button.', 'In diesem Projekt wird eine Forschungsfrage bis zu einem funktionierenden Produktdemonstrator weiterentwickelt: Anbieterdaten, Routenoptimierung, die semantische Interpretation von Störungen und eine Webanwendung, die all das hinter einen einzigen Knopf legt.')}</p>
            </div>
            <div>
              <ul className="grid gap-3">
                <li className="flex gap-3 text-sm leading-6 text-slate-700"><FiCheckCircle className="mt-1 h-4 w-4 shrink-0 text-primary-600" aria-hidden="true" />{pick('You are comfortable writing Python.', 'Du fühlst dich beim Programmieren mit Python sicher.')}</li>
                <li className="flex gap-3 text-sm leading-6 text-slate-700"><FiCheckCircle className="mt-1 h-4 w-4 shrink-0 text-primary-600" aria-hidden="true" />{pick('You are comfortable with git and working in a shared repository.', 'Du arbeitest sicher mit Git und in einem gemeinsam genutzten Repository.')}</li>
                <li className="flex gap-3 text-sm leading-6 text-slate-700"><FiCheckCircle className="mt-1 h-4 w-4 shrink-0 text-primary-600" aria-hidden="true" />{pick('You enjoy working in a mixed international team across two universities.', 'Du arbeitest gern in einem gemischten internationalen Team über zwei Universitäten hinweg.')}</li>
                <li className="flex gap-3 text-sm leading-6 text-slate-700"><FiCheckCircle className="mt-1 h-4 w-4 shrink-0 text-primary-600" aria-hidden="true" />{pick('Interest in machine learning helps—especially optimisation and reasoning over live data.', 'Interesse an maschinellem Lernen hilft – insbesondere an Optimierung und am Schließen aus Echtzeitdaten.')}</li>
                <li className="flex gap-3 text-sm leading-6 text-slate-700"><FiCheckCircle className="mt-1 h-4 w-4 shrink-0 text-primary-600" aria-hidden="true" />{pick('Curiosity about how people actually travel, where a journey breaks down, and what makes an alternative acceptable matters as much as model experience.', 'Neugier darauf, wie Menschen tatsächlich unterwegs sind, wo eine Wegekette reißt und was eine Alternative annehmbar macht, ist ebenso wertvoll wie Modellerfahrung.')}</li>
              </ul>
              <div className="mt-6 rounded-2xl border border-primary-100 bg-primary-50 p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">{pick('What you walk away with', 'Was du aus dem Projekt mitnimmst')}</p>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">{pick('The experience of carrying a genuine research question all the way to a working system, in a mixed team across two universities and one shared repository.', 'Die Erfahrung, eine echte Forschungsfrage bis zu einem funktionierenden System zu führen – in einem gemischten Team über zwei Universitäten und ein gemeinsames Repository hinweg.')}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-10">
          <Link
            to="/ai-team-projects"
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            {pick('Explore all AI Team Projects', 'Alle KI-Teamprojekte ansehen')}
            <FiArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </main>
    </div>
  )
}

export default FastMileProject
