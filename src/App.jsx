import { lazy, Suspense } from 'react'
import { Routes, Route, HashRouter } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import RightSidebar from './components/common/RightSidebar'
import Footer from './components/common/Footer'
import ScrollToTop from './components/common/ScrollToTop'
import ThemeToggle from './components/common/ThemeToggle'
import LanguageToggle from './components/common/LanguageToggle'
import { LanguageProvider } from './i18n/LanguageContext'
import TucLayout from './components/tuc/Layout'
import UbbLayout from './components/ubb/Layout'

// CORE pages
const Home = lazy(() => import('./pages/Home'))
const CoreLabs = lazy(() => import('./pages/CoreLabs'))
const Demos = lazy(() => import('./pages/Demos'))
const Dynamo = lazy(() => import('./pages/Dynamo'))
const LeaderFollowing = lazy(() => import('./pages/LeaderFollowing'))
const VialSort = lazy(() => import('./pages/VialSort'))
const ComputeCluster = lazy(() => import('./pages/ComputeCluster'))
const Publications = lazy(() => import('./pages/Publications'))
const UbbHome = lazy(() => import('./pages/ubb/Home'))

// /tuc/* pages
const TucHome = lazy(() => import('./pages/tuc/Home'))
const TucIndustryProjects = lazy(() => import('./pages/tuc/IndustryProjects'))
const TucTeaching = lazy(() => import('./pages/tuc/Teaching'))
const TucJoinUs = lazy(() => import('./pages/tuc/JoinUs'))
const TucProjects = lazy(() => import('./pages/tuc/Projects'))
const TucAiTeamProjects = lazy(() => import('./pages/tuc/AiTeamProjects'))
const TucDynamoProject = lazy(() => import('./pages/tuc/projects/DynamoProject'))
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
      <main className="flex-grow">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/core-labs" element={<CoreLabs />} />
            <Route path="/demos" element={<Demos />} />
            <Route path="/network" element={<Home />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/dynamo" element={<Dynamo />} />
            <Route path="/leader-following" element={<LeaderFollowing />} />
            <Route path="/vial-sort" element={<VialSort />} />
            <Route path="/ai-team-projects" element={<TucAiTeamProjects />} />
            <Route path="/ai-team-projects/dynamo" element={<TucDynamoProject />} />
            <Route path="/ai-team-projects/ai4ai" element={<TucAI4AIProject />} />
            <Route path="/ai-team-projects/ai4bim" element={<TucAI4AIProject />} />
            <Route path="/ai-team-projects/vergabepilot" element={<TucVergabepilotProject />} />
            <Route path="/ai-team-projects/werewolfs" element={<TucWerewolfsProject />} />
            <Route path="/ai-team-projects/neurocore" element={<TucNeuroCoreProject />} />
            <Route path="/ai-team-projects/stratego" element={<TucStrategoProject />} />
            <Route path="/ai-team-projects/traffic-network" element={<TucTrafficNetworkProject />} />
            <Route path="/ai-team-projects/self-driving" element={<TucSelfDrivingProject />} />
            <Route path="/compute-cluster" element={<ComputeCluster />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

function TucShell() {
  return (
    <TucLayout>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<TucHome />} />
          <Route path="/industry-projects" element={<TucIndustryProjects />} />
          <Route path="/teaching" element={<TucTeaching />} />
          <Route path="/join-us" element={<TucJoinUs />} />
          <Route path="/projects" element={<TucProjects />} />
          <Route path="/seminar" element={<TucTeaching initialSection="seminars" />} />
          <Route path="/theses" element={<TucTeaching initialSection="theses" />} />
        </Routes>
      </Suspense>
    </TucLayout>
  )
}

function UbbShell() {
  return (
    <UbbLayout>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<UbbHome />} />
        </Routes>
      </Suspense>
    </UbbLayout>
  )
}

function App() {
  return (
    <HashRouter>
      <LanguageProvider>
        <ScrollToTop />
        <ThemeToggle />
        <LanguageToggle />
        <Routes>
          <Route path="/tuc/*" element={<TucShell />} />
          <Route path="/ubb/*" element={<UbbShell />} />
          <Route path="/*" element={<CoreShell />} />
        </Routes>
      </LanguageProvider>
    </HashRouter>
  )
}

export default App
