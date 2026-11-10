import { useLocation } from 'react-router-dom'

// REVIEW SCAFFOLD — three candidate looks for /tuc, switchable with
// `?style=split|rail|banded`. Once one is chosen, delete this file, the
// two losing Home variants and StylePreviewSwitch, and inline the winner.
export const TUC_STYLES = [
    { id: 'split', label: 'A · Split' },
    { id: 'rail', label: 'B · Rail' },
    { id: 'banded', label: 'C · Banded' },
]

const KEY = 'tuc-style-preview'
const valid = (v) => TUC_STYLES.some((s) => s.id === v)

export const useTucStyle = () => {
    const { search } = useLocation()
    const fromUrl = new URLSearchParams(search).get('style')
    if (valid(fromUrl)) {
        try { sessionStorage.setItem(KEY, fromUrl) } catch { /* storage blocked */ }
        return fromUrl
    }
    try {
        const stored = sessionStorage.getItem(KEY)
        if (valid(stored)) return stored
    } catch { /* storage blocked */ }
    return 'split'
}
