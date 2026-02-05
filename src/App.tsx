import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useTelemetryStore } from './store/telemetryStore';
import { DashboardGrid } from './layout/DashboardGrid';
import { AlarmBanner } from './components/AlarmBanner';

const App: React.FC = () => {
  const { alarmActive, alarmAcknowledged, acknowledgeAlarm, podHealth, safetyState } =
    useTelemetryStore(useShallow(state => ({
      alarmActive: state.alarmActive,
      alarmAcknowledged: state.alarmAcknowledged,
      acknowledgeAlarm: state.acknowledgeAlarm,
      podHealth: state.podHealth,
      safetyState: state.safetyState
    })));

  const bannerVisible = alarmActive && !alarmAcknowledged;
  const bannerMessage =
    safetyState === 'EMERGENCY_STOP'
      ? 'EMERGENCY STOP – Pod is in CRITICAL state. Investigate immediately.'
      : podHealth === 'CRITICAL'
      ? 'CRITICAL POD HEALTH – One or more subsystems out of range.'
      : 'Critical alarm active.';

  return (
    <div className="dashboard-root">
      <AlarmBanner
        visible={bannerVisible}
        message={bannerMessage}
        onAcknowledge={acknowledgeAlarm}
      />
      <DashboardGrid />
    </div>
  );
};

export default App;

