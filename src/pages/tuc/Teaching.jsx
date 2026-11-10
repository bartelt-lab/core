import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import { PageShell, Section, Card, Callout } from '../../components/tuc/ui';
import { useLanguage } from '../../i18n/useLanguage';

const taughtCourses = [
    {
        title: 'Grundlagen der Informatik (B.Sc. Digital Technologies)',
        semester: 'Winter Semester 2026/27',
        semesterDe: 'Wintersemester 2026/27',
        tone: 'An introduction to programming for first-semester Digital Technologies students. Learn to turn simple problems into Python programs using data types, conditions, loops, and functions. Written and practical tasks build your problem-solving skills and introduce software development tools. No prior knowledge is required.',
        toneDe: 'Ein Einstieg in die Programmierung für Erstsemester im Bachelor Digital Technologies. Sie setzen einfache Aufgaben in Python-Programme um und lernen dabei Datentypen, Bedingungen, Schleifen und Funktionen kennen. Schriftliche und praktische Aufgaben vermitteln Lösungsstrategien und den Umgang mit Entwicklungswerkzeugen. Vorkenntnisse sind nicht erforderlich.',
        link: 'https://digitecstudieren.de/downloads/ba/MHB_BSc_DT_WiSe26.pdf#page=6',
        cta: 'Module description (B.Sc. Digital Technologies, PDF)',
        ctaDe: 'Modulbeschreibung (B.Sc. Digital Technologies, PDF)'
    },
    {
        title: 'Seminars (Bachelor’s and Master’s)',
        titleDe: 'Seminare (Bachelor und Master)',
        tone: 'Seminar formats for students in Informatik and Digital Technologies. Read and critically compare research papers with guidance from a supervisor, write a seminar paper, and present and discuss your findings. The module name, credits, and expected depth depend on your degree programme:',
        toneDe: 'Seminarangebote für Studierende der Informatik und Digital Technologies. Sie erarbeiten und vergleichen unter Betreuung wissenschaftliche Literatur, verfassen eine Seminararbeit und stellen Ihre Ergebnisse in einem Vortrag mit Diskussion vor. Modulname, Leistungspunkte und fachliche Tiefe richten sich nach Ihrem Studiengang:',
        links: [
            {
                url: 'https://www.studiengaenge.tu-clausthal.de/fileadmin/Sites/Studiengaenge/Documents/Studiengaenge/Modulhandbuecher/Neu_in_2021-22/MHB_Informatik_B.Sc._2020_16_12_2021.pdf#page=136',
                label: 'Informatik B.Sc.: Proseminar — 3 ECTS (PDF)',
                labelDe: 'Informatik B.Sc.: Proseminar — 3 LP (PDF)'
            },
            {
                url: 'https://www.studiengaenge.tu-clausthal.de/fileadmin/Sites/Studiengaenge/Documents/Studiengaenge/Modulhandbuecher/Neu_in_2021-22/MHB_Informatik_M.Sc._2020_16_12_2021.pdf#page=237',
                label: 'Informatik M.Sc.: Hauptseminar — 4 ECTS (PDF)',
                labelDe: 'Informatik M.Sc.: Hauptseminar — 4 LP (PDF)'
            },
            {
                url: 'https://digitecstudieren.de/downloads/ms/26%20WiSe%20MHB_MSc.pdf#page=147',
                label: 'DigiTec M.Sc.: Wissenschaftliche Praxis — 5 ECTS (PDF)',
                labelDe: 'DigiTec M.Sc.: Wissenschaftliche Praxis — 5 LP (PDF)'
            }
        ]
    },
    {
        title: 'Practical Courses and Projects (Bachelor’s and Master’s)',
        titleDe: 'Praktika und Projekte (Bachelor und Master)',
        tone: 'Apply your course knowledge to a software project drawn from research or industry. Analyse requirements, design and implement a solution, test it, and document the result. Practise coordinating work and presenting what you built. The scope depends on your degree programme and module.',
        toneDe: 'Sie wenden Ihr Wissen in einem Softwareprojekt aus Forschung oder Praxis an: Anforderungen analysieren, eine Lösung entwerfen und programmieren, sie testen und das Ergebnis dokumentieren. Dabei üben Sie, Aufgaben abzustimmen und Ihre Ergebnisse vorzustellen. Der Umfang richtet sich nach Ihrem Studiengang und Modul.',
        links: [
            {
                url: 'https://www.isse.tu-clausthal.de/lehre/lehrveranstaltungen',
                label: 'Practical courses and projects at ISSE',
                labelDe: 'Praktika und Projekte am ISSE'
            },
            {
                url: '/ai-team-projects',
                label: 'European AI Team Projects',
                labelDe: 'Europäische AI-Team-Projekte'
            }
        ]
    },
    {
        title: 'DigiTec Project (Bachelor’s and Master’s)',
        titleDe: 'DigiTec-Projekt (Bachelor und Master)',
        tone: 'Work in an interdisciplinary team on a practical digitalisation problem, combining computer science with an application field. Plan tasks, develop and test a prototype, and present your results. Each project module carries 10 ECTS and lasts one semester. Master’s projects place greater emphasis on scientific methods.',
        toneDe: 'In den interdisziplinären Digitalisierungsprojekten verbinden Sie Informatik mit einem Anwendungsgebiet. Sie planen im Team Aufgaben, entwickeln und testen einen Prototyp und präsentieren Ihre Ergebnisse. Jedes Projektmodul umfasst 10 LP und dauert ein Semester. Im Master liegt mehr Gewicht auf wissenschaftlichen Methoden.',
        links: [
            {
                url: 'https://digitecstudieren.de/downloads/ba/MHB_BSc_DT_WiSe26.pdf#page=131',
                label: 'Project modules (DigiTec Bachelor, PDF)',
                labelDe: 'Projektmodule (DigiTec-Bachelor, PDF)'
            },
            {
                url: 'https://digitecstudieren.de/downloads/ms/26%20WiSe%20MHB_MSc.pdf#page=139',
                label: 'Project modules (DigiTec Master, PDF)',
                labelDe: 'Projektmodule (DigiTec-Master, PDF)'
            },
            {
                url: '/ai-team-projects',
                label: 'European AI Team Projects',
                labelDe: 'Europäische AI-Team-Projekte'
            }
        ]
    },
    {
        title: 'Research Project (Master, 30 ECTS)',
        titleDe: 'Forschungsprojekt (Master, 30 LP)',
        semester: 'Ongoing offering',
        semesterDe: 'Fortlaufendes Angebot',
        tone: 'A full-semester research project in the Research Track for master’s students in Informatik and Digital Technologies. Work within a research group on a defined question, develop or evaluate methods, and write a research paper. Give at least two presentations: on your aims and methods, and on your results. An exposé (research proposal) is required. Please contact us early and allow extra lead time to agree on the topic, supervision, and proposal.',
        toneDe: 'Im Research Track der Masterstudiengänge Informatik und Digital Technologies bearbeiten Sie ein Semester lang eine Forschungsfrage in einer Arbeitsgruppe. Sie entwickeln oder untersuchen Methoden und verfassen eine Forschungsarbeit. In mindestens zwei Vorträgen stellen Sie zunächst Ziele und Vorgehen, später Ihre Ergebnisse vor. Ein Exposé ist erforderlich. Bitte nehmen Sie frühzeitig Kontakt auf und planen Sie längeren Vorlauf für die Abstimmung von Thema, Betreuung und Exposé ein.',
        link: 'https://digitecstudieren.de/downloads/ms/26%20WiSe%20MHB_MSc.pdf#page=145',
        cta: 'Module description: Forschungsarbeit (DigiTec Master, PDF)',
        ctaDe: 'Modulbeschreibung: Forschungsarbeit (DigiTec-Master, PDF)'
    }
];

