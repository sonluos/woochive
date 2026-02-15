import React from 'react';
import './HeroSection.css';

export interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  gradient?: boolean;
  height?: 'full' | 'large' | 'medium';
  children?: React.ReactNode;
}

function HeroSection({ 
  title, 
  subtitle, 
  backgroundImage, 
  gradient = true, 
  height = 'full',
  children 
}: HeroSectionProps) {
  const classes = [
    'hero-section',
    `hero-section--${height}`,
    gradient && 'hero-section--gradient'
  ].filter(Boolean).join(' ');

  return (
    <section className={classes}>
      {backgroundImage && (
        <div 
          className="hero-section__background"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      
      <div className="hero-section__overlay" />
      
      <div className="hero-section__content">
        <h1 className="hero-section__title">{title}</h1>
        {subtitle && <p className="hero-section__subtitle">{subtitle}</p>}
        {children}
      </div>
      
      <div className="hero-section__scroll-indicator">
        <div className="hero-section__scroll-arrow" />
      </div>
    </section>
  );
}

export default HeroSection;
