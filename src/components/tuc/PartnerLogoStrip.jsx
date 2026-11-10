import { PARTNER_LOGOS } from '../../data/industryProjects';

const PartnerLogo = ({ partner, compact = false }) => {
    const logo = PARTNER_LOGOS[partner];

    if (!logo) {
        return <span className={`text-xs font-semibold text-slate-700 ${compact ? 'block max-w-full truncate text-center' : ''}`}>{partner}</span>;
    }

    const logoImage = (
        <img
            src={logo.src}
            alt={logo.alt}
            loading="lazy"
            decoding="async"
            className={`h-auto w-auto object-contain ${compact ? 'max-h-7 max-w-[4.75rem] sm:max-w-[5.25rem]' : 'max-h-8 max-w-[7rem]'}`}
        />
    );

    const className = compact
        ? 'inline-flex h-9 w-[4.75rem] shrink-0 items-center justify-center transition hover:opacity-80 sm:w-[5.25rem]'
        : 'inline-flex min-h-10 min-w-10 items-center justify-center transition hover:opacity-80';

    if (!logo.href) return <span className={className} title={partner}>{logoImage}</span>;

    return (
        <a href={logo.href} target="_blank" rel="noreferrer" className={className} title={partner} aria-label={`${partner} website`}>
            {logoImage}
        </a>
    );
};

const PartnerLogoStrip = ({ partners }) => {
    const isCompact = partners.length >= 3;
    const className = isCompact
        ? 'mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-3'
        : 'mt-5 flex flex-wrap items-center justify-center gap-3';

    return (
        <div className={className} aria-label="Project partners">
            {partners.map((partner) => <PartnerLogo key={partner} partner={partner} compact={isCompact} />)}
        </div>
    );
};

export default PartnerLogoStrip;
