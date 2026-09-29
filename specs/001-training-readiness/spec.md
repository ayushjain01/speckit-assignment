# Feature Specification: Training Fatigue and Readiness

**Feature Branch**: `001-training-readiness`

**Created**: 2026-09-29

**Status**: Draft

**Input**: User description: "Create a training fatigue and readiness feature for a marathon training application, grounded in stakeholder stories about fatigue, recovery, energy, soreness, sleep, heart rate, and adjusting training."

## Clarifications

### Session 2026-09-29

- Q: Should a sustained worsening signal require indicators to worsen every day, or is a net worsening from the first to the last day of a three-day period enough? → A: Net worsening from the first to the last day in a three-day period; show the middle day's reading for context.
- Q: How should changes in different indicators count as worsening when determining a three-day fatigue pattern? → A: Count lower energy, sleep quality, or heart-rate recovery and higher soreness, resting heart rate, or perceived effort as worsening; count slower pace only for comparable workouts.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Review readiness and recent trends (Priority: P1)

As a runner preparing for a marathon, I want to see fatigue and recovery indicators together and across multiple days so that I can judge whether I am recovering or accumulating fatigue rather than reacting to one poor result.

**Why this priority**: A clear, contextual view of readiness is the foundation for interpreting training and deciding whether to change a planned workout.

**Independent Test**: Provide a runner with recorded energy, sleep quality, resting heart rate, heart-rate recovery, soreness, perceived effort, and pace across multiple days. Verify that they can review the indicators together, compare their direction over time, and distinguish a single poor result from a sustained pattern.

**Acceptance Scenarios**:

1. **Given** a runner has indicator records for multiple days, **When** they open the fatigue and readiness view, **Then** they can review sleep quality, resting heart rate, heart-rate recovery, soreness, perceived effort, and pace with their dates and see how the indicators have changed.
2. **Given** one indicator is worse on the most recent day but the other days do not show a worsening pattern, **When** the runner reviews the trend, **Then** the view presents that observation in its multi-day context and does not treat the single result alone as sustained worsening.
3. **Given** one or more indicators have no recorded value for a day, **When** the runner reviews the view, **Then** the missing values are clearly distinguishable from favorable readings and are not represented as measured results.

---

### User Story 2 - Record a morning check-in (Priority: P1)

As a runner, I want to quickly rate my energy and soreness each morning so that how I feel is included alongside measured training and recovery indicators.

**Why this priority**: Subjective condition can add context that pace and heart-rate information alone may miss, and morning ratings can be recorded independently of a workout.

**Independent Test**: Open the morning check-in, record energy and soreness at the endpoints and at an intermediate value on the 1-to-5 scales, and verify the saved ratings appear for that day.

**Acceptance Scenarios**:

1. **Given** the runner has not recorded a morning check-in for the day, **When** they enter energy and soreness ratings from 1 to 5, **Then** both ratings are recorded for that day and included in the readiness view.
2. **Given** the runner is completing a morning check-in, **When** they try to submit a value outside the 1-to-5 scale or omit a required rating, **Then** the entry is not accepted and the valid scale or missing rating is identified.
3. **Given** a runner has already entered ratings for the day, **When** they review the check-in, **Then** they can see the recorded energy and soreness values associated with that day.

---

### User Story 3 - Recognize accumulating fatigue and adapt training (Priority: P1)

As a runner, I want to recognize when several fatigue indicators are worsening over several days and see practical training options so that I can make an informed choice about my planned workout.

**Why this priority**: The central purpose of the feature is to help runners respond to a sustained pattern without overreacting to an isolated reading.

**Independent Test**: Provide comparable readings for multiple indicators across three consecutive days, with at least two indicators worse on the last day than the first, then compare with a history containing only one poor day. Verify that only the sustained multi-indicator pattern is identified and that the runner is offered appropriate workout choices.

**Acceptance Scenarios**:

1. **Given** at least two fatigue indicators have comparable recorded values for the first and last days of a three-day period and are worse on the last day, **When** the runner reviews readiness, **Then** the view identifies a sustained worsening pattern, names the indicators contributing to it, shows the middle day's readings for context, and explains that it is a signal to consider adjusting training rather than a diagnosis.
2. **Given** the runner sees a sustained worsening pattern before a planned workout, **When** they review their options, **Then** they can consider continuing as planned, shortening the workout, slowing the pace, or substituting a lower-impact activity such as cycling or mobility work.
3. **Given** indicators are mixed, stable, or improving, **When** the runner reviews readiness, **Then** the view does not describe them as a sustained worsening pattern and presents the available context without prescribing a workout change.

### Edge Cases

