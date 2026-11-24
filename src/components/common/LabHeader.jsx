import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FiArrowLeft, FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi';
import ShellLink from './ShellLink';
import { useLanguage } from '../../i18n/useLanguage';

// The header of a group's site (/tuc, /ubb). Both groups use this one
// component, so they stay the same; a group passes its own logo, sections and
// Join Us link.
//
// Wording: TU Clausthal, MDS Rostock and CORE Cluj are research GROUPS of the
// network. "Lab" means the laboratories (CORE Labs) and is part of one
// group's own name (MDS Lab); do not call the groups labs in anything a
// visitor reads or hears. The component and its props keep the old name.
//
// The navigation has two tiers, so that it is plain which links belong to the
// lab and which leave for the network site:
//   top row (lg up)  two capsules: the CORE Network pages in the dark one,
//                    which is the network navbar's own dark pill in small,
//                    and the lab switch
//   bar              the lab itself: its sections and pages, Join Us
// Below lg the top row folds into the menu, under its own headings.
//
// Links that leave the lab are ShellLinks: on the way to the network site or
// to another lab the capsules, the logo and Join Us morph into their
// counterparts there. The `viewTransitionName`s below pair them up (see
// ShellLink.jsx).
//
// Text pairs are [German, English].

// Pages that live on the CORE Network site: the same pages, in the same order,
// as the network navbar (Navbar.jsx). Publications opens filtered to the lab.
const NETWORK_HOME = { to: '/network', label: ['CORE Network', 'CORE Network'] };
const networkNav = (lab) => [
    { to: `/publications?institution=${lab}`, label: ['Publikationen', 'Publications'] },
    { to: '/industry-projects', label: ['Industrieprojekte', 'Industry Projects'] },
    { to: '/core-labs', label: ['CORE Labs', 'CORE Labs'] },
    { to: '/ai-team-projects', label: ['AI-Team-Projekte', 'AI Team Projects'] },
    { to: '/compute-cluster', label: ['Rechencluster', 'Compute Cluster'] },
];

// The lab switch, in the order of the one in the network navbar.
const LABS = [
    { initials: 'TUC', to: '/tuc', name: 'Cognitive Software group, TU Clausthal' },
    { initials: 'MDS', href: 'https://www.mds-lab.de/', name: 'MDS Lab, Rostock' },
    { initials: 'UBB', to: '/ubb', name: 'CORE Cluj, Babeș-Bolyai University' },
];

// A section counts as current once its top passes this many px from the top
// of the window: just below the header and the sections' scroll margin.
const CURRENT_LINE = 160;

// The underline is the lab's own colour (--site-900, set by its .theme-* class).
const navClass = (active) =>
    `flex h-14 items-center whitespace-nowrap border-b-2 text-sm font-medium transition-colors ${
        active ? 'border-site-900 text-slate-900' : 'border-transparent text-slate-600 hover:text-slate-900'
    }`;

const labClass = 'flex h-6 items-center gap-0.5 rounded-full px-2.5 text-[11px] font-semibold';

const joinClass = (active) =>
    `whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition ${
        active ? 'bg-primary-800 text-white' : 'border border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white'
    }`;

const menuHeading = 'px-3 pb-1 pt-1 text-xs font-semibold text-slate-500';

const mobileClass = (active) =>
    `px-3 py-2 rounded text-sm font-medium ${active ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-50'}`;

/**
 * @param lab       'TUC' | 'UBB': the entry of the lab switch that is current,
 *                  and the institution the Publications link filters by
 * @param home      the lab's home path ('/tuc')
 * @param logo      what stands at the left of the bar
 * @param logoLabel accessible name of the logo link
 * @param nav       the lab's own links: { to, label, section?, aliases? }.
 *                  `section` is the id of a section of the home page (`to` is
 *                  then home + '#' + id); `aliases` are other paths on which
 *                  the entry counts as current
 * @param sections  every section id of the home page, in page order, for the
 *                  highlight in the bar. A section without an entry in `nav`
 *                  belongs here too: while it is on screen nothing is lit
 * @param join      the Join Us link: { to, label }
 */
