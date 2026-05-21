const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return dateString;
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]}, ${date.getFullYear()}`;
};

const getLinks = (pub) => {
    const links = [];
    if (pub.url) links.push({ text: 'PDF', url: pub.url });
    if (pub.code) links.push({ text: 'Code', url: pub.code });
    return links;
};

const PublicationItem = ({ pub }) => {
    const links = getLinks(pub);

    return (
        <div className="pub-list-item" itemScope itemType="http://schema.org/CreativeWork">
            <div className="row">
                <div className="col-sm-4">
                    {pub.image && (
                        <img src={pub.image} className="pub-banner" itemProp="image" alt={pub.title} loading="lazy" />
                    )}
                </div>
                <div className="col-sm-8">
                    <h3 className="article-title" itemProp="name">{pub.title}</h3>
                    <div className="pub-authors" itemProp="author">
                        {pub.authors.map((author, index) => (
                            <span key={index} className="author-name">
                                {author.name}{index < pub.authors.length - 1 ? ', ' : ''}
                            </span>
                        ))}
                    </div>
                    <div className="pub-publication">
                        {pub.venue}
                        {pub.date && <div itemProp="datePublished">{formatDate(pub.date)}</div>}
                    </div>
                    {links.length > 0 && (
                        <div className="pub-links">
                            {links.map((link, idx) => (
                                <a key={idx} className="btn btn-primary btn-outline btn-xs" href={link.url} target="_blank" rel="noreferrer">{link.text}</a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PublicationItem;
