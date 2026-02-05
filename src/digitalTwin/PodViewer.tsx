import React from 'react';

export const PodViewer: React.FC = () => {
  return (
    <div className="panel">
      <div className="panel-title">Pod Digital Twin (Placeholder)</div>
      <div className="pod-viewer-canvas">
        <div className="pod-viewer-label" style={{ top: '8px', left: '8px' }}>
          Nose / Sensors
        </div>
        <div className="pod-viewer-label" style={{ top: '8px', right: '8px' }}>
          Control Module
        </div>
        <div className="pod-viewer-label" style={{ bottom: '8px', left: '8px' }}>
          Power Train
        </div>
        <div className="pod-viewer-label" style={{ bottom: '8px', right: '8px' }}>
          Thermal System
        </div>
        <div className="pod-viewer-label" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          Pod Body
        </div>
      </div>
    </div>
  );
};

export default PodViewer;

