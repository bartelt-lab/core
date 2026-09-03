import { Link } from 'react-router-dom'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import LazyVideo from '../components/common/LazyVideo'
import assetUrl from '../utils/assetUrl'
import { useLanguage } from '../i18n/useLanguage'

// The cues named in the project summary, each described only as what it is —
// what any one of them is worth to the estimate is what the project has to
// find out.
const visualCues = (pick) => [
    {
        name: pick('Person tracking', 'Personentracking'),
        body: pick('Who is who, and where they are, from frame to frame.', 'Wer wer ist und wo sich die Person von Bild zu Bild befindet.'),
    },
    {
        name: pick('Gaze', 'Blickrichtung'),
        body: pick('Where the eyes are directed.', 'Wohin die Augen gerichtet sind.'),
    },
    {
        name: pick('Head orientation', 'Kopforientierung'),
        body: pick('Which way the head is turned.', 'In welche Richtung der Kopf gedreht ist.'),
    },
    {
        name: pick('Body orientation', 'Körperorientierung'),
        body: pick('Which way the torso faces.', 'In welche Richtung der Oberkörper zeigt.'),
    },
    {
        name: pick('Motion', 'Bewegung'),
        body: pick('How the person is moving, and where.', 'Wie und wohin sich die Person bewegt.'),
    },
    {
        name: pick('Gestures', 'Gesten'),
        body: pick('Deliberate movements a person makes.', 'Bewusst ausgeführte Bewegungen einer Person.'),
    },
]

// The route from the planned input to the planned output, laid out in HTML so
// it reflows to a column on a phone instead of shrinking to an unreadable strip.
const pipelineStages = (pick) => [
    {
        step: pick('Input', 'Eingabe'),
        name: pick('Monocular RGB', 'Monokulares RGB'),
        body: pick('One ordinary camera stream.', 'Ein gewöhnlicher Kamerastrom.'),
    },
    {
        step: pick('Detect', 'Erkennen'),
        name: pick('Person tracking', 'Personentracking'),
        body: pick('Who is in the scene, and where.', 'Wer sich in der Szene befindet und wo.'),
    },
    {
        step: pick('Read', 'Auslesen'),
        name: pick('Cue extraction', 'Merkmalsextraktion'),
        body: pick('Gaze, head, body, motion, gestures.', 'Blick, Kopf, Körper, Bewegung, Gesten.'),
    },
    {
        step: pick('Estimate', 'Schätzen'),
        name: pick('Awareness estimate', 'Aufmerksamkeitsschätzung'),
        body: pick('Does this person appear aware of the robot?', 'Scheint diese Person den Roboter wahrzunehmen?'),
    },
    {
        step: pick('Act', 'Handeln'),
        name: pick('Robot decision', 'Roboterentscheidung'),
        body: pick('Proceed, wait, or signal.', 'Weiterfahren, warten oder signalisieren.'),
        emphasis: true,
    },
]

// The two robots the perception stack has to run on. Images are the
// manufacturers' own product shots; figures are their published specs.
const targetPlatforms = (pick) => [
    {
        name: 'Ridgeback',
        maker: 'Clearpath Robotics',
        image: assetUrl('/images/projects/human-awareness-detection/platform-ridgeback.webp'),
        alt: pick(
            'The Clearpath Ridgeback: a low, flat black mobile base with a yellow side panel and a large flat mounting deck on top.',
            'Der Clearpath Ridgeback: eine flache, schwarze mobile Plattform mit gelbem Seitenpaneel und großer ebener Montagefläche.',
        ),
        kind: pick('Omnidirectional wheeled base', 'Omnidirektionale Radplattform'),
        specs: [
            [pick('Footprint', 'Grundfläche'), '960 × 793 × 311 mm'],
            [pick('Mass', 'Masse'), '135 kg'],
            [pick('Drive', 'Antrieb'), pick('Four mecanum wheels', 'Vier Mecanum-Räder')],
        ],
    },
    {
        name: 'Unitree As2',
        maker: 'Unitree Robotics',
        image: assetUrl('/images/projects/human-awareness-detection/platform-as2.webp'),
        alt: pick(
            'The Unitree As2: a compact four-legged robot with a silver body, exposed joint motors and a caged lidar sensor at the front.',
            'Der Unitree As2: ein kompakter vierbeiniger Roboter mit silbernem Körper, freiliegenden Gelenkmotoren und einem gekapselten Lidar-Sensor an der Front.',
        ),
        kind: pick('Quadruped', 'Vierbeiner'),
        specs: [
            [pick('Standing', 'Stehend'), '720 × 378 × 457 mm'],
            [pick('Mass', 'Masse'), pick('approx. 20 kg', 'ca. 20 kg')],
            [pick('Drive', 'Antrieb'), pick('12 joint motors', '12 Gelenkmotoren')],
        ],
    },
]

