const bachelorTheses = [
    {
        title: 'Bob the Language Model: Can LLMs Construct Buildings? (also possible to work on as a research assistant)',
        content: 'Recent advances in Large Language Models (LLMs) have enabled them to generate executable code and 3D scene descriptions from natural language. This thesis investigates how well LLMs can translate architectural or spatial descriptions into Building Information Models (BIM). The study will evaluate different prompting strategies, model architectures, and representations (e.g., IFC, USD, or textual scene graphs) to assess the fidelity, consistency, and semantic correctness of generated BIM structures.',
        references: [
            'Kampelopoulos, Dimitrios, et al. "A review of LLMs and their applications in the architecture, engineering and construction industry." Artificial Intelligence Review 58.8 (2025): 250.',
            'Taiwo, Ridwan, et al. "Generative AI in the Construction Industry: A State-of-the-art Analysis." arXiv preprint arXiv:2402.09939 (2024).',
            'Liu, Yudong, et al. "Dataset and benchmark for as-built BIM reconstruction from real-world point cloud." Automation in Construction 173 (2025): 106096.'
        ]
    },
    {
        title: 'On the Shoulders of Giants: Putting Peer-Reviewed LLM Papers to the Test (also possible to work on as a research assistant)',
        content: 'Reproducibility is fundamental to scientific progress, especially in fast-moving fields like large language models (LLMs) and neural program synthesis. This thesis aims to reproduce the experiments presented in "Program Synthesis via Test-Time Transduction" using a different class of LLMs and under a more rigorous and controlled evaluation setup.',
        references: [
            'Lee, Kang-il, et al. "Program Synthesis via Test-Time Transduction." arXiv preprint arXiv:2509.17393 (2025).'
        ]
    },
    {
        title: 'Beyond Accuracy: Measuring Intelligence in Programming by Example (also possible to work on as a research assistant)',
        content: 'Programming by Example (PBE) aims to learn programs that match input–output examples. While many benchmarks report accuracy-based metrics, such measures often fail to capture generalization, compositionality, or partial correctness. This thesis develops and evaluates alternative metrics for assessing PBE models.',
        references: [
            'Zenkner, Janis, Tobias Sesterhenn, and Christian Bartelt. "Shedding Light in Task Decomposition in Program Synthesis." arXiv preprint arXiv:2503.08738 (2025).',
            'Sesterhenn, Tobias, et al. "A Compute-Matched Re-Evaluation of TroVE on MATH." arXiv preprint arXiv:2507.22069 (2025).'
        ]
    },
    {
        title: 'Physical Guards: Enhancing the GUI and Extending Functionality for Smart Home Intrusion Detection',
        content: 'Physical Guards is a research-driven smart home project that aggregates sensor data to detect anomalies and potential security threats within residential environments. This thesis focuses on improving the existing GUI by making it more intuitive, informative, and responsive to real-time data. Moreover, it aims to transition the current local setup into a secure web application, enabling remote access and monitoring.'
    },
    {
        title: 'Evaluating LLM-Based Generation of Full-Stack Applications from Natural Language Requirements',
        content: 'This bachelor thesis explores and evaluates the effectiveness of current LLMs in generating full-stack applications, including both the backend logic and its integration with the generated front end. Given a collection of requirements described in natural language, the approach aims to automatically produce a functional application that satisfies the specified requirements.'
    },
    {
        title: 'BugPlus Studio: An Interactive Environment for Designing, Simulating, and Debugging Programs in the BugPlus Programming Language',
        content: 'BugPlus is a minimalist, Turing-complete programming language loosely inspired by marble-logic games like Turing Tumble. This thesis aims to design, implement, and evaluate an integrated desktop or web application—BugPlus Studio—that enables users to place bugs on a canvas, connect them, simulate execution, and load/save programs.'
    },
    {
        title: 'P.R.O.G.R.E.S.S. – Procedural Robot Generator & Export System for Simulation',
        content: 'P.R.O.G.R.E.S.S. is intended as an Isaac Sim extension for procedurally generating a wide variety of wheeled mobile robots. In this thesis, you will focus on developing the GUI-based extension, with an emphasis on interactive construction and configuration of mobile robots.'
    },
    {
        title: 'Tracing Circuits: Automated Discovery of Function-Specific Pathways in Small-Scale Transformer Models',
        content: 'In this project, the student will first train or fine-tune small Transformer models on a carefully designed suite of synthetic tasks that reveal distinct model behaviours. Using Anthropic\'s newly open-sourced Circuit Tracer framework, they will trace activation pathways from input tokens through attention heads and MLP neurons all the way to the output logits.'
    }
];

