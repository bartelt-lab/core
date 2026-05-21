import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import assetUrl from '../../utils/assetUrl';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]}, ${date.getFullYear()}`;
};

const MemberProfile = ({ name, role, image, link, socials }) => (
    <div className="col-xs-12 col-sm-3">
        <div id="profile">
            <a href={link || '#'}>
                <div
                    className="portrait"
                    itemProp="image"
                    style={image
                        ? { backgroundImage: `url(${image})` }
                        : { backgroundImage: 'none', backgroundColor: '#cccccc' }
                    }
                >
                    {image && <img src={image} alt="" loading="lazy" style={{ display: 'none' }} />}
                </div>
            </a>
            <div className="portrait-title">
                <h2 itemProp="name">
                    <a href={link || '#'}>{name}</a>
                </h2>
                <h4>{role}</h4>
                {socials && socials.length > 0 && (
                    <ul className="social-icon-main-page">
                        {socials.map((s, i) => (
                            <li key={i}>
                                <a href={s.url}>
                                    <i className={`${s.icon} small-icon`} aria-hidden="true"></i>
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    </div>
);

const members = [
    {
        name: 'Christian Bartelt', role: 'Group Leader', image: assetUrl('/tuc/assets/members/bartelt.png'),
        link: '#member/bartelt/',
        socials: [{ url: 'mailto:bartelt@isse.tu-clausthal.de', icon: 'fa fa-envelope' }]
    },
    {
        name: 'Sascha Marton', role: 'Postdoctoral Researcher', image: assetUrl('/tuc/assets/members/marton.jpg'),
        link: '#member/sascha/',
        socials: [
            { url: 'mailto:sascha.marton@tu-clausthal.de', icon: 'fa fa-envelope' },
            { url: 'https://scholar.google.com/citations?user=5PQJ3sEAAAAJ', icon: 'ai ai-google-scholar' },
            { url: 'https://s-marton.github.io', icon: 'fa fa-globe' }
        ]
    },
    {
        name: 'Kristian Kolthoff', role: 'Research Associate', image: assetUrl('/tuc/assets/members/kolthoff.png'),
        link: '#member/kolthoff/',
        socials: [
            { url: 'mailto:kristian.kolthoff@tu-clausthal.de', icon: 'fa fa-envelope' },
            { url: 'https://scholar.google.com/citations?user=OJBv75IAAAAJ&hl=de', icon: 'ai ai-google-scholar' }
        ]
    },
    {
        name: 'Jannik Brinkmann', role: 'Research Associate', image: assetUrl('/tuc/assets/members/brinkmann.png'),
        link: '#member/brinkmann/',
        socials: [
            { url: 'mailto:jannik.brinkmann@tu-clausthal.de', icon: 'fa fa-envelope' },
            { url: 'https://scholar.google.com/citations?hl=en&user=YtdTeaMAAAAJ&view_op=list_works', icon: 'ai ai-google-scholar' }
        ]
    },
    {
        name: 'Janis Zenkner', role: 'Research Associate', image: assetUrl('/tuc/assets/members/zenkner.png'),
        link: '#member/zenkner/',
        socials: [
            { url: 'mailto:janis.zenkner@tu-clausthal.de', icon: 'fa fa-envelope' },
            { url: 'https://scholar.google.de/citations?user=beX-uhUAAAAJ&hl=de&oi=ao', icon: 'ai ai-google-scholar' },
            { url: 'https://www.linkedin.com/in/janis-zenkner-704b8a188/', icon: 'fa fa-linkedin' }
        ]
    },
    {
        name: 'Tim Grams', role: 'Research Associate', image: assetUrl('/tuc/assets/members/grams.png'),
        link: '#member/grams/',
        socials: [
            { url: 'mailto:tim.grams@tu-clausthal.de', icon: 'fa fa-envelope' }
        ]
    },
    {
        name: 'Patrick Knab', role: 'Research Associate', image: assetUrl('/tuc/assets/members/knab.jpg'),
        link: '#member/knab/',
        socials: [
            { url: 'mailto:patrick.knab@tu-clausthal.de', icon: 'fa fa-envelope' },
            { url: 'https://scholar.google.de/citations?user=pzg1sbgAAAAJ&hl=de', icon: 'ai ai-google-scholar' },
            { url: 'https://patrick-knab.github.io', icon: 'fa fa-globe' }
        ]
    },
    {
        name: 'Tobias Sesterhenn', role: 'Research Associate', image: assetUrl('/tuc/assets/members/sesterhenn.png'),
        link: '#member/sesterhenn/',
        socials: [
            { url: 'mailto:tobias.sesterhenn@tu-clausthal.de', icon: 'fa fa-envelope' }
        ]
    },
    {
        name: 'David Szilagyi', role: 'Research Associate', image: assetUrl('/tuc/assets/members/david.jpg'),
        link: '#member/david/',
        socials: [
            { url: 'mailto:david.szilagyi@tu-clausthal.de', icon: 'fa fa-envelope' }
        ]
    },
    {
        name: 'Celina Homa', role: 'PhD Student / Mercedes-Benz', image: assetUrl('/tuc/assets/members/celina.jpeg'),
        link: '#member/celina',
        socials: [
            { url: 'https://www.linkedin.com/in/celina-homa-b00a29153/', icon: 'fa fa-linkedin' }
        ]
    },
    {
        name: 'Markus Herre', role: 'Research Associate', image: assetUrl('/tuc/assets/members/herre.jpeg'),
        link: '#member/markus',
        socials: [
            { url: 'https://www.linkedin.com/in/markus-herre/', icon: 'fa fa-linkedin' },
            { url: 'mailto:Markus.herre@tu-clausthal.de', icon: 'fa fa-envelope' },
            { url: 'https://m-herre.github.io/', icon: 'fa fa-globe' }
        ]
    },
    {
        name: 'Paul Koenig', role: 'PhD Student', image: assetUrl('/tuc/assets/members/paul.jpeg'),
        link: '#member/paul',
        socials: [
            { url: 'mailto:paul.koenig@tu-clausthal.de', icon: 'fa fa-envelope' },
            { url: 'https://www.linkedin.com/in/p-koenig/', icon: 'fa fa-linkedin' }
        ]
    },
    {
        name: 'Mihail Birsan', role: 'Research Associate', image: assetUrl('/tuc/assets/members/mihail.jpg'),
        link: '#member/mihail',
        socials: [
            { url: 'https://www.linkedin.com/in/mihail-birsan-4b1916207/', icon: 'fa fa-linkedin' }
        ]
    }
];

const supportStaff = [
    {
        name: 'Mareike Kroeller', role: 'Administrative Assistant', image: null,
        socials: [{ url: 'mailto:mareike.kroeller@tu-clausthal.de', icon: 'fa fa-envelope' }]
    },
    {
        name: 'Steffen Ottow', role: 'IT Specialist', image: assetUrl('/tuc/assets/members/steffenottow.jpg'),
        socials: [{ url: 'mailto:steffen.ottow@tu-clausthal.de', icon: 'fa fa-envelope' }]
    }
];

const Home = () => {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(assetUrl('/tuc/publications.json'))
            .then(res => res.json())
            .then(data => {
                const sorted = data.publications.sort((a, b) => new Date(b.date) - new Date(a.date));
                setPublications(sorted);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load publications', err);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <header className="space-below">
                <div className="header-content">
                    <div className="header-content-inner">
                        <h1>Machine Learning and COgnitive SoftwaRE (CORE)</h1>
                    </div>
                </div>
            </header>

            <section id="overview" className="home-section">
                <div className="container">
                    <p>
                        Our research group explores the intersection of artificial intelligence, cognitive computing, and software engineering. Our work focuses on developing machine learning models that enhance cognitive software systems, enabling adaptive, efficient, and interpretable AI solutions. We investigate topics such as neural network architectures, reasoning in language models, and AI-driven decision-making. By bridging theoretical insights with practical applications, our research aims to advance the capabilities of intelligent software systems in diverse domains, from natural language processing to complex decision support systems.
                    </p>
                    <p></p>

                    <div className="row logos-row">
                        <div className="col-xs-2 affiliate-logos"></div>
                        <div className="col-xs-4 affiliate-logos">
                            <a href="https://www.tu-clausthal.de">
                                <img className="affiliate-logos" src={assetUrl("/tuc/assets/logos/tu_clausthal.jpeg")} alt="logo" />
                            </a>
                        </div>
                        <div className="col-xs-4 affiliate-logos">
                            <a href="https://www.digit-research.de">
                                <img className="affiliate-logos" src={assetUrl("/tuc/assets/logos/digit.jpg")} alt="logo" />
                            </a>
                        </div>
                        <div className="col-xs-2 affiliate-logos"></div>
                    </div>
                    <div className="row partner-institutions-header" style={{ marginTop: '40px' }}>
                        <div className="col-xs-12 text-center">
                            <p>Partner Institutions:</p>
                        </div>
                    </div>
                    <div className="row logos-row" style={{ marginTop: '20px' }}>
                        <div className="col-xs-2 affiliate-logos"></div>
                        <div className="col-xs-4 affiliate-logos">
                            <a href="https://www.uni-mannheim.de">
                                <img className="affiliate-logos" src={assetUrl("/tuc/assets/logos/uma.png")} alt="University of Mannheim" />
                            </a>
                        </div>
                        <div className="col-xs-4 affiliate-logos">
                            <a href="https://www.diepsam.uni-rostock.de/en/">
                                <img className="affiliate-logos" src={assetUrl("/tuc/assets/logos/universitaet-rostock.png")} alt="University of Rostock" />
                            </a>
                        </div>
                        <div className="col-xs-2 affiliate-logos"></div>
                    </div>
                </div>
            </section>

            <section id="publications" className="home-section">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-3 section-heading">
                            <h1>Publications</h1>
                            <Link to="/tuc/publications" className="see-all-link">See all publications &gt;&gt;</Link>
                        </div>
                        <div className="col-xs-12 col-md-9" id="publications-container">
                            {loading ? (
                                <p>Loading publications...</p>
                            ) : (
                                publications.slice(0, 3).map(pub => (
                                    <div key={pub.id} className="pub-list-item" itemScope itemType="http://schema.org/CreativeWork">
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <a href={`#publication/${pub.id}/`}>
                                                    <img src={pub.image} className="pub-banner" itemProp="image" alt={pub.title} loading="lazy" />
                                                </a>
                                            </div>
                                            <div className="col-sm-8">
                                                <h3 className="article-title" itemProp="name">{pub.title}</h3>
                                                <div className="pub-authors" itemProp="author">
                                                    <div itemProp="author">
                                                        {pub.authors.map((author, index) => (
                                                            <span key={index} className="author-name">
                                                                {author.link ? (
                                                                    <a href={author.link}>{author.name}</a>
                                                                ) : (
                                                                    author.name
                                                                )}
                                                                {index < pub.authors.length - 1 ? ', ' : ''}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="pub-publication">
                                                    {pub.venue}
                                                    <div itemProp="datePublished">{formatDate(pub.date)}</div>
                                                </div>
                                                <div className="pub-links">
                                                    {pub.links && pub.links.map((link, idx) => (
                                                        <a key={idx} className="btn btn-primary btn-outline btn-xs" href={link.url}>{link.text}</a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section id="members" className="home-section">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-4 section-heading">
                            <h1 className="section-heading">Members</h1>
                        </div>
                    </div>
                    <div className="row">
                        {members.map((m, i) => (
                            <MemberProfile key={i} {...m} />
                        ))}
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-4 section-heading">
                            <h1 className="section-heading">Support Staff</h1>
                        </div>
                    </div>
                    <div className="row">
                        {supportStaff.map((m, i) => (
                            <MemberProfile key={i} {...m} />
                        ))}
                    </div>
                </div>
            </section>

            <section id="contact" className="home-section">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-3 section-heading">
                            <h1>Contacts</h1>
                        </div>
                        <div className="col-xs-12 col-md-9">
                            <ul className="list-unstyled">
                                <li>
                                    <i className="fa fa-envelope fa-fw" aria-hidden="true"></i>
                                    <span>
                                        Christian Bartelt:{' '}
                                        <a href="mailto:christian.bartelt@tu-clausthal.de">core@isse.tu-clausthal.de</a>
                                    </span>
                                </li>
                                <li>
                                    <i className="fa fa-map-marker fa-fw" aria-hidden="true"></i>
                                    <span>
                                        <a href="https://maps.app.goo.gl/ZeN3Gz2aWHZDJxc8A">Wallstrasse 6, 38640 Goslar, Germany</a>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
