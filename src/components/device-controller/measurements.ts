export interface Measurements {
  torsoHeight: number;
  bust: number;
  waist: number;
  hips: number;
  thighs: number;
  shoulders: number;
  neck: number;
}

// Define measurement ranges in cm with descriptive help text
export const MEASUREMENT_RANGES = {
  torsoHeight: {
    min: 40,
    max: 60,
    default: 50,
    description: "Distance from shoulder to waist",
  },
  bust: {
    min: 80,
    max: 120,
    default: 90,
    description: "Circumference at fullest part of chest",
  },
  waist: {
    min: 60,
    max: 100,
    default: 75,
    description: "Circumference at natural waistline",
  },
  hips: {
    min: 80,
    max: 120,
    default: 95,
    description: "Circumference at fullest part of hips",
  },
  thighs: {
    min: 45,
    max: 75,
    default: 55,
    description: "Circumference at upper thigh",
  },
  shoulders: {
    min: 36,
    max: 56,
    default: 42,
    description: "Shoulder width from edge to edge",
  },
  neck: {
    min: 30,
    max: 50,
    default: 38,
    description: "Circumference at base of neck",
  },
};

export const DEFAULT_MEASUREMENTS: Measurements = {
  torsoHeight: MEASUREMENT_RANGES.torsoHeight.default,
  bust: MEASUREMENT_RANGES.bust.default,
  waist: MEASUREMENT_RANGES.waist.default,
  hips: MEASUREMENT_RANGES.hips.default,
  thighs: MEASUREMENT_RANGES.thighs.default,
  shoulders: MEASUREMENT_RANGES.shoulders.default,
  neck: MEASUREMENT_RANGES.neck.default,
};

// Helper function to normalize measurements to 0-1 range
export function normalizeMeasurement(
  value: number,
  key: keyof Measurements
): number {
  const { min, max } = MEASUREMENT_RANGES[key];
  return (value - min) / (max - min);
}

interface Parameters {
  torsoHeight: number;
  bust: number;
  waist: number;
  hips: number;
  thighs: number;
  shoulders: number;
  neck: number;
}

interface MannequinDimensions {
  torsoHeight: number;
  shoulderWidth: number;
  bustWidth: number;
  waistWidth: number;
  hipWidth: number;
  neckRadius: number;
  thighWidth: number;
}

// Helper function to calculate visualization dimensions
export function calculateMannequinDimensions(measurements: Measurements) {
  const normalizedTorsoHeight = normalizeMeasurement(
    measurements.torsoHeight,
    "torsoHeight"
  );
  const normalizedBust = normalizeMeasurement(measurements.bust, "bust");
  const normalizedWaist = normalizeMeasurement(measurements.waist, "waist");
  const normalizedHips = normalizeMeasurement(measurements.hips, "hips");
  const normalizedThighs = normalizeMeasurement(measurements.thighs, "thighs");
  const normalizedShoulders = normalizeMeasurement(
    measurements.shoulders,
    "shoulders"
  );
  const normalizedNeck = normalizeMeasurement(measurements.neck, "neck");

  return {
    torsoHeightScale: 1 + (normalizedTorsoHeight - 0.5) * 0.3,
    bustWidth: 70 + (normalizedBust - 0.5) * 50,
    waistWidth: 60 + (normalizedWaist - 0.5) * 50,
    hipsWidth: 75 + (normalizedHips - 0.5) * 50,
    thighsWidth: 70 + (normalizedThighs - 0.5) * 50,
    shouldersWidth: 85 + (normalizedShoulders - 0.5) * 50,
    neckWidth: 20 + (normalizedNeck - 0.5) * 20,
  };
}

/**
 * Calculate mannequin visualization dimensions from raw parameters
 * This is used for the Models page where we don't have normalized measurements
 */
export function calculateModelMannequinDimensions(
  parameters: Parameters
): MannequinDimensions {
  // We need to do some approximation since we're working with raw values
  // First normalize based on reasonable ranges
  const normalize = (value: number, min: number, max: number) => {
    return Math.max(0, Math.min(1, (value - min) / (max - min)));
  };

  const normalizedTorsoHeight = normalize(parameters.torsoHeight, 40, 70);
  const normalizedBust = normalize(parameters.bust, 80, 120);
  const normalizedWaist = normalize(parameters.waist, 60, 100);
  const normalizedHips = normalize(parameters.hips, 85, 125);
  const normalizedThighs = normalize(parameters.thighs, 45, 85);
  const normalizedShoulders = normalize(parameters.shoulders, 35, 55);
  const normalizedNeck = normalize(parameters.neck, 30, 45);

  return {
    torsoHeight: parameters.torsoHeight,
    shoulderWidth: parameters.shoulders,
    bustWidth: 70 + (normalizedBust - 0.5) * 50,
    waistWidth: 60 + (normalizedWaist - 0.5) * 50,
    hipWidth: 75 + (normalizedHips - 0.5) * 50,
    neckRadius: (20 + (normalizedNeck - 0.5) * 20) / 2,
    thighWidth: (70 + (normalizedThighs - 0.5) * 50) / 2,
  };
}
