import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useLanguage } from '../../i18n/useLanguage';

const Expandable = ({ id, title, open, onToggle, children }) => (
    <div className="overflow-hidden rounded-md border border-gray-200">
        <button
            type="button"
            onClick={() => onToggle(id)}
            aria-expanded={open}
            className="flex w-full items-center justify-between bg-gray-50 px-5 py-4 text-left transition-colors hover:bg-gray-100"
        >
            <h3 className="m-0 text-lg font-semibold text-gray-900">{title}</h3>
            <FiChevronDown
                className={`text-gray-500 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                size={20}
            />
        </button>
        <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
            <div className="overflow-hidden">
                <div className="prose prose-gray max-w-none px-5 py-4 prose-a:text-gray-900 prose-a:underline prose-a:decoration-gray-300 prose-headings:text-gray-900 hover:prose-a:decoration-gray-900">
                    {children}
                </div>
            </div>
        </div>
    </div>
);

const JoinUs = () => {
    const [expanded, setExpanded] = useState({});
    const { pick } = useLanguage();
    const toggle = (id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

    return (
        <section id="join-us">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-4">
                <div className="md:col-span-1">
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Join Us</h1>
                </div>
                <div className="space-y-6 md:col-span-3">
                    <div className="border-l-4 border-gray-900 bg-gray-50 px-5 py-4">
                        <p className="m-0 text-gray-700">
                            {pick(
                                <>We currently have open positions for PhD candidates and research assistants in our research group <em>Cognitive Software</em> at the Institute for Software Systems Engineering (ISSE) at TU Clausthal. Explore the opportunities below to find the position that best fits your career goals.</>,
                                <>Wir haben derzeit offene Stellen für Promovierende und wissenschaftliche Hilfskräfte in unserer Forschungsgruppe <em>Cognitive Software</em> am Institute for Software Systems Engineering (ISSE) der TU Clausthal. Die folgenden Möglichkeiten helfen dir, die passende Position für deine Ziele zu finden.</>
                            )}
                        </p>
                    </div>

                    <Expandable id="phd" title="PhD Position (Doctoral Candidate)" open={!!expanded.phd} onToggle={toggle}>
                        <p>{pick('Would you like to start in academic research and work on current questions in artificial intelligence? Are you excited by challenging machine learning topics and interested in pursuing a doctorate? Then we look forward to getting to know you.', 'Du möchtest in der akademischen Forschung durchstarten und dich mit aktuellen Fragen der Künstlichen Intelligenz auseinandersetzen? Du begeisterst dich für anspruchsvolle Themen im Machine Learning und möchtest promovieren? Dann freuen wir uns darauf, dich kennenzulernen.')}</p>
                        <p>
                            {pick(
                                <>Our Cognitive Software research group (<a href="https://www.isse.tu-clausthal.de/forschung/forschungsgruppen/machine-learning-and-cognitive-software">ISSE page</a>) at the Institute for Software Systems Engineering (ISSE) of Clausthal University of Technology in Goslar combines fundamental research with practical applications. Our goal is to design and advance modern architectures and engineering methods for future AI systems. In the coming months, several major third-party funded projects will start, especially in generative AI, AI architectures for large language models, and reinforcement learning. We are looking for motivated new team members who want to research with us.</>,
                                <>Unsere Forschungsgruppe Cognitive Software (<a href="https://www.isse.tu-clausthal.de/forschung/forschungsgruppen/machine-learning-and-cognitive-software">ISSE page</a>) am Institut für Software Systems Engineering (ISSE) der Technischen Universität Clausthal am Standort Goslar verbindet Grundlagenforschung mit praxisnahen Anwendungen. Unser Ziel ist es, moderne Architekturen und Engineering-Methoden für zukünftige KI-Systeme zu entwerfen und weiterzuentwickeln. In den kommenden Monaten starten bei uns mehrere große Drittmittelprojekte, insbesondere zu Generative AI, KI-Architekturen für Large Language Models und Reinforcement Learning. Dafür suchen wir motivierte neue Teammitglieder, die mit uns gemeinsam forschen wollen.</>
                            )}
                        </p>
                        <p>{pick('Our team consists of nine dedicated researchers working together in a collegial and dynamic environment. We collaborate with international companies such as Bosch, BASF, Daimler, Roche, SAP, and Siemens, as well as founders of innovative start-ups and medium-sized companies.', 'Unser Team besteht aus neun engagierten Wissenschaftlerinnen und Wissenschaftlern, die in einem kollegialen und dynamischen Umfeld zusammenarbeiten. Wir forschen gemeinsam mit international tätigen Unternehmen wie Bosch, BASF, Daimler, Roche, SAP und Siemens, aber auch mit Gründern innovativer Start-ups und Mittelständlern.')}</p>
                        <p>{pick('We are looking for applicants with a very good master’s degree in computer science, mathematics, or a related field. You should be interested in an academic career or a later role in industrial research.', 'Wir suchen Bewerberinnen und Bewerber, die einen sehr guten Masterabschluss in Informatik, Mathematik oder einem verwandten Fachbereich mitbringen. Du solltest Interesse an einer wissenschaftlichen Laufbahn oder an einer späteren Tätigkeit in der industriellen Forschung mitbringen.')}</p>
                        <h4>{pick('We offer...', 'Wir bieten ...')}</h4>
                        <ul>
                            <li>{pick('A family-friendly and collegial work environment in committed teams with interdisciplinary and varied tasks.', 'Ein familienfreundliches und kollegiales Arbeitsumfeld in engagierten Teams sowie interdisziplinären und abwechslungsreichen Aufgabengebieten.')}</li>
                            <li>{pick('The opportunity to independently develop innovative approaches and solutions.', 'Die Möglichkeit innovative Ansätze und Lösungen selbstständig zu erarbeiten.')}</li>
                            <li>{pick('The opportunity to evaluate your results directly in industry projects.', 'Die Möglichkeiten deine Ergebnisse direkt in Industrieprojekten zu evaluieren.')}</li>
                            <li>{pick('The possibility of a doctorate in cooperation with research partners and companies in Germany and internationally.', 'Die Möglichkeit der Promotion in Kooperation mit anderen Forschungspartnern und Unternehmen in Deutschland, sowie international.')}</li>
                            <li>{pick('Flexible working hours and the possibility to work from home.', 'Flexible Arbeitszeiten und die Möglichkeit zum Homeoffice.')}</li>
                            <li>Lounge Lab, Kicker und Social Events.</li>
                            <li>{pick('Regular training and continuing education.', 'Regelmäßige Schulungen und Weiterbildungen.')}</li>
                        </ul>
                        <p>{pick(<>If this sounds interesting, we look forward to receiving your timely application in German or English. Please send your documents by <strong>31.10.2025</strong> (cover letter, CV, certificates, and records) exclusively by email to:</>, <>Wenn du dich angesprochen fühlst, freuen wir uns auf deine zeitnahe Bewerbung in deutscher oder englischer Sprache. Bitte sende deine Unterlagen bis zum <strong>31.10.2025</strong> (Anschreiben, Lebenslauf, Zeugnisse und Urkunden) ausschließlich per E-Mail an:</>)}</p>
                        <p>
                            <strong>Prof. Dr. Christian Bartelt</strong><br />
                            Technische Universität Clausthal<br />
                            COgnitive SoftwaRE<br />
                            Institut für Software Systems Engineering (ISSE)<br />
                            Wallstraße 6, 38640 Goslar<br />
                            E-Mail: <a href="mailto:bartelt@isse.tu-clausthal.de">bartelt@isse.tu-clausthal.de</a>
                        </p>
                        <p>{pick('We are happy to answer any questions. We look forward to hearing from you!', 'Für Rückfragen stehen wir gerne zur Verfügung. Wir freuen uns auf dich!')}</p>
                    </Expandable>

                    <Expandable id="assistant" title="Student Assistants (HiWi)" open={!!expanded.assistant} onToggle={toggle}>
                        <p><strong>{pick('(20-38 hours/month)', '(20-38 Stunden/Monat)')}</strong></p>
                        <p>{pick('Are you studying computer science, mathematics, or a related field and want to gain hands-on research experience in the field of Artificial Intelligence? Are you excited about machine learning, generative AI, or reinforcement learning, and want to contribute your skills to exciting projects? Then this role might be just what you are looking for!', 'Studierst du Informatik, Mathematik oder ein verwandtes Fach und möchtest praktische Forschungserfahrung im Bereich Künstliche Intelligenz sammeln? Begeisterst du dich für Machine Learning, generative KI oder Reinforcement Learning und möchtest deine Fähigkeiten in spannende Projekte einbringen? Dann könnte diese Stelle genau das Richtige für dich sein!')}</p>
                        <p>{pick('Our Cognitive Software research group at the Institute for Software Systems Engineering (ISSE) of Clausthal University of Technology, based in Goslar, combines fundamental research with practical applications.', 'Unsere Forschungsgruppe Cognitive Software am Institute for Software Systems Engineering (ISSE) der Technischen Universität Clausthal am Standort Goslar verbindet Grundlagenforschung mit praxisnahen Anwendungen.')}</p>
                        <h4>{pick('Your tasks:', 'Deine Aufgaben:')}</h4>
                        <ul>
                            <li>{pick('Support our research teams in current projects, e.g., generative AI, AI architectures for large language models, and reinforcement learning', 'Unterstützung unserer Forschungsteams in aktuellen Projekten, z. B. generative KI, KI-Architekturen für Large Language Models und Reinforcement Learning')}</li>
                            <li>{pick('Develop and prototype new research approaches', 'Entwicklung und Prototyping neuer Forschungsansätze')}</li>
                            <li>{pick('Data preparation, analysis, and modeling', 'Datenaufbereitung, Analyse und Modellierung')}</li>
                            <li>{pick('Assist in planning and conducting scientific experiments', 'Mitarbeit bei der Planung und Durchführung wissenschaftlicher Experimente')}</li>
                            <li>{pick('Support in preparing scientific publications and presentations', 'Unterstützung bei der Erstellung wissenschaftlicher Publikationen und Präsentationen')}</li>
                        </ul>
                        <h4>{pick('Your profile:', 'Dein Profil:')}</h4>
                        <ul>
                            <li>{pick('Enrolled student in computer science, mathematics, or a related degree program', 'Eingeschriebene:r Student:in der Informatik, Mathematik oder eines verwandten Studiengangs')}</li>
                            <li>{pick('Good programming skills in at least one language (e.g., Python, Java, C++)', 'Gute Programmierkenntnisse in mindestens einer Sprache (z. B. Python, Java, C++)')}</li>
                            <li>{pick('Analytical thinking and interest in current developments in AI and software engineering', 'Analytisches Denken und Interesse an aktuellen Entwicklungen in KI und Software Engineering')}</li>
                            <li>{pick('Ability to work in a team, strong communication skills, and independent work style', 'Teamfähigkeit, Kommunikationsstärke und selbstständige Arbeitsweise')}</li>
                            <li>{pick('Good German and/or English language skills', 'Gute Deutsch- und/oder Englischkenntnisse')}</li>
                        </ul>
                        <h4>{pick('We offer:', 'Wir bieten:')}</h4>
                        <ul>
                            <li>{pick('Working in an engaged, dynamic research team', 'Arbeit in einem engagierten, dynamischen Forschungsteam')}</li>
                            <li>{pick('Insights into current research projects with high practical relevance', 'Einblicke in aktuelle Forschungsprojekte mit hoher Praxisrelevanz')}</li>
                            <li>{pick('Supervision and mentoring by experienced research staff', 'Betreuung und Mentoring durch erfahrene wissenschaftliche Mitarbeitende')}</li>
                            <li>{pick('Opportunity to develop topics for your Master’s / Bachelor’s thesis', 'Möglichkeit, Themen für deine Master- oder Bachelorarbeit zu entwickeln')}</li>
                            <li>{pick('Flexible working hours and partial remote work by arrangement', 'Flexible Arbeitszeiten und teilweise Remote-Arbeit nach Absprache')}</li>
                            <li>{pick('Participation in team events and exchange with our industry partners', 'Teilnahme an Teamevents und Austausch mit unseren Industriepartnern')}</li>
                        </ul>
                    </Expandable>

                    <div className="prose prose-gray max-w-none rounded-md border border-gray-200 bg-gray-50 p-5 prose-a:text-gray-900 prose-a:underline">
                        <h4 className="mt-0">{pick('Interested?', 'Interessiert?')}</h4>
                        <p>
                            <strong>{pick('For PhD Position applications:', 'Für Bewerbungen auf die Promotionsstelle:')}</strong><br />
                            {pick('Please send your complete application documents to', 'Bitte sende deine vollständigen Bewerbungsunterlagen an')}{' '}
                            <a href="mailto:bartelt@isse.tu-clausthal.de">bartelt@isse.tu-clausthal.de</a>.
                            {pick(
                                ' Your application should include: cover letter, personal details (name, study program, etc.), preferred start date, CV, Bachelor’s and Master’s degree certificates, high school diploma, and your latest academic work (Bachelor/Master’s thesis or comparable).',
                                ' Deine Bewerbung sollte enthalten: Anschreiben, persönliche Angaben (Name, Studiengang usw.), bevorzugtes Startdatum, Lebenslauf, Bachelor- und Masterzeugnisse, Abiturzeugnis und deine letzte wissenschaftliche Arbeit (Bachelor-/Masterarbeit oder vergleichbar).'
                            )}
                        </p>
                        <p>
                            <strong>{pick('For Student Assistant (HiWi) applications:', 'Für Bewerbungen als studentische Hilfskraft (HiWi):')}</strong><br />
                            {pick(
                                'Please send a short application including your CV, current transcript of records, and a brief description of your interests and skills to',
                                'Bitte sende eine kurze Bewerbung mit Lebenslauf, aktuellem Notenspiegel und einer kurzen Beschreibung deiner Interessen und Fähigkeiten an'
                            )}{' '}
                            <a href="mailto:tobias.sesterhenn@tu-clausthal.de">tobias.sesterhenn@tu-clausthal.de</a>.
                            {' '}{pick('Applications are accepted on a rolling basis.', 'Bewerbungen werden fortlaufend angenommen.')}
                        </p>
                        <p>
                            {pick(
                                'Clausthal University of Technology is committed to equal opportunity and explicitly encourages applications from qualified women. Applicants with disabilities will be given preference if equally qualified.',
                                'Die Technische Universität Clausthal setzt sich für Chancengleichheit ein und fordert qualifizierte Frauen ausdrücklich zur Bewerbung auf. Bewerber:innen mit Behinderung werden bei gleicher Qualifikation bevorzugt.'
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JoinUs;
