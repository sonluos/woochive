// Feature: woochive-personal-archive, Property 1: All nav links are present
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from './Navigation';
import fc from 'fast-check';

const EXPECTED_NAV_LINKS = [
  { label: 'Intro', path: '/' },
  { label: 'Research', path: '/research' },
  { label: 'Foundations', path: '/foundations' },
  { label: 'Works', path: '/works' },
];

/**
 * Property 1: All nav links are present
 * Validates: Requirements 1.1
 *
 * For any render of the Navigation component, the output must contain
 * exactly four links with the labels "Intro", "Research", "Foundations",
 * and "Works" — no more, no fewer.
 */
describe('Property 1: All nav links are present', () => {
  it('renders exactly four nav links with correct labels on every render', () => {
    fc.assert(
      fc.property(
        // Vary the current route to ensure links are present regardless of active state
        fc.constantFrom('/', '/research', '/foundations', '/works', '/unknown'),
        (route) => {
          const { unmount } = render(
            <MemoryRouter initialEntries={[route]}>
              <Navigation />
            </MemoryRouter>
          );

          // Collect all nav links (desktop nav)
          const navEl = document.querySelector('nav[aria-label="Main navigation"]');
          expect(navEl).not.toBeNull();

          const links = navEl!.querySelectorAll('a');
          // Must have exactly four links
          expect(links.length).toBe(4);

          // Each expected label must be present
          EXPECTED_NAV_LINKS.forEach(({ label }) => {
            expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(1);
          });

          // Each expected path must be present as an href
          EXPECTED_NAV_LINKS.forEach(({ path }) => {
            const found = Array.from(links).some(
              (a) => (a as HTMLAnchorElement).getAttribute('href') === path
            );
            expect(found).toBe(true);
          });

          unmount();
        }
      ),
      { numRuns: 25 }
    );
  });
});
