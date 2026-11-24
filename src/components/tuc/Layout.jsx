import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FiArrowLeft, FiArrowUpRight, FiChevronUp, FiMenu, FiX } from 'react-icons/fi';
import RightSidebar from '../common/RightSidebar';
import ThemedLogo from '../common/ThemedLogo';
import ShellLink from '../common/ShellLink';
import LegalLinks from '../common/LegalLinks';
import { useLanguage } from '../../i18n/useLanguage';
import './fonts.js';

const CURRENT_YEAR = new Date().getFullYear();
const LOGO = 'core_tuc';

// /tuc pages set in IBM Plex Sans, headings included (the global rule would otherwise
// give h1-h4 the CORE heading font). The font files come from ./fonts.js.
const TYPE = "font-['IBM_Plex_Sans',Inter,sans-serif] [&_:is(h1,h2,h3,h4)]:font-[inherit]";

// /tuc/seminar and /tuc/theses render the Teaching page on another tab.
const TEACHING_ALIASES = ['/tuc/seminar', '/tuc/theses'];

// The navigation has two tiers, so that it is plain which links belong to the
// lab and which leave for the network site:
//   top row (lg up)  two capsules: the CORE Network pages in the dark one,
//                    which is the network navbar's own dark pill in small,
//                    and the lab switch
//   bar              the lab itself: its sections, Teaching, Join Us
// Below lg the top row folds into the menu, under its own headings.
//
// Links that leave the lab are ShellLinks: on the way to the network site the
// capsules, the logo and Join Us morph into their counterparts in its navbar.
// The `viewTransitionName`s below pair them up (see common/ShellLink.jsx).

// The lab's own navigation. An entry with `section` is a section of the /tuc
// home page (the ids are set in pages/tuc/Home.jsx).
const LAB_NAV = [
    { to: '/tuc#people', section: 'people', label: ['Personen', 'People'] },
    { to: '/tuc#research', section: 'research', label: ['Forschung', 'Research'] },
    { to: '/tuc/teaching', label: ['Lehre', 'Teaching'] },
    { to: '/tuc#contact', section: 'contact', label: ['Kontakt', 'Contact'] },
];

// Pages that live on the CORE Network site; these links leave the /tuc shell.
const NETWORK_HOME = { to: '/network', label: ['CORE Network', 'CORE Network'] };
const NETWORK_NAV = [
    { to: '/publications?institution=TUC', label: ['Publikationen', 'Publications'] },
    { to: '/industry-projects', label: ['Industrieprojekte', 'Industry Projects'] },
    { to: '/core-labs', label: ['CORE Labs', 'CORE Labs'] },
    { to: '/ai-team-projects', label: ['AI-Team-Projekte', 'AI Team Projects'] },
    { to: '/compute-cluster', label: ['Rechencluster', 'Compute Cluster'] },
];

const OTHER_LABS = [
    { initials: 'MDS', href: 'https://www.mds-lab.de/', name: 'MDS Lab, Rostock' },
    { initials: 'UBB', to: '/ubb', name: 'Babeș-Bolyai lab, Cluj-Napoca' },
];

// The lab's own Join Us page (working in Goslar), not the network's /join-us.
const JOIN = { to: '/join-us/tuc', label: ['Mitmachen', 'Join Us'] };

// Every section of the home page, in page order, for the highlight in the bar.
// "work" has no entry in the bar: while it is on screen nothing is highlighted.
const HOME_SECTIONS = ['people', 'research', 'work', 'contact'];
// A section counts as current once its top passes this many px from the top
// of the window: just below the header and the sections' scroll margin.
const CURRENT_LINE = 160;

const navClass = (active) =>
    `flex h-14 items-center whitespace-nowrap border-b-2 text-sm font-medium transition-colors ${
        active ? 'border-primary-600 text-slate-900' : 'border-transparent text-slate-600 hover:text-slate-900'
    }`;

const labClass = 'flex h-6 items-center gap-0.5 rounded-full px-2.5 text-[11px] font-semibold';

const joinClass = (active) =>
    `whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition ${
        active ? 'bg-primary-800 text-white' : 'border border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white'
    }`;

