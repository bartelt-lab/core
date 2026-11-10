// Shared content for the /tuc landing variants. Text is [German, English],
// like news.js and industryProjects.js.
import { getMembersByInstitution } from '../../../data/team'
import { projects as industryProjects } from '../../../data/industryProjects'

// Kai Kunze and Dominik Schulz are TUC-affiliated but not part of this group.
const NOT_IN_GROUP = ['dominik-schulz', 'kai-kunze']

export const groupMembers = () => {
    const all = getMembersByInstitution('TUC').filter((m) => !NOT_IN_GROUP.includes(m.slug))
    const lead = all.find((m) => m.roleCategory === 'professor')
    return {
        all,
        lead,
        researchers: all.filter((m) => m !== lead && !['research_assistant', 'support_staff'].includes(m.roleCategory)),
        assistants: all.filter((m) => m.roleCategory === 'research_assistant'),
        support: all.filter((m) => m.roleCategory === 'support_staff'),
        postdocs: all.filter((m) => m.roleCategory === 'postdoc'),
        phds: all.filter((m) => m.roleCategory === 'phd_student'),
    }
}

export const stats = () => {
    const { all } = groupMembers()
    return [
        { value: all.filter((m) => !['research_assistant', 'support_staff'].includes(m.roleCategory)).length, label: ['Forschende', 'Researchers'] },
        { value: all.filter((m) => m.roleCategory === 'phd_student').length, label: ['Promovierende', 'PhD students'] },
        { value: industryProjects.length, label: ['Industrieprojekte', 'Industry projects'] },
    ]
}

export const hero = {
    kicker: ['Institut für Software and Systems Engineering · TU Clausthal', 'Institute for Software and Systems Engineering · TU Clausthal'],
    title: 'Cognitive Software',
    lede: [
        'Machine Learning für kognitive Softwaresysteme: adaptive, effiziente und interpretierbare KI, von tabellarischen Foundation Models bis zu Robotern, die in der physischen Welt handeln.',
        'Machine learning for cognitive software systems: adaptive, efficient and interpretable AI, from tabular foundation models to robots that act in physical environments.',
    ],
}

// Wording follows the group's own pitch deck (CORE — Cognitive Software, 2026-09).
export const about = [
    'Wir bauen KI, die wahrnimmt, schlussfolgert und handelt und dabei vertrauenswürdig bleibt. Unsere Arbeit liegt zwischen Machine Learning, kognitiven Systemen und Software Engineering, am Institut für Software and Systems Engineering der TU Clausthal. Die meisten von uns arbeiten in Goslar, im DIGIT – Center for Digital Technologies.',
    'We build AI that perceives, reasons and acts, and stays trustworthy while doing so. Our work sits between machine learning, cognitive computing and software engineering, at the Institute for Software and Systems Engineering of TU Clausthal. Most of the group works in Goslar, at DIGIT – Center for Digital Technologies.',
]

// The six research directions, one sentence each.
export const topics = [
    {
        title: ['Tabellarische Daten und Foundation Models', 'Tabular data and tabular foundation models'],
        text: [
            'KI-Systeme, die strukturierte Daten wie Tabellen, Datenbanken und Spreadsheets verstehen, und Foundation Models, die dafür angepasst sind.',
            'AI systems that understand structured data such as spreadsheets, databases and tables, and foundation models adapted to work with them.',
        ],
    },
    {
        title: ['Wahrnehmung und Segmentierung', 'Perception and segmentation'],
        text: [
            'Segmentierungsmodelle, die auf klinischen Bilddaten bestehen, etwa beim Erkennen von Schlaganfällen in radiologischen Aufnahmen.',
            'Segmentation models that hold up on clinical imaging, such as finding stroke regions in radiological data.',
        ],
    },
    {
        title: ['Kognitive Robotik', 'Cognitive robotics'],
        text: [
            'KI-Systeme, die in physischen Umgebungen wahrnehmen, schlussfolgern, lernen und handeln.',
            'AI systems that perceive, reason, learn and act in physical environments.',
        ],
    },
    {
        title: ['Exploration in großen Sprachmodellen', 'Exploration in large language models'],
        text: [
            'Wie Sprachmodelle explorieren, Wissen ausnutzen und Ideen erzeugen, und wie sich dieses Verhalten messen lässt.',
            'How language models explore, exploit and generate ideas, and how to measure that behaviour.',
        ],
    },
    {
        title: ['KI-gestütztes GUI-Design und Programmsynthese', 'AI-driven GUI design and program synthesis'],
        text: [
            'KI, die beim Entwurf benutzerfreundlicher Oberflächen hilft und kleine Programme aus Ein- und Ausgabebeispielen schreibt.',
            'AI that helps design user-friendly interfaces and writes small programs from input–output examples.',
        ],
    },
    {
        title: ['Erklärbare KI und mechanistische Interpretierbarkeit', 'Explainable AI and mechanistic interpretability'],
        text: [
            'KI-Systeme verständlich machen, damit nachvollziehbar wird, warum sie zu ihren Entscheidungen kommen.',
            'Making AI systems understandable, so we know why they arrive at their decisions.',
        ],
    },
]

