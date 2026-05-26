import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const Expandable = ({ id, title, open, onToggle, children }) => (
    <div className="border border-gray-200 rounded-md overflow-hidden">
        <button
            type="button"
            onClick={() => onToggle(id)}
            aria-expanded={open}
            className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
        >
            <h3 className="m-0 text-lg font-semibold text-gray-900">{title}</h3>
            <FiChevronDown
                className={`text-gray-500 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                size={20}
            />
        </button>
        <div
            className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            }`}
        >
            <div className="overflow-hidden">
                <div className="px-5 py-4 prose prose-gray max-w-none prose-headings:text-gray-900 prose-a:text-gray-900 prose-a:underline prose-a:decoration-gray-300 hover:prose-a:decoration-gray-900">
                    {children}
                </div>
            </div>
        </div>
    </div>
);

const JoinUs = () => {
    const [expanded, setExpanded] = useState({});
    const toggle = (id) =>
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

    return (
        <section id="join-us">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Join Us</h1>
                </div>
                <div className="md:col-span-3 space-y-6">
                    <div className="border-l-4 border-gray-900 bg-gray-50 px-5 py-4">
                        <p className="m-0 text-gray-700">
                            We currently have open positions for PhD candidates and research assistants in our
                            research group <em>Cognitive Software</em> at the Institute for
                            Software Systems Engineering (ISSE) at TU Clausthal. Explore the opportunities below to
                            find the position that best fits your career goals.
                        </p>
                    </div>

                    <Expandable
                        id="phd"
                        title="PhD Position (Doctoral Candidate)"
                        open={!!expanded.phd}
                        onToggle={toggle}
                    >
                        <p>Du möchtest in der akademischen Forschung durchstarten und dich mit aktuellen Fragen der Künstlichen Intelligenz auseinandersetzen? Du begeisterst dich für anspruchsvolle Themen im Machine Learning und möchtest promovieren? Dann freuen wir uns darauf, dich kennenzulernen.</p>
                        <p>Unsere Forschungsgruppe Cognitive Software (<a href="https://www.isse.tu-clausthal.de/forschung/forschungsgruppen/machine-learning-and-cognitive-software">ISSE page</a>) am Institut für Software Systems Engineering (ISSE) der Technischen Universität Clausthal am Standort Goslar verbindet Grundlagenforschung mit praxisnahen Anwendungen. Unser Ziel ist es, moderne Architekturen und Engineering-Methoden für zukünftige KI-Systeme zu entwerfen und weiterzuentwickeln. In den kommenden Monaten starten bei uns mehrere große Drittmittelprojekte, insbesondere zu Generative AI, KI-Architekturen für Large Language Models und Reinforcement Learning. Dafür suchen wir motivierte neue Teammitglieder, die mit uns gemeinsam forschen wollen.</p>
                        <p>Unser Team besteht aus neun engagierten Wissenschaftlerinnen und Wissenschaftlern, die in einem kollegialen und dynamischen Umfeld zusammenarbeiten. Wir forschen gemeinsam mit international tätigen Unternehmen wie Bosch, BASF, Daimler, Roche, SAP und Siemens, aber auch mit Gründern innovativer Start-ups und Mittelständlern.</p>
                        <p>Wir suchen Bewerberinnen und Bewerber, die einen sehr guten Masterabschluss in Informatik, Mathematik oder einem verwandten Fachbereich mitbringen. Du solltest Interesse an einer wissenschaftlichen Laufbahn oder an einer späteren Tätigkeit in der industriellen Forschung mitbringen.</p>
                        <h4>Wir bieten …</h4>
                        <ul>
                            <li>Ein familienfreundliches und kollegiales Arbeitsumfeld in engagierten Teams sowie interdisziplinären und abwechslungsreichen Aufgabengebieten.</li>
                            <li>Die Möglichkeit innovative Ansätze und Lösungen selbstständig zu erarbeiten.</li>
                            <li>Die Möglichkeiten deine Ergebnisse direkt in Industrieprojekten zu evaluieren.</li>
                            <li>Die Möglichkeit der Promotion in Kooperation mit anderen Forschungspartnern und Unternehmen in Deutschland, sowie international.</li>
                            <li>Flexible Arbeitszeiten und die Möglichkeit zum Homeoffice.</li>
                            <li>Lounge Lab, Kicker und Social Events.</li>
                            <li>Regelmäßige Schulungen und Weiterbildungen.</li>
                        </ul>
                        <p>Wenn du dich angesprochen fühlst, freuen wir uns auf deine zeitnahe Bewerbung in deutscher oder englischer Sprache. Bitte sende deine Unterlagen bis zum <strong>31.10.2025</strong> (Anschreiben, Lebenslauf, Zeugnisse und Urkunden) ausschließlich per E-Mail an:</p>
                        <p>
                            <strong>Prof. Dr. Christian Bartelt</strong><br />
                            Technische Universität Clausthal<br />
                            COgnitive SoftwaRE<br />
                            Institut für Software Systems Engineering (ISSE)<br />
                            Wallstraße 6, 38640 Goslar<br />
                            E-Mail: <a href="mailto:bartelt@isse.tu-clausthal.de">bartelt@isse.tu-clausthal.de</a>
                        </p>
                        <p>Für Rückfragen stehen wir gerne zur Verfügung. Wir freuen uns auf dich!</p>
                    </Expandable>

                    <Expandable
                        id="assistant"
                        title="Student Assistants (HiWi)"
                        open={!!expanded.assistant}
                        onToggle={toggle}
                    >
                        <p><strong>(20–38 hours/month)</strong></p>
                        <p>Are you studying computer science, mathematics, or a related field and want to gain hands-on research experience in the field of Artificial Intelligence? Are you excited about machine learning, generative AI, or reinforcement learning, and want to contribute your skills to exciting projects? Then this role might be just what you are looking for!</p>
                        <p>Our Cognitive Software research group at the Institute for Software Systems Engineering (ISSE) of Clausthal University of Technology, based in Goslar, combines fundamental research with practical applications.</p>
                        <h4>Your tasks:</h4>
                        <ul>
                            <li>Support our research teams in current projects, e.g., generative AI, AI architectures for large language models, and reinforcement learning</li>
                            <li>Develop and prototype new research approaches</li>
                            <li>Data preparation, analysis, and modeling</li>
                            <li>Assist in planning and conducting scientific experiments</li>
                            <li>Support in preparing scientific publications and presentations</li>
                        </ul>
                        <h4>Your profile:</h4>
                        <ul>
                            <li>Enrolled student in computer science, mathematics, or a related degree program</li>
                            <li>Good programming skills in at least one language (e.g., Python, Java, C++)</li>
                            <li>Analytical thinking and interest in current developments in AI and software engineering</li>
                            <li>Ability to work in a team, strong communication skills, and independent work style</li>
                            <li>Good German and/or English language skills</li>
                        </ul>
                        <h4>We offer:</h4>
                        <ul>
                            <li>Working in an engaged, dynamic research team</li>
                            <li>Insights into current research projects with high practical relevance</li>
                            <li>Supervision and mentoring by experienced research staff</li>
                            <li>Opportunity to develop topics for your Master's / Bachelor's thesis</li>
                            <li>Flexible working hours and partial remote work by arrangement</li>
                            <li>Participation in team events and exchange with our industry partners</li>
                        </ul>
                    </Expandable>

                    <div className="bg-gray-50 border border-gray-200 rounded-md p-5 prose prose-gray max-w-none prose-a:text-gray-900 prose-a:underline">
                        <h4 className="mt-0">Interested?</h4>
                        <p>
                            <strong>For PhD Position applications:</strong><br />
                            Please send your complete application documents to{' '}
                            <a href="mailto:bartelt@isse.tu-clausthal.de">bartelt@isse.tu-clausthal.de</a>. Your
                            application should include: cover letter, personal details (name, study program, etc.),
                            preferred start date, CV, Bachelor's and Master's degree certificates, high school
                            diploma, and your latest academic work (Bachelor/Master's thesis or comparable).
                        </p>
                        <p>
                            <strong>For Student Assistant (HiWi) applications:</strong><br />
                            Please send a short application including your CV, current transcript of records, and a
                            brief description of your interests and skills to{' '}
                            <a href="mailto:tobias.sesterhenn@tu-clausthal.de">tobias.sesterhenn@tu-clausthal.de</a>.
                            Applications are accepted on a rolling basis.
                        </p>
                        <p>
                            Clausthal University of Technology is committed to equal opportunity and explicitly
                            encourages applications from qualified women. Applicants with disabilities will be given
                            preference if equally qualified.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JoinUs;
