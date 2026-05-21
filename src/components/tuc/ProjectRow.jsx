import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProjectRow = ({ project, index }) => {
    const { title, tag, status, image, video, youtubeId, description, link } = project;
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center mb-24 last:mb-0`}
        >
            {/* Media Side */}
            <div className="w-full lg:w-3/5">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-200 group">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />

                    {youtubeId ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}`}
                            title={title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full object-cover"
                        ></iframe>
                    ) : video ? (
                        <video
                            src={video}
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    ) : image ? (
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                            <span className="text-6xl">🖼️</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-2/5 flex flex-col items-start text-left">
                <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 text-xs font-bold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full border border-blue-100">
                        {status}
                    </span>
                    <span className="text-sm font-medium text-gray-500 tracking-wide uppercase">
                        {tag}
                    </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                    {title}
                </h3>

                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    {description}
                </p>

                {link && (/^https?:\/\//.test(link) ? (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-blue-600 font-semibold text-lg hover:text-blue-800 transition-colors"
                    >
                        View Project Details
                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                ) : (
                    <Link
                        to={link}
                        className="group inline-flex items-center gap-2 text-blue-600 font-semibold text-lg hover:text-blue-800 transition-colors"
                    >
                        View Project Details
                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                ))}
            </div>
        </motion.div>
    );
};

export default ProjectRow;
