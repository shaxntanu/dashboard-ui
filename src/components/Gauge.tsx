import React from 'react';
import type { HealthStatus } from '../store/health';

interface GaugeProps {
  label: string;
  value: number;
  min: number;
  max: number;
  unit?: string;
  health: HealthStatus;
}

const healthColor = (health: HealthStatus): string => {
  switch (health) {
    case 'NOMINAL':
      return '#22c55e';
    case 'DEGRADED':
      return '#eab308';
    case 'CRITICAL':
      return '#ef4444';
    case 'INVALID':
    default:
      return '#6b7280';
  }
};

export const Gauge: React.FC<GaugeProps> = ({ label, value, min, max, unit, health }) => {
  const radius = 40;
  const strokeWidth = 8;
  const centerX = 50;
  const centerY = 50;

  const clamped = Math.max(min, Math.min(max, value));
  const ratio = (clamped - min) / (max - min || 1);
  const angle = Math.PI * ratio; // 0 to PI

  const arcX = centerX + radius * Math.cos(Math.PI - angle);
  const arcY = centerY + radius * Math.sin(Math.PI - angle);

  const largeArc = ratio > 0.5 ? 1 : 0;
  const color = healthColor(health);

  return (
    <div className="panel gauge-root">
      <div className="gauge-header">
        <div className="gauge-label">{label}</div>
        <div className="gauge-value">
          {value.toFixed(1)}
          {unit && <span className="counter-unit">{unit}</span>}
        </div>
      </div>
      <svg viewBox="0 0 100 60" className="gauge-svg">
        <path
          d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 1 1 ${
            centerX + radius
          } ${centerY}`}
          stroke="#1f2937"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <path
          d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 ${largeArc} 1 ${arcX} ${arcY}`}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <line
          x1={centerX}
          y1={centerY}
          x2={arcX}
          y2={arcY}
          stroke={color}
          strokeWidth={2}
        />
        <circle cx={centerX} cy={centerY} r={2} fill="#e5e7eb" />
        <text x={8} y={55} fill="#6b7280" fontSize={6}>
          {min}
        </text>
        <text x={88} y={55} fill="#6b7280" fontSize={6} textAnchor="end">
          {max}
        </text>
      </svg>
    </div>
  );
};

export default Gauge;

