import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MotionLink = motion(Link);

const ProjectCard = ({ project }) => {
    const { title, tag, status, image, description, link } = project;

    // Status Badge Helpers
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'active': return 'bg-green-100 text-green-800 border-green-200';
            case 'legacy': return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'scouting': return 'bg-blue-100 text-blue-800 border-blue-200';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const CardContent = () => (
        <>
            {/* Hover Gradient Border Effect */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/20 transition-colors duration-300 pointer-events-none z-20"></div>

            {/* Media Container */}
            <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />

                {project.youtubeId ? (
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${project.youtubeId}`}
                        title={title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full object-cover pointer-events-none"
                    ></iframe>
                ) : project.video ? (
                    <video
                        src={project.video}
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
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800/50 text-gray-600">
                        {/* Abstract Placeholder Pattern */}
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 via-gray-900 to-black"></div>
                        <span className="text-5xl relative z-10 opacity-50">⚡</span>
                    </div>
                )}

                <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 text-xs font-bold tracking-wider text-white bg-black/60 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
                        {tag}
                    </span>
                </div>

                {/* Small overlay CTA on the media (matches your screenshot) */}
                {link && (
                    <div className="absolute right-4 bottom-4 z-30 pointer-events-none">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-white text-sm font-semibold text-gray-700 border border-gray-100 rounded-full shadow-md">
                            View details
                        </span>
                    </div>
                )}

            </div>

            {/* Content Container */}
            <div className="flex flex-col justify-between flex-grow p-8 pb-0 bg-gradient-to-b from-white to-gray-50">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                    {description}
                </p>




                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-200/60">
                    <span className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            {status}
                        </span>
                    </span>


                </div>
            </div>
        </>
    );

    const cardStyles = "flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full border border-gray-100 group relative";
    const animationProps = {
        whileHover: { y: -8 },
        transition: { type: 'spring', stiffness: 300 }
    };

    if (link) {
        return (
            <MotionLink to={link} className={cardStyles} {...animationProps}>
                <CardContent />
            </MotionLink>
        );
    }

    return (
        <motion.div className={cardStyles} {...animationProps}>
            <CardContent />
        </motion.div>
    );
};

export default ProjectCard;
