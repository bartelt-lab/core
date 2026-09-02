import ProjectLayout from "../../../components/tuc/ProjectLayout";
import assetUrl from "../../../utils/assetUrl";
import { useLanguage } from "../../../i18n/useLanguage";

// What Learning Mode does: the drilled line runs straight through under full
// guidance, and a wrong move is intercepted before it lands rather than punished.
const LearningDiagram = () => (
  <svg
    viewBox="0 0 445 200"
    className="h-auto w-full"
    role="img"
    aria-label="A line of positions running left to right, each step signposted by an arrow; a wrong move branches off and is blocked before it is played, guiding the player back to the line"
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
      an arrow shows the move to play, step by step
    </text>
    <text x="152" y="186" className="fill-slate-500 text-[14px] font-semibold">
      stray from it and you are guided back
    </text>
  </svg>
);

// What Repeating Mode does at a decision: three things can happen, and only one
// of them ends the session where it started.
const RepeatingDiagram = () => (
  <svg
    viewBox="0 0 480 262"
    className="h-auto w-full"
    role="img"
    aria-label="A decision point with three outcomes: the drilled move, another move from the repertoire that the session follows, and a blunder that is punished before the position rewinds"
  >
    <defs>
      <marker
        id="gambit-rewind"
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
      markerEnd="url(#gambit-rewind)"
    />

    <circle cx="30" cy="130" r="5" className="fill-slate-600" />
    <circle cx="110" cy="130" r="9" className="fill-white" />
    <circle cx="250" cy="60" r="6" className="fill-primary-400" />
    <circle cx="250" cy="130" r="6" className="fill-primary-400" />
    <circle cx="250" cy="205" r="6" className="fill-amber-400" />

    <text x="18" y="104" className="fill-slate-500 text-[14px] font-semibold">
      the drilled line
    </text>
    <text x="264" y="64" className="fill-slate-300 text-[14px] font-semibold">
      you play the drilled move
    </text>
    <text x="264" y="126" className="fill-slate-300 text-[14px] font-semibold">
      you play another move from
    </text>
    <text x="264" y="142" className="fill-slate-300 text-[14px] font-semibold">
      your repertoire — followed
    </text>
    <text x="264" y="201" className="fill-slate-300 text-[14px] font-semibold">
      you blunder — the opponent
    </text>
    <text x="264" y="217" className="fill-slate-300 text-[14px] font-semibold">
      plays the punishment out
    </text>
    <text
      x="176"
      y="256"
      textAnchor="middle"
      className="fill-slate-500 text-[14px] font-semibold"
    >
      then rewind
    </text>
  </svg>
);

// Box styles for the session-flow diagram: the two branches are told apart by
// fill, and everything downstream of them is shared.
const FLOW_TONES = {
  dark: { rect: "fill-slate-800 stroke-slate-800", title: "fill-white", sub: "fill-slate-300" },
  light: { rect: "fill-white stroke-slate-300", title: "fill-slate-800", sub: "fill-slate-500" },
  primary: {
    rect: "fill-primary-600 stroke-primary-600",
    title: "fill-white",
    sub: "fill-primary-100",
  },
  chip: { rect: "fill-primary-50 stroke-primary-200", title: "fill-primary-700", sub: "" },
  band: {
    rect: "fill-primary-700 stroke-primary-700",
    title: "fill-white",
    sub: "fill-primary-100",
  },
};

const FlowNode = ({ x, y, w, h = 68, title, sub, tone = "light" }) => {
  const style = FLOW_TONES[tone];
  const cx = x + w / 2;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="10"
        className={style.rect}
        strokeWidth="1.5"
      />
      <text
        x={cx}
        y={sub ? y + h / 2 - 2 : y + h / 2 + 7}
        textAnchor="middle"
        className={`text-[18px] font-bold ${style.title}`}
      >
        {title}
      </text>
      {sub ? (
        <text
          x={cx}
          y={y + h / 2 + 20}
          textAnchor="middle"
          className={`text-[14px] font-semibold ${style.sub}`}
        >
          {sub}
        </text>
      ) : null}
    </g>
  );
};

