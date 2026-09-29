# User Interface Contract: Training Fatigue and Readiness

This contract describes the observable single-screen interface for the prototype. It is not an external API contract.

## Dashboard

The dashboard presents:

- A multi-day, date-labeled view of energy, sleep quality, resting heart rate, heart-rate recovery, soreness, perceived effort, and pace, with appropriate units or rating labels.
- Clear missing-data treatment; unavailable values are not rendered as zero or as favorable readings.
- A visible three-day trend explanation including the first, middle, and final day and any contributing indicators.
- The initial mock-data example's sustained-worsening state, framed as an informational signal and not as a diagnosis.
- A morning check-in with separate energy and soreness inputs, each restricted to whole-number values 1–5.
- Workout choices: continue as planned, shorten the workout, slow the pace, or substitute a lower-impact activity such as cycling or mobility work.

## Interactions

1. The runner can choose a day and enter both morning ratings. A valid submission updates the displayed session state and confirms which day was updated.
2. Invalid, missing, or out-of-range ratings produce a visible error; invalid values do not change the displayed reading.
3. When check-in values change, the trend presentation reflects the available data and retains missing-data and three-day comparison rules.
4. Selecting an adjustment visibly marks the selected choice and gives brief confirmation. It does not change a plan, start an activity, or persist beyond the browser session.
5. Reloading restores the static fixture and default selection.

## Trend Interpretation

- Compare the earliest and latest comparable readings in a three-consecutive-day period; always show the middle day's reading for context.
- Identify sustained worsening only if at least two indicators worsen in their defined adverse direction.
- Count slower pace only for workouts explicitly marked comparable.
- Show contributors individually; do not hide mixed or favorable evidence.
- A single poor reading is not sufficient to present a sustained worsening state.
- If the history or comparable values are insufficient, say that the trend cannot yet be determined.
- Readiness wording remains informational and does not diagnose a medical condition or prescribe a training change.

## Accessibility and Responsive Behavior

- Use a logical heading hierarchy, visible labels, semantic form controls, and clear validation feedback.
- All inputs and adjustment choices are keyboard operable with visible focus.
- Do not communicate worsening or selection by color alone; pair color with text, labels, or icons with accessible names.
- At narrow widths, the dashboard remains readable without requiring page-level horizontal scrolling; dense trend content may scroll within its own clearly identified region if needed.
