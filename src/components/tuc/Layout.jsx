import { FiChevronUp } from 'react-icons/fi';
import RightSidebar from '../common/RightSidebar';
import ThemedLogo from '../common/ThemedLogo';
import LabHeader from '../common/LabHeader';
import LegalLinks from '../common/LegalLinks';
import { useLanguage } from '../../i18n/useLanguage';
import './fonts.js';

const CURRENT_YEAR = new Date().getFullYear();
const LOGO = 'core_tuc';

// /tuc pages set in IBM Plex Sans, headings included (the global rule would otherwise
// give h1-h4 the CORE heading font). The font files come from ./fonts.js.
const TYPE = "font-['IBM_Plex_Sans',Inter,sans-serif] [&_:is(h1,h2,h3,h4)]:font-[inherit]";

// The header is common/LabHeader.jsx, shared with /ubb. This is what the
// TU Clausthal lab puts in it. An entry with `section` is a section of the
// /tuc home page (the ids are set in pages/tuc/Home.jsx).
const LAB_NAV = [
    { to: '/tuc#people', section: 'people', label: ['Personen', 'People'] },
    { to: '/tuc#research', section: 'research', label: ['Forschung', 'Research'] },
    // /tuc/seminar and /tuc/theses render the Teaching page on another tab.
    { to: '/tuc/teaching', aliases: ['/tuc/seminar', '/tuc/theses'], label: ['Lehre', 'Teaching'] },
    { to: '/tuc#contact', section: 'contact', label: ['Kontakt', 'Contact'] },
];

// Every section of the home page, in page order. "work" has no entry in the
// bar: while it is on screen nothing is highlighted.
const HOME_SECTIONS = ['people', 'research', 'work', 'contact'];

// The lab's own Join Us page (working in Goslar), not the network's /join-us.
const JOIN = { to: '/join-us/tuc', label: ['Mitmachen', 'Join Us'] };

const Layout = ({ children }) => {
    const { pick } = useLanguage();

    return (
        <div className={`theme-tuc min-h-screen flex flex-col bg-white text-slate-900 ${TYPE}`}>
            <LabHeader
                lab="TUC"
                home="/tuc"
                logo={<ThemedLogo name={LOGO} alt="Cognitive Software, TU Clausthal" className="h-12 w-auto lg:h-11" />}
                nav={LAB_NAV}
                sections={HOME_SECTIONS}
                join={JOIN}
            />

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
