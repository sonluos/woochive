import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './Navigation';

describe('Navigation Component', () => {
  const renderNavigation = () => {
    return render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );
  };

  it('should render all 5 navigation links', () => {
    renderNavigation();
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Music')).toBeInTheDocument();
    expect(screen.getByText('Publications')).toBeInTheDocument();
  });

  it('should render logo', () => {
    renderNavigation();
    
    expect(screen.getByText('Woochive')).toBeInTheDocument();
  });

  it('should have correct href attributes', () => {
    renderNavigation();
    
    const homeLink = screen.getByText('Home').closest('a');
    const aboutLink = screen.getByText('About').closest('a');
    const projectsLink = screen.getByText('Projects').closest('a');
    const musicLink = screen.getByText('Music').closest('a');
    const publicationsLink = screen.getByText('Publications').closest('a');
    
    expect(homeLink).toHaveAttribute('href', '/');
    expect(aboutLink).toHaveAttribute('href', '/about');
    expect(projectsLink).toHaveAttribute('href', '/projects');
    expect(musicLink).toHaveAttribute('href', '/music');
    expect(publicationsLink).toHaveAttribute('href', '/publications');
  });

  it('should render mobile menu toggle button', () => {
    renderNavigation();
    
    const toggleButton = screen.getByLabelText('Toggle menu');
    expect(toggleButton).toBeInTheDocument();
  });
});
