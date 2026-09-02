import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import assetUrl from "../../utils/assetUrl";
import LazyVideo from "../../components/common/LazyVideo";
import { useLanguage } from "../../i18n/useLanguage";

const activeProjects = [
  {
    id: "tempo",
    title: "TEMPO",
    tag: "Recommender Systems / Chess",
    image: assetUrl("/images/projects/tempo/recommender-loop.webp"),
    description:
      "A recommendation model that fine-tunes itself to each player's memory, learning to act as a personal guide to their opening repertoire.",
    descriptionDe:
      "Adaptiver Schacheroeffnungstrainer mit Spaced Repetition fuer ganze Varianten, dynamischer Repertoire-Zweiganpassung waehrend der Partie und Erklaerungsmodul.",
    link: "/ai-team-projects/tempo",
    placeholder: false,
  },
  {
    id: "project-2",
    title: "Visual Human Awareness Estimation for Mobile Robots",
    tag: "AI Team / Cognitive Robotics",
    image: assetUrl("/images/projects/human-awareness-detection/intro.webp"),
    description:
      "A vision-based system combining person tracking, gaze, head and body orientation, motion, and gestures to estimate whether nearby people appear aware of a mobile robot.",
    descriptionDe:
      "Ein visionsbasiertes Wahrnehmungssystem nutzt Blickrichtung, Kopf- und Koerperhaltung, Bewegung und Gesten, um einzuschaetzen, ob Personen einen mobilen Roboter wahrzunehmen scheinen. Das AI-Theme-Projekt entsteht in Zusammenarbeit mit dem CORE Robotics Lab der TU Clausthal.",
    link: "/ai-team-projects/human-awareness-detection",
    placeholder: false,
  },
  {
    id: "project-3",
    title: "Project 3",
    tag: "Coming Soon",
    image: assetUrl("/logos/core/light-background/core.svg"),
    description:
      "Reserved for an upcoming AI Team Project. Details will follow when the scope and materials are ready.",
    descriptionDe:
      "Platzhalter fuer ein kommendes AI-Team-Projekt. Details werden ergaenzt, sobald Projektumfang und oeffentliche Materialien bereitstehen.",
    placeholder: true,
  },
];

