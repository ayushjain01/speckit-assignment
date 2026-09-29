"use client";

import { useMemo, useState } from "react";
import FatigueInsight, { Sparkline, TrendCard } from "./FatigueInsight";
import MorningCheckIn from "./MorningCheckIn";
import {
  formatDate,
  formatDay,
  formatMetricValue,
  metricDefinitions,
} from "../data/readiness";
import { analyzeFatigueTrend } from "../lib/fatigueTrend";

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 16.5c3.1-1.2 5.4-3.9 6.7-8 2.2 4.1 4.6 6.4 9.3 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.5 19h13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function isWorseOnDay(metric, day, previousDay) {
  if (day[metric.key] == null || previousDay[metric.key] == null) {
    return false;
  }

  if (
    metric.kind === "pace" &&
    day.paceComparableToPrevious !== true
  ) {
    return false;
  }

  return metric.direction === "lower"
    ? day[metric.key] < previousDay[metric.key]
    : day[metric.key] > previousDay[metric.key];
}

function ReadinessTable({ history, trend }) {
  const selectedWindowDates = new Set(trend.window.map((day) => day.date));
  const contributors = new Set(
    trend.contributingIndicators.map((metric) => metric.key),
  );

  return (
    <section
      className="card section-card"
      id="readiness"
      aria-labelledby="readiness-title"
    >
      <div className="section-title-row">
        <div>
          <p className="card-kicker">Daily signals</p>
          <h2 className="card-heading" id="readiness-title">
            Your recovery, over time
          </h2>
          <p className="section-subtitle">
            One day is a snapshot. A week helps reveal the pattern.
          </p>
        </div>
        <div className="trend-legend">
          <span className="legend-line" aria-hidden="true" />
          7-day movement
        </div>
      </div>
      <div
        className="table-scroll"
        role="region"
        aria-label="Seven-day readiness indicators. Scroll horizontally to view all days."
        tabIndex="0"
      >
        <table className="readiness-table">
          <thead>
            <tr>
              <th scope="col">Indicator</th>
              {history.map((day) => (
                <th
                  className={
                    selectedWindowDates.has(day.date) ? "today-column" : ""
                  }
                  key={day.date}
                  scope="col"
                >
                  <span className={`day-heading${day.date === history[history.length - 1].date ? " today-label" : ""}`}>
                    <strong>{formatDay(day.date)}</strong>
                    <span>{formatDate(day.date, { month: "numeric", day: "numeric" })}</span>
                  </span>
                </th>
              ))}
              <th scope="col">7-day trend</th>
            </tr>
          </thead>
          <tbody>
            {metricDefinitions.map((metric) => (
              <tr key={metric.key}>
                <th scope="row">
                  <span className="metric-label">
                    <span className="metric-glyph" aria-hidden="true">
                      {metric.symbol}
                    </span>
                    {metric.shortLabel}
                  </span>
                </th>
                {history.map((day, index) => {
                  const value = day[metric.key];
                  const worse =
                    index > 0 &&
                    isWorseOnDay(metric, day, history[index - 1]);
                  const contributes =
                    contributors.has(metric.key) &&
                    trend.window.some((windowDay) => windowDay.date === day.date);
                  const classes = [
                    "metric-value",
                    value == null ? "missing" : "",
                    (worse || contributes) && value != null ? "worsening" : "",
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <td
                      className={selectedWindowDates.has(day.date) ? "today-column" : ""}
                      key={day.date}
                    >
                      <span
                        className={classes}
                        aria-label={`${formatDate(day.date)} ${metric.label}: ${value == null ? "not recorded" : formatMetricValue(metric, value)}`}
                        title={
                          value == null
                            ? "Not recorded"
                            : contributes
                              ? "Contributes to the three-day worsening pattern"
                              : undefined
                        }
                      >
                        {formatMetricValue(metric, value)}
                      </span>
                    </td>
                  );
                })}
                <td>
                  <Sparkline metric={metric} history={history} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="table-note">
        — means not recorded. Values are shown as observations, not as a
        diagnosis. Scroll the table sideways to compare all seven days.
      </p>
    </section>
  );
}

export default function ReadinessDashboard({ initialHistory }) {
  const [history, setHistory] = useState(initialHistory);
  const [selectedDate, setSelectedDate] = useState(
    initialHistory[initialHistory.length - 1].date,
  );
  const trend = useMemo(() => analyzeFatigueTrend(history), [history]);

  function saveCheckIn({ date, energy, soreness }) {
    setHistory((current) =>
      current.map((day) =>
        day.date === date ? { ...day, energy, soreness } : day,
      ),
    );
  }

  return (
    <>
      <header className="topbar" id="top">
        <a className="brand" href="#top" aria-label="Stride home">
          <BrandMark />
          <span>
            <span className="brand-name">stride</span>
            <span className="brand-caption">MARATHON TRAINING</span>
          </span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a className="nav-link" href="#readiness">
            Training
          </a>
          <a className="nav-link active" href="#readiness" aria-current="page">
            Readiness
          </a>
          <a className="nav-link" href="#adjustments">
            Plan
          </a>
          <div className="profile-chip" aria-label="Runner profile: Alex Morgan">
            <span className="profile-name">Alex Morgan</span>
            <span className="profile-avatar" aria-hidden="true">
              AM
            </span>
          </div>
        </nav>
      </header>
      <main className="dashboard">
        <div className="page-heading">
          <div>
            <p className="eyebrow">Week 18 · Build phase</p>
            <h1>Readiness &amp; recovery</h1>
            <p className="page-subtitle">
              Your training tells a story. Here&apos;s how you&apos;re feeling
              along the way.
            </p>
          </div>
          <div className="date-select-wrap">
            <label htmlFor="checkin-date">Morning check-in for</label>
            <select
              className="date-select"
              id="checkin-date"
              onChange={(event) => setSelectedDate(event.target.value)}
              value={selectedDate}
            >
              {[...history].reverse().map((day) => (
                <option key={day.date} value={day.date}>
                  {formatDate(day.date, {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="top-grid">
          <TrendCard trend={trend} />
          <MorningCheckIn
            key={selectedDate}
            onSubmit={saveCheckIn}
            selectedDate={selectedDate}
          />
        </div>
        <ReadinessTable history={history} trend={trend} />
        <FatigueInsight trend={trend} />
        <p className="footer-note">
          This view is here to help you reflect on your training. It is not
          medical advice, and your plan is always yours to adjust.
        </p>
      </main>
    </>
  );
}
