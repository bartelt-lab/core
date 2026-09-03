/**
 * Canonical route table — the single source of truth for
 *   - per-route <title>/<meta>   (src/components/common/SeoHead.jsx)
 *   - the prerender pass          (scripts/prerender.mjs)
 *   - robots.txt / sitemap.xml    (scripts/seo-files.mjs)
 *
 * A <Route> added to App.jsx without an entry here still renders, but it ships
 * with the site-default title and never reaches the sitemap or the prerenderer.
 *
 * Keep this file free of JSX and of imports that need a bundler — the build
 * scripts import it directly with plain Node.
 *
 * Fields
 *   path         route path, exactly as declared in App.jsx
 *   title        full <title>, written out rather than composed
 *   description  meta description / og:description (aim for 150-160 chars)
 *   canonical    optional — this path is an alias; point crawlers at that path
 *                instead, and leave it out of the sitemap
 *   image        optional — og:image override, as a /public path
 */

export const SITE_URL = 'https://www.core-network.ai'
export const SITE_NAME = 'CORE — Cognitive Software in Europe'
export const DEFAULT_OG_IMAGE = '/og-image.png'

export const DEFAULT_ROUTE_META = {
  title: SITE_NAME,
  description:
    'A joint initiative by leading European universities advancing cognitive software, autonomous systems, and machine learning research.',
}

