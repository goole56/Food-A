## 2025-05-18 - Route-Level Code Splitting for Large Page Bundles
**Learning:** Top-level route pages (such as CustomerDashboard with 3D/Map libraries and AdminDashboard with charts) significantly bloat the initial entry bundle when imported statically. Using `React.lazy` with named export resolution (`.then(m => ({ default: m.Component }))`) and `Suspense` fallbacks splits heavy vendor/page assets into separate async chunks.
**Action:** Always implement lazy route loading for heavy dashboards and authenticated routes to minimize Initial Page Load Time and First Contentful Paint.
