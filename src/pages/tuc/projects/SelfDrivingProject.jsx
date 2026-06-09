import ProjectLayout from '../../../components/tuc/ProjectLayout';

const SelfDrivingProject = () => {
    const features = [
        { icon: '🛰️', title: 'SLAM & Perception', description: 'Lightweight SLAM and sensor-fusion methods tailored to 1:10-scale platforms.' },
        { icon: '🧭', title: 'Path Planning', description: 'Trajectory planning and obstacle avoidance tuned for miniature autonomous vehicles.' },
        { icon: '🔧', title: 'End-to-end stack', description: 'Integration of perception, planning and low-level control for rapid prototyping.' },
        { icon: '🅿️', title: 'Autonomous Parking', description: 'Integrated perception and motion planning tailored for accurate slot detection and collision-free parking in constrained environments.' }
    ];

    return (
        <ProjectLayout
            title="Self-Driving 1:10"
            subtitle="Scaled-down autonomous driving platform for rapid prototyping and student projects"
            status="Legacy"
            tags={["Autonomous Navigation"]}
            overview="A completed initiative focused on adapting SLAM, path planning and control to a 1:10 scaled vehicle for fast experimentation and teaching. The work emphasises practical prototyping rather than a public code release."
            features={features}
            showEvalSection={false}
            heroYouTubeId="wrY34WyTEzo"
        >

        </ProjectLayout>
    );
};

export default SelfDrivingProject;
