import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Navigation } from './Navigation';
import fc from 'fast-check';

describe('Navigation Property Tests', () => {
  describe('Property 1: Navigation link click navigates correctly', () => {
    it('should have correct href for all navigation links', () => {
      render(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      );

      const links = [
        { text: 'Home', href: '/' },
        { text: 'About', href: '/about' },
        { text: 'Projects', href: '/projects' },
        { text: 'Music', href: '/music' },
        { text: 'Publications', href: '/publications' }
      ];

      links.forEach(({ text, href }) => {
        const link = screen.getByText(text).closest('a');
        expect(link).toHaveAttribute('href', href);
      });
    });
  });

  describe('Property 2: Active section highlighting', () => {
    it('should highlight the active route', () => {
      const routes = ['/', '/about', '/projects', '/music', '/publications'];

      routes.forEach(route => {
        const { container } = render(
          <MemoryRouter initialEntries={[route]}>
            <Navigation />
          </MemoryRouter>
        );

        const activeLinks = container.querySelectorAll('.active');
        expect(activeLinks.length).toBeGreaterThan(0);
      });
    });

    it('should only have one active link at a time', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('/', '/about', '/projects', '/music', '/publications'),
          (route) => {
            const { container } = render(
              <MemoryRouter initialEntries={[route]}>
                <Navigation />
              </MemoryRouter>
            );

            const activeLinks = container.querySelectorAll('.active');
            return activeLinks.length === 1;
          }
        )
      );
    });
  });

  describe('Property 3: Navigation visibility', () => {
    it('should always render all 5 navigation links', () => {
      render(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      );

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('Projects')).toBeInTheDocument();
      expect(screen.getByText('Music')).toBeInTheDocument();
      expect(screen.getByText('Publications')).toBeInTheDocument();
    });
  });

  describe('Property 30: Mobile navigation menu toggle', () => {
    it('should have a mobile menu toggle button', () => {
      const { container } = render(
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      );

      const menuButton = container.querySelector('.menu-toggle');
      expect(menuButton).toBeInTheDocument();
    });
  });
});
