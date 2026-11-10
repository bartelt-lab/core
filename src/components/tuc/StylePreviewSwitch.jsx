import { Link, useLocation } from 'react-router-dom';
import { TUC_STYLES, useTucStyle } from '../../pages/tuc/home/tucStyle';

// REVIEW SCAFFOLD: floating picker for the three /tuc looks. Delete with tucStyle.js.
const StylePreviewSwitch = () => {
    const current = useTucStyle();
    const { pathname } = useLocation();
    return (
        <div className="fixed bottom-20 sm:bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-slate-300 bg-white/95 p-1 text-xs font-semibold shadow-lg backdrop-blur">
            <span className="px-2 text-slate-500">Look</span>
            {TUC_STYLES.map((s) => (
                <Link
                    key={s.id}
                    to={`${pathname}?style=${s.id}`}
                    className={`rounded-full px-3 py-1.5 transition ${current === s.id ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`}
                >
                    {s.label}
                </Link>
            ))}
        </div>
    );
};

export default StylePreviewSwitch;
