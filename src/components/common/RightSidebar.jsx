import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Section configurations for each route (merged: core's existing routes + bartelt /tuc/* routes)
const ROUTE_SECTIONS = {
    // CORE routes
    '/': [
        { id: 'hero', label: 'Vision' },
        { id: 'initiative', label: 'Initiative' },
        { id: 'team', label: 'Team' },
        { id: 'dynamo', label: 'Dynamo' },
        { id: 'autonomous', label: 'Self-Driving' },
        { id: 'publications', label: 'Publications' },
    ],
    '/dynamo': [
        { id: 'hero', label: 'Introduction' },
        { id: 'goal', label: 'Goal' },
        { id: 'overview', label: 'Overview' },
        { id: 'technical', label: 'Technical' },
        { id: 'experiments', label: 'Experiments' },
    ],
    '/network': [
        { id: 'hero', label: 'Network' },
        { id: 'team', label: 'Team' },
        { id: 'publications', label: 'Publications' },
    ],
    // /tuc/* bartelt routes
    '/tuc/core-team-projects': [
        { id: 'hero', label: 'Overview' },
        { id: 'active-projects', label: 'Active' },
        { id: 'archive', label: 'Archive' },
    ],
    '/tuc/core-team-projects/dynamo': [
        { id: 'hero', label: 'Overview' },
        { id: 'features', label: 'Features' },
        { id: 'evaluation', label: 'Evaluation' },
        { id: 'science', label: 'Science' },
        { id: 'architecture', label: 'Architecture' },
    ],
    '/tuc/core-team-projects/ai4ai': [
        { id: 'hero', label: 'Overview' },
        { id: 'features', label: 'Features' },
        { id: 'evaluation', label: 'Evaluation' },
        { id: 'extra', label: 'Details' },
    ],
    '/tuc/core-team-projects/vergabepilot': [
        { id: 'hero', label: 'Overview' },
        { id: 'features', label: 'Features' },
        { id: 'evaluation', label: 'Evaluation' },
        { id: 'extra', label: 'Details' },
    ],
};

// Routes with dark hero — sidebar uses light theme over the hero section
const DARK_HERO_ROUTES = new Set(['/', '/dynamo']);

const RightSidebar = () => {
    const [activeSection, setActiveSection] = useState('hero');
    const location = useLocation();

    // Robust path resolution (HashRouter + GitHub Pages edge cases)
    const resolvedPath = useMemo(() => {
        if (ROUTE_SECTIONS[location.pathname]) return location.pathname;
        if (typeof window !== 'undefined') {
            const hash = (window.location.hash || '').replace(/^#/, '').split('?')[0];
            if (hash) {
                const path = hash.startsWith('/') ? hash : `/${hash}`;
                if (ROUTE_SECTIONS[path]) return path;
            }
        }
        return location.pathname;
    }, [location.pathname]);

    const sections = useMemo(() => ROUTE_SECTIONS[resolvedPath] || [], [resolvedPath]);
    const isVisible = sections.length > 0;

    useEffect(() => {
        if (sections.length > 0) {
            setActiveSection(sections[0].id);
        }
    }, [resolvedPath]);

    useEffect(() => {
        if (!isVisible) return;

        const handleScroll = () => {
            const scrollPosition = window.scrollY + 150;

            const validSections = [];
            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (!element) continue;
                const rect = element.getBoundingClientRect();
                validSections.push({
                    id: section.id,
                    top: rect.top + window.scrollY,
                    bottom: rect.top + window.scrollY + rect.height
                });
            }

            if (validSections.length === 0) return;

            if (window.scrollY < 100) {
                setActiveSection(validSections[0].id);
                return;
            }

            const totalScrollableHeight = document.documentElement.scrollHeight;
            if ((window.innerHeight + window.scrollY) >= totalScrollableHeight - 100) {
                setActiveSection(validSections[validSections.length - 1].id);
                return;
            }

            let current = validSections[0].id;
            for (let i = validSections.length - 1; i >= 0; i--) {
                if (validSections[i].top <= scrollPosition) {
                    current = validSections[i].id;
                    break;
                }
            }

            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        const timer = setTimeout(handleScroll, 100);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
    }, [isVisible, resolvedPath, sections]);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Theme: light sidebar (white dots/labels) when over a dark hero of a core page; otherwise dark sidebar.
    const isDarkBackground = DARK_HERO_ROUTES.has(resolvedPath) && activeSection === 'hero';
    const useDarkSidebar = !isDarkBackground;
    const lineColor = useDarkSidebar ? 'bg-gray-300' : 'bg-white/30';
    const dotBaseClass = useDarkSidebar ? 'bg-transparent border-gray-400 border-2' : 'bg-white/50 border-white';
    const dotHoverClass = useDarkSidebar ? 'group-hover:bg-gray-600' : 'group-hover:bg-white';
    const activeDotClass = useDarkSidebar ? 'bg-blue-600' : 'bg-white';
    const activeLabelClass = useDarkSidebar ? 'text-blue-600' : 'text-white';
    const inactiveLabelClass = useDarkSidebar ? 'text-gray-500' : 'text-white/70';

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="desktop-only flex fixed top-0 right-0 h-full w-12 lg:w-48 z-40 flex-col items-end justify-center pointer-events-none"
                >
                    <div className="flex flex-col items-center space-y-6 pointer-events-auto mr-4">
                        <div className={`w-px h-12 ${lineColor} transition-colors duration-300`}></div>

                        {sections.map((section) => (
                            <div key={section.id} className="relative group flex items-center">
                                <span
                                    className={`hidden lg:block text-xs font-bold uppercase tracking-widest transition-all duration-200 whitespace-nowrap mr-3
                                        ${activeSection === section.id
                                            ? `opacity-100 ${activeLabelClass}`
                                            : `opacity-60 ${inactiveLabelClass} group-hover:opacity-90`
                                        }
                                    `}
                                >
                                    {section.label}
                                </span>
                                <button
                                    onClick={() => scrollToSection(section.id)}
                                    className="relative flex items-center justify-center w-8 h-8 group-hover:scale-110 transition-transform duration-200"
                                    aria-label={`Scroll to ${section.label}`}
                                >
                                    <div className={`rounded-full transition-all duration-300
                                        ${activeSection === section.id
                                            ? `w-3.5 h-3.5 ${activeDotClass} scale-125`
                                            : `w-2.5 h-2.5 ${dotBaseClass} ${dotHoverClass}`
                                        }
                                    `} />
                                </button>
                            </div>
                        ))}

                        <div className={`w-px h-12 ${lineColor} transition-colors duration-300`}></div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RightSidebar;
