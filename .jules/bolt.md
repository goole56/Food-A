# Bolt's Performance Journal

## 2025-05-18 - Pure State Updaters in Context Callbacks
**Learning:** When memoizing context actions with `useCallback`, attempting to keep the dependency array empty by calling another state setter (e.g. `setOrders`) inside a `setCart` functional updater callback creates side effects within state updates. In React 19 / Concurrent React, updater functions must remain pure.
**Action:** Keep state updater callbacks pure. Include dependent state in `useCallback` dependency arrays (e.g. `[cart]`) or execute sequential state dispatches outside updater functions.