const researchAreas = [
    {
        area: 'Adversarial Attacks & Model Robustness',
        summary: 'Understanding failure modes of ML systems and improving robustness under distribution shift and attack.'
    },
    {
        area: 'AI for Software Engineering',
        summary: 'Automated requirements engineering, AI-assisted GUI prototyping, and adaptive user interfaces that evolve with users, contexts, and changing requirements.'
    },
    {
        area: 'Mathematical Theory behind ML',
        summary: 'Theoretical perspectives on machine learning models, optimization, and generalization behaviour.'
    },
    {
        area: 'Generative AI for Building Information Modeling (BIM)',
        summary: 'Using generative AI to interact with, generate, and evaluate BIM models in digital planning workflows.'
    },
    {
        area: 'Tabular Data / Deep Learning for Tabular Data / Tabular Foundation Models',
        summary: 'Learning robust representations, designing strong deep learning architectures, and developing next-generation foundation models for structured tabular data.'
    },
    {
        area: 'Combining Transduction and Induction in Programming by Example',
        summary: 'Using Programming by Example as a testbed to combine instance-specific transductive reasoning with more general inductive methods.'
    },
    {
        area: 'Concept Based Deep Learning & Computer Vision in the Wild',
        summary: 'Interpretable deep learning, concept bottlenecks, and robust visual reasoning outside narrowly curated benchmarks.'
    },
    {
        area: 'Additional thesis topic area to be announced',
        summary: 'Further supervised thesis topics will be added here once finalized.'
    },
    {
        area: 'Additional thesis topic area to be announced',
        summary: 'Further supervised thesis topics will be added here once finalized.'
    }
];

