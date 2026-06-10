import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FiMenu, FiX, FiChevronUp } from 'react-icons/fi';
import RightSidebar from '../common/RightSidebar';
import assetUrl from '../../utils/assetUrl';

const CURRENT_YEAR = new Date().getFullYear();

const TUC_NAV = [
    { to: '/tuc/industry-projects', label: 'Industrieprojekte' },
    { to: '/tuc/teaching', label: 'Teaching' },
    { to: '/tuc/join-us', label: 'Join Us' },
];

const NETWORK_NAV = [
    { to: '/network', label: 'CORE Network' },
    { to: '/publications', label: 'Publications' },
    { to: '/ai-team-projects', label: 'AI Team Projects' },
];

const navClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
        isActive ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
    }`;

const mobileNavClass = ({ isActive }) =>
    `px-3 py-2 rounded text-sm font-medium ${
        isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`;

const Layout = ({ children }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const location = useLocation();

    // Close the mobile nav whenever the route changes (incl. back/forward).
    const [prevPath, setPrevPath] = useState(location.pathname);
    if (prevPath !== location.pathname) {
        setPrevPath(location.pathname);
        setIsNavOpen(false);
    }

    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-900">
            <header className="fixed top-0 inset-x-0 z-30 bg-white border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
                    <Link to="/tuc" className="flex items-center gap-3">
                        <img
                            src={assetUrl('/logos/core/core-with-tuc-logo.webp')}
                            alt="Research group logo"
                            className="h-12 w-auto"
                        />
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">
                        {TUC_NAV.map((item) => (
                            <NavLink key={item.to} to={item.to} className={navClass}>
                                {item.label}
                            </NavLink>
                        ))}
                        <span className="h-5 w-px bg-gray-300" aria-hidden="true" />
                        {NETWORK_NAV.map((item) => (
                            <NavLink key={item.to} to={item.to} className={navClass}>
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    <button
                        type="button"
                        onClick={() => setIsNavOpen((v) => !v)}
                        className="md:hidden p-2 text-gray-700 hover:text-gray-900"
                        aria-label={isNavOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isNavOpen}
                    >
                        {isNavOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                    </button>
                </div>

                {isNavOpen && (
                    <div className="md:hidden border-t border-gray-200 bg-white">
                        <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
                            {TUC_NAV.map((item) => (
                                <NavLink key={item.to} to={item.to} className={mobileNavClass}>
                                    {item.label}
                                </NavLink>
                            ))}
                            <div className="my-2 border-t border-gray-200" />
                            <p className="px-3 pb-1 text-xs uppercase tracking-widest text-gray-400">CORE Network</p>
                            {NETWORK_NAV.map((item) => (
                                <NavLink key={item.to} to={item.to} className={mobileNavClass}>
                                    {item.label}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                )}
            </header>

            <RightSidebar />

            <main className="flex-grow pt-16">{children}</main>

            <footer className="border-t border-slate-200 bg-gradient-to-b from-white to-slate-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
                    <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                        <div className="flex min-w-0 items-center gap-3">
                            <img
                                src={assetUrl('/logos/core/core-with-cognitive-software.webp')}
                                alt="Cognitive Software, TU Clausthal"
                                loading="lazy"
                                decoding="async"
                                className="h-14 w-auto shrink-0"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 md:justify-end">
                            <span>Christian Bartelt, {CURRENT_YEAR}</span>
                            <span className="hidden sm:inline-block h-4 w-px bg-slate-300" aria-hidden="true" />
                            <button
                                type="button"
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-primary-300 hover:text-primary-700"
                                aria-label="Back to top"
                            >
                                <FiChevronUp size={16} />
                                Back to top
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
