/**
 * Prepends the Vite base URL to a public asset path.
 * Use for any /public reference (images, videos, JSON, PDFs, etc.).
 *
 * Example (with base '/'):       assetUrl('/logos/core-labs-logo.svg') → '/logos/core-labs-logo.svg'
 * Example (with base '/core/'):  assetUrl('/logos/core-labs-logo.svg') → '/core/logos/core-labs-logo.svg'
 */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

export default function assetUrl(path) {
    if (!path) return path;
    const clean = path.startsWith('/') ? path : `/${path}`;
    return `${BASE}${clean}`;
}