const seminarTopics = [
    {
        title: 'How LLM Agents Combine External Memory and Parameter Post-Training',
        abstract: [
            'LLM agents adapt from experience in two main ways: storing it externally as retrievable memory (trajectories, procedures, distilled facts read back at inference time), or baking it into model weights via post-training (fine-tuning, RLHF, RL over trajectories). Memory-based methods adapt cheaply without touching weights but are bounded by context and retrieval quality; parameter-based methods generalize more deeply but are costly to update and risk forgetting.',
            'Recent work argues neither suffices alone, proposing hybrids: distilling stable memory into weights over time, learning policies that decide what to store or forget, or treating memory operations themselves as RL-trained actions. This raises open questions about what should live in weights versus in an external store, how information moves between the two, and how to evaluate such systems over long horizons.'
        ]
    },
    {
        title: 'Safety Pretraining: Building Alignment into Foundation Models from the Start',
        abstract: [
            'Safety alignment in large language models is often treated as a post-training problem, using methods such as supervised fine-tuning, RLHF, refusal tuning, or constitutional training. However, recent work argues that many unsafe behaviors are already learned during pretraining and may be difficult to remove afterwards. The aim of this seminar is to understand, analyse, and compare approaches that introduce safety interventions directly during the pretraining stage.',
            'A central starting point is Safety Pretraining by Maini et al., which proposes data-centric interventions such as harmful-data filtering, synthetic safety data, refusal-style pretraining data, moral-education data, and harmfulness tags injected during pretraining. Their results suggest that safety-pretrained models can reduce attack success rates without degrading standard benchmark performance.',
            'The seminar should investigate how safety pretraining differs from classical post-hoc alignment, what kinds of safety signals can be incorporated into pretraining data, and whether such methods improve robustness against jailbreaks, downstream fine-tuning, or inference-time attacks. Further starting points include work on filtering harmful pretraining data, the timing of safety interventions during pretraining, and recent safety-reflection approaches that argue safety should be learned as an internal model behavior rather than only as a data-filtering objective.'
        ]
    },
    {
        title: 'JEPA World Models for Planning and Control',
        abstract: [
            'Joint-Embedding Predictive Architectures (JEPAs) learn to predict in a latent representation space instead of reconstructing raw observations, and have recently been used as world models for planning and control. The aim of this seminar is to understand, analyse and compare how latent dynamics models are trained and then used for planning (e.g. via CEM/MPC in latent space). A special interest lies in the comparison between model-based planning and model-free reinforcement learning for control, as studied by Sobal et al. A second starting point is V-JEPA 2.'
        ],
        references: [
            {
                label: 'Sobal et al. (arXiv:2502.14819)',
                url: 'https://arxiv.org/abs/2502.14819'
            },
            {
                label: 'V-JEPA 2 (arXiv:2506.09985)',
                url: 'https://arxiv.org/abs/2506.09985'
            }
        ]
    },
    {
        title: 'Context Optimisation for Tabular Foundation Models',
        abstract: [
            'This seminar explores how tabular foundation models can be improved by optimizing their inference-time context. Using VIP-COP and CRUMB as core papers, we discuss sample selection, feature selection, and distribution-matched batching as alternatives to simply using the full training set. The seminar highlights context optimisation as a practical route to better scalability and performance without model retraining.'
        ],
        references: [
            {
                label: 'VIP-COP (arXiv:2606.11473)',
                url: 'https://arxiv.org/abs/2606.11473'
            },
            {
                label: 'CRUMB (arXiv:2605.12904)',
                url: 'https://arxiv.org/abs/2605.12904'
            }
        ]
    },
    {
        title: 'Evolutionary Algorithms within prompt optimisation',
        abstract: [
            'Evolutionary algorithms have been fruitfully used to optimise prompts. The aim of this seminar is to understand, analyse and compare different approaches. A special interest lies in the comparison to Reinforcement Learning as highlighted by Agrawal et al.'
        ],
        references: [
            {
                label: 'Agrawal et al. (arXiv:2507.19457)',
                url: 'https://arxiv.org/abs/2507.19457'
            }
        ]
    }
];

