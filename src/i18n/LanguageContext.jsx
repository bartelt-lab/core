import { useLayoutEffect, useMemo, useState } from 'react'
import { DEFAULT_LANGUAGE, LANGUAGES, LanguageContext, STORAGE_KEY } from './language'

const getInitialLanguage = () => {
  if (typeof localStorage === 'undefined') return DEFAULT_LANGUAGE
  const stored = localStorage.getItem(STORAGE_KEY)
  return LANGUAGES.includes(stored) ? stored : DEFAULT_LANGUAGE
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(getInitialLanguage)

  useLayoutEffect(() => {
    document.documentElement.lang = language.toLowerCase()
    localStorage.setItem(STORAGE_KEY, language)
  }, [language])

  const value = useMemo(() => ({
    language,
    setLanguage,
    pick: (english, german) => (language === 'DE' ? german : english),
  }), [language])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
