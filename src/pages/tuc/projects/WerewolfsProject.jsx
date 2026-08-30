import ProjectLayout from "../../../components/tuc/ProjectLayout";
import FinishedProjectContent from "../../../components/tuc/FinishedProjectContent";
import assetUrl from "../../../utils/assetUrl";
import { useLanguage } from "../../../i18n/useLanguage";

const WerewolfsProject = () => {
  const { pick } = useLanguage();

  return (
    <ProjectLayout
      title="The Village at Scale"
      subtitle={pick(
        "LLM Agents Playing Werewolf - learning social reasoning through self-play",
        "LLM-Agenten spielen Werwolf – soziales Schlussfolgern durch Self-Play lernen",
      )}
      tags={pick(
        ["LLM Agents", "Supervised Fine-Tuning", "Reinforcement Learning"],
        ["LLM-Agenten", "Überwachtes Fine-Tuning", "Reinforcement Learning"],
      )}
      overview={pick(
        "The Village at Scale combines supervised fine-tuning and reinforcement learning through self-play to train compact agents for strategic reasoning in Werewolf.",
        "The Village at Scale kombiniert überwachtes Fine-Tuning und Reinforcement Learning durch Self-Play, um kompakte Agenten für strategisches Schlussfolgern im Werwolf-Spiel zu trainieren.",
      )}
      introBackgroundImage={assetUrl(
        "/images/projects/werewolfs/showcase-background.webp",
      )}
      introHeightClass="lg:h-[24rem]"
      showEvalSection={false}
      softBackground
      compact
    >
      <FinishedProjectContent
        summary={{
          title: pick(
            "From distilled gameplay to self-play",
            "Von destilliertem Spielverhalten zu Self-Play",
          ),
          paragraphs: [
            pick(
              "Reinforcement learning can't get started if the model's output can't be parsed. Untrained agents leak their secret roles into public discussion and ignore the environment's required format entirely — so the pipeline runs in two stages, and the order matters.",
              "Reinforcement Learning kann nicht beginnen, wenn die Modellausgabe nicht zuverlässig geparst werden kann. Untrainierte Agenten verraten ihre geheimen Rollen in der öffentlichen Diskussion und ignorieren das geforderte Format der Umgebung – daher läuft die Pipeline in zwei Stufen, deren Reihenfolge entscheidend ist.",
            ),
            pick(
              "The first stage teaches shape rather than skill: a small model learns from a larger one's clean games what a correct turn looks like — reason privately, speak publicly, vote in the expected format. Only then does self-play begin, where the sole feedback is whether the game was won. Because each improved checkpoint becomes the opponent in the next round, the agents train against opposition that is improving alongside them.",
              "Die erste Stufe vermittelt Form statt Spielstärke: Ein kleines Modell lernt aus sauberen Partien eines größeren Modells, wie ein korrekter Zug aussieht – privat schlussfolgern, öffentlich sprechen und im erwarteten Format abstimmen. Erst danach beginnt Self-Play, bei dem nur Sieg oder Niederlage als Rückmeldung dient. Jeder verbesserte Checkpoint wird zum Gegner der nächsten Runde, sodass die Agenten gegen eine gleichzeitig stärker werdende Opposition trainieren.",
            ),
          ],
          image: {
            src: "/images/projects/werewolfs/reinforcement-learning-loop.webp",
            alt: pick(
              "Reinforcement learning loop from TextArena gameplay and dataset generation through LoRA policy updates to a new vLLM model checkpoint",
              "Reinforcement-Learning-Schleife von TextArena-Spiel und Datensatzerzeugung über LoRA-Policy-Updates bis zu einem neuen vLLM-Modellcheckpoint",
            ),
            caption: pick(
              "An iteration of the self-play loop.",
              "Eine Iteration der Self-Play-Schleife.",
            ),
            width: 1680,
            height: 942,
          },
        }}
        focus={pick(
          [
            "Multi-agent LLM gameplay",
            "Hidden-role reasoning",
            "Supervised fine-tuning",
            "GRPO",
            "LoRA adapters",
            "vLLM serving",
            "Self-play",
          ],
          [
            "Multi-Agenten-LLM-Spiel",
            "Schlussfolgern über verborgene Rollen",
            "Überwachtes Fine-Tuning",
            "GRPO",
            "LoRA-Adapter",
            "vLLM-Bereitstellung",
            "Self-Play",
          ],
        )}
        artifacts={[
          pick(
            "A larger model supplies clean gameplay trajectories for supervised fine-tuning of a smaller agent",
            "Ein größeres Modell liefert saubere Spielverläufe für das überwachte Fine-Tuning eines kleineren Agenten",
          ),
          pick(
            "Self-play matches turn game outcomes into reinforcement-learning signals",
            "Self-Play-Partien wandeln Spielergebnisse in Reinforcement-Learning-Signale um",
          ),
          pick(
            "GRPO training with LoRA adapters, served through vLLM, so the improved model becomes the opponent in the next round",
            "GRPO-Training mit LoRA-Adaptern und Bereitstellung über vLLM, sodass das verbesserte Modell in der nächsten Runde zum Gegner wird",
          ),
          pick(
            "A streaming Gradio interface renders all six agents, phases, actions, observations, winners, and rewards",
            "Eine streamende Gradio-Oberfläche zeigt alle sechs Agenten, Phasen, Aktionen, Beobachtungen, Gewinner und Belohnungen",
          ),
        ]}
        materialTitle={pick("Project repository", "Projekt-Repository")}
        materialBody={pick(
          "Explore the source code and project materials on GitHub.",
          "Quellcode und Projektmaterialien auf GitHub ansehen.",
        )}
        materialHref="https://github.com/fknuette/Teamproject_FSS2026"
        materialLabel={pick("Open on GitHub", "Auf GitHub öffnen")}
        materialIcon="github"
      />
    </ProjectLayout>
  );
};

export default WerewolfsProject;
