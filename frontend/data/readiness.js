export const metricDefinitions = [
  {
    key: "energy",
    label: "Morning energy",
    shortLabel: "Energy",
    symbol: "E",
    unit: "/ 5",
    direction: "lower",
    kind: "rating",
  },
  {
    key: "sleepQuality",
    label: "Sleep quality",
    shortLabel: "Sleep quality",
    symbol: "Z",
    unit: "/ 5",
    direction: "lower",
    kind: "rating",
  },
  {
    key: "restingHeartRate",
    label: "Resting heart rate",
    shortLabel: "Resting heart rate",
    symbol: "♥",
    unit: " bpm",
    direction: "higher",
    kind: "number",
  },
  {
    key: "heartRateRecovery",
    label: "Heart-rate recovery",
    shortLabel: "HR recovery",
    symbol: "↗",
    unit: " bpm",
    direction: "lower",
    kind: "number",
  },
  {
    key: "soreness",
    label: "Morning soreness",
    shortLabel: "Soreness",
    symbol: "S",
    unit: "/ 5",
    direction: "higher",
    kind: "rating",
  },
  {
    key: "perceivedEffort",
    label: "Perceived effort",
    shortLabel: "Perceived effort",
    symbol: "R",
    unit: "/ 10",
    direction: "higher",
    kind: "rating10",
  },
  {
    key: "paceSecondsPerMile",
    label: "Run pace",
    shortLabel: "Run pace",
    symbol: "P",
    unit: "",
    direction: "higher",
    kind: "pace",
  },
];

export const adjustmentOptions = [
  {
    id: "continue",
    label: "Continue as planned",
    detail: "Keep today's workout",
    symbol: "→",
  },
  {
    id: "shorten",
    label: "Shorten the workout",
    detail: "Reduce time or distance",
    symbol: "−",
  },
  {
    id: "slow",
    label: "Slow the pace",
    detail: "Keep it comfortable",
    symbol: "⌁",
  },
  {
    id: "substitute",
    label: "Choose lower impact",
    detail: "Cycling or mobility",
    symbol: "↗",
  },
];

export const initialReadinessHistory = [
  {
    date: "2026-09-22",
    energy: 4,
    sleepQuality: 4,
    restingHeartRate: 52,
    heartRateRecovery: 39,
    soreness: 1,
    perceivedEffort: 4,
    paceSecondsPerMile: 552,
    workoutType: "Easy run",
    paceComparableToPrevious: false,
  },
  {
    date: "2026-09-23",
    energy: 4,
    sleepQuality: 4,
    restingHeartRate: 52,
    heartRateRecovery: 38,
    soreness: 1,
    perceivedEffort: null,
    paceSecondsPerMile: null,
    workoutType: "Recovery",
    paceComparableToPrevious: false,
  },
  {
    date: "2026-09-24",
    energy: 4,
    sleepQuality: 4,
    restingHeartRate: 53,
    heartRateRecovery: 37,
    soreness: 2,
    perceivedEffort: 5,
    paceSecondsPerMile: 558,
    workoutType: "Easy run",
    paceComparableToPrevious: false,
  },
  {
    date: "2026-09-25",
    energy: 4,
    sleepQuality: 3,
    restingHeartRate: 52,
    heartRateRecovery: 36,
    soreness: 1,
    perceivedEffort: null,
    paceSecondsPerMile: null,
    workoutType: "Rest",
    paceComparableToPrevious: false,
  },
  {
    date: "2026-09-26",
    energy: 3,
    sleepQuality: 3,
    restingHeartRate: 54,
    heartRateRecovery: 34,
    soreness: 2,
    perceivedEffort: 5,
    paceSecondsPerMile: 570,
    workoutType: "Easy run",
    paceComparableToPrevious: false,
  },
  {
    date: "2026-09-27",
    energy: 2,
    sleepQuality: 2,
    restingHeartRate: 56,
    heartRateRecovery: 31,
    soreness: 3,
    perceivedEffort: null,
    paceSecondsPerMile: null,
    workoutType: "Rest",
    paceComparableToPrevious: false,
  },
  {
    date: "2026-09-28",
    energy: 2,
    sleepQuality: 2,
    restingHeartRate: 58,
    heartRateRecovery: 29,
    soreness: 4,
    perceivedEffort: 7,
    paceSecondsPerMile: 594,
    workoutType: "Easy run",
    paceComparableToPrevious: false,
  },
];

export function formatDay(dateString) {
  const date = new Date(`${dateString}T12:00:00`);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: "UTC",
  }).format(date);
}

export function formatDate(dateString, options = { month: "short", day: "numeric" }) {
  const date = new Date(`${dateString}T12:00:00`);
  return new Intl.DateTimeFormat("en-US", { ...options, timeZone: "UTC" }).format(
    date,
  );
}

export function formatPace(secondsPerMile) {
  if (secondsPerMile == null) {
    return null;
  }

  const minutes = Math.floor(secondsPerMile / 60);
  const seconds = String(secondsPerMile % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function formatMetricValue(metric, value) {
  if (value == null) {
    return "—";
  }

  if (metric.kind === "pace") {
    return formatPace(value);
  }

  if (metric.kind === "rating" || metric.kind === "rating10") {
    return `${value}${metric.unit}`;
  }

  return `${value}${metric.unit}`;
}
