import { Link } from 'react-router-dom';
import { FiArrowRight, FiArrowUpRight, FiBriefcase, FiCheck, FiClock, FiCpu, FiMail, FiUsers } from 'react-icons/fi';
import { useLanguage } from '../../i18n/useLanguage';
import { PageShell, Section, Card, ButtonLink } from '../../components/tuc/ui';
import { stats } from './home/content';

// Text pairs are [German, English], like the other /tuc data.
const PHD = {
    intro: [
        'Du möchtest in die Forschung einsteigen und an aktuellen Fragen der Künstlichen Intelligenz arbeiten? Als Doktorand:in entwirfst und entwickelst du Architekturen und Engineering-Methoden für zukünftige KI-Systeme und verbindest dabei Grundlagenforschung mit praktischen Anwendungen.',
        'Want to start in research and work on current questions in artificial intelligence? As a doctoral candidate you design and advance architectures and engineering methods for future AI systems, combining fundamental research with practical applications.',
    ],
    bring: [
        ['Einen sehr guten Masterabschluss in Informatik, Mathematik oder einem verwandten Fach', 'A very good Master’s degree in computer science, mathematics or a related field'],
        ['Interesse an einer wissenschaftlichen Laufbahn oder einer späteren Tätigkeit in der Industrieforschung', 'Interest in an academic career or a later role in industrial research'],
    ],
    offer: [
        ['Ein familienfreundliches, kollegiales Team mit abwechslungsreichen, interdisziplinären Aufgaben', 'A family-friendly, collegial team with varied, interdisciplinary work'],
        ['Freiraum, eigene Ansätze und Lösungen zu entwickeln', 'Room to develop your own approaches and solutions'],
        ['Erprobung deiner Ergebnisse direkt in Industrieprojekten', 'Your results tested directly in industry projects'],
        ['Promotion in Kooperation mit Forschungspartnern und Unternehmen im In- und Ausland', 'A doctorate in cooperation with research partners and companies in Germany and abroad'],
        ['Regelmäßige Schulungen und Weiterbildungen', 'Regular training and continuing education'],
    ],
};

const HIWI = {
    intro: [
        'Du studierst Informatik, Mathematik oder ein verwandtes Fach und willst praktische Forschungserfahrung in der KI sammeln? Bei uns arbeitest du an Projekten zu Machine Learning, generativer KI und Reinforcement Learning mit.',
        'Studying computer science, mathematics or a related subject and want hands-on research experience in AI? With us you work on projects in machine learning, generative AI and reinforcement learning.',
    ],
    tasks: [
        ['Mitarbeit in laufenden Projekten, z. B. zu generativer KI, KI-Architekturen für Large Language Models und Reinforcement Learning', 'Work in running projects, e.g. on generative AI, AI architectures for large language models and reinforcement learning'],
        ['Prototypen für neue Forschungsansätze bauen', 'Build prototypes for new research approaches'],
        ['Daten aufbereiten, analysieren und modellieren', 'Prepare, analyse and model data'],
        ['Experimente mit planen und durchführen', 'Help plan and run experiments'],
        ['Bei Publikationen und Präsentationen unterstützen', 'Support papers and presentations'],
    ],
    profile: [
        ['Eingeschrieben in Informatik, Mathematik oder einem verwandten Studiengang', 'Enrolled in computer science, mathematics or a related programme'],
        ['Gute Programmierkenntnisse in mindestens einer Sprache, z. B. Python, Java oder C++', 'Good programming skills in at least one language, e.g. Python, Java or C++'],
        ['Analytisches Denken und Interesse an KI und Software Engineering', 'Analytical thinking and interest in AI and software engineering'],
        ['Teamfähig, kommunikativ, selbstständig', 'A team player who communicates well and works independently'],
        ['Gute Deutsch- und/oder Englischkenntnisse', 'Good German and/or English'],
    ],
    offer: [
        ['Einblick in aktuelle, praxisnahe Forschungsprojekte', 'Insight into current, applied research projects'],
        ['Betreuung und Mentoring durch erfahrene Forschende', 'Supervision and mentoring by experienced researchers'],
        ['Die Chance, ein Thema für deine Bachelor- oder Masterarbeit zu finden', 'A chance to find a topic for your Bachelor’s or Master’s thesis'],
        ['Flexible Arbeitszeiten und teilweise Remote-Arbeit nach Absprache', 'Flexible hours and partly remote work by arrangement'],
        ['Teamevents und Austausch mit unseren Industriepartnern', 'Team events and exchange with our industry partners'],
    ],
};