const PlatformVisual = ({ platform }) => {
    return (
        <div className="relative aspect-[4/3] overflow-hidden bg-white">
            <img
                src={platform.image}
                alt={platform.alt}
                width={1200}
                height={900}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain p-3"
            />
        </div>
    )
}

const partners = (pick) => [
    {
        role: pick('Host group', 'Gastgebende Gruppe'),
        name: 'CORE Robotics Lab',
        place: pick('Clausthal University of Technology', 'Technische Universität Clausthal'),
        lead: true,
    },
    {
        role: pick('Collaborator', 'Kooperationspartner'),
        name: pick('Institute for Enterprise Systems (InES)', 'Institute for Enterprise Systems (InES)'),
        place: 'Mannheim',
    },
    {
        role: pick('Collaborator', 'Kooperationspartner'),
        name: pick('Babeș-Bolyai University', 'Babeș-Bolyai-Universität'),
        place: 'Cluj-Napoca',
    },
]

const robotActions = (pick) => [
    {
        code: pick('PROCEED', 'WEITERFAHREN'),
        color: 'border-emerald-400 bg-emerald-50 text-emerald-800',
        body: pick(
            'People nearby show no sign of needing the robot to yield; it can continue its planned path.',
            'Personen in der Nähe zeigen kein Anzeichen dafür, dass der Roboter ausweichen muss; er kann seinem geplanten Pfad folgen.',
        ),
    },
    {
        code: pick('WAIT / STOP', 'WARTEN / ANHALTEN'),
        color: 'border-amber-400 bg-amber-50 text-amber-800',
        body: pick(
            'A person appears to be attending to the robot and may be about to react; the robot should slow, wait, or stop.',
            'Eine Person scheint dem Roboter Aufmerksamkeit zu schenken und könnte reagieren; der Roboter sollte verlangsamen, warten oder anhalten.',
        ),
    },
    {
        code: pick('SIGNAL', 'SIGNALISIEREN'),
        color: 'border-slate-300 bg-slate-100 text-slate-700',
        body: pick(
            'The evidence is unclear or the person seems unaware of the robot; the robot can signal its presence to prompt a reaction.',
            'Die Evidenz ist unklar oder die Person scheint den Roboter nicht wahrzunehmen; der Roboter kann seine Anwesenheit signalisieren, um eine Reaktion anzustoßen.',
        ),
    },
]

