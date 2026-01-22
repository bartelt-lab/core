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
    prefix: 'Prof. Dr.',
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
    prefix: 'Dr.',
    title: 'Professor',
    roleCategory: 'professor',
    affiliations: [
      { institution: institutions.UBB, department: 'Faculty of Mathematics and Computer Science' }
    ],
    photo: '/images/team/christian-sacarea.jpeg',
    bio: 'Professor at Babeș-Bolyai University with expertise in formal methods and AI.',
    email: '',
    links: {}
  },
  // Lecturers / Assistant Professors
  {
    id: 3,
    name: 'Iulian Benta',
    prefix: 'Dr. Ing.',
    title: 'Lecturer',
    roleCategory: 'lecturer',
    affiliations: [
      { institution: institutions.UBB, department: 'Faculty of Mathematics and Computer Science' }
    ],
    photo: '/images/team/iulian-benta.jpeg',
    bio: 'Lecturer at UBB.',
    email: '',
    links: {}
  },
  {
    id: 4,
    name: 'Stefan Lüdtke',
    prefix: 'Prof. Dr.',
    title: 'Assistant Professor',
    roleCategory: 'assistant_professor',
    affiliations: [
      { institution: institutions.ROSTOCK, department: 'Institute of Communications Engineering' }
    ],
    photo: '/images/team/stefan-luedtke.png',
    bio: 'Assistant Professor at the University of Rostock.',
    email: '',
    links: {}
  },
  // Postdocs
  {
    id: 9,
    name: 'Sascha Marton',
    prefix: 'Dr.',
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
  {
    id: 10,
    name: 'Kristian Kolthoff',
    prefix: 'Dr.',
    title: 'Postdoctoral Researcher',
    roleCategory: 'postdoc',
    affiliations: [
      { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' }
    ],
    photo: '/images/team/kristian-kolthoff.png',
    bio: 'Postdoctoral researcher at TU Clausthal.',
    email: 'kristian.kolthoff@tu-clausthal.de',
    links: {
      scholar: 'https://scholar.google.com/citations?user=OJBv75IAAAAJ&hl=de'
    }
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
      role: 'Goslar & Cluj Operations',
      researchFocus: ['Mobile Manipulation', 'Enbodied AI', 'Self-Driving'],
      shortDescription: 'Leading operations for the Goslar and Cluj labs, fostering collaboration on autonomous systems and embodied robotics.',
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
    photo: '/images/team/ashwin-nedungadi.png',
    bio: 'PhD student specializing in egocentric vision and computer vision.',
    email: '',
    links: {},
    coreLabsLead: {
      labName: 'Rostock Lab',
      role: 'Rostock Operations',
      researchFocus: ['Egocentric Perception', 'Spatial Understanding'],
      shortDescription: 'Coordinating the Rostock lab operations with a focus on human-centric perception and egocentric vision research.',
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
      role: 'Vision Methods Lead',
      researchFocus: ['Vision-Language Models', 'Explainable AI'],
      shortDescription: 'Investigating how foundation models can derive domain-specific visual concepts to enhance neural network transparency and interpretability.',
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
      role: 'RL Methods Lead',
      researchFocus: ['Reinforcement Learning', 'LLMs', 'Self-play'],
      shortDescription: 'Researching Reinforcement Learning, Large Language Models, and Self-play algorithms for autonomous decision-making.',
      selectedPublications: []
    }
  },
  // Additional Postdocs

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
    professors: [
      ...getMembersByRole('professor'),
      ...getMembersByRole('lecturer'),
      ...getMembersByRole('assistant_professor')
    ],
    postdocs: getMembersByRole('postdoc'),
    phdStudents: getMembersByRole('phd_student'),
    researchers: getMembersByRole('researcher'),
    staff: getMembersByRole('staff')
  }
}
