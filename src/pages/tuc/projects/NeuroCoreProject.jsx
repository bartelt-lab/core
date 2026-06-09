import ProjectLayout from '../../../components/tuc/ProjectLayout';
import assetUrl from '../../../utils/assetUrl';

const NeuroCoreProject = () => {
    const features = [
        {
            icon: "⚙️",
            title: "Job Orchestration",
            description:
                "Schedule and orchestrate ML training jobs across clusters with reproducible job specifications."
        },
        {
            icon: "📊",
            title: "Real-time Monitoring",
            description:
                "Live GPU and node metrics with resource usage visualization and health checks."
        },
        {
            icon: "🔒",
            title: "SSH & Remote Health",
            description:
                "Lightweight SSH-based probes to monitor node responsiveness, disk performance, and IO health."
        },
        {
            icon: "🔁",
            title: "Experiment Tracking",
            description:
                "Centralized experiment logs, run metadata, and training progress visualizations."
        }
    ];

    return (
        <ProjectLayout
            title="NeuroCore Dashboard"
            subtitle="Orchestration, monitoring and analytics for ML compute clusters"
            status="Archive"
            tags={["MLOps", "Monitoring"]}
            heroVideo={assetUrl('/videos/demonstrations/neurocore/NeuroCore_demo.mp4')}
            heroImage={assetUrl('/images/projects/neurocore/neurocore-dashboard.svg')}
            overview="NeuroCore is a unified dashboard designed to orchestrate machine learning workloads, monitor GPU and node health through SSH-based probes, and provide real-time analytics across distributed compute clusters."
            features={features}
            showEvalSection={false}
        >
            {/* Compact repository callout */}
            <section className="py-6 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6 flex items-center justify-between gap-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Project repository</h3>
                        <p className="mt-1 text-gray-600 text-sm">View source code, implementation details and technical docs on GitHub.</p>
                    </div>

                    <div className="shrink-0">
                        <a
                            href="https://github.com/davszi/NeuroCore.git"
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

export default NeuroCoreProject;
