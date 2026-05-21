import ProjectLayout from '../../../components/tuc/ProjectLayout';

const TrafficNetworkProject = () => {
    const features = [
        {
            icon: '🗺️',
            title: 'Unity Map Editor',
            description: 'Interactive editor to compose road networks and export OpenDRIVE (.xodr) maps.'
        },
        {
            icon: '🔁',
            title: 'OpenDRIVE export',
            description: 'Export maps in OpenDRIVE 1.4 format so they can be used in driving simulators like CARLA.'
        },
        {
            icon: '🚗',
            title: 'CARLA integration',
            description: 'Helper scripts and examples to import and run exported maps inside the CARLA simulator.'
        },
        {
            icon: '⚙️',
            title: 'Map generation tools',
            description: 'Python utilities and opendrive conversion scripts for automated map generation and testing.'
        }
    ];

    return (
        <ProjectLayout
            title="Traffic Network Builder"
            subtitle="Unity-based editor and OpenDRIVE export pipeline for simulator-ready road networks"
            status="Archive"
            tags={["Simulation Tools", "OpenDRIVE", "CARLA"]}
            // use the project's demo gif hosted on GitHub as the hero image
            heroImage="https://raw.githubusercontent.com/davszi/Traffic-Network-Builder/main/media/traffic_network_builder.gif"
            overview={`Unity-based map editor and exporter that generates OpenDRIVE 1.4 (.xodr) files with lane geometry, junctions, elevation profiles, traffic signs and signal definitions. Includes an exporter, Python post-processing utilities, CARLA import scripts and sample maps; validated for simulator compatibility and automated map-generation pipelines.`}
            features={features}
            showEvalSection={false}
        >
            <section className="py-6 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6 flex items-center justify-between gap-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Project repository</h3>
                        <p className="mt-1 text-gray-600 text-sm">Source, setup instructions and demo media are available on GitHub.</p>
                    </div>

                    <div className="shrink-0">
                        <a
                            href="https://github.com/davszi/Traffic-Network-Builder"
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

export default TrafficNetworkProject;
