import ResearchQuestionCard from './ResearchQuestionCard'

// Two-column intro: the objective (eyebrow + heading + body) beside the research-question card.
// Use below a hero; for a light header that already carries the title, use ResearchQuestionCard directly.
const ResearchQuestionIntro = ({ eyebrow = 'Objective', heading, body, question, tags }) => (
    <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-end">
        <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-primary-700">{eyebrow}</p>
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-950 md:text-4xl">{heading}</h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-600 md:text-base md:leading-8">{body}</p>
        </div>
        <ResearchQuestionCard question={question} tags={tags} />
    </div>
)

export default ResearchQuestionIntro
