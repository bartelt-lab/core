import { useEffect, useState } from 'react'

const STORAGE_KEY = 'core-theme'

const THEMES = [
  { value: 'avocado', label: 'Avocado theme', swatch: '#009020' },
  { value: 'blue', label: 'Blue theme', swatch: '#2563eb' },
  { value: 'forest', label: 'Forest theme', swatch: '#538d58' },
]

const DEFAULT_THEME = 'avocado'
const VALID_THEMES = new Set(THEMES.map((t) => t.value))

const getInitialTheme = () => {
  if (typeof localStorage === 'undefined') return DEFAULT_THEME
  const stored = localStorage.getItem(STORAGE_KEY)
  return VALID_THEMES.has(stored) ? stored : DEFAULT_THEME
}

const ThemeToggle = () => {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    if (theme === DEFAULT_THEME) {
      root.removeAttribute('data-theme')
    } else {
      root.setAttribute('data-theme', theme)
    }
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/90 p-1.5 shadow-lg backdrop-blur-md">
      {THEMES.map((t) => (
        <button
          key={t.value}
          type="button"
          onClick={() => setTheme(t.value)}
          title={t.label}
          aria-label={t.label}
          aria-pressed={theme === t.value}
          className={`h-6 w-6 rounded-full border border-black/10 transition ${
            theme === t.value
              ? 'ring-2 ring-gray-900 ring-offset-1'
              : 'opacity-50 hover:opacity-100'
          }`}
          style={{ backgroundColor: t.swatch }}
        />
      ))}
    </div>
  )
}

export default ThemeToggle
