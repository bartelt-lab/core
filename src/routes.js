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
 *   image        optional — og:image override, as a /public path
 */

import { news } from './data/news.js'

export const SITE_URL = 'https://www.core-network.ai'
export const SITE_NAME = 'CORE — Cognitive Software in Europe'
export const DEFAULT_OG_IMAGE = '/og-image.png'

export const DEFAULT_ROUTE_META = {
  title: SITE_NAME,
  description:
    'CORE is a network of researchers and research groups working on cognitive software, autonomous systems, and machine learning.',
}

// Shared by the live /industry-projects routes and their old /tuc aliases.
const INDUSTRY_PROJECTS_META = {
  title: 'Industry Projects | CORE',
  description:
    'Transfer and publicly funded projects of the Cognitive Software group, including AI-BIM, an AI-supported copilot for sustainable architectural design under environmental standards.',
}

const MEDICAR_META = {
  title: 'MediCar 4.0 | Industry Projects | CORE',
  description:
    'MediCar 4.0: autonomous hospital transport, tested at the University Medical Center Freiburg. Our part: LLM-based adaptive routing and robotics, trained on the GenAI-Cluster.',
  image: '/images/projects/industry/medicar/corridor.webp',
}

const JOIN_US_META = {
  title: 'Join Us | CORE',
  description:
    'Join the CORE Network as a researcher or research group, or find out where to ask for a PhD or student position with one of its groups.',
}

const JOIN_US_TUC_META = {
  title: 'Join Us in Goslar | Cognitive Software, TU Clausthal',
  description:
    'PhD positions and student assistant jobs with the Cognitive Software group at TU Clausthal in Goslar: what we offer, what you bring, and how to apply.',
}

