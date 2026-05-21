import { useState, useEffect } from 'react';
import assetUrl from '../../utils/assetUrl';
import PublicationItem from '../../components/tuc/PublicationItem';

const Publications = () => {
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

    return (
        <section id="publications">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Publications</h1>
                {loading ? (
                    <p className="text-gray-500">Loading…</p>
                ) : (
                    <div>
                        {publications.map((pub) => (
                            <PublicationItem key={pub.id} pub={pub} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Publications;
