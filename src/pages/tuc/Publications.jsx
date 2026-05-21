import { useState, useEffect } from 'react';
import assetUrl from '../../utils/assetUrl';
import PublicationItem from '../../components/tuc/PublicationItem';

const Publications = () => {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(assetUrl('/data/publications.json'))
            .then(res => res.json())
            .then(data => {
                const sorted = [...data.publications].sort((a, b) => new Date(b.date) - new Date(a.date));
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
