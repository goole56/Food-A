## 2025-05-10 - Pure State Updaters with Memoized Context Callbacks
**Learning:** When memoizing context methods (like `placeOrder`) with `useCallback`, state updates for other entities (like `setOrders`) must never be dispatched inside another state updater function (like `setCart((cart) => ...)`). In React Strict Mode and React 19, functional state updaters may be called multiple times, leading to duplicate operations.
**Action:** Keep state updater functions pure. Pass required state variables (e.g. `cart`) directly in the `useCallback` dependency array instead of nesting state updaters.