const LabHeader = ({ lab, home, logo, logoLabel, nav, sections = [], join }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const location = useLocation();
    const { pick } = useLanguage();
    const label = (item) => pick(item.label[1], item.label[0]);
    const network = networkNav(lab);
    const otherLabs = LABS.filter((entry) => entry.initials !== lab);

    // Close the mobile nav whenever the route changes (incl. back/forward).
    const [prevPath, setPrevPath] = useState(location.pathname);
    if (prevPath !== location.pathname) {
        setPrevPath(location.pathname);
        setIsNavOpen(false);
    }

    const path = location.pathname.replace(/\/$/, '');
    const onHome = path === home;

    // Which section of the home page is on screen. Read on scroll rather than
    // observed, because the page is lazy: its sections may not exist yet when
    // this runs, and an observer would have nothing to attach to.
    const [currentSection, setCurrentSection] = useState(null);
    const sectionKey = sections.join(' ');
    useEffect(() => {
        const ids = sectionKey ? sectionKey.split(' ') : [];
        if (!onHome || ids.length === 0) return undefined;
        let frame = 0;
        const read = () => {
            frame = 0;
            let current = null;
            for (const id of ids) {
                const element = document.getElementById(id);
                if (element && element.getBoundingClientRect().top <= CURRENT_LINE) current = id;
            }
            // The last section may be short: at the bottom of the page it is
            // the current one even though its top never reaches the line.
            const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
            if (atBottom && window.scrollY > 0) current = ids[ids.length - 1];
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
    }, [onHome, sectionKey]);

    const isActive = (item) => {
        if (item.section) return onHome && currentSection === item.section;
        return path === item.to || Boolean(item.aliases?.includes(path));
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
            const leavesLab = !item.to.startsWith(home);
            const LinkTo = leavesLab ? ShellLink : Link;
            return (
                <LinkTo
                    key={item.to}
                    to={item.to}
                    onClick={onNavClick(item)}
                    aria-current={isActive(item) ? 'true' : undefined}
                    className={cls(isActive(item))}
                    // Join Us in the bar pairs with Join Us in the network navbar.
                    style={item === join && cls === joinClass ? { viewTransitionName: 'shell-join' } : undefined}
                >
                    {label(item)}
                </LinkTo>
            );
        });

    const labLink = (entry, className, children) =>
        entry.to ? (
            <ShellLink key={entry.initials} to={entry.to} title={entry.name} className={className}>{children}</ShellLink>
        ) : (
            <a key={entry.initials} href={entry.href} target="_blank" rel="noreferrer" title={entry.name} className={className}>{children}</a>
        );

    return (
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
                        {network.map((item) => (
                            <ShellLink key={item.to} to={item.to} className="whitespace-nowrap transition-colors hover:text-white">{label(item)}</ShellLink>
                        ))}
                    </nav>
                    <div
                        className="flex h-7 items-center rounded-full border border-slate-200/80 bg-slate-50/80 p-0.5"
                        aria-label={pick('Groups', 'Gruppen')}
                        style={{ viewTransitionName: 'shell-labs' }}
                    >
                        {LABS.map((entry) =>
                            entry.initials === lab ? (
                                <span key={entry.initials} className={`${labClass} bg-white text-primary-700 shadow-sm`} aria-current="true" title={entry.name}>{entry.initials}</span>
                            ) : (
                                labLink(entry, `${labClass} text-slate-600 transition hover:bg-white hover:text-slate-900`, (
                                    <>
                                        {entry.initials}
                                        {entry.href && <FiArrowUpRight size={11} aria-hidden="true" />}
                                    </>
                                ))
                            ),
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 lg:h-14">
                <Link to={home} className="flex items-center gap-3" aria-label={logoLabel} style={{ viewTransitionName: 'shell-logo' }}>
                    {logo}
                </Link>

                <nav className="hidden lg:flex items-center gap-7" aria-label={pick('This group', 'Diese Gruppe')}>
                    {navLinks(nav, navClass)}
                    {navLinks([join], joinClass)}
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
                        <p className={menuHeading}>{pick('This group', 'Diese Gruppe')}</p>
                        {navLinks([...nav, join], mobileClass)}
                        <div className="my-2 h-px bg-slate-200" />
                        <p className={menuHeading}>CORE Network</p>
                        {navLinks([{ ...NETWORK_HOME, label: ['Startseite des Netzwerks', 'Network home'] }, ...network], mobileClass)}
                        <div className="my-2 h-px bg-slate-200" />
                        <p className={menuHeading}>{pick('Other groups', 'Andere Gruppen')}</p>
                        {otherLabs.map((entry) =>
                            labLink(entry, `flex items-center gap-1.5 ${mobileClass(false)}`, (
                                <>
                                    {entry.name}
                                    {entry.href && <FiArrowUpRight size={14} className="text-slate-500" aria-hidden="true" />}
                                </>
                            )),
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default LabHeader;
