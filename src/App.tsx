import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';
import { Layout } from './components/Layout';

// Performance Optimization: Lazy load route components to split large JS bundle (>1.3MB)
// into smaller chunks, avoiding loading heavy libraries (e.g. recharts, pdf generators) upfront.
const Login = lazy(() => import('./pages/auth/Login').then(m => ({ default: m.Login })));
const Register = lazy(() => import('./pages/auth/Register').then(m => ({ default: m.Register })));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword').then(m => ({ default: m.ForgotPassword })));
const CustomerDashboard = lazy(() => import('./pages/customer/CustomerDashboard').then(m => ({ default: m.CustomerDashboard })));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));

// Fallback loading indicator for lazy-loaded route chunks
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-10 h-10 border-4 border-brand-pink border-t-transparent rounded-full animate-spin" />
  </div>
);

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
              <Route path="login" element={<Suspense fallback={<PageLoader />}><Login /></Suspense>} />
              <Route path="register" element={<Suspense fallback={<PageLoader />}><Register /></Suspense>} />
              <Route path="forgot-password" element={<Suspense fallback={<PageLoader />}><ForgotPassword /></Suspense>} />
              
              {/* Customer Routes */}
              <Route 
                path="customer/*" 
                element={
                  <ProtectedRoute role="customer">
                    <Suspense fallback={<PageLoader />}>
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
                    <Suspense fallback={<PageLoader />}>
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
