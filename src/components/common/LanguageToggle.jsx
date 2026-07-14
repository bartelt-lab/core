import { LANGUAGES } from '../../i18n/language'
import { useLanguage } from '../../i18n/useLanguage'

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="fixed bottom-4 left-4 z-[70] inline-flex items-center rounded-full border border-gray-200 bg-white/90 p-1 text-xs font-bold shadow-lg backdrop-blur-md">
      {LANGUAGES.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLanguage(item)}
          aria-pressed={language === item}
          className={`rounded-full px-3 py-1.5 transition ${
            language === item
              ? 'bg-primary-600 text-white shadow-sm'
              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

export default LanguageToggle
