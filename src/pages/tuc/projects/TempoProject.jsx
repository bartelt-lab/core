import ProjectLayout from "../../../components/tuc/ProjectLayout";
import assetUrl from "../../../utils/assetUrl";
import { useLanguage } from "../../../i18n/useLanguage";

const TEMPO_DE = {
  "A decision point with three outcomes: the drilled move, another move from the repertoire that the session follows, and a blunder that is punished before the position rewinds":
    "Ein Entscheidungspunkt mit drei möglichen Ergebnissen: der trainierte Zug, ein anderer Zug aus dem Repertoire, dem die Sitzung folgt, oder ein Fehler, dessen Widerlegung ausgespielt wird, bevor die Stellung zurückgesetzt wird",
  "A line of positions running left to right, each step signposted by an arrow; a wrong move branches off and is blocked before it is played, guiding the player back to the line":
    "Eine von links nach rechts verlaufende Folge von Stellungen, bei der jeder Schritt durch einen Pfeil markiert ist; ein falscher Zug zweigt ab und wird vor der Ausführung blockiert, sodass die spielende Person zur Variante zurückgeführt wird",
  "The user opens TEMPO and picks a mode. Learning Mode (top row, navy frame): the user chooses the line -> a guided drill shows every next move -> a wrong move is corrected and replayed -> the line ends up learned. The learned line is saved into the repertory store and also reported to the review planner as new knowledge. Repeating Mode (bottom row, teal frame): the review planner chooses the line -> the drill runs with no arrows -> a wrong move is not corrected, the line plays out -> and then the review itself is graded (did the repetition come too late?). Both the uncorrected move and the grade update the review planner's inputs. The openings store sits between the two rows and feeds lines to both: the Openings compartment feeds Learning Mode, the Repertory compartment feeds Repeating Mode. The review planner (green panel, right) is part of Repeating Mode — that is why the teal frame is L-shaped and encloses it. Its INPUT group holds user knowledge and past picks; both feed a base model fine-tuned on that one user, which hands back the next line to repeat.":
    "Beim Öffnen von TEMPO wählst du einen Modus. Lernmodus (obere Zeile, dunkelblauer Rahmen): Der Nutzer wählt die Variante -> ein geführtes Training zeigt jeden nächsten Zug -> ein falscher Zug wird korrigiert und wiederholt -> die Variante gilt als gelernt. Die gelernte Variante wird im Repertoirespeicher abgelegt und dem Review-Planer als neues Wissen gemeldet. Wiederholmodus (untere Zeile, blaugrüner Rahmen): Der Review-Planer wählt die Variante -> das Training läuft ohne Pfeile -> ein falscher Zug bleibt unkorrigiert, die Variante wird ausgespielt -> das Review wird danach bewertet, ob es zu spät kam. Sowohl der unkorrigierte Zug als auch die Bewertung aktualisieren die Eingaben des Modells. Der Eröffnungsspeicher liegt zwischen den Zeilen und versorgt beide: Eröffnungen fließen in den Lernmodus, das Repertoire in den Wiederholmodus. Der Review-Planer (grünes Panel rechts) ist Teil des Wiederholmodus — daher umschließt der L-förmige Rahmen beides. Dessen Eingabegruppe hält Nutzerwissen und frühere Reviews; beide speisen das feinabgestimmte Basismodell, das die nächste zu wiederholende Variante liefert.",
  "LEARNING MODE": "LERNMODUS",
  "REPEATING MODE": "WIEDERHOLMODUS",
  "Pick a": "Modus",
  mode: "wählen",
  "Pick a mode": "Modus wählen",
  learn: "lernen",
  repeat: "wiederholen",
  "Choose line": "Variante wählen",
  "by user": "durch Nutzer",
  "Guided drill": "Geführtes Training",
  "arrows show next move": "Pfeile zeigen nächsten Zug",
  "Wrong move": "Falscher Zug",
  corrected: "korrigiert",
  "user replays it": "Nutzer wiederholt ihn",
  "Line learned": "Variante gelernt",
  "by review planner": "durch Review-Planer",
  "Unassisted drill": "Training ohne Hilfe",
  "no arrows": "keine Pfeile",
  uncorrected: "nicht korrigiert",
  "line plays out": "Variante ausgespielt",
  "Pick is graded": "Review bewertet",
  "did it come too late?": "kam sie zu spät?",
  Openings: "Eröffnungen",
  Repertory: "Repertoire",
  "REVIEW PLANNER": "REVIEW-PLANER",
  INPUT: "EINGABE",
  "user knowledge": "Nutzerwissen",
  "past picks": "frühere Reviews",
  "base model": "Basismodell",
  "fine-tuned on user": "auf Nutzer feinabgestimmt",
  line: "Variante",
  save: "speichern",
  update: "aktualisieren",
  "next review": "nächstes Review",
  "review line": "Review-Variante",
  "Learning Mode": "Lernmodus",
  "Repeating Mode": "Wiederholmodus",
  "Wrong move corrected": "Falscher Zug korrigiert",
  "arrows show every move": "Pfeile zeigen jeden Zug",
  "you replay it": "du wiederholst ihn",
  "the review planner chooses": "der Review-Planer wählt",
  "no hints, no arrows": "keine Hinweise, keine Pfeile",
  "What you know is updated": "Wissensstand aktualisiert",
  "every move counts": "jeder Zug zählt",
  "Review Planner": "Review-Planer",
  "your profile": "dein Profil",
  "your repertoire": "dein Repertoire",
  "what you know": "dein Wissensstand",
  "Base model,": "Basismodell,",
  "fine-tuned on you": "auf dich feinabgestimmt",
  "returns the next line": "liefert die nächste Variante",
  "an arrow shows the move to play, step by step":
    "ein Pfeil zeigt Zug für Zug, was zu spielen ist",
  "stray from it and you are guided back":
    "bei Abweichung wirst du zurückgeführt",
  "the drilled line": "die trainierte Variante",
  "you play the drilled move": "du spielst den trainierten Zug",
  "you play another move from": "anderer Repertoirezug",
  "your repertoire — followed": "die Sitzung folgt ihm",
  "you blunder — the opponent": "du patzt – der Gegner",
  "plays the punishment out": "spielt die Widerlegung aus",
  "then rewind": "danach zurücksetzen",
  "Review Planning Systems": "Review-Planungssysteme",
  Personalisation: "Personalisierung",
  "Learning from Feedback": "Lernen aus Feedback",
  Chess: "Schach",
  "You are comfortable writing Python":
    "Du fühlst dich beim Programmieren mit Python sicher",
  "You are comfortable with git and working in a shared repository":
    "Du arbeitest sicher mit Git und in einem gemeinsam genutzten Repository",
  "You enjoy working in a mixed international team, across two universities":
    "Du arbeitest gern in einem gemischten internationalen Team über zwei Universitäten hinweg",
  "Interest in machine learning helps — review planning systems, personalisation, or learning from user feedback":
    "Interesse an maschinellem Lernen ist hilfreich – etwa an Review-Planungssystemen, Personalisierung oder dem Lernen aus Nutzerfeedback",
  "Curiosity about how people learn and forget is worth as much as model experience — this is a memory model before it is a chess model":
    "Neugier darauf, wie Menschen lernen und vergessen, ist ebenso wertvoll wie Modellerfahrung – dies ist zuerst ein Gedächtnismodell und erst danach ein Schachmodell",
  "Chess knowledge is welcome for intuition, and is not required for most of the codebase":
    "Schachkenntnisse helfen bei der Intuition, sind für den Großteil des Codes aber nicht erforderlich",
  "AI Team Project": "AI-Team-Projekt",
  "Trained Engine for Memory-Paced Openings":
    "Trainiertes System für gedächtnisgesteuertes Eröffnungstraining",
  "A player's hardest question is not how to play a line — it is which of the lines they already know needs work today. TEMPO answers it with a model that ships as a base model, is fine-tuned on one player's own play, and is graded on every review it makes.":
    "Die schwierigste Frage beim Schachtraining ist nicht, wie eine Variante gespielt wird, sondern welche der bereits bekannten Varianten heute geübt werden muss. TEMPO beantwortet sie mit einem Modell, das als Basismodell bereitgestellt, auf das Spiel einer einzelnen Person feinabgestimmt und anhand jedes eigenen Reviews bewertet wird.",
  Focus: "Schwerpunkt",
  Team: "Team",
  "A mixed international team of German and Romanian students, for one semester.":
    "Ein gemischtes internationales Team aus deutschen und rumänischen Studierenden arbeitet ein Semester lang zusammen.",
  "The review planner, drawn as a robot with a graph of chess lines lit up in its chest":
    "Der Review-Planer, dargestellt als Roboter mit einem leuchtenden Graphen aus Schachvarianten in seiner Brust",
  "The problem": "Das Problem",
  "Deciding what to study is the hardest part of studying alone":
    "Allein zu entscheiden, was als Nächstes geübt werden soll, ist der schwierigste Teil",
  "Existing trainers answer that question with a fixed rule — the same rule for every user, for the life of the product. It cannot know that you hold a sharp tactical line for weeks and lose a quiet positional one in days.":
    "Bestehende Trainer beantworten diese Frage mit einer festen Regel – derselben Regel für alle Nutzenden und über die gesamte Lebensdauer des Produkts. Sie können nicht wissen, dass du dir eine scharfe taktische Variante wochenlang merkst, eine ruhige positionelle aber schon nach wenigen Tagen vergisst.",
  "Other systems": "Andere Systeme",
  "One scheduling rule, identical for every player, fixed forever":
    "Eine Planungsregel, für alle Spielenden gleich und dauerhaft unverändert",
  "A model fine-tuned on your play, graded on its own decisions and user performance":
    "Ein auf dein Spiel feinabgestimmtes Modell, bewertet anhand seiner eigenen Entscheidungen und deiner Leistung",
  "Two modes": "Zwei Modi",
  "Learn it with help, then prove it without":
    "Mit Hilfe lernen und anschließend ohne Hilfe beweisen",
  "You pick the line you want to learn, and it is walked through under full guidance — an arrow on the board shows the move to play. Stray from it and you are guided back before the move can land.":
    "Du wählst die Variante, die du lernen möchtest, und spielst sie mit vollständiger Unterstützung durch. Ein Pfeil auf dem Brett zeigt den nächsten Zug. Weichst du davon ab, wirst du zurückgeführt, bevor der falsche Zug ausgeführt wird.",
  "The line is the model's call, not yours. No hints. No arrows. Blunder, and nothing stops you — the opponent plays out the punishment on the board, you watch the piece go, and only then does the position rewind.":
    "Die Variante wird vom Modell ausgewählt, nicht von dir. Keine Hinweise, keine Pfeile. Bei einem Fehler greift nichts ein: Der Gegner spielt die Widerlegung auf dem Brett aus, du siehst die Konsequenz und erst danach wird die Stellung zurückgesetzt.",
  "Everything is logged": "Alles wird protokolliert",
  "Every move attempt and every review — including which branch the player took, and every position a punishment sequence passed through. That log is what the model learns from, and what the project's results are measured on.":
    "Jeder Zugversuch und jedes Review wird protokolliert – einschließlich des gewählten Variantenasts und jeder Stellung, die während einer Widerlegungssequenz durchlaufen wird. Aus diesem Protokoll lernt das Modell, und daran werden die Projektergebnisse gemessen.",
  "The loop": "Der Kreislauf",
  "One session, from the first move to the next review":
    "Eine Sitzung vom ersten Zug bis zum nächsten Review",
  "Both modes write to the same record of what you know. The review planner — your repertoire, that record, its own past picks, and the model fine-tuned on all of it — reads what comes out and returns the line to repeat next.":
    "Beide Modi schreiben in denselben Wissensstand. Der Review-Planer liest dein Repertoire, diesen Wissensstand, seine früheren Reviews sowie das darauf feinabgestimmte Modell und liefert die Variante, die als Nächstes wiederholt werden soll.",
  "How it works": "Funktionsweise",
  "The review planner is graded on its own decisions":
    "Der Review-Planer wird anhand seiner eigenen Entscheidungen bewertet",
  "Which lines get learned is the player's own choice. The model's job starts afterwards: it reads their profile, their repertoire, the record of every line they have drilled so far and its own earlier suggestions, and returns the one line that should be repeated next.":
    "Welche Varianten gelernt werden, entscheidet die spielende Person selbst. Die Aufgabe des Modells beginnt danach: Es liest ihr Profil, ihr Repertoire, den Lernstand jeder bisher trainierten Variante und seine eigenen früheren Vorschläge und liefert die eine Variante, die als Nächstes wiederholt werden sollte.",
  "The suggestion is then measured against what actually happened in the session — what was recalled, what was missed, and how long it took the player to find the right move. That measurement is what the model is trained on next, so over time it builds a picture of one specific player's memory.":
    "Das Review wird anschließend daran gemessen, was in der Sitzung tatsächlich geschah: was erinnert, was vergessen und wie schnell der richtige Zug gefunden wurde. Mit dieser Bewertung wird das Modell weitertrainiert, sodass mit der Zeit ein Bild vom Gedächtnis einer bestimmten Person entsteht.",
  "A line the player has already forgotten is recorded as having arrived too late. That grade becomes training data, which is what separates the review planner from a scheduler that is never told whether it was right.":
    "Eine Variante, die bereits vergessen wurde, gilt als zu spät wiederholt. Diese Bewertung wird zu Trainingsdaten. Genau das unterscheidet den Review-Planer von einer Planung, die nie erfährt, ob ihre Entscheidung richtig war.",
  Scope: "Übertragbarkeit",
  "The model reasons about learning, not about chess":
    "Das Modell denkt über Lernen nach, nicht über Schach",
  "The review planner solves a general problem: given a learner, a set of things they are trying to learn, and a history of how their practice went, decide what they should practise next. Its inputs and outputs are kept in a form that does not assume the material is chess.":
    "Der Review-Planer löst ein allgemeines Problem: Für eine lernende Person, eine Menge von Lerninhalten und den bisherigen Übungsverlauf entscheidet er, was als Nächstes geübt werden sollte. Ein- und Ausgaben sind so gestaltet, dass sie nicht voraussetzen, dass der Lernstoff Schach ist.",
  "Chess is where it is built and measured first. The domain supplies dense, cheap, objectively gradable outcomes — a move either is the repertoire move or it is not — which makes it a good place to find out whether the approach works at all.":
    "Schach ist die erste Domäne, in der das Modell entwickelt und gemessen wird. Sie liefert viele kostengünstige und objektiv bewertbare Ergebnisse – ein Zug gehört entweder zum Repertoire oder nicht. Damit eignet sie sich gut, um grundsätzlich zu prüfen, ob der Ansatz funktioniert.",
  "What goes in": "Eingaben",
  "A learner, the things they are learning, and how practice has gone so far":
    "Eine lernende Person, ihre Lerninhalte und der bisherige Übungsverlauf",
  "The model": "Das Modell",
  "Decides what to revisit next — and is graded on that decision":
    "Entscheidet, was als Nächstes wiederholt wird, und wird daran bewertet",
  "What comes out": "Ausgabe",
  "The one item the learner should revisit next":
    "Der eine Lerninhalt, der als Nächstes wiederholt werden sollte",
  "Nothing in that exchange is chess-specific. Everything that is lives behind the domain layer.":
    "An diesem Austausch ist nichts schachspezifisch. Alles Schachspezifische bleibt hinter der Domänenschicht.",
  "For students": "Für Studierende",
  "Thinking about joining?": "Möchtest du mitmachen?",
  "What you walk away with": "Was du aus dem Projekt mitnimmst",
  "The experience of carrying a genuine research question all the way to a working system and of doing it in a mixed team across two universities and one shared repository.":
    "Die Erfahrung, eine echte Forschungsfrage bis zu einem funktionierenden System zu führen – in einem gemischten Team über zwei Universitäten und ein gemeinsames Repository hinweg.",
};

