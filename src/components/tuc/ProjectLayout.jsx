import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiExternalLink } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';
import LazyVideo from '../common/LazyVideo';
import { useLanguage } from '../../i18n/useLanguage';

const ProjectLayout = ({
    title,
    titleHref,
    githubHref,
    subtitle,
    tags = [],
    heroImage,
    heroVideo,
    heroDriveId,
    heroEmbedUrl,
    heroYouTubeId,
    heroCaption,
    introBackgroundImage,
    introImageAlt = '',
    introImageFit = 'cover',
    introImageStyle,
    introImageOverlay,
    introHeightClass = 'lg:h-[27rem]',
    showHeroTags = true,
    showHeroOverview = true,
    overview,
    features = [],
    tabs = [],
    requirements = [],
    offerings = [],
    downloadUrl,
    // showEvalSection: when false, hide the "How We Evaluate / What We Offer" block
    showEvalSection = true,
    compact = false,
    softBackground = false,
    children
}) => {
    const { pick } = useLanguage();
    const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');
    const heroMediaClass = compact
        ? `max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-gray-100 relative group ${heroCaption ? 'mb-2' : 'mb-8'}`
        : `max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-gray-100 relative group ${heroCaption ? 'mb-3' : 'mb-20'}`;
    const currentTab = tabs.find((tab) => tab.id === activeTab) || tabs[0];

    return (
        <div className={`${softBackground ? 'bg-gradient-to-b from-slate-50 via-white to-slate-50' : 'bg-white'} min-h-screen font-sans`}>
            {/* Navigation Placeholder (Assuming Navbar is global) */}
            <div className="h-20"></div>



            {/* Hero Section */}
            <section id="hero" className={`relative ${compact ? 'pb-10 pt-8' : 'pb-20 pt-10'}`}>
                <div className="container mx-auto px-4 md:px-8">
                    {introBackgroundImage ? (
                        <div className={`mx-auto max-w-6xl ${compact ? 'mb-12' : 'mb-14'}`}>
                            <div className={`grid items-stretch lg:grid-cols-[0.92fr_1.08fr] ${introHeightClass}`}>
                                <div className="relative z-20 px-2 py-6 text-left sm:px-4 sm:py-8 lg:py-10 lg:pr-12">
                                    {showHeroTags && <div className="mb-5 flex flex-wrap gap-2">
                                        {tags.map((tag, i) => (
                                            <span key={i} className="rounded-full border border-primary-100 bg-primary-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-700">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>}
                                    <h1 className="mb-4 text-4xl font-black leading-tight tracking-tight text-slate-950 md:text-5xl">
                                        {titleHref ? (
                                            <a
                                                href={titleHref}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group inline-flex items-start gap-2 transition-colors hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-4"
                                            >
                                                {title}
                                                <FiExternalLink className="mt-1.5 h-3.5 w-3.5 shrink-0 text-slate-400 transition-colors group-hover:text-primary-600" aria-hidden="true" />
                                            </a>
                                        ) : title}
                                        {githubHref && (
                                            <a
                                                href={githubHref}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={`${title} on GitHub`}
                                                title="GitHub"
                                                className="relative -top-3 ml-2 inline-flex align-middle text-slate-400 transition-colors hover:text-slate-950 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-4"
                                            >
                                                <FaGithub className="h-4 w-4" aria-hidden="true" />
                                            </a>
                                        )}
                                    </h1>
                                    <p className="text-lg font-light leading-relaxed text-slate-500">{subtitle}</p>
                                    <p className="mt-6 max-w-2xl text-sm leading-6 text-slate-600 sm:text-[15px]">
                                        {overview}
                                    </p>
                                    {downloadUrl && (
                                        <a
                                            href={downloadUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-primary-700 hover:shadow-xl"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                            {pick('Download Full Description', 'Vollständige Beschreibung herunterladen')}
                                        </a>
                                    )}
                                </div>

                                <div className="relative min-h-[21rem] overflow-hidden lg:-ml-16 lg:min-h-full lg:rounded-r-[2.5rem]">
                                    <img
                                        src={introBackgroundImage}
                                        alt={introImageAlt}
                                        decoding="async"
                                        fetchPriority="high"
                                        style={introImageStyle}
                                        className={`absolute inset-0 h-full w-full object-center ${introImageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                                    />
                                    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-slate-50 to-transparent lg:hidden" />
                                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-56 bg-gradient-to-r from-slate-50 via-slate-50/75 to-transparent lg:block" />
                                    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-16 bg-gradient-to-l from-slate-50/70 via-slate-50/15 to-transparent lg:block" />
                                    {introImageOverlay && (
                                        <div className="absolute bottom-4 right-4 z-20 sm:bottom-5 sm:right-5">
                                            {introImageOverlay}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={`mx-auto max-w-4xl text-center ${compact ? 'mb-8' : 'mb-12'}`}>
                            {showHeroTags && <div className={`flex flex-wrap justify-center gap-2 ${compact ? 'mb-4' : 'mb-6'}`}>
                                {tags.map((tag, i) => (
                                    <span key={i} className="rounded-full bg-primary-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-600">
                                        {tag}
                                    </span>
                                ))}
                            </div>}
                            <h1 className={`${compact ? 'mb-4 text-4xl md:text-5xl' : 'mb-6 text-5xl md:text-7xl'} font-black leading-tight tracking-tight text-gray-900`}>
                                {titleHref ? (
                                    <a
                                        href={titleHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-start justify-center gap-2 transition-colors hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-4"
                                    >
                                        {title}
                                        <FiExternalLink className="mt-1.5 h-3.5 w-3.5 shrink-0 text-slate-400 transition-colors group-hover:text-primary-600" aria-hidden="true" />
                                    </a>
                                ) : title}
                                {githubHref && (
                                    <a
                                        href={githubHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${title} on GitHub`}
                                        title="GitHub"
                                        className="relative -top-3 ml-2 inline-flex align-middle text-slate-400 transition-colors hover:text-slate-950 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-4"
                                    >
                                        <FaGithub className="h-4 w-4" aria-hidden="true" />
                                    </a>
                                )}
                            </h1>
                            <p className={`${compact ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'} font-light leading-relaxed text-gray-500`}>
                                {subtitle}
                            </p>
                            {downloadUrl && (
                                <a
                                    href={downloadUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-primary-700 hover:shadow-xl"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                    {pick('Download Full Description', 'Vollständige Beschreibung herunterladen')}
                                </a>
                            )}
                        </div>
                    )}

                    {/* Hero Media */}
                    {heroYouTubeId ? (
                        <div className={heroMediaClass}>
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                            <div className="aspect-video">
                                <iframe
                                    src={`https://www.youtube.com/embed/${heroYouTubeId}?rel=0`}
                                    title={title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                />
                            </div>
                        </div>
                    ) : heroDriveId || heroEmbedUrl ? (
                        <div className={heroMediaClass}>
                            <div className="aspect-video">
                                <iframe
                                    src={heroEmbedUrl || `https://drive.google.com/file/d/${heroDriveId}/preview`}
                                    title={title}
                                    allow="autoplay; fullscreen"
                                    allowFullScreen
                                    className="h-full w-full"
                                />
                            </div>
                        </div>
                    ) : heroVideo ? (
                        <div className={`${heroMediaClass} aspect-video bg-black`}>
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                            <LazyVideo
                                src={heroVideo}
                                poster={heroImage || undefined}
                                className="h-full w-full object-cover"
                                controls
                                muted
                                loop
                                autoPlay
                            />
                        </div>
                    ) : heroImage && (
                        <div className={heroMediaClass}>
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                            <img src={heroImage} alt={title} className="w-full h-auto object-cover" />
                        </div>
                    )}

                    {heroCaption && (
                        <p className={`mx-auto max-w-3xl px-4 text-center text-xs font-semibold leading-5 text-slate-500 ${compact ? 'mb-8' : 'mb-20'}`}>
                            {heroCaption}
                        </p>
                    )}

                    {/* Overview & Features */}
                    {((!introBackgroundImage && showHeroOverview) || tabs.length > 0 || features.length > 0) && <div id="features" className={`max-w-4xl mx-auto text-center ${compact ? 'mb-8' : 'mb-24'}`}>
                        {!introBackgroundImage && showHeroOverview && <p className={`${compact ? 'mb-8 text-base leading-7' : 'mb-16 text-lg leading-8'} text-gray-700 text-left md:text-center`}>
                            {overview}
                        </p>}

                        {compact && tabs.length > 0 ? (
                            <div className="grid gap-4 text-left md:grid-cols-[13rem_1fr]">
                                <div className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`shrink-0 rounded-lg border px-4 py-3 text-left text-sm font-bold transition ${currentTab?.id === tab.id ? 'border-primary-600 bg-primary-600 text-white' : 'border-gray-200 bg-white text-gray-600 hover:border-primary-200 hover:text-primary-700'}`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                                <div className="min-h-56 rounded-xl border border-gray-200 bg-gray-50 p-5">
                                    <p className="text-xs font-black uppercase tracking-widest text-primary-600">{currentTab?.eyebrow}</p>
                                    <h3 className="mt-2 text-xl font-bold text-gray-900">{currentTab?.title}</h3>
                                    <p className="mt-3 text-sm leading-6 text-gray-600">{currentTab?.body}</p>
                                    {currentTab?.items?.length > 0 && (
                                        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                                            {currentTab.items.map((item) => (
                                                <li key={item} className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold leading-5 text-gray-700">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ) : features.length > 0 ? (
                            <div className={`grid md:grid-cols-2 ${compact ? 'gap-4' : 'gap-8'} text-left`}>
                                {features.map((feature, idx) => (
                                    <div key={idx} className={`bg-gray-50 ${compact ? 'p-5 rounded-xl' : 'p-8 rounded-2xl'} border border-gray-100 hover:shadow-lg transition-shadow`}>
                                        <div className={`${compact ? 'text-sm font-black tracking-widest text-primary-600' : 'text-3xl'} mb-3`}>{feature.icon}</div>
                                        <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-bold text-gray-900 mb-2`}>{feature.title}</h3>
                                        <p className={`${compact ? 'text-sm leading-6' : ''} text-gray-600`}>{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </div>}

                    {/* Requirements & Offerings Grid (render only when showEvalSection !== false) */}
                    {showEvalSection !== false && (
                        <div id="evaluation" className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-24">
                            {/* Student Requirements */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-gray-900 text-white rounded-3xl p-10 md:p-12 shadow-2xl relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-10 font-black text-9xl leading-none select-none pointer-events-none">
                                    REQ
                                </div>
                                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                    <span>📋</span> {pick('How We Evaluate', 'So evaluieren wir')}
                                </h2>
                                <ul className="space-y-6">
                                    {requirements.map((req, i) => (
                                        <li key={i} className="flex items-start gap-4">
                                            <span className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
                                            <span className="text-gray-300 leading-relaxed font-light text-lg">
                                                {req}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* What We Offer */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-primary-600 text-white rounded-3xl p-10 md:p-12 shadow-2xl relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-10 font-black text-9xl leading-none select-none pointer-events-none">
                                    OFF
                                </div>
                                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                    <span>🚀</span> {pick('What We Offer', 'Was wir bieten')}
                                </h2>
                                <ul className="space-y-6">
                                    {offerings.map((offering, i) => (
                                        <li key={i} className="flex items-start gap-4">
                                            <span className="w-6 h-6 rounded-full bg-white text-primary-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">★</span>
                                            <span className="text-primary-50 leading-relaxed font-medium text-lg">
                                                {offering}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    )}

                    {/* Additional Content (Children) */}
                    <div id="extra" className={`${introBackgroundImage ? 'max-w-6xl' : 'max-w-5xl'} mx-auto`}>
                        {children}
                    </div>

                </div>
            </section>

            {/* Back to Projects */}
            <div className={`container mx-auto px-4 ${compact ? 'py-8' : 'py-12'} text-center border-t border-gray-100`}>
                <Link to="/ai-team-projects" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors font-medium text-lg">
                    ← {pick('Back to All Projects', 'Zurück zu allen Projekten')}
                </Link>
            </div>
        </div>
    );
};

export default ProjectLayout;
