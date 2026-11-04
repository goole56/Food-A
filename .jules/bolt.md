# Bolt's Performance Journal

## 2025-05-18 - Route-based Code Splitting Separates Heavy Specialized Libraries
**Learning:** In this application, route components import large ecosystem libraries that are only relevant to specific roles: `AdminDashboard` pulls in `recharts` (~388 KB), while `CustomerDashboard` imports `@vis.gl/react-google-maps` and PDF generation libraries (`jspdf`, `jspdf-autotable`). Without dynamic route splitting, all of these libraries are compiled into a single massive `index` bundle (1.33 MB minified / 418 KB gzipped), severely penalizing initial load time and First Contentful Paint even for unauthenticated users visiting `/login` or `/register`.
**Action:** Always maintain route-level dynamic imports (`React.lazy` with `Suspense`) in `src/App.tsx`. When adding new dashboards or major feature sections that pull in specialized dependencies (charts, maps, 3D Canvas, export tools), ensure they remain isolated in lazy chunks.
