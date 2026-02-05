import React from 'react';
import type { HealthStatus } from '../store/health';

interface CounterProps {
  label: string;
  value: string | number;
  unit?: string;
  health?: HealthStatus;
}

const healthClass = (health?: HealthStatus) => {
  switch (health) {
    case 'NOMINAL':
      return 'health-nominal';
    case 'DEGRADED':
      return 'health-degraded';
    case 'CRITICAL':
      return 'health-critical';
    case 'INVALID':
    default:
      return 'health-invalid';
  }
};

export const Counter: React.FC<CounterProps> = ({ label, value, unit, health }) => {
  return (
    <div className="panel counter-root">
      <div className="counter-label">{label}</div>
      <div className="counter-value-row">
        <div>
          <span className="counter-value">{value}</span>
          {unit && <span className="counter-unit">{unit}</span>}
        </div>
        {health && <div className={`health-indicator ${healthClass(health)}`} />}
      </div>
    </div>
  );
};

export default Counter;

