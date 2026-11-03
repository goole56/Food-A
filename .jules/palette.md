# Palette's Journal - Critical UX & Accessibility Learnings

## 2025-05-14 - Modal Dialog Accessibility & Escape Keyboard Dismissal
**Learning:** In interactive food ordering catalogs with modal detail previews, users navigating via keyboard can become trapped inside the modal if the `Escape` key is not monitored. In addition, screen reader users rely on standard ARIA attributes (`role="dialog"`, `aria-modal="true"`, and `aria-labelledby`) as well as clear `aria-label`s on icon-only buttons with visible focus rings.
**Action:** Always ensure modal overlays have `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, a keyboard `Escape` dismissal listener, and explicit `aria-label` on dismiss controls.
