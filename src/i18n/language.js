import { createContext } from 'react'

export const STORAGE_KEY = 'core-language'
export const LANGUAGES = ['EN', 'DE']
export const DEFAULT_LANGUAGE = 'EN'

export const LanguageContext = createContext(null)
