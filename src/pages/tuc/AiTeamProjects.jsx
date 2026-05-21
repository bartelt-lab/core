import { motion } from 'framer-motion';
import ProjectCard from '../../components/tuc/ProjectCard';
import ProjectRow from '../../components/tuc/ProjectRow';
import assetUrl from '../../utils/assetUrl';

const activeProjects = [
    {
        id: 'dynamo',
        title: "DyNAMO",
        tag: "Cognitive Systems / RL",
        status: "Active",
        image: assetUrl("/images/projects/dynamo/hero.jpeg"),
        description: "Developing a cognitive framework for dynamic manipulation and reasoning in unstructured environments. Bridging perception and action with advanced RL.",
        link: "/tuc/core-team-projects/dynamo"
    },
    {
        id: 'ai4ai',
        title: "AI4AI",
        tag: "Computer Vision / LLMs",
        status: "Active",
        image: assetUrl("/images/projects/ai4ai/hero.png"),
        description: "From Image to Model using AI-assisted AI. Transitioning static images into editable engineering models (CAD, BIM, TikZ) by leveraging LLMs and Computer Vision.",
        link: "/tuc/core-team-projects/ai4ai"
    },
    {
        id: 'vergabepilot',
        title: "Vergabepilot.AI",
        tag: "LLMs / Web Automation",
        status: "Active",
        image: assetUrl("/images/projects/vergabepilot/hero.png"),
        description: "LLM-based tender scraping for state-of-the-art tender search. Automating web scraper generation, validation, and improvement using LLMs and MLLM agents.",
        link: "/tuc/core-team-projects/vergabepilot"
    }
];

