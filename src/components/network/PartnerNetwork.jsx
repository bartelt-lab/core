import { motion } from 'framer-motion'
import { getNetworkMembers, institutions } from '../../data/team'

const getAssetUrl = (path) => {
    if (!path) return path
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `${import.meta.env.BASE_URL}${cleanPath}`
}

const PartnerNetwork = () => {
    const partnerLogos = [
        { institution: institutions.TUC, logo: 'logos/clausthal-logo.png', alt: 'TU Clausthal', className: 'h-14 md:h-16' },
        { institution: institutions.UBB, logo: 'logos/ubb-logo.png', alt: 'Babeș-Bolyai University', className: 'h-20 md:h-24' },
        { institution: institutions.ROSTOCK, logo: 'logos/rostock-logo.png', alt: 'University of Rostock', className: 'h-16 md:h-20' },
    ]

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Map Visual */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-7 relative rounded-lg overflow-hidden shadow-xl h-[360px] md:h-[480px] group border border-gray-200"
            >
                <img
                    src={getAssetUrl('images/locations.png')}
                    alt="CORE Network Map"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/10 to-transparent"></div>
                <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-white">
                    <h3 className="text-3xl font-bold mb-2">Distributed Research Network</h3>
                    <p className="text-gray-300">Connecting innovation hubs across Germany and Romania.</p>
                </div>
            </motion.div>

            {/* Partner Info */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-5 space-y-10"
            >
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">Participating Institutions</h3>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        Our labs operate as a unified distributed entity, sharing resources, data, and expertise to accelerate discovery.
                    </p>

                    {/* Principal Investigators List */}
                    <div className="space-y-8">
                        {getNetworkMembers().filter(m => [1, 2, 4].includes(m.id)).map((pi) => (
                            <div key={pi.id} className="flex items-center gap-4">
                                <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-gray-200 flex items-center justify-center flex-shrink-0">
                                    {pi.photo ? (
                                        <img
                                            src={getAssetUrl(pi.photo)}
                                            alt={pi.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                const parent = e.target.parentElement;
                                                e.target.style.display = 'none';
                                                if (parent) {
                                                    parent.innerText = pi.name.split(' ').map(n => n[0]).join('');
                                                    parent.classList.add('text-gray-400', 'font-bold', 'text-lg');
                                                }
                                            }}
                                        />
                                    ) : (
                                        <div className="text-gray-400 font-bold text-lg">{pi.name.split(' ').map(n => n[0]).join('')}</div>
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{pi.prefix ? `${pi.prefix} ${pi.name}` : pi.name}</h4>
                                    <p className="text-primary-600 text-sm font-medium">Principal Investigator</p>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold mt-0.5">
                                        {pi.affiliations[0].institution.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            <div className="col-span-1 lg:col-span-12 pt-8 border-t border-gray-200 mt-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {partnerLogos.map((partner) => (
                        <a
                            key={partner.institution.shortName}
                            href={partner.institution.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group min-h-32 rounded-lg border border-gray-200 bg-white px-6 py-5 flex items-center justify-center hover:border-blue-200 hover:shadow-lg transition-all"
                            aria-label={`Open ${partner.institution.name} official website`}
                        >
                            <img
                                src={getAssetUrl(partner.logo)}
                                alt={partner.alt}
                                className={`${partner.className} max-w-full object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all`}
                            />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PartnerNetwork