const ICLR_2025_META = {
  title: 'CORE at ICLR and ICSE 2025 | CORE',
  description:
    'Papers by CORE members accepted at ICLR 2025 and ICSE 2025: SYMPOL, NNsight and NDIF, GUIDE, ReMeDe Trees, DSEG-LIME and more, with links to each paper.',
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
  },
  {
    path: '/news',
    source: 'src/data/news.js',
    title: 'News | CORE',
    description:
      'News from the CORE Network: people, projects and results from the Cognitive Software research group at TU Clausthal and the other research groups in the network.',
  },
  // One page per item in src/data/news.js. `source` is the data file, so
  // <lastmod> moves when an article is edited, not when the page layout is.
  ...news.map((item) => ({
    path: `/news/${item.slug}`,
    source: 'src/data/news.js',
    title: `${item.title[1]} | CORE`,
    description: item.teaser[1],
    image: item.image,
  })),
  {
    path: '/core-labs',
    source: 'src/pages/CoreLabs.jsx',
    title: 'CORE Labs',
    description:
      'The laboratories behind the CORE Network: robotics, multi-modal egocentric perception, spatial reasoning, and robot learning across Goslar, Cluj-Napoca, and Rostock.',
  },
  {
    path: '/demos',
    source: 'src/pages/Demos.jsx',
    title: 'Demonstrations | CORE',
    description:
      'Video demonstrations of CORE research systems, from autonomous navigation and mobile manipulation to laboratory automation.',
  },
  {
    path: '/publications',
    source: 'src/pages/Publications.jsx',
    title: 'Publications | CORE',
    description:
      'Peer-reviewed publications from the research groups of the CORE Network on cognitive software, autonomous systems, and machine learning.',
  },
  {
    path: '/industry-projects',
    source: 'src/pages/tuc/IndustryProjects.jsx',
    ...INDUSTRY_PROJECTS_META,
  },
  {
    path: '/industry-projects/medicar',
    source: 'src/pages/tuc/industry/MediCar.jsx',
    ...MEDICAR_META,
  },
  {
    path: '/join-us',
    source: 'src/pages/tuc/JoinUs.jsx',
    ...JOIN_US_META,
  },
  {
    path: '/join-us/tuc',
    source: 'src/pages/tuc/JoinUs.jsx',
    ...JOIN_US_TUC_META,
  },
  {
    path: '/iclr-2025',
    source: 'src/pages/Iclr2025.jsx',
    ...ICLR_2025_META,
  },
  {
    path: '/impressum',
    source: 'src/pages/legal/Impressum.jsx',
    title: 'Legal notice (Impressum) | CORE',
    description:
      'Legal notice for the CORE Network website: operator, postal address, contact details and the person responsible for content.',
  },
  {
    path: '/datenschutz',
    source: 'src/pages/legal/Datenschutz.jsx',
    title: 'Privacy policy (Datenschutzerklärung) | CORE',
    description:
      'Privacy policy of the CORE Network website: hosting, fonts, embedded videos, browser storage, email contact, and your rights under the GDPR.',
  },
  {
    path: '/compute-cluster',
    source: 'src/pages/ComputeCluster.jsx',
    title: 'Compute Cluster | CORE',
    description:
      'Shared GPU infrastructure for CORE researchers: NVIDIA H200 NVL and RTX PRO 6000 Blackwell nodes interconnected via NVLink, plus dataset storage and simulation environments.',
  },
  {
    path: '/dynamo',
    source: 'src/pages/Dynamo.jsx',
    title: 'DyNAMO | CORE',
    description:
      'Dynamic Navigation & Autonomous Manipulation Operations — a mobile robot system that combines navigation and autonomous manipulation in unstructured environments.',
  },
  {
    path: '/leader-following',
    source: 'src/pages/LeaderFollowing.jsx',
    title: 'Leader Following | CORE',
    description:
      'A mobile robot that detects, tracks, and follows a human leader through changing environments using onboard perception.',
  },
  {
    path: '/vial-sort',
    source: 'src/pages/VialSort.jsx',
    title: 'Vial Sort | CORE',
    description:
      'Language-conditioned laboratory vial sorting on a low-cost SO-101 arm, driven by a frozen-backbone pi0.5 vision-language-action policy trained from 150 teleoperated demonstrations.',
  },

  // ---------------------------------------------------- AI Team Projects ---
  {
    path: '/ai-team-projects',
    source: 'src/pages/tuc/AiTeamProjects.jsx',
    title: 'AI Team Projects | CORE',
    description:
      'Semester-long applied AI projects built by mixed international student teams — recommender systems, cognitive robotics, LLM agents, MLOps, and simulation tooling.',
  },
  {
    path: '/ai-team-projects/tempo',
    source: 'src/pages/tuc/projects/TempoProject.jsx',
    title: 'TEMPO | AI Team Projects',
    description:
      "A recommendation model that fine-tunes itself to each chess player's memory, learning to act as a personal guide to their opening repertoire.",
  },
  {
    path: '/ai-team-projects/lectra',
    source: 'src/pages/tuc/projects/LectraProject.jsx',
    title: 'LECTRA | AI Team Projects',
    description:
      'A planned course learning-platform demonstrator that combines course-material retrieval, a context-aware LLM assistant, and a lightweight model of each student’s topic-level learning state.',
    image: '/images/projects/lectra/workspace.webp',
  },
  {
    path: '/ai-team-projects/fastmile',
    source: 'src/pages/tuc/projects/FastMileProject.jsx',
    title: 'FastMile | AI Team Projects',
    description:
      'A planned real-time routing platform that merges data from several mobility providers into one intermodal journey, and uses language models to handle disruptions, cancellations, and events.',
  },
  {
    path: '/ai-team-projects/human-awareness-detection',
    source: 'src/pages/HumanAwarenessDetection.jsx',
    title: 'Visual Human Awareness Estimation | AI Team Projects',
    description:
      'A vision-based system combining person tracking, gaze, head and body orientation, motion, and gestures to estimate whether nearby people appear aware of a mobile robot.',
  },
  {
    path: '/ai-team-projects/ai4bim',
    source: 'src/pages/tuc/projects/AI4AIProject.jsx',
    title: 'AI4BIM | AI Team Projects',
    description:
      'Integrated web platform for IFC extraction, BIM question answering, XGBoost house-price prediction, room-image classification, and Stable Diffusion layout generation.',
  },
  {
    path: '/ai-team-projects/ai4ai',
    source: 'src/pages/tuc/projects/AI4AIProject.jsx',
    title: 'AI4BIM | AI Team Projects',
    description:
      'Integrated web platform for IFC extraction, BIM question answering, XGBoost house-price prediction, room-image classification, and Stable Diffusion layout generation.',
    canonical: '/ai-team-projects/ai4bim',
  },
  {
    path: '/ai-team-projects/vergabepilot',
    source: 'src/pages/tuc/projects/VergabepilotProject.jsx',
    title: 'Vergabepilot.AI | AI Team Projects',
    description:
      'Cost-aware tender data extraction across changing procurement portals, combining reusable scrapers, browser automation, AI-generated extraction, self-healing retries, and document processing.',
  },
  {
    path: '/ai-team-projects/werewolfs',
    source: 'src/pages/tuc/projects/WerewolfsProject.jsx',
    title: 'The Village at Scale | AI Team Projects',
    description:
      'Training LLM agents to reason and negotiate in Werewolf, combining supervised fine-tuning from clean gameplay with reinforcement learning through self-play.',
  },
  {
    path: '/ai-team-projects/neurocore',
    source: 'src/pages/tuc/projects/NeuroCoreProject.jsx',
    title: 'NeuroCore Dashboard | AI Team Projects',
    description:
      'Next.js dashboard that queries cluster nodes over SSH, parses nvidia-smi and Slurm data, and displays GPU health, running jobs, storage, training metrics, and benchmark history.',
  },
  {
    path: '/ai-team-projects/stratego',
    source: 'src/pages/tuc/projects/StrategoProject.jsx',
    title: 'Stratego — LLM Based Games | AI Team Projects',
    description:
      'Python benchmark that runs Ollama or Hugging Face models against each other in Stratego and logs prompts, moves, invalid actions, timing, outcomes, and player-position effects.',
  },
  {
    path: '/ai-team-projects/traffic-network',
    source: 'src/pages/tuc/projects/TrafficNetworkProject.jsx',
    title: 'Traffic Network Builder | AI Team Projects',
    description:
      'Unity editor for assembling road layouts from reusable pieces, exporting OpenDRIVE 1.4 files, and loading the generated maps into CARLA with Python helper scripts.',
  },
  {
    path: '/ai-team-projects/self-driving',
    source: 'src/pages/tuc/projects/SelfDrivingProject.jsx',
    title: 'Self-Driving 1:10 | AI Team Projects',
    description:
      'A 1:10 vehicle testbed that combines SLAM, perception, path planning, feedback control, and autonomous parking in a compact end-to-end autonomy stack.',
  },

  // ----------------------------------------------------------- TU Clausthal ---
  {
    path: '/tuc',
    source: 'src/pages/tuc/Home.jsx',
    title: 'Cognitive Software | TU Clausthal',
    description:
      'Research group at the Institute for Software and Systems Engineering (ISSE), TU Clausthal, exploring the intersection of artificial intelligence, cognitive computing, and software engineering.',
  },
  // Industry projects moved to /industry-projects; the old URLs forward there
  // (a <Navigate> in TucShell) and stay prerendered as aliases.
  {
    path: '/tuc/industry-projects',
    source: 'src/pages/tuc/IndustryProjects.jsx',
    ...INDUSTRY_PROJECTS_META,
    canonical: '/industry-projects',
  },
  {
    path: '/tuc/industry-projects/medicar',
    source: 'src/pages/tuc/industry/MediCar.jsx',
    ...MEDICAR_META,
    canonical: '/industry-projects/medicar',
  },
  {
    path: '/tuc/teaching',
    source: 'src/pages/tuc/Teaching.jsx',
    title: 'Teaching | Cognitive Software, TU Clausthal',
    description:
      'Courses, seminars, and thesis topics offered by the Cognitive Software group at the Institute for Software and Systems Engineering, TU Clausthal.',
  },
  {
    path: '/tuc/seminar',
    source: 'src/pages/tuc/Teaching.jsx',
    title: 'Seminars | Cognitive Software, TU Clausthal',
    description:
      'Seminars at TU Clausthal: all winter 2026/27 places are filled, and all listed topics have been assigned. Applications are closed.',
  },
  {
    path: '/tuc/theses',
    source: 'src/pages/tuc/Teaching.jsx',
    title: 'Theses | Cognitive Software, TU Clausthal',
    description:
      'Bachelor and master thesis topics in artificial intelligence, cognitive computing, and software engineering at the Institute for Software and Systems Engineering, TU Clausthal.',
  },
  // The ICLR 2025 page was a standalone static file at this address; it is a
  // normal page at /iclr-2025 now and the old URL forwards there.
  {
    path: '/tuc/iclr-2025',
    source: 'src/pages/Iclr2025.jsx',
    ...ICLR_2025_META,
    canonical: '/iclr-2025',
  },
  // The lab's Join Us page moved to /join-us/tuc; the old URL forwards there
  // like the two above.
  {
    path: '/tuc/join-us',
    source: 'src/pages/tuc/JoinUs.jsx',
    ...JOIN_US_TUC_META,
    canonical: '/join-us/tuc',
  },

  // -------------------------------------------------------------- UBB Cluj ---
  {
    path: '/ubb',
    source: 'src/pages/ubb/Home.jsx',
    title: 'CORE Cluj | Babeș-Bolyai University',
    description:
      'CORE Cluj: the researchers of the CORE Network at Babeș-Bolyai University in Cluj-Napoca. Their research in autonomous driving, simulation and machine learning, the Robotics Club for students, and who to contact.',
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