// What Learning Mode does: the drilled line runs straight through under full
// guidance, and a wrong move is intercepted before it lands rather than punished.
const LearningDiagram = ({ t }) => (
  <svg
    viewBox="0 0 445 200"
    className="h-auto w-full"
    role="img"
    aria-label={t(
      "A line of positions running left to right, each step signposted by an arrow; a wrong move branches off and is blocked before it is played, guiding the player back to the line",
    )}
  >
    <path
      d="M40 70 H380"
      className="stroke-primary-500"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M200 70 L300 150"
      className="stroke-slate-300"
      strokeWidth="2"
      strokeDasharray="5 5"
      fill="none"
    />

    <g className="fill-primary-500">
      <circle cx="40" cy="70" r="6" />
      <circle cx="120" cy="70" r="6" />
      <circle cx="300" cy="70" r="6" />
      <circle cx="380" cy="70" r="6" />
      <circle cx="200" cy="70" r="9" />
    </g>
    <circle
      cx="300"
      cy="150"
      r="6"
      className="fill-white stroke-slate-300"
      strokeWidth="2"
    />

    <g>
      <circle
        cx="250"
        cy="110"
        r="13"
        className="fill-white stroke-slate-300"
        strokeWidth="2"
      />
      <path
        d="M245 105 L255 115 M255 105 L245 115"
        className="stroke-slate-400"
        strokeWidth="2"
      />
    </g>

    <text x="40" y="46" className="fill-slate-500 text-[14px] font-semibold">
      {t("an arrow shows the move to play, step by step")}
    </text>
    <text x="152" y="186" className="fill-slate-500 text-[14px] font-semibold">
      {t("stray from it and you are guided back")}
    </text>
  </svg>
);

