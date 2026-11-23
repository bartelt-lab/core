import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FiMenu, FiX, FiChevronUp } from 'react-icons/fi';
import RightSidebar from '../common/RightSidebar';
import ThemedLogo from '../common/ThemedLogo';
import { useLanguage } from '../../i18n/useLanguage';

const CURRENT_YEAR = new Date().getFullYear();
const LOGO = 'core_tuc';

// /tuc pages set in IBM Plex Sans, headings included (the global rule would otherwise
// give h1-h4 the CORE heading font). Loaded here, scoped to the /tuc shell.
const FONT = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap';
const TYPE = "font-['IBM_Plex_Sans',Inter,sans-serif] [&_:is(h1,h2,h3,h4)]:font-[inherit]";

// /tuc/seminar and /tuc/theses render the Teaching page on another tab.
const TEACHING_ALIASES = ['/tuc/seminar', '/tuc/theses'];

const TUC_NAV = [
    { to: '/tuc/teaching', label: ['Lehre', 'Teaching'] },
];

// Pages that live on the CORE Network site; these links leave the /tuc shell.
const NETWORK_NAV = [
    { to: '/network', label: ['CORE Network', 'CORE Network'] },
    { to: '/publications?institution=TUC', label: ['Publikationen', 'Publications'] },
    { to: '/industry-projects', label: ['Industrieprojekte', 'Industry Projects'] },
    { to: '/ai-team-projects', label: ['AI-Team-Projekte', 'AI Team Projects'] },
];

const JOIN = { to: '/join-us', label: ['Mitmachen', 'Join Us'] };

const navClass = (active) =>
    `whitespace-nowrap text-sm font-medium transition-colors border-b-2 py-5 ${
        active ? 'border-primary-600 text-slate-900' : 'border-transparent text-slate-600 hover:text-slate-900'
    }`;

const joinClass = (active) =>
    `whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition ${
        active ? 'bg-primary-800 text-white' : 'border border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white'
    }`;

const mobileClass = (active) =>
    `px-3 py-2 rounded text-sm font-medium ${active ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-50'}`;

const Layout = ({ children }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const location = useLocation();
    const { pick } = useLanguage();
    const label = (item) => pick(item.label[1], item.label[0]);

    // Close the mobile nav whenever the route changes (incl. back/forward).
    const [prevPath, setPrevPath] = useState(location.pathname);
    if (prevPath !== location.pathname) {
        setPrevPath(location.pathname);
        setIsNavOpen(false);
    }

    const navLinks = (items, cls) =>
        items.map((item) => (
            <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => cls(isActive || (item.to === '/tuc/teaching' && TEACHING_ALIASES.includes(location.pathname)))}
            >
                {label(item)}
            </NavLink>
        ));

    return (
        <div className={`theme-tuc min-h-screen flex flex-col bg-white text-slate-900 ${TYPE}`}>
            <link rel="stylesheet" href={FONT} precedence="default" />
            <header className="fixed top-0 inset-x-0 z-30 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
                    <Link to="/tuc" className="flex items-center gap-3">
                        <ThemedLogo name={LOGO} alt="Cognitive Software, TU Clausthal" className="h-12 w-auto" />
                    </Link>

                    <nav className="hidden lg:flex items-center gap-6">
                        {navLinks(TUC_NAV, navClass)}
                        <span className="h-5 w-px bg-slate-200" aria-hidden="true" />
                        {navLinks(NETWORK_NAV, navClass)}
                        {navLinks([JOIN], joinClass)}
                    </nav>

                    <button
                        type="button"
                        onClick={() => setIsNavOpen((v) => !v)}
                        className="lg:hidden p-2 text-slate-700 hover:text-slate-900"
                        aria-label={isNavOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isNavOpen}
                    >
                        {isNavOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                    </button>
                </div>

                {isNavOpen && (
                    <div className="lg:hidden border-t border-slate-200 bg-white">
                        <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
                            {navLinks([...TUC_NAV, JOIN], mobileClass)}
                            <div className="my-2 h-px bg-slate-200" />
                            <p className="px-3 pb-1 text-xs uppercase tracking-widest text-slate-600">CORE Network</p>
                            {navLinks(NETWORK_NAV, mobileClass)}
                        </nav>
                    </div>
                )}
            </header>

            <RightSidebar />

            <main className="flex-grow pt-16">{children}</main>

            <footer className="border-t border-slate-200 bg-white text-slate-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
                    <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                        <div className="flex min-w-0 items-center gap-3">
                            <ThemedLogo
                                name={LOGO}
                                alt="Cognitive Software, TU Clausthal"
                                loading="lazy"
                                decoding="async"
                                className="h-14 w-auto shrink-0"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs md:justify-end">
                            <span>Christian Bartelt, {CURRENT_YEAR}</span>
                            <span className="hidden sm:inline-block h-4 w-px bg-slate-200" aria-hidden="true" />
                            <button
                                type="button"
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-primary-300 hover:text-primary-700"
                                aria-label={pick('Back to top', 'Nach oben')}
                            >
                                <FiChevronUp size={16} />
                                {pick('Back to top', 'Nach oben')}
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
