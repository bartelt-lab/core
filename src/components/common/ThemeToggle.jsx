import { useState } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'
import { useLanguage } from '../../i18n/useLanguage'

// Must match the inline script in index.html, which applies the stored theme
// before first paint so a dark-mode visitor never sees a white flash.
const STORAGE_KEY = 'core-theme'

const isDark = () =>
  typeof document !== 'undefined' && document.documentElement.classList.contains('dark')

// The theme lives as a `dark` class on <html> (see the role tokens in
// index.css). Light is the default; the choice is remembered per browser.
const ThemeToggle = () => {
  const { pick } = useLanguage()
  const [dark, setDark] = useState(isDark)

  const toggle = () => {
    const next = !dark
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light')
    } catch {
      // Private mode or blocked storage: the theme still applies for this visit.
    }
    setDark(next)
  }

  const label = dark
    ? pick('Switch to light mode', 'Zum hellen Design wechseln')
    : pick('Switch to dark mode', 'Zum dunklen Design wechseln')

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      aria-pressed={dark}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-600 shadow-lg backdrop-blur-md transition hover:text-slate-900"
    >
      {dark ? <FiSun className="h-4 w-4" aria-hidden="true" /> : <FiMoon className="h-4 w-4" aria-hidden="true" />}
    </button>
  )
}

export default ThemeToggle
