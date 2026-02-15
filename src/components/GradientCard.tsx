import React from 'react';
import './GradientCard.css';

export interface GradientCardProps {
  children: React.ReactNode;
  gradient?: 'purple' | 'blue' | 'orange' | 'none';
  hover?: boolean;
  onClick?: () => void;
  className?: string;
}

function GradientCard({ 
  children, 
  gradient = 'none', 
  hover = true, 
  onClick, 
  className = '' 
}: GradientCardProps) {
  const classes = [
    'gradient-card',
    gradient !== 'none' && `gradient-card--${gradient}`,
    hover && 'gradient-card--hover',
    onClick && 'gradient-card--clickable',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
}

export default GradientCard;