const HumanAwarenessDetection = () => {
    const { pick } = useLanguage()
    const plannedActions = robotActions(pick)
    const cues = visualCues(pick)
    const pipeline = pipelineStages(pick)
    const collaborators = partners(pick)
    const platforms = targetPlatforms(pick)

    return (
    <div className="min-h-screen bg-white font-sans text-slate-950">
        <header className="relative isolate overflow-hidden border-b border-slate-100 bg-white px-6 pb-8 pt-24 md:px-10 md:pb-9 md:pt-28">
            <div
                className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(220,252,231,0.72),transparent_28%),radial-gradient(circle_at_86%_72%,rgba(209,248,219,0.48),transparent_30%),linear-gradient(135deg,#ffffff_0%,#fbfffc_55%,#f5fbf8_100%)]"
                aria-hidden="true"
            />
            <div className="mx-auto max-w-5xl">
                <Link
                    to="/ai-team-projects"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600 shadow-sm backdrop-blur transition hover:border-primary-200 hover:text-primary-700"
                >
                    <FaArrowLeft className="h-3 w-3" aria-hidden="true" />
                    {pick('AI Team Projects', 'KI-Teamprojekte')}
                </Link>

                <div className="mt-5 grid gap-7 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
                    <div className="relative z-10">
                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-2.5 w-2.5 rounded-full bg-primary-600 shadow-[0_0_0_5px_rgba(22,163,74,0.12)]" />
                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">
                                {pick('AI Team Project / Human-robot interaction', 'KI-Teamprojekt / Mensch-Roboter-Interaktion')}
                            </p>
                        </div>
                        <h1 className="max-w-2xl font-heading text-4xl font-black leading-[1.05] tracking-tight text-slate-950 lg:text-[2.75rem]">
                            {pick('Visual Human Awareness Estimation', 'Visuelle Schätzung menschlicher Aufmerksamkeit')}
                            <span className="mt-1 block bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">
                                {pick('for mobile robots', 'für mobile Roboter')}
                            </span>
                        </h1>
                        <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                            {pick(
                                'This project investigates how a mobile robot can estimate whether nearby people are aware of its presence and how likely they are to react. Students will develop a camera-based perception system using cues such as gaze, head and body orientation, motion, and gestures, aiming to support decisions such as proceeding, waiting, stopping, or signaling.',
                                'Dieses Projekt untersucht, wie ein mobiler Roboter einschätzen kann, ob Personen in seiner Nähe seine Anwesenheit wahrnehmen und wie wahrscheinlich sie reagieren. Studierende entwickeln ein kamerabasiertes Wahrnehmungssystem, das Hinweise wie Blickrichtung, Kopf- und Körperorientierung, Bewegung und Gesten nutzt, um Entscheidungen wie Weiterfahren, Warten, Anhalten oder Signalisieren zu unterstützen.',
                            )}
                        </p>
                    </div>

                    <figure className="relative lg:mt-5">
                        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-300/60">
                            <img
                                src={assetUrl('/images/projects/human-awareness-detection/intro.webp')}
                                alt={pick('Reference example of a person tracking and gaze viewer, illustrating the target output of this project', 'Referenzbeispiel eines Personentracking- und Blick-Viewers zur Veranschaulichung der angestrebten Ausgabe dieses Projekts')}
                                width="1672"
                                height="941"
                                fetchPriority="high"
                                decoding="async"
                                className="aspect-[16/9] w-full rounded-2xl object-cover"
                            />
                            <div className="px-3 pb-1 pt-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                                <span>{pick('Illustrative reference, not project output', 'Illustrative Referenz, kein Projektergebnis')}</span>
                            </div>
                        </div>
                    </figure>
                </div>

                <div className="mt-5 grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="rounded-2xl border border-primary-100 bg-primary-50/70 p-4 shadow-sm">
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">{pick('Research question', 'Forschungsfrage')}</p>
                        <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-slate-800">
                            {pick(
                                'Can ordinary RGB imagery provide reliable evidence of whether a person is aware of a robot, even when observations are incomplete or contradictory?',
                                'Kann gewöhnliches RGB-Bildmaterial zuverlässige Hinweise darauf liefern, ob eine Person einen Roboter wahrnimmt, selbst wenn Beobachtungen unvollständig oder widersprüchlich sind?',
                            )}
                        </p>
                    </div>

                    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-sm">
                        {[
                            [pick('Planned input', 'Geplante Eingabe'), pick('Monocular RGB', 'Monokulares RGB'), null],
                            [pick('Target platforms', 'Zielplattformen'), 'Ridgeback · Unitree As2', 'ROS 2'],
                        ].map(([label, value, note]) => (
                            <div key={label} className="flex flex-col justify-center bg-white/90 p-3">
                                <dt className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">{label}</dt>
                                <dd className="mt-1.5 text-xs font-bold text-slate-800">{value}</dd>
                                {note ? <dd className="mt-0.5 text-[10px] font-semibold text-slate-400">{note}</dd> : null}
                            </div>
                        ))}
                    </dl>
                </div>

                <Link
                    to="/core-labs"
                    className="group mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 rounded-2xl border border-primary-200 bg-primary-50/70 px-5 py-4 shadow-sm transition hover:border-primary-300 hover:bg-primary-50"
                >
                    <span className="block">
                        <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-primary-600">
                            {pick('Part of', 'Teil von')}
                        </span>
                        <span className="mt-1 block text-base font-bold text-primary-900">CORE Labs</span>
                        <span className="mt-1 block max-w-2xl text-xs leading-5 text-slate-600">
                            {pick(
                                'A CORE Robotics Lab project at Clausthal University of Technology, run with partners in Mannheim and Cluj-Napoca.',
                                'Ein Projekt des CORE Robotics Lab an der Technischen Universität Clausthal, durchgeführt mit Partnern in Mannheim und Cluj-Napoca.',
                            )}
                        </span>
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">
                        {pick('Explore CORE Labs', 'CORE Labs entdecken')}
                        <FaArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                </Link>
            </div>
        </header>

        <main className="bg-gradient-to-b from-white via-slate-50 to-white px-6 py-8 md:px-10 md:py-10">
            <div className="mx-auto max-w-5xl space-y-10">
                <section>
                    <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">{pick('The evidence', 'Die Evidenz')}</p>
                            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">{pick('What a single RGB camera has to yield', 'Was eine einzelne RGB-Kamera liefern muss')}</h2>
                        </div>
                        <p className="max-w-3xl text-sm leading-7 text-slate-600">
                            {pick(
                                'The planned input is monocular RGB, so every cue the estimate rests on has to be recovered from that one stream.',
                                'Die geplante Eingabe ist monokulares RGB, sodass jeder Hinweis, auf dem die Schätzung beruht, aus diesem einen Datenstrom gewonnen werden muss.',
                            )}
                        </p>
                    </div>
                    <div className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-sm sm:grid-cols-2 lg:grid-cols-3">
                        {cues.map((cue) => (
                            <div key={cue.name} className="bg-white p-4">
                                <p className="text-sm font-bold text-slate-900">{cue.name}</p>
                                <p className="mt-1.5 text-sm leading-6 text-slate-500">{cue.body}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">{pick('The pipeline', 'Die Verarbeitungskette')}</p>
                            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">{pick('From one camera stream to one robot decision', 'Von einem Kamerastrom zu einer Roboterentscheidung')}</h2>
                        </div>
                        <p className="max-w-3xl text-sm leading-7 text-slate-600">
                            {pick(
                                'The stages the project has to put in place, end to end. The stack targets two robots — a Ridgeback base and a Unitree As2 — both running ROS 2.',
                                'Die Stufen, die im Projekt aufgebaut werden müssen, von Anfang bis Ende. Der Stack zielt auf zwei Roboter ab – eine Ridgeback-Basis und einen Unitree As2 – beide mit ROS 2.',
                            )}
                        </p>
                    </div>
                    <ol className="mt-5 grid gap-2 lg:grid-cols-5">
                        {pipeline.map((stage, index) => (
                            <li
                                key={stage.name}
                                className={`relative rounded-2xl border p-4 shadow-sm ${
                                    stage.emphasis
                                        ? 'border-primary-200 bg-primary-50'
                                        : 'border-slate-200 bg-white'
                                }`}
                            >
                                <p className={`text-[9px] font-bold uppercase tracking-[0.18em] ${stage.emphasis ? 'text-primary-600' : 'text-slate-400'}`}>
                                    {index + 1}. {stage.step}
                                </p>
                                <p className={`mt-2 text-sm font-bold ${stage.emphasis ? 'text-primary-900' : 'text-slate-900'}`}>{stage.name}</p>
                                <p className={`mt-1.5 text-xs leading-5 ${stage.emphasis ? 'text-primary-800' : 'text-slate-500'}`}>{stage.body}</p>
                            </li>
                        ))}
                    </ol>
                </section>

                <section>
                    <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">{pick('Target platforms', 'Zielplattformen')}</p>
                            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">{pick('One perception stack, two very different robots', 'Ein Wahrnehmungsstack, zwei sehr unterschiedliche Roboter')}</h2>
                        </div>
                        <p className="max-w-3xl text-sm leading-7 text-slate-600">
                            {pick(
                                'The same estimator is meant to run on a low wheeled base and on a quadruped. The camera sits at very different heights on the two, and they move in different ways.',
                                'Derselbe Schätzer soll auf einer flachen Radplattform und auf einem Vierbeiner laufen. Die Kamera sitzt auf beiden in sehr unterschiedlicher Höhe, und sie bewegen sich unterschiedlich.',
                            )}
                        </p>
                    </div>
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                        {platforms.map((platform) => (
                            <article
                                key={platform.name}
                                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                            >
                                <PlatformVisual platform={platform} />
                                <div className="border-t border-slate-100 p-5">
                                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                                        <h3 className="text-lg font-bold tracking-tight text-slate-950">{platform.name}</h3>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-700">{platform.kind}</p>
                                    </div>
                                    <dl className="mt-4 space-y-1.5">
                                        {platform.specs.map(([label, value]) => (
                                            <div key={label} className="flex justify-between gap-4 border-b border-dashed border-slate-100 pb-1.5 last:border-0">
                                                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</dt>
                                                <dd className="text-xs font-bold text-slate-700">{value}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </div>
                            </article>
                        ))}
                    </div>
                    <p className="mt-3 text-xs leading-5 text-slate-400">
                        {pick('Product images and figures: ', 'Produktbilder und Angaben: ')}
                        {platforms.map((platform, index) => (
                            <span key={platform.maker}>
                                {index > 0 ? ' · ' : ''}
                                {platform.maker}
                            </span>
                        ))}
                    </p>
                </section>

                <section className="mx-auto max-w-3xl">
                    <div className="mb-4 flex items-end justify-between gap-5">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">{pick('Reference example', 'Referenzbeispiel')}</p>
                            <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-950">{pick('The kind of perception this project targets', 'Die Art von Wahrnehmung, die dieses Projekt anstrebt')}</h2>
                        </div>
                        <span className="hidden text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 sm:block">{pick('Illustrative demo', 'Illustrative Demo')}</span>
                    </div>
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-300/60">
                        <video
                            src={assetUrl('/videos/ai-team-projects/human-awareness-detection.mp4')}
                            className="aspect-video w-full rounded-2xl bg-black object-contain"
                            aria-label={pick('Example of person tracking and gaze overlays illustrating the kind of system this project will develop', 'Beispiel für Personentracking und Blick-Overlays zur Veranschaulichung der Art von System, das in diesem Projekt entwickelt werden soll')}
                            autoPlay
                            muted
                            loop
                            playsInline
                            controls
                            preload="metadata"
                        />
                    </div>
                    <p className="mt-3 max-w-3xl text-xs leading-5 text-slate-500">
                        {pick(
                            'This example illustrates the type of visual perception capabilities explored in the project, including human detection, tracking, and attention estimation.',
                            'Dieses Beispiel veranschaulicht die Art von visuellen Wahrnehmungsfähigkeiten, die im Projekt untersucht werden, darunter Personenerkennung, Tracking und Aufmerksamkeitsschätzung.',
                        )}
                    </p>
                </section>

                <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
                        <div className="p-6 md:p-8">
                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">{pick('Related work', 'Verwandte Arbeit')}</p>
                            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">Leader Following</h2>
                            <p className="mt-3 text-sm leading-7 text-slate-600">
                                {pick(
                                    'A separate project on the Ridgeback, one of this project’s two target platforms: picking one chosen person out of a crowded scene and following them through clutter, by fusing camera-based detection with point-cloud perception.',
                                    'Ein eigenständiges Projekt auf dem Ridgeback, einer der beiden Zielplattformen dieses Projekts: Es wählt eine bestimmte Person in einer belebten Szene aus und folgt ihr durch unübersichtliches Umfeld, indem es kamerabasierte Erkennung mit Punktwolken-Wahrnehmung verbindet.',
                                )}
                            </p>
                            <p className="mt-3 text-sm leading-7 text-slate-600">
                                {pick(
                                    'It shares this project’s starting point — finding and holding on to a person in the camera view — and takes it in the direction of navigation rather than awareness.',
                                    'Es teilt den Ausgangspunkt dieses Projekts – eine Person im Kamerabild zu finden und nicht zu verlieren – und führt ihn in Richtung Navigation statt Aufmerksamkeit weiter.',
                                )}
                            </p>
                            <Link
                                to="/leader-following"
                                className="group mt-5 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700 transition hover:border-primary-300 hover:bg-primary-100"
                            >
                                {pick('View Leader Following', 'Leader Following ansehen')}
                                <FaArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" aria-hidden="true" />
                            </Link>
                        </div>
                        <div className="relative aspect-[4/3] overflow-hidden bg-slate-950 md:aspect-auto md:min-h-full">
                            <LazyVideo
                                src={assetUrl('/videos/ai-team-projects/leader-following-related-work.mp4')}
                                poster={assetUrl('/videos/ai-team-projects/leader-following-related-work-poster.webp')}
                                aria-label={pick('The Ridgeback following a selected person through a laboratory and corridor', 'Der Ridgeback folgt einer ausgewählten Person durch ein Labor und einen Korridor')}
                                autoPlay
                                muted
                                loop
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </section>

                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">{pick('The hard case', 'Der schwierige Fall')}</p>
                    <h2 className="mt-2 max-w-2xl text-2xl font-bold tracking-tight text-slate-950">{pick('The evidence will not always agree with itself', 'Die Evidenz wird nicht immer eindeutig sein')}</h2>
                    <div className="mt-4 grid gap-6 lg:grid-cols-2">
                        <p className="text-sm leading-7 text-slate-600">
                            {pick(
                                'The research question names the difficulty directly: observations can be incomplete or contradictory. Cues can be missing, and the cues that are present can point in different directions.',
                                'Die Forschungsfrage benennt die Schwierigkeit direkt: Beobachtungen können unvollständig oder widersprüchlich sein. Hinweise können fehlen, und die vorhandenen Hinweise können in unterschiedliche Richtungen deuten.',
                            )}
                        </p>
                        <p className="text-sm leading-7 text-slate-600">
                            {pick(
                                'Handling that is part of the project rather than an edge case left for later. Where the evidence is unclear, the planned response is to signal presence and prompt a reaction, rather than to guess.',
                                'Damit umzugehen ist Teil des Projekts und kein Sonderfall, der auf später verschoben wird. Wo die Evidenz unklar ist, besteht die geplante Reaktion darin, die eigene Anwesenheit zu signalisieren und eine Reaktion anzustoßen, statt zu raten.',
                            )}
                        </p>
                    </div>
                </section>

                <section>
                    <div className="grid gap-4 lg:grid-cols-[0.65fr_1.35fr] lg:items-end">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">{pick('Target output', 'Angestrebte Ausgabe')}</p>
                            <h2 className="mt-2 text-2xl font-bold tracking-tight">{pick('Awareness information for safer robot behavior', 'Bewusstseinsinformationen für sichereres Roboterverhalten')}</h2>
                        </div>
                        <p className="max-w-3xl text-sm leading-7 text-slate-600">
                            {pick(
                                'The system aims to estimate whether nearby people are aware of the robot and provide this information in a form that can support navigation and interaction decisions.',
                                'Das System soll abschätzen, ob nahegelegene Personen sich des Roboters bewusst sind, und diese Information in einer Form bereitstellen, die Navigations- und Interaktionsentscheidungen unterstützen kann.',
                            )}
                        </p>
                    </div>
                    <div className="mt-5 grid gap-3 lg:grid-cols-3">
                        {plannedActions.map((action) => (
                            <article key={action.code} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                <span className={`border-l-4 px-3 py-1.5 font-mono text-[10px] font-bold tracking-[0.12em] ${action.color}`}>
                                    {action.code}
                                </span>
                                <p className="mt-4 text-sm leading-6 text-slate-600">{action.body}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="border-t border-slate-200 pt-8">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">{pick('Collaboration', 'Zusammenarbeit')}</p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">{pick('Three institutions, one project', 'Drei Institutionen, ein Projekt')}</h2>
                    <div className="mt-5 grid gap-3 md:grid-cols-3">
                        {collaborators.map((partner) => (
                            <div
                                key={partner.name}
                                className={`rounded-2xl border p-4 shadow-sm ${
                                    partner.lead ? 'border-primary-200 bg-primary-50/70' : 'border-slate-200 bg-white'
                                }`}
                            >
                                <p className={`text-[9px] font-bold uppercase tracking-[0.18em] ${partner.lead ? 'text-primary-600' : 'text-slate-400'}`}>
                                    {partner.role}
                                </p>
                                <p className={`mt-2 text-sm font-bold ${partner.lead ? 'text-primary-900' : 'text-slate-900'}`}>{partner.name}</p>
                                <p className={`mt-1 text-xs leading-5 ${partner.lead ? 'text-primary-800' : 'text-slate-500'}`}>{partner.place}</p>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </main>
    </div>
    )
}

export default HumanAwarenessDetection
