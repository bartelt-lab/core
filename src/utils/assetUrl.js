/**
 * Prepends the Vite base URL to a public asset path.
 * Use this for all references to files in /public (images, videos, JSON, PDFs, etc.)
 * 
 * Example: assetUrl('/assets/logos/logo.png') → '/bartelt-lab.github.io/assets/logos/logo.png'
 */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

export default function assetUrl(path) {
    return `${BASE}${path}`;
}
