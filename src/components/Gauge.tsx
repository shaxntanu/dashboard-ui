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
  
  // Calculate arc endpoints for bottom semicircle (left to right)
  const startX = centerX - radius;
  const startY = centerY;
  const endX = centerX + radius;
  const endY = centerY;
  
  // Calculate needle position
  // Angle goes from PI (180° left) to 0 (0° right)
  const angle = Math.PI * (1 - ratio);
  const needleX = centerX + radius * Math.cos(angle);
  const needleY = centerY - radius * Math.sin(angle);

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
        {/* Background arc - bottom semicircle */}
        <path
          d={`M ${startX} ${startY} A ${radius} ${radius} 0 1 1 ${endX} ${endY}`}
          stroke="#1f2937"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        {/* Value arc */}
        <path
          d={`M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} 1 ${needleX} ${needleY}`}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
        {/* Needle */}
        <line
          x1={centerX}
          y1={centerY}
          x2={needleX}
          y2={needleY}
          stroke={color}
          strokeWidth={2}
        />
        {/* Center dot */}
        <circle cx={centerX} cy={centerY} r={3} fill="#e5e7eb" />
        {/* Min label */}
        <text x={8} y={62} fill="#6b7280" fontSize={6}>
          {min}
        </text>
        {/* Max label */}
        <text x={92} y={62} fill="#6b7280" fontSize={6} textAnchor="end">
          {max}
        </text>
      </svg>
    </div>
  );
};

export default Gauge;

