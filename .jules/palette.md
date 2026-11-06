# Palette's Journal - Critical UX Learnings

## 2025-05-18 - Cart Coupon Inputs & Interactive Discount Chips
**Learning:** In e-commerce checkouts with quick-apply coupon chips, buttons that set voucher codes need descriptive accessible labels (`aria-label` and `title` explaining the discount) so screen reader and keyboard users understand what applying a code will grant them before committing. Furthermore, the submit button should visibly reflect an un-actionable disabled state when empty, error messages must carry `role="alert"`, and applied success state should have an explicit `role="status"` + `aria-live="polite"` alongside an accessible remove button.
**Action:** When creating coupon or voucher entry components, combine `disabled={!input.trim()}`, descriptive coupon chip `aria-label`/`title`, `role="alert"` for input errors, and accessible delete actions.
