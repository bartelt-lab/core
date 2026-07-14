import { useLayoutEffect } from 'react'

const STORAGE_KEY = 'core-theme'
const DEFAULT_THEME = 'avocado'

const applyTheme = (theme) => {
  const root = document.documentElement
  if (theme === DEFAULT_THEME) {
    root.removeAttribute('data-theme')
  } else {
    root.setAttribute('data-theme', theme)
  }
}

const ThemeToggle = () => {
  useLayoutEffect(() => {
    applyTheme(DEFAULT_THEME)
    localStorage.setItem(STORAGE_KEY, DEFAULT_THEME)
  }, [])

  return null
}

export default ThemeToggle