- A runner has no recorded history or too few days of records to determine a multi-day trend; show the available readings and indicate that there is not yet enough history to identify a sustained pattern.
- One or more measurements, workout observations, or morning ratings are missing; do not interpret missing values as improvement or worsening.
- An indicator changes in a favorable direction while other indicators worsen; identify which indicators contribute to the pattern and avoid hiding mixed evidence in a single overall conclusion.
- A runner has a single unusually poor sleep result or other isolated reading; show it in context without treating it alone as sustained fatigue.
- A runner reports soreness or low energy but has no corresponding heart-rate or sleep data; include their self-reported condition and make clear which other indicators are unavailable.
- A user enters a rating below 1, above 5, or no rating; explain the allowed scale and do not record an invalid check-in.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The feature MUST present a runner's fatigue and recovery indicators together: energy, sleep quality, resting heart rate, heart-rate recovery, soreness, perceived effort, and pace.
- **FR-002**: The feature MUST show available indicator values with their associated days so that runners can compare changes across multiple days.
- **FR-003**: The feature MUST distinguish unavailable or unrecorded indicator values from measured values.
- **FR-004**: The feature MUST allow runners to record morning energy and soreness ratings as separate whole-number values from 1 through 5, inclusive.
- **FR-005**: The feature MUST associate each morning check-in with the day it describes and include recorded ratings in the fatigue and readiness view.
- **FR-006**: The feature MUST prevent invalid morning ratings from being recorded and identify the invalid or missing value to the runner.
- **FR-007**: The feature MUST identify a sustained worsening pattern only when at least two fatigue indicators have comparable recorded values for the first and last days of a three-day period and are worse on the last day; it MUST show the middle day's readings for context. Lower energy, sleep quality, or heart-rate recovery and higher soreness, resting heart rate, or perceived effort count as worsening. Slower pace counts only for comparable workouts.
- **FR-008**: When identifying a sustained worsening pattern, the feature MUST identify the indicators contributing to it and communicate that the pattern is informational, not a medical diagnosis.
- **FR-009**: The feature MUST provide runners considering a workout adjustment with the choices to continue as planned, shorten the workout, slow the pace, or substitute a lower-impact activity.
- **FR-010**: The feature MUST present isolated, mixed, stable, or improving indicator changes without labeling them a sustained worsening pattern.
- **FR-011**: The feature MUST communicate when there is insufficient history or missing information to determine a multi-day pattern, without treating missing values as favorable or worsening measurements.

### Key Entities *(include if feature involves data)*

- **Readiness indicator**: A dated fatigue or recovery observation, including energy, sleep quality, resting heart rate, heart-rate recovery, soreness, perceived effort, or pace; an indicator may be unavailable for a given day.
- **Morning check-in**: A runner's dated self-report containing an energy rating and a soreness rating, each on a 1-to-5 scale.
- **Fatigue trend**: A multi-day view of changes in available readiness indicators, including whether multiple indicators show sustained worsening.
- **Workout adjustment option**: A choice presented to a runner for responding to readiness context: continue as planned, shorten, slow down, or substitute a lower-impact activity.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In a usability test, at least 90% of runners can identify the direction of change for the displayed indicators across the days shown without relying on a single day's result.
- **SC-002**: At least 90% of runners can complete and review a morning energy and soreness check-in, with both ratings correctly recorded on the 1-to-5 scale, in under 30 seconds.
- **SC-003**: In test cases where at least two indicators have comparable first- and last-day readings for a three-day period and worsen according to FR-007, at least 90% of runners recognize that the feature is signaling sustained worsening and can name the contributing indicators.
- **SC-004**: In test cases containing only one poor day, mixed changes, or insufficient records, at least 90% of runners correctly understand that the feature has not established a sustained worsening pattern.
- **SC-005**: After reviewing a sustained worsening pattern, at least 90% of runners can identify all four available choices: continue, shorten, slow down, or substitute a lower-impact activity.

## Assumptions

- A runner's available sleep, heart-rate, pace, and perceived-effort observations may come from existing training records; this feature describes how to present available observations and does not require every indicator to be recorded every day.
- A three-day worsening trend compares the earliest and latest comparable reading in that period; the middle day's reading is shown for context but does not have to worsen monotonically. At least two indicators must be worse on the last day than the first. The view must disclose missing values and cannot infer a trend when records are insufficient.
- Indicator worsening is interpreted in the direction that suggests poorer readiness: lower energy, sleep quality, or heart-rate recovery and higher soreness, resting heart rate, or perceived effort. Slower pace contributes only when the workouts are comparable.
- Energy and soreness are morning self-ratings on a 1-to-5 whole-number scale, with the runner's own ratings treated as meaningful inputs rather than diagnoses.
- The feature supports training decisions by showing context and options; it does not diagnose injury, overtraining, or another medical condition, and does not automatically change a runner's training plan.
- Lower-impact substitutions include examples such as cycling or mobility work; the runner remains responsible for choosing an option appropriate to their circumstances.
