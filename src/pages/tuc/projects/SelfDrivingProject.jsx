import ProjectLayout from '../../../components/tuc/ProjectLayout';
import FinishedProjectContent from '../../../components/tuc/FinishedProjectContent';
import { useLanguage } from '../../../i18n/useLanguage';

const SelfDrivingProject = () => {
    const { pick } = useLanguage();

    return (
    <ProjectLayout
        title="Self-Driving 1:10"
        subtitle={pick('A 1:10 vehicle testbed for localization, planning, and control', 'Ein Fahrzeug-Teststand im Maßstab 1:10 für Lokalisierung, Planung und Regelung')}
        tags={[pick('Autonomous Navigation', 'Autonome Navigation')]}
        overview={pick('Self-Driving 1:10 places the main parts of an autonomous-driving stack on a compact physical vehicle. SLAM estimates the vehicle pose, perception describes the surroundings, a planner selects a route, and feedback control converts that route into steering and speed commands.', 'Self-Driving 1:10 bringt die wichtigsten Bestandteile eines autonomen Fahrstapels auf ein kompaktes physisches Fahrzeug. SLAM schätzt die Fahrzeugpose, die Wahrnehmung beschreibt die Umgebung, ein Planer wählt die Route und die Regelung setzt sie in Lenk- und Geschwindigkeitsbefehle um.')}
        heroYouTubeId="wrY34WyTEzo"
        heroCaption={pick('Scaled autonomous-driving platform demonstration', 'Demonstration der skalierten autonomen Fahrplattform')}
        showHeroTags={false}
        showHeroOverview={false}
        features={[]}
        showEvalSection={false}
        compact
    >
        <FinishedProjectContent
            showShowcase={false}
            showcase={{
                title: 'Self-Driving 1:10',
                subtitle: 'Scaled autonomous vehicle testbed',
                eyebrow: 'Autonomy stack',
                heading: 'Localization, planning, and control on compact hardware',
                body: 'The small vehicle provides an end-to-end test environment for mapping, localization, obstacle-aware path planning, low-level motion control, and autonomous parking without requiring a full-size road vehicle.',
                youtubeId: 'wrY34WyTEzo'
            }}
            summary={{
                title: pick('How the scaled autonomy stack is organized', 'Wie der skalierte Autonomiestapel aufgebaut ist'),
                paragraphs: [
                    pick('SLAM builds or updates a map while estimating the vehicle position. Perception supplies information about drivable space and obstacles, and path planning converts the destination into a trajectory the vehicle can follow.', 'SLAM erstellt oder aktualisiert eine Karte und schätzt gleichzeitig die Fahrzeugposition. Die Wahrnehmung liefert Informationen über befahrbare Flächen und Hindernisse; die Pfadplanung überführt das Ziel in eine fahrbare Trajektorie.'),
                    pick('The control layer translates that trajectory into steering and speed adjustments. Using a 1:10 platform shortens hardware iteration cycles and makes complete maneuvers such as autonomous parking practical to test indoors.', 'Die Regelung übersetzt diese Trajektorie in Lenk- und Geschwindigkeitsanpassungen. Die Plattform im Maßstab 1:10 verkürzt Hardware-Iterationen und ermöglicht Tests vollständiger Manöver wie autonomes Einparken in Innenräumen.')
                ]
            }}
            focus={pick(
                ['SLAM', 'Perception', 'Path planning', 'Low-level control', 'Autonomous parking', 'Rapid prototyping'],
                ['SLAM', 'Wahrnehmung', 'Pfadplanung', 'Low-Level-Regelung', 'Autonomes Einparken', 'Schnelles Prototyping']
            )}
            artifacts={[
                pick('SLAM and localization keep the vehicle pose aligned with the working map', 'SLAM und Lokalisierung gleichen die Fahrzeugpose kontinuierlich mit der Arbeitskarte ab'),
                pick('Path planning converts a destination into an obstacle-aware drivable trajectory', 'Die Pfadplanung wandelt ein Ziel in eine befahrbare, hindernisbewusste Trajektorie um'),
                pick('Feedback control applies steering and speed commands for route following and parking', 'Die Rückkopplungsregelung setzt Lenk- und Geschwindigkeitsbefehle für Routenverfolgung und Einparken um')
            ]}
            materialTitle={pick('Available demonstration', 'Verfügbare Demonstration')}
            materialBody={pick('The linked video is the verified public demonstration of the scaled vehicle and its autonomous-driving workflow.', 'Das verlinkte Video ist die verifizierte öffentliche Demonstration des skalierten Fahrzeugs und seines autonomen Fahrworkflows.')}
            materialHref="https://www.youtube.com/watch?v=wrY34WyTEzo"
            materialLabel={pick('Open video', 'Video öffnen')}
            materialIcon="video"
        />
    </ProjectLayout>
    );
};

export default SelfDrivingProject;
