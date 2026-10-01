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
 *   source       repo-relative path of the page component this route renders.
 *                scripts/seo-files.mjs asks git when that file last changed and
 *                publishes the answer as the route's <lastmod>. Several routes
 *                share a source on purpose (/ and /network, the three teaching
 *                paths); that is correct, they really do change together.
 *   title        full <title>, written out rather than composed
 *   description  meta description / og:description (aim for 150-160 chars)
 *   canonical    optional — this path is an alias; point crawlers at that path
 *                instead, and leave it out of the sitemap
 *   redirectTo   optional — old URL replaced by this path/query/anchor
 *   section      optional — active main navigation category, including details
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
    source: 'src/pages/Home.jsx',
    title: SITE_NAME,
    description: DEFAULT_ROUTE_META.description,
  },
  {
    path: '/network',
    source: 'src/pages/Home.jsx',
    title: SITE_NAME,
    description: DEFAULT_ROUTE_META.description,
    canonical: '/',
    redirectTo: '/',
  },
  {
    path: '/research',
    source: 'src/pages/Research.jsx',
    section: 'research',
    title: 'Research | CORE',
    description: 'Explore research topics and publications across the CORE Network, from cognitive software and machine learning to autonomous systems and embodied intelligence.',
  },
  {
    path: '/projects',
    source: 'src/pages/Projects.jsx',
    section: 'projects',
    title: 'Projects | CORE',
    description: 'Research and industry projects across the CORE Network: autonomous robotics, cognitive software, and AI systems developed with academic and industry partners.',
  },
  {
    path: '/teaching',
    source: 'src/pages/Teaching.jsx',
    section: 'teaching',
    title: 'Teaching | CORE',
    description: 'Courses, seminars, thesis topics, and student team projects across the CORE Network, with information on participation and supervision.',
  },
  {
    path: '/labs',
    source: 'src/pages/Labs.jsx',
    section: 'labs',
    title: 'Labs | CORE',
    description: 'Explore the CORE Network laboratories and shared infrastructure: robotics in Goslar, humanoid and autonomous driving research in Cluj, and the Kaiser compute cluster.',
  },
  {
    path: '/team',
    source: 'src/pages/Team.jsx',
    section: 'team',
    title: 'Team | CORE',
    description: 'Meet the researchers, student assistants, and support teams across the CORE Network, find contact information, and explore opportunities to join us.',
  },
  {
    path: '/labs/robotics',
    source: 'src/pages/labs/RoboticsLab.jsx',
    section: 'labs',
    title: 'Robotics Lab | CORE',
    description: 'The TU Clausthal robotics laboratory in Goslar: mobile manipulation, perception, robot learning, and physical platforms for autonomous systems research.',
  },
  {
    path: '/labs/cluj',
    source: 'src/pages/labs/ClujLab.jsx',
    section: 'labs',
    title: 'Cluj Lab | CORE',
    description: 'The CORE laboratory at Babeș-Bolyai University in Cluj-Napoca brings together humanoid robotics, autonomous driving, intelligent simulation, and robot learning.',
  },
  {
    path: '/core-labs',
    section: 'labs',
    redirectTo: '/labs',
    canonical: '/labs',
    source: 'src/pages/Labs.jsx',
    title: 'CORE Labs',
    description:
      'The laboratories behind the CORE Network: robotics, multi-modal egocentric perception, spatial reasoning, and robot learning across Goslar, Cluj-Napoca, and Rostock.',
  },
  {
    path: '/demos',
    section: 'projects',
    redirectTo: '/projects#research-projects',
    canonical: '/projects',
    source: 'src/pages/Projects.jsx',
    title: 'Demonstrations | CORE',
    description:
      'Video demonstrations of CORE research systems, from autonomous navigation and mobile manipulation to laboratory automation.',
  },
  {
    path: '/publications',
    section: 'research',
    redirectTo: '/research#publications',
    canonical: '/research',
    source: 'src/pages/Research.jsx',
    title: 'Publications | CORE',
    description:
      'Peer-reviewed publications from the research groups of the CORE Network on cognitive software, autonomous systems, and machine learning.',
  },
  {
    path: '/compute-cluster',
    section: 'labs',
    source: 'src/pages/ComputeCluster.jsx',
    title: 'Compute Cluster | CORE',
    description:
      'Shared GPU infrastructure for CORE researchers: NVIDIA H200 NVL and RTX PRO 6000 Blackwell nodes interconnected via NVLink, plus dataset storage and simulation environments.',
  },
  {
    path: '/dynamo',
    section: 'projects',
    source: 'src/pages/Dynamo.jsx',
    title: 'DyNAMO | CORE',
    description:
      'Dynamic Navigation & Autonomous Manipulation Operations — a mobile robot system that combines navigation and autonomous manipulation in unstructured environments.',
  },
  {
    path: '/leader-following',
    section: 'projects',
    source: 'src/pages/LeaderFollowing.jsx',
    title: 'Leader Following | CORE',
    description:
      'A mobile robot that detects, tracks, and follows a human leader through changing environments using onboard perception.',
  },
  {
    path: '/vial-sort',
    section: 'projects',
    source: 'src/pages/VialSort.jsx',
    title: 'Vial Sort | CORE',
    description:
      'Language-conditioned laboratory vial sorting on a low-cost SO-101 arm, driven by a frozen-backbone pi0.5 vision-language-action policy trained from 150 teleoperated demonstrations.',
  },

  // ---------------------------------------------------- AI Team Projects ---
  {
    path: '/ai-team-projects',
    section: 'teaching',
    redirectTo: '/teaching#student-projects',
    canonical: '/teaching',
    source: 'src/pages/Teaching.jsx',
    title: 'AI Team Projects | CORE',
    description:
      'Semester-long applied AI projects built by mixed international student teams — recommender systems, cognitive robotics, LLM agents, MLOps, and simulation tooling.',
  },
  {
    path: '/ai-team-projects/tempo',
    section: 'teaching',
    source: 'src/pages/tuc/projects/TempoProject.jsx',
    title: 'TEMPO | AI Team Projects',
    description:
      "A recommendation model that fine-tunes itself to each chess player's memory, learning to act as a personal guide to their opening repertoire.",
  },
  {
    path: '/ai-team-projects/lectra',
    section: 'teaching',
    source: 'src/pages/tuc/projects/LectraProject.jsx',
    title: 'LECTRA | AI Team Projects',
    description:
      'A planned course learning-platform demonstrator that combines course-material retrieval, a context-aware LLM assistant, and a lightweight model of each student’s topic-level learning state.',
    image: '/images/projects/lectra/workspace.webp',
  },
  {
    path: '/ai-team-projects/fastmile',
    section: 'teaching',
    source: 'src/pages/tuc/projects/FastMileProject.jsx',
    title: 'FastMile | AI Team Projects',
    description:
      'A planned real-time routing platform that merges data from several mobility providers into one intermodal journey, and uses language models to handle disruptions, cancellations, and events.',
  },
  {
    path: '/ai-team-projects/human-awareness-detection',
    section: 'teaching',
    source: 'src/pages/HumanAwarenessDetection.jsx',
    title: 'Visual Human Awareness Estimation | AI Team Projects',
    description:
      'A vision-based system combining person tracking, gaze, head and body orientation, motion, and gestures to estimate whether nearby people appear aware of a mobile robot.',
  },
  {
    path: '/ai-team-projects/ai4bim',
    section: 'teaching',
    source: 'src/pages/tuc/projects/AI4AIProject.jsx',
    title: 'AI4BIM | AI Team Projects',
    description:
      'Integrated web platform for IFC extraction, BIM question answering, XGBoost house-price prediction, room-image classification, and Stable Diffusion layout generation.',
  },
  {
    path: '/ai-team-projects/ai4ai',
    section: 'teaching',
    redirectTo: '/ai-team-projects/ai4bim',
    source: 'src/pages/tuc/projects/AI4AIProject.jsx',
    title: 'AI4BIM | AI Team Projects',
    description:
      'Integrated web platform for IFC extraction, BIM question answering, XGBoost house-price prediction, room-image classification, and Stable Diffusion layout generation.',
    canonical: '/ai-team-projects/ai4bim',
  },
  {
    path: '/ai-team-projects/vergabepilot',
    section: 'teaching',
    source: 'src/pages/tuc/projects/VergabepilotProject.jsx',
    title: 'Vergabepilot.AI | AI Team Projects',
    description:
      'Cost-aware tender data extraction across changing procurement portals, combining reusable scrapers, browser automation, AI-generated extraction, self-healing retries, and document processing.',
  },
  {
    path: '/ai-team-projects/werewolfs',
    section: 'teaching',
    source: 'src/pages/tuc/projects/WerewolfsProject.jsx',
    title: 'The Village at Scale | AI Team Projects',
    description:
      'Training LLM agents to reason and negotiate in Werewolf, combining supervised fine-tuning from clean gameplay with reinforcement learning through self-play.',
  },
  {
    path: '/ai-team-projects/neurocore',
    section: 'teaching',
    source: 'src/pages/tuc/projects/NeuroCoreProject.jsx',
    title: 'NeuroCore Dashboard | AI Team Projects',
    description:
      'Next.js dashboard that queries cluster nodes over SSH, parses nvidia-smi and Slurm data, and displays GPU health, running jobs, storage, training metrics, and benchmark history.',
  },
  {
    path: '/ai-team-projects/stratego',
    section: 'teaching',
    source: 'src/pages/tuc/projects/StrategoProject.jsx',
    title: 'Stratego — LLM Based Games | AI Team Projects',
    description:
      'Python benchmark that runs Ollama or Hugging Face models against each other in Stratego and logs prompts, moves, invalid actions, timing, outcomes, and player-position effects.',
  },
  {
    path: '/ai-team-projects/traffic-network',
    section: 'teaching',
    source: 'src/pages/tuc/projects/TrafficNetworkProject.jsx',
    title: 'Traffic Network Builder | AI Team Projects',
    description:
      'Unity editor for assembling road layouts from reusable pieces, exporting OpenDRIVE 1.4 files, and loading the generated maps into CARLA with Python helper scripts.',
  },
  {
    path: '/ai-team-projects/self-driving',
    section: 'teaching',
    source: 'src/pages/tuc/projects/SelfDrivingProject.jsx',
    title: 'Self-Driving 1:10 | AI Team Projects',
    description:
      'A 1:10 vehicle testbed that combines SLAM, perception, path planning, feedback control, and autonomous parking in a compact end-to-end autonomy stack.',
  },

  // ----------------------------------------------------------- TU Clausthal ---
  {
    path: '/tuc',
    section: 'research',
    redirectTo: '/research?institution=TUC',
    canonical: '/research',
    source: 'src/pages/Research.jsx',
    title: 'Cognitive Software | TU Clausthal',
    description:
      'Research group at the Institute for Software Systems Engineering (ISSE), TU Clausthal, exploring the intersection of artificial intelligence, cognitive computing, and software engineering.',
  },
  {
    path: '/tuc/projects',
    section: 'teaching',
    redirectTo: '/teaching?institution=TUC#student-projects',
    canonical: '/teaching',
    source: 'src/pages/Teaching.jsx',
    title: 'Projects | Cognitive Software, TU Clausthal',
    description:
      'Student research projects offered this semester at TU Clausthal, run on the Kaiser I cluster with travel, accommodation, and social event costs covered.',
  },
  {
    path: '/tuc/industry-projects',
    section: 'projects',
    redirectTo: '/projects?institution=TUC#industry-projects',
    canonical: '/projects',
    source: 'src/pages/Projects.jsx',
    title: 'Industry Projects | Cognitive Software, TU Clausthal',
    description:
      'Transfer and publicly funded projects of the Cognitive Software group, including AI-BIM, an AI-supported copilot for sustainable architectural design under environmental standards.',
  },
  {
    path: '/tuc/teaching',
    section: 'teaching',
    redirectTo: '/teaching?institution=TUC',
    canonical: '/teaching',
    source: 'src/pages/Teaching.jsx',
    title: 'Teaching | Cognitive Software, TU Clausthal',
    description:
      'Courses, seminars, and thesis topics offered by the Cognitive Software group at the Institute for Software Systems Engineering, TU Clausthal.',
  },
  {
    path: '/tuc/seminar',
    section: 'teaching',
    redirectTo: '/teaching?institution=TUC#seminars',
    canonical: '/teaching',
    source: 'src/pages/Teaching.jsx',
    title: 'Seminars | Cognitive Software, TU Clausthal',
    description:
      'Seminar topics and application details at the Institute for Software Systems Engineering, TU Clausthal — send your Transcript of Records and topic preferences to apply.',
  },
  {
    path: '/tuc/theses',
    section: 'teaching',
    redirectTo: '/teaching?institution=TUC#theses',
    canonical: '/teaching',
    source: 'src/pages/Teaching.jsx',
    title: 'Theses | Cognitive Software, TU Clausthal',
    description:
      'Bachelor and master thesis topics in artificial intelligence, cognitive computing, and software engineering at the Institute for Software Systems Engineering, TU Clausthal.',
  },
  {
    path: '/tuc/join-us',
    section: 'team',
    redirectTo: '/team?institution=TUC#join-us',
    canonical: '/team',
    source: 'src/pages/Team.jsx',
    title: 'Join Us | Cognitive Software, TU Clausthal',
    description:
      'Open positions at the Institute for Software Systems Engineering (ISSE), TU Clausthal, for researchers with a strong background in computer science or mathematics.',
  },

  // -------------------------------------------------------------- UBB Cluj ---
  {
    path: '/ubb',
    section: 'labs',
    redirectTo: '/labs?institution=UBB',
    canonical: '/labs',
    source: 'src/pages/Labs.jsx',
    title: 'UBB Cluj-Napoca | CORE',
    description:
      'A joint research initiative with Babeș-Bolyai University in autonomous systems, intelligent simulation, and robot learning — a new home for cognitive robotics and embodied intelligence.',
  },
  {
    path: '/ai-team-projects/dynamo',
    source: 'src/pages/Dynamo.jsx',
    section: 'projects',
    title: 'DyNAMO | CORE',
    description: 'Dynamic Navigation & Autonomous Manipulation Operations: autonomous mobile robotics research in the CORE Network.',
    redirectTo: '/dynamo',
    canonical: '/dynamo',
  },
  {
    path: '/tuc/publications',
    source: 'src/pages/Research.jsx',
    section: 'research',
    title: 'Research | CORE',
    description: 'Research topics and publications from TU Clausthal in the CORE Network.',
    redirectTo: '/research?institution=TUC#publications',
    canonical: '/research',
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

// Some old anchors identify content that has moved to a different section.
// Keep these alongside route aliases so both old plain paths and /#/ links
// (rewritten by index.html) arrive at the same destination.
const legacyAnchors = {
  '/#team': '/team',
  '/network#team': '/team',
  '/tuc#members': '/team?institution=TUC',
  '/tuc#contact': '/team?institution=TUC#contact',
  '/tuc#overview': '/research?institution=TUC',
  '/core-labs#hero': '/labs',
  '/core-labs#initiative': '/labs',
  '/core-labs#team': '/team',
  '/core-labs#dynamo': '/projects#research-projects',
  '/core-labs#demonstrations': '/projects#research-projects',
  '/core-labs#autonomous': '/labs/cluj?institution=UBB#autonomous',
  '/core-labs#publications': '/research#publications',
  '/demos#autonomous': '/labs/cluj?institution=UBB#autonomous',
  '/ubb#humanoid': '/labs/cluj?institution=UBB#humanoid',
  '/ubb#autonomous': '/labs/cluj?institution=UBB#autonomous',
  '/ubb#research': '/research?institution=UBB',
  '/ubb#publications': '/research?institution=UBB#publications',
}

/** Destination for a retired URL; null means the current URL is already live. */
export const legacyRedirect = (pathname, search = '', hash = '') => {
  const path = normalizePath(pathname)
  const memberLink = (path === '/' || path === '/network') && hash.startsWith('#member-')
  const anchorTarget = legacyAnchors[path + hash]
  const destination = memberLink ? '/team' : anchorTarget ?? findRoute(path)?.redirectTo
  if (!destination) return null

  const target = new URL(destination, SITE_URL)
  const params = new URLSearchParams(search)
  // An institution implied by an old institutional address takes precedence.
  for (const [key, value] of target.searchParams) params.set(key, value)

  const query = params.toString()
  const targetHash = anchorTarget ? target.hash : target.hash || hash
  return target.pathname + (query ? `?${query}` : '') + targetHash
}

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
