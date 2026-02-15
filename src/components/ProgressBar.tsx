import React from 'react';
import './ProgressBar.css';

export interface ProgressBarProps {
  value: number; // 0-100
  color?: 'purple' | 'blue' | 'orange' | 'cyan' | 'yellow';
  label?: string;
  showValue?: boolean;
  height?: 'sm' | 'md' | 'lg';
}

function ProgressBar({ 
  value, 
  color = 'purple', 
  label, 
  showValue = false,
  height = 'md'
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className="progress-bar-container">
      {(label || showValue) && (
        <div className="progress-bar-header">
          {label && <span className="progress-bar-label">{label}</span>}
          {showValue && <span className="progress-bar-value">{clampedValue}%</span>}
        </div>
      )}
      
      <div className={`progress-bar progress-bar--${height}`}>
        <div 
          className={`progress-bar__fill progress-bar__fill--${color}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
