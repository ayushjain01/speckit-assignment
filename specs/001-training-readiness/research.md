# Research: Training Fatigue and Readiness Prototype

## Decisions

### Next.js App Router with JavaScript

- **Decision**: Build a standalone Next.js App Router project using JavaScript and JSX.
- **Rationale**: This meets the requested technology choice and provides a simple page-oriented structure for a one-screen demonstration. App Router pages support `.js`/`.jsx`; Next.js client components can provide browser-side form state and event handling.
- **Alternatives considered**: Pages Router is also supported, but adds no value for a new, single-page prototype. TypeScript was not selected because the request explicitly asks for JavaScript.
- **References**:
  - [Next.js installation](https://nextjs.org/docs/app/getting-started/installation)
  - [Next.js page convention](https://nextjs.org/docs/app/api-reference/file-conventions/page)
  - [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
  - [The `use client` directive](https://nextjs.org/docs/app/api-reference/directives/use-client)

### Local, session-only interaction state

- **Decision**: Seed the dashboard from a local mock-data module and use in-memory browser state for check-in edits and the selected workout option. State resets on refresh.
- **Rationale**: The prototype is explicitly limited to static mock data and excludes backend and database implementation. In-memory state demonstrates interaction without suggesting persistence or remote processing.
- **Alternatives considered**: Browser storage could retain mock check-ins across refreshes, but that persistence is unnecessary for the demonstration. A server-backed implementation would exceed requested scope.
- **References**:
  - [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
  - [Next.js static exports and browser APIs](https://nextjs.org/docs/app/guides/static-exports#browser-apis)

### Focused client boundary and native interface primitives

- **Decision**: Keep stateful check-in and adjustment interactions in one focused client-side dashboard component. Use semantic HTML controls and CSS/SVG styling rather than adding a charting or component dependency.
- **Rationale**: Only the demonstration dashboard needs browser event handlers. A focused client boundary keeps the page simple; native controls support keyboard use and reduce dependencies. The project can initially use normal Next.js development and build behavior.
- **Alternatives considered**: Marking the entire app interactive is valid for a one-screen prototype but needlessly broadens the client boundary. Static export is compatible with hydrated client-side interactions, but is not required unless the eventual hosting target requires it.
- **References**:
  - [Next.js Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
  - [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports)

## Scope and Assumptions

- There is no existing application structure in the repository; the prototype will live in `frontend/`.
- The fixture supplies several consecutive days of illustrative readings and already supports both a sustained-worsening presentation and check-in updates that can illustrate a changed trend state.
- The three-day comparison follows the clarified specification: compare earliest and latest available comparable readings, show the middle reading for context, and require at least two worsening indicators.
- Slower pace counts as worsening only when the fixture labels workouts comparable; do not infer comparison from pace alone.
- Browser validation and Next.js lint/build commands are proportionate for the prototype; no extra test framework is introduced.
- A static export may be enabled later if required for a specific hosting environment; it is not part of the current scope.
