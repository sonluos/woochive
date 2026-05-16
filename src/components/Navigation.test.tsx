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

  it('should render all 4 navigation links', () => {
    renderNavigation();
    
    expect(screen.getByText('Intro')).toBeInTheDocument();
    expect(screen.getByText('Research')).toBeInTheDocument();
    expect(screen.getByText('Foundations')).toBeInTheDocument();
    expect(screen.getByText('Works')).toBeInTheDocument();
  });

  it('should render logo', () => {
    renderNavigation();
    
    expect(screen.getByText('Woochive')).toBeInTheDocument();
  });

  it('should have correct href attributes', () => {
    renderNavigation();
    
    const introLink = screen.getByText('Intro').closest('a');
    const researchLink = screen.getByText('Research').closest('a');
    const foundationsLink = screen.getByText('Foundations').closest('a');
    const worksLink = screen.getByText('Works').closest('a');
    
    expect(introLink).toHaveAttribute('href', '/');
    expect(researchLink).toHaveAttribute('href', '/research');
    expect(foundationsLink).toHaveAttribute('href', '/foundations');
    expect(worksLink).toHaveAttribute('href', '/works');
  });

  it('should render mobile menu toggle button', () => {
    renderNavigation();
    
    // The burger button has aria-label "Open menu" or "Close menu"
    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();
  });
});
