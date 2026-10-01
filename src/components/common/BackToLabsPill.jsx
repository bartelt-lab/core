import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import useInstitution from '../../hooks/useInstitution'
import { useLanguage } from '../../i18n/useLanguage'

// Return from a research project to the project catalogue, retaining its filter.
// `variant="dark"` for placement on a dark hero (a white pill);
// `variant="light"` for a light header. Pass `className` for margin.
const VARIANTS = {
    dark: 'border-white/30 bg-white/90 text-primary-700 shadow-lg shadow-slate-950/30 hover:border-white hover:bg-white hover:text-primary-900',
    light: 'border-primary-200 bg-white/90 text-primary-700 shadow-lg shadow-primary-100/60 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-900',
}

const BackToLabsPill = ({ variant = 'light', label, className = '' }) => {
    const { withInstitution } = useInstitution()
    const { pick } = useLanguage()
    return (
        <Link
            to={withInstitution('/projects')}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] backdrop-blur transition hover:-translate-y-0.5 ${VARIANTS[variant]} ${className}`}
        >
            <FaArrowLeft className="h-3 w-3" aria-hidden="true" />
            {label || pick('Projects', 'Projekte')}
        </Link>
    )
}

export default BackToLabsPill
