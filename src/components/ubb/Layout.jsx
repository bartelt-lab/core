import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import assetUrl from '../../utils/assetUrl'

const sectionLinks = [
  { id: 'autonomous', label: 'Autonomous Driving Lab' },
  { id: 'research', label: 'Research' },
]

const UbbLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setIsOpen(false)
  }

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 md:px-8">
          <Link to="/ubb" className="flex items-center gap-3" aria-label="CORE Labs Cluj home">
            <img src={assetUrl('/logos/ubb-logo-only.webp')} alt="" className="h-10 w-10 object-contain" />
            <div className="leading-tight">
              <p className="text-sm font-bold tracking-tight text-slate-950">CORE Labs Cluj</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Babeș-Bolyai University</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {sectionLinks.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-semibold text-slate-500 transition hover:text-slate-950"
              >
                {item.label}
              </button>
            ))}
            <span className="h-5 w-px bg-slate-200" aria-hidden="true" />
            <Link to="/publications?institution=UBB" className="text-sm font-semibold text-slate-600 transition hover:text-sky-700">
              Publications
            </Link>
            <Link to="/" className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700">
              CORE Network
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="rounded-lg p-2 text-slate-700 md:hidden"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {isOpen && (
          <nav className="border-t border-slate-200 bg-white px-5 py-4 md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {sectionLinks.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  {item.label}
                </button>
              ))}
              <Link to="/publications?institution=UBB" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                Publications
              </Link>
              <Link to="/" className="mt-2 rounded-lg bg-slate-950 px-3 py-2 text-center text-sm font-semibold text-white">
                CORE Network
              </Link>
            </div>
          </nav>
        )}
      </header>

      <main>{children}</main>

      <footer className="border-t border-slate-200 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-10 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <div>
            <p className="font-semibold">CORE Labs Cluj</p>
            <p className="mt-1 text-sm text-slate-400">Babeș-Bolyai University · Cluj-Napoca</p>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-300">
            <Link to="/publications?institution=UBB" className="hover:text-white">Publications</Link>
            <Link to="/" className="hover:text-white">CORE Network</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default UbbLayout
