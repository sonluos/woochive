import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Foundations from './Foundations';

function renderFoundations() {
  return render(
    <MemoryRouter>
      <Foundations />
    </MemoryRouter>
  );
}

// Requirements 6.1 — four cards present (h3 card titles)
describe('renders four foundation cards', () => {
  const cardTitles = ['Mathematics', 'Computer Science & AI', 'Paper Reading', 'LaTeX Notes'];

  cardTitles.forEach((title) => {
    test(`renders card: "${title}"`, () => {
      renderFoundations();
      const h3s = screen.getAllByRole('heading', { level: 3 });
      const match = h3s.some((el) => el.textContent === title);
      expect(match).toBe(true);
    });
  });
});

// Requirements 6.2 — Mathematics card items
describe('Mathematics card items', () => {
  const items = [
    'Real Analysis',
    'Topology I',
    'Algebra I',
    'Numerical Analysis',
    'Linear Algebra',
    'Differential Equations',
  ];

  items.forEach((item) => {
    test(`renders item: "${item}"`, () => {
      renderFoundations();
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
});

// Requirements 6.3 — Computer Science & AI card items
describe('Computer Science & AI card items', () => {
  const items = [
    'Data Science',
    'Artificial Intelligence',
    'Neural Network from Scratch',
    'MATLAB / Python Notes',
  ];

  items.forEach((item) => {
    test(`renders item: "${item}"`, () => {
      renderFoundations();
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
});

// Requirements 6.4 — Paper Reading card items
describe('Paper Reading card items', () => {
  const items = [
    'Anisotropic Diffusion in ITK',
    'MIR papers',
    'TDA papers',
    'Music and Audio Computing papers',
  ];

  items.forEach((item) => {
    test(`renders item: "${item}"`, () => {
      renderFoundations();
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
});

// Requirements 6.5 — LaTeX Notes card items
describe('LaTeX Notes card items', () => {
  const items = [
    'Overleaf notes',
    'Research summaries',
    'Mathematical derivations',
    'Presentation notes',
  ];

  items.forEach((item) => {
    test(`renders item: "${item}"`, () => {
      renderFoundations();
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
});
