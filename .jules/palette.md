# Palette's Journal - UX & Accessibility Learnings

## 2025-05-14 - Navigation Accessibility & Interactive Indicators
**Learning:** Top navigation bars in food delivery apps frequently combine brand identity, address switchers, and icon-only utility buttons (wishlist, cart, admin toggles). When address switchers and brand logos are rendered as non-interactive `div`s with `onClick`, keyboard users are unable to focus or activate them. Additionally, unlabelled icon-only buttons leave screen reader users blind to critical actions like checking out or reviewing active carts.
**Action:** Always wrap interactive navigation elements in semantic `<button>`s, provide descriptive `aria-label`s and `title` tooltips, use `focus-visible:ring-2` for non-intrusive keyboard cues, and wire the address selector to the user's addresses view.