const archiveProjects = [
  {
    id: "ai4ai",
    title: "AI4BIM",
    tag: "IFC / ML / Generative AI",
    video: assetUrl("/videos/ai-team-projects/ai4bim-platform-walkthrough.mp4"),
    poster: assetUrl(
      "/videos/ai-team-projects/ai4bim-platform-walkthrough-poster.webp",
    ),
    description:
      "Integrated web platform for IFC extraction, BIM question answering, XGBoost house-price prediction, room-image classification, and Stable Diffusion layout generation.",
    descriptionDe:
      "Integrierte Webplattform fuer IFC-Extraktion, BIM-Fragen und Antworten, Hauspreisprognosen mit XGBoost, Raumklassifikation und Layout-Generierung mit Stable Diffusion.",
    link: "/ai-team-projects/ai4bim",
  },
  {
    id: "vergabepilot",
    title: "Vergabepilot.AI",
    tag: "LLMs / Web Automation",
    video: assetUrl("/videos/ai-team-projects/vergabepilot-walkthrough.mp4"),
    poster: assetUrl(
      "/videos/ai-team-projects/vergabepilot-walkthrough-poster.webp",
    ),
    description:
      "Cost-aware tender data extraction across changing procurement portals, combining reusable scrapers, browser automation, AI-generated extraction, self-healing retries, and document processing.",
    descriptionDe:
      "Kostenbewusste Ausschreibungsdatenextraktion fuer wechselnde Vergabeportale mit wiederverwendbaren Scrapern, Browser-Automatisierung, KI-generierter Extraktion, automatischen Korrekturversuchen und Dokumentverarbeitung.",
    link: "/ai-team-projects/vergabepilot",
  },
  {
    id: "werewolves",
    title: "The Village at Scale",
    tag: "LLMs / Self-Play",
    image: assetUrl("/images/projects/werewolfs/showcase-background.webp"),
    description:
      "The Village at Scale trains LLM agents to reason and negotiate in Werewolf. It combines supervised fine-tuning from clean gameplay with reinforcement learning through self-play, while a live visualiser streams each six-agent match.",
    descriptionDe:
      "The Village at Scale trainiert LLM-Agenten fuer Schlussfolgerung und Verhandlung in Werewolf. Supervised Fine-Tuning mit sauberem Spielverhalten wird mit Reinforcement Learning durch Self-Play kombiniert; ein Live-Visualisierer zeigt jedes Match mit sechs Agenten.",
    link: "/ai-team-projects/werewolfs",
  },
  {
    id: "neurocore",
    title: "NeuroCore Dashboard",
    tag: "MLOps / Monitoring",
    video: assetUrl("/videos/demonstrations/neurocore/NeuroCore_demo.mp4"),
    description:
      "Next.js dashboard that queries cluster nodes over SSH, parses nvidia-smi and Slurm data, and displays GPU health, running jobs, storage, training metrics, and benchmark history.",
    descriptionDe:
      "Next.js-Dashboard, das Cluster-Nodes per SSH abfragt, nvidia-smi- und Slurm-Daten auswertet und GPU-Zustand, Jobs, Speicher, Trainingsmetriken und Benchmark-Verlaeufe darstellt.",
    link: "/ai-team-projects/neurocore",
  },
  {
    id: "stratego",
    title: "Stratego - LLM Based Games",
    tag: "LLMs / Games",
    video: assetUrl("/videos/demonstrations/stratego/stratego-demo-rp3.mp4"),
    description:
      "Python benchmark that runs Ollama or Hugging Face models against each other in Stratego and logs prompts, moves, invalid actions, timing, outcomes, and player-position effects.",
    descriptionDe:
      "Python-Benchmark fuer Stratego-Matches zwischen Ollama- oder Hugging-Face-Modellen mit Protokollen fuer Prompts, Zuege, ungueltige Aktionen, Laufzeit, Ergebnisse und Spielerposition.",
    link: "/ai-team-projects/stratego",
  },
  {
    id: "self-driving",
    title: "Self-Driving 1:10",
    tag: "Autonomous Navigation",
    youtubeId: "wrY34WyTEzo",
    description:
      "A 1:10 vehicle testbed that combines SLAM, perception, path planning, feedback control, and autonomous parking in a compact end-to-end autonomy stack.",
    descriptionDe:
      "Ein 1:10-Fahrzeugteststand, der SLAM, Wahrnehmung, Pfadplanung, Regelung und autonomes Parken zu einem kompakten End-to-End-Autonomiesystem verbindet.",
    link: "/ai-team-projects/self-driving",
  },
  {
    id: "traffic-network",
    title: "Traffic Network Builder",
    tag: "Simulation Tools",
    video: assetUrl(
      "/videos/demonstrations/autonomous_driving/TrafficNetworkBuilder.mp4",
    ),
    description:
      "Unity editor for assembling road layouts from reusable pieces, exporting OpenDRIVE 1.4 files, and loading the generated maps into CARLA with Python helper scripts.",
    descriptionDe:
      "Unity-Editor zum Aufbau von Strassennetzen aus wiederverwendbaren Elementen, zum Export als OpenDRIVE 1.4 und zum Laden der Karten in CARLA mit Python-Skripten.",
    link: "/ai-team-projects/traffic-network",
  },
];

const testimonials = [
  assetUrl("/videos/testimonials/Student-Testim-1.mp4"),
  assetUrl("/videos/testimonials/Student-Testim-2.mp4"),
  assetUrl("/videos/testimonials/Student-Testim-3.mp4"),
];

