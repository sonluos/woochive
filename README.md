# Woochive Portfolio

Modern portfolio website built with React, TypeScript, and Vite.

## Features

- 🎨 Modern gradient design system
- 📱 Fully responsive
- ⚡ Fast performance with Vite
- 🎭 Smooth animations
- 🔍 Search and filter functionality
- 📊 Dynamic content from JSON files

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: CSS with CSS Variables
- **Testing**: Vitest + React Testing Library
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
woochive/
├── public/
│   └── data/           # JSON data files
│       ├── projects.json
│       ├── music.json
│       ├── publications.json
│       ├── bio.json
│       └── courses.json
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom hooks
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript types
│   └── styles/         # Global styles
└── dist/               # Production build
```

## Content Management

Content is managed through JSON files in `public/data/`:

1. Edit JSON files directly on GitHub
2. Commit changes
3. Vercel automatically redeploys

### Data Files

- `projects.json` - Research projects
- `music.json` - Music works
- `publications.json` - Academic publications
- `bio.json` - Personal bio
- `courses.json` - Course information

## Deployment

Deployed on Vercel with automatic deployments from the `main` branch.

### Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sonluos/woochive)

## Development

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint
```

## License

MIT

## Author

Son Woo Jin
