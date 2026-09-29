# Tasks: Training Fatigue and Readiness Prototype

**Input**: Design documents from `/specs/001-training-readiness/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/user-interface.md, quickstart.md

**Tests**: No automated test tasks are included because the feature specification does not explicitly request a test-driven approach. The plan and quickstart require lint/build and browser validation.

**Organization**: Tasks are grouped by user story so that each user-facing journey can be implemented and demonstrated in priority order.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Task can be implemented in parallel without editing the same files as another ready task.
- **[Story]**: User story label; setup and foundational tasks do not carry one.
- Every task description names its target file path.

## Phase 1: Setup

**Purpose**: Initialize the standalone JavaScript Next.js frontend described in the plan.

- [X] T001 Scaffold the JavaScript Next.js App Router project and install its dependencies under `frontend/`, producing `frontend/package.json`, `frontend/app/`, and `frontend/public/`.
- [X] T002 Remove scaffolded starter content and set the application title and shared page metadata in `frontend/app/layout.js`.

## Phase 2: Foundational

**Purpose**: Establish the shared responsive, accessible page foundation required by all stories.

- [X] T003 Define global typography, color tokens, page layout, responsive breakpoints, and visible keyboard-focus styles in `frontend/app/globals.css`.
- [X] T004 Add the semantic application shell and load global styles from `frontend/app/layout.js`.

**Checkpoint**: Project shell and shared responsive styles are ready before story-specific dashboard work.

## Phase 3: User Story 1 - Review readiness and recent trends (Priority: P1) - MVP

**Goal**: Let runners inspect fatigue and recovery readings together across multiple dated records, including missing data, without relying on a single-day result.

**Independent Test**: Open the dashboard with the supplied mock history and verify the dates and available energy, sleep quality, resting heart rate, heart-rate recovery, soreness, perceived effort, and pace readings can be compared across days. Confirm missing readings are explicitly identified, not shown as zero, and trends remain visible in context.

### Implementation for User Story 1

- [X] T005 [US1] Create several consecutive illustrative readiness-day records with dated metric values, explicit missing readings, workout context, and pace-comparability flags in `frontend/data/readiness.js`.
- [X] T006 [US1] Build the dashboard's dated multi-day readiness view for energy, sleep quality, resting heart rate, heart-rate recovery, soreness, perceived effort, and pace in `frontend/components/ReadinessDashboard.jsx`.
- [X] T007 [US1] Render metric units or rating labels, date context, and explicit unavailable-value presentation without substituting favorable-looking numbers in `frontend/components/ReadinessDashboard.jsx`.
- [X] T008 [US1] Add a chart-like, responsive comparison of the mock readings with accessible labels and a narrow-screen layout in `frontend/components/ReadinessDashboard.jsx`.
- [X] T009 [US1] Render the dashboard component from the home page in `frontend/app/page.js`.

**Checkpoint**: User Story 1 independently demonstrates a multi-day readiness dashboard with correctly distinguished missing data.

## Phase 4: User Story 2 - Record a morning check-in (Priority: P1)

**Goal**: Let the runner record and review dated morning energy and soreness ratings, each a whole number from 1 through 5.

**Independent Test**: Choose a day, submit valid energy and soreness ratings at the low and high ends of the 1–5 scales, and verify those values are shown for the selected day. Attempt to omit or enter an invalid rating and confirm a visible error appears without changing the recorded display.

### Implementation for User Story 2

- [X] T010 [P] [US2] Create the labeled morning check-in form with separate whole-number energy and soreness fields constrained to 1–5 in `frontend/components/MorningCheckIn.jsx`.
- [X] T011 [US2] Add required-value and 1–5 range validation with visible, field-specific feedback and no state update on invalid input in `frontend/components/MorningCheckIn.jsx`.
- [X] T012 [US2] Connect valid check-in submissions to selected-day browser-session state and show a confirmation identifying the updated day in `frontend/components/ReadinessDashboard.jsx`.
- [X] T013 [US2] Display saved energy and soreness ratings in the matching dated multi-day readings in `frontend/components/ReadinessDashboard.jsx`.

**Checkpoint**: User Story 2 can be demonstrated through the dashboard without a backend; valid changes are session-only.

## Phase 5: User Story 3 - Recognize accumulating fatigue and adapt training (Priority: P1)

**Goal**: Identify a sustained multi-indicator worsening pattern in its three-day context and offer the four training choices without diagnosing or changing a plan.

**Independent Test**: Review the fixture's three consecutive days and verify worsening is identified only when at least two comparable indicators are worse from the first to the final day. Confirm the middle day remains visible, contributing indicators are named, missing and mixed readings are not treated as worsening, and each workout option can be selected without changing a plan.

### Implementation for User Story 3

- [X] T014 [P] [US3] Implement three-day worsening comparisons using lower energy, sleep quality, or heart-rate recovery and higher soreness, resting heart rate, or perceived effort as worsening; count slower pace only when workouts are marked comparable in `frontend/lib/fatigueTrend.js`.
- [X] T015 [US3] Return an insufficient-data state when three consecutive days or comparable first/last readings are unavailable, and do not count missing readings as favorable or worsening in `frontend/lib/fatigueTrend.js`.
- [X] T016 [P] [US3] Create an informational fatigue insight that names contributing indicators, displays first/middle/final-day context, and offers continue, shorten, slow down, and lower-impact substitution options in `frontend/components/FatigueInsight.jsx`.
- [X] T017 [US3] Recompute the displayed trend when valid morning ratings change and render mixed evidence or insufficient history without asserting sustained worsening in `frontend/components/ReadinessDashboard.jsx`.
- [X] T018 [US3] Add browser-session selection and clear selection feedback for the four workout adjustment options without modifying a training plan in `frontend/components/FatigueInsight.jsx`.

**Checkpoint**: User Story 3 demonstrates the sustained-worsening case, the no-pattern/insufficient-data cases, and all four non-prescriptive options.

## Phase 6: Polish and Cross-Cutting Concerns

**Purpose**: Complete responsive and accessible behavior and validate the integrated prototype.

- [X] T019 [P] Ensure dashboard headings, input labels, error feedback, status messages, chart labels, and selected workout options are understandable to keyboard and assistive-technology users in `frontend/components/ReadinessDashboard.jsx` and `frontend/components/FatigueInsight.jsx`.
- [X] T020 [P] Refine narrow-screen dashboard, check-in, and workout-choice layouts without page-level horizontal scrolling in `frontend/app/globals.css`.
- [X] T021 Run the frontend lint and production build commands from `frontend/package.json` and resolve any feature-introduced failures.
- [X] T022 Validate the documented multi-day, missing-data, trend, check-in, invalid-entry, workout-choice, responsive, and keyboard scenarios in `specs/001-training-readiness/quickstart.md`.

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; T001 precedes T002 because metadata is set after scaffolding.
- **Foundational (Phase 2)**: Depends on setup; T003 and T004 must be complete before story work, and T003 precedes T004's shell styling.
- **User Stories (Phase 3+)**: Depend on the project foundation.
- **Polish (Phase 6)**: Depends on all three user stories being integrated.

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Phase 2; no dependency on another story. Delivers the MVP history view.
- **User Story 2 (P1)**: Starts after Phase 2; its state update and display tasks extend the User Story 1 dashboard, so T006–T009 must be complete before T012–T013.
- **User Story 3 (P1)**: Starts after Phase 2; T017 integrates trend calculation with check-in values, so User Story 2's T012–T013 must be complete before T017. Its trend module and insight component can be prepared before that integration.

### Within-Story Dependencies

- In User Story 1, T005 supplies the fixture consumed by T006–T008; T009 follows creation of the dashboard component.
- In User Story 2, T010–T011 create a self-contained form; T012–T013 connect it to the existing dashboard and fixture.
- In User Story 3, T014–T015 define trend interpretation before it is integrated by T017; T016 and T018 provide and wire the interaction choices.
- Polish validation follows story integration.

### Parallel Opportunities

- T003 and T004 are sequential because global styles must exist before the application shell can load them.
- T005 can proceed independently of T006–T009 once the foundational phase is complete; dashboard rendering tasks depend on the fixture.
- T010 can be implemented independently of dashboard integration T012–T013 after the foundational phase.
- T014 and T016 can be developed on separate files in parallel after the foundational phase and fixture schema agreement; T015 follows T014 in the same trend module.
- T019 and T020 target separate files and can proceed in parallel after the story UI is integrated.

## Parallel Example: User Story 3

```text
Task: T014 Implement the three-day fatigue trend calculation in frontend/lib/fatigueTrend.js
Task: T016 Create the fatigue insight and workout choice component in frontend/components/FatigueInsight.jsx
```

These tasks operate on separate files; T017 integrates both into the dashboard after the check-in flow is present.

## Parallel Examples: User Stories 1 and 2

- **User Story 1**: No safe same-story parallel batch is identified; the dashboard tasks share `frontend/components/ReadinessDashboard.jsx`, and the view depends on `frontend/data/readiness.js`.
- **User Story 2**: No safe same-story parallel batch is identified; form creation and validation both edit `frontend/components/MorningCheckIn.jsx`, and dashboard integration follows afterward.

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup and Phase 2: Foundational.
2. Complete Phase 3: User Story 1.
3. Run the frontend lint/build commands and independently verify multi-day readings and missing-value presentation.
4. Demonstrate the multi-day readiness view before proceeding to additional interactions.

### Incremental Delivery

1. Add the morning check-in in User Story 2 and verify valid and invalid entries.
2. Add three-day multi-indicator interpretation and workout choices in User Story 3.
3. Complete responsive/accessibility polish and validate all quickstart scenarios.

At every stage, use illustrative data only; do not add persistence, backend APIs, authentication, or wearable integrations.
