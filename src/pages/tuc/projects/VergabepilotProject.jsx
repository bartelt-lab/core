import ProjectLayout from '../../../components/tuc/ProjectLayout';
import assetUrl from '../../../utils/assetUrl';

const VergabepilotProject = () => {
    const requirements = [
        <><strong>Scraper Engineering:</strong> Quality of strategies and choices made when generating and refining web scrapers — we evaluate the thought process, not just the output</>,
        <><strong>Evaluation Design:</strong> Ability to measure document completeness and define meaningful metrics for scraper performance</>,
        <><strong>Failure Analysis:</strong> Diagnosing what broke and why — building a taxonomy of scraper failure modes and documenting root causes</>,
        <><strong>Robustness Thinking:</strong> Designing solutions that gracefully handle changing website structures and edge cases</>,
        <><strong>Knowledge Sharing:</strong> Documenting trade-offs, iteration reports, and failure taxonomies for the entire team</>
    ];

    const offerings = [
        "Real-world data acquisition experience in the complex German public procurement domain",
        "Hands-on work with LLM-based agents and multi-modal web automation (OpenAI CUA)",
        "Exposure to a startup environment with modern engineering workflows",
        "Building self-improving systems — treating scraper creation as a reproducible, automated engineering process"
    ];

    const features = [
        { icon: "🌐", title: "Automated Scraping", description: "Moving from fragile, hand-coded web scrapers to an LLM-driven engineering loop that generates, validates, and improves scrapers automatically." },
        { icon: "🤖", title: "LLM-Powered Generation", description: "Using GPT-4 and prompt engineering to automatically generate web scrapers from website observations — no manual coding required." },
        { icon: "🧪", title: "Three-Way Comparison", description: "Benchmarking manual scrapers (baseline) vs. LLM-generated scrapers (automation) vs. MLLM agent-based scraping (dynamic fallback)." },
        { icon: "🔄", title: "Self-Improving Loop", description: "An iterative cycle: Observe website → Generate scraper → Test → Diagnose failures → Improve. Process over product." }
    ];

    return (
        <ProjectLayout
            title="Vergabepilot.AI"
            subtitle="LLM-based Tender Scraping for State-of-the-Art Tender Search"
            status="Active"
            tags={["NLP", "Web Automation", "Startup"]}
            heroImage={assetUrl("/images/projects/vergabepilot/hero.png")}
            overview="Vergabepilot.AI is an emerging German startup tackling the fragility and high maintenance costs of traditional web scrapers used to collect public tender documents. Instead of manually developing scrapers for each tender platform, we build an automated, LLM-driven engineering loop that can generate, validate, and continuously improve scrapers — transforming scraper creation from a one-off coding task into a reproducible, self-improving process."
            features={features}
            requirements={requirements}
            offerings={offerings}
            downloadUrl={assetUrl("/documents/project-descriptions/Vergabepilot_AIv1.1.pdf")}
        >
            {/* The Engineering Loop */}
            <div className="py-12 border-t border-gray-100">
                <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">The Engineering Loop</h3>

                <div className="max-w-4xl mx-auto mb-20">
                    {/* Loop Visualization */}
                    <div className="relative">
                        {[
                            { step: "01", title: "Observe", desc: "Analyze the target website structure, DOM layout, and tender document locations", color: "blue" },
                            { step: "02", title: "Generate", desc: "Use LLMs to automatically create a scraper based on observations and prompt strategies", color: "indigo" },
                            { step: "03", title: "Test", desc: "Run the generated scraper and measure document completeness against defined evaluation metrics", color: "purple" },
                            { step: "04", title: "Diagnose", desc: "Classify failures — identify what broke, why, and which failure category it falls into", color: "pink" },
                            { step: "05", title: "Improve", desc: "Feed diagnostics back to the LLM to refine prompts and regenerate improved scrapers", color: "rose" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-6 mb-8 last:mb-0">
                                <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-${item.color}-100 flex items-center justify-center`}>
                                    <span className={`text-${item.color}-600 font-black text-lg`}>{item.step}</span>
                                </div>
                                <div className="flex-1 pt-1">
                                    <h4 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h4>
                                    <p className="text-gray-600">{item.desc}</p>
                                </div>
                                {i < 4 && (
                                    <div className="absolute left-7 mt-14 w-px h-8 bg-gray-200" style={{ top: `${i * 88}px` }}></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Timeline */}
            <div className="py-12 border-t border-gray-100">
                <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">12-Week Sprint Structure</h3>

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {/* Week 1-4 */}
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border border-emerald-100 relative overflow-hidden">
                        <div className="absolute top-4 right-4 text-6xl font-black text-emerald-100 select-none pointer-events-none">01</div>
                        <span className="text-sm font-bold text-emerald-600 uppercase tracking-wider">Week 1–4</span>
                        <h4 className="text-xl font-bold text-gray-900 mt-2 mb-4">Setup & Foundations</h4>
                        <ul className="text-gray-600 space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-500 mt-0.5">▸</span>
                                Data acquisition foundations
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-500 mt-0.5">▸</span>
                                Evaluation metrics for tender completeness
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-500 mt-0.5">▸</span>
                                Environment setup (Playwright, Selenium)
                            </li>
                        </ul>
                    </div>

                    {/* Week 5-8 */}
                    <div className="bg-gradient-to-br from-cyan-50 to-sky-50 p-8 rounded-2xl border border-cyan-100 relative overflow-hidden">
                        <div className="absolute top-4 right-4 text-6xl font-black text-cyan-100 select-none pointer-events-none">02</div>
                        <span className="text-sm font-bold text-cyan-600 uppercase tracking-wider">Week 5–8</span>
                        <h4 className="text-xl font-bold text-gray-900 mt-2 mb-4">LLM Scraper Pipeline</h4>
                        <ul className="text-gray-600 space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-500 mt-0.5">▸</span>
                                LLM-based scraper generation pipeline
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-500 mt-0.5">▸</span>
                                Comparative studies (manual vs. LLM)
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-500 mt-0.5">▸</span>
                                Prompt engineering & iteration
                            </li>
                        </ul>
                    </div>

                    {/* Week 9-12 */}
                    <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 p-8 rounded-2xl border border-violet-100 relative overflow-hidden">
                        <div className="absolute top-4 right-4 text-6xl font-black text-violet-100 select-none pointer-events-none">03</div>
                        <span className="text-sm font-bold text-violet-600 uppercase tracking-wider">Week 9–12</span>
                        <h4 className="text-xl font-bold text-gray-900 mt-2 mb-4">MLLM Agents & Classifier</h4>
                        <ul className="text-gray-600 space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="text-violet-500 mt-0.5">▸</span>
                                MLLM agent-based scraping for hard sites
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-violet-500 mt-0.5">▸</span>
                                Automatic failure classifier
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-violet-500 mt-0.5">▸</span>
                                Final comparative benchmark
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Technology Stack */}
            <div className="py-12 border-t border-gray-100">
                <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Technology Stack</h3>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-lg text-gray-600 leading-relaxed space-y-6">
                        <p>
                            Vergabepilot.AI operates at the intersection of <strong>web automation</strong> and <strong>large language models</strong>. The project explores whether LLMs can replace the tedious, manual process of writing and maintaining web scrapers for hundreds of tender platforms.
                        </p>
                        <p>
                            By comparing three distinct approaches — manual, LLM-generated, and MLLM agent-based — we build a rigorous understanding of where AI excels and where human craftsmanship is still required.
                        </p>
                        <div className="bg-emerald-50 p-6 rounded-xl border-l-4 border-emerald-500 mt-6">
                            <h4 className="font-bold text-emerald-900 mb-2">Three Approaches</h4>
                            <ul className="list-disc list-inside text-emerald-800 space-y-1 text-base">
                                <li><strong>Manual Scrapers</strong> — hand-crafted baseline</li>
                                <li><strong>LLM-Generated</strong> — automated via prompt engineering</li>
                                <li><strong>MLLM Agent</strong> — dynamic, vision-based fallback</li>
                            </ul>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: "Playwright", desc: "Browser Automation" },
                            { label: "Selenium", desc: "Web Driver Control" },
                            { label: "GPT-4 / LLMs", desc: "Scraper Generation" },
                            { label: "OpenAI CUA", desc: "MLLM Agent Scraping" },
                            { label: "REST APIs", desc: "Service Architecture" },
                            { label: "DOM Parsing", desc: "Structure Analysis" }
                        ].map((tech, i) => (
                            <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <h5 className="font-bold text-gray-900 text-sm">{tech.label}</h5>
                                <p className="text-gray-500 text-xs mt-1">{tech.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ProjectLayout>
    );
};

export default VergabepilotProject;
