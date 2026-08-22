import ProjectLayout from '../../../components/tuc/ProjectLayout';
import FinishedProjectContent from '../../../components/tuc/FinishedProjectContent';
import { useLanguage } from '../../../i18n/useLanguage';

const TrafficNetworkProject = () => {
    const { pick } = useLanguage();

    return (
    <ProjectLayout
        title="Traffic Network Builder"
        subtitle={pick('Unity map editing and OpenDRIVE export for autonomous-driving simulation', 'Unity-Kartenbearbeitung und OpenDRIVE-Export für autonome Fahrsimulationen')}
        tags={[pick('Simulation Tools', 'Simulationswerkzeuge'), 'OpenDRIVE', 'CARLA']}
        overview={pick('Traffic Network Builder lets a user assemble a road layout from reusable pieces in Unity and export the result as an OpenDRIVE 1.4 file. Python helper scripts then load the generated .xodr map into CARLA for autonomous-driving experiments.', 'Mit dem Traffic Network Builder lassen sich Straßennetze in Unity aus wiederverwendbaren Elementen zusammensetzen und als OpenDRIVE-1.4-Datei exportieren. Python-Hilfsskripte laden die erzeugte .xodr-Karte anschließend für autonome Fahrexperimente in CARLA.')}
        heroVideo="/videos/demonstrations/autonomous_driving/TrafficNetworkBuilder.mp4"
        heroCaption={pick('Unity road editing and OpenDRIVE export workflow', 'Unity-Straßenbearbeitung und OpenDRIVE-Exportworkflow')}
        showHeroTags={false}
        showHeroOverview={false}
        features={[]}
        showEvalSection={false}
        compact
    >
        <FinishedProjectContent
            showShowcase={false}
            showcase={{
                title: 'Traffic Network Builder',
                subtitle: 'Interactive Unity map editor',
                eyebrow: 'OpenDRIVE export pipeline',
                heading: 'Build a road network once and load it into CARLA',
                body: 'Road pieces are placed and connected in the Unity editor. The exporter writes the assembled network to an OpenDRIVE .xodr file, and the included CARLA scripts generate a simulator map from that file.',
                imageSrc: 'https://raw.githubusercontent.com/davszi/Traffic-Network-Builder/main/media/traffic_network_builder.gif',
                imageAlt: 'Traffic Network Builder editor demonstration'
            }}
            summary={{
                title: pick('How a map moves from Unity to CARLA', 'Wie eine Karte von Unity nach CARLA gelangt'),
                paragraphs: [
                    pick('The editor provides drag-and-drop road construction and stores exported maps in OpenDRIVE 1.4 format. This standard describes the road network independently from the Unity scene so another simulator can interpret it.', 'Der Editor ermöglicht den Straßenbau per Drag-and-drop und speichert exportierte Karten im OpenDRIVE-1.4-Format. Dieser Standard beschreibt das Straßennetz unabhängig von der Unity-Szene, sodass ein anderer Simulator es interpretieren kann.'),
                    pick('The repository includes Python scripts and sample maps for CARLA 0.9.13. Its documentation also records current compatibility limits: road markings, parking lanes, traffic signs, lights, and spawn points are not always reproduced correctly by CARLA\'s OpenDRIVE importer.', 'Das Repository enthält Python-Skripte und Beispielkarten für CARLA 0.9.13. Die Dokumentation nennt außerdem aktuelle Kompatibilitätsgrenzen: Straßenmarkierungen, Parkspuren, Verkehrszeichen, Ampeln und Spawnpunkte werden vom OpenDRIVE-Importer von CARLA nicht immer korrekt übernommen.')
                ]
            }}
            focus={pick(
                ['Unity map editor', 'OpenDRIVE 1.4 export', 'CARLA 0.9.13', 'Python import scripts', 'Reusable road pieces', 'Simulator compatibility testing'],
                ['Unity-Karteneditor', 'OpenDRIVE-1.4-Export', 'CARLA 0.9.13', 'Python-Importskripte', 'Wiederverwendbare Straßenelemente', 'Simulator-Kompatibilitätstests']
            )}
            artifacts={[
                pick('The Unity editor assembles road networks from reusable drag-and-drop pieces', 'Der Unity-Editor setzt Straßennetze aus wiederverwendbaren Drag-and-drop-Elementen zusammen'),
                pick('The exporter serializes the layout as an OpenDRIVE .xodr map', 'Der Exporter serialisiert das Layout als OpenDRIVE-.xodr-Karte'),
                pick('Python utilities load exported maps into CARLA and expose importer compatibility limits', 'Python-Werkzeuge laden exportierte Karten in CARLA und machen Kompatibilitätsgrenzen des Importers sichtbar')
            ]}
            materialTitle={pick('Map editor source', 'Quellcode des Karteneditors')}
            materialBody={pick('The repository contains the Unity editor, OpenDRIVE exporter, CARLA import scripts, sample maps, setup guide, and developer documentation.', 'Das Repository enthält den Unity-Editor, den OpenDRIVE-Exporter, CARLA-Importskripte, Beispielkarten, eine Einrichtungsanleitung und Entwicklerdokumentation.')}
            materialHref="https://github.com/davszi/Traffic-Network-Builder"
            materialLabel={pick('Open on GitHub', 'Auf GitHub öffnen')}
            materialIcon="github"
        />
    </ProjectLayout>
    );
};

export default TrafficNetworkProject;
