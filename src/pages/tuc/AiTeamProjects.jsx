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
            <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-white via-primary-50/55 to-slate-100 pt-28 pb-16">
                <div className="absolute left-1/2 top-8 h-80 w-80 -translate-x-1/2 rounded-full bg-primary-200/25 blur-3xl" aria-hidden="true" />
                <div className="container relative mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-[0.95fr_1.05fr] md:px-10">
                    <div className="text-center md:text-left">
                        <span className="mb-6 inline-flex rounded-full border border-primary-100 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary-700 shadow-sm backdrop-blur">
                            Applied Intelligence
                        </span>
                        <h1 className="mb-5 text-5xl font-black leading-tight tracking-tight md:text-6xl">
                            AI Team<br />
                            <span className="text-primary-700">Projects</span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-base leading-8 text-slate-600 md:mx-0">
                            The AI Team Projects bridge academia, cutting-edge AI/ML research, and international collaboration.
                            Jointly organized by Clausthal University of Technology and Babeș-Bolyai University, this semester-long program challenges mixed teams to build real-world AI and ML solutions.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
                            <button
                                type="button"
                                onClick={() => scrollToSection('active-projects')}
                                className="rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-primary-700"
                            >
                                Current Projects
                            </button>
                            <button
                                type="button"
                                onClick={() => scrollToSection('archive')}
                                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-primary-200 hover:text-primary-700"
                            >
                                Archive Projects
                            </button>
                        </div>
                    </div>
                    <div className="hidden justify-center md:flex">
                        <div className="relative flex h-80 w-80 items-center justify-center rounded-full border border-dashed border-primary-100">
                            <div className="absolute inset-10 rounded-full border border-slate-100" />
                            <div className="absolute h-28 w-28 rotate-6 rounded-3xl bg-white shadow-2xl shadow-primary-100" />
                            <div className="relative h-24 w-24 rotate-6 rounded-2xl bg-primary-600 shadow-2xl shadow-primary-200" />
                            <div className="absolute right-20 top-40 h-4 w-4 rounded-full bg-sky-400" />
                        </div>
                    </div>
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
