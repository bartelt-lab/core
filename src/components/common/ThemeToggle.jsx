import { useLayoutEffect, useState } from 'react'

const STORAGE_KEY = 'core-theme'

const THEMES = [
  { value: 'avocado', label: 'Avocado theme', swatch: '#009020' },
  { value: 'blue', label: 'Blue theme', swatch: '#2563eb' },
]

const getInitialTheme = () => {
  if (typeof localStorage === 'undefined') return 'avocado'
  return localStorage.getItem(STORAGE_KEY) === 'blue' ? 'blue' : 'avocado'
}

const applyTheme = (theme) => {
  const root = document.documentElement
  if (theme === 'blue') {
    root.setAttribute('data-theme', 'blue')
  } else {
    root.removeAttribute('data-theme')
  }
}

const ThemeToggle = () => {
  const [theme, setTheme] = useState(getInitialTheme)

  useLayoutEffect(() => {
    applyTheme(theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/90 p-1.5 shadow-lg backdrop-blur-md">
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
