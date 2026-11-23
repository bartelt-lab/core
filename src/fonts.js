// Site fonts, served from this site instead of Google Fonts, so that opening a
// page sends nothing to Google (see pages/legal/Datenschutz.jsx). The files
// come from the @fontsource packages (SIL Open Font License) and are bundled by
// Vite; the family names are unchanged, so tailwind.config.js needs no edit.
//
// Only the weights the site uses are loaded, in two subsets: `latin` covers
// English and German, `latin-ext` the Romanian letters (ș, ț) in names such as
// Babeș-Bolyai. The browser downloads a file only when a page needs it.
// IBM Plex Sans, used by /tuc alone, is loaded in components/tuc/fonts.js.

// Inter: body text (font-sans)
import '@fontsource/inter/latin-300.css'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/inter/latin-700.css'
import '@fontsource/inter/latin-ext-300.css'
import '@fontsource/inter/latin-ext-400.css'
import '@fontsource/inter/latin-ext-500.css'
import '@fontsource/inter/latin-ext-600.css'
import '@fontsource/inter/latin-ext-700.css'

// Poppins: headings (font-heading)
import '@fontsource/poppins/latin-600.css'
import '@fontsource/poppins/latin-700.css'
import '@fontsource/poppins/latin-800.css'
import '@fontsource/poppins/latin-ext-600.css'
import '@fontsource/poppins/latin-ext-700.css'
import '@fontsource/poppins/latin-ext-800.css'
