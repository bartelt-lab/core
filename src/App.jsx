import { lazy, Suspense } from 'react'
import { Routes, Route, HashRouter } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import RightSidebar from './components/common/RightSidebar'
import Footer from './components/common/Footer'
import ScrollToTop from './components/common/ScrollToTop'

// Lazy load pages
const Home = lazy(() => import('./pages/Home'))
const Demos = lazy(() => import('./pages/Demos'))
const Network = lazy(() => import('./pages/Network'))
const Dynamo = lazy(() => import('./pages/Dynamo'))

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
  </div>
)

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <RightSidebar />
        <main className="flex-grow">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/demos" element={<Demos />} />
              <Route path="/network" element={<Network />} />
              <Route path="/dynamo" element={<Dynamo />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}

export default App
