import ProjectLayout from '../../../components/tuc/ProjectLayout';
import assetUrl from '../../../utils/assetUrl';

const AI4AIProject = () => {
    const requirements = [
        <><strong>AI Integrity & Critical Thinking:</strong> You can use AI tools (ChatGPT, Claude, Gemini, Cursor), but you must critically analyze and explain every decision — spot-checks will happen</>,
        <><strong>Team Spirit:</strong> Active participation in the Knowledge Share format, ensuring every team member understands the full pipeline — no black-box development</>,
        <><strong>Domain Interest:</strong> Genuine curiosity about applying LLMs and Computer Vision to engineering sciences (CAD, BIM, LaTeX, TikZ)</>,
        <><strong>Technical Openness:</strong> Willingness to adopt new workflows like VS Code/Cursor and AI-assisted coding practices</>,
        <><strong>Process Orientation:</strong> Commitment to reproducible development — setup guides, coding checklists, and documented artefacts</>
    ];

    const offerings = [
        "Hands-on experience with AI-assisted coding workflows using LLM tool calling and Cursor",
        "Robust engineering skills: reproducible development with VMs, individual conda environments, and REST APIs",
        "Access to cutting-edge LLMs and advanced Computer Vision models",
        "Domain expertise bridging raw images to structured engineering formats (CAD, BIM, LaTeX, TikZ)"
    ];

    const features = [
        { icon: "🖼️", title: "Image to Model", description: "Transitioning from a static image to a full, editable model — because what's better than an image is an editable model (CAD/BIM/TikZ)." },
        { icon: "🤖", title: "AI-Assisted AI", description: "Using AI methods (LLMs, Computer Vision) to solve engineering problems while leveraging AI tools to implement those very solutions." },
        { icon: "🔧", title: "Engineering Pipelines", description: "Building data pipelines, REST APIs, and reproducible workflows — from preprocessing through vision models to structured output." },
        { icon: "🧪", title: "The Challenge", description: "A structured 12-week sprint: LLM coding & setup → preprocessing & vision → the integrated Image-to-Model challenge with reproducible submission." }
    ];

    return (
        <ProjectLayout
            title="AI4AI"
            subtitle="From Image to Model using AI-assisted AI"
            status="Active"
            tags={["Computer Vision", "LLMs", "Engineering"]}
            // heroImage="/assets/images/ai4ai/hero.png"
            overview="AI4AI is a team-based project focused on one core mission: transitioning from a static image to a full, editable model of the object it represents. We use AI methods to solve concrete engineering problems while simultaneously leveraging AI tools (LLMs) to implement these solutions — hence AI for AI. The project emphasizes knowledge diffusion, ensuring every team member understands and can explain the decision-making process behind the tools created."
            features={features}
            requirements={requirements}
            offerings={offerings}
            downloadUrl={assetUrl("/documents/project-descriptions/AI4AIv1.0.pdf")}
        >
            {/* Timeline / Sprint Structure */}
            <div className="py-12 border-t border-gray-100">
                <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">12-Week Sprint Structure</h3>

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {/* Week 1-4 */}
                    <div className="bg-gradient-to-br from-primary-50 to-indigo-50 p-8 rounded-2xl border border-primary-100 relative overflow-hidden">
                        <div className="absolute top-4 right-4 text-6xl font-black text-primary-100 select-none pointer-events-none">01</div>
                        <span className="text-sm font-bold text-primary-600 uppercase tracking-wider">Week 1–4</span>
                        <h4 className="text-xl font-bold text-gray-900 mt-2 mb-4">LLM Coding + Setup</h4>
                        <ul className="text-gray-600 space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-primary-500 mt-0.5">▸</span>
                                Basics of LLMs and AI-assisted coding
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary-500 mt-0.5">▸</span>
                                VM and Conda environment setup
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary-500 mt-0.5">▸</span>
                                AI-assisted scaffold creation
                            </li>
                        </ul>
                    </div>

                    {/* Week 5-8 */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100 relative overflow-hidden">
                        <div className="absolute top-4 right-4 text-6xl font-black text-purple-100 select-none pointer-events-none">02</div>
                        <span className="text-sm font-bold text-purple-600 uppercase tracking-wider">Week 5–8</span>
                        <h4 className="text-xl font-bold text-gray-900 mt-2 mb-4">Preprocessing + Vision</h4>
                        <ul className="text-gray-600 space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-purple-500 mt-0.5">▸</span>
                                Data pipelines and CV baselines
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-500 mt-0.5">▸</span>
                                Evaluation frameworks
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-500 mt-0.5">▸</span>
                                LLM-supported documentation
                            </li>
                        </ul>
                    </div>

                    {/* Week 9-12 */}
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl border border-amber-100 relative overflow-hidden">
                        <div className="absolute top-4 right-4 text-6xl font-black text-amber-100 select-none pointer-events-none">03</div>
                        <span className="text-sm font-bold text-amber-600 uppercase tracking-wider">Week 9–12</span>
                        <h4 className="text-xl font-bold text-gray-900 mt-2 mb-4">The Challenge</h4>
                        <ul className="text-gray-600 space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-amber-500 mt-0.5">▸</span>
                                Image → Structured Representation
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-amber-500 mt-0.5">▸</span>
                                Structured Representation → Final Output
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-amber-500 mt-0.5">▸</span>
                                Reproducible submission
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Key Technologies */}
            <div className="py-12 border-t border-gray-100">
                <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Technology Stack</h3>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-lg text-gray-600 leading-relaxed space-y-6">
                        <p>
                            AI4AI sits at the intersection of <strong>AI research</strong> and <strong>AI-assisted development</strong>. Students learn to wield modern LLMs not just as research subjects, but as powerful coding assistants that accelerate their own implementation work.
                        </p>
                        <p>
                            The project pipeline flows from raw images through Computer Vision models to produce structured, editable engineering outputs — bridging the gap between perception and actionable 3D/structured data.
                        </p>
                        <div className="bg-indigo-50 p-6 rounded-xl border-l-4 border-indigo-500 mt-6">
                            <h4 className="font-bold text-indigo-900 mb-2">Output Formats</h4>
                            <ul className="list-disc list-inside text-indigo-800 space-y-1 text-base">
                                <li>CAD (Computer-Aided Design)</li>
                                <li>BIM (Building Information Modeling)</li>
                                <li>LaTeX / TikZ technical drawings</li>
                            </ul>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: "LLMs", desc: "GPT, Claude, Gemini" },
                            { label: "Computer Vision", desc: "Detection & Segmentation" },
                            { label: "REST APIs", desc: "Service Architecture" },
                            { label: "Data Pipelines", desc: "End-to-End Processing" },
                            { label: "VS Code / Cursor", desc: "AI-Assisted IDE" },
                            { label: "Reproducibility", desc: "VMs & Conda Envs" }
                        ].map((tech, i) => (
                            <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <h5 className="font-bold text-gray-900 text-sm">{tech.label}</h5>
                                <p className="text-gray-500 text-xs mt-1">{tech.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* References */}
                <div className="mt-16 p-8 bg-gray-50 rounded-2xl border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-4">Key References</h4>
                    <div className="flex flex-wrap gap-3">
                        {["Text2CAD", "TikZero", "LLM Tool Calling", "AI-Assisted Coding"].map((ref, i) => (
                            <span key={i} className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200">
                                {ref}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </ProjectLayout>
    );
};

export default AI4AIProject;
