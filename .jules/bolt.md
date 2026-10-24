## 2025-10-24 - Context Provider Memoization in React 19 App

**Learning:** Unmemoized context provider values in `StoreContext` and `AuthContext` were causing new object literals and callback function references to be created on every render. This triggered unnecessary re-renders in all consumer components (`Layout`, `CustomerDashboard`, `AdminDashboard`, etc.) even when context state did not change.
**Action:** Always wrap context values in `useMemo` and handler methods in `useCallback` (using functional state updaters where possible) for root context providers.
