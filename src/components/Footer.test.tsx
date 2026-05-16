import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

function renderFooter() {
  return render(<Footer />);
}

// Requirements 8.1 — site name "Woochive"
it('renders the site name "Woochive"', () => {
  renderFooter();
  expect(screen.getByText('Woochive')).toBeInTheDocument();
});

// Requirements 8.3 — tagline text
it('renders the tagline text', () => {
  renderFooter();
  expect(
    screen.getByText('Music, mathematics, research, and creative records.')
  ).toBeInTheDocument();
});

// Requirements 8.2 — Email placeholder present
it('renders an Email placeholder', () => {
  renderFooter();
  expect(screen.getByText('Email')).toBeInTheDocument();
});

// Requirements 8.2 — GitHub placeholder present
it('renders a GitHub placeholder', () => {
  renderFooter();
  expect(screen.getByText('GitHub')).toBeInTheDocument();
});

// Requirements 8.2 — placeholders are not anchor links
describe('contact placeholders are not navigable anchors', () => {
  it('Email is rendered as a span placeholder, not an anchor', () => {
    const { container } = renderFooter();
    const emailText = screen.getByText('Email');
    // The placeholder label is inside a <span>, not an <a>
    expect(emailText.tagName.toLowerCase()).toBe('span');
    // No anchor wraps the email placeholder
    const anchors = container.querySelectorAll('a');
    const emailAnchor = Array.from(anchors).find((a) =>
      a.textContent?.includes('Email')
    );
    expect(emailAnchor).toBeUndefined();
  });

  it('GitHub is rendered as a span placeholder, not an anchor', () => {
    const { container } = renderFooter();
    const githubText = screen.getByText('GitHub');
    expect(githubText.tagName.toLowerCase()).toBe('span');
    const anchors = container.querySelectorAll('a');
    const githubAnchor = Array.from(anchors).find((a) =>
      a.textContent?.includes('GitHub')
    );
    expect(githubAnchor).toBeUndefined();
  });
});
