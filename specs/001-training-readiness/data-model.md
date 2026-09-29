# Data Model: Training Fatigue and Readiness Prototype

This is a presentation model for local mock fixtures and browser state only. It does not define a database or an integration contract.

## Readiness Day

Represents the illustrative observations for one calendar day.

| Field | Shape | Meaning |
|-------|-------|---------|
| `date` | ISO date string | Calendar day to which readings belong. |
| `energy` | Integer 1–5 or unavailable | Morning self-rating; lower values indicate worsening. |
| `sleepQuality` | Illustrative numeric rating or unavailable | Sleep quality; lower values indicate worsening. |
| `restingHeartRate` | Beats per minute or unavailable | Daily resting heart rate; higher values indicate worsening. |
| `heartRateRecovery` | Beats per minute or unavailable | Recovery observation; lower values indicate worsening. |
| `soreness` | Integer 1–5 or unavailable | Self-rating; higher values indicate worsening. |
| `perceivedEffort` | Illustrative numeric rating or unavailable | How hard a recorded workout felt; higher values indicate worsening. |
| `pace` | Duration per distance or unavailable | Recorded pace; slower pace is only considered when the relevant workouts are marked comparable. |
| `workoutType` | Short label or unavailable | Context for a day's workout, if one exists. |
| `paceComparableToPrevious` | Boolean | Whether pace can be fairly compared with the preceding workout. |

Unavailable readings remain explicitly absent and are never interpreted as favorable or unfavorable values.

## Morning Check-In

Represents the current browser-session form values for the selected day.

| Field | Shape | Meaning |
|-------|-------|---------|
| `date` | ISO date string | Day the check-in describes. |
| `energy` | Integer 1–5 | Runner's morning energy rating. |
| `soreness` | Integer 1–5 | Runner's morning soreness rating. |

Both values are required and constrained to whole numbers from 1 through 5. The initial dashboard may display existing fixture ratings. Submitting valid ratings updates the selected day's in-memory view; invalid or missing values produce a visible validation message and do not update the fixture-derived display.

## Fatigue Trend

Derived for display from readings in a three-consecutive-day window.

| Field | Shape | Meaning |
|-------|-------|---------|
| `status` | `worsening`, `not-worsening`, or `insufficient-data` | User-facing result for the displayed comparison window. |
| `window` | Three ordered `Readiness Day` entries | First and last readings are compared; middle reading remains visible for context. |
| `contributingIndicators` | List of indicator names | Indicators with comparable first/last values worsening in their adverse direction. |
| `contextMessage` | Text | Explains the result, missing values, and non-diagnostic nature where relevant. |

The status is `worsening` only if at least two indicators have comparable first- and last-day readings that worsen: lower energy, sleep quality, or heart-rate recovery; higher soreness, resting heart rate, or perceived effort; or slower pace when comparable workouts are explicitly indicated. Missing or incomparable readings do not count. Mixed movement remains visible. Insufficient history or data yields `insufficient-data`, not a favorable result.

## Workout Adjustment Selection

Represents the runner's selected demonstration option and explanatory message.

| Field | Shape | Meaning |
|-------|-------|---------|
| `option` | One of `continue`, `shorten`, `slow`, `substitute` | Selected choice for the planned workout. |
| `label` | Display text | Continue as planned, shorten workout, slow the pace, or substitute a lower-impact activity. |
| `example` | Optional display text | Example such as cycling or mobility work for substitution. |

Selection is local UI state only. Choosing an option does not modify an actual training plan.