const APPLY = [
    {
        id: 'apply-phd',
        title: ['Promotionsstelle', 'PhD position'],
        to: 'Prof. Dr. Christian Bartelt',
        email: 'bartelt@isse.tu-clausthal.de',
        send: [
            ['Anschreiben', 'Cover letter'],
            ['Lebenslauf mit persönlichen Angaben und gewünschtem Starttermin', 'CV with personal details and your preferred start date'],
            ['Bachelor- und Masterzeugnis sowie Abiturzeugnis', 'Bachelor’s and Master’s certificates and your school-leaving certificate'],
            ['Deine letzte wissenschaftliche Arbeit, z. B. die Masterarbeit', 'Your latest academic work, e.g. your Master’s thesis'],
        ],
        note: ['Bewerbungen auf Deutsch oder Englisch, ausschließlich per E-Mail.', 'Apply in German or English, by email only.'],
    },
    {
        id: 'apply-hiwi',
        title: ['Studentische Hilfskraft', 'Student assistant'],
        to: 'Tobias Sesterhenn',
        email: 'tobias.sesterhenn@tu-clausthal.de',
        send: [
            ['Lebenslauf', 'CV'],
            ['Aktueller Notenspiegel', 'Current transcript of records'],
            ['Ein paar Sätze zu deinen Interessen und Fähigkeiten', 'A few sentences on your interests and skills'],
        ],
        note: ['Wir nehmen Bewerbungen laufend an.', 'We accept applications on a rolling basis.'],
    },
];

const List = ({ items, txt }) => (
    <ul className="space-y-2">
        {items.map((item) => (
            <li key={item[1]} className="flex gap-2.5 text-sm leading-relaxed text-slate-700">
                <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-site-900" aria-hidden="true" />
                {txt(item)}
            </li>
        ))}
    </ul>
);

const ListBlock = ({ title, items, txt }) => (
    <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-600">{title}</h3>
        <List items={items} txt={txt} />
    </div>
);

