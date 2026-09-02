import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import assetUrl from '../utils/assetUrl'
import { useLanguage } from '../i18n/useLanguage'

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
                            [pick('Planned input', 'Geplante Eingabe'), 'Monocular RGB'],
                            [pick('Target platform', 'Zielplattform'), 'Ridgeback / ROS 2'],
                        ].map(([label, value]) => (
                            <div key={label} className="flex flex-col justify-center bg-white/90 p-3">
                                <dt className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">{label}</dt>
                                <dd className="mt-1.5 text-xs font-bold text-slate-800">{value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <p className="mt-5 text-xs leading-5 text-slate-500">
                    {pick(
                        'CORE Robotics Lab Group at Clausthal University of Technology, in collaboration with the Institute for Enterprise Systems (InES), Mannheim and Babeș-Bolyai University, Cluj-Napoca.',
                        'Ein Projekt des CORE Robotics Lab an der Technischen Universität Clausthal, in Zusammenarbeit mit dem Institute for Enterprise Systems (InES), Mannheim und der Babeș-Bolyai-Universität, Cluj-Napoca.',
                    )}
                </p>
            </div>
        </header>

        <main className="bg-gradient-to-b from-white via-slate-50 to-white px-6 py-8 md:px-10 md:py-10">
            <div className="mx-auto max-w-5xl space-y-10">
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

            </div>
        </main>
    </div>
    )
}

export default HumanAwarenessDetection
