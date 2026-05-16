import { StatusBadgeValue } from '../types/archive';
import './StatusBadge.css';

interface StatusBadgeProps {
  status: StatusBadgeValue;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className="status-badge">
      {status}
    </span>
  );
}
