// The "Research question" card — a primary-tinted glassy card holding the question + stack tags.
// Used standalone in a light header (VialSort) and inside ResearchQuestionIntro.
const ResearchQuestionCard = ({ question, tags = [], label = 'Research question', className = '' }) => (
    <div className={`rounded-2xl border border-primary-100 bg-white/85 p-5 shadow-xl shadow-primary-100/70 backdrop-blur ${className}`}>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">{label}</p>
        <p className="mt-3 text-sm leading-7 text-slate-600">{question}</p>
        {tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-bold text-primary-800"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        )}
    </div>
)

export default ResearchQuestionCard
