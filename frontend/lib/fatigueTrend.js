import { metricDefinitions } from "../data/readiness";

function areConsecutiveDays(days) {
  if (days.length !== 3) {
    return false;
  }

  return days.slice(1).every((day, index) => {
    const previousDate = new Date(`${days[index].date}T00:00:00Z`);
    const currentDate = new Date(`${day.date}T00:00:00Z`);
    const difference = (currentDate - previousDate) / 86_400_000;
    return difference === 1;
  });
}

function isComparable(metric, first, last) {
  if (
    first[metric.key] == null ||
    last[metric.key] == null
  ) {
    return false;
  }

  if (metric.kind !== "pace") {
    return true;
  }

  return (
    first.workoutType != null &&
    first.workoutType === last.workoutType &&
    last.paceComparableToPrevious === true
  );
}

export function analyzeFatigueTrend(history) {
  const orderedHistory = [...history].sort((a, b) => a.date.localeCompare(b.date));
  const window = orderedHistory.slice(-3);

  if (!areConsecutiveDays(window)) {
    return {
      status: "insufficient-data",
      window,
      contributingIndicators: [],
      comparedIndicators: [],
    };
  }

  const [first, , last] = window;
  const comparedIndicators = [];
  const contributingIndicators = [];

  for (const metric of metricDefinitions) {
    if (!isComparable(metric, first, last)) {
      continue;
    }

    comparedIndicators.push(metric);
    const worsened =
      metric.direction === "lower"
        ? last[metric.key] < first[metric.key]
        : last[metric.key] > first[metric.key];

    if (worsened) {
      contributingIndicators.push(metric);
    }
  }

  if (comparedIndicators.length < 2) {
    return {
      status: "insufficient-data",
      window,
      contributingIndicators,
      comparedIndicators,
    };
  }

  return {
    status: contributingIndicators.length >= 2 ? "worsening" : "not-worsening",
    window,
    contributingIndicators,
    comparedIndicators,
  };
}
