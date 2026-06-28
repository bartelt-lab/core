import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import assetUrl from '../../utils/assetUrl';
import LazyVideo from '../../components/common/LazyVideo';

const activeProjects = [
    {
        id: 'dynamo',
        title: 'DyNAMO',
        tag: 'Cognitive Systems / RL',
        image: assetUrl('/images/projects/dynamo/hero.webp'),
        description: 'Developing a cognitive framework for dynamic manipulation and reasoning in unstructured environments. Bridging perception and action with advanced RL.',
        link: '/ai-team-projects/dynamo',
    },
    {
        id: 'ai4ai',
        title: 'AI4AI',
        tag: 'Computer Vision / LLMs',
        image: assetUrl('/images/projects/ai4ai/hero.webp'),
        description: 'From Image to Model using AI-assisted AI. Transitioning static images into editable engineering models by leveraging LLMs and Computer Vision.',
        link: '/ai-team-projects/ai4ai',
    },
    {
        id: 'vergabepilot',
        title: 'Vergabepilot.AI',
        tag: 'LLMs / Web Automation',
        image: assetUrl('/images/projects/vergabepilot/hero.webp'),
        description: 'LLM-based tender scraping for state-of-the-art tender search. Automating web scraper generation and validation using LLMs and MLLM agents.',
        link: '/ai-team-projects/vergabepilot',
    },
];

const archiveProjects = [
    {
        id: 'neurocore',
        title: 'NeuroCore Dashboard',
        tag: 'MLOps / Monitoring',
        video: assetUrl('/videos/demonstrations/neurocore/NeuroCore_demo.mp4'),
        description: 'A dashboard for orchestrating machine learning training jobs, monitoring GPU and node health, and visualizing real-time analytics.',
        link: '/ai-team-projects/neurocore',
    },
    {
        id: 'stratego',
        title: 'Stratego - LLM Based Games',
        tag: 'LLMs / Games',
        video: assetUrl('/videos/demonstrations/stratego/stratego-demo-rp3.mp4'),
        description: 'Explore how different large language models compete in Stratego through automated matchups and gameplay behavior logging.',
        link: '/ai-team-projects/stratego',
    },
    {
        id: 'self-driving',
        title: 'Self-Driving 1:10',
        tag: 'Autonomous Navigation',
        youtubeId: 'wrY34WyTEzo',
        description: 'A completed initiative scaling down autonomous driving algorithms for rapid prototyping with SLAM and path planning.',
        link: '/ai-team-projects/self-driving',
    },
    {
        id: 'traffic-network',
        title: 'Traffic Network Builder',
        tag: 'Simulation Tools',
        video: assetUrl('/videos/demonstrations/autonomous_driving/TrafficNetworkBuilder.mp4'),
        description: 'Interactive tools for constructing and simulating complex traffic networks to test autonomous systems in virtual environments.',
        link: '/ai-team-projects/traffic-network',
    },
];

const testimonials = [
    assetUrl('/videos/testimonials/Student-Testim-1.mp4'),
    assetUrl('/videos/testimonials/Student-Testim-2.mp4'),
    assetUrl('/videos/testimonials/Student-Testim-3.mp4'),
];