// What Repeating Mode does at a decision: three things can happen, and only one
// of them ends the session where it started.
const RepeatingDiagram = ({ t }) => (
  <svg
    viewBox="0 0 480 262"
    className="h-auto w-full"
    role="img"
    aria-label={t(
      "A decision point with three outcomes: the drilled move, another move from the repertoire that the session follows, and a blunder that is punished before the position rewinds",
    )}
  >
    <defs>
      <marker
        id="tempo-rewind"
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M0 0 L10 5 L0 10 z" className="fill-slate-500" />
      </marker>
    </defs>

    <path
      d="M30 130 H110"
      className="stroke-slate-600"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M110 130 L250 60"
      className="stroke-primary-400"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M110 130 H250"
      className="stroke-primary-400"
      strokeWidth="2"
      strokeDasharray="6 4"
      fill="none"
    />
    <path
      d="M110 130 L250 205"
      className="stroke-amber-400"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M250 214 C 212 258, 132 232, 108 143"
      className="stroke-slate-500"
      strokeWidth="1.5"
      strokeDasharray="4 4"
      fill="none"
      markerEnd="url(#tempo-rewind)"
    />

    <circle cx="30" cy="130" r="5" className="fill-slate-600" />
    <circle cx="110" cy="130" r="9" className="fill-white" />
    <circle cx="250" cy="60" r="6" className="fill-primary-400" />
    <circle cx="250" cy="130" r="6" className="fill-primary-400" />
    <circle cx="250" cy="205" r="6" className="fill-amber-400" />

    <text x="18" y="104" className="fill-slate-500 text-[14px] font-semibold">
      {t("the drilled line")}
    </text>
    <text x="264" y="64" className="fill-slate-300 text-[14px] font-semibold">
      {t("you play the drilled move")}
    </text>
    <text x="264" y="126" className="fill-slate-300 text-[14px] font-semibold">
      {t("you play another move from")}
    </text>
    <text x="264" y="142" className="fill-slate-300 text-[14px] font-semibold">
      {t("your repertoire — followed")}
    </text>
    <text x="264" y="201" className="fill-slate-300 text-[14px] font-semibold">
      {t("you blunder — the opponent")}
    </text>
    <text x="264" y="217" className="fill-slate-300 text-[14px] font-semibold">
      {t("plays the punishment out")}
    </text>
    <text
      x="176"
      y="256"
      textAnchor="middle"
      className="fill-slate-500 text-[14px] font-semibold"
    >
      {t("then rewind")}
    </text>
  </svg>
);

