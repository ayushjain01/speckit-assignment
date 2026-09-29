# Quickstart: Training Fatigue and Readiness Prototype

## Prerequisites

- Node.js and npm versions supported by the current Next.js release.
- A modern browser.

## Create and Run the Frontend

From the repository root, scaffold the requested JavaScript App Router project under `frontend/` using the current Next.js project creator. Select or pass the JavaScript option; enable App Router; keep the project minimal and do not add a backend or database.

```powershell
npx create-next-app@latest frontend --js --app
Set-Location frontend
npm run dev
```

Open the local address printed by the development server.

## Demonstration Scenarios

1. **Review indicators over time**: Confirm multiple dated records show energy, sleep quality, resting heart rate, heart-rate recovery, soreness, perceived effort, and pace. Verify missing readings are visibly unavailable rather than displayed as favorable values.
2. **Review sustained worsening**: Use the fixture's three-day period. Confirm at least two comparable indicators worsen from the first to the last day, that the middle day's values remain visible, and that the message names contributors without implying a diagnosis.
3. **Record a morning check-in**: Enter whole-number energy and soreness values from 1 to 5 and submit. Confirm the selected day updates and the new ratings appear in the multi-day view. Try a missing or invalid rating and confirm visible validation with no update.
4. **Select a workout response**: Select each of the four choices in turn and confirm the selection is clear. Confirm that selecting an option does not alter a real training plan.
5. **Check responsive and keyboard use**: Resize to a narrow mobile viewport, navigate and submit controls by keyboard, and verify labels, focus, and trend messaging remain understandable.

## Validation

From `frontend/`, run the lint and production build scripts present in the generated project:

```powershell
npm run lint
npm run build
```

Both commands should complete without errors. Re-run the browser scenarios against the production build if the prototype is being prepared for a demonstration. Check the scaffolded `package.json` for the exact available script names if the current Next.js release changes defaults.