const Media = ({ project }) => {
    if (project.youtubeId) {
        return (
            <iframe
                src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${project.youtubeId}`}
                title={project.title}
                className="h-full w-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
            />
        );
    }

    if (project.video) {
        return <LazyVideo src={project.video} className="h-full w-full object-cover" autoPlay muted loop />;
    }

    return <img src={project.image} alt={project.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />;
};

const AiTeamProjects = () => {
    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="min-h-screen bg-white text-slate-950">
            <section id="hero" className="relative isolate min-h-[760px] overflow-hidden border-b border-slate-200 bg-white pb-20 pt-32 sm:pb-24 sm:pt-36">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(219,234,254,0.85),transparent_30%),radial-gradient(circle_at_84%_74%,rgba(220,252,231,0.72),transparent_32%),linear-gradient(135deg,#ffffff_0%,#f8fbff_48%,#f4fbf8_100%)]" aria-hidden="true" />
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.07)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" aria-hidden="true" />
                <div className="absolute -right-24 top-28 -z-10 h-[34rem] w-[34rem] rounded-full bg-blue-100/60 blur-3xl" aria-hidden="true" />
                <div className="container relative mx-auto grid min-h-[560px] max-w-7xl items-center gap-14 px-6 md:px-10 lg:grid-cols-[0.95fr_1.05fr]">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, ease: 'easeOut' }}
                        className="text-center lg:text-left"
                    >
                        <span className="mb-7 inline-flex rounded-full border border-blue-200 bg-white/80 px-5 py-2 text-xs font-bold uppercase tracking-[0.22em] text-blue-700 shadow-sm shadow-blue-100/70 backdrop-blur">
                            Applied Intelligence
                        </span>
                        <h1 className="font-heading text-6xl font-black leading-[0.95] tracking-[-0.06em] text-slate-950 sm:text-7xl lg:text-[5.75rem]">
                            AI Team
                            <span className="block bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">Projects</span>
                        </h1>
                        <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-600 md:text-lg lg:mx-0 lg:leading-9">
                            The AI Team Projects bridge academia, cutting-edge AI/ML research, and international collaboration.
                            Jointly organized by Clausthal University of Technology and Babeș-Bolyai University, this semester-long program challenges mixed teams to build real-world AI and ML solutions.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-slate-500 lg:justify-start">
                            {['Mixed teams', 'Real-world systems', 'Research culture'].map((item) => (
                                <span key={item} className="inline-flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                                    {item}
                                </span>
                            ))}
                        </div>
                        <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
                            <button
                                type="button"
                                onClick={() => scrollToSection('active-projects')}
                                className="group inline-flex items-center gap-2 rounded-full bg-slate-950 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-300/60 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700"
                            >
                                Current Projects
                                <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                onClick={() => scrollToSection('archive')}
                                className="rounded-full border border-slate-200 bg-white/85 px-7 py-3.5 text-sm font-bold text-slate-700 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700"
                            >
                                Archive Projects
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.94, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
                        className="relative mx-auto flex min-h-[25rem] w-full max-w-[34rem] items-center justify-center lg:min-h-[34rem]"
                        aria-hidden="true"
                    >
                        <div className="absolute h-[22rem] w-[22rem] rounded-full border border-dashed border-blue-200/80 bg-white/20 lg:h-[29rem] lg:w-[29rem]" />
                        <div className="absolute h-[15rem] w-[15rem] rounded-full border border-slate-200/70 bg-white/30 lg:h-[21rem] lg:w-[21rem]" />
                        <motion.img
                            src={assetUrl('/icons/avocando-icon.svg')}
                            alt=""
                            className="relative z-10 h-64 w-auto drop-shadow-[0_28px_32px_rgba(15,23,42,0.18)] sm:h-72 lg:h-[22rem]"
                            animate={{ y: [-12, 10, -12], rotate: [-2.5, 2.5, -2.5] }}
                            transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </motion.div>
                </div>
            </section>

            <section className="bg-slate-950 py-16 text-white">
                <div className="container mx-auto max-w-6xl px-6 md:px-10">
                    <div className="mx-auto mb-10 max-w-4xl text-center">
                        <h2 className="mb-2 text-3xl font-light uppercase tracking-[0.24em]">The Experience</h2>
                        <p className="mb-4 text-lg font-bold italic tracking-[0.12em]">WORK HARD 💪PLAY HARD 🏀</p>
                        <p className="text-sm leading-7 text-slate-300">
                            The absolute highlight of the ATP experience are the two onsite travel weeks—one hosted in Cluj and one in Goslar. These weeks are full-immersion. Students don't just hack together on their AI models; they participate in all-day events where intense coding sessions are balanced with extensive teambuilding activities, cultural exchange, and evening socials. We believe that the best technical innovations come from teams that know how to connect, adapt, and have fun together
                        </p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-2">
                        {[
                            ['LATEST', '/videos/demonstrations/autonomous_driving/CTP_Showcase.mp4'],
                            ['ARCHIVE (2022)', '/videos/demonstrations/autonomous_driving/CTP_Showcase_2022.mp4'],
                        ].map(([label, src]) => (
                            <div key={label} className="relative overflow-hidden rounded-lg shadow-2xl">
                                <span className="absolute left-4 top-4 z-10 rounded-full bg-primary-600 px-3 py-1 text-xs font-bold">{label}</span>
                                <LazyVideo src={assetUrl(src)} poster={assetUrl(src.replace('.mp4', '-poster.webp'))} className="aspect-video w-full object-cover" controls muted autoPlay loop />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="active-projects" className="bg-gray-50 py-16">
                <div className="container mx-auto max-w-6xl px-6 md:px-10">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-light">Active Projects</h2>
                        <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-primary-600" />
                        <p className="mt-5 text-sm text-slate-500">Pushing the boundaries of what's possible in cognitive systems and automated intelligence.</p>
                    </div>
                    <div className="grid gap-7 md:grid-cols-3">
                        {activeProjects.map((project) => (
                            <Link key={project.id} to={project.link} className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <img src={project.image} alt={project.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                                    <span className="absolute left-3 top-3 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-bold text-white">{project.tag}</span>
                                    <span className="absolute bottom-3 right-3 rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700">View details</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="mb-3 text-xl font-bold text-primary-700">{project.title}</h3>
                                    <p className="text-sm leading-7 text-slate-600">{project.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section id="testimonials" className="bg-white py-16">
                <div className="container mx-auto max-w-6xl px-6 md:px-10">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-light">Student Testimonials</h2>
                        <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-primary-600" />
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {testimonials.map((src, index) => (
                            <motion.div key={src} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="overflow-hidden rounded-lg bg-slate-950 shadow-xl">
                                <LazyVideo src={src} poster={src.replace('.mp4', '-poster.webp')} className="aspect-video w-full object-cover" controls />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="archive" className="bg-white py-16">
                <div className="container mx-auto max-w-6xl px-6 md:px-10">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-light">Project Archive</h2>
                        <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-primary-600" />
                    </div>
                    <div className="space-y-16">
                        {archiveProjects.map((project, index) => (
                            <div key={project.id} className={`grid items-center gap-10 md:grid-cols-2 ${index % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}>
                                <div className="aspect-video overflow-hidden rounded-lg bg-slate-950 shadow-2xl">
                                    <Media project={project} />
                                </div>
                                <div>
                                    <div className="mb-3 flex items-center gap-3">
                                        <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-bold uppercase text-primary-700">Archive</span>
                                        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">{project.tag}</span>
                                    </div>
                                    <h3 className="mb-4 text-2xl font-bold">{project.title}</h3>
                                    <p className="mb-5 leading-7 text-slate-600">{project.description}</p>
                                    <Link to={project.link} className="inline-flex items-center gap-2 text-sm font-bold text-primary-700">
                                        View Project Details
                                        <FaArrowRight className="h-3 w-3" aria-hidden="true" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-16 border-t border-slate-200 pt-10 text-center">
                        <p className="mx-auto mb-4 max-w-3xl text-sm leading-7 text-slate-500">
                            Looking for earlier iterations? These projects continue the tradition of our team projects from the University of Mannheim, where the same format ran under the European Master Team Project.
                        </p>
                        <a href="https://www.uni-mannheim.de/en/ines/teaching/european-master-team-project/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-primary-700">
                            View previous projects at Uni Mannheim
                            <FaArrowRight className="h-3 w-3" aria-hidden="true" />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AiTeamProjects;
