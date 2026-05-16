import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Research from './Research';

function renderResearch() {
  return render(
    <MemoryRouter>
      <Research />
    </MemoryRouter>
  );
}

// Requirements 3.3 — five subsection headings (h2 level)
describe('renders five subsection headings', () => {
  const headings = [
    'Publications & Presentations',
    'MIR Recommendation System',
    'MIR with TDA',
    'Bone Suppression & Anisotropic Diffusion',
    'Diffusion Education Program',
  ];

  headings.forEach((heading) => {
    test(`renders heading: "${heading}"`, () => {
      renderResearch();
      const h2s = screen.getAllByRole('heading', { level: 2 });
      const match = h2s.some((el) => el.textContent === heading);
      expect(match).toBe(true);
    });
  });
});

// Requirements 4.2 — IPIU 2026 entry
test('renders IPIU 2026 Poster Presentation entry', () => {
  renderResearch();
  expect(screen.getByText('IPIU 2026')).toBeInTheDocument();
  expect(screen.getByText('Poster Presentation')).toBeInTheDocument();
});

// Requirements 4.3 — "Presented / In Preparation" badge
test('renders "Presented / In Preparation" status badge', () => {
  renderResearch();
  expect(screen.getByText('Presented / In Preparation')).toBeInTheDocument();
});

// Requirements 5.1–5.2 — MIR Recommendation System
test('renders MIR Recommendation System description', () => {
  renderResearch();
  expect(
    screen.getByText(
      'A research project analyzing hip-hop album data using Apple Music / Spotify metadata and audio features to design a similarity-based recommendation system.'
    )
  ).toBeInTheDocument();
});

describe('renders MIR Recommendation System tags', () => {
  ['MIR', 'Recommendation System', 'Clustering', 'MATLAB', 'Music Data'].forEach((tag) => {
    test(`tag: "${tag}"`, () => {
      renderResearch();
      expect(screen.getAllByText(tag).length).toBeGreaterThan(0);
    });
  });
});

// Requirements 5.3–5.4 — MIR with TDA
test('renders MIR with TDA description', () => {
  renderResearch();
  expect(
    screen.getByText(
      'A project exploring how Topological Data Analysis can be applied to music data and how it compares with traditional DSP-based music feature analysis.'
    )
  ).toBeInTheDocument();
});

describe('renders MIR with TDA tags', () => {
  ['TDA', 'Music Structure', 'Topology', 'S-Curt'].forEach((tag) => {
    test(`tag: "${tag}"`, () => {
      renderResearch();
      expect(screen.getAllByText(tag).length).toBeGreaterThan(0);
    });
  });
});

// Requirements 5.5–5.6 — Bone Suppression
test('renders Bone Suppression description', () => {
  renderResearch();
  expect(
    screen.getByText(
      'A study on anisotropic diffusion, EED/CED, and non-deep-learning image processing approaches for structure-preserving medical image preprocessing.'
    )
  ).toBeInTheDocument();
});

describe('renders Bone Suppression tags', () => {
  ['Image Processing', 'Diffusion', 'EED', 'CED', 'CXR'].forEach((tag) => {
    test(`tag: "${tag}"`, () => {
      renderResearch();
      expect(screen.getAllByText(tag).length).toBeGreaterThan(0);
    });
  });
});

// Requirements 5.7–5.8 — Diffusion Education
test('renders Diffusion Education description', () => {
  renderResearch();
  expect(
    screen.getByText(
      'An educational project explaining AI and diffusion models through functional thinking, visualization, and simple mathematical intuition.'
    )
  ).toBeInTheDocument();
});

describe('renders Diffusion Education tags', () => {
  ['AI Education', 'Visualization', 'Function'].forEach((tag) => {
    test(`tag: "${tag}"`, () => {
      renderResearch();
      expect(screen.getAllByText(tag).length).toBeGreaterThan(0);
    });
  });
});
