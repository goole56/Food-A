# Bolt's Performance Journal

## 2025-05-15 - Lazy-Loading Heavy Utility Libraries (jsPDF & AutoTable)
**Learning:** Large client-side document generation libraries like `jspdf` and `jspdf-autotable` add over 420 kB minified (~138 kB gzipped) of JavaScript. When imported statically in common route components (such as `CustomerDashboard`), they inflate initial bundle sizes and block the main thread with parsing overhead, even though the feature (e.g. "Download Invoice") is only used on demand.
**Action:** Always dynamically import heavy, on-demand document generation or export libraries using `await Promise.all([import('jspdf'), import('jspdf-autotable')])` directly within the click handler to keep main entry chunks lean.
