# CORE - Cognitive Robotics in Europe

A professional website for the CORE (Cognitive Robotics in Europe) initiative, showcasing collaborative research between leading European universities in the field of cognitive robotics and autonomous systems.

## Overview

CORE represents a groundbreaking collaboration to advance the frontiers of cognitive robotics research. This website highlights our research projects, team members, publications, and autonomous driving demonstrations.

## Features

- **Hero Section** - Full-screen video background with initiative overview
- **About Section** - Mission statement and partner institutions
- **Research Projects** - Grid of active research areas
- **Demonstrations** - Interactive video showcases of autonomous driving research
- **Publications** - Academic papers and research output
- **Team** - Profiles of principal investigators and researchers
- **Responsive Design** - Mobile-first design that works on all devices
- **Smooth Animations** - Scroll-triggered animations and transitions

## Tech Stack

- **React 18** - UI library
- **Vite 5** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **React Intersection Observer** - Scroll animations

## Getting Started

### Prerequisites

- Node.js 18+ or 20+ (LTS)
- npm 9+ or 10+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bartelt-lab/core.git
cd core
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
core/
├── public/               # Public static assets
│   └── placeholder-avatar.svg
├── src/
│   ├── assets/          # Media assets
│   │   ├── videos/      # Hero and demonstration videos
│   │   └── images/      # Logos and team photos
│   ├── components/      # React components
│   │   ├── common/      # Reusable components
│   │   ├── hero/        # Hero section
│   │   ├── about/       # About section
│   │   ├── research/    # Research projects
│   │   ├── demonstrations/  # Video demonstrations
│   │   ├── publications/    # Publications list
│   │   └── team/        # Team members
│   ├── data/            # Static data
│   │   ├── team.js
│   │   ├── projects.js
│   │   ├── demonstrations.js
│   │   └── publications.js
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── assets/              # Original asset files (for reference)
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Customization

### Adding Team Members

Edit `src/data/team.js` to add or modify team member information:

```javascript
{
  id: 1,
  name: "Dr. Your Name",
  title: "Your Title",
  affiliation: "Your Institution",
  photo: "/path/to/photo.jpg",
  bio: "Your bio...",
  email: "your.email@example.com"
}
```

### Adding Publications

Edit `src/data/publications.js` to add new publications:

```javascript
{
  id: 1,
  title: "Your Paper Title",
  authors: ["Author 1", "Author 2"],
  venue: "Conference/Journal Name",
  year: 2025,
  type: "Conference" or "Journal",
  url: "https://link-to-paper",
  status: "Published" or "Under Review"
}
```

### Adding Research Projects

Edit `src/data/projects.js` to add new research areas:

```javascript
{
  id: 1,
  title: "Project Title",
  category: "Category Name",
  description: "Project description...",
  status: "Active"
}
```

### Updating Videos

1. Add video files to `src/assets/videos/` or `src/assets/videos/demonstrations/`
2. Update paths in `src/data/demonstrations.js`

### Customizing Colors

Edit `tailwind.config.js` to change the color scheme:

```javascript
colors: {
  primary: {
    // Your primary color shades
  },
  accent: {
    // Your accent color shades
  }
}
```

## Deployment

### Netlify

1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy!

### Vercel

1. Import your GitHub repository
2. Vercel will auto-detect Vite configuration
3. Deploy!

### GitHub Pages

1. Install gh-pages: `npm install -D gh-pages`
2. Add to package.json scripts:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```
3. Run: `npm run deploy`

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome)

## Performance

- Lighthouse Performance: >80
- First Contentful Paint: <1.5s
- Accessibility: >90

## License

Copyright © 2025 CORE Initiative. All rights reserved.

## Contact

For questions about the CORE initiative:
- Website: [Your website URL]
- Email: contact@core-initiative.eu

## Acknowledgments

Built with:
- React + Vite
- Tailwind CSS
- Framer Motion
- React Icons

Partner Institutions:
- Babeș-Bolyai University
- Faculty of Mathematics and Informatics
