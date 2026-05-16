// Feature: woochive-personal-archive, Property 7: Semantic HTML structure on every page
/**
 * Validates: Requirements 10.4
 *
 * Property: For any rendered page route (/, /research, /foundations, /works),
 * the output must contain a <nav> element, a <main> element, at least one
 * <section> element, and a <footer> element.
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import * as fc from 'fast-check';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Home from './Home';
import Research from './Research';
import Foundations from './Foundations';
import Works from './Works';

function AppShell({ route }: { route: string }) {
  return (
    <MemoryRouter initialEntries={[route]}>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/research" element={<Research />} />
        <Route path="/foundations" element={<Foundations />} />
        <Route path="/works" element={<Works />} />
      </Routes>
      <Footer />
    </MemoryRouter>
  );
}

describe('Property 7: Semantic HTML structure on every page', () => {
  it('every page route contains <nav>, <main>, at least one <section>, and <footer>', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('/', '/research', '/foundations', '/works'),
        (route) => {
          const { container, unmount } = render(<AppShell route={route} />);

          // Must contain a <nav> element
          const navElements = container.querySelectorAll('nav');
          expect(navElements.length).toBeGreaterThanOrEqual(1);

          // Must contain a <main> element
          const mainElements = container.querySelectorAll('main');
          expect(mainElements.length).toBeGreaterThanOrEqual(1);

          // Must contain at least one <section> element
          const sectionElements = container.querySelectorAll('section');
          expect(sectionElements.length).toBeGreaterThanOrEqual(1);

          // Must contain a <footer> element
          const footerElements = container.querySelectorAll('footer');
          expect(footerElements.length).toBeGreaterThanOrEqual(1);

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});
