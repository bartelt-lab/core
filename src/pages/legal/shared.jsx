import { operator } from '../../data/legal'

// The legal pages are plain on purpose: one narrow text column, no cards, no
// hero. They are read rarely and by people looking for one fact, so they should
// read like a document, not like a landing page.

/** Page frame: clears the floating Navbar itself, so it needs no wrapper in App.jsx. */
export const LegalPage = ({ title, children }) => (
    <div className="min-h-screen bg-white">
        <article className="mx-auto max-w-[44rem] px-6 pb-20 pt-28 sm:pt-36">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{title}</h1>
            <div className="mt-10 space-y-10">{children}</div>
        </article>
    </div>
)

/** One titled passage of a legal page. */
export const Block = ({ id, title, children }) => (
    <section id={id} className="scroll-mt-28">
        <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
        <div className="mt-3 space-y-3 leading-relaxed text-slate-700 [&_a]:font-semibold [&_a]:text-primary-700 [&_a]:underline [&_a]:underline-offset-2">
            {children}
        </div>
    </section>
)

/** Name and postal address of the operator, one item per line. */
export const Address = ({ person = operator, pick }) => (
    <address className="not-italic">
        {person.name}
        <br />
        {person.street}
        <br />
        {person.city}
        <br />
        {pick(person.country[1], person.country[0])}
    </address>
)

export const Ext = ({ href, children }) => (
    <a href={href} target="_blank" rel="noreferrer">{children}</a>
)
