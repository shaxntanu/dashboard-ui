import React from 'react';
import type { TrackSegment } from '../store/telemetryStore';
import type { HealthStatus } from '../store/health';

interface SegmentBarProps {
  segments: TrackSegment[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const segmentColor = (health: HealthStatus): string => {
  switch (health) {
    case 'NOMINAL':
      return '#16a34a';
    case 'DEGRADED':
      return '#ca8a04';
    case 'CRITICAL':
      return '#b91c1c';
    case 'INVALID':
    default:
      return '#4b5563';
  }
};

export const SegmentBar: React.FC<SegmentBarProps> = ({ segments, selectedId, onSelect }) => {
  return (
    <div>
      <div className="counter-label">Track Segments</div>
      <div className="segment-bar-root">
        {segments.map(seg => (
          <div
            key={seg.id}
            className={`segment-cell${seg.id === selectedId ? ' selected' : ''}`}
            style={{ backgroundColor: segmentColor(seg.health) }}
            onClick={() => onSelect(seg.id)}
            title={`Seg ${seg.id} | T=${seg.temperature.toFixed(1)}°C | P=${seg.powerLoad.toFixed(
              1
            )} kW`}
          />
        ))}
      </div>
    </div>
  );
};

export default SegmentBar;