const archiveProjects = [
    {
        id: 'neurocore-dashboard',
        title: "NeuroCore Dashboard",
        tag: "MLOps / Monitoring",
        status: "Archive",
        video: assetUrl("/videos/demonstrations/neurocore/NeuroCore_demo.mp4"),
        description: "A dashboard for orchestrating machine learning training jobs, monitoring GPU and node health via SSH, and visualizing real-time performance analytics across compute clusters.",
        link: "/tuc/core-team-projects/neurocore"
    },
    {
        id: 'stratego-llm-games',
        title: "Stratego — LLM Based Games",
        tag: "LLMs / Games",
        status: "Archive",
        video: assetUrl("/videos/demonstrations/stratego/stratego-demo-rp3.mp4"),
        description: "Explore how different large language models compete in the classic strategy board game Stratego, with automated matchups, head-to-head win comparisons, and gameplay behavior logging to reveal strengths and patterns in decision making.",
        link: "/tuc/core-team-projects/stratego"
    },
    {
        id: 'self-driving',
        title: "Self-Driving 1:10",
        tag: "Autonomous Navigation",
        status: "Legacy",
        youtubeId: "wrY34WyTEzo",
        description: "A completed initiative scaling down autonomous driving algorithms for rapid prototyping. Focused on SLAM and path planning in miniature environments.",
        link: "/tuc/core-team-projects/self-driving"
    },
    {
        id: 'traffic-network',
        title: "Traffic Network Builder",
        tag: "Simulation Tools",
        status: "Archive",
        video: assetUrl("/videos/demonstrations/autonomous_driving/TrafficNetworkBuilder.mp4"),
        description: "Interactive tools for constructing and simulating complex traffic networks to rigorously test autonomous systems in virtual environments.",
        link: "/tuc/core-team-projects/traffic-network"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const AiTeamProjects = () => {
    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            {/* Hero Section */}
            <section id="hero" className="relative bg-white pt-24 pb-12 overflow-hidden">


                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-12 text-center md:text-left">

                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="md:w-1/2 z-10"
                        >
                            <span className="inline-block px-3 py-1 mb-6 text-sm font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
                                Applied Intelligence
                            </span>
                            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
                                AI Team <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                    Projects
                                </span>
                            </h1>
                            <p className="text-xl text-gray-500 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                The AI Team Projects (ATP) bridge academia, cutting-edge AI/ML research, and international collaboration.
                                Jointly organized by Clausthal University of Technology (Goslar) and Universitatea Babeș-Bolyai (Cluj-Napoca),
                                this semester-long program challenges mixed teams to
                                build real-world AI and ML solutions.
                            </p>
                        </motion.div>

                        {/* Interactive Abstract Visual (hidden on mobile via CSS media query) */}
                        <motion.div
                            className="desktop-only flex md:w-1/2 relative justify-center perspective-1000 h-[400px] items-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            {/* Draggable Container */}
                            <motion.div
                                drag
                                dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
                                dragElastic={0.2}
                                whileHover={{ scale: 1.03, rotate: 4 }}
                                whileTap={{ scale: 0.98, cursor: "grabbing" }}
                                className="relative w-56 h-56 md:w-96 md:h-96 cursor-grab touch-none"
                            >
                                {/* Decorative Orbits/Grid - Auto Spinning */}
                                <div className="absolute inset-0 border-2 border-dashed border-blue-100 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none"></div>
                                <div className="absolute inset-8 border border-gray-100 rounded-full animate-[spin_15s_linear_infinite_reverse] pointer-events-none"></div>
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

                                {/* Center "Core" Cube - 3D Rotation */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 perspective-500">
                                    <motion.div
                                        animate={{
                                            rotateX: [0, 360],
                                            rotateY: [0, 360]
                                        }}
                                        transition={{
                                            duration: 10,
                                            ease: "linear",
                                            repeat: Infinity
                                        }}
                                        className="w-32 h-32 bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl flex items-center justify-center pt-8"
                                        style={{ transformStyle: "preserve-3d" }}
                                    >
                                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-inner transform translate-z-10"></div>
                                    </motion.div>

                                    {/* Orbital Dots */}
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                                        className="absolute inset-0 pointer-events-none"
                                    >
                                        <div className="w-4 h-4 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 absolute top-0 left-1/2 -translate-x-1/2"></div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>


                    </div>
                </div>
            </section>

            {/* Life at AI / Experience Section */}
            <section className="py-16 bg-gray-900 text-white overflow-hidden">
                <div className="container mx-auto px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-[0.2em] text-white mb-6">
                            The Experience
                        </h2>
                        <h3 className="text-2xl md:text-4xl font-light italic tracking-[0.1em] text-gray-400 uppercase">
                            <span className="block md:inline">WORK HARD 💪</span>
                            <span className="block md:inline">PLAY HARD 🏀</span>
                        </h3>
                        <p className="text-gray-300 max-w-4xl mx-auto mt-8 text-lg leading-relaxed">
                            The absolute highlight of the ATP experience are the two onsite travel weeks—one hosted in Cluj and one in Goslar. These weeks are full-immersion. Students don't just hack together on their AI models; they participate in all-day events where intense coding sessions are balanced with extensive teambuilding activities, cultural exchange, and evening socials. We believe that the best technical innovations come from teams that know how to connect, adapt, and have fun together.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* Video 1: Current Showcase */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-800 group"
                        >
                            <div className="absolute top-4 left-4 z-10">
                                <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full shadow-lg">
                                    LATEST
                                </span>
                            </div>
                            <video
                                src={assetUrl("/videos/demonstrations/autonomous_driving/CTP_Showcase.mp4")}
                                className="w-full h-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                                controls
                            />
                        </motion.div>

                        {/* Video 2: 2022 Showcase */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-800 group"
                        >
                            <div className="absolute top-4 left-4 z-10">
                                <span className="px-3 py-1 bg-gray-700 text-white text-xs font-bold rounded-full shadow-lg">
                                    ARCHIVE (2022)
                                </span>
                            </div>
                            <video
                                src={assetUrl("/videos/demonstrations/autonomous_driving/CTP_Showcase_2022.mp4")}
                                className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                                autoPlay
                                muted
                                loop
                                playsInline
                                controls
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Projects Grid Section - Active */}
            <section id="active-projects" className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 pointer-events-none"></div>

                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <div className="mb-12 text-center max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
                            Active Projects
                        </h2>
                        <div className="h-1.5 w-24 bg-blue-600 rounded-full mx-auto mb-6"></div>
                        <p className="text-xl text-gray-500 leading-relaxed">
                            Pushing the boundaries of what's possible in cognitive systems and automated intelligence.
                        </p>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                    >
                        {activeProjects.map((project) => (
                            <motion.div key={project.id} variants={itemVariants} className="h-full">
                                <ProjectCard project={project} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Student Experiences Section */}
            <section className="pt-6 pb-20 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                            Student Testimonials
                        </h2>
                        <div className="h-1.5 w-24 bg-blue-600 rounded-full mx-auto mb-4"></div>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-4 lg:gap-6 max-w-7xl mx-auto">
                        {[
                            { src: "/assets/videos/Student-Testim-1.mp4", poster: "" },
                            { src: "/assets/videos/Student-Testim-2.mp4", poster: "" },
                            { src: "/assets/videos/Student-Testim-3.mp4", poster: "" }
                        ].map((video, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative bg-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 mb-4 last:mb-0 md:mb-0"
                            >
                                <div className="aspect-video bg-black relative">
                                    <video
                                        src={assetUrl(video.src)}
                                        className="w-full h-full object-cover"
                                        controls
                                        playsInline
                                        preload="metadata"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Grid Section - Archive */}
            <section id="archive" className="pt-4 pb-20 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 md:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
                            Project Archive
                        </h2>
                        <div className="h-1.5 w-24 bg-blue-600 rounded-full mx-auto mb-8"></div>

                    </motion.div>

                    <div className="space-y-12">
                        {archiveProjects.map((project, index) => (
                            <ProjectRow key={project.id} project={project} index={index} />
                        ))}
                    </div>

                    {/* Previous University Projects */}
                    <div className="mt-16 pt-12 border-t border-gray-200">
                        <div className="max-w-3xl mx-auto text-center">
                            <p className="text-gray-500 text-lg leading-relaxed mb-6">
                                Looking for earlier iterations? These projects continue the tradition of our team projects from the University of Mannheim, where the same format ran under the European Master Team Project.
                            </p>
                            <a
                                href="https://www.uni-mannheim.de/en/ines/teaching/european-master-team-project/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors text-lg"
                            >
                                View previous projects at Uni Mannheim
                                <span>→</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AiTeamProjects;
