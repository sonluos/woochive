import { StatusBadgeValue } from '../types/archive';
import './StatusBadge.css';

interface StatusBadgeProps {
  status: StatusBadgeValue;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const className = (status === 'In Progress' || status === 'In Preparation')
    ? 'status-badge status-badge--in-progress'
    : 'status-badge';

  return (
    <span className={className}>
      {status}
    </span>
  );
}
