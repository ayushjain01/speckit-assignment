# Implementation Plan: Training Fatigue and Readiness Prototype

**Branch**: `001-training-readiness` | **Date**: 2026-09-29 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-training-readiness/spec.md` and user request for a JavaScript Next.js frontend prototype using static mock data.

## Summary

Build a single-screen, responsive marathon training readiness dashboard that demonstrates the specified multi-day indicators, a quick energy/soreness check-in, a sustained-worsening insight, and four workout adjustment choices. Use Next.js with JavaScript and local mock data only; the prototype has no backend, database, authentication, or wearable integrations. Client-side interactions update the demonstration view for the current session and are not persisted.

## Technical Context

**Language/Version**: JavaScript (modern ECMAScript), JSX; Node.js version supported by the selected current Next.js release

**Primary Dependencies**: Next.js App Router and React, installed with the Next.js project scaffolder; no charting or component library required

**Storage**: Static JavaScript mock-data module and in-memory browser state only; no database or persistence

**Testing**: Next.js lint/build checks plus browser validation of the documented UI flows; no separate test framework required for the prototype

**Target Platform**: Responsive desktop and mobile web browsers

**Project Type**: Standalone frontend web application under `frontend/`

**Performance Goals**: Dashboard is usable without waiting for remote data; mock data and initial readiness view appear at first render

**Constraints**: JavaScript only; static mock data; no backend, database, authentication, wearable integrations, or durable changes; do not diagnose or automatically change a training plan; accessible labels, keyboard-operable controls, and responsive layouts

**Scale/Scope**: One demonstration dashboard, one mock runner, a multi-day sample history, an editable morning check-in, a computed three-day trend state, and selectable workout adjustment options

## Constitution Check

The project constitution file contains only unfilled template placeholders and establishes no active principles or gates.

| Gate | Result | Notes |
|------|--------|-------|
| User-focused scope | PASS | The frontend demonstrates the user journeys defined in the specification. |
| Simplicity | PASS | One Next.js frontend, local fixtures, and browser state; no service or persistence layer. |
| Testability | PASS | Dashboard states and user flows can be checked in a browser and validated with project lint/build commands. |
| Privacy and safety | PASS | No account or personal data is collected; readiness information is informational and non-diagnostic. |

## Project Structure

### Documentation (this feature)

```text
specs/001-training-readiness/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── contracts/
    └── user-interface.md
```

### Source Code (repository root)

```text
frontend/
├── app/
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components/
│   └── ReadinessDashboard.jsx
├── data/
│   └── readiness.js
├── public/
└── package.json
```

**Structure Decision**: Keep the demonstration in a new standalone `frontend/` Next.js App Router project, with the entry page importing a focused interactive dashboard and static fixtures kept separate from the presentation. The interface is an internal application UI rather than an external API, so a user-interface contract documents observable states and interactions; no network contracts are needed.

## Complexity Tracking

No constitution violations or additional architectural complexity need justification.

## Phase 0: Research

Research findings and documented alternatives are in [research.md](./research.md). The user has already selected Next.js and JavaScript; remaining scope choices are resolved as a local-only, single-screen prototype with non-persistent interaction state.

## Phase 1: Design

- [data-model.md](./data-model.md) defines static readiness history, morning check-in state, trend findings, and the selected workout option.
- [contracts/user-interface.md](./contracts/user-interface.md) defines the screen content, decision behavior, interaction and accessibility expectations.
- [quickstart.md](./quickstart.md) describes setup and end-to-end demonstration checks.

No backend or API contracts are applicable to this prototype.

## Constitution Check (Post-Design)

| Gate | Result | Notes |
|------|--------|-------|
| User-focused scope | PASS | Each proposed view/state traces to a user story and observable acceptance scenario. |
| Simplicity | PASS | No backend, integrations, charts dependency, or persistence; presentation remains one dashboard. |
| Testability | PASS | Mock fixtures and clearly described states support repeatable browser validation. |
| Privacy and safety | PASS | No real health data is transmitted or retained; insights do not present as medical advice. |

All gates pass; no design exception is required.
