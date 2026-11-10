import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FiMenu, FiX, FiChevronUp } from 'react-icons/fi';
import RightSidebar from '../common/RightSidebar';
import assetUrl from '../../utils/assetUrl';
import { useLanguage } from '../../i18n/useLanguage';
import { useTucStyle } from '../../pages/tuc/home/tucStyle';
import StylePreviewSwitch from './StylePreviewSwitch';

const CURRENT_YEAR = new Date().getFullYear();

// /tuc/seminar and /tuc/theses render the Teaching page on another tab.
const TEACHING_ALIASES = ['/tuc/seminar', '/tuc/theses'];

const TUC_NAV = [
    { to: '/tuc/industry-projects', label: ['Industrieprojekte', 'Industry Projects'] },
    { to: '/tuc/teaching', label: ['Lehre', 'Teaching'] },
    { to: '/tuc/join-us', label: ['Mitmachen', 'Join Us'], cta: true },
];

const NETWORK_NAV = [
    { to: '/network', label: ['CORE Network', 'CORE Network'] },
    { to: '/publications?institution=TUC', label: ['Publikationen', 'Publications'] },
    { to: '/ai-team-projects', label: ['AI-Team-Projekte', 'AI Team Projects'] },
];

// Per-look chrome. REVIEW SCAFFOLD: once a look is chosen, keep its entry and
// inline it; see pages/tuc/home/tucStyle.js.
const CHROME = {
    // A: light header, pill-shaped active state
    split: {
        font: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700&display=swap',
        type: "[&_:is(h1,h2,h3,h4)]:font-['Plus_Jakarta_Sans',Inter,sans-serif]",
        cta: (active) => `whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm transition ${active ? 'bg-primary-800' : 'bg-primary-700 hover:bg-primary-800'}`,
        header: 'bg-white/95 backdrop-blur border-b border-slate-200',
        topbar: false,
        main: 'pt-16',
        nav: (active) => `whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${active ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`,
        navGap: 'gap-1',
        divider: 'bg-slate-200',
        menu: 'border-slate-200 bg-white',
        mobile: (active) => `px-3 py-2 rounded-lg text-sm font-medium ${active ? 'bg-primary-50 text-primary-700' : 'text-slate-700 hover:bg-slate-100'}`,
        footer: 'border-t border-slate-200 bg-site-100/40 text-slate-600',
    },
    // B: quiet header; identity lives in the page's sticky rail
    rail: {
        font: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap',
        type: "font-['IBM_Plex_Sans',Inter,sans-serif] [&_:is(h1,h2,h3,h4)]:font-[inherit]",
        cta: (active) => `whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition ${active ? 'bg-primary-800 text-white' : 'border border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white'}`,
        header: 'bg-white border-b border-slate-200',
        topbar: false,
        main: 'pt-16',
        nav: (active) => `whitespace-nowrap font-['IBM_Plex_Sans',Inter,sans-serif] text-sm font-medium transition-colors border-b-2 py-5 ${active ? 'border-primary-600 text-slate-900' : 'border-transparent text-slate-600 hover:text-slate-900'}`,
        navGap: 'gap-6',
        divider: 'bg-slate-200',
        menu: 'border-slate-200 bg-white',
        mobile: (active) => `px-3 py-2 rounded text-sm font-medium ${active ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-50'}`,
        footer: 'border-t border-slate-200 bg-white text-slate-600',
    },
    // C: university-style two tiers, TU Clausthal green utility bar on top
    banded: {
        font: 'https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&display=swap',
        type: "font-['Source_Sans_3',Inter,sans-serif] [&_:is(h1,h2,h3,h4)]:font-[inherit]",
        cta: (active) => `whitespace-nowrap rounded-md px-4 py-2 text-[15px] font-semibold text-white transition ${active ? 'bg-primary-800' : 'bg-primary-700 hover:bg-primary-800'}`,
        header: 'bg-white shadow-sm',
        topbar: true,
        main: 'pt-24',
        nav: (active) => `whitespace-nowrap font-['Source_Sans_3',Inter,sans-serif] text-[15px] font-semibold transition-colors border-b-2 py-5 ${active ? 'border-primary-600 text-slate-900' : 'border-transparent text-slate-700 hover:border-slate-300 hover:text-slate-900'}`,
        navGap: 'gap-6',
        divider: 'bg-slate-200',
        menu: 'border-slate-200 bg-white',
        mobile: (active) => `px-3 py-2 rounded text-sm font-semibold ${active ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-50'}`,
        footer: 'border-t-4 border-site-900 bg-white text-slate-600',
    },
};