// One session end to end, read left to right: the player picks a mode, each
// branch drills, and both write into the recommender on the right — which
// returns the next line to repeat.
const FlowDiagram = ({ t }) => (
  <svg
    viewBox="0 0 1380 440"
    className="h-auto w-full"
    role="img"
    aria-label={t(
      "Opening GAMBIT leads to a choice of mode. Learning Mode: you choose the line, the drill is guided, a wrong move is corrected and replayed. Repeating Mode: the recommender chooses the line, the drill is unassisted, and the pick is graded on whether it came too late. Both branches update the record of what you know. Everything feeds the recommender on the right, which holds your profile, your repertoire, what you know and past picks, plus the base model fine-tuned on you that returns the next line to repeat.",
    )}
  >
    <defs>
      <marker
        id="gambit-flow-arrow"
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M0 0 L10 5 L0 10 z" className="fill-slate-400" />
      </marker>
    </defs>

    <g
      className="stroke-slate-400"
      strokeWidth="1.5"
      fill="none"
      markerEnd="url(#gambit-flow-arrow)"
    >
      <path d="M120 170 V186" />
      <path d="M210 226 H415 V108" />
      <path d="M415 226 V260" />
      <path d="M530 74 H570" />
      <path d="M800 74 H830" />
      <path d="M530 294 H570" />
      <path d="M800 294 H830" />
      <path d="M955 108 V150" />
      <path d="M685 260 V184 H830" />
      <path d="M1080 184 H1110" />
      <path d="M1080 294 H1110" />
      <path d="M1235 410 V422 H415 V328" />
    </g>

    <FlowNode x={20} y={118} w={200} h={52} title={t("You open GAMBIT")} tone="dark" />

    <path d="M120 186 L210 226 L120 266 L30 226 Z" className="fill-slate-900" />
    <text
      x="120"
      y="233"
      textAnchor="middle"
      className="fill-white text-[18px] font-bold"
    >
      {t("Pick a mode")}
    </text>
    <text x="428" y="190" className="fill-slate-400 text-[14px] font-semibold">
      {t("learn")}
    </text>
    <text x="428" y="252" className="fill-slate-400 text-[14px] font-semibold">
      {t("repeat")}
    </text>

    <FlowNode
      x={300}
      y={40}
      w={230}
      title={t("Learning Mode")}
      sub={t("you choose the line")}
    />
    <FlowNode
      x={570}
      y={40}
      w={230}
      title={t("Guided drill")}
      sub={t("arrows show every move")}
    />
    <FlowNode
      x={830}
      y={40}
      w={250}
      title={t("Wrong move corrected")}
      sub={t("you replay it")}
    />

    <FlowNode
      x={300}
      y={260}
      w={230}
      title={t("Repeating Mode")}
      sub={t("the recommender chooses")}
      tone="primary"
    />
    <FlowNode
      x={570}
      y={260}
      w={230}
      title={t("Unassisted drill")}
      sub={t("no hints, no arrows")}
      tone="primary"
    />
    <FlowNode
      x={830}
      y={260}
      w={250}
      title={t("Pick is graded")}
      sub={t("did it come too late?")}
      tone="primary"
    />

    <FlowNode
      x={830}
      y={150}
      w={250}
      title={t("What you know is updated")}
      sub={t("every move counts")}
      tone="dark"
    />

    {/* The recommender is one component: what it reads, stacked above the model
        that reads it. Both branches feed it, and its output re-enters Repeating
        Mode along the return line. */}
    <rect
      x={1110}
      y={20}
      width={250}
      height={390}
      rx="16"
      className="fill-white stroke-primary-300"
      strokeWidth="1.5"
      strokeDasharray="6 5"
    />
    <text
      x="1130"
      y="48"
      className="fill-primary-600 text-[13px] font-black uppercase tracking-widest"
    >
      {t("Recommender")}
    </text>

    <FlowNode x={1130} y={62} w={210} h={48} title={t("your profile")} tone="chip" />
    <FlowNode x={1130} y={122} w={210} h={48} title={t("your repertoire")} tone="chip" />
    <FlowNode x={1130} y={182} w={210} h={48} title={t("what you know")} tone="chip" />
    <FlowNode x={1130} y={242} w={210} h={48} title={t("past picks")} tone="chip" />

    <path
      d="M1235 290 V310"
      className="stroke-primary-300"
      strokeWidth="1.5"
      fill="none"
    />

    {/* Written out by hand rather than as a FlowNode: the title needs two lines
        to stay inside the panel. */}
    <rect
      x={1130}
      y={310}
      width={210}
      height={80}
      rx="10"
      className="fill-primary-700 stroke-primary-700"
      strokeWidth="1.5"
    />
    <text
      x="1235"
      y="338"
      textAnchor="middle"
      className="fill-white text-[17px] font-bold"
    >
      {t("Base model,")}
    </text>
    <text
      x="1235"
      y="359"
      textAnchor="middle"
      className="fill-white text-[17px] font-bold"
    >
      {t("fine-tuned on you")}
    </text>
    <text
      x="1235"
      y="379"
      textAnchor="middle"
      className="fill-primary-100 text-[14px] font-semibold"
    >
      {t("returns the next line")}
    </text>
  </svg>
);

