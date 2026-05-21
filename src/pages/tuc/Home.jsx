import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiMail, FiGlobe, FiMapPin } from 'react-icons/fi';
import { FaGoogleScholar } from 'react-icons/fa6';
import assetUrl from '../../utils/assetUrl';
import PublicationItem from '../../components/tuc/PublicationItem';
import { teamMembers, getMemberBySlug } from '../../data/team';

const SOCIAL_ICON = {
    email: FiMail,
    website: FiGlobe,
    scholar: FaGoogleScholar,
};

// Order of Bartelt-lab members on this page. Slugs from team.js.
const HOME_MEMBER_SLUGS = [
    'bartelt',
    'marton',
    'kolthoff',
    'brinkmann',
    'zenkner',
    'grams',
    'knab',
    'sesterhenn',
    'szilagyi',
    'homa',
    'herre',
    'paul-koenig',
    'birsan',
];

const SUPPORT_SLUGS = ['ottow'];

const socialEntries = (member) => {
    const entries = [];
    if (member.email) entries.push({ kind: 'email', url: `mailto:${member.email}` });
    if (member.links?.scholar) entries.push({ kind: 'scholar', url: member.links.scholar });
    if (member.links?.website) entries.push({ kind: 'website', url: member.links.website });
    return entries;
};

const MemberCard = ({ member }) => {
    const socials = socialEntries(member);
    return (
        <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border border-gray-200 mb-3">
                {member.photo ? (
                    <img
                        src={assetUrl(member.photo)}
                        alt={member.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200" />
                )}
            </div>
            <h3 className="text-sm font-semibold text-gray-900 leading-tight">{member.name}</h3>
            <p className="text-xs text-gray-500 mt-1">{member.title}</p>
            {socials.length > 0 && (
                <ul className="flex gap-3 mt-2 list-none p-0">
                    {socials.map((s) => {
                        const Icon = SOCIAL_ICON[s.kind] || FiGlobe;
                        return (
                            <li key={s.kind}>
                                <a
                                    href={s.url}
                                    className="text-gray-400 hover:text-gray-900 transition-colors"
                                    aria-label={s.kind}
                                    target={s.kind === 'email' ? undefined : '_blank'}
                                    rel="noreferrer"
                                >
                                    <Icon size={16} />
                                </a>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

const Home = () => {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(assetUrl('/data/publications.json'))
            .then((res) => res.json())
            .then((data) => {
                const sorted = [...data.publications].sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                );
                setPublications(sorted);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to load publications', err);
                setLoading(false);
            });
    }, []);

    const members = HOME_MEMBER_SLUGS.map(getMemberBySlug).filter(Boolean);
    const support = SUPPORT_SLUGS.map(getMemberBySlug).filter(Boolean);

    return (
        <>
            {/* Hero */}
            <section className="border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
                    <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
                        Machine Learning and COgnitive SoftwaRE
                    </h1>
                    <p className="mt-3 text-base sm:text-lg text-gray-500">
                        Research group at the Institute for Software Systems Engineering (ISSE), TU Clausthal.
                    </p>
                </div>
            </section>

            {/* Overview */}
            <section id="overview" className="border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                    <p className="max-w-3xl text-gray-700 leading-relaxed">
                        Our research group explores the intersection of artificial intelligence, cognitive computing,
                        and software engineering. Our work focuses on developing machine learning models that enhance
                        cognitive software systems, enabling adaptive, efficient, and interpretable AI solutions. We
                        investigate topics such as neural network architectures, reasoning in language models, and
                        AI-driven decision-making.
                    </p>

                    <div className="mt-10">
                        <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Affiliations</p>
                        <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
                            <a href="https://www.tu-clausthal.de" target="_blank" rel="noreferrer">
                                <img src={assetUrl('/logos/tu-clausthal.jpeg')} alt="TU Clausthal" className="h-14 object-contain" />
                            </a>
                            <a href="https://www.digit-research.de" target="_blank" rel="noreferrer">
                                <img src={assetUrl('/logos/digit.jpg')} alt="DIGIT" className="h-14 object-contain" />
                            </a>
                        </div>
                    </div>

                    <div className="mt-10">
                        <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Partner Institutions</p>
                        <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
                            <a href="https://www.uni-mannheim.de" target="_blank" rel="noreferrer">
                                <img src={assetUrl('/logos/uma.png')} alt="University of Mannheim" className="h-14 object-contain" />
                            </a>
                            <a href="https://www.diepsam.uni-rostock.de/en/" target="_blank" rel="noreferrer">
                                <img src={assetUrl('/logos/universitaet-rostock.png')} alt="University of Rostock" className="h-14 object-contain" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Publications preview */}
            <section id="publications" className="border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                    <div className="flex items-end justify-between mb-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Publications</h2>
                        <Link
                            to="/tuc/publications"
                            className="text-sm font-medium text-gray-600 hover:text-gray-900"
                        >
                            See all →
                        </Link>
                    </div>
                    {loading ? (
                        <p className="text-gray-500">Loading publications…</p>
                    ) : (
                        <div>
                            {publications.slice(0, 3).map((pub) => (
                                <PublicationItem key={pub.id} pub={pub} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Members */}
            <section id="members" className="border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Members</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-10">
                        {members.map((m) => (
                            <MemberCard key={m.slug} member={m} />
                        ))}
                    </div>

                    {support.length > 0 && (
                        <>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-16 mb-8">Support Staff</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-10">
                                {support.map((m) => (
                                    <MemberCard key={m.slug} member={m} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Contact */}
            <section id="contact">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Contact</h2>
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
                                Wallstraße 6, 38640 Goslar, Germany
                            </a>
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
};

export default Home;
