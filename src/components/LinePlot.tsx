import React, { useMemo } from 'react';
import type { PodTelemetrySample } from '../store/telemetryStore';

interface LinePlotProps {
  label: string;
  unit?: string;
  data: PodTelemetrySample[];
  field: keyof Pick<PodTelemetrySample, 'speed' | 'receivedPower' | 'maxTemperature'>;
  stroke: string;
  yMin?: number;
  yMax?: number;
}

export const LinePlot: React.FC<LinePlotProps> = ({
  label,
  unit,
  data,
  field,
  stroke,
  yMin,
  yMax
}) => {
  const { path, min, max } = useMemo(() => {
    if (!data.length) {
      return { path: '', min: 0, max: 1 };
    }
    const ys = data.map(d => d[field] as number);
    const minVal = yMin ?? Math.min(...ys);
    const maxVal = yMax ?? Math.max(...ys);
    const range = maxVal - minVal || 1;

    const width = 100;
    const height = 40;
    const step = data.length > 1 ? width / (data.length - 1) : width;

    const points = data.map((d, idx) => {
      const x = idx * step;
      const normY = (d[field] as number) - minVal;
      const y = height - (normY / range) * height;
      return `${x},${y}`;
    });

    return {
      path: points.length ? `M ${points.join(' L ')}` : '',
      min: minVal,
      max: maxVal
    };
  }, [data, field, yMin, yMax]);

  return (
    <div className="panel">
      <div className="gauge-header">
        <div className="gauge-label">{label}</div>
        <div className="counter-unit">
          {min.toFixed(0)}–{max.toFixed(0)}
          {unit}
        </div>
      </div>
      <svg viewBox="0 0 100 40" className="line-plot-svg">
        <g className="line-plot-grid">
          <line x1="0" y1="10" x2="100" y2="10" />
          <line x1="0" y1="20" x2="100" y2="20" />
          <line x1="0" y1="30" x2="100" y2="30" />
        </g>
        {path && <path d={path} className="line-plot-path" stroke={stroke} />}
      </svg>
    </div>
  );
};

export default LinePlot;

