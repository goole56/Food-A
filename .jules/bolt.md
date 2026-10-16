## 2025-05-18 - Side effects in React state updater functions
**Learning:** Calling secondary state setters (e.g. `setOrders`) inside a functional state update callback (e.g. `setCart(prev => ...)`) introduces impure side effects during render. In React Strict Mode or Concurrent React, state updaters can be invoked multiple times, causing duplicate side effects.
**Action:** Keep state updater functions pure. Access state directly and list required variables in the `useCallback` dependency array instead of nesting state setters inside callback updaters.
