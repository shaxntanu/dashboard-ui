import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useTelemetryStore } from '../store/telemetryStore';
import { SegmentBar } from '../components/SegmentBar';

export const RightPanel: React.FC = () => {
  const {
    safetyState,
    podHealth,
    trackHealth,
    controlLatencyMs,
    faults,
    trackSegments,
    selectedSegmentId,
    selectSegment,
    running,
    startRun,
    stopRun,
    emergencyStop,
    restartSimulation
  } = useTelemetryStore(useShallow(state => ({
    safetyState: state.safetyState,
    podHealth: state.podHealth,
    trackHealth: state.trackHealth,
    controlLatencyMs: state.controlLatencyMs,
    faults: state.faults,
    trackSegments: state.trackSegments,
    selectedSegmentId: state.selectedSegmentId,
    selectSegment: state.selectSegment,
    running: state.running,
    startRun: state.startRun,
    stopRun: state.stopRun,
    emergencyStop: state.emergencyStop,
    restartSimulation: state.restartSimulation
  })));

  const selectedSegment = trackSegments.find(s => s.id === selectedSegmentId) ?? null;

  const anyCritical = podHealth === 'CRITICAL' || trackHealth === 'CRITICAL';
  const controlsDisabled = anyCritical || safetyState === 'EMERGENCY_STOP';

  return (
    <div className="right-panel">
      <div className="right-panel-section system-state-card">
        <div className="right-panel-header">
          <div className="panel-title">System Safety State</div>
          <div 
            className={`safety-indicator ${safetyState === 'EMERGENCY_STOP' ? 'safety-indicator-critical' : 'safety-indicator-normal'}`}
          />
        </div>
        <div className="counter-root">
          <div className="counter-label">Safety State</div>
          <div className="counter-value" style={{ 
            color: safetyState === 'EMERGENCY_STOP' ? '#ef4444' : '#e5e7eb',
            fontSize: '20px'
          }}>
            {safetyState}
          </div>
          <div className="counter-label" style={{ marginTop: 8 }}>
            Pod Health
          </div>
          <div className="counter-value">{podHealth}</div>
          <div className="counter-label" style={{ marginTop: 8 }}>
            Track Health
          </div>
          <div className="counter-value">{trackHealth}</div>
          <div className="counter-label" style={{ marginTop: 8 }}>
            Control Latency
          </div>
          <div className="counter-value">{controlLatencyMs.toFixed(1)} ms</div>
        </div>
        <div className="right-panel-controls">
          <button className="btn" onClick={startRun} disabled={controlsDisabled || running}>
            Start
          </button>
          <button className="btn" onClick={stopRun} disabled={controlsDisabled || !running}>
            Stop
          </button>
        </div>
        <div className="right-panel-controls" style={{ marginTop: 6 }}>
          <button className="btn btn-emergency" onClick={emergencyStop}>
            Emergency Stop
          </button>
          <button className="btn" onClick={restartSimulation}>
            Restart
          </button>
        </div>
      </div>

      <div className="right-panel-section">
        <div className="right-panel-header">
          <div className="panel-title">Track / Segment</div>
        </div>
        <SegmentBar
          segments={trackSegments}
          selectedId={selectedSegmentId}
          onSelect={selectSegment}
        />
        {selectedSegment && (
          <div style={{ marginTop: 6, fontSize: 11 }}>
            <div>Segment ID: {selectedSegment.id}</div>
            <div>
              Position: {selectedSegment.position.toFixed(1)} m – Length:{' '}
              {selectedSegment.length.toFixed(2)} m
            </div>
            <div>Temperature: {selectedSegment.temperature.toFixed(1)} °C</div>
            <div>Power Load: {selectedSegment.powerLoad.toFixed(1)} kW</div>
            <div>Health: {selectedSegment.health}</div>
          </div>
        )}
      </div>

      <div className="right-panel-section">
        <div className="right-panel-header">
          <div className="panel-title">Faults / Events</div>
        </div>
        <div className="fault-list">
          {faults.length === 0 && <div style={{ fontSize: 11 }}>No active faults.</div>}
          {faults
            .slice()
            .reverse()
            .map(f => (
              <div key={f.id} className="fault-row">
                <div style={{ fontSize: 10, color: '#6b7280' }}>
                  {new Date(f.timestamp).toLocaleTimeString()}
                </div>
                <div className="fault-message">{f.message}</div>
                <div style={{ fontSize: 10 }}>{f.severity}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RightPanel;

