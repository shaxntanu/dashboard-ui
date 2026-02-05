export type HealthStatus = 'NOMINAL' | 'DEGRADED' | 'CRITICAL' | 'INVALID';

export const evaluateHealthRange = (
  value: number | null | undefined,
  ranges: {
    nominal: [number, number];
    degraded: [number, number];
    criticalAbove: number;
  }
): HealthStatus => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 'INVALID';
  }
  const v = value;
  const [nMin, nMax] = ranges.nominal;
  const [dMin, dMax] = ranges.degraded;
  if (v >= nMin && v < nMax) return 'NOMINAL';
  if (v >= dMin && v < dMax) return 'DEGRADED';
  if (v >= ranges.criticalAbove) return 'CRITICAL';
  return 'INVALID';
};

export const worstHealth = (values: HealthStatus[]): HealthStatus => {
  if (values.includes('CRITICAL')) return 'CRITICAL';
  if (values.includes('DEGRADED')) return 'DEGRADED';
  if (values.includes('NOMINAL')) return 'NOMINAL';
  return 'INVALID';
};

