import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProjectLayout = ({
    title,
    subtitle,
    status = 'Active',
    tags = [],
    heroImage,
    heroVideo,
    heroYouTubeId,
    overview,
    features = [],
    requirements = [],
    offerings = [],
    downloadUrl,
    // showEvalSection: when false, hide the "How We Evaluate / What We Offer" block
    showEvalSection = true,
    children
}) => {
    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Navigation Placeholder (Assuming Navbar is global) */}
            <div className="h-20"></div>



            {/* Hero Section */}
            <section id="hero" className="relative pb-20 pt-10">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <div className="flex justify-center gap-2 mb-6">
                            {tags.map((tag, i) => (
                                <span key={i} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {tag}
                                </span>
                            ))}
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                {status}
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
                            {title}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed">
                            {subtitle}
                        </p>
                        {downloadUrl && (
                            <a
                                href={downloadUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                Download Full Description
                            </a>
                        )}
                    </div>

                    {/* Hero Media */}
                    {heroYouTubeId ? (
                        <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-gray-100 mb-20 relative group">
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
                    ) : heroVideo ? (
                        <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-gray-100 mb-20 relative group">
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                            <video
                                src={heroVideo}
                                poster={heroImage || undefined}
                                className="w-full h-auto object-cover"
                                controls
                                muted
                                loop
                                playsInline
                                autoPlay
                            />
                        </div>
                    ) : heroImage && (
                        <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-gray-100 mb-20 relative group">
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                            <img src={heroImage} alt={title} className="w-full h-auto object-cover" />
                        </div>
                    )}

                    {/* Overview & Features */}
                    <div id="features" className="max-w-4xl mx-auto mb-24 text-center">
                        <p className="text-lg text-gray-700 leading-8 mb-16 text-left md:text-center">
                            {overview}
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 text-left">
                            {features.map((feature, idx) => (
                                <div key={idx} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                                    <div className="text-3xl mb-4">{feature.icon}</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

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
                                    <span>📋</span> How We Evaluate
                                </h2>
                                <ul className="space-y-6">
                                    {requirements.map((req, i) => (
                                        <li key={i} className="flex items-start gap-4">
                                            <span className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✓</span>
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
                                className="bg-blue-600 text-white rounded-3xl p-10 md:p-12 shadow-2xl relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-10 font-black text-9xl leading-none select-none pointer-events-none">
                                    OFF
                                </div>
                                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                    <span>🚀</span> What We Offer
                                </h2>
                                <ul className="space-y-6">
                                    {offerings.map((offering, i) => (
                                        <li key={i} className="flex items-start gap-4">
                                            <span className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">★</span>
                                            <span className="text-blue-50 leading-relaxed font-medium text-lg">
                                                {offering}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    )}

                    {/* Additional Content (Children) */}
                    <div id="extra" className="max-w-5xl mx-auto">
                        {children}
                    </div>

                </div>
            </section>

            {/* Back to Projects */}
            <div className="container mx-auto px-4 py-12 text-center border-t border-gray-100">
                <Link to="/tuc/core-team-projects" className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium text-lg">
                    ← Back to All Projects
                </Link>
            </div>
        </div>
    );
};

export default ProjectLayout;
