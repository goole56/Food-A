## 2025-05-10 - Accessible Navigation and Focus States in App Shell

**Learning:** Fixed header and bottom mobile navigation bars often contain icon-only buttons that are completely invisible to screen readers without `aria-label`s and hard to navigate for keyboard-only users without explicit `focus-visible` ring styling. Adding skip links (`href="#main-content"`) at top level enables screen reader users to bypass repetitive layout navigation.

**Action:** Always provide `aria-label` (with dynamic context like cart item counts where relevant), `focus-visible:ring-2`, and a top-level skip-to-content link in core layout shells.