const JoinUs = () => {
    const { pick } = useLanguage();
    const txt = (pair) => pick(pair[1], pair[0]);
    // Researchers in the group (lead, postdocs, PhD students), counted from team.js.
    const researchers = stats()[0].value;

    const why = [
        {
            icon: FiUsers,
            title: pick(`${researchers} researchers`, `${researchers} Forschende`),
            text: pick(
                'A collegial team in Goslar, at the Institute for Software and Systems Engineering of TU Clausthal.',
                'Ein kollegiales Team in Goslar, am Institut für Software and Systems Engineering der TU Clausthal.'
            ),
        },
        {
            icon: FiBriefcase,
            title: pick('Industry partners', 'Industriepartner'),
            text: pick(
                'Projects with companies such as Bosch, BASF, Daimler, Roche, SAP and Siemens, and with start-ups and mid-sized firms.',
                'Projekte mit Unternehmen wie Bosch, BASF, Daimler, Roche, SAP und Siemens sowie mit Start-ups und Mittelständlern.'
            ),
        },
        {
            icon: FiCpu,
            title: pick('Current topics', 'Aktuelle Themen'),
            text: pick(
                'Generative AI, AI architectures for large language models and reinforcement learning.',
                'Generative KI, KI-Architekturen für Large Language Models und Reinforcement Learning.'
            ),
        },
        {
            icon: FiClock,
            title: pick('Flexible work', 'Flexibles Arbeiten'),
            text: pick(
                'Flexible hours, working from home, and a lounge lab with table football and social events.',
                'Flexible Arbeitszeiten, Homeoffice und ein Lounge Lab mit Kicker und Social Events.'
            ),
        },
    ];

    return (
        <PageShell
            kicker={pick('Open positions', 'Offene Stellen')}
            title={pick('Join us', 'Mitmachen')}
            lede={pick(
                'We are looking for PhD candidates and student assistants who want to work on machine learning with us, in Goslar and with partners across the CORE Network.',
                'Wir suchen Promovierende und studentische Hilfskräfte, die mit uns an Machine Learning arbeiten wollen, in Goslar und mit Partnern im CORE Network.'
            )}
            actions={
                <>
                    <ButtonLink href="#phd">{pick('PhD position', 'Promotionsstelle')}</ButtonLink>
                    <ButtonLink href="#hiwi" variant="secondary">{pick('Student assistants', 'Hilfskräfte')}</ButtonLink>
                </>
            }
        >
            <Section id="why" title={pick('Working with us', 'Arbeiten bei uns')}>
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {why.map(({ icon: Icon, title, text }) => (
                        <Card as="li" key={title} className="p-5">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-site-100 text-site-900">
                                <Icon size={18} aria-hidden="true" />
                            </span>
                            <h3 className="mt-4 font-bold">{title}</h3>
                            <p className="mt-1 text-sm leading-relaxed text-slate-600">{text}</p>
                        </Card>
                    ))}
                </ul>
            </Section>

            <Section id="phd" tone="tint" kicker={pick('Doctorate', 'Promotion')} title={pick('PhD position', 'Promotionsstelle')} intro={txt(PHD.intro)}>
                <Card className="grid gap-8 p-6 sm:p-8 md:grid-cols-2">
                    <ListBlock title={pick('What you bring', 'Was du mitbringst')} items={PHD.bring} txt={txt} />
                    <ListBlock title={pick('What we offer', 'Was wir bieten')} items={PHD.offer} txt={txt} />
                </Card>
                <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-1 text-sm">
                    <p className="text-slate-600">
                        {pick('Where a doctorate can lead:', 'Wohin eine Promotion führen kann:')}{' '}
                        <Link to="/news/sascha-marton-nvidia" className="inline-flex items-center gap-1 py-1 font-semibold text-primary-700 hover:text-primary-800">
                            {pick('Sascha Marton, from CORE to NVIDIA', 'Sascha Marton, von CORE zu NVIDIA')}
                            <FiArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </p>
                    <a
                        href="https://www.isse.tu-clausthal.de/forschung/forschungsgruppen/machine-learning-and-cognitive-software"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 py-1 font-semibold text-primary-700 hover:text-primary-800"
                    >
                        {pick('Our group on the ISSE website', 'Unsere Gruppe auf der ISSE-Website')}
                        <FiArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                </div>
            </Section>

            <Section id="hiwi" kicker={pick('Part-time', 'Teilzeit')} title={pick('Student assistants (HiWi)', 'Studentische Hilfskräfte (HiWi)')} intro={txt(HIWI.intro)}>
                <Card className="grid gap-8 p-6 sm:p-8 md:grid-cols-3">
                    <ListBlock title={pick('Your tasks', 'Deine Aufgaben')} items={HIWI.tasks} txt={txt} />
                    <ListBlock title={pick('Your profile', 'Dein Profil')} items={HIWI.profile} txt={txt} />
                    <ListBlock title={pick('What we offer', 'Was wir bieten')} items={HIWI.offer} txt={txt} />
                </Card>
            </Section>

            <Section id="apply" tone="tint" title={pick('How to apply', 'So bewirbst du dich')}>
                <div className="grid gap-4 md:grid-cols-2">
                    {APPLY.map((a) => (
                        <Card key={a.id} id={a.id} className="flex flex-col p-6 sm:p-8">
                            <h3 className="text-xl font-bold">{txt(a.title)}</h3>
                            <p className="mt-1 text-sm text-slate-600">
                                {pick('Send to', 'An')} {a.to}
                            </p>
                            <div className="mt-5 flex-1">
                                <List items={a.send} txt={txt} />
                            </div>
                            <p className="mt-5 text-sm text-slate-600">{txt(a.note)}</p>
                            <div className="mt-5">
                                <ButtonLink href={`mailto:${a.email}`} className="max-w-full break-all">
                                    <FiMail className="shrink-0" aria-hidden="true" /> {a.email}
                                </ButtonLink>
                            </div>
                        </Card>
                    ))}
                </div>
                <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate-600">
                    {pick(
                        'TU Clausthal is committed to equal opportunity and explicitly encourages qualified women to apply. Applicants with disabilities are given preference if equally qualified.',
                        'Die TU Clausthal setzt sich für Chancengleichheit ein und fordert qualifizierte Frauen ausdrücklich zur Bewerbung auf. Bewerber:innen mit Behinderung werden bei gleicher Qualifikation bevorzugt.'
                    )}
                </p>
            </Section>
        </PageShell>
    );
};

export default JoinUs;