const seminarProcess = [
    {
        phase: 'Stage 1',
        title: 'Supervised Reading Phase',
        points: [
            'Students work through a paper set curated by the supervisor and focus on genuine understanding rather than surface-level summarization.',
            'After roughly three weeks, understanding is checked in an oral exam run by the supervisor.',
            'For each assigned paper, students receive example questions so expectations are concrete from the start.',
            'Students also prepare and explain three possible seminar-topic proposals.'
        ]
    },
    {
        phase: 'Stage 2',
        title: 'Independent Research Phase',
        points: [
            'Students then extend the topic independently with a structured literature search.',
            'Guidance covers search strategy, citation chains, quality control, and examples of strong past seminar papers.',
            'The follow-up task should go beyond collection, for example by building a taxonomy, structuring related work, or transferring ideas across papers.'
        ]
    },
    {
        phase: 'Finish',
        title: 'Submission and Discussion',
        points: [
            'Written seminar paper submission',
            'Presentation with a maximum of 10 minutes speaking time',
            'Around 20 minutes of questions and discussion',
            'Final revised seminar paper submission'
        ]
    }
];

const thesisApplicationSteps = [
    'Submit your application with your topic of interest, Transcript of Records, and CV to patrick.knab@tu-clausthal.de.',
    'If a topic is available, define a concrete direction together with the supervising researcher.',
    'Write and submit an exposé using the provided proposal template.',
    'Receive approval for the exposé.',
    'Register the thesis independently with the Studienbüro.'
];

const exposeGuidelines = [
    'Use the provided proposal template; maximum 2 pages excluding references.',
    'Include your name and a preliminary title at the top.',
    'Introduction and background together should stay compact and should not exceed one page.',
    'Goals and work plan should clearly state research questions, planned approach, evaluation strategy, expected outcomes, and realistic milestones.',
    'Distinguish must-have goals from nice-to-have goals.',
    'Write scientifically: frame the work as an investigation rather than a guaranteed improvement claim.',
    'Your first task is typically a review of relevant literature and tools.',
    'Avoid formulas, algorithms, and low-level technical details; prefer high-level, intuitive descriptions.'
];

const thesisFormatting = [
    'Language: English',
    'Template: official thesis LaTeX template provided by your supervisor',
    'Target length: Bachelor 30-50 pages, Master 50-70 pages, excluding references and appendices'
];

