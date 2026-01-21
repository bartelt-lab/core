import { motion } from 'framer-motion'
import Navbar from '../components/common/Navbar'
import Section from '../components/common/Section'

const Dynamo = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-gray-900 text-white">
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
                            Demonstrate an integrated system where a humanoid robot identifies, grasps, and places multiple objects onto an autonomously navigating mobile base—validated entirely in simulation before real-world deployment.
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
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-start">
                                    <span className="font-semibold text-gray-900 mr-2">Mobile Base:</span>
                                    <span>Clearpath Ridgeback — autonomous navigation and payload transport</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="font-semibold text-gray-900 mr-2">Manipulator:</span>
                                    <span>Unitree G1 humanoid — dexterous, multi-object manipulation</span>
                                </li>
                            </ul>
                        </div>

                        {/* Simulation & Tooling */}
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-bold mb-4 text-accent-600 flex items-center">
                                <span className="w-8 h-8 rounded-full bg-accent-100 flex items-center justify-center mr-3 text-accent-600">2</span>
                                Simulation & Tooling
                            </h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-start">
                                    <span className="font-semibold text-gray-900 mr-2">Primary Simulator:</span>
                                    <span>NVIDIA Isaac Lab</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="font-semibold text-gray-900 mr-2">Scene Rep:</span>
                                    <span>Universal Scene Description (USD)</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="font-semibold text-gray-900 mr-2">Synthetic Data:</span>
                                    <span>Isaac Replicator for scalable training</span>
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
        </div>
    )
}

export default Dynamo
