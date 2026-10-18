## 2025-05-18 - Header and Mobile Navigation Accessibility Patterns
**Learning:** Icon-only navigation buttons (e.g. cart, favorites, profile) and mobile bottom tab bars need explicit `aria-label`, `aria-current="page"`, and `focus-visible:ring-2` styles to ensure screen readers and keyboard users can navigate seamlessly.
**Action:** Always verify icon-only buttons have descriptive ARIA labels (including dynamic state like cart item count) and visible focus rings on navigation elements.
