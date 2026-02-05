import React from 'react';
import TopStatsRow from './TopStatsRow';
import GaugesRow from './GaugesRow';
import ChartsGrid from './ChartsGrid';
import RightPanel from './RightPanel';
import PodViewer from '../digitalTwin/PodViewer';

export const DashboardGrid: React.FC = () => {
  return (
    <div className="dashboard-grid">
      <TopStatsRow />
      <GaugesRow />
      <ChartsGrid />
      <div className="pod-viewer-panel">
        <PodViewer />
      </div>
      <RightPanel />
    </div>
  );
};

export default DashboardGrid;