const thesisSupervision = [
    'You are responsible for scheduling all meetings.',
    'Meet with your advisor at least once per month.',
    'Plan a halfway-point progress check with your advisor.',
    'Come prepared with slides and results that demonstrate meaningful progress.',
    'Send your slides to your supervisor before each meeting.',
    'Failing to schedule and prepare meetings can negatively affect your grade.'
];

const thesisWriting = [
    'Start writing early and keep detailed notes throughout the project, including experiment settings.',
    'Discuss the report outline with your advisor before writing the full draft.',
    'Include an abstract.',
    'Write for readers with a computer science background; avoid repeating textbook material.',
    'Be concise and move long code listings or implementation details into an appendix if needed.',
    'Use examples and figures throughout the report.',
    'Recommended reading: Writing for Computer Science by Justin Zobel.'
];

const thesisFinalPresentation = [
    'The final presentation is scheduled after the thesis submission.',
    'After the presentation, supervisors ask 3-5 comprehension questions.',
    'You may consult your slides or thesis for up to 30 seconds before answering each question.'
];

const thesisSubmission = [
    'For binding requirements and deadlines, consult your Studienordnung or contact the Prüfungsamt.',
    'Submit source code, data, and setup instructions via an online repository such as GitHub, or optionally on CD-ROM / USB stick.',
    'If the full dataset is too large for physical media, include a representative sample.'
];

const thesisAiUse = [
    'Students bear full responsibility for all submitted content and must be able to explain and defend it.',
    'The group does not police how students use generative AI tools.',
    'Hallucinated references are treated as a quality issue and can negatively affect the grade.',
    'Repeated hallucinations, or hallucinations in critical parts of the thesis, can lead to a substantially lower grade or failure.'
];

const quickLinks = [
    { id: 'courses-overview', label: 'Courses' },
    { id: 'seminars', label: 'Seminars' },
    { id: 'theses', label: 'Theses' }
];

