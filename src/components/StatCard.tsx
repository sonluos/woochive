import React from 'react';
import './StatCard.css';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  gradient: 'purple' | 'blue' | 'orange' | 'mixed';
  progress?: number; // 0-100
  children?: React.ReactNode;
}

function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  gradient, 
  progress,
  children 
}: StatCardProps) {
  return (
    <div className={`stat-card stat-card--${gradient}`}>
      <div className="stat-card__header">
        {icon && <div className="stat-card__icon">{icon}</div>}
        <h3 className="stat-card__title">{title}</h3>
      </div>
      
      <div className="stat-card__content">
        <div className="stat-card__value">{value}</div>
        {subtitle && <p className="stat-card__subtitle">{subtitle}</p>}
        
        {progress !== undefined && (
          <div className="stat-card__progress">
            <div 
              className="stat-card__progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        
        {children && (
          <div className="stat-card__extra">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;
