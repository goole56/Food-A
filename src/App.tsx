import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';
import { Layout } from './components/Layout';
// ⚡ Bolt Optimization: Lazy load route components using React.lazy and Suspense.
// Splitting heavy routes (CustomerDashboard with Google Maps & PDF generation, AdminDashboard with Recharts)
// isolates their dependencies into separate asynchronous chunks, dramatically reducing initial page load bundle size.
const Login = React.lazy(() => import('./pages/auth/Login').then(m => ({ default: m.Login })));
const Register = React.lazy(() => import('./pages/auth/Register').then(m => ({ default: m.Register })));
const ForgotPassword = React.lazy(() => import('./pages/auth/ForgotPassword').then(m => ({ default: m.ForgotPassword })));
const CustomerDashboard = React.lazy(() => import('./pages/customer/CustomerDashboard').then(m => ({ default: m.CustomerDashboard })));
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));

function RouteLoadingFallback() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8">
      <div className="w-10 h-10 border-4 border-brand-pink/20 border-t-brand-pink rounded-full animate-spin mb-4" />
      <span className="text-sm font-semibold text-brand-text-muted">Loading...</span>
    </div>
  );
}

function ProtectedRoute({ children, role }: { children: React.ReactNode, role: 'customer' | 'admin' }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.role !== role) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/customer'} replace />;
  }
  
  return <>{children}</>;
}

function RootRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={user.role === 'admin' ? '/admin' : '/customer'} replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <BrowserRouter>
          <React.Suspense fallback={<RouteLoadingFallback />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* Auth Routes */}
                <Route index element={<RootRedirect />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />

                {/* Customer Routes */}
                <Route
                  path="customer/*"
                  element={
                    <ProtectedRoute role="customer">
                      <CustomerDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Routes */}
                <Route
                  path="admin/*"
                  element={
                    <ProtectedRoute role="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </React.Suspense>
        </BrowserRouter>
      </StoreProvider>
    </AuthProvider>
  );
}