// Database cylinder icon for the Openings/Repertory compartments
const DatabaseCylinder = ({ x, y }) => (
  <g
    transform={`translate(${x}, ${y})`}
    stroke="#0f172a"
    strokeWidth="2.5"
    fill="none"
  >
    <ellipse cx="15" cy="6" rx="15" ry="6" />
    <line x1="0" y1="6" x2="0" y2="36" />
    <line x1="30" y1="6" x2="30" y2="36" />
    <path d="M 0 36 A 15 6 0 0 0 30 36" />
    <path d="M 0 16 A 15 6 0 0 0 30 16" />
    <path d="M 0 26 A 15 6 0 0 0 30 26" />
  </g>
);

// Step box for Learning and Repeating modes
const StepBox = ({
  x,
  y,
  w,
  h = 130,
  title,
  titleLines,
  sub,
  variant = "learning",
}) => {
  const isLearning = variant === "learning";
  const fill = isLearning ? "#f8fafc" : "#f0fdfa";
  const stroke = isLearning ? "#cbd5e1" : "#99f6e4";
  const titleColor = isLearning ? "#0f172a" : "#115e59";
  const subColor = isLearning ? "#64748b" : "#0d9488";
  const cx = x + w / 2;

  const fontHeading = "Montserrat, Poppins, sans-serif";
  const fontBody = "Inter, sans-serif";

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="14"
        fill={fill}
        stroke={stroke}
        strokeWidth="2.5"
      />
      {titleLines ? (
        <>
          <text
            x={cx}
            y={y + 42}
            textAnchor="middle"
            fill={titleColor}
            style={{
              fontFamily: fontHeading,
              fontWeight: 700,
              fontSize: 24,
            }}
          >
            {titleLines[0]}
          </text>
          <text
            x={cx}
            y={y + 68}
            textAnchor="middle"
            fill={titleColor}
            style={{
              fontFamily: fontHeading,
              fontWeight: 700,
              fontSize: 24,
            }}
          >
            {titleLines[1]}
          </text>
          {sub ? (
            <text
              x={cx}
              y={y + 102}
              textAnchor="middle"
              fill={subColor}
              style={{
                fontFamily: fontBody,
                fontWeight: 400,
                fontSize: 21,
              }}
            >
              {sub}
            </text>
          ) : null}
        </>
      ) : sub ? (
        <>
          <text
            x={cx}
            y={y + 57}
            textAnchor="middle"
            fill={titleColor}
            style={{
              fontFamily: fontHeading,
              fontWeight: 700,
              fontSize: 25,
            }}
          >
            {title}
          </text>
          <text
            x={cx}
            y={y + 96}
            textAnchor="middle"
            fill={subColor}
            style={{
              fontFamily: fontBody,
              fontWeight: 400,
              fontSize: 22,
            }}
          >
            {sub}
          </text>
        </>
      ) : (
        <text
          x={cx}
          y={y + h / 2 + 9}
          textAnchor="middle"
          fill={titleColor}
          style={{
            fontFamily: fontHeading,
            fontWeight: 700,
            fontSize: 26,
          }}
        >
          {title}
        </text>
      )}
    </g>
  );
};

