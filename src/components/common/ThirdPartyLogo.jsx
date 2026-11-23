import assetUrl from '../../utils/assetUrl'

// Logos that have a dark-mode file in public/logos/dark/, written by
// scripts/dark-logos.mjs. Keep this list equal to the JOBS list there.
const DARK = new Set([
  'clausthal-logo.webp',
  'tu-clausthal.webp',
  'digit.webp',
  'rostock-logo.webp',
  'universitaet-rostock.webp',
  'ubb-logo.webp',
  'ubb-logo-only.webp',
])

// A university or partner logo that stays visible in dark mode.
//   src: path under public/, with or without the leading slash
// With a dark-mode file, both versions are rendered and CSS shows the fitting
// one (same trick as ThemedLogo, so prerendered HTML is right for either
// theme). Without one, the logo gets `logo-plate`: a white plate in dark mode.
const ThirdPartyLogo = ({ src, alt, className = '', ...rest }) => {
  const path = src.startsWith('/') ? src : `/${src}`
  const file = path.replace(/^\/logos\//, '')
  // CORE's own marks already ship in a dark-background variant of the same name.
  const CORE_LIGHT = '/logos/core/light-background/'
  const dark = DARK.has(file)
    ? `/logos/dark/${file}`
    : path.startsWith(CORE_LIGHT)
      ? path.replace(CORE_LIGHT, '/logos/core/dark-background/')
      : null

  if (!dark) {
    return <img src={assetUrl(path)} alt={alt} className={`logo-plate ${className}`} {...rest} />
  }

  return (
    <>
      <img src={assetUrl(path)} alt={alt} className={`${className} dark:hidden`} {...rest} />
      <img src={assetUrl(dark)} alt={alt} className={`${className} hidden dark:block`} {...rest} />
    </>
  )
}

export default ThirdPartyLogo
