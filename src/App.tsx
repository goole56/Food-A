import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';
import { Layout } from './components/Layout';

// Performance Optimization: Route-level code splitting with React.lazy
// Dynamic imports prevent loading heavy page bundles (e.g., Admin charts, Customer dashboard 3D/Maps) on initial load,
// significantly improving Initial Page Load Time and First Contentful Paint (FCP).
const Login = lazy(() => import('./pages/auth/Login').then(m => ({ default: m.Login })));
const Register = lazy(() => import('./pages/auth/Register').then(m => ({ default: m.Register })));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword').then(m => ({ default: m.ForgotPassword })));
const CustomerDashboard = lazy(() => import('./pages/customer/CustomerDashboard').then(m => ({ default: m.CustomerDashboard })));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));

function PageLoadingFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-brand-pink border-t-transparent rounded-full animate-spin" />
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
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Auth Routes */}
              <Route index element={<RootRedirect />} />
              <Route path="login" element={<Suspense fallback={<PageLoadingFallback />}><Login /></Suspense>} />
              <Route path="register" element={<Suspense fallback={<PageLoadingFallback />}><Register /></Suspense>} />
              <Route path="forgot-password" element={<Suspense fallback={<PageLoadingFallback />}><ForgotPassword /></Suspense>} />
              
              {/* Customer Routes */}
              <Route 
                path="customer/*" 
                element={
                  <ProtectedRoute role="customer">
                    <Suspense fallback={<PageLoadingFallback />}>
                      <CustomerDashboard />
                    </Suspense>
                  </ProtectedRoute>
                } 
              />
              
              {/* Admin Routes */}
              <Route 
                path="admin/*" 
                element={
                  <ProtectedRoute role="admin">
                    <Suspense fallback={<PageLoadingFallback />}>
                      <AdminDashboard />
                    </Suspense>
                  </ProtectedRoute>
                } 
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </AuthProvider>
  );
}