const masterTheses = [
    {
        title: 'Speak My Language: Softly Guiding LLMs with a DSL',
        content: 'Large Language Models excel at open-ended text generation but often struggle with syntactic validity and compositional reasoning in program synthesis. This thesis explores how soft constraints can align LLM outputs with a Domain-Specific Language (DSL) without fully restricting their generative flexibility.',
        references: [
            'Li, Wen-Ding, et al. "Combining induction and transduction for abstract reasoning." arXiv preprint arXiv:2411.02272 (2024).',
            'Li, Wen-Ding. Code Generation With Large Language Models: Inductive Reasoning and Calibration. Diss. Cornell University, 2025.'
        ]
    },
    {
        title: 'Explain Reality: Interactive Explanations with Foundation Models on the Meta Quest 3',
        content: 'The Explain Reality project aims to bridge the gap between state-of-the-art AI and immersive augmented reality by deploying foundation models such as segmentation and object detection directly on the Meta Quest 3. This thesis takes the next step: making the system truly interactive. The goal is to enable users not just to view visual detections, but to actively engage with their surroundings.'
    },
    {
        title: 'Reimagining MotherNet: Generating Interpretable Models for Tabular Data through Hypernetworks',
        content: 'MotherNet is a recent hypernetwork-based approach designed to generate entire neural networks in a single forward pass. This thesis explores an extension of the MotherNet framework to alternative model representations — such as recursive programs, symbolic rules, or decision trees.',
        link: 'https://arxiv.org/abs/2312.08598'
    },
    {
        title: 'Automated Requirements Verification Using LLM-Based GUI Agents',
        content: 'This thesis investigates the design, implementation, and evaluation of LLM-based Graphical User Interface (GUI) agents for the automated verification of software requirements. Given requirements in natural language and an implemented interactive GUI-based system, the approach should validate the correct implementation of the requirements.'
    },
    {
        title: 'Mechanistically Analyzing Large Language Model Agents',
        content: 'Large Language Models (LLMs) are increasingly deployed as autonomous agents capable of reasoning, decision-making across multiple steps. However, the internal mechanisms remain poorly understood. In this thesis you will take a closer look at LLMs and mechanistically analyze their decision-making capabilities.',
        link: 'https://arxiv.org/abs/2210.13382'
    },
    {
        title: 'Library Learning for Autoformalization',
        content: 'Autoformalization aims to translate informal mathematical text into formal proofs. This thesis investigates how existing library learning techniques impact the effectiveness and efficiency of autoformalization when integrated with Large Language Models and program synthesis.',
        references: [
            'Wang et al. TROVE: Inducing Verifiable and Efficient Toolboxes. ICLR 2024',
            'Berlot-Attwell et al. LLM Library Learning Fails. arXiv:2504.03048, 2025',
            'Zhang et al. Consistent Autoformalization. EMNLP 2024'
        ]
    },
    {
        title: 'Interpretable Control of Protein Diffusion Models',
        content: 'Protein diffusion models can generate high-quality protein structures, but controlling them to produce specific functional features remains challenging. This thesis proposes to bridge interpretability research with protein design, asking: can we understand how these models work well enough to control them?'
    }
];

const ThesisTopicList = ({ topics }) => (
    <div className="thesis-topics" style={{ marginTop: '1.5em' }}>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {topics.map((topic, index) => (
                <li key={index}>
                    <details style={{ marginBottom: '1em' }}>
                        <summary style={{ cursor: 'pointer', position: 'relative', paddingLeft: '1.2em', fontWeight: 'bold', lineHeight: '1.3' }}>
                            {topic.title}
                        </summary>
                        <p>{topic.content}</p>
                        {topic.references && (
                            <>
                                <p><strong>Key References:</strong></p>
                                <ul>
                                    {topic.references.map((ref, i) => (
                                        <li key={i}>- {ref}</li>
                                    ))}
                                </ul>
                            </>
                        )}
                        {topic.link && (
                            <p><strong>Paper:</strong> <a href={topic.link} target="_blank" rel="noreferrer">{topic.link}</a></p>
                        )}
                    </details>
                </li>
            ))}
        </ul>
    </div>
);

