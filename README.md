# CORE Demo Website

A React application demonstrating the website for the CORE (Cognitive Robotics in Europe) initiative.

## Tech Stack

- **React 18**
- **Vite 5**
- **Tailwind CSS**
- **Framer Motion**

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

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

## Project Structure

```
core/
├── src/
│   ├── assets/          # Media assets (videos, images)
│   ├── components/      # React components
│   ├── data/            # Static data (team, projects, etc.)
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   └── App.jsx          # Main app component
```

## Configuration

Data files in `src/data/` can be modified to update content:
- `team.js`: Team members
- `projects.js`: Research projects
- `publications.js`: Publications list
- `demonstrations.js`: Video links and metadata

<!-- Trigger deployment -->
