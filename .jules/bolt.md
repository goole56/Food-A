## 2026-10-18 - Route Code-Splitting and Context Memoization
**Learning:** Monolithic route imports force heavy libraries (`recharts`, `@vis.gl/react-google-maps`, `jspdf`) into the initial entry bundle, bloating initial load size to ~1.4MB. Using `React.lazy` for routes reduces the main bundle by >68% (down to ~439kB).
**Action:** Always lazy load page routes that pull in distinct, heavy third-party libraries using `React.lazy` and `Suspense`.
