// Institution definitions
export const institutions = {
  TUC: {
    name: 'TU Clausthal',
    shortName: 'TUC',
    location: 'Goslar, Germany'
  },
  UBB: {
    name: 'Babeș-Bolyai University',
    shortName: 'UBB',
    location: 'Cluj-Napoca, Romania'
  },
  ROSTOCK: {
    name: 'University of Rostock',
    shortName: 'Rostock',
    location: 'Rostock, Germany'
  },
  MANNHEIM: {
    name: 'University of Mannheim',
    shortName: 'Mannheim',
    location: 'Mannheim, Germany'
  }
}

// Team members with new schema
export const teamMembers = [
  // Professors
  {
    id: 1,
    name: 'Christian Bartelt',
    title: 'Professor',
    roleCategory: 'professor',
    affiliations: [
      { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' }
    ],
    photo: '/images/team/christian-bartelt.png',
    bio: 'Group leader at TU Clausthal focusing on AI and autonomous systems research.',
    email: 'bartelt@isse.tu-clausthal.de',
    links: {}
  },
  {
    id: 2,
    name: 'Christian Sacarea',
    title: 'Professor',
    roleCategory: 'professor',
    affiliations: [
      { institution: institutions.UBB, department: 'Faculty of Mathematics and Computer Science' }
    ],
    photo: '/images/team/christian-sacarea.jpg',
    bio: 'Professor at Babeș-Bolyai University with expertise in formal methods and AI.',
    email: '',
    links: {}
  },
  // Postdocs
  {
    id: 3,
    name: 'Iulian Benta',
    title: 'Postdoctoral Researcher',
    roleCategory: 'postdoc',
    affiliations: [
      { institution: institutions.UBB, department: 'Faculty of Mathematics and Computer Science' }
    ],
    photo: '/images/team/iulian-benta.jpg',
    bio: 'Postdoctoral researcher at UBB.',
    email: '',
    links: {}
  },
  {
    id: 4,
    name: 'Stefan Lüdtke',
    title: 'Postdoctoral Researcher',
    roleCategory: 'postdoc',
    affiliations: [
      { institution: institutions.ROSTOCK, department: 'Institute of Communications Engineering' }
    ],
    photo: '/images/team/stefan-luedtke.jpg',
    bio: 'Postdoctoral researcher at the University of Rostock.',
    email: '',
    links: {}
  },
  // PhD Students / Researchers (also CORE Labs Leads)
  {
    id: 5,
    name: 'David Szilagyi',
    title: 'PhD Student',
    roleCategory: 'phd_student',
    affiliations: [
      { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' },
      { institution: institutions.UBB, department: 'Faculty of Mathematics and Computer Science' }
    ],
    photo: '/images/team/david-szilagyi.jpg',
    bio: 'PhD student working on autonomous driving and embodied robotics.',
    email: 'david.szilagyi@tu-clausthal.de',
    links: {},
    coreLabsLead: {
      labName: 'Goslar & Cluj Lab',
      role: 'Goslar & Cluj Lead',
      researchFocus: ['Autonomous Driving', 'Embodied Robotics'],
      shortDescription: 'Leading research on autonomous systems that perceive and interact with the physical world.',
      selectedPublications: []
    }
  },
  {
    id: 6,
    name: 'Ashwin Nedungadi',
    title: 'PhD Student',
    roleCategory: 'phd_student',
    affiliations: [
      { institution: institutions.ROSTOCK, department: 'Institute of Communications Engineering' }
    ],
    photo: '/images/team/ashwin-nedungadi.jpg',
    bio: 'PhD student specializing in egocentric vision and computer vision.',
    email: '',
    links: {},
    coreLabsLead: {
      labName: 'Rostock Lab',
      role: 'Rostock Lead',
      researchFocus: ['Egocentric Vision'],
      shortDescription: 'Advancing research in first-person visual understanding and human-centric perception.',
      selectedPublications: []
    }
  },
  {
    id: 7,
    name: 'Patrick Knab',
    title: 'PhD Student',
    roleCategory: 'phd_student',
    affiliations: [
      { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' }
    ],
    photo: '/images/team/patrick-knab.jpg',
    bio: 'Third-year PhD candidate focusing on Computer Vision and Explainable AI. Research explores how foundation models can derive domain-specific visual concepts to enhance neural network transparency and interpretability.',
    email: 'patrick.knab@tu-clausthal.de',
    links: {
      scholar: 'https://scholar.google.com/citations?user=pzg1sbgAAAAJ',
      github: 'https://github.com/patrick-knab',
      twitter: 'https://twitter.com/p_knab',
      linkedin: 'https://www.linkedin.com/in/patrick-knab-4396261b4',
      website: 'https://patrick-knab.github.io'
    },
    coreLabsLead: {
      labName: 'Vision Lab',
      role: 'Vision Lead',
      researchFocus: ['Computer Vision', 'Explainable AI'],
      shortDescription: 'Developing interpretable visual AI systems using foundation models and concept-based explanations.',
      selectedPublications: []
    }
  },
  {
    id: 8,
    name: 'Tim Grams',
    title: 'PhD Student',
    roleCategory: 'phd_student',
    affiliations: [
      { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' }
    ],
    photo: '/images/team/tim-grams.png',
    bio: 'PhD student researching reinforcement learning and decision-making systems.',
    email: 'tim.grams@tu-clausthal.de',
    links: {},
    coreLabsLead: {
      labName: 'RL Lab',
      role: 'RL Lead',
      researchFocus: ['Reinforcement Learning'],
      shortDescription: 'Exploring adaptive learning algorithms for autonomous decision-making in complex environments.',
      selectedPublications: []
    }
  },
  // Additional Postdocs
  {
    id: 9,
    name: 'Sascha Marton',
    title: 'Postdoctoral Researcher',
    roleCategory: 'postdoc',
    affiliations: [
      { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' }
    ],
    photo: '/images/team/sascha-marton.jpg',
    bio: 'Postdoctoral researcher at TU Clausthal.',
    email: 'sascha.marton@tu-clausthal.de',
    links: {
      scholar: 'https://scholar.google.com/citations?user=5PQJ3sEAAAAJ',
      website: 'https://s-marton.github.io'
    }
  },
  // Additional PhD Students
  {
    id: 10,
    name: 'Kristian Kolthoff',
    title: 'PhD Student',
    roleCategory: 'phd_student',
    affiliations: [
      { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' }
    ],
    photo: '/images/team/kristian-kolthoff.png',
    bio: 'PhD student at TU Clausthal.',
    email: 'kristian.kolthoff@tu-clausthal.de',
    links: {
      scholar: 'https://scholar.google.com/citations?user=OJBv75IAAAAJ&hl=de'
    }
  },
  {
    id: 11,
    name: 'Jannik Brinkmann',
    title: 'PhD Student',
    roleCategory: 'phd_student',
    affiliations: [
      { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' }
    ],
    photo: '/images/team/jannik-brinkmann.png',
    bio: 'PhD student at TU Clausthal.',
    email: 'jannik.brinkmann@tu-clausthal.de',
    links: {
      scholar: 'https://scholar.google.com/citations?hl=en&user=YtdTeaMAAAAJ'
    }
  },
  {
    id: 12,
    name: 'Janis Zenkner',
    title: 'PhD Student',
    roleCategory: 'phd_student',
    affiliations: [
      { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' }
    ],
    photo: '/images/team/janis-zenkner.png',
    bio: 'PhD student at TU Clausthal.',
    email: 'janis.zenkner@tu-clausthal.de',
    links: {
      scholar: 'https://scholar.google.de/citations?user=beX-uhUAAAAJ',
      linkedin: 'https://www.linkedin.com/in/janis-zenkner-704b8a188/'
    }
  },
  {
    id: 13,
    name: 'Tobias Sesterhenn',
    title: 'PhD Student',
    roleCategory: 'phd_student',
    affiliations: [
      { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' }
    ],
    photo: '/images/team/tobias-sesterhenn.png',
    bio: 'PhD student at TU Clausthal.',
    email: 'tobias.sesterhenn@tu-clausthal.de',
    links: {}
  },
  {
    id: 14,
    name: 'Mihail Birsan',
    title: 'PhD Student',
    roleCategory: 'phd_student',
    affiliations: [
      { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' }
    ],
    photo: '/images/team/mihail-birsan.jpg',
    bio: 'PhD student at TU Clausthal.',
    email: '',
    links: {
      linkedin: 'https://www.linkedin.com/in/mihail-birsan-4b1916207/'
    }
  },
  {
    id: 15,
    name: 'Celina Homa',
    title: 'PhD Student (External)',
    roleCategory: 'phd_student',
    affiliations: [
      { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' }
    ],
    photo: '/images/team/celina-homa.jpeg',
    bio: 'External PhD student at Mercedes-Benz.',
    email: '',
    links: {}
  },
  {
    id: 16,
    name: 'Markus Herre',
    title: 'PhD Student (Incoming)',
    roleCategory: 'phd_student',
    affiliations: [
      { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' }
    ],
    photo: '/images/team/markus-herre.jpeg',
    bio: 'Incoming PhD student at TU Clausthal.',
    email: '',
    links: {
      linkedin: 'https://www.linkedin.com/in/markus-herre/'
    }
  },
  // Support Staff
  {
    id: 17,
    name: 'Mareike Kroeller',
    title: 'Administrative Assistant',
    roleCategory: 'staff',
    affiliations: [
      { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' }
    ],
    photo: '/images/team/mareike-kroeller.jpg',
    bio: 'Administrative assistant at TU Clausthal.',
    email: 'mareike.kroeller@tu-clausthal.de',
    links: {}
  },
  {
    id: 18,
    name: 'Steffen Ottow',
    title: 'IT Specialist',
    roleCategory: 'staff',
    affiliations: [
      { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' }
    ],
    photo: '/images/team/steffen-ottow.jpg',
    bio: 'IT specialist at TU Clausthal.',
    email: 'steffen.ottow@tu-clausthal.de',
    links: {}
  }
]

// Helper functions

/**
 * Get all CORE Labs Leads (members with coreLabsLead property)
 */
export const getCoreLabsLeads = () => {
  return teamMembers.filter(member => member.coreLabsLead)
}

/**
 * Get all network members (everyone in teamMembers)
 */
export const getNetworkMembers = () => {
  return teamMembers
}

/**
 * Get members by role category
 */
export const getMembersByRole = (roleCategory) => {
  return teamMembers.filter(member => member.roleCategory === roleCategory)
}

/**
 * Get members grouped by role category
 */
export const getMembersGroupedByRole = () => {
  return {
    professors: getMembersByRole('professor'),
    postdocs: getMembersByRole('postdoc'),
    phdStudents: getMembersByRole('phd_student'),
    researchers: getMembersByRole('researcher'),
    staff: getMembersByRole('staff')
  }
}
