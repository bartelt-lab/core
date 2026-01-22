import { motion } from 'framer-motion'
import { getNetworkMembers, institutions } from '../../data/team'

const getAssetUrl = (path) => {
    if (!path) return path
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `${import.meta.env.BASE_URL}${cleanPath}`
}

const PartnerNetwork = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Map Visual */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-7 relative rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-[500px] group"
            >
                <img
                    src={getAssetUrl('images/locations.png')}
                    alt="CORE Network Map"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent"></div>
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
                className="lg:col-span-5 space-y-12"
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
                                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow bg-gray-200 flex items-center justify-center flex-shrink-0">
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

            {/* Logos Grid Area - This needs to be outside the col-span-5 div to span correctly if intended as full row below, 
          but in original code it was separate in Network.jsx and nested in AboutSection.jsx. 
          To match exactly both, I will put the Logic Grid in a separate row wrapper in the usage context OR 
          include it here if the layout permits. 
          
          WAIT: In Network.jsx, the structure was:
          grid-cols-12 -> (Map col-7) + (Info col-5)
          THEN <div pt-2> Logo Grid </div>
          
          In AboutSection.jsx (my copy), I did:
          <div id="partners">
             grid-cols-12 ...
             <div pt-2> Logo Grid </div>
          </div>
          
          So the efficient reusable component should encapsulate BOTH the main split grid AND the logo grid row.
      */}

            <div className="col-span-1 lg:col-span-12 pt-2 border-t border-gray-100 mt-4">
                <div className="flex flex-wrap justify-center gap-8 md:gap-12 transition-all duration-500 items-center">
                    {/* TUC */}
                    <img src={getAssetUrl('images/logos/clausthal-logo.png')} alt="TU Clausthal" className="h-32 object-contain" />
                    {/* UBB Only */}
                    <img src={getAssetUrl('images/logos/ubb-logo.png')} alt="UBB" className="h-32 object-contain" />
                    {/* Rostock */}
                    <img src={getAssetUrl('images/logos/rostock-logo.png')} alt="University of Rostock" className="h-32 object-contain" />
                </div>
            </div>
        </div>
    )
}

export default PartnerNetwork
