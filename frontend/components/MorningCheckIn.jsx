"use client";

import { useState } from "react";
import { formatDate } from "../data/readiness";

const ratingLabels = {
  energy: [
    "Drained",
    "Low",
    "Okay",
    "Good",
    "Energized",
  ],
  soreness: [
    "Fresh",
    "A little",
    "Noticeable",
    "High",
    "Very high",
  ],
};

function RatingField({ field, label, value, onChange, error, date }) {
  return (
    <fieldset className="rating-field" aria-describedby={`${field}-help ${field}-error`}>
      <legend className="rating-legend">{label}</legend>
      <div className="rating-options">
        {[1, 2, 3, 4, 5].map((rating) => {
          const id = `${field}-${date}-${rating}`;
          return (
            <div className="rating-option" key={rating}>
              <input
                id={id}
                type="radio"
                name={`${field}-${date}`}
                value={rating}
                checked={value === String(rating)}
                aria-describedby={`${field}-help ${field}-error`}
                onChange={(event) => onChange(event.target.value)}
              />
              <label htmlFor={id} title={ratingLabels[field][rating - 1]}>
                <span className="screen-reader-only">
                  {ratingLabels[field][rating - 1]}:{" "}
                </span>
                {rating}
              </label>
            </div>
          );
        })}
      </div>
      <div className="rating-caption" id={`${field}-help`}>
        <span>{ratingLabels[field][0]}</span>
        <span>{ratingLabels[field][4]}</span>
      </div>
      {error ? (
        <p className="form-error" id={`${field}-error`}>
          {error}
        </p>
      ) : (
        <span className="screen-reader-only" id={`${field}-error`} />
      )}
    </fieldset>
  );
}

export default function MorningCheckIn({
  selectedDate,
  onSubmit,
}) {
  const [energy, setEnergy] = useState("");
  const [soreness, setSoreness] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {};

    if (!energy) {
      nextErrors.energy = "Choose an energy rating from 1 to 5.";
    }

    if (!soreness) {
      nextErrors.soreness = "Choose a soreness rating from 1 to 5.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setMessage("");
      return;
    }

    onSubmit({
      date: selectedDate,
      energy: Number(energy),
      soreness: Number(soreness),
    });
    setErrors({});
    setMessage(`Check-in saved for ${formatDate(selectedDate)}.`);
  }

  function updateRating(field, value) {
    if (field === "energy") {
      setEnergy(value);
    } else {
      setSoreness(value);
    }

    setErrors((current) => ({ ...current, [field]: "" }));
    setMessage("");
  }

  return (
    <section className="card checkin-card" aria-labelledby="checkin-title">
      <div className="form-header">
        <div>
          <p className="card-kicker">A quick morning check-in</p>
          <h2 className="card-heading" id="checkin-title">
            How are you feeling?
          </h2>
        </div>
        <span className="round-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 20.2s-7.2-4.1-7.2-10a4.1 4.1 0 0 1 7.2-2.7 4.1 4.1 0 0 1 7.2 2.7c0 5.9-7.2 10-7.2 10Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <path
              d="M8.1 12.3h2.3l1.1-2.1 1.6 4 1.1-1.9h1.7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      <p className="checkin-intro">
        A few taps help round out the numbers with how you feel.
      </p>
      <form onSubmit={handleSubmit} noValidate>
        <RatingField
          field="energy"
          label="Energy"
          value={energy}
          error={errors.energy}
          date={selectedDate}
          onChange={(value) => updateRating("energy", value)}
        />
        <RatingField
          field="soreness"
          label="Soreness"
          value={soreness}
          error={errors.soreness}
          date={selectedDate}
          onChange={(value) => updateRating("soreness", value)}
        />
        <button className="submit-checkin" type="submit">
          Save morning check-in
        </button>
        <p className="form-message" role="status" aria-live="polite">
          {message}
        </p>
      </form>
    </section>
  );
}
