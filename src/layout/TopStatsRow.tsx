import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Counter } from '../components/Counter';
import { useTelemetryStore } from '../store/telemetryStore';

export const TopStatsRow: React.FC = () => {
  const {
    podId,
    activeTrackSegmentId,
    safetyState,
    controlLatencyMs,
    powerReservePct,
    activeFaultCount,
    podHealth
  } = useTelemetryStore(useShallow(state => ({
    podId: state.podId,
    activeTrackSegmentId: state.activeTrackSegmentId,
    safetyState: state.safetyState,
    controlLatencyMs: state.controlLatencyMs,
    powerReservePct: state.powerReservePct,
    activeFaultCount: state.activeFaultCount,
    podHealth: state.podHealth
  })));

  return (
    <div className="top-stats-row">
      <Counter label="Pod ID" value={podId} />
      <Counter
        label="Active Track Segment"
        value={activeTrackSegmentId !== null ? activeTrackSegmentId : '-'}
      />
      <Counter label="System Safety State" value={safetyState} health={podHealth} />
      <Counter
        label="Control Link Latency"
        value={controlLatencyMs.toFixed(1)}
        unit="ms"
      />
      <Counter
        label="Power Reserve"
        value={powerReservePct.toFixed(1)}
        unit="%"
      />
      <Counter label="Active Fault Count" value={activeFaultCount} />
    </div>
  );
};

export default TopStatsRow;

