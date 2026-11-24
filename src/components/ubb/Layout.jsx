import { Link } from 'react-router-dom'
import LabHeader from '../common/LabHeader'
import LegalLinks from '../common/LegalLinks'
import ThirdPartyLogo from '../common/ThirdPartyLogo'

// The header is common/LabHeader.jsx, shared with /tuc. This is what CORE
// Cluj puts in it. Each entry is a section of the /ubb home page (the ids are
// set in pages/ubb/Home.jsx). Text pairs are [German, English].
const LAB_NAV = [
  { to: '/ubb#robotics-club', section: 'robotics-club', label: ['Robotics Club', 'Robotics Club'] },
  { to: '/ubb#research', section: 'research', label: ['Forschung', 'Research'] },
  { to: '/ubb#contact', section: 'contact', label: ['Kontakt', 'Contact'] },
]

// Every section of the home page with an id, in page order. "network" has no
// entry in the bar: while it is on screen nothing is highlighted.
const HOME_SECTIONS = ['robotics-club', 'research', 'network', 'contact']

// The network's Join Us page, at the list of groups: the Cluj card there names
// who to write to. CORE Cluj has no Join Us page of its own.
const JOIN = { to: '/join-us#positions', label: ['Mitmachen', 'Join Us'] }

const UbbLayout = ({ children }) => {
  return (
    // theme-ubb rebinds --site-* to the Babeș-Bolyai seal blue for this subtree
    // (index.css). Static class, so the prerendered HTML and the hydrated client
    // resolve the same colours.
    <div className="theme-ubb min-h-screen bg-white text-slate-950">
      <LabHeader
        lab="UBB"
        home="/ubb"
        logoLabel="CORE Cluj home"
        logo={
          <>
            <ThirdPartyLogo src="/logos/ubb-logo-only.webp" alt="" className="h-10 w-10 object-contain" />
            <div className="leading-tight">
              <p className="text-sm font-bold tracking-tight text-slate-950">CORE Cluj</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">Babeș-Bolyai University</p>
            </div>
          </>
        }
        nav={LAB_NAV}
        sections={HOME_SECTIONS}
        join={JOIN}
      />

      <main>{children}</main>

      <footer className="border-t border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-10 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <div>
            <p className="font-semibold">CORE Cluj</p>
            <p className="mt-1 text-sm text-slate-400">Babeș-Bolyai University · Cluj-Napoca</p>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-300">
            <Link to="/publications?institution=UBB" className="hover:text-white">Publications</Link>
            <Link to="/" className="hover:text-white">CORE Network</Link>
            <LegalLinks tone="dark" />
          </div>
        </div>
      </footer>
    </div>
  )
}

export default UbbLayout
