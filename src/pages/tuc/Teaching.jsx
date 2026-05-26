import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const taughtCourses = [
    {
        title: '"Grundlagen der Kuenstlichen Intelligenz" @ TU Clausthal',
        semester: 'Winter Semester 2025-2026',
        tone: 'Foundations, methods, and applications of modern AI.'
    },
    {
        title: '"Grundlagen der Informatik" @ TU Clausthal (DigiTec)',
        semester: 'Winter Semester 2025-2026',
        tone: 'Core concepts for students building their CS fundamentals.'
    },
    {
        title: 'Research Projects',
        semester: 'Summer Semester 2025',
        tone: 'Hands-on project work with active research questions and supervision.'
    },
    {
        title: 'European AI Team Projects',
        semester: 'Summer Semester 2025',
        tone: 'Cross-institutional AI projects with applied and research-driven tracks.',
        link: '/ai-team-projects',
        cta: 'Open project page'
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
    'The final presentation is scheduled by the Studienbüro after submission.',
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
    { label: 'Courses', href: '#courses-overview' },
    { label: 'Seminars', href: '#seminars' },
    { label: 'Theses', href: '#theses' }
];

const SectionBlock = ({ title, intro, topContent, children, id }) => (
    <section id={id} className="teaching-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
                </div>
                <div className="md:col-span-3">
                    {topContent}
                    {intro && <p className="teaching-intro">{intro}</p>}
                    {children}
                </div>
            </div>
        </div>
    </section>
);

const Teaching = ({ initialSection }) => {
    const location = useLocation();

    const scrollToSection = (targetId) => {
        const element = document.getElementById(targetId);
        if (!element) {
            return;
        }

        const offset = 82;
        const top = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    };

    useEffect(() => {
        const targetId = location.hash ? location.hash.slice(1) : initialSection;

        if (!targetId) {
            return;
        }

        window.requestAnimationFrame(() => {
            scrollToSection(targetId);
        });
    }, [initialSection, location.hash]);

    return (
        <>
            <style>{`
                .teaching-hero {
                    position: relative;
                    overflow: hidden;
                    padding: 120px 0 72px;
                    background:
                        radial-gradient(circle at top left, rgba(235, 117, 78, 0.25), transparent 32%),
                        radial-gradient(circle at right 20%, rgba(34, 101, 163, 0.28), transparent 34%),
                        linear-gradient(135deg, #f7efe8 0%, #f8f4ee 38%, #e8f0f7 100%);
                }
                .teaching-hero::before,
                .teaching-hero::after {
                    content: '';
                    position: absolute;
                    border-radius: 999px;
                    opacity: 0.55;
                    filter: blur(4px);
                }
                .teaching-hero::before {
                    width: 260px;
                    height: 260px;
                    right: -70px;
                    top: 40px;
                    background: rgba(235, 117, 78, 0.18);
                }
                .teaching-hero::after {
                    width: 320px;
                    height: 320px;
                    left: -120px;
                    bottom: -120px;
                    background: rgba(34, 101, 163, 0.14);
                }
                .teaching-hero h1 {
                    margin: 18px 0 16px;
                    font-size: clamp(2.8rem, 5vw, 5.2rem);
                    line-height: 0.98;
                    color: #1f2d3d;
                }
                .teaching-hero p {
                    max-width: 700px;
                    font-size: 1.02em;
                    line-height: 1.7;
                    color: #3d4e62;
                }
                .teaching-quick-links,
                .teaching-list-grid {
                    display: grid;
                    gap: 16px;
                    margin-top: 30px;
                }
                .teaching-quick-links {
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                }
                .teaching-quick-links button,
                .teaching-card,
                .teaching-timeline-card,
                .teaching-topic-card,
                .teaching-highlight {
                    border-radius: 22px;
                    border: 1px solid rgba(31, 45, 61, 0.08);
                    box-shadow: 0 18px 40px rgba(36, 54, 80, 0.08);
                }
                .teaching-quick-links button {
                    display: block;
                    width: 100%;
                    padding: 16px 18px;
                    background: rgba(255, 255, 255, 0.8);
                    border: 1px solid rgba(31, 45, 61, 0.08);
                    color: #1f2d3d;
                    font-weight: 700;
                    text-decoration: none;
                    text-align: left;
                    cursor: pointer;
                    transition: transform 0.18s ease, box-shadow 0.18s ease;
                }
                .teaching-quick-links button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 22px 48px rgba(36, 54, 80, 0.12);
                }
                .teaching-section {
                    padding-top: 56px;
                    padding-bottom: 56px;
                }
                .teaching-intro {
                    max-width: 760px;
                    margin-bottom: 22px;
                    color: #4f5f72;
                    line-height: 1.7;
                }
                .teaching-grid {
                    display: grid;
                    gap: 18px;
                }
                .teaching-grid.two {
                    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                }
                .teaching-grid.three {
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                }
                .teaching-card {
                    padding: 22px;
                    background: linear-gradient(180deg, #ffffff 0%, #faf7f3 100%);
                }
                .teaching-card h3,
                .teaching-timeline-card h3,
                .teaching-topic-card h3,
                .teaching-highlight h3 {
                    margin-top: 0;
                    color: #1f2d3d;
                }
                .teaching-card p,
                .teaching-card li,
                .teaching-timeline-card li,
                .teaching-topic-card p,
                .teaching-highlight li {
                    color: #536377;
                    line-height: 1.65;
                }
                .teaching-card .muted {
                    display: inline-block;
                    margin-bottom: 10px;
                    color: #8c5b46;
                    font-size: 0.9em;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                }
                .teaching-card .cta {
                    display: inline-block;
                    margin-top: 10px;
                    color: #2265a3;
                    font-weight: 700;
                }
                .teaching-simple-list {
                    margin: 0;
                    padding-left: 22px;
                    list-style-position: outside;
                    list-style-type: disc;
                }
                .teaching-simple-list li {
                    margin-bottom: 16px;
                    color: #536377;
                    line-height: 1.65;
                }
                .teaching-simple-list strong {
                    color: #1f2d3d;
                }
                .teaching-inline-link {
                    margin-left: 8px;
                    color: #2265a3;
                    font-weight: 700;
                    white-space: nowrap;
                }
                .teaching-bands {
                    display: grid;
                    gap: 16px;
                    margin-top: 20px;
                }
                .teaching-band {
                    padding: 18px 22px;
                    border-left: 5px solid #c85c33;
                    border-radius: 18px;
                    background: linear-gradient(90deg, rgba(200, 92, 51, 0.08), rgba(255, 255, 255, 0.95));
                }
                .teaching-band p {
                    margin: 0;
                    color: #495b6f;
                }
                .teaching-timeline {
                    display: flex;
                    flex-direction: column;
                    gap: 18px;
                    margin-top: 24px;
                }
                .teaching-process-title {
                    margin: 28px 0 0;
                    color: #1f2d3d;
                }
                .teaching-timeline-card {
                    padding: 22px;
                    background: linear-gradient(180deg, #fefefe 0%, #edf4fb 100%);
                    width: 100%;
                }
                .teaching-timeline-card ul {
                    margin: 0;
                    padding-left: 22px;
                    list-style-type: disc;
                }
                .teaching-timeline-card li {
                    margin-bottom: 8px;
                }
                .teaching-process-list {
                    margin: 16px 0 0;
                    padding-left: 0;
                    list-style-position: inside;
                }
                .teaching-process-list li {
                    margin-bottom: 12px;
                    color: #536377;
                    line-height: 1.7;
                }
                .teaching-process-list strong {
                    color: #1f2d3d;
                }
                .teaching-phase {
                    display: inline-block;
                    margin-bottom: 10px;
                    padding: 6px 10px;
                    border-radius: 999px;
                    background: #1f2d3d;
                    color: #fff;
                    font-size: 0.78em;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                }
                .teaching-topic-card {
                    padding: 22px;
                    background: linear-gradient(180deg, #ffffff 0%, #f8fbfd 100%);
                }
                .teaching-topic-card .lead {
                    display: inline-block;
                    margin-bottom: 8px;
                    color: #2265a3;
                    font-weight: 700;
                }
                .teaching-highlight {
                    padding: 22px;
                    background: linear-gradient(135deg, #1f2d3d 0%, #2d4963 100%);
                }
                .teaching-highlight h3,
                .teaching-highlight p,
                .teaching-highlight li {
                    color: #f6f8fb;
                }
                .teaching-highlight ul {
                    padding-left: 20px;
                    margin-bottom: 0;
                }
                .teaching-pill-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-top: 18px;
                }
                .teaching-pill {
                    padding: 10px 14px;
                    border-radius: 999px;
                    background: #f4eee8;
                    color: #6a4d3f;
                    font-weight: 700;
                }
                .teaching-guideline-grid {
                    display: grid;
                    gap: 18px;
                    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                    margin-top: 22px;
                }
                .teaching-guideline-list {
                    margin: 22px 0 0;
                    padding-left: 0;
                    list-style: none;
                }
                .teaching-guideline-list > li {
                    margin-bottom: 26px;
                    color: #536377;
                    line-height: 1.7;
                    list-style: none;
                }
                .teaching-guideline-list h3 {
                    margin: 0 0 8px;
                    color: #1f2d3d;
                }
                .teaching-guideline-list p {
                    margin-bottom: 10px;
                }
                .teaching-guideline-list ul {
                    padding-left: 22px;
                    margin-bottom: 0;
                    list-style-type: disc;
                    list-style-position: outside;
                }
                .teaching-guideline-list ul li {
                    margin-bottom: 8px;
                    list-style: disc;
                }
                .teaching-guideline-grid ul,
                .teaching-timeline-card ul,
                .teaching-card ul {
                    padding-left: 20px;
                    margin-bottom: 0;
                }
                .teaching-note {
                    margin-top: 18px;
                    margin-bottom: 28px;
                    padding: 18px 20px;
                    border-radius: 18px;
                    border-left: 4px solid #c85c33;
                    background: linear-gradient(90deg, rgba(200, 92, 51, 0.09), rgba(255, 255, 255, 0.96));
                    color: #684f42;
                    line-height: 1.6;
                }
                .teaching-note strong {
                    color: #1f2d3d;
                }
                .teaching-note p:last-child {
                    margin-bottom: 0;
                }
                @media (max-width: 767px) {
                    .teaching-hero {
                        padding: 110px 0 56px;
                    }
                    .teaching-section {
                        padding-top: 42px;
                        padding-bottom: 42px;
                    }
                }
            `}</style>

            <section className="teaching-hero">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h1>Teaching</h1>
                    <p>
                        This page gives an overview of our courses, seminars, and thesis opportunities, including
                        the current seminar format and thesis process. It is meant to help students quickly see what
                        we offer, how to apply, and which topics are available.
                    </p>

                    <div className="teaching-quick-links">
                        {quickLinks.map((item) => (
                            <button key={item.href} type="button" onClick={() => scrollToSection(item.href.slice(1))}>
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <SectionBlock
                id="courses-overview"
                title="Courses"
                intro="Our teaching spans foundational courses, project-based formats, seminars, and supervised theses. The sections below combine the practical information that used to be spread across multiple subpages."
            >
                <ul className="teaching-simple-list">
                    {taughtCourses.map((course) => (
                        <li key={course.title}>
                            <strong>{course.title}</strong> ({course.semester})<br />
                            {course.tone}
                            {course.link && (
                                <Link className="teaching-inline-link" to={course.link}>
                                    {course.cta}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </SectionBlock>

            <SectionBlock
                id="seminars"
                title="Seminars"
                topContent={
                    <div className="teaching-note">
                        <p><strong>Apply for a seminar</strong></p>
                        <p>
                            Send your Transcript of Records and your topic preferences to{' '}
                            <a href="mailto:patrick.knab@tu-clausthal.de">patrick.knab@tu-clausthal.de</a>.
                            {' '}You can also include a short CV if relevant.
                        </p>
                        <p>
                            Please allow 2-3 weeks for a response after your initial request.
                        </p>
                    </div>
                }
                intro="The seminar process is organized in two stages: first a guided reading phase, then an independent research phase, followed by submission and presentation."
            >
                <h3 className="teaching-process-title">Process</h3>
                <div className="teaching-timeline">
                    {seminarProcess.map((step) => (
                        <div key={step.title} className="teaching-timeline-card">
                            <span className="teaching-phase">{step.phase}</span>
                            <h3>{step.title}</h3>
                            <ul>
                                {step.points.map((point) => (
                                    <li key={point}>{point}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </SectionBlock>

            <SectionBlock
                id="theses"
                title="Bachelor & Master Thesis Guidelines"
                topContent={
                    <div className="teaching-note">
                        <p><strong>Apply for a thesis</strong></p>
                        <p>
                            Send your topic of interest, Transcript of Records, and CV to{' '}
                            <a href="mailto:patrick.knab@tu-clausthal.de">patrick.knab@tu-clausthal.de</a>.
                        </p>
                        <p>
                            Please allow 2-3 weeks for a response after your initial request.
                        </p>
                    </div>
                }
                intro="We offer thesis topics, subject to availability, across several active research areas. The information below consolidates the current public-facing process, expectations, and submission guidance."
            >
                <div className="teaching-card">
                    <h3>Available Thesis Topics</h3>
                    <ul className="teaching-simple-list">
                        {researchAreas.slice(0, 7).map((entry) => (
                            <li key={entry.area}>
                                <strong>{entry.area}.</strong> {entry.summary}
                            </li>
                        ))}
                    </ul>
                </div>

                <h3 className="teaching-process-title">Process</h3>
                <ol className="teaching-process-list">
                    {thesisApplicationSteps.map((step, index) => (
                        <li key={step}>
                            <strong>Step {index + 1}.</strong> {step}
                        </li>
                    ))}
                </ol>

                <ul className="teaching-guideline-list">
                    <li>
                        <h3>What the Exposé Should Cover</h3>
                        <ul>
                            {exposeGuidelines.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </li>
                    <li>
                        <h3>Report Basics</h3>
                        <ul>
                            {thesisFormatting.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </li>
                    <li>
                        <h3>Working With Your Advisor</h3>
                        <ul>
                            {thesisSupervision.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </li>
                    <li>
                        <h3>Report Expectations</h3>
                        <ul>
                            {thesisWriting.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </li>
                    <li>
                        <h3>Defense Format</h3>
                        <ul>
                            {thesisFinalPresentation.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </li>
                    <li>
                        <h3>What Must Be Handed In</h3>
                        <ul>
                            {thesisSubmission.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </li>
                    <li>
                        <h3>Use of Generative AI</h3>
                        <ul>
                            {thesisAiUse.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </li>
                    <li>
                        <h3>Assessment</h3>
                        <p>
                            The report remains the primary basis for grading. In addition, supervisors prepare
                            comprehension questions for the final presentation to verify topic understanding.
                            Internal grading uses the UMA grading template, adapted as needed by the supervising researcher.
                        </p>
                    </li>
                </ul>
            </SectionBlock>
        </>
    );
};

export default Teaching;