const Theses = () => {
    return (
        <>
            <style>{`
                .thesis-topics details summary::before {
                    content: '\\25B6';
                    position: absolute;
                    left: 0;
                }
                .thesis-topics details[open] summary::before {
                    content: '\\25BC';
                }
                .thesis-topics details summary:hover,
                .thesis-topics details summary:hover::before {
                    color: #007bff;
                }
                .thesis-topics details summary:hover {
                    background: rgba(0, 123, 255, 0.05);
                }
            `}</style>

            {/* Intro Section */}
            <section id="intro-ai" className="home-section">
                <div className="container">
                    <p>
                        We regularly offer bachelor and master thesis projects for motivated students who are excited to explore research questions in our areas of interest.
                        Topics vary depending on ongoing projects, but we are always open to new ideas and collaborative exploration.
                        Below is a selection of current or recent thesis topics to give you a sense of what working with us might look like.
                    </p>
                </div>
            </section>

            {/* Process Section */}
            <section id="topics" className="home-section">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-3 section-heading">
                            <h1>Process</h1>
                        </div>
                        <div className="col-xs-12 col-md-9">
                            <div className="course-list-item" itemScope itemType="http://schema.org/CreativeWork">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div style={{ marginTop: '1.5em' }}>
                                            <ol>
                                                <li>
                                                    <strong>Research Areas:</strong> Topics (subject to availability) are offered in: Reinforcement Learning, Program Synthesis, Computer Vision, Mechanistic Interpretability, GUI Prototyping, Explainability, Autonomous Driving.<br />
                                                    To apply, send your topic of interest, Transcript of Records, and CV to{' '}
                                                    <a href="mailto:patrick.knab@tu-clausthal.de">patrick.knab@tu-clausthal.de</a>.
                                                </li>
                                                <li>
                                                    <strong>Writing Expose:</strong> If a topic is available, the supervising researcher will help define a concrete topic. You must then submit an expose including:
                                                    <ul>
                                                        <li>Background & Motivation</li>
                                                        <li>Goals of the Thesis</li>
                                                        <li>Work Plan (at least 2 pages, excl. references)</li>
                                                    </ul>
                                                    Once accepted, you may begin your thesis project.
                                                </li>
                                                <li>
                                                    <strong>Thesis Project:</strong> Maintain regular meetings with your supervisor and make consistent progress. Use the provided LaTeX template and write in English.
                                                </li>
                                                <li>
                                                    <strong>Submission:</strong> Submit 2 printed copies of your report and 2 CDs/USB sticks with code, data, and installation instructions to the secretary's office (Wallstr. 6, Goslar).
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bachelor Theses Section */}
            <section id="bachelor" className="home-section">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-3 section-heading">
                            <h1>Bachelor&nbsp;Theses</h1>
                            <p style={{ fontSize: '0.9em', color: '#666' }}>Winter Semester 2025</p>
                        </div>
                        <div className="col-xs-12 col-md-9">
                            <div className="course-list-item" itemScope itemType="http://schema.org/CreativeWork">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="course-description">
                                            The following topics are available for Bachelor theses. Click on each topic to expand its full description.
                                        </div>
                                        <ThesisTopicList topics={bachelorTheses} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Master Theses Section */}
            <section id="master" className="home-section">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-3 section-heading">
                            <h1>Master&nbsp;Theses</h1>
                            <p style={{ fontSize: '0.9em', color: '#666' }}>Winter Semester 2025</p>
                        </div>
                        <div className="col-xs-12 col-md-9">
                            <div className="course-list-item" itemScope itemType="http://schema.org/CreativeWork">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="course-description">
                                            The following topics are available for Master theses. Click on each topic to expand its full description.
                                        </div>
                                        <ThesisTopicList topics={masterTheses} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Theses;
