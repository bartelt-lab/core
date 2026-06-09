import ProjectLayout from '../../../components/tuc/ProjectLayout';
import assetUrl from '../../../utils/assetUrl';

const StrategoProject = () => {
    const features = [
        { icon: "♟️", title: "Automated Matchups", description: "Run large batches of LLM vs LLM matches with deterministic seeding and result capture." },
        { icon: "📈", title: "Head-to-head Analytics", description: "Win/loss statistics, move-sequence aggregation and behavioral pattern extraction." },
        { icon: "🧾", title: "Gameplay Logging", description: "Detailed logs for replay, step-by-step decision inspection and reproducible evaluation." },
        { icon: "🤖", title: "LLM Agents", description: "Adapters to plug different LLMs as decision agents for the Stratego environment." }
    ];

    return (
        <ProjectLayout
            title="Stratego — LLM Based Games"
            subtitle="Exploring LLM decision-making in the strategy board game Stratego"
            status="Archive"
            tags={["LLMs", "Games"]}
            heroImage={assetUrl('/images/projects/stratego/stratego-poster.svg')}
            heroVideo={assetUrl('/videos/demonstrations/stratego/stratego-demo-rp3.mp4')}
            overview="Explore how different large language models compete in the classic strategy board game Stratego, with automated matchups, head-to-head win comparisons, and gameplay behavior logging to reveal strengths and patterns in decision making."
            features={features}
            showEvalSection={false}
        >
            <section className="py-6 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6 flex items-center justify-between gap-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Project repository</h3>
                        <p className="mt-1 text-gray-600 text-sm">View source code, implementation details and technical docs on GitHub.</p>
                    </div>

                    <div className="shrink-0">
                        <a
                            href="https://github.com/davszi/Stratego.git"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-md shadow-sm hover:shadow-md hover:bg-black transition-all duration-150"
                        >
                            Open on GitHub
                        </a>
                    </div>
                </div>
            </section>
        </ProjectLayout>
    );
};

export default StrategoProject;
