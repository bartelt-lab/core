import ProjectLayout from '../../../components/tuc/ProjectLayout';
import FinishedProjectContent from '../../../components/tuc/FinishedProjectContent';
import assetUrl from '../../../utils/assetUrl';
import { useLanguage } from '../../../i18n/useLanguage';

const DynamoProject = () => {
    const { pick } = useLanguage();

    return (
    <ProjectLayout
        title="DyNAMO"
        subtitle="Dynamic Navigation & Autonomous Manipulation Operations"
        tags={pick(['Robotic Manipulation', 'Simulation', 'Embodied AI'], ['Robotische Manipulation', 'Simulation', 'Verkörperte KI'])}
        overview={pick('DyNAMO divides an autonomous robotics system into three connected parts: ROS 2 navigation for the Ridgeback mobile base, learned manipulation for the Unitree G1, and a shared Isaac Sim and Isaac Lab environment built with USD. Defined interfaces allow each subsystem to be developed independently before integration.', 'DyNAMO unterteilt ein autonomes Robotersystem in drei verbundene Bereiche: ROS-2-Navigation für die mobile Ridgeback-Basis, gelernte Manipulation mit dem Unitree G1 sowie eine gemeinsame, mit USD aufgebaute Isaac-Sim- und Isaac-Lab-Umgebung. Definierte Schnittstellen ermöglichen die unabhängige Entwicklung der Teilsysteme vor ihrer Integration.')}
        features={[]}
        showEvalSection={false}
        compact
    >
        <FinishedProjectContent
            showcase={{
                title: 'DyNAMO',
                subtitle: 'Dynamic Navigation & Autonomous Manipulation Operations',
                eyebrow: pick('Robotics system architecture', 'Robotik-Systemarchitektur'),
                heading: pick('Navigation, manipulation, and simulation under shared interfaces', 'Navigation, Manipulation und Simulation über gemeinsame Schnittstellen'),
                body: pick('The Ridgeback handles mapping, path planning, obstacle avoidance, and docking. The G1 manipulation track studies learned pick-and-place policies, while the simulation track supplies shared robot assets, physics, environments, and synthetic data.', 'Der Ridgeback übernimmt Kartierung, Pfadplanung, Hindernisvermeidung und Andocken. Der G1-Manipulationsbereich untersucht gelernte Pick-and-Place-Strategien, während der Simulationsbereich gemeinsame Roboterassets, Physik, Umgebungen und synthetische Daten bereitstellt.'),
                imageSrc: '/images/projects/dynamo/architecture.webp',
                imageAlt: 'DyNAMO system architecture visual abstract'
            }}
            summary={{
                title: pick('How the DyNAMO system is divided', 'Wie das DyNAMO-System aufgeteilt ist'),
                paragraphs: [
                    pick('The mobile-navigation track uses ROS 2 Nav2 for mapping and autonomous movement, then adds visual servoing and dynamic obstacle handling for precise positioning near the manipulator.', 'Der Bereich mobile Navigation nutzt ROS 2 Nav2 für Kartierung und autonome Bewegung und ergänzt visuelle Regelung sowie dynamische Hindernisbehandlung für die präzise Positionierung am Manipulator.'),
                    pick('The manipulation track compares foundation models, imitation learning, vision-language-action models, and code-as-policy approaches. A shared Isaac Sim and Isaac Lab environment uses USD stages, digital twins, physics, and synthetic data to keep both robot subsystems compatible before hardware transfer.', 'Der Manipulationsbereich vergleicht Foundation Models, Imitation Learning, Vision-Language-Action-Modelle und Code-as-Policy-Ansätze. Eine gemeinsame Isaac-Sim- und Isaac-Lab-Umgebung nutzt USD-Stages, digitale Zwillinge, Physik und synthetische Daten, um beide Robotersysteme vor dem Hardwaretransfer kompatibel zu halten.')
                ]
            }}
            focus={pick(
                ['ROS 2 Nav2', 'NVIDIA Isaac Sim / Lab', 'USD environments', 'Visual servoing', 'Imitation learning', 'Vision-language-action models', 'Sim2Real transfer'],
                ['ROS 2 Nav2', 'NVIDIA Isaac Sim / Lab', 'USD-Umgebungen', 'Visuelle Regelung', 'Imitation Learning', 'Vision-Language-Action-Modelle', 'Sim2Real-Transfer']
            )}
            artifacts={[
                pick('ROS 2 navigation handles mapping, path planning, obstacle avoidance, and mobile-base docking', 'Die ROS-2-Navigation übernimmt Kartierung, Pfadplanung, Hindernisvermeidung und das Andocken der mobilen Basis'),
                pick('Learning-based manipulation targets multi-object pick-and-place with the Unitree G1', 'Lernbasierte Manipulation zielt auf Pick-and-Place mehrerer Objekte mit dem Unitree G1'),
                pick('Shared USD stages combine robot assets, physics, and synthetic-data generation in Isaac Sim and Isaac Lab', 'Gemeinsame USD-Stages verbinden Roboterassets, Physik und synthetische Datenerzeugung in Isaac Sim und Isaac Lab')
            ]}
            materialTitle={pick('Technical project document', 'Technisches Projektdokument')}
            materialBody={pick('The document describes the subsystem interfaces, navigation and manipulation tracks, Isaac simulation environment, and intended integration workflow.', 'Das Dokument beschreibt die Schnittstellen der Teilsysteme, die Navigations- und Manipulationsbereiche, die Isaac-Simulationsumgebung und den vorgesehenen Integrationsworkflow.')}
            materialHref={assetUrl('/documents/project-descriptions/DyNAMOv1.2.pdf')}
            materialLabel={pick('Open technical document', 'Technisches Dokument öffnen')}
        />
    </ProjectLayout>
    );
};

export default DynamoProject;
