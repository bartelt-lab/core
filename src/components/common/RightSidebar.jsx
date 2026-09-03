import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { normalizePath } from '../../routes';

// Section configurations for each route (merged: core's existing routes + bartelt /tuc/* routes)
const ROUTE_SECTIONS = {
    // CORE routes
    '/': [
        { id: 'hero', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'platform', label: 'Platform' },
        { id: 'team', label: 'Team' },
        { id: 'contact', label: 'Contact' },
    ],
    '/core-labs': [
        { id: 'hero', label: 'Overview' },
        { id: 'initiative', label: 'Initiative' },
        { id: 'team', label: 'Team' },
        { id: 'dynamo', label: 'Dynamo' },
        { id: 'autonomous', label: 'Self-Driving' },
        { id: 'publications', label: 'Papers' },
    ],
    '/dynamo': [],
    '/network': [
        { id: 'hero', label: 'Network' },
        { id: 'about', label: 'About' },
        { id: 'platform', label: 'Platform' },
        { id: 'team', label: 'Team' },
        { id: 'contact', label: 'Contact' },
    ],
    '/publications': [],
    '/ai-team-projects': [
        { id: 'hero', label: 'Overview' },
        { id: 'active-projects', label: 'Projects' },
        { id: 'testimonials', label: 'Voices' },
        { id: 'archive', label: 'Archive' },
    ],
    '/compute-cluster': [
        { id: 'hero', label: 'Overview' },
        { id: 'purpose', label: 'Purpose' },
        { id: 'capabilities', label: 'Capabilities' },
        { id: 'sites', label: 'Sites' },
        { id: 'policies', label: 'Policies' },
    ],
    '/ai-team-projects/dynamo': [
        { id: 'hero', label: 'Overview' },
        { id: 'features', label: 'Features' },
        { id: 'evaluation', label: 'Evaluation' },
        { id: 'science', label: 'Science' },
        { id: 'architecture', label: 'Architecture' },
    ],
    '/ai-team-projects/ai4ai': [
        { id: 'hero', label: 'Overview' },
        { id: 'features', label: 'Features' },
        { id: 'evaluation', label: 'Evaluation' },
        { id: 'extra', label: 'Details' },
    ],
    '/ai-team-projects/vergabepilot': [
        { id: 'hero', label: 'Overview' },
        { id: 'features', label: 'Features' },
        { id: 'evaluation', label: 'Evaluation' },
        { id: 'extra', label: 'Details' },
    ],
};

// Routes with dark hero — sidebar uses light theme over the hero section
const DARK_HERO_ROUTES = new Set(['/core-labs', '/dynamo', '/compute-cluster']);

const RightSidebar = () => {
    const [activeSection, setActiveSection] = useState('hero');
    const location = useLocation();

    // The pathname is authoritative under BrowserRouter. Normalizing strips the
    // trailing slash from the directory-style URLs GitHub Pages serves
    // ('/core-labs/'), so they still match ROUTE_SECTIONS.
    const resolvedPath = normalizePath(location.pathname);

    const sections = useMemo(() => ROUTE_SECTIONS[resolvedPath] || [], [resolvedPath]);
    const isVisible = sections.length > 0;

    // Reset the highlighted section when the route changes (render-phase, no effect).
    const [prevPath, setPrevPath] = useState(resolvedPath);
    if (prevPath !== resolvedPath) {
        setPrevPath(resolvedPath);
        if (sections.length > 0) setActiveSection(sections[0].id);
    }

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
    const activeDotClass = useDarkSidebar ? 'bg-primary-600' : 'bg-white';
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="hidden md:flex fixed top-0 right-5 h-full w-10 z-40 flex-col items-center justify-center pointer-events-none select-none cursor-default"
                >
                    <div className="flex flex-col items-center space-y-6 pointer-events-auto rounded-full bg-white/35 px-2 py-5 backdrop-blur-sm">
                        <div className={`w-px h-12 ${lineColor} transition-colors duration-300`}></div>

                        {sections.map((section) => (
                            <div key={section.id} className="relative group flex items-center">
                                <button
                                    onClick={() => scrollToSection(section.id)}
                                    className="relative flex items-center justify-center w-8 h-8 group-hover:scale-110 transition-transform duration-200"
                                    aria-label={`Scroll to ${section.label}`}
                                    title={section.label}
                                >
                                    <div className={`rounded-full transition-all duration-300
                                        ${activeSection === section.id
                                            ? `w-4 h-4 ${activeDotClass} scale-125`
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
