# Bolt's Performance Journal

## 2026-11-09 - Route-based code splitting for heavy customer/admin subtrees
**Learning:** In this application, `AdminDashboard` bundles `recharts` while `CustomerDashboard` imports `@vis.gl/react-google-maps` and `jspdf`/`jspdf-autotable`. Loading these routes statically in `App.tsx` bloated the initial entry bundle to 1.36 MB minified (418 kB gzipped), forcing users on `/login` or auth screens to download unused charting and mapping libraries.
**Action:** When introducing top-level route pages or feature-specific dashboards with large 3rd-party vendor dependencies, load them with `React.lazy()` and `React.Suspense` to isolate them into separate asynchronous chunks and keep the initial bundle small (~408 kB).
