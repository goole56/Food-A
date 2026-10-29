## 2025-05-18 - Dynamic Import of Heavy PDF Dependencies
**Learning:** Top-level static imports of heavy utility libraries like `jspdf` and `jspdf-autotable` (~250KB+ minified/gzipped bundle size) heavily penalize initial application chunk size even if the feature is only used on demand.
**Action:** Always dynamically import heavy, feature-specific dependencies (such as invoice/PDF export or heavy charting tools) inside their respective event handlers using `await import()`.