const Eyebrow = ({ children }) => (
  <p className="text-xs font-black uppercase tracking-widest text-primary-600">
    {children}
  </p>
);

const GambitProject = () => {
  const { pick } = useLanguage();
  // TODO(i18n): German copy pending. `t` falls back to English for both
  // languages until the translation pass lands.
  const t = (en, de) => pick(en, de ?? en);

  const tags = [
    t("Recommender Systems"),
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
      "Interest in machine learning helps — recommender systems, personalisation, or learning from user feedback",
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
      title="GAMBIT"
      showHero={false}
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
              GAMBIT
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-light leading-relaxed text-slate-500">
              {t(
                "A chess opening trainer built around a recommendation model that learns you",
              )}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600">
              {t(
                "A player's hardest question is not how to play a line — it is which of the lines they already know needs work today. GAMBIT answers it with a model that ships as a base model, is fine-tuned on one player's own play, and is graded on every recommendation it makes.",
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

          <div className="lg:border-l lg:border-gray-200 lg:pl-8 lg:pt-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {t("Team")}
            </p>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {t(
                "A mixed international team of German and Romanian students, for one semester.",
              )}
            </p>

            <img
              src={assetUrl("/images/projects/gambit/recommender-robot.webp")}
              alt={t(
                "The recommender, drawn as a robot with a graph of chess lines lit up in its chest",
              )}
              width={700}
              height={865}
              decoding="async"
              className="mt-8 h-auto w-32 lg:w-full lg:max-w-[10rem]"
            />
          </div>
        </section>

        {/* The problem */}
        <section className="grid gap-8 border-t border-gray-100 pt-12 md:grid-cols-[0.8fr_1fr] md:gap-10">
          <div className="md:order-2 md:text-right">
            <Eyebrow>{t("The problem")}</Eyebrow>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-gray-950">
              {t("Deciding what to study is the hardest part of studying alone")}
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              {t(
                "Existing trainers answer that question with a fixed rule — the same rule for every user, for the life of the product. It cannot know that you hold a sharp tactical line for weeks and lose a quiet positional one in days.",
              )}
            </p>
          </div>

          <div className="grid gap-3 self-center md:order-1">
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                {t("Other systems")}
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-gray-600">
                {t(
                  "One scheduling rule, identical for every player, fixed forever",
                )}
              </p>
            </div>
            <div className="rounded-xl border border-primary-200 bg-primary-50 p-4">
              <p className="text-xs font-black uppercase tracking-widest text-primary-600">
                GAMBIT
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
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-gray-950">
            {t("Learn it with help, then prove it without")}
          </h2>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm shadow-slate-100/80">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-black uppercase tracking-widest text-primary-700">
                  {t("Learning Mode")}
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-gray-600">
                {t(
                  "You pick the line you want to learn, and it is walked through under full guidance — an arrow on the board shows the move to play. Stray from it and you are guided back before the move can land.",
                )}
              </p>
              <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4">
                <LearningDiagram />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 text-white shadow-xl">
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
                <RepeatingDiagram />
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-5">
            <p className="text-xs font-black uppercase tracking-widest text-slate-500">
              {t("Everything is logged")}
            </p>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-gray-600">
              {t(
                "Every move attempt and every recommendation — including which branch the player took, and every position a punishment sequence passed through. That log is what the model learns from, and what the project's results are measured on.",
              )}
            </p>
          </div>
        </section>

        {/* One session, end to end */}
        <section>
          <Eyebrow>{t("The loop")}</Eyebrow>
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-gray-950">
            {t("One session, from the first move to the next recommendation")}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600">
            {t(
              "Both modes write to the same record of what you know. The recommender — your profile, your repertoire, that record, its own past picks, and the model fine-tuned on all of it — reads what comes out and returns the line to repeat next.",
            )}
          </p>

          <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-8">
            <FlowDiagram t={t} />
          </div>
        </section>

        {/* How the recommender learns */}
        <section>
          <Eyebrow>{t("How it works")}</Eyebrow>
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-gray-950">
            {t("The recommender is graded on its own decisions")}
          </h2>

          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm shadow-slate-100/80 sm:p-8">
            <div className="grid gap-x-8 gap-y-3 lg:grid-cols-2">
              <p className="text-sm leading-7 text-gray-600">
                {t(
                  "Which lines get learned is the player's own choice. The model's job starts afterwards: it reads their profile, their repertoire, the record of every line they have drilled so far and its own earlier suggestions, and returns the one line that should be repeated next.",
                )}
              </p>
              <p className="text-sm leading-7 text-gray-600">
                {t(
                  "The suggestion is then measured against what actually happened in the session — what was recalled, what was missed, and how long it took the player to find the right move. That measurement is what the model is trained on next, so over time it builds a picture of one specific player's memory.",
                )}
              </p>
            </div>
            <p className="mt-6 border-l-2 border-primary-300 pl-3 text-sm leading-6 text-gray-700">
              {t(
                "A line the player has already forgotten is recorded as having arrived too late. That grade becomes training data, which is what separates the recommender from a scheduler that is never told whether it was right.",
              )}
            </p>
          </div>
        </section>

        {/* Domain independence */}
        <section className="grid gap-8 border-t border-gray-100 pt-12 md:grid-cols-[0.8fr_1fr] md:gap-10">
          <div className="md:order-2 md:text-right">
            <Eyebrow>{t("Scope")}</Eyebrow>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-gray-950">
              {t("The model reasons about learning, not about chess")}
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              {t(
                "The recommender solves a general problem: given a learner, a set of things they are trying to learn, and a history of how their practice went, decide what they should practise next. Its inputs and outputs are kept in a form that does not assume the material is chess.",
              )}
            </p>
            <p className="mt-4 text-base leading-7 text-gray-600">
              {t(
                "Chess is where it is built and measured first. The domain supplies dense, cheap, objectively gradable outcomes — a move either is the repertoire move or it is not — which makes it a good place to find out whether the approach works at all.",
              )}
            </p>
          </div>

          {/* In, model, out — stacked, with the model as the emphasised middle
              band. Nothing in the exchange is chess-specific. */}
          <div className="grid gap-3 self-center md:order-1">
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                {t("What goes in")}
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-gray-600">
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
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                {t("What comes out")}
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-gray-600">
                {t("The one item the learner should revisit next")}
              </p>
            </div>
            <p className="px-1 text-xs leading-5 text-gray-500">
              {t(
                "Nothing in that exchange is chess-specific. Everything that is lives behind the domain layer.",
              )}
            </p>
          </div>
        </section>

        {/* For students */}
        <section>
          <Eyebrow>{t("For students")}</Eyebrow>
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-gray-950">
            {t("Thinking about joining?")}
          </h2>

          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm shadow-slate-100/80 sm:p-10">
            <ul className="grid gap-3 md:grid-cols-2 md:gap-x-10">
              {joining.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-6 text-gray-600"
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

export default GambitProject;
