import { useState } from 'react';

const JoinUs = () => {
    const [expandedSections, setExpandedSections] = useState({});

    const toggleSection = (sectionId) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    return (
        <>
            <style>{`
                .expandable-section {
                    margin-bottom: 30px;
                    border: 1px solid #e0e0e0;
                    border-radius: 8px;
                    overflow: hidden;
                }
                .expandable-header {
                    background-color: #f8f9fa;
                    padding: 20px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                    border-bottom: 1px solid #e0e0e0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .expandable-header:hover {
                    background-color: #e9ecef;
                }
                .expandable-header h3 {
                    margin: 0;
                    font-size: 1.4em;
                    color: #317053;
                    font-weight: 500;
                }
                .expandable-toggle {
                    width: 20px;
                    height: 20px;
                    position: relative;
                    cursor: pointer;
                    transition: transform 0.3s ease;
                    flex-shrink: 0;
                }
                .expandable-toggle::before {
                    content: '';
                    position: absolute;
                    top: 6px;
                    left: 6px;
                    width: 0;
                    height: 0;
                    border-left: 4px solid transparent;
                    border-right: 4px solid transparent;
                    border-top: 6px solid #317053;
                    transition: transform 0.3s ease;
                }
                .expandable-section.expanded .expandable-toggle::before {
                    transform: rotate(180deg);
                }
                .expandable-content {
                    padding: 0 20px;
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.5s ease, padding 0.3s ease;
                }
                .expandable-content.expanded {
                    max-height: 2500px;
                    padding: 20px;
                }
                .highlight-box {
                    background-color: #e3f0ea;
                    border-left: 4px solid #317053;
                    padding: 15px;
                    margin: 20px 0;
                }
                .contact-info {
                    background-color: #f8f9fa;
                    padding: 20px;
                    border-radius: 8px;
                    margin-top: 30px;
                }
                .requirements-list {
                    list-style-type: disc;
                    padding-left: 20px;
                    color: #317053;
                }
                .requirements-list li {
                    padding: 8px 0;
                    border-bottom: 1px solid #e9ecef;
                    color: #333;
                }
            `}</style>
            <section id="join-us" className="home-section">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-3 section-heading">
                            <h1>Join Us</h1>
                        </div>
                        <div className="col-xs-12 col-md-9">
                            <div className="highlight-box">
                                <p>We currently have open positions for PhD candidates and research assistants in our research group <em>Machine Learning & Cognitive Software</em> at the Institute for Software Systems Engineering (ISSE) at TU Clausthal. Explore the opportunities below to find the position that best fits your career goals.</p>
                            </div>

                            {/* PhD Position Section */}
                            <div className={`expandable-section ${expandedSections['phd'] ? 'expanded' : ''}`}>
                                <div className="expandable-header" onClick={() => toggleSection('phd')}>
                                    <h3>PhD Position (Doctoral Candidate)</h3>
                                    <span className="expandable-toggle"></span>
                                </div>
                                <div className={`expandable-content ${expandedSections['phd'] ? 'expanded' : ''}`}>
                                    <p>Du m&ouml;chtest in der akademischen Forschung durchstarten und dich mit aktuellen Fragen der K&uuml;nstlichen Intelligenz auseinandersetzen? Du begeisterst dich f&uuml;r anspruchsvolle Themen im Machine Learning und m&ouml;chtest promovieren? Dann freuen wir uns darauf, dich kennenzulernen.</p>

                                    <p>Unsere Forschungsgruppe Machine Learning & Cognitive Software (<a href="https://www.isse.tu-clausthal.de/forschung/forschungsgruppen/machine-learning-and-cognitive-software">ISSE page</a>) am Institut f&uuml;r Software Systems Engineering (ISSE) der Technischen Universit&auml;t Clausthal am Standort Goslar verbindet Grundlagenforschung mit praxisnahen Anwendungen. Unser Ziel ist es, moderne Architekturen und Engineering-Methoden f&uuml;r zuk&uuml;nftige KI-Systeme zu entwerfen und weiterzuentwickeln. In den kommenden Monaten starten bei uns mehrere gro&szlig;e Drittmittelprojekte, insbesondere zu Generative AI, KI-Architekturen f&uuml;r Large Language Models und Reinforcement Learning. Daf&uuml;r suchen wir motivierte neue Teammitglieder, die mit uns gemeinsam forschen wollen.</p>

                                    <p>Unser Team besteht aus neun engagierten Wissenschaftlerinnen und Wissenschaftlern, die in einem kollegialen und dynamischen Umfeld zusammenarbeiten. Wir forschen gemeinsam mit international t&auml;tigen Unternehmen wie Bosch, BASF, Daimler, Roche, SAP und Siemens, aber auch mit Gr&uuml;ndern innovativer Start-ups und Mittelst&auml;ndlern.</p>

                                    <p>Wir suchen Bewerberinnen und Bewerber, die einen sehr guten Masterabschluss in Informatik, Mathematik oder einem verwandten Fachbereich mitbringen. Du solltest Interesse an einer wissenschaftlichen Laufbahn oder an einer sp&auml;teren T&auml;tigkeit in der industriellen Forschung mitbringen.</p>

                                    <h4>Wir bieten ...</h4>
                                    <ul className="requirements-list">
                                        <li>Ein familienfreundliches und kollegiales Arbeitsumfeld in engagierten Teams sowie interdisziplin&auml;ren und abwechslungsreichen Aufgabengebieten.</li>
                                        <li>Die M&ouml;glichkeit innovative Ans&auml;tze und L&ouml;sungen selbstst&auml;ndig zu erarbeiten.</li>
                                        <li>Die M&ouml;glichkeiten deine Ergebnisse direkt in Industrieprojekten zu evaluieren.</li>
                                        <li>Die M&ouml;glichkeit der Promotion in Kooperation mit anderen Forschungspartnern- und Unternehmen in Deutschland, sowie international.</li>
                                        <li>Flexible Arbeitszeiten und die M&ouml;glichkeit zum Homeoffice.</li>
                                        <li>Lounge Lab, Kicker und Social Events.</li>
                                        <li>Regelm&auml;&szlig;ige Schulungen und Weiterbildungen.</li>
                                    </ul>

                                    <p>Wenn du dich angesprochen f&uuml;hlst, freuen wir uns auf deine zeitnahe Bewerbung in deutscher oder englischer Sprache. Bitte sende deine Unterlagen bis zum <strong>31.10.2025</strong> (Anschreiben, Lebenslauf, Zeugnisse und Urkunden) ausschlie&szlig;lich per E-Mail an:</p>

                                    <p><strong>Prof. Dr. Christian Bartelt</strong><br />
                                        Technische Universit&auml;t Clausthal<br />
                                        Machine Learning & COgnitive SoftwaRE<br />
                                        Institut f&uuml;r Software Systems Engineering (ISSE)<br />
                                        Wallstra&szlig;e 6, 38640 Goslar<br />
                                        E-Mail: <a href="mailto:bartelt@isse.tu-clausthal.de">bartelt@isse.tu-clausthal.de</a></p>

                                    <p>F&uuml;r R&uuml;ckfragen stehen wir gerne zur Verf&uuml;gung. Wir freuen uns auf Dich!</p>
                                </div>
                            </div>

                            {/* Research Assistant Section */}
                            <div className={`expandable-section ${expandedSections['assistant'] ? 'expanded' : ''}`}>
                                <div className="expandable-header" onClick={() => toggleSection('assistant')}>
                                    <h3>Student Assistants (HiWi)</h3>
                                    <span className="expandable-toggle"></span>
                                </div>
                                <div className={`expandable-content ${expandedSections['assistant'] ? 'expanded' : ''}`}>
                                    <p><strong>(20-38 hours/month)</strong></p>

                                    <p>Are you studying computer science, mathematics, or a related field and want to gain hands-on research experience in the field of Artificial Intelligence? Are you excited about machine learning, generative AI, or reinforcement learning, and want to contribute your skills to exciting projects? Then this role might be just what you are looking for!</p>

                                    <p>Our Machine Learning & Cognitive Software research group at the Institute for Software Systems Engineering (ISSE) of Clausthal University of Technology, based in Goslar, combines fundamental research with practical applications.</p>

                                    <h4>Your tasks:</h4>
                                    <ul className="requirements-list">
                                        <li>Support our research teams in current projects, e.g., generative AI, AI architectures for large language models, and reinforcement learning</li>
                                        <li>Develop and prototype new research approaches</li>
                                        <li>Data preparation, analysis, and modeling</li>
                                        <li>Assist in planning and conducting scientific experiments</li>
                                        <li>Support in preparing scientific publications and presentations</li>
                                    </ul>

                                    <h4>Your profile:</h4>
                                    <ul className="requirements-list">
                                        <li>Enrolled student in computer science, mathematics, or a related degree program</li>
                                        <li>Good programming skills in at least one language (e.g., Python, Java, C++)</li>
                                        <li>Analytical thinking and interest in current developments in AI and software engineering</li>
                                        <li>Ability to work in a team, strong communication skills, and independent work style</li>
                                        <li>Good German and/or English language skills</li>
                                    </ul>

                                    <h4>We offer:</h4>
                                    <ul className="requirements-list">
                                        <li>Working in an engaged, dynamic research team</li>
                                        <li>Insights into current research projects with high practical relevance</li>
                                        <li>Supervision and mentoring by experienced research staff</li>
                                        <li>Opportunity to develop topics for your Master's / Bachelor's thesis</li>
                                        <li>Flexible working hours and partial remote work by arrangement</li>
                                        <li>Participation in team events and exchange with our industry partners</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="contact-info">
                                <h4>Interested?</h4>
                                <p><strong>For PhD Position applications:</strong><br />
                                    Please send your complete application documents to <a href="mailto:bartelt@isse.tu-clausthal.de">bartelt@isse.tu-clausthal.de</a>. Your application should include: cover letter, personal details (name, study program, etc.), preferred start date, CV, Bachelor's and Master's degree certificates, high school diploma, and your latest academic work (Bachelor/Master's thesis or comparable).</p>

                                <p><strong>For Student Assistant (HiWi) applications:</strong><br />
                                    Please send a short application including your CV, current transcript of records, and a brief description of your interests and skills to <a href="mailto:tobias.sesterhenn@tu-clausthal.de">tobias.sesterhenn@tu-clausthal.de</a>. Applications are accepted on a rolling basis.</p>

                                <p>Clausthal University of Technology is committed to equal opportunity and explicitly encourages applications from qualified women. Applicants with disabilities will be given preference if equally qualified.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default JoinUs;
