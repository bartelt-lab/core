import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Publications</h1>
                    <p className="mt-3 text-sm text-gray-500">
                        A short preview of recent research. The full archive is hosted on the CORE Network publications page.
                    </p>
                </div>
                {loading ? (
                    <p className="text-gray-500">Loading…</p>
                ) : (
                    <div>
                        {publications.slice(0, 3).map((pub) => (
                            <PublicationItem key={pub.id} pub={pub} />
                        ))}
                    </div>
                )}
                <div className="mt-8">
                    <Link
                        to="/publications"
                        className="inline-flex items-center rounded-full bg-gray-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                    >
                        View full publication archive
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Publications;
