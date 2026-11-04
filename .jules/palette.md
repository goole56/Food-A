# Palette's Journal - Critical UX Learnings

## 2025-11-04 - Custom Dialog Modal Accessibility & Keyboard Navigation
**Learning:** Custom modal overlays rendered via AnimatePresence in customer views lacked keyboard escape dismissal, dialog ARIA attributes (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`), and initial focus management. Screen reader users could not identify the dialog boundary or its title, and keyboard users were trapped without an obvious escape shortcut.
**Action:** When building custom modals in this app, always ensure: (1) listen for the `Escape` key while open, (2) auto-focus the primary dismiss button upon opening with a clear `aria-label`, (3) attach `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` referencing the title, and (4) mark overlay backdrops with `aria-hidden="true"`.
