import { create } from 'zustand';
import type { HealthStatus } from './health';
import { startMockTelemetryEngine } from '../mock/mockTelemetry';

export interface PodTelemetrySample {
  timestamp: number;
  speed: number;
  receivedPower: number;
  maxTemperature: number;
}

export interface TrackSegment {
  id: number;
  position: number;
  length: number;
  temperature: number;
  powerLoad: number;
  health: HealthStatus;
}

export type SafetyState = 'IDLE' | 'ARMED' | 'RUNNING' | 'EMERGENCY_STOP';

export interface Fault {
  id: number;
  timestamp: number;
  message: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
}

export interface TelemetryState {
  podId: string;
  activeTrackSegmentId: number | null;
  safetyState: SafetyState;
  controlLatencyMs: number;
  powerReservePct: number;
  activeFaultCount: number;

  speed: number;
  receivedPower: number;
  maxTemperature: number;

  podHealth: HealthStatus;
  speedHealth: HealthStatus;
  powerHealth: HealthStatus;
  thermalHealth: HealthStatus;
  trackHealth: HealthStatus;

  history: PodTelemetrySample[];
  trackSegments: TrackSegment[];
  selectedSegmentId: number | null;
  faults: Fault[];

  alarmActive: boolean;
  alarmAcknowledged: boolean;

  running: boolean;

  setState: (partial: Partial<TelemetryState>) => void;
  selectSegment: (id: number) => void;
  acknowledgeAlarm: () => void;
  startRun: () => void;
  stopRun: () => void;
  emergencyStop: () => void;
  restartSimulation: () => void;
  injectFault: (message: string, severity?: Fault['severity']) => void;
}

export type { HealthStatus };

let faultIdCounter = 1;

export const useTelemetryStore = create<TelemetryState>((set, get) => {
  const initialSegments: TrackSegment[] = Array.from({ length: 40 }).map((_, idx) => ({
    id: idx,
    position: idx * 0.5,
    length: 0.5,
    temperature: 25,
    powerLoad: 0,
    health: 'INVALID'
  }));

  const initial: TelemetryState = {
    podId: 'POD-01',
    activeTrackSegmentId: null,
    safetyState: 'IDLE',
    controlLatencyMs: 0,
    powerReservePct: 100,
    activeFaultCount: 0,

    speed: 0,
    receivedPower: 0,
    maxTemperature: 25,

    podHealth: 'INVALID',
    speedHealth: 'INVALID',
    powerHealth: 'INVALID',
    thermalHealth: 'INVALID',
    trackHealth: 'INVALID',

    history: [],
    trackSegments: initialSegments,
    selectedSegmentId: null,
    faults: [],

    alarmActive: false,
    alarmAcknowledged: false,

    running: false,

    setState: partial => set(partial),
    selectSegment: id => set({ selectedSegmentId: id }),
    acknowledgeAlarm: () => set({ alarmAcknowledged: true, alarmActive: false }),
    startRun: () => set({ running: true, safetyState: 'RUNNING' }),
    stopRun: () => set({ running: false, safetyState: 'IDLE' }),
    emergencyStop: () =>
      set(state => ({
        running: false,
        safetyState: 'EMERGENCY_STOP',
        alarmActive: true,
        alarmAcknowledged: false,
        faults: [
          ...state.faults,
          {
            id: faultIdCounter++,
            timestamp: Date.now(),
            message: 'Emergency stop activated',
            severity: 'CRITICAL'
          }
        ],
        activeFaultCount: state.activeFaultCount + 1
      })),
    restartSimulation: () =>
      set(() => ({
        running: false,
        safetyState: 'IDLE',
        speed: 0,
        receivedPower: 0,
        maxTemperature: 25,
        podHealth: 'INVALID',
        speedHealth: 'INVALID',
        powerHealth: 'INVALID',
        thermalHealth: 'INVALID',
        trackHealth: 'INVALID',
        history: [],
        trackSegments: initialSegments,
        selectedSegmentId: null,
        faults: [],
        activeFaultCount: 0,
        alarmActive: false,
        alarmAcknowledged: false,
        activeTrackSegmentId: null,
        powerReservePct: 100,
        controlLatencyMs: 0
      })),
    injectFault: (message: string, severity: Fault['severity'] = 'WARNING') =>
      set(state => ({
        faults: [
          ...state.faults,
          {
            id: faultIdCounter++,
            timestamp: Date.now(),
            message,
            severity
          }
        ],
        activeFaultCount: state.activeFaultCount + (severity === 'INFO' ? 0 : 1),
        alarmActive: severity === 'CRITICAL' ? true : state.alarmActive,
        alarmAcknowledged: severity === 'CRITICAL' ? false : state.alarmAcknowledged
      }))
  };

  return initial;
});

// Start the mock telemetry engine once at module load, outside React
startMockTelemetryEngine(useTelemetryStore.setState, useTelemetryStore.getState);

