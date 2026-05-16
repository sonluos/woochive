import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Works from './Works';

function renderWorks() {
  return render(
    <MemoryRouter>
      <Works />
    </MemoryRouter>
  );
}

// Requirements 7.1 — four cards present (h3 card titles)
describe('renders four works cards', () => {
  const cardTitles = ['Music', 'Writing', 'Concerts', 'MuFasho Mag'];

  cardTitles.forEach((title) => {
    test(`renders card: "${title}"`, () => {
      renderWorks();
      const h3s = screen.getAllByRole('heading', { level: 3 });
      const match = h3s.some((el) => el.textContent === title);
      expect(match).toBe(true);
    });
  });
});

// Requirements 7.2 — Music card topics
describe('Music card topics', () => {
  const topics = [
    'Beat making',
    'Lyrics',
    'Songwriting',
    'Guitar',
    'Drum pad practice',
    'AI-assisted music experiments',
  ];

  topics.forEach((topic) => {
    test(`renders topic: "${topic}"`, () => {
      renderWorks();
      expect(screen.getByText(topic)).toBeInTheDocument();
    });
  });
});

// Requirements 7.3 — Writing card topics
describe('Writing card topics', () => {
  const topics = [
    'Music reviews',
    'Essays',
    'Modern music presentation',
    'Music & Artist presentation',
  ];

  topics.forEach((topic) => {
    test(`renders topic: "${topic}"`, () => {
      renderWorks();
      expect(screen.getByText(topic)).toBeInTheDocument();
    });
  });
});

// Requirements 7.4 — Concerts card topics
describe('Concerts card topics', () => {
  const topics = ['Concert photos', 'Videos', 'Short reflections'];

  topics.forEach((topic) => {
    test(`renders topic: "${topic}"`, () => {
      renderWorks();
      expect(screen.getByText(topic)).toBeInTheDocument();
    });
  });
});

// Requirements 7.5 — MuFasho Mag card topics
describe('MuFasho Mag card topics', () => {
  const topics = ['Fashion', 'Editorial ideas'];

  topics.forEach((topic) => {
    test(`renders topic: "${topic}"`, () => {
      renderWorks();
      expect(screen.getByText(topic)).toBeInTheDocument();
    });
  });
});
