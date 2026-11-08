# Bolt's Journal

## 2026-08-01 - Route-level code splitting with React.lazy
**Learning:** Heavy libraries such as `@vis.gl/react-google-maps`, `jspdf`, `jspdf-autotable`, and `recharts` were statically imported into `CustomerDashboard` and `AdminDashboard`, which were then statically imported in `App.tsx`. This bloated the initial JavaScript bundle to ~1,361 KB (~418 KB gzipped). Dynamic imports via `React.lazy()` with route-level `Suspense` isolate these heavy dependencies into route-specific chunks (`CustomerDashboard` ~526 KB and `AdminDashboard` ~397 KB), slashing the main entry chunk to 408 KB (130 KB gzipped) — a ~70% reduction in entry bundle size.
**Action:** When adding heavy new dependencies (e.g. mapping, charting, document export, 3D), isolate them into lazy-loaded route chunks rather than eagerly bundling them into the entry point.
