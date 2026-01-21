import { Routes, Route, HashRouter } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import RightSidebar from './components/common/RightSidebar'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import Demos from './pages/Demos'
import Network from './pages/Network'
import Dynamo from './pages/Dynamo'

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <RightSidebar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/demos" element={<Demos />} />
            <Route path="/network" element={<Network />} />
            <Route path="/dynamo" element={<Dynamo />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}

export default App