const Layout = ({ children }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const location = useLocation();
    const { pick } = useLanguage();
    const look = useTucStyle();
    const c = CHROME[look];
    const label = (item) => pick(item.label[1], item.label[0]);

    // Close the mobile nav whenever the route changes (incl. back/forward).
    const [prevPath, setPrevPath] = useState(location.pathname);
    if (prevPath !== location.pathname) {
        setPrevPath(location.pathname);
        setIsNavOpen(false);
    }

    const navLinks = (items, cls) =>
        items.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => cls(isActive || (item.to === '/tuc/teaching' && TEACHING_ALIASES.includes(location.pathname)))}>
                {label(item)}
            </NavLink>
        ));

    return (
        <div className={`theme-tuc min-h-screen flex flex-col bg-white text-slate-900 ${c.type}`}>
            <link rel="stylesheet" href={c.font} precedence="default" />
            <header className={`fixed top-0 inset-x-0 z-30 ${c.header}`}>
                {c.topbar && (
                    <div className="bg-site-900 text-white">
                        <div className="max-w-7xl mx-auto flex h-8 items-center justify-between px-4 text-xs sm:px-6">
                            <span className="truncate">{pick('Institute for Software and Systems Engineering · TU Clausthal', 'Institut für Software and Systems Engineering · TU Clausthal')}</span>
                            <a href="https://www.tu-clausthal.de" target="_blank" rel="noreferrer" className="hidden h-8 shrink-0 items-center underline-offset-2 hover:underline sm:inline-flex">tu-clausthal.de</a>
                        </div>
                    </div>
                )}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
                    <Link to="/tuc" className="flex items-center gap-3">
                        <img src={assetUrl('/logos/core/light-background/core_tuc.svg')} alt="Cognitive Software, TU Clausthal" className="h-12 w-auto" />
                    </Link>

                    <nav className={`hidden lg:flex items-center ${c.navGap}`}>
                        {navLinks(TUC_NAV.filter((i) => !i.cta), c.nav)}
                        <span className={`h-5 w-px ${c.divider}`} aria-hidden="true" />
                        {navLinks(NETWORK_NAV, c.nav)}
                        {navLinks(TUC_NAV.filter((i) => i.cta), c.cta)}
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
                    <div className={`lg:hidden border-t ${c.menu}`}>
                        <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
                            {navLinks(TUC_NAV, c.mobile)}
                            <div className={`my-2 h-px ${c.divider}`} />
                            <p className="px-3 pb-1 text-xs uppercase tracking-widest text-slate-600">CORE Network</p>
                            {navLinks(NETWORK_NAV, c.mobile)}
                        </nav>
                    </div>
                )}
            </header>

            <RightSidebar />

            <main className={`flex-grow ${c.main}`}>{children}</main>

            <footer className={c.footer}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
                    <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                        <div className="flex min-w-0 items-center gap-3">
                            <img
                                src={assetUrl('/logos/core/light-background/core_tuc.svg')}
                                alt="Cognitive Software, TU Clausthal"
                                loading="lazy"
                                decoding="async"
                                className="h-14 w-auto shrink-0"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs md:justify-end">
                            <span>Christian Bartelt, {CURRENT_YEAR}</span>
                            <span className={`hidden sm:inline-block h-4 w-px ${c.divider}`} aria-hidden="true" />
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

            <StylePreviewSwitch />
        </div>
    );
};

export default Layout;
