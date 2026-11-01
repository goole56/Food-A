# Palette's Journal

## 2025-05-18 - Accessible Icon Buttons and Dynamic Screen Reader Labels in Top Navbar
**Learning:** Icon-only navigation actions (such as cart badges, favorite hearts, and dashboard toggles) become invisible to screen reader users and keyboard navigators if they lack descriptive `aria-label`s, tooltip titles, and `focus-visible` focus rings. When a badge displays dynamic state (like cart item count), the icon button's `aria-label` should dynamically convey that count (e.g. "Shopping cart, 3 items") while marking the floating numeric badge with `aria-hidden="true"` to prevent redundant screen reader announcements.
**Action:** When creating or refining icon-only buttons in navigation headers, always add a descriptive `aria-label` with dynamic state, a hover `title`, `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink`, and ensure any badge child has `aria-hidden="true"`.
