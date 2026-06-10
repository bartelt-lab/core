import { useState } from 'react';

const YOUTUBE_ID = 'Q7sZvdIEC0Y';
const YOUTUBE_THUMB = `https://img.youtube.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`;
const YOUTUBE_EMBED = `https://www.youtube.com/embed/${YOUTUBE_ID}?start=5&autoplay=1`;

const Section = ({ id, title, subtitle, children }) => (
    <section id={id} className="border-b border-gray-200 last:border-b-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
            </div>
            <div className="md:col-span-3 prose prose-gray max-w-none prose-headings:text-gray-900">
                {children}
            </div>
        </div>
    </section>
);

const Projects = () => {
    const [showVideo, setShowVideo] = useState(false);

    return (
        <>
            <section id="intro-ai" className="border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                    <p className="text-gray-700 leading-relaxed max-w-3xl">
                        The European Master Team Project offers an exciting opportunity for students to collaborate
                        internationally while working on real-world challenges. This long-standing program is a
                        partnership between the Technical University of Clausthal and Babeș-Bolyai University in
                        Cluj-Napoca, Romania, led by Prof. Dr. Christian Bartelt.
                    </p>

                    <div className="mt-8 flex justify-center">
                        <div
                            className="relative w-full max-w-2xl bg-black"
                            style={{ aspectRatio: '16 / 9' }}
                        >
                            {!showVideo ? (
                                <button
                                    type="button"
                                    className="absolute inset-0 w-full h-full group"
                                    onClick={() => setShowVideo(true)}
                                    aria-label="Play video"
                                >
                                    <img
                                        src={YOUTUBE_THUMB}
                                        alt="International Master Team Project 2022 — video thumbnail"
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover"
                                    />
                                    <span className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                                        <span className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
                                            <span className="w-0 h-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-gray-900 ml-1" />
                                        </span>
                                    </span>
                                </button>
                            ) : (
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src={YOUTUBE_EMBED}
                                    title="International Master Team Project 2022"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Section id="topics" title="Details" subtitle="Summer Semester 2025">
                <p>
                    From October 10, 2025 to January 30, 2026, students from both universities will work in
                    interdisciplinary teams on innovative projects at the intersection of computer science and
                    engineering. Collaboration takes place primarily online, with regular team meetings, milestone
                    reviews, and mentor check-ins.
                </p>
                <p>
                    Two in-person project weeks are included:
                </p>
                <ul>
                    <li>Cluj-Napoca, Romania: Week Nov 9</li>
                    <li>Goslar, Germany: Week Nov 30</li>
                </ul>
                <p>Travel, accommodation, and social event costs are fully covered.</p>
                <p>
                    This initiative is inspired by the successful model at the University of Mannheim. For an archive
                    of past projects, visit the{' '}
                    <a
                        href="https://www.uni-mannheim.de/en/ines/teaching/european-master-team-project/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Mannheim project page
                    </a>
                    .
                </p>
                <p>
                    Take this chance to work on an exciting project, gain international teamwork experience, and
                    expand your professional network!
                </p>
            </Section>

            <Section title="Projects" subtitle="Summer Semester 2025">
                <p>This semester we will offer the following projects:</p>
                <p>
                    <strong>Development of an LLM Training &amp; Evaluation Environment in the Kaiser I Cluster.</strong>{' '}
                    In this project you will design and deploy the infrastructure to train, fine-tune, and rigorously
                    evaluate Large Language Models on the GenAI Lab's new €400,000 Kaiser I GPU cluster, which combines
                    state-of-the-art NVIDIA H200 GPUs with other high-performance accelerators. Together with your team
                    you will build a platform that captures real-time GPU, memory, network, and power metrics, make
                    them available through intuitive dashboards, and configure automated alerting systems. You will
                    craft reproducible benchmarks for key workloads — from inference to fine-tuning, so results across
                    models and hardware can be compared. By the end of the semester you will know how to deliver
                    production-grade MLOps tooling.
                </p>
                <p>
                    <strong>Large Language Models for Text-Based Games.</strong>{' '}
                    In this project you develop a Large Language Model (LLM) agent that is capable of self-improvement
                    in strategy-games. Specifically, you will develop an Artificial Intelligence for the two-player
                    strategy game Stratego. Working in a cross-institutional team with students from Babeș-Bolyai
                    University, you will gain hands-on experience with LLM deployment (e.g., model parallelism,
                    compression, activation checkpointing) and cutting-edge self-improvement methods which include
                    reinforcement learning, self-play, exploration strategies, and advanced model analysis.
                </p>
            </Section>
        </>
    );
};

export default Projects;