// One session end to end, read left to right: the player picks a mode, each
// branch drills, and both write into the review planner on the right — which
// returns the next line to repeat.
const FlowDiagram = ({ t }) => (
  <svg
    viewBox="-45 0 1790 780"
    className="h-auto w-full overflow-visible"
    role="img"
    aria-label={t(
      "The user opens TEMPO and picks a mode. Learning Mode (top row, navy frame): the user chooses the line -> a guided drill shows every next move -> a wrong move is corrected and replayed -> the line ends up learned. The learned line is saved into the repertory store and also reported to the review planner as new knowledge. Repeating Mode (bottom row, teal frame): the review planner chooses the line -> the drill runs with no arrows -> a wrong move is not corrected, the line plays out -> and then the review itself is graded (did the repetition come too late?). Both the uncorrected move and the grade update the review planner's inputs. The openings store sits between the two rows and feeds lines to both: the Openings compartment feeds Learning Mode, the Repertory compartment feeds Repeating Mode. The review planner (green panel, right) is part of Repeating Mode — that is why the teal frame is L-shaped and encloses it. Its INPUT group holds user knowledge and past picks; both feed a base model fine-tuned on that one user, which hands back the next line to repeat.",
    )}
  >
    <defs>
      <marker
        id="tempo-arrow-slate"
        viewBox="0 0 21 17"
        refX="21"
        refY="8.5"
        markerWidth="21"
        markerHeight="17"
        markerUnits="userSpaceOnUse"
        orient="auto"
      >
        <polygon points="0 1, 21 8.5, 0 16" fill="#64748b" />
      </marker>
      <marker
        id="tempo-arrow-teal"
        viewBox="0 0 21 17"
        refX="21"
        refY="8.5"
        markerWidth="21"
        markerHeight="17"
        markerUnits="userSpaceOnUse"
        orient="auto"
      >
        <polygon points="0 1, 21 8.5, 0 16" fill="#0f766e" />
      </marker>
      <marker
        id="tempo-arrow-green"
        viewBox="0 0 21 17"
        refX="21"
        refY="8.5"
        markerWidth="21"
        markerHeight="17"
        markerUnits="userSpaceOnUse"
        orient="auto"
      >
        <polygon points="0 1, 21 8.5, 0 16" fill="#009020" />
      </marker>
    </defs>

    {/* Frames */}
    {/* Learning Mode frame */}
    <rect
      x="165"
      y="40"
      width="1186"
      height="296"
      rx="22"
      fill="none"
      stroke="#334155"
      strokeWidth="3"
    />
    <text
      x="758"
      y="78"
      textAnchor="middle"
      fill="#334155"
      style={{
        fontFamily: "Montserrat, Poppins, sans-serif",
        fontWeight: 800,
        fontSize: 30,
        letterSpacing: "0.14em",
      }}
    >
      {t("LEARNING MODE")}
    </text>

    {/* Repeating Mode L-shaped frame */}
    <path
      d="M187 445 H1378 A22 22 0 0 0 1400 423 V130 A22 22 0 0 1 1422 108 H1710 A22 22 0 0 1 1732 130 V678 A22 22 0 0 1 1710 700 H187 A22 22 0 0 1 165 678 V467 A22 22 0 0 1 187 445 Z"
      fill="none"
      stroke="#0f766e"
      strokeWidth="3"
    />
    <text
      x="758"
      y="483"
      textAnchor="middle"
      fill="#0f766e"
      style={{
        fontFamily: "Montserrat, Poppins, sans-serif",
        fontWeight: 800,
        fontSize: 30,
        letterSpacing: "0.14em",
      }}
    >
      {t("REPEATING MODE")}
    </text>

    {/* Mode Picker Diamond */}
    <g transform="translate(45, 360)">
      <rect
        x="-55"
        y="-55"
        width="110"
        height="110"
        rx="10"
        transform="rotate(45)"
        fill="#0f172a"
        stroke="#334155"
        strokeWidth="2.5"
      />
      <text
        x="0"
        y="-4"
        textAnchor="middle"
        fill="#ffffff"
        style={{
          fontFamily: "Montserrat, Poppins, sans-serif",
          fontWeight: 700,
          fontSize: 22,
        }}
      >
        {t("Pick a")}
      </text>
      <text
        x="0"
        y="22"
        textAnchor="middle"
        fill="#ffffff"
        style={{
          fontFamily: "Montserrat, Poppins, sans-serif",
          fontWeight: 700,
          fontSize: 22,
        }}
      >
        {t("mode")}
      </text>
    </g>

    {/* Store */}
    <rect
      x="200"
      y="282"
      width="250"
      height="213"
      rx="16"
      fill="#ffffff"
      stroke="#0f172a"
      strokeWidth="2.5"
    />
    {/* Openings compartment */}
    <rect
      x="216"
      y="298"
      width="218"
      height="84"
      rx="11"
      fill="#f8fafc"
      stroke="#cbd5e1"
      strokeWidth="2"
    />
    <DatabaseCylinder x={232} y={319} />
    <text
      x="274"
      y="348"
      fill="#0f172a"
      style={{
        fontFamily: "Montserrat, Poppins, sans-serif",
        fontWeight: 700,
        fontSize: 25,
      }}
    >
      {t("Openings")}
    </text>

    {/* Repertory compartment */}
    <rect
      x="216"
      y="394"
      width="218"
      height="84"
      rx="11"
      fill="#f8fafc"
      stroke="#cbd5e1"
      strokeWidth="2"
    />
    <DatabaseCylinder x={232} y={415} />
    <text
      x="274"
      y="444"
      fill="#0f172a"
      style={{
        fontFamily: "Montserrat, Poppins, sans-serif",
        fontWeight: 700,
        fontSize: 25,
      }}
    >
      {t("Repertory")}
    </text>

    {/* Review Planner panel */}
    <rect
      x="1415"
      y="118"
      width="305"
      height="572"
      rx="20"
      fill="#ffffff"
      stroke="#009020"
      strokeWidth="3"
    />
    <text
      x="1436"
      y="160"
      fill="#009020"
      style={{
        fontFamily: "Montserrat, Poppins, sans-serif",
        fontWeight: 800,
        fontSize: 24,
        letterSpacing: "0.04em",
      }}
    >
      {t("REVIEW PLANNER")}
    </text>

    {/* INPUT group */}
    <rect
      x="1430"
      y="217"
      width="281"
      height="172"
      rx="14"
      fill="#ECFDF1"
      stroke="#9CD8A9"
      strokeWidth="2"
    />
    <text
      x="1448"
      y="246"
      fill="#0B5A22"
      style={{
        fontFamily: "Montserrat, Poppins, sans-serif",
        fontWeight: 800,
        fontSize: 22,
        letterSpacing: "0.12em",
      }}
    >
      {t("INPUT")}
    </text>

    {/* User knowledge item */}
    <rect
      x="1480"
      y="259"
      width="207"
      height="54"
      rx="10"
      fill="#ffffff"
      stroke="#9CD8A9"
      strokeWidth="2"
    />
    <text
      x="1583.5"
      y="294"
      textAnchor="middle"
      fill="#0B5A22"
      style={{
        fontFamily: "Inter, sans-serif",
        fontWeight: 600,
        fontSize: 22,
      }}
    >
      {t("user knowledge")}
    </text>

    {/* Past picks item */}
    <rect
      x="1480"
      y="321"
      width="207"
      height="54"
      rx="10"
      fill="#ffffff"
      stroke="#9CD8A9"
      strokeWidth="2"
    />
    <text
      x="1583.5"
      y="356"
      textAnchor="middle"
      fill="#0B5A22"
      style={{
        fontFamily: "Inter, sans-serif",
        fontWeight: 600,
        fontSize: 22,
      }}
    >
      {t("past picks")}
    </text>

    {/* Base model box */}
    <rect
      x="1429"
      y="510"
      width="283"
      height="144"
      rx="14"
      fill="#ECFDF1"
      stroke="#009020"
      strokeWidth="2.5"
    />
    <text
      x="1570.5"
      y="566"
      textAnchor="middle"
      fill="#0B5A22"
      style={{
        fontFamily: "Montserrat, Poppins, sans-serif",
        fontWeight: 700,
        fontSize: 26,
      }}
    >
      {t("base model")}
    </text>
    <text
      x="1570.5"
      y="606"
      textAnchor="middle"
      fill="#2F6B3F"
      style={{
        fontFamily: "Inter, sans-serif",
        fontWeight: 400,
        fontSize: 23,
      }}
    >
      {t("fine-tuned on user")}
    </text>

    {/* Learning row steps */}
    <StepBox
      x={190}
      y={112}
      w={235}
      title={t("Choose line")}
      sub={t("by user")}
      variant="learning"
    />
    <StepBox
      x={470}
      y={112}
      w={270}
      title={t("Guided drill")}
      sub={t("arrows show next move")}
      variant="learning"
    />
    <StepBox
      x={785}
      y={112}
      w={265}
      titleLines={[t("Wrong move"), t("corrected")]}
      sub={t("user replays it")}
      variant="learning"
    />
    <StepBox
      x={1090}
      y={112}
      w={230}
      title={t("Line learned")}
      variant="learning"
    />

    {/* Repeating row steps */}
    <StepBox
      x={190}
      y={530}
      w={235}
      title={t("Choose line")}
      sub={t("by review planner")}
      variant="repeating"
    />
    <StepBox
      x={470}
      y={530}
      w={270}
      title={t("Unassisted drill")}
      sub={t("no arrows")}
      variant="repeating"
    />
    <StepBox
      x={785}
      y={530}
      w={265}
      titleLines={[t("Wrong move"), t("uncorrected")]}
      sub={t("line plays out")}
      variant="repeating"
    />
    <StepBox
      x={1090}
      y={530}
      w={230}
      title={t("Pick is graded")}
      sub={t("did it come too late?")}
      variant="repeating"
    />

    {/* Connectors (Edges) - rendered in front of boxes so all arrowheads are visible */}
    {/* Learning Mode Edges (Slate) */}
    <g
      stroke="#64748b"
      strokeWidth="3"
      fill="none"
      markerEnd="url(#tempo-arrow-slate)"
    >
      {/* 1. pick_mode -> learn_choose */}
      <polyline points="122,360 130,360 130,177 158,177" />
      {/* 3. learn_step_1: learn_choose -> learn_drill */}
      <polyline points="425,177 470,177" />
      {/* 4. learn_step_2: learn_drill -> learn_wrong */}
      <polyline points="740,177 785,177" />
      {/* 5. learn_step_3: learn_wrong -> learn_done */}
      <polyline points="1050,177 1090,177" />
      {/* 9. openings -> learn_choose */}
      <polyline points="360,296 360,242" />
      {/* 11. save: learn_done -> repertory */}
      <polyline points="1205,242 1205,366 465,366 465,436 434,436" />
      {/* 12. learned_update: learn_done -> user_knowledge */}
      <polyline points="1320,177 1345,177 1345,270 1480,270" />
    </g>

    {/* Repeating Mode Edges (Deep Teal) */}
    <g
      stroke="#0f766e"
      strokeWidth="3"
      fill="none"
      markerEnd="url(#tempo-arrow-teal)"
    >
      {/* 2. pick_mode -> rep_choose */}
      <polyline points="122,360 130,360 130,595 158,595" />
      {/* 6. rep_step_1: rep_choose -> rep_drill */}
      <polyline points="425,595 470,595" />
      {/* 7. rep_step_2: rep_drill -> rep_wrong */}
      <polyline points="740,595 785,595" />
      {/* 8. rep_step_3: rep_wrong -> rep_graded */}
      <polyline points="1050,595 1090,595" />
      {/* 10. repertory -> rep_choose */}
      <polyline points="300,481 300,530" />
      {/* 13. uncorrected_update: rep_wrong -> user_knowledge */}
      <polyline points="1030,530 1030,430 1370,430 1370,296 1480,296" />
      {/* 14. graded_update: rep_graded -> past_picks */}
      <polyline points="1320,595 1388,595 1388,345 1480,345" />
    </g>

    {/* Review Planner Edges (Green) */}
    <g
      stroke="#009020"
      strokeWidth="3"
      fill="none"
      markerEnd="url(#tempo-arrow-green)"
    >
      {/* 15. input_to_model: input_group -> base_model */}
      <polyline points="1567,390 1567,510" />
      {/* 16. review: base_model -> rep_choose */}
      <polyline points="1567,651 1567,726 350,726 350,660" />
    </g>

    {/* Edge Labels */}
    <g style={{ fontFamily: "Inter, sans-serif" }}>
      {/* learn label */}
      <text
        x="115"
        y="260"
        textAnchor="end"
        fill="#334155"
        style={{ fontWeight: 600, fontSize: 24 }}
      >
        {t("learn")}
      </text>

      {/* repeat label */}
      <text
        x="115"
        y="506"
        textAnchor="end"
        fill="#0f766e"
        style={{ fontWeight: 600, fontSize: 24 }}
      >
        {t("repeat")}
      </text>

      {/* line label (openings -> learn_choose) */}
      <text
        x="372"
        y="270"
        textAnchor="start"
        fill="#64748b"
        style={{ fontWeight: 400, fontSize: 24 }}
      >
        {t("line")}
      </text>

      {/* line label (repertory -> rep_choose) */}
      <text
        x="316"
        y="518"
        textAnchor="start"
        fill="#0f766e"
        style={{ fontWeight: 400, fontSize: 24 }}
      >
        {t("line")}
      </text>

      {/* save label */}
      <text
        x="1195"
        y="290"
        textAnchor="end"
        fill="#64748b"
        style={{ fontWeight: 400, fontSize: 24 }}
      >
        {t("save")}
      </text>

      {/* learned_update label */}
      <text
        x="1250"
        y="270"
        textAnchor="start"
        fill="#64748b"
        style={{ fontWeight: 400, fontSize: 24 }}
      >
        {t("update")}
      </text>

      {/* uncorrected_update label */}
      <text
        x="1040"
        y="420"
        textAnchor="start"
        fill="#0f766e"
        style={{ fontWeight: 400, fontSize: 24 }}
      >
        {t("update")}
      </text>

      {/* graded_update label */}
      <text
        x="1328"
        y="622"
        textAnchor="start"
        fill="#0f766e"
        style={{ fontWeight: 400, fontSize: 24 }}
      >
        {t("update")}
      </text>

      {/* next review label */}
      <text
        x="1040"
        y="758"
        textAnchor="start"
        fill="#009020"
        style={{ fontWeight: 600, fontSize: 24 }}
      >
        {t("next review")}
      </text>
    </g>
  </svg>
);

