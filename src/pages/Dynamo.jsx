import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Section from '../components/common/Section'
import Button from '../components/common/Button'

const Dynamo = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900 text-white">
                <div className="absolute inset-0">
                    <img
                        src={`${import.meta.env.BASE_URL}videos/demonstrations/robotics/Lab4K.jpeg`}
                        alt="Dynamo Lab"
                        className="w-full h-full object-cover opacity-40"
                    />
                </div>
                <div className="relative z-10 container mx-auto px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-heading font-bold mb-6"
                    >
                        DyNAMO
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
                    >
                        Dynamic Navigation And Manipulation Operations
                    </motion.p>
                </div>
            </section>

            {/* Goal Section */}
            <Section id="goal" className="bg-white">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-heading font-bold mb-6 text-gray-900">The Goal</h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            Dynamo aims to demonstrate an integrated system where a humanoid robot identifies, grasps, and places multiple objects onto an autonomously navigating mobile base. This requires solving complex challenges in Sim2Real transfer, where policies learned in simulation must robustly handle the noise and unpredictability of the physical world without extensive real-world fine-tuning.
                        </p>
                        <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-primary-600">
                            <p className="italic text-gray-600">
                                "Bridging the gap between perception, reasoning, and action."
                            </p>
                        </div>
                    </div>
                    <div className="relative rounded-2xl overflow-hidden shadow-xl">
                        <img
                            src={`${import.meta.env.BASE_URL}videos/demonstrations/robotics/Dynamo_Goal_Illustration.png`}
                            alt="Dynamo Goal Illustration"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </Section>

            {/* Visual Abstract Section */}
            <Section id="overview" className="bg-gray-50">
                <div className="flex flex-col items-center">
                    <h2 className="text-3xl font-heading font-bold mb-10 text-gray-900 text-center">System Architecture</h2>
                    <div className="max-w-5xl w-full shadow-2xl rounded-2xl overflow-hidden bg-white">
                        <img
                            src={`${import.meta.env.BASE_URL}videos/demonstrations/robotics/DynamoVisualAbstract.png`}
                            alt="Dynamo Visual Abstract"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </Section>

            {/* Technical Overview Section */}
            <Section id="technical" className="bg-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-heading font-bold mb-12 text-center text-gray-900">Technical Overview</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Hardware Stack */}
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-bold mb-4 text-primary-700 flex items-center">
                                <span className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center mr-3 text-primary-600">1</span>
                                Hardware Stack
                            </h3>
                            <ul className="space-y-4 text-gray-600">
                                <li className="flex items-start">
                                    <span className="font-semibold text-gray-900 mr-2 min-w-[100px]">Mobile Base:</span>
                                    <span>
                                        <strong>Clearpath Ridgeback</strong> — An omnidirectional platform designed for developing manipulation algorithms. It handles heavy payloads and provides a stable base for the humanoid torso.
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="font-semibold text-gray-900 mr-2 min-w-[100px]">Manipulator:</span>
                                    <span>
                                        <strong>Unitree G1 Humanoid</strong> — Features high-torque motors and advanced dexterity, allowing for complex multi-object manipulation and diverse grasping strategies.
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Simulation & Tooling */}
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-bold mb-4 text-accent-600 flex items-center">
                                <span className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center mr-3 text-accent-600">2</span>
                                Simulation & Tooling
                            </h3>
                            <ul className="space-y-4 text-gray-600">
                                <li className="flex items-start">
                                    <span className="font-semibold text-gray-900 mr-2 min-w-[140px]">Primary Simulator:</span>
                                    <span>
                                        <strong>NVIDIA Isaac Lab</strong> — Leverages GPU-accelerated physics to simulate thousands of environments in parallel, drastically reducing training time for reinforcement learning policies.
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="font-semibold text-gray-900 mr-2 min-w-[140px]">Scene Rep:</span>
                                    <span>
                                        <strong>Universal Scene Description (USD)</strong> — Enables high-fidelity asset interchange and complex scene composition, ensuring the simulation closely matches the physical lab environment.
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="font-semibold text-gray-900 mr-2 min-w-[140px]">Synthetic Data:</span>
                                    <span>
                                        <strong>Isaac Replicator</strong> — Procedurally generates diverse training data with randomized textures and lighting to improve the vision system's generalization.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Core Technical Focus */}
                    <div className="mt-12 bg-gray-900 text-white p-8 rounded-2xl shadow-xl">
                        <h3 className="text-2xl font-bold mb-6 text-center">Core Technical Focus</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="flex items-start">
                                <div className="w-2 h-2 mt-2 rounded-full bg-primary-400 mr-3 flex-shrink-0"></div>
                                <p>Autonomous navigation, mapping, and socially aware path planning</p>
                            </div>
                            <div className="flex items-start">
                                <div className="w-2 h-2 mt-2 rounded-full bg-primary-400 mr-3 flex-shrink-0"></div>
                                <p>AI-based manipulation using foundation models, imitation learning, and VLA policies</p>
                            </div>
                            <div className="flex items-start">
                                <div className="w-2 h-2 mt-2 rounded-full bg-primary-400 mr-3 flex-shrink-0"></div>
                                <p>Interface-driven system design to decouple mobility, manipulation, and perception</p>
                            </div>
                            <div className="flex items-start">
                                <div className="w-2 h-2 mt-2 rounded-full bg-primary-400 mr-3 flex-shrink-0"></div>
                                <p>Procedural simulation environments with accurate physics and digital twins</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Experiments & Results Section */}
            <Section id="experiments" className="bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-heading font-bold mb-8 text-gray-900">Experiments & Results</h2>

                    <div className="bg-white p-12 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-6 text-primary-600 animate-pulse">
                            <span className="text-2xl">⚡</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Research in Progress</h3>
                        <p className="text-gray-600 max-w-lg mb-8">
                            We are actively conducting experiments on Sim2Real transfer and long-horizon manipulation tasks.
                            Initial benchmarking results and demonstrations will be published here shortly.
                        </p>
                        <div className="flex gap-4">
                            <div className="h-3 w-3 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '0s' }}></div>
                            <div className="h-3 w-3 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="h-3 w-3 rounded-full bg-primary-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Navigation Footer */}
            <Section className="bg-gray-50 pb-20">
                <div className="flex justify-center">
                    <Link to="/">
                        <Button variant="outline" size="lg" className="group">
                            <span className="mr-2">←</span> Back to CORE Labs
                        </Button>
                    </Link>
                </div>
            </Section>
        </div >
    )
}

export default Dynamo