export const routes = [
  // ---------------------------------------------------------------- CORE ---
  {
    path: '/',
    title: SITE_NAME,
    description: DEFAULT_ROUTE_META.description,
  },
  {
    path: '/network',
    title: SITE_NAME,
    description: DEFAULT_ROUTE_META.description,
    canonical: '/',
  },
  {
    path: '/core-labs',
    title: 'CORE Labs',
    description:
      'The laboratories behind the CORE Network: robotics, multi-modal egocentric perception, spatial reasoning, and robot learning across Goslar, Cluj-Napoca, and Rostock.',
  },
  {
    path: '/demos',
    title: 'Demonstrations | CORE',
    description:
      'Video demonstrations of CORE research systems, from autonomous navigation and mobile manipulation to laboratory automation.',
  },
  {
    path: '/publications',
    title: 'Publications | CORE',
    description:
      'Peer-reviewed publications from the research groups of the CORE Network on cognitive software, autonomous systems, and machine learning.',
  },
  {
    path: '/compute-cluster',
    title: 'Compute Cluster | CORE',
    description:
      'Shared GPU infrastructure for CORE researchers: NVIDIA H200 NVL and RTX PRO 6000 Blackwell nodes interconnected via NVLink, plus dataset storage and simulation environments.',
  },
  {
    path: '/dynamo',
    title: 'DyNAMO | CORE',
    description:
      'Dynamic Navigation & Autonomous Manipulation Operations — a mobile robot system that combines navigation and autonomous manipulation in unstructured environments.',
  },
  {
    path: '/leader-following',
    title: 'Leader Following | CORE',
    description:
      'A mobile robot that detects, tracks, and follows a human leader through changing environments using onboard perception.',
  },
  {
    path: '/vial-sort',
    title: 'Vial Sort | CORE',
    description:
      'A laboratory automation demonstrator: robotic perception and manipulation for identifying and sorting sample vials.',
  },

  // ---------------------------------------------------- AI Team Projects ---
  {
    path: '/ai-team-projects',
    title: 'AI Team Projects | CORE',
    description:
      'Semester-long applied AI projects built by mixed international student teams — recommender systems, cognitive robotics, LLM agents, MLOps, and simulation tooling.',
  },
  {
    path: '/ai-team-projects/tempo',
    title: 'TEMPO | AI Team Projects',
    description:
      "A recommendation model that fine-tunes itself to each chess player's memory, learning to act as a personal guide to their opening repertoire.",
  },
  {
    path: '/ai-team-projects/human-awareness-detection',
    title: 'Visual Human Awareness Estimation | AI Team Projects',
    description:
      'A vision-based system combining person tracking, gaze, head and body orientation, motion, and gestures to estimate whether nearby people appear aware of a mobile robot.',
  },
  {
    path: '/ai-team-projects/dynamo',
    title: 'DyNAMO | AI Team Projects',
    description:
      'The AI Team Project behind DyNAMO: how dynamic navigation and autonomous manipulation are split into subsystems and brought together on one mobile platform.',
  },
  {
    path: '/ai-team-projects/ai4bim',
    title: 'AI4BIM | AI Team Projects',
    description:
      'Integrated web platform for IFC extraction, BIM question answering, XGBoost house-price prediction, room-image classification, and Stable Diffusion layout generation.',
  },
  {
    path: '/ai-team-projects/ai4ai',
    title: 'AI4BIM | AI Team Projects',
    description:
      'Integrated web platform for IFC extraction, BIM question answering, XGBoost house-price prediction, room-image classification, and Stable Diffusion layout generation.',
    canonical: '/ai-team-projects/ai4bim',
  },
  {
    path: '/ai-team-projects/vergabepilot',
    title: 'Vergabepilot.AI | AI Team Projects',
    description:
      'Cost-aware tender data extraction across changing procurement portals, combining reusable scrapers, browser automation, AI-generated extraction, self-healing retries, and document processing.',
  },
  {
    path: '/ai-team-projects/werewolfs',
    title: 'The Village at Scale | AI Team Projects',
    description:
      'Training LLM agents to reason and negotiate in Werewolf, combining supervised fine-tuning from clean gameplay with reinforcement learning through self-play.',
  },
  {
    path: '/ai-team-projects/neurocore',
    title: 'NeuroCore Dashboard | AI Team Projects',
    description:
      'Next.js dashboard that queries cluster nodes over SSH, parses nvidia-smi and Slurm data, and displays GPU health, running jobs, storage, training metrics, and benchmark history.',
  },
  {
    path: '/ai-team-projects/stratego',
    title: 'Stratego — LLM Based Games | AI Team Projects',
    description:
      'Python benchmark that runs Ollama or Hugging Face models against each other in Stratego and logs prompts, moves, invalid actions, timing, outcomes, and player-position effects.',
  },
  {
    path: '/ai-team-projects/traffic-network',
    title: 'Traffic Network Builder | AI Team Projects',
    description:
      'Unity editor for assembling road layouts from reusable pieces, exporting OpenDRIVE 1.4 files, and loading the generated maps into CARLA with Python helper scripts.',
  },
  {
    path: '/ai-team-projects/self-driving',
    title: 'Self-Driving 1:10 | AI Team Projects',
    description:
      'A 1:10 vehicle testbed that combines SLAM, perception, path planning, feedback control, and autonomous parking in a compact end-to-end autonomy stack.',
  },

  // ----------------------------------------------------------- TU Clausthal ---
  {
    path: '/tuc',
    title: 'Bartelt Lab | TU Clausthal',
    description:
      'Research group at the Institute for Software Systems Engineering (ISSE), TU Clausthal, exploring the intersection of artificial intelligence, cognitive computing, and software engineering.',
  },
  {
    path: '/tuc/projects',
    title: 'Projects | Bartelt Lab',
    description:
      'Student research projects offered this semester at the Bartelt Lab, run on the Kaiser I cluster with travel, accommodation, and social event costs covered.',
  },
  {
    path: '/tuc/industry-projects',
    title: 'Industry Projects | Bartelt Lab',
    description:
      'Transfer and publicly funded projects at the Bartelt Lab, including AI-BIM, an AI-supported copilot for sustainable architectural design under environmental standards.',
  },
  {
    path: '/tuc/teaching',
    title: 'Teaching | Bartelt Lab',
    description:
      'Courses, seminars, and thesis topics offered by the Bartelt Lab at the Institute for Software Systems Engineering, TU Clausthal.',
  },
  {
    path: '/tuc/seminar',
    title: 'Seminars | Bartelt Lab',
    description:
      'Seminar topics and application details at the Bartelt Lab — send your Transcript of Records and topic preferences to apply.',
  },
  {
    path: '/tuc/theses',
    title: 'Theses | Bartelt Lab',
    description:
      'Bachelor and master thesis topics in artificial intelligence, cognitive computing, and software engineering at the Bartelt Lab, TU Clausthal.',
  },
  {
    path: '/tuc/join-us',
    title: 'Join Us | Bartelt Lab',
    description:
      'Open positions at the Institute for Software Systems Engineering (ISSE), TU Clausthal, for researchers with a strong background in computer science or mathematics.',
  },

  // -------------------------------------------------------------- UBB Cluj ---
  {
    path: '/ubb',
    title: 'UBB Cluj-Napoca | CORE',
    description:
      'A joint research initiative with Babeș-Bolyai University in autonomous systems, intelligent simulation, and robot learning — a new home for cognitive robotics and embodied intelligence.',
  },
]

/** Routes that belong in the sitemap: everything that is not an alias. */
export const indexableRoutes = routes.filter((route) => !route.canonical)

const byPath = new Map(routes.map((route) => [route.path, route]))

/** Strip the trailing slash so '/tuc/' and '/tuc' resolve to the same entry. */
export const normalizePath = (pathname) =>
  pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname

/** Metadata for a pathname, or undefined when the route is unknown. */
export const findRoute = (pathname) => byPath.get(normalizePath(pathname))

/**
 * The URL crawlers should treat as canonical.
 *
 * The slashless form is the one every in-app <Link> produces, so that is what
 * users copy and what other sites link to. scripts/prerender.mjs writes both
 * `<path>.html` and `<path>/index.html` so either shape serves the right page
 * whichever way the host resolves extensionless URLs; this tag unifies them.
 */
export const canonicalUrl = (pathname) => {
  const target = findRoute(pathname)?.canonical ?? normalizePath(pathname)
  return SITE_URL + (target === '/' ? '/' : target)
}
