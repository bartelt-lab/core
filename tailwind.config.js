import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'

// Dark mode works by role, not by `dark:` variants on every element. The same
// colour name means different things per property: `bg-white` is a surface,
// `text-slate-900` is body text, `border-slate-200` is a hairline. So each role
// below reads its own CSS variable (declared in index.css), and `.dark` on
// <html> rebinds them: surfaces go dark, text goes light, hairlines go dim.
// Colours that are already dark-on-purpose (bg-slate-950, text-white,
// bg-primary-700 buttons) are not listed and stay exactly as they are.
// To keep something literally white in dark mode (a logo chip), use bg-[#fff].
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`

const surface = {
  white: v('bg-white'),
  slate: { 50: v('bg-slate-50'), 100: v('bg-slate-100'), 200: v('bg-slate-200'), 300: v('bg-slate-300') },
  primary: { 50: v('bg-primary-50'), 100: v('bg-primary-100'), 200: v('bg-primary-200') },
  site: { 100: v('bg-site-100') },
  // Pastel chips and notes (domain tags, status callouts).
  sky: { 50: v('bg-sky-50') },
  emerald: { 50: v('bg-emerald-50') },
  amber: { 50: v('bg-amber-50') },
  violet: { 50: v('bg-violet-50') },
  red: { 50: v('bg-red-50') },
  green: { 100: v('bg-green-100') },
  yellow: { 100: v('bg-yellow-100') },
}

const ink = {
  slate: {
    500: v('tx-slate-500'), 600: v('tx-slate-600'), 700: v('tx-slate-700'),
    800: v('tx-slate-800'), 900: v('tx-slate-900'), 950: v('tx-slate-950'),
  },
  primary: { 600: v('tx-primary-600'), 700: v('tx-primary-700'), 800: v('tx-primary-800'), 900: v('tx-primary-900') },
  site: { 900: v('tx-site-900') },
  tertiary: { 600: v('tx-tertiary-600') },
  sky: { 800: v('tx-sky') },
  emerald: { 700: v('tx-emerald'), 800: v('tx-emerald') },
  amber: { 700: v('tx-amber'), 800: v('tx-amber') },
  violet: { 700: v('tx-violet') },
  red: { 700: v('tx-red') },
  green: { 800: v('tx-green') },
  yellow: { 800: v('tx-yellow') },
}

const hairline = {
  white: v('bd-white'),
  slate: { 100: v('bd-slate-100'), 200: v('bd-slate-200'), 300: v('bd-slate-300'), 400: v('bd-slate-400') },
  primary: { 100: v('bd-primary-100'), 200: v('bd-primary-200'), 300: v('bd-primary-300') },
  // 900 is the accent line on panels and quotes: it lightens in dark mode.
  site: { 200: v('bd-site-200'), 900: v('bd-site-900') },
  sky: { 200: v('bd-sky') },
  emerald: { 100: v('bd-emerald'), 200: v('bd-emerald') },
  amber: { 200: v('bd-amber') },
  violet: { 100: v('bd-violet') },
  red: { 200: v('bd-red') },
}

const shade = {
  slate: { 100: v('sh-slate'), 200: v('sh-slate'), 300: v('sh-slate') },
  primary: { 100: v('sh-slate') },
}

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: surface,
      gradientColorStops: surface,
      textColor: ink,
      borderColor: hairline,
      divideColor: hairline,
      ringColor: hairline,
      boxShadowColor: shade,
      colors: {
        // Brand colors resolve through CSS variables declared in index.css, which
        // raw CSS also reads directly (see the note there). Single palette now —
        // the avocado/forest/blue runtime switcher was removed.
        primary: {
          50: 'rgb(var(--primary-50) / <alpha-value>)',
          100: 'rgb(var(--primary-100) / <alpha-value>)',
          200: 'rgb(var(--primary-200) / <alpha-value>)',
          300: 'rgb(var(--primary-300) / <alpha-value>)',
          400: 'rgb(var(--primary-400) / <alpha-value>)',
          500: 'rgb(var(--primary-500) / <alpha-value>)',
          600: 'rgb(var(--primary-600) / <alpha-value>)',
          700: 'rgb(var(--primary-700) / <alpha-value>)',
          800: 'rgb(var(--primary-800) / <alpha-value>)',
          900: 'rgb(var(--primary-900) / <alpha-value>)',
          950: 'rgb(var(--primary-950) / <alpha-value>)',
        },
        secondary: {
          50: 'rgb(var(--secondary-50) / <alpha-value>)',
          100: 'rgb(var(--secondary-100) / <alpha-value>)',
          200: 'rgb(var(--secondary-200) / <alpha-value>)',
          300: 'rgb(var(--secondary-300) / <alpha-value>)',
          400: 'rgb(var(--secondary-400) / <alpha-value>)',
          500: 'rgb(var(--secondary-500) / <alpha-value>)',
          600: 'rgb(var(--secondary-600) / <alpha-value>)',
          700: 'rgb(var(--secondary-700) / <alpha-value>)',
          800: 'rgb(var(--secondary-800) / <alpha-value>)',
          900: 'rgb(var(--secondary-900) / <alpha-value>)',
        },
        tertiary: {
          500: 'rgb(var(--tertiary-500) / <alpha-value>)',
          600: 'rgb(var(--tertiary-600) / <alpha-value>)',
          700: 'rgb(var(--tertiary-700) / <alpha-value>)',
        },
        // Host institution's colour, rebound per lab by a .theme-* class in
        // index.css and green everywhere else. Marks place, never action —
        // buttons, links and active states stay primary on every lab page.
        site: {
          100: 'rgb(var(--site-100) / <alpha-value>)',
          200: 'rgb(var(--site-200) / <alpha-value>)',
          300: 'rgb(var(--site-300) / <alpha-value>)',
          900: 'rgb(var(--site-900) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        // Drives the auto-advance progress bar on the active milestone. Duration is set
        // inline from the browser's autoCycleMs so the bar always matches the real timer.
        sweep: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
    },
  },
  plugins: [typography, forms],
}