const menuHeading = 'px-3 pb-1 pt-1 text-xs font-semibold text-slate-500';

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

    const path = location.pathname.replace(/\/$/, '');
    const onHome = path === '/tuc';

    // Which section of the home page is on screen. Read on scroll rather than
    // observed, because the page is lazy: its sections may not exist yet when
    // this runs, and an observer would have nothing to attach to.
    const [currentSection, setCurrentSection] = useState(null);
    useEffect(() => {
        if (!onHome) return undefined;
        let frame = 0;
        const read = () => {
            frame = 0;
            let current = null;
            for (const id of HOME_SECTIONS) {
                const element = document.getElementById(id);
                if (element && element.getBoundingClientRect().top <= CURRENT_LINE) current = id;
            }
            // The last section is short: at the bottom of the page it is the
            // current one even though its top never reaches the line.
            const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
            if (atBottom && window.scrollY > 0) current = HOME_SECTIONS[HOME_SECTIONS.length - 1];
            setCurrentSection(current);
        };
        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(read);
        };
        schedule();
        const late = setTimeout(schedule, 600);
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
        return () => {
            cancelAnimationFrame(frame);
            clearTimeout(late);
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
        };
    }, [onHome]);

    const isActive = (item) => {
        if (item.section) return onHome && currentSection === item.section;
        if (item.to === '/tuc/teaching') return path === item.to || TEACHING_ALIASES.includes(path);
        return path === item.to;
    };

    // A section link on the home page itself scrolls there directly: the
    // address may already carry that hash, and then the router has nothing to do.
    const onNavClick = (item) => () => {
        setIsNavOpen(false);
        const element = item.section && onHome ? document.getElementById(item.section) : null;
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const navLinks = (items, cls) =>
        items.map((item) => {
            const leavesLab = !item.to.startsWith('/tuc');
            const LinkTo = leavesLab ? ShellLink : Link;
            return (
                <LinkTo
                    key={item.to}
                    to={item.to}
                    onClick={onNavClick(item)}
                    aria-current={isActive(item) ? 'true' : undefined}
                    className={cls(isActive(item))}
                    // Join Us in the bar pairs with Join Us in the network navbar.
                    style={item === JOIN && cls === joinClass ? { viewTransitionName: 'shell-join' } : undefined}
                >
                    {label(item)}
                </LinkTo>
            );
        });

    const labLink = (lab, className, children) =>
        lab.to ? (
            <ShellLink key={lab.initials} to={lab.to} title={lab.name} className={className}>{children}</ShellLink>
        ) : (
            <a key={lab.initials} href={lab.href} target="_blank" rel="noreferrer" title={lab.name} className={className}>{children}</a>
        );

    return (
        <div className={`theme-tuc min-h-screen flex flex-col bg-white text-slate-900 ${TYPE}`}>
            <header className="fixed top-0 inset-x-0 z-30 bg-white border-b border-slate-200" style={{ viewTransitionName: 'shell-header' }}>
                <div className="hidden lg:block">
                    <div className="mx-auto flex h-9 max-w-7xl items-end justify-between px-6 text-xs">
                        <nav
                            className="flex h-7 items-center gap-4 rounded-full border border-slate-700/40 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 px-3.5 text-slate-300"
                            aria-label="CORE Network"
                            style={{ viewTransitionName: 'shell-nav' }}
                        >
                            <ShellLink to={NETWORK_HOME.to} className="inline-flex items-center gap-1.5 whitespace-nowrap font-semibold text-white transition-colors hover:text-primary-300">
                                <FiArrowLeft size={13} aria-hidden="true" />
                                {label(NETWORK_HOME)}
                            </ShellLink>
                            {NETWORK_NAV.map((item) => (
                                <ShellLink key={item.to} to={item.to} className="whitespace-nowrap transition-colors hover:text-white">{label(item)}</ShellLink>
                            ))}
                        </nav>
                        <div
                            className="flex h-7 items-center rounded-full border border-slate-200/80 bg-slate-50/80 p-0.5"
                            aria-label={pick('Lab sites', 'Seiten der Labs')}
                            style={{ viewTransitionName: 'shell-labs' }}
                        >
                            <span className={`${labClass} bg-white text-primary-700 shadow-sm`} aria-current="true" title="TU Clausthal lab">TUC</span>
                            {OTHER_LABS.map((lab) =>
                                labLink(lab, `${labClass} text-slate-600 transition hover:bg-white hover:text-slate-900`, (
                                    <>
                                        {lab.initials}
                                        {lab.href && <FiArrowUpRight size={11} aria-hidden="true" />}
                                    </>
                                )),
                            )}
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 lg:h-14">
                    <Link to="/tuc" className="flex items-center gap-3" style={{ viewTransitionName: 'shell-logo' }}>
                        <ThemedLogo name={LOGO} alt="Cognitive Software, TU Clausthal" className="h-12 w-auto lg:h-11" />
                    </Link>

                    <nav className="hidden lg:flex items-center gap-7" aria-label={pick('Lab', 'Lab')}>
                        {navLinks(LAB_NAV, navClass)}
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
                    <div className="lg:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-slate-200 bg-white">
                        <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
                            <p className={menuHeading}>{pick('This lab', 'Dieses Lab')}</p>
                            {navLinks([...LAB_NAV, JOIN], mobileClass)}
                            <div className="my-2 h-px bg-slate-200" />
                            <p className={menuHeading}>CORE Network</p>
                            {navLinks([{ ...NETWORK_HOME, label: ['Startseite des Netzwerks', 'Network home'] }, ...NETWORK_NAV], mobileClass)}
                            <div className="my-2 h-px bg-slate-200" />
                            <p className={menuHeading}>{pick('Other labs', 'Andere Labs')}</p>
                            {OTHER_LABS.map((lab) =>
                                labLink(lab, `flex items-center gap-1.5 ${mobileClass(false)}`, (
                                    <>
                                        {lab.name}
                                        {lab.href && <FiArrowUpRight size={14} className="text-slate-500" aria-hidden="true" />}
                                    </>
                                )),
                            )}
                        </nav>
                    </div>
                )}
            </header>

            <RightSidebar />

            <main className="flex-grow pt-16 lg:pt-[5.8125rem]">{children}</main>

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
                            <LegalLinks className="!text-xs" />
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
