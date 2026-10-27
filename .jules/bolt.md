# Bolt's Journal - Critical Learnings

## Context Provider Optimization
**Learning:** React Context provider values defined as inline object literals cause re-renders across all consumer components on every provider update.
**Action:** Always memoize context value objects with `useMemo` and wrap context action handlers with `useCallback` (using functional state updaters where possible to minimize dependency arrays).