const Teaching = ({ initialSection }) => {
    const location = useLocation();
    const { pick } = useLanguage();
    const normalizeSection = (value) => (
        quickLinks.some((item) => item.id === value) ? value : 'courses-overview'
    );
    const [activeSection, setActiveSection] = useState(() => normalizeSection(initialSection));

    const scrollToSection = (targetId) => {
        const element = document.getElementById(targetId);
        if (!element) {
            return;
        }

        const offset = 120;
        const top = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    };

    useEffect(() => {
        const targetId = location.hash ? location.hash.slice(1) : initialSection;

        if (!targetId) {
            return;
        }

        const frame = window.requestAnimationFrame(() => {
            setActiveSection(normalizeSection(targetId));
            scrollToSection(normalizeSection(targetId));
        });

        return () => window.cancelAnimationFrame(frame);
    }, [initialSection, location.hash]);

    const selectSection = (targetId) => {
        setActiveSection(targetId);
        window.requestAnimationFrame(() => {
            scrollToSection(targetId);
        });
    };

    const guidelines = [
        { title: pick('The exposé', 'Das Exposé'), items: exposeGuidelines },
        { title: pick('Format and length', 'Form und Umfang'), items: thesisFormatting },
        { title: pick('Working with your advisor', 'Zusammenarbeit mit der Betreuung'), items: thesisSupervision },
        { title: pick('Writing the thesis', 'Die Arbeit schreiben'), items: thesisWriting },
        { title: pick('Final presentation', 'Abschlusspräsentation'), items: thesisFinalPresentation },
        { title: pick('What to hand in', 'Abgabe'), items: thesisSubmission },
        { title: pick('Use of generative AI', 'Einsatz generativer KI'), items: thesisAiUse },
    ];

    const tabLabel = (id) => ({ 'courses-overview': pick('Courses', 'Kurse'), seminars: pick('Seminars', 'Seminare'), theses: pick('Theses', 'Abschlussarbeiten') })[id];

    return (
        <PageShell
            kicker="TU Clausthal"
            title={pick('Teaching', 'Lehre')}
            lede={pick(
                'Courses, seminars and thesis supervision by the Cognitive Software group.',
                'Kurse, Seminare und die Betreuung von Abschlussarbeiten der Gruppe Cognitive Software.'
            )}
            nav={quickLinks.map((item) => ({ id: item.id, label: tabLabel(item.id), onSelect: selectSection, active: activeSection === item.id }))}
            rail
        >
            {activeSection === 'courses-overview' && (
                <Section
                    id="courses-overview"
                    title={pick('Courses', 'Kurse')}
                    intro={pick(
                        'At TU Clausthal we teach computer science foundations, seminars, practical courses and research projects.',
                        'An der TU Clausthal lehren wir Grundlagen der Informatik, Seminare, Praktika und Forschungsprojekte.'
                    )}
                >
                    <ul className="grid gap-4 lg:grid-cols-2">
                        {taughtCourses.map((course) => (
                            <Card as="li" key={course.title} className="flex flex-col p-5 sm:p-6">
                                {course.semester && (
                                    <span className="mb-3 w-fit rounded-full bg-site-100 px-3 py-1 text-xs font-semibold text-slate-800">
                                        {pick(course.semester, course.semesterDe)}
                                    </span>
                                )}
                                <h3 className="text-lg font-bold leading-snug">{pick(course.title, course.titleDe ?? course.title)}</h3>
                                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{pick(course.tone, course.toneDe)}</p>
                                <div className="mt-4 flex flex-col gap-1 border-t border-slate-100 pt-3">
                                    {[...(course.link ? [{ url: course.link, label: course.cta, labelDe: course.ctaDe }] : []), ...(course.links ?? [])].map((link) => (
                                        <a
                                            key={link.url}
                                            href={link.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-start gap-1.5 py-1 text-sm font-semibold text-primary-700 hover:text-primary-800"
                                        >
                                            <FiArrowUpRight className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                                            {pick(link.label, link.labelDe)}
                                        </a>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </ul>
                </Section>
            )}

            {activeSection === 'seminars' && (
                <Section
                    id="seminars"
                    title={pick('Seminars', 'Seminare')}
                    intro={pick(
                        'A seminar runs in two stages, a supervised reading phase and an independent research phase, and ends with a written paper and a presentation.',
                        'Ein Seminar läuft in zwei Phasen, einer betreuten Lesephase und einer eigenständigen Recherchephase, und endet mit einer schriftlichen Arbeit und einem Vortrag.'
                    )}
                >
                    <Callout title={pick('Seminar applications closed', 'Seminarbewerbung geschlossen')}>
                        {pick(
                            'All seminar places for winter semester 2026/27 are filled, and all listed topics have already been assigned. We are no longer accepting applications.',
                            'Alle Seminarplätze für das Wintersemester 2026/27 sind belegt, und alle aufgeführten Themen sind bereits vergeben. Wir nehmen keine weiteren Bewerbungen an.'
                        )}
                    </Callout>

                    <div className="mt-10 flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-xl font-bold">{pick('Seminar topics', 'Seminarthemen')}</h3>
                        <span className="text-sm font-semibold text-slate-600">WS 2026/27</span>
                    </div>
                    <div className="mt-4 grid items-start gap-4 lg:grid-cols-2">
                        {seminarTopics.map((topic) => (
                            <Card as="article" key={topic.title} className="p-5 sm:p-6">
                                <h4 className="text-lg font-bold leading-snug">{topic.title}</h4>
                                <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600">
                                    {topic.abstract.map((paragraph) => (
                                        <p key={paragraph}>{paragraph}</p>
                                    ))}
                                </div>
                                {topic.references && (
                                    <div className="mt-4 flex flex-wrap gap-2" aria-label="References">
                                        {topic.references.map((reference) => (
                                            <a
                                                key={reference.url}
                                                href={reference.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-primary-300 hover:text-primary-700"
                                            >
                                                {reference.label}
                                                <FiArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>

                    <h3 className="mt-12 text-xl font-bold">{pick('Process', 'Ablauf')}</h3>
                    <ol className="mt-4 grid gap-4 lg:grid-cols-3">
                        {seminarProcess.map((step) => (
                            <Card as="li" key={step.title} className="p-5 sm:p-6">
                                <span className="inline-block rounded-full bg-site-100 px-3 py-1 text-xs font-semibold text-slate-800">{step.phase}</span>
                                <h4 className="mt-3 text-lg font-bold leading-snug">{step.title}</h4>
                                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600 marker:text-site-900">
                                    {step.points.map((point) => (
                                        <li key={point}>{point}</li>
                                    ))}
                                </ul>
                            </Card>
                        ))}
                    </ol>
                </Section>
            )}

            {activeSection === 'theses' && (
                <Section
                    id="theses"
                    title={pick('Bachelor & Master Thesis Guidelines', 'Richtlinien für Bachelor- und Masterarbeiten')}
                    intro={pick(
                        'We supervise Bachelor’s and Master’s theses in the research areas below, as long as places are free. This page covers how to apply and what we expect from the exposé, the thesis and the final presentation.',
                        'Wir betreuen Bachelor- und Masterarbeiten in den unten genannten Forschungsbereichen, solange Plätze frei sind. Hier steht, wie du dich bewirbst und was wir von Exposé, Arbeit und Abschlusspräsentation erwarten.'
                    )}
                >
                    <Callout title={pick('Apply for a thesis', 'Für eine Abschlussarbeit bewerben')}>
                        <p>
                            {pick('Send your topic of interest, Transcript of Records, and CV to', 'Senden Sie Ihr Interessengebiet, Ihren Notenspiegel und Ihren Lebenslauf an')}{' '}
                            <a href="mailto:patrick.knab@tu-clausthal.de">patrick.knab@tu-clausthal.de</a>.{' '}
                            {pick('Please allow 2-3 weeks for a response after your initial request.', 'Bitte rechnen Sie nach der ersten Anfrage mit 2-3 Wochen Bearbeitungszeit.')}
                        </p>
                    </Callout>

                    <h3 className="mt-10 text-xl font-bold">{pick('Available thesis topics', 'Verfügbare Themen für Abschlussarbeiten')}</h3>
                    <ul className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {researchAreas.slice(0, 7).map((entry) => (
                            <Card as="li" key={entry.area} className="p-5">
                                <h4 className="font-bold leading-snug">{entry.area}</h4>
                                <p className="mt-2 text-sm leading-relaxed text-slate-600">{entry.summary}</p>
                            </Card>
                        ))}
                    </ul>

                    <h3 className="mt-12 text-xl font-bold">{pick('Process', 'Ablauf')}</h3>
                    <ol className="mt-4 space-y-3">
                        {thesisApplicationSteps.map((step, index) => (
                            <li key={step} className="flex gap-4">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-site-900 text-sm font-bold text-white">{index + 1}</span>
                                <p className="pt-1 leading-relaxed text-slate-700">{step}</p>
                            </li>
                        ))}
                    </ol>

                    <h3 className="mt-12 text-xl font-bold">{pick('Guidelines', 'Richtlinien')}</h3>
                    <div className="mt-4 grid items-start gap-4 md:grid-cols-2">
                        {guidelines.map((g) => (
                            <Card key={g.title} className="p-5 sm:p-6">
                                <h4 className="font-bold">{g.title}</h4>
                                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600 marker:text-site-900">
                                    {g.items.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </Card>
                        ))}
                        <Card className="p-5 sm:p-6">
                            <h4 className="font-bold">{pick('Assessment', 'Bewertung')}</h4>
                            <p className="mt-3 text-sm leading-relaxed text-slate-600">
                                The thesis report is the main basis for the grade, together with the submitted artifacts
                                such as source code or a demonstrator. At the final presentation, supervisors ask
                                comprehension questions to check your understanding of the topic; the presentation is
                                also graded on its quality and on how well you answer.
                            </p>
                        </Card>
                    </div>
                </Section>
            )}
        </PageShell>
    );
};

export default Teaching;