const Media = ({ project }) => {
  if (project.embedUrl) {
    return (
      <iframe
        src={project.embedUrl}
        title={project.title}
        className="h-full w-full"
        allow="autoplay; fullscreen"
        allowFullScreen
      />
    );
  }

  if (project.driveId) {
    return (
      <iframe
        src={`https://drive.google.com/file/d/${project.driveId}/preview`}
        title={project.title}
        className="h-full w-full"
        allow="autoplay; fullscreen"
        allowFullScreen
      />
    );
  }

  if (project.youtubeId) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${project.youtubeId}`}
        title={project.title}
        className="h-full w-full"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    );
  }

  if (project.video) {
    return (
      <LazyVideo
        src={project.video}
        poster={project.poster}
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
      />
    );
  }

  return (
    <img
      src={project.image}
      alt={project.title}
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
    />
  );
};

const AiTeamProjects = () => {
  const { pick } = useLanguage();
  const scrollToSection = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <section
        id="hero"
        className="relative isolate overflow-hidden border-b border-slate-200 bg-white pb-16 pt-32 sm:pb-18 sm:pt-36 lg:flex lg:min-h-screen lg:items-center lg:pb-8 lg:pt-32"
      >
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_18%,rgba(220,252,231,0.72),transparent_28%),radial-gradient(circle_at_82%_70%,rgba(209,248,219,0.56),transparent_30%),linear-gradient(135deg,#ffffff_0%,#f9fffb_52%,#f4fbf8_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.07)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]"
          aria-hidden="true"
        />
        <div
          className="absolute -right-24 top-32 -z-10 h-[30rem] w-[30rem] rounded-full bg-primary-100/50 blur-3xl"
          aria-hidden="true"
        />
        <div className="container relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 md:px-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(25rem,1.12fr)] lg:gap-10 xl:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-[38rem] lg:text-left"
          >
            <span className="mb-5 inline-flex rounded-full border border-primary-200 bg-white/90 px-5 py-2 text-xs font-bold uppercase tracking-[0.22em] text-primary-700 shadow-sm shadow-primary-100/70 backdrop-blur">
              {pick("Applied Intelligence", "Angewandte Intelligenz")}
            </span>
            <h1 className="font-heading text-5xl font-black leading-[0.98] text-slate-950 sm:text-6xl lg:text-[4.9rem] xl:text-[5.45rem]">
              AI Team
              <span className="block bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">
                {pick("Projects", "Projekte")}
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-[40rem] text-base leading-8 text-slate-600 md:text-lg lg:mx-0 lg:max-w-[36rem] lg:leading-8">
              {pick(
                "AI Team Projects connect academic research with real-world AI and ML development. In this semester-long program, mixed international teams from Clausthal University of Technology and Babes-Bolyai University build practical intelligent systems together.",
                "AI-Team-Projekte verbinden akademische Forschung mit realer KI- und ML-Entwicklung. In diesem semesterlangen Programm bauen gemischte internationale Teams der TU Clausthal und der Babes-Bolyai University gemeinsam praktische intelligente Systeme.",
              )}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-slate-500 lg:justify-start">
              {[
                ["Mixed teams", "Gemischte Teams"],
                ["Real-world systems", "Reale Systeme"],
                ["Research culture", "Forschungskultur"],
              ].map(([en, de]) => (
                <span key={en} className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-600" />
                  {pick(en, de)}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap justify-center gap-4 lg:justify-start">
              <button
                type="button"
                onClick={() => scrollToSection("active-projects")}
                className="group inline-flex min-w-40 items-center justify-center gap-2 rounded-full bg-slate-950 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-300/60 transition duration-300 hover:-translate-y-0.5 hover:bg-primary-700"
              >
                {pick("Current Projects", "Aktuelle Projekte")}
                <FaArrowRight
                  className="text-xs transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("archive")}
                className="min-w-40 rounded-full border border-slate-200 bg-white/85 px-7 py-3.5 text-sm font-bold text-slate-700 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-primary-200 hover:text-primary-700"
              >
                {pick("Archive Projects", "Archivprojekte")}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="relative mx-auto flex min-h-[19rem] w-full max-w-[28rem] items-center justify-center sm:min-h-[22rem] lg:min-h-[29rem] lg:max-w-[33rem] xl:min-h-[31rem]"
            aria-hidden="true"
          >
            <div className="absolute h-[17rem] w-[17rem] rounded-full border border-dashed border-primary-200/80 bg-white/20 sm:h-[20rem] sm:w-[20rem] lg:h-[25rem] lg:w-[25rem] xl:h-[27rem] xl:w-[27rem]" />
            <div className="absolute h-[12.5rem] w-[12.5rem] rounded-full border border-slate-200/70 bg-white/30 sm:h-[15rem] sm:w-[15rem] lg:h-[18.5rem] lg:w-[18.5rem]" />
            <motion.img
              src={assetUrl("/icons/avocando-icon.svg")}
              alt=""
              className="relative z-10 h-52 w-auto drop-shadow-[0_28px_32px_rgba(15,23,42,0.18)] sm:h-60 lg:h-[18.5rem] xl:h-[20rem]"
              animate={{ y: [-12, 10, -12], rotate: [-2.5, 2.5, -2.5] }}
              transition={{
                duration: 5.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="container mx-auto max-w-6xl px-6 md:px-10">
          <div className="mx-auto mb-10 max-w-4xl text-center">
            <h2 className="mb-2 text-3xl font-light uppercase tracking-[0.24em]">
              {pick("The Experience", "Die Erfahrung")}
            </h2>
            <p className="mb-4 text-lg font-bold italic tracking-[0.12em]">
              WORK HARD 💪PLAY HARD 🏀
            </p>
            <p className="text-sm leading-7 text-slate-300">
              {pick(
                "The absolute highlight of the ATP experience are the two onsite travel weeks, one hosted in Cluj and one in Goslar. These weeks are full immersion: students do not just hack together on AI models, they join all-day events where focused coding sessions are balanced with teambuilding, cultural exchange, and evening socials. The best technical ideas come from teams that know how to connect, adapt, and have fun together.",
                "Das Highlight der ATP-Erfahrung sind die zwei Vor-Ort-Wochen, eine in Cluj und eine in Goslar. Diese Wochen sind besonders intensiv: Die Studierenden arbeiten nicht nur gemeinsam an ihren KI-Modellen, sondern nehmen an ganztägigen Events teil, in denen konzentrierte Coding-Sessions mit Teambuilding, kulturellem Austausch und gemeinsamen Abendprogrammen verbunden werden. Die besten technischen Ideen entstehen in Teams, die sich kennen, flexibel zusammenarbeiten und gemeinsam Spaß haben.",
              )}
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              [
                "LATEST",
                "/videos/demonstrations/autonomous_driving/CTP_Showcase.mp4",
              ],
              [
                "ARCHIVE (2022)",
                "/videos/demonstrations/autonomous_driving/CTP_Showcase_2022.mp4",
              ],
            ].map(([label, src]) => (
              <div
                key={label}
                className="relative overflow-hidden rounded-lg shadow-2xl"
              >
                <span className="absolute left-4 top-4 z-10 rounded-full bg-primary-600 px-3 py-1 text-xs font-bold">
                  {label}
                </span>
                <LazyVideo
                  src={assetUrl(src)}
                  poster={assetUrl(src.replace(".mp4", "-poster.webp"))}
                  className="aspect-video w-full object-cover"
                  controls
                  muted
                  autoPlay
                  loop
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="active-projects" className="bg-gray-50 py-12 md:py-14">
        <div className="container mx-auto max-w-6xl px-6 md:px-10">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-light">
              {pick("Active Projects", "Aktive Projekte")}
            </h2>
            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-primary-600" />
            <p className="mt-5 text-sm text-slate-500">
              {pick(
                "Pushing the boundaries of what's possible in cognitive systems and automated intelligence.",
                "Wir erweitern die Möglichkeiten kognitiver Systeme und automatisierter Intelligenz.",
              )}
            </p>
          </div>
          <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activeProjects.map((project) => (
              <article
                key={project.id}
                className={`group relative flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-lg shadow-slate-200/70 ${
                  project.placeholder
                    ? "border border-dashed border-slate-300 bg-white/70"
                    : "border border-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                }`}
              >
                {project.placeholder && (
                  <div
                    className="pointer-events-none absolute inset-0 z-10 bg-white/25 backdrop-blur-[1.5px]"
                    aria-hidden="true"
                  />
                )}
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full transition duration-500 ${
                      project.placeholder
                        ? "object-contain p-10 opacity-35 blur-[1px] grayscale"
                        : "object-cover group-hover:scale-105"
                    }`}
                  />
                  <span className="absolute left-3 top-3 z-20 rounded-full bg-slate-950/75 px-3 py-1 text-xs font-bold text-white">
                    {project.tag}
                  </span>
                  {project.placeholder && (
                    <span className="absolute bottom-3 right-3 z-20 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-700 shadow-sm">
                      {pick("Coming soon", "Demnaechst")}
                    </span>
                  )}
                </div>
                <div className="relative z-20 flex flex-1 flex-col p-5">
                  <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-6 text-primary-700">
                    {project.link ? (
                      <Link to={project.link} className="transition hover:text-primary-900">
                        {project.title}
                      </Link>
                    ) : project.title}
                  </h3>
                  <p className="line-clamp-4 text-sm leading-6 text-slate-600">
                    {pick(project.description, project.descriptionDe)}
                  </p>
                  {project.link && (
                    <Link
                      to={project.link}
                      className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-bold text-primary-700 transition hover:text-primary-900"
                    >
                      {pick("View project", "Projekt ansehen")}
                      <FaArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="bg-white py-16">
        <div className="container mx-auto max-w-6xl px-6 md:px-10">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-light">
              {pick("Student Testimonials", "Stimmen von Studierenden")}
            </h2>
            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-primary-600" />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((src, index) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="overflow-hidden rounded-lg bg-slate-950 shadow-xl"
              >
                <LazyVideo
                  src={src}
                  poster={src.replace(".mp4", "-poster.webp")}
                  className="aspect-video w-full object-cover"
                  controls
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="archive" className="bg-white py-16">
        <div className="container mx-auto max-w-6xl px-6 md:px-10">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-light">
              {pick("Project Archive", "Projektarchiv")}
            </h2>
            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-primary-600" />
          </div>
          <div className="space-y-16">
            {archiveProjects.map((project, index) => (
              <div
                key={project.id}
                className={`grid items-center gap-10 md:grid-cols-2 ${index % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="aspect-video overflow-hidden rounded-lg bg-slate-950 shadow-2xl">
                  <Media project={project} />
                </div>
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-bold uppercase text-primary-700">
                      {pick("Archive", "Archiv")}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                      {project.tag}
                    </span>
                  </div>
                  <h3 className="mb-4 text-2xl font-bold">{project.title}</h3>
                  <p className="mb-5 leading-7 text-slate-600">
                    {pick(project.description, project.descriptionDe)}
                  </p>
                  {project.link && (
                    <Link
                      to={project.link}
                      className="inline-flex items-center gap-2 text-sm font-bold text-primary-700"
                    >
                      {pick("View Project", "Projekt ansehen")}
                      <FaArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 border-t border-slate-200 pt-10 text-center">
            <p className="mx-auto mb-4 max-w-3xl text-sm leading-7 text-slate-500">
              Looking for earlier iterations? These projects continue the
              tradition of our team projects from the University of Mannheim,
              where the same format ran under the European Master Team Project.
            </p>
            <a
              href="https://www.uni-mannheim.de/en/ines/teaching/european-master-team-project/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary-700"
            >
              View previous projects at Uni Mannheim
              <FaArrowRight className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AiTeamProjects;