const Eyebrow = ({ children }) => (
  <p className="text-xs font-black uppercase tracking-widest text-primary-600">
    {children}
  </p>
);

// The diagrams are drawn on wide viewBoxes, so on a phone a plain w-full SVG
// scales their labels down past the point of being readable. Below the floor
// width the diagram keeps its own size and the strip scrolls sideways instead.
// widthClass must carry its own sm: reset so the diagram goes back to fitting.
const DiagramScroller = ({ widthClass, children }) => (
  <div className="-mx-4 min-w-0 overflow-x-auto px-4 sm:mx-0 sm:overflow-x-visible sm:px-0">
    <div className={widthClass}>{children}</div>
  </div>
);

const TempoProject = () => {
  const { pick } = useLanguage();
  const t = (en) => pick(en, TEMPO_DE[en]);

  const tags = [
    t("Review Planning Systems"),
    t("Personalisation"),
    t("Learning from Feedback"),
    t("Chess"),
  ];

  const joining = [
    t("You are comfortable writing Python"),
    t("You are comfortable with git and working in a shared repository"),
    t(
      "You enjoy working in a mixed international team, across two universities",
    ),
    t(
      "Interest in machine learning helps — review planning systems, personalisation, or learning from user feedback",
    ),
    t(
      "Curiosity about how people learn and forget is worth as much as model experience — this is a memory model before it is a chess model",
    ),
    t(
      "Chess knowledge is welcome for intuition, and is not required for most of the codebase",
    ),
  ];

  return (
    <ProjectLayout
      showHero={false}
      showHeroOverview={false}
      showEvalSection={false}
      compact
      softBackground
    >
      <div className="space-y-16">
        {/* Hero */}
        <section className="grid gap-10 lg:grid-cols-[1fr_15rem] lg:gap-14">
          <div>
            <Eyebrow>{t("AI Team Project")}</Eyebrow>
            <h1 className="mt-4 text-5xl font-black leading-[0.95] tracking-tight text-slate-950 md:text-7xl">
              TEMPO
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-light leading-relaxed text-slate-500">
              {t("Trained Engine for Memory-Paced Openings")}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600">
              {t(
                "A player's hardest question is not how to play a line — it is which of the lines they already know needs work today. TEMPO answers it with a model that ships as a base model, is fine-tuned on one player's own play, and is graded on every review it makes.",
              )}
            </p>

            <p className="mt-7 text-[10px] font-black uppercase tracking-widest text-slate-400">
              {t("Focus")}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-primary-100 bg-primary-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-700"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:border-l lg:border-slate-200 lg:pl-8 lg:pt-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {t("Team")}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {t(
                "A mixed international team of German and Romanian students, for one semester.",
              )}
            </p>

            <img
              src={assetUrl("/images/projects/tempo/recommender-robot.webp")}
              alt={t(
                "The review planner, drawn as a robot with a graph of chess lines lit up in its chest",
              )}
              width={700}
              height={865}
              decoding="async"
              className="mt-8 h-auto w-48 lg:w-full lg:max-w-[15rem]"
            />
          </div>
        </section>

        {/* The problem */}
        <section className="grid gap-8 border-t border-slate-100 pt-12 md:grid-cols-[0.8fr_1fr] md:gap-10">
          <div className="md:order-2 md:text-right">
            <Eyebrow>{t("The problem")}</Eyebrow>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950">
              {t(
                "Deciding what to study is the hardest part of studying alone",
              )}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              {t(
                "Existing trainers answer that question with a fixed rule — the same rule for every user, for the life of the product. It cannot know that you hold a sharp tactical line for weeks and lose a quiet positional one in days.",
              )}
            </p>
          </div>

          <div className="grid gap-3 self-center md:order-1">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                {t("Other systems")}
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                {t(
                  "One scheduling rule, identical for every player, fixed forever",
                )}
              </p>
            </div>
            <div className="rounded-xl border border-primary-200 bg-primary-50 p-4">
              <p className="text-xs font-black uppercase tracking-widest text-primary-600">
                TEMPO
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-primary-900">
                {t(
                  "A model fine-tuned on your play, graded on its own decisions and user performance",
                )}
              </p>
            </div>
          </div>
        </section>

        {/* The two modes */}
        <section>
          <Eyebrow>{t("Two modes")}</Eyebrow>
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950">
            {t("Learn it with help, then prove it without")}
          </h2>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100/80">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-black uppercase tracking-widest text-primary-700">
                  {t("Learning Mode")}
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {t(
                  "You pick the line you want to learn, and it is walked through under full guidance — an arrow on the board shows the move to play. Stray from it and you are guided back before the move can land.",
                )}
              </p>
              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <DiagramScroller widthClass="min-w-[360px] sm:min-w-0">
                  <LearningDiagram t={t} />
                </DiagramScroller>
              </div>
            </div>

            <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-950 p-6 text-white shadow-xl">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-primary-300">
                  {t("Repeating Mode")}
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {t(
                  "The line is the model's call, not yours. No hints. No arrows. Blunder, and nothing stops you — the opponent plays out the punishment on the board, you watch the piece go, and only then does the position rewind.",
                )}
              </p>
              <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
                <DiagramScroller widthClass="min-w-[390px] sm:min-w-0">
                  <RepeatingDiagram t={t} />
                </DiagramScroller>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-black uppercase tracking-widest text-slate-500">
              {t("Everything is logged")}
            </p>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
              {t(
                "Every move attempt and every review — including which branch the player took, and every position a punishment sequence passed through. That log is what the model learns from, and what the project's results are measured on.",
              )}
            </p>
          </div>
        </section>

        {/* One session, end to end */}
        <section>
          <Eyebrow>{t("The loop")}</Eyebrow>
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950">
            {t("One session, from the first move to the next review")}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            {t(
              "Both modes write to the same record of what you know. The review planner — your repertoire, that record, its own past picks, and the model fine-tuned on all of it — reads what comes out and returns the line to repeat next.",
            )}
          </p>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-5 sm:px-6 sm:py-8">
            <DiagramScroller widthClass="min-w-[900px] sm:min-w-0">
              <FlowDiagram t={t} />
            </DiagramScroller>
          </div>
        </section>

        {/* How the review planner learns */}
        <section>
          <Eyebrow>{t("How it works")}</Eyebrow>
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950">
            {t("The review planner is graded on its own decisions")}
          </h2>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100/80 sm:p-8">
            <div className="grid gap-x-8 gap-y-3 lg:grid-cols-2">
              <p className="text-sm leading-7 text-slate-600">
                {t(
                  "Which lines get learned is the player's own choice. The model's job starts afterwards: it reads their profile, their repertoire, the record of every line they have drilled so far and its own earlier suggestions, and returns the one line that should be repeated next.",
                )}
              </p>
              <p className="text-sm leading-7 text-slate-600">
                {t(
                  "The suggestion is then measured against what actually happened in the session — what was recalled, what was missed, and how long it took the player to find the right move. That measurement is what the model is trained on next, so over time it builds a picture of one specific player's memory.",
                )}
              </p>
            </div>
            <p className="mt-6 border-l-2 border-primary-300 pl-3 text-sm leading-6 text-slate-700">
              {t(
                "A line the player has already forgotten is recorded as having arrived too late. That grade becomes training data, which is what separates the review planner from a scheduler that is never told whether it was right.",
              )}
            </p>
          </div>
        </section>

        {/* Domain independence */}
        <section className="grid gap-8 border-t border-slate-100 pt-12 md:grid-cols-[0.8fr_1fr] md:gap-10">
          <div className="md:order-2 md:text-right">
            <Eyebrow>{t("Scope")}</Eyebrow>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950">
              {t("The model reasons about learning, not about chess")}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              {t(
                "The review planner solves a general problem: given a learner, a set of things they are trying to learn, and a history of how their practice went, decide what they should practise next. Its inputs and outputs are kept in a form that does not assume the material is chess.",
              )}
            </p>
            <p className="mt-4 text-base leading-7 text-slate-600">
              {t(
                "Chess is where it is built and measured first. The domain supplies dense, cheap, objectively gradable outcomes — a move either is the repertoire move or it is not — which makes it a good place to find out whether the approach works at all.",
              )}
            </p>
          </div>

          {/* In, model, out — stacked, with the model as the emphasised middle
              band. Nothing in the exchange is chess-specific. */}
          <div className="grid gap-3 self-center md:order-1">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                {t("What goes in")}
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                {t(
                  "A learner, the things they are learning, and how practice has gone so far",
                )}
              </p>
            </div>
            <div className="rounded-xl border border-primary-300 bg-primary-50 p-4">
              <p className="text-xs font-black uppercase tracking-widest text-primary-600">
                {t("The model")}
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-primary-900">
                {t(
                  "Decides what to revisit next — and is graded on that decision",
                )}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                {t("What comes out")}
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                {t("The one item the learner should revisit next")}
              </p>
            </div>
            <p className="px-1 text-xs leading-5 text-slate-500">
              {t(
                "Nothing in that exchange is chess-specific. Everything that is lives behind the domain layer.",
              )}
            </p>
          </div>
        </section>

        {/* For students */}
        <section>
          <Eyebrow>{t("For students")}</Eyebrow>
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950">
            {t("Thinking about joining?")}
          </h2>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-100/80 sm:p-10">
            <ul className="grid gap-3 md:grid-cols-2 md:gap-x-10">
              {joining.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-6 text-slate-600"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-xl border border-primary-200 bg-primary-50 p-5 sm:p-6">
              <p className="text-xs font-black uppercase tracking-widest text-primary-600">
                {t("What you walk away with")}
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-primary-900">
                {t(
                  "The experience of carrying a genuine research question all the way to a working system and of doing it in a mixed team across two universities and one shared repository.",
                )}
              </p>
            </div>
          </div>
        </section>
      </div>
    </ProjectLayout>
  );
};

export default TempoProject;
