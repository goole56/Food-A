# Bolt's Journal - Critical Learnings

## 2025-05-20 - Pure state updaters when memoizing context callbacks
**Learning:** Calling secondary state setters (e.g. `setOrders`) inside a functional state updater callback of another state setter (e.g. `setCart((prev) => ...)`) is an anti-pattern that violates React purity and triggers duplicate executions in Strict Mode.
**Action:** When memoizing callbacks with `useCallback` that mutate multiple state atoms, keep state setters pure and list necessary state values in the `useCallback` dependency array instead of nesting side effects inside updater functions.
