import { lazy, Suspense } from 'react'
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import RightSidebar from './components/common/RightSidebar'
import Footer from './components/common/Footer'
import ScrollToTop from './components/common/ScrollToTop'
import SeoHead from './components/common/SeoHead'
import LanguageToggle from './components/common/LanguageToggle'
import LegacyRedirect from './components/common/LegacyRedirect'
import { LanguageProvider } from './i18n/LanguageContext'

// Shared sections and research projects.
const Home = lazy(() => import('./pages/Home'))
const SaschaMartonNvidia = lazy(() => import('./pages/news/SaschaMartonNvidia'))
const Research = lazy(() => import('./pages/Research'))
const Projects = lazy(() => import('./pages/Projects'))
const Teaching = lazy(() => import('./pages/Teaching'))
const Labs = lazy(() => import('./pages/Labs'))
const Team = lazy(() => import('./pages/Team'))
const RoboticsLab = lazy(() => import('./pages/labs/RoboticsLab'))
const ClujLab = lazy(() => import('./pages/labs/ClujLab'))
const Dynamo = lazy(() => import('./pages/Dynamo'))
const LeaderFollowing = lazy(() => import('./pages/LeaderFollowing'))
const HumanAwarenessDetection = lazy(() => import('./pages/HumanAwarenessDetection'))
const VialSort = lazy(() => import('./pages/VialSort'))
const ComputeCluster = lazy(() => import('./pages/ComputeCluster'))

// Published student-project URLs stay stable under Teaching.
const TucTempoProject = lazy(() => import('./pages/tuc/projects/TempoProject'))
const TucLectraProject = lazy(() => import('./pages/tuc/projects/LectraProject'))
const TucFastMileProject = lazy(() => import('./pages/tuc/projects/FastMileProject'))
const TucAI4AIProject = lazy(() => import('./pages/tuc/projects/AI4AIProject'))
const TucVergabepilotProject = lazy(() => import('./pages/tuc/projects/VergabepilotProject'))
const TucWerewolfsProject = lazy(() => import('./pages/tuc/projects/WerewolfsProject'))
const TucNeuroCoreProject = lazy(() => import('./pages/tuc/projects/NeuroCoreProject'))
const TucStrategoProject = lazy(() => import('./pages/tuc/projects/StrategoProject'))
const TucTrafficNetworkProject = lazy(() => import('./pages/tuc/projects/TrafficNetworkProject'))
const TucSelfDrivingProject = lazy(() => import('./pages/tuc/projects/SelfDrivingProject'))

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
  </div>
)

function CoreShell() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <RightSidebar />
      <main id="main-content" tabIndex={-1} className="flex-grow">
        <Suspense fallback={<LoadingFallback />}>
          <LegacyRedirect>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/news/sascha-marton-nvidia" element={<SaschaMartonNvidia />} />
              <Route path="/research" element={<Research />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/teaching" element={<Teaching />} />
              <Route path="/labs" element={<Labs />} />
              <Route path="/team" element={<Team />} />
              <Route path="/labs/robotics" element={<RoboticsLab />} />
              <Route path="/labs/cluj" element={<ClujLab />} />
              <Route path="/dynamo" element={<Dynamo />} />
              <Route path="/leader-following" element={<LeaderFollowing />} />
              <Route path="/vial-sort" element={<VialSort />} />
              <Route path="/ai-team-projects/human-awareness-detection" element={<HumanAwarenessDetection />} />
              <Route path="/ai-team-projects/tempo" element={<TucTempoProject />} />
              <Route path="/ai-team-projects/lectra" element={<TucLectraProject />} />
              <Route path="/ai-team-projects/fastmile" element={<TucFastMileProject />} />
              <Route path="/ai-team-projects/ai4bim" element={<TucAI4AIProject />} />
              <Route path="/ai-team-projects/vergabepilot" element={<TucVergabepilotProject />} />
              <Route path="/ai-team-projects/werewolfs" element={<TucWerewolfsProject />} />
              <Route path="/ai-team-projects/neurocore" element={<TucNeuroCoreProject />} />
              <Route path="/ai-team-projects/stratego" element={<TucStrategoProject />} />
              <Route path="/ai-team-projects/traffic-network" element={<TucTrafficNetworkProject />} />
              <Route path="/ai-team-projects/self-driving" element={<TucSelfDrivingProject />} />
              <Route path="/compute-cluster" element={<ComputeCluster />} />
              <Route path="*" element={(
                <section className="mx-auto max-w-3xl px-6 py-32 text-center">
                  <h1 className="text-3xl font-semibold text-slate-950">Page not found</h1>
                  <p className="mt-4 text-slate-600">This address does not match a page in the CORE Network.</p>
                  <Link to="/" className="mt-6 inline-block font-semibold text-primary-700 underline">Back to home</Link>
                </section>
              )} />
            </Routes>
          </LegacyRedirect>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <SeoHead />
        <ScrollToTop />
        <LanguageToggle />
        <CoreShell />
      </LanguageProvider>
    </BrowserRouter>
  )
}

export default App
