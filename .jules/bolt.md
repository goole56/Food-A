# Bolt's Journal

## Critical Learnings

## 2025-05-18 - Route-level code splitting reduces initial bundle by ~70%
**Learning:** Monolithic route imports bundled recharts (admin) and google maps/jspdf (customer) together into a single 1,361 kB bundle. Dynamic route imports with `React.lazy` isolated `AdminDashboard` and `CustomerDashboard`, cutting the entry bundle from 1,361 kB to 408 kB.
**Action:** When introducing new views or heavy dashboard analytics, keep routes code-split via `React.lazy` and lazy-load third-party visualizers or exporters.
