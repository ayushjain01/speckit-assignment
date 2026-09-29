"use client";

import { useState } from "react";
import { adjustmentOptions, formatDate } from "../data/readiness";

function Sparkline({ metric, history }) {
  const values = history.map((day) => day[metric.key]);
  const available = values.filter((value) => value != null);
  const min = Math.min(...available);
  const max = Math.max(...available);
  const range = max - min || 1;
  const width = 240;
  const height = 34;
  const inset = 4;
  const points = values.map((value, index) => {
    if (value == null) {
      return null;
    }

    return {
      x: inset + (index * (width - inset * 2)) / Math.max(values.length - 1, 1),
      y: height - inset - ((value - min) / range) * (height - inset * 2),
    };
  });
  const paths = [];
  let segment = [];

  for (const point of points) {
    if (point == null) {
      if (segment.length > 0) {
        paths.push(segment);
        segment = [];
      }
    } else {
      segment.push(point);
    }
  }

  if (segment.length > 0) {
    paths.push(segment);
  }

  const pointsDescription = history
    .map((day) => {
      const value = day[metric.key];
      return `${formatDate(day.date)} ${value == null ? "not recorded" : metric.key === "paceSecondsPerMile" ? `${Math.floor(value / 60)} minutes ${value % 60} seconds per mile` : `${value}${metric.unit}`}`;
    })
    .join(", ");

  return (
    <svg
      className="sparkline"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={`${metric.label} over the last ${history.length} days: ${pointsDescription}`}
    >
      <path
        className="sparkline-grid"
        d={`M${inset} ${height - inset}H${width - inset}`}
      />
      {paths.map((path, index) => (
        <polyline
          className="sparkline-line"
          key={`${metric.key}-segment-${index}`}
          points={path.map((point) => `${point.x},${point.y}`).join(" ")}
        />
      ))}
      {points.map((point, index) =>
        point ? (
          <circle
            className="sparkline-point"
            key={`${metric.key}-point-${index}`}
            cx={point.x}
            cy={point.y}
            r="3"
          />
        ) : null,
      )}
    </svg>
  );
}

function TrendCard({ trend }) {
  const { status, window, contributingIndicators, comparedIndicators } = trend;
  const first = window[0];
  const middle = window[1];
  const last = window[2];
  const worsening = status === "worsening";

  if (status === "insufficient-data") {
    return (
      <section
        className="card trend-card trend-neutral"
        aria-labelledby="trend-title"
      >
        <p className="trend-kicker">Your recent recovery pattern</p>
        <span className="trend-status">
          <span className="status-dot" aria-hidden="true" />
          Not enough history
        </span>
        <h2 id="trend-title">More days will give you a clearer picture.</h2>
        <p className="trend-description">
          There aren&apos;t enough consecutive days or comparable readings to
          identify a multi-day pattern. Missing values aren&apos;t treated as
          positive or negative.
        </p>
        <p className="trend-disclaimer">
          A helpful signal, not a medical assessment.
        </p>
      </section>
    );
  }

  const windowLabel = `${formatDate(first.date)} – ${formatDate(last.date)}`;
  const description = worsening
    ? `${contributingIndicators.length} indicators are moving in a less favorable direction across this three-day window. Consider how you feel before deciding whether to adjust today's session.`
    : "Your recent readings are mixed, stable, or improving. One change on its own is not treated as a sustained fatigue pattern.";

  return (
    <section
      className={`card trend-card${worsening ? "" : " trend-neutral"}`}
      aria-labelledby="trend-title"
    >
      <div className="trend-card-top">
        <p className="trend-kicker">Your recent recovery pattern</p>
        <span className="trend-status">
          <span className="status-dot" aria-hidden="true" />
          {worsening ? "Pattern to notice" : "No sustained pattern"}
        </span>
      </div>
      <h2 id="trend-title">
        {worsening
          ? "Several fatigue signs are worsening."
            : "Your recent signals are mixed or steady."}
      </h2>
      <p className="trend-description">{description}</p>
      {worsening ? (
        <ul className="contributor-list" aria-label="Indicators contributing to the pattern">
          {contributingIndicators.map((metric) => (
            <li className="contributor-pill" key={metric.key}>
              {metric.shortLabel}
            </li>
          ))}
        </ul>
      ) : (
        <ul className="contributor-list" aria-label="Indicators compared">
          {comparedIndicators.slice(0, 4).map((metric) => (
            <li className="contributor-pill" key={metric.key}>
              {metric.shortLabel}
            </li>
          ))}
        </ul>
      )}
      <div className="trend-footer">
        <span className="trend-window">
          3-day view · {windowLabel} · Middle day shown for context
        </span>
        <p className="trend-disclaimer">
          A helpful signal, not a medical assessment.
        </p>
      </div>
      <span className="screen-reader-only">
        First day {formatDate(first.date)}, middle day {formatDate(middle.date)},
        last day {formatDate(last.date)}.
      </span>
    </section>
  );
}

