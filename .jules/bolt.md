# Bolt's Performance Journal

## 2025-05-18 - Heavy document generation dependencies in UI routes
**Learning:** `jspdf` and `jspdf-autotable` pull in significant parsing and canvas rendering code (~420KB minified, ~138KB gzipped) that is only needed when users trigger an invoice download. Statically importing it into general customer dashboard pages bloated the initial entry chunk by 426 KB.
**Action:** Always lazy load export/PDF generation libraries on demand (`import('jspdf')`) in click handlers rather than static top-level imports in route components.
