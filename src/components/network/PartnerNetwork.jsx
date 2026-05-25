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
        <div className="space-y-10">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] items-start">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <div className="space-y-3">
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">CORE Network Map</p>
                        <h3 className="text-2xl md:text-3xl font-heading font-bold text-slate-950">Distributed Research Network</h3>
                        <p className="text-sm md:text-base text-slate-600">Connecting innovation hubs across Germany and Romania.</p>
                    </div>
                    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-xl">
                        <img
                            src={getAssetUrl('images/locations.png')}
                            alt="CORE Network Map"
                            className="h-[320px] w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-[420px]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                    <h3 className="text-2xl font-heading font-bold text-slate-950">Participating Institutions</h3>
                    <p className="mt-2 text-slate-600 leading-relaxed">
                        Our labs operate as a unified distributed entity, sharing resources, data, and expertise to accelerate discovery.
                    </p>

                    <div className="mt-6 space-y-4">
                        {getNetworkMembers().filter(m => [1, 2, 4].includes(m.id)).map((pi) => (
                            <div key={pi.id} className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                                <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-200 shadow-sm bg-slate-200 flex items-center justify-center flex-shrink-0">
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
                                                    parent.classList.add('text-slate-400', 'font-bold', 'text-lg');
                                                }
                                            }}
                                        />
                                    ) : (
                                        <div className="text-slate-400 font-bold text-lg">{pi.name.split(' ').map(n => n[0]).join('')}</div>
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <h4 className="font-bold text-slate-900 truncate">{pi.prefix ? `${pi.prefix} ${pi.name}` : pi.name}</h4>
                                    <p className="text-primary-600 text-sm font-semibold">Principal Investigator</p>
                                    <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold mt-0.5 truncate">
                                        {pi.affiliations[0].institution.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <div className="border-t border-slate-200 pt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {partnerLogos.map((partner) => (
                        <a
                            key={partner.institution.shortName}
                            href={partner.institution.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group min-h-28 rounded-xl border border-slate-200 bg-white px-6 py-6 flex items-center justify-center shadow-sm hover:border-blue-200 hover:shadow-lg transition-all"
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
