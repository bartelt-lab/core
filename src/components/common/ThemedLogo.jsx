import assetUrl from '../../utils/assetUrl'

// A CORE logo that follows the theme. public/logos/core/ carries every mark in
// a light-background and a dark-background variant under the same file name;
// both are rendered and CSS shows the one that fits, so the prerendered HTML
// is right for either theme without waiting for JavaScript.
//   name: file name without extension, e.g. "core" or "core_tuc"
const ThemedLogo = ({ name, alt, className = '', ...rest }) => (
  <>
    <img src={assetUrl(`/logos/core/light-background/${name}.svg`)} alt={alt} className={`${className} dark:hidden`} {...rest} />
    <img src={assetUrl(`/logos/core/dark-background/${name}.svg`)} alt={alt} className={`${className} hidden dark:block`} {...rest} />
  </>
)

export default ThemedLogo
