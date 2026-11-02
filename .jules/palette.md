# Palette's Journal - Critical UX & Accessibility Learnings

## 2025-05-18 - Food Ordering Modal Stepper & Dialog Accessibility
**Learning:** In fast-casual food ordering interfaces, adding items directly from detailed modal views without a quantity stepper forces users to navigate to the cart repeatedly to adjust quantities. Adding an accessible stepper with live total price recalculation and keyboard dialog support (`Escape` dismiss, `aria-modal`, `role="dialog"`) creates a frictionless, accessible checkout flow.
**Action:** When creating product detail view modals in e-commerce or delivery flows, always include accessible quantity steppers with live price reflection and complete keyboard modal controls.
