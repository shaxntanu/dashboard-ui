import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Gauge } from '../components/Gauge';
import { useTelemetryStore } from '../store/telemetryStore';

export const GaugesRow: React.FC = () => {
  const { speed, receivedPower, maxTemperature, podHealth, speedHealth, powerHealth, thermalHealth } =
    useTelemetryStore(useShallow(state => ({
      speed: state.speed,
      receivedPower: state.receivedPower,
      maxTemperature: state.maxTemperature,
      podHealth: state.podHealth,
      speedHealth: state.speedHealth,
      powerHealth: state.powerHealth,
      thermalHealth: state.thermalHealth
    })));

  return (
    <div className="gauges-row">
      <Gauge label="Pod Speed" value={speed} min={0} max={300} unit="m/s" health={speedHealth} />
      <Gauge
        label="Received Power"
        value={receivedPower}
        min={0}
        max={300}
        unit="kW"
        health={powerHealth}
      />
      <Gauge
        label="Max Temperature"
        value={maxTemperature}
        min={20}
        max={110}
        unit="°C"
        health={thermalHealth}
      />
      <Gauge
        label="Overall Pod Health"
        value={
          podHealth === 'NOMINAL'
            ? 100
            : podHealth === 'DEGRADED'
            ? 60
            : podHealth === 'CRITICAL'
            ? 20
            : 0
        }
        min={0}
        max={100}
        unit="%"
        health={podHealth}
      />
    </div>
  );
};

export default GaugesRow;

