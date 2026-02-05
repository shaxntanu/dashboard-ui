import React from 'react';
import { LinePlot } from '../components/LinePlot';
import { useTelemetryStore } from '../store/telemetryStore';

export const ChartsGrid: React.FC = () => {
  const history = useTelemetryStore(state => state.history);

  return (
    <div className="charts-grid">
      <LinePlot
        label="Speed vs Time"
        unit=" m/s"
        data={history}
        field="speed"
        stroke="#22c55e"
        yMin={0}
        yMax={300}
      />
      <LinePlot
        label="Power vs Time"
        unit=" kW"
        data={history}
        field="receivedPower"
        stroke="#38bdf8"
        yMin={0}
        yMax={300}
      />
      <LinePlot
        label="Temperature vs Time"
        unit=" °C"
        data={history}
        field="maxTemperature"
        stroke="#f97316"
        yMin={20}
        yMax={110}
      />
    </div>
  );
};

export default ChartsGrid;

