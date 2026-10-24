## 2025-05-15 - Header Icon-Only Buttons Accessibility
**Learning:** Icon-only navigation buttons in global headers (Favorites, Cart, Dashboard, Logout) lacked ARIA labels and focus-visible outlines, rendering them inaccessible to screen readers and keyboard-only users.
**Action:** Always provide explicit `aria-label`, hover `title`, and `focus-visible:ring-2` styles when implementing icon-only buttons.
