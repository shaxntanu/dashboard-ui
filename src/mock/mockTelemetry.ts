import type { StateCreator } from 'zustand';
import type { TelemetryState, TrackSegment } from '../store/telemetryStore';
import type { HealthStatus } from '../store/health';
import { evaluateHealthRange, worstHealth } from '../store/health';

type SetFn = Parameters<StateCreator<TelemetryState>>[0];
type GetFn = () => TelemetryState;

const HISTORY_LIMIT = 180; // ~18s at 10Hz
let engineStarted = false;

export const startMockTelemetryEngine = (set: SetFn, get: GetFn) => {
  if (engineStarted) {
    return;
  }
  engineStarted = true;
  let lastTimestamp = performance.now();

  const tick = () => {
    const now = performance.now();
    const dt = (now - lastTimestamp) / 1000;
    lastTimestamp = now;

    const state = get();

    // Deterministic base using time
    const t = now / 1000;

    let speed = state.speed;
    if (state.running) {
      const cycle = (t % 40) / 40; // 40s cycle
      if (cycle < 0.4) {
        // accelerate
        speed += 5;
      } else if (cycle < 0.7) {
        // cruise
        speed += Math.sin(t) * 0.5;
      } else {
        // decelerate
        speed -= 6;
      }
      speed = Math.max(0, Math.min(300, speed));
    } else {
      speed = Math.max(0, speed - 8);
    }

    const receivedPowerBase = 80 + Math.sin(t * 1.7) * 15 + speed * 0.5;
    const receivedPower = Math.max(0, Math.min(300, receivedPowerBase));

    const thermalBase = 25 + speed * 0.08 + Math.max(0, receivedPower - 120) * 0.03;
    const maxTemperature = Math.min(110, thermalBase);

    const controlLatencyMs = 8 + (1 - Math.cos(t * 2.3)) * 4 + (state.running ? 3 : 0);
    const powerReservePct = Math.max(
      5,
      Math.min(
        100,
        state.powerReservePct +
          (state.running ? -0.03 * speed * dt - 0.2 : 0.8 * dt) +
          Math.sin(t * 0.2) * 0.05
      )
    );

    const speedHealth: HealthStatus = evaluateHealthRange(speed, {
      nominal: [0, 220],
      degraded: [220, 260],
      criticalAbove: 260
    });

    const powerHealth: HealthStatus = evaluateHealthRange(receivedPower, {
      nominal: [0, 180],
      degraded: [180, 230],
      criticalAbove: 230
    });

    const thermalHealth: HealthStatus = evaluateHealthRange(maxTemperature, {
      nominal: [30, 55],
      degraded: [55, 70],
      criticalAbove: 70
    });

    const latencyHealth: HealthStatus = evaluateHealthRange(controlLatencyMs, {
      nominal: [0, 18],
      degraded: [18, 30],
      criticalAbove: 30
    });

    const newSegments: TrackSegment[] = state.trackSegments.map(seg => {
      const center = seg.position + seg.length / 2;
      const normalizedPos = center / (state.trackSegments.length * 0.5);
      const tempWave = maxTemperature - 15 + Math.sin(t + normalizedPos * 3) * 4;
      const loadWave = receivedPower / 3 + Math.cos(t * 0.8 + center) * 5;
      const temperature = Math.max(20, tempWave);
      const powerLoad = Math.max(0, loadWave);

      const segThermalHealth: HealthStatus = evaluateHealthRange(temperature, {
        nominal: [30, 55],
        degraded: [55, 70],
        criticalAbove: 70
      });
      const segPowerHealth: HealthStatus = evaluateHealthRange(powerLoad, {
        nominal: [0, 80],
        degraded: [80, 120],
        criticalAbove: 120
      });

      const health = worstHealth([segThermalHealth, segPowerHealth]);

      return {
        ...seg,
        temperature,
        powerLoad,
        health
      };
    });

    const activeSegIndex = Math.min(
      newSegments.length - 1,
      Math.floor((speed / 300) * newSegments.length)
    );
    const activeSegmentId = newSegments[activeSegIndex]?.id ?? null;
    const trackHealth = worstHealth(newSegments.map(s => s.health));

    const podHealth = worstHealth([speedHealth, powerHealth, thermalHealth, trackHealth]);

    const safetyState =
      state.safetyState === 'EMERGENCY_STOP'
        ? 'EMERGENCY_STOP'
        : podHealth === 'CRITICAL'
        ? 'EMERGENCY_STOP'
        : state.safetyState;

    const alarmActive = state.alarmActive || podHealth === 'CRITICAL';

    const sample = {
      timestamp: Date.now(),
      speed,
      receivedPower,
      maxTemperature
    };

    const history = [...state.history, sample];
    if (history.length > HISTORY_LIMIT) {
      history.shift();
    }

    set({
      speed,
      receivedPower,
      maxTemperature,
      controlLatencyMs,
      powerReservePct,
      speedHealth,
      powerHealth,
      thermalHealth,
      trackHealth,
      podHealth,
      safetyState,
      alarmActive,
      activeTrackSegmentId: activeSegmentId,
      history,
      trackSegments: newSegments
    });
  };

  window.setInterval(tick, 100); // ~10 Hz
};

