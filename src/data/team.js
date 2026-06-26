// Institution definitions
export const institutions = {
  TUC: {
    name: 'TU Clausthal',
    shortName: 'TUC',
    location: 'Goslar, Germany',
    website: 'https://www.tu-clausthal.de/en/'
  },
  UBB: {
    name: 'Babeș-Bolyai University',
    shortName: 'UBB',
    location: 'Cluj-Napoca, Romania',
    website: 'https://www.ubbcluj.ro/en/'
  },
  ROSTOCK: {
    name: 'University of Rostock',
    shortName: 'Rostock',
    location: 'Rostock, Germany',
    website: 'https://www.mds-lab.de/'
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
    slug: 'bartelt',
    prefix: 'Prof. Dr.',
    title: 'Professor',
    roleCategory: 'professor',
    affiliations: [
      { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' }
    ],
    photo: '/members/christian-bartelt.webp',
    bio: 'Group leader at TU Clausthal focusing on AI and autonomous systems research.',
    email: 'bartelt@isse.tu-clausthal.de',
    links: {
      scholar: 'https://scholar.google.de/citations?user=9FcF1gwAAAAJ&hl=de'
    }
  },
  {
    id: 2,
    name: 'Christian Sacarea',
    slug: 'sacarea',
    prefix: 'Dr.',
    title: 'Professor',
    roleCategory: 'professor',
    affiliations: [
      { institution: institutions.UBB, department: 'Faculty of Mathematics and Computer Science' }
    ],
    photo: '/members/christian-sacarea.webp',
    bio: 'Professor at Babeș-Bolyai University with expertise in formal methods and AI.',
    email: '',
    links: {
      scholar: 'https://scholar.google.com/citations?user=ciq4vzwAAAAJ&hl=en',
      website: 'https://math.ubbcluj.ro/~csacarea/wordpress/'
    }
  },
  // Lecturers / Assistant Professors
  {
    id: 3,
    name: 'Kuderna Iulian Benţa',
    slug: 'benta',
    prefix: 'Dr. Ing.',
    title: 'Lecturer',
    roleCategory: 'lecturer',
    affiliations: [
      { institution: institutions.UBB, department: 'Faculty of Mathematics and Computer Science' }
    ],
    photo: '/members/iulian-benta.webp',
    bio: 'Lecturer at UBB.',
    email: '',
    links: {
      scholar: 'https://scholar.google.com/citations?user=iSQpE0YAAAAJ&hl=ro'
    }
  },
  {
    id: 4,
    name: 'Stefan Lüdtke',
    slug: 'ludtke',
    prefix: 'Prof. Dr.',
    title: 'Asst. Professor',
    roleCategory: 'assistant_professor',
    affiliations: [
      { institution: institutions.ROSTOCK, department: 'Institute for Visual and Analytic Computing' }
    ],
    photo: '/members/stefan-luedtke.webp',
    bio: 'Assistant Professor at the University of Rostock.',
    email: '',
    links: {
      scholar: 'https://scholar.google.de/citations?user=DxgfRiQAAAAJ&hl=en',
      website: 'https://www.mds-lab.de/stefan-ludtke'
    }
  },
  // Postdocs
  {
    id: 9,
    name: 'Sascha Marton',
    slug: 'marton',
    prefix: 'Dr.',
    title: 'Postdoc',
    roleCategory: 'postdoc',
    affiliations: [
      { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' }
    ],
    photo: '/members/sascha-marton.webp',
    bio: 'Postdoctoral researcher at TU Clausthal.',
    email: 'sascha.marton@tu-clausthal.de',
    links: {
      scholar: 'https://scholar.google.com/citations?user=5PQJ3sEAAAAJ',
      github: 'https://github.com/s-marton',
      linkedin: 'https://de.linkedin.com/in/sascha-marton-phd-a19630185',
      website: 'https://s-marton.github.io'
    }
  },
  {
    id: 10,
    name: 'Kristian Kolthoff',
    slug: 'kolthoff',
    prefix: 'Dr.',
    title: 'Postdoc',
    roleCategory: 'postdoc',
    affiliations: [
      { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' }
    ],
    photo: '/members/kristian-kolthoff.webp',
    bio: 'Postdoctoral researcher at TU Clausthal.',
    email: 'kristian.kolthoff@tu-clausthal.de',
    links: {
      scholar: 'https://scholar.google.com/citations?user=OJBv75IAAAAJ&hl=de'
    }
  },
  {
    id: 19,
    name: 'Daniel Wulff',
    slug: 'wulff',
    prefix: 'Dr.',
    title: 'Postdoc',
    roleCategory: 'postdoc',
    affiliations: [
      { institution: institutions.ROSTOCK, department: 'Institute for Visual and Analytic Computing' }
    ],
    photo: '/members/daniel-wulff.webp',
    bio: 'Postdoctoral researcher at the University of Rostock.',
    email: 'd.wulff@uni-rostock.de',
    links: {
      scholar: 'https://scholar.google.de/citations?hl=de&user=y4TS8SoAAAAJ'
    }
  },
  // PhD Students / Researchers (also CORE Labs Leads)
  {
    id: 11,
    name: 'Jannik Brinkmann',
    slug: 'brinkmann',
    title: 'PhD Student',
    roleCategory: 'phd_student',
    affiliations: [
      { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' }
    ],
    photo: '/members/jannik-brinkmann.webp',
    bio: 'PhD student at TU Clausthal.',
    email: 'jannik.brinkmann@tu-clausthal.de',
    links: {
      scholar: 'https://scholar.google.com/citations?hl=en&user=YtdTeaMAAAAJ',
      github: 'https://github.com/jannik-brinkmann',
      website: 'https://jannik-brinkmann.github.io/'
    }
  },
  {
    id: 5,
    name: 'David Szilagyi',
    slug: 'szilagyi',
    title: 'PhD Student',
    roleCategory: 'phd_student',
    affiliations: [
      { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' },
      { institution: institutions.UBB, department: 'Faculty of Mathematics and Computer Science' }
    ],
    photo: '/members/david-szilagyi.webp',
    bio: 'PhD student working on autonomous driving and embodied robotics.',
    email: 'david.szilagyi@tu-clausthal.de',
    links: {
      scholar: 'https://scholar.google.com/citations?user=YAvZ-WoAAAAJ&hl=en',
      github: 'https://github.com/davszi',
      linkedin: 'https://www.linkedin.com/in/david-t-szilagyi/'
    },
    coreLabsLead: {
      labName: 'Physical AI Lab',
      role: 'TUC & UBB Operations',
      researchFocus: ['Physical AI', 'Enbodied AI', 'Locomanipulation', 'Imitation Learning'],
      shortDescription: 'Leading operations fostering collaboration on autonomous systems and embodied robotics.',
      selectedPublications: []
    }
  },
  {
    id: 6,
    name: 'Ashwin Nedungadi',
    slug: 'nedungadi',
    title: 'PhD Student',
    roleCategory: 'phd_student',
    affiliations: [
      { institution: institutions.ROSTOCK, department: 'Institute for Visual and Analytic Computing' }
    ],
    photo: '/members/ashwin-nedungadi.webp',
    bio: 'PhD student specializing in egocentric vision and computer vision.',
    email: '',
    links: {
      scholar: 'https://scholar.google.com/citations?user=HD26ITEAAAAJ&hl=en'
    },
    coreLabsLead: {
      labName: 'Rostock Lab',
      role: 'Rostock Operations',
      researchFocus: ['Multi-Modal Perception', 'Spatial Reasoning', 'Robot Learning'],
      shortDescription: 'Leading robotics research at Rostock focusing on multi-modal egocentric perception, spatial reasoning, and robot learning.',
      selectedPublications: []
    }
  },
  {
    id: 7,
    name: 'Patrick Knab',
    slug: 'knab',
    title: 'PhD Student',
    roleCategory: 'phd_student',
    affiliations: [
      { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' }
    ],
    photo: '/members/patrick-knab.webp',
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
      labName: 'Perception Lab',
      role: 'Multimodal Methods Lead',
      researchFocus: ['Multimodal Learning', 'Vision-Language Models', 'Cross-Modal Reasoning'],
      shortDescription: 'Developing multimodal methods that fuse visual and language information to improve model robustness, generalization, and reasoning across diverse real-world tasks.',
      selectedPublications: []
    }
  },
  {
    id: 8,
    name: 'Tim Grams',
    slug: 'grams',
    title: 'PhD Student',
    roleCategory: 'phd_student',
    affiliations: [
      { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' }
    ],
    photo: '/members/tim-grams.webp',
    bio: 'PhD student researching reinforcement learning and decision-making systems.',
    email: 'tim.grams@tu-clausthal.de',
    links: {
      scholar: 'https://scholar.google.com/citations?user=fs_6twkAAAAJ&hl=de'
    },
    coreLabsLead: {
      labName: 'RL Lab',
      role: 'Policy Learning Lead',
      researchFocus: ['Reinforcement Learning', 'Imitation Learning', 'LLMs', 'Self-play'],
      shortDescription: 'Researching Reinforcement Learning, Large Language Models, and Self-play algorithms for autonomous decision-making.',
      selectedPublications: []
    }
  },
  // Additional Postdocs

  {
    id: 12,
    name: 'Janis Zenkner',
    slug: 'zenkner',
    title: 'PhD Student',
    roleCategory: 'phd_student',
    affiliations: [
      { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' }
    ],
    photo: '/members/janis-zenkner.webp',
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
    slug: 'sesterhenn',
    title: 'PhD Student',
    roleCategory: 'phd_student',
    affiliations: [
      { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' }
    ],
    photo: '/members/tobias-sesterhenn.webp',
    bio: 'PhD student at TU Clausthal.',
    email: 'tobias.sesterhenn@tu-clausthal.de',
    links: {
      github: 'https://github.com/Tsesterh'
    }
  },
  {
    id: 14,
    name: 'Mihail Birsan',
    slug: 'birsan',
    title: 'PhD Student',
    roleCategory: 'phd_student',
    affiliations: [
      { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' }
    ],
    photo: '/members/mihail-birsan.webp',
    bio: 'PhD student at TU Clausthal.',
    email: '',
    links: {
      linkedin: 'https://www.linkedin.com/in/mihail-birsan-4b1916207/'
    }
  },
  {
    id: 15,
    name: 'Celina Homa',
    slug: 'homa',
    title: 'PhD Student (External)',
    roleCategory: 'phd_student',
    affiliations: [
      { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' }
    ],
    photo: '/members/celina-homa.webp',
    bio: 'External PhD student at Mercedes-Benz.',
    email: '',
    links: {
      linkedin: 'https://www.linkedin.com/in/celina-homa-b00a29153/'
    }
  },
  {
    id: 16,
    name: 'Markus Herre',
    slug: 'herre',
    title: 'PhD Student',
    roleCategory: 'phd_student',
    affiliations: [
      { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' }
    ],
    photo: '/members/markus-herre.webp',
    bio: 'PhD student at TU Clausthal.',
    email: '',
    links: {
      linkedin: 'https://www.linkedin.com/in/markus-herre/'
    }
  },
  {
    id: 17,
    name: 'Paul Koenig',
    slug: 'paul-koenig',
    title: 'PhD Student',
    roleCategory: 'phd_student',
    affiliations: [
      { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' }
    ],
    photo: '/members/paul-koenig.webp',
    bio: 'PhD student at TU Clausthal.',
    email: '',
    links: {
      linkedin: 'https://de.linkedin.com/in/p-koenig'
    }
  },
  // Support staff
  {
    id: 19,
    name: 'Mareike Kroeller',
    slug: 'kroeller',
    title: 'Administrative Assistant',
    roleCategory: 'support_staff',
    affiliations: [
      { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' }
    ],
    photo: '/placeholder-avatar.svg',
    bio: 'Administrative assistant at TU Clausthal.',
    email: 'mareike.kroeller@tu-clausthal.de',
    links: {}
  },
  {
    id: 18,
    name: 'Steffen Ottow',
    slug: 'ottow',
    title: 'IT Specialist',
    roleCategory: 'support_staff',
    affiliations: [
      { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' }
    ],
    photo: '/members/steffen-ottow.webp',
    bio: 'IT specialist supporting the research group at TU Clausthal.',
    email: '',
    links: {}
  },
  {
    id: 19,
    name: 'Mareike Kröller',
    slug: 'kroeller',
    title: 'Administrative Assistant',
    roleCategory: 'support_staff',
    affiliations: [
      { institution: institutions.TUC, department: 'Institute for Software and Systems Engineering' }
    ],
    photo: '/placeholder-avatar.svg',
    bio: 'Administrative assistant at TU Clausthal.',
    email: 'mareike.kroeller@tu-clausthal.de',
    links: {}
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
    staff: getMembersByRole('staff'),
    supportStaff: getMembersByRole('support_staff')
  }
}

/**
 * Get members affiliated with a specific institution shortName (e.g. 'TUC').
 */
export const getMembersByInstitution = (shortName) => {
  return teamMembers.filter(m => m.affiliations.some(a => a.institution.shortName === shortName))
}

/**
 * Look up a member by slug.
 */
export const getMemberBySlug = (slug) => {
  return teamMembers.find(m => m.slug === slug) || null
}
