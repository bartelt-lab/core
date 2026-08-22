import ProjectLayout from '../../../components/tuc/ProjectLayout';
import FinishedProjectContent from '../../../components/tuc/FinishedProjectContent';
import { useLanguage } from '../../../i18n/useLanguage';

const StrategoProject = () => {
    const { pick } = useLanguage();

    return (
    <ProjectLayout
        title="Stratego - LLM Based Games"
        subtitle={pick('Benchmarking LLM reasoning in an imperfect-information strategy game', 'Benchmarking von LLM-Schlussfolgerungen in einem Strategiespiel mit unvollständiger Information')}
        tags={['LLMs', pick('Games', 'Spiele')]}
        overview={pick('Stratego is a Python evaluation framework that runs model-versus-model games with Ollama or Hugging Face agents. It records prompts, moves, invalid actions, timing, and outcomes so strategic behavior can be compared across models, board sizes, and prompt configurations.', 'Stratego ist ein Python-Evaluationsframework für Modell-gegen-Modell-Spiele mit Ollama- oder Hugging-Face-Agenten. Es protokolliert Prompts, Züge, ungültige Aktionen, Laufzeiten und Ergebnisse, damit strategisches Verhalten über Modelle, Brettgrößen und Prompt-Konfigurationen hinweg verglichen werden kann.')}
        heroVideo="/videos/demonstrations/stratego/stratego-demo-rp3.mp4"
        heroImage="/images/projects/stratego/stratego-poster.svg"
        heroCaption={pick('Automated LLM-versus-LLM Stratego evaluation', 'Automatisierte Stratego-Evaluation zwischen LLMs')}
        showHeroTags={false}
        showHeroOverview={false}
        showEvalSection={false}
        compact
    >
        <FinishedProjectContent
            showShowcase={false}
            showcase={{
                title: 'Stratego',
                subtitle: 'Automated model-versus-model arena',
                eyebrow: 'LLM evaluation framework',
                heading: 'Repeatable Stratego matches for model comparison',
                body: 'A command-line runner connects two selected language models to the game environment, applies a chosen prompt strategy, and executes the match on a configurable board. Each decision is logged for later scoring and behavior analysis.',
                videoSrc: '/videos/demonstrations/stratego/stratego-demo-rp3.mp4',
                poster: '/images/projects/stratego/stratego-poster.svg'
            }}
            summary={{
                title: pick('How the Stratego benchmark measures model behavior', 'Wie der Stratego-Benchmark Modellverhalten misst'),
                paragraphs: [
                    pick('The automated arena runs repeated games between local Ollama models or Hugging Face models. The runner supports different board sizes and prompt variants, while CSV logs preserve the initial prompt, move sequence, metadata, and result for reproducibility.', 'Die automatisierte Arena führt wiederholt Spiele zwischen lokalen Ollama- oder Hugging-Face-Modellen aus. Der Runner unterstützt verschiedene Brettgrößen und Prompt-Varianten; CSV-Protokolle sichern Ausgangsprompt, Zugfolge, Metadaten und Ergebnis für reproduzierbare Auswertungen.'),
                    pick('The benchmark compares win and draw rates, games that reach the turn limit, invalid-move losses, player-position bias, and the number of completed games. A prompt-improvement step can use recent logs to revise the system prompt for later runs.', 'Der Benchmark vergleicht Gewinn- und Remisquoten, Spiele am Zuglimit, Niederlagen durch ungültige Züge, Positionsverzerrungen und die Zahl abgeschlossener Partien. Ein Schritt zur Prompt-Verbesserung kann aktuelle Protokolle nutzen, um den System-Prompt für spätere Läufe anzupassen.')
                ]
            }}
            focus={pick(
                ['Python', 'TextArena game environment', 'Ollama agents', 'Hugging Face models', 'CSV move logging', 'Batch benchmarking', 'Prompt optimization'],
                ['Python', 'TextArena-Spielumgebung', 'Ollama-Agenten', 'Hugging-Face-Modelle', 'CSV-Zugprotokollierung', 'Batch-Benchmarking', 'Prompt-Optimierung']
            )}
            artifacts={[
                pick('The arena runs configurable LLM-versus-LLM matches across multiple board sizes', 'Die Arena führt konfigurierbare LLM-gegen-LLM-Partien auf mehreren Brettgrößen aus'),
                pick('CSV logs preserve prompts, moves, timing, invalid actions, and final outcomes', 'CSV-Protokolle speichern Prompts, Züge, Laufzeiten, ungültige Aktionen und Endergebnisse'),
                pick('Scoring combines game results, turn-limit behavior, invalid-move penalties, and player-position effects', 'Die Bewertung kombiniert Spielergebnisse, Verhalten am Zuglimit, Strafen für ungültige Züge und Effekte der Spielerposition')
            ]}
            materialTitle={pick('Evaluation framework source', 'Quellcode des Evaluationsframeworks')}
            materialBody={pick('The repository contains the game runner, model adapters, GUI, CSV logger, benchmark commands, scoring code, and prompt-improvement workflow.', 'Das Repository enthält Game Runner, Modelladapter, GUI, CSV-Logger, Benchmark-Befehle, Bewertungscode und den Workflow zur Prompt-Verbesserung.')}
            materialHref="https://github.com/davszi/Stratego.git"
            materialLabel={pick('Open on GitHub', 'Auf GitHub öffnen')}
            materialIcon="github"
        />
    </ProjectLayout>
    );
};

export default StrategoProject;
