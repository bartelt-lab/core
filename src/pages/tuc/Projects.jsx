import { useState } from 'react';
import assetUrl from '../../utils/assetUrl';

const Projects = () => {
    const [showVideo, setShowVideo] = useState(false);

    return (
        <>
            {/* Introduction Section */}
            <section id="intro-ai" className="home-section">
                <div className="container">
                    <p>
                        The European Master Team Project offers an exciting opportunity for students to collaborate internationally while working on real-world challenges.
                        This long-standing program is a partnership between the Technical University of Clausthal and Babes-Bolyai University in Cluj-Napoca, Romania,
                        led by Prof. Dr. Christian Bartelt.
                    </p>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div id="video-container" style={{ position: 'relative', width: '560px', height: '315px' }}>
                            {!showVideo ? (
                                <img
                                    src={assetUrl("/tuc/assets/images/project-image.png")}
                                    alt="Video thumbnail"
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                                    onClick={() => setShowVideo(true)}
                                />
                            ) : (
                                <iframe
                                    width="560"
                                    height="315"
                                    src="https://www.youtube.com/embed/Q7sZvdIEC0Y?start=5&autoplay=1"
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

            {/* Details Section */}
            <section id="topics" className="home-section">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-3 section-heading">
                            <h1>Details</h1>
                            <p style={{ fontSize: '0.9em', color: '#666' }}>Summer Semester 2025</p>
                        </div>
                        <div className="col-xs-12 col-md-9">
                            <div className="course-list-item" itemScope itemType="http://schema.org/CreativeWork">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="course-description">
                                            <p>
                                                From October 10, 2025 to January 30, 2026, students from both universities will work in interdisciplinary teams on innovative projects at the intersection
                                                of computer science and engineering. Collaboration takes place primarily online, with regular team meetings, milestone reviews, and mentor check-ins.
                                            </p>
                                            <p>
                                                Two in-person project weeks are included:
                                                <ul>
                                                    <li>Cluj-Napoca, Romania: Week Nov 9</li>
                                                    <li>Goslar, Germany: Week Nov 30</li>
                                                </ul>
                                                Travel, accommodation, and social event costs are fully covered.
                                            </p>
                                            <p>
                                                This initiative is inspired by the successful model at the University of Mannheim.
                                                For an archive of past projects, visit the{' '}
                                                <a href="https://www.uni-mannheim.de/en/ines/teaching/european-master-team-project/" target="_blank" rel="noreferrer">Mannheim project page</a>.
                                            </p>
                                            <p>
                                                Take this chance to work on an exciting project, gain international teamwork experience, and expand your professional network!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section className="home-section">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-3 section-heading">
                            <h1>Projects</h1>
                            <p style={{ fontSize: '0.9em', color: '#666' }}>Summer Semester 2025</p>
                        </div>
                        <div className="col-xs-12 col-md-9">
                            <div className="course-list-item" itemScope itemType="http://schema.org/CreativeWork">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="course-description">
                                            This semester we will offer the following projects:
                                            <br /><br />
                                            <p>
                                                <b>Development of an LLM Training & Evaluation Environment in the GenAI Cluster.</b>
                                                {' '}In this project you will design and deploy the infrastructure to train, fine-tune, and rigorously evaluate Large Language Models on the GenAI Labs new EUR 400 000 GPU cluster, which combines state-of-the-art NVIDIA H200 GPUs with other high-performance accelerators.
                                                Together with your team you will build a platform that captures real-time GPU, memory, network, and power metrics, make them available through intuitive dashboards, and configure automated alerting systems.
                                                You will craft reproducible benchmarks for key workloads—from inference to fine-tuning, so results across models and hardware can be compared.
                                                By the end of the semester you will know how to deliver production-grade MLOps tooling.
                                            </p>
                                            <p>
                                                <b>Large Language Models for Text-Based Games.</b>
                                                <br />
                                                In this project you develop a Large Language Model (LLM) agent that is capable of self-improvement in strategy-games.
                                                Specifically, you will develop an Artificial Intelligence for the two-player strategy game Stratego.
                                                Working in a cross-institutional team with students from Babes-Bolyai University, you will gain hands-on experience with LLM deployment (e.g., model parallelism, compression, activation checkpointing) and cutting-edge self-improvement methods which include reinforcement learning, self-play, exploration strategies, and advanced model analysis.
                                            </p>
                                        </div>
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

export default Projects;
