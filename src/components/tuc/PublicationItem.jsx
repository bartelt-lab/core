const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return dateString;
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

const getLinks = (pub) => {
    const links = [];
    if (pub.url) links.push({ text: 'PDF', url: pub.url });
    if (pub.code) links.push({ text: 'Code', url: pub.code });
    return links;
};

const isImage = (path) => path && !/\.pdf$/i.test(path);

const PublicationItem = ({ pub }) => {
    const links = getLinks(pub);
    const showImage = isImage(pub.image);

    return (
        <article className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-4 sm:gap-6 py-6 border-b border-gray-200 last:border-b-0">
            {showImage ? (
                <div className="w-full sm:w-40 h-32 bg-gray-50 border border-gray-200 rounded overflow-hidden flex items-center justify-center">
                    <img src={pub.image} alt={pub.title} loading="lazy" className="w-full h-full object-contain" />
                </div>
            ) : (
                <div className="hidden sm:block" />
            )}
            <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 leading-snug">
                    {pub.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                    {pub.authors.map((a) => a.name).join(', ')}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                    {pub.venue}
                    {pub.date && <span className="text-gray-400"> · {formatDate(pub.date)}</span>}
                </p>
                {links.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {links.map((link, idx) => (
                            <a
                                key={idx}
                                className="inline-block px-3 py-1 text-xs font-medium border border-gray-300 text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 rounded-full transition-colors"
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {link.text}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
};

export default PublicationItem;
