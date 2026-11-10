# Bolt's Performance Journal

## 2025-05-18 - Route-Level Code Splitting for Heavy Feature Routes
**Learning:** In a Single Page Application with varied roles (auth, customer ordering, and admin analytics), statically importing all dashboard components causes heavyweight third-party libraries (such as `@vis.gl/react-google-maps`, `jspdf`, and `recharts`) to be included in the initial entry bundle. This forces anonymous or regular customer visitors to download and parse large libraries they may never use.
**Action:** Use `React.lazy()` with dynamic `import()` at the root routing boundary in `src/App.tsx`, paired with `React.Suspense` and a lightweight loading fallback, to isolate role-specific heavy dependencies into separate chunks downloaded on demand.
