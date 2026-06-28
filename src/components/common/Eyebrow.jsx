// Quiet uppercase eyebrows — the project-subpage signature accent (a single green hairline).
// One spec everywhere: text-[11px] font-bold uppercase tracking-[0.18em]; color is the only variable.

export const Label = ({ children }) => (
    <div className="flex items-center gap-2.5">
        <span className="h-px w-5 bg-primary-500" aria-hidden="true" />
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">{children}</span>
    </div>
)

export const MiniLabel = ({ children }) => (
    <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
        <span className="h-px w-4 bg-primary-500" aria-hidden="true" />
        {children}
    </p>
)
