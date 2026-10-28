## 2025-05-18 - Semantic Header Buttons & Keyboard Focus Rings
**Learning:** Header navigation links and interactive header items wrapped in `div` elements are invisible to keyboard-only and screen reader users.
**Action:** Always wrap clickable header elements in semantic `<button type="button">` or `<a>` elements and add visible focus rings (`focus-visible:ring-2`) along with `aria-label` or `title` attributes.
