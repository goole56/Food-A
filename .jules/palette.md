# Palette's Journal - Critical Learnings

## 2025-05-18 - Top-level Layout Navigation Accessibility & Focus Management
**Learning:** In single-page food delivery applications with rich sticky headers and mobile bottom bars, navigation icons (cart, favorites, profile, location selectors) often omit ARIA labels and focus-visible rings, leaving screen reader users unaware of cart counts or button actions, and keyboard users without visible focus or a way to skip repetitive navigation.
**Action:** Always provide a `Skip to main content` landmark targeting the main scroll container (`#main-content`), label icon-only buttons with descriptive `aria-label`s and tooltips, add `aria-current="page"` to active navigation tabs, and specify `focus-visible:ring-2 focus-visible:ring-brand-pink`.
