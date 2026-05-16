import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
}

// Requirements 2.1 — title "Woochive"
test('renders the title "Woochive"', () => {
  renderHome();
  expect(screen.getByRole('heading', { level: 1, name: /woochive/i })).toBeInTheDocument();
});

// Requirements 2.2 — subtitle text
test('renders the subtitle text', () => {
  renderHome();
  expect(
    screen.getByText(
      'A personal archive for music data research, mathematical foundations, and creative works.'
    )
  ).toBeInTheDocument();
});

// Requirements 2.3 — bio text
test('renders the bio text', () => {
  renderHome();
  expect(
    screen.getByText(
      'I am an undergraduate mathematics student interested in Music Information Retrieval, recommendation systems, Topological Data Analysis, and mathematical approaches to music/audio data.'
    )
  ).toBeInTheDocument();
});

// Requirements 2.4 — all five keyword tags
describe('renders all five research keyword tags', () => {
  const keywords = [
    'Music Information Retrieval',
    'Recommendation Systems',
    'Topological Data Analysis',
    'Music & Audio Computing',
    'Creative Computing',
  ];

  keywords.forEach((keyword) => {
    test(`renders keyword tag: "${keyword}"`, () => {
      renderHome();
      expect(screen.getByText(keyword)).toBeInTheDocument();
    });
  });
});

// Requirements 2.5 — four contact kinds present as placeholders
describe('renders four contact placeholders', () => {
  const contactLabels = ['Email', 'GitHub', 'Website', 'CV/Profile PDF'];

  contactLabels.forEach((label) => {
    test(`renders contact placeholder: "${label}"`, () => {
      renderHome();
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  test('renders exactly four contact items', () => {
    renderHome();
    // All four contacts have undefined hrefs, so they render as <span> placeholders
    const placeholders = document.querySelectorAll('.placeholder');
    expect(placeholders).toHaveLength(4);
  });

  test('contact items are rendered as placeholders (not anchor links)', () => {
    const { container } = renderHome();
    // Since all hrefs are undefined, none should render as <a> elements in the contact row
    const contactRow = container.querySelector('.intro__contact-row');
    expect(contactRow).toBeInTheDocument();
    const anchors = contactRow!.querySelectorAll('a');
    expect(anchors).toHaveLength(0);
  });
});