export const work = [
    {
        to: '/tuc/industry-projects',
        title: ['Industrieprojekte', 'Industry projects'],
        text: [
            `${industryProjects.length} Transfer- und Förderprojekte, darunter MediCar 4.0 und AI-BIM.`,
            `${industryProjects.length} transfer and publicly funded projects, among them MediCar 4.0 and AI-BIM.`,
        ],
    },
    {
        to: '/tuc/teaching',
        title: ['Lehre', 'Teaching'],
        text: ['Kurse, Seminare und Abschlussarbeiten an der TU Clausthal.', 'Courses, seminars and theses at TU Clausthal.'],
    },
    {
        to: '/ai-team-projects',
        title: ['AI-Team-Projekte', 'AI Team Projects'],
        text: [
            'Internationale Teams aus Clausthal und Cluj bauen ein Semester lang KI-Systeme.',
            'International teams from Clausthal and Cluj build AI systems over one semester.',
        ],
    },
    {
        to: '/publications?institution=TUC',
        title: ['Publikationen', 'Publications'],
        text: ['Unsere Veröffentlichungen im CORE Network.', 'Our papers, listed with the CORE Network.'],
    },
]

export const affiliations = [
    { href: 'https://www.tu-clausthal.de', logo: '/logos/tu-clausthal.webp', name: 'TU Clausthal' },
    { href: 'https://www.digit-research.de', logo: '/logos/digit.webp', name: 'DIGIT' },
    { to: '/', logo: '/logos/core/light-background/core.svg', name: 'CORE Network' },
]

export const contact = {
    email: 'bartelt@isse.tu-clausthal.de',
    address: 'Wallstrasse 6, 38640 Goslar, Germany',
    map: 'https://maps.app.goo.gl/ZeN3Gz2aWHZDJxc8A',
}

export const labPhoto = {
    src: '/images/news/core-labs-opening.webp',
    alt: [
        'Gruppenbild zur Eröffnung der CORE Labs mit einem humanoiden Roboter im Clausthaler Labor',
        'Group photo at the CORE Labs opening with a humanoid robot in the Clausthal lab',
    ],
    caption: [
        'Das Clausthaler Labor bei der Eröffnung der CORE Labs, Juli 2026. Foto: Christian Ernst, CORE',
        'The Clausthal lab at the CORE Labs opening, July 2026. Photo: Christian Ernst, CORE',
    ],
}

// Name with academic prefix ("Dr. Kristian Kolthoff"), as team.js records it.
export const displayName = (m) => (m.prefix ? `${m.prefix} ${m.name}` : m.name)

export const roleLabel = (m) => {
    const map = {
        Professor: ['Professor, Gruppenleitung', 'Professor, group lead'],
        Postdoc: ['Postdoc', 'Postdoc'],
        'PhD Student': ['Doktorand:in', 'PhD student'],
        'PhD Student (External)': ['Externe Promotion', 'External PhD student'],
        'Research Assistant': ['Wiss. Hilfskraft', 'Research assistant'],
        'Administrative Assistant': ['Sekretariat', 'Administrative assistant'],
        'IT Specialist': ['IT', 'IT specialist'],
    }
    return map[m.title] ?? [m.title, m.title]
}
