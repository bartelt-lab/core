import { useState, useEffect } from 'react';
import assetUrl from '../../utils/assetUrl';

const PublicationItem = ({ pub }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        return `${months[date.getMonth()]}, ${date.getFullYear()}`;
    };

    return (
        <div className="pub-list-item" itemScope itemType="http://schema.org/CreativeWork">
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
                        {pub.links && pub.links.map((link, index) => (
                            <a key={index} className="btn btn-primary btn-outline btn-xs" href={link.url}>
                                {link.text}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Publications = () => {
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

    if (loading) {
        return (
            <section className="home-section">
                <div className="container">Loading...</div>
            </section>
        );
    }

    return (
        <section id="publications" className="home-section">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-3 section-heading">
                        <h1>Publications</h1>
                    </div>
                    <div className="col-xs-12 col-md-9" id="publications-container">
                        {publications.map(pub => (
                            <PublicationItem key={pub.id} pub={pub} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Publications;
