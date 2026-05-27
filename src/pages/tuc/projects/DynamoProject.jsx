import ProjectLayout from '../../../components/tuc/ProjectLayout';
import assetUrl from '../../../utils/assetUrl';

const DynamoProject = () => {
    const requirements = [
        <><strong>Visible Effort:</strong> Regular demos, active experimentation, and a clear "trail of research" — we value the journey, not just the destination</>,
        <><strong>AI Integrity & Understanding:</strong> AI tools (ChatGPT, Claude, Gemini) are welcome, but you must deeply understand the logic and be able to explain and troubleshoot any code you submit</>,
        <><strong>Ambition:</strong> Readiness to tackle hard, undefined problems and document the scientific process — including why things failed</>,
        <><strong>Activity:</strong> Consistent presence and participation in sprint cycles and team meetings</>,
        <><strong>Team Spirit:</strong> Proactively helping to unblock teammates and contributing to collective progress</>,
        <><strong>Technical Prerequisite:</strong> Basic Python programming and a proactive, self-driven approach to problem-solving</>
    ];

    const offerings = [
        "Hands-on experience with cutting-edge technologies: NVIDIA Isaac Lab, Project GR00T, and Gemini API",
        "Research autonomy to investigate state-of-the-art AI paradigms in robotic manipulation and navigation",
        "A structured, collaborative team environment with clear interface contracts between sub-teams",
        "Focus on the scientific method — hypothesizing, experimenting, iterating — over simple task execution"
    ];

    const features = [
        { icon: "🚗", title: "Mobile Navigation & Logistics", description: "ROS 2 Navigation (Nav2), path planning, visual servoing, and human-aware pathing for autonomous mobile base operations." },
        { icon: "🦾", title: "Advanced Manipulation", description: "Foundation models (GR00T), imitation learning (LeRobot, ACT, Diffusion Policy), VLAs (OpenVLA), and embodied reasoning via Gemini API." },
        { icon: "🖥️", title: "Simulation & Orchestration", description: "NVIDIA Isaac Lab, virtual scene description (USD), synthetic data generation, and digital twin construction." },
        { icon: "🔬", title: "Process > Product", description: "An agile 2-week sprint cycle with simulation-first methodology — grading is driven by the quality of your research journey, not just the final product." }
    ];

    return (
        <ProjectLayout
            title="DyNAMO"
            subtitle="Dynamic Navigation & Autonomous Manipulation Operations"
            status="Active"
            tags={["Robotic Manipulation", "Simulation", "Embodied AI"]}
            heroImage={assetUrl("/images/projects/dynamo/hero.webp")}
            overview="DyNAMO is an ambitious, high-complexity research initiative where students tackle undefined problems in robotics — not follow a fixed tutorial. We physically decouple the Mobile Base (Logistics) from the Manipulator (Dexterity), allowing sub-teams to develop against agreed-upon interfaces. Operating on an agile 2-week sprint cycle with a simulation-first approach using NVIDIA Isaac Lab, teams iterate rapidly and safely before deploying to real hardware."
            features={features}
            requirements={requirements}
            offerings={offerings}
            downloadUrl={assetUrl("/documents/project-descriptions/DyNAMOv1.2.pdf")}
        >
            {/* Scientific Approach - shown first */}
            <div id="science" className="py-12 border-t border-gray-100">
                <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Scientific Approach</h3>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div className="text-lg text-gray-600 leading-relaxed space-y-6">
                        <p>
                            Current robotic systems often perform repetitive tasks with super-human precision but fail when faced with novel objects or unscripted environments. DyNAMO moves away from hard-coded behaviors towards learning-based approaches that emphasize true <strong>understanding</strong>.
                        </p>
                        <p>
                            Our capstone goal is to construct an <strong>Integrated Test Environment</strong> where Ridgeback and G1 robots operate simultaneously amidst animated human characters in a unified simulation — then transfer those capabilities to the real world.
                        </p>
                        <div className="bg-primary-50 p-6 rounded-xl border-l-4 border-primary-500 mt-6">
                            <h4 className="font-bold text-primary-900 mb-2">Key Challenges</h4>
                            <ul className="list-disc list-inside text-primary-800 space-y-1 text-base">
                                <li>Bridging simulation and reality (Sim2Real transfer)</li>
                                <li>Grounding language models in physical robotic actions</li>
                                <li>Coordinating autonomous navigation with dexterous manipulation</li>
                                <li>Building robust digital twins for rapid iteration</li>
                            </ul>
                        </div>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 group">
                        <img
                            src={assetUrl("/images/projects/dynamo/goal.png")}
                            alt="Dynamo Goal Illustration"
                            loading="lazy"
                            decoding="async"
                            className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <p className="text-white text-sm font-medium text-center">Sim2Real Transfer & Object Manipulation</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* System Architecture */}
            <div id="architecture" className="py-12 border-t border-gray-100">
                <div className="mb-20">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">System Architecture</h2>
                        <p className="text-gray-500">Visual abstract of the end-to-end pipeline</p>
                    </div>
                    <div className="max-w-5xl mx-auto shadow-2xl rounded-2xl overflow-hidden bg-white border border-gray-100 relative group">
                        <div className="absolute inset-0 bg-primary-900/5 group-hover:bg-transparent transition-colors duration-300 pointer-events-none"></div>
                        <img
                            src={assetUrl("/images/projects/dynamo/architecture.webp")}
                            alt="Dynamo Visual Abstract"
                            loading="lazy"
                            decoding="async"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </div>
        </ProjectLayout>
    );
};

export default DynamoProject;