export default function FatigueInsight({
  trend,
}) {
  const [selectedOption, setSelectedOption] = useState("");
  const selected = adjustmentOptions.find(
    (option) => option.id === selectedOption,
  );

  return (
    <div className="bottom-grid" id="adjustments">
      <section className="card context-card" aria-labelledby="context-title">
        <div className="section-title-row">
          <div>
            <p className="card-kicker">Read the full picture</p>
            <h2 className="card-heading" id="context-title">
              A few days tell a better story
            </h2>
          </div>
          <span className="round-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 18.5V5.5M4 18.5h16M7.5 15l4-4 3 2 5-6"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.5 7H19v2.5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <div className="context-content">
          {trend.window.length === 3 ? (
            trend.window.map((day, index) => (
              <div className="context-day" key={day.date}>
                <span>
                  {index === 0
                    ? "Window begins"
                    : index === 1
                      ? "Middle day"
                      : "Most recent"}
                  {" · "}
                  {formatDate(day.date)}
                </span>
                <strong>
                  {day.energy == null ? "—" : day.energy}
                  <small>{day.energy == null ? "energy n/r" : "energy / 5"}</small>
                </strong>
                <p className="context-copy">
                  {day.soreness == null
                    ? "Soreness not recorded"
                    : `Soreness ${day.soreness} out of 5`}
                  {day.restingHeartRate == null
                    ? " · Resting heart rate not recorded"
                    : ` · Resting HR ${day.restingHeartRate} bpm`}
                </p>
              </div>
            ))
          ) : (
            <p className="context-copy">
              Your three-day comparison will appear here once enough consecutive
              readings are available.
            </p>
          )}
        </div>
        <p className="context-copy">
          Compare the first and latest day; the middle day stays visible so a
          normal daily fluctuation doesn&apos;t tell the whole story.
        </p>
      </section>
      <section className="card adjustment-card" aria-labelledby="adjustment-title">
        <div className="adjustment-top">
          <div>
            <p className="card-kicker">Your plan, your call</p>
            <h2 className="card-heading" id="adjustment-title">
              Consider today&apos;s session
            </h2>
          </div>
          <span className="round-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h13M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <div className="choice-list" role="group" aria-label="Workout adjustment options">
          {adjustmentOptions.map((option) => (
            <button
              aria-pressed={selectedOption === option.id}
              className="choice-button"
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              type="button"
            >
              <span className="choice-icon" aria-hidden="true">
                {option.symbol}
              </span>
              <span>
                <span className="choice-title">{option.label}</span>
                <span className="choice-detail">{option.detail}</span>
              </span>
            </button>
          ))}
        </div>
        <p className="choice-message" role="status" aria-live="polite">
          {selected
            ? `${selected.label} selected for consideration. Your plan hasn't been changed.`
            : "Choose an option to consider — nothing changes in your plan."}
        </p>
      </section>
    </div>
  );
}

export { TrendCard, Sparkline };
