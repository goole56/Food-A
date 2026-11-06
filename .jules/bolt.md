# Bolt's Performance Journal

## 2025-05-18 - Route-Level Code Splitting for Heavy Subsystem Dependencies
**Learning:** In this React 19 / Vite application, heavy standalone vendor libraries (`recharts` in `AdminDashboard`, `@vis.gl/react-google-maps` and `jspdf` / `jspdf-autotable` in `CustomerDashboard`) were all statically imported at the route level in `App.tsx`. This created a massive initial JS bundle of 1,361 kB (418 kB gzip), forcing all visitors (including unauthenticated users landing on `/login`) to download and parse all admin and mapping libraries upfront.
**Action:** When adding or maintaining top-level route views in this codebase, always use dynamic imports via `React.lazy()` with `React.Suspense` in `App.tsx` so non-shared domain dependencies are split into dedicated chunks and only loaded on navigation.
