# Bolt's Performance Journal

## 2025-05-15 - Heavy Specialized Dependencies & Route Chunk Splitting
**Learning:** In applications where distinct user roles (admin vs customer) and specialized features (invoice PDF generation) rely on heavy single-purpose libraries (`recharts`, `jspdf`, `jspdf-autotable`), static top-level imports bloat the critical initial entry chunk dramatically (from 536 kB to 1.36 MB). Customers were needlessly downloading Recharts and jsPDF bundle assets on every first visit.
**Action:** Always dynamic-import on-demand action libraries like `jspdf` (`await import('jspdf')`) inside their trigger handler, and use `React.lazy` on role-partitioned sub-dashboards (like `AdminDashboard`) to keep the primary landing bundle minimal and fast.
