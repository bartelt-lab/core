import { Link } from 'react-router-dom';
import { FiMail, FiMapPin } from 'react-icons/fi';
import assetUrl from '../../utils/assetUrl';
import TeamMemberCard from '../../components/team/TeamMemberCard';
import { getMembersByInstitution } from '../../data/team';
import { useLanguage } from '../../i18n/useLanguage';

const Home = () => {
    const { pick } = useLanguage();
    const tucMembers = getMembersByInstitution('TUC').filter(
        (m) => !['dominik-schulz', 'kai-kunze'].includes(m.slug)
    );
    const members = tucMembers.filter((m) => !['research_assistant', 'support_staff'].includes(m.roleCategory));
    const researchAssistants = tucMembers.filter((m) => m.roleCategory === 'research_assistant');
    const support = tucMembers.filter((m) => m.roleCategory === 'support_staff');

    return (
        <>
            {/* Hero */}
            <section className="border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-10 sm:pt-24 sm:pb-12">
                    <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                        COgnitive SoftwaRE
                    </h1>
                    <p className="mt-3 text-base sm:text-lg text-gray-500">
                        {pick(
                            'Research group at the Institute for Software Systems Engineering (ISSE), TU Clausthal.',
                            'Forschungsgruppe am Institute for Software Systems Engineering (ISSE), TU Clausthal.'
                        )}
                    </p>
                </div>
            </section>

            {/* Overview */}
            <section id="overview" className="border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-12 sm:pt-10 sm:pb-16">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">{pick('About', 'Über uns')}</h2>
                    <p className="max-w-3xl text-gray-700 leading-relaxed">
                        {pick(
                            'Our research group explores the intersection of artificial intelligence, cognitive computing, and software engineering. Our work focuses on developing machine learning models that enhance cognitive software systems, enabling adaptive, efficient, and interpretable AI solutions. We investigate topics such as neural network architectures, reasoning in language models, and AI-driven decision-making.',
                            'Unsere Forschungsgruppe arbeitet an der Schnittstelle von Künstlicher Intelligenz, kognitiven Systemen und Software Engineering. Wir entwickeln Machine-Learning-Modelle, die kognitive Softwaresysteme verbessern und adaptive, effiziente sowie interpretierbare KI-Lösungen ermöglichen. Dazu untersuchen wir unter anderem neuronale Netzwerkarchitekturen, Schlussfolgern in Sprachmodellen und KI-gestützte Entscheidungsfindung.'
                        )}
                    </p>

                    <div className="mt-10">
                        <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">{pick('Affiliations', 'Affiliationen')}</p>
                        <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
                            <a href="https://www.tu-clausthal.de" target="_blank" rel="noreferrer">
                                <img src={assetUrl('/logos/tu-clausthal.webp')} alt="TU Clausthal" loading="lazy" decoding="async" className="h-14 object-contain" />
                            </a>
                            <a href="https://www.digit-research.de" target="_blank" rel="noreferrer">
                                <img src={assetUrl('/logos/digit.webp')} alt="DIGIT" loading="lazy" decoding="async" className="h-14 object-contain" />
                            </a>
                            <Link to="/">
                                <img src={assetUrl('/logos/core/light-background/core.svg')} alt="CORE Network" loading="lazy" decoding="async" className="h-14 object-contain" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Members */}
            <section id="members" className="border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">{pick('Our Group', 'Unsere Gruppe')}</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-10">
                        {members.map((m) => (
                            <TeamMemberCard key={m.slug} member={m} showAffiliations={false} />
                        ))}
                    </div>

                    {researchAssistants.length > 0 && (
                        <>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-16 mb-8">{pick('Research Assistants', 'Wissenschaftliche Hilfskräfte')}</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-10">
                                {researchAssistants.map((m) => (
                                    <TeamMemberCard key={m.slug} member={m} showAffiliations={false} />
                                ))}
                            </div>
                        </>
                    )}

                    {support.length > 0 && (
                        <>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-16 mb-8">{pick('Support Staff', 'Unterstützung')}</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-10">
                                {support.map((m) => (
                                    <TeamMemberCard key={m.slug} member={m} showAffiliations={false} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Contact */}
            <section id="contact">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">{pick('Contact', 'Kontakt')}</h2>
                    <ul className="space-y-3 text-gray-700 list-none p-0">
                        <li className="flex items-start gap-3">
                            <FiMail className="mt-1 text-gray-400" size={18} />
                            <span>
                                Christian Bartelt:{' '}
                                <a className="underline decoration-gray-300 underline-offset-4 hover:decoration-gray-900" href="mailto:bartelt@isse.tu-clausthal.de">
                                    bartelt@isse.tu-clausthal.de
                                </a>
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <FiMapPin className="mt-1 text-gray-400" size={18} />
                            <a
                                href="https://maps.app.goo.gl/ZeN3Gz2aWHZDJxc8A"
                                target="_blank"
                                rel="noreferrer"
                                className="underline decoration-gray-300 underline-offset-4 hover:decoration-gray-900"
                            >
                                Wallstrasse 6, 38640 Goslar, Germany
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
};

export default Home;
