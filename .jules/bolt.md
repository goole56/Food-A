# Bolt's Performance Journal

## 2025-05-18 - Context Value & Handler Memoization in Global State
**Learning:** In React applications using global Context providers (like `StoreContext` and `AuthContext`), passing inline object literals causes every context consumer component to re-render whenever the provider re-renders. By utilizing functional state updates inside `useCallback` (e.g. `setCart(prev => ...)`), context action handlers can maintain empty dependency arrays `[]` and completely stable references across the app lifecycle.
**Action:** Always wrap context action handlers in `useCallback` with functional updates and memoize context provider value objects with `useMemo`.
