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

// Requirements 2.2 — subtitle text with highlights
test('renders the subtitle text', () => {
  renderHome();
  expect(screen.getByText(/A personal archive for/)).toBeInTheDocument();
  expect(screen.getByText(/music data research/)).toBeInTheDocument();
  expect(screen.getByText(/mathematical foundations/)).toBeInTheDocument();
  expect(screen.getByText(/creative works/)).toBeInTheDocument();
});

// Requirements 3.1, 3.2 — bio lines rendered
describe('renders bio lines with highlights', () => {
  test('renders first bio line about Applied Mathematics', () => {
    renderHome();
    expect(screen.getByText(/I study/)).toBeInTheDocument();
    expect(screen.getByText(/Applied Mathematics/)).toBeInTheDocument();
  });

  test('renders second bio line about research areas', () => {
    renderHome();
    expect(screen.getByText(/I research/)).toBeInTheDocument();
    expect(screen.getByText(/Music Information Retrieval/)).toBeInTheDocument();
  });

  test('renders third bio line about music', () => {
    renderHome();
    expect(screen.getByText(/I listen to/)).toBeInTheDocument();
    expect(screen.getByText(/live music/)).toBeInTheDocument();
  });
});

// Requirements 4.3, 4.4, 4.5 — InfoCard content
describe('renders InfoCard with correct content', () => {
  test('renders affiliation', () => {
    renderHome();
    expect(screen.getByText(/Korea University/)).toBeInTheDocument();
  });

  test('renders email as plain text', () => {
    renderHome();
    expect(screen.getByText(/sonluos1013@gmail.com/)).toBeInTheDocument();
  });

  test('renders GitHub link', () => {
    renderHome();
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('renders LinkedIn link', () => {
    renderHome();
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

// Requirements 5.1, 5.2 — old sections removed
describe('old sections are removed', () => {
  test('does not render Research Keywords heading', () => {
    renderHome();
    expect(screen.queryByText('Research Keywords')).not.toBeInTheDocument();
  });

  test('does not render old contact row', () => {
    const { container } = renderHome();
    expect(container.querySelector('.intro__contact-row')).not.toBeInTheDocument();
  });
});
